# ARCHIVADO — Spec 07 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `guardian-design-system`
**Depende de:** [`04_spec_design_system.md`](04_spec_design_system.md) · [`06_spec_modulo_venta_sedes.md`](06_spec_modulo_venta_sedes.md)

> ## ✅ IMPLEMENTADO — 2026-08-10
>
> | Problema | Estado |
> |---|---|
> | **R1** botones de icono a 36 px | ✅ `size="icon-lg"` → 44×44 |
> | **R13** enlaces de footer a 17 px | ✅ `inline-flex min-h-11` |
> | CTA píldora a 36 px (hallazgo nuevo) | ✅ `min-h-11` en los 8 archivos |
> | **R4/R5** menú móvil | ✅ `Escape` cierra **y devuelve el foco al botón**; `aria-controls` añadido. Verificado: 7 enlaces → 0, foco correcto |
> | **R6** indicador de página activa | ✅ Fondo `bg-accent` + `aria-current="page"`, ya no depende solo del peso |
> | **R8** `scale` con movimiento reducido | ✅ Salvaguarda global en `styles.css` |
> | **R11** errores de formulario | ✅ 5 campos con `aria-invalid` y 5 mensajes junto al campo. Verificado en ejecución |
> | **R12** saltar al contenido | ✅ Primer elemento enfocable, `main` con `id="contenido"` |
>
> ### Barrido final: **96/96 sin desborde** (12 rutas × 8 anchos), **12/12 con un solo `h1`**, 0 errores de consola.
>
> **Dos matices honestos:**
> 1. El enlace "política de tratamiento" mide 15 px de alto. Va **dentro de una frase**, y WCAG SC 2.5.8 exime explícitamente los enlaces en línea. Se deja así a propósito.
> 2. Un barrido intermedio dio falsos positivos de `IMG` desbordando: eran **artefacto de medir a 160 ms**, con el layout sin asentar. Con 600 ms desaparecen. Queda anotado como lección de método.
>
> ### Segunda ronda — 2026-08-10 (tarde)
>
> | | Resultado |
> |---|---|
> | **R7** contraste del eyebrow | ✅ **RESUELTO**: 2,53:1 → **5,13:1** en claro y **7,31:1** en oscuro, con el token `--primary-text` |
> | Barrido responsive | ✅ **96/96 sin desborde** tras añadir LegalBar, FAQ y misión/visión |
> | `<h1>` por página | ✅ 12/12 |
> | FAQ accesible | ✅ 8 preguntas con `aria-expanded`, trigger a `min-h-11` |
>
> **Pendiente:** recorrido completo con teclado en las 12 rutas.

**Norma de referencia:** WCAG 2.1 nivel AA

---

## 1. Posición

El responsive y la accesibilidad **no son una fase final ni un "nice to have"**. Son criterio de aceptación de toda historia del backlog. Una pantalla que desborda a 320 px o que no se puede usar con teclado no está terminada, por bonita que se vea a 1440 px.

Dos razones concretas en este proyecto:

1. El tráfico turístico de la capa B es mayoritariamente móvil. Un desborde a 360 px es dinero perdido.
2. La capa A se dirige a clientes corporativos e institucionales, donde la accesibilidad puede ser requisito contractual en licitaciones públicas.

---

## 2. Matriz de anchos — obligatoria

| Ancho | Representa |
|---|---|
| **320** | El móvil más estrecho aún en uso |
| **360** | Android mayoritario en Colombia |
| **390** | iPhone moderno |
| **768** | Tablet vertical |
| **1024** | Tablet horizontal / portátil pequeño |
| **1280** | Portátil estándar |
| **1440** | Escritorio común |
| **1920** | Monitor grande |

Más una comprobación en **horizontal** (812×375), donde el hero a altura de viewport se come toda la pantalla.

Se verifica en las **9 URLs**: `/`, `/historia`, `/equipo`, `/valores`, `/servicios`, `/contacto`, `/sedes`, `/sedes/eje-cafetero`, `/sedes/cartagena`. Son 9 URLs aunque haya 8 archivos de ruta, porque `sedes.$slug` genera dos.

---

## 3. Detección de desbordes

Script de verificación, ejecutado en cada ancho:

```js
() => {
  const w = document.documentElement.clientWidth;
  return {
    ancho: w,
    desborde: document.body.scrollWidth > w,
    culpables: [...document.querySelectorAll('*')]
      .filter(e => e.getBoundingClientRect().right > w + 1)
      .slice(0, 10)
      .map(e => `${e.tagName}.${String(e.className).slice(0, 60)}`),
  };
}
```

**Cualquier `desborde: true` bloquea la entrega.** Sin excepciones, sin "es solo un píxel".

---

## 4. Reglas responsive

| Regla | Motivo |
|---|---|
| Cero scroll horizontal en cualquier ancho | Rompe la lectura y delata maquetación frágil |
| Inputs con `font-size` ≥ 16 px | Por debajo, iOS hace zoom automático al enfocar y descoloca la página |
| Targets táctiles ≥ 44×44 px | WCAG SC 2.5.5 |
| Imágenes con `max-width: 100%` | Evita que una imagen ancha reviente el layout |
| Tablas y carruseles con `overflow-x-auto` propio | El desborde se contiene dentro del componente, no en el `body` |
| Heros con `dvh`, no `vh` | `vh` salta cuando la barra del navegador móvil aparece y desaparece |
| Grids que degradan `4 → 2 → 1` | Nunca `lg:grid-cols-4` sin paso intermedio en `sm` |
| Sin anchos fijos en px en contenedores | Usar `max-w-*`, `w-full`, fracciones de grid |
| `break-words` en textos con URLs o correos | `transporteyturismobogota@gmail.com` desborda a 320 px |
| `safe-area-inset` en elementos fijos | El notch y la barra inferior de iPhone tapan contenido |
| El FAB de WhatsApp no tapa CTAs ni el footer | La última sección lleva padding inferior suficiente |

---

## 5. Problemas identificados

**Verificados en ejecución el 2026-08-10** (`npm run dev`, puerto 8081). Estado real de cada uno en la columna final.

### Resultado del barrido responsive — hipótesis REFUTADA

```
9 rutas × 8 anchos = 72 pruebas
72 sin desborde horizontal
 0 con desborde
```

**La base responsive del proyecto es sólida.** El diagnóstico del spec 01 asumía fallos que no existen. Consecuencia práctica: el trabajo responsive pasa de **corregir** a **vigilar que no se rompa** con las historias nuevas — sobre todo con el FAB de WhatsApp y las fichas de experiencia, que aún no existen y sí pueden introducir desbordes.

Dos comprobaciones adicionales que también salen correctas:

| Comprobación | Resultado |
|---|---|
| `font-size` de los inputs | **16 px** → no hay zoom automático en iOS. Correcto |
| `<h1>` por página | **1** en todas las rutas |

### Tabla de problemas

| # | Problema | Archivo | Regla | Historia | Estado |
|---|---|---|---|---|---|
| R1 | `size="icon"` es `h-9 w-9` = **36×36 px** | `ui/button.tsx:24`, usado en `Header.tsx` | SC 2.5.5 | UX-25 | ✅ **CONFIRMADO en ejecución.** Los 3 botones de icono (idioma, tema, menú) miden 36×36 px |
| **R13** | **Los 7 enlaces del footer miden 17 px de alto** | `Footer.tsx` | SC 2.5.5 | UX-25 | ✅ **CONFIRMADO. Hallazgo nuevo**, no estaba en el diagnóstico original y es más extenso que R1 |
| R2 | `PageHero` usa `h-[62vh]` — salta con la barra del navegador móvil | `Section.tsx:74` | `dvh` | UX-22 |
| R3 | Conflicto entre `h-[62vh]` y `size-full` en la misma imagen | `Section.tsx:71-76` | — | UX-22 |
| R4 | El menú móvil no cierra con `Escape` ni devuelve el foco | `Header.tsx:80-95` | SC 2.1.2 | UX-25 | ✅ **CONFIRMADO.** Tras pulsar `Escape`, los 14 enlaces siguen presentes |
| R5 | Falta `aria-controls` en el botón de menú | `Header.tsx:67-77` | SC 4.1.2 | UX-25 | Pendiente |
| R6 | El indicador de página activa es solo `font-semibold` | `Header.tsx:40` | SC 1.4.1 | UX-25 |
| R7 | Eyebrow en `text-primary` a `text-xs`: naranja sobre blanco ≈ 2.6:1 | `Section.tsx:45` | SC 1.4.3 | UX-27 |
| R8 | `card-premium` aplica `scale(1.02)` en hover sin salvaguarda | `styles.css:143` | SC 2.3.3 | UX-27 |
| R9 | Grid de equipo `lg:grid-cols-6`: cargos largos parten el layout a 1024 px | `index.tsx:133` | — | UX-04 |
| R10 | Enlace externo sin aviso audible de pestaña nueva | `SedeCard.tsx:53` | SC 3.2.5 | UX-02 |
| R11 | Errores de formulario solo en toast efímero, sin `aria-invalid` | `contacto.tsx:56-57` | SC 3.3.1 | UX-13 | ✅ **CONFIRMADO.** 5 campos, **0 elementos con `aria-invalid`** |
| R12 | Sin enlace "saltar al contenido" | `__root.tsx` | SC 2.4.1 | UX-25 | Pendiente |

---

## 6. Accesibilidad AA

### 6.1 Contraste

| Elemento | Mínimo |
|---|---|
| Texto normal (< 24 px, o < 19 px bold) | 4.5:1 |
| Texto grande | 3:1 |
| Componentes de interfaz y gráficos | 3:1 |

Verificar **en claro y en oscuro**, las dos.

**Punto crítico — R7.** El naranja `#FF7F09` sobre blanco da aproximadamente **2.6:1**: insuficiente incluso para texto grande. Hoy se usa en el eyebrow a `text-xs`.

Salidas, en orden de preferencia:

1. Definir un token `--primary-text` más oscuro, solo para texto sobre fondo claro. Preserva el naranja de marca en botones y elementos gráficos, donde funciona.
2. Poner el eyebrow en `foreground` y dejar el naranja para un elemento gráfico contiguo.
3. Subir tamaño y peso hasta cumplir 3:1. La menos recomendable: rompe la jerarquía tipográfica.

El naranja **como fondo de botón con texto oscuro sí cumple** — ese uso no cambia.

### 6.2 Teclado

- Todo lo accionable alcanzable con `Tab`, en orden lógico.
- **Foco visible siempre.** Nunca `outline: none` sin sustituto. `focus-visible:ring-1 focus-visible:ring-ring` del `Button` es correcto pero débil: subir a `ring-2` mejora la percepción.
- El menú móvil cierra con `Escape` y devuelve el foco al botón que lo abrió (R4).
- El carrusel de testimonios navegable con flechas.
- Enlace "saltar al contenido" como primer elemento enfocable (R12).

### 6.3 Semántica

- **Un solo `<h1>` por página**, aportado por `PageHero`. Jerarquía `h1 → h2 → h3` sin saltos.
- `<nav>`, `<main>`, `<footer>` ya presentes en `__root.tsx`.
- `<article>` en las cards: ya lo usan todas. Correcto.
- Botones de icono con `aria-label` **traducido** — el `Header` ya lo hace vía `ui.labels`. Mantener ese patrón.
- `aria-expanded` presente en el menú; falta `aria-controls` (R5).
- Los testimonios deberían ser `<blockquote>` con `<cite>`, no `<div>`.

### 6.4 Imágenes

| Caso | `alt` |
|---|---|
| Decorativa (fondo de hero) | `alt=""` + `aria-hidden="true"` — ya correcto |
| Informativa | Descripción real de lo que se ve |
| Retrato | Nombre y cargo |
| Dentro de un enlace | Describe el **destino**, no la imagen |

**Problema actual:** `servicios.tsx:47` usa `alt={t(s.title)}`, que duplica el título contiguo. Para un lector de pantalla es ruido.

Los `alt` visibles se traducen: van como `L`.

### 6.5 Movimiento

Bajo `prefers-reduced-motion: reduce`:

- Sin `scale` en hover de cards (R8).
- Sin contadores animados: `CountUp` muestra el valor final directamente.
- Sin autoplay de carrusel.
- Sin transiciones de entrada de sección.

Se resuelve en `src/styles.css`, de forma global, no componente por componente.

### 6.6 Formularios

- Etiqueta asociada a cada campo (`<Label htmlFor>`) — ya correcto.
- Error **junto al campo**, con `aria-invalid` y `aria-describedby` (R11).
- El foco se mueve al primer campo con error tras un envío fallido.
- Lenguaje llano con ejemplo (spec 05 §8).
- El error nunca se comunica solo con color.
- Estado de envío anunciado con `aria-live="polite"`.

---

## 7. Comprensible para todo público

La accesibilidad técnica no basta si el contenido no se entiende.

| Principio | Aplicación |
|---|---|
| Una idea por frase | Frases cortas, sin subordinadas encadenadas |
| Etiquetas que dicen lo que hacen | "Ver experiencias en Cartagena", no "Ver más" |
| Sin jerga ni siglas sin explicar | "RNT (Registro Nacional de Turismo)" la primera vez |
| Estructura predecible | El mismo orden de secciones en páginas equivalentes |
| Errores en lenguaje llano | "Escribe un correo válido, por ejemplo nombre@empresa.com" |
| Nada depende solo del color | Siempre texto o icono acompañando |
| Números legibles | "48.000+" mejor que "48000" |

---

## 8. Método de verificación

```bash
npm run build && npm run preview
```

1. **Desbordes** — script de §3 en las 9 rutas × 8 anchos.
2. **Temas** — repetir en claro y oscuro.
3. **Teclado** — recorrer una página completa solo con `Tab`, sin ratón.
4. **Contraste** — medir cualquier color nuevo, y el eyebrow en ambos temas.
5. **Movimiento reducido** — emular `prefers-reduced-motion: reduce` y comprobar que nada anima.
6. **Targets** — medir los botones de icono:
   ```js
   () => [...document.querySelectorAll('button, a')]
     .map(e => ({ t: e.textContent.trim().slice(0,20) || e.ariaLabel,
                  w: Math.round(e.getBoundingClientRect().width),
                  h: Math.round(e.getBoundingClientRect().height) }))
     .filter(x => x.w < 44 || x.h < 44)
   ```
7. **Encabezados** — un `h1` por página y jerarquía sin saltos.

---

## 9. Checklist de cierre

- [ ] 9 rutas × 8 anchos sin desborde horizontal
- [ ] Correcto en horizontal (812×375)
- [ ] Claro y oscuro verificados
- [ ] Targets táctiles ≥ 44×44 px
- [ ] Inputs ≥ 16 px
- [ ] Foco visible en todo elemento interactivo
- [ ] Recorrido completo con teclado, sin trampas
- [ ] Menú móvil cierra con `Escape` y devuelve el foco
- [ ] Un `<h1>` por página, jerarquía sin saltos
- [ ] `aria-label` en botones de icono, traducidos
- [ ] Todas las imágenes con `alt` real o `alt=""` si decorativas
- [ ] `prefers-reduced-motion` respetado
- [ ] Ningún mensaje comunicado solo por color
- [ ] Contraste AA en texto normal y grande
- [ ] Enlace "saltar al contenido" presente

---

## 10. Compuerta hacia el spec 08

| | Punto | Resultado |
|---|---|---|
| ☑ | **Barrido completo 9 rutas × 8 anchos** | **72/72 sin desborde.** Hipótesis de fallos responsive **REFUTADA** |
| ☑ | R1: botones de icono a 36 px | **CONFIRMADO** — 36×36 px los tres |
| ☑ | R13: enlaces de footer a 17 px de alto | **CONFIRMADO** — hallazgo nuevo |
| ☑ | R4: `Escape` no cierra el menú | **CONFIRMADO** |
| ☑ | R11: sin `aria-invalid` en el formulario | **CONFIRMADO** — 0 de 5 campos |
| ☑ | Inputs ≥ 16 px | **CORRECTO** — ya cumplen, sin trabajo pendiente |
| ☑ | Un `<h1>` por página | **CORRECTO** en las 9 rutas |
| ☐ | R2/R3: el hero salta en móvil real | Pendiente — requiere dispositivo real o emulación de barra dinámica |
| ☐ | R7: contraste real del eyebrow medido | Pendiente — requiere herramienta de contraste |
| ☐ | R8: `scale` activo con movimiento reducido | Pendiente — emular `prefers-reduced-motion` |
| ☐ | R9: desalineación del grid de equipo a 1024 px | Pendiente — no se detectó desborde, pero la desalineación es visual, no de ancho |
| ☐ | Recorrido con teclado en al menos 3 rutas | Pendiente |
| ☐ | Token de contraste para el naranja decidido | Pendiente — decisión de diseño, requiere aprobación |

**Estado de la compuerta: CERRADA**, pero con el hallazgo más importante ya resuelto: **no hay deuda responsive que pagar**. El trabajo de esta área se reorienta a los problemas de accesibilidad (targets táctiles, teclado, contraste) y a **prevenir** regresiones cuando entren el FAB de WhatsApp y las fichas de experiencia.
