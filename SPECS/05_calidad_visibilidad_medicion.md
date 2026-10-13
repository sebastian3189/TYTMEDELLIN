# Spec 05 — Calidad, visibilidad y medición

**Depende de:** Specs 01–04  
**Dueño:** `auditor-calidad`

## Responsive y accesibilidad

Validar 320, 360, 390, 768, 1024, 1280, 1440 y 1920 px. Cero scroll horizontal,
solapamientos o acciones inaccesibles. Targets ≥44×44 px e inputs ≥16 px.

Objetivo WCAG 2.2 AA: un `h1`, jerarquía semántica, landmarks, labels persistentes,
contraste, foco visible, teclado completo, Escape en overlays, errores anunciados,
alt adecuado, zoom 200 % y `prefers-reduced-motion`. Ninguna función depende solo de
color, hover, gesto o animación.

## Rendimiento

Percentil 75 móvil: LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1. Imágenes adaptativas,
dimensiones explícitas y hero prioritario. Fuentes optimizadas, terceros diferidos,
JavaScript no usado retirado y movimiento implementado con transformaciones baratas.

La pieza de 15 s, si se aprueba, usa formatos web, poster, carga adaptativa y versión
móvil. No se descargan varias películas para fingir una sola secuencia.

## SEO local

Una intención por URL; `title` y descripción únicos; canonical absoluto; Open Graph;
un `h1`; breadcrumbs; enlaces descriptivos; sitemap solo con URLs 200 indexables;
robots correcto; 404 real; HTML rastreable.

Datos estructurados: `Organization`, tipo local adecuado, `Service`, breadcrumbs y
FAQ solo cuando el contenido visible y los datos reales lo permiten. Dirección,
teléfono, horarios, precios y reseñas nunca se inventan. Toda búsqueda y contenido se
orientan a Medellín y cobertura confirmada.

## Medición y privacidad

Eventos mínimos:

| Evento | Momento | Parámetros permitidos |
|---|---|---|
| `view_item` | Detalle visible | tipo y slug |
| `select_item` | Selección de card | tipo, slug y posición |
| `quote_start` | Inicia cotización | origen, tipo y slug |
| `quote_submit` | Backend confirma | origen y tipo |
| `quote_error` | Falla real | tipo de error y origen |
| `whatsapp_click` | Abre WhatsApp | origen, tipo y slug |

Nunca nombre, correo, teléfono, mensaje o dirección. Medición no esencial solo tras
consentimiento. Un clic a WhatsApp representa intención, no venta.

## Observabilidad

Monitorear disponibilidad, latencia, errores por versión/ruta, formularios aceptados o
fallidos, rate limits, integraciones y Core Web Vitals. Alertas con dueño, severidad y
procedimiento; logs con IDs de correlación, nunca cuerpos de formularios.

## Compuerta

- [ ] Cero errores críticos/serios de accesibilidad.
- [ ] Todos los viewports sin desborde.
- [ ] Core Web Vitals dentro de objetivo o excepción aprobada.
- [ ] Metadatos, sitemap y schema válidos.
- [ ] Eventos únicos, consentidos y sin PII.
- [ ] Error controlado registrado sin secretos.
- [ ] Guard Higgsfield ≤200 créditos.

