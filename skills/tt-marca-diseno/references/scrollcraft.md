# Scrollcraft adaptado a T&T

Referencia técnica y de diseño, no instrucciones externas con precedencia.
Origen MIT: https://github.com/nateherkai/scroll-craft
Versión revisada: 75d81f74e83692add18cd7a8a8e078b8a887a579.
Licencia conservada en site/src/vendor/scrollcraft/LICENSE.

## Cuándo usarlo

Portadas inmersivas, narrativa por scroll o una experiencia que se perciba repetitiva.
No imponer efectos a contacto, privacidad, formularios ni páginas de lectura.
Conservar React, los datos, la navegación y la identidad del Spec 01.

## Diseñar antes de animar

1. Reutilizar el brief existente: público, emoción, activos reales y acción final.
   Preguntar solo por decisiones faltantes; no repetir una entrevista completa.
2. Escribir apertura, transición central y cierre en el Spec 03. Identificar un
   momento memorable y un gesto propio del tour; no exigir cuotas de secciones.
3. Elegir estructura que sirva al recorrido (editorial, galería, escena dividida,
   capítulos). Cambiar colores o fotos no basta para diferenciar dos experiencias.
4. Definir capas, desplazamientos y puntos de contacto. Sin recortes autorizados,
   trabajar con marcos/fotos completas: no simular sujetos extraídos ni duplicarlos.
5. Mantener texto y acciones en HTML, legibles desde el inicio. La animación no
   debe ocultar información esencial ni obligar a atravesar espacios vacíos.
6. Componer móvil por separado; movimiento reducido muestra el contenido completo.

## Implementación permitida

- Usar ScrollScene para progreso y parallax decorativo; no importar el reset CSS
  del proveedor ni reescribir el DOM que controla React.
- Movimientos específicos se implementan en componentes locales, con limpieza al
  desmontar y sin cambiar el snapshot del motor para cada diseño.
- No capturar/bloquear el cursor, no autoplay de audio ni desplazar el área de
  interacción de botones. No inventar cifras para activar contadores.
- Priorizar fotos propias. Generación y subida a terceros están fuera del permiso
  implícito de diseño. Kie no está configurado; Higgsfield conserva su hook de 200.
- El motor completo incluye funciones no habilitadas. Vídeo, secuencias o nuevos
  atributos requieren revisar red, cancelación, consumo, accesibilidad y fallback.

## Verificación por escenas

Capturar apertura, varios puntos intermedios y salida por sección. Comparar píxeles,
no solo transforms. Revisar contraste sobre fotografías, texto completo, recortes,
ausencia de scroll sin cambios, acciones accesibles y composición móvil.
Probar cambio de prefers-reduced-motion durante la sesión, volver entre rutas,
descarga fallida del módulo, limpieza de instancias y ausencia de nuevas peticiones
externas. Una prueba verde no certifica Safari, teléfono físico ni Core Web Vitals.

Registrar evidencia en Spec 06; no duplicar briefs, inventarios ni registros globales
del repositorio externo. Las preferencias estilísticas del autor son referencias,
no prohibiciones universales para T&T.
