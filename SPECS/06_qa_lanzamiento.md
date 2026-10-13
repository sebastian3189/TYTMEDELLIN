# Spec 06 — QA, lanzamiento y operación

**Depende de:** todos los specs anteriores  
**Dueño:** `auditor-calidad`

## Matriz final

### Funcional

Navegación, rutas directas, recarga, breadcrumbs, 404, listados, detalles, WhatsApp,
consentimiento y cotización en casos válido, inválido, duplicado, sin red y error de
servidor. Datos parciales no crean bloques vacíos.

### Visual y accesible

Todos los anchos del Spec 05; Chromium, Safari y Firefox vigentes; teclado, foco,
zoom 200 %, lector de pantalla y movimiento reducido. Comparación contra prototipos
aprobados y revisión del logo sin deformación.

### Técnica

Build limpio, consola sin errores, HTTPS, cabeceras, validación de servidor, rate
limit, permisos, secretos, Core Web Vitals, canonical, sitemap, robots, schema,
eventos y alertas. Estado Higgsfield documentado.

### Contenido

Solo Medellín y cobertura aprobada. Cero `PENDIENTE CLIENTE`, lorem ipsum, enlaces
rotos, datos de muestra, cifras sin fuente, imágenes sin permiso o testimonios no
autorizados.

## Severidad

P0 expone datos o bloquea el producto; P1 rompe un flujo principal; P2 degrada una
función; P3 es mejora menor. Lanzamiento con cero P0 y P1. Todo P2 aceptado tiene
responsable y fecha.

## Dominio y producción

1. Dominio, DNS, hosting y medición en cuentas del cliente.
2. HTTPS y una única variante canónica.
3. URLs temporales fuera del índice y redirecciones permanentes apropiadas.
4. Dominio final en canonical, sitemap, robots, schema y previews sociales.
5. Formularios, WhatsApp, consentimiento y alertas verificados en producción.
6. Search Console, perfil de negocio y analítica conectados si fueron aprobados.

## Rollback y entrega

Identificar versión estable y procedimiento de reversión antes de publicar. Registrar
valores DNS previos. Entregar URL, accesos del cliente, repositorio sincronizado,
variables documentadas sin secretos, integraciones, guía de edición, respaldo,
evidencia de pruebas y responsables de operación.

## Aprobación final

### Evidencia de revisión local — 11 de octubre de 2026

- Implementación React en `site/src/Website.jsx`, contenido en `content.js`,
  fotografías con procedencia en `media.json` y estilos en `website.css`.
- Compilación `npm run build`: correcta.
- `node scripts/check-browser.mjs`: 25 rutas sin incidencias detectadas;
  cinco páginas representativas verificadas a 320, 360, 390, 768, 1024,
  1280, 1440 y 1920 px, sin desbordamiento horizontal.
- Verificados filtros, búsqueda sin tildes, galería con teclado y Escape,
  validación y contexto del formulario, ausencia de datos personales en URL
  de WhatsApp, menú móvil, capítulos con movimiento reducido y HTTP 404 local.
- `node scripts/check-corrections.mjs`: imagen principal decodificada,
  cambio de capítulo y rechazo de teléfono compuesto solo por signos.
- Evidencia reproducible y capturas en `site/test-results/` (no versionadas).
- Auditor independiente aprobó las correcciones estáticas para revisión local.
  Esto no certifica lector de pantalla, rendimiento de producción ni publicación.
- Formularios preparan una solicitud para copiar y enviar por WhatsApp;
  no existe recepción backend ni confirmación de reserva.
- Pendientes de lanzamiento: logo oficial, autorización de fotografías,
  aprobación de contenido/diseño, dominio y configuración SEO de producción.
- No se publicó el sitio ni se consumieron créditos Higgsfield en esta entrega.

Las compuertas siguientes corresponden al lanzamiento, no al prototipo local.

### Adaptación Scrollcraft y perfiles equilibrados — 11 de octubre de 2026

- `py -3.12 scripts/validar_adaptadores_agentes.py`: ocho adaptadores válidos,
  referencias existentes y modelos de cada proveedor separados. No comprueba
  acceso de cuenta ni carga efectiva en una instalación de Codex o Claude.
- Build React correcto. Motor opcional separado: aproximadamente 7,45 kB gzip.
- Regresión `check-browser.mjs`: 25 rutas, cero incidencias detectadas.
- `check-scroll-scenes.mjs`: instancia única bajo StrictMode, desplazamiento real,
  movimiento reducido dinámico, limpieza al navegar, pausa fuera de pantalla,
  móvil 320/360/390/768, módulo bloqueado con contenido disponible, cero errores
  de página y cero peticiones externas. Capturas y reporte en
  `site/test-results/scrollcraft/`. Inspeccionadas apertura escritorio y móvil.
- La primera ejecución de escenas falló por verificar antes de completar la
  navegación React; se añadió espera de URL y desmontaje. La repetición pasó.
- Auditor independiente: snapshot del motor consistente con origen fijado;
  aprobación estática sin P0/P1 de adaptador, licencia y perfiles de agentes.
- Skills existentes ampliadas, sin instalar la skill externa completa.
  `quick_validate.py` no pudo ejecutarse por falta de PyYAML en Python local;
  frontmatter conservado y referencias inspeccionadas. No se instalaron paquetes
  globales para eludir este límite.
- No ejecutados scripts externos de generación, subida, servidor o codificación.
  Sin consumo Kie/Higgsfield ni publicación. Teléfono físico, Safari, lector de
  pantalla y métricas de campo siguen pendientes; no se certifican con estas pruebas.

- [ ] Specs 01–05 con compuertas cerradas.
- [ ] Cero P0/P1 y P2 aceptados documentados.
- [ ] Negocio, diseño, contenido y técnico aprueban.
- [ ] Monitoreo y rollback probados.
- [ ] Accesos y propiedad entregados al cliente.
- [ ] Consumo Higgsfield confirmado y nunca superior a 200 créditos.
