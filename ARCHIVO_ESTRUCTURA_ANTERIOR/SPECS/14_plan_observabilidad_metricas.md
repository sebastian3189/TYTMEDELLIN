# ARCHIVADO — Spec 14 anterior

## Objetivo

Detectar fallos reales de navegación, cotización e integraciones sin registrar datos
personales ni depender únicamente de reportes de usuarios.

## Señales

- Disponibilidad y latencia de inicio, detalles y endpoint de cotización.
- Errores de frontend agrupados por versión y ruta.
- Errores y tiempo de respuesta del backend.
- Porcentaje de formularios confirmados y fallidos.
- Rate limits, intentos automatizados y fallos de proveedores.
- Core Web Vitals de usuarios reales cuando exista volumen suficiente.

## Alertas iniciales

- Sitio o endpoint principal no disponible.
- Aumento sostenido de errores de envío.
- Error nuevo que afecte un flujo principal.
- Integración de correo, CRM o almacenamiento rechaza solicitudes.
- Regresión marcada de rendimiento después de desplegar.

Cada alerta tiene canal, responsable, severidad y procedimiento. Los mensajes no
incluyen cuerpos del formulario. IDs de correlación sustituyen datos personales.

## Operación

El cliente debe ser propietario de las cuentas y accesos del despliegue. Se documentan
proveedor, proyecto, dominio, variables, integraciones, límites y procedimiento de
rollback.

## Aceptación

Antes de lanzar se provoca un error controlado, se confirma su registro y alerta, y
se verifica que no expone secretos ni contenido de solicitudes.

