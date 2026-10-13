ARCHIVADO
name: tt-qa-checklist
description: Checklist de entrega — la definición de terminado que se ejecuta antes de cerrar cualquier historia o publicar. Cubre build, rutas, responsive, temas, idiomas, interacciones, SEO, seguridad y rendimiento. Úsala al final de toda tarea. Consulta CLAUDE1.MD para las rutas específicas del proyecto.
---

# Skill — QA Checklist

## 1. Build

```bash
npm run lint    # sin errores nuevos
npm run build   # debe pasar
```

Si `lint` tiene errores preexistentes, documenta la línea base y verifica que no haya errores nuevos.

## 2. Rutas

Visita **todas las URLs** del proyecto (consulta `CLAUDE1.MD` §5 para el mapa completo).

En cada una:
- La página carga sin errores de consola.
- El contenido es el esperado.
- No hay texto de placeholder visible ("Lorem ipsum", `TODO`, `xxx`).

## 3. Responsive — bloqueante

Anchos: **320 · 360 · 390 · 768 · 1024 · 1280 · 1440 · 1920** px.

Script de verificación de desborde:
```js
() => ({
  desborde: document.body.scrollWidth > document.documentElement.clientWidth,
  ancho: document.documentElement.clientWidth
})
```

Cualquier `desborde: true` **bloquea la entrega**.

Verificar además:
- [ ] Grids degradan correctamente (4 → 2 → 1 columnas)
- [ ] Targets táctiles ≥ 44×44 px
- [ ] Inputs con fuente ≥ 16 px (evitar zoom en iOS)
- [ ] Sin scroll horizontal en ningún ancho

## 4. Temas e idiomas

Las 4 combinaciones: claro/ES · claro/EN · oscuro/ES · oscuro/EN.

- [ ] Contraste de texto correcto en ambos temas
- [ ] Todo el texto cambia al cambiar idioma
- [ ] Toggle de tema persiste al recargar
- [ ] Toggle de idioma persiste al recargar

## 5. Interacciones

- [ ] Menú móvil abre y cierra
- [ ] Formularios: envío vacío muestra errores, envío válido muestra feedback
- [ ] Enlaces externos abren en pestaña nueva (`target="_blank"`)
- [ ] CTAs de conversión funcionan (WhatsApp, formularios, etc.)

## 6. Accesibilidad

- [ ] Un solo `<h1>` por página
- [ ] Navegación por teclado funcional (Tab, Enter, Escape)
- [ ] `aria-label` en elementos interactivos sin texto visible
- [ ] Imágenes con `alt` descriptivo

## 7. SEO

- [ ] `head()` con `title` y `description` únicos por ruta
- [ ] `title` ≤ 60 caracteres
- [ ] `description` ≤ 155 caracteres
- [ ] Sin `title` duplicados entre páginas

## 8. Rendimiento

- [ ] Sin imágenes oversized (`w=2940` en cards)
- [ ] `loading="lazy"` en imágenes fuera del hero
- [ ] Sin dependencias grandes importadas accidentalmente

## 9. Seguridad

- [ ] Enlaces externos con `rel="noopener noreferrer"`
- [ ] `iframe` con `sandbox` y `referrerpolicy`
- [ ] Sin datos sensibles expuestos en el código fuente

## 10. Repositorio

- [ ] `git status` no muestra archivos inesperados
- [ ] Sin secretos en archivos committeados (`.env`, tokens)
- [ ] Sin `console.log` de depuración
