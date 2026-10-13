# ARCHIVADO — Spec 05 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `copy-bilingue`
**Depende de:** [`03_spec_arquitectura_informacion.md`](03_spec_arquitectura_informacion.md) · [`04_spec_design_system.md`](04_spec_design_system.md)

> ## ✅ IMPLEMENTADO — 2026-08-10
>
> | Entregado | Detalle |
> |---|---|
> | **UX-18** datos reales | Contacto verificado de Bogotá cargado, con `TODO(cliente)` en cada campo que puede diferir a nivel de grupo. Añadidos `legal` (con la declaración de grupo, sin publicar un NIT único) y `redes` |
> | **UX-21** etiquetas de CTA | `verMas` eliminado del proyecto: **cero apariciones**. Sustituido por `verHistoria`, `verValores`, `verDetalle`, `cotizar`, `planearAMedida`. "Ver experiencia completa" → "Visitar el sitio de la sede" |
> | Contradicción de §7 | **Resuelta**: el hito de 2026 decía "cinco casas" con 4 sedes en el array. Ahora dice "cuatro casas" |
> | **UX-20** diferenciales | 6 diferenciales **verificables** en `content.ts`, sin adjetivos vacíos |
> | Copy del módulo de venta | Catálogo, a medida, confianza local y errores de formulario en lenguaje llano con ejemplo |
> | Datos operativos | Las **8 experiencias** con `descripcionAmpliada`, `incluye`, `noIncluye`, `puntoEncuentro`, `horario` y `capacidad`, en ES y EN |
>
> **`TODO(cliente)` abiertos:** año de apertura de la sede del Eje Cafetero y de Cartagena. El dato publicado (22 años, 2003) es **del grupo**, no de cada sede: atribuirlo a una región habría sido inventar.

**Habilita:** 06 Módulo de venta · 08 SEO

---

## 1. Alcance

El spec 03 fijó qué páginas existen y con qué secciones. El 04 fijó cuánto espacio tiene cada elemento. Este documento define **qué se dice, cómo se dice y en qué idioma**.

Regla que gobierna todo: no se escribe copy para una sección que no esté en el mapa del spec 03, ni con una longitud que rompa la tipografía del spec 04.

---

## 2. Dos voces, un mismo carácter

El sitio es híbrido. La voz cambia de registro entre capas, pero no de personalidad: en ambas es una empresa colombiana con veintidós años de oficio que cumple lo que promete.

### 2.1 Capa A — corporativa

`/` · `/historia` · `/equipo` · `/valores` · `/servicios` · `/contacto`

| Sí | No |
|---|---|
| "Coordinamos la movilidad de su equipo en doce ciudades" | "¡La mejor empresa de transporte de Colombia!" |
| "Veintidós años de carretera y palabra cumplida" | "Líderes indiscutibles del sector" |
| "Antes de cada salida se firma una lista de 32 puntos de revisión" | "Máxima calidad y seguridad garantizada" |
| "El 78 % de nuestro equipo lleva más de cinco años con nosotros" | "Personal altamente calificado" |
| Trato de usted en lo corporativo | Tuteo comercial |

**Referencia:** Yanbal. Se cuenta una historia, no se cierra una venta. El lector debe terminar pensando "esta gente sabe lo que hace", no "me están vendiendo algo".

### 2.2 Capa B — venta

`/sedes/eje-cafetero` · `/sedes/cartagena` · fichas de experiencia

Aquí el usuario viene a comprar. El registro se vuelve concreto y operativo sin perder calidez.

| Sí | No |
|---|---|
| "Día completo · 8 h. Salida desde tu hotel en Pereira o Armenia" | "Una experiencia inolvidable que no puedes perderte" |
| "Incluye: entrada, guía bilingüe, almuerzo típico. No incluye: bebidas ni propinas" | Silencio sobre qué entra y qué no |
| "Cotizar esta experiencia" | "¡ÚLTIMOS CUPOS!" |
| Tuteo cercano | Trato distante de folleto institucional |
| "Caminas entre palmas de cera de más de sesenta metros" | "Paisajes de ensueño y naturaleza exuberante" |

**Referencia funcional:** el sitio de Bogotá. Mismo nivel de detalle operativo, con la identidad visual de este repo.

### 2.3 Lo prohibido en ambas capas

- Superlativos sin respaldo verificable.
- Falsa urgencia: cupos inventados, contadores regresivos sin inventario real.
- Precios que el cliente no haya confirmado.
- Signos de exclamación en cadena, MAYÚSCULAS de énfasis, emojis.
- Adjetivos vacíos: "innovador", "de clase mundial", "único en su tipo".
- Anglicismos evitables: "tour operador" pase, "customer experience" no.

---

## 3. Modelo técnico

Todo texto visible es un `L`:

```ts
export type L = { es: string; en: string };
```

No hay archivos de traducción. El texto vive junto al dato.

| Archivo | Qué contiene |
|---|---|
| `src/data/ui.ts` | Interfaz: `nav`, `cta`, `labels`, `form`, `footer`, `contactInfo`, `navLinks` |
| `src/data/content.ts` | Contenido corporativo + el objeto `copy` con el copy narrativo por página |
| `src/data/sedes.ts` | Sedes y experiencias |

**Criterio de asignación:** ¿es un botón, etiqueta o rótulo? → `ui.ts`. ¿Es contenido editorial? → `content.ts`. ¿Pertenece a una sede o experiencia? → `sedes.ts`.

### Convención de nombres en `copy`

| Sufijo | Uso |
|---|---|
| `…HeroTitle` / `…HeroSubtitle` | Textos del `PageHero` |
| `…Title` / `…Subtitle` | `SectionHeading` |
| `…Text` | Párrafo de contenido |

Ejemplo: `sedesHeroTitle`, `valoresTitle`, `culturaText`.

### Campos que NO son `L`

`Miembro.name`, `Conductor.name`, `Testimonio.company`, `contactInfo.telefono`, `whatsapp`, `email`, `nit`, `rnt`. Son nombres propios y datos: no se traducen. Está correcto y no debe "arreglarse".

---

## 4. Longitudes

Derivadas de la tipografía del spec 04. Si el inglés se pasa del límite, **se reescribe**, no se recorta a la fuerza.

| Elemento | Máximo | Ideal |
|---|---|---|
| `h1` de hero | 70 caracteres | 45–60 |
| Subtítulo de hero | 160 | 100–140 |
| `h2` de sección | 60 | 30–50 |
| Subtítulo de sección | 180 | 100–160 |
| Título de card (`h3`) | 45 | 20–40 |
| Descripción de card | 220 | 120–180 |
| Punto de `highlights` | 45 | 20–35 |
| Etiqueta de botón | 32 | 15–28 |
| Párrafo narrativo | 600 | 300–500 |
| `alt` de imagen | 125 | 60–110 |
| `title` de SEO | 60 | 50–60 |
| `meta description` | 155 | 140–155 |

---

## 5. Política ES/EN

1. **Paridad total.** Ningún `en` vacío, ninguno en español.
2. **El inglés se reescribe, no se calca.** "Somos un grupo colombiano de transporte y turismo" → "We are a Colombian transport and tourism group", no una traducción literal palabra a palabra que suene extranjera.
3. **Registro equivalente.** El inglés corporativo es más directo que el español; se ajusta sin volverse frío.
4. **Nombres propios no se traducen:** Bogotá, Medellín, Cartagena, Salento, Filandia, Getsemaní.
5. **Topónimos con equivalente aceptado sí:** "Eje Cafetero" → "Coffee Region", "Valle de Cocora" → "Cocora Valley", "Ciudad Amurallada" → "Walled City".
6. **`alt` y `aria-label` se traducen.** Los lee un lector de pantalla.
7. **Vocabulario controlado:**

| Español | Inglés | No usar |
|---|---|---|
| Sede | Office | Headquarters (solo Bogotá lo es) |
| Turismo receptivo | Inbound tourism | Receptive tourism |
| Traslado | Transfer | Transportation |
| Experiencia | Experience | Tour package |
| Cotizar | Request a quote | Quote it |
| Conductor | Driver | Chauffeur (salvo servicio ejecutivo) |
| Paisaje Cultural Cafetero | Coffee Cultural Landscape | Coffee Axis |

### Limitación conocida

El toggle ES/EN **no genera URLs**: no existe versión inglesa indexable. Los `head()` están en español fijo por esa razón. Es coherente, no un descuido. Ver [`08_spec_seo.md`](08_spec_seo.md) §6.

---

## 6. Matriz de contenido

### `/` — portada

| Sección | Qué dice | Estado |
|---|---|---|
| Hero | Trayectoria + escala nacional. CTA único hacia historia | Existe |
| `LegalBar` | Constitución legal, certificaciones | **Nuevo — UX-01** |
| Quiénes somos | 4–5 líneas: origen, presente, manera de trabajar | Existe |
| Cifras | 22 años · 12 ciudades · 48.000+ pasajeros · 86 vehículos | Existe |
| Diferenciales institucionales | 6 argumentos **verificables** | **Nuevo — UX-20** |
| Sedes | Preview de 4, con la distinción explicada | Ampliar |
| Equipo | Preview de 6 rostros | Existe |
| Valores | 6 valores | Existe |
| Testimonios | Corporativos, nunca turistas individuales | Existe |
| CTA de cierre | Consulta corporativa, alianzas, licitaciones | Existe |

**Diferenciales institucionales (UX-20)** — adaptación corporativa del "¿Por qué elegirnos?" de Bogotá. Cada uno debe ser comprobable:

| Diferencial | Argumento verificable |
|---|---|
| Cobertura nacional | 12 ciudades, 4 sedes con equipo propio |
| Certificación | ISO 9001, ISO 39001, RNT vigente, ANATO desde 2011 |
| Coordinación dedicada | Un coordinador con nombre por cuenta corporativa |
| Monitoreo | GPS 24/7 desde la central de Bogotá, control de jornadas |
| Formación | Plan anual: conducción defensiva, primeros auxilios, hospitalidad |
| Continuidad | 78 % del equipo con más de cinco años |

### `/historia`

| Sección | Qué dice | Estado |
|---|---|---|
| Hero + intro | El origen sin épica: un hombre madrugando y un cliente que volvió a llamar | Existe |
| Timeline | 7 hitos de 2003 a 2026 | Existe |
| De dónde venimos / hacia dónde vamos | **Misión y visión integradas en narración** | Ampliar — UX-19 |
| Cita del fundador | Formato editorial | Existe |

Bogotá tiene misión y visión como bloques fríos. Aquí se integran en la narrativa: la misión responde "qué hacemos y por qué", la visión "a dónde vamos", sin encabezarlas con esas palabras.

### `/equipo` · `/valores` · `/servicios`

Contenido existente y sólido. Ajustes menores: etiquetas de CTA (UX-21) y revisión de longitudes.

### `/sedes`

| Sección | Qué dice | Estado |
|---|---|---|
| Hero | Presencia en los destinos más importantes | Existe |
| **Aclaración de modelo** | Dos sedes con sitio propio, dos operadas desde aquí | **Nuevo — spec 03 §7** |
| Grid de 4 | Descripción por sede | Existe |

La aclaración es indispensable: sin ella el usuario no entiende por qué dos tarjetas se comportan distinto.

### `/sedes/{slug}` — capa B

| Sección | Qué dice |
|---|---|
| Hero | Región y promesa concreta |
| Intro de sede | Qué se opera, desde dónde, con quién |
| Catálogo | Cada experiencia con duración y destacados |
| Confianza local | Años operando, guías de la región |
| Personalizada | Salida para quien no encuentra lo suyo |
| Testimonios | De viajeros de esa región |
| Contacto de sede | Datos + CTA de cotización |

### `/sedes/{slug}/{experiencia}` — ficha

Estructura de descripción ampliada:

1. **Qué se hace** — dos o tres frases concretas, con detalle sensorial breve.
2. **Por qué vale la pena** — una frase, sin adjetivos vacíos.
3. **Cómo se desarrolla el día** — cronología en lenguaje llano.

Más: duración, horario, punto de encuentro, capacidad, **incluye**, **no incluye**, destacados.

> **Sobre `noIncluye`:** declarar lo que no está incluido parece contraproducente y no lo es. La mayoría de las reclamaciones en turismo nacen de lo que el cliente asumió. Decirlo por adelantado transmite honestidad y reduce fricción postventa.

---

## 7. Coherencia de datos

Cifras publicadas hoy. **Si una cambia, cambia en todos los sitios donde aparece.**

| Dato | Valor | Dónde aparece |
|---|---|---|
| Fundación | 2003 | `hitos`, `copy.quienesSomos` |
| Años de trayectoria | 22 | `cifras`, `copy.heroTitle`, `copy.historiaHeroSubtitle` |
| Ciudades cubiertas | 12 | `cifras`, `servicios` |
| Sedes | 4 | `sedes`, `copy.sedesSubtitle` |
| Pasajeros atendidos | 48.000+ | `cifras` |
| Vehículos | 86 | `cifras` |
| Fundador | Álvaro Restrepo | `equipo`, `fundadorQuote`, `hitos` |

**Advertencia:** `copy.sedesSubtitle` dice "Cuatro casas" y el hito de 2026 dice "Un grupo, cinco casas". **Es una contradicción real en el contenido actual.** Hay que resolverla: o son cuatro sedes, o son cinco y falta una en el array.

### Datos sin confirmar

Ninguna cifra se inventa. Sin dato confirmado: `// TODO(cliente): …` con la pregunta concreta.

---

## 8. Texto de interfaz

### Errores de formulario

Lenguaje llano, con ejemplo cuando ayude, junto al campo:

| Campo | Mensaje | Inglés |
|---|---|---|
| Nombre vacío | "Escribe tu nombre" | "Enter your name" |
| Correo inválido | "Escribe un correo válido, por ejemplo nombre@empresa.com" | "Enter a valid email, e.g. name@company.com" |
| Mensaje corto | "Cuéntanos un poco más — mínimo 10 caracteres" | "Tell us a little more — at least 10 characters" |
| Tipo sin elegir | "Elige el tipo de consulta" | "Choose an enquiry type" |
| Sin autorización | "Necesitamos tu autorización para responderte" | "We need your consent to reply" |

Nunca "Campo inválido", "Error 400", "Formato incorrecto".

### Etiquetas de CTA — corrección UX-21

| Hoy | Problema | Propuesta |
|---|---|---|
| "Ver más" (× 2 destinos distintos) | Ambiguo — WCAG SC 2.4.4 | "Conoce nuestra historia" / "Ver los seis valores" |
| "Ver experiencias" como **título** de sección | Es etiqueta de botón usada como encabezado | "Experiencias en el Eje Cafetero" |
| "Hablemos" | Correcto en capa A | Se mantiene |
| "Ver experiencia completa" | Confuso: suena a experiencia turística, no a sitio web | "Visitar el sitio de Bogotá" |

### `aria-label` obligatorios

Traducidos, en `ui.labels`: tema, idioma, menú, WhatsApp, cerrar, siguiente/anterior del carrusel.

---

## 9. Reglas de trabajo

1. Antes de escribir, leer `src/data/content.ts` y `src/data/ui.ts` para no contradecir lo publicado.
2. Redactar primero en español; el inglés después, como reescritura.
3. Verificar longitudes contra §4.
4. Entregar el bloque completo con la sintaxis del archivo, listo para insertar.
5. Declarar cada `TODO(cliente)` dejado y por qué.
6. **Un solo agente escribe en los archivos calientes por ronda** (`content.ts`, `ui.ts`, `sedes.ts`) — ver skill `tt-trabajo-paralelo`.
7. Claves nuevas al final del objeto, agrupadas con comentario de sección: reduce conflictos.

---

## 10. Compuerta hacia el spec 06

Nada se marca por estar escrito.

| | Punto | Cómo se rectifica |
|---|---|---|
| ☐ | Contradicción "cuatro casas" / "cinco casas" resuelta | `rg -n "casas" src/data/` y decisión del cliente |
| ☐ | Paridad `es`/`en` completa en los tres archivos de datos | Informe de `revisor-i18n` |
| ☐ | Ningún literal visible en JSX fuera de `t()` | `rg` de la skill `tt-contenido` |
| ☐ | Longitudes dentro de los límites de §4 | Medición sobre el copy real |
| ☐ | Datos de contacto reales cargados con sus `TODO(cliente)` | Revisión de `src/data/ui.ts` |
| ☐ | Etiquetas de CTA sin ambigüedad | `rg -n "Ver más\|Learn more" src/` devuelve cero |
| ☐ | Cifras coherentes entre todas sus apariciones | Revisión cruzada de la tabla §7 |
| ☐ | Vocabulario controlado aplicado en el inglés | Revisión del glosario §5 |

**Estado de la compuerta: CERRADA.** Se abre hacia el spec 06 cuando la contradicción de §7 esté resuelta y la paridad i18n verificada.
