# ARCHIVADO — Spec 10 anterior

## Presupuesto

En el percentil 75 de usuarios móviles:

- LCP ≤ 2,5 s.
- INP ≤ 200 ms.
- CLS ≤ 0,1.
- Peso inicial y JavaScript se mantienen tan bajos como permita la funcionalidad; toda
  librería nueva debe justificar su costo.

## Requisitos

- Hero principal con imagen local optimizada, dimensiones y prioridad correctas.
- WebP o AVIF, `srcset`, `sizes`, carga diferida bajo el pliegue y placeholders estables.
- Fuentes autoalojadas cuando sea viable, subconjuntos y pocos pesos.
- Lazy loading para galerías, mapas y módulos no críticos.
- Sin video de fondo en la primera versión salvo evidencia y presupuesto aprobado.
- Si se aprueba la pieza continua de 15 segundos, se exporta en formatos web, con
  poster, carga adaptativa y versión móvil; no se descargan múltiples películas para
  simular una sola secuencia.
- Parallax, scroll suave y respuesta al cursor se implementan con APIs del navegador
  y transformaciones aceleradas cuando sea viable; se desactivan en la versión ligera.
- Terceros y analítica se cargan después del consentimiento y sin bloquear la pintura.
- Los componentes se revisan para retirar dependencias y código no utilizados.

## Medición

Probar compilación de producción con Lighthouse y una herramienta de campo cuando
haya tráfico. Registrar dispositivo, red, URL, fecha y versión para comparar.

## Compuerta

Inicio, listado, detalle y cotización cumplen Core Web Vitals en condiciones móviles
representativas. Una excepción requiere causa, impacto, responsable y fecha de cierre.

