---
name: tt-marca-diseno
description: Define o implementa identidad, sistema visual, fotografía, UI y movimiento web de T&T Medellín. Úsala cuando cambie cómo se ve o se mueve el producto; no cubre generación con créditos, que requiere tt-higgsfield-control.
---

# Marca y diseño

Lee [`SPECS/01_producto_marca.md`](../../SPECS/01_producto_marca.md) y, si hay UI,
imagen o movimiento, [`SPECS/03_diseno_movimiento_medios.md`](../../SPECS/03_diseno_movimiento_medios.md).

## Invariantes

- Marca confiable, local, humana, precisa y dinámica sin estridencia.
- Acento `#FF7F09`; base `#3C3F3B`; blanco `#FFFFFF`; superficie `#F4F4F4`.
- Montserrat en títulos; Inter en cuerpo y UI.
- El naranja guía, no domina; tokens semánticos y contraste WCAG 2.2 AA.
- El logo maestro falta: `PENDIENTE CLIENTE`; no redibujar ni generar.
- Fotografía real y autorizada antes que material genérico o sintético.

## Método

Para portadas inmersivas o narrativa por scroll, lee
[Scrollcraft adaptado](references/scrollcraft.md). Aplica sus principios dentro de
los specs existentes; no instala el plugin ni autoriza generación de medios.
Para curvas, duraciones, tipografía display, velos, botones y rendimiento de
movimiento, lee [Movimiento Apple adaptado](references/movimiento-apple.md).

Si el diseño incluye una pieza audiovisual o prompt para Higgsfield, aplica primero
la entrevista, dirección de cámara y mejora del prompt de
[`tt-higgsfield-control`](../tt-higgsfield-control/SKILL.md), incluso si aún no se
generará nada. Define emoción y comportamiento dentro del sitio antes de implementar
esa pieza; entrega al constructor el contrato web aprobado. No repitas la entrevista
ni confundas animación del vídeo con animación programada de la interfaz.

1. Confirma objetivo, audiencia, medio y activos.
2. Presenta máximo tres conceptos y justifícalos desde la marca.
3. Aprueba uno antes de multiplicar pantallas.
4. Define tokens, jerarquía, composición y componentes.
5. Si hay movimiento, añade versión móvil y `prefers-reduced-motion`.
6. Verifica permisos, legibilidad, responsive y rendimiento.

El movimiento puede usar scroll suave, títulos por palabras, parallax, galerías,
tarjetas reactivas, contadores verificados, transiciones, menú dinámico, botones
magnéticos, ruta animada y revelado del logo. Cada efecto debe orientar o narrar.

Salida: concepto, decisiones, activos, estados responsive/reducido, pendientes y
criterio de aprobación.

