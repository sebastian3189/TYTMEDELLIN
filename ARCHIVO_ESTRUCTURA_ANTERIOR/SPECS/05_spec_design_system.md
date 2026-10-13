# ARCHIVADO — Spec 05 anterior

## Objetivo

Crear una identidad digital reconocible, contemporánea y confiable para T&T Medellín.
Las pantallas deben construirse desde estos tokens y componentes, sin copiar una
plantilla de turismo.

## Dirección visual

- Sensación: local, sobria, humana y segura.
- Fotografía: personas, vehículos y lugares reales; luz natural y edición consistente.
- Evitar: clichés genéricos, collages saturados, degradados decorativos sin función y
  fotografías que no correspondan a la operación.

La base aprobable del Spec 02 se implementa mediante tokens: naranja `#FF7F09`,
grafito `#3C3F3B`, blanco `#FFFFFF` y superficie `#F4F4F4`. Los roles son `brand`,
`accent`, `ink`, `background`, `surface`, `muted`, `success`, `warning`, `danger` y
`focus`. Los estados funcionales se definen por contraste y significado, no por
variaciones improvisadas de la paleta.

## Fundamentos

- Montserrat para títulos e Inter para cuerpo y UI, con escala fluida y cuerpo mínimo
  de 16 px.
- Ancho de lectura de 60–75 caracteres.
- Espaciado basado en múltiplos de 4 px.
- Targets táctiles mínimos de 44×44 px.
- Contraste AA y foco visible en todos los temas aprobados.
- Bordes, radios y sombras consistentes; el color de marca no sustituye jerarquía.

## Componentes base

Header, navegación móvil, footer, botones, enlaces, campos, select, textarea,
checkbox, alertas, cards de servicio/experiencia/vehículo, hero, encabezado de
sección, franja de confianza, galería, acordeón, breadcrumb, CTA, formulario de
cotización, botón de WhatsApp, estados vacíos y página 404.

Cada componente debe documentar variantes, tamaños, estados, uso correcto y
comportamiento responsive. No se duplica un componente para resolver diferencias
puramente visuales.

## Motion

El feedback de controles usa animaciones breves de 150–300 ms. La narrativa de scroll
y las transiciones cinematográficas pueden durar más cuando su progreso está ligado
al usuario. Se aplican las reglas del Spec 02 y la skill `tt-direccion-motion`; deben
respetar `prefers-reduced-motion` y no bloquear lectura, interacción ni rendimiento.

## Compuerta visual

Antes de construir todas las páginas se aprueban los fundamentos del Spec 02, botones
y campos, una card, el inicio en móvil y el inicio en escritorio.

