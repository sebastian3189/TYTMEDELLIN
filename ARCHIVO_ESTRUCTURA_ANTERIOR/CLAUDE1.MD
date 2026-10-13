# ARCHIVADO — Contexto anterior del proyecto

> Documento de contexto para cualquier agente (humano o IA) que trabaje en este repositorio.
> Léelo completo antes de tocar código. Última actualización: 2026-10-11.

---

## 1. Qué es este sitio — sede Medellín

**Transporte y Turismo Medellín (T&T Medellín)** es la sede de Medellín del grupo T&T. Este repositorio es el **sitio web de venta directa de la sede Medellín**, con la misma estructura y capacidad de conversión que el sitio de Bogotá.

### Capa A — Identidad institucional de la sede (todo el sitio)
Cara de la sede Medellín: `/`, `/historia`, `/equipo`, `/valores`, `/servicios`, `/contacto`. Transmite **confianza, trayectoria y personas** de la operación en Medellín y Antioquia. No vende directamente.

### Capa B — Módulo de venta (experiencias turísticas en Medellín y Antioquia)
Catálogo de experiencias turísticas de la sede Medellín: City Tour Medellín, Guatapé, pueblos de Antioquia, etc. Incluye duración, destacados y CTA de cotización. Son páginas **transaccionales**.

### Sitios hermanos

| Sitio | Rol | URL |
|---|---|---|
| **T&T Medellín** (este repo) | Venta directa de la sede Medellín | — |

### Los dos tonos coexisten

| Capa A — institucional | Capa B — venta (experiencias Medellín) |
|---|---|
| "Conoce nuestra historia", "Hablemos" | "Ver experiencias", "Cotizar por WhatsApp" |
| Narrativa de trayectoria y equipo | Catálogo con duración, destacados e incluye |
| Certificaciones, valores, cobertura en Antioquia | Detalle operativo del tour, punto de encuentro |
| Credibilidad de largo plazo | Conversión de la visita |

**Regla de convivencia:** la capa B hereda la identidad visual de la sede. No se meten CTAs de reserva agresivos en el home ni en `/historia`. El home puede llevar a las experiencias, nunca vender directamente.

Referente de estilo para la capa A: **Yanbal** — storytelling de marca, rostros reales, legado. Referente funcional para la capa B: el sitio de **Bogotá**.

---

## 2. Stack real

> ⚠️ El `README.md` dice "React Router DOM". **Es incorrecto.** El proyecto usa **TanStack Router / TanStack Start** con enrutamiento por archivos.

| Capa | Tecnología |
|---|---|
| Framework | React 19 + TypeScript + Vite 8 |
| Enrutamiento | `@tanstack/react-router` + `@tanstack/react-start` (rutas por archivo en `src/routes/`) |
| Servidor | Nitro (SSR) — `src/server.ts`, `src/start.ts` |
| Estilos | Tailwind CSS v4 (CSS-first, sin `tailwind.config.js`) — todo vive en `src/styles.css` |
| Componentes | shadcn/ui sobre Radix (`src/components/ui/`) |
| Iconos | `lucide-react` |
| Toasts | `sonner` (`<Toaster />` montado una vez en `__root.tsx`) |
| Datos remotos | `@tanstack/react-query` (provider montado, sin uso real todavía) |
| Validación | `zod` (instalado, aún sin usar) |
| Carrusel | `embla-carousel-react` (instalado, aún sin usar) |
| Gestor | `bun` (hay `bun.lock` y `bunfig.toml`) y también `package-lock.json` |

Scripts: `dev`, `build`, `build:dev`, `preview`, `lint`, `format`.

**Git:** nunca reescribir historia publicada — nada de `push --force`, rebase,
amend ni squash sobre commits ya subidos.

---

## 3. Sistema de diseño

Definido en [`src/styles.css`](src/styles.css) con `@theme inline` y variables `oklch`. **Nunca escribir colores crudos** (`text-orange-500`, `bg-[#FF7F09]`): siempre tokens semánticos.

### Colores de marca

| Token | Claro | Significado |
|---|---|---|
| `--primary` | `oklch(0.719 0.184 45.5)` = **#FF7F09** | Naranja de marca. **Solo acento**: CTAs, badges, iconos, eyebrows. Objetivo: ≤10 % de la superficie visible |
| `--secondary` / `--ink` | `oklch(0.36 0.006 130)` = **#3C3F3B** | Oscuro protagonista: header, footer, bloques institucionales |
| `--background` | blanco puro | Fondo base |
| `--surface` | `oklch(0.961 0 0)` = **#F4F4F4** | Fondo alterno de sección |
| `--muted-foreground` | `oklch(0.5 0.006 130)` | Texto secundario |

El sitio de Bogotá usa exactamente los mismos valores en HSL: `--primary: 29 100% 52%`, `--secondary: 105 3% 24%`, `--radius: 1.25rem`. **La identidad es compartida.**

Existe paleta `.dark` completa con los mismos tokens. Toda pantalla nueva debe verse bien en ambos modos.

### Tipografía

- `--font-display`: **Montserrat** (600/700/800) → `h1`–`h4`, peso 700, `line-height: 1.3`
- `--font-sans`: **Inter** (400/500/600/700) → cuerpo, peso 400, `line-height: 1.6`
- Se cargan desde Google Fonts en `__root.tsx` con `preconnect`.

### Formas y sombras

- `--radius: 1.25rem` (20 px). Cards con `rounded-[20px]` vía la utilidad `card-premium`.
- Botones **píldora**: `rounded-full px-8 py-3`.
- `shadow-premium` / `shadow-premium-lg`; `card-premium` ya incluye hover con `scale(1.02)`.

### Primitivas de layout — úsalas siempre

[`src/components/Section.tsx`](src/components/Section.tsx):

| Componente | Uso |
|---|---|
| `<Section tone="background \| surface \| ink">` | Envoltura de sección: padding, `max-w-7xl`, fondo alterno |
| `<SectionHeading eyebrow title subtitle center>` | Eyebrow en naranja + `h2` + subtítulo |
| `<PageHero title subtitle image compact>` | Hero con imagen, overlay `bg-ink/70` y el único `h1` de la página |

Cards en `src/components/cards/`: `SedeCard`, `ExperienceCard`, `TeamMemberCard` (+ `TeamAvatar`), `TestimonialCard`, `ValueCard`, `FeatureCard`, `TimelineItem`. `CountUp` para cifras animadas.

---

## 4. Modelo de contenido

Todo el copy es **bilingüe ES/EN** mediante un único tipo, en [`src/i18n/index.tsx`](src/i18n/index.tsx):

```ts
export type L = { es: string; en: string };
```

Se resuelve con el hook `useI18n()` → `t(valor)`. El idioma se guarda en `localStorage` (`tt-lang`), por defecto español.

**No hay archivos de traducción separados.** El texto vive junto al dato:

| Archivo | Contiene |
|---|---|
| [`src/data/content.ts`](src/data/content.ts) | `cifras`, `valores`, `compromisos`, `certificaciones`, `areas`, `equipo`, `conductores`, `hitos`, `fundadorQuote`, `testimonios`, `servicios` y el objeto `copy` con todo el copy narrativo por página |
| [`src/data/sedes.ts`](src/data/sedes.ts) | `sedes` (con `experiencias` anidadas), `URL_SITIO_BOGOTA`, `URL_SITIO_MEDELLIN`, helper `getSede(slug)` |
| [`src/data/ui.ts`](src/data/ui.ts) | Textos de interfaz: `nav`, `cta`, `labels`, `form`, `footer`, `contactInfo` y el array `navLinks` |

**Regla:** cualquier texto nuevo se declara como `L` con `es` **y** `en`. Nunca hardcodear strings en JSX.

### Lógica clave de sedes

```ts
tieneSitioPropio: true   → la card enlaza a `urlExterna` (target="_blank")
tieneSitioPropio: false  → la card enlaza a /sedes/{slug} con las experiencias aquí mismo
```

Bogotá y Medellín son `true`; Eje Cafetero y Cartagena son `false`. Si mañana una sede estrena sitio, basta cambiar el booleano y añadir `urlExterna` — el componente no se toca.

---

## 5. Mapa del sitio actual

| Ruta | Archivo | Propósito |
|---|---|---|
| `/` | `src/routes/index.tsx` | Hero + quiénes somos + cifras + preview de sedes + preview de equipo + valores + testimonios + CTA institucional |
| `/historia` | `historia.tsx` | Timeline de hitos, "de dónde venimos / hacia dónde vamos", cita del fundador |
| `/equipo` | `equipo.tsx` | Grid por áreas, bloque de conductores, cultura y formación |
| `/valores` | `valores.tsx` | Valores con ejemplo real, compromiso con Medellín y Antioquia, certificaciones |
| `/sedes` | `sedes.index.tsx` | Las 4 sedes con comportamiento mixto (2 redirigen, 2 entran) |
| `/sedes/$slug` | `sedes.$slug.tsx` | **Página de venta** de Eje Cafetero y Cartagena: catálogo de experiencias + conversión |
| `/servicios` | `servicios.tsx` | Transporte corporativo · Turismo receptivo · Alianzas |
| `/contacto` | `contacto.tsx` | Formulario corporativo (sin backend, solo toast) + datos + mapa |

`navLinks` en `src/data/ui.ts` es la fuente única de la navegación (header y footer la consumen).

**⚠️ Esta estructura se mantiene.** El sitio de Bogotá tiene `/vehiculos`; **este no lo incorpora** salvo aprobación explícita del cliente (ver decisión #3 en la sección 8).

---

## 6. Inventario del sitio de Bogotá (fuente de contenido y patrones)

Extraído del sitio en producción. Sirve como cantera de contenido a **adaptar con foco corporativo**, no a copiar tal cual.

### Navegación
Inicio · Experiencias · Vehículos · Nosotros · Contacto · toggle **ES/EN** en píldora · CTA "Reservar Ahora" · iconos de redes en el header.

### Home
1. Hero a pantalla completa, header transparente encima, H1 con palabra destacada en naranja ("Transporte y Turismo **Privado** en Bogotá"), dos CTAs (primario naranja + secundario oscuro).
2. Franja de confianza: "Empresa legalmente constituida · RNT: 279701 · NIT: 902044165-8".
3. **"¿Por qué elegirnos?"** — 6 tarjetas con icono: Conductores Profesionales · Seguridad Garantizada · Puntualidad · Vehículos Privados · Tours Personalizados · Atención 24/7.
4. Banner "Descubre Bogotá a Otro Nivel" + **Galería Exclusiva**.
5. Hero secundario con **palabra rotativa**: "Tu viaje por Bogotá *cómodo / seguro / único / inolvidable / confiable*".
6. **Testimonios** en carrusel con flechas ← →, reseñas reales de Google y contador "500+ viajeros satisfechos".
7. CTA de cierre "¿Listo para tu próxima aventura?".
8. Footer en 3 columnas: descripción + Enlaces Rápidos + Contacto Directo, redes, y repetición de RNT/NIT.
9. **FAB verde de WhatsApp** fijo abajo a la derecha, con mensaje pre-rellenado.

### `/nosotros`
- "Nuestra Historia" (2 párrafos).
- **Nuestra Misión** — servicios seguros, confiables y de alta calidad, superando expectativas.
- **Nuestra Visión** — ser líder en transporte turístico privado, reconocida por calidad y profesionalismo.
- **6 valores**: Servicio · Calidad · Seguridad · Puntualidad · Responsabilidad · Transparencia.

### `/experiencias`
9 tours con horario y lista de "Destacados": Traslados Aeropuerto BOG (24 h) · City Tour Full Day · Parque Jaime Duque · Tour Finca Cafetera · Noche en Bogotá · Minas de Sal y Zipaquirá · Tour de la Sabana · Tour Cultural · Villa de Leyva. Cierra con "Crea tu Experiencia Personalizada".

### `/contacto`
Bloque WhatsApp destacado ("Obtén respuesta inmediata") · teléfono y correo · Sede Principal · Líneas Directas · Atención Digital · **Horarios** (Lun–Vie 7:00–22:00, Sáb–Dom 8:00–17:00) · mapa.

### Qué se adapta de Bogotá a Medellín y cómo

| Elemento de Bogotá | Traducción para Medellín |
|---|---|
| Misión y Visión | A `/historia`, redactadas como narrativa, no como bullets fríos |
| "¿Por qué elegirnos?" (6 razones) | Diferenciales de la sede Medellín en `/` — cobertura en Antioquia, equipo local, certificaciones, coordinador dedicado |
| 6 valores de Bogotá | Se cruzan con los valores de Medellín (Confianza, Excelencia, Seguridad, Compromiso, Innovación, Servicio); se conservan los de Medellín y se absorben Transparencia y Puntualidad como ejemplos operativos |
| Franja RNT/NIT | Franja legal de la sede Medellín |
| FAB de WhatsApp | WhatsApp de la sede Medellín |
| Carrusel de testimonios | Se adopta el patrón con testimonios de viajeros en Medellín y Antioquia |
| Catálogo de experiencias con horario y "Destacados" | **Se replica funcionalmente** para las experiencias de Medellín: City Tour, Guatapé, pueblos de Antioquia, etc. |
| "Crea tu Experiencia Personalizada" | Se adopta al cierre de la sección de experiencias |
| CTA "Reservar Ahora" del header | Se evalúa para el header de Medellín — la conversión puede vivir tanto en el header como en las páginas de experiencia |
| `/vehiculos` | **Fuera de alcance** hasta aprobación |

---

## 7. Datos de contacto y legales

**Estado actual del repo** (`src/data/ui.ts` → `contactInfo`): deben contener los datos reales de la **sede Medellín**.

```
// TODO(cliente): confirmar datos de contacto de la sede Medellín
```

**Datos de referencia (sede Bogotá, para formato):**

| Dato | Valor (Bogotá - referencia) | Valor (Medellín) |
|---|---|---|
| Dirección | Cl. 93 #17-48, Chapinero, Bogotá | TODO(cliente) |
| Teléfono / WhatsApp | +57 314 856 6142 | TODO(cliente) |
| Correo | transporteyturismobogota@gmail.com | TODO(cliente): transporteyturismomedellin@gmail.com o similar |
| RNT | 279701 | TODO(cliente) |
| NIT | 902044165-8 | TODO(cliente) |
| Horario | Lun–Vie 7:00–22:00 · Sáb–Dom 8:00–17:00 | TODO(cliente) |
| Facebook | facebook.com/transporteenbogota.co | TODO(cliente) |
| Instagram | instagram.com/transporteenbogota | TODO(cliente) |
| TikTok | tiktok.com/@tytbogota | TODO(cliente) |

**Cómo usarlos:** se cargan con marcador `TODO` explícito hasta que el cliente confirme los datos de Medellín:

```ts
// TODO(cliente): confirmar NIT de la sede Medellín
nit: "",
// TODO(cliente): confirmar RNT de la sede Medellín
rnt: "",
// TODO(cliente): dirección de la sede Medellín
direccion: { es: "", en: "" },
// TODO(cliente): WhatsApp de la sede Medellín
whatsapp: "",
```

Los datos reales de la sede Medellín **se necesitan del cliente**. Hasta entonces, la sección de contacto queda con `TODO` y no se inventan valores.

---

## 8. Decisiones abiertas del cliente

Seis puntos enviados por el equipo y **sin respuesta al 2026-08-10**. Condicionan el alcance. Cada uno está reflejado en la sección 9 de `01_ux_ui_implementation_plan.md` y como épica **E6** en `02_backlog_ux_ui.md`.

### #1 · RNT y NIT de la sede Medellín — 🔒 Abierta
**Situación.** Se necesitan los datos legales (RNT y NIT) de la operación en Medellín.
**Impacto.** Franja legal del home, footer, JSON-LD `LocalBusiness`, SEO local.
**Recomendación.** Mostrar el RNT y NIT de la sede Medellín de forma visible. Alimenta el `LocalBusiness` para SEO local en Medellín.

### #2 · Información de contacto de Medellín — 🔒 Abierta
**Situación.** Se necesitan los datos de contacto propios de la sede Medellín: teléfono, WhatsApp, correo, dirección, horarios.
**Impacto.** Header, footer, `/contacto`, FAB de WhatsApp, NAP para SEO local.
**Recomendación.** Un único punto de contacto directo de la sede Medellín en todo el sitio: teléfono, WhatsApp, correo y horario propios.

### #3 · Sección de Vehículos — 🔒 Abierta
**Situación.** La sede Medellín tiene su propia flota.
**Propuesta.** Subpágina de "Vehículos" mostrando la flota disponible en Medellín.
**Estado en este repo.** **No implementada y fuera del alcance confirmado.**
**Recomendación.** Si se aprueba, mostrar tipos de vehículo (sedán ejecutivo, van, buseta, bus), capacidad de pasajeros y disponibilidad en Medellín.

### #4 · Catálogo descargable / comercial — 🔒 Abierta
**Situación.** Idea de un catálogo de la sede Medellín como herramienta comercial.
**Recomendación.** En fase 2 como **PDF descargable tras formulario corto** (nombre, empresa, correo). Captación de leads B2B. PDF estático mantenido manualmente.

### #5 · Paquete de tours + WhatsApp — 🔒 Abierta
**Situación.** Se quiere un carrito donde el usuario acumule experiencias turísticas en Medellín y envíe una sola cotización por WhatsApp.
**Recomendación.** Implementar el paquete: el carrito acumula experiencias de Medellín y envía la cotización al WhatsApp de la sede Medellín. Un solo destino de WhatsApp simplifica la implementación.

### #6 · Sección de Aliados — 🔒 Abierta
**Situación.** Aliados en Medellín y Antioquia que complementan la oferta (fincas, deportes de aventura, etc.).
**Recomendación.** Encaja con el tono institucional ("red de aliados") y refuerza credibilidad. **Bloqueante legal:** no publicar logos ni marcas sin convenio firmado o autorización escrita de uso de marca.

---

## 9. Reglas de trabajo

**Git y despliegue**
- Nunca reescribir historia publicada (`--force`, rebase, amend, squash sobre lo ya subido).
- Mantener la rama conectada siempre en estado funcional.

**Estilos**
- Solo tokens semánticos. Cero colores crudos, cero hex en JSX.
- Reutilizar `Section`, `SectionHeading`, `PageHero` y las cards existentes antes de crear nada nuevo.
- Botones píldora (`rounded-full px-8 py-3`), cards `rounded-[20px]` vía `card-premium`.
- Alternar fondos por sección: `background` → `surface` → `background`, y `ink` para bloques institucionales.
- Toda pantalla debe verse correcta en claro y en oscuro.

**Contenido**
- Todo texto como `L` con `es` y `en`. Nada hardcodeado en JSX.
- Tono: cálido pero profesional, en español colombiano con calidez paisa. Nada de venta agresiva ni signos de exclamación en cadena.

**Capa A vs capa B**
- Nunca metas CTAs de reserva o precios en el home, `/historia`, `/equipo` o `/valores`.
- Nunca uses tono institucional distante dentro de `/sedes/eje-cafetero` y `/sedes/cartagena`: ahí el usuario viene a comprar.

**Rutas y SEO**
- Un solo `<h1>` por página (lo pone `PageHero`).
- `head()` propio por ruta con `title`, `description` y `og:*` únicos.
- Detalle en [`08_spec_seo.md`](08_spec_seo.md).

**Enlaces e imágenes**
- Externos: `target="_blank" rel="noopener noreferrer"`.
- Internos: `<Link>` de TanStack Router. CTAs con `<Button asChild>`.
- Imágenes: `alt` descriptivo real, `loading="lazy"` fuera del hero. **No pedir `w=2940` para tarjetas pequeñas** — ver [`09_spec_rendimiento.md`](09_spec_rendimiento.md).

**Responsive — no negociable**
- Verificar en 320 · 360 · 390 · 768 · 1024 · 1280 · 1440 · 1920 px.
- Cero scroll horizontal en cualquier ancho. Targets táctiles ≥ 44 px. Inputs con fuente ≥ 16 px.

**Seguridad**
- El formulario de `/contacto` hoy no tiene backend. Si se conecta uno, es obligatorio aplicar [`10_spec_seguridad.md`](10_spec_seguridad.md) (validación en servidor, rate limiting, anti-spam, Habeas Data).
- Lo mismo aplica al flujo de cotización del módulo de venta: los datos que el usuario escribe antes de ir a WhatsApp son datos personales.

---

## 10. Documentos del proyecto

Metodología: **Spec-Driven Development con ceremonias tipo Scrum**. Cada spec cubre **una responsabilidad**, tiene **un agente dueño**, y la numeración **es el orden de construcción**: el spec N no arranca hasta que el N−1 pase su compuerta de validación.

### Paraguas

| # | Documento | Responsabilidad |
|---|---|---|
| 01 | [`01_ux_ui_implementation_plan.md`](01_ux_ui_implementation_plan.md) | **Plan maestro.** Diagnóstico, visión, fases, página por página |
| 02 | [`02_backlog_ux_ui.md`](02_backlog_ux_ui.md) | **Backlog vivo.** Historias con prioridad, estimación y criterios de aceptación |

### Pipeline de specs — en orden de dependencia

| # | Documento | Responsabilidad | Agente dueño |
|---|---|---|---|
| 03 | [`03_spec_arquitectura_informacion.md`](03_spec_arquitectura_informacion.md) | Mapa del sitio, navegación, URLs, modelo de datos multisede | `arquitecto-informacion` |
| 04 | [`04_spec_design_system.md`](04_spec_design_system.md) | Tokens, tipografía, componentes, patrones de sección | `guardian-design-system` |
| 05 | [`05_spec_contenido_copy.md`](05_spec_contenido_copy.md) | Voz y tono por capa, matriz de contenido, política ES/EN | `copy-bilingue` |
| 06 | [`06_spec_modulo_venta_sedes.md`](06_spec_modulo_venta_sedes.md) | **Venta de Eje Cafetero y Cartagena:** catálogo, ficha, paquete, cotización | `especialista-conversion` |
| 07 | [`07_spec_accesibilidad_responsive.md`](07_spec_accesibilidad_responsive.md) | WCAG AA y responsive 100 % en la matriz 320→1920 px | `guardian-design-system` |
| 08 | [`08_spec_seo.md`](08_spec_seo.md) | Posicionamiento, palabras clave, metadatos, Schema.org, SEO local | `especialista-seo` |
| 09 | [`09_spec_rendimiento.md`](09_spec_rendimiento.md) | Core Web Vitals, imágenes, bundle, SSR, presupuesto de peso | `especialista-rendimiento` |
| 10 | [`10_spec_seguridad.md`](10_spec_seguridad.md) | Rate limiting, anti-spam, cabeceras, validación, Habeas Data | `especialista-seguridad` |
| 11 | [`11_spec_analitica_medicion.md`](11_spec_analitica_medicion.md) | GA4, eventos, embudos, KPIs por capa | `especialista-seo` |
| 12 | [`12_spec_qa_entrega.md`](12_spec_qa_entrega.md) | Definición de terminado, matriz de pruebas, checklist de despliegue | `qa-entrega` |

**Por qué este orden.** No se escribe copy sin saber qué páginas existen (03 → 05). No se optimiza el rendimiento de componentes que aún no existen (06 → 09). No se mide lo que no se construyó (11 al final). Si alguien propone saltarse un paso, hay una dependencia rota que hay que nombrar.

### Agentes y skills

| Ruta | Contenido |
|---|---|
| `.claude/agents/orquestador.md` | **Punto de entrada.** Decide quién trabaja, en paralelo o en secuencia, con qué skills, y custodia las compuertas entre specs |
| `.claude/agents/` | 11 agentes: 1 orquestador + 10 especialistas |
| `.claude/skills/` | 11 skills con las recetas repetibles del repo |

**Empieza siempre por el orquestador** cuando la tarea involucre más de un agente o no esté claro por dónde arrancar.
