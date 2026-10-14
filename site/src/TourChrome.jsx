import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GlassPill, useGlassPill } from './glass';
import { useLightMotion } from './PremiumMotion';
import Arrow from './Arrow';
import { clamp } from './hand-geometria';
import './tour-motion.css';

/*
 * Cromo de la ficha — Spec 03 §M3.3 (pestañas de vidrio con indicador y barra de avance), §M1 (ruta con punto naranja hasta «Cotizar») y §M6 (un solo
 * `IntersectionObserver` de entradas). Todo decorativo es aria-hidden; solo transform/opacity/stroke-dashoffset; «Cotizar» no se mueve de su sitio.
 */
const TABS = [['#esencia', 'La experiencia', 0], ['#fotos', 'Fotografías', 1], ['#preparar', 'Antes de viajar', 2], ['#consulta', 'Cotizar', 3]];

/** Pestañas pegajosas: píldora de vidrio, opción activa sólida que viaja (useGlassPill), activa por scroll (IO) y barra de avance con punto naranja. */
export function TourNav() {
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
    let raf = 0;
    const update = () => { raf = 0; const end = document.getElementById('consulta'); if (!end) return; const start = sentinel.current.getBoundingClientRect().top + scrollY, stop = end.getBoundingClientRect().top + scrollY; bar.current?.style.setProperty('--tp', clamp((scrollY + innerHeight * 0.5 - start) / Math.max(1, stop - start)).toFixed(4)); };
    const kick = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick, { passive: true }); update();
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', kick); removeEventListener('resize', kick); };
  }, [light]);
  return (
    <>
      <i ref={sentinel} className="tn-sentinel" aria-hidden="true" />
      <nav className="tour-nav tn" data-stuck={stuck} aria-label="En esta experiencia">
        <div ref={box} className="glass-tabs tn-pill">
          <GlassPill />
          {TABS.map(([href, label, i]) => <a key={href} href={href} aria-current={active === i ? 'location' : undefined}>{label}{i === 3 && <> <Arrow /></>}</a>)}
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
    let raf = 0, top = 0, len = 1;
    const measure = () => {
      const nav = document.querySelector('.tn'), end = document.getElementById('consulta'); if (!nav || !end) return;
      const pr = page.getBoundingClientRect(); top = nav.getBoundingClientRect().bottom - pr.top + (nav.offsetHeight ? 0 : 0); len = Math.max(1, end.getBoundingClientRect().top - pr.top - top);
      route.style.top = `${top}px`; route.style.height = `${len}px`;
    };
    const update = () => {
      raf = 0; const pr = page.getBoundingClientRect(), p = light ? 1 : clamp((innerHeight * 0.55 - (pr.top + top)) / len);
      route.style.setProperty('--rp', p.toFixed(4)); route.dataset.end = p > 0.995 ? 'true' : 'false';
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(update); };
    const ro = new ResizeObserver(() => { measure(); kick(); }); ro.observe(page);
    document.fonts?.ready.then(() => { measure(); kick(); });
    measure(); update();
    if (!light) { addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick, { passive: true }); }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('scroll', kick); removeEventListener('resize', kick); };
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
