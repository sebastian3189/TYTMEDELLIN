"""Valida el perfil local sin ejecutar agentes, consumir modelos ni escribir archivos.

Gobierno: SPECS/README.md, compuerta operativa ENCUADRAR de AGENTS.md.
Requiere Python 3.11+. El frontmatter se restringe al subconjunto escalar usado
por estos adaptadores; esto no sustituye la validación de carga de Claude Code.
"""

from pathlib import Path
import sys

if sys.version_info < (3, 11):
    raise SystemExit("Requiere Python 3.11+: py -3.12 scripts/validar_adaptadores_agentes.py")

import tomllib


ROOT = Path(__file__).resolve().parents[1]
PROFILE = {
    "orquestador": ("gpt-6-luna", "medium", "haiku", "Read, Grep, Glob"),
    "director-diseno-marca": (
        "gpt-6.1-sol", "high", "sonnet", "Read, Grep, Glob, Edit, Write, Bash"
    ),
    "constructor-producto": (
        "gpt-6.1-sol", "medium", "sonnet", "Read, Grep, Glob, Edit, Write, Bash"
    ),
    "auditor-calidad": ("gpt-6.1-sol", "high", "sonnet", "Read, Grep, Glob, Bash"),
}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def frontmatter(path):
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    require(lines and lines[0] == "---", f"{path}: falta frontmatter")
    end = lines.index("---", 1)
    fields = {}
    for line in lines[1:end]:
        key, separator, value = line.partition(": ")
        require(separator and key not in fields, f"{path}: campo invalido o duplicado")
        require(key.isidentifier() and value.strip(), f"{path}: campo vacio o invalido")
        # No listas YAML, valores entrecomillados, multilínea ni mapas implícitos.
        require(
            not value.startswith(("[", "{", "|", ">", "'", '"')) and ": " not in value,
            f"{path}: valor fuera del subconjunto escalar permitido",
        )
        fields[key] = value
    return fields, "\n".join(lines[end + 1:])


def validate():
    for directory, extension in ((".codex", ".toml"), (".claude", ".md")):
        found = {path.stem for path in (ROOT / directory / "agents").glob(f"*{extension}")}
        require(found == set(PROFILE), f"{directory}: roles faltantes o adicionales")

    entry = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
    require("@AGENTS.md" in (ROOT / "CLAUDE.md").read_text(encoding="utf-8"), "CLAUDE.md: falta entrada compartida")
    for role, (model, effort, alias, tool_list) in PROFILE.items():
        shared = ROOT / "agents" / f"{role}.md"
        require(shared.is_file(), f"{role}: instrucciones compartidas inexistentes")
        require(
            f"| `{role}` | `{model}` | `{effort}` | `{alias}` |" in entry,
            f"{role}: tabla de AGENTS.md no coincide con el perfil",
        )
        codex_path = ROOT / ".codex" / "agents" / f"{role}.toml"
        with codex_path.open("rb") as source:
            codex = tomllib.load(source)
        expected_keys = {"name", "description", "model", "model_reasoning_effort", "developer_instructions"}
        if role == "orquestador":
            expected_keys.add("sandbox_mode")
            require(codex.get("sandbox_mode") == "read-only", "orquestador: debe ser solo lectura")
        require(set(codex) == expected_keys, f"{role}: campos Codex inesperados o faltantes")
        require(codex["name"] == role, f"{role}: name Codex incorrecto")
        require(codex["model"] == model and codex["model_reasoning_effort"] == effort, f"{role}: perfil Codex incorrecto")
        require(bool(codex["description"].strip()), f"{role}: description Codex vacia")

        claude_path = ROOT / ".claude" / "agents" / f"{role}.md"
        claude, body = frontmatter(claude_path)
        require(set(claude) == {"name", "description", "model", "tools"}, f"{role}: campos Claude inesperados o faltantes")
        require(claude["name"] == role and claude["model"] == alias, f"{role}: perfil Claude incorrecto")
        require(claude["tools"] == tool_list, f"{role}: herramientas Claude incorrectas")
        shared_fields, _ = frontmatter(shared)
        require(shared_fields["tools"] == tool_list, f"{role}: herramientas compartidas no coinciden")
        for instructions in (codex["developer_instructions"], body):
            require("AGENTS.md" in instructions and f"agents/{role}.md" in instructions, f"{role}: falta referencia compartida")
            require("permisos y restricciones" in instructions and "sin autorización" in instructions, f"{role}: falta restriccion de permisos o escalacion")
        print(f"OK {role}: Codex {model}/{effort}; Claude {alias}; referencias y restricciones")

    print("OK: 8 adaptadores. Validacion estatica; carga y disponibilidad real pendientes.")


if __name__ == "__main__":
    try:
        validate()
    except (OSError, ValueError, KeyError, tomllib.TOMLDecodeError) as error:
        raise SystemExit(f"ERROR: {error}") from error
