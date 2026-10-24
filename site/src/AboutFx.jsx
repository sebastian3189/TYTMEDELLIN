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
// 3 postales centradas (usuario, 2026-10-23): paisaje 4:3 a la izquierda y a la derecha, retrato 4:5 más grande en el centro y encima. `a` = proporción, `z` = capa.
const LAYOUT = [
  { l: 1, t: 24, w: 36, r: -3, d: 26, a: '4/3', z: 2 }, { l: 34.5, t: 6, w: 31, r: 1.2, d: 14, a: '4/5', z: 4 }, { l: 63, t: 18, w: 36, r: 3, d: 30, a: '4/3', z: 3 },
];
export function AboutCollage({ items, alt }) {
  return (
    <section className="about-collage wrap" aria-label={alt}>
      <div className="ac-wrap">
        {items.slice(0, LAYOUT.length).map((p, i) => {
          const L = LAYOUT[i];
          return (
            <figure className="ac-card" key={p.src} data-depth={L.d} style={{ '--l': `${L.l}%`, '--t': `${L.t}%`, '--w': `${L.w}%`, '--r': `${L.r}deg`, '--z': L.z, '--a': L.a }}>
              <Picture photo={p} alt={p.alt || alt} priority={i === 1} sizes="(max-width: 699px) 70vw, 36vw" />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
