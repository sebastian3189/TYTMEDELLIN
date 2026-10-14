import { renderToString } from "react-dom/server";
import { Link, NavLink, Navigate, Route, Routes, StaticRouter, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
var en_default = {
	"(se abre en una pestaña nueva)": "(opens in a new tab)",
	". WhatsApp y los sitios externos aplican sus propias políticas al abrirlos.": ". WhatsApp and external websites apply their own policies when you open them.",
	"265 reseñas en Google": "265 Google reviews",
	"404 · Otro camino": "404 · Another way",
	"A tu ritmo": "At your own pace",
	"Abrir en Google Maps": "Open in Google Maps",
	"Abrir en OpenStreetMap": "Open in OpenStreetMap",
	"Acordamos las paradas según tus intereses y el tiempo disponible, sin convertir el día en una carrera.": "We agree on stops around your interests and available time, without turning the day into a race.",
	"Acordamos paradas, recogidas y espacio de equipaje según el grupo.": "We arrange stops, pickups and luggage space to suit your group.",
	"Acordar un punto de encuentro": "Agree on a meeting point",
	"Acércate al cultivo y al trabajo detrás de una taza. Un encuentro con la cultura cafetera desde Medellín.": "Discover how coffee is grown and the work behind each cup. An encounter with coffee culture from Medellín.",
	"Aeropuerto y traslados": "Airport and transfers",
	"Agencias, hoteles y aliados": "Agencies, hotels and partners",
	"Agua entre montañas, una piedra que domina el paisaje y un pueblo que narra su vida en cada zócalo.": "Water between mountains, a rock overlooking the landscape and a town telling its story through every painted façade.",
	"Al cargarlo, tu navegador se conecta a OpenStreetMap.": "Loading the map connects your browser to OpenStreetMap.",
	"Alcaldía de Guatapé": "Guatapé Mayor's Office",
	"Alcaldía de Medellín": "Medellín Mayor's Office",
	"Aliados y referencias": "Partners and references",
	"Ambiente local": "Local atmosphere",
	"Amplia y cómoda para grupos medianos: excursiones, equipos de trabajo y traslados con equipaje. Consulta su disponibilidad para tu recorrido.": "Spacious and comfortable for medium-sized groups: excursions, work teams and transfers with luggage. Ask about availability for your trip.",
	"Ampliar fotografía": "Enlarge photo",
	"Animales y zonas acuáticas": "Animals and water attractions",
	"Animales, atracciones y zonas acuáticas en Hacienda Nápoles: un parque temático para compartir un día de naturaleza y actividades en familia.": "Animals, attractions and water areas at Hacienda Nápoles: a theme park for a day of nature and family activities.",
	"Anterior: Más experiencias": "Previous: More experiences",
	"Antes de aterrizar": "Before landing",
	"Antes de elegir": "Before choosing",
	"Antes de viajar": "Before you travel",
	"Apertura: Medellín, a otro nivel": "Opening: Medellín, on another level",
	"Apertura: una baraja de doce experiencias. La carta superior se abre en una transición cinematográfica sobre Medellín que termina en la Plaza Botero y luego se despliegan las doce experiencias, cada una con su enlace.": "Opening: a deck of twelve experiences. The top card opens into a cinematic transition over Medellín ending at Plaza Botero. The twelve experiences then unfold, each with its own link.",
	"Aprovecha el tiempo libre para comparar precios entre El Hueco y los outlets antes de decidir.": "Use your free time to compare prices at El Hueco and the outlets before deciding.",
	"Aquí empieza la conversación": "The conversation starts here",
	"Archivo de viajes de T&T Medellín": "T&T Medellín travel archive",
	"Arquitectura colonial": "Colonial architecture",
	"Arquitectura tradicional y encuentros cotidianos le dan carácter a cada pueblo.": "Traditional architecture and everyday encounters give each town its character.",
	"Atardecer y fotografía": "Sunset and photography",
	"Atención personalizada": "Personal attention",
	"Atención personalizada.": "Personal attention.",
	"Aterriza. Nosotros conectamos el camino.": "Land. We'll take it from here.",
	"Autenticidad.": "Authenticity.",
	"Aventura para toda la familia": "Adventure for the whole family",
	"Buscar experiencia": "Find an experience",
	"Buscar una nueva perspectiva": "Find a new perspective",
	Buses: "Coaches",
	"Cada recorrido es una nueva oportunidad para hacerlo bien.": "Every trip is a new opportunity to get it right.",
	"Café, Guatapé, ciudad…": "Coffee, Guatapé, the city…",
	"Calcula tiempo extra para caminar cada pueblo con calma: la ruta pasa por varios, no por uno solo.": "Allow extra time to explore each town at your own pace: the route visits several, not just one.",
	Calidad: "Quality",
	"Calidad.": "Quality.",
	Calificaciones: "Reviews",
	"Calificación: 5.0 de 5 estrellas.": "Rating: 5.0 out of 5 stars.",
	"Calles coloniales, plazas y el Puente de Occidente en una escapada para acercarte a la historia de Antioquia.": "Colonial streets, plazas and the Puente de Occidente on a getaway into Antioquia's history.",
	"Calzado cerrado y con buen agarre: el sendero hacia la cascada exige tracción, y si te animas con el canopy o la vía ferrata lo necesitas todavía más.": "Wear closed shoes with a good grip: the trail to the waterfall needs traction, especially if you also try the zip line or via ferrata.",
	"Calzado con agarre y ropa de cambio. Comunica cualquier necesidad física; las actividades de aventura dependen de requisitos y condiciones del operador.": "Bring grippy shoes and a change of clothes. Tell us about any physical needs; adventure activities are subject to the operator's requirements and conditions.",
	"Calzado cómodo, protección para el sol y espacio en la cámara. Consulta las condiciones de caminata si alguien del grupo necesita apoyo.": "Comfortable shoes, sun protection and room on your camera. Ask about walking conditions if anyone in your group needs assistance.",
	"Camina el Puente de Occidente con calma y reserva tiempo para contemplar el paisaje.": "Walk across the Puente de Occidente at your own pace and allow time to enjoy the scenery.",
	"Camina por un sendero ecológico hasta la cascada del Salto del Buey. El lugar también ofrece opciones de aventura como canopy y vía ferrata.": "Follow an ecological trail to the Salto del Buey waterfall. The site also offers adventures such as a zip line and via ferrata.",
	"Camina sin apuro por sus calles de color: es un pueblo para perderse a pie, no para ver desde el carro.": "Take your time in its colorful streets: this town is best explored on foot, not from a car.",
	"Camina, observa y conversa. Las mejores fotografías también nacen de escuchar.": "Walk, look and talk. Listening also leads to the best photographs.",
	"Caminar entre colores": "Walk among colors",
	"Caminar la memoria": "Walk through history",
	"Cargar mapa interactivo": "Load interactive map",
	"Cascada natural": "Natural waterfall",
	"Categorías del catálogo de la marca. Fotografías de referencia; la unidad asignada y su disponibilidad en Medellín se confirman en la propuesta.": "Vehicle categories from the brand's catalog. Photos are for reference; your assigned vehicle and availability in Medellín are confirmed in the proposal.",
	"Centro histórico": "Historic center",
	"Centro histórico de Santa Fe": "Santa Fe historic center",
	"Cercanía.": "A personal connection.",
	"Cerrar ×": "Close ×",
	Ciudad: "City",
	"Ciudad para escuchar historias": "City stories",
	"Color y tradición": "Color and tradition",
	"Combina opciones de comercio local y outlets con tiempo para decidir.": "Combine local shops and outlets, with time to decide.",
	"Combínalo con un tour de día, como el City Tour o el Tour Miradores, para cerrar la jornada sin perder tiempo de sol.": "Pair it with a daytime experience, such as the City Tour or Viewpoints Tour, to round off the day without missing the daylight.",
	"Comparte el día y la dirección desde la que quieres salir. Si llegas en avión, incluye tu número de vuelo cuando hables con el equipo.": "Share your date and departure address. If you are flying in, include your flight number when you speak with the team.",
	"Comparte el número de viajeros y edades para revisar opciones.": "Share the number of travelers and their ages so we can review the options.",
	"Comparte vuelo, dirección, equipaje y fecha. Preparamos la recogida y el recorrido.": "Share your flight, address, luggage and date. We'll arrange the pickup and journey.",
	"Comparte vuelo, fecha, número de personas y equipaje para preparar la recogida.": "Share your flight, date, group size and luggage to arrange the pickup.",
	"Compartir una pausa": "Share a pause",
	Compromiso: "Commitment",
	"Conductores profesionales": "Professional drivers",
	"Conductores y guías profesionales": "Professional drivers and guides",
	Conecta: "Connect",
	Confianza: "Trust",
	"Confianza con fuente": "Trust you can verify",
	"Confianza.": "Trust.",
	"Confianza. Calidad. Cercanía. Hospitalidad. Autenticidad.": "Trust. Quality. Personal connection. Hospitality. Authenticity.",
	"Confirma vuelo, equipaje, punto de encuentro y condiciones de espera. El valor y la disponibilidad se acuerdan antes de contratar.": "Confirm your flight, luggage, meeting point and waiting arrangements. Price and availability are agreed before booking.",
	"Conoce al equipo": "Meet the team",
	"Conoce el Puente de Occidente y recorre el centro histórico de Santa Fe de Antioquia, entre fachadas coloniales, la plaza y su iglesia principal.": "Discover the Puente de Occidente and Santa Fe de Antioquia's historic center, with its colonial façades, plaza and main church.",
	"Conoce la historia de Medellín a través de sus lugares emblemáticos y la Comuna 13, con sus escaleras eléctricas y murales.": "Explore Medellín's history through its landmarks and Comuna 13, with its outdoor escalators and murals.",
	"Conocer el traslado": "Explore the transfer",
	"Conservar la cercanía": "Keep the personal connection",
	"Consolidar un equipo": "Build a team",
	"Consulta fechas y disponibilidad": "Ask about dates and availability",
	"Consulta las opciones de canopy y vía ferrata si quieres ampliar el plan. Se confirman por separado.": "Ask about zip-line and via-ferrata options if you want to extend the experience. These are confirmed separately.",
	"Consulta las áreas de fauna y atracciones disponibles para el día de tu visita.": "Ask which wildlife areas and attractions will be available on the day of your visit.",
	"Consultar este vehículo": "Ask about this vehicle",
	"Consultar la política de tratamiento de datos de la empresa": "Read the company's data protection policy",
	"Consultar por WhatsApp": "Ask via WhatsApp",
	Contacto: "Contact",
	"Contacto y derechos": "Contact and your rights",
	"Contempla el embalse y las montañas desde la Piedra del Peñol. El recorrido continúa por las calles de Guatapé, entre zócalos pintados a mano y el malecón.": "Take in the reservoir and mountains from the Piedra del Peñol. Continue through Guatapé's streets, hand-painted façades and waterfront.",
	"Contempla el valle y las montañas mientras la luz transforma el paisaje de Medellín.": "Watch the valley and mountains as light transforms Medellín's landscape.",
	"Conversar con el equipo": "Talk to the team",
	"Coordinación de personas, puntos de encuentro y horarios para el propósito de tu jornada.": "Coordinating people, meeting points and schedules around the purpose of your day.",
	"Coordinamos el transporte privado y el recorrido contigo. La propuesta confirma las paradas, el acompañamiento, los horarios y el valor antes de contratar.": "We arrange private transport and the route with you. The proposal confirms stops, guidance, schedules and price before booking.",
	"Coordinamos tu traslado entre el Aeropuerto José María Córdova y tu alojamiento en Medellín. Comparte tu número de vuelo, la dirección y el número de pasajeros para organizar la recogida.": "We coordinate your transfer between José María Córdova Airport and your accommodation in Medellín. Share your flight number, address and passenger count to arrange pickup.",
	Correo: "Email",
	Cotizar: "Get a quote",
	"Cuaderno de viaje": "Travel journal",
	"Cuaderno de viaje · En grupo": "Travel journal · Group travel",
	"Cuaderno de viaje · Inspiración": "Travel journal · Inspiration",
	"Cuaderno de viaje · Planeación": "Travel journal · Planning",
	"Cuando el valle enciende sus luces.": "When the valley lights up.",
	"Cultura y tradición": "Culture and tradition",
	"Cuéntanos edades, equipaje, movilidad e intereses. El equipo revisa las opciones y confirma lo que es posible para la fecha elegida.": "Tell us about ages, luggage, mobility and interests. The team reviews the options and confirms what is possible for your chosen date.",
	"Cuéntanos qué": "Tell us what",
	"Cuéntanos qué te interesa y cuánto tiempo tienes. Antes de confirmar, revisa las paradas, los servicios incluidos, el valor y las condiciones de cambio.": "Tell us what interests you and how much time you have. Before confirming, review the stops, included services, price and change conditions.",
	"Cámara de Comercio de Medellín": "Medellín Chamber of Commerce",
	"Cómo funciona esta consulta": "How your inquiry works",
	"De las plazas a los murales, descubre Medellín a través de las personas y las historias que le dan forma.": "From plazas to murals, discover Medellín through the people and stories that shape it.",
	"De un sueño": "From a dream",
	"Definir qué estás buscando": "Decide what you're looking for",
	"Degustación y tradición": "Tasting and tradition",
	"Deja margen para el traslado al aeropuerto y confirma la hora de recogida según tu vuelo.": "Allow enough time for the airport transfer and confirm pickup time around your flight.",
	"Deja tiempo para la plaza principal y la iglesia después del centro histórico: son la última parada de la ruta.": "Leave time for the main plaza and church after the historic center: they are the last stop on the route.",
	"Dejar espacio para disfrutar": "Leave time to enjoy",
	"Dejar espacio para lo que encuentres": "Make room for your finds",
	"Del primer traslado": "From your first transfer",
	Descubre: "Discover",
	"Descubre Medellín después del atardecer: sus miradores ofrecen otra perspectiva del valle y de las luces de la ciudad.": "Discover Medellín after sunset: its viewpoints offer another perspective on the valley and city lights.",
	"Desde el inicio fueron demasiado amables, la atención y seguimiento de cada día fue excelente. Nos sentimos cómodos, seguros y bien recibidos. La experiencia superó nuestras expectativas, volveríamos a contratarlos sin dudar.": "They were so kind from the start; the attention and daily follow-up were excellent. We felt comfortable, safe and welcome. The experience exceeded our expectations. We would hire them again without hesitation.",
	"Desde los primeros traslados, aprendimos a escuchar. Esa cercanía sigue guiando nuestra forma de recibir y acompañar.": "We learned to listen from our very first transfers. That personal connection still shapes the way we welcome and accompany you.",
	"Detalles del recorrido": "Tour details",
	"Diseñada especialmente para tours grupales con máxima visibilidad. Consulta su disponibilidad para el recorrido que tienes en mente.": "Designed especially for group tours with excellent visibility. Ask about availability for the trip you have in mind.",
	Disfruta: "Enjoy",
	"Doce maneras de empezar. Medellín y los recorridos por Antioquia que nacen desde nuestra ciudad.": "Twelve ways to begin. Medellín and the journeys through Antioquia that start in our city.",
	"El City Tour y la Comuna 13 acercan arte y vida urbana. El recorrido de compras pone el acento en el comercio local.": "The City Tour and Comuna 13 bring you closer to art and urban life. The shopping tour focuses on local commerce.",
	"El Hueco y outlets": "El Hueco and outlets",
	"El Hueco, outlets y tiendas locales.": "El Hueco, outlets and local shops.",
	"El Puente de Occidente conecta el recorrido con el paisaje de la región.": "The Puente de Occidente connects the route with the region's landscape.",
	"El agua es el centro de la experiencia: un momento para detenerse y mirar.": "Water is at the heart of the experience: a moment to stop and look.",
	"El agua también es parte del plan": "Water is part of the plan too",
	"El archivo de nuestros viajes": "Our travel photo archive",
	"El atardecer es una invitación a observar. El clima decide los colores de cada salida.": "Sunset invites you to look closely. The weather sets the colors of each outing.",
	"El buen viaje empieza con cinco datos.": "A great trip starts with five details.",
	"El café y el Salto del Buey proponen experiencias al aire libre distintas. Describe tus preferencias y condición para que el equipo oriente el plan.": "Coffee and Salto del Buey offer different outdoor experiences. Share your preferences and fitness level so the team can guide your plans.",
	"El camino": "The journey",
	"El camino también es el destino.": "The journey is part of the destination.",
	"El centro histórico se descubre a pie, mirando fachadas y detalles de su arquitectura.": "Discover the historic center on foot, taking in its façades and architectural details.",
	"El clima puede cambiar entre pueblos. Consulta las localidades del itinerario y lleva ropa para una jornada de carretera y caminatas.": "Weather can change between towns. Check the stops on your itinerary and bring clothes for a day of driving and walking.",
	"El color cuenta una historia": "Color tells a story",
	"El color se vive sin prisa.": "Color is best enjoyed slowly.",
	"El día se despide": "The day says goodbye",
	"El enlace entre el Aeropuerto José María Córdova y tu alojamiento en Medellín, organizado desde antes de llegar.": "Your connection between José María Córdova Airport and your accommodation in Medellín, arranged before you arrive.",
	"El equipaje": "Luggage",
	"El espacio justo.": "Just the right space.",
	"El espíritu del recorrido": "The spirit of the journey",
	"El formulario prepara un resumen en tu navegador. No envía datos a una base de datos ni confirma reservas. Al pulsar «Copiar solicitud», el contenido se copia al portapapeles; tú decides si lo pegas y envías por WhatsApp.": "The form prepares a summary in your browser. It does not send data to a database or confirm bookings. Clicking “Copy inquiry” copies the content to your clipboard; you decide whether to paste and send it via WhatsApp.",
	"El horizonte tiene otro color.": "The horizon takes on a new color.",
	"El malecón y las vistas del agua completan un día que comienza y termina en Medellín.": "The waterfront and views over the water complete a day that begins and ends in Medellín.",
	"El número de asientos no cuenta toda la historia. Comparte cuántas maletas llevan y cualquier requerimiento especial.": "Seat count is not the whole story. Tell us how many bags you are bringing and any special requirements.",
	"El oficio detrás del aroma": "The craft behind the aroma",
	"El paisaje cambia al dejar la ciudad y entrar en el Oriente Antioqueño.": "The landscape changes as you leave the city for eastern Antioquia.",
	"El primer trayecto en Medellín": "Your first journey in Medellín",
	"El recorrido comienza al bajar la luz: definimos contigo el punto de salida y el ritmo del plan.": "The tour begins as the light fades: we agree on your departure point and the pace of the outing.",
	"El recorrido invita a caminar por un entorno natural y a observar el paisaje de cerca.": "The route invites you to walk through a natural setting and look closely at the landscape.",
	"El seguimiento del vuelo ayuda a coordinar el encuentro. Confirma las condiciones de espera.": "Flight tracking helps us coordinate your meeting. Confirm the waiting arrangements.",
	"El servicio incluye seguimiento del vuelo. Confirma con el equipo el punto de encuentro y las condiciones de espera.": "The service includes flight tracking. Confirm the meeting point and waiting arrangements with the team.",
	"El servicio prestado superó las expectativas que traía. Tienes un equipo súper, híper, mega genial y profesional. Si regresara en otra ocasión de seguro los escogería y con seguridad lo recomendaré a mis amigos que quieran visitar Colombia.": "The service exceeded my expectations. You have an absolutely wonderful, professional team. If I return, I will definitely choose you again, and I will certainly recommend you to friends wanting to visit Colombia.",
	"El tamaño del grupo": "Group size",
	"El tiempo de la plaza": "Time in the plaza",
	"El viaje forma parte de la experiencia. Coordinamos tiempos para aprovechar la visita con calma.": "The journey is part of the experience. We coordinate timings so you can enjoy your visit at a relaxed pace.",
	"El viaje puede continuar": "The journey can continue",
	"Elegir nota": "Choose an article",
	"Elegir tu nivel de aventura": "Choose your level of adventure",
	"Elige el tipo de solicitud y prepara tu mensaje. Compártelo con nuestro equipo en WhatsApp.": "Choose your inquiry type and prepare your message. Share it with our team on WhatsApp.",
	"Elige la categoría que se ajusta a tu grupo. Confirmamos unidad, equipaje y equipamiento al cotizar.": "Choose the category that suits your group. We confirm the vehicle, luggage space and equipment when quoting.",
	"Elige tu próximo recuerdo": "Choose your next memory",
	"Empresa muy seria, responsable. Sarai fue nuestra asesora comercial y es una persona increíble. En general, todo el personal que tuvimos en cada tour fueron excelentes! Recomendados al 100%. Volveríamos a contratar con ellos.": "A very reliable, responsible company. Sarai was our sales adviser and she is an incredible person. Everyone who accompanied us on each tour was excellent! Highly recommended. We would hire them again.",
	"Empresas y eventos": "Companies and events",
	"Empresas, agencias y grupos": "Companies, agencies and groups",
	"En 2020 nació la idea. En 2021 comenzaron los primeros traslados con un automóvil. Las conversaciones con los viajeros ayudaron a dar forma a nuestra manera de trabajar.": "The idea began in 2020. The first transfers started in 2021 with one car. Conversations with travelers helped shape the way we work.",
	"En el pueblo, camina entre calles adoquinadas y zócalos pintados a mano, y visita el malecón frente al agua.": "In town, walk through cobbled streets and hand-painted façades, and visit the waterfront promenade.",
	"En esta experiencia": "In this experience",
	"En grupo": "Group travel",
	"En la Comuna 13, el arte urbano y las escaleras eléctricas acompañan el relato del barrio.": "In Comuna 13, urban art and outdoor escalators accompany the neighborhood's story.",
	Enamórate: "Fall in love",
	"Encontrar color en lo cotidiano": "Find color in everyday life",
	"Encontrarse con la cascada": "Meet the waterfall",
	"Encuentra tu experiencia": "Find your experience",
	"Encuentra tu recorrido": "Find your journey",
	"Enlaces del pie": "Footer links",
	"Entradas, alimentación y actividades adicionales se detallan en la cotización. Consulta qué está incluido y qué se paga por separado.": "Admission, meals and additional activities are detailed in your quote. Ask what is included and what is paid separately.",
	"Entrar en el verde": "Step into the green",
	"Entre hojas y granos": "Among leaves and beans",
	"Envíanos tu número de vuelo apenas reserves: así ajustamos la hora de recogida sin que tengas que llamar.": "Send us your flight number as soon as you book so we can adjust pickup time without you needing to call.",
	"Equipo de T&T Medellín": "The T&T Medellín team",
	"Es la segunda vez que utilizamos la compañía, y la seguiremos utilizando en el futuro. Estamos 100% complacidos con el servicio. Yo tengo una lesión en la rodilla y ellos hasta me cargaron en la espalda para ayudarme a bajar escaleras, y me consiguieron silla de ruedas en todos los lugares.": "This is our second time using the company, and we will keep using them. We are completely satisfied with the service. I have a knee injury, and they even carried me on their back to help me down stairs and found wheelchairs for me everywhere.",
	"Escribir un correo": "Send an email",
	"Escribir por WhatsApp": "Message us on WhatsApp",
	"Escríbenos por WhatsApp (se abre en una pestaña nueva)": "Message us on WhatsApp (opens in a new tab)",
	"Escríbenos, llámanos o prepara una consulta con los detalles de tu recorrido.": "Write, call or prepare an inquiry with the details of your journey.",
	"Escuchamos tu propósito y damos seguimiento a lo acordado.": "We listen to your plans and follow up on what we agree.",
	"Esperar el cambio de luz": "Wait for the light to change",
	"Este recorrido": "This journey",
	"Este recorrido acerca la historia de Medellín a través de sus lugares emblemáticos y sus barrios. En la Comuna 13, las escaleras eléctricas y los murales forman parte del paisaje urbano que conocerás.": "This route introduces Medellín's history through its landmarks and neighborhoods. In Comuna 13, outdoor escalators and murals form part of the urban landscape you will discover.",
	"Este sitio no incorpora analítica publicitaria ni almacenamiento de solicitudes. Las fotografías y las fuentes se sirven desde el proyecto.": "This site does not use advertising analytics or store inquiries. Photos and fonts are served from the project.",
	"Esto también": "This is also",
	"Excelente experiencia de principio a fin. Desde la planificación del viaje hasta la ejecución de cada actividad, el equipo demostró un alto nivel de profesionalismo, organización y conocimiento. Todo el personal fue sumamente amable y atento.": "An excellent experience from start to finish. From planning the trip to each activity, the team showed great professionalism, organization and knowledge. Everyone was extremely kind and attentive.",
	"Excelente para grupos familiares o pequeños equipos de trabajo, con asientos individuales y sitio de sobra para el equipaje.": "Great for families or small work teams, with individual seats and plenty of luggage space.",
	"Experiencia diferente": "A different experience",
	Experiencias: "Experiences",
	"Experiencias a medida.": "Tailor-made experiences.",
	"Experiencias a medida. Vehículo privado. Atención personalizada.": "Tailor-made experiences. Private vehicle. Personal attention.",
	"Experiencias a otro nivel": "Experiences on another level",
	Explora: "Explore",
	"Explora a tu ritmo": "Explore at your own pace",
	"Explora los recorridos desde Medellín y conversa con nuestro equipo para planear tu experiencia.": "Explore journeys from Medellín and talk with our team to plan your experience.",
	"Explorar experiencias": "Explore experiences",
	"Explorar juntos": "Explore together",
	"Fachadas, conversaciones de plaza y cultura cafetera en uno de los recorridos por Antioquia que parten de Medellín.": "Colorful façades, conversations in the plaza and coffee culture on a journey through Antioquia from Medellín.",
	Familia: "Family",
	"Filtrar experiencias": "Filter experiences",
	"Finca cafetera": "Coffee farm",
	"Formas de viajar": "Ways to travel",
	Foto: "Photo",
	Fotografía: "Photo",
	"Fotografía anterior": "Previous photo",
	"Fotografía siguiente": "Next photo",
	Fotografías: "Photos",
	"Fotografías de City Tour & Comuna 13": "Photos of City Tour & Comuna 13",
	"Fotos y videos del recorrido": "Photos and videos of the tour",
	"Fue un excelente servicio de inicio a fin, la comunicación con Sarai fue excepcional. Nos recogieron de forma muy cumplida y al final del concierto nos recogieron en el lugar acordado. Los vehículos en muy buen estado.": "Excellent service from start to finish. Communication with Sarai was exceptional. They picked us up right on time and met us at the agreed place after the concert. The vehicles were in very good condition.",
	"Fuimos 2 personas y tuvimos una muy buena experiencia con todo el equipo. Todo estuvo bien organizado, el transporte fue puntual y siempre fueron muy atentos. Queremos destacar especialmente al guía Albeiro, quien fue súper amable y excelente guía.": "There were two of us, and we had a very good experience with the entire team. Everything was well organized, transport was punctual and they were always attentive. Special thanks to Albeiro, who was so kind and an excellent guide.",
	"GUATAPÉ · PIEDRA DEL PEÑOL": "GUATAPÉ · PIEDRA DEL PEÑOL",
	"Gracias por tanto calor humano en estas vacaciones, nos cuidaron, siempre estuvieron atentos a lo que necesitamos, nos guiaron y nos aconsejaron. Son un gran equipo, nunca nos vieron como cliente sino nos trataron como si fuéramos grandes amigos de mucho tiempo.": "Thank you for the warmth you showed us on this vacation. You looked after us, paid attention to our needs, guided and advised us. You're a great team: you treated us like longtime friends, not just customers.",
	"Grafiti y arte urbano": "Graffiti and urban art",
	"Guardar el panorama": "Capture the panorama",
	"Guatapé, Santa Fe, Jardín y Oriente ofrecen maneras diferentes de acercarse al territorio. Consulta tiempos de traslado antes de llenar tu agenda.": "Guatapé, Santa Fe, Jardín and Oriente offer different ways to discover the region. Check driving times before filling your schedule.",
	"Guía Local": "Local Guide",
	"Hablar con el equipo": "Talk to the team",
	"Hay lugares que enseñan a ir despacio.": "Some places teach you to slow down.",
	"Hay una Medellín que se mira.": "There is a Medellín you can see.",
	"Hecho para ti": "Made for you",
	"Historia y cultura local": "Local history and culture",
	"Historias de quienes viajaron con nosotros": "Stories from people who traveled with us",
	"Hospitalidad, respeto y disposición para acompañar a cada viajero.": "Hospitality, respect and a willingness to support every traveler.",
	"Hospitalidad.": "Hospitality.",
	Hoy: "Today",
	"Hoy seguimos cuidando lo que nos hizo empezar: hospitalidad, dedicación y orgullo por compartir nuestra tierra.": "Today we still care for what inspired us to begin: hospitality, dedication and pride in sharing our home.",
	"Ideal para grupos grandes, eventos corporativos y excursiones extendidas. Disponibles en configuraciones de 25, 35 y 40 pasajeros.": "Ideal for large groups, corporate events and longer excursions. Available in 25-, 35- and 40-passenger configurations.",
	"Ideal para viajes ejecutivos y traslados al aeropuerto. Máximo confort y elegancia para una a tres personas.": "Ideal for business travel and airport transfers. Comfort and elegance for one to three people.",
	"Ideas para viajar": "Ideas for traveling",
	"Iglesia y plaza principal": "Church and main plaza",
	"Imaginar el camino": "Imagine the journey",
	"Indica maletas y equipos: la capacidad cambia según lo que lleves.": "Tell us about bags and equipment: capacity depends on what you bring.",
	"Información clara": "Clear information",
	"Información comprensible y una conversación directa para organizarte.": "Clear information and a direct conversation to help you plan.",
	Inicio: "Home",
	Inspiración: "Inspiration",
	Inspírate: "Be inspired",
	"La Piedra del Peñol abre el paisaje del embalse. Consulta el acceso y las opciones de ascenso al organizar tu visita.": "The Piedra del Peñol opens up views over the reservoir. Ask about access and climbing options when planning your visit.",
	"La Piedra del Peñol ofrece una vista abierta del embalse y las montañas de Antioquia. Es una de las paradas del recorrido antes de conocer Guatapé.": "The Piedra del Peñol offers wide views of the reservoir and Antioquia's mountains. It is one of the stops before exploring Guatapé.",
	"La cantidad de personas, el equipaje y las necesidades de movilidad ayudan a proponer un vehículo y un ritmo adecuados.": "Group size, luggage and mobility needs help us suggest the right vehicle and pace.",
	"La ciudad como punto de partida": "The city as a starting point",
	"La ciudad se ilumina": "The city lights up",
	"La colección T&T": "The T&T collection",
	"La comodidad también es parte del viaje": "Comfort is part of the journey too",
	"La degustación reúne la historia del recorrido en un momento para detenerse y compartir.": "The tasting brings the story of the tour together in a moment to pause and share.",
	"La dirección de llegada y las necesidades del grupo guían la elección del vehículo.": "Your arrival address and group needs guide the choice of vehicle.",
	"La disponibilidad y el valor se confirman con el equipo.": "Availability and price are confirmed with the team.",
	"La encuentras en una conversación, en el color de una calle y en la curva que abre un nuevo paisaje. Queremos acompañarte a descubrirla con el cuidado de un equipo local.": "You find it in a conversation, the color of a street and the bend that reveals a new landscape. We want to help you discover it with the care of a local team.",
	"La experiencia": "The experience",
	"La experiencia fue súper buena. Desde la atención previa a los tours y las recomendaciones, el trato de Sarai siempre fue excepcional. El guía Albeiro fue súper atento, súper amable, súper paciente y con gran conocimiento. Los almuerzos incluidos son muy buenos.": "The experience was wonderful. From the pre-tour attention to the recommendations, Sarai's service was exceptional. Albeiro was very attentive, kind, patient and knowledgeable. The included lunches were very good.",
	"La fecha y el punto de partida": "Your date and departure point",
	"La noche cambia las distancias, los colores y la forma de sentir Medellín. Recorre su otra cara con un plan coordinado.": "Night changes distances, colors and the way Medellín feels. Discover another side of the city with a coordinated plan.",
	"La pausa de una taza": "Pause for a cup",
	"La plaza y la iglesia principal son puntos de encuentro para cerrar la visita antes de regresar.": "The plaza and main church provide a final meeting point before the return journey.",
	"La recogida y el regreso se coordinan para que puedas concentrarte en disfrutar.": "Pickup and return are coordinated so you can focus on enjoying the experience.",
	"La ruta conecta puntos desde los que la ciudad se descubre con otra escala.": "The route connects viewpoints that reveal the city on a different scale.",
	"La ruta, las paradas y la fecha determinan la unidad disponible.": "Your route, stops and date determine the available vehicle.",
	"La subida a la Piedra exige esfuerzo. Cuéntanos las necesidades de movilidad del grupo y confirma entradas, alimentación y actividades antes de viajar.": "Climbing the Piedra requires effort. Tell us about your group's mobility needs and confirm admission, meals and activities before traveling.",
	"La vida alrededor de la plaza y la cultura cafetera dan contexto a cada encuentro.": "Life around the plaza and coffee culture give context to every encounter.",
	"La vida alrededor de una plaza": "Life around a plaza",
	"La visita combina paradas por la ciudad con un acercamiento a los cambios que han vivido sus comunidades.": "The visit combines city stops with an introduction to the changes its communities have experienced.",
	"Las calles de Guatapé invitan a detenerse frente a los zócalos y a recorrer el pueblo a pie.": "Guatapé's streets invite you to pause at its painted façades and explore the town on foot.",
	"Las calles tradicionales y las fachadas de Jardín invitan a caminar y observar.": "Jardín's traditional streets and colorful façades invite you to walk and look around.",
	"Las vistas nocturnas y el ambiente local son el centro de esta experiencia.": "Nighttime views and local atmosphere are at the heart of this experience.",
	"Las zonas acuáticas ofrecen otra forma de compartir. Acordamos el pasaporte y las actividades antes de confirmar.": "The water areas offer another way to spend time together. We agree on the admission package and activities before confirming.",
	"Leer la nota": "Read the article",
	"Leer más": "Read more",
	"Llamar a T&T Medellín": "Call T&T Medellín",
	"Llamar al +57 304 496 1698": "Call +57 304 496 1698",
	"Llega con la cámara cargada y lista: el recorrido está pensado para el atardecer, y la luz cambia rápido de un mirador a otro.": "Bring your camera charged and ready: the tour is timed for sunset, and the light changes quickly between viewpoints.",
	"Lleva abrigo ligero y batería para la cámara. La visibilidad depende del clima y las paradas se confirman con el equipo.": "Bring a light jacket and a charged camera. Visibility depends on the weather; stops are confirmed with the team.",
	"Lleva algo de abrigo: los miradores están en alto y refresca más que en el centro de la ciudad.": "Bring a warm layer: the viewpoints are higher up and cooler than the city center.",
	"Lleva calzado cómodo para subir hasta el mirador de la Piedra del Peñol: es el tramo que regala la vista sobre la represa.": "Wear comfortable shoes to climb to the Piedra del Peñol viewpoint, where you can look out over the reservoir.",
	"Lleva calzado cómodo y comunica el volumen de compras previsto. Las compras y acuerdos con comercios no están incluidos en el transporte.": "Wear comfortable shoes and tell us how much shopping you expect to do. Purchases and arrangements with shops are not included in transport.",
	"Lleva cambio de ropa, protección solar y lo necesario para actividades acuáticas. El pasaporte, las entradas y las restricciones deben confirmarse.": "Bring a change of clothes, sun protection and what you need for water activities. Admission packages, tickets and restrictions must be confirmed.",
	"Lleva la cámara con espacio de sobra: entre las escaleras eléctricas y el arte urbano, es el recorrido que más fotografías deja.": "Bring plenty of space on your camera: between the outdoor escalators and urban art, there is a lot to photograph.",
	"Lleva ropa de cambio: entre el sendero y la cascada, es casi seguro que termines mojado.": "Bring a change of clothes: between the trail and the waterfall, you are likely to get wet.",
	"Lleva ropa fresca y protección solar. Consulta tiempos de caminata, entradas y paradas de alimentación al organizar la salida.": "Wear light clothing and sun protection. Ask about walking times, admission and meal stops when planning your trip.",
	"Lleva una capa ligera para los miradores. Confirma horarios y paradas con el equipo; el recorrido no implica entradas a establecimientos.": "Bring a light layer for the viewpoints. Confirm schedules and stops with the team; admission to venues is not included in the tour.",
	"Lleva una chaqueta ligera: en los miradores nocturnos refresca más que en el centro de la ciudad.": "Bring a light jacket: nighttime viewpoints are cooler than the city center.",
	Llámanos: "Call us",
	"Lo demás,": "Everything else,",
	"Lo que cuenta": "What matters",
	"Lo que esperas del día": "What you want from the day",
	"Lo que nos mueve": "What drives us",
	"Los detalles importan: desde el primer mensaje hasta el punto de regreso.": "Details matter, from the first message to the return point.",
	"Los traslados al aeropuerto nos enseñan a escuchar.": "Airport transfers teach us to listen.",
	"Lugares emblemáticos": "City landmarks",
	"Lugares emblemáticos para ubicarte en Medellín y empezar a entender su identidad.": "Landmarks to help you find your bearings in Medellín and begin to understand its identity.",
	Menú: "Menu",
	"Miradores icónicos": "Iconic viewpoints",
	"Mirar desde lo alto": "Look from above",
	"Monitoreo de vuelos": "Flight tracking",
	"Más experiencias": "More experiences",
	"Más que llegar": "More than arriving",
	"Nacimos con la intención de recibir bien. Crecemos escuchando a las personas que nos acompañan.": "We began with the intention of welcoming people well. We grow by listening to those who travel with us.",
	Naturaleza: "Nature",
	"Naturaleza para mirar de cerca": "A closer look at nature",
	"Naturaleza y cultura cafetera": "Nature and coffee culture",
	"No hay una única forma de descubrir Medellín y los recorridos que parten desde aquí. Elige según lo que quieras sentir.": "There is no single way to discover Medellín and the journeys that start here. Choose according to what you want to feel.",
	"No solo visites Medellín. Vívela.": "Don't just visit Medellín. Live it.",
	Noche: "Night",
	"Noche en Medellín": "Medellín at Night",
	"Nombre, teléfono, correo opcional y los detalles del recorrido. El equipo utiliza la solicitud que envíes para responder y preparar la propuesta. Evita incluir documentos de identidad o información sensible.": "Your name, phone number, optional email and trip details. The team uses the inquiry you send to respond and prepare a proposal. Avoid including identity documents or sensitive information.",
	"Nos adaptamos.": "We adapt.",
	"Nos cuentas el tipo de compras y las zonas de interés para orientar la ruta.": "Tell us what you want to shop for and which areas interest you so we can plan the route.",
	"Nos encargamos del camino": "We'll take care of the journey",
	"Nos encuentras en": "Find us at",
	"Nos importan las personas.": "People matter to us.",
	"Nos mueve nuestra tierra.": "Our home inspires us.",
	Nosotros: "About us",
	"Nota anterior": "Previous article",
	"Nota siguiente": "Next article",
	"Notas del equipo para elegir, preparar y disfrutar tus recorridos desde Medellín.": "Notes from our team to help you choose, prepare and enjoy your journeys from Medellín.",
	"Nuestra casa. Nuestra gente.": "Our home. Our people.",
	"Nuestra experiencia con el tour privado fue sencillamente excepcional. Desde el primer momento, la organización y comunicación fueron impecables, lo que nos brindó mucha confianza y tranquilidad durante todo el proceso. Se nota claramente el excelente manejo administrativo que tienen.": "Our private tour was simply exceptional. From the very start, organization and communication were impeccable, giving us confidence and peace of mind throughout the process. You can clearly see their excellent management.",
	"Nuestra historia": "Our story",
	"Nuestros valores": "Our values",
	"Oficina de T&T Medellín. Escríbenos antes de venir para coordinar tu visita.": "T&T Medellín office. Message us before coming so we can arrange your visit.",
	"Oficina, equipo y desarrollo de flota en Medellín.": "Office, team and fleet development in Medellín.",
	"Opiniones sobre Transporte & Turismo Medellín publicadas en Google. Referencia: septiembre de 2026.": "Reviews of Transporte & Turismo Medellín published on Google. Reference: September 2026.",
	"Organiza con nosotros la salida y el regreso: es una experiencia que necesita tiempo de carretera.": "Plan your departure and return with us: this experience requires time on the road.",
	"Organiza una jornada por El Hueco, outlets y tiendas locales con los lugares que realmente te interesan.": "Plan a day at El Hueco, outlets and local shops, focusing on the places that interest you.",
	"Organizar un recorrido es más sencillo cuando la conversación empieza por lo importante.": "Planning a trip is easier when the conversation starts with what matters.",
	"Otro nivel de servicio. Alan es un tipazo, las unidades están impecables y la atención es impecable de principio a fin. Te resuelven todo y viajas con total tranquilidad. Si vienes a Medellín, este es el contacto que tienes que asegurar.": "Service on another level. Alan is a great guy, the vehicles are spotless and the attention is impeccable from start to finish. They take care of everything so you can travel with peace of mind. If you're coming to Medellín, this is the contact you need.",
	"Otros caminos": "Other paths",
	"Paisajes de montaña": "Mountain landscapes",
	"Paisajes impresionantes": "Impressive scenery",
	"Paisajes inolvidables": "Unforgettable landscapes",
	"Para consultar, actualizar o solicitar la eliminación de información compartida con T&T, contacta a": "To access, update or request deletion of information shared with T&T, contact",
	"Parque temático": "Theme park",
	"Pausar el movimiento de los aliados": "Pause the partner carousel",
	"Pensar en el equipaje": "Think about luggage",
	"Pequeñas paradas, grandes recuerdos": "Small stops, great memories",
	"Pequeños detalles, mejor viaje": "Small details, a better trip",
	"Perfecta para grupos pequeños que buscan espacio y comodidad superior, con altura y versatilidad para rutas regionales.": "Perfect for small groups seeking extra space and comfort, with the height and versatility for regional routes.",
	"Perfecto con excelente, el city tour comuna 13 excelente servicio, por parte del conductor (Francisco) y el guía (Brian), sin palabras, que Chimba Medellín, ahhh no olviden pedir la bandeja paisa al la hora del almuerzo brutal!!!": "Absolutely excellent! The City Tour and Comuna 13 service was amazing, from the driver Francisco and guide Brian. What a fantastic city! Don't forget to order bandeja paisa at lunch—it was incredible!",
	"Personas del equipo de T&T Medellín": "People from the T&T Medellín team",
	"Personas que": "People who",
	"Personas, maletas": "People, bags",
	"Planea el día completo sin prisa: entre animales y atracciones no alcanza a verse todo en pocas horas.": "Plan a full day at an unhurried pace: the animals and attractions need more than just a few hours.",
	"Planea esta experiencia": "Plan this experience",
	Planeación: "Planning",
	"Planeamos teniendo en cuenta las personas, la ruta y las condiciones del recorrido.": "We plan around the people, route and travel conditions.",
	"Planeemos el siguiente camino": "Let's plan the next journey",
	"Planeemos tu viaje": "Let's plan your trip",
	"Poner rumbo a un día distinto": "Set off for a different kind of day",
	"Pregunta a tu guía por el mural que más te llame la atención: cada grafiti de la Comuna 13 cuenta una historia distinta.": "Ask your guide about the mural that catches your eye: every piece of graffiti in Comuna 13 tells a different story.",
	"Pregunta por el proceso completo del grano, de la siembra a la taza: es el hilo conductor de todo el recorrido.": "Ask about the full process, from planting the bean to serving the cup: it connects the whole tour.",
	"Pregunta por la cultura cafetera de la zona: es parte central de lo que hace especial a Jardín.": "Ask about the area's coffee culture: it is central to what makes Jardín special.",
	"Prepara la cámara y disfruta de las vistas antes de regresar al punto acordado.": "Get your camera ready and enjoy the views before returning to the agreed meeting point.",
	Principal: "Main navigation",
	Privacidad: "Privacy",
	"Proceso del café": "Coffee production",
	"Propuesta para tu grupo": "A proposal for your group",
	"Prueba la primera taza sin azúcar: así distingues mejor las notas que explica el guía durante la degustación.": "Try the first cup without sugar so you can better identify the flavors your guide describes during the tasting.",
	"Pueblo de Guatapé": "Guatapé town",
	"Pueblo de Guatapé y sus zócalos": "Guatapé and its painted façades",
	"Pueblo patrimonio": "Heritage town",
	Pueblos: "Towns",
	"Pueblos con encanto": "Charming towns",
	"Pueblos para cambiar de ritmo": "Towns for a change of pace",
	"Pueblos, plazas y montañas: una salida desde Medellín para mirar Antioquia a un ritmo más tranquilo.": "Towns, plazas and mountains: a journey from Medellín to discover Antioquia at a more relaxed pace.",
	"Puerta a puerta": "Door to door",
	"Punto de encuentro": "Meeting point",
	"Queremos agradecer a todo el equipo de Transporte y Turismo Medellín por los tours que nos brindaron como grupo. Todo fue excelente: puntualidad, guías muy amables, transporte cómodo y seguro, y las rutas súper bien organizadas. De verdad que la experiencia fue 100% satisfactoria.": "We want to thank the entire Transporte y Turismo Medellín team for our group tours. Everything was excellent: punctuality, very friendly guides, comfortable and safe transport, and well-organized routes. It was a completely satisfying experience.",
	"Quiero agradecer a la empresa de transporte turismo Medellín, por el excelente servicio que nos brindó durante la celebración de mi cumpleaños. Desde el primer contacto demostraron profesionalismo, puntualidad y una atención impecable.": "I want to thank Transporte Turismo Medellín for the excellent service during my birthday celebration. From the first contact they showed professionalism, punctuality and impeccable attention.",
	"Quiénes van contigo": "Who's coming with you",
	"Qué compartes": "What you share",
	"Qué incluye": "What's included",
	"Recibir a los primeros viajeros": "Welcome the first travelers",
	"Recogida en tu hotel en Medellín": "Pickup at your hotel in Medellín",
	"Recorre El Hueco, outlets de fábrica y tiendas locales para conocer distintas opciones de compra en Medellín.": "Explore El Hueco, factory outlets and local shops to discover different shopping options in Medellín.",
	"Recorre Jardín entre fachadas de colores, calles tradicionales y cultura cafetera: una visita para conocer la vida de este pueblo de Antioquia.": "Explore Jardín's colorful façades, traditional streets and coffee culture: a visit to discover life in this Antioquian town.",
	"Recorre el entorno de una finca y conoce cómo empieza el camino del café.": "Explore a farm and learn how coffee begins its journey.",
	"Recorre los miradores de Medellín al atardecer y contempla la ciudad y las montañas desde distintas perspectivas.": "Visit Medellín's viewpoints at sunset and see the city and mountains from different perspectives.",
	"Recorre los pueblos del Oriente Antioqueño entre plazas, arquitectura tradicional y paisajes de montaña.": "Explore eastern Antioquia's towns, with their plazas, traditional architecture and mountain landscapes.",
	"Recorrer y comparar": "Explore and compare",
	"Recorrido de T&T Medellín": "A T&T Medellín journey",
	"Recorridos privados": "Private tours",
	"Recorridos, traslados y movilidad coordinada desde Medellín para viajeros, empresas y aliados.": "Tours, transfers and coordinated transport from Medellín for travelers, companies and partners.",
	Recuerda: "Remember",
	"Reducir movimiento": "Reduce motion",
	"Regresar con tranquilidad": "Return with peace of mind",
	"Regreso a Medellín": "Return to Medellín",
	"Represa y vistas panorámicas": "Reservoir and panoramic views",
	"Reserva tiempo en el pueblo para caminar sus calles y ver los zócalos pintados a mano antes de llegar al malecón.": "Allow time to walk through town and see the hand-painted façades before reaching the waterfront.",
	"Reserva tiempo suficiente para el viaje. El itinerario se adapta a las condiciones del día y a las necesidades del grupo.": "Allow enough time for the journey. The itinerary adapts to the day's conditions and your group's needs.",
	"Reseñas anteriores": "Previous reviews",
	"Reseñas de clientes en Google": "Customer reviews on Google",
	"Reseñas siguientes": "Next reviews",
	"Responsable identificado en el sitio de la marca: T&T, NIT 901738550-6.": "Data controller identified on the brand's website: T&T, tax ID 901738550-6.",
	"Revisa con el equipo las pausas y prioridades. Un itinerario claro también debe considerar el tiempo que cada persona necesita.": "Review breaks and priorities with the team. A clear itinerary also needs to allow for everyone's pace.",
	"Revisa tu solicitud, cópiala y compártela con nuestro equipo en WhatsApp.": "Review your inquiry, copy it and share it with our team on WhatsApp.",
	"Ruta de la experiencia": "Experience itinerary",
	"SUV Ejecutiva": "Executive SUV",
	"Salida coordinada en Medellín": "Coordinated departure in Medellín",
	"Salir hacia las montañas": "Head for the mountains",
	"Saltar al contenido": "Skip to content",
	"Sedán Ejecutivo": "Executive Sedan",
	Seguridad: "Safety",
	Sencillez: "Simplicity",
	"Senderismo y aventura": "Hiking and adventure",
	"Senderos y vegetación conducen a una cascada que cambia la escala de todo lo que la rodea.": "Trails and vegetation lead to a waterfall that changes the scale of everything around it.",
	Servicio: "Service",
	Servicios: "Services",
	Siente: "Feel",
	"Sigue el sonido del agua.": "Follow the sound of water.",
	"Sigue las etapas del grano y conversa sobre el trabajo que hay detrás del sabor.": "Follow the bean's journey and talk about the work behind its flavor.",
	"Siguiente: Más experiencias": "Next: More experiences",
	"Sobre nuestras calificaciones": "About our reviews",
	"Solicitar propuesta": "Request a proposal",
	"Somos de": "We are from",
	"Somos del camino.": "The road is part of who we are.",
	Sorpréndete: "Be surprised",
	Síguenos: "Follow us",
	"Síguenos en Instagram (se abre en una pestaña nueva)": "Follow us on Instagram (opens in a new tab)",
	"Síguenos en TikTok (se abre en una pestaña nueva)": "Follow us on TikTok (opens in a new tab)",
	"T&T Medellín | Medellín, a otro nivel": "T&T Medellín | Medellín, on another level",
	"TOUR DE COMPRAS": "SHOPPING TOUR",
	"TOUR DEL CAFÉ": "COFFEE TOUR",
	"TOUR MIRADORES": "VIEWPOINTS TOUR",
	"TRASLADOS JMC": "JMC TRANSFERS",
	"Te contamos qué esperar y confirmamos las condiciones antes de salir.": "We explain what to expect and confirm the arrangements before you set off.",
	"Tiempo para comprar y disfrutar": "Time to shop and enjoy",
	"Tiempo para conocer, acompañamiento para organizar. Explora recorridos por Medellín y excursiones por Antioquia.": "Time to discover, support to organize. Explore tours around Medellín and excursions through Antioquia.",
	"Tiendas locales": "Local shops",
	"Todas las notas": "All articles",
	"Todo maravilloso. Allan y su equipo nos recogieron en el aeropuerto, nos dieron consejos, fuimos a un espectacular tour nocturno familiar, conocimos la ciudad, Guatapé, Comuna 13 y hasta fuimos a la Hacienda Nápoles. Un saludo desde Guanacaste, Costa Rica.": "Everything was wonderful. Allan and his team picked us up at the airport and gave us advice. We took a spectacular family night tour, explored the city, Guatapé and Comuna 13, and even visited Hacienda Nápoles. Greetings from Guanacaste, Costa Rica.",
	Todos: "All",
	"Tomar el camino del pueblo": "Take the road to town",
	"Tour Miradores": "Viewpoints Tour",
	"Tour de Compras": "Shopping Tour",
	"Tour del Café": "Coffee Tour",
	"Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles": "100% private tours · Your own driver-guide · Flexible schedules",
	"Tradición y gastronomía": "Tradition and gastronomy",
	"Transporte con atención local": "Transport with local attention",
	"Transporte privado": "Private transport",
	"Transporte y Turismo Medellín, inicio": "Transporte y Turismo Medellín, home",
	Traslados: "Transfers",
	"Traslados Aeropuerto JMC": "JMC Airport Transfers",
	"Traslados de aeropuerto": "Airport transfers",
	"Traslados entre el Aeropuerto José María Córdova y tu alojamiento en Medellín, con seguimiento del vuelo y recogida coordinada.": "Transfers between José María Córdova Airport and your accommodation in Medellín, with flight tracking and coordinated pickup.",
	"Tu experiencia": "Your experience",
	"Tu hotel en Medellín o la terminal del Aeropuerto JMC": "Your hotel in Medellín or the JMC Airport terminal",
	"Tu información,": "Your information,",
	"Tu plan merece": "Your plans deserve",
	"Tu plan tiene": "Your plan has",
	"Tu próxima historia": "Your next story",
	"Tu recorrido": "Your journey",
	"Tu viaje, tus tiempos,": "Your trip, your pace,",
	"Tus hallazgos, a tu ritmo.": "Your finds, at your own pace.",
	"Tuve una experiencia espectacular con Alhan de Transporte y Turismo Medellín. Desde el inicio, la organización fue impecable y todo se desarrolló de manera puntual y fluida. La ruta estuvo muy bien planificada, permitiendo disfrutar al máximo cada uno de los lugares visitados.": "I had a spectacular experience with Alhan from Transporte y Turismo Medellín. From the beginning, everything was impeccably organized and ran smoothly and on time. The route was well planned, letting us fully enjoy every place we visited.",
	"Un día para volver a sorprenderse.": "A day to be amazed all over again.",
	"Un encuentro coordinado": "A coordinated meeting",
	"Un lugar para cada": "A place for every",
	"Un lugar para cada forma de viajar.": "A place for every way of traveling.",
	"Un puente entre paisajes": "A bridge between landscapes",
	"Una ciudad que vuelve a dibujarse.": "A city drawing itself anew.",
	"Una ciudad. Infinitas perspectivas.": "One city. Endless perspectives.",
	"Una conversación operativa para revisar recorridos y necesidades de tus viajeros.": "A practical conversation to review routes and your travelers' needs.",
	"Una dirección precisa y una persona de contacto simplifican el comienzo. Confirma si habrá recogidas adicionales.": "A precise address and one contact person make the start easier. Confirm whether extra pickups are needed.",
	"Una familia, una agencia o un equipo de trabajo: cada grupo tiene su propio ritmo.": "A family, an agency or a work team: every group has its own pace.",
	"Una historia en movimiento": "A story in motion",
	"Una historia que empieza en la tierra.": "A story that begins in the soil.",
	"Una historia que nace aquí": "A story born here",
	"Una idea que une el amor por Medellín y las ganas de servir.": "An idea combining a love of Medellín with the desire to serve.",
	"Una mirada al valle desde la ladera.": "A view of the valley from the hillside.",
	"Una mirada que te llevas": "A view to take with you",
	"Una salida al parque temático para compartir naturaleza y actividades en familia, con transporte coordinado desde Medellín.": "A theme-park outing to enjoy nature and family activities, with coordinated transport from Medellín.",
	"Usa calzado cómodo y lleva una maleta con espacio extra: el tour está pensado para comprar sin apuro entre El Hueco, los outlets y las tiendas locales.": "Wear comfortable shoes and bring a bag with extra space: this tour is designed for unhurried shopping at El Hueco, outlets and local stores.",
	"Usa zapatos para terreno rural. La finca, el alcance de la visita y la degustación se confirman en tu propuesta.": "Wear shoes suitable for rural terrain. The farm, scope of the visit and tasting are confirmed in your proposal.",
	"VUELTA A ORIENTE": "EASTERN ANTIOQUIA",
	"Van Ejecutiva": "Executive Van",
	"Ve con la cámara lista: el recorrido cambia de paisaje de montaña en cada tramo entre pueblo y pueblo.": "Have your camera ready: the mountain scenery changes on every stretch between towns.",
	"Ve con ropa que puedas mojar: el parque tiene zonas acuáticas y son parte del plan.": "Wear clothes you can get wet: the park's water attractions are part of the plan.",
	"Vehículo privado.": "Private vehicle.",
	Vehículos: "Vehicles",
	"Vehículos cómodos": "Comfortable vehicles",
	"Ven con ganas.": "Bring your enthusiasm.",
	"Ver experiencia": "View experience",
	"Ver las 12 experiencias": "See all 12 experiences",
	"Ver todas las reseñas en Google": "Read all reviews on Google",
	"Viajar juntos sin improvisar cada parada.": "Travel together without improvising every stop.",
	"Viajeros y familias": "Travelers and families",
	"Visita una finca cafetera, camina entre los cultivos y conoce el proceso del grano antes de compartir una taza recién preparada.": "Visit a coffee farm, walk among the crops and learn about the bean's journey before sharing a freshly prepared cup.",
	"Vista de Medellín desde la ladera de la Comuna 13": "View of Medellín from the hillside in Comuna 13",
	"Vista panorámica de la represa": "Panoramic view of the reservoir",
	"Vistas panorámicas": "Panoramic views",
	Vive: "Live",
	"Volver a las experiencias": "Back to experiences",
	"Volver con otra perspectiva": "Return with a new perspective",
	"Vuelta a Oriente": "Eastern Antioquia Tour",
	"WhatsApp Medellín": "WhatsApp Medellín",
	"Y otra que se": "And another you",
	"a muchos": "to many",
	"a otro nivel.": "on another level.",
	"agua entre montañas y zócalos de color.": "water between mountains and colorful façades.",
	"al último": "to your last",
	"aquí.": "here.",
	"bajo tu": "under your",
	"calles coloniales y el Puente de Occidente.": "colonial streets and the Puente de Occidente.",
	"compartido.": "shared.",
	"con más": "with more",
	"con pueblos y plazas, sin carreras.": "with towns and plazas, without rushing.",
	"control.": "control.",
	"conversación.": "conversation.",
	de: "of",
	"de 5 estrellas en Google": "out of 5 stars on Google",
	"del aeropuerto a tu alojamiento, coordinado.": "from the airport to your accommodation, coordinated.",
	"descubrir.": "discover.",
	"el oficio detrás de cada taza.": "the craft behind every cup.",
	"el valle cambia con la luz.": "the valley changes with the light.",
	"el valle cuando enciende sus luces.": "the valley as its lights come on.",
	empieza: "begins",
	"empieza con una": "starts with a",
	"en el trato.": "in every interaction.",
	"encuentros.": "encounters.",
	es: "is",
	"escuchemos.": "heard.",
	"experiencia.": "experience.",
	"experiencias para explorar": "experiences to explore",
	"fachadas de color y plaza sin prisa.": "colorful façades and an unhurried plaza.",
	"forma de viajar.": "way of traveling.",
	"fotografías · Toca para ampliar": "photos · Tap to enlarge",
	"importa.": "matters.",
	"muchas formas.": "many possibilities.",
	mueven: "move",
	"necesitas.": "you need.",
	"no está": "is not",
	pasajeros: "passengers",
	"personas.": "people.",
	"planeémoslo.": "let's plan it.",
	"plazas, murales e historias de Medellín.": "plazas, murals and Medellín's stories.",
	por: "to",
	"que lo": "to be",
	"quien ya": "from those who",
	quieres: "do you want to",
	"recuerdo.": "memory.",
	"se viven": "are experienced",
	"sentido.": "meaning.",
	tu: "your",
	"un día en familia, con transporte coordinado.": "a family day out, with coordinated transport.",
	"una cascada al final del sendero.": "a waterfall at the end of the trail.",
	"viajó.": "have traveled.",
	"vive.": "can experience.",
	"vivir?": "experience?",
	"y todo lo que": "and everything that",
	"¡Una experiencia increíble de principio a fin! El servicio fue excelente y la comunicación siempre fue rápida, clara y muy profesional. Todo el equipo, especialmente los guías y coordinadores, fue sumamente atento, amable y flexible.": "An incredible experience from start to finish! The service was excellent and communication was always quick, clear and very professional. Everyone, especially the guides and coordinators, was very attentive, kind and flexible.",
	"¡Una experiencia simplemente impecable y de otro nivel! Quiero recomendar con total confianza a Transporte y Turismo Medellín, una empresa que superó todas mis expectativas desde el primer momento. Cada tour fue inolvidable: el Tour a Guatapé, el City Tour y el Tour de Compras estuvieron organizados de manera excelente.": "Simply impeccable service, on another level! I wholeheartedly recommend Transporte y Turismo Medellín, a company that exceeded all my expectations from the first moment. Every tour was unforgettable: Guatapé, the City Tour and the Shopping Tour were excellently organized.",
	"· 5 reseñas": "· 5 reviews",
	"· Archivo T&T": "· T&T archive",
	"· Desde Medellín": "· From Medellín",
	"· Nota 0": "· Article 0",
	"· fotografía": "· photo",
	"¿Ciudad, pueblos o naturaleza?": "City, towns or nature?",
	"¿Cómo organizamos la experiencia?": "How do we organize the experience?",
	"¿Qué debo confirmar sobre el precio?": "What should I confirm about the price?",
	"¿Qué historia": "What story",
	"¿Se puede adaptar para mi grupo?": "Can it be adapted for my group?",
	"Todas las experiencias": "All experiences",
	"Volver al cuaderno": "Back to the journal",
	"Activar modo claro": "Switch to light mode",
	"Activar modo oscuro": "Switch to dark mode",
	Cerrar: "Close",
	"Carta anterior": "Previous card",
	"Carta siguiente": "Next card",
	"Saltar introducción": "Skip introduction",
	"Activar movimiento": "Enable motion",
	"No completar": "Leave empty",
	"Los campos con * son obligatorios.": "Fields marked * are required.",
	"Tipo de solicitud *": "Inquiry type *",
	"Tipo de solicitud": "Inquiry type",
	"Turismo y traslados": "Tours and transfers",
	Petición: "Request",
	Queja: "Complaint",
	Reclamo: "Claim",
	Sugerencia: "Suggestion",
	Felicitación: "Compliment",
	"Tu plan": "Your plans",
	"Tu experiencia *": "Your experience *",
	"Fecha del recorrido *": "Tour date *",
	"Personas *": "People *",
	"Punto de salida": "Departure point",
	"Tus datos": "Your details",
	"Nombre *": "Name *",
	Nombre: "Name",
	"Empresa (si aplica)": "Company (if applicable)",
	"Teléfono / WhatsApp *": "Phone / WhatsApp *",
	Indicativo: "Country code",
	Número: "Number",
	"Correo electrónico (opcional)": "Email (optional)",
	"Cuántas personas viajan, incluyéndote.": "Number of travelers, including you.",
	"Hotel, barrio o aeropuerto. Si aún no lo sabes, lo acordamos.": "Hotel, neighborhood or airport. If you don't know yet, we'll arrange it together.",
	"¿Qué haría especial este viaje?": "What would make this trip special?",
	"Cuéntanos tu consulta *": "Tell us about your inquiry *",
	"Opcional: intereses, equipaje o necesidades del grupo.": "Optional: interests, luggage or group needs.",
	"He leído el": "I have read the",
	"aviso de privacidad": "privacy notice",
	"y autorizo compartir esta solicitud con T&T cuando la envíe.": "and authorize sharing this inquiry with T&T when I send it.",
	"No pudimos preparar tu consulta.": "We couldn't prepare your inquiry.",
	"Inténtalo de nuevo en unos segundos.": "Please try again in a few seconds.",
	Revisa: "Please check",
	"este campo": "this field",
	"Preparar mi mensaje": "Prepare my message",
	"Preparar mi consulta": "Prepare my inquiry",
	"Los datos permanecen en esta página hasta que tú decidas compartirlos. Preparar la consulta no confirma una reserva. También puedes llamarnos:": "Your details stay on this page until you choose to share them. Preparing an inquiry does not confirm a booking. You can also call us:",
	"Revisa y comparte tu solicitud": "Review and share your inquiry",
	"Revisa el texto.": "Review the text.",
	"Cópialo (ya lo intentamos por ti).": "Copy it (we have already tried for you).",
	"Ábrelo en WhatsApp y pégalo.": "Open WhatsApp and paste it.",
	"Resumen de solicitud": "Inquiry summary",
	"Copiar solicitud": "Copy inquiry",
	"Abrir WhatsApp y pegar": "Open WhatsApp and paste",
	"Editar mis datos": "Edit my details",
	"Solicitud copiada. Abre WhatsApp y pégala en la conversación.": "Inquiry copied. Open WhatsApp and paste it into the conversation.",
	"No pudimos copiar automáticamente: usa «Copiar solicitud» o selecciona el texto.": "We couldn't copy automatically: use “Copy inquiry” or select the text.",
	"Formulario de contacto": "Contact form",
	"Formulario de cotización": "Quote form",
	"Un recorrido a mi medida": "A tailor-made tour",
	"Fecha del recorrido": "Tour date",
	Personas: "People",
	"Teléfono / WhatsApp": "Phone / WhatsApp",
	"Correo electrónico": "Email",
	Empresa: "Company",
	Mensaje: "Message",
	"Autorización de datos": "Data consent",
	"Escribe tu nombre (al menos 2 letras).": "Enter your name (at least 2 letters).",
	"Escribe un teléfono o WhatsApp para poder responderte.": "Enter a phone or WhatsApp number so we can reply.",
	"Escribe solo números, espacios o guiones.": "Use only numbers, spaces or hyphens.",
	"Revisa el número: debe tener entre 7 y 15 dígitos.": "Check the number: it must contain 7 to 15 digits.",
	"Indicativo no reconocido: escribe el de tu país, por ejemplo +57.": "Unknown country code: enter yours, for example +57.",
	"Escribe un correo válido, por ejemplo nombre@correo.com.": "Enter a valid email address, for example name@example.com.",
	"Elige la fecha en la que quieres hacer el recorrido.": "Choose the date for your tour.",
	"Elige una fecha de hoy en adelante.": "Choose today or a future date.",
	"Escribe cuántas personas son, en números (de 1 a 99).": "Enter the number of people (1 to 99).",
	"Cuéntanos un poco más: mínimo 10 caracteres.": "Tell us a little more: at least 10 characters.",
	"Necesitamos tu autorización para poder responderte.": "We need your consent before we can reply.",
	"mi recorrido": "my trip",
	"mi consulta": "my inquiry",
	"Por acordar": "To be arranged",
	Detalles: "Details",
	"Me gustaría conocer las opciones disponibles.": "I'd like to know what options are available.",
	"Desliza para seguir la historia": "Scroll to follow the story",
	"Elige una experiencia": "Choose an experience",
	"Abrir WhatsApp": "Open WhatsApp",
	"Más información": "More information",
	"Medellín, a otro nivel": "Medellín, on another level",
	"Medellín, a otro nivel. Transporte privado y experiencias desde Medellín con un equipo local.": "Medellín, on another level. Private transport and experiences from Medellín with a local team.",
	"Explora doce recorridos desde Medellín: ciudad, cultura, café y paisajes de Antioquia.": "Explore twelve journeys from Medellín: city, culture, coffee and Antioquia's landscapes.",
	"Conoce las categorías de vehículos para tu traslado privado o viaje en grupo desde Medellín.": "Explore vehicle categories for your private transfer or group trip from Medellín.",
	"Traslados, recorridos privados y transporte para empresas, agencias y grupos en Medellín.": "Transfers, private tours and transport for companies, agencies and groups in Medellín.",
	"Conoce la historia, el equipo y los valores de Transporte y Turismo Medellín.": "Meet the team and discover the story and values of Transporte y Turismo Medellín.",
	"Ideas y consejos para preparar tus experiencias y recorridos desde Medellín.": "Ideas and advice for planning your experiences and journeys from Medellín.",
	"Habla con el equipo de T&T Medellín por teléfono, correo o WhatsApp.": "Talk to the T&T Medellín team by phone, email or WhatsApp.",
	"Planea tu viaje": "Plan your trip",
	"Prepara tu consulta de transporte o turismo para recibir una propuesta del equipo de Medellín.": "Prepare your transport or tour inquiry to receive a proposal from the Medellín team.",
	"Consulta la referencia histórica de calificaciones y las reseñas actuales de T&T Medellín en Google.": "See historical ratings and current T&T Medellín reviews on Google.",
	"Conoce cómo se prepara tu consulta y qué información decides compartir con T&T Medellín.": "Learn how your inquiry is prepared and what information you choose to share with T&T Medellín.",
	"Página no encontrada": "Page not found",
	"Regresa a las experiencias de T&T Medellín para encontrar tu recorrido.": "Return to T&T Medellín experiences to find your journey.",
	"Retomar el movimiento de los aliados": "Resume the partner carousel",
	"Aire acondicionado": "Air conditioning",
	"Asientos en cuero": "Leather seats",
	"WiFi a bordo": "Onboard WiFi",
	"Cargadores USB": "USB chargers",
	"Sistema de sonido": "Sound system",
	"Espacio para equipaje": "Luggage space",
	"Asientos reclinables": "Reclining seats",
	"Ventanas panorámicas": "Panoramic windows",
	"Micrófono para el guía": "Guide microphone",
	Nevera: "Cooler",
	"Iluminación LED ambiental": "Ambient LED lighting",
	"Sistema de entretenimiento": "Entertainment system",
	"Control de clima dual": "Dual-zone climate control"
};
//#endregion
//#region src/i18n.js
var locale = typeof window !== "undefined" && /^\/en(?:\/|$)/.test(window.location.pathname) ? "en" : "es";
var language = () => locale;
var setLanguage = (value) => {
	locale = value === "en" ? "en" : "es";
};
var unprefix = (path) => path.replace(/^\/en(?=\/|$)/, "") || "/";
var languagePath = (path, lang) => lang === "en" ? "/en" + (path === "/" ? "/" : path) : path;
var normalize = (value) => value.replace(/\s+/g, " ").trim();
function t(value) {
	if (locale !== "en" || typeof value !== "string" || !value.trim()) return value;
	const key = normalize(value);
	if (Object.hasOwn(en_default, key)) return value.replace(value.trim(), en_default[key]);
	const patterns = [
		[/^estos (\d+) campos$/, (n) => `these ${n} fields`],
		[/^Foto (\d+) de (\d+), (.+)$/, (n, total, name) => `Photo ${n} of ${total}, ${t(name)}`],
		[/^(.+)\. (Descubre|Explora|Siente|Conecta|Vive|Disfruta|Sorpréndete|Recuerda|Enamórate|Inspírate): (.+)$/, (name, verb, text) => `${t(name)}. ${t(verb)}: ${t(text)}`],
		[/^Ampliar fotografía (\d+) de (.+)$/, (n, name) => `Enlarge photo ${n} of ${t(name)}`],
		[/^Fotografía (\d+) de (.+)$/, (n, name) => `Photo ${n} of ${t(name)}`],
		[/^Mostrar fotografía (\d+) de (.+)$/, (n, name) => `Show photo ${n} of ${t(name)}`],
		[/^(.+), fotografía (\d+)$/, (name, n) => `${t(name)}, photo ${n}`],
		[/^(.+), capítulo (\d+)$/, (name, n) => `${t(name)}, chapter ${n}`],
		[/^Capítulo (\d+): (.+)$/, (n, title) => `Chapter ${n}: ${t(title)}`],
		[/^Fotografías de (.+)$/, (name) => `Photos of ${t(name)}`],
		[/^Elegir fotografía de (.+)$/, (name) => `Choose a photo of ${t(name)}`],
		[/^Galería ampliada de (.+)$/, (name) => `Enlarged gallery of ${t(name)}`],
		[/^Un recorrido por (.+)$/, (name) => `A journey through ${t(name)}`],
		[/^Planea esta experiencia: (.+)$/, (name) => `Plan this experience: ${t(name)}`],
		[/^Leer la nota: (.+)$/, (name) => `Read the article: ${t(name)}`],
		[/^Categoría (.+)$/, (name) => `Category: ${t(name)}`],
		[/^(.+) \| T&T Medellín$/, (title) => `${t(title)} | T&T Medellín`]
	];
	for (const [pattern, convert] of patterns) {
		const match = key.match(pattern);
		if (match) return convert(...match.slice(1));
	}
	const punctuation = key.match(/^(.+?)([.:*→↗↓]+)$/);
	if (punctuation && Object.hasOwn(en_default, punctuation[1].trim())) return en_default[punctuation[1].trim()] + punctuation[2];
	return value;
}
function localizedProps(type, props) {
	if (locale !== "en" || !props || props.translate === "no") return props;
	const next = { ...props };
	const children = (value) => Array.isArray(value) ? value.map(children) : typeof value === "string" ? t(value) : value;
	if (type !== "script" && type !== "style" && type !== "textarea") next.children = children(props.children);
	for (const key of [
		"aria-label",
		"aria-description",
		"title",
		"alt",
		"placeholder"
	]) if (typeof props[key] === "string") next[key] = t(props[key]);
	if (type === "option" && props.value === void 0 && typeof props.children === "string") next.value = props.children;
	return next;
}
//#endregion
//#region src/company.js
var company = {
	phone: "+57 304 496 1698",
	whatsapp: "573044961698",
	email: "transporteturismocolombia@gmail.com",
	address: "Carrera 79AA #1A Sur-280, Medellín",
	reviews: "https://www.google.com/maps/place/Transporte+%26+Turismo+Medellin/data=!4m2!3m1!1s0x0:0x676cebadb662a88a",
	instagram: "https://www.instagram.com/transporteenmedellin",
	tiktok: "https://www.tiktok.com/@tytmedellin"
};
var whatsapp = (context = "mi recorrido") => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(language() === "en" ? `Hello, I'd like to ask T&T Medellín about ${t(context)}.` : `Hola, quiero consultar con T&T Medellín sobre ${context}.`)}`;
//#endregion
//#region src/i18n-runtime/jsx-runtime.js
var jsx$1 = (type, props, key) => jsx(type, localizedProps(type, props), key);
var jsxs$1 = (type, props, key) => jsxs(type, localizedProps(type, props), key);
//#endregion
//#region src/Socials.jsx
var PATHS$1 = {
	instagram: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03Zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
	tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z",
	whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
};
var SOCIALS = () => [
	{
		id: "instagram",
		label: "Síguenos en Instagram",
		url: company.instagram,
		color: "#E4405F"
	},
	{
		id: "tiktok",
		label: "Síguenos en TikTok",
		url: company.tiktok,
		color: "currentColor"
	},
	{
		id: "whatsapp",
		label: "Escríbenos por WhatsApp",
		url: whatsapp(),
		color: "#128C7E"
	}
];
function SocialIcon({ id, size = 24, color, className = "" }) {
	return /* @__PURE__ */ jsx$1("svg", {
		className,
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "currentColor",
		"aria-hidden": "true",
		focusable: "false",
		style: color ? { color } : void 0,
		children: /* @__PURE__ */ jsx$1("path", { d: PATHS$1[id] })
	});
}
function Socials({ className = "", only }) {
	return /* @__PURE__ */ jsx$1("ul", {
		role: "list",
		className: `socials ${className}`,
		children: SOCIALS().filter((s) => !only || only.includes(s.id)).map((s) => /* @__PURE__ */ jsx$1("li", { children: /* @__PURE__ */ jsx$1("a", {
			href: s.url,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": `${s.label} (se abre en una pestaña nueva)`,
			children: /* @__PURE__ */ jsx$1("svg", {
				viewBox: "0 0 24 24",
				fill: "currentColor",
				"aria-hidden": "true",
				style: { color: s.color },
				children: /* @__PURE__ */ jsx$1("path", { d: PATHS$1[s.id] })
			})
		}) }, s.id))
	});
}
//#endregion
//#region src/icons.jsx
var P = (d) => ["path", { d }];
var C = (cx, cy, r) => ["circle", {
	cx,
	cy,
	r
}];
var L = (x1, y1, x2, y2) => ["line", {
	x1,
	y1,
	x2,
	y2
}];
var R$1 = (x, y, width, height, rx) => ["rect", {
	x,
	y,
	width,
	height,
	rx
}];
var NODES = {
	snowflake: [
		P("m10 20-1.25-2.5L6 18"),
		P("M10 4 8.75 6.5 6 6"),
		P("m14 20 1.25-2.5L18 18"),
		P("m14 4 1.25 2.5L18 6"),
		P("m17 21-3-6h-4"),
		P("m17 3-3 6 1.5 3"),
		P("M2 12h6.5L10 9"),
		P("m20 10-1.5 2 1.5 2"),
		P("M22 12h-6.5L14 15"),
		P("m4 10 1.5 2L4 14"),
		P("m7 21 3-6-1.5-3"),
		P("m7 3 3 6h4")
	],
	armchair: [
		P("M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"),
		P("M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"),
		P("M5 18v2"),
		P("M19 18v2")
	],
	wifi: [
		P("M12 20h.01"),
		P("M2 8.82a15 15 0 0 1 20 0"),
		P("M5 12.859a10 10 0 0 1 14 0"),
		P("M8.5 16.429a5 5 0 0 1 7 0")
	],
	usb: [
		C(10, 7, 1),
		C(4, 20, 1),
		P("M4.7 19.3 19 5"),
		P("m21 3-3 1 2 2Z"),
		P("M9.26 7.68 5 12l2 5"),
		P("m10 14 5 2 3.5-3.5"),
		P("m18 12 1-1 1 1-1 1Z")
	],
	music: [
		P("M9 18V5l12-2v13"),
		C(6, 18, 3),
		C(18, 16, 3)
	],
	luggage: [
		P("M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"),
		P("M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"),
		P("M10 20h4"),
		C(16, 20, 2),
		C(8, 20, 2)
	],
	frame: [
		L(22, 6, 2, 6),
		L(22, 18, 2, 18),
		L(6, 2, 6, 22),
		L(18, 2, 18, 22)
	],
	mic: [
		P("M12 19v3"),
		P("M19 10v2a7 7 0 0 1-14 0v-2"),
		R$1(9, 2, 6, 13, 3)
	],
	refrigerator: [
		P("M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"),
		P("M5 10h14"),
		P("M15 7v6")
	],
	lightbulb: [
		P("M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"),
		P("M9 18h6"),
		P("M10 22h4")
	],
	monitorPlay: [
		P("M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"),
		P("M12 17v4"),
		P("M8 21h8"),
		R$1(2, 3, 20, 14, 2)
	],
	thermometer: [P("M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z")],
	users: [
		P("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"),
		P("M16 3.128a4 4 0 0 1 0 7.744"),
		P("M22 21v-2a4 4 0 0 0-3-3.87"),
		C(9, 7, 4)
	],
	share: [
		C(18, 5, 3),
		C(6, 12, 3),
		C(18, 19, 3),
		L(8.59, 13.51, 15.42, 17.49),
		L(15.41, 6.51, 8.59, 10.49)
	],
	mail: [P("m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"), R$1(2, 4, 20, 16, 2)],
	link: [
		P("M9 17H7A5 5 0 0 1 7 7h2"),
		P("M15 7h2a5 5 0 1 1 0 10h-2"),
		L(8, 12, 16, 12)
	],
	check: [P("M20 6 9 17l-5-5")],
	mapPin: [P("M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"), C(12, 10, 3)],
	phone: [P("M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384")],
	more: [
		C(12, 12, 1),
		C(19, 12, 1),
		C(5, 12, 1)
	]
};
function Icon({ name, size = 16, className = "" }) {
	return /* @__PURE__ */ jsx$1("svg", {
		className: `ico ${className}`,
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		focusable: "false",
		children: NODES[name].map(([tag, attrs], i) => {
			return /* @__PURE__ */ jsx$1(tag, { ...attrs }, i);
		})
	});
}
//#endregion
//#region src/Skyline.jsx
function Skyline() {
	return /* @__PURE__ */ jsxs$1("svg", {
		className: "skyline",
		viewBox: "0 0 1440 120",
		preserveAspectRatio: "xMidYMax slice",
		"aria-hidden": "true",
		focusable: "false",
		children: [
			/* @__PURE__ */ jsx$1("path", {
				className: "skyline-far",
				d: "M0 120V74C90 52 170 60 260 66C350 72 400 38 510 34C600 31 650 56 760 58C880 60 930 30 1050 28C1160 26 1220 52 1320 50C1380 49 1415 58 1440 54V120Z"
			}),
			/* @__PURE__ */ jsx$1("path", {
				className: "skyline-mid",
				d: "M0 120V92C120 72 220 84 330 80C450 76 520 56 640 60C760 64 840 84 960 80C1080 76 1160 60 1290 66C1360 69 1410 78 1440 74V120Z"
			}),
			/* @__PURE__ */ jsx$1("path", {
				className: "skyline-near",
				d: "M0 120V92H34V120ZM42 120V104H92V120ZM92 120V52H150V120ZM98 120V44H144V120ZM162 120V52H188V120ZM168 120V44H182V120ZM188 120V66H226V120ZM194 120V58H220V120ZM226 120V66H270V120ZM232 120V58H264V120ZM282 120V86H308V120ZM320 120V66H346V120ZM326 120V58H340V120ZM346 120V52H372V120ZM376 120V92H414V120ZM426 120V80H452V120ZM464 120V92H522V120ZM522 120V86H566V120ZM570 120V86H596V120ZM596 120V104H640V120ZM652 120V86H682V120ZM694 120V86H732V120ZM762 120V86H806V120ZM810 120V86H844V120ZM844 120V86H894V120ZM894 120V80H938V120ZM950 120V74H988V120ZM992 120V98H1036V120ZM1036 120V66H1080V120ZM1042 120V58H1074V120ZM1084 120V60H1114V120ZM1090 120V52H1108V120ZM1114 120V52H1172V120ZM1176 120V74H1210V120ZM1222 120V60H1280V120ZM1228 120V52H1274V120ZM1280 120V60H1314V120ZM1314 120V80H1340V120ZM1352 120V60H1402V120ZM1358 120V52H1396V120ZM1410 120V74H1460V120ZM1416 120V66H1454V120ZM708 120V58H716V44H722V30H727V18H730V4H731V0H732V4H734V18H737V30H742V44H748V58H756V120Z"
			})
		]
	});
}
//#endregion
//#region src/Allies.jsx
var ITEMS = [
	{
		name: "RNT Medellín · 176384",
		text: true
	},
	{
		name: "Google",
		logo: "google.svg",
		w: 112,
		h: 40
	},
	{
		name: "Tripadvisor",
		logo: "tripadvisor.svg",
		w: 112,
		h: 40
	},
	{
		name: "ANATO",
		logo: "anato.webp",
		w: 243,
		h: 64,
		dark: true
	},
	{
		name: "COTELCO",
		logo: "cotelco.webp",
		w: 400,
		h: 150
	},
	{
		name: "Cámara de Comercio de Medellín",
		logo: "camara-comercio-medellin.webp",
		w: 141,
		h: 56
	},
	{
		name: "Alcaldía de Guatapé",
		logo: "alcaldia-guatape.webp",
		w: 83,
		h: 112
	},
	{
		name: "Alcaldía de Medellín",
		logo: "alcaldia-medellin.webp",
		w: 78,
		h: 112
	},
	{
		name: "Hacienda Nápoles",
		logo: "hacienda-napoles.webp",
		w: 400,
		h: 282
	}
];
function Item({ item, hidden }) {
	return /* @__PURE__ */ jsx$1("li", {
		"aria-hidden": hidden || void 0,
		className: "ally",
		children: item.text ? /* @__PURE__ */ jsx$1("span", {
			className: "ally-rnt",
			children: item.name
		}) : /* @__PURE__ */ jsx$1("span", {
			className: `ally-chip ${item.dark ? "is-dark" : ""}`,
			children: /* @__PURE__ */ jsx$1("img", {
				src: `/media/marca/${item.logo}`,
				alt: hidden ? "" : item.name,
				width: item.w,
				height: item.h,
				loading: "lazy",
				decoding: "async"
			})
		})
	});
}
function Allies() {
	const [paused, setPaused] = useState(false);
	return /* @__PURE__ */ jsxs$1("section", {
		className: "allies wrap",
		"aria-label": "Aliados y referencias",
		children: [/* @__PURE__ */ jsx$1("div", {
			className: `allies-viewport ${paused ? "is-paused" : ""}`,
			children: /* @__PURE__ */ jsxs$1("div", {
				className: "allies-track",
				children: [/* @__PURE__ */ jsx$1("ul", {
					role: "list",
					children: ITEMS.map((i) => /* @__PURE__ */ jsx$1(Item, { item: i }, i.name))
				}), /* @__PURE__ */ jsx$1("ul", {
					role: "list",
					"aria-hidden": "true",
					className: "allies-copy",
					children: ITEMS.map((i) => /* @__PURE__ */ jsx$1(Item, {
						item: i,
						hidden: true
					}, i.name))
				})]
			})
		}), /* @__PURE__ */ jsx$1("button", {
			type: "button",
			className: "allies-pause",
			"aria-pressed": paused,
			"aria-label": paused ? "Reanudar el movimiento de los aliados" : "Pausar el movimiento de los aliados",
			onClick: () => setPaused(!paused),
			children: /* @__PURE__ */ jsx$1("span", {
				"aria-hidden": "true",
				children: paused ? "▶" : "❚❚"
			})
		})]
	});
}
//#endregion
//#region src/meta.js
var staticMeta = {
	"/": ["Medellín, a otro nivel", "Medellín, a otro nivel. Transporte privado y experiencias desde Medellín con un equipo local."],
	"/experiencias": ["Experiencias", "Explora doce recorridos desde Medellín: ciudad, cultura, café y paisajes de Antioquia."],
	"/vehiculos": ["Vehículos", "Conoce las categorías de vehículos para tu traslado privado o viaje en grupo desde Medellín."],
	"/servicios": ["Servicios", "Traslados, recorridos privados y transporte para empresas, agencias y grupos en Medellín."],
	"/nosotros": ["Nosotros", "Conoce la historia, el equipo y los valores de Transporte y Turismo Medellín."],
	"/blog": ["Cuaderno de viaje", "Ideas y consejos para preparar tus experiencias y recorridos desde Medellín."],
	"/contacto": ["Contacto", "Habla con el equipo de T&T Medellín por teléfono, correo o WhatsApp."],
	"/cotizar": ["Planea tu viaje", "Prepara tu consulta de transporte o turismo para recibir una propuesta del equipo de Medellín."],
	"/calificaciones": ["Calificaciones", "Consulta la referencia histórica de calificaciones y las reseñas actuales de T&T Medellín en Google."],
	"/privacidad": ["Privacidad", "Conoce cómo se prepara tu consulta y qué información decides compartir con T&T Medellín."]
};
var NOT_FOUND = ["Página no encontrada", "Regresa a las experiencias de T&T Medellín para encontrar tu recorrido."];
var fullTitle = (title) => `${title} | T&T Medellín`;
function applyMeta(title, description) {
	document.title = fullTitle(t(title));
	document.querySelector("meta[name=\"description\"]")?.setAttribute("content", t(description));
	const canonical = document.querySelector("link[rel=\"canonical\"]");
	if (canonical) try {
		const url = new URL(canonical.href);
		url.pathname = location.pathname.replace(/\/+$/, "") || "/";
		canonical.href = url.href;
	} catch {}
}
function usePageMeta(title, description) {
	useEffect(() => {
		if (title) applyMeta(title, description);
	}, [title, description]);
}
//#endregion
//#region src/inicio-textos.js
var inicioTextos = {
	estado: "APROBADO — concepto H1, copy del inicio (2026-10-12)",
	titular: ["Medellín,", "a otro nivel."],
	lema: "Experiencias a otro nivel",
	confianza: "Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles",
	eleccion: "Elige tu próximo recuerdo",
	marquesinaCompleta: [
		"Medellín",
		"Metrocable",
		"Comuna 13",
		"Guatapé",
		"Piedra del Peñol",
		"Santa Fe de Antioquia",
		"Jardín",
		"Salto del Buey",
		"Hacienda Nápoles"
	],
	fases: {
		c1: {
			rotulo: "Medellín",
			titular: "No solo visites Medellín. Vívela.",
			subtitulo: "Una mirada al valle desde la ladera."
		},
		c2: {
			rotulo: "Plaza Botero",
			titular: "La ciudad como punto de partida",
			subtitulo: "Un grupo reunido frente al Palacio de la Cultura."
		},
		final: {
			rotulo: "Cierre",
			titular: "Tu viaje, tus tiempos, tu experiencia.",
			subtitulo: "Cuéntanos tu plan y lo preparamos contigo."
		}
	},
	retiradas: {
		c3: {
			rotulo: "Metrocable",
			titular: "Una ciudad que vuelve a dibujarse.",
			subtitulo: "El Metrocable regala otra mirada de la ciudad."
		},
		c4: {
			rotulo: "Comuna 13",
			titular: "El color cuenta una historia",
			subtitulo: "Arte urbano y escaleras eléctricas acompañan el relato del barrio."
		},
		c5: {
			rotulo: "Guatapé",
			titular: "El horizonte tiene otro color.",
			subtitulo: "Agua entre montañas y un pueblo que se cuenta en sus zócalos."
		}
	},
	cartas: {
		"city-tour-comuna-13": {
			emocion: "Descubre",
			frase: "plazas, murales e historias de Medellín.",
			lugar: "COMUNA 13"
		},
		"guatape-piedra-del-penol": {
			emocion: "Explora",
			frase: "agua entre montañas y zócalos de color.",
			lugar: "GUATAPÉ · PIEDRA DEL PEÑOL"
		},
		"tour-nocturno-medellin": {
			emocion: "Siente",
			frase: "el valle cuando enciende sus luces.",
			lugar: "MEDELLÍN"
		},
		"vuelta-a-oriente": {
			emocion: "Conecta",
			frase: "con pueblos y plazas, sin carreras.",
			lugar: "VUELTA A ORIENTE"
		},
		"tour-del-cafe-medellin": {
			emocion: "Vive",
			frase: "el oficio detrás de cada taza.",
			lugar: "TOUR DEL CAFÉ"
		},
		"hacienda-napoles": {
			emocion: "Disfruta",
			frase: "un día en familia, con transporte coordinado.",
			lugar: "HACIENDA NÁPOLES"
		},
		"salto-del-buey": {
			emocion: "Sorpréndete",
			frase: "una cascada al final del sendero.",
			lugar: "SALTO DEL BUEY"
		},
		"santa-fe-de-antioquia": {
			emocion: "Recuerda",
			frase: "calles coloniales y el Puente de Occidente.",
			lugar: "SANTA FE DE ANTIOQUIA"
		},
		"jardin-antioquia": {
			emocion: "Enamórate",
			frase: "fachadas de color y plaza sin prisa.",
			lugar: "JARDÍN"
		},
		"tour-de-compras": {
			emocion: "Descubre",
			frase: "El Hueco, outlets y tiendas locales.",
			lugar: "TOUR DE COMPRAS"
		},
		"tour-miradores": {
			emocion: "Inspírate",
			frase: "el valle cambia con la luz.",
			lugar: "TOUR MIRADORES"
		},
		"traslados-aeropuerto-jmc": {
			emocion: "Conecta",
			frase: "del aeropuerto a tu alojamiento, coordinado.",
			lugar: "TRASLADOS JMC"
		}
	}
};
var CHAPTERS = ["c1", "c2"];
/** Titular, subtítulo y rótulo de una fase del clip o del cierre. */
function textoFase(id) {
	const fase = inicioTextos.fases[id];
	return {
		rotulo: fase.rotulo,
		titular: fase.titular,
		subtitulo: fase.subtitulo
	};
}
//#endregion
//#region src/PremiumMotion.jsx
var reducedQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
var subscribeLight = (notify) => {
	const mq = reducedQuery();
	mq.addEventListener("change", notify);
	navigator.connection?.addEventListener("change", notify);
	return () => {
		mq.removeEventListener("change", notify);
		navigator.connection?.removeEventListener("change", notify);
	};
};
var readLight = () => reducedQuery().matches || Boolean(navigator.connection?.saveData);
function useLightMotion() {
	return useSyncExternalStore(subscribeLight, readLight, () => false);
}
var noSubscribe = () => () => {};
function useMounted() {
	return useSyncExternalStore(noSubscribe, () => true, () => false);
}
function useMedia(query, server = false) {
	return useSyncExternalStore((notify) => {
		const mq = window.matchMedia(query);
		mq.addEventListener("change", notify);
		return () => mq.removeEventListener("change", notify);
	}, () => window.matchMedia(query).matches, () => server);
}
function EditorialMotion({ children, className = "" }) {
	const ref = useRef(null), light = useLightMotion();
	useEffect(() => {
		const node = ref.current;
		if (light) return;
		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const r = node.getBoundingClientRect();
				if (r.bottom < 0 || r.top > innerHeight || document.hidden) return;
				const p = Math.min(1, Math.max(0, -r.top / r.height));
				node.style.setProperty("--editorial-shift", `${p * 4}vw`);
				node.style.setProperty("--photo-shift", `${p * -24}px`);
			});
		};
		window.addEventListener("scroll", update, { passive: true });
		update();
		return () => {
			window.removeEventListener("scroll", update);
			cancelAnimationFrame(frame);
			node.style.removeProperty("--editorial-shift");
			node.style.removeProperty("--photo-shift");
		};
	}, [light]);
	return /* @__PURE__ */ jsx$1("section", {
		ref,
		className: `editorial-motion ${className}`,
		children
	});
}
function measureWidth(host, text) {
	const m = document.createElement("span");
	m.textContent = text;
	m.setAttribute("aria-hidden", "true");
	m.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;font:800 100px/1 Montserrat,Arial,sans-serif;letter-spacing:-.04em";
	host.appendChild(m);
	const w = m.getBoundingClientRect().width / 100;
	m.remove();
	return w;
}
function fitMarquee(host, text) {
	const cs = getComputedStyle(host), avail = host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
	if (avail <= 0) return null;
	const target = avail * .92, one = Math.min(128, target / measureWidth(host, text));
	if (one >= 28 || innerWidth >= 900) return {
		size: one,
		lines: [text]
	};
	const words = text.split(" ");
	let best = null;
	for (let i = 1; i < words.length; i++) {
		const a = words.slice(0, i).join(" "), b = words.slice(i).join(" "), w = Math.max(measureWidth(host, a), measureWidth(host, b));
		if (!best || w < best.w) best = {
			w,
			lines: [a, b]
		};
	}
	return best ? {
		size: Math.min(128, target / best.w),
		lines: best.lines
	} : {
		size: one,
		lines: [text]
	};
}
function Marquee({ text }) {
	const ref = useRef(null), light = useLightMotion(), [fit, setFit] = useState({
		size: 56,
		lines: [text]
	});
	useLayoutEffect(() => {
		const node = ref.current;
		if (!node) return;
		let alive = true;
		const run = () => {
			if (!alive) return;
			const f = fitMarquee(node, text);
			if (f) setFit((prev) => prev.size === f.size && prev.lines.join("|") === f.lines.join("|") ? prev : f);
		};
		run();
		document.fonts?.ready.then(run);
		const ro = new ResizeObserver(run);
		ro.observe(node);
		return () => {
			alive = false;
			ro.disconnect();
		};
	}, [text]);
	useEffect(() => {
		const node = ref.current;
		if (light || !node) return;
		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const r = node.getBoundingClientRect();
				if (r.bottom < 0 || r.top > innerHeight || document.hidden) return;
				node.style.setProperty("--mq-p", Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height))).toFixed(4));
			});
		};
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		update();
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
			cancelAnimationFrame(frame);
			node.style.removeProperty("--mq-p");
		};
	}, [light]);
	return /* @__PURE__ */ jsx$1("section", {
		ref,
		className: "place-marquee",
		children: /* @__PURE__ */ jsx$1("p", {
			"aria-hidden": "true",
			style: { fontSize: `${fit.size.toFixed(2)}px` },
			children: fit.lines.map((l) => /* @__PURE__ */ jsx$1("span", { children: l }, l))
		})
	});
}
function Manifesto({ words }) {
	return /* @__PURE__ */ jsx$1("section", {
		className: "manifesto wrap",
		"aria-label": words.join(" "),
		children: words.map((word) => /* @__PURE__ */ jsx$1(EditorialMotion, { children: /* @__PURE__ */ jsx$1("p", { children: word }) }, word))
	});
}
function Trust() {
	return /* @__PURE__ */ jsx$1("div", {
		className: "trust wrap",
		children: /* @__PURE__ */ jsx$1("p", { children: "Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles" })
	});
}
function useFlipGrid(ref, keys) {
	const previous = useRef(/* @__PURE__ */ new Map()), light = useLightMotion();
	useLayoutEffect(() => {
		const node = ref.current;
		if (!node) return;
		const next = /* @__PURE__ */ new Map(), animations = [];
		for (const card of node.querySelectorAll("[data-flip-key]")) {
			card.getAnimations().forEach((a) => a.cancel());
			const key = card.dataset.flipKey, to = card.getBoundingClientRect(), from = previous.current.get(key);
			next.set(key, to);
			if (!light && card.animate) {
				const first = from ? {
					transform: `translate(${from.left - to.left}px,${from.top - to.top}px) scale(${from.width / to.width},${from.height / to.height})`,
					opacity: 1
				} : {
					transform: "translateY(16px)",
					opacity: 0
				};
				animations.push(card.animate([first, {
					transform: "none",
					opacity: 1
				}], {
					duration: 450,
					easing: "cubic-bezier(.77,0,.175,1)"
				}));
			}
		}
		previous.current = next;
		return () => animations.forEach((a) => a.cancel());
	}, [
		keys,
		light,
		ref
	]);
}
//#endregion
//#region src/QuoteCopy.jsx
function QuoteCopy({ withType = false }) {
	return /* @__PURE__ */ jsxs$1("div", {
		className: "quote-copy",
		children: [
			/* @__PURE__ */ jsx$1(Trust, {}),
			/* @__PURE__ */ jsx$1("p", {
				className: "eyebrow",
				children: "Hecho para ti"
			}),
			/* @__PURE__ */ jsx$1("h2", { children: withType ? /* @__PURE__ */ jsxs$1(Fragment, { children: [
				"Cuéntanos qué",
				/* @__PURE__ */ jsx$1("br", {}),
				"necesitas."
			] }) : /* @__PURE__ */ jsxs$1(Fragment, { children: [
				"Tu experiencia",
				/* @__PURE__ */ jsx$1("br", {}),
				"empieza con una",
				/* @__PURE__ */ jsx$1("br", {}),
				/* @__PURE__ */ jsx$1("em", { children: "conversación." })
			] }) }),
			/* @__PURE__ */ jsx$1("p", { children: withType ? "Elige el tipo de solicitud y prepara tu mensaje. Compártelo con nuestro equipo en WhatsApp." : "Revisa tu solicitud, cópiala y compártela con nuestro equipo en WhatsApp." }),
			/* @__PURE__ */ jsx$1("a", {
				href: `tel:${company.phone.replaceAll(" ", "")}`,
				className: "contact-number",
				children: company.phone
			}),
			/* @__PURE__ */ jsx$1("small", { children: "La disponibilidad y el valor se confirman con el equipo." })
		]
	});
}
//#endregion
//#region src/Arrow.jsx
var PATHS = {
	ne: "M7 17 17 7M8 7h9v9",
	right: "M5 12h14M13 6l6 6-6 6",
	left: "M19 12H5M11 6l-6 6 6 6",
	down: "M12 5v14M6 13l6 6 6-6",
	up: "M12 19V5M6 11l6-6 6 6"
};
function Arrow({ dir = "ne" }) {
	return /* @__PURE__ */ jsx$1("svg", {
		className: "ico-arrow",
		viewBox: "0 0 24 24",
		width: "18",
		height: "18",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ jsx$1("path", { d: PATHS[dir] })
	});
}
//#endregion
//#region src/CardExtras.jsx
var RATING = 5;
function GoogleBadge({ className = "" }) {
	const figure = RATING.toLocaleString(language() === "en" ? "en-US" : "es-CO", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
	const label = language() === "en" ? `Company rating on Google: ${figure} out of 5` : `Valoración de la empresa en Google: ${figure} de 5`;
	return /* @__PURE__ */ jsxs$1("a", {
		className: `card-google ${className}`,
		href: company.reviews,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": label,
		title: label,
		children: [
			/* @__PURE__ */ jsx$1("span", {
				className: "card-google-stars",
				"aria-hidden": "true",
				children: "★★★★★"
			}),
			/* @__PURE__ */ jsx$1("span", {
				"aria-hidden": "true",
				children: figure
			}),
			/* @__PURE__ */ jsx$1("span", {
				"aria-hidden": "true",
				className: "card-google-brand",
				children: "· Google"
			})
		]
	});
}
function GoogleBadgeStatic({ className = "" }) {
	const figure = RATING.toLocaleString(language() === "en" ? "en-US" : "es-CO", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
	const label = language() === "en" ? `Company rating on Google: ${figure} out of 5` : `Valoración de la empresa en Google: ${figure} de 5`;
	return /* @__PURE__ */ jsxs$1("span", {
		className: `card-google card-google--static ${className}`,
		role: "img",
		"aria-label": label,
		children: [
			/* @__PURE__ */ jsx$1("span", {
				className: "card-google-stars",
				"aria-hidden": "true",
				children: "★★★★★"
			}),
			/* @__PURE__ */ jsx$1("span", {
				"aria-hidden": "true",
				children: figure
			}),
			/* @__PURE__ */ jsx$1("span", {
				"aria-hidden": "true",
				className: "card-google-brand",
				children: "· Google"
			})
		]
	});
}
var FACEBOOK = "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z";
var X_PATH = "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z";
var Brand = ({ d, size = 18 }) => /* @__PURE__ */ jsx$1("svg", {
	className: "ico",
	viewBox: "0 0 24 24",
	width: size,
	height: size,
	fill: "currentColor",
	"aria-hidden": "true",
	focusable: "false",
	children: /* @__PURE__ */ jsx$1("path", { d })
});
function shareUrl(path) {
	let origin = location.origin;
	try {
		const c = document.querySelector("link[rel=\"canonical\"]")?.href;
		if (c) {
			const u = new URL(c);
			if (!/\.invalid$/.test(u.hostname)) origin = u.origin;
		}
	} catch {}
	return origin + (language() === "en" ? "/en" : "") + path;
}
var TEXT = {
	es: {
		button: "Compartir esta experiencia",
		title: "Compartir por",
		copy: "Copiar enlace",
		copied: "Enlace copiado",
		error: "No se pudo copiar. Copia la dirección de la barra del navegador.",
		more: "Más opciones…",
		paste: "Enlace copiado. Pégalo en tu historia o mensaje de {red}.",
		mail: "Correo",
		message: "Mira esta experiencia de T&T Medellín:"
	},
	en: {
		button: "Share this experience",
		title: "Share via",
		copy: "Copy link",
		copied: "Link copied",
		error: "Couldn't copy. Copy the address from the browser bar instead.",
		more: "More options…",
		paste: "Link copied. Paste it into your {red} story or message.",
		mail: "Email",
		message: "Check out this experience from T&T Medellín:"
	}
};
function ShareMenu({ name, path, className = "" }) {
	const tx = TEXT[language() === "en" ? "en" : "es"];
	const [open, setOpen] = useState(false), [pos, setPos] = useState(null), [native, setNative] = useState(false), [notice, setNotice] = useState("");
	const btn = useRef(null), menu = useRef(null), timer = useRef(0);
	useEffect(() => {
		setNative(typeof navigator.share === "function");
	}, []);
	const close = (restore = true) => {
		setOpen(false);
		setNotice("");
		if (restore) btn.current?.focus();
	};
	useEffect(() => {
		if (!open) return void 0;
		const r = btn.current.getBoundingClientRect(), w = 224, h = 340;
		const left = Math.max(8, Math.min(r.right - w, innerWidth - w - 8)), below = r.bottom + 8 + h <= innerHeight || r.top < h;
		setPos({
			left,
			top: below ? r.bottom + 8 : Math.max(8, r.top - 8 - h)
		});
		const first = () => menu.current?.querySelector("[role=menuitem]")?.focus();
		requestAnimationFrame(first);
		const away = (e) => {
			if (!menu.current?.contains(e.target) && !btn.current?.contains(e.target)) close(false);
		};
		const stop = () => close(false);
		document.addEventListener("pointerdown", away);
		window.addEventListener("resize", stop);
		window.addEventListener("scroll", stop, { passive: true });
		return () => {
			document.removeEventListener("pointerdown", away);
			window.removeEventListener("resize", stop);
			window.removeEventListener("scroll", stop);
		};
	}, [open]);
	const say = (text) => {
		setNotice(text);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setNotice(""), 3500);
	};
	const url = () => shareUrl(path), text = () => `${tx.message} ${name}`, openNew = (to) => {
		window.open(to, "_blank", "noopener,noreferrer");
		close(false);
	};
	const copy = async (value) => {
		try {
			await navigator.clipboard.writeText(value);
			return true;
		} catch {
			return false;
		}
	};
	const items = [
		...native ? [{
			id: "native",
			label: tx.more,
			icon: /* @__PURE__ */ jsx$1(Icon, {
				name: "more",
				size: 18
			}),
			run: async () => {
				close(false);
				try {
					await navigator.share({
						title: name,
						text: text(),
						url: url()
					});
				} catch {}
			}
		}] : [],
		{
			id: "wa",
			label: "WhatsApp",
			icon: /* @__PURE__ */ jsx$1(SocialIcon, {
				id: "whatsapp",
				size: 18
			}),
			run: () => openNew(`https://wa.me/?text=${encodeURIComponent(`${text()} ${url()}`)}`)
		},
		{
			id: "fb",
			label: "Facebook",
			icon: /* @__PURE__ */ jsx$1(Brand, { d: FACEBOOK }),
			run: () => openNew(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`)
		},
		{
			id: "x",
			label: "X",
			icon: /* @__PURE__ */ jsx$1(Brand, { d: X_PATH }),
			run: () => openNew(`https://x.com/intent/post?text=${encodeURIComponent(text())}&url=${encodeURIComponent(url())}`)
		},
		{
			id: "ig",
			label: "Instagram",
			icon: /* @__PURE__ */ jsx$1(SocialIcon, {
				id: "instagram",
				size: 18
			}),
			run: async () => {
				say(await copy(`${text()} ${url()}`) ? tx.paste.replace("{red}", "Instagram") : tx.error);
				window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
			}
		},
		{
			id: "tt",
			label: "TikTok",
			icon: /* @__PURE__ */ jsx$1(SocialIcon, {
				id: "tiktok",
				size: 18
			}),
			run: async () => {
				say(await copy(`${text()} ${url()}`) ? tx.paste.replace("{red}", "TikTok") : tx.error);
				window.open("https://www.tiktok.com/", "_blank", "noopener,noreferrer");
			}
		},
		{
			id: "mail",
			label: tx.mail,
			icon: /* @__PURE__ */ jsx$1(Icon, {
				name: "mail",
				size: 18
			}),
			run: () => {
				close(false);
				location.href = `mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(`${text()}\n${url()}`)}`;
			}
		},
		{
			id: "copy",
			label: tx.copy,
			icon: /* @__PURE__ */ jsx$1(Icon, {
				name: "link",
				size: 18
			}),
			run: async () => say(await copy(url()) ? tx.copied : tx.error)
		}
	];
	const onKey = (e) => {
		const els = [...menu.current.querySelectorAll("[role=menuitem]")], i = els.indexOf(document.activeElement);
		if (e.key === "Escape") {
			e.preventDefault();
			close();
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			els[(i + 1) % els.length].focus();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			els[(i - 1 + els.length) % els.length].focus();
		} else if (e.key === "Home") {
			e.preventDefault();
			els[0].focus();
		} else if (e.key === "End") {
			e.preventDefault();
			els[els.length - 1].focus();
		} else if (e.key === "Tab") {
			e.preventDefault();
			els[(i + (e.shiftKey ? -1 : 1) + els.length) % els.length].focus();
		}
	};
	return /* @__PURE__ */ jsxs$1(Fragment, { children: [/* @__PURE__ */ jsx$1("button", {
		ref: btn,
		type: "button",
		className: `card-share ${className}`,
		"aria-label": `${tx.button}: ${name}`,
		"aria-haspopup": "menu",
		"aria-expanded": open,
		onClick: () => open ? close() : setOpen(true),
		children: /* @__PURE__ */ jsx$1(Icon, {
			name: "share",
			size: 18
		})
	}), open && pos && createPortal(/* @__PURE__ */ jsxs$1("div", {
		ref: menu,
		className: "share-menu",
		role: "menu",
		"aria-label": tx.title,
		style: {
			left: pos.left,
			top: pos.top
		},
		onKeyDown: onKey,
		children: [
			/* @__PURE__ */ jsx$1("p", {
				className: "share-menu-title",
				"aria-hidden": "true",
				children: tx.title
			}),
			items.map((it) => /* @__PURE__ */ jsxs$1("button", {
				type: "button",
				role: "menuitem",
				className: "share-item",
				onClick: it.run,
				children: [it.icon, /* @__PURE__ */ jsx$1("span", { children: it.label })]
			}, it.id)),
			/* @__PURE__ */ jsx$1("p", {
				className: "share-notice",
				role: "status",
				"aria-live": "polite",
				children: notice
			})
		]
	}), document.body)] });
}
//#endregion
//#region src/shared.jsx
var Quote = lazy(() => import("./assets/Quote-CSzaIfVi.js"));
var reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Picture({ photo, alt, priority = false, className = "", native = false, sizes = "(max-width: 700px) 100vw, 65vw" }) {
	if (!photo) return null;
	return /* @__PURE__ */ jsx$1("img", {
		className,
		style: native ? { maxWidth: `min(100%, ${photo.width}px)` } : photo.focus ? { objectPosition: photo.focus } : void 0,
		src: photo.src,
		srcSet: photo.srcset || `${photo.small} 640w, ${photo.src} ${photo.width}w`,
		sizes,
		width: photo.width,
		height: photo.height,
		alt,
		loading: priority ? "eager" : "lazy",
		fetchPriority: priority ? "high" : "auto",
		decoding: "async"
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ jsx$1("p", {
		className: "eyebrow",
		children
	});
}
function Button({ to, children, ...props }) {
	return /* @__PURE__ */ jsxs$1(Link, {
		className: "button",
		to,
		...props,
		children: [children, /* @__PURE__ */ jsx$1(Arrow, {})]
	});
}
function Rail({ children, label }) {
	const ref = useRef(null), drag = useRef(null), moved = useRef(false);
	const move = (d) => ref.current.scrollBy({
		left: d * ref.current.clientWidth * .8,
		behavior: reduced() ? "instant" : "smooth"
	});
	return /* @__PURE__ */ jsxs$1("div", {
		className: "rail-shell",
		children: [/* @__PURE__ */ jsxs$1("div", {
			className: "rail-controls",
			children: [
				/* @__PURE__ */ jsx$1("span", { children: "Explora a tu ritmo" }),
				/* @__PURE__ */ jsx$1("button", {
					onClick: () => move(-1),
					"aria-label": `Anterior: ${label}`,
					children: /* @__PURE__ */ jsx$1(Arrow, { dir: "left" })
				}),
				/* @__PURE__ */ jsx$1("button", {
					onClick: () => move(1),
					"aria-label": `Siguiente: ${label}`,
					children: /* @__PURE__ */ jsx$1(Arrow, { dir: "right" })
				})
			]
		}), /* @__PURE__ */ jsx$1("div", {
			ref,
			className: "rail",
			role: "region",
			"aria-label": label,
			tabIndex: 0,
			onKeyDown: (e) => {
				if (e.target === e.currentTarget && ["ArrowLeft", "ArrowRight"].includes(e.key)) {
					e.preventDefault();
					move(e.key === "ArrowLeft" ? -1 : 1);
				}
			},
			onPointerDown: (e) => {
				if (e.pointerType === "mouse" && e.button === 0) {
					drag.current = {
						x: e.clientX,
						left: ref.current.scrollLeft
					};
					moved.current = false;
				}
			},
			onPointerMove: (e) => {
				if (!drag.current) return;
				const dx = e.clientX - drag.current.x;
				if (Math.abs(dx) > 8) {
					moved.current = true;
					ref.current.scrollLeft = drag.current.left - dx;
				}
			},
			onPointerUp: () => {
				drag.current = null;
			},
			onPointerLeave: () => {
				drag.current = null;
			},
			onClickCapture: (e) => {
				if (moved.current) {
					e.preventDefault();
					e.stopPropagation();
					moved.current = false;
				}
			},
			onDragStart: (e) => e.preventDefault(),
			children
		})]
	});
}
function TourCard({ tour }) {
	const copy = inicioTextos.cartas[tour.slug];
	return /* @__PURE__ */ jsxs$1("article", {
		className: "tour-card",
		"data-flip-key": tour.slug,
		children: [
			/* @__PURE__ */ jsxs$1(Link, {
				className: "tour-card-main",
				to: `/experiencias/${tour.slug}`,
				children: [/* @__PURE__ */ jsx$1("div", {
					className: "tour-card-image",
					children: /* @__PURE__ */ jsx$1(Picture, {
						photo: tour.images[0],
						alt: tour.name,
						sizes: "(max-width: 700px) 100vw, (max-width: 1099px) 50vw, 33vw"
					})
				}), /* @__PURE__ */ jsxs$1("div", {
					className: "card-copy",
					children: [
						/* @__PURE__ */ jsxs$1("div", {
							className: "card-meta",
							children: [/* @__PURE__ */ jsx$1("span", { children: tour.category }), /* @__PURE__ */ jsxs$1("span", { children: [tour.number, " / T&T"] })]
						}),
						/* @__PURE__ */ jsx$1("h3", { children: tour.name }),
						/* @__PURE__ */ jsxs$1("p", { children: [
							/* @__PURE__ */ jsxs$1("b", { children: [copy.emocion, ":"] }),
							" ",
							copy.frase
						] }),
						/* @__PURE__ */ jsxs$1("span", {
							className: "card-action",
							children: ["Planea esta experiencia ", /* @__PURE__ */ jsx$1(Arrow, {})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx$1(ShareMenu, {
				name: tour.name,
				path: `/experiencias/${tour.slug}`,
				className: "tour-card-share"
			}),
			/* @__PURE__ */ jsx$1(GoogleBadge, { className: "tour-card-badge" })
		]
	});
}
function PageTitle({ tag, title, text, photo, floating = [] }) {
	return /* @__PURE__ */ jsxs$1(EditorialMotion, {
		className: `page-title wrap ${photo ? "page-title-with-photo" : ""}`,
		children: [/* @__PURE__ */ jsxs$1("div", {
			className: "page-title-copy",
			children: [
				/* @__PURE__ */ jsx$1(Eyebrow, { children: tag }),
				/* @__PURE__ */ jsx$1("h1", { children: title }),
				text && /* @__PURE__ */ jsx$1("p", { children: text })
			]
		}), photo && /* @__PURE__ */ jsxs$1("div", {
			className: "page-title-media",
			children: [/* @__PURE__ */ jsx$1("figure", {
				className: "page-title-card",
				children: /* @__PURE__ */ jsx$1(Picture, {
					photo,
					alt: tag,
					priority: true,
					sizes: "(max-width: 700px) 72vw, 320px"
				})
			}), floating.map((p, i) => /* @__PURE__ */ jsx$1("figure", {
				className: `editorial-float editorial-float-${i}`,
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx$1(Picture, {
					photo: p,
					alt: "",
					sizes: "140px"
				})
			}, p.src))]
		})]
	});
}
function QuoteSection({ context, mode }) {
	const mounted = useMounted();
	const frame = /* @__PURE__ */ jsxs$1("section", {
		className: "quote-section wrap",
		"aria-busy": "true",
		children: [/* @__PURE__ */ jsx$1(QuoteCopy, { withType: mode === "contacto" }), /* @__PURE__ */ jsx$1("div", {
			className: "quote-form quote-form-frame",
			"aria-hidden": "true"
		})]
	});
	return /* @__PURE__ */ jsx$1("div", {
		id: "consulta",
		children: mounted ? /* @__PURE__ */ jsx$1(Suspense, {
			fallback: frame,
			children: /* @__PURE__ */ jsx$1(Quote, {
				context,
				mode
			})
		}) : frame
	});
}
//#endregion
//#region src/Preferences.jsx
function Preferences() {
	const [dark, setDark] = useState(false);
	const { pathname, search, hash } = useLocation();
	useEffect(() => {
		const system = matchMedia("(prefers-color-scheme: dark)");
		const sync = () => {
			let saved;
			try {
				saved = localStorage.getItem("tyt-theme");
			} catch {}
			const active = saved === "dark" || saved !== "light" && system.matches;
			document.documentElement.dataset.theme = active ? "dark" : "light";
			setDark(active);
		};
		sync();
		system.addEventListener("change", sync);
		window.addEventListener("storage", sync);
		return () => {
			system.removeEventListener("change", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	const toggle = () => {
		const next = !dark;
		document.documentElement.dataset.theme = next ? "dark" : "light";
		setDark(next);
		document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", next ? "#171A18" : "#FAF8F5");
		try {
			localStorage.setItem("tyt-theme", next ? "dark" : "light");
		} catch {}
	};
	const destination = language() === "en" ? "es" : "en";
	return /* @__PURE__ */ jsxs$1("div", {
		className: "site-preferences",
		children: [/* @__PURE__ */ jsx$1("button", {
			type: "button",
			className: "theme-toggle",
			"aria-label": dark ? "Activar modo claro" : "Activar modo oscuro",
			"aria-pressed": dark,
			onClick: toggle,
			children: /* @__PURE__ */ jsx$1("svg", {
				"aria-hidden": "true",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.7",
				children: dark ? /* @__PURE__ */ jsxs$1(Fragment, { children: [/* @__PURE__ */ jsx$1("circle", {
					cx: "12",
					cy: "12",
					r: "4"
				}), /* @__PURE__ */ jsx$1("path", { d: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" })] }) : /* @__PURE__ */ jsx$1("path", { d: "M20 15A8.5 8.5 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z" })
			})
		}), /* @__PURE__ */ jsx$1("a", {
			className: "language-toggle",
			href: languagePath(pathname, destination) + search + hash,
			hrefLang: destination,
			lang: destination,
			"aria-label": destination === "en" ? "Read this page in English" : "Leer esta página en español",
			children: destination.toUpperCase()
		})]
	});
}
//#endregion
//#region src/WhatsAppFab.jsx
var BLOCKERS = "a,button,input,select,textarea,label,summary,[role=tab],.site-footer";
function WhatsAppFab() {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		let raf = 0, until = 0, lastRun = 0, box = null;
		const measureBox = () => {
			const r = el.getBoundingClientRect();
			box = {
				cx: r.left + r.width / 2,
				cy: r.top + r.height / 2,
				r: r.width / 2 + 8
			};
		};
		const check = (now) => {
			raf = 0;
			if (now < until) raf = requestAnimationFrame(check);
			if (now - lastRun < 50) return;
			lastRun = now;
			let blocked = Boolean(document.querySelector(".menu-open, dialog[open]"));
			if (!blocked) outer: for (let k = -1; k < 8; k++) {
				const x = box.cx + (k < 0 ? 0 : box.r * Math.cos(k * Math.PI / 4)), y = box.cy + (k < 0 ? 0 : box.r * Math.sin(k * Math.PI / 4));
				for (const hit of document.elementsFromPoint(x, y)) {
					if (hit.closest(".wa-fab")) continue;
					if (hit.closest(BLOCKERS)) {
						blocked = true;
						break outer;
					}
				}
			}
			const value = blocked ? "true" : "false";
			if (el.dataset.hidden !== value) el.dataset.hidden = value;
		};
		const schedule = () => {
			until = performance.now() + 500;
			if (!raf) raf = requestAnimationFrame(check);
		};
		const onResize = () => {
			measureBox();
			schedule();
		};
		measureBox();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", onResize);
		const mo = new MutationObserver(schedule);
		mo.observe(document.body, {
			subtree: true,
			attributes: true,
			attributeFilter: ["class", "open"]
		});
		const pulse = setInterval(() => {
			if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			el.classList.add("wa-pulse");
			setTimeout(() => el.classList.remove("wa-pulse"), 1900);
		}, 12e3);
		const timer = setInterval(schedule, 800);
		schedule();
		return () => {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", onResize);
			mo.disconnect();
			clearInterval(timer);
			clearInterval(pulse);
			cancelAnimationFrame(raf);
		};
	}, []);
	return /* @__PURE__ */ jsxs$1("a", {
		ref,
		className: "wa-fab",
		"data-hidden": "false",
		href: whatsapp(),
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Escribir por WhatsApp",
		children: [/* @__PURE__ */ jsx$1(SocialIcon, {
			id: "whatsapp",
			size: 32
		}), /* @__PURE__ */ jsx$1("span", {
			className: "wa-label",
			"aria-hidden": "true",
			children: language() === "en" ? "Let's talk?" : "¿Hablamos?"
		})]
	});
}
//#endregion
//#region src/Website.jsx
var LOGO_SRCSET = "/media/marca/logo/logo-40.webp 40w, /media/marca/logo/logo-44.webp 44w, /media/marca/logo/logo-56.webp 56w, /media/marca/logo/logo-80.webp 80w, /media/marca/logo/logo-88.webp 88w, /media/marca/logo/logo-112.webp 112w, /media/marca/logo/logo-120.webp 120w, /media/marca/logo/logo-132.webp 132w, /media/marca/logo/logo-168.webp 168w, /media/marca/logo/logo-224.webp 224w, /media/marca/logo/logo-240.webp 240w, /media/marca/logo/logo-336.webp 336w, /media/marca/logo/logo-360.webp 360w, /media/marca/logo/logo-400.webp 400w";
function Logo({ size, sizes, className = "", lazy = false }) {
	return /* @__PURE__ */ jsx$1("img", {
		className: `logo-mark ${className}`,
		fetchPriority: lazy ? void 0 : "low",
		loading: lazy ? "lazy" : void 0,
		src: "/media/marca/logo/logo-400.png",
		srcSet: LOGO_SRCSET,
		sizes,
		width: size,
		height: size,
		alt: "Transporte y Turismo Medellín",
		decoding: "async"
	});
}
function lazyRoute(loader) {
	let Loaded = null, promise = null;
	const preload = () => promise || (promise = loader().then((component) => {
		Loaded = component;
		return component;
	}));
	const Lazy = lazy(() => preload().then((component) => ({ default: component })));
	function Route() {
		return useRef(Loaded !== null).current ? /* @__PURE__ */ jsx$1(Loaded, {}) : /* @__PURE__ */ jsx$1(Lazy, {});
	}
	Route.preload = preload;
	return Route;
}
var pick = (loader, name) => () => loader().then((m) => m[name]);
var company_ = () => import("./assets/Company-Dv3EROpL.js");
var R = {
	home: lazyRoute(() => import("./assets/Home-B9VgQpHe.js").then((m) => m.default)),
	catalog: lazyRoute(() => import("./assets/Catalog-ALBB3_Xn.js").then((m) => m.default)),
	tour: lazyRoute(() => import("./assets/Tour-CFqEKnZF.js").then((m) => m.default)),
	fleet: lazyRoute(() => import("./assets/Fleet-wUBzdOIg.js").then((m) => m.default)),
	blog: lazyRoute(pick(() => import("./assets/Blog-CQ-TX4Ul.js"), "Blog")),
	article: lazyRoute(() => import("./assets/Blog-CQ-TX4Ul.js").then((m) => m.default)),
	about: lazyRoute(pick(company_, "About")),
	services: lazyRoute(pick(company_, "Services")),
	contact: lazyRoute(pick(company_, "Contact")),
	quote: lazyRoute(pick(company_, "QuotePage")),
	privacy: lazyRoute(pick(company_, "Privacy")),
	ratings: lazyRoute(pick(company_, "Ratings")),
	notFound: lazyRoute(() => import("./assets/NotFound-hdxCCg5R.js").then((m) => m.default))
};
R.home, R.catalog, R.tour, R.fleet, R.blog, R.article, R.about, R.services, R.contact, R.quote, R.privacy, R.ratings;
var preloadAllRoutes = () => Promise.all(Object.values(R).map((route) => route.preload()));
var nav = [
	["Inicio", "/"],
	["Experiencias", "/experiencias"],
	["Servicios", "/servicios"],
	["Vehículos", "/vehiculos"],
	["Nosotros", "/nosotros"],
	["Blog", "/blog"],
	["Contacto", "/contacto"]
];
function PageEffects() {
	const { pathname, hash } = useLocation();
	const first = useRef(true);
	useEffect(() => {
		if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" }));
		else {
			window.scrollTo({
				top: 0,
				behavior: "instant"
			});
			if (!first.current) document.querySelector("main")?.focus({ preventScroll: true });
		}
		first.current = false;
	}, [pathname, hash]);
	useEffect(() => {
		if (/^\/(experiencias|blog)\/[^/]+\/?$/.test(pathname)) return;
		const page = staticMeta[pathname] || NOT_FOUND;
		applyMeta(page[0], page[1]);
	}, [pathname]);
	return null;
}
function Header() {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const toggle = useRef(null);
	useEffect(() => setOpen(false), [location]);
	useEffect(() => {
		const key = (e) => {
			if (e.key === "Escape" && open) {
				setOpen(false);
				toggle.current?.focus();
			}
		};
		window.addEventListener("keydown", key);
		return () => window.removeEventListener("keydown", key);
	}, [open]);
	return /* @__PURE__ */ jsxs$1("header", {
		className: `site-header${unprefix(location.pathname) === "/" ? " is-home" : ""}${open ? " menu-open" : ""}`,
		children: [
			/* @__PURE__ */ jsx$1(Link, {
				to: "/",
				className: "brand",
				"aria-label": "Transporte y Turismo Medellín, inicio",
				children: /* @__PURE__ */ jsx$1(Logo, {
					size: 56,
					sizes: "(max-width: 899px) 44px, 56px"
				})
			}),
			/* @__PURE__ */ jsx$1(Preferences, {}),
			/* @__PURE__ */ jsx$1("a", {
				className: "menu-nojs",
				href: "#pie",
				children: "Menú"
			}),
			/* @__PURE__ */ jsxs$1("button", {
				ref: toggle,
				className: "menu-toggle",
				onClick: () => setOpen(!open),
				"aria-expanded": open,
				"aria-controls": "navigation",
				children: [
					open ? "Cerrar" : "Menú",
					" ",
					/* @__PURE__ */ jsx$1("span", {
						"aria-hidden": "true",
						children: open ? "−" : "+"
					})
				]
			}),
			/* @__PURE__ */ jsxs$1("nav", {
				id: "navigation",
				className: open ? "open" : "",
				"aria-label": "Principal",
				children: [
					nav.map(([label, url]) => /* @__PURE__ */ jsx$1(NavLink, {
						to: url,
						end: url === "/",
						children: label
					}, url)),
					/* @__PURE__ */ jsx$1(Socials, { className: "header-socials" }),
					/* @__PURE__ */ jsxs$1(Link, {
						to: "/cotizar",
						className: "nav-cta",
						children: ["Planeemos tu viaje ", /* @__PURE__ */ jsx$1(Arrow, {})]
					})
				]
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs$1("div", {
		className: "pie-wrap",
		children: [/* @__PURE__ */ jsx$1(Skyline, {}), /* @__PURE__ */ jsxs$1("footer", {
			className: "site-footer tone-dark",
			id: "pie",
			children: [
				/* @__PURE__ */ jsxs$1("div", {
					className: "pie-top",
					children: [/* @__PURE__ */ jsxs$1("p", { children: [
						"Tu próxima historia",
						/* @__PURE__ */ jsx$1("br", {}),
						"empieza ",
						/* @__PURE__ */ jsx$1("em", { children: "aquí." })
					] }), /* @__PURE__ */ jsx$1(Button, {
						to: "/experiencias",
						children: "Encuentra tu experiencia"
					})]
				}),
				/* @__PURE__ */ jsxs$1("div", {
					className: "pie-grid",
					children: [
						/* @__PURE__ */ jsxs$1("div", {
							className: "pie-brand",
							children: [
								/* @__PURE__ */ jsx$1(Link, {
									className: "footer-brand",
									to: "/",
									"aria-label": "Transporte y Turismo Medellín, inicio",
									children: /* @__PURE__ */ jsx$1(Logo, {
										size: 120,
										sizes: "120px",
										className: "logo-footer",
										lazy: true
									})
								}),
								/* @__PURE__ */ jsx$1("p", {
									className: "pie-line",
									children: "Experiencias a otro nivel"
								}),
								/* @__PURE__ */ jsxs$1("p", { children: [
									"Nos mueve nuestra tierra.",
									/* @__PURE__ */ jsx$1("br", {}),
									"Nos importan las personas."
								] })
							]
						}),
						/* @__PURE__ */ jsxs$1("nav", {
							"aria-label": "Enlaces rápidos",
							children: [/* @__PURE__ */ jsx$1("h2", {
								className: "pie-h",
								children: "Enlaces rápidos"
							}), /* @__PURE__ */ jsx$1("ul", {
								role: "list",
								children: [
									["Inicio", "/"],
									["Experiencias", "/experiencias"],
									["Vehículos", "/vehiculos"],
									["Nosotros", "/nosotros"],
									["Contacto", "/contacto"]
								].map(([label, url]) => /* @__PURE__ */ jsx$1("li", { children: /* @__PURE__ */ jsx$1(Link, {
									to: url,
									children: label
								}) }, url))
							})]
						}),
						/* @__PURE__ */ jsxs$1("div", { children: [/* @__PURE__ */ jsx$1("h2", {
							className: "pie-h",
							children: "Contacto directo"
						}), /* @__PURE__ */ jsxs$1("ul", {
							role: "list",
							className: "pie-contact",
							children: [
								/* @__PURE__ */ jsxs$1("li", { children: [/* @__PURE__ */ jsx$1("span", {
									className: "pie-ico",
									children: /* @__PURE__ */ jsx$1(Icon, {
										name: "mapPin",
										size: 18
									})
								}), /* @__PURE__ */ jsx$1("span", { children: company.address })] }),
								/* @__PURE__ */ jsxs$1("li", { children: [/* @__PURE__ */ jsx$1("span", {
									className: "pie-ico",
									children: /* @__PURE__ */ jsx$1(Icon, {
										name: "phone",
										size: 18
									})
								}), /* @__PURE__ */ jsx$1("a", {
									href: `tel:${company.phone.replaceAll(" ", "")}`,
									children: company.phone
								})] }),
								/* @__PURE__ */ jsxs$1("li", { children: [/* @__PURE__ */ jsx$1("span", {
									className: "pie-ico",
									children: /* @__PURE__ */ jsx$1(Icon, {
										name: "mail",
										size: 18
									})
								}), /* @__PURE__ */ jsx$1("a", {
									href: `mailto:${company.email}`,
									children: company.email
								})] })
							]
						})] }),
						/* @__PURE__ */ jsxs$1("div", { children: [/* @__PURE__ */ jsx$1("h2", {
							className: "pie-h",
							children: "Síguenos"
						}), /* @__PURE__ */ jsx$1("ul", {
							role: "list",
							className: "pie-social",
							children: [[
								"instagram",
								"Instagram",
								company.instagram,
								"@transporteenmedellin"
							], [
								"tiktok",
								"TikTok",
								company.tiktok,
								"@tytmedellin"
							]].map(([id, name, url, handle]) => /* @__PURE__ */ jsx$1("li", { children: /* @__PURE__ */ jsxs$1("a", {
								href: url,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": `Síguenos en ${name} (se abre en una pestaña nueva)`,
								children: [/* @__PURE__ */ jsx$1("span", {
									className: "pie-circle",
									children: /* @__PURE__ */ jsx$1(SocialIcon, {
										id,
										size: 20
									})
								}), /* @__PURE__ */ jsx$1("span", { children: handle })]
							}) }, id))
						})] })
					]
				}),
				/* @__PURE__ */ jsxs$1("div", {
					className: "pie-bottom",
					children: [
						/* @__PURE__ */ jsx$1("span", { children: "RNT 176384" }),
						/* @__PURE__ */ jsx$1("span", { children: "NIT 901738550-6" }),
						/* @__PURE__ */ jsx$1("span", { children: "© 2026 Transporte y Turismo Medellín" }),
						/* @__PURE__ */ jsx$1(Link, {
							to: "/privacidad",
							children: "Privacidad"
						}),
						/* @__PURE__ */ jsx$1(Link, {
							to: "/calificaciones",
							children: "Calificaciones"
						})
					]
				})
			]
		})]
	});
}
function Layout() {
	const { pathname } = useLocation();
	return /* @__PURE__ */ jsxs$1(Fragment, { children: [
		/* @__PURE__ */ jsx$1("a", {
			className: "skip-link",
			href: "#contenido",
			children: "Saltar al contenido"
		}),
		/* @__PURE__ */ jsx$1(PageEffects, {}),
		/* @__PURE__ */ jsx$1(Header, {}),
		/* @__PURE__ */ jsx$1("main", {
			id: "contenido",
			tabIndex: -1,
			children: /* @__PURE__ */ jsx$1(Suspense, {
				fallback: null,
				children: /* @__PURE__ */ jsxs$1(Routes, { children: [
					/* @__PURE__ */ jsx$1(Route, {
						path: "/",
						element: /* @__PURE__ */ jsx$1(R.home, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/site",
						element: /* @__PURE__ */ jsx$1(Navigate, {
							to: "/",
							replace: true
						})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/experiencias",
						element: /* @__PURE__ */ jsx$1(R.catalog, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/experiencias/:slug",
						element: /* @__PURE__ */ jsx$1(R.tour, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/servicios",
						element: /* @__PURE__ */ jsx$1(R.services, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/vehiculos",
						element: /* @__PURE__ */ jsx$1(R.fleet, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/flota",
						element: /* @__PURE__ */ jsx$1(Navigate, {
							to: "/vehiculos",
							replace: true
						})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/nosotros",
						element: /* @__PURE__ */ jsx$1(R.about, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/blog",
						element: /* @__PURE__ */ jsx$1(R.blog, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/blog/:slug",
						element: /* @__PURE__ */ jsx$1(R.article, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/contacto",
						element: /* @__PURE__ */ jsx$1(R.contact, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/cotizar",
						element: /* @__PURE__ */ jsx$1(R.quote, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/calificaciones",
						element: /* @__PURE__ */ jsx$1(R.ratings, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/privacidad",
						element: /* @__PURE__ */ jsx$1(R.privacy, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "*",
						element: /* @__PURE__ */ jsx$1(R.notFound, {})
					})
				] })
			})
		}, pathname),
		/* @__PURE__ */ jsx$1(Allies, {}),
		/* @__PURE__ */ jsx$1(Footer, {}),
		/* @__PURE__ */ jsx$1(WhatsAppFab, {})
	] });
}
function Website() {
	return /* @__PURE__ */ jsx$1(Layout, {});
}
var media_default = {
	"city-tour-comuna-13": [
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3163-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3163-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3163-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3163-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/img-3163-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/img-3163-1600.webp 1600w",
			"width": 1600,
			"height": 1200,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3163-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-2275-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-2275-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-2275-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-2275-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-2275-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-2275-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-2383-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-2383-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-2383-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-2383-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-2383-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-2383-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-2776-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-2776-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-2776-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-2776-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-2776-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-2776-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3231-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3231-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3231-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3231-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3231-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3231-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3322-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3322-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3322-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3322-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3322-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3322-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3366-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3366-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3366-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3366-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3366-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3366-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3402-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3402-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3402-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3402-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3402-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3402-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3478-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3478-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3478-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3478-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3478-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3478-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3707-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3707-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3707-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3707-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3707-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3707-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-5077-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-5077-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-5077-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-5077-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-5077-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-5077-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-5178-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-5178-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-5178-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-5178-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-5178-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-5178-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-5193-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-5193-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-5193-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-5193-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-5193-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-5193-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-7392-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-7392-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-7392-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-7392-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-7392-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-7392-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-7461-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-7461-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-7461-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-7461-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-7461-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-7461-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-8609-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-8609-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-8609-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-8609-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-8609-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-8609-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-8981-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-8981-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-8981-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-8981-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-8981-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-8981-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/comuna13-parce-medellin-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/comuna13-parce-medellin-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/comuna13-parce-medellin-grupo-1600.webp 400w, /media/oficial/w800/_sede/comuna13-parce-medellin-grupo-1600.webp 800w, /media/oficial/w1200/_sede/comuna13-parce-medellin-grupo-1600.webp 1200w, /media/oficial/orig/_sede/comuna13-parce-medellin-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 900,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/comuna13-parce-medellin-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/mural-grupo-551.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/mural-grupo-551.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/mural-grupo-551.webp 400w, /media/oficial/orig/city-tour-comuna-13/mural-grupo-551.webp 551w",
			"width": 551,
			"height": 310,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/mural-grupo-551.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"guatape-piedra-del-penol": [
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9328-card-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9328-card-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9328-card-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9328-card-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9328-card-1600.webp 1200w",
			"width": 1200,
			"height": 720,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9328-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9345-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9345-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9345-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9345-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9345-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9345-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4197-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4197-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4197-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4197-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4197-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4197-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9312-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9312-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9312-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9312-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9312-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9312-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp 1600w",
			"width": 1600,
			"height": 2844,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp 1600w",
			"width": 1600,
			"height": 2844,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp 1600w",
			"width": 1600,
			"height": 1400,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9386-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9386-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9386-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9386-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9386-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9386-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9137-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9137-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9137-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9137-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9137-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9137-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9191-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9191-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9191-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9191-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9191-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9191-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4177-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4177-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4177-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4177-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4177-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4177-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4206-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4206-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4206-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4206-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4206-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4206-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4454-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4454-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4454-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4454-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4454-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4454-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4491-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4491-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4491-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4491-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4491-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4491-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9018-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9018-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9018-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9018-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9018-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9018-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"tour-nocturno-medellin": [
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-bandera-mirador-card-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-card-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-card-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-bandera-mirador-card-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-bandera-mirador-card-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-bandera-mirador-card-1600.webp 1600w",
			"width": 1600,
			"height": 960,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-bandera-mirador-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1695-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1695-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1695-1600.webp 400w, /media/oficial/w800/_sede/img-1695-1600.webp 800w, /media/oficial/orig/_sede/img-1695-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1695-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1881-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1881-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1881-1600.webp 400w, /media/oficial/w800/_sede/img-1881-1600.webp 800w, /media/oficial/orig/_sede/img-1881-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1881-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-pareja-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-pareja-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-pareja-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-pareja-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-pareja-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-pareja-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-pareja-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1908-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1908-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1908-1600.webp 400w, /media/oficial/w800/_sede/img-1908-1600.webp 800w, /media/oficial/orig/_sede/img-1908-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1908-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-bandera-mirador-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-bandera-mirador-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-bandera-mirador-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-bandera-mirador-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-bandera-mirador-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-payaso-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-payaso-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-payaso-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-payaso-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-payaso-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-payaso-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-payaso-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1905-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1905-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1905-1600.webp 400w, /media/oficial/w800/_sede/img-1905-1600.webp 800w, /media/oficial/orig/_sede/img-1905-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1905-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-grupo-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-grupo-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-grupo-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-ruanas-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-ruanas-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-ruanas-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-ruanas-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-ruanas-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-ruanas-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-ruanas-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-la70-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-la70-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-la70-grupo-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-la70-grupo-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-la70-grupo-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-la70-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-la70-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-restaurante-tematico-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-restaurante-tematico-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-restaurante-tematico-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-restaurante-tematico-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-restaurante-tematico-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-restaurante-tematico-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-restaurante-tematico-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-restaurante-folclorico-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-restaurante-folclorico-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-restaurante-folclorico-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-restaurante-folclorico-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-restaurante-folclorico-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-restaurante-folclorico-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-restaurante-folclorico-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"vuelta-a-oriente": [
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-2686-card-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-2686-card-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-2686-card-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-2686-card-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-2686-card-1600.webp 1200w",
			"width": 1200,
			"height": 720,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-2686-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-2686-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-2686-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-2686-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-2686-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-2686-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-2686-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0774-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0774-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0774-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0774-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0774-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0774-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0768-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0768-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0768-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0768-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0768-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0768-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-2698-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-2698-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-2698-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-2698-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-2698-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-2698-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0801-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0801-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0801-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0801-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0801-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0801-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0815-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0815-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0815-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0815-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0815-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0815-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0858-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0858-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0858-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0858-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0858-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0858-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-2617-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-2617-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-2617-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-2617-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-2617-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-2617-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp 800w, /media/oficial/w1200/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp 1200w, /media/oficial/orig/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/oriente-postres-marinilla-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/oriente-postres-marinilla-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/oriente-postres-marinilla-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/oriente-postres-marinilla-1600.webp 800w, /media/oficial/w1200/vuelta-a-oriente/oriente-postres-marinilla-1600.webp 1200w, /media/oficial/orig/vuelta-a-oriente/oriente-postres-marinilla-1600.webp 1600w",
			"width": 1600,
			"height": 1442,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/oriente-postres-marinilla-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp 800w, /media/oficial/w1200/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp 1200w, /media/oficial/orig/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"tour-del-cafe-medellin": [
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-2466-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-2466-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-2466-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-2466-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-2466-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-2466-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-0657-1600.webp",
			"small": "/media/oficial/w400/_sede/img-0657-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-0657-1600.webp 400w, /media/oficial/w800/_sede/img-0657-1600.webp 800w, /media/oficial/orig/_sede/img-0657-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-0657-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0731-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0731-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0731-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0731-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0731-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0731-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0626-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0626-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0626-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0626-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0626-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0626-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0759-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0759-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0759-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0759-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0759-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0759-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0775-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0775-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0775-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0775-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0775-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0775-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0785-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0785-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0785-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0785-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0785-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0785-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-2509-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-2509-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-2509-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-2509-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-2509-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-2509-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"hacienda-napoles": [
		{
			"src": "/media/oficial/orig/hacienda-napoles/hacienda-napoles-480.webp",
			"small": "/media/oficial/w400/hacienda-napoles/hacienda-napoles-480.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/hacienda-napoles-480.webp 400w, /media/oficial/orig/hacienda-napoles/hacienda-napoles-480.webp 480w",
			"width": 480,
			"height": 640,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/hacienda-napoles-480.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1747-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1747-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1747-1600.webp 400w, /media/oficial/w800/_sede/img-1747-1600.webp 800w, /media/oficial/orig/_sede/img-1747-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1747-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-1754-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-1754-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-1754-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-1754-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-1754-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-1754-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5205-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5205-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5205-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5205-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5205-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5205-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5231-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5231-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5231-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5231-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5231-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5231-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5290-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5290-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5290-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5290-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5290-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5290-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5304-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5304-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5304-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5304-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5304-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5304-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-1811-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-1811-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-1811-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-1811-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-1811-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-1811-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-1828-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-1828-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-1828-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-1828-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-1828-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-1828-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-1832-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-1832-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-1832-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-1832-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-1832-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-1832-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5346-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5346-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5346-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5346-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5346-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5346-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"salto-del-buey": [
		{
			"src": "/media/oficial/orig/_sede/img-7241-1600.webp",
			"small": "/media/oficial/w400/_sede/img-7241-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-7241-1600.webp 400w, /media/oficial/w800/_sede/img-7241-1600.webp 800w, /media/oficial/orig/_sede/img-7241-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-7241-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-2114-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-2114-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-2114-1600.webp 400w, /media/oficial/orig/salto-del-buey/img-2114-1600.webp 627w",
			"width": 627,
			"height": 836,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-2114-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-2161-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-2161-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-2161-1600.webp 400w, /media/oficial/orig/salto-del-buey/img-2161-1600.webp 627w",
			"width": 627,
			"height": 836,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-2161-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7125-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7125-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7125-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7125-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7125-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7125-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7157-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7157-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7157-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7157-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7157-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7157-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7170-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7170-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7170-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7170-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7170-1600.webp 900w",
			"width": 900,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7170-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7225-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7225-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7225-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7225-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7225-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7225-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7271-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7271-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7271-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7271-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7271-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7271-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/salto-del-buey-cascada-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/salto-del-buey-cascada-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/salto-del-buey-cascada-1600.webp 400w, /media/oficial/w800/salto-del-buey/salto-del-buey-cascada-1600.webp 800w, /media/oficial/w1200/salto-del-buey/salto-del-buey-cascada-1600.webp 1200w, /media/oficial/orig/salto-del-buey/salto-del-buey-cascada-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/salto-del-buey-cascada-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp 400w, /media/oficial/w800/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp 800w, /media/oficial/w1200/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp 1200w, /media/oficial/orig/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/salto-del-buey-zipline-familia-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/salto-del-buey-zipline-familia-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/salto-del-buey-zipline-familia-1600.webp 400w, /media/oficial/w800/salto-del-buey/salto-del-buey-zipline-familia-1600.webp 800w, /media/oficial/w1200/salto-del-buey/salto-del-buey-zipline-familia-1600.webp 1200w, /media/oficial/orig/salto-del-buey/salto-del-buey-zipline-familia-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/salto-del-buey-zipline-familia-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/salto-del-buey-sendero-familia-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/salto-del-buey-sendero-familia-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/salto-del-buey-sendero-familia-1600.webp 400w, /media/oficial/w800/salto-del-buey/salto-del-buey-sendero-familia-1600.webp 800w, /media/oficial/w1200/salto-del-buey/salto-del-buey-sendero-familia-1600.webp 1200w, /media/oficial/orig/salto-del-buey/salto-del-buey-sendero-familia-1600.webp 1600w",
			"width": 1600,
			"height": 2844,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/salto-del-buey-sendero-familia-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"santa-fe-de-antioquia": [
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-puente-occidente.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-puente-occidente.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-puente-occidente.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/santa-fe-puente-occidente.webp 800w, /media/oficial/w1200/santa-fe-de-antioquia/santa-fe-puente-occidente.webp 1200w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-puente-occidente.webp 1920w",
			"width": 1920,
			"height": 1137,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-puente-occidente.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-3634-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-3634-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-3634-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-3634-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-3634-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-3634-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-3596-1600.webp",
			"small": "/media/oficial/w400/_sede/img-3596-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-3596-1600.webp 400w, /media/oficial/w800/_sede/img-3596-1600.webp 800w, /media/oficial/orig/_sede/img-3596-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-3596-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-3589-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-3589-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-3589-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-3589-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-3589-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-3589-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-3604-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-3604-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-3604-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-3604-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-3604-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-3604-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-3637-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-3637-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-3637-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-3637-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-3637-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-3637-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-5974-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-5974-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-5974-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-5974-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-5974-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-5974-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-5981-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-5981-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-5981-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-5981-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-5981-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-5981-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp 400w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp 720w",
			"width": 720,
			"height": 540,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp 800w, /media/oficial/w1200/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp 1200w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp 1920w",
			"width": 1920,
			"height": 1284,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-puente-interior.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-puente-interior.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-puente-interior.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/santa-fe-puente-interior.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-puente-interior.webp 945w",
			"width": 945,
			"height": 1680,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-puente-interior.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-calle-colonial.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-calle-colonial.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-calle-colonial.webp 400w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-calle-colonial.webp 600w",
			"width": 600,
			"height": 600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-calle-colonial.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp 400w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp 600w",
			"width": 600,
			"height": 600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp 400w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp 600w",
			"width": 600,
			"height": 600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"tour-de-compras": [
		{
			"src": "/media/oficial/orig/_sede/tour-de-compras-1120.webp",
			"small": "/media/oficial/w400/_sede/tour-de-compras-1120.webp",
			"srcset": "/media/oficial/w400/_sede/tour-de-compras-1120.webp 400w, /media/oficial/w800/_sede/tour-de-compras-1120.webp 800w, /media/oficial/orig/_sede/tour-de-compras-1120.webp 1120w",
			"width": 1120,
			"height": 840,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/tour-de-compras-1120.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-de-compras/img-2686-1600.webp",
			"small": "/media/oficial/w400/tour-de-compras/img-2686-1600.webp",
			"srcset": "/media/oficial/w400/tour-de-compras/img-2686-1600.webp 400w, /media/oficial/w800/tour-de-compras/img-2686-1600.webp 800w, /media/oficial/orig/tour-de-compras/img-2686-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-de-compras/img-2686-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-de-compras/img-3181-1600.webp",
			"small": "/media/oficial/w400/tour-de-compras/img-3181-1600.webp",
			"srcset": "/media/oficial/w400/tour-de-compras/img-3181-1600.webp 400w, /media/oficial/w800/tour-de-compras/img-3181-1600.webp 800w, /media/oficial/orig/tour-de-compras/img-3181-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-de-compras/img-3181-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"traslados-aeropuerto-jmc": [
		{
			"src": "/media/oficial/orig/traslados-aeropuerto-jmc/img-9035-card-1600.webp",
			"small": "/media/oficial/w400/traslados-aeropuerto-jmc/img-9035-card-1600.webp",
			"srcset": "/media/oficial/w400/traslados-aeropuerto-jmc/img-9035-card-1600.webp 400w, /media/oficial/w800/traslados-aeropuerto-jmc/img-9035-card-1600.webp 800w, /media/oficial/orig/traslados-aeropuerto-jmc/img-9035-card-1600.webp 1200w",
			"width": 1200,
			"height": 720,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/traslados-aeropuerto-jmc/img-9035-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp",
			"small": "/media/oficial/w400/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp",
			"srcset": "/media/oficial/w400/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp 400w, /media/oficial/w800/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp 800w, /media/oficial/orig/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp 899w",
			"width": 899,
			"height": 1599,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/traslados-aeropuerto-jmc/img-3444-1600.webp",
			"small": "/media/oficial/w400/traslados-aeropuerto-jmc/img-3444-1600.webp",
			"srcset": "/media/oficial/w400/traslados-aeropuerto-jmc/img-3444-1600.webp 400w, /media/oficial/w800/traslados-aeropuerto-jmc/img-3444-1600.webp 800w, /media/oficial/orig/traslados-aeropuerto-jmc/img-3444-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/traslados-aeropuerto-jmc/img-3444-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	equipo: [
		{
			"src": "/media/equipo/1.webp",
			"small": "/media/equipo/1-small.webp",
			"width": 900,
			"height": 1600,
			"source": "IMAGENES: 78150182-2FD5-4570-B03C-9D96F491BC8B.jpg"
		},
		{
			"src": "/media/equipo/2.webp",
			"small": "/media/equipo/2-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_0023.jpg"
		},
		{
			"src": "/media/equipo/3.webp",
			"small": "/media/equipo/3-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_0373.jpg"
		},
		{
			"src": "/media/equipo/4.webp",
			"small": "/media/equipo/4-small.webp",
			"width": 1024,
			"height": 768,
			"source": "IMAGENES: IMG_EQUIPO.jpg"
		}
	],
	historia: [
		{
			"src": "/media/historia/1.webp",
			"small": "/media/historia/1-small.webp",
			"width": 1080,
			"height": 1343,
			"source": "IMAGENES: 102013_Original.JPG"
		},
		{
			"src": "/media/historia/2.webp",
			"small": "/media/historia/2-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_0873-EFFECTS_Original.JPG"
		},
		{
			"src": "/media/historia/3.webp",
			"small": "/media/historia/3-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_20210614_200857_Original.JPG"
		},
		{
			"src": "/media/historia/4.webp",
			"small": "/media/historia/4-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_20221127_150741_Original.JPG"
		},
		{
			"src": "/media/historia/5.webp",
			"small": "/media/historia/5-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_3148_Original.HEIC"
		},
		{
			"src": "/media/historia/6.webp",
			"small": "/media/historia/6-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_5612_Original.HEIC"
		},
		{
			"src": "/media/historia/7.webp",
			"small": "/media/historia/7-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_7070_Original.HEIC"
		},
		{
			"src": "/media/historia/8.webp",
			"small": "/media/historia/8-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_9541_Original.HEIC"
		}
	],
	"jardin-antioquia": [
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-panoramica.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-panoramica.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-panoramica.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-panoramica.webp 800w, /media/oficial/orig/jardin-antioquia/jardin-panoramica.webp 1055w",
			"width": 1055,
			"height": 523,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-panoramica.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-basilica.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-basilica.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-basilica.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-basilica.webp 800w, /media/oficial/w1200/jardin-antioquia/jardin-basilica.webp 1200w, /media/oficial/orig/jardin-antioquia/jardin-basilica.webp 1920w",
			"width": 1920,
			"height": 1440,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-basilica.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-calles.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-calles.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-calles.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-calles.webp 800w, /media/oficial/w1200/jardin-antioquia/jardin-calles.webp 1200w, /media/oficial/orig/jardin-antioquia/jardin-calles.webp 1440w",
			"width": 1440,
			"height": 1920,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-calles.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-mural-aves.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-mural-aves.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-mural-aves.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-mural-aves.webp 800w, /media/oficial/w1200/jardin-antioquia/jardin-mural-aves.webp 1200w, /media/oficial/orig/jardin-antioquia/jardin-mural-aves.webp 1920w",
			"width": 1920,
			"height": 1440,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-mural-aves.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-cafe-origen.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-cafe-origen.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-cafe-origen.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-cafe-origen.webp 800w, /media/oficial/w1200/jardin-antioquia/jardin-cafe-origen.webp 1200w, /media/oficial/orig/jardin-antioquia/jardin-cafe-origen.webp 1440w",
			"width": 1440,
			"height": 1920,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-cafe-origen.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"tour-miradores": [
		{
			"src": "/media/oficial/orig/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp",
			"small": "/media/oficial/w400/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp",
			"srcset": "/media/oficial/w400/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp 400w, /media/oficial/w800/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp 800w, /media/oficial/w1200/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp 1200w, /media/oficial/orig/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp 1600w",
			"width": 1600,
			"height": 960,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-ruanas-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-ruanas-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-ruanas-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-ruanas-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-ruanas-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-ruanas-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-ruanas-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-grupo-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-grupo-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-grupo-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-payaso-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-payaso-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-payaso-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-payaso-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-payaso-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-payaso-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-payaso-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-pareja-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-pareja-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-pareja-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-pareja-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-pareja-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-pareja-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-pareja-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-bandera-mirador-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-bandera-mirador-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-bandera-mirador-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-bandera-mirador-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-bandera-mirador-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1881-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1881-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1881-1600.webp 400w, /media/oficial/w800/_sede/img-1881-1600.webp 800w, /media/oficial/orig/_sede/img-1881-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1881-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1905-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1905-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1905-1600.webp 400w, /media/oficial/w800/_sede/img-1905-1600.webp 800w, /media/oficial/orig/_sede/img-1905-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1905-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1908-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1908-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1908-1600.webp 400w, /media/oficial/w800/_sede/img-1908-1600.webp 800w, /media/oficial/orig/_sede/img-1908-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1908-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1695-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1695-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1695-1600.webp 400w, /media/oficial/w800/_sede/img-1695-1600.webp 800w, /media/oficial/orig/_sede/img-1695-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1695-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-la70-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-la70-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-la70-grupo-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-la70-grupo-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-la70-grupo-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-la70-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-la70-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-restaurante-tematico-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-restaurante-tematico-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-restaurante-tematico-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-restaurante-tematico-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-restaurante-tematico-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-restaurante-tematico-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-restaurante-tematico-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-restaurante-folclorico-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-restaurante-folclorico-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-restaurante-folclorico-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-restaurante-folclorico-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-restaurante-folclorico-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-restaurante-folclorico-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-restaurante-folclorico-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	vehiculos: [
		{
			"src": "/media/vehiculos/1.webp",
			"small": "/media/vehiculos/1-small.webp",
			"width": 1024,
			"height": 563,
			"source": "webp/ (aportado por el usuario)",
			"file": "sedan-ejecutivo.webp",
			"alt": "Sedán ejecutivo",
			"srcset": "/media/vehiculos/1-small.webp 640w, /media/vehiculos/1.webp 1024w"
		},
		{
			"src": "/media/vehiculos/2.webp",
			"small": "/media/vehiculos/2-small.webp",
			"width": 800,
			"height": 400,
			"source": "webp/ (aportado por el usuario)",
			"file": "suv-ejecutiva.webp",
			"alt": "SUV ejecutiva",
			"srcset": "/media/vehiculos/2-small.webp 640w, /media/vehiculos/2.webp 800w"
		},
		{
			"src": "/media/vehiculos/3.webp",
			"small": "/media/vehiculos/3-small.webp",
			"width": 900,
			"height": 519,
			"source": "webp/ (aportado por el usuario)",
			"file": "van-ejecutiva-h1.webp",
			"alt": "Van ejecutiva",
			"srcset": "/media/vehiculos/3-small.webp 640w, /media/vehiculos/3.webp 900w"
		},
		{
			"src": "/media/vehiculos/4.webp",
			"small": "/media/vehiculos/4-small.webp",
			"width": 1024,
			"height": 680,
			"source": "VANMASTER.jpg (TYTCOLOMBIA/) recortado con scripts/recortar_van_master.py; comparado con tnt-colombia-connect/public/img/paginas/vehiculos/van-master.webp (equivalente; se usa el propio por quitar la linea gris del borde inferior)",
			"alt": "Van Master",
			"srcset": "/media/vehiculos/4-small.webp 640w, /media/vehiculos/4.webp 1024w"
		},
		{
			"src": "/media/vehiculos/5.webp",
			"small": "/media/vehiculos/5-small.webp",
			"width": 533,
			"height": 374,
			"source": "webp/ (aportado por el usuario)",
			"file": "van-turistica.webp",
			"alt": "Van turística",
			"srcset": "/media/vehiculos/5-small.webp 400w, /media/vehiculos/5.webp 533w"
		},
		{
			"src": "/media/vehiculos/6.webp",
			"small": "/media/vehiculos/6-small.webp",
			"width": 1024,
			"height": 682,
			"source": "tnt-colombia-connect/public/img/paginas/vehiculos/bus.webp (sitio oficial de la marca, /vehiculos)",
			"file": "bus.webp",
			"alt": "Bus",
			"srcset": "/media/vehiculos/6-small.webp 640w, /media/vehiculos/6.webp 1024w"
		}
	],
	"logo-marca": [{
		"src": "/media/marca/logo/logo-400.png",
		"small": "/media/marca/logo/logo-168.webp",
		"width": 400,
		"height": 400,
		"srcset": "/media/marca/logo/logo-40.webp 40w, /media/marca/logo/logo-44.webp 44w, /media/marca/logo/logo-56.webp 56w, /media/marca/logo/logo-80.webp 80w, /media/marca/logo/logo-88.webp 88w, /media/marca/logo/logo-112.webp 112w, /media/marca/logo/logo-120.webp 120w, /media/marca/logo/logo-132.webp 132w, /media/marca/logo/logo-168.webp 168w, /media/marca/logo/logo-224.webp 224w, /media/marca/logo/logo-240.webp 240w, /media/marca/logo/logo-336.webp 336w, /media/marca/logo/logo-360.webp 360w, /media/marca/logo/logo-400.webp 400w",
		"source": "IMAGENES/logo/logo-tyt-medellin-aportado.png: aportado por el usuario 2026-10-12; maestro vectorial PENDIENTE. Uso tal cual, solo reducido."
	}]
};
//#endregion
//#region src/tours-text.js
var rawTours = [
	[
		"city-tour-comuna-13",
		"City Tour & Comuna 13",
		"Ciudad",
		"Una ciudad que vuelve a dibujarse.",
		"De las plazas a los murales, descubre Medellín a través de las personas y las historias que le dan forma.",
		[
			"La ciudad como punto de partida",
			"El color cuenta una historia",
			"Una mirada que te llevas"
		],
		[
			"Lugares emblemáticos para ubicarte en Medellín y empezar a entender su identidad.",
			"En la Comuna 13, el arte urbano y las escaleras eléctricas acompañan el relato del barrio.",
			"Camina, observa y conversa. Las mejores fotografías también nacen de escuchar."
		],
		"Calzado cómodo, protección para el sol y espacio en la cámara. Consulta las condiciones de caminata si alguien del grupo necesita apoyo.",
		"urban"
	],
	[
		"guatape-piedra-del-penol",
		"Guatapé & Piedra del Peñol",
		"Pueblos",
		"El horizonte tiene otro color.",
		"Agua entre montañas, una piedra que domina el paisaje y un pueblo que narra su vida en cada zócalo.",
		[
			"Mirar desde lo alto",
			"Caminar entre colores",
			"Volver con otra perspectiva"
		],
		[
			"La Piedra del Peñol abre el paisaje del embalse. Consulta el acceso y las opciones de ascenso al organizar tu visita.",
			"Las calles de Guatapé invitan a detenerse frente a los zócalos y a recorrer el pueblo a pie.",
			"El malecón y las vistas del agua completan un día que comienza y termina en Medellín."
		],
		"La subida a la Piedra exige esfuerzo. Cuéntanos las necesidades de movilidad del grupo y confirma entradas, alimentación y actividades antes de viajar.",
		"water"
	],
	[
		"tour-nocturno-medellin",
		"Noche en Medellín",
		"Noche",
		"Cuando el valle enciende sus luces.",
		"La noche cambia las distancias, los colores y la forma de sentir Medellín. Recorre su otra cara con un plan coordinado.",
		[
			"El día se despide",
			"La ciudad se ilumina",
			"Regresar con tranquilidad"
		],
		[
			"El recorrido comienza al bajar la luz: definimos contigo el punto de salida y el ritmo del plan.",
			"Las vistas nocturnas y el ambiente local son el centro de esta experiencia.",
			"La recogida y el regreso se coordinan para que puedas concentrarte en disfrutar."
		],
		"Lleva una capa ligera para los miradores. Confirma horarios y paradas con el equipo; el recorrido no implica entradas a establecimientos.",
		"night"
	],
	[
		"vuelta-a-oriente",
		"Vuelta a Oriente",
		"Pueblos",
		"El camino también es el destino.",
		"Pueblos, plazas y montañas: una salida desde Medellín para mirar Antioquia a un ritmo más tranquilo.",
		[
			"Salir hacia las montañas",
			"La vida alrededor de una plaza",
			"Pequeñas paradas, grandes recuerdos"
		],
		[
			"El paisaje cambia al dejar la ciudad y entrar en el Oriente Antioqueño.",
			"Arquitectura tradicional y encuentros cotidianos le dan carácter a cada pueblo.",
			"Acordamos las paradas según tus intereses y el tiempo disponible, sin convertir el día en una carrera."
		],
		"El clima puede cambiar entre pueblos. Consulta las localidades del itinerario y lleva ropa para una jornada de carretera y caminatas.",
		"earth"
	],
	[
		"tour-del-cafe-medellin",
		"Tour del Café",
		"Naturaleza",
		"Una historia que empieza en la tierra.",
		"Acércate al cultivo y al trabajo detrás de una taza. Un encuentro con la cultura cafetera desde Medellín.",
		[
			"Entre hojas y granos",
			"El oficio detrás del aroma",
			"La pausa de una taza"
		],
		[
			"Recorre el entorno de una finca y conoce cómo empieza el camino del café.",
			"Sigue las etapas del grano y conversa sobre el trabajo que hay detrás del sabor.",
			"La degustación reúne la historia del recorrido en un momento para detenerse y compartir."
		],
		"Usa zapatos para terreno rural. La finca, el alcance de la visita y la degustación se confirman en tu propuesta.",
		"coffee"
	],
	[
		"hacienda-napoles",
		"Hacienda Nápoles",
		"Familia",
		"Un día para volver a sorprenderse.",
		"Una salida al parque temático para compartir naturaleza y actividades en familia, con transporte coordinado desde Medellín.",
		[
			"Poner rumbo a un día distinto",
			"Explorar juntos",
			"El agua también es parte del plan"
		],
		[
			"Organiza con nosotros la salida y el regreso: es una experiencia que necesita tiempo de carretera.",
			"Consulta las áreas de fauna y atracciones disponibles para el día de tu visita.",
			"Las zonas acuáticas ofrecen otra forma de compartir. Acordamos el pasaporte y las actividades antes de confirmar."
		],
		"Lleva cambio de ropa, protección solar y lo necesario para actividades acuáticas. El pasaporte, las entradas y las restricciones deben confirmarse.",
		"wild"
	],
	[
		"salto-del-buey",
		"Salto del Buey",
		"Naturaleza",
		"Sigue el sonido del agua.",
		"Senderos y vegetación conducen a una cascada que cambia la escala de todo lo que la rodea.",
		[
			"Entrar en el verde",
			"Encontrarse con la cascada",
			"Elegir tu nivel de aventura"
		],
		[
			"El recorrido invita a caminar por un entorno natural y a observar el paisaje de cerca.",
			"El agua es el centro de la experiencia: un momento para detenerse y mirar.",
			"Consulta las opciones de canopy y vía ferrata si quieres ampliar el plan. Se confirman por separado."
		],
		"Calzado con agarre y ropa de cambio. Comunica cualquier necesidad física; las actividades de aventura dependen de requisitos y condiciones del operador.",
		"forest"
	],
	[
		"santa-fe-de-antioquia",
		"Santa Fe de Antioquia",
		"Pueblos",
		"Hay lugares que enseñan a ir despacio.",
		"Calles coloniales, plazas y el Puente de Occidente en una escapada para acercarte a la historia de Antioquia.",
		[
			"Un puente entre paisajes",
			"Caminar la memoria",
			"El tiempo de la plaza"
		],
		[
			"El Puente de Occidente conecta el recorrido con el paisaje de la región.",
			"El centro histórico se descubre a pie, mirando fachadas y detalles de su arquitectura.",
			"La plaza y la iglesia principal son puntos de encuentro para cerrar la visita antes de regresar."
		],
		"Lleva ropa fresca y protección solar. Consulta tiempos de caminata, entradas y paradas de alimentación al organizar la salida.",
		"earth"
	],
	[
		"jardin-antioquia",
		"Jardín",
		"Pueblos",
		"El color se vive sin prisa.",
		"Fachadas, conversaciones de plaza y cultura cafetera en uno de los recorridos por Antioquia que parten de Medellín.",
		[
			"Tomar el camino del pueblo",
			"Encontrar color en lo cotidiano",
			"Compartir una pausa"
		],
		[
			"El viaje forma parte de la experiencia. Coordinamos tiempos para aprovechar la visita con calma.",
			"Las calles tradicionales y las fachadas de Jardín invitan a caminar y observar.",
			"La vida alrededor de la plaza y la cultura cafetera dan contexto a cada encuentro."
		],
		"Reserva tiempo suficiente para el viaje. El itinerario se adapta a las condiciones del día y a las necesidades del grupo.",
		"garden"
	],
	[
		"tour-de-compras",
		"Tour de Compras",
		"Ciudad",
		"Tus hallazgos, a tu ritmo.",
		"Organiza una jornada por El Hueco, outlets y tiendas locales con los lugares que realmente te interesan.",
		[
			"Definir qué estás buscando",
			"Recorrer y comparar",
			"Dejar espacio para lo que encuentres"
		],
		[
			"Nos cuentas el tipo de compras y las zonas de interés para orientar la ruta.",
			"Combina opciones de comercio local y outlets con tiempo para decidir.",
			"Acordamos paradas, recogidas y espacio de equipaje según el grupo."
		],
		"Lleva calzado cómodo y comunica el volumen de compras previsto. Las compras y acuerdos con comercios no están incluidos en el transporte.",
		"urban"
	],
	[
		"tour-miradores",
		"Tour Miradores",
		"Noche",
		"Una ciudad. Infinitas perspectivas.",
		"Contempla el valle y las montañas mientras la luz transforma el paisaje de Medellín.",
		[
			"Buscar una nueva perspectiva",
			"Esperar el cambio de luz",
			"Guardar el panorama"
		],
		[
			"La ruta conecta puntos desde los que la ciudad se descubre con otra escala.",
			"El atardecer es una invitación a observar. El clima decide los colores de cada salida.",
			"Prepara la cámara y disfruta de las vistas antes de regresar al punto acordado."
		],
		"Lleva abrigo ligero y batería para la cámara. La visibilidad depende del clima y las paradas se confirman con el equipo.",
		"sunset"
	],
	[
		"traslados-aeropuerto-jmc",
		"Traslados Aeropuerto JMC",
		"Traslados",
		"Aterriza. Nosotros conectamos el camino.",
		"El enlace entre el Aeropuerto José María Córdova y tu alojamiento en Medellín, organizado desde antes de llegar.",
		[
			"Antes de aterrizar",
			"Un encuentro coordinado",
			"El primer trayecto en Medellín"
		],
		[
			"Comparte vuelo, fecha, número de personas y equipaje para preparar la recogida.",
			"El seguimiento del vuelo ayuda a coordinar el encuentro. Confirma las condiciones de espera.",
			"La dirección de llegada y las necesidades del grupo guían la elección del vehículo."
		],
		"Confirma vuelo, equipaje, punto de encuentro y condiciones de espera. El valor y la disponibilidad se acuerdan antes de contratar.",
		"road"
	]
];
//#endregion
//#region src/content.js
var FOCUS = { "traslados-aeropuerto-jmc": "92% 50%" };
var photos = (slug) => {
	const items = media_default[slug] || [];
	if (slug === "equipo") return [items[3], ...items.slice(0, 3)].filter(Boolean);
	if (FOCUS[slug]) return items.map((item, i) => i === 0 ? {
		...item,
		focus: FOCUS[slug]
	} : item);
	return items;
};
var GALLERY_EXCLUDE = { "traslados-aeropuerto-jmc": [0] };
var HERO = { "hacienda-napoles": 1 };
var tours = rawTours.map(([slug, name, category, title, description, moments, stories, advice, mood], index) => {
	const images = photos(slug), skip = GALLERY_EXCLUDE[slug] || [];
	return {
		slug,
		name,
		category,
		title,
		description,
		moments,
		stories,
		advice,
		mood,
		number: String(index + 1).padStart(2, "0"),
		images,
		gallery: images.filter((_, i) => !skip.includes(i)),
		hero: images[HERO[slug] || 0]
	};
});
var values = [
	["Confianza", "Te contamos qué esperar y confirmamos las condiciones antes de salir."],
	["Calidad", "Los detalles importan: desde el primer mensaje hasta el punto de regreso."],
	["Seguridad", "Planeamos teniendo en cuenta las personas, la ruta y las condiciones del recorrido."],
	["Compromiso", "Escuchamos tu propósito y damos seguimiento a lo acordado."],
	["Sencillez", "Información comprensible y una conversación directa para organizarte."],
	["Servicio", "Hospitalidad, respeto y disposición para acompañar a cada viajero."]
];
var FEATURES = {
	ac: ["snowflake", "Aire acondicionado"],
	cuero: ["armchair", "Asientos en cuero"],
	wifi: ["wifi", "WiFi a bordo"],
	usb: ["usb", "Cargadores USB"],
	sonido: ["music", "Sistema de sonido"],
	equipaje: ["luggage", "Espacio para equipaje"],
	reclinables: ["armchair", "Asientos reclinables"],
	panoramicas: ["frame", "Ventanas panorámicas"],
	microfono: ["mic", "Micrófono para el guía"],
	nevera: ["refrigerator", "Nevera"],
	led: ["lightbulb", "Iluminación LED ambiental"],
	entretenimiento: ["monitorPlay", "Sistema de entretenimiento"],
	climaDual: ["thermometer", "Control de clima dual"]
};
var vehicles = [
	[
		"Sedán Ejecutivo",
		"1–3",
		"Ideal para viajes ejecutivos y traslados al aeropuerto. Máximo confort y elegancia para una a tres personas.",
		[
			"ac",
			"cuero",
			"wifi",
			"usb",
			"sonido"
		]
	],
	[
		"SUV Ejecutiva",
		"1–4",
		"Perfecta para grupos pequeños que buscan espacio y comodidad superior, con altura y versatilidad para rutas regionales.",
		[
			"equipaje",
			"cuero",
			"entretenimiento",
			"wifi",
			"climaDual"
		]
	],
	[
		"Van Ejecutiva",
		"1–8",
		"Excelente para grupos familiares o pequeños equipos de trabajo, con asientos individuales y sitio de sobra para el equipaje.",
		[
			"reclinables",
			"equipaje",
			"wifi",
			"ac"
		]
	],
	[
		"Van Master",
		"1–14",
		"Amplia y cómoda para grupos medianos: excursiones, equipos de trabajo y traslados con equipaje. Consulta su disponibilidad para tu recorrido.",
		[
			"reclinables",
			"equipaje",
			"ac",
			"sonido"
		]
	],
	[
		"Van Sprinter",
		"1–17",
		"Diseñada especialmente para tours grupales con máxima visibilidad. Consulta su disponibilidad para el recorrido que tienes en mente.",
		[
			"reclinables",
			"sonido",
			"panoramicas",
			"equipaje",
			"microfono"
		]
	],
	[
		"Buses",
		"25–40",
		"Ideal para grupos grandes, eventos corporativos y excursiones extendidas. Disponibles en configuraciones de 25, 35 y 40 pasajeros.",
		[
			"reclinables",
			"entretenimiento",
			"nevera",
			"led"
		]
	]
].map(([name, capacity, use, features], i) => ({
	name,
	capacity,
	use,
	features: features.map((k) => ({
		key: k,
		icon: FEATURES[k][0],
		label: FEATURES[k][1]
	})),
	image: photos("vehiculos")[i]
}));
var articles = [
	{
		slug: "preparar-tu-recorrido",
		title: "El buen viaje empieza con cinco datos.",
		tag: "Planeación",
		image: tours[0].images[0],
		intro: "Organizar un recorrido es más sencillo cuando la conversación empieza por lo importante.",
		sections: [
			["La fecha y el punto de partida", "Comparte el día y la dirección desde la que quieres salir. Si llegas en avión, incluye tu número de vuelo cuando hables con el equipo."],
			["Quiénes van contigo", "La cantidad de personas, el equipaje y las necesidades de movilidad ayudan a proponer un vehículo y un ritmo adecuados."],
			["Lo que esperas del día", "Cuéntanos qué te interesa y cuánto tiempo tienes. Antes de confirmar, revisa las paradas, los servicios incluidos, el valor y las condiciones de cambio."]
		]
	},
	{
		slug: "elegir-tu-experiencia",
		title: "¿Ciudad, pueblos o naturaleza?",
		tag: "Inspiración",
		image: tours[1].images[0],
		intro: "No hay una única forma de descubrir Medellín y los recorridos que parten desde aquí. Elige según lo que quieras sentir.",
		sections: [
			["Ciudad para escuchar historias", "El City Tour y la Comuna 13 acercan arte y vida urbana. El recorrido de compras pone el acento en el comercio local."],
			["Pueblos para cambiar de ritmo", "Guatapé, Santa Fe, Jardín y Oriente ofrecen maneras diferentes de acercarse al territorio. Consulta tiempos de traslado antes de llenar tu agenda."],
			["Naturaleza para mirar de cerca", "El café y el Salto del Buey proponen experiencias al aire libre distintas. Describe tus preferencias y condición para que el equipo oriente el plan."]
		]
	},
	{
		slug: "viajar-en-grupo",
		title: "Viajar juntos sin improvisar cada parada.",
		tag: "En grupo",
		image: photos("equipo")[0],
		intro: "Una familia, una agencia o un equipo de trabajo: cada grupo tiene su propio ritmo.",
		sections: [
			["Acordar un punto de encuentro", "Una dirección precisa y una persona de contacto simplifican el comienzo. Confirma si habrá recogidas adicionales."],
			["Pensar en el equipaje", "El número de asientos no cuenta toda la historia. Comparte cuántas maletas llevan y cualquier requerimiento especial."],
			["Dejar espacio para disfrutar", "Revisa con el equipo las pausas y prioridades. Un itinerario claro también debe considerar el tiempo que cada persona necesita."]
		]
	}
];
var paths = [
	"/",
	"/experiencias",
	"/servicios",
	"/vehiculos",
	"/nosotros",
	"/blog",
	"/contacto",
	"/cotizar",
	"/calificaciones",
	"/privacidad",
	...tours.map((t) => `/experiencias/${t.slug}`),
	...articles.map((a) => `/blog/${a.slug}`)
].flatMap((path) => [path, "/en" + (path === "/" ? "/" : path)]);
function metaFor(path) {
	setLanguage(/^\/en(?:\/|$)/.test(path) ? "en" : "es");
	path = unprefix(path);
	const tour = tours.find((t) => path === `/experiencias/${t.slug}`), article = articles.find((a) => path === `/blog/${a.slug}`);
	if (tour) return [t(tour.name), t(tour.description)];
	if (article) return [t(article.title), t(article.intro)];
	return (staticMeta[path] || NOT_FOUND).map(t);
}
async function render(url) {
	await preloadAllRoutes();
	const en = /^\/en(?:\/|$)/.test(url);
	setLanguage(en ? "en" : "es");
	return renderToString(/* @__PURE__ */ jsx$1(StaticRouter, {
		basename: en ? "/en" : "/",
		location: url,
		children: /* @__PURE__ */ jsx$1(Website, {})
	}));
}
//#endregion
export { SocialIcon as A, useMedia as C, NOT_FOUND as D, textoFase as E, company as F, whatsapp as I, language as L, Fragment as M, jsx$1 as N, usePageMeta as O, jsxs$1 as P, t as R, useLightMotion as S, inicioTextos as T, EditorialMotion as _, vehicles as a, Trust as b, Eyebrow as c, QuoteSection as d, Rail as f, QuoteCopy as g, Arrow as h, values as i, Socials as j, Icon as k, PageTitle as l, GoogleBadgeStatic as m, metaFor, photos as n, rawTours as o, TourCard as p, paths, tours as r, render, Button as s, articles as t, Picture as u, Manifesto as v, CHAPTERS as w, useFlipGrid as x, Marquee as y };
