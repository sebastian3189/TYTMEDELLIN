import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { company } from './company';
import reviews from './reviews.json';
import Arrow from './Arrow';

// Reseñas reales de Google tomadas LITERALMENTE de ResenasGoogle.tsx del sitio oficial (18, todas de 5 estrellas); sin resumir ni alterar.
// Cifras (5,0 · 265 en Google; Tripadvisor 5,0 · 5): ResenasExternas.tsx, verificadas por el cliente en septiembre de 2026.
const TRIPADVISOR = 'https://www.tripadvisor.es/Attraction_Review-g297478-d25190482-Reviews-Transporte_y_Turismo_Medellin-Medellin_Antioquia_Department.html';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Estrellas naranja decorativas (aria-hidden): la calificación va como texto («5.0», sr-only «de 5 estrellas»). Contorno tinta para contraste no textual ≥3:1 (Spec 03 §I).
const Stars = () => <span className="g-stars" aria-hidden="true">★★★★★</span>;

// Nombre + inicial del primer apellido («Narciso O.»); fuente Google. El texto de la reseña no se altera. La fecha no viene en los datos (PENDIENTE CLIENTE).
const shortName = (n) => { const p = n.trim().split(/\s+/); return p.length > 1 ? `${p[0]} ${p[1][0].toLocaleUpperCase('es')}.` : p[0]; };
function Card({ r }) {
  const [open, setOpen] = useState(false);
  return <article className="g-card">
    <Stars /><span className="sr-only">Calificación: 5.0 de 5 estrellas.</span>
    <p className={`g-text ${open ? 'is-open' : ''}`}>{r.texto}</p>
    <button type="button" className="g-more" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Leer menos' : 'Leer más'}</button>
    <footer className="g-author"><strong>{shortName(r.nombre)}</strong><span>Reseña en Google</span>{r.local && <span>Guía local</span>}</footer>
  </article>;
}
export default function Reviews({ full = false }) {
  const ref = useRef(null), drag = useRef(null), moved = useRef(false);
  const move = d => ref.current.scrollBy({ left: d * ref.current.clientWidth * .8, behavior: reducedMotion() ? 'instant' : 'smooth' });
  return <section className="reviews-g" aria-labelledby="resenas-titulo">
    <div className="wrap">
      <header className="g-head">
        <h2 id="resenas-titulo">Historias de quienes viajaron con nosotros</h2>
        <p className="g-sub">Opiniones sobre Transporte &amp; Turismo Medellín publicadas en Google. Referencia: septiembre de 2026.</p>
        <div className="g-score"><span className="g-big">5.0<span className="sr-only"> de 5 estrellas en Google</span></span><Stars /><span className="g-count">265 reseñas en Google</span></div>
        <div className="g-actions">
          <a className="button g-dark" href={company.reviews} target="_blank" rel="noopener noreferrer">Ver todas las reseñas en Google <Arrow/></a>
          <a className="g-ta" href={TRIPADVISOR} target="_blank" rel="noopener noreferrer"><img src="/media/marca/tripadvisor.svg" alt="" width="32" height="32" loading="lazy" decoding="async" /><span>Tripadvisor <b>5.0</b> · 5 reseñas <Arrow/></span></a>
        </div>
      </header>
      <div className="g-controls"><button type="button" onClick={() => move(-1)} aria-label="Reseñas anteriores"><Arrow dir="left"/></button><button type="button" onClick={() => move(1)} aria-label="Reseñas siguientes"><Arrow dir="right"/></button></div>
      <div ref={ref} className="g-rail" role="region" aria-roledescription="carrusel" aria-label="Reseñas de clientes en Google" tabIndex={0}
        onKeyDown={e => { if (e.target === e.currentTarget && ['ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); move(e.key === 'ArrowLeft' ? -1 : 1) } }}
        onPointerDown={e => { if (e.pointerType === 'mouse' && e.button === 0 && !e.target.closest('button')) { drag.current = { x: e.clientX, left: ref.current.scrollLeft }; moved.current = false } }}
        onPointerMove={e => { if (!drag.current) return; const dx = e.clientX - drag.current.x; if (Math.abs(dx) > 6) { moved.current = true; ref.current.scrollLeft = drag.current.left - dx } }}
        onPointerUp={() => { drag.current = null }} onPointerLeave={() => { drag.current = null }} onDragStart={e => e.preventDefault()}>
        {reviews.map(r => <Card key={r.nombre} r={r} />)}
      </div>
      {!full && <Link className="text-link g-about" to="/calificaciones">Sobre nuestras calificaciones<Arrow dir="right"/></Link>}
    </div>
  </section>;
}
