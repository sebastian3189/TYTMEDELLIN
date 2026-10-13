ARCHIVADO
name: tt-seo-metadatos
description: Receta para los metadatos y datos estructurados de cada ruta — head() de TanStack Router, títulos y descripciones con longitud correcta, Open Graph, canonical y JSON-LD de Schema.org. Úsala al crear o revisar cualquier página. Consulta CLAUDE1.MD para las keywords y Schema types del proyecto.
---

# Skill — SEO y metadatos

## 1. Metadatos por ruta

Cada ruta declara sus metadatos en `head()`:

```tsx
export const Route = createFileRoute("/mi-pagina")({
  head: () => ({
    meta: [
      { title: "Título único | Nombre del sitio" },
      { name: "description", content: "Descripción única ≤ 155 caracteres." },
      { property: "og:title", content: "Título para redes sociales" },
      { property: "og:description", content: "Descripción para redes sociales." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://dominio.com/mi-pagina" },
    ],
  }),
  component: MiPagina,
});
```

## 2. Longitudes

| Meta | Límite | Qué pasa si se pasa |
|---|---|---|
| `title` | ≤ 60 caracteres | Google trunca con "…" |
| `description` | ≤ 155 caracteres | Se corta en el snippet |
| `og:title` | ≤ 60 caracteres | Se corta en redes |
| `og:description` | ≤ 155 caracteres | Se corta en redes |

## 3. Reglas de contenido

- **Cada ruta tiene un `title` y `description` únicos.** Sin duplicados.
- **El `title` incluye la keyword principal** de forma natural, no forzada.
- **El `description` no repite el `title`.** Es un resumen independiente que invita al clic.
- **Patrón recomendado:** `Keyword o título de página | Nombre del sitio`

## 4. Open Graph

Mínimo para que las previews en redes sociales funcionen:

```tsx
{ property: "og:title", content: "..." },
{ property: "og:description", content: "..." },
{ property: "og:type", content: "website" },
{ property: "og:url", content: "https://dominio.com/pagina" },
{ property: "og:image", content: "https://dominio.com/og-image.jpg" },
```

## 5. Datos estructurados — JSON-LD

Consulta `CLAUDE1.MD` para el tipo de negocio y los Schema.org types apropiados.

### Schema types comunes

| Tipo de página | Schema.org |
|---|---|
| Home / corporativa | `Organization` |
| Sucursal / sede | `LocalBusiness` |
| Producto / servicio | `Product`, `Service`, `Offer` |
| Artículo / blog | `Article`, `BlogPosting` |
| Contacto | `ContactPage` |
| Breadcrumbs | `BreadcrumbList` |
| FAQ | `FAQPage` |

Ejemplo base:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nombre del negocio",
  "url": "https://dominio.com",
  "logo": "https://dominio.com/logo.png"
}
</script>
```

## 6. Internacionalización

Si el proyecto tiene toggle de idioma pero una sola URL, solo se indexa el idioma del HTML. Para indexar ambos idiomas:
- Rutas separadas (`/`, `/en/`) con `hreflang` recíproco.
- O aceptar que solo el idioma por defecto se indexa.

Documentar la decisión, no asumirla.

## 7. Anti-canibalización

- **Una intención por URL.** Si dos páginas compiten por la misma keyword, una debe ceder.
- Coordinar con `arquitecto-informacion` para evitar páginas con propósito solapado.

## 8. Checklist

- [ ] `title` ≤ 60 caracteres, único por ruta
- [ ] `description` ≤ 155 caracteres, único por ruta
- [ ] `og:title` y `og:description` presentes
- [ ] `canonical` apuntando a la URL correcta
- [ ] JSON-LD válido (verificar en https://validator.schema.org)
- [ ] Sin `title` duplicados entre páginas
