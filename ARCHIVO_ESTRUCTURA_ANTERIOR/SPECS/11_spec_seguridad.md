# ARCHIVADO — Spec 11 anterior

## Datos y formularios

- Validación equivalente en cliente y servidor.
- Longitudes, formatos y listas permitidas explícitas.
- Protección antiabuso con rate limit, honeypot y mecanismo adicional si el riesgo lo exige.
- Mensajes de error sin detalles internos.
- Consentimiento informado y no premarcado.
- Retención, acceso y eliminación de solicitudes definidos con el cliente.

## Aplicación y servicios conectados

- Ninguna clave privada en componentes, repositorio o variables expuestas al navegador.
- Integraciones privilegiadas pasan por funciones de servidor.
- Si se usa Supabase: Row Level Security activa, políticas de mínimo privilegio y tablas
  privadas por defecto.
- Ambientes de desarrollo y producción separados.
- Dependencias revisadas y bloqueo de versiones conservado.

## Navegador y despliegue

- HTTPS obligatorio.
- CSP compatible con los servicios realmente usados.
- HSTS, `X-Content-Type-Options`, `Referrer-Policy` y política de permisos.
- Enlaces externos seguros y protección contra tabnabbing.
- Contenido aportado por usuarios escapado; no se renderiza HTML arbitrario.

## Privacidad

Solo se recolecta lo necesario para responder. No se envían nombres, teléfonos,
correos o mensajes a analítica. Cookies no esenciales esperan consentimiento y la
persona puede cambiar su elección.

## Aceptación

El formulario no puede eludirse enviando datos inválidos directamente al backend,
los secretos no aparecen en el bundle, los permisos impiden lectura pública de leads
y las cabeceras se verifican sobre el dominio de producción.
