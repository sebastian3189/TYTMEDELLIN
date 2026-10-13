# ARCHIVADO — Spec 01 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín) | Senior Product Designer & UI/UX Expert**
**Fecha:** Agosto 2026
**KPI principal:** Credibilidad institucional (capa A) + cotizaciones iniciadas (capa B)
**Metodología:** Spec-Driven Development · Scrum · Heurísticas de Nielsen · Gestalt · WCAG 2.1 AA

---

## Concepto



- Una **cara institucional** del grupo nacional, que compite por credibilidad frente a clientes corporativos.
- Un **canal de venta real** para Eje Cafetero y Cartagena, las dos sedes sin sitio propio, cuya operación comercial depende enteramente de estas páginas.

Hoy esa segunda capa está subdesarrollada: `/sedes/{slug}` es un grid de tarjetas sin ficha de detalle, sin flujo de cotización, sin canal de WhatsApp y sin nada que convierta. Es la brecha más costosa del proyecto, porque ahí está el tráfico de intención comercial.

Este plan organiza el trabajo en **tres fases** y **diez specs** encadenados, priorizados por relación impacto/esfuerzo.

---

> **Estado del diagnóstico: VERIFICADO en ejecución el 2026-08-10.** El diagnóstico se escribió leyendo código; después se rectificó midiendo la aplicación corriendo. El resultado está en la sección "Rectificación" al final: **la mayoría se confirmó, dos hipótesis se refutaron y un problema resultó ser un orden de magnitud peor de lo estimado.** Lo refutado está corregido más abajo y marcado como tal.

---

## Diagnóstico UX por componente

### Header — `src/components/Header.tsx`

**Heurísticas violadas:** #1 Visibilidad del estado · #6 Reconocimiento
**WCAG:** SC 1.4.3 (Contraste) · SC 2.1.2 (Sin trampa de teclado)

- El indicador de página activa existe (`activeProps`) pero es solo `font-semibold`: cambio demasiado sutil para leerse como estado. En una nav de 7 entradas, el usuario no sabe dónde está.
- **7 entradas de menú** más 3 botones de icono en una barra de `max-w-7xl`. En 1024 px el menú ya va apretado; el `lg:flex` colapsa a hamburguesa antes de tiempo, dejando tablets con navegación móvil innecesariamente.
- El menú móvil no cierra con `Escape` ni devuelve el foco al botón que lo abrió. Falla el patrón de disclosure accesible.
- Los botones de icono usan `size="icon"` (36×36 px por defecto en shadcn): **por debajo del mínimo táctil de 44×44 px**.
- El header es opaco (`bg-background/90`) desde el primer scroll. El sitio de Bogotá usa header transparente sobre el hero, un recurso que aquí se perdió y que aporta amplitud a la primera impresión.

---

### PageHero — `src/components/Section.tsx` líneas 55–95

**Heurísticas violadas:** #8 Diseño minimalista
**WCAG:** SC 1.4.3

- La imagen usa `h-[62vh]` con `absolute inset-0 size-full`: **dos declaraciones de altura en conflicto**. En móvil `vh` incluye la barra del navegador, y el hero salta cuando esta aparece o desaparece durante el scroll. Debe ser `dvh`.
- **Sin `fetchPriority="high"`.** El hero es el LCP de las 8 páginas y compite en prioridad con una docena de imágenes de tarjeta. Es el principal responsable del LCP alto.
- Sin color de respaldo bajo la imagen: si tarda o falla, el `<h1>` blanco queda sobre fondo blanco. El overlay `bg-ink/70` no ayuda porque también es transparente.
- El CTA del home no está dentro del hero, sino en un bloque `bg-ink` **debajo**, separado visualmente. Rompe la unidad figura/fondo: el usuario lee el titular y no encuentra la acción en el mismo golpe de vista.

---

### Home — `src/routes/index.tsx`

**Heurísticas violadas:** #6 Reconocimiento · #8 Diseño minimalista
**Gestalt:** Similitud, Jerarquía

- **Ocho secciones consecutivas de igual peso visual.** Hero → quiénes somos → cifras → sedes → equipo → valores → testimonios → CTA. Todas con el mismo `py-16 md:py-24`, la misma estructura de heading, el mismo grid. Sin ritmo, el usuario lee una lista plana y abandona a mitad.
- **Ausencia de la franja de confianza.** El sitio de Bogotá muestra "Empresa legalmente constituida · RNT · NIT" justo bajo el hero. Aquí no hay ninguna señal legal ni de certificación por encima del pliegue, precisamente en el sitio que más necesita transmitir solidez institucional.
- `key={c.label.es}` y `key={v.title.es}` usan el texto español como clave de React. Funciona, pero acopla el renderizado al contenido: cambiar una palabra remonta el componente.
- La sección de valores tiene CTA "Ver más" — etiqueta genérica que no dice a dónde lleva. Falla SC 2.4.4 (Propósito del enlace).
- El preview de equipo muestra 6 avatares en `lg:grid-cols-6`: a 1024 px cada avatar queda a ~140 px con nombre y cargo debajo. El cargo se corta en dos o tres líneas y rompe la alineación del grid.

---

### SedeCard — `src/components/cards/SedeCard.tsx`

**Heurística violada:** #2 Coincidencia con el mundo real
**WCAG:** SC 2.4.4

Este componente es el acierto arquitectónico del proyecto: `tieneSitioPropio` decide el comportamiento por dato, no por código. Pero comunica mal:

- Las cuatro tarjetas son **visualmente idénticas** salvo el badge "Sitio oficial". El usuario no anticipa que dos lo sacan del sitio y dos lo llevan a un catálogo. Dos destinos radicalmente distintos con la misma apariencia.
- El botón externo es primario (naranja) y el interno secundario (oscuro). **Está al revés**: se le da el peso visual dominante a la acción que expulsa al usuario del sitio, y el subordinado a las páginas que este sitio necesita que se visiten.
- `ExternalLink` es el único aviso de que se abre pestaña nueva, y solo visual. Sin texto para lector de pantalla.

---

### Módulo de venta — `src/routes/sedes.$slug.tsx`

**Heurísticas violadas:** #1 Visibilidad · #6 Reconocimiento · #7 Flexibilidad
**Es la brecha crítica del proyecto.**

- **No hay ficha de detalle.** Cada experiencia se agota en una tarjeta con 3 destacados. El usuario que se interesa por el Valle de Cocora no puede saber a qué hora sale, desde dónde, qué incluye, qué no incluye ni qué llevar. En turismo, esa información **es** la decisión.
- **No hay ningún camino a la cotización.** El único CTA al pie es "Hablemos" hacia `/contacto`, un formulario corporativo genérico que no sabe qué experiencia miraba el usuario. Toda la intención acumulada se pierde.
- **Sin WhatsApp.** En Colombia es el canal de mayor conversión en servicios turísticos. El sitio de Bogotá lo tiene como botón flotante permanente; aquí no existe en ninguna página.
- Sin precio ni rango orientativo. Legítimo mientras no haya tarifario aprobado, pero entonces el CTA debe decir "cotizar" con claridad, no dejar el vacío sin explicar.
- El `SectionHeading` usa `t(ui.cta.verExperiencias)` — "Ver experiencias" — como **título de sección**. Es una etiqueta de botón usada como encabezado: el usuario ya está viendo las experiencias.
- Sin testimonios de la región, sin señales de confianza locales, sin "crea tu experiencia personalizada".

---

### Formulario de contacto — `src/routes/contacto.tsx`

**Heurísticas violadas:** #5 Prevención de errores · #9 Recuperación de errores
**WCAG:** SC 3.3.1 (Identificación de errores) · SC 3.3.2 (Etiquetas o instrucciones)

- La validación es un `if (!form.nombre || !form.email || !form.mensaje)` con un `toast.error` genérico. **El usuario no sabe qué campo falló.** El toast desaparece y no queda rastro junto al campo.
- El `<Select>` de Radix no participa de la validación nativa: el formulario se envía sin tipo de consulta seleccionado.
- `zod` está instalado y sin usar. `react-hook-form` está instalado y sin usar.
- **Sin casilla de autorización de tratamiento de datos personales.** Es una obligación legal en Colombia (Ley 1581 de 2012), no una mejora opcional.
- Sin honeypot, sin límite de envíos, sin backend. Un formulario que confirma éxito sin enviar nada es peor que no tener formulario: el lead se pierde y el usuario cree que llegó.
- Sin indicación de tiempo de respuesta ni canal alternativo inmediato.

---

### Imágenes — transversal

**Core Web Vitals · WCAG SC 1.1.1**

- **Todas** las imágenes se solicitan con `?q=80&w=2940`, incluidas las de tarjeta que se muestran a ~300 px. En el home hay más de una docena. Es la mayor pérdida de rendimiento del proyecto.
- Sin `width`/`height`: cada imagen provoca desplazamiento de layout al cargar (CLS).
- Sin `srcset`/`sizes`: móvil y escritorio descargan exactamente el mismo archivo.
- Varios `alt` repiten el título contiguo (`alt={t(s.title)}` en servicios), que para un lector de pantalla es información duplicada.

---

### Hidratación de tema e idioma

`I18nProvider` (`src/i18n/index.tsx`) y `ThemeProvider` (`src/lib/theme.tsx`) leen `localStorage` dentro de `useEffect`. Con SSR, la primera pintura sale **siempre** en español y tema claro, y cambia después de hidratar. Un usuario que eligió inglés y modo oscuro ve un parpadeo completo en cada carga. Afecta a CLS y a la percepción de calidad del producto.

---

### Metadatos y SEO

- Las 8 rutas tienen `head()` con `title`, `description` y `og:*` propios: **bien hecho**, es más de lo que suele traer una generación automática.
- Faltan: `canonical`, `og:image`, `og:url`, `twitter:*` completos, `sitemap.xml`, `robots.txt` y todo el JSON-LD.
- El toggle ES/EN **no genera URLs**: solo existe la versión española indexable. Un `hreflang` sería mentira.
- Los `head()` de `/sedes/{slug}` usan `sede.name.es` fijo: el metadato nunca cambia de idioma, coherente con el punto anterior.

---

## Análisis de conversión — embudos actuales

El sitio tiene **dos embudos distintos** y hoy solo uno está construido.

### Embudo A — corporativo (institucional)

```
ENTRADA orgánica o directa
  │
  ▼
[HERO] ── "Conoce nuestra historia" (CTA único, fuera del hero) ──► /historia
  │
  ▼
[QUIÉNES SOMOS] → "Ver más" (etiqueta genérica) ──────────────────► /historia
  │
  ▼
[CIFRAS] ── Sin CTA ──► sin salida
  │
  ▼
[SEDES preview] → 2 tarjetas EXPULSAN a dominios externos ◄ BRECHA A2
  │
  ▼
[EQUIPO] [VALORES] [TESTIMONIOS] ── Sin señal legal ni certificación ◄ BRECHA A1
  │
  ▼
[CTA FINAL] → "Hablemos" ─────────────────────────────────────────► /contacto
  │
  ▼
[FORMULARIO] ── sin validación real · sin backend · sin Habeas Data ◄ BRECHA A3
```

### Embudo B — venta (Eje Cafetero y Cartagena) — **prácticamente inexistente**

```
ENTRADA orgánica por búsqueda transaccional
  │
  ▼
[/sedes] → SedeCard con CTA secundario, menos peso que el externo ◄ BRECHA B1
  │
  ▼
[/sedes/{slug}] → grid de 4 ExperienceCard
  │
  ├── ¿Detalle de la experiencia?      → NO EXISTE          ◄ BRECHA B2
  ├── ¿Cotizar esta experiencia?       → NO EXISTE          ◄ BRECHA B3
  ├── ¿WhatsApp?                       → NO EXISTE          ◄ BRECHA B4
  ├── ¿Varias experiencias juntas?     → NO EXISTE          ◄ BRECHA B5
  │
  ▼
[CTA "Hablemos"] → /contacto genérico, sin contexto de lo que miraba ◄ BRECHA B6
```

### Brechas priorizadas

| # | Brecha | Embudo | Impacto |
|---|---|---|---|
| B3 | Sin flujo de cotización en las páginas de venta | B | **Crítico** — no hay conversión posible |
| B4 | Sin canal de WhatsApp en todo el sitio | Ambos | **Crítico** — canal #1 en Colombia para este sector |
| A3 | Formulario sin validación real, sin backend y sin Habeas Data | A | **Crítico** — el lead se pierde y hay riesgo legal |
| B2 | Sin ficha de detalle de experiencia | B | Alto — falta la información que decide la compra |
| A1 | Sin señales legales ni certificaciones por encima del pliegue | A | Alto — es un sitio cuyo producto es la confianza |
| B1 | Jerarquía de CTA invertida en `SedeCard` | B | Alto — se premia la salida del sitio |
| B6 | El contacto no conserva el contexto de la experiencia | B | Medio-alto — fricción redundante |
| A2 | El preview de sedes expulsa sin advertirlo | A | Medio |
| B5 | Sin paquete de varias experiencias | B | Medio — depende de la decisión #5 |

---

## Principios de diseño

1. **Institucional sobre comercial, salvo en la capa B.** El naranja no supera el 10 % de la superficie. El protagonista es el oscuro `#3C3F3B`.
2. **Editorial sobre catálogo.** Bloques de texto con aire, imágenes grandes, ritmo variable entre secciones. Referencia: Yanbal.
3. **Personas sobre producto.** Rostros reales, nombres, años de oficio, frases textuales. Es el activo diferencial frente a competidores.
4. **Una acción principal por pantalla.** Si dos botones pesan igual, ninguno convierte.
5. **Transparencia como argumento de venta.** Duración real, qué incluye, qué no incluye, datos legales visibles. En este sector, el detalle operativo convierte más que el adjetivo.
6. **Comprensible para todo público.** Frases cortas, etiquetas que dicen lo que hacen, errores en lenguaje llano, nada que dependa solo del color.
7. **Responsive al 100 %, no "responsive-friendly".** Matriz 320→1920 px verificada, cero scroll horizontal.

---

## Mapa del sitio

### Confirmado — se mantiene

| Ruta | Capa | Propósito |
|---|---|---|
| `/` | A | Portada institucional |
| `/historia` | A | Trayectoria, misión y visión narradas, cita del fundador |
| `/equipo` | A | Personas por área, conductores, cultura |
| `/valores` | A | Valores con ejemplo operativo, compromiso, certificaciones |
| `/servicios` | A | Transporte corporativo · Turismo receptivo · Alianzas |
| `/contacto` | A | Formulario corporativo, datos institucionales, mapa |
| `/experiencias` | Bisagra | EXPERIENCIAS|
| 

---

## Fases de implementación

### FASE 1 — Fundación y quick wins
**Criterio:** impacto crítico o alto · esfuerzo bajo · desbloquea el resto
**Specs implicados:** 03 · 04 · 05

| Ítem | Descripción | Impacto | Esfuerzo |
|---|---|---|---|
| F1.1 | `WhatsAppFAB` global con mensaje contextual | **Crítico** | Bajo |
| F1.2 | `LegalBar` bajo el hero del home | Alto | Bajo |
| F1.3 | Invertir jerarquía de CTA en `SedeCard` + aviso de enlace externo accesible | Alto | Muy bajo |
| F1.4 | `fetchPriority="high"` + color de respaldo + `dvh` en `PageHero` | Alto | Muy bajo |
| F1.5 | Ajustar anchos de Unsplash al uso real (`w=2940` → 600/1200/2000) | Alto | Bajo |
| F1.6 | Targets táctiles ≥ 44 px en los botones de icono del header | a11y | Muy bajo |
| F1.7 | Menú móvil: cierre con `Escape` y devolución del foco | a11y | Bajo |
| F1.8 | Etiquetas de CTA descriptivas en lugar de "Ver más" | Medio | Muy bajo |
| F1.9 | Datos de contacto reales con marcadores `TODO(cliente)` | Medio | Muy bajo |

### FASE 2 — Módulo de venta y estructura
**Criterio:** cierra las brechas críticas del embudo B
**Specs implicados:** 06 · 07

| Ítem | Descripción | Impacto | Esfuerzo |
|---|---|---|---|
| F2.1 | `ExperienceDetail` con incluye / no incluye / punto de encuentro | **Crítico** | Alto |
| F2.2 | CTA de cotización por experiencia hacia WhatsApp de la sede | **Crítico** | Medio |
| F2.3 | Formulario con `zod` + `react-hook-form`, errores junto al campo | **Crítico** | Medio |
| F2.4 | Casilla de autorización Habeas Data + página `/privacidad` | **Crítico** (legal) | Medio |
| F2.5 | `SedeContactCard` con datos y horario por sede | Alto | Medio |
| F2.6 | `TestimonialCarousel` con testimonios por capa | Medio | Medio |
| F2.7 | Ritmo visual del home: variar densidad y peso entre secciones | Medio | Medio |
| F2.8 | `srcset`/`sizes` + `width`/`height` en todas las imágenes | Medio | Medio |
| F2.9 | Auditoría responsive completa en la matriz 320→1920 px | Alto | Medio |

### FASE 3 — Visibilidad, velocidad y protección
**Criterio:** amplifica lo construido y lo hace sostenible
**Specs implicados:** 08 · 09 · 10 · 11 · 12

| Ítem | Descripción | Impacto | Esfuerzo |
|---|---|---|---|
| F3.1 | JSON-LD, `canonical`, `og:image`, `sitemap.xml`, `robots.txt` | Alto | Medio |
| F3.2 | Backend del formulario + rate limiting + honeypot | **Crítico** | Alto |
| F3.3 | Cabeceras de seguridad (CSP, HSTS, `Referrer-Policy`) | Alto | Medio |
| F3.4 | Eliminar el parpadeo de tema e idioma en hidratación | Medio | Medio |
| F3.5 | Code splitting y carga diferida de carrusel, mapa y formulario | Medio | Medio |
| F3.6 | `CotizadorPaquete` multi-experiencia | Alto | Alto |
| F3.7 | `FaqAccordion` en `/contacto` y en las páginas de venta | Medio | Bajo |
| F3.8 | GA4 con eventos de ambos embudos | Alto | Medio |
| F3.9 | Migración de Unsplash a fotografía propia | Alto | Externo |

---

## Criterios transversales

Aplican a **toda** historia del backlog, sin excepción:

| Criterio | Umbral | Spec |
|---|---|---|
| **Responsive 100 %** | Cero scroll horizontal en 320 · 360 · 390 · 768 · 1024 · 1280 · 1440 · 1920 px | 07 |
| Accesibilidad | WCAG 2.1 AA: contraste, foco visible, teclado, targets ≥ 44 px | 07 |
| Modo oscuro | Correcto en las 4 combinaciones tema × idioma | 04 |
| i18n | Paridad `es`/`en` completa, incluidos `alt` y `aria-label` | 05 |
| SEO | `head()` único por ruta, un solo `<h1>`, jerarquía sin saltos | 08 |
| Rendimiento | LCP < 2.0 s · INP < 200 ms · CLS < 0.1 · JS < 180 KB | 09 |
| Seguridad | Validación en servidor, `rel="noopener noreferrer"`, Habeas Data | 10 |

---

## Decisiones pendientes del cliente

Seis puntos sin respuesta al cierre de este documento. Bloquean sus historias; están recogidas como épica **E6** en [`02_backlog_ux_ui.md`](02_backlog_ux_ui.md) y desarrolladas en [`CLAUDE1.MD`](CLAUDE1.MD) §8.

| # | Tema | Recomendación resumida | Qué desbloquea |
|---|---|---|---|
| 1 | RNT y NIT multisede | No mostrar un NIT único; tabla legal por sede | `LegalBar`, `SedeContactCard`, JSON-LD `LocalBusiness`, SEO local |
| 2 | Contacto centralizado vs por sede | Dos niveles: correo corporativo nacional + contacto propio por sede | `/contacto`, footer, `WhatsAppFAB` |
| 3 | Subpágina de Vehículos | Si se aprueba: "capacidad operativa" por sede, sin precios ni catálogo | Ruta `/vehiculos`, campo `flota` en `Sede` |
| 4 | Catálogo descargable | Aprobar en fase 3, como PDF tras formulario corto (captación B2B) | Descarga + formulario de lead |
| 5 | Paquete de tours + WhatsApp único | Implementar **por sede**; no depende de un número nacional | `CotizadorPaquete` |
| 6 | Sección de Aliados | Aprobada en concepto; **bloqueante legal** para publicar logos y marcas | `/aliados`, `AlliesGrid` |

---

## Principios aplicados — trazabilidad

| Principio | Aplicado en |
|---|---|
| Nielsen #1 Visibilidad del estado | F1.7 foco del menú · F2.3 errores junto al campo · F1.3 aviso de enlace externo |
| Nielsen #2 Coincidencia con el mundo real | F1.3 diferenciar tarjetas que salen de las que entran |
| Nielsen #3 Control y libertad | F1.1 WhatsApp como vía alternativa · F3.6 paquete editable |
| Nielsen #5 Prevención de errores | F2.3 validación con zod · F2.4 autorización explícita |
| Nielsen #6 Reconocimiento antes que recuerdo | F2.1 ficha de detalle · F1.2 señales legales visibles |
| Nielsen #7 Flexibilidad | F1.1 canales múltiples · F2.2 cotización contextual |
| Nielsen #8 Diseño minimalista | F2.7 ritmo visual del home · F1.8 CTAs con propósito claro |
| Nielsen #9 Recuperación de errores | F2.3 mensajes por campo en lenguaje llano |
| Gestalt Figura/Fondo | F1.4 color de respaldo del hero |
| Gestalt Jerarquía | F1.3 inversión de CTAs · F2.7 densidad variable |
| Autoridad (Cialdini) | F1.2 `LegalBar` · F2.6 testimonios con contexto |
| WCAG SC 1.4.3 | F1.4 respaldo del hero · auditoría de contraste del spec 07 |
| WCAG SC 2.4.4 | F1.8 propósito del enlace · F1.3 aviso de pestaña nueva |
| WCAG SC 2.5.5 | F1.6 targets táctiles |
| WCAG SC 3.3.1 | F2.3 identificación de errores |
| Ley 1581 de 2012 | F2.4 Habeas Data |

---

## Resumen ejecutivo

| # | Ítem | Impacto | Esfuerzo | Fase | Spec |
|---|---|---|---|---|---|
| 1 | F1.1 `WhatsAppFAB` | Crítico | Bajo | 1 | 06 |
| 2 | F2.2 Cotización por experiencia | Crítico | Medio | 2 | 06 |
| 3 | F2.4 Habeas Data + `/privacidad` | Crítico (legal) | Medio | 2 | 10 |
| 4 | F2.3 Formulario con validación real | Crítico | Medio | 2 | 10 |
| 5 | F3.2 Backend + rate limiting | Crítico | Alto | 3 | 10 |
| 6 | F2.1 `ExperienceDetail` | Alto | Alto | 2 | 06 |
| 7 | F1.2 `LegalBar` | Alto | Bajo | 1 | 03 |
| 8 | F1.3 Jerarquía de `SedeCard` | Alto | Muy bajo | 1 | 04 |
| 9 | F1.4 Hero: prioridad, respaldo, `dvh` | Alto | Muy bajo | 1 | 09 |
| 10 | F1.5 Anchos de imagen | Alto | Bajo | 1 | 09 |
| 11 | F2.9 Auditoría responsive completa | Alto | Medio | 2 | 07 |
| 12 | F3.1 SEO técnico y JSON-LD | Alto | Medio | 3 | 08 |
| 13 | F3.8 GA4 con ambos embudos | Alto | Medio | 3 | 11 |
| 14 | F2.5 `SedeContactCard` | Alto | Medio | 2 | 03 |
| 15 | F3.6 `CotizadorPaquete` | Alto | Alto | 3 | 06 |
| 16 | F1.6 · F1.7 Accesibilidad del header | a11y | Muy bajo | 1 | 07 |
| 17 | F2.8 `srcset` e imágenes con dimensiones | Medio | Medio | 2 | 09 |
| 18 | F2.6 `TestimonialCarousel` | Medio | Medio | 2 | 04 |
| 19 | F2.7 Ritmo visual del home | Medio | Medio | 2 | 04 |
| 20 | F3.3 Cabeceras de seguridad | Alto | Medio | 3 | 10 |
| 21 | F3.4 Parpadeo de tema e idioma | Medio | Medio | 3 | 09 |
| 22 | F3.5 Code splitting | Medio | Medio | 3 | 09 |
| 23 | F3.7 `FaqAccordion` | Medio | Bajo | 3 | 05 |
| 24 | F1.8 · F1.9 Etiquetas y datos reales | Medio | Muy bajo | 1 | 05 |
| 25 | F3.9 Fotografía propia | Alto | Externo | 3 | 09 |

---

## Rectificación del diagnóstico — ejecutado el 2026-08-10

Medido contra la aplicación corriendo (`npm run dev`, puerto 8081, viewport 390×844 salvo donde se indique otro).

### Confirmado

| Hipótesis | Resultado medido |
|---|---|
| **Brechas B1–B6: el embudo de venta no existe** | **CONFIRMADO y peor de lo descrito.** En `/sedes/eje-cafetero`: 4 experiencias visibles, **0 clicables**, 0 enlaces a ficha, 0 enlaces de WhatsApp, ninguna mención de "cotizar". Los únicos enlaces de toda la página son los 7 del menú de navegación: **la página no tiene una sola salida comercial** |
| El `h2` del catálogo es una etiqueta de botón | **CONFIRMADO.** El encabezado literal es "Ver experiencias" |
| **Sin WhatsApp en todo el sitio** | **CONFIRMADO.** 0 enlaces `wa.me` y **0 elementos con `position: fixed`** en el home |
| **Brecha A3: formulario sin validación real** | **CONFIRMADO.** 5 campos, **0 elementos con `aria-invalid`**, `contacto.tsx` no importa `zod` |
| **Sin autorización de datos personales** | **CONFIRMADO.** **0 casillas de verificación** en el formulario. Incumplimiento de la Ley 1581 de 2012 |
| Targets táctiles por debajo del mínimo | **CONFIRMADO y más extenso.** Los 3 botones de icono del header miden **36×36 px**. Además, los **7 enlaces del footer miden 17 px de alto** — no estaba en el diagnóstico |
| El menú móvil no cierra con `Escape` | **CONFIRMADO.** Los 14 enlaces siguen presentes tras pulsar `Escape` |
| El hero no está priorizado | **CONFIRMADO.** `loading="auto"`, `fetchPriority="auto"`, mostrado a 375 px pidiendo 2940 px |
| Imágenes sin dimensiones | **CONFIRMADO.** **15 de 15** sin atributo `width` |

### Refutado — el diagnóstico se equivocó

| Hipótesis | Resultado medido |
|---|---|
| **Habría fallos de responsive** | **REFUTADO.** Barrido de **9 rutas × 8 anchos = 72 pruebas: 0 desbordes horizontales.** La base responsive es sólida. Las historias UX-26 y F2.9 bajan de prioridad: pasan de corregir a vigilar que no se rompa |
| Los inputs provocarían zoom en iOS | **REFUTADO.** Ya tienen `font-size: 16px` |
| El JavaScript sería un problema | **REFUTADO.** Carga inicial real: **157 KB gzip**, por debajo del presupuesto de 180 KB. El code splitting **ya funciona**: `/contacto` es un chunk aparte de 30 KB. **UX-32 baja de prioridad** |

### Mucho peor de lo estimado

**El peso de imágenes del home es de 19 714 KB — 19,7 MB.** El presupuesto era 1,2 MB: **excedido 16 veces.**

| Ancho solicitado | Peso real por imagen |
|---|---|
| `w=200` | 11 KB |
| `w=800` | 78 KB |
| `w=2000` | 412 KB |
| **`w=2940`** (el único que usa el proyecto) | **876 KB** |

Desperdicio máximo medido: fotos de testimonio mostradas a **48 px** solicitando 2940 px — **61 veces sobredimensionadas**. Avatares de equipo a 112 px: 26 veces.

El lazy loading sí funciona (sin scroll solo bajan 2 imágenes), pero esas 2 ya pesan 2 025 KB: **la primera pantalla sola supera el presupuesto de la página entera.**

### Errores encontrados en este documento

| Error | Corrección |
|---|---|
| "las 8 rutas" | Son **9 URLs**: `sedes.$slug` genera dos (`/sedes/eje-cafetero` y `/sedes/cartagena`) |
| Prioridad de las historias de responsive | Rebajada: no hay desbordes que corregir |
| Prioridad de UX-32 (code splitting) | Rebajada: el presupuesto de JS ya se cumple |

### Hallazgos de infraestructura no previstos

| Hallazgo | Consecuencia |
|---|---|
| El build genera `wrangler.json` y `_headers`: **el destino es Cloudflare Workers** | **Sí hay runtime de servidor** → el rate limiting del spec 10 es posible. La IP del cliente llega en `CF-Connecting-IP`, no en `X-Forwarded-For` |
| `_headers` ya trae la caché inmutable de `/assets/*` | Ese punto del spec 09 ya está resuelto |
| **`npm run preview` está roto** | Espera `dist/server/server.js`, pero el preset de Cloudflare escribe en `.output/server/`. Afecta al método de verificación del spec 12 |
| **`npm run lint` falla con 7312 errores** | **Todos son `prettier/prettier: Delete ␍`** en 80 archivos. Causa: `core.autocrlf=true` + sin `.gitattributes` + prettier asumiendo `lf`. Defecto preexistente del entorno, ajeno al código. **Invalida la DoD del spec 12**, que exige que el lint pase. Ver spec 12 §3.1 |

### Verificado como correcto

- Las 9 rutas responden 200.
- `/sedes/bogota`, `/sedes/medellin` y `/noexiste` devuelven **404**: la lógica `tieneSitioPropio` funciona exactamente como se diseñó.
- Un solo `<h1>` por página.
- Sin errores de consola.

---

## Compuerta hacia el spec 02

### Verificación del diagnóstico

| | Punto | Resultado |
|---|---|---|
| ☑ | Diagnóstico por componente contrastado en ejecución | Hecho: confirmado, refutado y ampliado arriba |
| ☑ | Brechas B2–B6 confirmadas | Confirmadas, y más graves de lo descrito |
| ☑ | Brecha A3 confirmada | Confirmada, más el incumplimiento de Habeas Data |
| ☑ | Problema de imágenes cuantificado | **19,7 MB en el home** |
| ☑ | Responsive verificado en los 8 anchos | 72/72 sin desborde — hipótesis refutada |
| ☑ | Targets táctiles medidos | 36×36 px en header, 17 px de alto en footer |
| ☑ | **CLS medido en build de producción** | **0 en `/` y en `/sedes/cartagena`.** Cumple con holgura. Dato independiente de la compresión, válido tal cual |
| ⚠️ | **LCP medido en build de producción** | 3 060 ms (`/`) y 2 592 ms (venta), en 4G con CPU 4× lenta. **Cifra pesimista**: el servidor local no comprime y sirve `index.js` a 386 KB en vez de ~118 KB. La cifra homologable exige el despliegue real de Cloudflare |
| ☑ | **Parpadeo de tema e idioma reproducido** | **Confirmado y cuantificado: 5 521 ms.** Con inglés y oscuro guardados, la primera pintura sale en español y en blanco, y no corrige hasta pasados 5,5 s (CPU 6× lenta) |
| ☑ | `npm run preview` reparado | `npm run preview` invoca wrangler (lo que declara Nitro) y se añadió `npm run preview:node` para preview local sin Cloudflare |

### Completitud del documento

| | Punto | Estado |
|---|---|---|
| ☑ | Cada ítem `F*` trasladado a historia | Hecho en el spec 02 |
| ☑ | Estimaciones revisadas por quien implementa | Revisadas al ejecutar el sprint 1: UX-23 subió a P0, UX-26 y UX-32 bajaron a P2 |
| ☐ | Mapa del sitio validado con el cliente | **Pendiente — solo el cliente puede cerrarlo** |
| ☐ | Las 6 decisiones del cliente respondidas | 🔒 **Sin respuesta** |

---

## Estado de la compuerta: **VERIFICACIÓN CERRADA · COMPLETITUD ABIERTA**

**Todo lo que dependía de trabajo técnico está hecho.** El diagnóstico de este documento ya no es una hipótesis: se midió contra la aplicación en ejecución, se corrigió donde estaba equivocado y se amplió donde se quedaba corto.

Lo único que impide dar el spec 01 por cerrado son **dos puntos que solo el cliente puede resolver**: validar el mapa del sitio y responder las 6 decisiones abiertas.

**Recomendación: avanzar al spec 02 y a la ejecución del sprint 1.** Ninguna de las historias P0 del backlog depende de esos dos puntos, así que bloquear todo el proyecto esperándolos sería desperdiciar tiempo disponible. Las historias que sí dependen están aisladas en la épica E6 y marcadas 🔒.

### Lo ya ejecutado de este spec

| Historia | Estado |
|---|---|
| Arreglo del lint (bloqueaba la DoD de todo el proyecto) | ✅ 7 312 errores → 0, exit 0 |
| UX-22 · Hero: prioridad, respaldo, `dvh` | ✅ Terminada |
| UX-23 · Anchos de imagen | ✅ **19 714 KB → 332 KB (−98,3 %)** |
| UX-24 · `srcset`, `sizes`, dimensiones | ✅ **CLS = 0** |
| Reparación de `npm run preview` | ✅ Añadido `preview:node` |
