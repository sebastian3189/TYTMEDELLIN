# Movimiento y tipografía con criterio Apple, adaptados a T&T

Referencia de diseño, no instrucciones externas con precedencia. Subordinada a
`SPECS/01`, `SPECS/03`, `SPECS/05` y a las invariantes de `tt-marca-diseno`.
Adaptado de emilkowalski/skills (MIT), commit 2d228630ba1446365f614a108cb8252f1feda202
(apple-design, animate, animation-performance, emil-design-eng, review-animations).
Síntesis propia en español; no se instala el paquete ni se copian sus skills.

## Cuándo leerla

Al diseñar o revisar portadas inmersivas, narrativa por scroll, transiciones de
interfaz, botones y titulares grandes. Complementa `scrollcraft.md`; no lo sustituye.

## Principio rector

El movimiento sirve a cuatro cosas: respuesta, orientación (dónde estoy, qué viene),
continuidad entre estados y, solo en momentos raros, deleite. Si no puede nombrarse
su propósito, no se anima. Lo que se usa muchas veces al día (menú, foco, teclado)
cambia de inmediato o con un gesto casi imperceptible. La marca no gana por cantidad
de efectos: gana por cuidado, calma y precisión.

## Tokens de curva y duración

Usar estos nombres; no inventar curvas ni crear un sistema paralelo al de `styles.css`
(`--ease` existente se conserva para lo ya construido).

| Token | Valor | Uso |
|---|---|---|
| `--ease-out-strong` | `cubic-bezier(.23,1,.32,1)` | entradas y salidas de texto, rótulos, velos |
| `--ease-in-out-strong` | `cubic-bezier(.77,0,.175,1)` | movimiento de un elemento que ya está en pantalla |
| `--ease-sheet` | `cubic-bezier(.32,.72,0,1)` | paneles y hojas móviles |
| `--dur-press` | `140ms` | respuesta al pulsar |
| `--dur-ui` | `200ms` | cambios de color, aparición de controles |
| `--dur-caption` | `420ms` | entrada de titulares narrativos (pieza de marketing) |
| `--dur-caption-out` | `220ms` | salida de titulares (más rápida que la entrada) |
| `--stagger` | `60ms` | separación entre rótulo, titular y apoyo |

Reglas:

- Entrar o salir: `--ease-out-strong`. Moverse en pantalla: `--ease-in-out-strong`.
  Color o hover: `ease`. Progreso continuo: `linear`.
- Nunca `ease-in` en interfaz: retrasa justo el instante que se observa.
- Interfaz por debajo de 300 ms. Los titulares narrativos pueden llegar a 450 ms.
- Salida más corta que la entrada; el sistema responde rápido, la narrativa respira.
- Escalonar grupos 30–80 ms. El escalonado nunca bloquea un clic.
- Transiciones CSS (interrumpibles) para estados que cambian con el scroll; no
  `@keyframes` en algo que puede invertirse a mitad de camino.
- Mismo camino de ida y vuelta: lo que entra subiendo sale bajando al retroceder.
- Nunca `transition: all`; nombrar propiedades. Nunca aparecer desde `scale(0)`:
  partir de `opacity:0` y desplazamiento de 8–16 px o `scale(.96)`.

## Scroll que narra sin secuestrar

- El scroll del navegador manda: sin `preventDefault`, sin bloquear rueda, teclado
  ni gesto. La animación solo lee el progreso.
- Suavizado permitido: el valor mostrado persigue al real con interpolación
  exponencial dependiente del tiempo (`k = 1 − e^(−dt/τ)`), τ 60–110 ms. Si el salto
  es grande (ancla, «Saltar», recarga) se iguala de golpe; no se anima un viaje largo.
- El ritmo se gana con altura de sección y reparto de fases, no con inercia falsa.
- Texto por fases discretas con transición, simétrico al subir. Un solo mensaje
  protagonista por pantalla; nada de párrafos largos sobre imagen en movimiento.
- Revelado una vez en secciones de lectura (`IntersectionObserver`); en una escena
  pegajosa (`sticky`) el texto sí sigue la fase en ambos sentidos.
- No dejar tramos de scroll sin cambio visible ni zonas vacías por imponer efecto.

## Tipografía estilo Apple con la marca

Montserrat para titulares, Inter para cuerpo y UI. No se usa la fuente del sistema.

| Rol | Tamaño | Peso | Tracking | Interlínea |
|---|---|---|---|---|
| Display de portada | `clamp(48px, 7.2vw, 112px)` | 800 | `-0.045em` | `0.95` |
| Titular narrativo | `clamp(34px, 4.8vw, 72px)` | 700 | `-0.035em` | `1.02` |
| Entrada (lead) | `clamp(17px, 1.35vw, 21px)` | Inter 500 | `-0.005em` | `1.45` |
| Micro-rótulo | `12px` | Inter 600 | `0.14em`, mayúsculas | `1.2` |
| Contador | `13px` | Inter 600, `tabular-nums` | `0.02em` | `1` |

- El tracking depende del tamaño: negativo en grande, neutro en cuerpo, positivo
  solo en micro-rótulos. Montserrat es ancha: no pasar de `-0.05em`.
- Jerarquía por peso + tamaño + aire, no solo tamaño. Titulares de 10–16 caracteres
  por línea (`max-width: 14ch`); cuerpo 60–75 caracteres; mínimo 16 px.
- Aire generoso: separación ≥ 24 px entre rótulo y titular, ≥ 32 px antes de acciones.
- Espaciados en `rem`/`em` donde dependan del texto, para respetar el zoom del usuario.

## Modo claro premium (2026-10-12, prevalece sobre «Materiales y velos»)

Por decisión del usuario, el sitio entero es claro (`SPECS/03` §I): ningún texto
sobre foto, vídeo o velo; sin secciones oscuras; texto nunca más claro que `#5A5D58`.
El material flotante pasa a ser blanco `rgba(255,255,255,.92)` con `blur(12px)`
estático y texto tinta `#1E201D`. La profundidad se logra con sombras en capas,
escala y parallax de cartas-foto, no con oscuridad. Las reglas de velo siguientes
quedan solo como referencia histórica y no se aplican a la web.

## Materiales y velos

- El velo existe para leer, no para teñir la foto. Localizarlo detrás del texto
  (degradado anclado a la esquina del bloque) y nunca sobre caras.
- Opacidad máxima del grafito `#3C3F3B` en velos sobre imagen: 0,72 en el borde del
  texto, 0 antes de alcanzar el sujeto. Medir contraste en capturas reales (AA).
- Rótulos y controles flotantes como material translúcido: `rgba(60,63,59,.72)` con
  `backdrop-filter: blur(12px)` estático. Nunca material claro sobre material claro.
- Legibilidad sobre fondo cambiante: peso un punto mayor y sombra de texto suave
  (`0 1px 24px rgba(0,0,0,.35)`), no gris plano.
- `prefers-reduced-transparency: reduce` → fondo sólido al 0,92 y sin blur.
- Desenfoque animado solo ≤ 20 px y preferiblemente estático; en Safari es costoso.

## Acción y botones

- El naranja `#FF7F09` solo en la acción principal visible y en indicadores mínimos
  (≤ 10 % de la superficie). Una sola acción naranja por pantalla.
- Respuesta al pulsar: `transform: scale(.97)` en `:active`, `--dur-press`.
- Hover con movimiento solo bajo `@media (hover:hover) and (pointer:fine)`.
- Énfasis por cambio de fondo/color, nunca cambiando padding, tamaño de fuente o
  alto: eso desplaza el diseño y el área táctil.
- Área táctil mínima 44 × 44 px; separación ≥ 8 px entre objetivos.

## Rendimiento

- Animar solo `transform` y `opacity` (y `clip-path` si está justificado). Nada de
  `max-height`, `top`, `margin` o `font-size` en transición: provocan layout y CLS.
- Reservar espacio para todo lo que aparece: capas apiladas en la misma celda de
  rejilla, ocultas con opacidad. Objetivo CLS ≤ 0,1 (Spec 05) y 0 en la portada.
- En bucles `requestAnimationFrame`, escribir en `style` o en el canvas, nunca en
  estado de React. No animar variables CSS heredadas en contenedores con hijos.
- Detener el bucle fuera de vista o con la pestaña oculta. Limpiar al desmontar.
- `will-change` solo tras observar un salto o pérdida de cuadros, y en el elemento
  concreto. Verificar en teléfono de gama media, no solo en un portátil rápido.
- Canvas: `imageSmoothingQuality = 'high'`, resolución interna según
  `devicePixelRatio` con tope explícito; nunca escalar más de 1,4× la fuente.

## Movimiento reducido y accesibilidad

- Reducido significa menos y más suave, no nada: se conservan fundidos cortos de
  opacidad (≤ 150 ms) que ayudan a entender; se quitan desplazamientos, zoom y
  parallax. La portada pasa a póster + texto completo.
- Respetar el cambio de preferencia durante la sesión.
- Texto narrativo visual duplicado → `aria-hidden`; un resumen accesible único
  describe la secuencia sin afirmar hechos que no son reales.
- Foco visible siempre; los controles ocultos deben salir del orden de tabulación
  (`visibility:hidden` o `inert`), no solo volverse transparentes.

## Revisión

Revisar a velocidad 2–5× más lenta y cuadro a cuadro, en escritorio y teléfono, con
ojos frescos al día siguiente. Comprobar: propósito nombrado, curva y duración de
esta tabla, simetría al invertir, ausencia de CLS, contraste AA sobre fotografía,
caras sin velo, una sola acción naranja y variante reducida.
