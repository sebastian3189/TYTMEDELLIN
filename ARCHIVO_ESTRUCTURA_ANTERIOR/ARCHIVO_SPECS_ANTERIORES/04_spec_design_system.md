# ARCHIVADO — Spec 04 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `guardian-design-system`
**Depende de:** [`03_spec_arquitectura_informacion.md`](03_spec_arquitectura_informacion.md)

> ## ✅ IMPLEMENTADO — 2026-08-10
>
> | Corrección | Resultado |
> |---|---|
> | Tokens que faltaban | `--success`, `--whatsapp`, `--duration-*`, `--ease-premium` en `:root` y `.dark`, expuestos en `@theme inline` |
> | `prefers-reduced-motion` | Salvaguarda global en `styles.css`: sin `scale` en hover, sin transiciones. Resuelto **una vez**, no componente a componente |
> | Variante `size="icon-lg"` | 44×44 px en `button.tsx`, aplicada a los 3 botones de icono del header (medían 36×36) |
> | **UX-02** jerarquía de CTA | El botón **primario** es ahora el de las sedes que vendemos aquí; el que saca del dominio es secundario |
> | **UX-03** diferenciación | Badge distinto por tipo, con **icono además de color** (WCAG SC 1.4.1): `MapPin` + "Operada por nosotros" frente a `ExternalLink` + "Sitio oficial" |
> | Convención de botón píldora | `min-h-11` añadido en los 8 archivos: los CTA medían 36 px porque `px-8 py-3` no anula el `h-9` de la variante base |
>
> ### ✅ Contraste del eyebrow — RESUELTO y medido
>
> Se midió el problema antes de tocarlo: **#FF7F09 sobre blanco da 2,53:1**, muy por debajo del 4,5 de WCAG SC 1.4.3. Pero **sobre fondo oscuro da 6,37:1**, donde sí cumple.
>
> Eso descarta cambiar el naranja de marca. La solución es un token aparte, `--primary-text`, que **solo se usa en textos pequeños**:
>
> | Tema | Antes | Ahora | |
> |---|---|---|---|
> | Claro | 2,53:1 ❌ | **5,13:1** ✅ | `#bb4a00` sobre blanco |
> | Oscuro | 6,37:1 | **7,31:1** ✅ | el naranja de marca, sin oscurecer |
>
> `--primary` **no cambia**: sigue siendo #FF7F09 en botones, badges e iconos, donde cumple de sobra. Aplicado en `Section.tsx` (eyebrow), `TeamMemberCard`, `ExperienceCard` y `equipo.tsx`.

**Habilita:** 05 Contenido · 06 Módulo de venta · 07 Accesibilidad

---

## 1. Alcance

El spec 03 fijó qué páginas existen y qué componentes hacen falta. Este documento define **cómo se ven y cómo se comportan**: tokens, tipografía, ritmo, inventario de componentes y las reglas que impiden que el sistema se degrade con el tiempo.

Fuente de verdad del código: [`src/styles.css`](src/styles.css) — Tailwind v4 CSS-first, sin `tailwind.config.js`.

---

## 2. Identidad heredada

El sistema es **compartido con el sitio de Bogotá**. Los valores coinciden exactamente:

| Concepto | Este repo (oklch) | Bogotá (HSL) | Hex |
|---|---|---|---|
| Naranja de marca | `oklch(0.719 0.184 45.5)` | `29 100% 52%` | **#FF7F09** |
| Oscuro institucional | `oklch(0.36 0.006 130)` | `105 3% 24%` | **#3C3F3B** |
| Radio base | `1.25rem` | `1.25rem` | 20 px |
| Tipografías | Inter + Montserrat | Inter + Montserrat | — |

**Esto no es casualidad ni se toca.** Es lo que hace que un usuario que llega desde el sitio de Bogotá reconozca que es la misma empresa. Cualquier cambio a estos cuatro valores es una decisión de marca, no de diseño, y requiere aprobación del cliente.

### Diferencia de aplicación

Bogotá usa el naranja con generosidad porque vende. Este sitio lo usa **como acento**: objetivo ≤ 10 % de la superficie visible. El protagonista es el oscuro y el blanco.

Excepción: dentro de la capa B (`/sedes/eje-cafetero`, `/sedes/cartagena`) el naranja puede subir hasta ~15 %, porque ahí sí se vende. Sigue sin ser fondo de bloques grandes de texto.

---

## 3. Tokens

### 3.1 Catálogo semántico

Los únicos nombres permitidos. **Ningún color crudo en todo `src/`.**

| Token | Uso | Claro | Oscuro |
|---|---|---|---|
| `background` / `foreground` | Fondo base y texto | blanco / gris muy oscuro | gris muy oscuro / casi blanco |
| `surface` / `surface-foreground` | Fondo alterno de sección | #F4F4F4 | oscuro un paso |
| `ink` / `ink-foreground` | Bloques institucionales, header oscuro, footer | #3C3F3B / casi blanco | más oscuro / casi blanco |
| `card` / `card-foreground` | Superficie de tarjeta | blanco | oscuro elevado |
| `primary` / `primary-foreground` | Acento de marca: CTAs, badges, iconos, eyebrows | #FF7F09 | naranja ajustado |
| `secondary` / `secondary-foreground` | Acciones de apoyo | oscuro | oscuro elevado |
| `muted` / `muted-foreground` | Texto secundario, fondos sutiles | — | — |
| `accent` / `accent-foreground` | Hover de elementos neutros | — | — |
| `border` · `input` · `ring` | Bordes, campos, anillo de foco | — | — |
| `destructive` / `destructive-foreground` | Errores | — | — |

### 3.2 Tokens ausentes que hacen falta

| Token propuesto | Para qué | Historia |
|---|---|---|
| `--success` / `--success-foreground` | Confirmación de envío del formulario, estados correctos | UX-13, UX-16 |
| `--whatsapp` | El verde de WhatsApp (#25D366) es color de marca de un tercero, no del sistema. Debe estar tokenizado, no suelto en el JSX | UX-06 |
| `--duration-fast/base/slow` | Hoy cada transición define su propia duración a mano | UX-04 |
| `--ease-premium` | Curva única de aceleración | UX-04 |

Se añaden a `:root` y a `.dark` en `src/styles.css`, y se exponen en `@theme inline`.

### 3.3 Regla inquebrantable

```
✗ bg-orange-500   ✗ text-gray-600   ✗ bg-[#FF7F09]   ✗ border-[#3C3F3B]
✓ bg-primary      ✓ text-muted-foreground   ✓ bg-primary   ✓ border-border
```

Verificación:
```bash
rg -n "bg-(red|orange|amber|gray|slate|zinc|neutral|stone|green|blue)-[0-9]" src/ --glob '!src/components/ui/**'
rg -n "#[0-9a-fA-F]{3,8}" src/components src/routes
```

Ambos deben devolver cero resultados.

---

## 4. Tipografía

| Rol | Fuente | Peso | Interlineado |
|---|---|---|---|
| `h1`–`h4` | Montserrat (`font-display`) | 700 | 1.3 |
| Cuerpo | Inter (`font-sans`) | 400 | 1.6 |

Ya aplicado en `@layer base`. **No se sobrescribe.**

### Escala

| Elemento | Clases | Notas |
|---|---|---|
| `h1` (hero) | `text-4xl md:text-6xl` | Uno por página, lo pone `PageHero` |
| `h2` (sección) | `text-3xl md:text-4xl` | Lo pone `SectionHeading` |
| `h3` (card) | `text-lg` o `text-xl` | **Hoy inconsistente**: `ExperienceCard` y `ValueCard` usan `text-lg`, `SedeCard` usa `text-xl`. Unificar en `text-lg` |
| Cuerpo | `text-base` | 16 px mínimo |
| Apoyo | `text-sm` | Descripciones de card, listas |
| Metadato | `text-xs` | Eyebrows, duraciones, etiquetas |
| Eyebrow | `text-xs font-semibold tracking-[0.2em] uppercase text-primary` | **Revisar contraste**: naranja a 12 px roza el límite AA |

### Longitud de línea

Máximo ~75 caracteres en bloques de texto corrido. `SectionHeading` ya lo acota con `max-w-3xl`. Los párrafos largos fuera de ese contenedor deben llevar `max-w-prose` o equivalente.

---

## 5. Ritmo y espaciado

| Nivel | Valor | Dónde |
|---|---|---|
| Sección vertical | `py-16 md:py-24` | Lo aporta `Section` |
| Sección horizontal | `px-4 md:px-8` | Lo aporta `Section` |
| Contenedor | `max-w-7xl` | Lo aporta `Section` |
| Heading → contenido | `mt-12` | Convención establecida |
| Entre elementos de grid | `gap-6` (cards) · `gap-10` (bloques texto+imagen) | — |
| Interno de card | `p-6` (con imagen) · `p-7` (sin imagen) | — |

**Nunca añadir padding propio dentro de `Section`.** Si hace falta romper el contenedor, se hace con una variante del componente, no con clases ad hoc.

### Alternancia de fondos

```
background → surface → background → surface → … → ink (cierre)
```

`ink` se reserva para bloques institucionales y el CTA de cierre. Dos secciones `ink` seguidas rompen el ritmo.

### Problema identificado — UX-04

Las 8 secciones del home usan el mismo `py-16 md:py-24`, el mismo `SectionHeading` y el mismo grid. **El sistema es correcto pero se aplica de forma monótona.** La solución no es romper el sistema: es variar la **densidad** (una sección a ancho completo, una asimétrica texto/imagen) manteniendo tokens y espaciado.

---

## 6. Componentes

### 6.1 Primitivas de layout — `src/components/Section.tsx`

| Componente | Responsabilidad | Estado |
|---|---|---|
| `Section` | Padding, contenedor, tono de fondo | Correcto |
| `SectionHeading` | Eyebrow + `h2` + subtítulo, opción `center` | Correcto |
| `PageHero` | Imagen, overlay, único `h1` | **Requiere corrección (UX-22)** |

#### Correcciones a `PageHero`

| Problema | Corrección | Historia |
|---|---|---|
| `h-[62vh]` y `size-full` en conflicto en la misma imagen | Una sola declaración de altura, en el contenedor | UX-22 |
| `vh` salta con la barra del navegador móvil | `dvh` | UX-22 |
| Sin `fetchPriority="high"` siendo el LCP de las 8 páginas | Añadir, y nunca `loading="lazy"` | UX-22 |
| Sin color de respaldo: `h1` blanco sobre blanco si la imagen falla | `bg-ink` en el `<section>` | UX-22 |
| El CTA del home vive en un bloque separado bajo el hero | Slot opcional `actions` dentro del hero | UX-04 |

### 6.2 Inventario de cards — `src/components/cards/`

| Componente | Props | Estado |
|---|---|---|
| `SedeCard` | `name, city, image, description, tieneSitioPropio, urlExterna, slug, labels` | **Jerarquía de CTA invertida (UX-02)** |
| `ExperienceCard` | `name, description, image, duration, highlights, highlightsLabel` | Necesita CTA y enlace a ficha (UX-08, UX-09) |
| `TeamMemberCard` + `TeamAvatar` | `name, role, photo, bio` | Correcto |
| `TestimonialCard` | `name, company, quote, photo` | Correcto |
| `ValueCard` | `icon, title, description, example` | Correcto |
| `FeatureCard` | `icon, title, description` | Correcto |
| `TimelineItem` | `year, title, description, image` | Correcto |
| `CountUp` | `value, suffix` | Correcto |

#### `SedeCard` — el problema de jerarquía

Estado actual:

```tsx
tieneSitioPropio ? <Button>            {/* primario naranja → SALE del sitio */}
                 : <Button variant="secondary">  {/* subordinado → páginas de venta */}
```

Está invertido respecto al objetivo de negocio: se le da el peso visual dominante a la acción que expulsa al usuario, y el subordinado a las dos páginas que este sitio necesita que se visiten.

**Corrección (UX-02, UX-03):**

| Tipo de sede | Botón | Señal adicional |
|---|---|---|
| Vende **aquí** (Eje Cafetero, Cartagena) | **Primario** | Badge de región, sin icono de salida |
| Redirige **fuera** (Bogotá, Medellín) | **Secundario** + `ExternalLink` | Badge "Sitio oficial" + aviso accesible de pestaña nueva |

La diferencia no puede depender solo del color (WCAG SC 1.4.1): el icono y el badge aportan la señal redundante.

### 6.3 Componentes nuevos

| Componente | Responsabilidad | Historia | Notas de diseño |
|---|---|---|---|
| `LegalBar` | Franja de confianza bajo el hero | UX-01 | Fondo `surface` o `ink`, tipografía `text-xs`/`text-sm`, iconografía mínima. No compite con el hero |
| `WhatsAppFAB` | Canal directo permanente | UX-06 | Verde tokenizado, ≥ 56×56 px, sombra `shadow-premium-lg`, respeta `safe-area-inset` |
| `TestimonialCarousel` | Testimonios deslizables | UX-05 | `embla` ya instalado. Reutiliza `TestimonialCard`, no la duplica |
| `ExperienceDetail` | Ficha completa de experiencia | UX-08 | Incluye/No incluye lado a lado en escritorio, apilado en móvil |
| `SedeContactCard` | Contacto y datos legales por sede | UX-11 | Reutiliza el patrón de iconos de `Footer` |
| `FaqAccordion` | Preguntas frecuentes | — | `Accordion` de shadcn ya instalado |
| `Breadcrumbs` | Navegación de nivel ≥ 2 | UX-08 | `breadcrumb` de shadcn ya instalado |

**Regla:** antes de crear cualquiera, verificar que no se resuelve extendiendo uno existente con props opcionales.

### 6.4 `src/components/ui/` — zona intocable

Es código generado por shadcn. No se edita salvo decisión explícita y documentada.

**Excepción necesaria (UX-25):** la variante `size="icon"` de `Button` es `h-9 w-9` = **36×36 px**, por debajo del mínimo táctil de 44×44 px exigido por WCAG SC 2.5.5. El `Header` usa esa variante en los tres botones de icono.

Dos salidas, en orden de preferencia:

1. Añadir `size="icon-lg"` (`h-11 w-11` = 44×44) y usarla en el `Header`. No toca lo existente.
2. Cambiar `icon` a `h-11 w-11`. Más limpio, pero afecta a cualquier uso futuro.

**Recomendada: la opción 1.**

---

## 7. Botones

### Anatomía

```tsx
<Button asChild className="rounded-full px-8 py-3">
  <Link to="/sedes/cartagena">Ver experiencias en Cartagena</Link>
</Button>
```

Píldora siempre: `rounded-full px-8 py-3`. El `buttonVariants` base trae `rounded-md`; la clase de píldora lo sobrescribe y **debe estar presente** en todo CTA de contenido.

### Jerarquía

| Nivel | Variante | Cuándo |
|---|---|---|
| Primario | `default` (naranja) | **Una sola acción por pantalla.** La que el negocio quiere que ocurra |
| Secundario | `secondary` (oscuro) | Acciones de apoyo, navegación entre secciones |
| Terciario | `ghost` | Iconos del header, acciones de baja prioridad |
| Enlace | `link` | Dentro de texto corrido |

**Si dos botones pesan igual, ninguno convierte.** Es la regla que corrige UX-02.

### Etiquetas

Cada etiqueta dice **qué hace o a dónde lleva**. "Ver más" está prohibido (WCAG SC 2.4.4, historia UX-21). Si el espacio obliga a acortar, el detalle va en `aria-label`.

---

## 8. Cards

```tsx
<article className="card-premium border border-border/60 p-6">…</article>
```

`card-premium` aporta radio de 20 px, fondo, `shadow-premium` y hover con `scale(1.02)` + sombra mayor. **No duplicar esas propiedades.**

Con imagen superior: añadir `flex h-full flex-col overflow-hidden` para igualar alturas dentro del grid.

### Problema de accesibilidad en `card-premium`

El hover aplica `transform: scale(1.02)`. Debe desactivarse bajo `prefers-reduced-motion: reduce` (UX-27). Se resuelve en `src/styles.css`, no en cada componente.

---

## 9. Grids responsive

| Contenido | Patrón |
|---|---|
| 4 elementos | `grid gap-6 sm:grid-cols-2 lg:grid-cols-4` |
| 3 o 6 elementos | `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` |
| Texto + imagen | `grid items-center gap-10 md:grid-cols-2` |
| Avatares de equipo | `grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6` |

**Nunca** `lg:grid-cols-4` sin paso intermedio en `sm`. **Nunca** anchos fijos en píxeles.

### Problema identificado

El preview de equipo del home usa `lg:grid-cols-6`. A 1024 px cada avatar dispone de ~140 px con nombre y cargo debajo; cargos largos como "Ejecutivo de cuentas corporativas" se parten en tres líneas y desalinean el grid. Corrección: `lg:grid-cols-3 xl:grid-cols-6`, o truncado con `line-clamp`.

---

## 10. Iconografía

- Librería única: `lucide-react`.
- Tamaños: `size-3.5` (metadato) · `size-4` (en línea con texto) · `size-5` (botón de icono) · `size-12` con fondo `bg-primary/10` (icono destacado de `ValueCard`).
- Los iconos decorativos junto a texto no necesitan etiqueta.
- Los iconos que **son** el contenido del botón exigen `aria-label` traducido.
- Coherencia semántica: `Clock` para duración, `MapPin` para lugar, `Check` para incluido. No usar `MapPin` para listar cosas que no son lugares.

---

## 11. Modo oscuro

Existe paleta `.dark` completa con los mismos nombres de token. Si se usan tokens, funciona sin trabajo adicional.

**Verificación obligatoria por pantalla:**

1. Contraste ≥ 4.5:1 en texto normal y ≥ 3:1 en texto grande, en ambos temas.
2. Ningún `text-white` / `text-black` fijo donde corresponda un token.
3. Las superficies con opacidad (`bg-ink-foreground/5`, `border-border/60`) siguen siendo perceptibles.
4. El overlay `bg-ink/70` del hero mantiene legible el `h1` sobre cualquier imagen.

**Punto de atención:** el eyebrow es `text-primary` a `text-xs`. El naranja #FF7F09 sobre blanco da aproximadamente 2.6:1 — **insuficiente para texto pequeño**. Opciones: subir el peso y el tamaño, oscurecer el naranja solo para texto, o usar `foreground` con el naranja reservado a un elemento gráfico adyacente. Se resuelve en UX-27.

---

## 12. Movimiento

| Uso | Duración | Curva |
|---|---|---|
| Hover de color | 150 ms | `ease` |
| Hover de card (sombra + escala) | 300 ms | `ease` |
| Entrada de sección | 500 ms | `--ease-premium` |

Todo movimiento se desactiva bajo `prefers-reduced-motion: reduce`. Sin excepciones: ni carruseles automáticos, ni contadores animados, ni `scale` en hover.

---

## 13. Reglas del sistema

1. **Solo tokens semánticos.** Cero colores crudos fuera de `src/components/ui/`.
2. **Reutilizar antes que crear.** Revisar el inventario completo primero.
3. **Extender con props opcionales**, nunca rompiendo usos existentes.
4. **Un `h1` por página**, aportado por `PageHero`.
5. **Un CTA primario por pantalla.**
6. **Ninguna información se comunica solo con color.**
7. **Toda pantalla verificada en claro y oscuro** antes de darse por hecha.
8. **`src/components/ui/` no se toca** salvo la excepción documentada de `size="icon-lg"`.

---

## 14. Impacto en otros specs

| Spec | Qué recibe de aquí |
|---|---|
| 05 Contenido | Límites de longitud por elemento tipográfico |
| 06 Módulo de venta | Anatomía de `ExperienceCard`, `ExperienceDetail` y jerarquía de CTAs |
| 07 Accesibilidad | Los tres problemas identificados: contraste del eyebrow, targets de 36 px, `scale` en hover |
| 09 Rendimiento | El `PageHero` como LCP y sus correcciones |

---

## 15. Compuerta hacia el spec 05

Nada se marca por estar escrito. Se marca al verificarse contra el código en ejecución.

| | Punto | Cómo se rectifica |
|---|---|---|
| ☐ | Cero colores crudos en `src/` fuera de `ui/` | Los dos comandos `rg` de §3.3 |
| ☐ | `size="icon"` medido: confirmar 36×36 px en el navegador | `getBoundingClientRect()` sobre los botones del header |
| ☐ | Contraste del eyebrow medido en claro y oscuro | Herramienta de contraste sobre `text-primary` a 12 px |
| ☐ | Conflicto `h-[62vh]` / `size-full` reproducido en móvil | Redimensionar con la barra del navegador visible |
| ☐ | Desalineación del grid de equipo reproducida a 1024 px | `browser_resize` a 1024 px |
| ☐ | `card-premium` con `scale` bajo `prefers-reduced-motion` | Emular la preferencia y hacer hover |
| ☐ | Tokens nuevos (`success`, `whatsapp`, duraciones) añadidos y expuestos | Revisión de `src/styles.css` |
| ☐ | Tamaño de `h3` unificado en las cards | `rg -n "text-lg\|text-xl" src/components/cards/` |

**Estado de la compuerta: CERRADA.** Se abre hacia el spec 05 cuando los ocho puntos estén verificados en ejecución.
