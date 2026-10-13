ARCHIVADO
name: tt-trabajo-paralelo
description: Protocolo de coordinación para que varios agentes trabajen a la vez sin pisarse — propiedad de archivos, archivos calientes, orden de ejecución, formato de entrega entre agentes y resolución de conflictos. Úsala SIEMPRE antes de lanzar o participar en trabajo simultáneo de varios agentes. Consulta CLAUDE1.MD para la estructura de archivos del proyecto.
---

# Skill — Trabajo paralelo

## 1. Principio: propiedad de archivos

Cada archivo tiene **un dueño**. Solo el dueño escribe en él. Si otro agente necesita un cambio en archivo ajeno, entrega el bloque al dueño con el formato de la sección 4.

### Asignaciones típicas

| Dueño | Archivos |
|---|---|
| `director-diseno-marca` | Specs de identidad, conceptos, tokens visuales y entregables de dirección creativa |
| `copy-bilingue` | Archivos de contenido y textos de UI |
| `arquitecto-informacion` | Archivos de datos estructurales (modelo de datos) |
| `constructor-secciones` | `src/routes/*.tsx`, `src/components/` (excepto `ui/`) |
| `especialista-conversion` | Rutas y componentes transaccionales |
| `guardian-design-system` | `src/styles.css`, componentes de layout (`Section.tsx`) |
| NADIE — autogenerado | `routeTree.gen.ts`, `src/components/ui/` |

> Consulta `CLAUDE1.MD` para los archivos específicos del proyecto y sus dueños.

## 2. Archivos calientes

Los archivos de datos compartidos (contenido, UI, estructura) son **calientes**: muchos agentes los necesitan pero solo uno puede escribir por ronda.

**Regla:** solo un agente escribe en un archivo caliente por ronda. Las ediciones se consolidan — no se lanzan dos agentes que escriban en el mismo archivo al mismo tiempo.

## 3. Orden de ejecución (5 fases)

```
1. IDENTIDAD     → director-diseno-marca (si toca marca, interfaz, imagen o movimiento)
                    [SECUENCIAL — el concepto se aprueba antes de construir]

2. DECIDIR       → arquitecto-informacion (si hay cambio estructural)
                    [SECUENCIAL — todo lo demás espera]

3. REDACTAR      → copy-bilingue (todos los textos de la historia)
                    [SECUENCIAL — evita conflictos en archivos calientes]

4. CONSTRUIR     → constructor-secciones ‖ especialista-conversion
                    [PARALELO — zonas de archivo disjuntas]

5. AUDITAR       → guardian-design-system ‖ revisor-i18n ‖ especialista-seo
                    ‖ especialista-rendimiento ‖ especialista-seguridad
                    [PARALELO — todos son de solo lectura]

6. CERRAR        → qa-entrega (veredicto único)
                    [SECUENCIAL]
```

### Cuándo paralelizar

- **Sí:** cuando las zonas de archivo son disjuntas O cuando todos los agentes son de solo lectura (fase 4).
- **No:** cuando dos agentes escriben en el mismo archivo. Ni cuando estructura aún se está decidiendo (fases 1-2).

## 4. Formato de entrega entre agentes

Cuando un agente necesita que otro haga un cambio en su zona:

```
PARA:       nombre-del-agente-dueño
ARCHIVO:    ruta/al/archivo.ts
UBICACIÓN:  después de la línea N / dentro del objeto X / al final del array Y
MOTIVO:     por qué se necesita este cambio
BLOQUE:
```ts
// código o contenido exacto a insertar
```
```

El dueño revisa, aprueba e inserta. No se inserta sin revisión.

## 5. Resolución de conflictos

Si dos agentes proponen cambios incompatibles en el mismo archivo:

1. El **orquestador** decide quién tiene prioridad.
2. El agente con menor prioridad adapta su propuesta.
3. Se documenta la decisión.

## 6. Checklist antes de lanzar trabajo paralelo

- [ ] Identificar la fase actual (1-5)
- [ ] Verificar que no hay dos agentes escribiendo en el mismo archivo
- [ ] Confirmar que los archivos calientes no tienen ediciones pendientes de consolidar
- [ ] Cada agente sabe en qué archivos puede escribir y en cuáles no
