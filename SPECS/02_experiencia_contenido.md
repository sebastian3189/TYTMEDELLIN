# Spec 02 — Experiencia, contenido y conversión

**Depende de:** Spec 01  
**Dueños:** `director-diseno-marca` y `constructor-producto`

## Mapa

```text
/
├── /servicios
│   └── /servicios/{slug}
├── /experiencias
│   └── /experiencias/{slug}
├── /vehiculos (alias /flota)
├── /nosotros
├── /blog
│   └── /blog/{slug}
├── /calificaciones
├── /cotizar
├── /contacto
└── /privacidad
```

Navegación: Inicio · Experiencias · Servicios · Vehículos · Nosotros · Blog · Contacto ·
**Cotizar**. Medellín es el contexto permanente, no una opción de selector.

## Flujos principales

```text
entrada → servicio/experiencia → detalle → cotizar → confirmación
entrada → inicio → confianza → oferta → WhatsApp contextual
entrada corporativa → servicios → capacidad → solicitar propuesta
```

La persona conserva el contexto de lo que veía. Ningún flujo principal requiere más
de dos acciones para empezar una cotización.

## Benchmark aplicado

- T&T Bogotá aporta la secuencia: propuesta, confianza, oferta, galería, prueba y CTA;
  no se copian sus cifras, testimonios, registros, cobertura ni datos de contacto.
- T&T Colombia aporta el patrón de contacto: nombre, empresa opcional, correo,
  teléfono, personas, tipo de solicitud, mensaje, honeypot y autorización.
- Para Medellín se conserva una sola promesa local y se eliminan selectores o bloques
  de Bogotá, Cartagena, Eje Cafetero y cobertura nacional.

## Modelo de contenido

Catálogo verificado de la sede: City Tour & Comuna 13, Guatapé y Piedra del Peñol,
Noche en Medellín, Vuelta a Oriente, Tour del Café, Hacienda Nápoles, Salto del Buey,
Santa Fe de Antioquia, Jardín, Tour de Compras, Tour Miradores y Traslados JMC.
Cada ficha incluye narrativa propia, tres capítulos, recomendaciones, galería
ampliable, formulario contextual y acceso a las opiniones de la empresa.
El catálogo admite búsqueda y filtros. La fuente de datos es `site/src/content.js`.

- `Servicio`: slug, nombre, resumen, necesidad, beneficios, cobertura, requisitos,
  imágenes, preguntas y CTA.
- `Experiencia`: slug, resumen, duración, incluye, no incluye, encuentro,
  recomendaciones, galería, disponibilidad declarativa y CTA.
- `Vehiculo`: categoría, capacidad, equipamiento, usos, accesibilidad e imágenes.
- `Testimonio`: autor autorizado, contexto, texto y fuente.
- `DatoEmpresa`: contactos, horario, dirección y datos legales.

Los campos no confirmados no se renderizan. No se muestran etiquetas vacías.

## Voz y copy

Español colombiano claro, local, cálido y profesional. Frases cortas y precisión
operativa. Usar “cotizar” mientras no exista confirmación dentro del sistema; usar
“reservar” solo cuando la reserva sea real.

Prohibido publicar superlativos, urgencia, cifras, precios, certificaciones, clientes,
cobertura, horarios o testimonios sin fuente. Los CTA describen la acción: “Cotizar
este servicio” y “Consultar por WhatsApp”, no “Ver más”.

## Conversión

El formulario mínimo incluye nombre, teléfono/WhatsApp, correo cuando corresponda,
tipo de solicitud, datos operativos necesarios, mensaje opcional y autorización de
datos no premarcada. El contexto de página o elemento viaja preseleccionado y puede
ser revisado.

Estados obligatorios: reposo, validación junto al campo, enviando sin duplicados,
éxito confirmado por backend y error recuperable que conserva los datos.

WhatsApp usa el número oficial y un mensaje codificado con el contexto. Nunca se
publica un número provisional ni se mide el contenido del mensaje.

Entrega local actual: el formulario valida, muestra un resumen y permite copiarlo;
el viajero abre WhatsApp y decide pegar/enviar los datos. El enlace solo contiene
el nombre del recorrido, nunca nombre/teléfono/correo del viajero. No hay envío a
backend ni confirmación de reserva. Si se implementa backend, aplican todos los
estados de servidor anteriores. No se afirma que el flujo actual capture leads.

## URLs y navegación

Slugs en minúscula con guiones. Un canonical por contenido. 404 real y útil. La
primera versión es en español; un idioma adicional requiere URLs propias y alcance
aprobado, no solo un interruptor visual.

## Compuerta

- [ ] Mapa y navegación aprobados.
- [ ] Wireframes móvil y escritorio aprobados.
- [ ] Contenido con fuente o `PENDIENTE CLIENTE`.
- [ ] Flujo de cotización completo y responsable confirmado.
- [ ] WhatsApp y mensaje contextual verificados.
- [ ] Slugs aprobados antes de indexar.


## Mensajes de marca (aportados por el cliente, 2026-10-12)

Datos entregados por el cliente; las afirmaciones de la propuesta de valor se
consideran verificadas por el cliente. Fuente: guía de marca del cliente.

**1. Frases que identifican la marca**

| Frase | Función |
|---|---|
| «Experiencias a otro nivel» | Lema principal; promesa de valor de Transporte y Turismo |
| «Medellín a tu ritmo» | Libertad, flexibilidad, recorridos sin las limitaciones de un tour masivo |
| «Medellín a otro nivel» | Adaptación del lema para la página principal de la ciudad |
| «No solo visites Medellín. Vívela.» | Frase emocional: vivir experiencias en lugar de solo visitar lugares |
| «Tu viaje, tus tiempos, tu experiencia» | Filosofía de personalización |

**2. Universo de palabras clave**

- Identidad de marca: Exclusividad, Libertad, Confianza, Autenticidad, Calidad,
  Cercanía, Hospitalidad, Personalización, Emociones, Recuerdos inolvidables.
- Propuesta de valor: Tours 100% privados, Experiencias a medida, Guía-conductor
  exclusivo, Vehículo privado, Horarios flexibles, Atención personalizada, Sin grupos
  masivos, A tu propio ritmo, Comodidad y seguridad.
- Emociones: Descubre, Explora, Siente, Conecta, Vive, Sorpréndete, Disfruta,
  Inspírate, Recuerda, Enamórate de Medellín.

**3. Palabras clave SEO para Google:** el cliente anunció la sección pero no entregó
la lista. `PENDIENTE CLIENTE`. No se inventan términos ni volúmenes.

**Reglas de uso**

1. Jerarquía: lema «Experiencias a otro nivel» (firma de marca) > «Medellín a otro
   nivel» (solo inicio) > «Medellín a tu ritmo» (promesa de libertad) > «No solo
   visites Medellín. Vívela.» (emoción, una vez por página) > «Tu viaje, tus tiempos,
   tu experiencia» (cotización/personalización).
2. Un solo lema visible por pantalla. «Otro nivel» aparece como máximo dos veces en el
   inicio (lema + una más); nunca en titulares de cada sección.
3. «A tu ritmo» y «a tu manera» no se mezclan en la misma pantalla. El cliente solo
   aporta «a tu ritmo»; «a tu manera» queda como variante ya aprobada para la baraja.
4. Las palabras-emoción encabezan frases cortas; no se encadenan más de una por línea.
5. Las afirmaciones «100% privado», «guía-conductor exclusivo», «sin grupos masivos» y
   «horarios flexibles» solo como microcopy de confianza, no como garantía de cada ficha
   (las condiciones de cada recorrido se confirman al cotizar).
6. Sin cifras, precios, años, reseñas ni premios fuera de lo aportado.

## APROBADO (usuario, 2026-10-12) — copy del inicio, concepto H1 «La baraja de recuerdos»

Aprobado completo, incluido el cambio del titular a «Medellín,» / «a tu ritmo.»
(sustituye a «a tu manera.»). Pendiente de implementación y auditoría.

**Cambio del usuario (2026-10-14):** se retira la frase «Un grupo reunido frente al
Palacio de la Cultura.» (subtítulo de la fase c2 del inicio).

**Cambio del usuario (2026-10-12):** el titular pasa a «Medellín,» / «a otro nivel.»
(sustituye a «a tu ritmo.»). Pendiente: el eyebrow «Experiencias a otro nivel» repite
«otro nivel» en la misma pantalla (regla de uso de este spec); decisión del usuario.
Navegación: añadir «Inicio». Vehículos: fotos de `webp/` aportadas por el usuario.
WhatsApp de Medellín confirmado por el usuario: +57 304 496 1698. Redes: el usuario
elige las de la sede Medellín (Instagram @transporteenmedellin, TikTok @tytmedellin
según `sedes.ts` oficial); Facebook de Medellín `PENDIENTE CLIENTE`. Eyebrow
«Experiencias a otro nivel» sobre «Medellín, a otro nivel.»: el usuario decide
mantener la repetición.
Portada oficial de Traslados JMC (contiene un cartel inapropiado): el usuario decide
dejarla RECORTADA en tarjeta y ficha y retirarla de la galería y del visor. Tour de
Compras se incluye en «Un lugar para cada forma de viajar» con sus 3 fotos oficiales. Logo maestro: sigue
`PENDIENTE CLIENTE` (no usar `TYTLOGO.jpeg` ni `tyt-logo-96.webp`). X/Twitter: sin URL,
`PENDIENTE CLIENTE`.

**Pedido del usuario (2026-10-12), siguiente ronda:** usar las fotos del proyecto oficial
`C:\Users\USUARIO\Desktop\TYTCOLOMBIA` (tnt-colombia-connect) para todo lo de Medellín:
cada experiencia con las mismas fotos y la misma cantidad que en el sitio oficial. Excepción:
la baraja inicial (primeras tarjetas) y la película del inicio se conservan tal cual.
Mejorar formularios y contacto con base en ese proyecto; mapa de la sede con la misma
ubicación que el sitio oficial. Todas esas fotos se usan en formato WebP (las del
proyecto oficial ya están en `.webp`; conservarlas así, con variantes por tamaño).

| Elemento | Propuesta |
|---|---|
| Titular partido | «Medellín,» / «a tu ritmo.» (recomendado; alternativa aprobada: «a tu manera.»; «a otro nivel» queda para el lema) |
| Lema visible | «Experiencias a otro nivel» |
| Frase de la fase del vídeo | «No solo visites Medellín. Vívela.» |
| Marquesina | MEDELLÍN · METROCABLE · COMUNA 13 · GUATAPÉ · PIEDRA DEL PEÑOL · SANTA FE DE ANTIOQUIA · JARDÍN · SALTO DEL BUEY · HACIENDA NÁPOLES |
| Cierre | «Tu viaje, tus tiempos, tu experiencia.» + CTA «Planeemos tu viaje» |
| Confianza | «Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles» |

Cartas (palabra-emoción + frase):

1. City Tour & Comuna 13 — Descubre: plazas, murales e historias de Medellín.
2. Guatapé y Peñol — Explora: agua entre montañas y zócalos de color.
3. Noche en Medellín — Siente: el valle cuando enciende sus luces.
4. Vuelta a Oriente — Conecta: con pueblos y plazas, sin carreras.
5. Tour del Café — Vive: el oficio detrás de cada taza.
6. Hacienda Nápoles — Disfruta: un día en familia, con transporte coordinado.
7. Salto del Buey — Sorpréndete: una cascada al final del sendero.
8. Santa Fe de Antioquia — Recuerda: calles coloniales y el Puente de Occidente.
9. Jardín — Enamórate: fachadas de color y plaza sin prisa.
10. Tour de Compras — Descubre: El Hueco, outlets y tiendas locales.
11. Tour Miradores — Inspírate: el valle cambia con la luz.
12. Traslados JMC — Conecta: del aeropuerto a tu alojamiento, coordinado.

Reemplazos recomendados en `site/src/inicio-textos.js` (si se aprueba): titular de
entrada «a tu manera.» por «a tu ritmo.»; `final.titular` «Tú eliges cómo vivirlo.»
puede conservarse o sustituirse por «Tu viaje, tus tiempos, tu experiencia.»; `c1`
«Nosotros conocemos el camino.» por «No solo visites Medellín. Vívela.». Los demás
titulares y subtítulos aprobados se conservan.


## Preguntas frecuentes — APROBADAS por el usuario 2026-10-14 (13 preguntas; las PENDIENTE CLIENTE no se publican)

Estado: propuesta del constructor-producto (skill `tt-contenido-conversion`); pendiente
de aprobación del usuario y de auditoría. Solo se publican respuestas con fuente.
Abreviaturas: `content.ts` = TYTCOLOMBIA/tnt-colombia-connect/src/data/content.ts;
`tour-info` = site/src/tour-info.json; `content.js` = site/src/content.js.

| # | Grupo | Pregunta | Respuesta (≤60 palabras) | Fuente |
|---|---|---|---|---|
| 1 | Reservas y cotización | ¿Cómo cotizo mi viaje? | Cuéntanos fechas, número de personas, punto de salida y llegada, y equipaje. Puedes hacerlo desde el formulario de cotización o escribirnos por WhatsApp al +57 304 496 1698. | [content.ts:faqCorporativa[1]; SPECS/02 §Conversión; company.js:whatsapp] |
| 2 | Reservas y cotización | ¿Cotizar es lo mismo que reservar? | No. La cotización no confirma una reserva. Primero revisamos contigo la experiencia, las fechas y el número de viajeros; luego confirmas con el equipo. | [content.ts:faqViajero[2]] |
| 3 | Recorridos y experiencias | ¿Los recorridos son privados? | Sí, es nuestra propuesta: tours 100% privados, con guía-conductor exclusivo, vehículo privado y sin grupos masivos. Los horarios son flexibles; las condiciones de cada recorrido se confirman al cotizar. | [SPECS/02 §Mensajes de marca, regla 5] |
| 4 | Recorridos y experiencias | ¿Qué incluye una experiencia? | En las fichas: transporte privado, vehículos cómodos, conductores y guías profesionales, atención personalizada, y fotos y videos del recorrido. Confirma paradas, entradas y alimentación en tu propuesta antes de reservar. | [tour-info:*.incluye; content.ts:faqViajero[0]] |
| 5 | Recorridos y experiencias | ¿Dónde empieza el recorrido? | En la mayoría de experiencias, con la recogida en tu hotel en Medellín. Dinos tu alojamiento o punto de salida y confirmaremos el lugar de encuentro y si hay costos adicionales. | [tour-info:*.punto; content.ts:faqViajero[1]] |
| 6 | Recorridos y experiencias | ¿Puedo adaptar el recorrido a mi grupo? | Sí, cuéntanos qué lugares quieres visitar, cuánto tiempo tienes y qué necesitas. Revisaremos contigo las opciones disponibles para que sea tu viaje, tus tiempos, tu experiencia. | [Tour.jsx:faq «¿Se puede adaptar…»; content.ts:faqViajero[3]] |
| 7 | Recorridos y experiencias | ¿Cómo elijo entre ciudad, pueblos o naturaleza? | Ciudad para historias y arte urbano; pueblos para cambiar de ritmo; naturaleza para mirar de cerca. Consulta los tiempos de traslado antes de llenar la agenda y cuéntanos tus preferencias. | [content.js:articles «elegir-tu-experiencia»] |
| 8 | Traslados aeropuerto | ¿Cómo funciona el traslado desde el aeropuerto? | Coordinamos el traslado entre el Aeropuerto José María Córdova y tu alojamiento en Medellín, con seguimiento del vuelo. Comparte tu número de vuelo, dirección y número de pasajeros. | [tour-info:traslados-aeropuerto-jmc.descripcion, .ampliada] |
| 9 | Traslados aeropuerto | ¿Qué pasa si mi vuelo cambia de hora? | El servicio incluye seguimiento del vuelo y ajustamos la recogida según tu número de vuelo. Las condiciones de espera y el punto de encuentro se confirman con el equipo. | [tour-info:traslados-aeropuerto-jmc.ampliada, .recomendaciones] |
| 10 | Vehículos y grupos | ¿Qué vehículos tienen y para cuántas personas? | Sedán Ejecutivo (1–3), SUV Ejecutiva (1–4), Van Ejecutiva (1–8), Van Master (1–14), Van Sprinter (1–17) y buses (25–40). La unidad y su disponibilidad se confirman al cotizar. | [content.js:vehicles; content.ts:flota] |
| 11 | Vehículos y grupos | ¿Atienden empresas y grupos? | Sí: puedes consultar transporte para equipos de trabajo, eventos y grupos. Indica horarios, rutas y número de pasajeros para preparar la propuesta. | [content.ts:faqCorporativa[3]; content.js:vehicles] |
| 12 | Pagos y precios | ¿Qué debo confirmar antes de contratar? | Revisa el valor total, las inclusiones, el horario, el vehículo propuesto y las condiciones de pago y cancelación con el equipo que atiende tu solicitud. | [content.ts:faqCorporativa[2]; Tour.jsx:faq «¿Qué debo confirmar sobre el precio?»] |
| 13 | Antes de viajar | ¿Qué debo preparar antes del recorrido? | Ten a la mano fecha, punto de partida y, si llegas en avión, tu número de vuelo. Cada ficha trae recomendaciones propias, como calzado cómodo para los miradores o la cámara con espacio. | [content.js:articles «preparar-tu-recorrido»; tour-info:*.recomendaciones] |

Notas de redacción: «Sí» en 6 y 11 se apoya en que la fuente invita a consultar; si
el auditor lo considera promesa, usar «Puedes consultarlo:». Respuesta 5 dice «en la
mayoría»: confirmar por ficha (el traslado JMC también admite la terminal).

### Requiere respuesta del cliente — PENDIENTE CLIENTE (no publicar)

1. Cancelación, cambios y reembolsos: define riesgo económico y legal del viajero.
2. Medios de pago, anticipo y facturación: decide la confianza al contratar.
3. Idiomas de los guías-conductores (la versión EN no basta como prueba).
4. Seguros, pólizas y requisitos de seguridad del servicio.
5. Duración y hora de salida de cada experiencia (no hay dato verificado).
6. Qué NO incluye cada experiencia (entradas, alimentación, propinas).
7. Niños, edad mínima y mascotas.
8. Accesibilidad y movilidad reducida (vehículos y senderos).
9. Clima: ¿se reprograma un recorrido por lluvia?
10. Tiempo de espera gratuito y señalización en el aeropuerto.
11. Precios de referencia: solo si el cliente autoriza publicarlos.
12. Horario de atención del equipo y tiempo de respuesta a cotizaciones.

### Ubicación y marcado

- Inicio: 4–5 preguntas (1, 2, 3, 6, 12) antes del cierre «Tu viaje, tus tiempos…».
- /contacto y /cotizar: 1, 2, 11, 12 junto al formulario (reducen dudas antes de enviar).
- Fichas: grupo Recorridos (4, 5, 6) fusionado con las tres FAQ actuales; ficha de
  Traslados JMC: 8, 9. /vehiculos: 10, 11.
- JSON-LD `FAQPage` solo con las 13 respuestas publicadas, texto idéntico al visible,
  una vez por página (solo las preguntas mostradas en esa página). Nada de PENDIENTE.
- EN: el sitio sí tiene patrón (`site/src/locales/en.json`, clave = cadena en español,
  vía `i18n.js`). Las traducciones de estas preguntas NO existen todavía: añadirlas
  como claves nuevas, revisión del usuario pendiente; el proyecto oficial aporta EN
  para las filas 1, 2, 5, 6, 11, 12 (content.ts) como base.
- Criterio medible: clics en WhatsApp/cotizar desde páginas con FAQ frente a sin FAQ.

**Cambio del usuario (2026-10-14):** se retira la barra móvil de cotizar (QuoteBar con
WhatsApp + «Cotizar») de las fichas: es redundante con el botón flotante de WhatsApp y el
formulario de la página. **Actualización posterior del mismo día:** el usuario pide en
móvil que, al bajar en una ficha, el WhatsApp flotante se oculte un momento y aparezca
una barra con el nombre del tour y «Cotizar por WhatsApp»; al subir o detenerse vuelve el
flotante. Nunca ambos a la vez. Pie de página siempre oscuro, con silueta propia de
Medellín en negro; RNT 176384 y NIT 901738550-6. Ajuste del usuario: en MODO OSCURO
el pie es NARANJA con la silueta de la ciudad también naranja (texto en tinta oscura
con contraste AA); en modo claro, pie oscuro con silueta negra. Dominio publicado provisional:
tytmedellin.vercel.app.

## Respuestas del cliente a las FAQ pendientes (aportadas por el usuario, 2026-10-14)

Datos verificados por el cliente; se publican con su texto (edición mínima de estilo
permitida, sin cambiar condiciones, porcentajes ni plazos). La pregunta 11 (precios de
referencia) NO fue respondida: sigue `PENDIENTE CLIENTE` y no se publica.

**1. Cancelación, cambios y reembolsos.** Entendemos que los planes pueden cambiar. Por
eso, ofrecemos alternativas de reprogramación sujetas a disponibilidad. Para
cancelaciones, manejamos las siguientes condiciones sobre el anticipo recibido:
más de 15 días de anticipación: devolución del 60 %; entre 8 y 14 días: devolución del
20 %; con 7 días o menos: no aplica devolución. Las solicitudes de cambio de fecha están
sujetas a disponibilidad y a las condiciones de la reserva.
> Corrección aprobada por el usuario (2026-10-14): publicar «15 días o más de
> anticipación: devolución del 60 %» en lugar de «más de 15 días».

**2. Medios de pago, anticipo y facturación.** Para confirmar una experiencia
solicitamos un anticipo del 30 % del valor total. El 70 % restante puede cancelarse
durante o al finalizar la experiencia. Contamos con enlaces de pago electrónicos seguros
y opciones de pago en pesos colombianos (COP). Para algunos servicios de traslado
aeroportuario, el anticipo puede ser del 50 %. Emitimos certificados de reserva y
contamos con facturación electrónica según los datos suministrados por el cliente.

**3. Idiomas de los guías.** Nuestros servicios se ofrecen principalmente en español.
También contamos con guías bilingües en inglés y podemos coordinar acompañamiento en
portugués u otros idiomas, previa solicitud y según disponibilidad.

**4. Seguros y pólizas.** Trabajamos con vehículos de servicio especial debidamente
habilitados, documentación vigente y las coberturas reglamentarias correspondientes,
incluyendo SOAT y seguros aplicables al transporte contratado. Contamos con el Registro
Nacional de Turismo RNT 176384 y NIT 901738550-6.

**5. Duración y hora de salida.** Nuestras experiencias son privadas, por lo que
ofrecemos flexibilidad para ajustar los horarios según las necesidades del viajero.

| Experiencia | Duración y salida de referencia |
|---|---|
| City Tour Medellín + Comuna 13 | 9 horas, desde las 9:00 a. m. |
| Guatapé y Piedra del Peñol | 10 horas aprox., desde las 8:30 a. m. |
| Tour de Miradores | 4 a 5 horas, horario flexible |
| Tour Nocturno Medellín | Horario acordado con el cliente |
| Hacienda Nápoles | Día completo, desde las 5:00 a. m. |
| Tour Vuelta Oriente | Según itinerario contratado |
| Tour del Café | Según lugar de salida e itinerario |
| Transporte privado por horas | Mínimo 4 horas |

Los horarios pueden modificarse dependiendo del lugar de recogida, tráfico, condiciones
climáticas e itinerario. (Sin dato del cliente: Santa Fe de Antioquia, Jardín, Salto
del Buey, Tour de Compras y Traslados JMC → no mostrar duración en esas fichas;
el usuario confirma omitirlo por ahora, 2026-10-14.)

**6. Qué no incluye.** Salvo que la cotización indique expresamente lo contrario,
nuestros servicios no incluyen entradas a parques o atracciones, compras personales,
propinas ni actividades adicionales. Cada propuesta comercial especifica claramente los
servicios incluidos y los costos que corren por cuenta del viajero.

**7. Niños, edad mínima y mascotas.** ¡Las familias son bienvenidas! Los bebés pueden
viajar sin costo adicional, de acuerdo con las condiciones de la reserva y la capacidad
del vehículo. No manejamos una edad mínima general para las experiencias, aunque algunas
atracciones pueden establecer restricciones particulares. También podemos recibir
mascotas, coordinando previamente sus condiciones de transporte para garantizar
comodidad y seguridad.

**8. Accesibilidad y movilidad reducida.** Buscamos adaptar nuestras experiencias a las
necesidades de cada viajero. Si algún pasajero tiene movilidad reducida o requiere
asistencia especial, recomendamos informarlo antes de reservar para verificar el
vehículo apropiado, las condiciones del recorrido y la accesibilidad de los lugares que
desea visitar.

**9. ¿Qué pasa si llueve?** ¡La experiencia no tiene por qué detenerse! La mayoría de
nuestros recorridos pueden realizarse con lluvia moderada. Cuando las condiciones
climáticas afectan alguna actividad, buscamos ajustar el itinerario o proponer
alternativas, priorizando siempre la seguridad de nuestros viajeros.

**10. Tiempo de espera en el aeropuerto y señalización.** Realizamos seguimiento a los
vuelos para coordinar la llegada de nuestros pasajeros. Nuestro conductor se comunica
previamente y comparte las instrucciones del punto de encuentro, así como sus datos y los
del vehículo. En servicios previamente coordinados podemos ofrecer señalización
personalizada con el nombre del pasajero o grupo. Entendemos que pueden presentarse
demoras en migración, recogida de equipaje o vuelos, por lo que ofrecemos acompañamiento
y flexibilidad en la espera.

**12. Horario de atención y respuesta a cotizaciones.** Nuestra operación de transporte
cuenta con disponibilidad las 24 horas, mediante reserva previa. Brindamos asesoría
personalizada por nuestros canales digitales y WhatsApp. Nos esforzamos por responder
las solicitudes de cotización lo más pronto posible, teniendo en cuenta la
disponibilidad de nuestro equipo comercial. Nuestro compromiso es acompañar al viajero
desde la planeación hasta la finalización de su experiencia.

**Uso:** integrar 1–10 y 12 en las FAQ por página (Reservas/Pagos: 1, 2, 12; Recorridos:
3, 5, 6, 7, 8, 9; Traslados: 10; Confianza/legal: 4 en /nosotros o pie con RNT y NIT).
La duración de la tabla 5 se muestra además en la ficha de cada experiencia que la
tenga. EN: añadir claves a `site/src/locales/en.json` para revisión del usuario.

## «¿Qué nos hace diferentes?» — copy aportado por el usuario (2026-10-14), APROBADO para el inicio

Texto del cliente; se publica literal (los emojis se sustituyen por iconos SVG de línea
coherentes, como pidió el usuario para las flechas). Afirmaciones verificadas por el
cliente (incluye «flota propia», hidratación y fotos/videos sin costo, WhatsApp 24/7).

**Título:** ¿Qué nos hace diferentes?
**Entradilla:** No solo te llevamos a conocer Medellín. Nos encargamos de que vivas una
experiencia a otro nivel.
**Párrafo:** En Transporte y Turismo Medellín creemos que una experiencia extraordinaria
comienza mucho antes de subir al vehículo. Por eso, cuidamos cada detalle de tu viaje,
brindándote seguridad, comodidad, atención personalizada y el respaldo de un equipo
comprometido contigo.

1. (avión) **Monitoreamos tu vuelo.** Seguimos el estado de tu vuelo hasta su aterrizaje
   en Medellín para coordinar tu recogida y estar preparados ante posibles cambios de horario.
2. (vehículo) **Flota propia y vehículos certificados.** Contamos con vehículos modernos,
   habilitados y en óptimas condiciones, con mantenimiento preventivo y documentación al
   día para ofrecerte comodidad y seguridad.
3. (equipo) **Un equipo que responde por ti.** Guías, conductores y personal logístico
   trabajan bajo nuestros estándares de servicio. Coordinamos directamente cada
   experiencia, sin intermediarios innecesarios, para garantizar el control de calidad.
4. (gota) **Hidratación incluida.** Durante nuestras experiencias te ofrecemos agua e
   hidratación sin costo adicional. Porque los pequeños detalles también hacen grandes diferencias.
5. (globo) **Experiencias 100 % privadas.** Nada de grupos desconocidos ni recorridos
   masivos. Tu vehículo y tu experiencia son exclusivos para ti y tus acompañantes.
6. (reloj) **Flexibilidad en tus horarios.** Adaptamos nuestros recorridos a tus
   intereses y necesidades. Queremos que disfrutes cada destino a tu ritmo.
7. (cámara) **Recuerdos sin costo adicional.** Capturamos fotografías y videos durante
   tu experiencia para que te lleves recuerdos especiales de tu visita.
8. (escudo) **Seguridad y respaldo legal.** Somos una empresa legalmente constituida,
   con Registro Nacional de Turismo (RNT 176384). Operamos con vehículos habilitados y las
   coberturas y pólizas aplicables a nuestros servicios.
9. (mensaje) **Acompañamiento por WhatsApp 24/7.** Contamos con un canal de atención para
   ayudarte ante imprevistos, cambios de planes o cualquier situación relacionada con tu servicio.
10. (corazón) **Atención desde el primer contacto.** No solo organizamos recorridos.
    Escuchamos tus necesidades, te asesoramos y diseñamos experiencias que se ajustan a
    lo que realmente buscas.

**Cierre:** Transporte y Turismo Medellín — Experiencias a otro nivel. No es solamente a
dónde te llevamos. Es cómo te hacemos sentir durante todo el camino.

EN: añadir claves en `site/src/locales/en.json`; traducción PENDIENTE de revisión del usuario.

**Cambios del usuario (2026-10-14, tarde):** correo de contacto en todo el sitio:
transporteyturismomedellin@gmail.com (sustituye a transporteturismocolombia@gmail.com).
Logo en contenedor circular. Nueva subpágina local «Política de tratamiento de datos»
para Medellín con el texto oficial literal del sitio del grupo, adaptando solo los datos
del responsable (Transporte y Turismo Medellín, NIT 901738550-6, RNT 176384, Carrera 79AA
#1A Sur-280, Medellín, transporteyturismomedellin@gmail.com, +57 304 496 1698);
requiere revisión del consultor legal antes de publicar.

**Decisión del usuario (2026-10-14):** el video miniatura del inicio usa el reel
https://www.instagram.com/p/DdXYS5gJ-GH/ TAL CUAL, con su música original («DtMF», Bad
Bunny), por decisión expresa del usuario tras ser advertido de que la licencia de
Instagram no cubre el uso en la web y del riesgo de reclamos de derechos de autor. El
usuario asume ese riesgo. Pendiente: sustituirlo por la versión con solo la voz cuando
el cliente la aporte. Reproducción: silenciado por defecto (requisito de autoplay) con
botón para activar el sonido.

## Itinerarios por parada — aportado por el usuario 2026-10-15

Anexo de datos del cliente (no es un spec nuevo): [`SPECS/anexos/instrucciones_scroll_experiencias_TT.md`](anexos/instrucciones_scroll_experiencias_TT.md).
La sección «La experiencia» de cada ficha muestra una parada por escena (texto visible literal del anexo). Datos editables en `site/src/itinerarios.js`;
fotos en `site/public/media/itinerarios` (`site/scripts/prepare-itinerarios.py`). Jardín y Traslados JMC no figuran en el anexo: sus paradas/etapas
salen solo de datos ya verificados (sedes.ts oficial, tour-info.json, FAQ y diferenciadores aprobados) y requieren aprobación del cliente.

**Cumplimiento (2026-10-16):** el usuario confirma que las afiliaciones mostradas en la
franja de aliados (ANATO, COTELCO, Cámara de Comercio de Medellín, alcaldías, Hacienda
Nápoles, Google, Tripadvisor) están acreditadas; el cliente conserva los soportes. Siguen
pendientes para Términos y política: razón social exacta, responsable de PQR, fecha de
vigencia, inscripción en RNBD, postura sobre retracto, condiciones de cancelación por la
empresa y fuerza mayor, y redacción final del aviso ESCNNA validada por el asesor.
