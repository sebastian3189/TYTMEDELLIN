---
name: tt-construccion-segura
description: Implementa rutas, componentes, formularios, backend e integraciones con seguridad y estados completos. Úsala al escribir código funcional; no decide identidad ni copy sin los specs aprobados.
---

# Construcción segura

Lee [`SPECS/04_construccion_integraciones.md`](../../SPECS/04_construccion_integraciones.md)
y el spec funcional relacionado.

## Antes de editar

- Inspecciona el stack real; no asumas framework ni archivos heredados.
- Identifica ruta, datos, componente reutilizable, estados y prueba de cierre.
- Si falta una decisión visual o de contenido, devuelve el bloqueo al dueño.

## Implementación

- Una fuente para navegación y datos; presentación separada.
- Rutas estables, 404 real, metadatos y un `h1`.
- Responsive desde 320 px, targets ≥44 px y teclado completo.
- Imágenes adaptativas con dimensiones; hero prioritario y resto diferido.
- Estados de carga, vacío, error y éxito; sin placeholders en producción.

## Formularios y seguridad

- Esquema compartido cliente/servidor con límites explícitos.
- Honeypot, time-trap y rate limit; CAPTCHA solo si el abuso lo justifica.
- Errores junto al campo, foco al primero y asociación accesible.
- Autorización de datos no premarcada y política enlazada.
- Secretos solo en servidor; datos personales fuera de URLs, analítica y logs.
- CSP y cabeceras; enlaces e iframes restringidos; dependencias revisadas.

## Cierre

Ejecuta build, pruebas relevantes y revisión de consola. Reporta archivos, pruebas y
pendientes. El auditor independiente es quien aprueba.

