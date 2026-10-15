# Auditoría editorial y SEO — T&T Medellín

Fecha: 2026-10-15. Constructor-producto; modelo heredado de la sesión, adaptador nativo no cargado. Guía editorial: PROMPT_MAESTRO_COPYWRITING_IDENTIDAD_MARCA_SEO_TT_MEDELLIN.md. Gobierno: AGENTS.md, Specs 01/02/04/05; compuertas ENCUADRAR → CONSTRUIR → AUDITAR. El documento adjunto es referencia, no sustituye las instrucciones del proyecto ni autoriza publicación.

## Resultado

Se revisó el mapa real de 26 páginas de contenido en español y sus 26 variantes en inglés, además del 404, alias y componentes compartidos. Se aplicaron 52 ajustes iniciales y 24 sustituciones adicionales en fuentes (estas últimas incluyen conexiones de alt y metadatos). Diseño, rutas, contactos, capacidades, testimonios y condiciones de pago/cancelación se conservan. No se publicaron cambios ni se creó un commit.

La autorización posterior del usuario («ACEPTO ESO QUE DENEGUE ANTES») permitió completar las lecturas antes rechazadas: i18n, prerender, itinerarios, detalle oficial y Spec 01. Ya no hay un bloqueo de acceso pendiente.

## Inventario de fuentes activas

Inventario reproducible derivado de imports estáticos/dinámicos desde main.jsx y entry-server.jsx, más el runtime JSX configurado. Las hojas CSS se revisan como presentación sin cambiar diseño; los módulos de geometría, iconos y reproducción no contienen oferta comercial. Las fuentes editoriales se contrastaron con sus consumidores y HTML prerenderizado. No hay CMS conectado en este proyecto.

| Archivo | Estado editorial |
|---|---|
| site/src/about-fx.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/AboutFx.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/Allies.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/Arrow.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/baraja-geometria.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/blog.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/BlogBook.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/BlogIndex.jsx | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/card-stack.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/CardExtras.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/company.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/Contact.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/content.js | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/different.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/Different.jsx | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/entry-server.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/experience-book.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/extras.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/fab.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/faq-data.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/Faq.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/FeaturedGallery.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/footer.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/forms-contact.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/glass.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/glass.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/hand-geometria.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/Hero.jsx | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/home-legacy.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/home.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/HomeVideos.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/i18n-runtime/jsx-dev-runtime.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/i18n-runtime/jsx-runtime.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/i18n.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/icons.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/indicativos.json | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/inicio-frames.json | Revisado: medios/datos; fotografías contrastadas por hojas de contacto cuando corresponde |
| site/src/inicio-textos.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/inicio-videos.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/itinerarios-media.json | Revisado: medios/datos; fotografías contrastadas por hojas de contacto cuando corresponde |
| site/src/itinerarios.js | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/itinerary.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/ItineraryStory.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/locales/en.json | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/Logo.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/main.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/media.json | Revisado: medios/datos; fotografías contrastadas por hojas de contacto cuando corresponde |
| site/src/meta.js | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/mobile-motion.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/pages/Blog.jsx | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/pages/Catalog.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/pages/Company.jsx | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/pages/DataPolicy.jsx | Revisado y conservado: borrador legal con discrepancias documentadas abajo |
| site/src/pages/Fleet.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/pages/Home.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/pages/NotFound.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/pages/Tour.jsx | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/PlayIcon.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/policy.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/preferences.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/Preferences.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/PremiumMotion.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/Quote.jsx | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/QuoteCopy.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/reviews.json | Revisado y conservado: 18 reseñas literales; no se reescriben |
| site/src/Reviews.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/scroll-bus.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/scrub-hero.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/ScrubHero.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/shared.jsx | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/Skyline.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/Socials.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/tour-entry.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/tour-info.json | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/tour-motion.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/TourArchive.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/TourBar.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/TourChrome.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/TourDetails.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/TourHero.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/tours-text.js | Mejorado; ES/EN comprobados en fuentes y build |
| site/src/travel-hand.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/TravelHand.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/videoPrep.js | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/website.css | Conservado: estilos y contenido decorativo; sin cambios de copy |
| site/src/Website.jsx | Revisado y conservado: funcionalidad, copy o etiquetas existentes adecuados a su contexto |
| site/src/WhatsAppFab.jsx | Mejorado; ES/EN comprobados en fuentes y build |

Otras entradas revisadas: site/index.html (cáscara y alternativa sin JS), site/scripts/prerender.mjs (mejorado: social), configuración de build y scripts de comprobación. explorer-data.js/exploration-media.json no se alcanzan desde las entradas actuales; se conservan como fuentes inactivas. El contenido retirado de inicio-textos.retiradas es histórico y no se renderiza (clave real: retiradas).

## Inventario de páginas y estrategia

Temas SEO basados en la oferta real; no representan volúmenes investigados ni garantías de posicionamiento. La emoción buscada es confianza para organizar y entusiasmo por conocer; la objeción se resuelve con condiciones concretas y conversación, sin urgencia artificial.

| URL ES (EN: mismo path con /en) | Estado | Público / intención / temática principal | Objeción y promesa verificable | CTA |
|---|---|---|---|---|
| / | Mejorada | Viajeros nuevos / tours privados y transporte Medellín | Quién organiza: equipo local y propuesta según grupo | Explorar experiencias |
| /experiencias | Mejorada | Viajeros que comparan / experiencias desde Medellín | Qué elegir: 12 fichas de ciudad, pueblos, naturaleza y traslado | Ver las experiencias |
| /servicios | Mejorada SEO, oferta conservada | Familias, empresas y agencias / transporte privado Medellín | Coordinación: ruta, horarios y propuesta consultada | Solicitar propuesta |
| /vehiculos | Mejorada | Viajeros y grupos / vehículos para traslados Medellín | Capacidad y equipaje: categorías; unidad confirmada al cotizar | Consultar este vehículo |
| /nosotros | Mejorada SEO/alt, historia conservada | Visitantes que validan confianza / equipo local Medellín | Quiénes somos: historia y datos existentes verificables | Contacto |
| /blog | Mejorada | Viajeros en planeación / guía de viaje Medellín | Cómo organizar: consejos prácticos y lectura | Leer la nota |
| /contacto | Mejorada SEO/microcopy | Consultas generales / contacto WhatsApp Medellín | Cómo hablar: canales oficiales y oficina | Conversar con el equipo |
| /cotizar | Mejorada | Viajeros listos para consultar / cotizar tour Medellín | Precio y disponibilidad: propuesta; no confirmación de reserva | Enviar por WhatsApp |
| /calificaciones | Mejorada SEO, testimonios conservados | Visitantes que buscan confianza / opiniones T&T Medellín | Prueba social: reseñas con referencia histórica y enlace | Ver todas las reseñas en Google |
| /privacidad | Revisada y conservada | Personas que comparten datos / privacidad | Control sobre mensaje y contacto responsable | Consultar política |
| /politica-de-tratamiento-de-datos | Revisada, sin cambio legal | Titulares de datos / tratamiento de datos | Derechos y borrador pendiente de asesor jurídico | Contacto responsable |
| /experiencias/city-tour-comuna-13 | Mejorada; itinerario revisado | Viajeros interesados en City tour Medellín y Comuna 13 / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/guatape-piedra-del-penol | Mejorada; itinerario revisado | Viajeros interesados en Tour Guatapé desde Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/tour-nocturno-medellin | Mejorada; itinerario revisado | Viajeros interesados en Tour nocturno Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/vuelta-a-oriente | Mejorada; itinerario revisado | Viajeros interesados en Pueblos del Oriente Antioqueño / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/tour-del-cafe-medellin | Mejorada; itinerario revisado | Viajeros interesados en Tour del café desde Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/hacienda-napoles | Mejorada; itinerario revisado | Viajeros interesados en Hacienda Nápoles desde Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/salto-del-buey | Mejorada; itinerario revisado | Viajeros interesados en Salto del Buey desde Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/santa-fe-de-antioquia | Mejorada; itinerario revisado | Viajeros interesados en Santa Fe de Antioquia desde Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/jardin-antioquia | Mejorada; itinerario revisado | Viajeros interesados en Jardín desde Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/tour-de-compras | Mejorada; itinerario revisado | Viajeros interesados en Tour de compras Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/tour-miradores | Mejorada; itinerario revisado | Viajeros interesados en Miradores de Medellín / comparación y cotización | Paradas, inclusiones y acceso: condiciones del itinerario y propuesta | Planea esta experiencia |
| /experiencias/traslados-aeropuerto-jmc | Mejorada; itinerario revisado | Viajeros interesados en Traslado aeropuerto José María Córdova Medellín / comparación y cotización | Vuelo, equipaje y encuentro: coordinación del traslado | Planea esta experiencia |
| /blog/preparar-tu-recorrido | Mejorada título/H1 y alt | Viajeros en investigación / Cómo preparar un recorrido desde Medellín | Preparación: datos, equipaje y condiciones acordadas | Encuentra tu recorrido |
| /blog/elegir-tu-experiencia | Mejorada título/H1 y alt | Viajeros en investigación / Elegir ciudad, pueblos o naturaleza | Preparación: datos, equipaje y condiciones acordadas | Encuentra tu recorrido |
| /blog/viajar-en-grupo | Mejorada título/H1 y alt | Viajeros en investigación / Organizar viaje en grupo desde Medellín | Preparación: datos, equipaje y condiciones acordadas | Encuentra tu recorrido |

Alias /site → / y /flota → /vehiculos: conservados. 404: revisado, conserva sugerencias y retorno al catálogo. No existen rutas adicionales de ciudades, transporte por horas, servicios individuales ni reservas pagadas; no se inventaron.

## Cambios sustantivos antes/después

| Ubicación | Antes | Después | Motivo / beneficio |
|---|---|---|---|
| Inicio title | Medellín, a otro nivel | Tours privados y transporte en Medellín | Intención clara sin retirar el H1 de marca |
| Catálogo H1 | ¿Qué historia quieres vivir? | Experiencias desde Medellín | Identifica oferta; emoción se mantiene en el cuerpo |
| Guatapé descripción | Agua entre montañas, una piedra que domina el paisaje… | Desde Medellín, descubre los zócalos de Guatapé y el paisaje de la Piedra del Peñol. Acordamos el recorrido contigo; consulta entradas y opciones de ascenso. | Destino + origen + condición; las 12 descripciones se diferenciaron |
| Blog | El buen viaje empieza con cinco datos. | Cómo preparar tu recorrido desde Medellín | Título informativo específico; también actualizado en tarjetas |
| Vehículos | sitio de sobra para el equipaje | Comparte cuántas maletas llevan para confirmar el espacio disponible. | Evita garantía sin conocer equipaje |
| Diferenciadores | Flota propia y vehículos certificados. | Vehículos para tu recorrido. | No universalizar propiedad/certificación |
| Diferenciadores | Acompañamiento por WhatsApp 24/7. | Conversemos por WhatsApp. | Distingue operación reservada y asesoría disponible |
| Formulario | He leído el política | He leído la política | Concordancia; consentimiento intacto |
| Traslado | Salida coordinada en Medellín | Encuentro en aeropuerto o Medellín | Traslado bidireccional |
| Itinerario lancha | No mostrar como actividad incluida por defecto. | Paseo en embarcación opcional; se contrata por separado y no está incluido por defecto. | Condición pública en lugar de instrucción de edición |
| Itinerario fauna | no asegurar avistamiento concreto ni contacto con animales | sin garantía de ver una especie específica ni de contacto con los animales | Precisión sin prometer especie |
| Itinerario panorámica | no asegurar un lugar hasta definirlo | el lugar se confirma al acordar el recorrido | Punto aún sujeto a acuerdo |
| Itinerario Metro | Precisar en la cotización si los pasajes están incluidos. | Consulta en tu cotización si los pasajes están incluidos. | Se dirige al viajero |
| Itinerario Comuna 13 | No garantizar un espectáculo específico. | no se garantiza un espectáculo específico. | Mantiene restricción con voz pública |
| Nápoles recomendación | zonas acuáticas y son parte del plan | Si tu pasaporte incluye zonas acuáticas… | No universaliza inclusión |
| City Tour recomendación | es el recorrido que más fotografías deja | fotografiar las escaleras eléctricas y el arte urbano de la Comuna 13 | Quita comparación no sustentada |
| Santa Fe recomendación | son la última parada de la ruta | Consulta el orden de las paradas… según el acceso disponible. | No fija orden del itinerario sugerido |
| Blog alt | Recorrido de T&T Medellín | Tres viajeras frente a la base de la Piedra del Peñol y su escalera | Descripción real inspeccionada; tres notas con alt propio |
| Nosotros alt | Nuestra casa. Nuestra gente. | Hombre junto a una baranda con Medellín y las montañas al fondo | Describe escena sin inferir identidad |
| Metadatos sociales | Ausentes | OG title/description/type/locale/url y Twitter title/description por URL | Comparte texto específico; sincroniza navegación cliente |
| EN WhatsApp | Let's talk? | Shall we talk? | Naturalidad del inglés |

El diff de Git contiene las sustituciones exactas y las traducciones de todas las cadenas nuevas. Se conservaron titulares emocionales aprobados donde ayudan a la identidad; no se forzó una palabra clave en cada H1.

## Mapa SEO final: títulos, descripciones y H1 reales

Extraído del último dist generado, incluyendo ambos idiomas. OG title/description usan el mismo texto; og:url usa el mismo canonical existente. El dominio sigue siendo el marcador .invalid mientras TYT_SITE_URL no esté confirmado. No se inventó og:image ni se promete una vista previa específica de plataforma. Robots/noindex, sitemap y hreflang conservan su política.

| URL | Title final | Meta description final | H1 real |
|---|---|---|---|
| / | Tours privados y transporte en Medellín / T&T Medellín | Descubre Medellín con tours privados y transporte coordinado por un equipo local. Cuéntanos tu plan y cotiza una experiencia para tu grupo. | Medellín, a otro nivel. |
| /blog | Guía para planear tu viaje desde Medellín / T&T Medellín | Ideas y consejos para preparar tus experiencias y recorridos desde Medellín. | Ideas para viajar con más sentido. |
| /blog/elegir-tu-experiencia | Qué experiencia elegir desde Medellín / T&T Medellín | No hay una única forma de descubrir Medellín y los recorridos que parten desde aquí. Elige según lo que quieras sentir. | Qué experiencia elegir desde Medellín |
| /blog/preparar-tu-recorrido | Cómo preparar tu recorrido desde Medellín / T&T Medellín | Organizar un recorrido es más sencillo cuando la conversación empieza por lo importante. | Cómo preparar tu recorrido desde Medellín |
| /blog/viajar-en-grupo | Cómo organizar un viaje en grupo desde Medellín / T&T Medellín | Una familia, una agencia o un equipo de trabajo: cada grupo tiene su propio ritmo. | Cómo organizar un viaje en grupo desde Medellín |
| /calificaciones | Opiniones de viajeros sobre T&T Medellín / T&T Medellín | Consulta la referencia histórica de calificaciones y las reseñas actuales de T&T Medellín en Google. | Lo que cuenta quien ya viajó. |
| /contacto | Contacto y WhatsApp de T&T Medellín / T&T Medellín | Habla con nuestro equipo en Medellín por WhatsApp, teléfono o correo. Comparte tu recorrido, resuelve dudas y consulta la ubicación de la oficina. | Tu plan merece que lo escuchemos. |
| /cotizar | Cotiza tu tour o traslado en Medellín / T&T Medellín | Cuéntanos fechas, viajeros y punto de salida para cotizar tu tour o traslado en Medellín. Revisa y envía tu mensaje por WhatsApp; cotizar no confirma una reserva. | Tu viaje, tus tiempos, tu experiencia. |
| /en | Private tours and transport in Medellín / T&T Medellín | Discover Medellín with private tours and transport coordinated by a local team. Tell us your plans and request a quote for your group. | Medellín, on another level. |
| /en/blog | Planning your trip from Medellín / T&T Medellín | Ideas and advice for planning your experiences and journeys from Medellín. | Ideas for traveling with more meaning. |
| /en/blog/elegir-tu-experiencia | Which experience to choose from Medellín / T&T Medellín | There is no single way to discover Medellín and the journeys that start here. Choose according to what you want to feel. | Which experience to choose from Medellín |
| /en/blog/preparar-tu-recorrido | How to prepare for your trip from Medellín / T&T Medellín | Planning a trip is easier when the conversation starts with what matters. | How to prepare for your trip from Medellín |
| /en/blog/viajar-en-grupo | How to organize a group trip from Medellín / T&T Medellín | A family, an agency or a work team: every group has its own pace. | How to organize a group trip from Medellín |
| /en/calificaciones | Traveler reviews of T&T Medellín / T&T Medellín | See historical ratings and current T&T Medellín reviews on Google. | What matters from those who have traveled. |
| /en/contacto | Contact T&T Medellín on WhatsApp / T&T Medellín | Contact our Medellín team by WhatsApp, phone or email. Share your travel plans, ask questions and find our office location. | Your plans deserve to be heard. |
| /en/cotizar | Get a tour or transfer quote in Medellín / T&T Medellín | Share your dates, group size and pickup point for a tour or transfer quote in Medellín. Review and send your WhatsApp message; a quote does not confirm a booking. | Your trip, your pace, your experience. |
| /en/experiencias | Tours and experiences from Medellín / T&T Medellín | Choose from twelve experiences from Medellín: Comuna 13, Guatapé, coffee, towns and nature. Explore the routes and ask about arrangements for your group. | Experiences from Medellín |
| /en/experiencias/city-tour-comuna-13 | City Tour & Comuna 13 / T&T Medellín | Discover Medellín’s squares and the street art of Comuna 13. Plan a private tour with us to get to know the city and its stories. | City Tour & Comuna 13 |
| /en/experiencias/guatape-piedra-del-penol | Guatapé & Piedra del Peñol / T&T Medellín | Travel from Medellín to discover Guatapé’s colorful façades and the landscape around Piedra del Peñol. Plan your route with us and ask about tickets and climbing options. | Guatapé & Piedra del Peñol |
| /en/experiencias/hacienda-napoles | Hacienda Nápoles / T&T Medellín | Plan a day at Hacienda Nápoles with transport from Medellín. Enjoy nature and activities as a family; confirm the park pass and admission when requesting a quote. | Hacienda Nápoles |
| /en/experiencias/jardin-antioquia | Jardín / T&T Medellín | Travel from Medellín to Jardín to discover its colorful façades, town square and coffee culture. We plan the route around the journey and your group. | Jardín |
| /en/experiencias/salto-del-buey | Salto del Buey / T&T Medellín | Walk through trails and greenery to Salto del Buey on a trip from Medellín. Discuss route conditions and optional activities with our team. | Salto del Buey |
| /en/experiencias/santa-fe-de-antioquia | Santa Fe de Antioquia / T&T Medellín | Visit Santa Fe de Antioquia from Medellín: colonial streets, squares and the Puente de Occidente. Plan stops and walking times with our team. | Santa Fe de Antioquia |
| /en/experiencias/tour-de-compras | Shopping Tour / T&T Medellín | Plan your Medellín shopping tour through El Hueco, outlets and local shops. Tell us what you are looking for so we can arrange stops and space for your purchases. | Shopping Tour |
| /en/experiencias/tour-del-cafe-medellin | Coffee Tour / T&T Medellín | Discover coffee culture on a visit from Medellín, from growing the beans to the craft behind each cup. The farm and tasting are confirmed in your proposal. | Coffee Tour |
| /en/experiencias/tour-miradores | Viewpoints Tour / T&T Medellín | Discover Medellín from its viewpoints and watch the light change over the valley. Stops are agreed with you; visibility depends on the weather. | Viewpoints Tour |
| /en/experiencias/tour-nocturno-medellin | Medellín at Night / T&T Medellín | Discover Medellín by night through city lights, valley views and local atmosphere. We coordinate departure and return, with times and stops agreed with you. | Medellín at Night |
| /en/experiencias/traslados-aeropuerto-jmc | JMC Airport Transfers / T&T Medellín | Arrange your transfer between José María Córdova Airport and Medellín. Share your flight, address and luggage details: we track your flight and agree on a meeting point. | JMC Airport Transfers |
| /en/experiencias/vuelta-a-oriente | Eastern Antioquia Tour / T&T Medellín | Head from Medellín to the towns and mountains of eastern Antioquia. Tell us your interests so we can agree on stops and leave time to enjoy the squares. | Eastern Antioquia Tour |
| /en/nosotros | Our local team in Medellín / T&T Medellín | Meet the team and discover the story and values of Transporte y Turismo Medellín. | The road is part of who we are. We are from Medellín. |
| /en/politica-de-tratamiento-de-datos | Personal data processing policy / T&T Medellín | What personal data we collect, what for, how long we keep it and how to exercise your rights (Law 1581 of 2012). | Personal data processing policy |
| /en/privacidad | Privacy / T&T Medellín | Learn how your inquiry is prepared and what information you choose to share with T&T Medellín. | Your information, under your control. |
| /en/servicios | Private transport and services in Medellín / T&T Medellín | Arrange private tours, airport transfers and transport for businesses, events or agencies in Medellín. Share your route and request a proposal. | Your plan has many possibilities. We adapt. |
| /en/vehiculos | Vehicles for transfers and groups in Medellín / T&T Medellín | Compare sedans, SUVs, vans and buses for transfers and trips from Medellín. Discuss passenger capacity, luggage and availability with our team. | Just the right space. The journey shared. |
| /experiencias | Tours y experiencias desde Medellín / T&T Medellín | Elige entre doce experiencias desde Medellín: Comuna 13, Guatapé, café, pueblos y naturaleza. Conoce los recorridos y consulta las condiciones para tu grupo. | Experiencias desde Medellín |
| /experiencias/city-tour-comuna-13 | City Tour & Comuna 13 / T&T Medellín | Descubre las plazas de Medellín y el arte urbano de la Comuna 13. Planeamos contigo un recorrido privado para acercarte a la ciudad y sus historias. | City Tour & Comuna 13 |
| /experiencias/guatape-piedra-del-penol | Guatapé & Piedra del Peñol / T&T Medellín | Desde Medellín, descubre los zócalos de Guatapé y el paisaje de la Piedra del Peñol. Acordamos el recorrido contigo; consulta entradas y opciones de ascenso. | Guatapé & Piedra del Peñol |
| /experiencias/hacienda-napoles | Hacienda Nápoles / T&T Medellín | Planea un día en Hacienda Nápoles con transporte desde Medellín. Comparte naturaleza y actividades en familia; confirma el pasaporte y las entradas al cotizar. | Hacienda Nápoles |
| /experiencias/jardin-antioquia | Jardín / T&T Medellín | Viaja de Medellín a Jardín para conocer sus fachadas de color, su plaza y su cultura cafetera. Coordinamos el recorrido considerando el trayecto y a tu grupo. | Jardín |
| /experiencias/salto-del-buey | Salto del Buey / T&T Medellín | Camina entre senderos y vegetación hasta el Salto del Buey en una salida desde Medellín. Revisamos contigo las condiciones del recorrido y las actividades opcionales. | Salto del Buey |
| /experiencias/santa-fe-de-antioquia | Santa Fe de Antioquia / T&T Medellín | Recorre Santa Fe de Antioquia desde Medellín: calles coloniales, plazas y el Puente de Occidente. Organiza con nosotros las paradas y los tiempos de caminata. | Santa Fe de Antioquia |
| /experiencias/tour-de-compras | Tour de Compras / T&T Medellín | Organiza tu tour de compras en Medellín por El Hueco, outlets y tiendas locales. Cuéntanos qué buscas para acordar las paradas y el espacio para tus compras. | Tour de Compras |
| /experiencias/tour-del-cafe-medellin | Tour del Café / T&T Medellín | Descubre la cultura cafetera en una visita desde Medellín: del cultivo al oficio detrás de una taza. La finca y la degustación se confirman en tu propuesta. | Tour del Café |
| /experiencias/tour-miradores | Tour Miradores / T&T Medellín | Descubre Medellín desde sus miradores y observa cómo cambia la luz sobre el valle. Acordamos las paradas contigo; la visibilidad depende del clima. | Tour Miradores |
| /experiencias/tour-nocturno-medellin | Noche en Medellín / T&T Medellín | Conoce Medellín de noche entre luces, vistas del valle y ambiente local. Coordinamos la salida y el regreso; los horarios y las paradas se acuerdan contigo. | Noche en Medellín |
| /experiencias/traslados-aeropuerto-jmc | Traslados Aeropuerto JMC / T&T Medellín | Coordina tu traslado entre el Aeropuerto José María Córdova y Medellín. Comparte vuelo, dirección y equipaje: seguimos tu vuelo y acordamos el punto de encuentro. | Traslados Aeropuerto JMC |
| /experiencias/vuelta-a-oriente | Vuelta a Oriente / T&T Medellín | Sal de Medellín hacia los pueblos y las montañas del Oriente Antioqueño. Cuéntanos tus intereses para acordar las paradas y disfrutar las plazas con calma. | Vuelta a Oriente |
| /nosotros | Nuestro equipo local en Medellín / T&T Medellín | Conoce la historia, el equipo y los valores de Transporte y Turismo Medellín. | Somos del camino. Somos de Medellín. |
| /politica-de-tratamiento-de-datos | Política de tratamiento de datos / T&T Medellín | Qué datos personales recogemos, con qué finalidad, cuánto tiempo los conservamos y cómo ejercer tus derechos (Ley 1581 de 2012). | Política de tratamiento de datos personales |
| /privacidad | Privacidad / T&T Medellín | Conoce cómo se prepara tu consulta y qué información decides compartir con T&T Medellín. | Tu información, bajo tu control. |
| /servicios | Transporte privado y servicios en Medellín / T&T Medellín | Organiza tours privados, traslados al aeropuerto y transporte para empresas, eventos o agencias en Medellín. Comparte tu ruta y solicita una propuesta. | Tu plan tiene muchas formas. Nos adaptamos. |
| /vehiculos | Vehículos para traslados y grupos en Medellín / T&T Medellín | Compara sedanes, SUV, vans y buses para traslados y viajes desde Medellín. Consulta capacidad, equipaje y disponibilidad para elegir con el equipo. | El espacio justo. El camino compartido. |

## Imágenes y alternativas

Inspección visual realizada: 164 registros de media.json en seis hojas de contacto y 57 imágenes de itinerarios/baraja en dos hojas adicionales (hay derivados y duplicados, no 221 escenas únicas). Además se inspeccionaron individualmente cuatro imágenes de artículos/corporativa y cinco detalles ambiguos. Evidencia: site/test-results/editorial-contact-sheets/ (sheet-1…6.jpg, extra-1…2.jpg e inventory.json).

Se mejoraron cuatro alt específicos con lo visto. Galerías conservan alt contextuales de destino/número de foto; son menos descriptivos pero no atribuyen escenas falsas. Imágenes decorativas con nombre de enlace contiguo conservan alt vacío. Los alt detallados del itinerario coinciden con las imágenes inspeccionadas. En miniaturas se sospecharon diferencias (Provenza, Piedra del Peñol, secadero de café, puente); la inspección ampliada las descartó. No se cambiaron activos ni se infirieron identidades de personas.

## Veracidad y políticas conservadas

- Inclusiones de las 12 fichas: tour-info.json procede del catálogo oficial de la sede, según el comentario de TourDetails.jsx y Spec 02, tabla FAQ #4. Se conservan transporte, guías/conductores y fotos/videos aportados, sin inventar prestaciones; el equipo confirma la propuesta. La redacción general invita a consultar el alcance concreto.
- RNT 176384, NIT 901738550-6, contactos, historia, capacidades, testimonios, anticipos, pagos y reembolsos se conservaron con las fuentes del proyecto. No se presentaron cifras históricas como actualización en vivo.
- Itinerarios: 12 recorridos revisados, estados sugerido/opcional/por confirmar preservados. Las notas de edición se convirtieron en condiciones para viajeros sin añadir paradas ni precios.
- DataPolicy.jsx ya incluye la decisión WhatsApp; no quedó pendiente incorporarla. Sigue siendo un borrador jurídico: apartados 9/10 describen cookies de medición, aviso de consentimiento, GTM/GA e IP anonimizada, mientras el sitio no carga esas herramientas ni muestra dicho aviso y usa localStorage para tema. /privacidad dice que no hay analítica publicitaria. Se conserva texto legal por instrucción; responsable: asesor legal/cliente, revisión obligatoria antes de publicar.
- «Foto pendiente» en 22 paradas sin foto inequívoca se conserva por la instrucción explícita del anexo de itinerarios; no se sustituye por fotos de otro lugar. Videos de fichas ausentes usan diaporamas reales. Son pendientes de activos del cliente, no errores de traducción.

## Pruebas y revisión independiente

- npm run build final: PASS; 52 páginas ES/EN y 404 generadas, exactamente un H1 por página exigido por prerender.
- git diff --check final: PASS, sin errores; solo avisos de normalización CRLF.
- Comprobación de traducción de datos finales: 337 cadenas largas de tours, itinerarios y detalle; único texto sin cambio: nombre propio «Guatapé & Piedra del Peñol». No faltan traducciones de los textos de esas fuentes.
- Auditoría independiente previa: 52 HTML y 80 casos de navegador, según informe del auditor-calidad al orquestador; no se simula una segunda ejecución de esos 80 casos.
- Auditoría final independiente: PASS en 52 HTML (OG/Twitter coherentes con title/description/canonical) y 22 casos nuevos en Edge: City/Nápoles/Oriente/Nosotros/artículo × ES/EN × 320/1440, más dos navegaciones artículo → catálogo. Cero pageerror/desborde; H1 único y metadatos sociales sincronizados. El auditor acepta las correcciones P2 y aprueba la ronda editorial local. No equivale a la matriz completa de lanzamiento ni a inspección fotográfica por el auditor.
- No hay scripts lint/typecheck/test unitario definidos en package.json; build es la comprobación de proyecto disponible. check-prerender.mjs contiene expectativas antiguas (título/H1 de catálogo y selector de ficha) y no se usó como evidencia falsa.

## Archivos y pendientes finales

Fuentes editadas: site/src/meta.js, tours-text.js, content.js, Hero.jsx, BlogIndex.jsx, Quote.jsx, Different.jsx, pages/Tour.jsx, locales/en.json, itinerarios.js, tour-info.json, WhatsAppFab.jsx, shared.jsx, pages/Company.jsx, pages/Blog.jsx; además site/scripts/prerender.mjs y este informe. Artefactos de auditoría: hojas de contacto locales. dist contiene build actual; dist-ssr preexistente fue preservado por bytes para no alterar trabajo previo.

1. Antes de publicar: validación jurídica de cookies/analítica y del borrador de política; cliente/asesor legal.
2. Antes de indexar: dominio definitivo, aprobación operativa final, permisos de medios/testimonios y activos marcados pendientes; cliente. No se activó indexación.
3. Para vista previa social con imagen: elegir imagen autorizada y dominio definitivo; no bloquea el copy/texto social implementado.
4. Cierre editorial local: APROBADO por auditor-calidad tras verificar correcciones. No hay decisiones de rediseño abiertas ni publicación autorizada.
