[CmdletBinding()]
param(
    [Parameter(Position = 0, Mandatory = $true)]
    [ValidateSet('status', 'check', 'reserve', 'commit', 'release')]
    [string]$Action,

    [ValidateRange(0, 200)]
    [int]$Credits = 0,

    [string]$JobId
)

$ErrorActionPreference = 'Stop'
$statePath = Join-Path $PSScriptRoot 'higgsfield-credit-state.json'
$lockPath = Join-Path $PSScriptRoot 'higgsfield-credit-state.lock'
$lockStream = $null

if ($Action -in @('reserve', 'commit', 'release')) {
    try {
        $lockStream = [System.IO.File]::Open(
            $lockPath,
            [System.IO.FileMode]::OpenOrCreate,
            [System.IO.FileAccess]::ReadWrite,
            [System.IO.FileShare]::None
        )
    }
    catch {
        throw 'BLOQUEADO: otra operación está actualizando el presupuesto. Intenta nuevamente; no ejecutes Higgsfield mientras tanto.'
    }
}

if (-not (Test-Path -LiteralPath $statePath)) {
    throw "No existe el estado de presupuesto: $statePath"
}

$state = Get-Content -Raw -Encoding UTF8 -LiteralPath $statePath | ConvertFrom-Json
$reservations = @($state.reservations)
$reserved = [int](($reservations | Measure-Object -Property credits -Sum).Sum)
$spent = [int]$state.spent
$budget = [int]$state.budget
$available = $budget - $spent - $reserved

function Assert-Credits {
    if ($Credits -le 0) {
        throw 'Credits debe ser mayor que cero.'
    }
}

function Assert-JobId {
    if ([string]::IsNullOrWhiteSpace($JobId)) {
        throw 'JobId es obligatorio para esta acción.'
    }
}

function Save-State {
    param([object]$Value)

    $json = $Value | ConvertTo-Json -Depth 6
    $tempPath = "$statePath.tmp"
    Set-Content -LiteralPath $tempPath -Value $json -Encoding UTF8
    Move-Item -LiteralPath $tempPath -Destination $statePath -Force
}

switch ($Action) {
    'status' {
        [pscustomobject]@{
            budget = $budget
            spent = $spent
            reserved = $reserved
            available = $available
            account_starting_balance = [int]$state.account_starting_balance
            projected_account_balance = [int]$state.account_starting_balance - $spent - $reserved
            active_reservations = $reservations.Count
        } | ConvertTo-Json
        break
    }

    'check' {
        Assert-Credits
        if ($Credits -gt $available) {
            throw "BLOQUEADO: solicitar $Credits créditos excede el disponible del proyecto ($available de $budget)."
        }
        Write-Output "AUTORIZABLE: $Credits créditos. Disponible después de reservar: $($available - $Credits)."
        break
    }

    'reserve' {
        Assert-Credits
        Assert-JobId
        if ($reservations | Where-Object { $_.job_id -eq $JobId }) {
            throw "Ya existe una reserva para JobId '$JobId'."
        }
        if ($Credits -gt $available) {
            throw "BLOQUEADO: la reserva llevaría el proyecto por encima de $budget créditos."
        }

        $state.reservations = @($reservations) + [pscustomobject]@{
            job_id = $JobId
            credits = $Credits
            created_at = (Get-Date).ToUniversalTime().ToString('o')
        }
        Save-State $state
        Write-Output "RESERVADO: $Credits créditos para '$JobId'. Restan $($available - $Credits)."
        break
    }

    'commit' {
        Assert-JobId
        $reservation = $reservations | Where-Object { $_.job_id -eq $JobId } | Select-Object -First 1
        if (-not $reservation) {
            throw "No existe reserva activa para JobId '$JobId'."
        }

        $actual = if ($Credits -gt 0) { $Credits } else { [int]$reservation.credits }
        if ($actual -gt [int]$reservation.credits) {
            throw 'El consumo real supera la reserva. La llamada debió reservar el costo máximo antes de ejecutarse.'
        }
        if (($spent + $actual) -gt $budget) {
            throw "BLOQUEADO: el consumo confirmado superaría $budget créditos."
        }

        $state.spent = $spent + $actual
        $state.reservations = @($reservations | Where-Object { $_.job_id -ne $JobId })
        Save-State $state
        Write-Output "CONFIRMADO: $actual créditos para '$JobId'. Consumo acumulado: $($state.spent)/$budget."
        break
    }

    'release' {
        Assert-JobId
        if (-not ($reservations | Where-Object { $_.job_id -eq $JobId })) {
            throw "No existe reserva activa para JobId '$JobId'."
        }
        $state.reservations = @($reservations | Where-Object { $_.job_id -ne $JobId })
        Save-State $state
        Write-Output "LIBERADO: reserva '$JobId'. Úsalo solo si el trabajo fue cancelado sin cobro."
        break
    }
}

if ($lockStream) {
    $lockStream.Dispose()
}
