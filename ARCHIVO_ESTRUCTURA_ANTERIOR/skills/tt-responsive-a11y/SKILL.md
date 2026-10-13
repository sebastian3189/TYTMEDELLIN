ARCHIVADO
name: tt-responsive-a11y
description: Reglas y método de verificación de responsive 100 % y accesibilidad AA — matriz de anchos 320 a 1920 px, detección de desbordes, targets táctiles, contraste, foco y navegación por teclado. Úsala antes de dar por terminada cualquier pantalla.
---

# Skill — Responsive y accesibilidad AA

## 1. Matriz de anchos — no negociable

| Ancho (px) | Dispositivo típico |
|---|---|
| **320** | iPhone SE, Android compacto |
| **360** | Android mayoritario |
| **390** | iPhone 14/15 |
| **768** | iPad vertical |
| **1024** | iPad horizontal, laptops pequeños |
| **1280** | Laptops |
| **1440** | Monitores estándar |
| **1920** | Monitores grandes |

Verificar **todas** las pantallas nuevas en estos 8 anchos.

## 2. Detección de desbordes

```js
() => {
  const w = document.documentElement.clientWidth;
  const overflows = [...document.querySelectorAll('*')]
    .filter(e => e.getBoundingClientRect().right > w + 1)
    .slice(0, 10)
    .map(e => `${e.tagName}.${e.className?.toString().slice(0,60) || ''}`);
  return { desborde: document.body.scrollWidth > w, elementos: overflows };
}
```

**Cero scroll horizontal.** Si `desborde: true`, la entrega se bloquea.

## 3. Reglas de responsive

- **Grids degradan:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (o `lg:grid-cols-4`). Siempre incluir `grid-cols-1` explícito.
- **Sin anchos fijos en px** (excepto `max-w-7xl` del contenedor). Ni `min-w-[400px]` ni `w-[600px]`.
- **Tablas:** siempre en contenedor `overflow-x-auto`.
- **Imágenes:** `max-w-full h-auto` o `w-full h-auto object-cover`.
- **Heroes:** usar `dvh` en vez de `vh` para que no salte con la barra del navegador en móvil.
- **Elementos flotantes** (FAB de WhatsApp, modales) no deben tapar CTAs ni el footer.

## 4. Targets táctiles

Mínimo **44 × 44 px** para todo elemento interactivo:
- Botones de icono del header
- Flechas de carrusel
- Links del footer
- Checkbox y radio buttons

## 5. Inputs

Fuente **≥ 16 px** en todos los inputs. Si la fuente es menor, iOS hace zoom automático al enfocar el campo.

## 6. Accesibilidad — WCAG AA

### Contraste
- Texto normal: **≥ 4.5:1**
- Texto grande (≥ 18px bold o ≥ 24px): **≥ 3:1**
- Verificar en modo claro **y** oscuro.

### Navegación por teclado
- **Tab** recorre todos los elementos interactivos en orden lógico.
- **Enter** / **Space** activan el elemento enfocado.
- **Escape** cierra modales y menús.
- El foco es **visible** (outline) en todo momento. No usar `outline-none` sin reemplazo.

### Semántica
- Un solo `<h1>` por página.
- Jerarquía de headings sin saltos (h1 → h2 → h3, no h1 → h3).
- `<nav>`, `<main>`, `<footer>` como landmarks.
- `<button>` para acciones, `<a>` para navegación.

### Movimiento
- Respetar `prefers-reduced-motion`: desactivar animaciones automáticas si el usuario lo pide.
- Carruseles con pausa en hover y botón de pausa visible.

### Errores
- Mensajes de error con `role="alert"` para lectores de pantalla.
- Inputs con error: `aria-invalid="true"` + `aria-describedby` apuntando al mensaje.

## 7. Checklist rápido

- [ ] 8 anchos verificados sin desborde
- [ ] Grids con `grid-cols-1` explícito
- [ ] Targets táctiles ≥ 44 px
- [ ] Inputs ≥ 16 px
- [ ] Contraste ≥ 4.5:1 en ambos temas
- [ ] Navegación por teclado funcional
- [ ] Un solo `<h1>` por página
- [ ] `prefers-reduced-motion` respetada
