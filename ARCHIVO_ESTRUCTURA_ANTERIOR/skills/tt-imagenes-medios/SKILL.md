ARCHIVADO
name: tt-imagenes-medios
description: Receta de imágenes para el proyecto — anchos correctos según el uso, srcset y sizes, prevención de CLS, prioridad de carga del hero, alt descriptivo y bilingüe. Úsala cada vez que insertes o revises una imagen.
---

# Skill — Imágenes y medios

## 1. Anchos correctos según el uso

| Uso | Ancho | Ejemplo |
|---|---|---|
| Avatar / icono | `w=200` | Fotos de equipo circulares |
| Card / thumbnail | `w=800` | Tarjetas de producto/servicio |
| Medio bloque | `w=1200` | Imagen a media pantalla |
| Hero / full width | `w=2000` | Hero principal de página |

**Nunca `w=2940` para tarjetas.** Es la causa #1 de páginas lentas.

Si las imágenes vienen de un CDN como Unsplash, ajustar los parámetros de URL. Si son propias, servir en el tamaño correcto.

## 2. Formato

- **WebP** como formato principal (80-85% de calidad).
- Fallback a JPG/PNG si el pipeline no soporta WebP.
- Para iconos y gráficos: SVG.

## 3. Atributos obligatorios

```tsx
<img
  src="imagen.webp"
  alt={t(contenido.altTexto)}
  width={800}
  height={600}
  loading="lazy"
  className="w-full h-auto object-cover"
/>
```

| Atributo | Por qué |
|---|---|
| `width` + `height` | Reserva espacio → evita CLS (Cumulative Layout Shift) |
| `loading="lazy"` | No carga imágenes fuera de pantalla. **Excepto el hero**: ahí usar `fetchpriority="high"` |
| `alt` descriptivo | Accesibilidad + SEO. Como `L` si el texto es bilingüe |
| `object-cover` / `object-contain` | Controla el recorte |

## 4. Responsive con srcset

```tsx
<img
  srcSet="imagen-400.webp 400w, imagen-800.webp 800w, imagen-1200.webp 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="imagen-800.webp"
  alt={t(alt)}
  width={800}
  height={600}
  loading="lazy"
/>
```

## 5. Hero — caso especial

La imagen del hero es casi siempre el LCP (Largest Contentful Paint):

```tsx
<img
  src="hero.webp"
  alt={t(heroAlt)}
  width={2000}
  height={1000}
  fetchpriority="high"
  className="w-full h-auto object-cover"
/>
```

- **Sin** `loading="lazy"` — debe cargar inmediato.
- **Con** `fetchpriority="high"`.
- Precarga con `<link rel="preload" as="image" href="hero.webp">` en `head()` si es crítico.

## 6. Bug conocido: grid colapsa a 0 px

Si una imagen tiene `width`/`height` explícitos y el CSS define una altura fija (`h-64`), en ciertos navegadores el grid interpreta la relación de aspecto y colapsa a 0 px **cuando no hay `grid-cols-1` explícito**.

**Solución:** siempre declarar `grid-cols-1` como base:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

## 7. Checklist

- [ ] Ancho de imagen acorde al uso (no oversized)
- [ ] `width` y `height` explícitos
- [ ] `loading="lazy"` (excepto hero)
- [ ] `fetchpriority="high"` solo en el hero
- [ ] `alt` descriptivo y bilingüe
- [ ] Formato WebP donde sea posible
- [ ] `grid-cols-1` explícito en grids con imágenes
