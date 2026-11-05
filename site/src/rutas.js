// Arquitectura SEO (Spec 02 «Palabras clave», Spec 04 «Rutas»): una keyword principal por URL. El `slug` de cada tour sigue siendo su identificador interno
// (fotos, itinerarios, tour-info.json); la URL pública solo sale de esta tabla. `tour.name` (cartas, cinta) no cambia: el h1 y los metadatos de la ficha salen de aquí.
export const RUTA_TOURS = '/tours', RUTA_TRANSPORTE = '/transporte', RUTA_VEHICULOS = '/transporte/alquiler-vans-buses';

export const tourSeo = {
  'city-tour-comuna-13': { path: '/tours/comuna-13', h1: 'Tour Comuna 13', title: 'Tour Comuna 13 y city tour por Medellín', description: 'Tour privado por la Comuna 13 y city tour por las plazas de Medellín: arte urbano, historia y transporte privado. Cotiza tu recorrido.' },
  'guatape-piedra-del-penol': { path: '/tours/guatape', h1: 'Tour a Guatapé desde Medellín', description: 'Tour privado a Guatapé desde Medellín: Piedra del Peñol, represa y zócalos, con recogida en tu hotel. Cuéntanos tu plan y cotiza.' },
  'tour-nocturno-medellin': { path: '/tours/nocturno-medellin', h1: 'Tour nocturno Medellín', title: 'Tour nocturno por Medellín', description: 'Tour nocturno privado por Medellín: luces, vistas del valle y ambiente local. Coordinamos la salida y el regreso; cotiza para tu grupo.' },
  'vuelta-a-oriente': { path: '/tours/oriente-antioqueno', h1: 'Tour por el Oriente', title: 'Tour Oriente antioqueño desde Medellín', description: 'Tour privado por el Oriente antioqueño desde Medellín: pueblos, plazas y montañas. Acordamos las paradas contigo; cotiza para tu grupo.' },
  'tour-del-cafe-medellin': { path: '/tours/cafe-medellin', h1: 'Tour del café Medellín', title: 'Tour del café en Medellín', description: 'Tour del café privado desde Medellín: cultura cafetera del cultivo a la taza. La finca y la degustación se confirman en tu propuesta.' },
  'hacienda-napoles': { path: '/tours/hacienda-napoles', h1: 'Tour Hacienda Nápoles', title: 'Tour a Hacienda Nápoles desde Medellín', description: 'Tour privado a Hacienda Nápoles desde Medellín: transporte y un día en familia. Confirma el pasaporte y las entradas al cotizar.' },
  'salto-del-buey': { path: '/tours/salto-del-buey', h1: 'Tour Salto del Buey', title: 'Tour Salto del Buey desde Medellín', description: 'Tour privado al Salto del Buey desde Medellín: senderos y cascada. Revisamos contigo las condiciones del recorrido; cotiza para tu grupo.' },
  'santa-fe-de-antioquia': { path: '/tours/santa-fe-de-antioquia', h1: 'Santa Fe de Antioquia', title: 'Tour Santa Fe de Antioquia desde Medellín', description: 'Tour privado a Santa Fe de Antioquia desde Medellín: Puente de Occidente, centro histórico y plaza, con recogida en tu hotel. Cotiza tu plan.' },
  'jardin-antioquia': { path: '/tours/jardin-antioquia', h1: 'Tour Jardín Antioquia', title: 'Tour Jardín Antioquia desde Medellín', description: 'Tour privado a Jardín, Antioquia, desde Medellín: fachadas de color, plaza y cultura cafetera. Coordinamos el recorrido; cotiza para tu grupo.' },
  'tour-de-compras': { path: '/tours/compras-medellin', h1: 'Tour de compras', title: 'Tour de compras en Medellín', description: 'Tour de compras privado en Medellín por El Hueco, outlets y tiendas locales. Cuéntanos qué buscas y acordamos las paradas. Cotiza aquí.' },
  'tour-miradores': { path: '/tours/miradores-medellin', h1: 'Miradores de Medellín', title: 'Miradores de Medellín: tour privado', description: 'Conoce los miradores de Medellín en un tour privado: vistas del valle y cambio de luz. Acordamos las paradas; la visibilidad depende del clima.' },
  'traslados-aeropuerto-jmc': { path: '/transporte/aeropuerto-medellin', h1: 'Transporte aeropuerto', title: 'Transporte aeropuerto Medellín', description: 'Transporte privado entre el Aeropuerto José María Córdova (Rionegro) y Medellín. Comparte vuelo, dirección y equipaje; seguimos tu vuelo.' },
};

export const tourPath = (slug) => tourSeo[slug].path;
export const slugFromPath = (path) => { const clean = path.replace(/\/+$/, ''); return Object.keys(tourSeo).find((slug) => tourSeo[slug].path === clean); };

// URL anteriores → actuales. vercel.json y public/.htaccess las publican como 301 (scripts/check-arquitectura.mjs comprueba que no se desincronicen).
export const rutasAnteriores = {
  '/experiencias': RUTA_TOURS, '/servicios': RUTA_TRANSPORTE, '/vehiculos': RUTA_VEHICULOS,
  ...Object.fromEntries(Object.keys(tourSeo).map((slug) => [`/experiencias/${slug}`, tourSeo[slug].path])),
};
