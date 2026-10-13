# ARCHIVADO — Spec 11 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `especialista-seo`
**Depende de:** [`06_spec_modulo_venta_sedes.md`](06_spec_modulo_venta_sedes.md) · [`08_spec_seo.md`](08_spec_seo.md) · [`10_spec_seguridad.md`](10_spec_seguridad.md)
**Habilita:** 12 QA

---

## 1. Por qué este spec va casi al final

No se puede medir lo que no se ha construido. Instrumentar antes de tener los embudos produce eventos que no corresponden a nada y decisiones basadas en datos falsos.

Pero tampoco se deja para después del lanzamiento: **sin línea base no se puede demostrar que ninguna mejora funcionó**. Este spec se ejecuta junto con las últimas historias de la fase 2.

---

## 2. Regla que gobierna todo: separar las dos capas

El sitio tiene dos embudos con volúmenes y ciclos radicalmente distintos:

| | Capa A — corporativa | Capa B — venta |
|---|---|---|
| Volumen | Bajo | **Alto** |
| Ciclo | Semanas o meses | Minutos |
| Valor por conversión | Muy alto | Medio |
| Conversión | Formulario corporativo | Clic en cotización |

**Si se miden juntas, el volumen de la B tapa por completo el comportamiento de la A.** Una caída del 40 % en leads corporativos —que puede valer más que todo lo demás— sería invisible en el agregado.

Toda métrica, informe y panel se segmenta por capa desde el primer día.

---

## 3. Herramientas

| Herramienta | Para qué | Coste |
|---|---|---|
| **Google Analytics 4** | Comportamiento, embudos, conversiones | Gratis |
| **Search Console** | Impresiones, CTR, posición, cobertura | Gratis |
| **Google Business Profile** | Búsquedas locales por sede 🔒 decisión #1 | Gratis |

**No se recomienda añadir más.** Un sitio de nueve rutas no necesita mapas de calor ni grabación de sesión: añaden peso, otro origen en la CSP y obligaciones adicionales de privacidad, a cambio de información que aquí se puede deducir de los eventos.

### Consecuencias técnicas de añadir GA4

1. **CSP** — hay que abrir `script-src` y `connect-src` a Google. Ver [`10_spec_seguridad.md`](10_spec_seguridad.md) §6. No se abre por adelantado.
2. **Rendimiento** — GA4 pesa. Cargar de forma diferida, nunca bloqueando el render. El presupuesto del spec 09 se mantiene **con** GA4 incluido.
3. **Privacidad** — es tratamiento de datos. Debe declararse en `/privacidad` y respetar la decisión del usuario.

---

## 4. Eventos

Nomenclatura: `snake_case`, verbo + objeto, en inglés por convención de GA4.

### 4.1 Transversales

| Evento | Cuándo | Parámetros |
|---|---|---|
| `page_view` | Automático en cada ruta | `page_path`, `layer` (A/B), `lang`, `theme` |
| `language_switch` | Al cambiar idioma | `from`, `to` |
| `external_site_click` | Clic hacia Bogotá o Medellín | `sede`, `destination_url` |
| `whatsapp_fab_click` | Clic en el botón flotante | `layer`, `sede`, `page_path` |

`external_site_click` importa más de lo que parece: mide **cuánto tráfico se está cediendo** a los sitios hermanos, que es exactamente lo que corrige UX-02.

### 4.2 Capa A — corporativa

| Evento | Cuándo | Parámetros |
|---|---|---|
| `contact_form_start` | Primer campo enfocado | `enquiry_type` |
| `contact_form_submit` | Envío válido | `enquiry_type`, `has_company` |
| `contact_form_error` | Validación fallida | `field`, `error_type` |
| `sede_card_click` | Clic en tarjeta de sede | `sede`, `has_own_site` |

`contact_form_error` con el campo concreto revela dónde abandona la gente. Si el 60 % de los errores son de teléfono, el problema es la validación, no el usuario.

### 4.3 Capa B — venta

| Evento | Cuándo | Parámetros |
|---|---|---|
| `sede_view` | Vista de página de sede | `sede` |
| `experience_card_click` | Clic hacia la ficha | `sede`, `experience` |
| `experience_view` | Vista de ficha | `sede`, `experience` |
| `quote_click` | **Clic en cotizar** | `sede`, `experience`, `channel` (whatsapp/form), `source` (card/detail/package) |
| `package_add` | Añadir al paquete | `sede`, `experience`, `package_size` |
| `package_remove` | Quitar del paquete | `sede`, `experience` |
| `package_submit` | Enviar paquete | `sede`, `items`, `package_size` |
| `gallery_open` | Abrir galería | `sede`, `experience` |

**`quote_click` es la conversión principal del sitio.** Todo lo demás son pasos hacia ella.

---

## 5. Embudos

### A — corporativo

```
page_view (capa A)
   → sede_card_click | page_view /servicios
   → page_view /contacto
   → contact_form_start
   → contact_form_submit          ← CONVERSIÓN
```

Puntos de fuga a vigilar: `contact_form_start` sin `submit` (formulario demasiado exigente) y `contact_form_error` repetido en el mismo campo.

### B — venta

```
page_view /sedes/{slug}
   → experience_card_click
   → experience_view
   → quote_click                  ← CONVERSIÓN
       ├── channel = whatsapp
       └── channel = form
```

Con paquete:

```
experience_view → package_add (×N) → package_submit   ← CONVERSIÓN
```

---

## 6. Métricas clave

### Capa B

| Métrica | Fórmula | Referencia inicial |
|---|---|---|
| Tasa de detalle | `experience_view ÷ sede_view` | Establecer línea base |
| **Tasa de cotización** | `quote_click ÷ experience_view` | Métrica principal |
| Reparto de canal | `quote_click` por `channel` | Informa si WhatsApp es realmente dominante |
| Ranking de experiencias | `quote_click` por `experience` | Orienta el orden del catálogo |
| Uso del paquete | `package_submit ÷ quote_click` | Valida o refuta la decisión #5 |
| Cotización móvil vs escritorio | Segmentado por dispositivo | Detecta fricción móvil |

### Capa A

| Métrica | Fórmula |
|---|---|
| Tasa de contacto | `contact_form_submit ÷ page_view (capa A)` |
| Abandono de formulario | `1 − (submit ÷ start)` |
| Campos problemáticos | `contact_form_error` agrupado por `field` |
| Fuga a sitios hermanos | `external_site_click ÷ sede_view` |

### Transversales

| Métrica | Fuente |
|---|---|
| Sesiones orgánicas por capa | GA4 + Search Console |
| CTR y posición por clúster | Search Console |
| Core Web Vitals de campo | PageSpeed Insights |
| Uso real de ES vs EN | `language_switch` + idioma de sesión |

**`language_switch` responde una pregunta abierta con dinero detrás:** si casi nadie usa el inglés, la opción B del spec 08 §6 (rutas `/en/…`, alto esfuerzo) queda descartada con datos y no por intuición.

---

## 7. Implementación

### Capa de abstracción

Los componentes **no llaman a `gtag` directamente**. Una función intermedia permite cambiar de herramienta, desactivar el envío sin consentimiento y probar sin red.

```ts
// src/lib/analytics.ts
type EventName =
  | "quote_click" | "experience_view" | "package_add" | "package_submit"
  | "contact_form_start" | "contact_form_submit" | "contact_form_error"
  | "whatsapp_fab_click" | "external_site_click" | "language_switch"
  | "sede_view" | "sede_card_click" | "experience_card_click" | "gallery_open";

export function track(name: EventName, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;          // no en SSR
  if (!window.__analyticsEnabled) return;             // sin consentimiento, no se envía
  window.gtag?.("event", name, params);
}
```

### Reglas

1. Nunca en SSR.
2. **Nunca datos personales como parámetro.** Ni nombre, ni correo, ni teléfono. Solo identificadores de contenido: slugs de sede y de experiencia.
3. El evento se dispara **antes** de navegar a WhatsApp: si se hace después, se pierde.
4. Los nombres de evento son un `union` tipado: un error de escritura no compila.
5. Carga diferida de GA4; nunca bloqueando el render.

### Parámetro `layer`

Todo `page_view` lleva `layer: "A" | "B"`, derivado de la ruta. Es lo que hace posible la segmentación de §2 sin trabajo manual en cada informe.

---

## 8. Privacidad

Medir es tratamiento de datos personales. Aplica la Ley 1581 de 2012, igual que el formulario.

| Requisito | Implementación |
|---|---|
| Declaración del uso de analítica | Sección propia en `/privacidad` |
| Consentimiento | Banner de cookies; GA4 **no se carga** hasta aceptar |
| Anonimización de IP | Activada en GA4 |
| Retención | Configurada al mínimo útil (14 meses) |
| Sin datos personales en eventos | Regla técnica de §7 |

**Consecuencia real:** con consentimiento previo, una parte del tráfico no se medirá. Es el precio del cumplimiento y hay que tenerlo en cuenta al leer los números: no son el 100 % de la realidad, y las tendencias importan más que los absolutos.

---

## 9. Informes

| Panel | Contenido | Cadencia |
|---|---|---|
| **Capa B — conversión** | Embudo completo, ranking de experiencias, reparto de canal | Semanal |
| **Capa A — leads** | Envíos, abandono, campos problemáticos | Quincenal |
| **Orgánico** | Impresiones, CTR y posición por clúster | Semanal |
| **Técnico** | Core Web Vitals, errores, 404 | Mensual |

### Antes de instrumentar

**Registrar la línea base.** Sin ella, ninguna mejora posterior se puede demostrar. Es el mismo principio que el spec 09 aplica al rendimiento.

---

## 10. Preguntas que este spec debe responder

No se mide por medir. Cada evento existe para responder una pregunta con consecuencia:

| Pregunta | Métrica | Decisión que desbloquea |
|---|---|---|
| ¿La capa B convierte? | Tasa de cotización | Si no, hay que rehacer las fichas |
| ¿WhatsApp es realmente el canal dominante? | Reparto de canal | Justifica o no invertir más en ese flujo |
| ¿Sirve el paquete de tours? | Uso del paquete | Valida o refuta la decisión #5 |
| ¿Alguien usa el inglés? | `language_switch` | Decide la opción de i18n del spec 08 §6 |
| ¿Qué experiencias interesan? | Ranking de cotizaciones | Orden del catálogo y prioridad de fotografía |
| ¿Cuánto tráfico cedemos a las sedes externas? | `external_site_click` | Mide el efecto de UX-02 |
| ¿Dónde abandona el formulario? | `contact_form_error` por campo | Prioriza qué campo simplificar |

---

## 11. Compuerta hacia el spec 12

Nada se marca por estar escrito.

| | Punto | Cómo se rectifica |
|---|---|---|
| ☐ | Propiedad de GA4 creada y verificada | Panel de GA4 |
| ☐ | Search Console verificado y sitemap enviado | Panel de Search Console |
| ☐ | CSP ampliada para GA4 sin romper nada | Consola del navegador |
| ☐ | Banner de consentimiento implementado y GA4 bloqueado sin él | Panel de red sin aceptar |
| ☐ | Ningún evento envía datos personales | Revisión de los parámetros en el panel de red |
| ☐ | `quote_click` se dispara antes de navegar a WhatsApp | Prueba real en móvil |
| ☐ | Los eventos llegan a GA4 con sus parámetros | DebugView |
| ☐ | `layer` presente en todo `page_view` | DebugView |
| ☐ | Línea base registrada antes de las optimizaciones | Informe fechado |
| ☐ | GA4 diferido: el presupuesto del spec 09 se mantiene | Nueva medición de rendimiento |

**Estado de la compuerta: CERRADA.** Depende del consentimiento de cookies y de que la ampliación de CSP no rompa nada en producción.
