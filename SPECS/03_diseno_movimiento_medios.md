# Spec 03 — Diseño, movimiento y medios

**Depende de:** Specs 01 y 02  
**Dueño:** `director-diseno-marca`

## Sistema de interfaz

Usar tokens para `brand`, `ink`, `background`, `surface`, `text`, `muted`, `border`,
`focus`, `success`, `warning` y `danger`. Cuerpo mínimo de 16 px, lectura de 60–75
caracteres, espaciado basado en 4 px, foco visible y targets de 44×44 px.

Componentes base: header, navegación móvil, footer, botones, enlaces, campos,
checkbox, select, alertas, cards, hero, encabezado de sección, confianza, galería,
acordeón, breadcrumb, CTA, cotización, WhatsApp, estados vacíos y 404. Cada componente
documenta variantes, estados y responsive; no se duplica por diferencias cosméticas.

## Dirección y composición

Sensación local, sobria, humana y segura. Fotografía real con luz y edición
consistentes. Evitar clichés, collages saturados, degradados decorativos y plantillas
genéricas. El naranja guía acciones y énfasis, no domina la página.

Imágenes web: WebP/AVIF cuando proceda, dimensiones explícitas, `srcset` y `sizes`.
Hero con prioridad; contenido bajo el pliegue con carga diferida. Alt útil o vacío si
es decorativa. SVG para iconos y logo cuando exista el maestro.

## Movimiento web sin créditos

Puede incluir:

- scroll cinematográfico suave sin secuestrar el control;
- títulos construidos por palabras;
- profundidad y parallax moderado;
- galerías horizontales con teclado y táctil;
- tarjetas reactivas al cursor con alternativa sin hover;
- contadores basados solo en cifras verificadas;
- transiciones entre páginas y menú dinámico;
- botones magnéticos con área táctil estable;
- línea de ruta animada;
- revelado del logo sin alterarlo;
- versión ligera móvil y `prefers-reduced-motion`.

Todo efecto debe orientar, jerarquizar o narrar. No puede bloquear lectura, acción ni
Core Web Vitals.

### Dirección del prototipo para revisión

Concepto: cuaderno de viaje local. Composición asimétrica, fotografía del archivo,
índices de recorrido y capítulos. Montserrat e Inter se sirven localmente. El naranja
sigue siendo la acción; superficies cálidas/neutras y tonos atmosféricos acompañan
la fotografía de cada experiencia. Es una propuesta para revisión visual.

La referencia Travel Next Level informa el ritmo de escenas y galerías, no la
identidad. Cada tour tiene tres capítulos específicos. En escritorio, imagen y texto
cambian por scroll y por botones accesibles; en móvil y movimiento reducido se leen
en orden. Galerías con botones, arrastre, teclado y visor nativo con Escape.

`site/src/media.json` registra 97 copias optimizadas y su procedencia. Se conservan
los originales de IMAGENES. Jardín, miradores y vehículos usan activos identificados
en la web de la marca. Se excluyen gráficos promocionales como portada fotográfica.

## Adaptación de Scrollcraft, sin generación

Se incorpora únicamente el motor JS del commit
`75d81f74e83692add18cd7a8a8e078b8a887a579` (MIT, Nate Herk), con adaptador React
restringido a progreso y parallax. No se instala el plugin, reset visual ni scripts
de Kie, subida, codificación o servidor. No sustituye la identidad aprobada.

Dirección aplicada al prototipo: apertura con foto completa y texto semántico;
desplazamiento fotográfico moderado al salir de la portada; capítulos existentes
como momento narrativo; galería y formulario como resolución útil. En Guatapé,
una línea ilustrativa del camino se dibuja con el avance (no es un mapa geográfico)
y acompaña sus capítulos. No se añaden secciones ni altura vacía por imponer efectos.
Móvil y movimiento reducido conservan foto, título, capítulos y línea estáticos.
Es mejora del prototipo para revisión visual, no aprobación de publicación.

El texto por palabras se compone en React, no con la función externa que reescribe
el DOM. Sin recortes nuevos ni vídeo, no se afirma tener un paisaje 3D multicapa.
Guía operativa integrada en `skills/tt-marca-diseno/references/scrollcraft.md`.

## Higgsfield: producción con créditos

Dirección recomendada: una producción continua de 15 segundos, no varias películas.
Solo se genera tras aprobar brief, storyboard, formato, referencias, prompt y costo
máximo.

### Descubrimiento audiovisual y contrato web

El director de diseño actúa como especialista audiovisual y de experiencia de
usuario. Antes de implementar una pieza o producirla en Higgsfield, aplica la
entrevista y mejora del prompt de `skills/tt-higgsfield-control/SKILL.md`.
Debe entender qué debe sentir, comprender y hacer el visitante, y traducirlo a
planos, ángulos, perspectiva, movimientos de cámara, ritmo, luz y continuidad.

Registrar aquí, por pieza, sin crear otro spec: respuestas confirmadas y dudas;
curva emocional; storyboard; prompt original si existe y versión mejorada;
justificación de cambios; contrato de scroll/tiempo/capas/texto/CTA; variantes móvil,
poster y movimiento reducido; presupuesto técnico y de créditos; aprobación.
No hay pieza nueva aprobada por añadir estas instrucciones.

La entrevista se concentra en decisiones faltantes y se realiza antes de implementar
la interacción dependiente. Constructor valida factibilidad, director solicita
aprobación y auditor comprueba la pieza integrada. El adaptador ScrollScene actual
solo permite flow/parallax: producir un vídeo no lo vuelve compatible automáticamente.

| Control | Créditos |
|---|---:|
| Esperado | 169 |
| Reserva de corrección | 15 |
| Techo recomendado | 184–185 |
| Límite absoluto | **200** |
| Saldo inicial informado | 1010 |
| Saldo tras 185 | 825 |
| Saldo mínimo al agotar el límite | 810 |

Antes de cualquier operación con costo:

```powershell
./hooks/higgsfield-credit-guard.ps1 reserve -Credits <maximo> -JobId <id-unico>
```

Si el costo máximo se desconoce o la reserva falla, no se ejecuta. No se divide una
solicitud para eludir el límite ni se repite por timeout. `commit` confirma el consumo
y `release` solo libera trabajos cancelados sin cobro. El hook gobierna el flujo del
repositorio; un límite de cuenta en Higgsfield debe configurarse también si existe.

### Pieza: película de apertura del inicio

**Estado: CLIP APROBADO POR EL USUARIO — integración en curso, pendiente de
auditoría.** Actualizada el 2026-10-11 por `director-diseno-marca` (registro; este
rol no generó ni reservó en esta ronda). Clip elegido: `clip1d-1080p.mp4`. Consumo
de la pieza 100 créditos; guard (enteros) 101/200; saldo Higgsfield informado 910.
Movimiento en navegador e inicio móvil/escritorio siguen sin aprobar.

#### A. Respuestas del usuario (confirmadas)

Brief inicial (textual): película interactiva de apertura en el inicio, 12–15 s,
controlada por scroll (bajar avanza, subir retrocede; sin autoplay). Siete
momentos: Llegada, Recibimiento, Inicio del viaje, Metrocable, Comuna 13, Guatapé,
Cierre con llamada a reservar. Curva emocional aprobada.

Decisiones posteriores del usuario, en orden:

1. Estructura híbrida (clips generados + fotos reales animadas por código).
2. **Cambio de plan:** un único clip generado sustituye Llegada + Recibimiento. Inicia
   en la panorámica real `IMAGENES/FotosMedellin/City Tour/IMG_3722.jpg` (subida
   `subida/clip1-inicio.jpg`) y termina en un grupo de 7 turistas frente al Palacio
   de la Cultura / Plaza Botero: foto aportada por el usuario
   `IMAGENES/apertura-pelicula/grupo-palacio-cultura.webp` (recorte 16:9
   `subida/clip1c-final.jpg`).
3. **Permisos confirmados por el usuario:** las 7 personas del grupo autorizan su
   animación con IA; también la captura del letrero Medellín usada en el intento 2.
4. Topes de la pieza aprobados sucesivamente: 25 → 40 → **100** créditos.
5. Aprobó el clip `clip1d-1080p.mp4` como clip elegido.
6. Fotos de van (`van-exterior.png`, `van-interior-cabina.png`,
   `van-interior-pasajeros.webp`) y de Metrocable (`metrocable-valle.webp`,
   `metrocable-estacion.png`) en `IMAGENES/apertura-pelicula/`: referencia o de
   internet; **no publicables ni subibles**. Interior del vehículo: `PENDIENTE CLIENTE`.

#### B. Generaciones y consumo (registro)

| # | Modelo / resolución | Final (`end_image`) | Créditos | Resultado | Estado |
|---|---|---|---|---|---|
| 1 | MiniMax H3 Max 768p | Van de historia `IMG_9541` | 12,5 | `clip1-llegada.mp4` | Descartado: fachada inventada |
| 2 | MiniMax H3 Max 768p | Captura letrero Medellín (permiso confirmado) | 12,5 | `clip1b-letrero.mp4` | Descartado: final blando, 808×454 |
| 3 | Seedance 2.5 borrador 480p | `clip1c-final.jpg` | 15 | `clip1c-borrador-480p.mp4` | Rasgos correctos; desenfoque de movimiento y cartel inventado |
| 4 | Seedance 2.5 1080p | `clip1c-final.jpg` | 60 | `clip1d-1080p.mp4` | **ELEGIDO**: 1920×1080, 24 fps, 5 s, HEVC 10-bit, sin audio |

Total de la pieza: **100 créditos**. Guard en enteros: **101/200** (los 12,5 se
registran redondeados). Saldo Higgsfield informado: 910.

#### C. Prompt final usado (intento 4, literal)

```text
One continuous, slow and smooth camera move, like a stabilized drone at constant gentle speed. Start on the real hillside view over Medellín's valley. The camera glides forward and gradually descends over the rooftops toward the city center, then lowers calmly to street level in Plaza Botero in front of the Palacio de la Cultura, and settles on the group of seven travelers standing together with the Botero sculpture and tall cypress trees behind them. Every frame stays sharp and in focus: no motion blur, no speed ramps, no whip moves, no sudden jumps. Warm late-afternoon daylight. Keep the mountains, buildings, sculpture and every person's face, hair and clothing exactly as in the final image. No text, signs, letters or logos added anywhere; no new people; the group stays still and smiling. End on a stable wide shot matching the final image.
```

Correcciones respecto al intento 3 (propuestas del director): cámara lenta y
constante, prohibición explícita de desenfoque y saltos, y de texto o carteles.

#### D. Advertencia de veracidad

El clip une espacialmente Comuna 13 (ladera de inicio) y el Palacio de la Cultura,
que no son contiguos. Es una **transición cinematográfica**, no el registro real de
un recorrido; los edificios intermedios son generados. Ningún texto del sitio debe
presentarlo como trayecto real ni como toma de dron.

#### E. Contrato web vigente (`ScrubHero`; lo implementa el constructor)

Canvas + secuencia de fotogramas en el inicio, scroll nativo, simétrico al subir,
sin captura de rueda, teclado o gesto.

| Tramo | Fuente | Movimiento |
|---|---|---|
| 1 | `clip1d-1080p.mp4` (Llegada → grupo en Plaza Botero) | Vídeo controlado por scroll |
| 2 | Interior del vehículo | `PENDIENTE CLIENTE`: tramo omitido |
| 3 | Metrocable `IMAGENES/FotosMedellin/City Tour/IMG_1180 (1).jpg` | Foto real animada por código, sin créditos |
| 4 | Comuna 13 `IMAGENES/FotosMedellin/City Tour/IMG_1196 (1).jpg` | Foto real animada por código, sin créditos |
| 5 | Guatapé `IMAGENES/FotosMedellin/GUATAPE/IMG_3519 (1).jpg` | Foto real animada por código, sin créditos; cierre con CTA |

CTA HTML `<a>` siempre accesible; «Saltar introducción»; canvas `aria-hidden` con
resumen textual. `prefers-reduced-motion`, `saveData` o error de carga → poster +
texto. Sin audio. Sustituye el reparto 2 clips + 3 fotos de la versión anterior.

#### F. Pendientes

- Auditoría (Spec 05/06) del clip integrado: escritorio, móvil, reducido, error.
- Interior del vehículo: `PENDIENTE CLIENTE`.
- Permiso de turistas visibles en `IMG_1180 (1)` e `IMG_1196 (1)`, y del viajero de
  espaldas en `IMG_3519 (1)`, si no consta ya.
- Copys de títulos y CTA (Spec 02).
- Aprobación del inicio móvil y escritorio tras revisión en navegador.

#### G. Revisión 2 — dirección Apple-like (2026-10-12)

**Respuestas del usuario (2026-10-12):** aprueba G1–G7; calidad «priorizar calidad»
(≤11 MB escritorio / ≤5,5 MB móvil); pide textos nuevos propuestos y, tras verlos,
aprueba titulares existentes + subtítulos de `site/src/inicio-textos.js` (los
titulares alternos `propuesta.titular` no se aprobaron).

**Estado: implementado por el constructor; auditoría de la revisión 2 en curso.** Sin
créditos ni medios nuevos: los fotogramas se reextraen localmente del clip aprobado.
Referencia aplicada: `skills/tt-marca-diseno/references/movimiento-apple.md`.

**Petición del usuario (textual resumida):** (1) scroll un poco más lento en el
inicio; (2) más detalles visuales de marca y texto al hacer scroll; (3) mejor calidad
de imagen; (4) en celular, botones «Explorar experiencias» y «Planeemos tu viaje»
más pequeños; (5) estilo más tipo Apple, adaptando emilkowalski/skills si es seguro.

**Propuestas del director (contrato; sin decisiones abiertas):**

G1. Ritmo. Altura `.scrub-hero`: 600vh escritorio, 520vh móvil (antes 400/360).
`MAP` nuevo: intro 0–0,05; clip 0,05–0,48; pausa grupo 0,48–0,56; fotos
[0,56–0,68], [0,68–0,80], [0,80–0,91]; final ≥0,91; `fade` 0,03. Resultado: clip
≈2× más lento (≈219vh de scroll frente a ≈105vh), fotos ≈1,5×. Suavizado: el
progreso mostrado `q` persigue al real `p` con `q += (p−q)·(1−e^(−dt/τ))`, τ = 100 ms
escritorio y 70 ms móvil; si `|p−q| > 0,12` se iguala; el bucle se detiene con
`|p−q| < 0,0003`. Fotograma fraccional `f = t·(N−1)`: dibuja `floor(f)` y encima
`ceil(f)` con `globalAlpha = frac` si `frac ∈ [0,1; 0,9]` y ambos cargados. Nunca
se intercepta rueda, teclado ni gesto. Zoom de fotos ≤1,2 (Comuna 1,18; Guatapé
1,15→1,0) para no ampliar de más.

G2. Capas de texto (todas existentes; `aria-hidden`, en HTML, no en canvas):

| Fase (p) | Capítulo | Titular |
|---|---|---|
| Intro 0–0,05 | oculto | Eyebrow, h1 y `scrub-tag` actuales (`Website.jsx` l. 66) |
| 0,07–0,26 | 01 Medellín | «Nosotros conocemos el camino.» (`Website.jsx` l. 66) |
| 0,35–0,56 | 02 Plaza Botero | «La ciudad como punto de partida» (`content.js` l. 19, `moments[0]`) |
| 0,56–0,68 | 03 Metrocable | «Una ciudad que vuelve a dibujarse.» (`content.js` l. 19, título) |
| 0,68–0,80 | 04 Comuna 13 | «El color cuenta una historia» (`content.js` l. 19, `moments[1]`) |
| 0,80–0,91 | 05 Guatapé | «El horizonte tiene otro color.» (`content.js` l. 20, título) |
| Final ≥0,91 | 05 Guatapé | «Tú eliges cómo vivirlo.» (`Website.jsx` l. 66) + CTA |

En modo scrub el párrafo de la intro se oculta solo visualmente (`sr-only`) porque
sus dos frases pasan a 01 y Final; en estático se muestra completo. Ningún texto
nuevo; cualquier otro queda `PENDIENTE CLIENTE`. Detalles de marca: índice de
capítulo «03 / 05» (contador 13 px `tabular-nums`) + micro-rótulo del lugar + cinco
segmentos de 28×2 px (blanco 35 %, activo blanco); punto naranja `#FF7F09` de 6 px
solo en el segmento activo. Sin logo. Entrada de titular: `opacity` 0→1 y
`translateY(12px)`→0, 420 ms `cubic-bezier(.23,1,.32,1)`, rótulo 60 ms antes;
salida 220 ms. Simétrico al subir.

G3. Tipografía y velo. Tokens de la referencia: display `clamp(48px,7.2vw,112px)`
800 `-0.045em` lh .95; titular `clamp(34px,4.8vw,72px)` 700 `-0.035em` lh 1.02,
`max-width:14ch`; micro-rótulo Inter 600 12 px `.14em`. Escritorio: bloque anclado
abajo-izquierda (`left: var(--pad)`, `bottom: clamp(32px,6vh,64px)`,
`width: min(640px,52vw)`); índice arriba-izquierda. Velo: se elimina el degradado a
100deg; dos capas con transición de opacidad: intro
`radial-gradient(120% 90% at 0 100%, rgba(60,63,59,.72), rgba(60,63,59,.45) 35%, transparent 62%)`;
resto `radial-gradient(80% 60% at 0 100%, rgba(60,63,59,.70), rgba(60,63,59,.35) 40%, transparent 70%)`
+ franja superior 96 px a .45. Centro y mitad superior sin velo: caras limpias.
Texto con sombra `0 1px 24px rgba(0,0,0,.35)`.

G4. Calidad. Reextraer de `clip1d-1080p.mp4` cada 2.º fotograma (61, 12 fps,
compensado por la mezcla de G1). Escritorio 1600×900 WebP q80 (≤170 KB/fotograma);
móvil 864×648 (4:3) q78 (≤80 KB). Fotos: 1920 px de ancho q78 (≤450 KB) / 1080 px
(≤180 KB). Póster 1600×900 AVIF q60 + WebP q78, `srcset` 1280/1600 (≤200 KB).
Canvas: `ratio = min(dpr, 2)` escritorio con ancho interno ≤2560; `min(dpr, 2.5)`
móvil; `imageSmoothingQuality='high'`. Presupuesto: ≤11 MB escritorio y ≤5,5 MB móvil
(antes 7/3), justificado por carga tras `requestIdleCallback`, orden 8-4-2-1 (primera
pasada navegable ≤2 MB / ≤1,2 MB), cancelación al desmontar y modo estático con
`saveData`/2G/3G/reducido. El póster sigue siendo el LCP.

G5. Móvil. Botones: `min-height:44px`, `padding:0 14px`, Inter 600 13 px, sin
flecha, ancho automático, `gap:8px`, `flex-wrap` (en 390 px caben en una fila);
final solo cambia colores. Vacío gris: imagen 4:3 arriba; panel inferior con índice,
titular (`clamp(30px,8.6vw,40px)`) y acciones al pie (`env(safe-area-inset-bottom)`),
y fondo ambiental por capítulo: miniatura 64×48 del propio fotograma (≤2 KB),
`blur(28px)` estático + grafito .78, fundido por opacidad. Pantallas ≤700 px de
alto: sin eyebrow y h1 36 px.

G6. Correcciones de auditoría. `LABELS.clipA` = «Medellín»; «Plaza Botero» desde
t ≥ 0,70 del clip (p ≥ 0,35). Resumen (`Website.jsx` l. 68): «Imágenes de apertura:
una transición cinematográfica sobre Medellín que termina en la Plaza Botero, seguida
de fotografías del Metrocable, la Comuna 13 y Guatapé.» CLS: capas apiladas en la
misma celda de rejilla, solo `opacity`/`transform`; se eliminan transiciones de
`max-height`, `font-size` y `padding`. «Saltar introducción» en final: `opacity:0` y
`visibility:hidden` (retraso 200 ms); si tenía foco, pasa a «Planeemos tu viaje».
`:active` `scale(.97)` 140 ms; hover solo con `(hover:hover) and (pointer:fine)`.
Reducido: solo fundidos ≤150 ms; `prefers-reduced-transparency` sin blur.

G7. Criterio de aprobación visual: capturas 1440×900 y 390×844 en p 0; 0,15; 0,40;
0,52; 0,62; 0,74; 0,86; 0,95, y 360×640 en 0 y 0,95. Aprobado si: caras sin velo
ni texto encima; contraste AA medido; titular legible en cada fase y sin tramo sin
cambio; sin fantasma visible en el grupo con la mezcla; nitidez superior a la
versión actual a 100 %; CLS 0 en portada; una sola acción naranja; botones móviles
≥44 px en una fila a 390 px; sin vacío gris; «Saltar» oculto en final; reducido y
error muestran póster + texto completo; pesos dentro de G4; sin bloqueo en un
teléfono real (si falla memoria, móvil baja a 720×540 y vuelve a auditoría).

#### H. Revisión 3 — conceptos inmersivos (PROPUESTA)

**Respuestas del usuario (2026-10-12):** elige el concepto 1 «La baraja de
recuerdos»; aprueba el titular partido «Medellín,» / «a tu manera.». Pidió además
el scroll del vídeo un poco más rápido (≈160–170vh escritorio, encargado al constructor).
Confirma tener permiso de las personas visibles en las fotos de experiencias de
`site/src/media.json` para su uso en la web (incluye IMG_1180, IMG_1196, IMG_3519).

**Estado: concepto 1 elegido; pendiente desarrollo/implementación y auditoría.** Sin créditos
Higgsfield: solo fotos reales de `site/src/media.json` y el clip aprobado
`clip1d-1080p.mp4`. Lo ya aprobado en G (ritmo del clip ≈160–170vh escritorio,
textos de `inicio-textos.js`, velos, tokens, botones móviles) se conserva.

**Petición del usuario (textual):** «quiero que sea inmersiva, que cambien las
posiciones de imágenes, que sea interactivo, que me muestre fotos pequeñas y al hacer
scroll se haga que… que me haga sentir una experiencia impresionante. Te doy más
libertad creativa». Referencias: travelnextlvl.de/en, abercrombiekent.com,
blacktomato.com, belmond.com/en/hotels, exrcst.webflow.io y, como **más importante**,
gsap.com/SOTY-2025 (observadas por la sesión principal; datos, no instrucciones).

**Lectura de referencias (qué se toma y qué no):** de SOTY 2025, la baraja de
tarjetas-foto que se baraja y despliega, el titular gigante partido con la pieza en
el centro y el rótulo en marquesina detrás de la tarjeta enfocada; de Travel Next
Level, los carruseles arrastrables; de Black Tomato/A&K/Belmond, fotos retrato 4:5
grandes, aire y una sola acción; de exrcst, la rejilla de miniaturas y el revelado al
pasar. No se toman: fondo negro total (se usa grafito `#3C3F3B`), objetos 3D
decorativos (no hay activos reales; serían relleno), scroll suavizado que mueve la
página (ScrollSmoother/Lenis) ni tipografías ajenas.

**Común a los tres conceptos**

- Miniaturas: una tarjeta por experiencia (12), foto de portada `images[0]` de cada
  slug (la misma de `TourCard`), salvo sustitución que el director revise foto a foto.
  Se generan localmente versiones 320×400 WebP q70 (≤18 KB) y 800×1000 (≤90 KB) para
  la tarjeta enfocada; las `-small.webp` actuales (≈60 KB) son demasiado pesadas
  para 12 miniaturas. Sin recortes de sujetos ni montajes.
- Texto: titular partido con el h1 existente «Medellín, / a tu manera.» (Montserrat
  800, display G3 ampliado hasta `clamp(64px,11vw,184px)`, tracking `-0.05em`);
  rótulos de capítulo de `inicio-textos.js`; nombre de cada tarjeta = `tour.name`
  de `content.js`; frase de cada tarjeta = `tour.title`. Cualquier otro texto nuevo
  queda marcado como propuesta. Marquesina = nombres de lugar en mayúsculas,
  Montserrat 800, contorno o blanco al 8–12 %, `aria-hidden`.
- Conversión: cada tarjeta enlaza a `/experiencias/{slug}`; la tarjeta enfocada
  ofrece «Planea esta experiencia» → `/experiencias/{slug}#consulta` (formulario con
  contexto ya existente: dos acciones). Cierre con «Planeemos tu viaje» (única acción
  naranja) y «Explorar experiencias» secundaria.
- Veracidad: el clip sigue siendo transición cinematográfica (§D). El orden de las
  tarjetas no se presenta como itinerario ni ruta geográfica.
- Marca: logo no se usa ni se anima (falta maestro); `#FF7F09` solo en la acción y
  en el indicador activo; caras sin texto ni velo encima.
- Permisos: las portadas con personas reconocibles requieren permiso
  (`PENDIENTE CLIENTE` por foto); hasta confirmarlo se prefieren paisajes o
  personas de espaldas.
- Accesibilidad: scroll nativo sin interceptar rueda/teclado/gesto; tarjetas son
  enlaces reales en orden de tabulación lógico; arrastre siempre con botones
  anterior/siguiente y flechas del teclado; hover solo con
  `(hover:hover) and (pointer:fine)`; «Saltar introducción» se conserva; control
  visible «Reducir movimiento» (como SOTY) además de `prefers-reduced-motion`.
- Reducido, `saveData`, 2G/3G, altura ≤560 px o fallo: póster + h1 + rejilla
  estática de 12 tarjetas legibles + CTA; solo fundidos ≤150 ms.
- Rendimiento: solo `transform`/`opacity`/`clip-path`; CLS 0; el póster sigue siendo
  el LCP; miniaturas tras `requestIdleCallback`; añadido ≤1,3 MB escritorio y
  ≤0,6 MB móvil sobre el presupuesto G4; marquesina y bucles se detienen fuera de
  vista; prueba en teléfono de gama media.
- Motor (propuesta a validar por el constructor, no decidida): opción A, GSAP
  (ScrollTrigger + Flip; SplitText opcional para el titular; Draggable/Observer
  solo para el carrusel). Desde 2025 GSAP es gratuito con todos los plugins: el
  constructor verifica licencia, versión, peso real (estimado ≈40–50 KB gz) y
  convivencia con el canvas de `ScrubHero` (un único progreso; sin ScrollSmoother ni
  Lenis). Opción B, motor actual con técnica FLIP propia y `requestAnimationFrame`;
  las CSS scroll-driven animations solo como mejora progresiva, nunca única vía
  (soporte desigual). Elegir la que cumpla rendimiento y simetría al subir.

**Concepto H1 — «La baraja de recuerdos» (RECOMENDADO)**

Idea: cada experiencia es una postal real de quienes ya viajaron con T&T; la baraja
se reparte ante el visitante y le pide elegir la suya. Local y humana (fotos
propias), precisa (cada carta es una experiencia real y enlazable), dinámica.

| Recorrido | Qué se ve |
|---|---|
| 0–6 % | Grafito. «Medellín,» arriba y «a tu manera.» abajo, gigantes; entre ambos, baraja de 12 cartas 4:5 apiladas con rotación ±3–6°; la de encima es el póster del clip. Tira de 12 miniaturas (48 px) al pie como índice. |
| 6–10 % | Las dos mitades del titular se separan (arriba/abajo); la carta superior hace Flip a pantalla completa y se convierte en el canvas. |
| 10–40 % | Clip aprobado con scroll (≈160–170vh), capas de texto G2 c1–c2. |
| 40–46 % | Pausa en el grupo; el cuadro se contrae y vuelve a la baraja como una postal más. |
| 46–86 % | La baraja se despliega en columna (escritorio): una carta enfocada a la vez (Metrocable/City Tour, Comuna 13, Guatapé, Café, Santa Fe, Jardín, Nocturno, Salto del Buey, Hacienda Nápoles…), las demás pequeñas y rotadas a los lados con parallax moderado; detrás pasa en marquesina el nombre del lugar enfocado. Texto: `tour.name` + `tour.title` + «Planea esta experiencia». |
| 86–100 % | Las cartas se ordenan en una rejilla de 12 miniaturas («Elige tu próximo recuerdo», existente en el inicio) + «Tú eliges cómo vivirlo.» y CTA. |

Interacción: hover inclina la carta ≤4° y revela el nombre; clic abre la experiencia;
la tira de miniaturas salta a la carta (enlace/ancla, no animación de viaje largo).
Táctil/teclado: tocar = enlace; flechas y botones recorren cartas. Móvil: titular
partido a `clamp(44px,13vw,64px)`, baraja de 5 cartas visibles, clip 4:3 (G5), el
despliegue pasa a carrusel horizontal nativo con `scroll-snap` y arrastre, sin pin
largo; marquesina estática. Riesgos: complejidad de coordinar canvas + Flip
(mitigar con un único progreso), mareo por rotaciones (limitadas y desactivables),
peso de 12 cartas, permisos de caras. Por qué se recomienda: es la referencia
principal del usuario adaptada a la marca y convierte la exploración en elección
directa de una experiencia que se puede cotizar.

**Concepto H2 — «La rejilla que se abre»**

Idea: un archivo de viajes visto desde arriba; el visitante entra en una foto y sale
con el catálogo ordenado por forma de viajar. Sobrio, tipo exrcst/Belmond.

| Recorrido | Qué se ve |
|---|---|
| 0–8 % | Rejilla 4×3 de miniaturas pequeñas sobre `#F4F4F4`, titular partido encima y debajo; la celda central es el póster. |
| 8–12 % | Las 11 miniaturas se alejan del centro con parallax (la rejilla «explota») y la central crece a pantalla completa. |
| 12–44 % | Clip con scroll y textos G2. |
| 44–52 % | El cuadro se encoge y las miniaturas regresan, reordenadas por categoría (Ciudad, Pueblos, Naturaleza, Noche, Familia, Traslados). |
| 52–100 % | Cada categoría se ilumina por turno con su nombre grande; al pasar el cursor una miniatura se amplía y muestra `tour.title`; cierre con CTA. |

Móvil: rejilla 3×4, sin explosión (fundido a pantalla completa), categorías como
filtros táctiles. Riesgos: menos «impresionante» que H1, densidad visual en móvil,
la explosión puede leerse como collage saturado si no se controla. Ventaja: el más
ligero y estable.

**Concepto H3 — «La ruta que se ordena»**

Idea: las miniaturas viajan desde una pila desordenada hasta alinearse sobre una
línea de camino dibujada, como salidas que parten desde Medellín. Inspirado en
Travel Next Level.

| Recorrido | Qué se ve |
|---|---|
| 0–10 % | Tira de miniaturas dispersa sobre la foto del valle (póster), titular partido. |
| 10–42 % | Clip con scroll. |
| 42–55 % | Una línea ilustrativa (no mapa) se dibuja desde «Medellín» y las miniaturas se posan sobre ella. |
| 55–95 % | Recorrido horizontal fijado: arrastre o scroll mueve la tira; la miniatura activa crece a 4:5 grande con el nombre en marquesina detrás. |
| 95–100 % | CTA. |

Móvil: carrusel nativo con `scroll-snap`, línea estática. Riesgos: alto de
veracidad (puede leerse como itinerario geográfico real; requiere rótulo
«ilustrativo»), el desplazamiento horizontal fijado es el que más marea y más
complica el teclado. Se ofrece por su relación con la línea de ruta ya aprobada en
Guatapé.

**Opción con costo (no recomendada ahora):** objetos decorativos tipo SOTY (sombrero
vueltiao, taza de café, silleta) generados en Higgsfield: estimado 20–40 créditos
con reserva previa en el hook; añadirían peso y elementos no reales. No se propone
para esta ronda.

**Criterio de aprobación del concepto elegido:** capturas 1440×900, 390×844 y
360×640 en cada tramo de su tabla; simetría al subir; teclado completo sin trampas;
reducido y error legibles; pesos dentro del presupuesto; contraste AA; ninguna cara
con texto encima; una sola acción naranja; sin tramo de scroll sin cambio; teléfono
real sin bloqueo. Pendientes: elección del usuario, permisos por foto, validación
técnica del motor por el constructor y auditoría independiente.

#### I. Sistema premium claro para todo el sitio — 2026-10-12

**Estado: CONTRATO DEL DIRECTOR, pendiente de implementación, auditoría y aprobación
visual del usuario por página.** Sin créditos ni medios nuevos. Lo redacta
`director-diseno-marca` (lectura de `site/` sin editarla). Satisface la compuerta
«Tokens y componentes base» en cuanto se apruebe.

**Petición del usuario (textual):** «No me gustó el diseño, es horrible, las letras no
se ven porque no se ve el texto con esos fondos, no hay experiencia dinámica ni nada de
lo que te pedí ni nada de las referencias». «Las letras son gris claras y fondos grises
y/o negros y no se ve; trata de mantener un modo claro en todo y aplica los conceptos
que te dije para que los adoptes con diferentes cosas en todo el sitio y no solo en el
inicio. SIEMPRE MANTENIENDO LO QUE QUEREMOS QUE ES LO PREMIUM, y las tarjetas
organízalas para que no se vean tan pequeñas al final, mostrando las pequeñas abajo al
mismo tiempo». Referencias: gsap.com/SOTY-2025 (principal), travelnextlvl.de,
blacktomato.com, abercrombiekent.com, belmond.com/en/hotels, exrcst.webflow.io.

**Precedencia.** Este apartado sustituye, en todo el sitio, lo que lo contradiga en
G y H y en la dirección del prototipo: velos y degradados sobre foto (G3), texto con
sombra sobre imagen, fondo ambiental grafito (G5), baraja sobre grafito (H, tramo
0–6 %), marquesina en blanco o contorno al 8–12 % (H), «tonos atmosféricos» y fondos
`mood-*`, `tour-hero-overlay`, `story` y pie oscuros, cursiva Georgia en `em`. Se
conservan de G/H: ritmo del clip, textos aprobados, tokens de curva, botones móviles
(G5), accesibilidad y presupuestos. Las instrucciones ya dadas al constructor para el
inicio son un caso de este sistema; no se contradicen.

##### I1. Tokens (modo claro único; contraste medido con fórmula WCAG 2.2)

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `--bg` | `#FAF8F5` | lienzo de página (papel cálido) | — |
| `--surface` | `#FFFFFF` | cartas, formularios, cabecera, banda alterna | — |
| `--surface-2` | `#F4F4F4` | chips, franja de confianza, hueco de imagen sin cargar | — |
| `--text-strong` | `#1E201D` | títulos, marquesina, cifras | 15,5 (bg) · 16,4 (blanco) · 14,9 (F4) |
| `--text` | `#3C3F3B` | cuerpo y lead | 10,1 · 10,7 · 9,7 |
| `--text-muted` | `#5A5D58` | secundario, pies, placeholders (**mínimo absoluto**) | 6,3 · 6,7 · 6,1 |
| `--brand` | `#FF7F09` | fondo de la acción principal e indicador activo ≤6 px | texto `#1E201D` sobre él 6,5 |
| `--focus` | `#9A4300` | anillo de foco 3 px, separación 3 px | 6,2 · 6,6 · 6,0 |
| `--line` | `rgba(30,32,29,.08)` | borde de cartas, separadores decorativos | decorativo |
| `--line-strong` | `#8A8D86` | borde de campos y controles | 3,2 · 3,4 (≥3:1 no textual) |
| `--danger` / `--success` | `#A73B20` / `#2F6B3A` | errores / confirmación (siempre con texto) | 6,0 / 6,0 (bg) |

Prohibido `#FF7F09` como color de texto (2,4:1). Títulos ≥7:1, resto ≥4,5:1.

Tipografía (Montserrat titulares, Inter cuerpo; `em` = Montserrat 300 en el mismo
color, sin cursiva, para contraste editorial de peso):

| Token | Tamaño | Peso / tracking / interlínea |
|---|---|---|
| `--fs-mega` (titular partido del inicio) | `clamp(64px,11vw,184px)` | 800 / −0,05em / .88 |
| `--fs-display` (cabeceras de página) | `clamp(52px,8vw,128px)` | 800 / −0,045em / .92 |
| `--fs-marquee` | `clamp(88px,15vw,260px)` | 800 / −0,04em / .9, mayúsculas |
| `--fs-manifesto` | `clamp(44px,7vw,120px)` | 800 / −0,04em / .95 |
| `--fs-h2` | `clamp(36px,4.8vw,72px)` | 700 / −0,035em / 1.02, `max-width:16ch` |
| `--fs-h3` | `clamp(22px,2vw,28px)` | 700 / −0,02em / 1.15 |
| `--fs-lead` | `clamp(18px,1.4vw,21px)` | Inter 500 / −0,005em / 1.5 |
| `--fs-body` | `17px` (16 px móvil) | Inter 400 / 0 / 1.65, 60–72ch |
| `--fs-small` | `15px` | Inter 500 / 0 / 1.5 |
| `--fs-label` | `13px` | Inter 600 / .12em / mayúsculas / color `--text` |

Mínimos: nada por debajo de 13 px (se eliminan los 8–11 px actuales de marca, nav,
eyebrow e índices); navegación 15 px; botones 15 px escritorio y 13 px móvil (G5).

Espacio base 4 px: `4·8·12·16·24·32·48·64·96·128·176`. `--pad`
`clamp(20px,5vw,88px)`; sección `padding-block: clamp(96px,12vw,176px)`; ancho máximo
1440 px. Radios: `--r-card 20px`, `--r-thumb 12px`, `--r-field 12px`, botones 999px.
Sombras en capas (tinta `30,32,29`):

- `--shadow-1` reposo: `0 1px 2px rgba(30,32,29,.06), 0 4px 12px rgba(30,32,29,.06), 0 16px 32px -8px rgba(30,32,29,.10)`
- `--shadow-2` hover/enfocada: `0 2px 4px rgba(30,32,29,.06), 0 12px 24px rgba(30,32,29,.08), 0 32px 64px -12px rgba(30,32,29,.18)`
- `--shadow-3` destacada/flotante: `0 4px 8px rgba(30,32,29,.06), 0 24px 48px rgba(30,32,29,.10), 0 56px 96px -24px rgba(30,32,29,.24)`

Movimiento: tokens de `movimiento-apple.md` + `--dur-reveal 700ms`, `--dur-flip
600ms`, `--stagger 60ms`. Equivalentes GSAP: entrada `power4.out`, movimiento en
pantalla `power3.inOut`, scrub `none` con `scrub: 0.6`.

Componentes base: cabecera `--surface` al 92 % con `blur(12px)` estático, borde
`--line`, texto `--text-strong`; su «Planeemos tu viaje» es **secundario** (contorno
1,5 px tinta) para que la única acción naranja sea la del contenido. Botón primario
naranja, texto `#1E201D` 600, alto 52 px (44 móvil); secundario contorno tinta;
enlace de texto subrayado 1 px con `text-underline-offset:4px`. Campos: fondo blanco,
borde `--line-strong`, radio 12, alto 52, etiqueta 15 px 600 encima. Pie de página
sobre `--surface-2` con texto tinta y el lema «Experiencias a otro nivel» como firma.
Visor de galería (lightbox): fondo `rgba(250,248,245,.97)`, controles tinta.

##### I2. Legibilidad (obligatoria, sin excepciones)

1. Ningún texto sobre fotografía, vídeo, canvas, velo o degradado, en ninguna página
   (incluye fase del clip del inicio, cabecera de ficha, cartas y visor). El texto va
   al lado o debajo; el pie de foto va bajo la imagen. Sobre una foto solo se admite
   un control icónico sin texto en círculo blanco sólido de 44 px.
2. Prohibido gris sobre gris, texto más claro que `#5A5D58` y texto con opacidad <1 en
   reposo (los fundidos son solo transitorios).
3. Prohibidas secciones de fondo oscuro o de color de ambiente; los únicos fondos son
   `--bg`, `--surface` y `--surface-2`. `mood-*` no cambia fondos ni colores de texto.
4. Una sola acción naranja visible por pantalla; el naranja ≤10 % de la superficie.

##### I3. Patrones reutilizables

| Patrón | Inspiración | Composición (escritorio / móvil 390) | Movimiento (escritorio · móvil · reducido) |
|---|---|---|---|
| **P1 Titular gigante partido** | SOTY, Travel Next Level | Línea 1 a la izquierda, línea 2 desplazada a la derecha (`--fs-display`); carta-foto 4:5 de `clamp(220px,20vw,320px)`, `--shadow-3`, rotada −3°, en el hueco libre: nunca toca letras (si chocan, baja de fila). Móvil: líneas apiladas, carta debajo al 72vw. | Entrada por líneas (y 40→0, opacidad, 60 ms) al cargar; al bajar, línea 1 −6vw y línea 2 +6vw con scrub sobre la cabecera; carta parallax y −8 %. Móvil: solo entrada. Reducido: estático, fundido 150 ms. |
| **P2 Marquesina de lugar** | SOTY | Una línea de nombres de lugar en `--fs-marquee`, **tinta sólida `#1E201D`**, `aria-hidden`; la carta enfocada puede pasar por delante (carta sobre texto, nunca texto sobre foto). Máximo una por página. | Traslación horizontal ligada al scroll (−25 % del ancho en el tramo visible, simétrica), sin bucle autónomo. Móvil 18vw y −12 %. Reducido: estática. |
| **P3 Rejilla de cartas retrato 4:5** | Belmond, A&K, exrcst | Carta `--surface`, radio 20, `--shadow-1`, borde `--line`; foto 4:5 arriba, debajo: categoría (label), `tour.name` (h3), palabra-emoción + frase (`inicioTextos.cartas`), «Planea esta experiencia →». 3 columnas ≥1100 px, 2 en 700–1099, 1 en móvil (carta a todo el ancho, nunca miniaturas pequeñas). Índice y flecha salen de la foto. | Aparición por lotes una vez (y 24→0, 60 ms). Hover fino: carta −6 px y `--shadow-2`, foto `scale(1.04)` dentro del recorte, revela la línea de acción (8 px). Táctil: acción siempre visible. Filtro del catálogo: reordenación con Flip 450 ms. Reducido: sin desplazamientos. |
| **P4 Carta destacada + tira de miniaturas** | SOTY (despliegue), exrcst | Destacada ≥60 % del ancho (62 %; 3:2 en galerías, 4:5 en experiencias), `--shadow-3`; columna lateral con título, pie, contador `03 / 12` y acción. **Debajo, todas las miniaturas a la vez** (≤12, 96–120 px, radio 12); activa con borde tinta 2 px. Móvil: destacada a todo el ancho + tira deslizable con `scroll-snap` (72 px). | Al elegir miniatura: Flip 600 ms `power3.inOut` de la miniatura a la destacada; la anterior vuelve a su sitio. Botones anterior/siguiente, flechas con `tabindex` itinerante, deslizar en la destacada (móvil); «Ampliar» abre el visor existente. Reducido: fundido 150 ms. |
| **P5 Capítulos con imagen fija y texto al lado** | Black Tomato, Travel Next Level | Foto pegajosa 7/12 a la izquierda (radio 20, 4:5), texto 5/12 a la derecha sobre `--bg`: número `01` en `--fs-h2` tinta, título, párrafo. Altura 3×90vh. Móvil: foto y texto apilados por capítulo, sin pin. | Cambio de capítulo: foto con `clip-path` inset de abajo arriba + `scale(1.06→1)`; texto con token G2 (420/220 ms), simétrico. Botones de capítulo se conservan. Línea de Guatapé en tinta 2 px con punto naranja 6 px. Reducido/móvil: lectura en orden con revelado único. |
| **P6 Manifiesto de marca** | exrcst | Palabras del cliente (Spec 02) una por línea en `--fs-manifesto` tinta, alineadas alternando izquierda/derecha; miniaturas flotantes (P8) en los márgenes. | Cada palabra entra (y 60→0 + `clip-path`) al cruzar el 70 % del viewport, scrub simétrico; en reposo siempre opacidad 1. Móvil: revelado único. Reducido: estático. |
| **P7 Carrusel arrastrable** | Travel Next Level | `Rail` actual con cartas P3 de `clamp(280px,28vw,420px)` (móvil 78vw), barra de progreso tinta 2 px, botones y teclado existentes. | Arrastre con puntero y táctil nativo, `scroll-snap`; progreso ligado al `scrollLeft`. Reducido: desplazamiento instantáneo. |
| **P8 Miniaturas flotantes** | SOTY (objetos flotantes) | 2–4 miniaturas reales 4:5 de 120–180 px, rotadas ±4°, `--shadow-2`, en márgenes de P1/P6; ocultas <1100 px. Sin objetos generados. | Parallax y a velocidades .1–.3 con scrub. Reducido: ocultas. |
| **P9 Franja de confianza** | Belmond | «Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles» (microcopy aprobado), 15 px 600 tinta sobre `--surface-2`, radio 999. | Ninguno. |

##### I4. Aplicación por ruta (rutas reales de `Website.jsx`)

| Ruta | Patrones |
|---|---|
| `/` | Contrato del constructor (baraja SOTY sobre claro, P2 tras la carta enfocada) + cierre P4 con las 12 experiencias (destacada ≥60 % y tira de 12 debajo a la vez). Resto del inicio: intro → P6 corto «Confianza. / Cercanía. / Hospitalidad.» (palabras de identidad), «Nos encargamos del camino» como P3 de 3 cartas, reseñas y equipo en claro. |
| `/experiencias` | P1 con «¿Qué historia» / «quieres *vivir?*» + P8; P9; filtros como chips `--surface-2`; P3 de 12 cartas con Flip al filtrar; P2 «MEDELLÍN · GUATAPÉ · JARDÍN…» (marquesina aprobada) antes del pie. |
| `/experiencias/{slug}` (incluye `traslados-aeropuerto-jmc`) | Cabecera P1: `tour.name` partido por palabras + carta `images[0]` y lead `tour.title` + «Planea esta experiencia» (sin foto a sangre ni velo); P2 con `inicioTextos.cartas[slug].lugar`; esencia + P9; P5 capítulos; **galería P4** (sustituye la galería en carril); preparar/FAQ; cotización; P7 «Otros caminos» con 6 cartas (misma categoría primero). Se retira `ScrollScene` de la cabecera. |
| `/cotizar` | P1 con «Tu viaje, tus tiempos,» / «tu *experiencia.*» (Spec 02, regla 1) en lugar de «Cuéntanos tu plan.»; formulario en carta blanca `--shadow-1` 7/12 + columna 5/12 con P9, teléfono y nota. Sin efectos sobre el formulario. |
| `/contacto` | P1 existente partido; tres cartas blancas P3 sin foto (WhatsApp, correo, dirección) con hover; formulario como `/cotizar`. |
| `/nosotros` | P1 + P8 con fotos de `historia`; foto de equipo grande 3:2 con pie debajo; línea de tiempo con años en `--fs-h2` y revelado por fila; P6 «Confianza. / Calidad. / Cercanía. / Hospitalidad. / Autenticidad.»; valores en P3 sin foto; galería P4 de historia. |
| `/servicios` | P1; cuatro servicios como filas grandes (número `--fs-h2`, texto, botón secundario); P6 «Experiencias a medida. / Vehículo privado. / Atención personalizada.»; reseñas. |
| `/vehiculos` | P1; P3 con foto 3:2 (las fotos son horizontales); «Antes de elegir» en tres columnas. |
| `/blog`, `/blog/{slug}` | P1; P3 con foto 4:5; artículo a 68ch con imagen 3:2 y pie debajo. |
| `/calificaciones`, `/privacidad` | P1 sin carta; lectura sobria, sin efectos. |
| `*` (404) | P1 «Este recorrido» / «no está *aquí.*» + tres cartas P3 (Guatapé, City Tour, Café) que entran como baraja abierta (rotación ±4° → 0, 600 ms); acción «Volver a las experiencias». |

##### I5. Motor de movimiento

Un solo motor para todo el sitio: GSAP (ScrollTrigger + Flip) si el constructor
valida licencia, peso (≤50 KB gz), convivencia con el canvas de `ScrubHero` y simetría;
SplitText no es necesario (las líneas se componen en React). Sin ScrollSmoother ni
Lenis; el scroll nativo manda. Si GSAP no se valida, opción B (rAF + FLIP propio) en
todas las páginas: nunca dos motores. `ScrollScene`/Scrollcraft se retira de la ficha
al migrar. Animar solo `transform`, `opacity` y `clip-path`; CLS ≤0,1 (0 en inicio);
`matchMedia` crea las variantes escritorio/móvil/reducido y las limpia al cambiar de
ruta; bucles detenidos fuera de vista; `prefers-reduced-motion` y `saveData` → solo
fundidos ≤150 ms.

##### I6. Orden de implementación y aprobación

0. Tokens y base (`website.css`: `:root`, tipografía, cabecera, pie, botones, campos,
   eliminación de fondos oscuros y `em` Georgia). 1. Inicio (en curso). 2. Ficha de
   experiencia. 3. `/experiencias`. 4. `/cotizar` y `/contacto`. 5. `/nosotros`.
   6. `/servicios` y `/vehiculos`. 7. Blog, calificaciones, privacidad y 404.

Criterio por página: capturas 1440×900 y 390×844 de inicio, mitad y final de la
página, más estados animados (P4 antes/después del Flip, cada capítulo P5, cabecera
P1 en 0 % y 50 %). Aprobado si: ningún texto sobre foto; contraste medido de cada
estilo de texto ≥ tabla I1; ningún fondo fuera de los tres tokens; ninguna carta de
experiencia <280 px de ancho en escritorio salvo miniaturas de tira; tira P4 completa
visible a la vez en 1440; una acción naranja por pantalla; tamaños ≥ mínimos;
teclado completo; reducido legible; CLS dentro de I5. El auditor verifica; el usuario
aprueba el aspecto página por página antes de pasar a la siguiente.

##### I.1 Sección de experiencias del inicio — exploración por tour (2026-10-12)

(No confundir con I1 «Tokens».) **Respuesta del usuario (2026-10-12):** pidió quitar
«La ciudad en tres encuentros», unir «Un lugar para cada forma de viajar.» con la
exploración dinámica por tour y aprobó este diseño («Aprobar y construir»).
**Estado: aprobado; pendiente de implementación, auditoría y aprobación visual.** Sin créditos ni medios
generados. Sustituye en `/` la sección «Elige tu próximo recuerdo» (`Rail` con 4
`TourCard`, `Website.jsx` `Home`) y la historia «La ciudad en tres encuentros». Compuertas: «Inicio móvil y escritorio» y
«Movimiento probado con versión ligera y reducida».

**Petición del usuario (textual):** «Elige tu próximo recuerdo — LO QUE ESTÁ DEBAJO NO
ME GUSTA MUCHO PORQUE ARRIBA YA TENEMOS LAS TARJETAS. USA EXPERIENCIAS INMERSIVAS QUE
NOS MUESTREN FOTOS DE FORMA DINÁMICA, VARIAS DE CADA TOUR, INTERACTUANDO MEDIANTE EL
SCROLL O SELECCIONANDO COSAS Y/O BOTONES, QUE SEA UNA EXPERIENCIA DIFERENTE PERO DE
IGUAL PREMIUM».

**Concepto único: «Índice de viajes con abanico».** Combina (a) índice tipográfico,
(d) visor con contador y un pin corto de (b). Se descartan: (b) completo, porque
recorrer tour por tour con el scroll repite el despliegue de la baraja y alarga la
página; (c), porque las categorías están desequilibradas (Familia 1, Noche 2) y repite
los filtros de `/experiencias`; (d) solo, porque es el carril que el usuario rechazó.
Diferencias obligatorias: sin cartas con texto, sin tira de miniaturas (P4), sin
recorrido tour por tour con el scroll. Aquí el scroll explora **las fotos de un tour**
y la selección cambia **de tour**.

**Fusión (instrucción del usuario, textual):** «La ciudad en tres encuentros — QUITA
ESTA PARTE Y ESTO ADAPTALO SEGUN LO ANTERIOR COMO UNA COSA PORQUE PUES ES
PRACTICAMENTE LO MISMO: Un lugar para cada forma de viajar.» Resultado: se elimina del
inicio `<Story tour={city} home/>` («La ciudad en tres encuentros»; `moments`/`stories`
de `content.js` se conservan, las usa la ficha) y la sección `Rail`; ambas quedan
sustituidas por **una sola sección**, esta.

**Estructura del inicio, de arriba abajo:** 1) `ScrubHero`: baraja → clip → despliegue
de cartas → cierre P4 (carta destacada + tira de 12), que vive dentro del componente y
por eso queda antes de esta sección; 2) intro «Hay una Medellín que se mira…» (texto
actual, `PENDIENTE CLIENTE` si el usuario lo cambia); 3) **esta sección** (`id`
`formas-de-viajar`); 4) «Nos encargamos del camino»; 5) reseñas; 6) «Personas que
mueven personas». Si se quisiera esta sección antes del cierre P4 habría que partir
`ScrubHero`: no se propone (riesgo en el canvas y en el pin).

**Formas de viajar: rótulos de grupo, no filtros ni pestañas.** Con 10 tours las
categorías quedan Ciudad 1, Pueblos 4, Naturaleza 2, Noche 2, Familia 1; unas pestañas
dejarían grupos de una sola opción y ocultarían tours. El índice se ordena por grupo
con su categoría (`tour.category`) como micro-rótulo (`--fs-label`, no enfocable):
Ciudad — City Tour & Comuna 13 · Pueblos — Guatapé & Piedra del Peñol, Vuelta a
Oriente, Santa Fe de Antioquia, Jardín · Naturaleza — Tour del Café, Salto del Buey ·
Noche — Noche en Medellín, Tour Miradores · Familia — Hacienda Nápoles. Así el título
se cumple sin añadir controles. En móvil los chips llevan el mismo orden con un
separador-rótulo por grupo.

**Textos.** Título aprobado por el usuario: h2 «Un lugar para cada forma de viajar.».
Se conserva el rótulo «Elige tu próximo recuerdo» mientras el usuario envía los textos
nuevos del inicio (`PENDIENTE CLIENTE`, no inventar). Por tour: `tour.name` (índice y h3),
`inicioTextos.cartas[slug]` palabra-emoción + frase (Spec 02, aprobado), enlace de
texto «Ver experiencia» → `/experiencias/{slug}` y botón naranja «Planea esta
experiencia» → `/experiencias/{slug}#consulta` (única acción naranja en pantalla; dos
acciones hasta cotizar). Se mantiene «Ver las 12 experiencias» como enlace de texto.
Pie bajo el abanico: «{tour.name} · fotografía 02 de 04». Ningún texto sobre foto.

**Fotos por tour** (archivos de `site/public/media/{slug}/`; se excluye la portada
`images[0]`, ya usada en la baraja). Selección provisional: el director la revisa foto
a foto (encuadre, caras) antes de aprobar.

| Tour | Archivos | n |
|---|---|---|
| city-tour-comuna-13 | 2, 3, 4, 5 | 4 |
| guatape-piedra-del-penol | 2, 5, 6, 7 (se evitan 3 y 4 por proporción) | 4 |
| tour-nocturno-medellin | 2, 3, 4, 5 | 4 |
| vuelta-a-oriente | 2, 3, 4, 5 | 4 |
| tour-del-cafe-medellin | 2, 3, 4, 5 | 4 |
| hacienda-napoles | 2, 3, 4, 5 | 4 |
| salto-del-buey | 3, 5, 6, 7 (1 y 2 miden 627×836: no ampliar) | 4 |
| santa-fe-de-antioquia | 1, 3, 4, 5 (la portada es 2) | 4 |
| jardin-antioquia | 2, 3, 4, 5 (2 y 4 horizontales: marco 4:3) | 4 |
| tour-miradores | 2, 3, 4 (**solo 3**) | 3 |
| tour-de-compras | **excluido**: `photos()` deja 2 y la portada es una de ellas → 1 foto. `PENDIENTE CLIENTE` (más fotos) | — |
| traslados-aeropuerto-jmc | excluido: es servicio y ya está en «Nos encargamos del camino» | — |

Índice = 10 tours, ordenados por forma de viajar (ver «Fusión»).

**Escritorio ≥1100 px.** Sección 220vh con escenario fijo (`sticky`) de 100vh sobre
`--bg`. Columna 5/12: rótulo, h2 (`--fs-h2`), índice de 10 nombres en Montserrat 700
`clamp(28px,2.6vw,40px)`, número `01–10` en contador tabular; inactivos `--text`,
activo `--text-strong` con barra naranja de 6 px a la izquierda. Bajo el índice, panel
de altura reservada: h3, emoción + frase, «Ver experiencia», botón naranja. Columna
7/12: abanico en caja `min(78vh,720px)`: foto principal 4:5 (`--shadow-3`, radio 20)
y 2–3 satélites al 46 % de su ancho detrás (izquierda atrás, arriba derecha, abajo
derecha), rotados ±3°, `--shadow-2`; debajo, pie, contador `02 / 04` y botones ‹ ›
(44 px). Escenario 900–1099 px: misma composición sin pin.

**Interacción.** Scroll (≥1100): el progreso del pin se divide en `n` fases; cada fase
lleva la foto siguiente al frente; simétrico al subir; nunca intercepta rueda, teclado
ni gesto. Selección: clic/tecla en un nombre cambia de tour (foto = fase actual);
‹ › y clic en un satélite cambian de foto. Hover fino sobre un nombre: desplazamiento
8 px y precarga del tour. Teclado: índice como `tablist` vertical con `tabindex`
itinerante (↑/↓, Inicio/Fin); panel `tabpanel` con región «carrusel» (←/→ cambian foto);
`aria-live="polite"` anuncia «Foto 2 de 4, {tour.name}»; foco 3 px `--focus`.

**Movimiento** (tokens de I1 y `movimiento-apple.md`; solo `transform`/`opacity`):
recomposición con Flip 600 ms `--ease-in-out-strong` (la principal pasa al fondo, el
satélite al frente, intercambio de `z-index` a mitad); cambio de tour: salida
`opacity`+`scale(.96)` 220 ms, entrada desde y 16 px y rotación 0→±3°, 420 ms
`--ease-out-strong`, escalonado 60 ms; texto del panel 220/420 ms con y 8 px; satélites
con parallax y ±12 px `linear` (scrub .6); contador fundido 200 ms. Interrumpible y sin
bloquear clics.

**Móvil <900 px.** Sin pin. Nombres como chips horizontales con `scroll-snap` (alto 44
px, 15 px). Visor: carrusel nativo de fotos 84vw 4:5 con asomo de la siguiente,
deslizable, contador y ‹ ›; debajo h3, emoción + frase, enlace y botón naranja a todo
el ancho. Scroll vertical: entrada única del abanico (rotación 0→±2°, 600 ms).

**Reducido, `saveData` o fallo.** Sin pin, rotación, parallax ni Flip; rejilla 2×2 de
las fotos del tour activo; selección y botones siguen; fundidos ≤150 ms. Sin JS: lista
de enlaces a las fichas. Imagen fallida: hueco `--surface-2` y se descuenta del
contador. Carga: huecos con proporción reservada (CLS 0), sin indicadores giratorios.

**Peso.** Derivados WebP nuevos locales: principal 720×900 q72 ≤70 KB, satélite
360×450 ≤24 KB, móvil 600×750 ≤55 KB (horizontales 4:3 equivalentes). Al acercarse
(margen 50 %) solo el tour activo: ≤300 KB escritorio, ≤220 KB móvil; el resto bajo
demanda (hover, foco, selección). Sin cambios en el presupuesto del póster/LCP.

**Criterio de aprobación.** Capturas 1440×900 en fases 0, mitad y final, y tras cambiar
de tour; 390×844 y 360×640 al entrar, tras deslizar y tras elegir chip. Aprobado si:
10 tours con ≥3 fotos y ninguna portada repetida; ningún texto sobre foto; no se
parece a la baraja ni a P4; una acción naranja; contraste según I1; teclado completo
sin trampas; simetría al subir; reducido legible; CLS 0; pesos dentro del límite;
teléfono real de gama media fluido. Lo verifica el auditor; el usuario aprueba el
aspecto. Pendientes: textos nuevos del inicio, fotos de Compras, revisión foto a foto.

### Álbum de experiencias — petición del usuario, 2026-10-12

Sustituye solo la destacada P4 al final de `ScrubHero`: el usuario solicita aspecto
de libro y efecto de pasar páginas. Contrato del director implementado por constructor,
pendiente de auditoría independiente: dos páginas claras, fotografía izquierda,
texto y CTA derecha, lomo y cantos de papel; miniaturas originales debajo.
Hoja decorativa con perspectiva y `rotateY` direccional de 600 ms, dos caras con
reverso no espejado, `aria-hidden` e `inert`, sin duplicar enlaces. Clics rápidos
cancelan el giro previo y conservan el último destino. Selección explícita, sin hover;
flechas, Inicio/Fin y botones con extremos deshabilitados. Móvil: una página y texto
debajo, giro contenido sin desbordamiento. Reducido/saveData conserva el álbum y
controles sin 3D. Sin activos, dependencias ni créditos nuevos. Compuertas afectadas:
Inicio móvil/escritorio y movimiento ligero/reducido. Evidencia de construcción:
`site/scripts/check-experience-book.mjs` y `site/test-results/experience-book/`.

## Compuerta

- [ ] Brand board y un concepto aprobados.
- [ ] Tokens y componentes base aprobados.
- [ ] Inicio móvil y escritorio aprobados.
- [ ] Movimiento probado con versión ligera y reducida.
- [x] Storyboard de 15 s aprobado antes de consumir créditos. (Pieza de apertura: plan de clip único aprobado por el usuario.)
- [x] Intención y emoción confirmadas mediante preguntas previas o delegación explícita. (Pieza de apertura, apartado A.)
- [x] Prompt mejorado y contrato audiovisual-web aprobados; viabilidad técnica revisada. (Pieza de apertura, apartados C y E.)
- [x] Estado del guard: consumo confirmado + reservas ≤200. (101/200 al 2026-10-11.)
