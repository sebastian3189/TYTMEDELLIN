ARCHIVADO
name: tt-design-system
description: Sistema de diseño del proyecto — tokens semánticos, tipografía, primitivas de sección, cards y botones. Úsala antes de escribir cualquier JSX o CSS, o cuando dudes de qué clase corresponde a un color, un radio o una sombra. Consulta los Specs 02 y 05 para los valores vigentes.
---

# Skill — Design system

## 1. Tokens semánticos

El proyecto usa Tailwind CSS v4 (CSS-first, sin `tailwind.config.js`). Los tokens se definen en `src/styles.css` con `@theme inline` y variables `oklch`.

**Nunca colores crudos.** Siempre tokens semánticos. Consulta
[`SPECS/02_spec_identidad_marca_direccion_creativa.md`](../../SPECS/02_spec_identidad_marca_direccion_creativa.md)
y [`SPECS/05_spec_design_system.md`](../../SPECS/05_spec_design_system.md).

Tokens comunes:

| Clase Tailwind | Para qué |
|---|---|
| `bg-background` / `text-foreground` | Fondo y texto principal |
| `bg-surface` / `text-surface-foreground` | Fondo alterno de sección |
| `bg-primary` / `text-primary` | Color de acento (CTAs, badges, iconos) |
| `bg-ink` / `text-ink-foreground` | Bloques oscuros institucionales |
| `bg-card` | Fondo de tarjeta |
| `text-muted-foreground` | Texto secundario |
| `border-border` | Bordes |

## 2. Tipografía

Las fuentes vigentes son Montserrat para display e Inter para cuerpo. Patrón general:

- **Display:** headings `h1`–`h4`, peso 700, `line-height: 1.3`
- **Sans:** cuerpo, peso 400, `line-height: 1.6`
- Se cargan desde Google Fonts con `preconnect` en `__root.tsx`.

## 3. Primitivas de layout — úsalas siempre

| Componente | Uso |
|---|---|
| `<Section tone="background \| surface \| ink">` | Envoltura de sección: padding, `max-w-7xl`, fondo alterno |
| `<SectionHeading eyebrow title subtitle center>` | Eyebrow en color de acento + `h2` + subtítulo |
| `<PageHero title subtitle image compact>` | Hero con imagen, overlay y el único `h1` de la página |

## 4. Cards

Clase `card-premium`: radio, sombra, hover con `scale(1.02)`. Con borde: `border border-border/60`.

## 5. Botones

Siempre **píldora**: `rounded-full px-8 py-3`.
- Primario: `bg-primary text-primary-foreground`
- Secundario: variante outline
- Con enlace: `<Button asChild>` envolviendo `<Link>` o `<a>`

## 6. Grids responsive

```tsx
<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

**Siempre** incluir `grid-cols-1` explícito. Sin `grid-cols-1`, en ciertos navegadores las cards con `width`/`height` en imágenes colapsan a 0 px de alto en móvil.

## 7. Alternancia de fondos

Las secciones alternan: `background` → `surface` → `background`. Los bloques institucionales usan `ink`. Nunca dos secciones seguidas con el mismo fondo.

## 8. Dark mode

Existe paleta `.dark` con los mismos tokens. Toda pantalla nueva debe verse bien en ambos modos. Verificar contraste de texto sobre fondos con opacidad.
