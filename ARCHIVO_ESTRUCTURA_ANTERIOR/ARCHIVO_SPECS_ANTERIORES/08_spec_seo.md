# ARCHIVADO — Spec 08 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `especialista-seo`
**Depende de:** [`03_spec_arquitectura_informacion.md`](03_spec_arquitectura_informacion.md) · [`05_spec_contenido_copy.md`](05_spec_contenido_copy.md) · [`06_spec_modulo_venta_sedes.md`](06_spec_modulo_venta_sedes.md)
**Habilita:** 11 Analítica

---

## 1. Objetivo

Dos objetivos distintos, uno por capa. Confundirlos es el error estratégico más caro de este proyecto.

| Capa | Objetivo | Naturaleza |
|---|---|---|
| **A — corporativa** | Aparecer cuando una empresa busca proveedor de movilidad, y cuando alguien busca la marca | Volumen bajo, valor por lead alto, ciclo largo |
| **B — venta** | Captar tráfico transaccional de Eje Cafetero y Cartagena | **Volumen alto**, conversión directa |

La capa B es donde está el tráfico. `/sedes/eje-cafetero` y `/sedes/cartagena` son, con diferencia, las páginas con mayor potencial orgánico del sitio, y merecen tratamiento de página cabecera, no de subpágina.

### KPIs

| KPI | Capa A | Capa B |
|---|---|---|
| Impresiones | Marca + corporativo nacional | Consultas turísticas por región |
| CTR | > 3 % | > 5 % |
| Posición media | Top 10 en marca, top 20 en corporativo | Top 10 en long tail regional |
| Conversión | Envíos de formulario corporativo | Clics en cotización |

---

## 2. Reparto con los sitios hermanos

Este sitio convive con `transporteyturismobogota.com` y con el futuro sitio de Medellín. **Si compiten por la misma consulta, ambos pierden.**

| Consulta | Dueño |
|---|---|
| Tours y traslados **en Bogotá** | Sitio de Bogotá. Este sitio **no compite** |
| Tours y traslados **en Medellín** | Sitio de Medellín. Este sitio **no compite** |
| Tours y traslados **Eje Cafetero** | **Este sitio**, sin competencia interna |
| Tours y traslados **Cartagena** | **Este sitio**, sin competencia interna |
| Transporte corporativo nacional | **Este sitio** |
| Marca "Transporte y Turismo Medellín" | **Este sitio** |

**Riesgo real.** El home actual dice "traslados aeropuerto y hotel" y "experiencias en cuatro regiones" en `servicios`. Eso puede canibalizar consultas de Bogotá. La página `/servicios` debe posicionar por **servicio corporativo nacional**, no por traslados de una ciudad concreta.

### 2.1 Revisión de canibalización — 2026-08-11

Se leyó el copy real de `/` y `/servicios` en `src/data/content.ts`, no las
propuestas de este documento. Hallazgos y qué se hizo:

| Hallazgo | Dónde | Acción |
|---|---|---|
| El home **no** contiene el texto que denunciaba §2. Su copy es institucional y de marca: *"Más de 22 años conectando a Colombia con confianza"*, *"Somos un grupo colombiano de transporte y turismo"*. No hay ninguna consulta transaccional de ciudad | `copy.heroTitle`, `copy.heroSubtitle` | Nada que corregir. El riesgo estaba mal atribuido: la frase vivía en `/servicios`, no en el home |
| `"Traslados aeropuerto y hotel"`, a secas y sin región, en el bloque *Turismo receptivo* | `servicios[1].bullets[0]` | **Corregido** a `"Traslados aeropuerto y hotel en nuestras regiones"` / `"Airport and hotel transfers in our regions"`. Bilingüe, mismo sentido, sin competir por la consulta genérica de traslado |
| `"Experiencias en cuatro regiones"` | `servicios[1].bullets[1]` | Se conserva. Nombra la cobertura del grupo, no una consulta de ciudad |
| **El defecto de fondo era el `title`**: `/servicios` se llamaba `Servicios \| T&T Medellín`, un título genérico que no reclamaba ninguna intención y quedaba expuesto a consultas de traslado sin ciudad | `src/routes/servicios.tsx` | **Corregido** a `Transporte corporativo en Colombia \| T&T Medellín`, con la `description` de §4. Ahora la página reclama la intención corporativa nacional, que es su dueño legítimo |
| La ficha de Bogotá en `/` y `/sedes` describe *"Transporte corporativo, traslados ejecutivos y turismo receptivo"* | `src/data/sedes.ts` | Se conserva. Es una tarjeta que **enlaza al sitio de Bogotá**: describe a la sede para mandarle tráfico, no compite con ella |

> ⚠️ **Pendiente de `copy-bilingue`**, no de SEO: el `h1` de `/servicios` sigue
> siendo *"Nuestros servicios"* mientras el `title` dice *"Transporte
> corporativo en Colombia"*. No es un defecto —el `h2` de la primera sección sí
> dice "Transporte corporativo"— pero §9 pide la palabra clave también en el
> `h1`. El copy manda sobre la optimización: se propone, no se cambia aquí.

---

## 3. Clústeres de palabras clave

> **Advertencia metodológica.** No se dispone de datos de volumen de una herramienta. Lo que sigue es **estimación cualitativa** basada en la estructura del mercado y el contenido de los sitios existentes. Antes de ejecutar, validar con Search Console, Keyword Planner o equivalente. **No se inventan cifras de volumen.**

### 3.1 Capa A — corporativo

| Clúster | Términos representativos | Intención |
|---|---|---|
| Transporte corporativo | transporte corporativo Medellín · transporte empresarial Medellín · transporte de personal Antioquia | Transaccional B2B |
| Transporte ejecutivo | transporte ejecutivo Medellín · traslados ejecutivos empresas Medellín | Transaccional B2B |
| Eventos corporativos | transporte para eventos corporativos Medellín · transporte congresos Medellín | Transaccional B2B |
| Operador receptivo | operador de turismo receptivo Medellín · DMC Medellín · turismo Antioquia | Comercial B2B |
| Alianzas | proveedor transporte hoteles Medellín · convenios transporte agencias Antioquia | Comercial B2B |
| Marca | transporte y turismo Medellín · T&T Medellín | Navegacional |

### 3.2 Capa B — Eje Cafetero

| Clúster | Términos representativos | Intención |
|---|---|---|
| Ruta del café | ruta del café Eje Cafetero · tour finca cafetera Salento · tour del café Quindío | **Transaccional** |
| Valle de Cocora | tour Valle de Cocora · Cocora desde Salento · palma de cera Quindío | **Transaccional** |
| Pueblos patrimonio | tour Salento y Filandia · pueblos patrimonio Quindío | **Transaccional** |
| Parque del Café | transporte Parque del Café · tour Parque del Café Montenegro | **Transaccional** |
| Traslados | traslado aeropuerto Matecaña · traslado aeropuerto El Edén · transporte Pereira Salento | **Transaccional** |
| Regional | qué hacer en el Eje Cafetero · tours Eje Cafetero | Informacional |

### 3.3 Capa B — Cartagena

| Clúster | Términos representativos | Intención |
|---|---|---|
| Islas del Rosario | tour Islas del Rosario · Rosario desde Cartagena · plan playa Cartagena | **Transaccional** |
| Ciudad amurallada | city tour Cartagena · tour ciudad amurallada · centro histórico Cartagena | **Transaccional** |
| San Felipe | Castillo San Felipe tour · fortaleza Cartagena | **Transaccional** |
| Getsemaní | tour Getsemaní · arte urbano Cartagena | **Transaccional** |
| Traslados | traslado aeropuerto Rafael Núñez · transporte privado Cartagena | **Transaccional** |
| Regional | qué hacer en Cartagena · tours Cartagena Colombia | Informacional |

### 3.4 Long tail — donde está la oportunidad real

Este sitio no va a ganar "tours Cartagena" contra las OTAs internacionales. **Sí puede ganar** consultas específicas donde la intención está madura:

- "tour Valle de Cocora desde Pereira con transporte"
- "traslado aeropuerto Matecaña a Salento precio"
- "tour Islas del Rosario con almuerzo incluido"
- "transporte privado Cartagena aeropuerto hotel"
- "tour privado Salento y Filandia día completo"

Estas consultas exigen exactamente lo que el spec 06 construye: **fichas de detalle con duración, punto de encuentro, incluye y no incluye**. La ficha de experiencia no es solo mejor UX; es la unidad de contenido que compite en long tail.

---

## 4. Mapa keyword → URL

Una intención principal por URL. Ninguna repetida.

> **Esta tabla es lo que el código emite, no una propuesta.** Se midió sobre el
> HTML servido por el servidor de desarrollo el 2026-08-11, no sobre las
> cadenas de este documento. Longitudes entre paréntesis. Ver §13.2.

| URL | Intención principal | `title` en el código | `description` en el código |
|---|---|---|---|
| `/` | Marca + grupo nacional | `Transporte y Turismo Medellín \| T&T Medellín` (44) | Grupo colombiano de transporte y turismo premium con sedes en Bogotá, Medellín, Eje Cafetero y Cartagena. Confianza, trayectoria y personas. (140) |
| `/historia` | Trayectoria de marca | `Nuestra historia \| T&T Medellín` (31) | De una camioneta en 2003 a un grupo nacional de transporte y turismo: hitos, misión y visión de T&T Medellín. (109) |
| `/equipo` | Confianza institucional | `Nuestro equipo \| T&T Medellín` (29) | Dirección, operaciones, conductores y atención al cliente: conoce a las personas detrás de cada viaje de T&T Medellín. (118) |
| `/valores` | Confianza + certificaciones | `Valores y compromiso \| T&T Medellín` (35) | Confianza, excelencia, seguridad y servicio: cómo vivimos nuestros valores en la operación diaria y nuestro compromiso con Medellín y Antioquia. (140) |
| `/servicios` | **Transporte corporativo Medellín** | `Transporte corporativo en Medellín \| T&T Medellín` (49) | Movilidad para empresas y organizaciones en Medellín y Antioquia: traslados ejecutivos, rutas de personal y transporte de eventos. (130) |
| `/sedes` | Cobertura nacional | `Nuestras sedes \| T&T Medellín` (29) | Bogotá, Medellín, Eje Cafetero y Cartagena: cuatro sedes con equipo propio y conocimiento profundo de cada región. (114) |
| **`/sedes/eje-cafetero`** | **Tours Eje Cafetero** | `Tours y traslados en Eje Cafetero \| T&T Medellín` (48) | Paisaje Cultural Cafetero declarado Patrimonio de la Humanidad. Operamos las experiencias del Eje directamente desde esta sede. (127) |
| **`/sedes/cartagena`** | **Tours Cartagena** | `Tours y traslados en Cartagena \| T&T Medellín` (45) | Caribe, historia y hospitalidad. Coordinamos desde esta sede los traslados y las experiencias en la ciudad y sus islas. (119) |
| `/contacto` | Contacto corporativo | `Contacto corporativo \| T&T Medellín` (35) | Escríbenos para consultas corporativas, propuestas de alianza y solicitudes institucionales en Colombia. (104) |
| `/privacidad` | Legal — Habeas Data | `Política de tratamiento de datos \| T&T Medellín` (47) | Cómo tratamos los datos personales que nos compartes, con qué finalidad, durante cuánto tiempo y cómo ejercer tus derechos. (123) |

### Fichas de experiencia

Patrón real, resuelto en `src/routes/sedes.$slug_.$experiencia.tsx`:
`{nombre de la experiencia} en {sede} | T&T Medellín`, con el nombre tomado de
`src/data/sedes.ts`. Si el resultado pasa de 60 caracteres, `tituloSeo()` deja
caer el contexto de sede antes que truncar.

| URL | `title` en el código | Long. |
|---|---|---|
| `/sedes/eje-cafetero/ruta-del-cafe` | `Ruta del Café en Eje Cafetero \| T&T Medellín` | 44 |
| `/sedes/eje-cafetero/valle-de-cocora` | `Valle de Cocora en Eje Cafetero \| T&T Medellín` | 46 |
| `/sedes/eje-cafetero/parque-del-cafe` | `Parque del Café en Eje Cafetero \| T&T Medellín` | 46 |
| `/sedes/eje-cafetero/salento-y-filandia` | `Pueblos Patrimonio: Salento y Filandia \| T&T Medellín` | 53 ← sin contexto de sede |
| `/sedes/cartagena/ciudad-amurallada` | `Ciudad Amurallada en Cartagena \| T&T Medellín` | 45 |
| `/sedes/cartagena/islas-del-rosario` | `Islas del Rosario en Cartagena \| T&T Medellín` | 45 |
| `/sedes/cartagena/getsemani` | `Getsemaní cultural en Cartagena \| T&T Medellín` | 46 |
| `/sedes/cartagena/castillo-san-felipe` | `Castillo San Felipe de Barajas en Cartagena \| T&T Medellín` | 58 |

**Límites:** `title` ≤ 60 caracteres · `description` ≤ 155. **Medidos sobre el
HTML servido en las 18 rutas: máximo 58 en `title` y 140 en `description`.**

Dos correcciones que salieron de medir en vez de proponer:

- `/` emitía `T&T Medellín | Transporte y turismo con más de 22 años de
  trayectoria`: **69 caracteres**, cortado por Google a media frase.
- `/sedes/eje-cafetero/salento-y-filandia` emitía `Pueblos Patrimonio: Salento
  y Filandia en Eje Cafetero | T&T Medellín`: **69 caracteres**. La ficha de
  Cartagena `castillo-san-felipe` se quedaba a dos caracteres del límite, así
  que el problema no era una cadena concreta sino la plantilla. De ahí
  `tituloSeo()` en `src/lib/seo.ts`, que degrada en dos pasos antes de truncar.

> **Divergencia consciente con las propuestas anteriores de esta tabla.** Los
> `title` de ficha que proponía este spec (`Tour Valle de Cocora desde Salento`,
> `City tour por la ciudad amurallada`) son títulos de marketing por experiencia
> y **no se pueden derivar** del nombre que hay en `src/data/sedes.ts`.
> Implementarlos exige un campo `tituloSeo?: L` en el tipo `Experiencia`, que
> vive en un archivo fuera del alcance de esta ronda. Queda propuesto: es la
> mejora de CTR más barata que le queda a la capa B, porque "tour", "desde
> {ciudad}" y "city tour" son justo las palabras del long tail de §3.4.

---

## 5. SEO técnico

### 5.1 Estado actual

**Lo que ya está bien** — es más de lo habitual en una generación automática:

- Las 8 rutas tienen `head()` con `title`, `description`, `og:title` y `og:description` propios.
- SSR real con TanStack Start: el contenido llega en el HTML.
- Un solo `<h1>` por página, aportado por `PageHero`.
- El 404 tiene diseño propio.
- `lang` del documento se actualiza al cambiar idioma.

**Estado tras UX-29** (2026-08-10) **y la ronda de cierre del spec** (2026-08-11):

| Elemento | Estado | Dónde |
|---|---|---|
| `canonical` | ✅ Hecho, por ruta y con params resueltos | `src/routes/__root.tsx` |
| `og:url` | ✅ Hecho, mismo valor que el canonical | `src/routes/__root.tsx` |
| `og:image` | ⚠️ Etiqueta puesta y **archivo servido**, pero es un marcador de posición generado, no diseño | `public/og/og-default-1200x630.png` |
| `og:site_name`, `og:locale` | ✅ Hecho | `src/routes/__root.tsx` |
| `robots` (meta) | ✅ `index, follow, max-image-preview:large` | `src/routes/__root.tsx` |
| `twitter:card`, `twitter:image` | ✅ Hecho | `src/routes/__root.tsx` |
| `twitter:title/description` | ⛔ **No se declaran a propósito** — ver §5.5 | — |
| `robots.txt` | ✅ Hecho, con línea `Sitemap:` | `public/robots.txt` |
| `sitemap.xml` | ✅ Hecho, **18 URLs** (se añadió `/privacidad`) | `public/sitemap.xml` |
| JSON-LD `Organization` + `WebSite` | ✅ Hecho, en `@graph` enlazado por `@id` | `src/routes/__root.tsx` |
| JSON-LD por ruta (`Service`, `TouristTrip`, `BreadcrumbList`, `ContactPage`…) | ✅ **Hecho el 2026-08-11** | Rutas hijas, §7.1 |
| `SITE_URL` compartido | ✅ **Hecho**, constante única para todo el código | `src/lib/seo.ts` |
| `/logo.png` referenciado por el JSON-LD | ✅ **Existe y responde 200**; era un 404 dentro de datos estructurados | `public/logo.png` |

#### Cómo se resuelve el canonical

El `head()` raíz recibe `matches`; la coincidencia más profunda ya trae el
`pathname` resuelto, con los params sustituidos. Eso permite emitir un canonical
correcto **para las 17 rutas desde un único sitio**, sin repetir la lógica en
cada archivo de ruta.

Dos salvaguardas deliberadas:

- Se normaliza sin barra final salvo en la raíz, para no generar dos formas de
  la misma URL.
- En un 404 no hay ruta hija que coincida, y **no se emite canonical**. Apuntar
  una URL inexistente hacia la home es exactamente cómo se desindexa un sitio
  por accidente. Verificado: `/no-existe` responde HTTP 404 real, no un soft 404.

#### `SITE_URL` — resuelto en el código, quedan dos archivos estáticos

**Estado anterior:** el dominio estaba escrito en `src/routes/__root.tsx`,
`public/robots.txt` y las `<loc>` del sitemap, y las rutas hijas que iban a
emitir JSON-LD lo habrían escrito una cuarta vez.

**Estado actual (2026-08-11).** Existe `src/lib/seo.ts` con la constante
`SITE_URL` y todo lo derivado de ella (`OG_IMAGE`, `LOGO`, `ORG_ID`,
`WEBSITE_ID`, `urlAbsoluta()`). La consumen `__root.tsx` y **las cinco rutas con
JSON-LD propio**. En el código el dominio aparece **una sola vez**.

`robots.txt` y `sitemap.xml` son archivos estáticos servidos desde `public/` y
no pueden importar TypeScript. No hay forma de que consuman la constante sin
generarlos en tiempo de build, que es un cambio de infraestructura
desproporcionado para un valor que se toca una vez en la vida del proyecto.

> **Dominio fijado el 2026-09-29: `https://www.transporteyturismomedellin.com`.**
> Si vuelve a cambiar hay que tocar exactamente 3 sitios (procedimiento
> completo en `15_spec_cambio_dominio.md`):
> 1. `SITE_URL` en `src/lib/seo.ts` — cubre todo el código.
> 2. La línea `Sitemap:` de `public/robots.txt`.
> 3. Las **47** etiquetas `<loc>` de `public/sitemap.xml`.
>
> Está anotado como comentario dentro de los tres archivos, para que quien abra
> cualquiera de ellos vea los otros dos.

### 5.2 `og:image` y `/logo.png` — marcadores de posición servidos

Se necesita una imagen 1200×630 **propia**, no de Unsplash: la previsualización al compartir en WhatsApp o LinkedIn es a menudo el primer contacto con la marca. Recomendable una por capa: una institucional para la capa A, y una por región para las páginas de venta.

**Hecho el 2026-08-11 — provisional, no definitivo.** Existían dos referencias
rotas: `og:image` apuntaba a un archivo inexistente y el `logo` del JSON-LD
`Organization` apuntaba a `/logo.png`, **que tampoco existía**. Lo segundo era
lo grave: un 404 dentro de datos estructurados, que es una señal peor que no
declarar el logo.

Se generaron dos marcadores de posición con los colores de marca —naranja
`#FF7F09` sobre `#3C3F3B`, tipografía de sistema— y el nombre de la empresa:

| Archivo | Tamaño | Uso |
|---|---|---|
| `public/og/og-default-1200x630.png` | 1200×630 | `og:image` y `twitter:image` |
| `public/logo.png` | 512×512 | `logo` del `Organization` |

Ambos verificados con HTTP 200 en el servidor de desarrollo.

**Por qué generarlos en vez de esperar al diseño.** Sin archivo, cada enlace
compartido muestra un hueco roto y el JSON-LD declara un recurso inexistente:
el coste de no tener nada es inmediato y visible, el de tener un marcador de
posición sobrio es cero. **No sustituye al diseño** y por eso la casilla de §13
sigue abierta: hay que reemplazarlos por la pieza real y añadir una `og:image`
por región para las páginas de venta, que es donde la previsualización decide
un clic.

### 5.3 `robots.txt` — ✅ hecho

Ya existía un `public/robots.txt`, pero **sin línea `Sitemap:`**, que es su
función más útil. Se reescribió.

También se eliminaron los bloques `User-agent: Googlebot` y `User-agent: Bingbot`
que solo repetían `Allow: /`. No eran neutros: un bloque específico hace que ese
rastreador **ignore por completo** el bloque `*`, así que duplicarlo es una
trampa esperando a que alguien añada una regla al `*` y no entienda por qué
Googlebot no la respeta. Se conservan `Twitterbot` y `facebookexternalhit`
porque son los rastreadores de previsualización social.

Nada que bloquear: no hay áreas privadas.

### 5.4 `sitemap.xml` — ✅ hecho

Estático en `public/sitemap.xml`. **18 URLs**: las 9 de navegación, las 8 fichas
de experiencia y `/privacidad`. Verificado el 2026-08-11: 18 `<loc>`, cero
duplicadas, cero malformadas, y **las 18 responden HTTP 200** en el servidor de
desarrollo (antes las fichas se listaban sin que la ruta existiera todavía).

| Grupo | `priority` |
|---|---|
| `/` | 1.0 |
| `/sedes/eje-cafetero`, `/sedes/cartagena` | 0.9 |
| Las 8 fichas de experiencia | 0.8 |
| `/servicios` | 0.7 |
| `/sedes`, `/contacto` | 0.6 |
| `/historia`, `/valores`, `/equipo` | 0.5 |
| `/privacidad` | 0.3 |

Decisiones y avisos:

- **No se incluyen `/sedes/bogota` ni `/sedes/medellin`.** Esas sedes tienen
  sitio propio y la ruta interna lanza `notFound()` a propósito
  (`src/routes/sedes.$slug.tsx`). Listarlas generaría errores de cobertura y
  canibalizaría a los sitios hermanos.
- **No se incluye `<changefreq>`.** No hay dato real de cadencia y Google lo
  ignora desde hace años. No se inventa.
- `<priority>` se mantiene porque este spec lo pide, pero conviene saber que
  Google también lo ignora. Su valor aquí es documental: deja por escrito qué
  páginas considera prioritarias el proyecto.
- ✅ **`/privacidad` — decidido el 2026-08-11: se lista**, con `priority` 0.3.
  Es contenido legal real, público e indexable, no un área privada, así que
  excluirla no protegía nada y dejaba una URL enlazada desde el pie sin
  declarar. La prioridad mínima refleja lo que es: una página que debe estar
  disponible, no posicionar.
- ✅ **El sitemap ya se puede enviar a Search Console** (dominio real desde el
  2026-09-29). Enviarlo sobre una propiedad de tipo **Dominio** para
  `transporteyturismomedellin.com`, después del deploy que lo publica.

### 5.5 Por qué no hay `twitter:title` ni `twitter:description`

Las tarjetas de X/Twitter usan `og:title` y `og:description` como respaldo
cuando no existe el `twitter:*` equivalente. Como **cada ruta ya define sus
propios `og:title` y `og:description`**, declarar en la raíz un `twitter:title`
genérico lo pisaría en las 17 páginas y dejaría la tarjeta peor que ahora:
todas compartirían el mismo titular. Por eso en la raíz solo se declara lo que
no tiene respaldo por ruta (`twitter:card`, `twitter:image`).

Si en el futuro alguna ruta quiere un titular distinto en redes, se añade
`twitter:title` **en esa ruta**, no en la raíz.

---

## 6. Internacionalización — problema conocido

**El toggle ES/EN no genera URLs.** Es un estado de cliente guardado en `localStorage`. Consecuencias reales:

1. Google indexa **solo la versión española**. La inglesa es invisible para buscadores.
2. No se puede declarar `hreflang`: no hay dos URLs que relacionar. Declararlo sería mentir.
3. Los `head()` están en español fijo — coherente con lo anterior, no un descuido.
4. Un usuario que comparta el enlace en inglés envía una URL que abrirá en español.

### Opciones

| Opción | Esfuerzo | Beneficio | Riesgo |
|---|---|---|---|
| **A** — Mantener solo ES indexable | Cero | Ninguno | Se pierde el mercado internacional de turismo receptivo |
| **B** — Rutas `/en/…` con `hreflang` recíproco | Alto: duplica el árbol de rutas | Indexación real en inglés | Mantenimiento doble, riesgo de contenido duplicado si se hace mal |
| **C** — Subdominio `en.` | Muy alto | Igual que B | Autoridad separada, peor para un sitio pequeño |

**Recomendación: A por ahora, B cuando el negocio internacional lo justifique.**

Motivo: el turismo receptivo internacional llega mayoritariamente por agencias y OTAs, no por búsqueda orgánica en inglés hacia un operador local. El esfuerzo de B rinde más invertido en el long tail español de la capa B, donde hay tráfico medible desde el primer día.

**Lo que no se debe hacer:** declarar `hreflang` sobre URLs que no existen, o traducir los `head()` según el estado de cliente. Ambas cosas confunden al buscador sin aportar nada.

---

## 7. Datos estructurados (JSON-LD)

Se inyectan con `scripts` en el `head()` de cada ruta.

### 7.1 Asignación — ✅ implementada el 2026-08-11

| Ruta | Tipo | Estado | Archivo |
|---|---|---|---|
| Todas | `Organization` + `WebSite` (heredado de la raíz) | ✅ | `src/routes/__root.tsx` |
| `/servicios` | `Service` × 3, uno por servicio de `src/data/content.ts` | ✅ | `src/routes/servicios.tsx` |
| `/sedes` | `BreadcrumbList` | ✅ | `src/routes/sedes.index.tsx` |
| `/sedes/{slug}` | `TouristInformationCenter` + `ItemList` + `BreadcrumbList` | ✅ parcial, ver §7.4 | `src/routes/sedes.$slug.tsx` |
| `/sedes/{slug}/{exp}` | `TouristTrip` + `BreadcrumbList` | ✅ | `src/routes/sedes.$slug_.$experiencia.tsx` |
| `/contacto` | `ContactPage` | ✅ | `src/routes/contacto.tsx` |
| FAQ, si se añade | `FAQPage` | ☐ no implementado, ver abajo | — |

Convenciones aplicadas, las mismas que ya usaba la raíz:

- **Un solo bloque `application/ld+json` por ruta**, con los nodos dentro de un
  `@graph`. Los nodos se enlazan por `@id` al `Organization` de la raíz en vez
  de repetir sus datos; los helpers (`grafo`, `jsonLd`, `breadcrumbList`,
  `urlAbsoluta`) viven en `src/lib/seo.ts`.
- **Migas desde el nivel 2**, como pide §8: `Inicio → Sedes → {sede} →
  {experiencia}`.
- Todo `@id` es una URL absoluta con fragmento (`…/sedes/cartagena#sede`), así
  que seguirá siendo único cuando se fije el dominio real.
- El JSON-LD se emite **solo si el dato existe**: en una ruta de sede o
  experiencia inválida, `scripts` es un array vacío en lugar de un nodo con
  `undefined` dentro.

#### Dos añadidos sobre lo que pedía el spec

- **`ItemList` en `/sedes/{slug}`** con las fichas publicadas de esa sede. No
  estaba pedido, pero la página *es* un catálogo y la lista es dato verificable
  tomado de `src/data/sedes.ts`. Refuerza el descubrimiento de las 8 fichas, que
  son la unidad de long tail de §3.4.
- **`ContactPage` sin `ContactPoint`.** Ver §7.5.

#### Por qué no hay `FAQPage`

`/contacto` y `/sedes/{slug}` **sí tienen** un acordeón de preguntas frecuentes
(`faqCorporativa` y `faqViajero` en `src/data/content.ts`), así que el marcado
sería legítimo. No se emite por una razón de retorno: desde 2023 Google
**restringe el resultado enriquecido de `FAQPage` a sitios de administraciones
públicas y de salud**. Para el resto solo añade peso al HTML sin ganar nada
visible. Se deja anotado por si la política cambia.

### 7.2 `Organization` — raíz

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Transporte y Turismo Medellín",
  "alternateName": "T&T Medellín",
  "url": "https://{dominio}",
  "logo": "https://{dominio}/logo.png",
  "foundingDate": "2003",
  "areaServed": { "@type": "City", "name": "Medellín", "containedInPlace": { "@type": "AdministrativeArea", "name": "Antioquia" } },
  "sameAs": [
    "// TODO(cliente): redes sociales de la sede Medellín"
  ]
}
```

> **`taxID` deliberadamente ausente.** Depende de la **decisión #1**: si no hay NIT único nacional, declarar el de una sede en el `Organization` del grupo es incorrecto y potencialmente engañoso. Los NIT van en el `LocalBusiness` de cada sede.

**✅ Implementado en UX-29** (`src/routes/__root.tsx`), con dos ajustes sobre el
JSON de arriba:

- `Organization` y `WebSite` van en un `@graph` y se enlazan por `@id`
  (`#organization` / `#website`), en lugar de dos bloques sueltos que se
  repitieran los datos. Es lo que esperan los validadores.
- `WebSite` **no declara `potentialAction`/`SearchAction`**: el sitio no tiene
  buscador interno. Declararlo describiría una función inexistente.
- `logo` apunta a `/logo.png`. **Era un 404** —un recurso inexistente declarado
  dentro de datos estructurados— hasta el 2026-08-11; ahora el archivo existe y
  responde 200, aunque sigue siendo provisional (§5.2).
- Desde el 2026-08-11 este bloque se construye con los helpers `grafo()` y
  `jsonLd()` de `src/lib/seo.ts`, los mismos que usan las rutas hijas, y el
  dominio ya no está escrito aquí sino en la constante `SITE_URL`.

Verificado en el HTML servido de `/`, `/valores`, `/sedes/eje-cafetero` y
`/sedes/eje-cafetero/valle-de-cocora`: el `@graph` llega con `Organization +
WebSite` y **sin `taxID`** en las cuatro.

### 7.3 `TouristTrip` — ficha de experiencia

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Tour Valle de Cocora",
  "description": "Caminata entre palmas de cera…",
  "touristType": ["Familias", "Parejas", "Grupos corporativos"],
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "TouristAttraction", "name": "Valle de Cocora" } }
    ]
  },
  "provider": { "@type": "Organization", "name": "Transporte y Turismo Medellín" }
}
```

**Sin `offers` mientras no haya tarifario aprobado.** Declarar un precio en JSON-LD que no coincide con el de la página es motivo de acción manual de Google.

**✅ Implementado el 2026-08-11** en `src/routes/sedes.$slug_.$experiencia.tsx`,
con dos diferencias respecto al JSON de arriba, ambas por la regla de no
inventar:

- **Sin `offers`**, como manda este mismo apartado.
- **Sin `touristType`.** El ejemplo declara `["Familias", "Parejas", "Grupos
  corporativos"]`, pero ese dato **no existe** en `src/data/sedes.ts`. Copiarlo
  del ejemplo del spec habría sido inventarlo. Se emite cuando el cliente
  confirme el perfil de viajero de cada experiencia.
- `image` sí se emite: se pasa la galería completa cuando existe, y la imagen
  principal cuando no. Google prefiere varias imágenes por elemento.
- El `itinerary` lleva un único `TouristAttraction` con el nombre de la
  experiencia, que es el destino real de la salida. **No se usan los
  `highlights`** para poblarlo: "Cata guiada por barista" o "Almuerzo típico
  quindiano" son inclusiones del servicio, no atracciones turísticas, y
  declararlas como `TouristAttraction` sería marcado incorrecto.

### 7.4 `LocalBusiness` por sede — 🔒 decisión #1, parcialmente desbloqueado

Requiere NAP definitivo: nombre, dirección y teléfono de cada sede. Sin la decisión #1 no se puede cerrar. **Se deja marcado, no se inventa.**

**Qué se emitió el 2026-08-11 y qué no.** Se implementó un
`TouristInformationCenter` por sede propia con **solo los campos que constan
como ciertos** en `src/data/sedes.ts`:

| Campo | Estado | Motivo |
|---|---|---|
| `name`, `description`, `url`, `image` | ✅ emitidos | Datos reales del repo |
| `areaServed` (`Place` con la ciudad) | ✅ emitido | `sede.city` es dato real |
| `parentOrganization` → `@id` de la raíz | ✅ emitido | Enlaza la sede al grupo |
| `address` | ⛔ **omitido** | 🔒 Los tipos `ContactoSede` y `LegalSede` existen en `src/data/sedes.ts`, pero **ninguna sede los tiene poblados**. Decisión #1 |
| `telephone` | ⛔ **omitido** | Lo mismo. El número de `ui.contactInfo` es un placeholder inventado (CLAUDE1.MD §7) |
| `taxID` / NIT / RNT | ⛔ **omitido** | Decisión #1 |
| `openingHoursSpecification` | ⛔ **omitido** | No hay horario por sede confirmado |

> Un `LocalBusiness` sin `address` es **schema válido**: no obtendrá resultado
> enriquecido de negocio local, pero describe correctamente lo que se sabe. Uno
> con una dirección inventada no es un problema de SEO, es un problema legal y
> además envenena el NAP de §10 el día que se cree la ficha de Google Business
> Profile. La casilla de §13 sigue ☐ a propósito.
>
> **Cuando llegue la decisión #1** el cambio es de unas pocas líneas: poblar
> `sede.contacto` y `sede.legal` en `src/data/sedes.ts` y añadir aquí los campos
> leyéndolos de ahí. El nodo ya está montado y enlazado.

### 7.5 `ContactPage` sin `ContactPoint` — deliberado

`/contacto` emite un nodo `ContactPage` enlazado por `@id` al `WebSite` y al
`Organization`, y **nada más**. No lleva `ContactPoint`, ni `telephone`, ni
`email`, ni `address`.

Motivo: los valores de `ui.contactInfo` —dirección en la Calle 100, teléfono
`+57 601 742 1180`, correo `corporativo@ttmedellin.com`— son **placeholders
inventados por la generación inicial**, documentados como tales en CLAUDE1.MD
§7. Que estén visibles en la página ya es una deuda pendiente; meterlos además
en datos estructurados los convertiría en la fuente que Google propaga a su
grafo de entidades y a los directorios. Un teléfono ficticio en JSON-LD es
mucho más difícil de retirar que uno en HTML.

---

## 8. Enlazado interno

| Regla | Motivo |
|---|---|
| Anchors descriptivos | "Ver experiencias del Eje Cafetero", no "Ver más" |
| Cada página de venta recibe ≥ 3 enlaces internos | Menú, `/sedes`, preview del home |
| Breadcrumbs desde el nivel 2 | Refuerzan la jerarquía para el crawler |
| Ninguna página huérfana | Toda ruta alcanzable navegando |
| Enlaces salientes a Bogotá y Medellín | Legítimos y necesarios. No llevan el peso visual primario (UX-02). `rel` estándar: son sitios de la misma empresa, no publicidad |

**Corrección de UX-02 también es SEO.** Dar el botón primario a la acción que saca al usuario del dominio reduce el tiempo de permanencia y la profundidad de sesión.

---

## 9. Contenido

| Página | Mínimo recomendado |
|---|---|
| Home | 400 palabras visibles |
| Páginas corporativas | 500 palabras |
| Página de venta de sede | **700 palabras** |
| Ficha de experiencia | **400 palabras** |

La ficha de experiencia es la unidad que compite en long tail: necesita cuerpo real, no tres viñetas.

### Reglas

- La palabra clave principal aparece **una vez** en `title`, una en `h1` y una en el primer párrafo. **Nada más.**
- Encabezados que describen la sección, no que repiten la keyword.
- `alt` descriptivo real, sin keyword stuffing.
- Contenido único por página: nada duplicado entre sedes ni copiado del sitio de Bogotá.

---

## 10. SEO local — 🔒 decisión #1

Cuatro ciudades, cuatro fichas de Google Business Profile potenciales. Es el canal de mayor retorno para un negocio con presencia física.

Requisitos:

1. **NAP consistente** entre web, GBP y directorios. Una sola letra de diferencia en la dirección debilita la señal.
2. Categoría correcta por sede: "Servicio de transporte turístico" / "Operador turístico".
3. La ficha de cada sede en la web debe coincidir exactamente con su GBP.
4. Reseñas: el sitio de Bogotá ya tiene reseñas reales de Google. Es un activo que este sitio puede referenciar.

**Bloqueado por la decisión #1**: sin saber qué datos legales y de dirección se publican por sede, el NAP no se puede fijar.

---

## 11. Core Web Vitals

Son factor de ranking confirmado. Los problemas detectados (imágenes a `w=2940`, hero sin prioridad, parpadeo de hidratación) se derivan a [`09_spec_rendimiento.md`](09_spec_rendimiento.md). No se resuelven aquí, pero se vigilan desde aquí.

---

## 12. Medición

Detalle en [`11_spec_analitica_medicion.md`](11_spec_analitica_medicion.md).

| Herramienta | Para qué | Cadencia |
|---|---|---|
| Search Console | Impresiones, CTR, posición, cobertura | Semanal |
| GA4 | Sesiones orgánicas, conversiones por capa | Semanal |
| Rich Results Test | Validación de JSON-LD | Cada despliegue |
| PageSpeed Insights | Core Web Vitals de campo | Mensual |

**Segmentar siempre capa A y capa B por separado.** Mezclarlas oculta el comportamiento de ambas: el volumen de la B tapa la calidad de la A.

---

## 13. Compuerta hacia el spec 09

Nada se marca por estar escrito.

| | Punto | Cómo se rectifica |
|---|---|---|
| ☐ | Volúmenes de búsqueda validados con herramienta real | Search Console / Keyword Planner. **Hoy son estimaciones cualitativas.** No hay herramienta disponible en este entorno y no se inventan cifras |
| ☑ | **Ninguna URL duplica intención con otra** | Revisado el mapa §4 contra las 18 rutas reales. El único solape era `/servicios` con `title` genérico `Servicios`; ahora reclama la intención corporativa nacional. Ver §2.1 |
| ☑ | **Ninguna consulta canibaliza el sitio de Bogotá** | Leído el copy real de `/` y `/servicios`. El home no contenía el texto denunciado; sí `servicios[1].bullets[0]`, corregido en ES y EN. Ver §2.1 |
| ☑ | **`title` ≤ 60 y `description` ≤ 155 medidos** | Medidos **sobre el HTML servido** en las 18 rutas, no sobre las propuestas. Máximo 58 y 140. Dos títulos de 69 corregidos. Ver §4 y §13.2 |
| ☑ | **Metadatos presentes en el HTML servido, no solo tras hidratar** | Verificado con `curl` sobre el build de producción en 5 rutas (§13.1) y con `fetch` sobre las 18 en §13.2 |
| ☑ | **Un `<h1>` por página en ejecución** | `document.querySelectorAll('h1').length === 1` en las 9 rutas de navegación, `/privacidad` y una ficha de experiencia, **tras hidratar**. Los dos `<h1>` de `__root.tsx` (404 y error boundary) no aparecen en páginas normales. Ver §13.2 |
| ☐ | JSON-LD validado en el Rich Results Test | **Bloqueado**: el validador necesita una URL pública y el dominio aún es un marcador de posición. El JSON-LD se parsea sin error con `JSON.parse` en las 18 rutas, pero eso no sustituye al Rich Results Test |
| ☐ | Decisión de internacionalización tomada (A, B o C) | Consulta al cliente. Sin `hreflang` en el código, coherente con la opción A |
| ☐ | `LocalBusiness` desbloqueado | 🔒 Decisión #1. El nodo `TouristInformationCenter` ya se emite por sede, pero **sin `address`, `telephone` ni `taxID`**: esos datos no existen en el repo. Ver §7.4 |
| ☐ | `og:image` propia disponible | **Hay un marcador de posición servido** (`public/og/og-default-1200x630.png`, colores de marca, HTTP 200). Sigue ☐ porque **no es diseño**: falta la pieza real y una `og:image` por región para las páginas de venta. Ver §5.2 |
| ☐ | Slugs de experiencia aprobados | Son permanentes: aprobar antes de publicar. Ya están fijados en el sitemap y ahora también en los `@id` del JSON-LD |
| ☑ | **`robots.txt` con referencia al sitemap** | `public/robots.txt`, servido con HTTP 200 |
| ☑ | **`sitemap.xml` con las 18 URLs** | 18 `<loc>`, 0 duplicadas, 0 malformadas, sin bogota/medellin, `/privacidad` incluida, **y las 18 responden HTTP 200** |
| ☑ | **`canonical` y `og:url` por ruta** | Presentes y con los params resueltos en las **18** rutas; ausentes en el 404 a propósito (verificado: `/no-existe` → HTTP 404 sin canonical) |
| ☑ | **JSON-LD `Organization` + `WebSite` en la raíz** | Presente en el HTML servido de las 18 rutas, sin `taxID` |
| ☑ | **JSON-LD por ruta (`Service`, `TouristTrip`, `BreadcrumbList`, `ContactPage`)** | §7.1. Implementado el 2026-08-11 y verificado parseando cada bloque en el HTML servido. Ver §13.2 |
| ☑ | **`SITE_URL` deja de estar triplicado en el código** | `src/lib/seo.ts`. Una sola constante consumida por `__root.tsx` y las 5 rutas con JSON-LD. Quedan 2 archivos estáticos, por diseño. Ver §5.1 |
| ☑ | **`/logo.png` existe** | Era un 404 referenciado desde el `Organization`. Ahora responde 200. El archivo es provisional (§5.2) |
| ☐ | **🔴 Dominio real sustituido en los 3 sitios** | `src/lib/seo.ts`, `robots.txt` y las 18 `<loc>`. **Hasta entonces nada de esto funciona en producción** |

### 13.1 Cómo se verificó UX-29

Build de producción con preset `node-server`, servido y consultado con `curl`
sobre `/`, `/valores`, `/sedes/eje-cafetero`,
`/sedes/eje-cafetero/valle-de-cocora` y una ruta inexistente. Se comprobó en el
HTML **servido**, antes de hidratar:

- `canonical` y `og:url` correctos y distintos en cada ruta, con los params
  sustituidos en la ficha de experiencia.
- Ninguna etiqueta `hreflang` (correcto: no hay URLs por idioma).
- `Organization + WebSite` en el `@graph`, sin `taxID`.
- `/no-existe` responde **HTTP 404 real**, sin canonical.
- `/robots.txt` y `/sitemap.xml` responden 200.

> ⚠️ **`npm run preview:node` está roto en Windows.** En
> `scripts/preview-node.mjs:41` se pasa `process.execPath`
> (`C:\Program Files\nodejs\node.exe`) con `shell: true` y sin comillas, así que
> el paso de servir muere con *"C:\Program no se reconoce como un comando"*. El
> build sí se completa, y si hay otro servidor escuchando en el puerto 4180 se
> obtienen respuestas **de un build antiguo** sin darse cuenta — que es
> exactamente lo que pasó en la primera verificación de esta historia. Quien
> ejecute la compuerta desde Windows debe saberlo. No se corrigió aquí por estar
> fuera del alcance de archivos de UX-29.

### 13.2 Cómo se verificó la ronda del 2026-08-11

Contra el servidor de desarrollo en `http://localhost:8082`, sobre las **18
rutas reales más una inexistente**. Todo lo que se marcó ☑ arriba sale de esta
ejecución, no de leer el JSX.

**1 · Metadatos y JSON-LD en el HTML servido.** Script de Node con `fetch`,
sobre la respuesta HTTP cruda, antes de hidratar. Por cada ruta se extrajo
`<title>`, `meta[name=description]`, `link[rel=canonical]`, `og:url`, número de
`<h1>` y **cada bloque `<script type="application/ld+json">`, que se pasó por
`JSON.parse`**. Un JSON-LD malformado es peor que ninguno, así que la validación
sintáctica no era opcional. Resultado:

- 18/18 con `title` ≤ 60 (máx. 58) y `description` ≤ 155 (máx. 140).
- 18/18 con `canonical` y `og:url`. `/no-existe` → HTTP 404 real, sin canonical.
- 18/18 con JSON-LD que parsea sin error. Tipos por ruta:
  `/servicios` → `Service ×3`; `/sedes` → `BreadcrumbList`; `/sedes/{slug}` →
  `TouristInformationCenter + ItemList + BreadcrumbList`; `/sedes/{slug}/{exp}`
  → `TouristTrip + BreadcrumbList`; `/contacto` → `ContactPage`. Todas heredan
  `Organization + WebSite` de la raíz.

**2 · Un `<h1>` por página en ejecución.** Chrome del sistema en modo headless
con `--dump-dom` y `--virtual-time-budget=6000`, es decir **el DOM después de
que corra React**, no el HTML servido. Instancia propia con su perfil aparte
para no interferir con el navegador compartido de otro trabajo en curso. Las 11
rutas medidas —las 9 de navegación, `/privacidad` y
`/sedes/eje-cafetero/valle-de-cocora`— dan exactamente `h1=1`. Los dos `<h1>`
que declara `__root.tsx` (el "404" y el del error boundary) **no aparecen en
ninguna página normal**; el del 404 solo sale en `/no-existe`, que es su sitio.

**3 · Sitemap y robots.** Las 18 `<loc>` del sitemap se recorrieron una por una
contra el servidor: **las 18 responden HTTP 200**. Cero duplicadas, cero
`/sedes/bogota` ni `/sedes/medellin`. `robots.txt` responde 200 y conserva la
línea `Sitemap:`.

**4 · Assets.** `/logo.png` y `/og/og-default-1200x630.png` responden 200.

**5 · Compilación.** `npx tsc --noEmit` sin errores. `npx eslint src/ --fix`
con 0 errores; los 8 avisos restantes son `react-refresh/only-export-components`
preexistentes en `src/components/ui/**` y `src/i18n`, ajenos a esta ronda.

> ⚠️ La verificación se hizo contra el **servidor de desarrollo**, no contra un
> build de producción, por la avería de `npm run preview:node` en Windows que
> documenta §13.1. Para metadatos y JSON-LD la diferencia es nula —los emite el
> mismo `head()` de TanStack Router en ambos modos— pero conviene repetir el
> paso 1 sobre el build antes de publicar.

---

**Estado de la compuerta: CERRADA.**

Esta ronda cierra **todo el bloque implementable**: JSON-LD por ruta,
`SITE_URL` unificado, `/privacidad` en el sitemap, longitudes de `title` y
`description` medidas y corregidas sobre el código real, `<h1>` verificado en
ejecución, revisión de canibalización con corrección de copy bilingüe, y las
dos referencias rotas de imagen (`og:image` y `/logo.png`) convertidas en
archivos servidos.

La compuerta hacia el spec 09 sigue cerrada por **cinco motivos, ninguno
resoluble desde el código**:

1. Los **volúmenes de búsqueda** siguen sin validar: no hay herramienta.
2. La **decisión de internacionalización** (A, B o C) sigue sin tomar.
3. El **dominio de producción** sigue sin definirse, lo que deja todas las URLs
   absolutas —canonical, `og:url`, sitemap y **todos los `@id` del JSON-LD**—
   apuntando a un marcador de posición.
4. El **Rich Results Test** necesita una URL pública, que depende de (3).
5. La **decisión #1** mantiene el `LocalBusiness` sin NAP.

Los puntos 3 y 4 son el mismo bloqueo: **el dominio es hoy la única dependencia
que separa este spec de estar completo por la parte técnica.**
