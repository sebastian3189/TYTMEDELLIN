/*
 * Planificador ÚNICO de scroll (Spec 03 §M6, ronda usuario 2026-10-14): un solo `scroll` pasivo y un solo requestAnimationFrame para todos los efectos de
 * una página. Cada efecto se registra con `watchScroll`:
 *   - `measure()` lee layout (posiciones como coordenadas de documento) SOLO al registrarse, al llegar a la vista y al cambiar el tamaño del documento;
 *   - `update(y, vh)` se llama una vez por cuadro, solo mientras el elemento está cerca de la vista (IntersectionObserver), y SOLO escribe (`style`);
 *   - todas las lecturas de un cuadro van antes de todas las escrituras: nunca hay layout forzado dentro del scroll.
 * Los efectos fuera de vista no cuestan nada; con la pestaña oculta no corre nada.
 */
const subs = new Set();
let raf = 0, bound = false, dirty = false, lastY = -1, lastVH = -1, ro = null;

const frame = () => {
  raf = 0;
  if (document.hidden) return;
  const y = window.scrollY, vh = window.innerHeight, force = vh !== lastVH;
  let measured = false;
  for (const s of subs) if (s.on && (s.needsMeasure || dirty)) { s.measure?.(); s.needsMeasure = false; measured = true; }
  dirty = false;
  if (y === lastY && !force && !measured) { for (const s of subs) if (s.on && s.fresh) { s.update(y, vh); s.fresh = false; } return; }
  lastY = y; lastVH = vh;
  for (const s of subs) if (s.on) { s.update(y, vh); s.fresh = false; }
};
const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
const onResize = () => { dirty = true; kick(); };
const bind = () => {
  if (bound) return; bound = true;
  window.addEventListener('scroll', kick, { passive: true }); window.addEventListener('resize', onResize); document.addEventListener('visibilitychange', kick);
  ro = new ResizeObserver(onResize); ro.observe(document.body);
  document.fonts?.ready.then(onResize);
};
const unbind = () => {
  if (!bound || subs.size) return; bound = false;
  window.removeEventListener('scroll', kick); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', kick);
  ro?.disconnect(); ro = null; cancelAnimationFrame(raf); raf = 0; lastY = -1;
};

/** `el`: elemento que gobierna la visibilidad (o null = siempre activo); `margin`: px extra alrededor de la ventana. Devuelve la función que desregistra. */
export function watchScroll({ el = null, margin = 240, measure, update }) {
  const s = { on: !el, needsMeasure: true, fresh: true, measure, update };
  subs.add(s); bind();
  let io = null;
  if (el) { io = new IntersectionObserver(([e]) => { const on = e.isIntersecting; if (on && !s.on) { s.needsMeasure = true; s.fresh = true; } s.on = on; if (on) { lastY = -1; kick(); } }, { rootMargin: `${margin}px 0px` }); io.observe(el); }
  lastY = -1; kick();
  return () => { io?.disconnect(); subs.delete(s); unbind(); };
}

/** Coordenada de documento del borde superior de un elemento (lectura de layout: solo dentro de `measure`). */
export const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;
export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
