---
name: tt-higgsfield-control
description: Define la intención audiovisual, entrevista al cliente, mejora prompts para Higgsfield y planifica su interacción con el sitio de T&T Medellín. Úsala al preparar un prompt, storyboard o pieza audiovisual y antes de generar o corregir medios con costo; exige reserva y límite acumulado de 200 créditos.
---

# Dirección audiovisual, prompts y control Higgsfield

Lee la sección Higgsfield de
[`SPECS/03_diseno_movimiento_medios.md`](../../SPECS/03_diseno_movimiento_medios.md).

Objetivo: una producción continua de 15 s. Esperado 169 créditos, 15 de corrección,
techo recomendado 184–185 y límite absoluto 200 sobre saldo inicial informado 1010.

## Entrevista previa a implementación y generación

Antes de cerrar el prompt o implementar su comportamiento, entiende el resultado
buscado. Lee el contexto y los activos ya aportados; pregunta solo lo que falte,
en tandas breves de hasta tres preguntas. Acepta respuestas en lenguaje cotidiano y
propón opciones concretas si ayudan. No ejecutes generación para explorar respuestas.

Cubrir estos puntos, sin repetir preguntas ya respondidas:

- **Propósito y audiencia:** ¿para qué tour o servicio es y quién lo verá? ¿Qué
  queremos que entienda y haga después: descubrir, confiar, explorar o cotizar?
- **Emoción:** ¿qué debe sentir al entrar, en el momento central y al terminar?
  ¿Cuál es el recuerdo que debería llevarse? ¿Qué sensación queremos evitar?
- **Historia y referencias:** ¿qué debe ocurrir y qué no puede faltar? ¿Qué atrae
  de la referencia: luz, encuadre, profundidad, ritmo o transición? ¿Qué no copiar?
- **Punto de vista:** ¿viajamos como pasajeros, caminamos junto a un guía o
  contemplamos el paisaje? ¿Debe sentirse cercano y tranquilo o amplio y enérgico?
- **Interacción web:** ¿el scroll controla el avance del vídeo, solo revela una
  pieza que se reproduce, o anima fotos y capas? ¿Dónde aparece texto y qué acción
  debe seguir disponible? ¿Debe poder saltarse o reproducirse manualmente?
- **Activos y límites:** ¿qué fotografías, personas y lugares reales se usarán con
  permiso? ¿Qué recortes/formato requiere móvil y qué elementos deben conservarse?

Resume las respuestas y las propuestas por separado en el Spec 03. Si faltan
decisiones materiales, detén solo la generación y la implementación dependiente;
puedes preparar alternativas o un storyboard textual sin costo. Si el usuario
delega decisiones explícitamente, registra las elecciones como propuestas propias,
no como respuestas suyas; conserva la aprobación previa exigida para generar.

## Propuesta audiovisual y mejora obligatoria del prompt

1. Traduce la intención a una curva emocional y un momento central memorable.
   Explica por qué ese momento sirve al recorrido y no distrae de la cotización.
2. Diseña apertura, desarrollo y salida. Para cada tramo indica duración orientativa,
   sujeto/acción, escala de plano, ángulo/altura, óptica o perspectiva deseada,
   recorrido y velocidad de cámara, foco, luz, composición y continuidad.
   Justifica decisiones desde la emoción: no uses nombres de lentes como adorno.
3. Revisa el prompt recibido: ambigüedades, acciones incompatibles, cámara físicamente
   incoherente, cambios de sujeto, recortes y hechos no comprobados. Pregunta antes
   de modificar una intención sustancial. No inventes lugares, servicios o personas
   de T&T ni presentes escenas sintéticas como registro real de un tour.
4. Entrega un prompt mejorado listo para el modelo elegido, con referencias e
   instrucciones claras. Comprueba capacidades y parámetros de la herramienta antes
   de usarlos; no prometas controles de cámara, duración, audio o negativos que no
   soporte. Evita instrucciones contradictorias y adjetivos sin efecto observable.
5. Presenta qué cambió respecto al original y por qué. Si conviene traducir el prompt,
   incluye explicación en español y conserva exactamente la intención aprobada.
6. Valida prompt, storyboard y contrato web con el usuario antes de ejecutar.
   Preparar/aprobar un prompt no equivale a reservar créditos ni a generar la pieza.

Estructura orientativa del prompt, adaptada a las capacidades verificadas:

```text
OBJETIVO VISUAL Y EMOCIÓN:
SUJETO, ACCIÓN Y ENTORNO VERIFICADO:
REFERENCIAS Y ELEMENTOS QUE DEBEN PERMANECER INTACTOS:
APERTURA → DESARROLLO → SALIDA:
PLANO, ÁNGULO, CÁMARA, RITMO Y CONTINUIDAD:
LUZ, COLOR, FOCO Y COMPOSICIÓN:
FORMATO, DURACIÓN Y ZONAS LIBRES PARA TEXTO HTML:
RESTRICCIONES Y DEFECTOS A EVITAR (si el modelo los admite):
```

El logo no se genera ni se altera. Títulos, precios, formularios y CTA permanecen
como HTML; no se incrustan en los fotogramas. Separar las instrucciones visuales
que recibe Higgsfield del código y las reglas de scroll que implementa el sitio.

## Contrato de integración con la web

Usa `tt-marca-diseno` y su referencia `references/scrollcraft.md` para la narrativa.
Antes de implementar, acordar en Spec 03:

- Ruta y sección, función de la pieza, estado inicial y final, y acción siguiente.
- Relación entre progreso de scroll y tiempo de vídeo o estado de capas: entrada,
  pausas de lectura, momento central, salida y comportamiento al retroceder.
  Los segundos de vídeo no equivalen a segundos de scroll; el visitante controla
  el ritmo. No crear recorrido vacío ni secuestrar rueda, teclado o gesto táctil.
- Capas y texto superpuesto: zona segura, contraste a lo largo de la secuencia,
  sujetos sin recortes accidentales y CTA accesible incluso si la animación falla.
- Móvil con composición propia; poster y lectura estática para movimiento reducido,
  carga lenta o error. Sin audio automático; si hay audio, control explícito.
- Presupuesto de peso/carga, formatos y codificación adecuados al uso, limpieza al
  navegar y pruebas de apertura, puntos intermedios y salida. El constructor valida
  viabilidad antes del gasto: ScrollScene actual NO admite vídeo ni secuencias.

Cuando el resultado requiera otra integración, revisarla antes de producir el medio;
no ampliar silenciosamente las capacidades del adaptador o cambiar de proveedor.
Después de generar, comparar la pieza con intención, continuidad, planos y contrato,
y revisar su composición real en navegador antes de aceptarla. Una nueva versión
del prompt o un reintento vuelve a pasar aprobación y control de costo.

## Secuencia obligatoria

1. Completar entrevista, mejorar el prompt y aprobar brief, storyboard, contrato web,
   formato, referencias, prompt y costo máximo. Confirmar viabilidad con constructor.
2. Consultar estado:
   `./hooks/higgsfield-credit-guard.ps1 status`
3. Reservar el costo máximo:
   `./hooks/higgsfield-credit-guard.ps1 reserve -Credits <maximo> -JobId <id>`
4. Solo después, ejecutar una vez.
5. Confirmar cobro:
   `./hooks/higgsfield-credit-guard.ps1 commit -Credits <real> -JobId <id>`
6. Usar `release` únicamente si se confirmó cancelación sin cobro.

Si no se conoce el máximo, la reserva falla o el estado del trabajo es incierto, se
detiene. No dividir para eludir el límite ni repetir por timeout. Para presets o
comandos nombrados, además se usa la skill oficial `higgsfield`.

El hook impone el límite dentro del flujo del repositorio. Si la plataforma ofrece un
límite de cuenta, debe fijarse también en 200 para impedir gasto manual externo.
