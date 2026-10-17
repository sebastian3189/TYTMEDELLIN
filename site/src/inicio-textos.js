/*
 * Textos del inicio, concepto H1 «La baraja de recuerdos» (Spec 03 §H, Spec 02 «APROBADO (usuario, 2026-10-12)»).
 * estado: APROBADO por el usuario el 2026-10-12 (titular partido, lema, frase del vídeo, marquesina, cierre, confianza y las 12 cartas).
 *
 * - `fases`: titulares y subtítulos de la fase del clip (c1, c2) y del cierre; los demás son existentes (content.js) o aprobados.
 * - `cartas`: palabra-emoción + frase de cada carta, copia literal de Spec 02. Nombre de la carta = `tour.name` de content.js.
 * - `marquesina`: nombre de lugar (mayúsculas) que pasa detrás de la carta enfocada. Solo nombres de lugar aprobados;
 *   donde no hay un lugar aprobado se usa el nombre del recorrido (`tour.name`, existente en content.js).
 * - `retiradas`: capítulos c3–c5 de la revisión 2 (Metrocable, Comuna 13, Guatapé con fotos animadas). La baraja los sustituye.
 * Reglas: sin cifras, precios, años, reseñas, garantías ni premios. La transición del clip es cinematográfica,
 * no un trayecto real (Spec 03 §D): ningún texto la presenta así.
 */
export const inicioTextos = {
  estado: 'APROBADO — concepto H1, copy del inicio (2026-10-12)',
  titular: ['Medellín,', 'a otro nivel'], // 2026-10-12: pedido del usuario. PENDIENTE: el lema «Experiencias a otro nivel» repite «otro nivel» en la misma pantalla.
  lema: 'Experiencias a otro nivel',
  confianza: 'Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles',
  eleccion: 'Elige tu próximo recuerdo', // eyebrow existente del inicio
  marquesinaCompleta: ['Medellín', 'Metrocable', 'Comuna 13', 'Guatapé', 'Piedra del Peñol', 'Santa Fe de Antioquia', 'Jardín', 'Salto del Buey', 'Hacienda Nápoles'],
  fases: {
    c1: {
      rotulo: 'Medellín',
      titular: 'No solo visites Medellín. Vívela', // aprobado 2026-10-12 (una vez por página)
      subtitulo: 'Una mirada al valle desde la ladera',
    },
    c2: {
      rotulo: 'Plaza Botero',
      titular: 'La ciudad como punto de partida', // existente: content.js moments[0]
      subtitulo: '', // retirado por el usuario (2026-10-14): sin subtítulo en esta fase
    },
    final: {
      rotulo: 'Cierre',
      titular: 'Tu viaje, tus tiempos, tu experiencia.', // aprobado 2026-10-12
      subtitulo: 'Cuéntanos tu plan y lo preparamos contigo.',
    },
  },
  retiradas: {
    c3: { rotulo: 'Metrocable', titular: 'Una ciudad que vuelve a dibujarse', subtitulo: 'El Metrocable regala otra mirada de la ciudad.' },
    c4: { rotulo: 'Comuna 13', titular: 'El color cuenta una historia', subtitulo: 'Arte urbano y escaleras eléctricas acompañan el relato del barrio.' },
    c5: { rotulo: 'Guatapé', titular: 'El horizonte tiene otro color', subtitulo: 'Agua entre montañas y un pueblo que se cuenta en sus zócalos.' },
  },
  // Orden = orden de `tours` en content.js (12 experiencias).
  cartas: {
    'city-tour-comuna-13': { emocion: 'Descubre', frase: 'plazas, murales e historias de Medellín', lugar: 'COMUNA 13' },
    'guatape-piedra-del-penol': { emocion: 'Explora', frase: 'agua entre montañas y zócalos de color', lugar: 'GUATAPÉ · PIEDRA DEL PEÑOL' },
    'tour-nocturno-medellin': { emocion: 'Siente', frase: 'el valle cuando enciende sus luces', lugar: 'MEDELLÍN' },
    'vuelta-a-oriente': { emocion: 'Conecta', frase: 'con pueblos y plazas, sin carreras', lugar: 'VUELTA A ORIENTE' },
    'tour-del-cafe-medellin': { emocion: 'Vive', frase: 'el oficio detrás de cada taza', lugar: 'TOUR DEL CAFÉ' },
    'hacienda-napoles': { emocion: 'Disfruta', frase: 'un día en familia, con transporte coordinado', lugar: 'HACIENDA NÁPOLES' },
    'salto-del-buey': { emocion: 'Sorpréndete', frase: 'una cascada al final del sendero', lugar: 'SALTO DEL BUEY' },
    'santa-fe-de-antioquia': { emocion: 'Recuerda', frase: 'calles coloniales y el Puente de Occidente', lugar: 'SANTA FE DE ANTIOQUIA' },
    'jardin-antioquia': { emocion: 'Enamórate', frase: 'fachadas de color y plaza sin prisa', lugar: 'JARDÍN' },
    'tour-de-compras': { emocion: 'Descubre', frase: 'El Hueco, outlets y tiendas locales', lugar: 'TOUR DE COMPRAS' },
    'tour-miradores': { emocion: 'Inspírate', frase: 'el valle cambia con la luz', lugar: 'TOUR DE MIRADORES' },
    'traslados-aeropuerto-jmc': { emocion: 'Conecta', frase: 'del aeropuerto a tu alojamiento, coordinado', lugar: 'TRASLADOS JMC' },
  },
};

export const CHAPTERS = ['c1', 'c2'];

/** Titular, subtítulo y rótulo de una fase del clip o del cierre. */
export function textoFase(id) {
  const fase = inicioTextos.fases[id];
  return { rotulo: fase.rotulo, titular: fase.titular, subtitulo: fase.subtitulo };
}
