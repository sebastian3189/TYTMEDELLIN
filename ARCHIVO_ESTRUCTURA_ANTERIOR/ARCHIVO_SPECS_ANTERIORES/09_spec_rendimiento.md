# ARCHIVADO — Spec 09 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `especialista-rendimiento`
**Depende de:** [`04_spec_design_system.md`](04_spec_design_system.md) · [`06_spec_modulo_venta_sedes.md`](06_spec_modulo_venta_sedes.md)
**Habilita:** 11 Analítica · 12 QA

---

## 0. Validez de las mediciones — leer antes que nada

Todas las cifras marcadas como medidas en este documento se tomaron el **2026-08-10** contra el **servidor de desarrollo** (`npm run dev`), viewport **390 × 844**, usando `PerformanceObserver` y la API de *resource timing*. Los pesos de bundle proceden del resumen del build de producción.

| Dato | ¿Válido para producción? | Por qué |
|---|---|---|
| Peso e inventario de imágenes | **Sí** | Las imágenes vienen del CDN de Unsplash. El byte que baja es idéntico en dev y en producción. |
| Anchos solicitados (`w=2940`) | **Sí** | Están en el código fuente. |
| Ausencia de `width`/`height`, `loading`, `fetchPriority` | **Sí** | Atributos del DOM, iguales en ambos entornos. |
| Comportamiento del lazy loading | **Sí** | Lo decide el navegador con el mismo marcado. |
| Pesos de bundle gzip y code splitting | **Sí** | Salen del build de producción. |
| **LCP** | **No** | Medido sin *throttling* de CPU ni de red y sobre módulos sin empaquetar. **PENDIENTE.** |
| **CLS** | **No** | Mismo motivo. **PENDIENTE.** |
| **INP, TTFB** | **No** | No medidos. **PENDIENTES.** |

**Actualización del 2026-08-10 (tarde):** ya existe medición sobre **build de producción**. Ver §0.1.

---

## 0.1 Medición sobre build de producción — y su límite

`npm run preview` estaba roto. Se resolvió construyendo con el preset `node-server` y sirviendo el resultado con Node, ahora automatizado en **`npm run preview:node`** (`scripts/preview-node.mjs`). `npm run preview` pasa a invocar wrangler, que es lo que el propio Nitro declara para el preset `cloudflare-module`.

**Condiciones:** viewport 390×844 · caché deshabilitada · red 4G a 1,6 Mbps con 150 ms de latencia · **CPU 4× más lenta** · `PerformanceObserver` sobre `largest-contentful-paint` y `layout-shift`.

| Métrica | `/` | `/sedes/cartagena` |
|---|---|---|
| **LCP** | 3 060 ms | 2 592 ms |
| **CLS** | **0** | **0** |
| TTFB | 37 ms | 26 ms |
| Peticiones | 14 | 14 |
| Peso total | 609 KB | 598 KB |

### ⚠️ El LCP medido es pesimista, y hay que decirlo

El servidor local **no comprime**: `index.js` viaja a **386 093 bytes**, sin cabecera `content-encoding`. En Cloudflare ese mismo archivo va con gzip/brotli y pesa **~118 KB**. El delta de los cuatro assets principales ronda los **370 KB**, que a 1,6 Mbps son **~1,8 s de transferencia**.

Por tanto: el LCP real en producción será sustancialmente mejor que estos 3 060 ms. **No se estima aquí una cifra concreta**, porque sería aritmética disfrazada de medición. La cifra válida se obtiene sobre el despliegue real de Cloudflare, y queda pendiente.

### Lo que la medición sí demuestra

1. **CLS = 0 en ambas rutas.** Los `width`/`height` de UX-24 eliminaron el problema por completo. Este dato **no** depende de la compresión: es válido tal cual.
2. **El LCP no lo causan las imágenes.** El hero termina de descargarse a los **1 185 ms** pesando 27 KB. El FCP ocurre a los **3 192 ms**, justo cuando termina `index.js` (3 202 ms). **El cuello de botella es el JavaScript**, y en producción lo resuelve en gran parte la compresión.
3. TTFB, número de peticiones y peso total cumplen con holgura.

---

## 1. Presupuesto

Cifras, no impresiones. Una historia que rompa cualquiera de estos umbrales se rechaza o se rediseña.

| Métrica | Objetivo | Límite duro | Medido | Estado |
|---|---|---|---|---|
| LCP (móvil, 4G simulada) | < 2.0 s | 2.5 s | **3 060 ms** (`/`) · **2 592 ms** (venta) | ⚠️ **Medida pesimista** — servidor local sin compresión, ver §0.1 |
| INP | < 200 ms | 300 ms | — | PENDIENTE |
| CLS | < 0.1 | 0.15 | **0** en ambas | ✅ **CUMPLE** |
| TTFB (SSR) | < 600 ms | 1 s | **37 ms** (`/`) · **26 ms** (venta) | ✅ **CUMPLE** |
| Peticiones en carga inicial | < 40 | 60 | **14** | ✅ **CUMPLE** |
| JS inicial comprimido | < 180 KB | 250 KB | **157 KB gzip** | ✅ **CUMPLE** |
| Peso total de página | < 1.2 MB | 2 MB | **332 KB** en `/` (antes: 19 714 KB) | ✅ **CUMPLE** — corregido en UX-23 |
| Peticiones en carga inicial | < 40 | 60 | — | PENDIENTE |
| TTFB (SSR) | < 600 ms | 1 s | — | PENDIENTE |

Por qué importa aquí: el tráfico de la capa B es mayoritariamente móvil, en redes colombianas que no siempre son buenas, y compite contra OTAs internacionales con infraestructura mucho mayor. La velocidad es una de las pocas ventajas alcanzables.

**Lectura de la medición:** el presupuesto de JavaScript, que este spec daba por roto, **ya se cumple**. El presupuesto de peso total está roto por un factor de 16, y el 100 % del exceso son imágenes. El problema del proyecto es uno solo, y no es el que se suponía.

---

## 2. Problema #1 — las imágenes · ✅ RESUELTO el 2026-08-10

> ### Resultado
>
> | | Antes | Después | |
> |---|---|---|---|
> | Peso de imágenes en `/` | **19 714 KB** | **332 KB** | **−98,3 %** · 59× más ligero |
> | Primera pantalla (sin scroll) | 2 025 KB | **159 KB** | −92 % |
> | Imágenes sin `width`/`height` | 15 de 15 | **0 de 15** | CLS estructural eliminado |
> | Hero `fetchPriority` | `auto` | **`high`** | |
> | Anchos realmente descargados a 390 px | 15 × `w=2940` | `75`×3, `150`×6, `400`×4, `600`, `1000` | el navegador elige por `srcset` |
> | Presupuesto de 1,2 MB | 16× excedido | **cumplido con holgura** | |
>
> Medido con caché deshabilitada y `encodedBodySize` (bytes reales), viewport 390×844, recorriendo la página completa.
>
> **Implementación:** helper `src/lib/img.ts` con la tabla `ANCHO` y las funciones `img()` y `srcSet()`. El ancho lo decide **el componente**, no el dato — que era la opción B recomendada más abajo. Esto resuelve el caso de una misma foto usada en dos tamaños (`sedes[].image` es tarjeta de 224 px y hero a pantalla completa; `equipo[].photo` es tarjeta de 256 px y avatar de 112 px). Los archivos de `src/data/` **no se tocaron**.
>
> **Regresión introducida y corregida en la misma ronda:** añadir `width`/`height` creó un `aspect-ratio` implícito que, combinado con altura CSS fija, reventó las columnas de grid sin `grid-cols-1` explícito. Rompió `/` y `/historia` a 320 px. Corregido añadiendo `grid-cols-1` en `index.tsx`, `equipo.tsx`, `servicios.tsx` y `TimelineItem.tsx`. Barrido posterior: **72/72 sin desborde**. La lección quedó registrada en las skills `tt-imagenes-medios` y `tt-responsive-a11y`.

El diagnóstico original, que conserva su valor como justificación numérica:

### Medición real — código

```
48 imágenes en el proyecto.
48 solicitadas con ?q=80&w=2940.
0 con cualquier otro ancho.
```

Desglose verificado:

| Archivo | Imágenes a `w=2940` |
|---|---|
| `src/data/content.ts` | 27 |
| `src/data/sedes.ts` | 12 |
| `src/routes/*.tsx` | 9 |

**No hay una sola excepción en todo el proyecto.** Un avatar circular de 96 px descarga el mismo archivo de 2940 px de ancho que el hero a pantalla completa.

### Medición real — ejecución (`/`, viewport 390 × 844)

```
15 imágenes en el DOM.
15 descargadas tras recorrer la página.
15 solicitando w=2940. Cero excepciones.

PESO TOTAL REAL = 19 714 KB  (19,7 MB)
Presupuesto del spec = 1 200 KB
                       → 16× EXCEDIDO
```

Esto **sustituye a la estimación anterior**, que hablaba de "aproximadamente 15 imágenes" sin cifra de peso. El peso es real y se descarga entero.

### Cuánto pesa realmente cada ancho

Medido con `curl` sobre una foto representativa (`photo-1552832230-c0197dd311b5`):

| Ancho pedido | Peso real | Frente a `w=2940` |
|---|---|---|
| `w=200` | 11 KB | ÷ 80 |
| `w=400` | 27 KB | ÷ 32 |
| `w=800` | 78 KB | ÷ 11 |
| `w=1200` | 156 KB | ÷ 5,6 |
| `w=2000` | 412 KB | ÷ 2,1 |
| **`w=2940`** | **876 KB** | — |

La curva es la justificación numérica de toda la sección: bajar un avatar de `w=2940` a `w=200` no ahorra "algo", ahorra **865 KB por avatar**.

### El desperdicio, cuantificado

| Elemento | Se muestra a | Se pide a | Sobredimensión |
|---|---|---|---|
| Foto de testimonio | **48 px** | 2940 px | **61×** |
| Avatar de equipo | 112 px | 2940 px | **26×** |
| Card de sede | ~390 px | 2940 px | ~7,5× |
| Hero | ancho completo | 2940 px | ~1,5× (el único razonable) |

Una foto de testimonio de 48 px de lado descarga 876 KB. Es el caso más extremo del proyecto y el primero que hay que corregir.

### Dos hallazgos adicionales de la medición

1. **Las 15 imágenes carecen de atributos `width` y `height`.** No es un riesgo teórico: no hay ni un solo espacio reservado en toda la página. El CLS no está medido en producción (§0), pero la causa estructural está confirmada y hay que eliminarla igual.
2. **El lazy loading sí funciona.** Al cargar `/` sin hacer scroll solo se descargan **2 imágenes (2 025 KB)**; las 13 restantes entran al desplazarse. Es la única buena noticia de la sección — y también significa que los 19,7 MB no bloquean la primera pintura, pero sí castigan por completo al usuario que recorre la página, que es el usuario que convierte. **No usar esto como excusa para bajar la prioridad de UX-23.**

### Tabla de anchos correcta

| Uso | Renderizado | Pedir |
|---|---|---|
| Avatar de equipo (`size-24`, `size-28`) | 96–112 px | `w=200` |
| Card de experiencia, sede, testimonio | 300–420 px | `w=800` |
| Bloque texto + imagen (`h-80`) | 500–640 px | `w=1200` |
| Hero de página | ancho completo | `w=2000` |
| Hero en monitor grande | ancho completo | `w=2400` |

### Corrección

1. **UX-23** — ajustar el ancho al uso. Es una búsqueda y reemplazo sobre 48 ocurrencias, con criterio por tipo de imagen. Bajo esfuerzo, impacto **enorme**: aplicando la tabla de anchos a las 15 imágenes del home, el peso pasa de **19 714 KB a ~1 100 KB**, es decir **–94 %**, y el presupuesto de 1,2 MB entra en cumplimiento. Es la optimización de mejor relación esfuerzo/ganancia de todo el proyecto, por un margen amplio.
2. **UX-24** — añadir `srcset`/`sizes`, y `width`/`height` explícitos contra CLS. Los `width`/`height` **faltan en las 15 imágenes del home**: es la causa estructural de CLS confirmada en la medición.

```tsx
<img
  src="https://images.unsplash.com/photo-…?q=80&w=800"
  srcSet="…?q=80&w=400 400w, …?q=80&w=800 800w, …?q=80&w=1200 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Finca cafetera tradicional en el Quindío con secaderos al sol"
  width={800}
  height={560}
  loading="lazy"
  decoding="async"
  className="h-56 w-full object-cover"
/>
```

`width`/`height` fijan la proporción y reservan el espacio; `className` sigue mandando en el tamaño visual.

### Nota sobre el modelo de datos

Las URL viven en `src/data/`, donde hoy se guarda una cadena única. Para `srcset` hay dos caminos:

- **A** — un helper `unsplash(id, ancho)` que construya la URL. Centraliza el criterio y evita repetir la base tres veces por imagen.
- **B** — guardar el ID de la foto en el dato y que el componente construya las URL.

**Recomendada: B.** Deja el dato limpio y traslada la decisión de tamaño al componente, que es quien sabe a qué tamaño se va a mostrar.

---

## 3. Problema #2 — el hero es el LCP y no está priorizado

`PageHero` renderiza la imagen de fondo de las 9 rutas. Es el LCP de prácticamente todas, y hoy:

**Confirmado en el DOM en ejecución:** la imagen del hero sale con `loading="auto"` y `fetchPriority="auto"`. No es una sospecha del spec: **el hero no está priorizado**, medido y verificado.

| Problema | Efecto | Corrección |
|---|---|---|
| `fetchPriority="auto"` y `loading="auto"` (verificado) | Compite en prioridad con las otras 14 imágenes de la misma página, todas de 876 KB | `fetchPriority="high"`, nunca `lazy` |
| `h-[62vh]` junto a `size-full` en la misma imagen | Declaraciones en conflicto | Una sola, en el contenedor |
| `vh` en lugar de `dvh` | El hero salta al aparecer y desaparecer la barra del navegador móvil; contribuye a CLS | `dvh` |
| Sin color de respaldo | Si la imagen tarda o falla, el `h1` blanco queda sobre blanco | `bg-ink` en el `<section>` |
| Sin `width`/`height` | Salto de layout | Añadir |

Todo esto es **UX-22**: esfuerzo muy bajo, impacto alto. Es la primera optimización a ejecutar.

---

## 4. Problema #3 — parpadeo de tema e idioma

`I18nProvider` (`src/i18n/index.tsx:31-34`) y `ThemeProvider` (`src/lib/theme.tsx`) leen `localStorage` dentro de `useEffect`.

Con SSR, la secuencia es:

```
1. El servidor renderiza en español y tema claro (no conoce localStorage)
2. El navegador pinta eso
3. Hidrata
4. useEffect lee localStorage
5. Si el usuario tenía inglés + oscuro, TODO cambia de golpe
```

Un usuario recurrente ve el parpadeo **en cada carga de página**.

### Medido el 2026-08-10 — es peor de lo que sugería la descripción

Con `tt-lang=en` y `tt-theme=dark` guardados, CPU 6× más lenta, muestreando el DOM cada 40 ms:

| Momento | `lang` | Tema | Fondo |
|---|---|---|---|
| **342 ms** (primera pintura) | `es` | claro | `oklch(1 0 0)` — blanco |
| **5 521 ms** | `en` | oscuro | `oklch(0.21 0.005 130)` |

**El usuario ve la página en el idioma equivocado y con el tema equivocado durante 5,5 segundos.** No es un parpadeo: es media navegación. Y como el cambio llega después de la hidratación, ocurre justo cuando la persona ya empezó a leer.

En un dispositivo rápido el intervalo se acorta, pero el defecto es estructural, no de velocidad: la primera pintura **siempre** sale con los valores por defecto del servidor.

Esto sube la prioridad real de **UX-31**: no es un pulido estético, es una promesa incumplida al usuario que ya eligió sus preferencias.

### ✅ Resuelto a medias — 2026-08-10. Y la mitad que falta no es pereza

Se aplicó la **opción A**: `SCRIPT_ANTI_PARPADEO` en `src/lib/theme.tsx`, inyectado sin `defer` en el `<head>` de `__root.tsx`.

Medido con `tt-theme=dark` y `tt-lang=en` guardados, CPU 6× lenta:

| | Antes | Después |
|---|---|---|
| Tema en la primera pintura | claro (incorrecto) durante **5 521 ms** | **oscuro desde los 120 ms** ✅ |
| Avisos de hidratación de React | — | **0** |
| Avisos de consola | — | **0** |

**El parpadeo de idioma sigue ahí, y es estructural.** El script puede aplicar una clase CSS antes de pintar, pero **no puede reescribir el texto**: el HTML que manda el servidor ya viene en español. Verificado: el `<h1>` cambia de español a `"More than 22 years connecting Colombia with trust"` tras hidratar.

Arreglarlo exige que **el servidor sepa el idioma antes de renderizar**, es decir migrar de `localStorage` a **cookie** y leerla en el SSR. Eso es la opción B, y es un cambio de arquitectura del `I18nProvider`, no un parche.

Se deja explícitamente pendiente en lugar de fingir que UX-31 está cerrada. La mitad entregada es la que más se notaba —el repintado completo de blanco a oscuro— y la que faltaba es la que exige rediseñar cómo viaja la preferencia.

### Soluciones

| Opción | Cómo | Ventaja | Coste |
|---|---|---|---|
| **A** — Script bloqueante en `<head>` | Lee `localStorage` y aplica la clase `dark` y el `lang` antes de la primera pintura | Elimina el parpadeo por completo | Un script inline mínimo; hay que contemplarlo en la CSP (spec 10) |
| **B** — Cookie leída en servidor | El servidor renderiza ya con la preferencia correcta | Solución más limpia con SSR | Requiere migrar de `localStorage` a cookie |
| **C** — Ocultar hasta hidratar | `visibility: hidden` inicial | Trivial | Empeora el LCP. **Descartada** |

**Recomendada: A** por relación coste/beneficio. **B** si más adelante se quiere SSR completamente coherente.

Es **UX-31**.

---

## 5. JavaScript — la hipótesis de este spec queda refutada

Este spec asumía que el JavaScript era un frente abierto. **La medición dice que no.**

### Bundle de cliente real (build de producción, gzip)

| Chunk | gzip |
|---|---|
| `index` | 118 KB |
| `i18n` | 12 KB |
| `content` | 10 KB |
| `routes` | 2 KB |
| `button` | 3 KB |
| CSS | 13 KB |
| **CARGA INICIAL** | **157 KB** |

```
Carga inicial real  = 157 KB gzip
Presupuesto (§1)    = 180 KB gzip
                      → EL PRESUPUESTO YA SE CUMPLE
```

Y el **code splitting ya funciona**: `/contacto` se emite como chunk aparte de **30 KB gzip** que **no entra en la carga inicial**. TanStack Router está dividiendo por ruta como se esperaba.

### Consecuencia para el backlog

**UX-32 (diferir mapa, carrusel y galerías) baja de prioridad.** No es un problema abierto: es una mejora incremental sobre un presupuesto que ya se respeta, con 23 KB de margen. Concretamente:

- **No** se ejecuta antes que UX-22, UX-23 ni UX-24. Mover 19,7 MB de imágenes vale ~800 veces más que mover 20 KB de JS.
- Sigue teniendo sentido para el `iframe` del mapa de `/contacto`, que arrastra red de terceros además de JS, y para las galerías de la capa B cuando lleguen (spec 06), porque ahí el riesgo es futuro y de peso, no actual.
- El presupuesto de 180 KB pasa a ser una **línea de defensa que vigilar**, no un objetivo que alcanzar. Cada historia nueva se mide contra los 157 KB actuales; el margen se gasta, no se regala.

### Dependencias instaladas y no utilizadas

`package.json` incluye paquetes pesados que hoy no se usan en ninguna ruta:

| Paquete | Peso aproximado | Uso actual |
|---|---|---|
| `recharts` | grande | Ninguno |
| `react-day-picker` + `date-fns` | medio | Ninguno |
| `embla-carousel-react` | pequeño | Ninguno todavía (lo usará UX-05) |
| `input-otp`, `vaul`, `react-resizable-panels`, `cmdk` | pequeño-medio | Ninguno |

**No están en el bundle** mientras nadie los importe: Vite hace tree-shaking por módulo. El riesgo es un import accidental —por ejemplo, importar `chart.tsx` de `src/components/ui/` arrastra `recharts` entero.

**Acción:** vigilar, no desinstalar a ciegas. `src/components/ui/` los referencia y eliminarlos rompería el build.

### Code splitting — UX-32 (prioridad baja, ver arriba)

La división por ruta **ya está resuelta y verificada** (`/contacto` = 30 KB gzip fuera de la carga inicial). Lo que queda es diferir lo pesado *dentro* de cada ruta, y es trabajo de margen, no de rescate:

| Componente | Cuándo cargarlo | Prioridad |
|---|---|---|
| `iframe` del mapa (`/contacto`) | Al entrar en viewport, o tras interacción | La única con valor claro hoy: es red de terceros |
| Galería de la ficha de experiencia | Al entrar en viewport | Cuando exista (spec 06) |
| Carrusel de testimonios | Al entrar en viewport | Cuando exista (UX-05) |
| Formulario de contacto | Con la ruta; es su contenido principal | No diferir |

### Medición

```bash
npm run build
```
Revisar el resumen de tamaños que imprime Vite. Registrar la cifra antes y después de cada optimización. **Línea base registrada: 157 KB gzip de carga inicial.**

---

## 6. Fuentes

Inter + Montserrat desde Google Fonts, declaradas en `__root.tsx`:

**Lo que ya está bien:** `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` con `crossOrigin`, y `display=swap`.

**Mejorable:**

| Punto | Acción |
|---|---|
| Se cargan 4 pesos de Inter y 3 de Montserrat | Verificar que los 7 se usan; cada peso es una descarga |
| Sin `&subset=latin` | Reduce el archivo notablemente para un sitio en español e inglés |
| Origen externo | Auto-hospedarlas elimina un handshake y un origen de la CSP |

**Recomendación:** subsetear ahora; evaluar el auto-hospedaje solo si el análisis muestra que las fuentes bloquean el render.

---

## 7. Renderizado, caché e infraestructura

### El destino de despliegue es Cloudflare Workers — verificado

El build genera `.output/server/wrangler.json` y `.output/public/_headers`. El preset de Nitro es el de **Cloudflare Workers**. Esto no estaba escrito en el spec y condiciona todo lo demás de esta sección.

### Estado real

| Punto | Estado | Detalle |
|---|---|---|
| SSR | ✅ Funciona | TanStack Start + Nitro. El contenido llega en el HTML: bueno para SEO y para el primer pintado. |
| Caché de estáticos | ✅ **YA RESUELTO** | `.output/public/_headers` ya trae `cache-control: public, max-age=31536000, immutable` para `/assets/*`. **No hay nada que hacer aquí**; la versión anterior de este spec lo listaba como pendiente y era incorrecto. |
| Caché de HTML | ☐ Por verificar | Debe ser `no-cache` con revalidación. No comprobado en `_headers`. |
| Streaming SSR | ☐ A evaluar | Para las rutas pesadas de la capa B. |
| CDN de imágenes | — | Hoy Unsplash. Al migrar a fotografía propia (§11), los assets pasan a servirse por el CDN de Cloudflare con el `_headers` ya correcto. |

Consecuencia práctica: al desplegar en Workers, los estáticos con hash quedan cacheados un año en el borde sin trabajo adicional. El peso de 19,7 MB de §2 **no** se beneficia de esto, porque esas imágenes no salen de nuestro origen sino de `images.unsplash.com`. Es un argumento más a favor de UX-39.

---

## 8. La capa B pesa más

`/sedes/eje-cafetero` y `/sedes/cartagena` muestran 4 experiencias con imagen cada una, y son las páginas con mayor tráfico esperado. Con las fichas de detalle y sus galerías (spec 06), el riesgo crece.

Reglas específicas:

1. La galería **siempre** diferida y bajo el pliegue.
2. Sólo la primera imagen del catálogo por encima del pliegue carga con prioridad normal; el resto, `lazy`.
3. El presupuesto de peso se aplica con más rigor aquí que en la capa A.
4. Medir estas dos rutas por separado en cada revisión.

---

## 9. Método de medición

### ⚠️ `npm run preview` está roto

```bash
npm run build && npm run preview   # ← NO FUNCIONA HOY
```

El script espera `dist/server/server.js`, pero el preset de Cloudflare escribe la salida en `.output/server/`. El comando falla. Este spec lo prescribía como método oficial de medición y **por eso no existe todavía ninguna cifra de producción**.

**Alternativa mientras no se arregle:**

```bash
npm run dev    # sirve para inventario de imágenes, pesos de recursos y atributos del DOM
npm run build  # sirve para pesos de bundle gzip
```

Con la advertencia obligatoria: **las cifras de `dev` no son cifras de producción.** Módulos sin empaquetar, sin minificar y sin *throttling*. Sirven para peso de imágenes (idéntico, viene del CDN) y para inspección del DOM; **no** sirven para LCP, CLS, INP ni TTFB. Ver §0.

Arreglar `npm run preview` —o sustituirlo por `wrangler dev .output` — es **requisito previo** para cerrar las casillas de Core Web Vitals de §12.

Con el navegador:

```js
() => JSON.stringify({
  nav: performance.getEntriesByType('navigation')[0].duration,
  lcp: performance.getEntriesByType('largest-contentful-paint').at(-1)?.startTime,
  totalKB: Math.round(
    performance.getEntriesByType('resource')
      .reduce((s, r) => s + (r.transferSize || 0), 0) / 1024
  ),
  peticiones: performance.getEntriesByType('resource').length,
  top10: performance.getEntriesByType('resource')
    .map(r => ({ n: r.name.slice(-55), kb: Math.round((r.transferSize||0)/1024) }))
    .sort((a,b) => b.kb - a.kb).slice(0, 10),
}, null, 1)
```

Además: Lighthouse en móvil emulado con 4G, sobre `/` y sobre `/sedes/cartagena`.

### Herramientas ausentes en el entorno actual

| Herramienta | Estado | Consecuencia |
|---|---|---|
| Lighthouse | **No instalado** | Sin puntuación de Core Web Vitals emulados |
| Playwright (paquete local) | **No instalado** | Sin captura de red con *throttling* |
| `npm run preview` | **Roto** (ver arriba) | Sin servidor de producción local |

Lo medido hasta hoy se obtuvo con `PerformanceObserver` y *resource timing* sobre `npm run dev`, sin *throttling* de CPU ni de red. Instalar cualquiera de las tres herramientas desbloquea las casillas pendientes de §12.

### Regla

**Ninguna optimización se declara hecha sin cifra comparativa.** "Se ve más rápido" no es una medición.

**Corolario añadido tras esta medición:** tampoco es una medición una cifra tomada en el entorno equivocado. Un LCP de `npm run dev` sin *throttling* no vale como verificación de un objetivo de "móvil, 4G simulada". Si no se puede medir en las condiciones del presupuesto, la casilla se queda **PENDIENTE** — no se marca con una cifra parecida.

---

## 10. Orden de ejecución

Reordenado tras la medición del 2026-08-10.

| # | Acción | Historia | Esfuerzo | Ganancia esperada | Estado |
|---|---|---|---|---|---|
| 1 | Medir peso de imágenes y bundle; registrar línea base | — | S | Referencia | ✅ **HECHO** (§0, §2, §5) |
| 2 | Ajustar los 48 anchos de imagen | UX-23 | M | **–94 % de peso: 19 714 KB → ~1 100 KB** | Pendiente |
| 3 | Corregir `PageHero`: `fetchPriority="high"`, respaldo, `dvh` | UX-22 | S | **LCP** | Pendiente |
| 4 | `srcset`, `sizes`, `width`, `height` en las 15 imágenes | UX-24 | M | Peso móvil + **CLS** | Pendiente |
| 5 | Arreglar `npm run preview` (ruta `.output/`) | — | S | **Desbloquea toda medición de producción** | Pendiente |
| 6 | Medir LCP/CLS/INP en producción y comparar | — | S | Verificación real | Bloqueado por 5 |
| 7 | Eliminar el parpadeo de hidratación | UX-31 | M | CLS + percepción | Pendiente |
| 8 | Subsetear fuentes | — | S | Bloqueo de render | Pendiente |
| 9 | Diferir mapa y galerías | UX-32 | M | JS inicial (margen, no rescate) | **Baja prioridad** |

Cambios respecto al orden anterior:

- **UX-23 sube al primer puesto.** Ya no compite con UX-22: mueve 18,6 MB. Es la única acción del proyecto con ganancia de esa magnitud.
- **Arreglar `preview` sube a la posición 5** y se convierte en tarea explícita: sin él no hay forma de cerrar ninguna casilla de Core Web Vitals.
- **UX-32 baja al último puesto.** El presupuesto de JS ya se cumple con 23 KB de margen (§5). Dejarlo arriba desviaría esfuerzo del problema real.

Los pasos 2, 3 y 4 concentran prácticamente toda la ganancia disponible. **Empezar por ahí, y por el 2.**

---

## 11. Migración a fotografía propia en WebP — UX-39

> **Confirmado por el cliente:** las imágenes de Unsplash que hay hoy son **ejemplos**. Se sustituirán por **fotografía real propia en formato WebP**.

Es además lo correcto de fondo: un operador de transporte cuyo argumento son sus vehículos, su equipo y sus destinos no puede ilustrarse con banco de imágenes genérico. Un cliente corporativo lo nota, y resta exactamente la credibilidad que el sitio busca construir.

### Qué ya está preparado para esa migración

El helper [`src/lib/img.ts`](src/lib/img.ts) deja el cambio acotado:

- `img()` **solo reescribe URLs de `images.unsplash.com`**. Cualquier otra ruta la devuelve intacta, así que una imagen local pasa sin tocarse y **nada se rompe** el día que se sustituya.
- Los componentes ya piden el ancho por uso (`ANCHO.avatar`, `ANCHO.card`, `ANCHO.bloque`, `ANCHO.hero`), así que el criterio de tamaño ya está decidido y documentado.
- Los `width`/`height` ya están puestos: el CLS seguirá en 0 tras la migración.

### Qué hay que hacer al migrar

| Paso | Detalle |
|---|---|
| 1. Ubicación | `public/img/{seccion}/` — por ejemplo `public/img/sedes/`, `public/img/equipo/` |
| 2. Formato | **WebP** como principal. AVIF opcional para heros si se quiere apurar; JPEG de respaldo solo si aparece un navegador que lo exija |
| 3. Variantes | Generar los anchos de la escalera que ya usa `srcSet()`: **400 · 640 · 800 · 1200 · 1600 · 2000 · 2800**, cada uno solo hasta donde tenga sentido para ese uso |
| 4. Nombres | kebab-case y descriptivos: `valle-de-cocora-palmas-800.webp` |
| 5. Techos de peso | avatar ≤ 20 KB · card ≤ 100 KB · bloque ≤ 150 KB · hero ≤ 250 KB |
| 6. Adaptar el helper | `img()` deberá construir la ruta local con el ancho (`…-800.webp`) en lugar del parámetro `?w=`. Es un cambio **en un solo archivo** |
| 7. Calidad | WebP con calidad 80–85. Por debajo se nota en cielos y degradados, que abundan en fotografía de paisaje colombiano |
| 8. `alt` reales | Al llegar la foto real, el `alt` debe describir **esa** foto, no la de ejemplo |

### Beneficios adicionales

- Elimina `images.unsplash.com` de la CSP: **un origen externo menos** (spec 10 §6).
- Elimina un handshake TLS y la latencia de un CDN de terceros.
- Las imágenes pasan a servirse desde Cloudflare con la caché inmutable de `_headers`, que ya existe.
- WebP pesa entre un 25 % y un 35 % menos que JPEG a igual calidad percibida.

**Hasta que lleguen las fotos reales, las de Unsplash se quedan** y el sitio es plenamente funcional: la optimización de UX-23 y UX-24 ya está hecha sobre ellas y se conserva.

---

## 12. Compuerta hacia el spec 10

Nada se marca por estar escrito. Aquí, además, **nada se marca sin cifra** — y ninguna cifra vale si se tomó fuera de las condiciones del presupuesto (§0).

### Verificado con cifra

| | Punto | Cifra medida |
|---|---|---|
| ☑ | Peso real del home medido antes de tocar imágenes | **19 714 KB**, 15 imágenes, viewport 390 × 844 |
| ☑ | Inventario de anchos solicitados | 15/15 a `w=2940`, cero excepciones |
| ☑ | Coste real por ancho de Unsplash | 200→11 KB · 400→27 KB · 800→78 KB · 1200→156 KB · 2000→412 KB · 2940→**876 KB** |
| ☑ | Sobredimensión máxima cuantificada | Testimonio a 48 px pidiendo 2940 px = **61×** |
| ☑ | Ausencia de `width`/`height` confirmada | 15/15 sin ambos atributos |
| ☑ | Hero sin priorizar confirmado | `loading="auto"` + `fetchPriority="auto"` en el DOM |
| ☑ | Lazy loading funcionando | Sin scroll: 2 imágenes, **2 025 KB**. El resto entra al desplazarse |
| ☑ | **JS inicial < 180 KB** | **157 KB gzip** (index 118 · i18n 12 · content 10 · routes 2 · button 3 · CSS 13) |
| ☑ | Code splitting por ruta operativo | `/contacto` = **30 KB gzip** fuera de la carga inicial |
| ☑ | Caché de estáticos correcta | `_headers`: `public, max-age=31536000, immutable` en `/assets/*` |
| ☑ | Destino de despliegue identificado | Cloudflare Workers (`.output/server/wrangler.json`) |

### Pendiente — no medible en el entorno actual

| | Punto | Qué falta |
|---|---|---|
| ☐ | **LCP** en móvil 4G simulada | Bloqueado: `npm run preview` roto, sin Lighthouse, sin Playwright local |
| ☐ | **CLS** | Ídem. La causa (falta de `width`/`height`) está confirmada; la métrica no |
| ☐ | **INP** | Ídem |
| ☐ | **TTFB (SSR)** | Requiere servidor de producción |
| ☐ | Peticiones en carga inicial < 40 | No contadas en condiciones de producción |
| ☐ | Confirmado que el hero es el LCP | Requiere entrada `largest-contentful-paint` en producción |
| ☐ | Las dos rutas de venta medidas por separado | `/sedes/eje-cafetero` y `/sedes/cartagena`, aún sin medir |
| ☐ | Caché de HTML (`no-cache` + revalidación) | No verificada en `_headers` |
| ☐ | Parpadeo de tema e idioma reproducido | Elegir inglés + oscuro, recargar con red lenta |
| ☐ | `npm run preview` arreglado | Espera `dist/server/server.js`; Cloudflare escribe en `.output/server/` |

### 🔴 Regresión medida el 2026-08-28 — el catálogo viaja en el chunk común

Al cargar los catálogos reales del cliente (12 experiencias de Cartagena y 5 del
Eje Cafetero, con `incluye`, `noIncluye`, `pilares`, `ruta` y galerías, todo
bilingüe), `src/data/sedes.ts` creció de ~200 a ~1.000 líneas. Y va **entero en
el chunk principal**.

| | Antes | Ahora |
|---|---|---|
| Chunk principal | 118 KB gzip | **140,0 KB gzip** |
| Carga inicial (index + i18n + button + routes + CSS) | 157 KB | **189,6 KB** |
| Presupuesto | 180 KB | **incumplido por 9,6 KB** |

Comprobado grepeando el build: cadenas como `Volcán del Totumo` y
`Muelle La Bodeguita` aparecen dentro de `assets/index-*.js`. Es decir, **toda
página** —`/contacto`, `/historia`, `/equipo`— descarga el catálogo de venta
completo sin usarlo.

No lo causó ninguna dependencia nueva: en esa ronda no entró ni una. Lo causó el
dato. El home importa `sedes` para pintar las cuatro tarjetas de sede, y con eso
arrastra al chunk común las 17 fichas con todo su texto.

**Arreglo pendiente**: separar el dato de presentación de la sede (nombre,
ciudad, imagen, descripción — lo que necesita el home) del catálogo de
experiencias, y que este último lo carguen solo `/sedes/$slug` y
`/sedes/$slug_/$experiencia`, por `loader` o por importación diferida. Estimado:
devuelve ~20 KB a todas las páginas del sitio.

Decisión del cliente el 2026-08-28: **se pospone**; se sigue con trabajo de
diseño. Queda anotado aquí para no perderlo.

---

### Pendiente — trabajo de optimización

| | Punto | Cómo se rectifica |
|---|---|---|
| ☐ | Las 48 imágenes ajustadas a su ancho de uso | `rg -c "w=2940" src/` devuelve solo heros |
| ☐ | Peso total de `/` < 1,2 MB | Nueva medición de red: de 19 714 KB a ~1 100 KB |
| ☐ | `width`/`height` presentes en las 15 imágenes | Inspección del DOM |
| ☐ | LCP < 2.0 s tras la optimización | Nueva medición comparada, en producción |
| ☐ | CLS < 0.1 tras `width`/`height` | Nueva medición, en producción |
| ☐ | Ninguna dependencia no usada entró al bundle | Vigilar contra la línea base de 157 KB |

**Estado de la compuerta: CERRADA.**

Dos motivos, y conviene no confundirlos:

1. **Peso.** El home pesa 19,7 MB contra un presupuesto de 1,2 MB. Es un incumplimiento medido, no una sospecha.
2. **Falta de instrumentación.** LCP, CLS e INP no se han podido medir en condiciones de producción. No están mal: están **sin medir**, y este spec no admite marcar como verificado lo que no se ha observado.

Lo que **sí** puede darse por bueno y no hay que volver a tocar: el presupuesto de JavaScript (157 KB), el code splitting por ruta, y la caché de estáticos del §7. Tres frentes que este spec daba por abiertos y la medición cerró.
