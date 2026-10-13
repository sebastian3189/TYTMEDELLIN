# ARCHIVADO — Spec 08 anterior

**Objetivo:** WCAG 2.2 nivel AA en las rutas y componentes de la primera versión.

## Responsive

Validar al menos 320, 360, 390, 768, 1024, 1280, 1440 y 1920 px. No debe existir
scroll horizontal, contenido solapado, texto truncado ni acciones fuera de pantalla.
Las tablas se transforman o permiten desplazamiento con etiqueta accesible.

## Interacción

- Navegación completa con teclado y orden de foco lógico.
- Enlace “Saltar al contenido”.
- Menús y diálogos cierran con Escape y administran el foco.
- Targets de al menos 44×44 px.
- Foco visible con contraste suficiente.
- Ninguna acción depende solo de hover, color o gesto.

## Semántica

- Un `h1` por página y jerarquía sin saltos arbitrarios.
- Regiones `header`, `nav`, `main` y `footer` correctamente identificadas.
- Botones para acciones y enlaces para navegación.
- Labels persistentes; placeholder nunca sustituye label.
- Errores asociados con `aria-describedby` y anunciados.
- Imágenes con alt útil o vacío cuando son decorativas.

## Percepción

- Contraste AA en texto, controles, foco y estados.
- Zoom al 200 % sin pérdida funcional.
- Animación reducida respetada.
- Autoplay prohibido salvo control inmediato y justificación.
- Iconos informativos acompañados por texto accesible.

## Pruebas

Combinar revisión automática con navegación solo por teclado, lector de pantalla y
zoom. Probar menú, filtros si existen, galerías, acordeones, cotización, WhatsApp,
consentimiento, confirmación y 404.

## Aceptación

Cero errores críticos o serios; los hallazgos menores quedan documentados con dueño y
fecha. Una puntuación automática alta no sustituye las pruebas manuales.

