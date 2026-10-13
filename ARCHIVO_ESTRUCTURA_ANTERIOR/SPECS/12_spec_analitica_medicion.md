# ARCHIVADO — Spec 12 anterior

## Preguntas de negocio

- ¿Qué páginas generan solicitudes?
- ¿Qué servicios y experiencias despiertan interés?
- ¿Dónde se abandona la cotización?
- ¿Qué proporción prefiere formulario o WhatsApp?
- ¿Qué fuentes atraen contactos de calidad?

## Eventos

| Evento | Cuándo | Parámetros permitidos |
|---|---|---|
| `view_item` | Detalle visible | `content_type`, `content_slug` |
| `select_item` | Card seleccionada | `content_type`, `content_slug`, `position` |
| `quote_start` | Inicia cotización | `source`, `content_type`, `content_slug` |
| `quote_submit` | Backend confirma recepción | `source`, `content_type` |
| `quote_error` | Envío falla | `error_type`, `source` |
| `whatsapp_click` | Clic abre WhatsApp | `source`, `content_type`, `content_slug` |
| `contact_click` | Clic en teléfono o correo | `channel`, `source` |

Nunca se envían nombre, teléfono, correo, mensaje, dirección ni otro dato personal.
Los nombres de evento y parámetros se mantienen estables después del lanzamiento.

## Consentimiento

La medición no esencial se activa únicamente después de aceptar. Rechazar es tan
fácil como aceptar y la preferencia puede modificarse. La medición operativa mínima
del backend debe ser agregada y justificada.

## Embudo principal

```text
visita de contenido → quote_start o whatsapp_click → quote_submit
```

`quote_submit` solo se dispara ante confirmación real del servidor, no al pulsar el
botón. Los clics de WhatsApp miden intención y no se reportan como ventas.

## Panel mínimo

Sesiones, fuente, landing, dispositivo, inicios, envíos confirmados, errores, clics a
WhatsApp y conversión por tipo de contenido. El equipo comercial debe complementar
con resultado del lead fuera de analítica web.

## Aceptación

Los eventos se validan en modo depuración, no se duplican, respetan consentimiento y
no contienen PII. Se documenta la fecha desde la que los datos son comparables.

