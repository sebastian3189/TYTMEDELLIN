import media from './media.json' with { type: 'json' };

import { company, whatsapp } from './company.js';
export { company, whatsapp };
// Fotos oficiales de Medellín (ronda 2026-10-12): `media.json` ya trae, por experiencia, la portada y la galería en el MISMO orden y con la MISMA
// cantidad que la ficha oficial (tnt-colombia-connect, sedes.ts), copiadas en WebP con su escalera de anchos (ver scripts/prepare-oficial.py).
// `FOCUS`: punto focal del recorte 4:5 de la portada. Traslados JMC: la portada oficial trae un cartel de broma en el centro; el recorte de
// tarjeta/ficha se desplaza a la derecha para no mostrarlo (la foto sigue siendo la oficial; ver el informe de la ronda).
const FOCUS = { 'traslados-aeropuerto-jmc': '92% 50%' };
export const photos = (slug) => {
  const items = media[slug] || [];
  if (slug === 'equipo') return [items[3], ...items.slice(0, 3)].filter(Boolean);
  if (FOCUS[slug]) return items.map((item, i) => i === 0 ? { ...item, focus: FOCUS[slug] } : item);
  return items;
};
import { rawTours } from './tours-text.js';
// Galería y visor: fotos que se muestran ampliadas. Traslados JMC: la portada oficial (índice 0, con un cartel inapropiado) queda recortada en
// tarjeta y ficha (FOCUS) y se RETIRA de la galería, las miniaturas, el contador y el visor (decisión del usuario, 2026-10-12).
const GALLERY_EXCLUDE = { 'traslados-aeropuerto-jmc': [0] };
// Cabecera de la ficha: Nápoles tiene una portada oficial de solo 480 px (se ampliaba a 426 px CSS y a 2x en móvil); la cabecera usa la primera foto de
// la galería (1200×1600, oficial) y la portada de 480 px sigue siendo la de la tarjeta. El orden de la galería no cambia.
const HERO = { 'hacienda-napoles': 1 };
export const tours = rawTours.map(([slug,name,category,title,description,moments,stories,advice,mood],index) => {
  const images = photos(slug), skip = GALLERY_EXCLUDE[slug] || [];
  return {slug,name,category,title,description,moments,stories,advice,mood,number:String(index+1).padStart(2,'0'),images,gallery:images.filter((_,i)=>!skip.includes(i)),hero:images[HERO[slug]||0]};
});
export const values = [
 ['Confianza','Te contamos qué esperar y confirmamos las condiciones antes de salir.'],
 ['Calidad','Los detalles importan: desde el primer mensaje hasta el punto de regreso.'],
 ['Seguridad','Planeamos teniendo en cuenta las personas, la ruta y las condiciones del recorrido.'],
 ['Compromiso','Escuchamos tu propósito y damos seguimiento a lo acordado.'],
 ['Sencillez','Información comprensible y una conversación directa para organizarte.'],
 ['Servicio','Hospitalidad, respeto y disposición para acompañar a cada viajero.'],
];
// Categorías, capacidades, descripciones y equipamiento: sitio oficial de la marca (tnt-colombia-connect, src/data/content.ts «flota» y `feat`, 2026-10-12/14),
// copiados literalmente; los iconos son los equivalentes de línea (icons.jsx). No se añade ningún equipamiento que la fuente no declare.
export const FEATURES = {
 ac:['snowflake','Aire acondicionado'], cuero:['armchair','Asientos en cuero'], wifi:['wifi','WiFi a bordo'], usb:['usb','Cargadores USB'], sonido:['music','Sistema de sonido'],
 equipaje:['luggage','Espacio para equipaje'], reclinables:['armchair','Asientos reclinables'], panoramicas:['frame','Ventanas panorámicas'], microfono:['mic','Micrófono para el guía'],
 nevera:['refrigerator','Nevera'], led:['lightbulb','Iluminación LED ambiental'], entretenimiento:['monitorPlay','Sistema de entretenimiento'], climaDual:['thermometer','Control de clima dual'],
};
export const vehicles = [
 ['Sedán Ejecutivo','1–3','Para viajes ejecutivos y traslados al aeropuerto de una a tres personas. Confirma el espacio de equipaje según tu viaje.',['ac','cuero','wifi','usb','sonido']],
 ['SUV Ejecutiva','1–4','Para grupos pequeños que buscan comodidad en traslados y rutas regionales. Consulta la unidad adecuada para tu recorrido.',['equipaje','cuero','entretenimiento','wifi','climaDual']],
 ['Van Ejecutiva','1–8','Para familias o equipos pequeños, con asientos individuales. Comparte cuántas maletas llevan para confirmar el espacio disponible.',['reclinables','equipaje','wifi','ac']],
 ['Van Master','1–14','Amplia y cómoda para grupos medianos: excursiones, equipos de trabajo y traslados con equipaje. Consulta su disponibilidad para tu recorrido.',['reclinables','equipaje','ac','sonido']],
 ['Van Sprinter','1–17','Para recorridos en grupo, con ventanas panorámicas. Consulta la disponibilidad y el espacio de equipaje para tu salida.',['reclinables','sonido','panoramicas','equipaje','microfono']],
 ['Buses','25–40','Ideal para grupos grandes, eventos corporativos y excursiones extendidas. Disponibles en configuraciones de 25, 35 y 40 pasajeros.',['reclinables','entretenimiento','nevera','led']],
].map(([name,capacity,use,features],i)=>({name,capacity,use,features:features.map(k=>({key:k,icon:FEATURES[k][0],label:FEATURES[k][1]})),image:photos('vehiculos')[i]}));
/*
 * ARTÍCULOS DEL BLOG: único archivo de datos del blog (el índice /blog, la fila «Recientes», el libro del inicio, el prerender y el sitemap leen este arreglo).
 * Para añadir una nota agrega un objeto (el PRIMERO es el artículo destacado):
 *   { slug:'mi-nota', title:'…', tag:'Categoría', image:<foto de media.json: tours[i].images[0] o photos('equipo')[0]>, intro:'resumen de 1–2 frases',
 *     sections:[['Subtítulo','Párrafo'], …], date:'2026-10-14' (opcional, ISO), minutes:4 (opcional) }
 * Las categorías (`tag`) se vuelven filtros solas cuando hay 2 o más. Fecha y tiempo de lectura solo se muestran si existen (hoy: PENDIENTE CLIENTE).
 * Con más de 12 notas aparece «Cargar más»; la ruta /blog/<slug> y el sitemap se generan solos.
 */
export const articles = [
 {slug:'preparar-tu-recorrido',imageAlt:'Grupo de viajeros en una plaza empedrada, con iglesia blanca y fachadas de balcones al fondo',title:'Cómo preparar tu recorrido desde Medellín',tag:'Planeación',image:tours[0].images[0],intro:'Organizar un recorrido es más sencillo cuando la conversación empieza por lo importante.',sections:[['La fecha y el punto de partida','Comparte el día y la dirección desde la que quieres salir. Si llegas en avión, incluye tu número de vuelo cuando hables con el equipo.'],['Quiénes van contigo','La cantidad de personas, el equipaje y las necesidades de movilidad ayudan a proponer un vehículo y un ritmo adecuados.'],['Lo que esperas del día','Cuéntanos qué te interesa y cuánto tiempo tienes. Antes de confirmar, revisa las paradas, los servicios incluidos, el valor y las condiciones de cambio.']]},
 {slug:'elegir-tu-experiencia',imageAlt:'Tres viajeras frente a la base de la Piedra del Peñol y su escalera',title:'Qué experiencia elegir desde Medellín',tag:'Inspiración',image:tours[1].images[0],intro:'No hay una única forma de descubrir Medellín y los recorridos que parten desde aquí. Elige según lo que quieras sentir.',sections:[['Ciudad para escuchar historias','El City Tour y la Comuna 13 acercan arte y vida urbana. El recorrido de compras pone el acento en el comercio local.'],['Pueblos para cambiar de ritmo','Guatapé, Santa Fe, Jardín y Oriente ofrecen maneras diferentes de acercarse al territorio. Consulta tiempos de traslado antes de llenar tu agenda.'],['Naturaleza para mirar de cerca','El café y el Salto del Buey proponen experiencias al aire libre distintas. Describe tus preferencias y condición para que el equipo oriente el plan.']]},
 {slug:'viajar-en-grupo',imageAlt:'Grupo de personas junto a automóviles y vans en una calle de Medellín',title:'Cómo organizar un viaje en grupo desde Medellín',tag:'En grupo',image:photos('equipo')[0],intro:'Una familia, una agencia o un equipo de trabajo: cada grupo tiene su propio ritmo.',sections:[['Acordar un punto de encuentro','Una dirección precisa y una persona de contacto simplifican el comienzo. Confirma si habrá recogidas adicionales.'],['Pensar en el equipaje','El número de asientos no cuenta toda la historia. Comparte cuántas maletas llevan y cualquier requerimiento especial.'],['Dejar espacio para disfrutar','Revisa con el equipo las pausas y prioridades. Un itinerario claro también debe considerar el tiempo que cada persona necesita.']]},
];
