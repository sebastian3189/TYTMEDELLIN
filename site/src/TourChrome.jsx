import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GlassPill, useGlassPill } from './glass';
import { useLightMotion } from './PremiumMotion';
import Arrow from './Arrow';
import { clamp } from './hand-geometria';
import { watchScroll, docTop } from './scroll-bus';
import './tour-motion.css';

/*
 * Cromo de la ficha — Spec 03 §M3.3 (pestañas de vidrio con indicador y barra de avance), §M1 (ruta con punto naranja hasta «Cotizar») y §M6 (un solo
 * `IntersectionObserver` de entradas). Todo decorativo es aria-hidden; solo transform/opacity/stroke-dashoffset; «Cotizar» no se mueve de su sitio.
 */
const TABS = [['#esencia', 'La experiencia', 0], ['#fotos', 'Fotografías', 1], ['#preparar', 'Antes de viajar', 2], ['#consulta', 'Cotizar', 3]];

/** Pestañas pegajosas: píldora de vidrio, opción activa sólida que viaja (useGlassPill), activa por scroll (IO) y barra de avance con punto naranja. */
export function TourNav({ sinFotos = false }) {
  const box = useRef(null), sentinel = useRef(null), bar = useRef(null);
  const [active, setActive] = useState(0), [stuck, setStuck] = useState(false);
  const light = useLightMotion();
  useGlassPill(box, active, true);
  useEffect(() => {
    const groups = [...document.querySelectorAll('[data-tn]')];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.tn)); }), { rootMargin: '-45% 0px -50% 0px' });
    groups.forEach((g) => io.observe(g));
    const st = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }); st.observe(sentinel.current);
    return () => { io.disconnect(); st.disconnect(); };
  }, []);
  // Progreso de la página (desde la pestaña hasta la cotización).
  useEffect(() => {
    if (light) { bar.current?.style.setProperty('--tp', '1'); return undefined; }
    // Planificador único (scroll-bus): las posiciones se miden una vez; en el scroll solo se escribe cuando el valor cambia (pasos de 0,2 %).
    let start = 0, end = 1, last = -1, bw = 0; const fill = bar.current?.firstElementChild, dot = bar.current?.lastElementChild;
    return watchScroll({
      measure: () => { const stop = document.getElementById('consulta'); if (stop && sentinel.current) { start = docTop(sentinel.current); end = docTop(stop); } bw = bar.current?.clientWidth || 0; last = -1; },
      update: (y, vh) => { const p = Math.round(clamp((y + vh * 0.5 - start) / Math.max(1, end - start)) * 500) / 500; if (p === last) return; last = p; if (fill) fill.style.transform = `scaleX(${p})`; if (dot) dot.style.transform = `translate3d(${(p * (bw - 6)).toFixed(1)}px,0,0)`; },
    });
  }, [light]);
  return (
    <>
      <i ref={sentinel} className="tn-sentinel" aria-hidden="true" />
      <nav className="tour-nav tn" data-stuck={stuck} aria-label="En esta experiencia">
        <div ref={box} className="glass-tabs tn-pill">
          <GlassPill />
          {TABS.filter(([href]) => !(sinFotos && href === '#fotos')).map(([href, label, i]) => <a key={href} href={href} aria-current={active === i ? 'location' : undefined}>{label}{i === 3 && <> <Arrow /></>}</a>)}
          <span ref={bar} className="tn-bar" aria-hidden="true"><b /><i /></span>
        </div>
      </nav>
    </>
  );
}

/** Ruta de la ficha: línea de tinta de 2 px en el margen izquierdo con punto naranja de 10 px que avanza hasta «Cotizar», donde se posa. */
export function TourRoute() {
  const el = useRef(null), light = useLightMotion();
  useLayoutEffect(() => {
    const route = el.current, page = route.parentElement;
    const done = route.querySelector('.tr-done'), dot = route.querySelector('.tr-dot');
    let pageTop = 0, top = 0, len = 1, last = -1;
    // Medidas una sola vez (y al cambiar el tamaño del documento); en el scroll solo transform, sin container queries ni lecturas de layout.
    const measure = () => {
      const sent = document.querySelector('.tn-sentinel'), nav = document.querySelector('.tn'), end = document.getElementById('consulta'); if (!sent || !nav || !end) return;
      pageTop = docTop(page); top = docTop(sent) + 1 + nav.offsetHeight - pageTop; len = Math.max(1, docTop(end) - pageTop - top);
      route.style.top = `${top}px`; route.style.height = `${len}px`; last = -1;
    };
    const paint = (p) => { done.style.transform = `scaleY(${p.toFixed(4)})`; dot.style.transform = `translate3d(0,${(p * (len - 10)).toFixed(1)}px,0)`; route.dataset.end = p > 0.995 ? 'true' : 'false'; };
    if (light) { measure(); route.style.setProperty('--rp', '1'); route.dataset.end = 'true'; const ro0 = new ResizeObserver(measure); ro0.observe(page); return () => ro0.disconnect(); }
    return watchScroll({ measure, update: (y, vh) => { const p = Math.round(clamp((y + vh * 0.55 - pageTop - top) / len) * 1000) / 1000; if (p === last) return; last = p; paint(p); } });
  }, [light]);
  return <div ref={el} className="tr-route" aria-hidden="true" data-end="false"><i className="tr-line" /><i className="tr-done" /><i className="tr-dot" /></div>;
}

/** Entradas únicas: un solo IntersectionObserver para todo `[data-tr]` de la ficha; lo oculto lo añade JS (`.tr-armed`) y solo con movimiento completo. */
export function useTourReveal(rootRef, slug) {
  const light = useLightMotion();
  useLayoutEffect(() => {
    const root = rootRef.current; if (!root) return undefined;
    if (light) { root.classList.remove('tr-armed'); return undefined; }
    root.classList.add('tr-armed');
    const els = [...root.querySelectorAll('[data-tr]')];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
    els.forEach((x) => io.observe(x));
    return () => { io.disconnect(); root.classList.remove('tr-armed'); els.forEach((x) => x.classList.remove('is-in')); };
  }, [rootRef, slug, light]);
}
