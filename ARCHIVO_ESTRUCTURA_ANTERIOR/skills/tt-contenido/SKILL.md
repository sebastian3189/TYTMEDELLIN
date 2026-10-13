ARCHIVADO
name: tt-contenido
description: Cómo añadir y editar contenido bilingüe ES/EN — el tipo L, dónde vive cada dato, los tipos existentes y las reglas de coherencia. Úsala al agregar textos, secciones nuevas o datos de cualquier tipo. Consulta CLAUDE1.MD para los tipos específicos del proyecto.
---

# Skill — Contenido bilingüe ES/EN

## 1. El tipo `L`

```ts
export type L = { es: string; en: string };
```

Se resuelve con `useI18n()` → `t(valor)`. Idioma guardado en `localStorage`, por defecto español.

## 2. Dónde vive cada dato

Consulta `CLAUDE1.MD` §4 para la lista exacta de archivos de datos. Patrón general:

| Archivo | Contiene |
|---|---|
| `src/data/content.ts` | Datos del negocio: cifras, valores, equipo, hitos, testimonios, servicios, copy narrativo |
| `src/data/ui.ts` | Textos de interfaz: nav, cta, labels, form, footer, contacto, y el array `navLinks` |
| Archivos de datos adicionales | Datos específicos del proyecto (consulta CLAUDE1.MD) |

## 3. Reglas al añadir contenido

1. **Siempre `L` con `es` y `en`.** Ningún `en: ""`. Ningún texto plano donde debería haber `L`.
2. **Coherencia numérica.** Si una cifra aparece en varios sitios (ej. años de experiencia, número de ciudades), debe coincidir en todos. Busca antes de escribir.
3. **Nada inventado sobre datos duros.** Si no conoces un dato, deja `// TODO(cliente): …` y no rellenes.
4. **Longitudes controladas.** Títulos ≤ 60 car. Subtítulos ≤ 160. Descripciones de card ≤ 220.
5. **El inglés se reescribe, no se calca.** Debe sonar natural, no como traducción de máquina.
6. **Sin signos de exclamación en cadena, sin emojis, sin MAYÚSCULAS de énfasis.**

## 4. Nombres de clave

- `camelCase` para claves de objeto.
- Clave descriptiva y estable: `heroTitle`, no `titulo1`.
- Si la clave ya existe, reutílzala; no crees sinónimos.

## 5. Contenido transaccional

Si el proyecto tiene páginas de venta (consulta `CLAUDE1.MD`), las entidades de producto/servicio llevan:
- `name: L` — nombre del producto/servicio
- `description: L` — descripción breve
- `duration: L` — duración (si aplica)
- `highlights: L[]` — puntos destacados
- `image: string` — imagen representativa

La estructura exacta de los tipos depende del proyecto — consulta los archivos de datos.
