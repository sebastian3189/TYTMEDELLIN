# ARCHIVADO — Spec 04 anterior

## Mapa de la primera versión

```text
/
├── /servicios
│   └── /servicios/{slug}
├── /experiencias
│   └── /experiencias/{slug}
├── /flota
├── /nosotros
├── /cotizar
├── /contacto
└── /privacidad
```

Medellín es el contexto permanente de todo el producto y no se presenta como una
opción dentro de un selector geográfico.

## Navegación principal

Inicio · Servicios · Experiencias · Flota · Nosotros · Contacto · **Cotizar**

En móvil, el CTA Cotizar permanece visible en el menú. WhatsApp es una alternativa,
no un sustituto de la navegación ni del formulario.

## Flujos críticos

```text
Entrada → servicio o experiencia → detalle → cotizar → confirmación
Entrada → inicio → señal de confianza → oferta → WhatsApp contextual
Entrada corporativa → servicios → capacidad → solicitud de propuesta
```

## Modelo conceptual

- `Servicio`: nombre, slug, resumen, problema que resuelve, beneficios, cobertura,
  requisitos, imágenes, preguntas frecuentes y CTA.
- `Experiencia`: nombre, slug, resumen, duración, incluye, no incluye, punto de
  encuentro, recomendaciones, galería, disponibilidad declarativa y CTA.
- `Vehiculo`: categoría, capacidad, equipamiento, usos, accesibilidad e imágenes.
- `Testimonio`: autor autorizado, contexto, texto y fuente.
- `DatoEmpresa`: contacto, horario, dirección, datos legales y redes.

Los campos no confirmados no se renderizan. La interfaz nunca muestra etiquetas
vacías ni valores provisionales como si fueran reales.

## Reglas de URL

- Minúsculas, palabras separadas por guiones y sin parámetros para contenido estable.
- Un único URL canónico por contenido.
- Slugs aprobados antes de indexar.
- Una ruta inexistente entrega 404 real con opciones de recuperación.
- La versión inicial se publica en español. Otro idioma requerirá URLs propias y un
  alcance aprobado; no se añade un interruptor visual sin arquitectura indexable.

## Aceptación

Una persona puede llegar desde cualquier página a una cotización contextual sin
atravesar categorías geográficas ni perder el servicio o experiencia de interés.

