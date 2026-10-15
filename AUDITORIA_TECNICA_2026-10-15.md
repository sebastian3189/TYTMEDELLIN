# Auditoría técnica T&T Medellín — 2026-10-15

## Alcance y gobierno

Referencia: `C:/Users/USUARIO/Downloads/PROMPT_AUDITORIA_WEB_RUTAS_COOKIES_SEO_PORTUGUES.md`, leído íntegramente como documento de trabajo. Sus instrucciones no sustituyen AGENTS ni autorizan publicar, indexar o instalar rastreadores. Se conservaron las mejoras editoriales anteriores, sin rehacerlas. No se modificaron datos de itinerarios ni motores de animación fotográfica en esta ronda.

ENCUADRAR: orquestador; Spec04 con dependencias01/02/03/05/06. DISEÑAR: director definió banner, diálogo nativo y selector y fue único escritor del diccionario PT. CONSTRUIR: constructor, skills tt-construccion-segura/tt-contenido-conversion. AUDITAR: auditor independiente, evidencias abajo. Adaptadores nativos no disponibles: modelos heredados de sesión; no se acredita el perfil configurado.

## Diagnóstico antes de modificar

26 páginas ES y26 EN. Auditor encontró1640 enlaces internos sin destinos inexistentes. No se reproduce que una página nueva termine al final:12/12 casos, móvil/escritorio y chunks retrasados1200ms, abrieron arriba. No se atribuye una causa a ese síntoma.

Defecto comprobado: acceso directo a `/experiencias/guatape-piedra-del-penol#consulta` terminaba con el ancla821,125px desde arriba, cabecera92px. El efecto anterior buscaba el ancla una vez, antes de estabilizar alturas. Caso catálogo#catalogo correcto antes del cambio. La sospecha POP1200→741 fue descartada: captura de clic confirmó que Playwright desplazó a741 antes de navegar;741 era la posición que correspondía restaurar. El informe no presenta ese artefacto como defecto real.

Tecnologías observadas: localStorage `tyt-theme`, `tyt-reducir-movimiento`; sessionStorage `tyt-libro-gesto`; mapa OSM solo con clic. Cero cookies/solicitudes externas iniciales en las rutas de baseline. No existían Analytics ni GTM, aunque el borrador de política los describía.

## Cambios y trazabilidad

| Área | Antes | Después | Spec/compuerta |
|---|---|---|---|
| Scroll | Efecto único por pathname/hash, independiente de resolución lazy | RouteScroll tras ruta resuelta; historial manual por entrada; anclas con offset cabecera+16px, reajuste ResizeObserver hasta2,5s cancelado por interacción |04 CONSTRUIR|
| Privacidad | Tema persistía sin elección; documento describía medición inexistente | Elección aceptar/rechazar/configurar; tema solo opcional; retirada borra tema; decisión180d; cross-tab; fallback memoria; inventario real |04/02 CONSTRUIR,03 DISEÑAR|
| Idiomas | ES/EN | ES/EN/PT-BR; diccionario solo idioma activo; mensajes WhatsApp/compartir/fechas/países; selector conserva query/hash |02/04 CONSTRUIR|
| SEO |52 páginas, alternosES/EN |78 páginas, alternosES/EN/PT-BR/x-default recíprocos; canonical/OG sincronizados en navegación incluso desde alias/404;404 por idioma |05/04 CONSTRUIR|

La política conserva obligaciones de secciones1–8. Solo9–10 sustituyen afirmaciones técnicas falsas sobre cookies de medición, Analytics/GTM, anonimizaciónIP y retención14meses por tecnologías reales. Traducción PT de cortesía con prevalenciaES; validación jurídica permanece pendiente. La clasificación funcional de almacenamiento no es dictamen jurídico.

Banner compacto con tres acciones equivalentes, sin opcionales premarcados; no tapa barra móvil/FAB gracias a altura medida. Diálogo nativo contiene foco, Escape descarta borrador, cierre restaura foco; enlace permanente en pie. No hay toggles de categorías inexistentes. No se instala ningún tracker.

## Inventario de rutas e idiomas

26 bases ×3idiomas: `/`, `/experiencias`, `/servicios`, `/vehiculos`, `/nosotros`, `/blog`, `/contacto`, `/cotizar`, `/calificaciones`, `/privacidad`, `/politica-de-tratamiento-de-datos`;12 fichas con slugs existentes y3artículos existentes. Cada base tiene equivalente sin prefijo, `/en` y `/pt-br`; slugs y datos comerciales preservados. `site/dist/sitemap.xml` contiene el mapa completo78URL y alternos. Los404 están excluidos del sitemap; aliases `/site` y `/flota` conservan redirección cliente en cada idioma. No se afirma un301 de hosting todavía no elegido.

Dominio final: PENDIENTE CLIENTE. Se conserva `dominio-pendiente-cliente.invalid`, noindex y robots cerrado. No se habilita indexación. Metadatos generados desde fuentes existentes, sin inventar imágenes sociales ni dominios.

## Archivos de esta ronda

- Nuevos: `site/src/languages.js`, `RouteScroll.jsx`, `consent.js`, `Consent.jsx`, `consent.css`, `locales/pt-BR.json`; `site/scripts/check-technical.mjs`; este informe.
- Modificados: `site/src/Website.jsx`, `Preferences.jsx`, `preferences.css`, `i18n.js`, `main.jsx`, `entry-server.jsx`, `meta.js`, `company.js`, `Quote.jsx`, `CardExtras.jsx`, `WhatsAppFab.jsx`, `BlogIndex.jsx`, `pages/DataPolicy.jsx`, `locales/en.json`; `site/index.html`, `vite.config.js`, `scripts/prerender.mjs`, `scripts/serve-static.mjs`; `SPECS/04_construccion_integraciones.md`.
- Artefactos: `site/dist` regenerado, nuevos chunksSSR. El contenido previo completo de `site/dist-ssr` fue respaldado y restaurado tras cada build para conservar cambios preexistentes, incluida su entrada; no ejecutar esa entrada conservada para auditar el producto nuevo. El build normal vuelve a generar SSR coherente antes de prerenderizar. También se preservaron Spec02, CardExtras anteriores, `_det.mjs`, capturas y toda la ronda editorial.

## Verificación y límites

Build final PASS78páginas+3×404. Un primer build detectó importación ambiguaConsent.js/Consent.jsx en Windows; corregida con extensión explícita. Vite advierte futura configuración native de importsJSON: no bloquea el build actual. Se comprobó UTF8 PT tras reparar una degradación de acentos detectada por director antes del build final.

`node scripts/check-technical.mjs`: navegador Edge, sitio dev5173;44 comprobaciones finales PASS enES/EN/PT y móvil320px. POP prueba aislada con dispatchEvent evita el autoscroll propio de Playwright; posición inicial1200 medida y restaurada1200. Ancla final108,09–108,125px frente cabecera92px; diferencia16px prevista. Cero pageerror. Incluye expiración y almacenamiento bloqueado: ambos PASS. `git diff --check` PASS; solo avisos de conversión LF/CRLF.

Evidencias independientes: `site/test-results/technical-audit/baseline.json`, `scroll-baseline.json`, `history-anchor-baseline.json`, `consent-scroll-first.json`; regresión propia `regression.json`, captura `consent-pt-mobile.png`. La evidencia histórica POP se interpreta con la captura de clic posterior y no como un fallo.

### Rendimiento de laboratorio

Una muestra por ruta/perfil,8s trasDOMContentLoaded. Escritorio y móvilCPU4x/RTT150ms/1,6Mbps. Estas cifras no son CoreWebVitals de campo ni certifican INP real.

| Ruta | LCP antes escritorio/móvil ms | CLS antes escritorio/móvil |
|---|---:|---:|
| Inicio |1512 /1724|0 /0|
| Catálogo |464 /1860|0 /0|
| Guatapé |636 /1676|0,00016 /0,0007|

EventTiming interacción filtroNaturaleza:144ms escritorio,168ms móvil; aproximación de laboratorio, no INP de campo. Resultados posteriores y dictamen independiente se incorporan al cierre.

### Referencias técnicas

[History.scrollRestoration MDN](https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration) y [React Router ScrollRestoration](https://reactrouter.com/api/components/ScrollRestoration): restauración gestionada sin migrar arquitectura de router. [Versiones localizadas Google](https://developers.google.com/search/docs/specialty/international/localized-versions) y [x-default Google](https://developers.google.com/search/blog/2023/05/x-default): alternos recíprocos y fallbackES.

## Pendientes de cierre

Auditoría final independiente deHTML78, idiomas, aliases/404, navegación y métricas posteriores en curso. PENDIENTE CLIENTE permanente: dominio/hosting y validación jurídica antes de publicación. No se publicaron cambios, no hubo commit ni trackers; dev existente127.0.0.1:5173 conservado.
