/*
 * Preguntas frecuentes — fuente única (Spec 02: «Preguntas frecuentes — APROBADAS» 2026-10-14 + «Respuestas del cliente a las FAQ pendientes» 2026-10-14).
 * Las respuestas del cliente se publican con su texto (edición mínima de estilo). Correcciones aprobadas: devolución del 60 % con «15 días o más de anticipación».
 * La pregunta 11 de precios NO se publica (PENDIENTE CLIENTE: sin autorización). Las claves EN de estos textos están en locales/en.json (revisión del usuario pendiente).
 */
const A = {
  cotizar: ['¿Cómo cotizo mi viaje?', 'Cuéntanos fechas, número de personas, punto de salida y llegada, y equipaje. Puedes hacerlo desde el formulario de cotización o escribirnos por WhatsApp al +57 304 496 1698.'],
  reservar: ['¿Cotizar es lo mismo que reservar?', 'No. La cotización no confirma una reserva. Primero revisamos contigo la experiencia, las fechas y el número de viajeros; luego confirmas con el equipo.'],
  privados: ['¿Los recorridos son privados?', 'Sí, es nuestra propuesta: tours 100% privados, con guía-conductor exclusivo, vehículo privado y sin grupos masivos. Los horarios son flexibles; las condiciones de cada recorrido se confirman al cotizar.'],
  incluye: ['¿Qué incluye una experiencia?', 'En las fichas: transporte privado, vehículos cómodos, conductores y guías profesionales, atención personalizada, y fotos y videos del recorrido. Confirma paradas, entradas y alimentación en tu propuesta antes de reservar.'],
  donde: ['¿Dónde empieza el recorrido?', 'En la mayoría de experiencias, con la recogida en tu hotel en Medellín. Dinos tu alojamiento o punto de salida y confirmaremos el lugar de encuentro y si hay costos adicionales.'],
  adaptar: ['¿Puedo adaptar el recorrido a mi grupo?', 'Sí, cuéntanos qué lugares quieres visitar, cuánto tiempo tienes y qué necesitas. Revisaremos contigo las opciones disponibles para que sea tu viaje, tus tiempos, tu experiencia.'],
  elegir: ['¿Cómo elijo entre ciudad, pueblos o naturaleza?', 'Ciudad para historias y arte urbano; pueblos para cambiar de ritmo; naturaleza para mirar de cerca. Consulta los tiempos de traslado antes de llenar la agenda y cuéntanos tus preferencias.'],
  aeropuerto: ['¿Cómo funciona el traslado desde el aeropuerto?', 'Coordinamos el traslado entre el Aeropuerto José María Córdova y tu alojamiento en Medellín, con seguimiento del vuelo. Comparte tu número de vuelo, dirección y número de pasajeros.'],
  vuelo: ['¿Qué pasa si mi vuelo cambia de hora?', 'El servicio incluye seguimiento del vuelo y ajustamos la recogida según tu número de vuelo. Las condiciones de espera y el punto de encuentro se confirman con el equipo.'],
  vehiculos: ['¿Qué vehículos tienen y para cuántas personas?', 'Sedán Ejecutivo (1–3), SUV Ejecutiva (1–4), Van Ejecutiva (1–8), Van Master (1–14), Van Sprinter (1–17) y buses (25–40). La unidad y su disponibilidad se confirman al cotizar.'],
  empresas: ['¿Atienden empresas y grupos?', 'Sí: puedes consultar transporte para equipos de trabajo, eventos y grupos. Indica horarios, rutas y número de pasajeros para preparar la propuesta.'],
  confirmar: ['¿Qué debo confirmar antes de contratar?', 'Revisa el valor total, las inclusiones, el horario, el vehículo propuesto y las condiciones de pago y cancelación con el equipo que atiende tu solicitud.'],
  preparar: ['¿Qué debo preparar antes del recorrido?', 'Ten a la mano fecha, punto de partida y, si llegas en avión, tu número de vuelo. Cada ficha trae recomendaciones propias, como calzado cómodo para los miradores o la cámara con espacio.'],
  // Respuestas del cliente (1–10 y 12; la 11, de precios, no se publica).
  cancelacion: ['¿Cuál es la política de cancelación, cambios y reembolsos?', 'Entendemos que los planes pueden cambiar. Por eso, ofrecemos alternativas de reprogramación sujetas a disponibilidad. Para cancelaciones, manejamos las siguientes condiciones sobre el anticipo recibido: 15 días o más de anticipación: devolución del 60 %; entre 8 y 14 días: devolución del 20 %; con 7 días o menos: no aplica devolución. Las solicitudes de cambio de fecha están sujetas a disponibilidad y a las condiciones de la reserva.'],
  pagos: ['¿Cuáles son los medios de pago, el anticipo y la facturación?', 'Para confirmar una experiencia solicitamos un anticipo del 30 % del valor total. El 70 % restante puede cancelarse durante o al finalizar la experiencia. Contamos con enlaces de pago electrónicos seguros y opciones de pago en pesos colombianos (COP). Para algunos servicios de traslado aeroportuario, el anticipo puede ser del 50 %. Emitimos certificados de reserva y contamos con facturación electrónica según los datos suministrados por el cliente.'],
  idiomas: ['¿En qué idiomas atienden los guías?', 'Nuestros servicios se ofrecen principalmente en español. También contamos con guías bilingües en inglés y podemos coordinar acompañamiento en portugués u otros idiomas, previa solicitud y según disponibilidad.'],
  seguros: ['¿Qué seguros y pólizas respaldan el servicio?', 'Trabajamos con vehículos de servicio especial debidamente habilitados, documentación vigente y las coberturas reglamentarias correspondientes, incluyendo SOAT y seguros aplicables al transporte contratado. Contamos con el Registro Nacional de Turismo RNT 176384 y NIT 901738550-6.'],
  horarios: ['¿Cuánto dura la experiencia y a qué hora sale?', 'Nuestras experiencias son privadas, por lo que ofrecemos flexibilidad para ajustar los horarios según las necesidades del viajero.'],
  noincluye: ['¿Qué no incluye una experiencia?', 'Salvo que la cotización indique expresamente lo contrario, nuestros servicios no incluyen entradas a parques o atracciones, compras personales, propinas ni actividades adicionales. Cada propuesta comercial especifica claramente los servicios incluidos y los costos que corren por cuenta del viajero.'],
  ninos: ['¿Pueden viajar niños, bebés o mascotas?', '¡Las familias son bienvenidas! Los bebés pueden viajar sin costo adicional, de acuerdo con las condiciones de la reserva y la capacidad del vehículo. No manejamos una edad mínima general para las experiencias, aunque algunas atracciones pueden establecer restricciones particulares. También podemos recibir mascotas, coordinando previamente sus condiciones de transporte para garantizar comodidad y seguridad.'],
  accesibilidad: ['¿Hay opciones de accesibilidad o para movilidad reducida?', 'Buscamos adaptar nuestras experiencias a las necesidades de cada viajero. Si algún pasajero tiene movilidad reducida o requiere asistencia especial, recomendamos informarlo antes de reservar para verificar el vehículo apropiado, las condiciones del recorrido y la accesibilidad de los lugares que desea visitar.'],
  lluvia: ['¿Qué pasa si llueve?', '¡La experiencia no tiene por qué detenerse! La mayoría de nuestros recorridos pueden realizarse con lluvia moderada. Cuando las condiciones climáticas afectan alguna actividad, buscamos ajustar el itinerario o proponer alternativas, priorizando siempre la seguridad de nuestros viajeros.'],
  espera: ['¿Cuánto esperan en el aeropuerto y cómo me identifico?', 'Realizamos seguimiento a los vuelos para coordinar la llegada de nuestros pasajeros. Nuestro conductor se comunica previamente y comparte las instrucciones del punto de encuentro, así como sus datos y los del vehículo. En servicios previamente coordinados podemos ofrecer señalización personalizada con el nombre del pasajero o grupo. Entendemos que pueden presentarse demoras en migración, recogida de equipaje o vuelos, por lo que ofrecemos acompañamiento y flexibilidad en la espera.'],
  atencion: ['¿Cuál es el horario de atención y en cuánto responden las cotizaciones?', 'Nuestra operación de transporte cuenta con disponibilidad las 24 horas, mediante reserva previa. Brindamos asesoría personalizada por nuestros canales digitales y WhatsApp. Nos esforzamos por responder las solicitudes de cotización lo más pronto posible, teniendo en cuenta la disponibilidad de nuestro equipo comercial. Nuestro compromiso es acompañar al viajero desde la planeación hasta la finalización de su experiencia.'],
};
export const FAQ_ITEMS = Object.fromEntries(Object.entries(A).map(([k, [q, a]]) => [k, { id: k, q, a }]));
const pick = (...keys) => keys.map((k) => FAQ_ITEMS[k]);
// Selección por página (Spec 02 «Ubicación y marcado»).
export const FAQ_HOME = pick('cotizar', 'reservar', 'privados', 'adaptar', 'cancelacion', 'pagos');
export const FAQ_CONTACT = pick('cotizar', 'reservar', 'empresas', 'confirmar', 'pagos', 'atencion');
export const FAQ_FLEET = pick('vehiculos', 'empresas', 'idiomas');
export const FAQ_ABOUT = pick('seguros', 'privados');
export const FAQ_TOUR = pick('incluye', 'donde', 'adaptar', 'noincluye', 'ninos', 'lluvia', 'cancelacion', 'pagos');
export const FAQ_TRANSFER = pick('aeropuerto', 'vuelo', 'espera', 'incluye', 'ninos', 'cancelacion', 'pagos');

/** Duración y salida por experiencia (tabla del cliente, Spec 02 respuesta 5). Sin dato del cliente: Santa Fe, Jardín, Salto del Buey, Compras y Traslados → no se muestra. */
export const DURACIONES = {
  'city-tour-comuna-13': '9 horas, desde las 9:00 a. m.',
  'guatape-piedra-del-penol': '10 horas aprox., desde las 8:30 a. m.',
  'tour-miradores': '4 a 5 horas, horario flexible',
  'tour-nocturno-medellin': 'Horario acordado con el cliente',
  'hacienda-napoles': 'Día completo, desde las 5:00 a. m.',
  'vuelta-a-oriente': 'Según itinerario contratado',
  'tour-del-cafe-medellin': 'Según lugar de salida e itinerario',
};
export const NOTA_HORARIOS = 'Los horarios pueden modificarse dependiendo del lugar de recogida, tráfico, condiciones climáticas e itinerario.';
