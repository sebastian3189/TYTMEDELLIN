# ARCHIVADO — Spec 16 anterior

## Antes del dominio

- Confirmar cuál dominio será canónico y quién es su propietario.
- Mantener DNS, hosting y medición en cuentas controladas por el cliente.
- Evitar indexar URLs temporales de desarrollo o previsualización.
- Preparar variables y secretos separados para producción.

## Publicación

1. Conectar el dominio al proveedor de producción siguiendo los registros indicados.
2. Verificar HTTPS y elegir una única variante canónica.
3. Redirigir variantes y dominios temporales cuando la plataforma lo permita.
4. Configurar la URL final en canonical, sitemap, robots, imágenes sociales y schema.
5. Validar rutas directas, 404, formulario, WhatsApp y consentimiento.
6. Conectar Search Console, perfil de negocio y analítica aprobada.
7. Ejecutar el Spec 13 sobre producción.

## Pruebas de producción

- HTTP redirige a HTTPS.
- La variante no canónica redirige con código permanente.
- Todas las URLs del sitemap responden 200 y contienen el dominio final.
- La URL temporal no compite en buscadores.
- Certificado, cabeceras, formulario y alertas funcionan.
- Las vistas compartidas muestran título, descripción e imagen correctos.

## Rollback

Antes de publicar se identifica la última versión estable y el procedimiento de
reversión del proveedor. Cambios de DNS se documentan con sus valores anteriores.
Nunca se elimina una versión estable antes de confirmar la nueva.

## Compuerta final

Lanzamiento aprobado por negocio, diseño, contenido y responsable técnico; cero P0 o
P1; accesos entregados; monitoreo activo; y dominio final verificado como propiedad
del cliente.
