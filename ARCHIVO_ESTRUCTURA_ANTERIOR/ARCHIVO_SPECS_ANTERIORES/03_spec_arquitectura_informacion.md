# ARCHIVADO — Spec 03 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `arquitecto-informacion`
**Depende de:** [`01_ux_ui_implementation_plan.md`](01_ux_ui_implementation_plan.md) · [`02_backlog_ux_ui.md`](02_backlog_ux_ui.md)

> ## ✅ IMPLEMENTADO — 2026-08-10
>
> | Entregado | Dónde |
> |---|---|
> | `Experiencia` ampliada con 9 campos opcionales | `src/data/sedes.ts` |
> | `Sede` con `intro`, `confianza`, `contacto`, `legal` | `src/data/sedes.ts` |
> | Los 8 slugs de experiencia, permanentes | `ruta-del-cafe`, `valle-de-cocora`, `parque-del-cafe`, `salento-y-filandia`, `ciudad-amurallada`, `islas-del-rosario`, `getsemani`, `castillo-san-felipe` |
> | Helpers `getExperiencia()` y `sedesPropias()` | `src/data/sedes.ts` |
> | Ruta de nivel 3 `/sedes/{sede}/{experiencia}` con breadcrumb | `src/routes/sedes.$slug.$experiencia.tsx` |
> | Ruta `/privacidad` | `src/routes/privacidad.tsx` |
>
> **Invariantes verificadas en ejecución:** `/sedes/bogota`, `/sedes/medellin`, `/sedes/cartagena/no-existe` y `/nada` devuelven **404**; las 12 rutas reales devuelven **200**. Los campos nuevos son opcionales: las 8 experiencias previas siguen compilando.
>
> **Pendiente de cliente:** decisión de navegación (agrupar "Nosotros" o mantener 7 entradas) y validación del mapa del sitio.

**Habilita:** 04 Design system · 05 Contenido · 06 Módulo de venta

---

## 1. Por qué este spec va primero

Nada se puede diseñar, redactar ni construir sin saber **qué páginas existen, qué URL tienen y qué datos las alimentan**. Escribir copy para una sección que luego se mueve, o construir un componente sobre un modelo de datos que cambia, es trabajo que se tira.

Este documento fija tres cosas y las congela para el resto del pipeline:

1. El **mapa del sitio** y el esquema de URLs.
2. La **navegación** y cómo se distribuye la atención.
3. El **modelo de datos multisede**, que es donde vive la inteligencia del proyecto.

---

## 2. El principio ordenador: dos capas, un dominio

El sitio no es homogéneo. Tiene dos naturalezas que conviven bajo la misma marca y el mismo dominio.

```
                        T&T Medellín (dominio único)
                                   │
                ┌──────────────────┴──────────────────┐
                │                                     │
        CAPA A — CORPORATIVA                  CAPA B — VENTA
        Credibilidad institucional            Conversión comercial
                │                                     │
    /  /historia  /equipo  /valores          /sedes/eje-cafetero
    /servicios  /contacto                    /sedes/cartagena
                │                                     │
                └──────────────┬──────────────────────┘
                               │
                            /sedes
                         (la bisagra)
                               │
                ┌──────────────┴──────────────┐
                │                             │
        SALE del dominio                ENTRA al dominio
        Bogotá · Medellín          Eje Cafetero · Cartagena
        (sitios propios)              (venden aquí)
```

**`/sedes` es el nodo más delicado del sitio.** Es el único lugar donde el usuario puede ser expulsado a otro dominio o llevado a una página de venta interna, y ambas cosas se le presentan con la misma tarjeta. Cualquier decisión sobre esa página es una decisión de arquitectura, no de estética.

---

## 3. Mapa del sitio

### 3.1 Rutas confirmadas

| URL | Archivo | Capa | Propósito | Padre |
|---|---|---|---|---|
| `/` | `index.tsx` | A | Portada institucional | — |
| `/historia` | `historia.tsx` | A | Trayectoria, misión, visión, fundador | `/` |
| `/equipo` | `equipo.tsx` | A | Personas por área, conductores, cultura | `/` |
| `/valores` | `valores.tsx` | A | Valores, compromiso, certificaciones | `/` |
| `/servicios` | `servicios.tsx` | A | Corporativo · Receptivo · Alianzas | `/` |
| `/contacto` | `contacto.tsx` | A | Formulario, datos, mapa | `/` |
| `/sedes` | `sedes.index.tsx` | Bisagra | Las 4 sedes | `/` |
| `/sedes/eje-cafetero` | `sedes.$slug.tsx` | **B** | **Venta:** catálogo del Eje | `/sedes` |
| `/sedes/cartagena` | `sedes.$slug.tsx` | **B** | **Venta:** catálogo del Caribe | `/sedes` |

### 3.2 Rutas propuestas en este spec

| URL | Justificación | Historia |
|---|---|---|
| `/sedes/{sede}/{experiencia}` | Ficha de detalle. Sin ella no hay información suficiente para decidir una compra | UX-08 |
| `/privacidad` | **Obligatoria** si se conecta el formulario (Ley 1581 de 2012) | UX-14 |

### 3.3 Rutas bloqueadas

| URL | Decisión | Estado |
|---|---|---|
| `/vehiculos` | #3 | 🔒 Fuera del alcance confirmado |
| `/aliados` | #6 | 🔒 Bloqueo legal |

### 3.4 Profundidad

Máximo **3 niveles**: `/sedes/cartagena/islas-del-rosario`. No se admite un cuarto. Si algo parece necesitarlo, el problema es de agrupación, no de profundidad.

---

## 4. Esquema de URLs

### Reglas

| Regla | Ejemplo correcto | Ejemplo incorrecto |
|---|---|---|
| Español | `/sedes` | `/locations` |
| Minúscula | `/eje-cafetero` | `/Eje-Cafetero` |
| Guion medio | `/islas-del-rosario` | `/islas_del_rosario` |
| Sin acentos ni ñ | `/valle-de-cocora` | `/valle-de-cocorá` |
| Sin barra final | `/servicios` | `/servicios/` |
| Sin extensión ni sufijo | `/contacto` | `/contacto.html` |
| Sustantivo, no verbo | `/contacto` | `/contactanos` |

### Estabilidad

**Una URL publicada no cambia.** Si es inevitable, se define redirección 301 en el mismo cambio, nunca después. La lista de redirecciones vive en este documento.

| Origen | Destino | Motivo |
|---|---|---|
| *(ninguna al día de hoy)* | | |

### Slugs de experiencia — propuesta

| Sede | Experiencia | Slug |
|---|---|---|
| Eje Cafetero | Ruta del Café | `ruta-del-cafe` |
| Eje Cafetero | Valle de Cocora | `valle-de-cocora` |
| Eje Cafetero | Parque del Café | `parque-del-cafe` |
| Eje Cafetero | Pueblos Patrimonio: Salento y Filandia | `salento-y-filandia` |
| Cartagena | Ciudad Amurallada | `ciudad-amurallada` |
| Cartagena | Islas del Rosario | `islas-del-rosario` |
| Cartagena | Getsemaní cultural | `getsemani` |
| Cartagena | Castillo San Felipe de Barajas | `castillo-san-felipe` |

Los slugs son **únicos dentro de su sede**, no globalmente: `/sedes/cartagena/city-tour` y `/sedes/eje-cafetero/city-tour` serían válidos y distintos.

---

## 5. Navegación

### 5.1 Estado actual

`navLinks` en `src/data/ui.ts` es fuente única; header y footer la consumen. Siete entradas:

```
Inicio · Nuestra historia · Nuestro equipo · Valores y compromiso · Nuestras sedes · Servicios · Contacto
```

**Problemas identificados:**

1. **Siete entradas con etiquetas largas.** "Valores y compromiso" y "Nuestra historia" ocupan mucho ancho; a 1024 px la barra va justa antes de colapsar.
2. **Tres de las siete son la misma idea**: historia, equipo y valores son "quiénes somos". Compiten entre sí y diluyen la atención.
3. **`/sedes` no destaca**, siendo la ruta que lleva a las dos páginas con potencial comercial del sitio.

### 5.2 Propuesta

**Opción recomendada — agrupar "Nosotros":**

```
Inicio · Nosotros ▾ · Sedes · Servicios · Contacto
                └── Nuestra historia
                └── Nuestro equipo
                └── Valores y compromiso
```

Cinco entradas de primer nivel. Ventajas: respira a 1024 px, agrupa lo que conceptualmente va junto, y le da peso relativo a `/sedes` y `/servicios`, que son las rutas de negocio.

Requiere `NavigationMenu` de shadcn (ya instalado) y que el menú móvil muestre el grupo expandido, sin acordeón anidado.

**Opción conservadora:** mantener las 7 entradas y solo acortar etiquetas ("Historia", "Equipo", "Valores", "Sedes"). Menor esfuerzo, resuelve el ancho pero no la dilución.

**Decisión: pendiente de validar con el cliente.** Hasta entonces rige el estado actual. La estructura de `navLinks` soporta ambas sin rediseño.

### 5.3 Reglas permanentes

- Máximo **7±1** entradas de primer nivel.
- `navLinks` es la **única** fuente. Nunca duplicar el menú a mano en un componente.
- Añadir una entrada obliga a justificar qué sale o qué se agrupa.
- El footer replica `navLinks`; si hay submenú, el footer lo aplana.

### 5.4 Breadcrumbs

Obligatorios a partir del nivel 2:

```
Sedes  ›  Cartagena  ›  Islas del Rosario
```

- El último elemento no es enlace.
- Marcado con `BreadcrumbList` de Schema.org (spec 08).
- `Breadcrumb` de shadcn ya está disponible en `src/components/ui/breadcrumb.tsx`.
- No aparecen en el nivel 1 ni en el home.

---

## 6. Modelo de datos multisede

Es el corazón del sistema. El comportamiento del sitio se decide **por dato, no por código**.

### 6.1 Estado actual

```ts
export type Sede = {
  slug: string;
  name: L;
  city: L;
  image: string;
  description: L;
  tieneSitioPropio: boolean;   // ← gobierna todo el comportamiento
  urlExterna?: string;
  experiencias: Experiencia[];
};
```

Esto ya es correcto y debe preservarse. Su virtud: `/sedes/bogota` devuelve 404 porque el `loader` comprueba `tieneSitioPropio`, no porque alguien escribiera `if (slug === "bogota")`.

**Regla:** cualquier propuesta que requiera condicionar por nombre de ciudad está mal planteada. Se resuelve con un campo nuevo.

### 6.2 Ampliaciones

Todas **opcionales**, para no romper los datos existentes.

```ts
export type Sede = {
  // — existente, sin cambios —
  slug: string;
  name: L;
  city: L;
  image: string;
  description: L;
  tieneSitioPropio: boolean;
  urlExterna?: string;
  experiencias: Experiencia[];

  // — UX-11 · decisión #2 —
  contacto?: {
    direccion: L;
    telefono: string;
    whatsapp: string;      // solo dígitos con indicativo: "573148566142"
    email: string;
    horario: L;
  };

  // — UX-33 · decisión #1 —
  legal?: {
    razonSocial: string;
    nit: string;
    rnt: string;
  };

  // — UX-35 · decisión #3 —
  flota?: TipoVehiculo[];

  // — UX-38 · decisión #6 —
  aliados?: Aliado[];
};
```

### 6.3 Experiencia ampliada — UX-07

```ts
export type Experiencia = {
  // — existente —
  name: L;
  description: L;
  image: string;
  duration: L;
  highlights: L[];

  // — nuevo, todo opcional —
  slug?: string;           // habilita /sedes/{sede}/{slug}
  incluye?: L[];
  noIncluye?: L[];
  puntoEncuentro?: L;
  horario?: L;             // "8:00 a.m. – 6:00 p.m."
  capacidad?: { min: number; max: number };
  galeria?: string[];
};
```

**Por qué `noIncluye` importa tanto como `incluye`.** En turismo, la mayoría de las reclamaciones nacen de lo que el cliente asumió que estaba incluido. Declararlo por adelantado reduce fricción postventa y, contra la intuición, aumenta la conversión: transmite honestidad.

### 6.4 Helpers

```ts
export const getSede = (slug: string) => sedes.find((s) => s.slug === slug);

// nuevo — UX-07
export const getExperiencia = (sedeSlug: string, expSlug: string) =>
  getSede(sedeSlug)?.experiencias.find((e) => e.slug === expSlug);

// nuevo — sedes que venden en este sitio
export const sedesPropias = () => sedes.filter((s) => !s.tieneSitioPropio);
```

### 6.5 Invariantes

Se verifican en cada cambio a `src/data/sedes.ts`:

1. `tieneSitioPropio: true` **exige** `urlExterna`.
2. `tieneSitioPropio: true` **exige** `experiencias: []` — no se cargan experiencias que nunca se muestran.
3. `tieneSitioPropio: false` **exige** al menos una experiencia.
4. `slug` de sede único en todo el array.
5. `slug` de experiencia único dentro de su sede.
6. Todo campo de texto es `L` con `es` y `en`.
7. `whatsapp` solo dígitos, con indicativo, sin `+` ni espacios.

---

## 7. Jerarquía de contenido por página

Orden de secciones fijado aquí; el spec 05 escribe el contenido y el 04 le da forma.

### `/` — portada

```
1. Hero + CTA principal          ← acción única, dentro del hero
2. LegalBar                      ← UX-01 · confianza inmediata
3. Quiénes somos (resumen)
4. Cifras
5. Diferenciales institucionales ← UX-20
6. Sedes (preview de 4)
7. Equipo (preview)
8. Valores
9. Testimonios corporativos
10. CTA institucional de cierre
```

### `/sedes` — la bisagra

```
1. Hero
2. Aclaración de modelo         ← "dos sedes con sitio propio, dos operadas desde aquí"
3. Grid de 4 SedeCard diferenciadas   ← UX-02, UX-03
```

El punto 2 es nuevo y necesario: sin él, el usuario no entiende por qué dos tarjetas se comportan distinto.

### `/sedes/{slug}` — página de venta

```
1. Hero de la región
2. Intro de la sede: qué se opera, desde dónde, con quién
3. Catálogo de experiencias        ← enlaza a ficha de detalle
4. Franja de confianza local
5. Crea tu experiencia personalizada
6. Testimonios de viajeros de la región
7. Contacto de la sede + CTA de cotización
```

### `/sedes/{slug}/{experiencia}` — ficha

```
1. Breadcrumb
2. Hero de la experiencia
3. Descripción ampliada
4. Datos operativos: duración · horario · punto de encuentro · capacidad
5. Incluye / No incluye        ← lado a lado en escritorio, apilado en móvil
6. Destacados
7. Galería
8. CTA de cotización + volver al catálogo
```

---

## 8. Enlazado interno

### Distribución de autoridad

`/` enlaza a todas las secciones principales. `/sedes` recibe enlaces desde el home, el menú y el footer. **Las páginas de venta deben recibir el máximo de enlaces internos posible**: son las de mayor potencial orgánico.

### Reglas

1. Los anchors describen el destino: "Ver experiencias del Eje Cafetero", no "Ver más".
2. Cada página de venta recibe al menos 3 enlaces internos (menú, `/sedes`, preview del home).
3. Los enlaces salientes a Bogotá y Medellín son inevitables y correctos, pero **no llevan el peso visual primario** (UX-02).
4. Ninguna página queda huérfana: toda ruta es alcanzable navegando, sin escribir la URL.

---

## 9. Errores y estados límite

| Situación | Comportamiento |
|---|---|
| `/ruta-inexistente` | 404 con diseño propio y enlace al home (ya implementado) |
| `/sedes/bogota` | **404**, porque Bogotá redirige fuera. Es correcto y debe preservarse |
| `/sedes/{slug}/{exp}` con experiencia inexistente | 404, mismo patrón |
| Sede sin datos de contacto | Muestra contacto nacional, nunca un bloque vacío |
| Experiencia sin campos opcionales | Esos bloques no se renderizan; no se muestran etiquetas huérfanas |

---

## 10. Impacto en otros specs

| Spec | Qué recibe de aquí |
|---|---|
| 04 Design system | Qué componentes hacen falta: `LegalBar`, `SedeContactCard`, breadcrumbs, diferenciación de `SedeCard` |
| 05 Contenido | Qué copy escribir y para qué sección exacta |
| 06 Módulo de venta | El modelo de `Experiencia` ampliado y la estructura de la ficha |
| 08 SEO | El esquema de URLs, los breadcrumbs y la jerarquía para el mapa keyword→URL |
| 11 Analítica | Los nodos del embudo que hay que instrumentar |

---

## 11. Compuerta hacia el spec 04

Nada se marca por estar escrito. Se marca al verificarse contra el código o con el cliente.

| | Punto | Cómo se rectifica |
|---|---|---|
| ☐ | El mapa del sitio coincide con `src/routes/` | `ls src/routes/` contra la tabla §3.1 |
| ☐ | `/sedes/bogota` devuelve 404 en ejecución | `npm run preview` y visitar la URL |
| ☐ | Las 7 invariantes de §6.5 se cumplen en los datos actuales | Revisión de `src/data/sedes.ts` |
| ☐ | La ampliación de tipos compila sin romper las 8 experiencias | `npm run build` |
| ☐ | `navLinks` es la única fuente de navegación | `rg -n "navLinks" src/` y revisión de Header y Footer |
| ☐ | Decisión de navegación (agrupar "Nosotros" o mantener 7) validada | Consulta al cliente |
| ☐ | Slugs de experiencia aprobados | Revisión con el cliente, por SEO |
| ☐ | Ninguna URL publicada cambia sin redirección definida | Tabla §4 vacía y verificada |

**Estado de la compuerta: CERRADA.** Se abre hacia el spec 04 cuando el mapa esté verificado contra el código y la decisión de navegación esté tomada.
