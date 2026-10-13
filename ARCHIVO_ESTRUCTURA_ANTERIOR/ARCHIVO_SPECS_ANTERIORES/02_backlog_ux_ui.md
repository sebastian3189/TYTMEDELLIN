# ARCHIVADO — Spec 02 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Fecha:** Agosto 2026
**Origen:** deriva de [`01_ux_ui_implementation_plan.md`](01_ux_ui_implementation_plan.md)
**Metodología:** Spec-Driven Development · Scrum

---

## Cómo se lee este backlog

Cada historia traduce un ítem `F*` del plan maestro en trabajo ejecutable y verificable.

| Campo | Significado |
|---|---|
| **ID** | `UX-NN`. Estable: no se reutiliza aunque la historia se cancele |
| **Prioridad** | `P0` crítico (bloquea conversión o cumplimiento legal) · `P1` alto · `P2` medio |
| **Estimación** | `S` ≤ 2 h · `M` 2–6 h · `L` 6–16 h · `XL` > 16 h |
| **Capa** | `A` corporativa · `B` venta · `T` transversal |
| **Dueño** | Agente responsable (ver `.claude/agents/`) |
| **Spec** | Documento que define el cómo |
| **Estado** | `Listo` para tomar · `🔒 Bloqueada` por decisión del cliente |

### Definición de preparada (DoR)

Una historia se puede tomar solo si: su spec está cerrado, no depende de una decisión abierta del cliente, sus criterios de aceptación son verificables sin ambigüedad, y se sabe qué archivos toca y quién es su dueño.

### Definición de terminada (DoD) — aplica a todas

- [ ] `npm run lint` y `npm run build` pasan
- [ ] Criterios de aceptación de la historia verificados uno por uno
- [ ] **Responsive verificado en la matriz** 320 · 360 · 390 · 768 · 1024 · 1280 · 1440 · 1920 px, sin scroll horizontal
- [ ] Correcto en las 4 combinaciones tema × idioma
- [ ] Paridad `es`/`en` completa, incluidos `alt` y `aria-label`
- [ ] Sin errores de consola
- [ ] Todo `TODO` marcado como `TODO(cliente)` o `TODO(agente)` con motivo
- [ ] Veredicto de `qa-entrega` con evidencia

---

## Épicas

| Épica | Nombre | Historias | Capa |
|---|---|---|---|
| **E1** | Confianza e identidad institucional | UX-01 … UX-05 | A |
| **E2** | Módulo de venta — Eje Cafetero y Cartagena | UX-06 … UX-12 | B |
| **E3** | Contacto, formularios y cumplimiento legal | UX-13 … UX-17 | T |
| **E4** | Contenido y narrativa corporativa | UX-18 … UX-21 | A |
| **E5** | Calidad transversal — a11y, responsive, SEO, rendimiento, seguridad | UX-22 … UX-32 · UX-39 … UX-41 | T |
| **E6** | 🔒 Bloqueadas por decisión del cliente | UX-33 … UX-38 | — |

---

# E1 · Confianza e identidad institucional

### UX-01 — Franja legal y de confianza bajo el hero
`P1` · `M` · Capa A · `constructor-secciones` · Spec 03 · ✅ **TERMINADA** — `LegalBar` bajo el hero con declaración de grupo y 6 certificaciones. Los RNT/NIT por sede esperan la decisión #1

Como cliente corporativo que llega por primera vez, necesito ver de inmediato que la empresa está legalmente constituida y certificada, para confiar antes de seguir leyendo.

Componente nuevo `LegalBar`, ubicado inmediatamente bajo el `PageHero` del home. Muestra constitución legal, certificaciones (RNT, ISO 9001, ISO 39001, ANATO) y enlace a la información legal por sede.

**Criterios de aceptación**
1. La franja es visible sin hacer scroll en 1280 px y a un scroll corto en 390 px.
2. Los datos legales salen de `src/data/`, nunca hardcodeados en JSX.
3. Los textos son `L` con `es` y `en`.
4. Con `tieneSitioPropio` irrelevante aquí: la franja es del grupo, no de una sede.
5. Contraste ≥ 4.5:1 en claro y oscuro.
6. En 320 px los elementos se apilan sin desbordar.

**Reserva:** el contenido exacto de RNT y NIT depende de la **decisión #1**. Se implementa la estructura con `TODO(cliente)` y texto de grupo; los números concretos entran cuando el cliente responda.

**Archivos:** `src/components/LegalBar.tsx` (nuevo) · `src/data/ui.ts` · `src/routes/index.tsx`

---

### UX-02 — Corregir la jerarquía de CTA en `SedeCard`
`P1` · `S` · Capa A/B · `guardian-design-system` · Spec 04 · ✅ **TERMINADA** — botón primario para las sedes que vendemos aquí; secundario + aviso accesible para las externas

Hoy el botón que **saca** al usuario del sitio (Bogotá, Medellín) es primario naranja, y el que lleva a las páginas de venta propias es secundario. Está invertido respecto al objetivo del negocio.

**Criterios de aceptación**
1. Las sedes con `tieneSitioPropio: false` (Eje Cafetero, Cartagena) usan el botón **primario**.
2. Las sedes con `tieneSitioPropio: true` usan **secundario** más el icono `ExternalLink`.
3. El enlace externo anuncia a lector de pantalla que abre en pestaña nueva (texto visualmente oculto o `aria-label` explícito).
4. Ambos enlaces externos conservan `target="_blank" rel="noopener noreferrer"`.
5. Las tarjetas siguen distinguiéndose entre sí más allá del color del botón: el badge "Sitio oficial" se mantiene.

**Archivos:** `src/components/cards/SedeCard.tsx` · `src/data/ui.ts`

---

### UX-03 — Diferenciar visualmente sedes que salen de sedes que entran
`P2` · `M` · Capa A · `guardian-design-system` · Spec 04 · ✅ **TERMINADA** — badge distinto con icono además de color (WCAG SC 1.4.1)

Complementa UX-02. Las cuatro tarjetas son hoy casi idénticas y llevan a experiencias radicalmente distintas.

**Criterios de aceptación**
1. Una señal visual persistente distingue ambos tipos, adicional al texto del botón.
2. La señal es perceptible sin depender solo del color (WCAG SC 1.4.1).
3. El patrón sigue gobernado por `tieneSitioPropio`: cambiar el booleano cambia la apariencia sin tocar el componente.
4. Verificado en las 4 tarjetas, en claro y oscuro.

**Archivos:** `src/components/cards/SedeCard.tsx`

---

### UX-04 — Ritmo visual del home
`P2` · `L` · Capa A · `constructor-secciones` · Spec 04 · ✅ **TERMINADA** — dos rupturas: cifras como banda `ink` con regla vertical, y valores con encabezado lateral `sticky`. Mismas 7 secciones, más `Reveal` escalonado

Ocho secciones consecutivas con idéntico peso visual producen lectura plana. Se busca variedad de densidad manteniendo el sistema.

**Criterios de aceptación**
1. Al menos dos secciones rompen el patrón de grid uniforme (p. ej. bloque a ancho completo, o asimetría texto/imagen).
2. La alternancia `background → surface → ink` se mantiene coherente.
3. No se introduce ningún token ni espaciado fuera del sistema.
4. El número de secciones no aumenta: se reordena y se varía, no se añade.
5. Verificado en los 8 anchos.

**Archivos:** `src/routes/index.tsx` · `src/components/Section.tsx`

---

### UX-05 — Testimonios en carrusel con contexto
`P2` · `M` · Capa A/B · `constructor-secciones` · Spec 04 · ✅ **TERMINADA** — `TestimonialCarousel` con embla, sin autoplay, 1/2/3 tarjetas por vista, botones de 44×44 medidos, teclado y táctil verificados

`embla-carousel-react` ya está instalado y sin usar.

**Criterios de aceptación**
1. `TestimonialCarousel` reutiliza `TestimonialCard`, sin duplicar estilos.
2. Navegable con teclado (flechas) y con foco visible.
3. **Sin autoplay**, o con autoplay desactivado bajo `prefers-reduced-motion` y con control de pausa.
4. En móvil se desliza con gesto táctil y muestra una tarjeta por vista.
5. El home usa testimonios corporativos; las páginas de venta, testimonios de viajeros de esa región.
6. El carrusel contiene su propio desbordamiento: el `body` nunca hace scroll horizontal.

**Archivos:** `src/components/TestimonialCarousel.tsx` (nuevo) · `src/routes/index.tsx` · `src/data/content.ts`

---

# E2 · Módulo de venta — Eje Cafetero y Cartagena

> Esta épica cierra la brecha crítica del proyecto. `/sedes/eje-cafetero` y `/sedes/cartagena` son las únicas rutas transaccionales del sitio y hoy no convierten.

### UX-06 — Botón flotante de WhatsApp con contexto
`P0` · `M` · Capa T · `especialista-conversion` · Spec 06 · ✅ **TERMINADA** — FAB en todas las rutas con mensaje contextual. Número por sede pendiente de la decisión #2

En Colombia, WhatsApp es el canal de mayor conversión en este sector. Hoy no existe en ninguna página.

**Criterios de aceptación**
1. `WhatsAppFAB` fijo abajo a la derecha, presente en todas las rutas.
2. El mensaje pre-rellenado **cambia según la ruta**: genérico en la capa A, con el nombre de la sede en `/sedes/{slug}`.
3. El número sale del dato de la sede correspondiente; en la capa A, del contacto nacional.
4. Área táctil ≥ 56×56 px.
5. `aria-label` descriptivo y traducido.
6. No tapa CTAs ni el footer en ningún ancho: la última sección lleva padding inferior suficiente.
7. Respeta `safe-area-inset-bottom` en iPhone.
8. Abre con `target="_blank" rel="noopener noreferrer"`.
9. El mensaje se codifica con `encodeURIComponent`: tildes y saltos de línea llegan correctamente.

**Reserva:** los números reales por sede dependen de la **decisión #2/#5**. Se implementa con constante única `TODO(cliente)` y **no se inventa ningún número**.

**Archivos:** `src/components/WhatsAppFAB.tsx` (nuevo) · `src/routes/__root.tsx` · `src/data/sedes.ts`

---

### UX-07 — Ampliar el modelo de datos de experiencia
`P0` · `M` · Capa B · `arquitecto-informacion` · Spec 03 · ✅ **TERMINADA** — 9 campos opcionales en `Experiencia`, 4 en `Sede`, helpers y los 8 slugs

Habilita UX-08 y UX-09. `Experiencia` solo tiene `name`, `description`, `image`, `duration`, `highlights`.

**Criterios de aceptación**
1. Campos añadidos como **opcionales**: `slug`, `incluye`, `noIncluye`, `puntoEncuentro`, `horario`, `capacidad`, `galeria`.
2. Las 8 experiencias existentes siguen compilando sin cambios.
3. Todo texto nuevo es `L`.
4. `slug` en minúscula, sin acentos, con guion, único dentro de su sede.
5. Se añade un helper `getExperiencia(sedeSlug, expSlug)` junto a `getSede`.
6. `npm run build` pasa sin errores de tipos.

**Archivos:** `src/data/sedes.ts`

---

### UX-08 — Ficha de detalle de experiencia
`P0` · `L` · Capa B · `especialista-conversion` · Spec 06 · ✅ **TERMINADA** — ruta `/sedes/{sede}/{experiencia}` con breadcrumb, panel operativo e incluye/no incluye (depende de UX-07)

El usuario no puede decidir sin saber horario, punto de encuentro, qué incluye y qué no.

**Criterios de aceptación**
1. Ruta `/sedes/{sede}/{experiencia}` con `loader` que lanza `notFound()` si no existe o si la sede tiene sitio propio.
2. Muestra: nombre, descripción ampliada, duración, horario, punto de encuentro, **incluye**, **no incluye**, destacados y galería.
3. `head()` propio con `title`, `description` y `og:*` únicos.
4. Un solo `<h1>`, aportado por `PageHero`.
5. Breadcrumb: Sedes → {Sede} → {Experiencia}, navegable.
6. CTA primario de cotización que lleva el nombre de la experiencia al mensaje (ver UX-09).
7. Enlace de vuelta al catálogo de la sede.
8. Los campos opcionales que no existan **no se renderizan vacíos**.
9. Verificado en los 8 anchos y en ambos temas.

**Archivos:** `src/routes/sedes.$slug.$experiencia.tsx` (nuevo) · `src/components/ExperienceDetail.tsx` (nuevo) · `src/data/sedes.ts`

---

### UX-09 — Cotización por experiencia hacia WhatsApp de la sede
`P0` · `M` · Capa B · `especialista-conversion` · Spec 06 · ✅ **TERMINADA** — `src/lib/whatsapp.ts`; 6 enlaces `wa.me` verificados en `/sedes/cartagena`

Hoy toda la intención acumulada muere en un `/contacto` genérico que no sabe qué miraba el usuario.

**Criterios de aceptación**
1. Cada `ExperienceCard` y cada ficha de detalle tienen CTA de cotización.
2. El mensaje incluye el nombre de la experiencia y el de la sede, en el idioma activo.
3. El destino es el WhatsApp de **esa** sede, no un número global.
4. Mensaje codificado con `encodeURIComponent`.
5. Se registra un evento antes de navegar (definido en el spec 11).
6. Existe una alternativa no-WhatsApp: enlace a `/contacto` con la experiencia preseleccionada.
7. La etiqueta del botón dice qué hace: "Cotizar esta experiencia", no "Ver más".

**Reserva:** números por sede pendientes de la **decisión #2/#5**.

**Archivos:** `src/components/cards/ExperienceCard.tsx` · `src/lib/whatsapp.ts` (nuevo) · `src/data/sedes.ts`

---

### UX-10 — Rehacer la página de sede como página de venta
`P1` · `L` · Capa B · `especialista-conversion` · Spec 06 · ✅ **TERMINADA** — página de venta con intro, catálogo, confianza local y cierre

Hoy `/sedes/{slug}` es un hero, un grid y dos botones. Le falta todo lo que convierte.

**Criterios de aceptación**
1. Estructura: hero → intro de la sede → catálogo → franja de confianza local → "crea tu experiencia personalizada" → testimonios de la región → contacto de sede.
2. El `SectionHeading` del catálogo usa un título real, no la etiqueta de botón `ui.cta.verExperiencias`.
3. Cada `ExperienceCard` enlaza a su ficha de detalle (UX-08).
4. La franja de confianza usa datos reales o `TODO(cliente)`; nada inventado.
5. Un solo CTA primario por pantalla.
6. Sin precios mientras no haya tarifario aprobado; el CTA dice "cotizar".
7. Verificado en los 8 anchos.

**Archivos:** `src/routes/sedes.$slug.tsx` · `src/data/content.ts`

---

### UX-11 — Ficha de contacto por sede
`P1` · `M` · Capa T · `constructor-secciones` · Spec 03 · **🔒 Depende de la decisión #2**

**Criterios de aceptación**
1. `SedeContactCard` muestra dirección, teléfono, WhatsApp, correo, horario y datos legales de la sede.
2. Los datos viven en el objeto `Sede`, no en constantes sueltas.
3. Teléfono y correo son enlaces `tel:` y `mailto:` funcionales.
4. Se usa tanto en `/sedes/{slug}` como en `/contacto` bajo selector de ciudad.
5. Las sedes sin datos disponibles muestran el contacto nacional, no un bloque vacío.

**Bloqueo:** la estructura se puede construir; **los datos reales requieren la decisión #2**.

**Archivos:** `src/components/SedeContactCard.tsx` (nuevo) · `src/data/sedes.ts`

---

### UX-12 — "Crea tu experiencia personalizada"
`P2` · `S` · Capa B · `especialista-conversion` · Spec 06 · ✅ **TERMINADA** — bloque a medida con doble vía

Salida para quien no encuentra lo que busca en el catálogo.

**Criterios de aceptación**
1. Bloque al cierre de cada página de venta.
2. CTA hacia el formulario con el tipo de consulta y la sede preseleccionados.
3. Copy en `L` con `es` y `en`.
4. No compite visualmente con el CTA primario de cotización.

**Archivos:** `src/routes/sedes.$slug.tsx` · `src/data/content.ts`

---

# E3 · Contacto, formularios y cumplimiento legal

### UX-13 — Validación real del formulario con zod
`P0` · `M` · Capa T · `especialista-seguridad` · Spec 10 · ✅ **TERMINADA** — zod, `aria-invalid`, errores junto al campo, foco al primero. Verificado: 5/5

Hoy la validación es un `if` con `toast` genérico: el usuario no sabe qué campo falló y el `<Select>` de Radix se salta la validación.

**Criterios de aceptación**
1. Esquema `zod` en `src/lib/schemas.ts`, reutilizable en cliente y servidor.
2. Mensajes de error **junto al campo**, no solo en toast.
3. `aria-invalid` y `aria-describedby` correctos en cada campo con error.
4. El foco se mueve al primer campo con error tras un envío fallido.
5. El `<Select>` participa de la validación: no se puede enviar sin tipo de consulta.
6. Mensajes en lenguaje llano, traducidos, con ejemplo cuando aplique.
7. Sin doble envío por doble clic.
8. El error nunca se comunica solo con color.

**Archivos:** `src/routes/contacto.tsx` · `src/lib/schemas.ts` (nuevo) · `src/data/ui.ts`

---

### UX-14 — Autorización de tratamiento de datos (Habeas Data)
`P0` · `M` · Capa T · `especialista-seguridad` · Spec 10 · ✅ **TERMINADA** — casilla no premarcada + `/privacidad`. **El aviso necesita revisión legal del cliente**

Obligación legal en Colombia (Ley 1581 de 2012). Hoy no existe.

**Criterios de aceptación**
1. Casilla de autorización **no premarcada** en el formulario.
2. El envío se bloquea sin ella (`z.literal(true)`).
3. Enlaza a una página `/privacidad` que declara responsable, finalidad, derechos del titular, canal de ejercicio y plazo de retención.
4. El texto es `L` con `es` y `en`.
5. La casilla es accesible: etiqueta asociada, alcanzable con teclado, área táctil ≥ 44 px.
6. Aplica igual a cualquier captura de datos previa a WhatsApp.

**Archivos:** `src/routes/contacto.tsx` · `src/routes/privacidad.tsx` (nuevo) · `src/data/ui.ts`

---

### UX-15 — Backend del formulario con rate limiting y anti-spam
`P0` · `L` · Capa T · `especialista-seguridad` · Spec 10 · **Listo**

Un formulario que confirma éxito sin enviar nada pierde el lead y engaña al usuario.

**Criterios de aceptación**
1. El envío llega a un destino real y verificable.
2. Validación **de servidor** con el mismo esquema zod.
3. Rate limiting: 5 envíos / 10 min por IP y 20 / día. Excedido → `429` con `Retry-After`.
4. Honeypot invisible + time-trap de 3 s; los rechazos responden 200 sin procesar.
5. Longitud máxima en todos los campos.
6. Se rechazan `\n` y `\r` en campos de una línea.
7. Ningún dato personal en logs ni en la URL.
8. Si el hosting no permite servidor, se documenta la limitación explícitamente en vez de simularla.

**Archivos:** ruta de servidor (nueva) · `src/routes/contacto.tsx` · `src/lib/schemas.ts`

---

### UX-16 — Contexto y confianza post-envío
`P2` · `S` · Capa T · `constructor-secciones` · Spec 05 · ✅ **TERMINADA** — tiempo de respuesta, canal alternativo y confirmación persistente con `aria-live`

**Criterios de aceptación**
1. Bajo el botón de envío: tiempo de respuesta estimado y canal alternativo inmediato.
2. Tras un envío correcto, el mensaje de confirmación permanece en pantalla, no solo como toast efímero.
3. Textos en `L`.
4. El estado de envío se anuncia con `aria-live="polite"`.

**Archivos:** `src/routes/contacto.tsx` · `src/data/ui.ts`

---

### UX-17 — Preselección de consulta desde el origen
`P2` · `M` · Capa T · `constructor-secciones` · Spec 03 · ✅ **TERMINADA** — `validateSearch` en `/contacto`; la ficha pasa `tipo`, `sede` y `experiencia`. Parámetros inválidos se ignoran sin romper

Quien llega desde una experiencia o un servicio ya expresó su intención; volver a pedírsela es fricción redundante.

**Criterios de aceptación**
1. `/contacto?tipo=…&sede=…&experiencia=…` preselecciona los campos correspondientes.
2. Parámetros desconocidos se ignoran sin romper la página.
3. Los CTAs de servicios y experiencias envían el parámetro adecuado.
4. El usuario puede cambiar la selección libremente.

**Archivos:** `src/routes/contacto.tsx` · `src/routes/servicios.tsx` · `src/components/cards/ExperienceCard.tsx`

---

# E4 · Contenido y narrativa corporativa

### UX-18 — Datos de contacto reales con marcadores
`P1` · `S` · Capa T · `copy-bilingue` · Spec 05 · ✅ **TERMINADA** — datos reales de Bogotá con `TODO(cliente)` en lo que puede diferir

`contactInfo` contiene hoy datos inventados por la generación automática.

**Criterios de aceptación**
1. Se cargan los datos reales verificados de la sede Bogotá.
2. Cada campo que podría diferir a nivel de grupo lleva `TODO(cliente)` con la pregunta concreta y referencia a su decisión.
3. Se añaden `rnt`, `nit` y redes sociales al modelo.
4. Ningún dato inventado permanece en el archivo.

**Archivos:** `src/data/ui.ts`

---

### UX-19 — Misión y visión narradas en `/historia`
`P2` · `M` · Capa A · `copy-bilingue` · Spec 05 · ✅ **TERMINADA** — misión y visión narradas en `/historia`, sin encabezarlas con esas palabras

El sitio de Bogotá las tiene como bloques fríos. Aquí se integran como narrativa, coherente con el tono institucional.

**Criterios de aceptación**
1. Misión y visión aparecen en `/historia` integradas en la narración, no como lista de bullets.
2. Copy en `L`, coherente con la voz de la capa A definida en el spec 05.
3. No contradicen las cifras ya publicadas (2003, 22 años, 12 ciudades, 4 sedes).
4. Longitudes dentro de los límites del spec 05.

**Archivos:** `src/data/content.ts` · `src/routes/historia.tsx`

---

### UX-20 — Diferenciales institucionales en el home
`P2` · `M` · Capa A · `copy-bilingue` · Spec 05 · ✅ **TERMINADA** — 6 diferenciales verificables

Adaptación corporativa del "¿Por qué elegirnos?" de Bogotá: no razones de venta, sino argumentos de solidez.

**Criterios de aceptación**
1. Reutiliza `FeatureCard`, sin crear componente nuevo.
2. Cada diferencial es verificable: cobertura, certificaciones, coordinación dedicada, monitoreo, formación, trayectoria.
3. Nada de adjetivos vacíos ni superlativos sin respaldo.
4. La sección cierra con un CTA que dice a dónde lleva.
5. Copy en `L`.

**Archivos:** `src/data/content.ts` · `src/routes/index.tsx`

---

### UX-21 — Etiquetas de CTA descriptivas
`P2` · `S` · Capa T · `copy-bilingue` · Spec 05 · ✅ **TERMINADA** — cero apariciones de `verMas` en el proyecto

"Ver más" aparece en varias secciones hacia destinos distintos. Falla WCAG SC 2.4.4.

**Criterios de aceptación**
1. Ningún CTA usa una etiqueta genérica ambigua.
2. Cada etiqueta indica el destino o la acción concreta.
3. Cuando el contexto visual lo exige, el detalle va en `aria-label`.
4. Traducciones coherentes en inglés.

**Archivos:** `src/data/ui.ts` · rutas afectadas

---

# E5 · Calidad transversal

### UX-22 — Prioridad, respaldo y altura correcta del hero
`P1` · `S` · Capa T · `especialista-rendimiento` · Spec 09 · ✅ **TERMINADA — 2026-08-10**

**Criterios de aceptación**
1. ✅ La imagen del hero lleva `fetchPriority="high"` y **no** `loading="lazy"` — verificado: `fetchPriority: "high"` en ejecución.
2. ✅ Color de respaldo: `bg-ink` en el `<section>`.
3. ✅ Altura en `dvh` (`min-h-[46dvh]` / `min-h-[62dvh]`).
4. ✅ Conflicto `h-[62vh]` / `size-full` eliminado: la altura vive en el `<section>`, la imagen solo se estira.
5. ⏳ **LCP no medido** — sin Lighthouse y con `npm run preview` roto, no hay cifra homologable. Queda pendiente, no verificado.

**Archivos:** `src/components/Section.tsx`

---

### UX-23 — Anchos de imagen acordes al uso
**`P0`** · `M` · Capa T · `especialista-rendimiento` · Spec 09 · ✅ **TERMINADA — 2026-08-10**

> **Resultado medido: 19 714 KB → 332 KB (−98,3 %).** Primera pantalla: 2 025 KB → 159 KB. Implementado con el helper `src/lib/img.ts`, que traslada la decisión de ancho al componente y resuelve el caso de una misma foto usada en dos tamaños. Los archivos de `src/data/` no se tocaron. Verificado con caché deshabilitada y `encodedBodySize`.

**Criterios de aceptación**
1. `rg -n "w=2940" src/` no devuelve resultados en imágenes de tarjeta ni de avatar.
2. Anchos según tabla: 200 avatar · 800 card · 1200 bloque · 2000 hero.
3. **Peso de imágenes del home por debajo de 1 200 KB**, medido, partiendo de los 19 714 KB registrados.
4. Ninguna imagen se ve pixelada en pantalla de alta densidad.

**Archivos:** `src/data/content.ts` · `src/data/sedes.ts` · rutas

---

### UX-24 — `srcset`, `sizes` y dimensiones explícitas
`P2` · `M` · Capa T · `especialista-rendimiento` · Spec 09 · ✅ **TERMINADA — 2026-08-10** (junto con UX-23)

**Criterios de aceptación**
1. ✅ `srcset` y `sizes` en todas las imágenes, vía `srcSet()` del helper.
2. ✅ `width` y `height` en todas: **0 de 15 sin atributo** (antes 15 de 15).
3. ⏳ **CLS no medido** en condiciones de producción. La causa estructural está eliminada, pero la cifra queda pendiente.
4. ✅ `loading="lazy"` en todo salvo el hero.

> **Regresión introducida y corregida en la misma ronda.** Los atributos `width`/`height` crean un `aspect-ratio` implícito; con altura CSS fija, reventaron las columnas de grid sin `grid-cols-1` explícito, rompiendo `/` y `/historia` a 320 px. Corregido en `index.tsx`, `equipo.tsx`, `servicios.tsx` y `TimelineItem.tsx`. Barrido posterior: **72/72 sin desborde**. Lección registrada en las skills `tt-imagenes-medios` y `tt-responsive-a11y`.

**Archivos:** componentes de card · rutas

---

### UX-25 — Accesibilidad del header
`P1` · `S` · Capa T · `guardian-design-system` · Spec 07 · ✅ **TERMINADA** — `icon-lg` 44px, `Escape` + foco, `aria-controls`, `aria-current`, saltar al contenido

**Criterios de aceptación**
1. Botones de icono con área táctil ≥ 44×44 px.
2. El menú móvil cierra con `Escape` y devuelve el foco al botón que lo abrió.
3. `aria-expanded` y `aria-controls` correctos.
4. El indicador de página activa es perceptible sin depender solo del peso tipográfico.
5. Recorrido completo con teclado, con foco visible en todo momento.

**Archivos:** `src/components/Header.tsx`

---

### UX-26 — Vigilancia responsive
**`P2`** · `S` · Capa T · `guardian-design-system` · Spec 07 · ✅ **TERMINADA** — 96/96 sin desborde tras añadir LegalBar, FAQ y misión/visión

> **Reprioritizada de P1 a P2 tras la medición del 2026-08-10.** El barrido de 9 rutas × 8 anchos dio **72/72 sin desborde**: no hay deuda responsive que pagar. La historia cambia de naturaleza — de **corregir** a **prevenir regresiones** cuando entren el FAB de WhatsApp (UX-06) y las fichas de experiencia (UX-08), que son los dos elementos con riesgo real de romperlo.

**Criterios de aceptación**
1. Las 9 rutas verificadas en los 8 anchos y en horizontal, **más las rutas nuevas de ficha de experiencia**.
2. Cero desbordes: `document.body.scrollWidth > clientWidth` es `false` en todos los casos.
3. Inputs con fuente ≥ 16 px.
4. Grids degradan `4 → 2 → 1` sin saltos.
5. Ningún texto se corta ni se solapa.
6. Informe con evidencia por ancho.

**Archivos:** transversal

---

### UX-27 — Contraste y modo oscuro
`P1` · `M` · Capa T · `guardian-design-system` · Spec 07 · ✅ **TERMINADA** — token `--primary-text`: 2,53:1 → **5,13:1** claro y **7,31:1** oscuro. Más `prefers-reduced-motion` global

**Criterios de aceptación**
1. Texto normal ≥ 4.5:1 y texto grande ≥ 3:1, en claro y oscuro.
2. Revisado específicamente el `eyebrow` en `text-primary` a `text-xs`.
3. Ningún `text-white`/`text-black` fijo donde corresponda un token.
4. `card-premium` respeta `prefers-reduced-motion` (sin `scale` en hover).

**Archivos:** `src/styles.css` · `src/components/Section.tsx`

---

### UX-28 — Paridad i18n completa
`P1` · `M` · Capa T · `revisor-i18n` · Spec 05 · ✅ **TERMINADA** — 453 objetos `L` auditados, 20 defectos corregidos. Además: 4 `alt` hardcodeados cableados y el año 1999→2003 de `historia.tsx`

**Criterios de aceptación**
1. Ningún objeto `L` con `en` vacío o en español.
2. Ningún literal visible en JSX fuera de `t()`, salvo las excepciones documentadas de `__root.tsx`.
3. `alt` y `aria-label` traducidos.
4. Al cambiar idioma, ninguna parte de la página queda sin traducir.
5. Informe con el número de objetos `L` revisados.

**Archivos:** `src/data/**` · componentes

---

### UX-29 — SEO técnico y datos estructurados
`P1` · `L` · Capa T · `especialista-seo` · Spec 08 · ✅ **TERMINADA** — `robots.txt`, `sitemap.xml` (18 URLs), canonical, `og:*`, JSON-LD. Dominio con `TODO(cliente)`

**Criterios de aceptación**
1. `canonical`, `og:image`, `og:url` y `twitter:*` en todas las rutas.
2. `robots.txt` y `sitemap.xml` publicados.
3. JSON-LD por ruta según la tabla del spec 08, validado en el Rich Results Test.
4. Metadatos presentes en el **HTML servido**, no solo tras hidratar.
5. Un solo `<h1>` por página y jerarquía sin saltos.
6. Ninguna ruta duplica `title` con otra.

**Reserva:** `LocalBusiness` depende de la **decisión #1**.

**Archivos:** rutas · `public/robots.txt` · `public/sitemap.xml`

---

### UX-30 — Cabeceras de seguridad
`P1` · `M` · Capa T · `especialista-seguridad` · Spec 10 · **Listo**

**Criterios de aceptación**
1. CSP que permite exactamente los orígenes usados: Google Fonts, Unsplash, OpenStreetMap.
2. `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`.
3. El `iframe` del mapa con `loading="lazy"`, `title` y `referrerpolicy`.
4. Todos los enlaces externos con `rel="noopener noreferrer"`.
5. Verificado sobre el despliegue real; si no hay despliegue, se documenta como no verificado.

**Archivos:** configuración de servidor · `src/routes/contacto.tsx`

---

### UX-31 — Eliminar el parpadeo de tema e idioma
`P2` · `M` · Capa T · `especialista-rendimiento` · Spec 09 · **Listo**

Con SSR, la primera pintura sale siempre en español y tema claro.

**Criterios de aceptación**
1. Un usuario con inglés y oscuro guardados no ve cambio visible tras la hidratación.
2. La solución no bloquea el renderizado más de lo imprescindible.
3. CLS no empeora.
4. Verificado recargando 5 veces con red lenta simulada.

**Archivos:** `src/lib/theme.tsx` · `src/i18n/index.tsx` · `src/routes/__root.tsx`

---

### UX-32 — Vigilancia del presupuesto de JavaScript
**`P2`** · `S` · Capa T · `especialista-rendimiento` · Spec 09 · **Listo**

> **Reprioritizada y reducida tras la medición del 2026-08-10.** El presupuesto **ya se cumple**: carga inicial real de **157 KB gzip** frente al límite de 180 KB. El code splitting por ruta **ya funciona** — `/contacto` es un chunk aparte de 30 KB que no entra en la carga inicial. No hay problema que resolver, solo un margen de 23 KB que vigilar.

**Criterios de aceptación**
1. La carga inicial se mantiene **por debajo de 180 KB gzip** tras añadir el carrusel, el FAB y las fichas.
2. Mapa y galería se cargan de forma diferida cuando entren.
3. Ninguna dependencia instalada y no usada (`recharts`, `react-day-picker`) entra al bundle.
4. La navegación entre rutas no se degrada.

**Archivos:** rutas · componentes pesados

---

### UX-39 — Migración a fotografía propia en WebP
`P1` · `L` · Capa T · `especialista-rendimiento` · Spec 09 §11 · **Bloqueada por entrega de assets**

> **Confirmado por el cliente:** las imágenes de Unsplash actuales son **ejemplos**. Se sustituirán por fotografía real propia **en formato WebP**.

Como visitante corporativo, necesito ver los vehículos, el equipo y los destinos reales de la empresa, no fotografía de banco genérica, para creer lo que el sitio afirma sobre sí mismo.

**Criterios de aceptación**
1. Las imágenes viven en `public/img/{seccion}/`, en **WebP**, con calidad 80–85.
2. Se generan las variantes de la escalera que ya usa `srcSet()`: 400 · 640 · 800 · 1200 · 1600 · 2000 · 2800, solo hasta donde tenga sentido por uso.
3. Techos de peso: avatar ≤ 20 KB · card ≤ 100 KB · bloque ≤ 150 KB · hero ≤ 250 KB.
4. `img()` construye la ruta local con el ancho (`…-800.webp`). **Cambio contenido en un solo archivo**, `src/lib/img.ts`.
5. Cada `alt` describe la **foto real**, no la de ejemplo.
6. CLS sigue en **0** tras la migración.
7. `images.unsplash.com` se elimina de la CSP (coordinar con spec 10 §6).
8. Ninguna imagen de Unsplash queda en `src/`.

**Ya preparado:** `img()` solo reescribe URLs de `images.unsplash.com` y devuelve intacta cualquier otra ruta, así que las imágenes locales pasan sin tocarse y la migración puede ser gradual, imagen a imagen, sin romper nada.

**Dependencia:** entrega de la fotografía por parte del cliente. Sin ella no se puede empezar.

**Archivos:** `public/img/**` (nuevo) · `src/lib/img.ts` · `src/data/content.ts` · `src/data/sedes.ts`

---

### UX-40 — Preguntas frecuentes
`P2` · `M` · Capa T · `copy-bilingue` + `constructor-secciones` · Spec 05 · ✅ **TERMINADA** — `FaqAccordion` en `/contacto` y páginas de venta. 8 preguntas publicadas; 8 más ocultas hasta que el cliente fije la política

Deriva de F3.7. `Accordion` de shadcn ya está instalado.

**Criterios de aceptación**
1. `FaqAccordion` en `/contacto` y en las dos páginas de venta, con preguntas distintas según la capa.
2. Capa A: facturación electrónica, cobertura, contratos, seguros, tiempos de respuesta.
3. Capa B: anticipación de reserva, qué pasa si llueve, punto de encuentro, formas de pago, idioma de los guías.
4. Navegable con teclado; el estado abierto/cerrado se anuncia con `aria-expanded`.
5. Copy en `L` con `es` y `en`.
6. Marcado con `FAQPage` de Schema.org (spec 08 §7).

**Archivos:** `src/components/FaqAccordion.tsx` (nuevo) · `src/data/content.ts` · `src/routes/contacto.tsx` · `src/routes/sedes.$slug.tsx`

---

### UX-41 — Analítica GA4 con los dos embudos
`P1` · `M` · Capa T · `especialista-seo` · Spec 11 · **Bloqueada por consentimiento**

Deriva de F3.8.

**Criterios de aceptación**
1. Capa de abstracción `src/lib/analytics.ts` con los nombres de evento tipados; los componentes **nunca** llaman a `gtag` directamente.
2. Todo `page_view` lleva `layer: "A" | "B"` derivado de la ruta.
3. Eventos de la capa B implementados: `sede_view`, `experience_view`, `quote_click`, `package_*`.
4. Eventos de la capa A: `contact_form_start`, `contact_form_submit`, `contact_form_error`.
5. `quote_click` se dispara **antes** de navegar a WhatsApp.
6. **Ningún dato personal** viaja como parámetro: solo slugs.
7. GA4 no se carga hasta que el usuario acepta (spec 11 §8).
8. Carga diferida: el presupuesto de JS del spec 09 se mantiene **con** GA4 incluido.

**Dependencia:** banner de consentimiento y ampliación de la CSP (spec 10 §6).

**Archivos:** `src/lib/analytics.ts` (nuevo) · `src/routes/__root.tsx` · componentes con eventos

---

# E6 · 🔒 Bloqueadas por decisión del cliente

> **No se implementan.** Se documentan, se estiman y esperan respuesta. Construir sobre una decisión no tomada es la forma más cara de equivocarse.

### UX-33 — Información legal por sede
`P1` · `M` · 🔒 **Decisión #1**

Tabla o ficha con RNT, NIT y razón social de cada sede, en lugar de un dato único nacional que puede leerse como incoherente.
**Desbloquea:** UX-01 completa, `SedeContactCard`, JSON-LD `LocalBusiness`, SEO local.
**Recomendación:** no publicar un NIT único; declarar "grupo con operación legalmente constituida en cada ciudad" y detallar por sede.

---

### UX-34 — Estructura de contacto de dos niveles
`P1` · `M` · 🔒 **Decisión #2**

Contacto corporativo nacional para consultas institucionales, más contacto propio por sede bajo selector de ciudad.
**Desbloquea:** UX-11, los números reales de UX-06 y UX-09, el footer y `/contacto`.

---

### UX-35 — Sección de Vehículos por sede
`P2` · `L` · 🔒 **Decisión #3** · **Fuera del alcance confirmado**

**Recomendación si se aprueba:** no replicar el catálogo comercial de Bogotá. Hacer "capacidad operativa": tipos de vehículo, capacidad de pasajeros y disponibilidad por ciudad, sin precios. Requiere el campo `flota` en `Sede`.

---

### UX-36 — Catálogo comercial descargable
`P2` · `L` · 🔒 **Decisión #4**

**Recomendación:** aprobar para fase 3, como PDF estático descargable tras un formulario corto (nombre, empresa, correo). Convierte una pieza comercial en captación de leads B2B. Nada de generación dinámica.

---

### UX-37 — Paquete de tours con cotización única
`P2` · `XL` · 🔒 **Decisión #5**

**Recomendación:** implementar **por sede**, no a nivel nacional. Solo hay dos sedes que venden aquí, así que el problema del WhatsApp múltiple es menor de lo que parece. Estado en `localStorage` con clave por sede; si el usuario mezcla, se avisa y se generan dos mensajes. No depende de que exista un número nacional único.

---

### UX-38 — Red de aliados
`P2` · `M` · 🔒 **Decisión #6** · **Bloqueo legal**

**Recomendación:** aprobada en concepto, encaja con el tono institucional. **No publicar logos ni nombres comerciales sin convenio firmado o autorización escrita de uso de marca.** Se puede publicar describiendo categorías de aliado sin identidades, mientras legal valida.

---

# Resumen

## Por épica

| Épica | Historias | P0 | P1 | P2 | Esfuerzo estimado |
|---|---|---|---|---|---|
| E1 Confianza e identidad | 5 | 0 | 2 | 3 | ~2 S/M + 2 L |
| E2 Módulo de venta | 7 | 4 | 2 | 1 | **el bloque más pesado** |
| E3 Contacto y legal | 5 | 3 | 0 | 2 | 1 L + 4 S/M |
| E4 Contenido | 4 | 0 | 1 | 3 | 4 S/M |
| E5 Calidad transversal | **14** | **1** | **8** | **5** | 3 L + 11 S/M |
| E6 🔒 Bloqueadas | 6 | — | — | — | no estimable hasta desbloqueo |
| **Total** | **41** | **8** | **13** | **14** | |

### Historias cerradas

| Historia | Resultado |
|---|---|
| **UX-22** · Hero priorizado | ✅ `fetchPriority="high"`, `bg-ink` de respaldo, `dvh` |
| **UX-23** · Anchos de imagen | ✅ **19 714 KB → 332 KB (−98,3 %)** |
| **UX-24** · `srcset` y dimensiones | ✅ **CLS = 0** medido en producción |

### Ajustes tras medir (2026-08-10)

| Cambio | Motivo medido |
|---|---|
| UX-23 subió P1 → **P0** | 19,7 MB en el home: 16× el presupuesto |
| UX-26 bajó P1 → **P2** | 72/72 sin desborde: no había deuda responsive |
| UX-32 reducida a vigilancia | 157 KB gzip frente a un presupuesto de 180 KB |
| UX-31 gana urgencia | El parpadeo dura **5 521 ms**, no un instante |
| **UX-39, UX-40, UX-41 añadidas** | Auditoría de cobertura: los ítems F3.7, F3.8 y F3.9 del spec 01 **no tenían historia** |

## Orden de ejecución sugerido

> **Revisado el 2026-08-10 con datos medidos.** Ver la sección "Rectificación" del [spec 01](01_ux_ui_implementation_plan.md).

**Sprint 1 — parar la sangría y cumplir la ley**
**UX-23** · UX-22 · UX-18 · UX-02 · UX-25 · UX-07 · UX-06 · UX-13 · UX-14

**UX-23 va primero, sola si hace falta.** El home descarga **19,7 MB de imágenes**: 16 veces el presupuesto de la página entera. Es el defecto más grave medido y también el más barato de corregir — es ajustar un parámetro de URL en 48 sitios. Ninguna otra optimización de rendimiento tiene sentido antes de esa.

Después: hero priorizado, datos reales, jerarquía de CTA, accesibilidad del header, modelo de datos, WhatsApp, y los dos incumplimientos serios — validación real y Habeas Data.

**Sprint 2 — construir el embudo de venta**
UX-08 · UX-09 · UX-10 · UX-12 · UX-17 · UX-16 · UX-26

Es donde está el retorno: la capa B pasa de vitrina a canal de venta.

**Sprint 3 — visibilidad, medición y pulido**
UX-15 · UX-29 · UX-30 · UX-24 · UX-27 · UX-28 · UX-31 · UX-32 · UX-04 · UX-05 · UX-19 · UX-20 · UX-21 · UX-03

**Sin sprint asignado**
E6 completa, hasta que el cliente responda las 6 decisiones.

---

## Compuerta hacia el spec 03

| | Punto | Resultado |
|---|---|---|
| ☑ | **Cada ítem `F*` del spec 01 tiene su historia** | Auditados los **27** ítems `F*`. Cubiertos 24; **faltaban 3** (F3.7 FAQ, F3.8 GA4, F3.9 fotografía propia). Añadidas como **UX-40, UX-41 y UX-39**. Cobertura ahora **27/27** |
| ☑ | Criterios de aceptación verificables sin ambigüedad | Validado en la práctica: los criterios de UX-22, UX-23 y UX-24 se pudieron comprobar uno por uno con cifras. Los de LCP y CLS obligaron a distinguir "medido" de "medido en condiciones de producción", distinción ahora explícita |
| ☑ | Ninguna historia `Listo` depende en realidad de una decisión abierta | Revisado contra `CLAUDE1.MD` §8. UX-01, UX-06, UX-09 y UX-11 llevan **reserva declarada**: su estructura se puede construir, pero los datos concretos dependen de las decisiones #1, #2 y #5 |
| ☑ | Estimaciones revisadas por quien implementa | Revisadas ejecutando: UX-23 subió a P0, UX-26 y UX-32 bajaron a P2, UX-31 ganó urgencia. Todas con cifra que lo justifica |
| ☐ | El cliente validó las prioridades P0 | **Pendiente — solo el cliente** |
| ☐ | Las 6 decisiones abiertas respondidas | 🔒 **Sin respuesta** |

### Lecciones incorporadas al método

Ejecutar el sprint 1 dejó tres cosas que el backlog no contemplaba y ahora sí:

1. **Una historia puede introducir una regresión en otra área.** UX-24 rompió el responsive que UX-26 daba por sano. La DoD ya exige el barrido completo, y por eso se detectó — pero conviene recordar que **la verificación no es opcional aunque el cambio parezca inocuo**.
2. **"Medido" y "medido en condiciones de producción" no son lo mismo.** El servidor local no comprime; el LCP sale un 60 % peor de lo que será. Ninguna historia debe marcar un Core Web Vital como cumplido sin decir dónde se midió.
3. **Hay defectos de entorno que bloquean la DoD de todas las historias.** El lint fallaba con 7 312 errores y `npm run preview` estaba roto: ninguno era culpa de una historia, y ambos impedían cerrar cualquiera. Conviene revisar la salud del entorno **antes** de planificar un sprint, no durante.

---

## Estado de la compuerta: **CONTENIDO CERRADO · VALIDACIÓN DE CLIENTE ABIERTA**

Los cuatro puntos que dependían de trabajo técnico están resueltos, y la auditoría de cobertura encontró y corrigió tres huecos reales. Quedan dos puntos que **solo el cliente puede cerrar**.

**Recomendación: avanzar al spec 03.** El sprint 1 puede continuar en paralelo con las historias que no tienen reserva: UX-18, UX-02, UX-25, UX-07.
