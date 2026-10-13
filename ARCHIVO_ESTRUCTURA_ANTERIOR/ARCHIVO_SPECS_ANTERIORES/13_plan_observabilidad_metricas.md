# ARCHIVADO — Spec 13 anterior, no vigente

**Estado:** la fase 2 (métricas) está IMPLEMENTADA con Tag Manager el 2026-09-24; queda su configuración en el panel de Google, que se explica en `14_configuración_tag_manager.md`. La fase 1 (observabilidad en Vercel) sigue sin empezar.
**Depende de:** `10_spec_seguridad.md` §8 (Habeas Data) y `11_spec_analitica_medicion.md` (qué se mide y por qué).
**Fecha:** 2026-09-23.

---

## 0. Resumen en una página

Son dos cosas distintas que se suelen confundir:

| | Observabilidad (Vercel) | Métricas de producto (GA4/GTM) |
|---|---|---|
| **Pregunta que responde** | ¿El sitio está sano? ¿Va rápido? ¿Algo falló? | ¿Qué hace la gente? ¿Qué convierte? |
| **Quién la mira** | Quien mantiene el sitio | Quien vende |
| **Dato** | Técnico y anónimo | De comportamiento |
| **¿Necesita consentimiento?** | No (Speed Insights y logs, sin cookies) | **Sí** (Ley 1581 de 2012) |
| **Si falla** | No se entera nadie hasta que un cliente se queja | Se decide a ciegas |

El orden de implementación no es negociable: **primero observabilidad** (no depende de nadie y protege lo que ya existe), **después métricas** (depende del consentimiento, que ya está construido).

Lo que **ya está hecho** y hay que aprovechar, no rehacer:

- Banner de cookies con decisión guardada en la cookie `tt-cookies` (`src/components/layout/AvisoCookies.tsx`).
- La compuerta `window.__analyticsEnabled`, que solo se abre con "Aceptar todas" (`src/lib/cookies.ts`).
- Página `/privacidad` donde declarar el uso de analítica.
- Cabeceras de seguridad en `public/_headers`.

---

## Fase 1 · Observabilidad en Vercel

### 1.1 Speed Insights (Core Web Vitals de campo)

Mide LCP, INP y CLS de **usuarios reales**, no de laboratorio. Es la diferencia entre "en mi equipo va bien" y "va bien".

```bash
npm i @vercel/speed-insights
```

```tsx
// src/routes/__root.tsx, dentro de RootComponent, junto a <Toaster />
import { SpeedInsights } from "@vercel/speed-insights/react";
// ...
<SpeedInsights />
```

- **Sin cookies ni identificadores**: no necesita consentimiento y por eso va fuera de la compuerta.
- Se activa además en el panel: *Project → Speed Insights → Enable*.
- **Coste:** gratis hasta cierto volumen en el plan Hobby; en Pro entra en la cuota.

**Qué vigilar la primera semana:** el LCP de `/` y de `/sedes/{slug}`, que son las páginas con foto grande. Objetivo: LCP p75 < 2,5 s.

### 1.2 Web Analytics de Vercel (opcional, pero recomendado empezar por aquí)

```bash
npm i @vercel/analytics
```

```tsx
import { Analytics } from "@vercel/analytics/react";
<Analytics />
```

Da visitas, páginas más vistas y referentes **sin cookies**. No sustituye a GA4 —no hay embudos ni eventos de negocio ricos— pero da señal desde el día uno mientras GA4 espera consentimiento.

> **Decisión pendiente del cliente:** si se quiere el dato de tráfico incluso de quien rechaza cookies, esta es la vía. Si molesta el coste, se salta y se va directo a GA4.

### 1.3 Logs y errores del servidor

El sitio es SSR (TanStack Start sobre Nitro), así que hay servidor que puede fallar.

1. **Runtime Logs** en el panel de Vercel: ya existen, solo hay que mirarlos. Retención corta.
2. **Log Drain** (Pro) hacia un destino con retención: Better Stack, Axiom o Datadog. Es lo que permite responder "¿qué pasó el martes a las 3?".
3. **Errores de cliente**: el proyecto anterior tenía captura de errores propia. Había que decidir si conectarla a un servicio real. Recomendación histórica: usar monitoreo solo si existe un responsable de atenderlo.

### 1.4 Alertas

Sin alertas, la observabilidad es un panel que nadie abre.

| Alerta | Umbral | Dónde |
|---|---|---|
| Fallo de despliegue | cualquiera | Vercel → notificaciones a correo/Slack |
| Errores 5xx | > 1 % de las peticiones en 15 min | Log drain |
| Caída de LCP | p75 > 2,5 s durante 24 h | Speed Insights |
| Caída de tráfico | −40 % día contra día | GA4 (fase 2) |

### 1.5 Checklist de la fase 1

- [ ] `@vercel/speed-insights` instalado y montado en `__root.tsx`.
- [ ] Speed Insights activado en el panel.
- [ ] Decisión tomada sobre Web Analytics de Vercel.
- [ ] Log drain configurado **o** decisión explícita de no hacerlo.
- [ ] Notificación de despliegues fallidos, a un correo que alguien lea.
- [ ] Una captura del panel guardada como línea base, para comparar dentro de un mes.

---

## Fase 2 · Métricas con GA4

### 2.1 GA4 directo o Google Tag Manager

> **RESUELTO — 2026-09-24. El cliente eligió Tag Manager, y así está implementado.**
> La guía de configuración del panel es `14_configuracion_tag_manager.md`.
> Lo que sigue se conserva porque explica qué se ganó y qué hay que vigilar.

La recomendación de este plan había sido GA4 directo (`gtag.js`):

| | GA4 directo | GTM |
|---|---|---|
| Peso en el cliente | ~28 KB | ~80 KB + el de cada etiqueta |
| Quién define los eventos | El código, tipado | Quien entre al panel |
| Riesgo | Bajo | Alguien mete una etiqueta y rompe la CSP o la privacidad sin avisar |
| Cuándo conviene | Un solo destino de datos | Varias herramientas (Meta Pixel, Ads, Hotjar…) |

**Qué se hizo para que la elección de GTM no traiga sus inconvenientes:** los
eventos siguen definidos en el código y tipados (`src/lib/analytics.ts`), como
pide `11_spec_analitica_medicion.md` §7. GTM no decide **qué** se mide, solo
**a dónde va** lo que el sitio ya envía a `dataLayer`. Sigue habiendo una sola
fuente de verdad, y es el repositorio.

**Lo que hay que vigilar, y no es menor:** desde el panel de GTM se pueden
añadir etiquetas de terceros sin tocar el código ni avisar a nadie. Dos
consecuencias concretas:

1. La `Content-Security-Policy` de `public/_headers` las bloqueará en
   silencio si no se le abre el dominio. Esto es una red de seguridad, no un
   estorbo: obliga a pasar por el repositorio para meter una herramienta
   nueva.
2. Una etiqueta que recoja campos de formulario rompería la promesa escrita
   en `/privacidad`. El acceso de edición al contenedor debería estar limitado
   a quien entienda eso.

**La ventaja real:** el día que entre publicidad pagada (Meta Ads o Google
Ads), los píxeles se montan desde el panel y detrás de la misma compuerta de
consentimiento, sin desplegar.

### 2.2 Carga condicionada al consentimiento — IMPLEMENTADO

Esto es lo que hace legal la implementación: Tag Manager **no se descarga**
hasta que la persona acepta, y `track()` no envía nada mientras tanto.

Está en `src/lib/analytics.ts`. El enganche no vive dentro del aviso de
cookies, como preveía este plan, sino que va por un evento de `window`
(`tt-consentimiento`, emitido por `guardarConsentimiento()` en
`src/lib/cookies.ts`) que escucha `src/components/layout/Analitica.tsx`. El
motivo: así la medición no depende del orden en que React monte los
componentes, y quien acepta con la página ya abierta no pierde la vista de esa
página.

Los tres casos quedan cubiertos: aceptar ahora, volver con la cookie ya
guardada, y nunca en SSR.

### 2.3 Eventos — IMPLEMENTADO

Están **los trece** del spec §4, no solo los seis de mayor valor que proponía
este plan, con el `union` tipado que pedía §7. El catálogo completo, con dónde
se dispara cada uno y qué parámetros lleva, está en
`14_configuracion_tag_manager.md` §5.

Quedan fuera `package_add`, `package_remove` y `package_submit`: la función de
armar un paquete con varias experiencias (spec 06) no existe todavía en el
sitio. Los nombres están reservados en el código.

**Regla que no se rompe, y se respetó:** ningún parámetro lleva nombre,
correo, teléfono ni número de personas. Solo slugs de sede y de experiencia,
tipo de consulta, canal y un `has_company` que es un sí/no.

### 2.4 Cabeceras de seguridad — IMPLEMENTADO

`public/_headers` ya lleva `Content-Security-Policy`. La cabecera real, con un
comentario que explica directiva por directiva qué abre y por qué, está en ese
archivo; no se copia aquí para no tener dos versiones que se desincronicen.

Difiere en dos cosas de la que proponía este plan:

- **Sin `images.unsplash.com`.** El sitio no sirve ninguna imagen de ahí: todo
  es material propio bajo `/img`. Abrir un dominio que no se usa es regalar
  superficie de ataque.
- **Con las teselas de OpenStreetMap**, que el borrador olvidaba y que sí hacen
  falta para el mapa de `/contacto`.

Sigue en pie lo de `'unsafe-inline'` en `script-src`: es necesario por el
script anti-parpadeo del tema y por el JSON-LD de SEO, y además GTM inyecta
etiquetas. Quitarlo exige emitir un `nonce` por respuesta desde el servidor.

> **Probar en `Content-Security-Policy-Report-Only` antes de publicar.** Una
> CSP mal ajustada no da error visible: bloquea en silencio. Si al desplegar
> algo deja de cargarse, lo primero que hay que mirar es la consola del
> navegador.

### 2.5 Configuración en el panel de GA4

- Retención de datos: **14 meses** (el máximo útil; por defecto son 2).
- Señales de Google: **desactivadas** salvo que haya publicidad.
- Conversiones marcadas: `quote_click`, `whatsapp_fab_click`, `contact_form_submit`.
- Vincular **Search Console**: sin eso no hay datos de búsquedas ni de posición.
- Filtro de tráfico interno por IP de la oficina.

### 2.6 Checklist de la fase 2

Hecho en el código (2026-09-24):

- [x] `src/lib/analytics.ts` con `cargarAnalitica()` y `track()` tipado.
- [x] Enganche al consentimiento (aceptar ahora y volver con la cookie ya guardada), vía el evento `tt-consentimiento` de `src/lib/cookies.ts`.
- [x] **Los trece eventos** del spec §4 implementados, no solo seis. Los tres `package_*` quedan definidos pero sin disparar: esa función no existe todavía.
- [x] `page_view` propio en cada cambio de ruta, con `layer`, `lang` y `theme`.
- [x] Sección de analítica redactada en `/privacidad` (apartados 8 y 9).
- [x] CSP escrita en `public/_headers`, abierta solo a `googletagmanager.com`, `*.google-analytics.com` y el mapa de `/contacto`.
- [x] `VITE_GTM_ID` documentada en `.env.example` y `.env` excluido del repositorio.

Pendiente de hacer en el panel (ver `14_configuracion_tag_manager.md`):

- [ ] Contenedor de GTM y propiedad de GA4 creados; `VITE_GTM_ID` configurada en el hosting y **redesplegado**.
- [ ] Desmarcada la vista de página automática en la etiqueta de configuración de GA4 (si no, solo se mide la primera pantalla de cada visita).
- [ ] Verificado con el panel de red que con «Solo las necesarias» **no se descarga** `googletagmanager.com`.
- [ ] Retención a 14 meses, conversiones marcadas y Search Console vinculado.

---

## Fase 3 · Que alguien lo mire

Lo que no se revisa, no existe.

| Cuándo | Qué | Quién |
|---|---|---|
| Semanal, 10 min | Conversiones, páginas más vistas, errores nuevos | Quien lleva el sitio |
| Mensual, 30 min | Core Web Vitals, tendencia de tráfico, qué sede convierte | Cliente + quien lleva el sitio |
| Trimestral | Revisar qué eventos sobran y cuáles faltan | Ambos |

---

## Orden y esfuerzo

| Paso | Esfuerzo | Bloquea a |
|---|---|---|
| 1. Speed Insights | 30 min | — |
| 2. Alertas de despliegue | 15 min | — |
| 3. Decisión GA4 vs GTM | ~~conversación~~ RESUELTO: GTM | 0 |
| 4. `analytics.ts` + consentimiento | 2 h | 5 |
| 5. Eventos | 3 h | — |
| 6. CSP | 2 h + días de observación | publicar |
| 7. Panel de GA4 | 1 h | — |

**Camino más corto a algo útil:** pasos 1, 2 y 4 en una tarde. Con eso ya hay salud del sitio y conversiones medidas.

---

## Riesgos y decisiones abiertas

1. ~~**Dominio real.**~~ **Resuelto el 2026-09-29:** `SITE_URL` y el `sitemap.xml` apuntan a `https://www.transporteyturismomedellin.com`. La fase 2 ya no está bloqueada: GA4 y Search Console se configuran directamente sobre ese dominio (15_spec_cambio_dominio.md §4.4-4.5).
2. **Quién es el responsable del dato.** La política de `/privacidad` está pendiente de validación legal (lo dice la propia página). Medir sin esa revisión es exponer al cliente.
3. **Consentimiento y volumen.** Con consentimiento previo, una parte del tráfico no se mide. Es el precio de cumplir: las tendencias valen, los absolutos no.
4. **Coste.** Speed Insights y Log Drains consumen cuota de Vercel. Conviene revisar el plan contratado antes de activar todo.
