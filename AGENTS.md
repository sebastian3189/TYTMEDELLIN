# Flujo obligatorio de trabajo — T&T Medellín

Este archivo es la única puerta de entrada. No se crean roles, specs o skills
adicionales para una tarea que ya cabe aquí. Los adaptadores nativos de `.codex/agents/`
y `.claude/agents/` registran los mismos cuatro roles; no añaden responsabilidades.

## Selección automática

### Modelo y compatibilidad entre herramientas

- Los cuatro archivos de `agents/` son instrucciones de roles compartidas, no un
  registro nativo universal de subagentes. Lee el archivo del rol antes de actuar.
- Las instrucciones de `agents/` siguen compartidas y no fijan proveedor. Los
  modelos se configuran únicamente en los adaptadores nativos, conforme al perfil
  equilibrado autorizado por el usuario. La sesión principal conserva su modelo.
- Invocar el adaptador del rol cuando la herramienta permita tipos nativos. No
  enviar identificadores OpenAI a Claude ni alias Claude a Codex. Si la sesión no
  puede cargar esos adaptadores, usar herencia y declarar esa limitación; no afirmar
  que se aplicó el perfil. No cambiar ajustes globales ni permisos de la sesión.
- No deducir ni inventar el identificador exacto del modelo. Si la herramienta no
  lo expone, indicar «modelo de la sesión; identificador no disponible».
- El rol determina el trabajo y las verificaciones. Una escalación fuera del perfil
  requiere autorización del usuario y disponibilidad real; Astra y Opus no son
  valores predeterminados. Si falla un modelo, informar antes de sustituirlo por
  uno más costoso. Usar solo los roles y el contexto necesarios para la tarea.
- Al iniciar una tarea, indicar brevemente el rol y el modelo efectivo si la
  herramienta lo expone; distinguir siempre modelo configurado de modelo efectivo.
  No afirmar que un subagente se ejecutó si solo se leyeron sus instrucciones.
- `CLAUDE.md` importa esta misma entrada para Claude Code. No duplicar specs,
  skills ni instrucciones de marca por proveedor. Si no hay delegación disponible,
  dejar la revisión independiente pendiente, sin simularla.

### Perfil equilibrado por rol

| Rol | Codex | Razonamiento Codex | Claude Code |
|---|---|---|---|
| `orquestador` | `gpt-6-luna` | `medium` | `haiku` |
| `director-diseno-marca` | `gpt-6.1-sol` | `high` | `opus` |
| `constructor-producto` | `gpt-6.1-sol` | `medium` | `sonnet` |
| `auditor-calidad` | `gpt-6.1-sol` | `high` | `opus` |

Haiku se limita al encuadre y selección de trabajo (solo lectura). Sonnet concentra
la implementación de código, donde es el modelo más eficiente. Opus se reserva para
los roles de juicio crítico: decisiones de diseño que cascadean al producto completo
y auditoría final que debe encontrar lo que otros no vieron. El razonamiento `high`
de Codex se mapea a Opus, no a Sonnet, porque Claude Code no tiene parámetro de
razonamiento separado — el modelo es el nivel de capacidad. Los alias de Claude se
resuelven según la instalación y cuenta; no representan versiones fijadas.

Los adaptadores ordenan leer `AGENTS.md` y `agents/{rol}.md` antes de actuar, y
conservan las restricciones del rol y los permisos heredados. Solo el orquestador
Codex añade `sandbox_mode = "read-only"` para restringir el encuadre. El auditor
puede ejecutar pruebas autorizadas, pero no editar el producto ni corregir su propia
revisión. La configuración no acredita su carga en esta sesión ni acceso a modelos.
Validación estática reproducible: `py -3.12 scripts/validar_adaptadores_agentes.py`
(Windows; requiere Python 3.11+). También admite `python` si apunta a esa versión.
No consume modelos y no sustituye una prueba en cada herramienta.

Fuentes del perfil y formato, consultadas el 2026-10-11:
[subagentes Codex](https://learn.chatgpt.com/docs/agent-configuration/subagents),
[modelos OpenAI](https://developers.openai.com/api/docs/models),
[subagentes Claude Code](https://code.claude.com/docs/en/sub-agents).
Referencia de gobierno: `SPECS/README.md`; compuerta operativa ENCUADRAR y revisión
independiente de la configuración antes de CERRAR.

| Si la tarea cambia… | Agente responsable | Skill obligatoria | Spec |
|---|---|---|---|
| marca, logo, color, tipografía, layout, imagen o movimiento | `director-diseno-marca` | `tt-marca-diseno` | 01 y 03 |
| video, storyboard o cualquier consumo Higgsfield | `director-diseno-marca` | `tt-higgsfield-control` y `tt-marca-diseno` | 03 |
| contenido, servicios, experiencias, CTA o cotización | `constructor-producto` | `tt-contenido-conversion` | 02 |
| rutas, componentes, formularios, backend o integraciones | `constructor-producto` | `tt-construccion-segura` | 04 |
| revisión, accesibilidad, SEO, rendimiento, analítica o publicación | `auditor-calidad` | `tt-calidad-lanzamiento` | 05 y 06 |
| varias categorías o alcance incierto | `orquestador` | solo las skills de las filas aplicables | README |

## Secuencia sin excepción

```text
1. ENCUADRAR   orquestador identifica spec, skill, dueño y criterio de aceptación
2. DISEÑAR     director actúa solo si cambia la experiencia visual o audiovisual
3. CONSTRUIR   constructor implementa contenido, UI e integraciones aprobadas
4. AUDITAR     auditor prueba y emite hallazgos con evidencia
5. CORREGIR    el dueño original corrige
6. CERRAR      auditor verifica la corrección y aprueba o rechaza
```

No se salta diseño cuando una decisión visual está abierta. Nadie aprueba su propio
trabajo. Un único agente escribe cada archivo por ronda. El trabajo paralelo solo se
permite en archivos disjuntos o revisiones de solo lectura.

## Reglas transversales

- Alcance: T&T Medellín.
- Datos faltantes: `PENDIENTE CLIENTE`; nunca inventar.
- Todo cambio cita el spec y la compuerta que satisface.
- Toda entrega indica archivos, pruebas, pendientes y siguiente decisión.
- Higgsfield requiere reserva previa en el hook; límite absoluto 200 créditos.
- No reescribir historia Git publicada ni publicar sin solicitud expresa.

