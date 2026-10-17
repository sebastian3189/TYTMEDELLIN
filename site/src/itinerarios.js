/*
 * ITINERARIOS POR PARADA — única fuente editable de «La experiencia» (historia vertical por paradas).
 * Origen del contenido: SPECS/anexos/instrucciones_scroll_experiencias_TT.md (aportado por el usuario 2026-10-15), texto base del cliente; microcopy operativo editado el 2026-10-15 para dirigirse al viajero, sin cambiar paradas ni condiciones.
 *
 * Cada entrada de `itinerarios[slug]` describe UN tour (no se mezclan paradas, fotos ni rutas entre tours):
 *   corto            nombre breve para el subtítulo «Parada 03 de 09 · Guatapé»
 *   tituloSeccion    titular visible de la sección (null = solo un título accesible oculto)
 *   aviso            aviso visible bajo el titular (rutas sugeridas, Nápoles, Compras, Salto del Buey); null si no aplica
 *   rotulo           rótulo de la línea secundaria (por defecto «En la visita»; Traslados usa «En el servicio»)
 *   unidad           'Parada' (por defecto) o 'Etapa' (Traslados: etapas de un servicio, no visitas)
 *   estado           'confirmada' | 'sugerida'  (estado del itinerario completo)
 *   paradas[]        en el MISMO orden del itinerario; campos por parada:
 *     orden              1…N (informativo; el orden real es el del arreglo)
 *     titulo_corto       titular narrativo
 *     ubicacion          nombre del punto (null si el .md no lo da)
 *     descripcion        texto visible literal
 *     en_la_visita       línea secundaria «En la visita» (null si no aplica)
 *     imagen             id de la foto en public/media/itinerarios (null = «Foto pendiente»; ver scripts/prepare-itinerarios.py)
 *     alt                texto alternativo descriptivo de LO QUE SE VE (null si no hay foto)
 *     foco               object-position del recorte (p.ej. '50% 30%')
 *     estado_parada      'confirmada' | 'sugerida' | 'opcional' | 'por_confirmar'  (opcional y por_confirmar muestran etiqueta)
 *     etiquetas          etiquetas visibles extra según el .md (p.ej. 'Según pasaporte'); [] si no hay
 *     nota_ingreso       etiqueta visible de ingreso (p.ej. 'Ingreso no incluido'); null si no aplica
 *     duracion_aproximada  null salvo duración validada por operaciones (NO inventar)
 * Foto pendiente: cuando falta una foto inequívoca del punto se deja `imagen:null` y se muestra el marcador; nunca la foto de otro lugar.
 * Inglés: cada texto visible tiene su traducción en src/locales/en.json (clave = texto en español). Traducción fiel PENDIENTE DE REVISIÓN.
 * Jardín y Traslados JMC no figuran en el .md: sus paradas/etapas salen SOLO de datos verificados (sedes.ts oficial, tour-info.json, FAQ y diferenciadores aprobados).
 */
import media from './itinerarios-media.json' with { type: 'json' };

const DIR = '/media/itinerarios';
/** Fuentes `srcset` AVIF/WebP de una foto (ids de `itinerarios-media.json`). */
export const fotoItinerario = (id) => {
  const m = id && media[id]; if (!m) return null;
  const set = (ext) => m.w.map((w) => `${DIR}/${id}-${w}.${ext} ${w}w`).join(', ');
  return { webp: set('webp'), src: `${DIR}/${id}-${m.width}.webp`, width: m.width, height: m.height };
};

const p = (orden, titulo_corto, ubicacion, descripcion, en_la_visita, imagen, alt, extra = {}) => ({
  orden, titulo_corto, ubicacion, descripcion, en_la_visita, imagen, alt, foco: '50% 50%', estado_parada: 'confirmada', etiquetas: [], nota_ingreso: null, duracion_aproximada: null, ...extra,
});
const AVISO_SUGERIDO = 'Itinerario sugerido, sujeto a confirmación operativa';

export const itinerarios = {
  'city-tour-comuna-13': { corto: 'City Tour', tituloSeccion: null, aviso: null, estado: 'confirmada', paradas: [
    p(1, 'Recordar para transformar', 'Parque Memorial Inflexión', 'Comenzamos con la memoria de Medellín. En el Parque Memorial Inflexión conocemos una parte fundamental de su historia y cómo la ciudad ha trabajado para transformar su pasado.', 'Espacio de memoria, explicación histórica, fotografías respetuosas y reflexión.', 'city-tour-01', 'Visitantes frente a un muro de piedra oscura con la frase «Somos lo que dejamos a los demás» y una torre de apartamentos al fondo', { foco: '50% 70%' }),
    p(2, 'El corazón administrativo', 'La Alpujarra', 'Recorremos el centro administrativo de Medellín, donde se encuentran importantes edificios públicos y espacios representativos de la vida de la ciudad.', 'Entorno de la Gobernación, Alcaldía y Plaza de la Libertad; fotografías exteriores.', 'city-tour-02', 'Grupo de viajeros frente al edificio de la Gobernación de Antioquia en La Alpujarra, con las banderas de Antioquia, Colombia y Medellín', { foco: '50% 55%' }),
    p(3, 'Una ciudad que se ilumina', 'Parque de las Luces', 'Descubrimos la Plaza Cisneros y sus famosas columnas luminosas, símbolo de la renovación de espacios urbanos en Medellín.', 'Plaza, columnas y contexto de transformación del centro.', 'city-tour-03', 'Bosque de columnas de luz de la Plaza Cisneros, con un grupo de viajeros posando en la plaza', { foco: '50% 40%' }),
    p(4, 'Arte en el centro', 'Plaza Botero', 'Entre esculturas monumentales y arquitectura emblemática, conocemos una de las plazas más reconocidas del centro de Medellín.', 'Esculturas, exterior del Palacio de la Cultura y fotografías. Entrada a museos no incluida salvo confirmación.', 'city-tour-04', 'Escultura reclinada de Fernando Botero frente a la fachada de piedra a cuadros del Palacio de la Cultura', { estado_parada: 'por_confirmar', nota_ingreso: 'Ingreso no incluido', foco: '50% 60%' }),
    p(5, 'Tradición paisa', 'Pueblito Paisa', 'Subimos al Cerro Nutibara para descubrir una réplica de un pueblo antioqueño, sus calles tradicionales y una hermosa panorámica de Medellín.', 'Iglesia, plaza, fachadas, mirador y artesanías.', 'city-tour-05', 'Viajeros en la plaza empedrada del Pueblito Paisa, con la iglesia blanca y las fachadas de balcones coloridos al fondo', { foco: '50% 50%' }),
    p(6, 'Medellín desde el aire', 'Metro y Metrocable', 'Vivimos de cerca el sistema de transporte que conecta diferentes sectores de Medellín y disfrutamos de una perspectiva diferente de sus barrios y montañas.', 'Trayecto de Metro/Metrocable según línea y accesos acordados. Consulta en tu cotización si los pasajes están incluidos.', 'city-tour-06', 'Viajeros dentro de una cabina del Metrocable con las montañas de Medellín al fondo', { foco: '50% 55%' }),
    p(7, 'Colores que cuentan historias', 'Comuna 13', 'Nos adentramos en una comunidad que convirtió el arte urbano en una poderosa expresión de identidad, creatividad y transformación.', 'Murales y relatos de la comuna.', 'city-tour-07', 'Mural de un rostro de mujer con un colibrí en una calle de la Comuna 13', { foco: '35% 40%' }),
    p(8, 'Subir para descubrir', 'Escaleras eléctricas de Comuna 13', 'Recorremos las famosas escaleras eléctricas al aire libre, uno de los referentes de accesibilidad y renovación urbana de la zona.', 'Escaleras, paisajes del barrio y fotografías.', 'city-tour-08', 'Grupo de viajeros subiendo por las escaleras eléctricas techadas de la Comuna 13', { foco: '50% 45%' }),
    p(9, 'Talento de barrio', 'Arte y miradores de Comuna 13', 'Terminamos con el talento local: música, expresiones artísticas, emprendimientos y vistas que hacen única la experiencia en la Comuna 13.', 'Galerías, emprendimientos y posibles presentaciones según disponibilidad; no se garantiza un espectáculo específico.', 'city-tour-09', 'Mirador de la Comuna 13 con el letrero «Medellín Comuna 13» y la ciudad al fondo', { foco: '50% 30%' }),
  ] },

  'guatape-piedra-del-penol': { corto: 'Guatapé', tituloSeccion: null, aviso: null, estado: 'confirmada', paradas: [
    p(1, 'Nuestro primer encuentro con el campo', 'Alto del Chocho', 'Hacemos una parada para conectar con el paisaje rural del Oriente antioqueño, conocer animales de granja y descubrir sabores típicos de la región.', 'Animales, fotografías y alimentos opcionales. Confirmar condiciones de acceso.', 'guatape-01', 'Alpacas y llamas en el patio de tierra del Alto del Chocho, bajo una gran estructura de madera', { foco: '50% 55%' }),
    p(2, 'Un pueblo lleno de memoria', 'Réplica del Viejo Peñol', 'Conocemos la historia del antiguo Peñol a través de una réplica que conserva el espíritu del pueblo anterior a la construcción del embalse.', 'Plaza, fachadas, iglesia y explicación histórica.', 'guatape-02', 'Viajeros en la plaza frente a la iglesia de torres de ladrillo de la réplica del Viejo Peñol', { foco: '50% 40%' }),
    p(3, 'Mirar desde lo alto', 'Piedra del Peñol', 'La imponente Piedra del Peñol nos recibe con uno de los paisajes más reconocidos de Antioquia. Quienes lo deseen podrán realizar el ascenso para contemplar el embalse desde arriba.', 'Base, fotos y ascenso opcional. El ingreso/subida se paga aparte si no figura incluido.', 'guatape-03', 'La Piedra del Peñol completa vista desde su base, con la escalera que la recorre', { nota_ingreso: 'Ingreso no incluido', foco: '50% 35%' }),
    p(4, 'Postales de colores', 'Calle de los Recuerdos', 'Caminamos por las calles llenas de color que narran costumbres, tradiciones y momentos de la vida del municipio.', 'Zócalos, arquitectura local, fotos.', 'guatape-04', 'Fachada de Guatapé con zócalos de colores y balcones con flores, frente a un grupo de viajeros', { foco: '50% 35%' }),
    p(5, 'Bajo un cielo de sombrillas', 'Calle de las Sombrillas', 'Una de las paradas más fotogénicas del recorrido: colores, detalles artesanales y rincones que invitan a llevarse un recuerdo de Guatapé.', 'Recorrido corto y fotografías.', 'guatape-05', 'Calle empedrada de Guatapé cubierta por sombrillas de colores, con una viajera caminando', { foco: '50% 30%' }),
    p(6, 'El corazón de Guatapé', 'Parque Principal y Parroquia', 'Llegamos al corazón del municipio, donde la vida local, la arquitectura y la tradición se reúnen alrededor de su parque principal.', 'Plaza, iglesia (ingreso según apertura), comercio local.', null, null),
    p(7, 'La esencia de los zócalos', 'Plazoleta de los Zócalos', 'Los zócalos cuentan historias en cada fachada. En esta plazoleta descubrimos por qué el color es parte de la identidad de Guatapé.', 'Plazoleta, arte, fotos y artesanías.', 'guatape-07', 'Fachada de zócalos coloridos con balcones y una escalera de entrada en Guatapé', { foco: '50% 55%' }),
    p(8, 'Frente al agua', 'Malecón de Guatapé', 'Cerramos el recorrido urbano frente al embalse, disfrutando del paisaje, el aire fresco y el ambiente turístico del malecón.', 'Paseo, paisaje y fotografías.', null, null),
    p(9, 'Navegar el paisaje', 'Paseo en lancha', 'Para quienes desean añadir otra perspectiva, existe la opción de navegar el embalse y admirar desde el agua sus islas y montañas.', 'Paseo en embarcación opcional; se contrata por separado y no está incluido por defecto.', 'guatape-09', 'Lancha avanzando por el embalse de Guatapé, con la Piedra del Peñol a lo lejos', { estado_parada: 'opcional', foco: '50% 50%' }),
  ] },

  'tour-nocturno-medellin': { corto: 'Noche en Medellín', tituloSeccion: null, aviso: null, estado: 'confirmada', paradas: [
    p(1, 'Medellín se enciende', 'Mirador Octava Maravilla', 'Comenzamos contemplando las luces de Medellín desde un mirador que revela la belleza del Valle de Aburrá al anochecer.', 'Panorámica, fotografías; consumo gastronómico opcional.', 'noche-01', 'Letrero luminoso «La Octava Maravilla» en el mirador de noche, con las luces de la ciudad al fondo', { foco: '50% 50%' }),
    p(2, 'La energía de Provenza', 'Provenza', 'Descubrimos el ambiente gastronómico y cultural de Provenza, entre restaurantes, luces y espacios llenos de vida.', 'Caminata y tiempo libre; consumos no incluidos salvo acuerdo.', 'noche-02', 'Grupo de viajeros bajo el arco iluminado «Medellín · Provenza» por la noche', { foco: '50% 55%' }),
  ] },

  'tour-miradores': { corto: 'Miradores', tituloSeccion: null, aviso: null, estado: 'confirmada', paradas: [
    p(1, 'La ciudad a nuestros pies', 'Mirador La Palma', 'Desde La Palma apreciamos Medellín desde otra perspectiva: barrios, montañas y la inmensidad del valle.', 'Vistas, fotografías y parada contemplativa.', null, null),
    p(2, 'Montañas y horizonte', 'Cerro El Picacho', 'Seguimos hacia un punto privilegiado para observar la geografía del Valle de Aburrá y disfrutar de una de las vistas más representativas de la ciudad.', 'Mirador y fotografías, sujeto a acceso y condiciones de seguridad.', null, null),
  ] },

  'tour-del-cafe-medellin': { corto: 'Tour del Café', tituloSeccion: null, aviso: null, estado: 'confirmada', paradas: [
    p(1, 'Bienvenidos a la finca', 'Finca cafetera', 'Llegamos a una finca donde la tradición cafetera se vive de cerca, rodeados de naturaleza y del aroma del café colombiano.', 'Bienvenida e introducción.', 'cafe-01', 'Dos viajeros con sombrero y delantal cafetero entre la vegetación de la finca', { foco: '50% 40%' }),
    p(2, 'Donde nace el café', 'Cultivos', 'Caminamos entre cultivos para descubrir cómo crece el café y qué hace especiales a los granos de esta región.', 'Cultivo y explicación del proceso agrícola.', 'cafe-02', 'Un caficultor muestra un canasto con granos rojos de café junto a los cafetos', { foco: '60% 50%' }),
    p(3, 'Manos a la cosecha', 'Recolección', 'Conocemos el trabajo detrás de cada cosecha y, cuando las condiciones lo permiten, participamos en una demostración de recolección.', 'Demostración o práctica solo si está disponible.', 'cafe-03', 'Viajeros con delantales y canastos de recolección sobre una ladera de la finca', { foco: '50% 60%' }),
    p(4, 'Del fruto al grano', 'Beneficio y secado', 'Descubrimos cómo el fruto se transforma y cómo cada etapa de beneficio y secado influye en la calidad de la bebida.', 'Despulpado, lavado y secado según operación de la finca.', 'cafe-04', 'Persona rastrillando el café extendido en el secadero de la finca, con las montañas al fondo', { foco: '50% 50%' }),
    p(5, 'El aroma de la transformación', 'Tostión y molienda', 'Exploramos la tostión y la molienda, dos procesos que ayudan a construir los aromas y sabores del café que disfrutamos.', 'Demostración o explicación según instalaciones.', null, null),
    p(6, 'El momento de saborear', 'Cata de café', 'Terminamos con una degustación para identificar aromas, sabores y matices del café colombiano.', 'Cata según modalidad contratada.', null, null),
    p(7, 'Llévate un pedacito de la finca', 'Productos cafeteros', 'Antes de regresar, puedes conocer los productos de la finca y elegir un recuerdo especial para llevar a casa.', 'Compras voluntarias, no incluidas.', null, null),
  ] },

  'vuelta-a-oriente': { corto: 'Vuelta a Oriente', tituloSeccion: null, aviso: AVISO_SUGERIDO, estado: 'sugerida', paradas: [
    p(1, 'Tradición entre montañas', 'El Retiro', 'Descubrimos un municipio conocido por sus calles tradicionales, su ambiente tranquilo y su herencia artesanal.', 'Parque, iglesia y espacios artesanales sujetos a apertura.', null, null, { estado_parada: 'sugerida' }),
    p(2, 'Una caída de agua entre montañas', 'Tequendamita', 'En la zona de El Retiro hacemos una parada en Tequendamita, una cascada rodeada de naturaleza del Oriente antioqueño, para respirar aire de montaña y tomar fotografías.', 'Parada para fotografías y descanso; condiciones de acceso por confirmar.', null, null, { estado_parada: 'sugerida' }),
    p(3, 'Aire del Oriente', 'La Ceja', 'Seguimos por el Oriente antioqueño para apreciar sus plazas, tradiciones y la vida cotidiana de sus pueblos.', 'Plaza principal, entorno local y fotografías.', 'oriente-02', 'Letras blancas «La Ceja» en la plaza principal del municipio, con árboles y puestos de turismo al fondo', { estado_parada: 'sugerida', foco: '50% 55%' }),
    p(4, 'Cerámica pintada a mano', 'El Carmen de Viboral', 'Llegamos a un municipio reconocido por su cerámica pintada a mano, una tradición artesanal que se ve en sus calles y en sus tiendas.', 'Plaza, calles y tiendas de cerámica, sujetas a apertura.', null, null, { estado_parada: 'sugerida' }),
    p(5, 'Historia que permanece', 'Rionegro', 'Caminamos por un municipio lleno de historia y arquitectura que conserva una parte importante del pasado regional.', 'Centro histórico, parque y exterior de la catedral.', null, null, { estado_parada: 'sugerida' }),
    p(6, 'Una dulce tradición', 'San Antonio de Pereira', 'Cerramos entre calles tradicionales y la famosa cultura de postres de San Antonio de Pereira.', 'Plaza, iglesia, postrerías; consumo adicional.', 'oriente-04', 'Fachada de colores de una postrería de San Antonio de Pereira, con una viajera señalando el letrero', { estado_parada: 'sugerida', foco: '50% 45%' }),
    p(7, 'Paisajes para recordar', 'Parada panorámica', 'Aprovechamos el recorrido para detenernos, cuando sea posible, y admirar los paisajes del Oriente antioqueño.', 'Fotografías en una parada segura y autorizada; el lugar se confirma al acordar el recorrido.', null, null, { estado_parada: 'sugerida', etiquetas: ['Sujeta a selección'] }),
  ] },

  'santa-fe-de-antioquia': { corto: 'Santa Fe de Antioquia', tituloSeccion: null, aviso: AVISO_SUGERIDO, estado: 'sugerida', paradas: [
    p(1, 'Un viaje al pasado', 'Calles coloniales', 'Las calles de Santa Fe de Antioquia nos transportan a otra época, entre fachadas coloniales y rincones llenos de historia.', 'Recorrido peatonal, fotografías y arquitectura.', 'santa-fe-01', 'Calle empedrada de Santa Fe de Antioquia entre casas blancas coloniales con puertas verdes', { estado_parada: 'sugerida', foco: '55% 50%' }),
    p(2, 'El corazón de la ciudad colonial', 'Plaza Mayor', 'Conocemos la plaza principal, donde se encuentran la vida cotidiana, los sabores y las tradiciones del municipio.', 'Parque, comercio y gastronomía.', 'santa-fe-02', 'Grupo de viajeros en el parque principal de Santa Fe de Antioquia, con la fuente y una iglesia blanca detrás', { estado_parada: 'sugerida', foco: '50% 45%' }),
    p(3, 'Historia en cada detalle', 'Catedral de la Inmaculada Concepción', 'Visitamos el entorno de uno de los templos más emblemáticos de Santa Fe de Antioquia y descubrimos su legado arquitectónico.', 'Fachada e interior cuando esté abierto.', 'santa-fe-03', 'Fachada blanca con torre de campanario de la catedral de Santa Fe de Antioquia y la plaza frente a ella', { estado_parada: 'sugerida', foco: '40% 50%' }),
    p(4, 'Patrimonio que se conserva', 'Iglesias y arquitectura histórica', 'Continuamos por espacios donde se conservan detalles religiosos y arquitectónicos que cuentan la historia de esta antigua capital antioqueña.', 'Exteriores y visitas interiores si están autorizadas.', 'santa-fe-04', 'Fachada colonial blanca con ventanas de rejas de madera tallada sobre una calle empedrada', { estado_parada: 'sugerida', foco: '30% 50%' }),
    p(5, 'Un puente con historia', 'Puente de Occidente', 'Admiramos el histórico Puente de Occidente, una obra de ingeniería suspendida sobre el río Cauca y uno de los símbolos de la región.', 'Visita, fotografías y explicación patrimonial, según acceso permitido.', 'santa-fe-05', 'Vista del Puente de Occidente sobre el río Cauca entre montañas', { estado_parada: 'sugerida', foco: '50% 50%' }),
    p(6, 'Sabores de la región', 'Gastronomía local', 'Terminamos con la posibilidad de probar sabores tradicionales y disfrutar del ambiente cálido de Santa Fe de Antioquia.', 'Alimentos y bebidas según cotización; no incluidos por defecto.', 'santa-fe-06', 'Grupo de viajeros almorzando en una larga mesa de un restaurante colonial', { estado_parada: 'opcional', foco: '50% 50%' }),
  ] },

  'hacienda-napoles': { corto: 'Hacienda Nápoles', tituloSeccion: 'Lo que puedes vivir', aviso: 'Zonas y atracciones del parque: el acceso depende del pasaporte, la apertura y el tiempo disponible, y no se visitan necesariamente todas en un único día.', estado: 'sugerida', paradas: [
    p(1, 'Una aventura prehistórica', 'Aventura Jurásica', 'Comenzamos descubriendo figuras de dinosaurios y espacios temáticos que despiertan la imaginación de grandes y pequeños.', 'Recorrido por atracciones jurásicas autorizadas.', 'napoles-01', 'Visitante junto a una escultura de dinosaurio en un camino de piedra de Aventura Jurásica', { estado_parada: 'sugerida', foco: '55% 40%' }),
    p(2, 'La emoción de la fauna', 'Sabana Africana', 'Conocemos espacios dedicados a la fauna donde podemos observar diferentes especies dentro de las condiciones del parque.', 'Observación responsable, sin garantía de ver una especie específica ni de contacto con los animales.', null, null, { estado_parada: 'sugerida' }),
    p(3, 'Conexión con la naturaleza', 'Santuario de fauna', 'Exploramos áreas dedicadas al conocimiento y la observación de especies animales, respetando su entorno y las indicaciones del parque.', 'Zonas de fauna abiertas y habilitadas.', null, null, { estado_parada: 'sugerida' }),
    p(4, 'Conocer también es viajar', 'Espacios históricos', 'La visita también ofrece lugares para conocer el contexto histórico de este sitio y cómo se transformó con el paso del tiempo.', 'Museos abiertos y accesibles según pasaporte.', 'napoles-04', 'Arco de entrada de Hacienda Nápoles con la avioneta histórica sobre el letrero', { estado_parada: 'sugerida', foco: '50% 35%' }),
    p(5, 'Un momento para refrescarse', 'Atracciones acuáticas', 'Cuando el pasaporte lo permite, disfrutamos de espacios acuáticos para añadir diversión y descanso a la jornada.', 'Atracciones acuáticas sujetas a pasaporte, horarios y seguridad.', null, null, { estado_parada: 'sugerida', etiquetas: ['Según pasaporte'] }),
    p(6, 'Una pausa para recargar energías', 'Zona gastronómica', 'Hacemos una pausa para almorzar y continuar disfrutando del día con comodidad.', 'Comida solo si está incluida en el servicio contratado; si no, pago adicional.', null, null, { estado_parada: 'sugerida' }),
    p(7, 'Un rincón mediterráneo', 'Santorini', 'Cerca del parque, en la zona de Doradal y Puerto Triunfo, hay un lugar temático de arquitectura de inspiración mediterránea, ideal para tomar fotografías.', 'Fotografías y tiempo libre, sujetos a apertura y a tu plan de viaje.', null, null, { estado_parada: 'sugerida' }),
  ] },

  'tour-de-compras': { corto: 'Tour de Compras', tituloSeccion: 'Tú eliges dónde comprar', aviso: 'Posibles destinos personalizables, no un itinerario de visita obligatoria.', estado: 'sugerida', paradas: [
    p(1, 'Compras a tu ritmo', 'El Hueco', 'Explora uno de los sectores comerciales más populares de Medellín, con opciones de ropa, calzado, accesorios y productos para diferentes presupuestos.', 'Tiendas según interés del cliente.', 'compras-01', 'Viajeros brindando en una calle comercial concurrida de El Hueco, con toldos y puestos al fondo', { estado_parada: 'sugerida', foco: '50% 45%' }),
    p(2, 'Encuentra lo que buscas', 'Sector comercial del centro', 'Podemos adaptar la ruta para visitar comercios especializados del centro de Medellín de acuerdo con tu lista de compras.', 'Establecimientos elegidos previamente.', null, null, { estado_parada: 'sugerida' }),
    p(3, 'Marcas con ruta propia', 'Outlets de Guayabal', 'Visitamos los outlets de fábrica de Guayabal, una zona conocida por sus tiendas de ropa y calzado de producción local.', 'Tiendas a elección; compras y consumos propios.', null, null, { estado_parada: 'sugerida' }),
  ] },

  'jardin-antioquia': { corto: 'Jardín', tituloSeccion: null, aviso: AVISO_SUGERIDO, estado: 'sugerida', paradas: [
    p(1, 'Un pueblo de Antioquia', 'Jardín', 'Conocemos la vida de este pueblo de Antioquia entre fachadas de colores, calles tradicionales y cultura cafetera.', null, 'jardin-01', 'Vista aérea del casco urbano de Jardín, con su iglesia entre los tejados', { estado_parada: 'sugerida', foco: '50% 50%' }),
    p(2, 'Color y tradición', 'Calles de Jardín', 'Caminamos sin apuro por sus calles de color: es un pueblo para perderse a pie, no para ver desde el carro.', null, 'jardin-02', 'Calle de Jardín entre fachadas de colores, con las torres de la basílica al fondo', { estado_parada: 'sugerida', foco: '50% 50%' }),
    p(3, 'Pueblo patrimonio', 'Basílica de Jardín', 'Jardín es un pueblo patrimonio, de calles tradicionales que se descubren caminando.', null, 'jardin-03', 'Basílica de torres gemelas de Jardín frente a su plaza, con un monumento y jardines', { estado_parada: 'sugerida', foco: '40% 50%' }),
    p(4, 'El color también se pinta', 'Murales de Jardín', 'Un mural de aves de colores se suma a las fachadas y calles que dan color al pueblo.', null, 'jardin-04', 'Mural de aves de colores sobre un muro de Jardín', { estado_parada: 'sugerida', foco: '50% 50%' }),
    p(5, 'Naturaleza y cultura cafetera', 'Cultura cafetera', 'Pregunta por la cultura cafetera de la zona: es parte central de lo que hace especial a Jardín.', null, 'jardin-05', 'Taza de café sobre una mesa, con las montañas de la zona cafetera al fondo', { estado_parada: 'sugerida', foco: '50% 50%' }),
  ] },

  'traslados-aeropuerto-jmc': { corto: 'Traslados JMC', unidad: 'Etapa', rotulo: 'En el servicio', tituloSeccion: 'Cómo funciona tu traslado', aviso: 'Etapas del servicio, no un itinerario de visitas.', estado: 'confirmada', paradas: [
    p(1, 'Seguimos tu vuelo', 'Antes de que aterrices', 'Seguimos el estado de tu vuelo hasta su aterrizaje en Medellín para coordinar tu recogida y estar preparados ante posibles cambios de horario.', 'Comparte tu número de vuelo, dirección y número de pasajeros.', null, null),
    p(2, 'Tu conductor te contacta', 'Antes de la recogida', 'Nuestro conductor se comunica previamente y comparte las instrucciones del punto de encuentro, así como sus datos y los del vehículo.', 'El punto de encuentro y las condiciones de espera se confirman con el equipo.', null, null),
    p(3, 'Te recibimos en el aeropuerto', 'Aeropuerto José María Córdova', 'Entendemos que pueden presentarse demoras en migración, recogida de equipaje o vuelos, por lo que ofrecemos acompañamiento y flexibilidad en la espera.', 'En servicios previamente coordinados podemos ofrecer señalización personalizada con el nombre del pasajero o grupo.', 'traslados-03', 'Viajera con su maleta junto a la zona de salidas del aeropuerto, con la torre de control al fondo', { foco: '50% 55%' }),
    p(4, 'De puerta a puerta', 'Hasta tu alojamiento en Medellín', 'Coordinamos tu traslado entre el Aeropuerto José María Córdova y tu alojamiento en Medellín.', 'Puerta a puerta, con transporte privado.', 'traslados-04', 'Van blanca y pasajeros junto a la zona de salidas del aeropuerto José María Córdova', { foco: '45% 60%' }),
  ] },

  'salto-del-buey': { corto: 'Salto del Buey', tituloSeccion: null, aviso: 'Sujeto al operador', estado: 'sugerida', paradas: [
    p(1, 'Llegar a la montaña', null, 'Comenzamos entre montañas y naturaleza para conocer el entorno de esta aventura.', null, 'salto-01', 'Tres visitantes con casco en un mirador de montaña, con el Salto del Buey al fondo', { estado_parada: 'sugerida', foco: '50% 50%' }),
    p(2, 'Caminar entre paisajes', null, 'Recorremos los senderos habilitados y descubrimos los paisajes que rodean la cascada.', null, 'salto-02', 'Familia caminando por un sendero de selva entre raíces y vegetación', { estado_parada: 'sugerida', foco: '50% 50%' }),
    p(3, 'Contemplar la cascada', null, 'Disfrutamos de la imponencia de la cascada y de uno de los grandes escenarios naturales de la región.', null, 'salto-03', 'El Salto del Buey cayendo entre rocas y vegetación, con una visitante en primer plano', { estado_parada: 'sugerida', foco: '50% 40%' }),
    p(4, 'Aventura opcional', null, 'Según el plan contratado, es posible añadir actividades de aventura con acompañamiento especializado.', null, 'salto-04', 'Pareja con equipo de seguridad en una plataforma de madera de la actividad de aventura, con las montañas detrás', { estado_parada: 'opcional', foco: '50% 40%' }),
  ] },
};
