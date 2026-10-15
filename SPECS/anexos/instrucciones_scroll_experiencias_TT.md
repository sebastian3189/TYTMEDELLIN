# ESPECIFICACIÓN PARA DESARROLLO WEB — SCROLL DE ITINERARIOS T&T MEDELLÍN

## OBJETIVO GENERAL

Actualizar la sección **«La experiencia»** de **cada subpágina individual de experiencias de Transporte y Turismo Medellín** para que presente **una parada del itinerario por cada paso del scroll**, con **una fotografía real y específica de esa parada**, un **título atractivo**, una **descripción clara de lo que se visita y hace**, y un **indicador numérico de avance**.

**IMPORTANTE: son instrucciones para CADA subpágina individual, NO para una única sección genérica compartida con textos iguales.** Cada tour debe cargar exclusivamente las paradas de su propio itinerario. No mezclar fotografías, rutas ni contenidos entre tours.

### Tours a implementar

Conservar la numeración de la lista de experiencias. **Incluir:**

1. City Tour Medellín + Comuna 13
2. Guatapé + Piedra del Peñol
3. Medellín de Noche
4. Tour de Miradores Medellín
5. Tour del Café — Experiencia Cafetera
6. Vuelta al Oriente Antioqueño
7. Santa Fe de Antioquia + Puente de Occidente
8. Hacienda Nápoles — Parque Temático
10. Tour de Compras Medellín
14. Experiencias adicionales desde Medellín (solo si existen como subpáginas individuales, una por actividad)

**Excluir completamente los tours n.º 9, 11, 12 y 13:** no añadirles esta secuencia de paradas ni construir nuevas subpáginas por este encargo.

> **Diferenciar itinerarios vigentes y propuestos:** las rutas 6 y 7, así como varias del apartado 14, son propuestas editoriales pendientes de validación operativa. No anunciar visitas sugeridas como incluidas/garantizadas hasta que el equipo de T&T las apruebe. Lo mismo aplica a paradas adicionales no confirmadas en el recorrido original de otros tours.

---

## 1. REFERENCIA VISUAL Y COMPORTAMIENTO DEL SCROLL

Seguir la **captura de pantalla entregada** como referencia exacta de estilo y estructura. Aparece una imagen grande a la izquierda y un panel editorial a la derecha con: categoría, número grande «01», titular, párrafo, círculos de avance y texto «Desliza para seguir la historia ↓».

### Para cada subpágina

- Mantener la navegación superior existente: **La experiencia | Fotografías | Antes de viajar | Cotizar**.
- Dentro de **«La experiencia»**, desarrollar una **historia vertical por paradas** mediante *scroll-driven storytelling*. Cada paso del scroll muestra **UNA foto principal de ESA parada** y su información correspondiente.
- **Cada parada es una escena independiente**. Ejemplo: en Guatapé, Piedra del Peñol muestra foto de la Piedra; Réplica del Viejo Peñol muestra foto de la réplica; Calle de los Recuerdos muestra foto real de la calle. **No usar la misma fotografía para todas las escenas.**
- Mantener estilo T&T: fondo oscuro elegante, tipografía legible, fotografías reales de alta calidad, elementos de marca y acentos naranjas sutiles.
- **Escritorio:** fotografía de gran formato a la izquierda; número, título y descripción a la derecha. Puede utilizarse `position: sticky` y transición suave por sección. La fotografía y los textos cambian sincronizados con la escena activa.
- **Móvil:** fotografía arriba, número + titular + descripción abajo; scroll natural sin bloquear el gesto, sin texto sobrepuesto que dificulte leer.
- Numerar dinámicamente **01, 02, 03… 0N**. Los círculos de navegación deben tener **tantos pasos como paradas reales de la subpágina**, no siempre solo «01 02 03» como en la captura. Si hay muchas paradas, utilizar un indicador compacto «03 / 07» más mini progreso, en lugar de desbordar los círculos.
- Resaltar el paso activo y permitir navegar entre escenas sin romper el scroll; añadir barra de progreso discreta.
- Fotografía específica por escena, texto accesible `alt` y preferencia por fotos REALES de T&T. Si falta una foto del lugar correspondiente, dejarla pendiente de carga en CMS: **no sustituirla por una imagen de otro punto** ni usar imágenes engañosas.
- Cada bloque debe mostrar: **nombre del punto, qué se conoce, qué actividad se realiza y si algo es opcional/de pago adicional**. El título corto cuenta una historia; el párrafo no debe exagerar ni prometer ingresos o servicios no confirmados.
- Conservar las secciones **«Fotografías»**, **«Antes de viajar»** y **«Cotizar»** ya existentes; no duplicar sus funciones. «Cotizar» debe seguir activo desde todas las subpáginas.
- Optimizar imágenes (`WebP`/`AVIF`, compresión, `srcset`, carga diferida de escenas futuras), carga ágil, accesibilidad de teclado y opción `prefers-reduced-motion`.
- La información debe poder editarse desde el CMS: `tour`, `orden`, `titulo_corto`, `ubicacion`, `descripcion`, `imagen`, `alt`, `estado_parada` (confirmada/sugerida/opcional), `nota_ingreso` y `duracion_aproximada` (solo cuando esté validada).

---

# CONTENIDO ESPECÍFICO POR SUBPÁGINA

## SUBPÁGINA 01 — CITY TOUR MEDELLÍN + COMUNA 13

**Slug sugerido:** `/experiencias/city-tour-medellin-comuna-13`

**Cada número es UN scroll y UNA fotografía diferente:**

### 01 — Recordar para transformar | Parque Memorial Inflexión
- **Foto obligatoria:** Parque Memorial Inflexión, jardines y monumento/memorial.
- **Texto visible:** «Comenzamos con la memoria de Medellín. En el Parque Memorial Inflexión conocemos una parte fundamental de su historia y cómo la ciudad ha trabajado para transformar su pasado.»
- **En la visita:** espacio de memoria, explicación histórica, fotografías respetuosas y reflexión.

### 02 — El corazón administrativo | La Alpujarra
- **Foto:** sector de La Alpujarra o Plaza de la Libertad.
- **Texto visible:** «Recorremos el centro administrativo de Medellín, donde se encuentran importantes edificios públicos y espacios representativos de la vida de la ciudad.»
- **En la visita:** entorno de la Gobernación, Alcaldía y Plaza de la Libertad; fotografías exteriores.

### 03 — Una ciudad que se ilumina | Parque de las Luces
- **Foto:** columnas del Parque de las Luces / Plaza Cisneros.
- **Texto visible:** «Descubrimos la Plaza Cisneros y sus famosas columnas luminosas, símbolo de la renovación de espacios urbanos en Medellín.»
- **En la visita:** plaza, columnas y contexto de transformación del centro.

### 04 — Arte en el centro | Plaza Botero *(parada por confirmar en ruta operativa)*
- **Foto:** esculturas de Fernando Botero y Palacio de la Cultura.
- **Texto visible:** «Entre esculturas monumentales y arquitectura emblemática, conocemos una de las plazas más reconocidas del centro de Medellín.»
- **En la visita:** esculturas, exterior del Palacio de la Cultura y fotografías. Entrada a museos no incluida salvo confirmación.

### 05 — Tradición paisa | Pueblito Paisa
- **Foto:** plaza y fachadas del Pueblito Paisa / vista panorámica.
- **Texto visible:** «Subimos al Cerro Nutibara para descubrir una réplica de un pueblo antioqueño, sus calles tradicionales y una hermosa panorámica de Medellín.»
- **En la visita:** iglesia, plaza, fachadas, mirador y artesanías.

### 06 — Medellín desde el aire | Metro y Metrocable
- **Foto:** cabinas del Metrocable con vista de la ciudad.
- **Texto visible:** «Vivimos de cerca el sistema de transporte que conecta diferentes sectores de Medellín y disfrutamos de una perspectiva diferente de sus barrios y montañas.»
- **En la visita:** trayecto de Metro/Metrocable según línea y accesos acordados. Precisar en la cotización si los pasajes están incluidos.

### 07 — Colores que cuentan historias | Comuna 13
- **Foto:** mural auténtico de Comuna 13.
- **Texto visible:** «Nos adentramos en una comunidad que convirtió el arte urbano en una poderosa expresión de identidad, creatividad y transformación.»
- **En la visita:** murales y relatos de la comuna.

### 08 — Subir para descubrir | Escaleras eléctricas de Comuna 13
- **Foto:** escaleras eléctricas de la Comuna 13.
- **Texto visible:** «Recorremos las famosas escaleras eléctricas al aire libre, uno de los referentes de accesibilidad y renovación urbana de la zona.»
- **En la visita:** escaleras, paisajes del barrio y fotografías.

### 09 — Talento de barrio | Arte y miradores de Comuna 13
- **Foto:** artista local, galería o mirador propio de Comuna 13.
- **Texto visible:** «Terminamos con el talento local: música, expresiones artísticas, emprendimientos y vistas que hacen única la experiencia en la Comuna 13.»
- **En la visita:** galerías, emprendimientos y posibles presentaciones según disponibilidad. No garantizar un espectáculo específico.

---

## SUBPÁGINA 02 — GUATAPÉ + PIEDRA DEL PEÑOL

**Slug sugerido:** `/experiencias/guatape-piedra-del-penol`

### 01 — Nuestro primer encuentro con el campo | Alto del Chocho
- **Foto:** animales de granja y ambiente campestre del Alto del Chocho.
- **Texto visible:** «Hacemos una parada para conectar con el paisaje rural del Oriente antioqueño, conocer animales de granja y descubrir sabores típicos de la región.»
- **En la visita:** animales, fotografías y alimentos opcionales. Confirmar condiciones de acceso.

### 02 — Un pueblo lleno de memoria | Réplica del Viejo Peñol
- **Foto:** iglesia y plaza de la réplica.
- **Texto visible:** «Conocemos la historia del antiguo Peñol a través de una réplica que conserva el espíritu del pueblo anterior a la construcción del embalse.»
- **En la visita:** plaza, fachadas, iglesia y explicación histórica.

### 03 — Mirar desde lo alto | Piedra del Peñol
- **Foto:** Piedra del Peñol completa desde su base, como en la referencia compartida.
- **Texto visible:** «La imponente Piedra del Peñol nos recibe con uno de los paisajes más reconocidos de Antioquia. Quienes lo deseen podrán realizar el ascenso para contemplar el embalse desde arriba.»
- **En la visita:** base, fotos y ascenso opcional. **El ingreso/subida se paga aparte si no figura incluido.**

### 04 — Postales de colores | Calle de los Recuerdos
- **Foto:** fachadas con zócalos y Calle de los Recuerdos, Guatapé.
- **Texto visible:** «Caminamos por las calles llenas de color que narran costumbres, tradiciones y momentos de la vida del municipio.»
- **En la visita:** zócalos, arquitectura local, fotos.

### 05 — Bajo un cielo de sombrillas | Calle de las Sombrillas
- **Foto:** calle de sombrillas de Guatapé.
- **Texto visible:** «Una de las paradas más fotogénicas del recorrido: colores, detalles artesanales y rincones que invitan a llevarse un recuerdo de Guatapé.»
- **En la visita:** recorrido corto y fotografías.

### 06 — El corazón de Guatapé | Parque Principal y Parroquia
- **Foto:** iglesia Nuestra Señora del Carmen y plaza principal.
- **Texto visible:** «Llegamos al corazón del municipio, donde la vida local, la arquitectura y la tradición se reúnen alrededor de su parque principal.»
- **En la visita:** plaza, iglesia (ingreso según apertura), comercio local.

### 07 — La esencia de los zócalos | Plazoleta de los Zócalos
- **Foto:** escalones y plazoleta de los Zócalos.
- **Texto visible:** «Los zócalos cuentan historias en cada fachada. En esta plazoleta descubrimos por qué el color es parte de la identidad de Guatapé.»
- **En la visita:** plazoleta, arte, fotos y artesanías.

### 08 — Frente al agua | Malecón de Guatapé
- **Foto:** malecón y embalse.
- **Texto visible:** «Cerramos el recorrido urbano frente al embalse, disfrutando del paisaje, el aire fresco y el ambiente turístico del malecón.»
- **En la visita:** paseo, paisaje y fotografías.

### 09 — Navegar el paisaje | Paseo en lancha *(opcional)*
- **Foto:** embarcación real en el embalse de Guatapé.
- **Texto visible:** «Para quienes desean añadir otra perspectiva, existe la opción de navegar el embalse y admirar desde el agua sus islas y montañas.»
- **En la visita:** paseo en embarcación **solo si se contrata**. No mostrar como actividad incluida por defecto.

---

## SUBPÁGINA 03 — MEDELLÍN DE NOCHE

**Slug sugerido:** `/experiencias/medellin-de-noche`

### 01 — Medellín se enciende | Mirador Octava Maravilla
- **Foto:** vista nocturna real desde Octava Maravilla.
- **Texto visible:** «Comenzamos contemplando las luces de Medellín desde un mirador que revela la belleza del Valle de Aburrá al anochecer.»
- **En la visita:** panorámica, fotografías; consumo gastronómico opcional.

### 02 — La energía de Provenza | Provenza
- **Foto:** calle de Provenza iluminada por la noche.
- **Texto visible:** «Descubrimos el ambiente gastronómico y cultural de Provenza, entre restaurantes, luces y espacios llenos de vida.»
- **En la visita:** caminata y tiempo libre; consumos no incluidos salvo acuerdo.

### 03 — Un clásico de El Poblado | Parque Lleras
- **Foto:** calles y ambiente nocturno del entorno del Parque Lleras.
- **Texto visible:** «Continuamos por uno de los sectores más conocidos de El Poblado para apreciar el movimiento y el ambiente nocturno de Medellín.»
- **En la visita:** caminata por áreas pertinentes, fotografías; adaptar a familias y preferencias.

### 04 — Sabores para cerrar la noche | Parada gastronómica *(según elección)*
- **Foto:** establecimiento elegido previamente, no una imagen genérica de un lugar distinto.
- **Texto visible:** «Terminamos con tiempo para disfrutar la gastronomía local o el espacio de entretenimiento que mejor se ajuste a tu estilo de viaje.»
- **En la visita:** cena o consumo opcional y por cuenta del cliente salvo inclusión expresa.

---

## SUBPÁGINA 04 — TOUR DE MIRADORES MEDELLÍN

**Slug sugerido:** `/experiencias/miradores-medellin`

### 01 — La ciudad a nuestros pies | Mirador La Palma
- **Foto:** vista real del Mirador La Palma.
- **Texto visible:** «Desde La Palma apreciamos Medellín desde otra perspectiva: barrios, montañas y la inmensidad del valle.»
- **En la visita:** vistas, fotografías y parada contemplativa.

### 02 — Montañas y horizonte | Cerro El Picacho
- **Foto:** panorámica auténtica desde Cerro El Picacho.
- **Texto visible:** «Seguimos hacia un punto privilegiado para observar la geografía del Valle de Aburrá y disfrutar de una de las vistas más representativas de la ciudad.»
- **En la visita:** mirador y fotografías, sujeto a acceso y condiciones de seguridad.

### 03 — Sabores con vista | Parada gastronómica *(opcional)*
- **Foto:** restaurante o establecimiento exacto que se confirme.
- **Texto visible:** «Si lo deseas, complementamos el recorrido con una parada para probar sabores locales mientras disfrutamos del ambiente de la montaña.»
- **En la visita:** comida y bebidas adicionales, no incluidas por defecto.

---

## SUBPÁGINA 05 — TOUR DEL CAFÉ — EXPERIENCIA CAFETERA

**Slug sugerido:** `/experiencias/tour-del-cafe-medellin`

**Nota:** cada escena corresponde a una fase de la visita **dentro de la finca cafetera seleccionada**; no son necesariamente desplazamientos a municipios distintos.

### 01 — Bienvenidos a la finca | Finca cafetera
- **Foto:** acceso o paisaje real de la finca operadora.
- **Texto visible:** «Llegamos a una finca donde la tradición cafetera se vive de cerca, rodeados de naturaleza y del aroma del café colombiano.»
- **En la visita:** bienvenida e introducción.

### 02 — Donde nace el café | Cultivos
- **Foto:** cafetos y frutos rojos de café.
- **Texto visible:** «Caminamos entre cultivos para descubrir cómo crece el café y qué hace especiales a los granos de esta región.»
- **En la visita:** cultivo y explicación del proceso agrícola.

### 03 — Manos a la cosecha | Recolección
- **Foto:** recolección manual en la finca real.
- **Texto visible:** «Conocemos el trabajo detrás de cada cosecha y, cuando las condiciones lo permiten, participamos en una demostración de recolección.»
- **En la visita:** demostración o práctica solo si está disponible.

### 04 — Del fruto al grano | Beneficio y secado
- **Foto:** despulpadora, beneficiadero o área de secado de la finca.
- **Texto visible:** «Descubrimos cómo el fruto se transforma y cómo cada etapa de beneficio y secado influye en la calidad de la bebida.»
- **En la visita:** despulpado, lavado y secado según operación de la finca.

### 05 — El aroma de la transformación | Tostión y molienda
- **Foto:** tostadora o molinos de café de la finca.
- **Texto visible:** «Exploramos la tostión y la molienda, dos procesos que ayudan a construir los aromas y sabores del café que disfrutamos.»
- **En la visita:** demostración o explicación según instalaciones.

### 06 — El momento de saborear | Cata de café
- **Foto:** tazas y mesa de degustación real.
- **Texto visible:** «Terminamos con una degustación para identificar aromas, sabores y matices del café colombiano.»
- **En la visita:** cata según modalidad contratada.

### 07 — Llévate un pedacito de la finca | Productos cafeteros
- **Foto:** tienda o empaques reales de café del operador.
- **Texto visible:** «Antes de regresar, puedes conocer los productos de la finca y elegir un recuerdo especial para llevar a casa.»
- **En la visita:** compras voluntarias, no incluidas.

---

## SUBPÁGINA 06 — VUELTA AL ORIENTE ANTIOQUEÑO

**Slug sugerido:** `/experiencias/vuelta-oriente-antioqueno`

**ESTADO: RUTA SUGERIDA; REQUIERE APROBACIÓN OPERATIVA ANTES DE PUBLICAR COMO ITINERARIO DEFINITIVO.**

### 01 — Tradición entre montañas | El Retiro
- **Foto:** parque principal y arquitectura de El Retiro.
- **Texto visible:** «Descubrimos un municipio conocido por sus calles tradicionales, su ambiente tranquilo y su herencia artesanal.»
- **En la visita:** parque, iglesia y espacios artesanales sujetos a apertura.

### 02 — Aire del Oriente | La Ceja
- **Foto:** parque principal de La Ceja.
- **Texto visible:** «Seguimos por el Oriente antioqueño para apreciar sus plazas, tradiciones y la vida cotidiana de sus pueblos.»
- **En la visita:** plaza principal, entorno local y fotografías.

### 03 — Historia que permanece | Rionegro
- **Foto:** centro histórico o Catedral de San Nicolás de Rionegro.
- **Texto visible:** «Caminamos por un municipio lleno de historia y arquitectura que conserva una parte importante del pasado regional.»
- **En la visita:** centro histórico, parque y exterior de la catedral.

### 04 — Una dulce tradición | San Antonio de Pereira
- **Foto:** plaza principal o vitrina real de postres en San Antonio.
- **Texto visible:** «Cerramos entre calles tradicionales y la famosa cultura de postres de San Antonio de Pereira.»
- **En la visita:** plaza, iglesia, postrerías; consumo adicional.

### 05 — Paisajes para recordar | Parada panorámica *(sujeta a selección)*
- **Foto:** punto panorámico real del trayecto aprobado.
- **Texto visible:** «Aprovechamos el recorrido para detenernos, cuando sea posible, y admirar los paisajes del Oriente antioqueño.»
- **En la visita:** fotografías en parada segura y autorizada; no asegurar un lugar hasta definirlo.

---

## SUBPÁGINA 07 — SANTA FE DE ANTIOQUIA + PUENTE DE OCCIDENTE

**Slug sugerido:** `/experiencias/santa-fe-antioquia-puente-occidente`

**ESTADO: RUTA SUGERIDA; VALIDAR CON OPERACIONES.**

### 01 — Un viaje al pasado | Calles coloniales
- **Foto:** calle empedrada y casas blancas con balcones.
- **Texto visible:** «Las calles de Santa Fe de Antioquia nos transportan a otra época, entre fachadas coloniales y rincones llenos de historia.»
- **En la visita:** recorrido peatonal, fotografías y arquitectura.

### 02 — El corazón de la ciudad colonial | Plaza Mayor
- **Foto:** Parque Principal / Plaza Mayor Simón Bolívar.
- **Texto visible:** «Conocemos la plaza principal, donde se encuentran la vida cotidiana, los sabores y las tradiciones del municipio.»
- **En la visita:** parque, comercio y gastronomía.

### 03 — Historia en cada detalle | Catedral de la Inmaculada Concepción
- **Foto:** fachada de la Catedral Basílica.
- **Texto visible:** «Visitamos el entorno de uno de los templos más emblemáticos de Santa Fe de Antioquia y descubrimos su legado arquitectónico.»
- **En la visita:** fachada e interior cuando esté abierto.

### 04 — Patrimonio que se conserva | Iglesias y arquitectura histórica
- **Foto:** iglesia o fachada histórica específica validada en la ruta.
- **Texto visible:** «Continuamos por espacios donde se conservan detalles religiosos y arquitectónicos que cuentan la historia de esta antigua capital antioqueña.»
- **En la visita:** exteriores y visitas interiores si están autorizadas.

### 05 — Un puente con historia | Puente de Occidente
- **Foto:** vista real completa del puente sobre el río Cauca.
- **Texto visible:** «Admiramos el histórico Puente de Occidente, una obra de ingeniería suspendida sobre el río Cauca y uno de los símbolos de la región.»
- **En la visita:** visita, fotografías y explicación patrimonial, según acceso permitido.

### 06 — Sabores de la región | Gastronomía local *(opcional)*
- **Foto:** comida o dulce típico de un local real de Santa Fe.
- **Texto visible:** «Terminamos con la posibilidad de probar sabores tradicionales y disfrutar del ambiente cálido de Santa Fe de Antioquia.»
- **En la visita:** alimentos y bebidas según cotización; no incluidos por defecto.

---

## SUBPÁGINA 08 — HACIENDA NÁPOLES — PARQUE TEMÁTICO

**Slug sugerido:** `/experiencias/hacienda-napoles`

**IMPORTANTE:** los lugares son **zonas/atracciones del parque**, no prometer que se visitan todas en un único día. Su acceso depende del pasaporte, apertura y tiempo disponible. Publicar la secuencia como **«Lo que puedes vivir»** hasta confirmar el recorrido exacto.

### 01 — Una aventura prehistórica | Aventura Jurásica
- **Foto:** dinosaurios de Aventura Jurásica en el parque.
- **Texto visible:** «Comenzamos descubriendo figuras de dinosaurios y espacios temáticos que despiertan la imaginación de grandes y pequeños.»
- **En la visita:** recorrido por atracciones jurásicas autorizadas.

### 02 — La emoción de la fauna | Sabana Africana
- **Foto:** animales observables desde las zonas autorizadas del parque.
- **Texto visible:** «Conocemos espacios dedicados a la fauna donde podemos observar diferentes especies dentro de las condiciones del parque.»
- **En la visita:** observación responsable; no asegurar avistamiento concreto ni contacto con animales.

### 03 — Conexión con la naturaleza | Santuario de fauna
- **Foto:** zona real de aves, reptiles u otra área natural abierta al público.
- **Texto visible:** «Exploramos áreas dedicadas al conocimiento y la observación de especies animales, respetando su entorno y las indicaciones del parque.»
- **En la visita:** zonas de fauna abiertas y habilitadas.

### 04 — Conocer también es viajar | Espacios históricos
- **Foto:** fachada de un museo o espacio histórico REAL de Hacienda Nápoles.
- **Texto visible:** «La visita también ofrece lugares para conocer el contexto histórico de este sitio y cómo se transformó con el paso del tiempo.»
- **En la visita:** museos abiertos y accesibles según pasaporte.

### 05 — Un momento para refrescarse | Atracciones acuáticas *(según pasaporte)*
- **Foto:** piscinas o toboganes REALES del parque.
- **Texto visible:** «Cuando el pasaporte lo permite, disfrutamos de espacios acuáticos para añadir diversión y descanso a la jornada.»
- **En la visita:** atracciones acuáticas sujetas a pasaporte, horarios y seguridad.

### 06 — Una pausa para recargar energías | Zona gastronómica
- **Foto:** restaurante real dentro del parque o zona de descanso.
- **Texto visible:** «Hacemos una pausa para almorzar y continuar disfrutando del día con comodidad.»
- **En la visita:** comida solo si está incluida en el servicio contratado; si no, pago adicional.

---

## SUBPÁGINA 10 — TOUR DE COMPRAS MEDELLÍN

**Slug sugerido:** `/experiencias/tour-compras-medellin`

**IMPORTANTE:** esta subpágina debe presentar **posibles destinos personalizables, NO un itinerario de visita obligatoria**. En cuatro horas no es viable garantizar todas las paradas. Titular sugerido para la sección: **«Tú eliges dónde comprar»**.

### 01 — Compras a tu ritmo | El Hueco
- **Foto:** sector comercial real de El Hueco, Medellín.
- **Texto visible:** «Explora uno de los sectores comerciales más populares de Medellín, con opciones de ropa, calzado, accesorios y productos para diferentes presupuestos.»
- **En la visita:** tiendas según interés del cliente.

### 02 — Encuentra lo que buscas | Sector comercial del centro
- **Foto:** calle o pasaje comercial específico seleccionado y confirmado.
- **Texto visible:** «Podemos adaptar la ruta para visitar comercios especializados del centro de Medellín de acuerdo con tu lista de compras.»
- **En la visita:** establecimientos elegidos previamente.

### 03 — Variedad en un solo lugar | Centro Comercial Santafé
- **Foto:** fachada/interior real del Centro Comercial Santafé Medellín.
- **Texto visible:** «Si prefieres la comodidad de un centro comercial, Santafé reúne numerosas tiendas, servicios y opciones gastronómicas.»
- **En la visita:** tiendas a elección; compras y consumos propios.

### 04 — Compras y estilo | Centro Comercial El Tesoro
- **Foto:** vista real del Centro Comercial El Tesoro.
- **Texto visible:** «Una alternativa para disfrutar de tiendas, restaurantes y una experiencia de compras en un entorno moderno.»
- **En la visita:** tiendas según preferencias.

### 05 — Una ruta hecha para ti | Tiendas especializadas *(personalizable)*
- **Foto:** tienda exacta previamente seleccionada; no usar imagen de un comercio no visitado.
- **Texto visible:** «También podemos diseñar el recorrido alrededor de tus intereses: moda, textiles, accesorios, artesanías o regalos.»
- **En la visita:** paradas acordadas antes del servicio.

---

## SUBPÁGINAS 14 — EXPERIENCIAS ADICIONALES DESDE MEDELLÍN

**No crear una sola subpágina que mezcle todas las actividades.** Si cada actividad cuenta con una ficha/subpágina propia, su scroll debe mostrar sus **etapas reales**. Solo implementar las que existan como productos publicados y estén confirmadas con operadores.

### 14A. Salto del Buey — Naturaleza y cascadas *(sujeto al operador)*
1. **Llegar a la montaña** — **Foto:** acceso/paisaje del operador. **Texto:** «Comenzamos entre montañas y naturaleza para conocer el entorno de esta aventura.»
2. **Caminar entre paisajes** — **Foto:** sendero verdadero. **Texto:** «Recorremos los senderos habilitados y descubrimos los paisajes que rodean la cascada.»
3. **Contemplar la cascada** — **Foto:** Salto del Buey desde un punto autorizado. **Texto:** «Disfrutamos de la imponencia de la cascada y de uno de los grandes escenarios naturales de la región.»
4. **Aventura opcional** — **Foto:** actividad específica del operador. **Texto:** «Según el plan contratado, es posible añadir actividades de aventura con acompañamiento especializado.»

### 14B. Parapente *(sujeto al operador)*
1. **Llegamos al punto de vuelo** — **Foto:** zona de despegue real. **Texto:** «Nos preparamos para conocer el paisaje desde una perspectiva diferente.»
2. **Antes de volar** — **Foto:** equipo e instructor reales. **Texto:** «Recibimos instrucciones y verificaciones de seguridad del operador certificado.»
3. **La experiencia de volar** — **Foto:** vuelo tándem real. **Texto:** «Disfrutamos de un vuelo acompañado por un piloto habilitado, sujeto al clima y a la operación.»
4. **Un recuerdo desde el cielo** — **Foto:** fotografías/videos reales del servicio. **Texto:** «Podemos conservar imágenes de la aventura si el paquete contratado las incluye.»

### 14C. Cuatrimotos y buggies *(sujeto al operador)*
1. **Encuentro en la pista** — **Foto:** instalaciones verdaderas del operador. **Texto:** «Llegamos a la zona de aventura donde comenzará el recorrido.»
2. **Preparados para la ruta** — **Foto:** equipos y charla de seguridad. **Texto:** «Recibimos las indicaciones y el equipo exigido por el operador.»
3. **Aventura sobre ruedas** — **Foto:** cuatrimoto/buggy en circuito habilitado. **Texto:** «Recorremos rutas autorizadas para disfrutar de una experiencia llena de emoción.»
4. **La foto final** — **Foto:** parada o mirador real del recorrido. **Texto:** «Cerramos con fotografías y recuerdos de la experiencia, según la ruta contratada.»

### 14D. Sobrevuelo en helicóptero *(sujeto al operador)*
1. **Rumbo al helipuerto** — **Foto:** helipuerto o helicóptero real del operador. **Texto:** «Llegamos al punto de salida para comenzar una experiencia aérea inolvidable.»
2. **Preparación y seguridad** — **Foto:** zona de embarque real. **Texto:** «Recibimos instrucciones del personal antes del despegue.»
3. **Medellín desde el cielo** — **Foto:** vista aérea real de la ruta ofrecida. **Texto:** «Disfrutamos de las vistas panorámicas durante el recorrido aéreo contratado.»
4. **Regreso a tierra** — **Foto:** aterrizaje o imagen auténtica del helipuerto. **Texto:** «Terminamos la experiencia y continuamos con el traslado acordado.»

### 14E. Museo El Castillo *(si tiene subpágina)*
1. **Un castillo en Medellín** — **Foto:** fachada real. **Texto:** «Conocemos la arquitectura del Museo El Castillo y su entorno.»
2. **Jardines que inspiran** — **Foto:** jardines reales. **Texto:** «Caminamos por los jardines y espacios verdes abiertos a visitantes.»
3. **Arte e historia** — **Foto:** sala o colección que permita fotografía. **Texto:** «Descubrimos el legado cultural del museo en la modalidad de visita disponible.»

### 14F. Parque Arví *(si tiene subpágina)*
1. **Bosque y aire puro** — **Foto:** senderos del Parque Arví. **Texto:** «Nos adentramos en el paisaje natural de las montañas de Santa Elena.»
2. **Caminos de naturaleza** — **Foto:** recorrido ecológico específico. **Texto:** «Disfrutamos de senderos y actividades habilitadas según la programación del parque.»
3. **Sabores y productos locales** — **Foto:** mercado real si se realiza en esa fecha. **Texto:** «Cuando está disponible, conocemos los productos y emprendimientos locales.»

---

## REGLAS COMERCIALES Y DE CONTENIDO TRANSVERSALES

- No presentar escenas opcionales como **«incluidas»**. Identificarlas claramente con una etiqueta **«Opcional»** o **«Ingreso no incluido»** cuando aplique.
- No inventar precios de entradas, duración por parada, horarios, espectáculos ni disponibilidad de operadores.
- Diferenciar claramente **lo que se visita en el tour confirmado** de **propuestas, extensiones y alternativas**.
- Evitar prometer visitas a todos los sitios cuando la ruta depende del tráfico, clima, horarios o preferencias.
- Priorizar fotos reales del equipo T&T y sus clientes **con permiso de uso**; si no existe material, cargar imagen correcta y licenciada del punto, o mantener marcador de posición pendiente de producción.
- No usar imágenes generadas por IA que aparenten documentar una parada real.
- Mantener la propuesta de valor de T&T: servicio privado, atención personalizada, horarios flexibles según logística, equipo profesional, fotografías/videos de cortesía e hidratación **cuando estén contemplados en el servicio contratado**.
- Al lado de cada escena se puede incluir un pequeño subtítulo: «Parada 03 de 09 · Guatapé», y una etiqueta si es opcional.
- Las escenas del tour deben aparecer en el **mismo orden del itinerario real validado por operaciones**.

## CRITERIOS DE ACEPTACIÓN — REVISIÓN DE CADA SUBPÁGINA

- [ ] Cada subpágina presenta **solo** las escenas de SU tour.
- [ ] Cada paso del scroll muestra **una foto correcta y diferente** de la parada correspondiente.
- [ ] Al cambiar la escena, cambian a la vez **imagen, numeración, titular, descripción y progreso**.
- [ ] El scroll funciona en escritorio y móvil, sin saltos, bloqueos ni textos cortados.
- [ ] Las fotografías tienen `alt` descriptivo y están optimizadas.
- [ ] El texto explica **qué se visita y qué se hace** en cada parada.
- [ ] Las actividades opcionales o de costo adicional están identificadas.
- [ ] La sección no altera «Fotografías», «Antes de viajar» ni «Cotizar».
- [ ] Las escenas están vinculadas al CMS para que el equipo pueda editarlas.
- [ ] **Los tours 9, 11, 12 y 13 quedan excluidos de este cambio.**
- [ ] Las rutas sugeridas no se publican como confirmadas sin visto bueno de T&T.

**Resultado esperado:** cada cliente que entre a una subpágina de experiencia podrá **deslizar y vivir visualmente el itinerario paso a paso**, entendiendo exactamente qué lugar corresponde a cada foto, por qué se visita, qué puede hacer allí y qué actividades requieren contratación adicional.
