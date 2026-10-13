---
name: tt-mapa-agentes
description: Mapa visual de los agentes del proyecto — qué hace cada uno, qué archivos toca, qué herramientas usa, con quién se conecta. Genera diagramas ASCII para ver el sistema de un vistazo. Úsala para entender o explicar la arquitectura de agentes.
---

# MOD — Mapa visual de agentes

## 1. Vista general del sistema

```
                          ┌─────────────────┐
                          │   ORQUESTADOR   │
                          │   modelo: haiku │
                          │   solo lectura  │
                          └────────┬────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
          ┌─────────────┐ ┌──────────────┐ ┌────────────┐
          │  DIRECTOR   │ │ CONSTRUCTOR  │ │  AUDITOR   │
          │   DISEÑO    │ │  PRODUCTO    │ │  CALIDAD   │
          │ modelo:opus │ │modelo:sonnet │ │ modelo:opus│
          │ lee+escribe │ │ lee+escribe  │ │ solo lee   │
          └─────────────┘ └──────────────┘ └────────────┘
```

## 2. Fichas de cada agente

### ORQUESTADOR

```
╔══════════════════════════════════════════════════════════════╗
║  ORQUESTADOR                                    haiku      ║
╠══════════════════════════════════════════════════════════════╣
║                                                             ║
║  QUÉ HACE        Recibe la solicitud, identifica el spec,  ║
║                  elige el dueño y define la prueba de       ║
║                  cierre. No implementa nada.                ║
║                                                             ║
║  ENTRADA         Solicitud del usuario                      ║
║                                                             ║
║  SALIDA          OBJETIVO / SPEC / DUEÑO / SKILL /          ║
║                  ARCHIVOS / PRUEBA DE CIERRE                ║
║                                                             ║
║  HERRAMIENTAS    Read · Grep · Glob                         ║
║                  (nunca Edit, Write ni Bash)                ║
║                                                             ║
║  LEE             AGENTS.md · SPECS/README.md · CLAUDE1.MD  ║
║                                                             ║
║  ESCRIBE         Nada                                       ║
║                                                             ║
║  SE CONECTA CON  → Director (si hay cambio visual)         ║
║                  → Constructor (si hay implementación)      ║
║                  → Auditor (siempre, al final)              ║
║                                                             ║
║  ANALOGÍA        📋 El jefe de proyecto que reparte         ║
║                  el trabajo pero no toca el código           ║
║                                                             ║
╚══════════════════════════════════════════════════════════════╝
```

### DIRECTOR DE DISEÑO Y MARCA

```
╔══════════════════════════════════════════════════════════════╗
║  DIRECTOR DISEÑO Y MARCA                        opus       ║
╠══════════════════════════════════════════════════════════════╣
║                                                             ║
║  QUÉ HACE        Diseña la identidad visual, protege la    ║
║                  marca, decide colores, tipografía,         ║
║                  layout, fotografía y movimiento.           ║
║                  Controla el uso de Higgsfield (video).     ║
║                                                             ║
║  ENTRADA         Encuadre del orquestador + specs 01, 03   ║
║                                                             ║
║  SALIDA          Concepto visual + decisiones + activos +   ║
║                  comportamiento móvil + criterio aprobación ║
║                                                             ║
║  HERRAMIENTAS    Read · Grep · Glob · Edit · Write · Bash  ║
║                                                             ║
║  LEE             specs 01, 03 · src/styles.css              ║
║                  CLAUDE1.MD §3 (sistema de diseño)          ║
║                                                             ║
║  ESCRIBE         src/styles.css (tokens)                    ║
║                  src/components/Section.tsx (layout)         ║
║                  Activos visuales                            ║
║                                                             ║
║  SE CONECTA CON  ← Orquestador (recibe encuadre)           ║
║                  → Constructor (entrega diseño aprobado)    ║
║                  ← Auditor (recibe hallazgos visuales)      ║
║                                                             ║
║  ANALOGÍA        🎨 El director de arte que decide cómo    ║
║                  se ve todo antes de que se construya        ║
║                                                             ║
║  RESTRICCIÓN     No aprueba su propio diseño.               ║
║                  No ejecuta Higgsfield sin reserva.          ║
║                                                             ║
╚══════════════════════════════════════════════════════════════╝
```

### CONSTRUCTOR DE PRODUCTO

```
╔══════════════════════════════════════════════════════════════╗
║  CONSTRUCTOR DE PRODUCTO                        sonnet      ║
╠══════════════════════════════════════════════════════════════╣
║                                                             ║
║  QUÉ HACE        Implementa el código: rutas, componentes, ║
║                  contenido bilingüe, formularios, CTA,      ║
║                  integraciones, responsive, estados.         ║
║                  Es el que más código escribe.               ║
║                                                             ║
║  ENTRADA         Diseño aprobado + encuadre + spec vigente  ║
║                                                             ║
║  SALIDA          Archivos cambiados + decisiones aplicadas  ║
║                  + pruebas ejecutadas + pendientes           ║
║                                                             ║
║  HERRAMIENTAS    Read · Grep · Glob · Edit · Write · Bash  ║
║                                                             ║
║  LEE             El spec que gobierna la tarea               ║
║                  CLAUDE1.MD (stack, modelo de contenido)     ║
║                                                             ║
║  ESCRIBE         src/routes/*.tsx (páginas)                  ║
║                  src/components/*.tsx (UI)                    ║
║                  src/data/*.ts (contenido, sedes)            ║
║                  src/lib/*.ts (utilidades)                    ║
║                                                             ║
║  SE CONECTA CON  ← Orquestador (recibe encuadre)           ║
║                  ← Director (recibe diseño aprobado)        ║
║                  → Auditor (entrega para revisión)           ║
║                  ← Auditor (recibe correcciones)             ║
║                                                             ║
║  ANALOGÍA        🔨 El desarrollador que escribe el código  ║
║                  siguiendo el diseño aprobado                ║
║                                                             ║
║  RESTRICCIÓN     No declara terminado — eso lo hace          ║
║                  el auditor. No inventa datos.               ║
║                                                             ║
╚══════════════════════════════════════════════════════════════╝
```

### AUDITOR DE CALIDAD

```
╔══════════════════════════════════════════════════════════════╗
║  AUDITOR DE CALIDAD                             opus        ║
╠══════════════════════════════════════════════════════════════╣
║                                                             ║
║  QUÉ HACE        Revisa todo lo que el constructor entrega. ║
║                  Prueba responsive, a11y, SEO, rendimiento, ║
║                  seguridad, idiomas, temas. Clasifica bugs   ║
║                  por severidad (P0–P3). Es el ÚNICO que      ║
║                  puede cerrar una tarea.                      ║
║                                                             ║
║  ENTRADA         Entrega del constructor                     ║
║                                                             ║
║  SALIDA          Hallazgos con evidencia:                    ║
║                  [P0|P1|P2|P3] archivo — evidencia →         ║
║                  criterio incumplido → corrección             ║
║                                                             ║
║  HERRAMIENTAS    Read · Grep · Glob · Bash                  ║
║                  (puede correr tests, NUNCA editar código)   ║
║                                                             ║
║  LEE             specs 05, 06 · checklists de QA            ║
║                  Todo el código entregado                     ║
║                                                             ║
║  ESCRIBE         Nada del producto                           ║
║                  (solo reportes de hallazgos)                ║
║                                                             ║
║  SE CONECTA CON  ← Constructor (recibe entrega)             ║
║                  → Constructor (devuelve hallazgos P0/P1)   ║
║                  → Orquestador (escala si hay bloqueo)       ║
║                                                             ║
║  ANALOGÍA        🔍 El inspector de calidad que no deja      ║
║                  pasar nada roto a producción                ║
║                                                             ║
║  RESTRICCIÓN     No edita el producto. No corrige su         ║
║                  propia revisión. No aprueba lo que el       ║
║                  constructor no haya corregido.               ║
║                                                             ║
╚══════════════════════════════════════════════════════════════╝
```

## 3. Flujo visual completo

```
  USUARIO
    │
    ▼
┌─────────┐    encuadre     ┌──────────┐   diseño     ┌─────────────┐
│ORQUESTA-│ ──────────────▸ │ DIRECTOR │ ───────────▸ │ CONSTRUCTOR │
│  DOR    │                 │  DISEÑO  │              │  PRODUCTO   │
│ (haiku) │                 │  (opus)  │              │  (sonnet)   │
└─────────┘                 └──────────┘              └──────┬──────┘
                                                             │
                                                      entrega│
                                                             ▼
                                                      ┌────────────┐
                                                      │  AUDITOR   │
                                                      │  CALIDAD   │
                                                      │   (opus)   │
                                                      └──────┬─────┘
                                                             │
                                          ┌──────────────────┼────────┐
                                          │                  │        │
                                     P0/P1 hay          todo OK   P2 con
                                     bugs                         fecha
                                          │                  │        │
                                          ▼                  ▼        ▼
                                    CONSTRUCTOR          CERRADO   BACKLOG
                                    corrige y
                                    re-entrega
```

## 4. Mapa de archivos por agente

```
src/
├── routes/           ← CONSTRUCTOR escribe, AUDITOR lee
│   ├── index.tsx
│   ├── historia.tsx
│   ├── equipo.tsx
│   ├── valores.tsx
│   ├── servicios.tsx
│   ├── contacto.tsx
│   ├── sedes.index.tsx
│   └── sedes.$slug.tsx
│
├── components/       ← CONSTRUCTOR escribe, DIRECTOR revisa diseño
│   ├── Section.tsx        ← DIRECTOR puede editar (layout)
│   ├── cards/
│   └── ui/                ← NADIE (autogenerado shadcn)
│
├── data/             ← CONSTRUCTOR escribe contenido
│   ├── content.ts
│   ├── sedes.ts
│   └── ui.ts
│
├── styles.css        ← DIRECTOR escribe tokens, CONSTRUCTOR consume
│
├── i18n/             ← CONSTRUCTOR usa, no modifica estructura
│
└── lib/              ← CONSTRUCTOR escribe utilidades
```

## 5. Cuándo consultar este mapa

- **"¿Quién debería hacer esto?"** → Mira la sección 2, columna QUÉ HACE
- **"¿Este agente puede tocar este archivo?"** → Mira la sección 4
- **"¿En qué orden van?"** → Mira la sección 3
- **"¿Por qué este agente usa opus y no sonnet?"** → Mira AGENTS.md, perfil equilibrado
