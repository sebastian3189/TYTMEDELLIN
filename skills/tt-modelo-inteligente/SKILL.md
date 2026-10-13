---
name: tt-modelo-inteligente
description: Routing inteligente de modelos — clasifica cada tarea por dificultad y asigna el modelo más barato que pueda resolverla bien. Haiku para lo fácil, sonnet para código, opus solo cuando el juicio crítico lo justifica. Úsala antes de lanzar cualquier agente.
---

# MOD — Modelo inteligente

## 1. Principio: no uses un cañón para matar una mosca

```
    DIFICULTAD DE LA TAREA          MODELO         COSTO RELATIVO
  ┌─────────────────────────┐
  │                         │
  │  Decisión arquitectónica│──────▸  opus          $$$$
  │  Auditoría de seguridad │
  │  Diseño de marca        │
  │                         │
  ├─────────────────────────┤
  │                         │
  │  Escribir componente    │──────▸  sonnet        $$
  │  Implementar ruta       │
  │  Refactor de código     │
  │  Fix de bug complejo    │
  │                         │
  ├─────────────────────────┤
  │                         │
  │  Buscar un archivo      │──────▸  haiku         $
  │  Cambiar un texto       │
  │  Agregar un import      │
  │  Leer y resumir         │
  │  Routing de tareas      │
  │                         │
  └─────────────────────────┘
```

## 2. Tabla de clasificación rápida

### HAIKU ($) — Tareas mecánicas y de routing

| Tarea | Por qué haiku basta |
|---|---|
| Buscar dónde se define un componente | Solo Grep/Glob, cero razonamiento |
| Cambiar un texto en content.ts | Localizar key, reemplazar string |
| Agregar un import a un archivo | Una línea, sin decisión |
| Listar archivos que usan X | Grep + formatear resultado |
| Verificar si un archivo existe | Glob, respuesta sí/no |
| Encuadrar una tarea (orquestador) | Clasificar y asignar, template fijo |
| Renombrar una variable | Find & replace mecánico |
| Contar ocurrencias de un patrón | Grep count |
| Leer un archivo y resumir | Lectura + síntesis simple |
| Verificar que build pasa | Bash `npm run build`, interpretar salida |

### SONNET ($$) — Código y lógica

| Tarea | Por qué sonnet |
|---|---|
| Crear un componente React nuevo | Necesita entender el sistema de diseño |
| Implementar una ruta con head() | Código + SEO + i18n |
| Escribir lógica de formulario | Validación, estados, UX |
| Hacer responsive un componente | Breakpoints, grid, overflow |
| Corregir un bug con stack trace | Razonamiento sobre flujo de datos |
| Refactorizar código duplicado | Entender patrones, extraer abstracciones |
| Implementar dark mode en un bloque | Tokens semánticos, contraste |
| Agregar i18n a textos hardcodeados | Crear objetos L, usar t() |
| Escribir un script de Python | Lógica completa, manejo de errores |
| Integrar una API externa | Fetch, tipos, error handling |

### OPUS ($$$$) — Juicio crítico y decisiones irreversibles

| Tarea | Por qué solo opus |
|---|---|
| Decidir la arquitectura de una feature | Afecta todo lo que viene después |
| Auditoría de accesibilidad completa | Necesita encontrar lo que otros no ven |
| Revisión de seguridad | Un fallo = vulnerabilidad en producción |
| Decisiones de marca/identidad | Subjetivo, cascadea al producto completo |
| Evaluar trade-offs de rendimiento | Bundle size vs UX vs mantenimiento |
| Resolver conflictos entre agentes | Juicio sobre prioridades |
| Revisar código de otro agente | Debe ser más capaz que el autor |
| Diseño de modelo de datos | Estructura que no se puede cambiar fácil |
| Decisión sobre qué NO construir | Decir "no" requiere más juicio que decir "sí" |

## 3. Reglas de escalación

```
EMPEZAR SIEMPRE POR EL MODELO MÁS BARATO POSIBLE

  haiku ──────────────────────────────────────▸ sonnet
         Escalar cuando:
         - La tarea requiere escribir >10 líneas de código
         - Hay que entender contexto de múltiples archivos
         - El resultado de haiku tiene errores o es pobre
         - Hay decisiones de diseño (no solo mecánica)

  sonnet ─────────────────────────────────────▸ opus
          Escalar cuando:
          - La decisión es irreversible o de alto impacto
          - Se necesita encontrar bugs sutiles
          - Hay ambigüedad que requiere juicio experto
          - Sonnet falló o produjo algo mediocre
          - Es la revisión final antes de publicar

  opus ────────────────────────────────────────▸ NUNCA más arriba
         Opus es el techo. Si opus no puede, es un
         problema del prompt, no del modelo.
```

### Regla de oro: escalar por evidencia, no por miedo

```
MAL:  "Por si acaso uso opus para todo"
      → Caro, lento, innecesario

BIEN: "Empiezo con haiku. Si la respuesta es pobre, escalo a sonnet.
       Si necesito juicio crítico, escalo a opus."

MAL:  "Uso haiku para todo y ahorro"
      → Bugs, código pobre, retrabajo

BIEN: "Haiku para lo mecánico, sonnet para código,
       opus para las decisiones que importan."
```

## 4. Asignación por fase del proyecto

```
FASE                        MODELO POR DEFECTO    ESCALAR A
─────────────────────────────────────────────────────────────
1. ENCUADRAR                haiku                 sonnet si ambiguo
2. DISEÑAR                  opus                  (ya es el máximo)
3. CONSTRUIR
   ├── Contenido/textos     haiku                 sonnet si redacción
   ├── Componentes/rutas    sonnet                opus si arquitectural
   └── Integraciones        sonnet                opus si seguridad
4. AUDITAR                  opus                  (ya es el máximo)
5. CORREGIR                 sonnet                (fixes del constructor)
6. CERRAR                   haiku                 sonnet si verificación
```

## 5. Cómo aplicar en Claude Code

### Al lanzar un agente
```
# Tarea fácil → haiku
Agent(model="haiku", prompt="Busca dónde se define navLinks...")

# Tarea de código → sonnet
Agent(model="sonnet", prompt="Crea el componente NuevoBloque...")

# Tarea de juicio → opus
Agent(model="opus", prompt="Revisa la seguridad del formulario...")
```

### Al delegar desde el orquestador
```
CONTRATO:
  TAREA: Agregar link "Vehículos" a navLinks
  CLASIFICACIÓN: mecánica (cambiar un array)
  MODELO RECOMENDADO: haiku
  JUSTIFICACIÓN: Es un push a un array, sin decisión de diseño
```

```
CONTRATO:
  TAREA: Implementar página /vehiculos con galería de flota
  CLASIFICACIÓN: implementación compleja (ruta + componentes + datos)
  MODELO RECOMENDADO: sonnet
  JUSTIFICACIÓN: Código nuevo, múltiples archivos, responsive + i18n
```

```
CONTRATO:
  TAREA: Decidir si /vehiculos debe existir como ruta propia
         o como sección dentro de /servicios
  CLASIFICACIÓN: decisión arquitectónica irreversible
  MODELO RECOMENDADO: opus
  JUSTIFICACIÓN: Afecta navegación, SEO, estructura de datos
```

## 6. Estimación de ahorro

Distribución típica de tareas en un sprint:

```
  60% mecánicas/simples ──▸ haiku ($)      en vez de sonnet ($$)
  30% código/lógica     ──▸ sonnet ($$)    se queda igual
  10% juicio crítico    ──▸ opus ($$$$)    antes era sonnet ($$)

  RESULTADO: el 60% más común cuesta menos.
  El 10% más importante se hace mejor.
  Neto: menor costo total Y mayor calidad donde importa.
```

## 7. Checklist antes de elegir modelo

- [ ] ¿La tarea es una búsqueda o cambio mecánico? → **haiku**
- [ ] ¿Necesito escribir código nuevo con lógica? → **sonnet**
- [ ] ¿La decisión es irreversible o afecta muchos archivos? → **opus**
- [ ] ¿Es una revisión de algo que otro agente hizo? → **opus**
- [ ] ¿Es un fix puntual de un bug reportado? → **sonnet**
- [ ] ¿Es clasificar/encuadrar/routing? → **haiku**
- [ ] ¿Es redacción de textos bilingües? → **sonnet**
- [ ] ¿Es verificar que un build pasa? → **haiku**
