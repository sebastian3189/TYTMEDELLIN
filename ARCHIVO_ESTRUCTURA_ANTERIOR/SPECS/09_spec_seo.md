# ARCHIVADO — Spec 09 anterior

## Objetivo

Captar demanda relevante de transporte, traslados, experiencias y servicios
corporativos en Medellín sin crear páginas geográficas fuera del alcance real.

## Estrategia

- Inicio: marca y propuesta general local.
- Servicios: una página indexable por servicio con demanda y contenido suficiente.
- Experiencias: una página por experiencia vigente y operada desde Medellín.
- Flota: capacidad operativa, no listado artificial de palabras clave.
- Nosotros y contacto: confianza, entidad y consistencia de datos.

La investigación de palabras clave se valida con datos reales antes de fijar títulos,
slugs o nuevas páginas. No se crean páginas duplicadas para barrios o municipios sin
contenido y cobertura diferenciados.

## Requisitos por URL

- `title` y descripción únicos.
- Canonical absoluto al dominio de producción.
- Un `h1` coherente con la intención.
- Open Graph y tarjeta social con imagen real.
- Breadcrumb visible y `BreadcrumbList` en niveles internos.
- Enlaces internos descriptivos.
- 404 real; redirecciones solo entre equivalentes.

## Datos estructurados

- `Organization` y tipo local adecuado con datos legales confirmados.
- `Service` en servicios.
- Tipo turístico apropiado en experiencias solo cuando aplique.
- `FAQPage` únicamente si las preguntas son visibles.
- Dirección, teléfono, horarios, precio y reseñas nunca se inventan.

## Técnico

`robots.txt`, sitemap con solo URLs canónicas indexables, imágenes optimizadas,
contenido disponible en HTML indexable y ausencia de enlaces rotos. Si la aplicación
usa renderizado cliente, se debe comprobar que los buscadores reciben metadatos y
contenido; de no ser así, se habilita prerenderizado o SSR antes de publicar.

## SEO local

Nombre, dirección y teléfono deben coincidir con los perfiles oficiales. La ficha de
negocio, si existe, enlaza al dominio final y utiliza categorías y horario reales.

## Aceptación

Cada URL del sitemap responde 200, tiene canonical propio, metadatos únicos y schema
válido sin advertencias derivadas de datos falsos. No existe ninguna página orientada
a un mercado distinto de Medellín.

