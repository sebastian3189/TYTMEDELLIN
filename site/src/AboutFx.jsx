import { useLayoutEffect } from 'react';
import { Picture } from './shared';
import './about-fx.css';

/*
 * Movimiento de /nosotros (ronda 3): fotos que entran como cartas (giro leve + escalonado), línea de tiempo que se dibuja y hitos que se encienden, tarjetas de valores
 * que suben escalonadas y parallax suave de la foto del equipo. El manifiesto palabra por palabra ya existe (Manifesto). No hay cifras reales: no hay contadores (PENDIENTE CLIENTE).
 * Solo transform/opacity; IntersectionObserver; con movimiento reducido no se añade ninguna clase (todo queda estático y visible).
 */
export default function AboutFx() {
  useLayoutEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    const root = document.querySelector('main'); if (!root) return undefined;
    const groups = [
      ['.ac-card', 'card'], ['.timeline', 'line'], ['.timeline article', 'rise'], ['.values-grid article', 'rise'], ['.gallery-main, .gallery-feature', 'card'],
    ];
    const els = [];
    groups.forEach(([sel, kind]) => root.querySelectorAll(sel).forEach((el, i) => { el.classList.add('afx', `afx-${kind}`); el.style.setProperty('--afx-i', String(i % 6)); els.push(el); }));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('afx-in'); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    // Parallax por profundidad del collage: cada carta se mueve a distinta velocidad (una lectura por cuadro de scroll; solo escritorio).
    const cards = [...root.querySelectorAll('.ac-card')]; let raf = 0;
    const tick = () => { raf = 0; if (innerWidth < 700) return; for (const c of cards) { const r = c.getBoundingClientRect(), k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; c.style.setProperty('--afx-py', `${(k * -Number(c.dataset.depth || 20)).toFixed(1)}px`); } };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    if (cards.length) { window.addEventListener('scroll', onScroll, { passive: true }); tick(); }
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); els.forEach((el) => { el.classList.remove('afx', 'afx-card', 'afx-line', 'afx-rise', 'afx-in'); el.style.removeProperty('--afx-i'); }); cards.forEach((c) => c.style.removeProperty('--afx-py')); };
  }, []);
  return null;
}

/* Collage de postales (pedido del usuario, ronda 3): retrato 4:5 y paisaje 3:2 con marco postal, sombra suave, giros distintos y profundidad; sin texto sobre las fotos.
   Escritorio: cartas superpuestas con parallax; móvil: carrusel horizontal con snap. `items` = fotos oficiales (media.json). */
const LAYOUT = [
  { l: 0, t: 9, w: 52, r: -2.4, d: 14 }, { l: 46, t: 0, w: 22, r: 3.6, d: 34 }, { l: 66, t: 25, w: 20, r: -3.2, d: 22 }, { l: 82, t: 2, w: 18, r: 5, d: 44 },
];
export function AboutCollage({ items, alt }) {
  return (
    <section className="about-collage wrap" aria-label={alt}>
      <div className="ac-wrap">
        {items.slice(0, LAYOUT.length).map((p, i) => {
          const L = LAYOUT[i];
          return (
            <figure className="ac-card" key={p.src} data-depth={L.d} style={{ '--l': `${L.l}%`, '--t': `${L.t}%`, '--w': `${L.w}%`, '--r': `${L.r}deg`, '--z': i === 0 ? 1 : 2 + i }}>
              <Picture photo={p} alt={p.alt || alt} priority={i === 0} sizes="(max-width: 699px) 70vw, 30vw" />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
