ARCHIVADO
name: tt-nueva-pagina
description: Receta para crear una ruta nueva con TanStack Router — archivo en src/routes, createFileRoute, head() con metadatos, alta en la navegación y regeneración del routeTree. Úsala al añadir cualquier página o subruta.
---

# Skill — Nueva página

## 1. Convención de archivos

TanStack Router usa enrutamiento por archivos. El nombre del archivo **es** la URL:

| Archivo | URL |
|---|---|
| `src/routes/index.tsx` | `/` |
| `src/routes/contacto.tsx` | `/contacto` |
| `src/routes/productos.index.tsx` | `/productos` |
| `src/routes/productos.$slug.tsx` | `/productos/:slug` |

## 2. Plantilla base

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "~/components/Section";
import { useI18n } from "~/i18n";

export const Route = createFileRoute("/mi-pagina")({
  head: () => ({
    meta: [
      { title: "Título de la página | Nombre del sitio" },
      { name: "description", content: "Descripción ≤ 155 caracteres." },
      { property: "og:title", content: "Título de la página" },
      { property: "og:description", content: "Descripción para redes sociales." },
    ],
  }),
  component: MiPagina,
});

function MiPagina() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        title={t(copy.miPaginaTitle)}
        subtitle={t(copy.miPaginaSubtitle)}
        image="/img/mi-imagen.webp"
      />
      <Section tone="surface">
        <SectionHeading
          eyebrow={t(ui.nav.miPagina)}
          title={t(copy.seccion1Title)}
          subtitle={t(copy.seccion1Subtitle)}
        />
        {/* Contenido */}
      </Section>
    </>
  );
}
```

## 3. Metadatos obligatorios

| Meta | Regla |
|---|---|
| `title` | ≤ 60 caracteres, único por página |
| `description` | ≤ 155 caracteres, único por página |
| `og:title` | Igual o similar al `title` |
| `og:description` | Igual o similar al `description` |

Consulta el spec de SEO para las palabras clave asignadas a cada página.

## 4. Alta en la navegación

Agregar la ruta al array `navLinks` en el archivo de UI (`src/data/ui.ts` o equivalente):

```ts
{ to: "/mi-pagina", label: { es: "Mi Página", en: "My Page" } },
```

Header y footer consumen este array automáticamente.

## 5. `routeTree.gen.ts`

**No editar a mano.** Se regenera automáticamente al ejecutar `dev` o `build`. Si la ruta nueva no aparece, reiniciar el servidor de desarrollo.

## 6. Checklist

- [ ] Archivo en `src/routes/` con el nombre correcto
- [ ] `head()` con `title`, `description`, `og:title`, `og:description` únicos
- [ ] Un solo `<h1>` (lo pone `PageHero`)
- [ ] Todo el texto con `t()` y objetos `L`
- [ ] Alta en `navLinks`
- [ ] `npm run dev` regeneró `routeTree.gen.ts` sin errores
- [ ] Responsive verificado en móvil
- [ ] Dark mode verificado
