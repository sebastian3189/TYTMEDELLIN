import media from './media.json' with { type: 'json' };

import { company, whatsapp } from './company.js';
export { company, whatsapp };
// Selección fotográfica 2026-10-23, revisión 3 (site/fuentes/seleccion-fotos-2026-10-23.json; la genera scripts/prepare-fichas.py). `media.json` trae, por
// experiencia, listas PROPIAS y distintas: portada (carta de la baraja = carta de portada de la mano = 1.ª diapositiva; única repetición admitida; null =
// marcador de marca sin foto), cabecera (diaporama de la ficha, 16:9), galeria («Archivo de nuestros viajes» de la ficha) e inicio (mano de viaje del inicio).
// `catalogo` = diaporama de /experiencias. Fuera de la portada ninguna foto está en dos listas (scripts/check-fotos-unicas.py).
export const photos = (slug) => {
  const items = Array.isArray(media[slug]) ? media[slug] : [];
  if (slug === 'equipo') return [items[3], ...items.slice(0, 3)].filter(Boolean);
  return items;
};
export const catalogo = media.catalogo;
// Collage de /nosotros (4 fotos de nosotros.zip, con foco y alt). El carrusel de abajo (historia) y el bloque «Nuestro equipo» del inicio (equipo[0]) son los de HEAD.
export const nosotros = media.nosotros;
import { rawTours } from './tours-text.js';
export const tours = rawTours.map(([slug,name,category,title,description,moments,stories,advice,mood],index) => {
  const m = media[slug] || {}, hero = m.portada || null;
  return {slug,name,category,title,description,moments,stories,advice,mood,number:String(index+1).padStart(2,'0'),images:hero?[hero]:[],hero,gallery:m.galeria||[],slides:m.cabecera||[],inicio:m.inicio||[]};
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
 *   { slug:'mi-nota', title:'…', tag:'Categoría', image:<foto de media.json: photos('blog')[i]; una foto propia por artículo>, intro:'resumen de 1–2 frases',
 *     sections:[['Subtítulo','Párrafo'], …], date:'2026-10-14' (opcional, ISO), minutes:4 (opcional) }
 * Las categorías (`tag`) se vuelven filtros solas cuando hay 2 o más. Fecha y tiempo de lectura solo se muestran si existen (hoy: PENDIENTE CLIENTE).
 * Con más de 12 notas aparece «Cargar más»; la ruta /blog/<slug> y el sitemap se generan solos.
 */
export const articles = [
 {slug:'preparar-tu-recorrido',imageAlt:'Viajera en la escalinata de piedra frente a un castillo de torres con tejados rojos',title:'Cómo preparar tu recorrido desde Medellín',tag:'Planeación',image:photos('blog')[0],intro:'Organizar un recorrido es más sencillo cuando la conversación empieza por lo importante.',sections:[['La fecha y el punto de partida','Comparte el día y la dirección desde la que quieres salir. Si llegas en avión, incluye tu número de vuelo cuando hables con el equipo.'],['Quiénes van contigo','La cantidad de personas, el equipaje y las necesidades de movilidad ayudan a proponer un vehículo y un ritmo adecuados.'],['Lo que esperas del día','Cuéntanos qué te interesa y cuánto tiempo tienes. Antes de confirmar, revisa las paradas, los servicios incluidos, el valor y las condiciones de cambio.']]},
 {slug:'elegir-tu-experiencia',imageAlt:'Viajera sentada en un columpio de anillo de madera sobre un muelle, con el embalse detrás y el letrero luminoso «Náutica Guatapé»',title:'Qué experiencia elegir desde Medellín',tag:'Inspiración',image:photos('blog')[1],intro:'No hay una única forma de descubrir Medellín y los recorridos que parten desde aquí. Elige según lo que quieras sentir.',sections:[['Ciudad para escuchar historias','El City Tour y la Comuna 13 acercan arte y vida urbana. El recorrido de compras pone el acento en el comercio local.'],['Pueblos para cambiar de ritmo','Guatapé, Santa Fe, Jardín y Oriente ofrecen maneras diferentes de acercarse al territorio. Consulta tiempos de traslado antes de llenar tu agenda.'],['Naturaleza para mirar de cerca','El café y el Salto del Buey proponen experiencias al aire libre distintas. Describe tus preferencias y condición para que el equipo oriente el plan.']]},
 {slug:'viajar-en-grupo',imageAlt:'Grupo numeroso de viajeros posando en una plaza frente a una casona blanca de balcones de madera',title:'Cómo organizar un viaje en grupo desde Medellín',tag:'En grupo',image:photos('blog')[2],intro:'Una familia, una agencia o un equipo de trabajo: cada grupo tiene su propio ritmo.',sections:[['Acordar un punto de encuentro','Una dirección precisa y una persona de contacto simplifican el comienzo. Confirma si habrá recogidas adicionales.'],['Pensar en el equipaje','El número de asientos no cuenta toda la historia. Comparte cuántas maletas llevan y cualquier requerimiento especial.'],['Dejar espacio para disfrutar','Revisa con el equipo las pausas y prioridades. Un itinerario claro también debe considerar el tiempo que cada persona necesita.']]},
];
