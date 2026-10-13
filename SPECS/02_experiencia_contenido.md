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
