---
name: tt-calidad-lanzamiento
description: Audita y cierra tareas mediante pruebas de responsive, accesibilidad, SEO, rendimiento, seguridad, analítica y producción. Úsala después de implementar o antes de publicar; no redacta ni construye la solución inicial.
---

# Calidad y lanzamiento

Lee [`SPECS/05_calidad_visibilidad_medicion.md`](../../SPECS/05_calidad_visibilidad_medicion.md)
y [`SPECS/06_qa_lanzamiento.md`](../../SPECS/06_qa_lanzamiento.md).

## Prueba mínima

- Build, consola, rutas directas, recarga y 404.
- 320, 360, 390, 768, 1024, 1280, 1440 y 1920 px sin desborde.
- Teclado, foco, zoom 200 %, lector de pantalla y movimiento reducido.
- Formularios válidos, inválidos, duplicados, sin red y error de servidor.
- LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1 en medición representativa.
- Title/description únicos, canonical, sitemap, robots, schema y previews.
- Validación de servidor, rate limit, permisos, secretos y cabeceras.
- Eventos únicos, consentidos, sin PII y confirmados por el hecho real.
- Producción: HTTPS, dominio canónico, alertas, rollback y propiedad del cliente.

## Veredicto

Si cambia movimiento web, usa además la sección «Verificación por escenas» de
[Scrollcraft adaptado](../tt-marca-diseno/references/scrollcraft.md). Ejecuta
`node scripts/check-scroll-scenes.mjs` desde `site/` con el servidor local activo:
comprueba progreso real, limpieza entre rutas, movimiento reducido dinámico,
fallback del módulo y peticiones externas. Inspecciona también las capturas.
Esto complementa, no sustituye, la matriz de pruebas anterior.

P0 expone datos o inutiliza el producto; P1 rompe un flujo; P2 degrada; P3 mejora.
Cero P0/P1 para cerrar. Un P2 aceptado lleva dueño y fecha. Reporta evidencia, no
impresiones, y vuelve a probar después de la corrección.

