# ARCHIVADO — Spec 06 anterior, no vigente

> ## ✅ IMPLEMENTADO — 2026-08-10
>
> El embudo de venta pasó de no existir a estar completo. Antes: 4 experiencias no clicables, 0 enlaces comerciales en toda la página. Ahora:
>
> | Historia | Entregado |
> |---|---|
> | **UX-06** · WhatsApp | `src/components/WhatsAppFAB.tsx` — fijo en todas las rutas, **mensaje contextual** (genérico en capa A, con el nombre de la región en `/sedes/{slug}`), 56×56 px, verde tokenizado, `safe-area-inset`, `main` con `pb-24` para no tapar el footer |
> | **UX-07** · Modelo de datos | `Experiencia` ampliada con `slug`, `descripcionAmpliada`, `incluye`, `noIncluye`, `puntoEncuentro`, `horario`, `capacidad`, `recomendaciones`, `galeria`. `Sede` con `intro`, `confianza`, `contacto`, `legal`. Todo **opcional**: las 8 experiencias existentes siguen compilando |
> | **UX-08** · Ficha de detalle | Ruta nueva `/sedes/{slug}/{experiencia}` con breadcrumb, panel operativo lateral, **incluye / no incluye lado a lado**, galería y doble CTA. Los campos ausentes **no se renderizan vacíos** |
> | **UX-09** · Cotización | `src/lib/whatsapp.ts` con `enlaceWhatsApp()`, `mensajeCotizacion()`, `mensajeSede()`. Siempre `encodeURIComponent`. CTA en cada card y en cada ficha |
> | **UX-10** · Página de venta | `/sedes/{slug}` rehecha: intro → catálogo → confianza local → a medida → volver. El `h2` del catálogo ya es un **título real**, no `ui.cta.verExperiencias` |
> | **UX-12** · A medida | Bloque de cierre con doble vía: WhatsApp y formulario |
>
> **Slugs publicados** (permanentes): `ruta-del-cafe`, `valle-de-cocora`, `parque-del-cafe`, `salento-y-filandia`, `ciudad-amurallada`, `islas-del-rosario`, `getsemani`, `castillo-san-felipe`.
>
> **Reserva declarada:** el WhatsApp por sede depende de la **decisión #2**. Mientras tanto se usa el número nacional con `TODO(cliente)` en los tres puntos donde aplica. **No se inventó ningún número.**
>
> **No implementado:** UX-37 (paquete de tours), bloqueado por la **decisión #5**.

**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `especialista-conversion`
**Depende de:** [`03_spec_arquitectura_informacion.md`](03_spec_arquitectura_informacion.md) · [`04_spec_design_system.md`](04_spec_design_system.md) · [`05_spec_contenido_copy.md`](05_spec_contenido_copy.md)
**Habilita:** 07 Accesibilidad · 08 SEO · 11 Analítica

> ### Segunda ronda — ficha al estilo del sitio de Bogotá (2026-08-10)
>
> A petición del cliente, la ficha de experiencia se rediseñó con la estructura del sitio de Bogotá, verificada en producción sobre `/experiencias/traslado-aeropuerto`:
>
> | Sección | Bogotá | Aquí |
> |---|---|---|
> | Hero a sangre con título encima | ✓ | ✓ con degradado en vez de velo plano: la foto se ve arriba y el texto es legible abajo |
> | Badges de contexto | "Disponible 24 horas · Bogotá" | duración + región |
> | Franja de datos operativos | Horario · Disponibilidad · Salida desde | + Capacidad |
> | Descripción "Sobre esta experiencia" | ✓ | ✓ con incluye / no incluye |
> | Carrusel de galería | ✓ | ✓ con `embla`, **oculto si no hay fotos reales** |
> | Bloque WhatsApp | ✓ | ✓ |
> | Cierre "¿Te convenciste?" | ✓ | ✓ |
> | Redes en header y footer | ✓ | ✓ mismas posiciones |
>
> **Corrección de enrutamiento.** `sedes.$slug.tsx` era padre de `sedes.$slug.$experiencia.tsx`, así que la ficha devolvía 200 pero **renderizaba la página de sede**: el padre no tiene `<Outlet />`. Se resolvió con el sufijo `_` de TanStack — `sedes.$slug_.$experiencia.tsx` — que desacopla la hija del layout del padre. Verificado: las 4 rutas correctas dan 200; `/sedes/bogota` y `/sedes/cartagena/no-existe` siguen dando 404.
>
> **Transiciones.** Se midieron las curvas reales de las referencias del cliente: `cubic-bezier(0.33, 1, 0.68, 1)` a 0.4 s en jobyaviation.com y `cubic-bezier(0.785, 0.135, 0.15, 0.86)` a 0.65 s en kudanil.com. Ambos las consiguen con **GSAP + Lenis**, que juntas pesan más que todo el bundle actual (157 KB gzip). Se replicó el carácter con tokens CSS y un `IntersectionObserver` de unas líneas (`src/components/Reveal.tsx`), respetando `prefers-reduced-motion`. **No se instaló ninguna librería de animación.**
>
> **Verificado:** 40/40 sin desborde en 5 rutas × 8 anchos; un solo `<h1>`; 5 CTA de WhatsApp por ficha; 3 iconos de redes en header y 3 en footer.



---

## 1. Por qué este spec existe

Bogotá y Medellín tienen sitio propio. **Eje Cafetero y Cartagena no.** Su operación comercial depende enteramente de dos rutas de este repositorio:

```
/sedes/eje-cafetero
/sedes/cartagena
```

Hoy esas rutas son un hero, un grid de cuatro tarjetas y dos botones al pie. **No hay ficha de detalle, no hay cotización, no hay WhatsApp, no hay forma de comprar.** Es la brecha más costosa del proyecto: ahí llega el tráfico de intención comercial y no encuentra por dónde avanzar.

Este spec convierte esas dos páginas en un canal de venta real, con el nivel de detalle del sitio de Bogotá y la identidad visual de este.

---

## 2. Frontera de responsabilidad

| Zona | ¿Se vende? | Quién manda |
|---|---|---|
| `/`, `/historia`, `/equipo`, `/valores`, `/servicios`, `/contacto` | **No** | Capa A — spec 05 |
| `/sedes` | Reparte | Spec 03 |
| **`/sedes/eje-cafetero`**, **`/sedes/cartagena`** | **Sí** | **Este spec** |
| `/sedes/{slug}/{experiencia}` | **Sí** | **Este spec** |
| Bogotá y Medellín | Fuera del dominio | Sus propios sitios |

**Regla dura:** ningún CTA de reserva, precio ni cotización aparece fuera de la capa B. Si parece que el home mejoraría con un botón de reservar, la respuesta es no: rompe el posicionamiento institucional del grupo, que es la razón de existir de este sitio.

---

## 3. Diagnóstico del embudo actual

### Medición en ejecución — 2026-08-10

Verificado sobre `/sedes/eje-cafetero` corriendo, viewport 390×844:

| Medición | Resultado |
|---|---|
| `<h1>` | "Eje Cafetero" — 1 solo, correcto |
| Título del catálogo (`h2`) | **"Ver experiencias"** — confirmado: es una etiqueta de botón usada como encabezado |
| Experiencias visibles | 4 |
| Experiencias **clicables** | **0** |
| Enlaces a ficha de detalle | **0** |
| Enlaces `wa.me` | **0** |
| Menciones de "cotizar" | **0** |
| Menciones de precio | 0 (correcto: no hay tarifario) |
| **Todos los enlaces de la página** | `/`, `/historia`, `/equipo`, `/valores`, `/sedes`, `/servicios`, `/contacto` |

**La última fila es el hallazgo.** Los únicos enlaces de la página de venta son los siete del menú de navegación. No existe **ni una sola salida comercial**: el usuario que llega con intención de comprar solo puede irse a leer la historia de la empresa.

En el home: **0 enlaces `wa.me` y 0 elementos con `position: fixed`** — confirmado que no hay FAB de WhatsApp en ninguna parte del sitio.

El diagnóstico que sigue queda así **confirmado en su totalidad**.



```
Búsqueda transaccional: "tour valle de cocora desde pereira"
   │
   ▼
/sedes/eje-cafetero
   │
   ├─ Hero de la región                             ✓ existe
   ├─ Grid de 4 ExperienceCard                      ✓ existe
   │    └─ nombre, duración, descripción, 3 destacados
   │
   ├─ ¿Cómo sé el horario y el punto de encuentro?  ✗ NO EXISTE
   ├─ ¿Qué incluye y qué no incluye?                ✗ NO EXISTE
   ├─ ¿Cómo cotizo esta experiencia?                ✗ NO EXISTE
   ├─ ¿WhatsApp?                                    ✗ NO EXISTE
   ├─ ¿Puedo pedir varias juntas?                   ✗ NO EXISTE
   │
   ▼
Botón "Hablemos" → /contacto genérico
   que no sabe qué experiencia estaba mirando       ✗ SE PIERDE LA INTENCIÓN
```

Problemas adicionales de detalle:

- El `SectionHeading` del catálogo usa `t(ui.cta.verExperiencias)` — "Ver experiencias" — **como título**. Es una etiqueta de botón puesta de encabezado, cuando el usuario ya está viéndolas.
- La `ExperienceCard` no es clicable en su conjunto ni tiene CTA propio: es informativa y termina en sí misma.
- No hay señales de confianza locales ni testimonios de la región.

---

## 4. Modelo de datos

### 4.1 Ampliación de `Experiencia` — UX-07

Todos los campos nuevos son **opcionales**, para no romper las 8 experiencias ya cargadas.

```ts
export type Experiencia = {
  // — existente, sin cambios —
  name: L;
  description: L;
  image: string;
  duration: L;
  highlights: L[];

  // — nuevo —
  slug?: string;                        // habilita /sedes/{sede}/{slug}
  descripcionAmpliada?: L;              // 2–3 párrafos para la ficha
  incluye?: L[];
  noIncluye?: L[];
  puntoEncuentro?: L;
  horario?: L;                          // "8:00 a.m. – 6:00 p.m."
  capacidad?: { min: number; max: number };
  recomendaciones?: L[];                // qué llevar, condición física
  galeria?: string[];
};
```

### 4.2 Contacto por sede — depende de la decisión #2

```ts
contacto?: {
  direccion: L;
  telefono: string;
  whatsapp: string;    // solo dígitos con indicativo: "573148566142"
  email: string;
  horario: L;
};
```

**Sin este dato, el módulo de venta no puede cerrar el círculo.** Es la dependencia externa más crítica de todo el proyecto.

Mientras no exista:

```ts
// TODO(cliente): WhatsApp propio de la sede Eje Cafetero. Decisión #2.
// Hasta tenerlo, el CTA usa el número nacional. NO inventar números.
```

### 4.3 Helpers

```ts
export const getExperiencia = (sedeSlug: string, expSlug: string) =>
  getSede(sedeSlug)?.experiencias.find((e) => e.slug === expSlug);

export const sedesPropias = () => sedes.filter((s) => !s.tieneSitioPropio);
```

---

## 5. Página de sede — `/sedes/{slug}`

### 5.1 Estructura — UX-10

| # | Sección | Propósito | Tono |
|---|---|---|---|
| 1 | Hero de la región | Ubicar y prometer | `PageHero`, único `h1` |
| 2 | Intro de sede | Qué se opera, desde dónde, con quién | Cálido, concreto |
| 3 | **Catálogo de experiencias** | El producto | Operativo |
| 4 | Confianza local | Años operando, guías de la región, certificaciones | Factual |
| 5 | Crea tu experiencia personalizada | Salida para quien no encuentra lo suyo | Abierto |
| 6 | Testimonios de la región | Prueba social **de viajeros**, no corporativa | Testimonial |
| 7 | Contacto de sede + CTA | Cerrar | Directo |

### 5.2 Reglas

1. El título del catálogo es un **título real**, no `ui.cta.verExperiencias`.
2. Cada `ExperienceCard` enlaza a su ficha de detalle.
3. **Un solo CTA primario** por pantalla: el de cotización.
4. Sin precios mientras no haya tarifario aprobado. El CTA dice "cotizar", no deja el vacío sin explicar.
5. Los testimonios son de viajeros de esa región; los corporativos se quedan en el home.
6. La franja de confianza usa datos reales o `TODO(cliente)`. **Nada inventado.**

---

## 6. Ficha de experiencia — `/sedes/{slug}/{experiencia}` · UX-08

### 6.1 Estructura

```
1. Breadcrumb            Sedes › Cartagena › Islas del Rosario
2. Hero                  imagen + nombre (h1) + duración
3. Descripción ampliada  qué se hace · por qué vale la pena · cómo se desarrolla el día
4. Datos operativos      duración · horario · punto de encuentro · capacidad
5. Incluye / No incluye  lado a lado en escritorio · apilado en móvil
6. Destacados            los highlights existentes
7. Recomendaciones       qué llevar, condición física
8. Galería               diferida, bajo el pliegue
9. CTA de cotización + volver al catálogo
```

### 6.2 Comportamiento

- `loader` que lanza `notFound()` si la sede no existe, si `tieneSitioPropio` es `true`, o si el slug de experiencia no existe.
- `head()` propio con `title`, `description` y `og:*` únicos (spec 08).
- Un solo `<h1>`, aportado por `PageHero`.
- **Los campos opcionales ausentes no se renderizan.** Nada de "Punto de encuentro: —" ni etiquetas huérfanas.

### 6.3 Por qué `noIncluye` es tan importante como `incluye`

En turismo, la mayoría de las reclamaciones nacen de lo que el cliente **asumió** que estaba incluido. Declararlo por adelantado parece contraproducente y no lo es: transmite honestidad, reduce fricción postventa y filtra consultas de baja calidad. Es información que convierte.

---

## 7. Cotización por WhatsApp — UX-09

### 7.1 Constructor del enlace

```ts
// src/lib/whatsapp.ts
import type { Lang } from "@/i18n";

/** Construye un enlace de cotización. `telefono`: solo dígitos con indicativo. */
export function crearEnlaceWhatsApp(
  telefono: string,
  experiencias: string[],
  sede: string,
  lang: Lang,
): string {
  const intro =
    lang === "es"
      ? `Hola, me interesa cotizar en ${sede}:`
      : `Hello, I'd like a quote in ${sede}:`;
  const cuerpo = experiencias.map((e) => `• ${e}`).join("\n");
  return `https://wa.me/${telefono}?text=${encodeURIComponent(`${intro}\n${cuerpo}`)}`;
}
```

### 7.2 Reglas

1. **Siempre `encodeURIComponent`** sobre el mensaje completo. Sin él, tildes y saltos de línea rompen la URL.
2. El teléfono sale del dato de la **sede**, nunca de una constante global.
3. `target="_blank" rel="noopener noreferrer"`.
4. Se registra el evento **antes** de navegar (spec 11).
5. Existe siempre una **alternativa no-WhatsApp**: enlace a `/contacto` con la experiencia preseleccionada. No todo el mundo usa WhatsApp, y un canal único es un punto de fallo.
6. La etiqueta dice qué hace: "Cotizar esta experiencia".

---

## 8. Botón flotante de WhatsApp — UX-06

### Comportamiento contextual

| Ruta | Número | Mensaje |
|---|---|---|
| Capa A | Nacional | Consulta general |
| `/sedes` | Nacional | Consulta sobre sedes |
| `/sedes/{slug}` | De la sede | "Hola, me interesan las experiencias en {Sede}" |
| `/sedes/{slug}/{exp}` | De la sede | "Hola, me interesa {Experiencia} en {Sede}" |

### Requisitos

- Fijo abajo a la derecha, en todas las rutas.
- Área táctil ≥ 56×56 px.
- Verde de WhatsApp **tokenizado** (`--whatsapp`), no suelto en el JSX — spec 04 §3.2.
- `aria-label` descriptivo y traducido.
- **No tapa CTAs ni el footer** en ningún ancho: la última sección lleva padding inferior suficiente.
- Respeta `safe-area-inset-bottom` en iPhone.
- Sin animación de pulso permanente: distrae y viola `prefers-reduced-motion`.

---

## 9. Paquete de tours — UX-37 · 🔒 decisión #5

### El problema, y por qué es menor de lo que parece

La duda planteada asume cuatro sedes con cuatro WhatsApp. Pero **solo dos sedes venden desde este sitio**. El alcance real del problema es de dos números, no de cuatro.

### Propuesta: paquete con alcance por sede

- El paquete acumula experiencias de **una** sede.
- El envío va al WhatsApp de esa sede.
- Si el usuario mezcla sedes, se le avisa **antes** y se generan dos mensajes claramente identificados.
- No depende de que exista un número nacional único. Si el cliente lo crea, el cambio es de una constante.

### Comportamiento

| Aspecto | Definición |
|---|---|
| Estado | `localStorage`, clave `tt-paquete-{sedeSlug}` |
| Indicador | Contador visible de experiencias seleccionadas |
| Edición | Se puede quitar cualquier experiencia antes de enviar |
| Envío | Un mensaje por sede, con la lista completa |
| Tras enviar | El paquete se vacía |
| Caducidad | 7 días sin actividad |

**No es un carrito de compra.** No hay precios, no hay pago, no hay inventario. Es una solicitud de cotización agrupada, y el lenguaje de la interfaz debe reflejarlo.

---

## 10. Principios de conversión

1. **Un CTA primario por pantalla.** El resto, subordinados.
2. **No pidas más datos de los necesarios.** Para cotizar por WhatsApp basta con lo que el usuario ya eligió; nombre y teléfono son opcionales.
3. **Sin precios hasta que el cliente los confirme.** Publicar cifras que luego cambian destruye confianza y genera reclamos.
4. **La transparencia operativa vende.** Duración real, horario, punto de encuentro, qué no incluye. Convierte más que el adjetivo.
5. **Fricción cero en móvil.** Es donde ocurre la mayoría del tráfico turístico.
6. **Siempre una segunda vía.** WhatsApp más formulario. Nunca un canal único.

### Prohibido

- Falsa urgencia: "quedan 2 cupos", contadores regresivos sin inventario real.
- Casillas premarcadas de cualquier tipo.
- Precios no confirmados.
- Capturar datos personales sin la autorización del spec 10.
- CTAs de reserva fuera de la capa B.

---

## 11. Dependencias externas

| Necesidad | Decisión | Sin ella |
|---|---|---|
| WhatsApp por sede | #2 / #5 | El CTA usa el número nacional, marcado con `TODO(cliente)` |
| Tarifario | — | Todo dice "cotizar", nunca un precio |
| Datos operativos reales de cada experiencia | — | La ficha se construye con los campos disponibles; los ausentes no se renderizan |
| Fotografía propia | — | Unsplash como placeholder, con plan de migración (spec 09) |

**Ninguna de estas bloquea el trabajo estructural.** El módulo se construye con los datos que hay y los `TODO` marcados; los valores reales entran después sin rediseño.

---

## 12. Criterios de éxito

Se miden con el spec 11.

| Métrica | Definición |
|---|---|
| Tasa de detalle | Visitas a ficha ÷ visitas a página de sede |
| Tasa de cotización | Clics en CTA de cotización ÷ visitas a ficha |
| Canal elegido | Reparto entre WhatsApp y formulario |
| Experiencias más solicitadas | Ranking por clics de cotización |
| Uso del paquete | % de cotizaciones con más de una experiencia |
| Abandono en móvil vs escritorio | Comparativa por dispositivo |

---

## 13. Compuerta hacia el spec 07

Nada se marca por estar escrito.

| | Punto | Resultado |
|---|---|---|
| ☑ | Confirmado en ejecución que `/sedes/{slug}` no tiene detalle ni cotización | **CONFIRMADO** — 0 enlaces comerciales, ver §3 |
| ☑ | `/sedes/bogota` y `/sedes/medellin` devuelven 404 | **CONFIRMADO** — la lógica `tieneSitioPropio` funciona |
| ☐ | Tipos ampliados compilan sin romper las 8 experiencias | `npm run build` |
| ☐ | Slugs de experiencia aprobados por el cliente | Consulta — impacta SEO y son permanentes |
| ☐ | `crearEnlaceWhatsApp` probado con tildes y saltos de línea | Abrir el enlace generado en móvil real |
| ☐ | WhatsApp por sede definido | 🔒 Decisión #2 |
| ☐ | Alcance del paquete decidido | 🔒 Decisión #5 |
| ☐ | Datos operativos reales recibidos del cliente | Pendiente |
| ☐ | El FAB no tapa contenido en los 8 anchos | Verificación responsive del spec 07 |

**Estado de la compuerta: CERRADA.** El trabajo estructural puede avanzar; el cierre completo depende de las decisiones #2 y #5 y de los datos operativos del cliente.
