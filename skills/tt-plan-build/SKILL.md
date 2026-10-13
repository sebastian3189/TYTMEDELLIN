---
name: tt-plan-build
description: Protocolo de dos salas — SALA PLAN (razona, investiga, diseña) y SALA BUILD (implementa, prueba). Cada sala tiene su agente, su modelo y su formato de entrega. Úsala para separar el pensar del hacer y que se hablen con un contrato claro.
---

# MOD — Plan ↔ Build

## 1. Concepto: dos salas que se hablan

```
┌─────────────────────┐         CONTRATO          ┌─────────────────────┐
│      SALA PLAN       │ ─────────────────────────▸ │     SALA BUILD      │
│                      │                            │                     │
│  - Investiga         │   Qué hacer                │  - Implementa       │
│  - Lee código        │   Dónde hacerlo            │  - Edita archivos   │
│  - Analiza opciones  │   Cómo verificar           │  - Corre pruebas    │
│  - Decide enfoque    │   Qué NO tocar             │  - Reporta resultado│
│  - Estima riesgo     │                            │                     │
│  Solo lectura        │         REPORTE            │  Lectura + escritura│
│  Modelo: haiku       │ ◂───────────────────────── │  Modelo: sonnet     │
└─────────────────────┘   Qué se hizo              └─────────────────────┘
                          Qué cambió
                          Qué falta
```

**Regla fundamental:** PLAN no escribe código. BUILD no toma decisiones de diseño.

## 2. SALA PLAN — el que piensa

### Qué hace
- Lee archivos, busca patrones, explora el codebase
- Evalúa opciones y elige la más simple
- Produce un CONTRATO con instrucciones exactas para BUILD

### Modelo recomendado
`haiku` para tareas de routing/encuadre simples.
`sonnet` cuando el análisis requiere entender lógica compleja.
`opus` solo para decisiones arquitectónicas que afectan múltiples archivos.

### Herramientas permitidas
`Read`, `Grep`, `Glob` — **nunca** `Edit`, `Write`, `Bash` destructivo.

### Formato de salida: CONTRATO

```
══════════════════════════════════════
CONTRATO PLAN → BUILD
══════════════════════════════════════

OBJETIVO:
  [Una frase: qué se logra cuando BUILD termine]

CONTEXTO:
  [Por qué se necesita este cambio — el problema o la oportunidad]

ARCHIVOS A MODIFICAR:
  1. src/routes/index.tsx (líneas 45-60)
     → Agregar importación de nuevo componente
     → Insertar <NuevoBloque /> después de <Section tone="surface">
  2. src/components/NuevoBloque.tsx (CREAR)
     → Componente con props: title: L, items: L[]
     → Usar <Section tone="background"> + <SectionHeading>

ARCHIVOS QUE NO SE TOCAN:
  - src/data/content.ts (los datos ya existen)
  - src/styles.css (no se necesitan tokens nuevos)

DECISIONES YA TOMADAS:
  - Se usa <Section> existente, no se crea layout nuevo
  - Se reutiliza FeatureCard, no se crea card nueva
  - Idioma: texto bilingüe con L, resuelto con t()

CÓDIGO EXACTO (cuando aplica):
  ```tsx
  // Lo que BUILD debe escribir, listo para copiar
  ```

VERIFICACIÓN:
  - [ ] `npm run build` pasa
  - [ ] Componente visible en / a 320px y 1920px
  - [ ] Dark mode correcto
  - [ ] Texto cambia con toggle ES/EN

RIESGO:
  [bajo | medio | alto] — [por qué]

══════════════════════════════════════
```

## 3. SALA BUILD — el que construye

### Qué hace
- Lee el CONTRATO y lo ejecuta al pie de la letra
- Si algo del contrato no funciona, **no improvisa** — reporta el conflicto
- Produce un REPORTE con lo que hizo y lo que falta

### Modelo recomendado
`sonnet` — es el motor de código más eficiente.
`haiku` solo para cambios triviales (un texto, un import).

### Herramientas permitidas
`Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`.

### Formato de salida: REPORTE

```
══════════════════════════════════════
REPORTE BUILD → PLAN
══════════════════════════════════════

ESTADO: [completado | parcial | bloqueado]

ARCHIVOS MODIFICADOS:
  1. src/routes/index.tsx — agregada importación y bloque (líneas 3, 52-58)
  2. src/components/NuevoBloque.tsx — creado (47 líneas)

VERIFICACIÓN:
  - [x] npm run build pasa
  - [x] Visible a 320px y 1920px
  - [x] Dark mode correcto
  - [ ] Toggle ES/EN — PROBLEMA: falta key "nuevoBloque" en content.ts

PROBLEMAS ENCONTRADOS:
  - El contrato decía "los datos ya existen en content.ts" pero
    no existe la key `nuevoBloque`. Necesito que PLAN decida dónde
    agregar los textos.

SIGUIENTE DECISIÓN NECESARIA:
  [Qué necesita PLAN para desbloquear]

══════════════════════════════════════
```

## 4. Flujo completo

```
1. Usuario pide algo
2. PLAN investiga y produce CONTRATO
3. Usuario revisa CONTRATO (opcional pero recomendado)
4. BUILD ejecuta el CONTRATO
5. BUILD produce REPORTE
6. Si hay bloqueo → vuelve a PLAN (paso 2)
7. Si está completo → auditoría normal
```

## 5. Cuándo usar este MOD

| Situación | ¿Usar Plan↔Build? |
|---|---|
| Cambio en un solo archivo, claro | No — ejecutar directo |
| Cambio que toca 3+ archivos | **Sí** |
| No está claro qué enfoque tomar | **Sí** — PLAN primero |
| Bug con error visible | No — fix directo |
| Feature nueva con decisiones abiertas | **Sí** |
| Refactor que puede romper cosas | **Sí** — PLAN evalúa riesgo |

## 6. Implementación en Claude Code

```
# Lanzar PLAN (agente de solo lectura)
Agent(
  description="Plan: [descripción]",
  model="haiku",  # o sonnet si es complejo
  prompt="Eres SALA PLAN. Investiga y produce un CONTRATO..."
)

# Lanzar BUILD con el contrato
Agent(
  description="Build: [descripción]",
  model="sonnet",
  prompt="Eres SALA BUILD. Ejecuta este CONTRATO: [pegar contrato]..."
)
```

## 7. Anti-patrones

- **PLAN que escribe código** → Viola la separación. PLAN propone, BUILD dispone.
- **BUILD que toma decisiones de diseño** → Si el contrato no cubre algo, BUILD reporta y espera.
- **Saltarse PLAN para "ir más rápido"** → Solo vale para cambios triviales de 1 archivo.
- **CONTRATO vago** ("mejora el componente") → El contrato debe tener archivos, líneas y verificación exacta.
