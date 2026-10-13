# ARCHIVADO — Spec 15 anterior

## Decisión pendiente

La herramienta final de analítica y gestión de etiquetas se confirma antes de la
integración. No se presupone que una configuración anterior siga vigente. Si se usa
Google Tag Manager, se crea o valida un contenedor propiedad del cliente.

## Capa de datos

La aplicación debe emitir los eventos definidos en el Spec 12 mediante una interfaz única.
La aplicación no acopla cada componente directamente a etiquetas de un proveedor.

Ejemplo conceptual:

```ts
track("quote_start", {
  source: "experience_detail",
  content_type: "experience",
  content_slug: "slug-aprobado"
})
```

## Configuración si se usa GTM

1. Instalar el contenedor solo con el ID del ambiente correspondiente.
2. Bloquear etiquetas no esenciales hasta recibir consentimiento.
3. Crear variables únicamente para parámetros permitidos.
4. Configurar eventos sin capturar texto libre ni valores de campos.
5. Marcar conversiones solo para resultados que representen el hecho medido.
6. Publicar con nombre de versión, fecha y responsable.

## Pruebas

- Sin consentimiento: no salen solicitudes de medición no esencial.
- Rechazo: la navegación sigue funcionando.
- Aceptación: eventos aparecen una sola vez y con parámetros correctos.
- `quote_submit`: solo tras confirmación del backend.
- Ningún evento contiene PII, query strings sensibles o texto del formulario.

## Gobierno

Acceso mínimo, autenticación multifactor, propietario del cliente, registro de cambios
y separación entre prueba y producción. Cada etiqueta adicional requiere propósito,
base de consentimiento, dueño y fecha de revisión.

