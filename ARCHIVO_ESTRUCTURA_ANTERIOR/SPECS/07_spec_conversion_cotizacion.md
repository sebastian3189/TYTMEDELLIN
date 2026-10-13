# ARCHIVADO — Spec 07 anterior

## Objetivo

Convertir interés en una solicitud útil para el equipo comercial sin obligar a la
persona a repetir lo que estaba viendo.

## Puntos de entrada

- CTA principal del inicio.
- Cards y detalles de servicios.
- Cards y detalles de experiencias.
- Flota y solicitudes corporativas.
- Menú, footer y WhatsApp contextual.

## Formulario mínimo

| Campo | Regla |
|---|---|
| Nombre | Obligatorio, 2–80 caracteres |
| Teléfono o WhatsApp | Obligatorio y validado |
| Correo | Obligatorio para solicitudes corporativas; válido si se informa |
| Tipo de solicitud | Servicio, experiencia, evento, empresa u otro |
| Fecha | Opcional hasta confirmar reglas del negocio |
| Personas | Número positivo cuando aplique |
| Origen y destino | Cuando aplique al traslado |
| Mensaje | Opcional, máximo definido |
| Autorización | Obligatoria, no premarcada |

El contexto de origen viaja oculto o preseleccionado: slug, página y CTA. El usuario
puede revisarlo y cambiarlo. No se envían parámetros personales a analítica.

## Estados

- Validación junto a cada campo y resumen accesible si hay varios errores.
- Envío con indicador y botón bloqueado contra duplicados.
- Confirmación clara con número de referencia si el backend lo permite.
- Error recuperable que conserva los datos y ofrece WhatsApp.
- Mensaje de expectativa de respuesta basado en un compromiso real.

## WhatsApp

El enlace utiliza el número oficial confirmado y un texto codificado que identifica
el servicio, experiencia o tipo de solicitud. No se simula el envío ni se abre un
número provisional en producción.

## Integración técnica

El formulario requiere un destino real: función segura, proveedor aprobado o backend
conectado. Las credenciales viven en secretos del entorno. Supabase puede utilizarse
si el proyecto lo aprueba, con políticas de acceso y retención definidas; no es una
obligación automática.

## Aceptación

Desde cualquier detalle se completa una solicitud en móvil, llega al responsable
correcto con su contexto, se informa el resultado y no se exponen datos personales.

