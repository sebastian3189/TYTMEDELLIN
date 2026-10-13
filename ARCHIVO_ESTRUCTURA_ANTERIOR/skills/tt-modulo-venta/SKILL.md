ARCHIVADO
name: tt-modulo-venta
description: Recetas del módulo de conversión — páginas transaccionales con catálogo de productos/servicios, ficha de detalle, paquete/carrito y construcción del enlace de cotización por WhatsApp u otro canal. Úsala al trabajar páginas de venta o cualquier flujo de conversión. Consulta CLAUDE1.MD para las páginas transaccionales del proyecto.
---

# Skill — Módulo de venta / conversión

## 1. Qué páginas son transaccionales

Consulta `CLAUDE1.MD` §1 para saber cuáles páginas del proyecto son de venta/conversión. Solo esas páginas llevan CTAs de reserva, cotización o contacto comercial directo.

Las páginas institucionales (home, historia, equipo, valores) **no llevan CTAs de venta directa**.

## 2. Estructura de una entidad de producto/servicio

Consulta los archivos de datos del proyecto para los tipos exactos. Patrón general:

```ts
type Producto = {
  slug: string;
  name: L;
  description: L;
  image: string;
  duration?: L;
  highlights?: L[];
  includes?: L[];
  excludes?: L[];
  meetingPoint?: L;
};
```

## 3. Enlace de cotización por WhatsApp

```ts
function buildWhatsAppLink(phone: string, items: Producto[], lang: "es" | "en"): string {
  const greeting = lang === "es"
    ? "Hola, me interesa cotizar:"
    : "Hi, I'd like a quote for:";
  const list = items.map(p => `- ${p.name[lang]}`).join("\n");
  const text = encodeURIComponent(`${greeting}\n${list}`);
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${text}`;
}
```

- El número viene de los datos de contacto del proyecto (`CLAUDE1.MD` §7).
- **No inventes números de WhatsApp.** Si no los tienes, usa `TODO(cliente)`.

## 4. Paquete / carrito

Si el proyecto necesita que el usuario acumule varios items antes de cotizar:

- Guardar en `localStorage` con clave específica del proyecto.
- Persistir entre recargas.
- Mostrar contador en el header o botón flotante.
- Al cotizar, generar un solo mensaje con todos los items.

## 5. Principios de conversión

- **Un CTA primario por pantalla.** Los demás son secundarios.
- **Sin precios hasta que el cliente los confirme.** Usar "cotizar" mientras no haya tarifario.
- **Transparencia operativa:** datos concretos convierten más que adjetivos.
- **Nada de patrones oscuros:** falsa urgencia, contadores inventados, casillas premarcadas. Prohibidos.
- **Móvil primero.** El botón de conversión debe ser alcanzable con el pulgar.

## 6. Datos personales

Si el flujo de conversión captura datos personales (nombre, teléfono) antes de redirigir a WhatsApp u otro canal, es obligatorio:
- Casilla de autorización de datos (ver skill `tt-formularios-seguros`).
- Enlace a política de privacidad.
