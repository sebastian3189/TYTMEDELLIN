# Spec 04 — Construcción e integraciones

**Depende de:** Specs 01–03  
**Dueño:** `constructor-producto`

## Principios

La aplicación se construye desde cero y el stack se decide con evidencia del entorno,
sin imponer arquitectura heredada. Componentes reutilizables, datos separados de la
presentación, rutas estables, una fuente de navegación y secretos fuera del cliente.

Stack aprobado para el prototipo: React con Vite, componentes funcionales y movimiento
progresivo basado en APIs nativas del navegador. No se añade una librería de animación
hasta que una interacción aprobada demuestre necesitarla.

Scrollcraft retirado (ronda CORREGIR, 2026-10-12): `ScrollScene.jsx`, `scroll-scene.css`, `src/vendor/scrollcraft/` y su
licencia en `public/licenses/` se eliminaron porque ya no se importan (la ficha usa `FeaturedGallery`, capítulos P5 y
`Marquee`; `JourneyLine` y la clase `route-story` se quitaron y Guatapé comparte el patrón de las demás fichas). El
prototipo `App.jsx`/`styles.css` también se eliminó. Un único motor propio de movimiento: rAF + FLIP + `scroll`
pasivo, sin dependencias.

Excepción aprobada, apertura del inicio «La baraja de recuerdos» (Spec 03 §H1, sistema claro §I;
implementada 2026-10-12, pendiente de auditoría): `ScrubHero.jsx` (componente propio) + `baraja-geometria.js` (funciones puras de un único progreso `u` en svh) + `scrub-hero.css`.
Dibuja los 121 fotogramas (24 fps completos, sin saltar ninguno ni mezclar entre fotogramas) en `<canvas>` con dibujo `cover` centrado,
`imageSmoothingQuality = 'high'`, scroll nativo y contenedor sticky; sin `preventDefault`, sin
librerías, carga progresiva tras el póster (LCP), ventana direccional de `ImageBitmap` (escritorio 14 delante / 4 detrás, móvil 18 / 5, según
el sentido del scroll) con `close()`, suavizado τ 60/50 ms, pausa fuera de pantalla
y limpieza al desmontar. La carta superior de la baraja y el lienzo son la misma capa: el Flip es una
interpolación determinista rect-inicial → rect-final aplicada con `transform` + `clip-path`, simétrica al subir.
Fases (svh): escritorio barajado 0–30, Flip 30–80, clip 80–245 (**165 svh**), pausa, contracción, despliegue
de 12 cartas (34 svh por carta) y total 767; móvil total 264 con clip de **140 svh**, sin pin largo, y cierre en flujo normal.
Rótulos sin huecos: c1 entra a mitad del Flip y dura hasta que entra c2 (70 % del clip); c2 dura hasta media contracción; las acciones
vuelven a media contracción. Móvil (<800 px): marco a ancho completo con alto `calc(100svh − cabecera − 200px)` (≈568 px a 390),
banda de texto fija de 200 px debajo (índice, rótulo, «Reducir movimiento» y «Saltar» en una fila), solo la carta superior hace el
Flip (las demás se desvanecen), la baraja mide ≤300 px y su borde superior queda ≥16 px bajo «Medellín,». Escritorio: marquesina de lugar
sobre la carta enfocada (≥24 px), nombre entero (tamaño por elemento ≤120 px, quieto en el 60 % central de su tramo, deriva ≤±4 vw);
«Reducir movimiento» y «Saltar» pasan a la banda de texto cuando el marco ocupa la parte alta (transform, sin layout).
Ficha de experiencia: `Marquee` ajusta el nombre completo al ancho útil (≤128 px, medido, 2 líneas equilibradas en móvil si bajara de
28 px) con deriva ±3 % ligada al scroll; sin bucle infinito.
Cierre (todas las pantallas animadas): carta destacada (62 % del ancho, 3:2 escritorio / 4:5 móvil) con las 12
miniaturas debajo a la vez; cambian por clic, hover fino, foco o flechas con Flip (WAAPI, `transform`).
Estático (movimiento reducido del sistema, botón visible «Reducir movimiento» persistente en
`localStorage` con try/catch, `saveData`/2g/3g, error de carga, `max-height:560px` o desbordamiento medido):
póster + titular + texto aprobado + rejilla de las 12 cartas + cierre.
Decisión de motor (constructor): opción B, FLIP propio + rAF; no se añade GSAP. Verificado el paquete npm
`gsap@3.15.0`: campo `license` = «Standard 'no charge' license» (solo URL; el tarball no incluye texto de
licencia), gzip de `gsap.min.js` 28,3 KB + `ScrollTrigger.min.js` 18,0 KB + `Flip.min.js` 9,7 KB = 56 KB
(sobre el estimado de 40–50 KB). Se descartó porque la baraja es una función determinista de un solo
progreso (nada que ScrollTrigger resuelva mejor), evita 56 KB y un segundo sistema de scroll, y mantiene el LCP.
Dependencia nueva: ninguna. Activos generados localmente (`site/scripts/`): `prepare-frames.py` (póster y los 121 fotogramas por
plataforma: escritorio 1920×1080 WebP q82, móvil retrato 648×900→778×1080 crop de la película, WebP q82) y `prepare-baraja.py` (`public/media/baraja/`: t 320×400,
m 400×500, d 440×550, w 900×600; sin EXIF). Presupuestos (película fluida y nítida, decisión del usuario 2026-10-12): fotogramas 21,2 MB escritorio / 7,7 MB móvil (superan a propósito
el 9,5 / 4,37 MB anterior); primera pasada navegable ≈1,6 MB (+póster 0,16) / 0,87 MB (+póster 0,06) con cada 15.º / 10.º fotograma; baraja añadida ≤1,3 MB / 0,6 MB (medido 1,24 / 0,55); póster ≤200 KB; LCP ≤2,5 s
(Slow 4G + CPU×4 a 390: mediana 1ª entrada 1,4 s; 2ª entrada 1,8 s). Pruebas: `site/scripts/check-scrub-hero.mjs` (héroe completo) y
`site/scripts/check-formas.mjs` (sección «forma de viajar», solo lectura), `check-experience-book.mjs` y `check-browser.mjs`.
`check-scroll-scenes.mjs` se retiró con ScrollScene.
Añadidos de la ronda: `Socials.jsx` (iconos de marca; X queda PENDIENTE CLIENTE), `Allies.jsx` (tira de aliados con pausa y rejilla en
movimiento reducido), `Reviews.jsx` (18 reseñas literales del sitio oficial en carrusel arrastrable/teclado), `TourDetails.jsx` y
`tour-info.json` (textos reales del sitio oficial, sin inventar duraciones, precios ni horarios) y vehículos de `webp/` + Van Master
recortada con `scripts/recortar_van_master.py`.

Ronda oficial (CORREGIR + CONSTRUIR, 2026-10-12; pendiente de auditoría independiente, no cerrada). Fuente única de lo oficial:
`tnt-colombia-connect` (solo lectura, tratado como datos). Cambios de `constructor-producto` en `site/`:

- **Fotos oficiales de Medellín** (Spec 02, pedido del usuario): `scripts/prepare-oficial.py` copia sin recomprimir los `.webp` oficiales
  (portada + galería de cada experiencia en `sedes.ts`, mismo orden y cantidad que `fotosCabecera` de la ficha oficial: 3, 20, 23, 13, 12,
  8, 11, 12, 14, 5, 3 y 13 fotos) a `public/media/oficial/{orig,w400,w800,w1200}/` con la escalera oficial `_w/` cuando existe, sin EXIF, y
  escribe `src/media.json` (`srcset` real por foto y `source` = procedencia). Picture/galería usan `srcset` + `sizes`; `FOCUS` recorta la portada
  de Traslados JMC (cartel de broma en el centro de la foto oficial). Las fuentes de la baraja (fotos del usuario) pasaron a `site/fuentes/baraja/`
  y `prepare-baraja.py` las lee ahí: **la baraja y la película no cambian**. Explorador §I.1: `prepare-exploracion.py` (selección por índice
  de las fotos oficiales, 4 por tour, derivados con los mismos presupuestos).
- **Formulario** (`Quote.jsx`, carga diferida) y **barra móvil** (`QuoteBar.jsx`, portal a `<body>`): campos, validaciones, indicativo con país en
  vivo (`indicativos.json`, datos oficiales), PQRSF solo en `/contacto`, foco al primer error, resumen de errores `role="alert"`, honeypot y time-trap
  de cliente. Canal sin backend: copiar + WhatsApp con solo el nombre del recorrido en la URL (el oficial manda los datos dentro del enlace;
  se mantiene la regla de Spec 02/04: nada personal en URLs).
- **Contacto** (`Contact.jsx`): datos de la sede Medellín (+57 304 496 1698; dirección y coordenadas del oficial); mapa con el MISMO embed de
  OpenStreetMap que el oficial detrás de una fachada (el iframe se carga al pulsar), título accesible y enlaces a Google Maps/OpenStreetMap.
  Horario: `PENDIENTE CLIENTE` (el oficial solo lo da para el grupo). Redes: Instagram y TikTok de la sede Medellín; Facebook de Medellín
  `PENDIENTE CLIENTE` (no se muestra).
- **CLS/LCP**: respaldo métrico de Inter/Montserrat (size-adjust/ascent/descent medidos) y precarga de fuentes fuera del inicio; el póster de
  arranque (`#boot`, fuera de `#root`) replica el marco de la primera carta (o el bloque estático en movimiento reducido/2g/3g) y se retira tras
  pintar la misma carta; el script de la app se pide al terminar el póster (el plugin `deferEntryAfterPoster` de `vite.config.js` se retiró en la
  ronda de cierre: lo sustituye el cargador del prerender, ver «Prerender y carga»).
- **Película**: móvil con encuadre por fotograma en el tramo final (ventana 18:25 que se ensancha de 778 a 1300 px; relleno superior que se
  funde a papel, sin deformar); escritorio con variante `d16/` 1600×900 q74 para ventanas ≤1600 px (`d/` 1920 para >1600).
- Pruebas: `check-ronda-oficial.mjs` (fotos, redes, mapa, formulario, objetivos táctiles, desbordes), `measure-vitals.mjs` (CLS/LCP,
  perfil `slow4g`), `capture-ronda-oficial.mjs` (capturas en `test-results/ronda-oficial/`).

### Prerender y carga (ronda CORREGIR de cierre, 2026-10-12; pendiente de auditoría independiente, no cerrada)

Responde a los hallazgos 3, 4 y 5 del auditor (LCP de rutas interiores, diferimiento del script de la app, bytes del explorador móvil). Sin
servidor: el sitio sigue siendo estático.

**Build en tres pasos** (`npm run build`): 1) `vite build` del cliente (con `manifest`, un solo CSS: `cssCodeSplit:false`); 2)
`vite build --ssr src/entry-server.jsx --outDir dist-ssr`; 3) `scripts/prerender.mjs`, que renderiza con `renderToString` + `StaticRouter`
las 25 rutas (`/`, 9 estáticas, 12 fichas y 3 notas) y escribe `dist/<ruta>/index.html` con el HTML de la página, `title`/`description`
propios (`src/meta.js`, fuente única para el cliente y el prerender), el CSS en línea, la precarga de la imagen LCP (la primera `<img
fetchpriority="high">` del HTML, con `imagesrcset`/`imagesizes`) y el cargador del JS. El build **falla** si una ruta cae a render de cliente
o no tiene exactamente un `h1`. `dist/404.html` es la cáscara sin HTML de servidor (404 real, cliente con `createRoot`); `/site` y `/flota`
(redirecciones de cliente) se publican con esa misma cáscara. `vite preview` (`routeStatus` en `vite.config.js`) se comporta como un host
estático: `/ruta` sirve `dist/ruta/index.html`, 404 con `dist/404.html` y gzip de los textos (sin él, Slow 4G pagaría 4× el peso).

**Rutas y chunks.** `Website.jsx` es solo la cáscara (cabecera, pie, aliados, `PageEffects`, tabla de rutas); cada ruta es un chunk
(`React.lazy` con `preload()`): `pages/Home`, `Catalog`, `Tour` (ficha + `Story` + galería), `Fleet`, `Blog` (índice + nota), `Company`
(nosotros, servicios, contacto, cotizar, privacidad, calificaciones) y `NotFound`. `shared.jsx` (Picture, TourCard, PageTitle, QuoteSection…),
`company.js` (datos de contacto), `tours-text.js` (textos sin fotos) y `meta.js` salen del paquete de la cáscara; `media.json` queda en el chunk
`content` (se pide con la ruta que lo necesita) y `exploration-media.json` + selección del explorador en `explorer-data.js` (import
dinámico en reposo tras hidratar). Entrada: ~92 KB gzip (React 19 + Router + cáscara; antes 132 KB con todo). `main.jsx` precarga el chunk de la ruta y
llama `hydrateRoot` si `#root` trae HTML (si no, `createRoot`).

**Hidratación sin desajustes.** Nada que dependa del navegador se decide en el primer render: `useLightMotion`/`useMedia`/`useMounted`
(`PremiumMotion.jsx`) usan `useSyncExternalStore` con instantánea de servidor fija (movimiento completo, `Story` en modo estático,
formulario y `QuoteBar`/portal solo tras hidratar); `QuoteSection` prerenderiza el texto del formulario (`QuoteCopy`) con un marco de alto
medido y carga `Quote` (lazy, solo cliente). `ScrubHero` parte del modo **estático** (HTML legible: póster, `h1`, texto, 12 cartas y enlaces `<a>`
reales a `/experiencias` y `/cotizar`, que funcionan sin JS) y un `useLayoutEffect` lee entorno/preferencias y pasa al modo animado antes de
pintar (`data-hydrated="true"` marca el fin); el efecto del canvas espera a `ready`. El póster `#boot` sigue siendo el elemento LCP del
inicio; mientras tanto `html.boot-scrub` deja el HTML del servidor en `visibility:hidden` (así su cambio de diseño al montar no cuenta como CLS)
y `ScrubHero` quita `#boot` y la clase dos fotogramas después de montar (a los 8 s, si el JS no llega).

**Carga (Spec 05).** El HTML es la página completa: CSS en línea (~14 KB gzip: ahorra un viaje de red de 562 ms en Slow 4G), imagen LCP precargada
y el JS (app + chunk de la ruta, `modulepreload` simultáneo) solo se pide cuando la imagen LCP (póster `#boot` en el inicio) termina o a los
3,5 s; Inter sale con él. Sustituye al plugin `deferEntryAfterPoster`, que se retira: ya no hay una pantalla sin enlaces, porque el HTML trae
`<a>` reales y funciona sin JS. En el inicio, la imagen destacada del cierre es `loading="lazy"`.

**Explorador (hallazgo 5).** En móvil (`matchMedia(max-width:899px)`) solo se precargan derivados `mobile` de la foto actual y sus vecinas; los de
escritorio (`main`/`satellite`) no se piden y la precarga por foco/hover es solo de escritorio. Las cartas son `cover`: `prepare-exploracion.py`
recorta (≤6 %) en lugar de rellenar con franjas. Tour de Compras entra con sus 3 fotos oficiales (portada incluida, no hay alternativa).

**Otros cambios de la ronda.** Traslados JMC: `tour.gallery` excluye la portada oficial (galería, miniaturas, contador y visor); tarjeta y ficha
la conservan recortada (foco 92 %). Nápoles: `tour.hero` usa la primera foto de la galería (portada oficial de 480 px solo en la tarjeta). Formulario:
un único `role="alert"` (resumen), errores de campo con `aria-invalid` + `aria-describedby`, indicativo sin mensaje duplicado, honeypot y
time-trap (2 s, solo si no hubo ninguna interacción) con el mismo aviso genérico de reintento; `today()` sin `Intl` (160 ms de tarea larga).
Contacto: el correo se ajusta por contenedor (`cqi`) y solo salta en «@». Vehículos: medio de imagen de alto fijo para alinear títulos.

**Pruebas:** `check-prerender.mjs` (25 rutas sin JS y con JS, consola limpia, 404 real), `check-cierre.mjs` (hallazgos 1, 2, 5, 7, 8 y 9),
`measure-cierre.mjs` (LCP/TBT/CLS/tarea larga en Slow 4G + CPU×4, mediana de 3), `inspect-waterfall.mjs` (cascada), `capture-cierre.mjs`; y las
existentes actualizadas (`check-formas` mide ahora `/media/exploracion/` y 11 tours; `check-premium-product` y `check-browser` leen las rutas del código;
`check-scrub-hero` espera `data-hydrated`). Resultados medidos (Slow 4G + CPU×4, mediana de 3, preview con gzip; 390 / 1440): LCP `/` 2,06 / 2,78 s; `/experiencias` 1,94 / 1,51; ficha 2,36 / 1,78;
`/vehiculos` 2,15 / 1,31; `/contacto` 1,35 / 1,34; `/cotizar` 2,65 / 1,37 s. CLS ≤0,006. TBT 118–752 ms y tarea larga 123–633 ms: **no se cumple** el objetivo
TBT <300 / tarea <200 en todas las rutas; la tarea larga dominante es el primer `Layout` (≈560 ms con CPU×4, ~140 ms reales, antes del FCP; ~270 ms son las
`@font-face` de respaldo con `local()`) y la evaluación del módulo de la app (≈270 ms). Pendiente: LCP de `/` en 1440 y `/cotizar` en 390 >2,5 s.

**Logo (pedido del usuario, 2026-10-12).** `IMAGENES/logo/logo-tyt-medellin-aportado.png` se usa tal cual (SPECS/01): `scripts/prepare-logo.py` solo lo reduce
(PNG y WebP sin pérdida 40–400 px, iconos 16/32/180/192; 512 omitido por no ampliar) y registra la procedencia en `media.json` («aportado por el usuario
2026-10-12; maestro vectorial PENDIENTE»; `prepare-oficial.py` regenera ese JSON: volver a ejecutar `prepare-logo.py` después). Cabecera 56 px (44 móvil), pie 112 px,
máscara de esquinas 20 % solo en CSS; también en `#boot` y en el HTML prerenderizado. Nota: el archivo aportado trae la «T» cortada («ransporte / urismo»).

Cada historia incluye contenido, estados de carga/vacío/error/éxito, responsive,
teclado, metadatos, medición necesaria y prueba. No se acumulan “correcciones para el
final”.

## Orden de implementación

1. Fundamentos: tokens, tipografía, layout, header, footer y accesibilidad base.
2. Inicio y componentes representativos.
3. Listados y detalles de servicios, experiencias y flota.
4. Nosotros y contacto.
5. Cotización, WhatsApp y privacidad.
6. Movimiento progresivo; primero la versión funcional estática.
7. Integraciones, medición y endurecimiento.

## Formularios y backend

- Esquema único de validación en cliente y servidor.
- Longitudes, formatos y listas permitidas explícitas.
- Honeypot, time-trap y rate limit; CAPTCHA solo ante abuso real.
- Autorización de datos informada, obligatoria y no premarcada.
- Prevención de doble envío y errores accesibles asociados a campos.
- Confirmación solo cuando el backend acepta la solicitud.
- Retención, acceso y eliminación de leads definidos con el cliente.
- Credenciales únicamente en secretos del entorno.

Si se usa un servicio de datos, las tablas de leads son privadas y aplican mínimo
privilegio. Ningún dato personal viaja a analítica, logs de frontend o URLs.

## Seguridad

HTTPS, validación de servidor, escape de contenido, dependencias revisadas, ambientes
separados y cabeceras CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy` y
`Permissions-Policy`. Enlaces externos seguros; iframes limitados a los orígenes
necesarios. Los errores no exponen internals ni secretos.

## Integraciones

- WhatsApp: número oficial y mensaje contextual codificado.
- Formularios: destino y responsable reales.
- Analítica: interfaz única de eventos, activada según consentimiento.
- Mapas, video y terceros: diferidos y con alternativa cuando fallen.
- Higgsfield: ningún llamado directo; siempre mediante la compuerta del Spec 03.

## Definition of Done por historia

- [ ] Cumple el spec y no inventa información.
- [ ] Funciona en móvil, escritorio, teclado y movimiento reducido.
- [ ] Incluye estados y errores recuperables.
- [ ] No expone secretos ni datos personales.
- [ ] Build y pruebas relevantes pasan sin errores nuevos.
- [ ] No deja placeholders, logs de depuración ni dependencias innecesarias.
- [ ] Tiene evidencia verificable y revisión del dueño correspondiente.

