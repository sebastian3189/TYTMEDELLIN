# Entrada para Claude Code — T&T Medellín

@AGENTS.md

Lee el archivo correspondiente de `agents/` antes de asumir un rol y las skills
locales indicadas por ese rol. Los cuatro adaptadores de `.claude/agents/` registran
los roles compartidos y el perfil Haiku/Sonnet autorizado en `AGENTS.md`; la sesión
principal conserva su modelo. Invoca el tipo nativo correspondiente cuando esté
disponible y aporta el contexto necesario. Si no se carga el adaptador o la cuenta
no ofrece el modelo, declara la limitación sin afirmar que se aplicó el perfil.
No dupliques las instrucciones compartidas ni cambies permisos o ajustes globales.
