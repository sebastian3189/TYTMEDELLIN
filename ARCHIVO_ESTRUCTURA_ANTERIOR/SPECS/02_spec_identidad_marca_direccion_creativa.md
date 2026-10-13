# ARCHIVADO — Spec 02 anterior

**Dueño:** `director-diseno-marca`  
**Estado:** Fundamento previo a arquitectura e interfaz  
**Ámbito:** T&T Medellín

## 1. Propósito

Fijar la base visual, verbal y audiovisual antes de diseñar pantallas. Este documento
es la fuente de verdad para logo, tipografía, color, fotografía, movimiento y uso de
Higgsfield. Si un activo no está disponible o no ha sido aprobado, se marca como
`PENDIENTE CLIENTE`; no se reconstruye por intuición.

## 2. Esencia de marca

T&T Medellín es una empresa local de transporte y turismo que combina coordinación
operativa, conocimiento del territorio, atención humana y experiencias cuidadas. La
marca debe sentirse confiable antes que ostentosa, cercana sin perder rigor y
contemporánea sin parecer una plataforma tecnológica genérica.

### Promesa de trabajo

“Movilidad y experiencias en Medellín, coordinadas por un equipo local que responde.”

Es una formulación provisional. La versión pública requiere aprobación del cliente.

### Personalidad

- Confiable y responsable.
- Local y conocedora.
- Cálida, humana y hospitalaria.
- Precisa en lo operativo.
- Dinámica sin ser ruidosa.
- Premium por el cuidado, no por la ostentación.

## 3. Logo

El archivo maestro del logo no está presente en el repositorio al revisar este spec.
Debe solicitarse en SVG o PDF vectorial y, como respaldo, PNG de alta resolución con
transparencia. Hasta recibirlo, queda prohibido redibujar, vectorizar por aproximación
o generar una variante con IA.

Reglas:

- Conservar proporción, geometría, color y composición originales.
- No inclinar, recortar, estirar, reordenar ni añadir efectos permanentes.
- Definir área de seguridad a partir de una unidad interna del logo cuando llegue el
  maestro; no inventarla antes.
- Preparar versiones autorizadas: principal, monocroma, clara y oscura.
- La animación puede revelar, trazar, enmascarar o desplazar el logo, pero el fotograma
  final debe ser el original intacto.
- Favicon e icono solo se derivan después de aprobar la reducción.

## 4. Paleta base

| Rol | Valor | Uso |
|---|---|---|
| Naranja de marca | `#FF7F09` | CTA, énfasis, iconos y detalles; no como fondo dominante |
| Grafito | `#3C3F3B` | Texto principal, navegación, footer y bloques de alta confianza |
| Blanco | `#FFFFFF` | Fondo principal y respiración |
| Gris superficie | `#F4F4F4` | Alternancia de secciones y tarjetas |

El naranja ocupa como guía un máximo cercano al 10 % de la superficie visible. Antes
de cerrar la paleta se valida contraste WCAG 2.2 AA y se crean tokens semánticos para
texto, fondo, borde, foco, éxito, advertencia y error. No se infieren colores nuevos
del logo hasta contar con el archivo maestro.

## 5. Tipografía base

- **Montserrat 600/700/800:** títulos y datos destacados.
- **Inter 400/500/600/700:** cuerpo, navegación, formularios y microcopy.
- Cuerpo mínimo de 16 px, ancho de lectura de 60–75 caracteres y escala fluida.
- Si las fuentes se sustituyen, la decisión requiere prueba de marca, rendimiento,
  legibilidad y licenciamiento.

## 6. Lenguaje fotográfico

Priorizar el archivo real disponible: equipo, operación, vehículos, viajeros y lugares
reconocibles de Medellín y Antioquia. La imagen debe comunicar movimiento, escala,
encuentro humano y cuidado logístico. Evitar bancos genéricos, saturación artificial,
escenas imposibles y sustitución de personas reales con IA sin autorización.

Antes de publicar cada imagen se valida autoría, permiso de uso, consentimiento de
personas identificables, pertinencia, calidad y formato web.

## 7. Sistema de movimiento web sin créditos

La programación del sitio puede resolver, sin consumo de créditos de generación:

- Desplazamiento cinematográfico suave, sin secuestrar el scroll.
- Títulos que se construyen por palabras.
- Fotografías con profundidad y parallax moderado.
- Galerías horizontales con alternativa táctil y de teclado.
- Tarjetas que responden al cursor sin depender de hover.
- Contadores animados basados únicamente en cifras verificadas.
- Transiciones entre páginas.
- Menú dinámico.
- Botones magnéticos con área táctil estable.
- Línea de ruta animada.
- Animación del logo sin modificar su diseño.
- Versión ligera para celulares.
- Versión accesible mediante `prefers-reduced-motion`.

Todo movimiento debe aportar jerarquía, orientación o narrativa. No puede retrasar la
acción principal, provocar mareo ni impedir Core Web Vitals.

## 8. Producción Higgsfield

Se recomienda una sola producción continua de 15 segundos para conservar coherencia,
reducir peso y evitar gastar créditos en varias películas independientes.

| Concepto | Créditos |
|---|---:|
| Consumo esperado | 169 |
| Reserva recomendada para correcciones | 15 |
| Techo operativo recomendado | 184–185 |
| Límite absoluto del proyecto | **200** |
| Saldo inicial informado | 1010 |
| Saldo estimado tras 185 | 825 |
| Saldo mínimo si se alcanza el límite absoluto | 810 |

No se inicia una generación sin storyboard, duración, formato, fotogramas de
referencia, prompt aprobado y estimación máxima de créditos.

## 9. Compuerta obligatoria de créditos

Toda operación Higgsfield gestionada por este proyecto debe ejecutar primero:

```powershell
./hooks/higgsfield-credit-guard.ps1 reserve -Credits <maximo> -JobId <id-unico>
```

El hook suma consumo confirmado y reservas activas, y bloquea si el total proyectado
supera 200. Se reserva el costo máximo posible, no un promedio. Al finalizar se
confirma el consumo real con `commit`; una cancelación sin cobro usa `release`.

La garantía es fail-closed dentro del flujo del repositorio: ningún agente ni script
está autorizado a llamar Higgsfield sin una reserva válida. El hook no puede impedir
que una persona use directamente otra interfaz o cuenta externa; si Higgsfield ofrece
un límite de gasto de cuenta, también debe configurarse en 200 como segunda barrera.

## 10. Entregables de la fase de identidad

1. Activo maestro y variantes aprobadas del logo.
2. Brand board con paleta, tipografía, fotografía, iconografía y composición.
3. Tokens semánticos y escala tipográfica.
4. Moodboard y tres conceptos de dirección, de los cuales se aprueba uno.
5. Storyboard y animatic de 15 segundos antes de gastar créditos.
6. Prototipo de movimiento web en móvil y escritorio.
7. Guía de uso de marca y lista de decisiones pendientes.

## 11. Criterio de aceptación

No comienza el diseño de alta fidelidad hasta aprobar logo, paleta, tipografía,
dirección fotográfica, concepto de movimiento y storyboard. El consumo Higgsfield
permanece en cero durante esta fase de definición.
