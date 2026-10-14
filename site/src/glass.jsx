import { useLayoutEffect } from 'react';

/*
 * Selector de «vidrio líquido» (pedido del usuario 2026-10-14): la opción activa es una píldora sólida que se desplaza (FLIP: se mide la caja nueva y la
 * píldora viaja con transform/width) entre las opciones. La píldora es decorativa (aria-hidden); la opción activa se marca con aria-pressed / aria-selected.
 */
export const GlassPill = () => <span className="glass-pill" aria-hidden="true" />;
export function useGlassPill(ref, signal, enabled = true) {
  useLayoutEffect(() => {
    const box = ref.current;
    if (!enabled || !box) return undefined;
    const place = () => {
      const el = box.querySelector('[aria-pressed="true"],[aria-selected="true"]');
      if (!el) return;
      box.style.setProperty('--px', `${el.offsetLeft}px`); box.style.setProperty('--py', `${el.offsetTop}px`);
      box.style.setProperty('--pw', `${el.offsetWidth}px`); box.style.setProperty('--ph', `${el.offsetHeight}px`);
      if (!box.classList.contains('is-ready')) requestAnimationFrame(() => box.classList.add('is-ready')); // sin viaje en la primera colocación
    };
    place(); document.fonts?.ready.then(place);
    const ro = new ResizeObserver(place); ro.observe(box);
    return () => ro.disconnect();
  }, [ref, signal, enabled]);
}
