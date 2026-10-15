import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from './content';
import { Picture } from './shared';
import Arrow from './Arrow';
import { GlassPill, useGlassPill } from './glass';
import './blog.css';

/*
 * Índice del blog (pedido del usuario, ronda 3; distribución de referencia roadtrip.travel/blog con el diseño de T&T): artículo destacado grande, filtros por categoría,
 * cuadrícula 4/3/2/1 columnas con «Cargar más» desde PAGE artículos y una fila arrastrable «Recientes» (inercia, flechas, teclado, deslizamiento con snap).
 * DATOS: un solo lugar, el arreglo `articles` de src/content.js (ver el comentario sobre su formato). Aquí no hay que tocar nada para añadir notas.
 * Fecha y tiempo de lectura se muestran SOLO si el artículo trae `date` (ISO, p. ej. '2026-10-14') o `minutes`; hoy ninguno los trae (PENDIENTE CLIENTE).
 */
const PAGE = 12;
const MIN_RAIL = 5; // la fila «Recientes» solo aparece con 5 o más notas (con menos repetiría lo que ya se ve arriba)
const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = (iso) => { try { return new Date(`${iso}T12:00:00`).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return iso; } };

function Meta({ a }) {
  const bits = [a.date && <time key="d" dateTime={a.date}>{fmt(a.date)}</time>, a.minutes && <span key="m">{a.minutes} min de lectura</span>].filter(Boolean);
  return bits.length ? <span className="bc-meta">{bits.reduce((acc, b, i) => (i ? [...acc, ' · ', b] : [b]), [])}</span> : null;
}

function Card({ a, sizes, eager }) {
  return (
    <Link to={`/blog/${a.slug}`} className="blog-card" draggable="false">
      <span className="bc-media"><Picture photo={a.image} alt="" sizes={sizes} priority={eager} /></span>
      <span className="bc-body">
        <span className="bc-tag">{a.tag}</span>
        <h3>{a.title}</h3>
        <Meta a={a} />
        <span className="bc-more">Leer la nota<Arrow /></span>
      </span>
    </Link>
  );
}

/* Fila arrastrable: ratón (arrastre con inercia), táctil (scroll nativo con snap), teclado (← → Inicio Fin) y flechas. */
function Rail({ items }) {
  const rail = useRef(null), drag = useRef({ on: false, moved: 0, x: 0, left: 0, v: 0, t: 0, raf: 0 });
  const [edge, setEdge] = useState({ start: true, end: false }), [cur, setCur] = useState(0);
  const sync = useCallback(() => { const el = rail.current; if (!el) return; setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 }); const it = el.firstElementChild; if (it) setCur(Math.min(el.children.length - 1, Math.round(el.scrollLeft / (it.offsetWidth + 14)))); }, []);
  useEffect(() => { sync(); const el = rail.current, ro = new ResizeObserver(sync), d = drag.current; ro.observe(el); return () => { ro.disconnect(); cancelAnimationFrame(d.raf); }; }, [sync, items.length]);
  const step = (dir) => { const el = rail.current; el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.8), behavior: reduced() ? 'auto' : 'smooth' }); };
  const down = (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; const d = drag.current, el = rail.current; cancelAnimationFrame(d.raf); Object.assign(d, { on: true, moved: 0, x: e.clientX, left: el.scrollLeft, v: 0, t: performance.now() }); el.dataset.drag = 'true'; };
  const move = (e) => {
    const d = drag.current; if (!d.on) return; const el = rail.current, dx = e.clientX - d.x, now = performance.now(); d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 6 && !el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId);
    const prev = el.scrollLeft; el.scrollLeft = d.left - dx; d.v = 0.8 * d.v + 0.2 * ((el.scrollLeft - prev) / Math.max(1, now - d.t)); d.t = now;
  };
  const up = (e) => {
    const d = drag.current, el = rail.current; if (!d.on) return; d.on = false; try { el.releasePointerCapture(e.pointerId); } catch { /* ya liberado */ }
    let v = d.v * 16; // px por cuadro; inercia con fricción
    const run = () => { const before = el.scrollLeft; el.scrollLeft += v; v *= 0.94; if (Math.abs(v) > 0.4 && el.scrollLeft !== before) d.raf = requestAnimationFrame(run); else { delete el.dataset.drag; sync(); } };
    if (Math.abs(v) > 1 && !reduced()) run(); else delete el.dataset.drag;
  };
  const key = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'Home') { e.preventDefault(); rail.current.scrollTo({ left: 0 }); } else if (e.key === 'End') { e.preventDefault(); rail.current.scrollTo({ left: rail.current.scrollWidth }); }
  };
  return (
    <div className="blog-rail-wrap">
      <div className="blog-rail-head">
        <h2>Recientes</h2>
        <div className="blog-rail-arrows">
          <button type="button" aria-label="Notas anteriores" disabled={edge.start} onClick={() => step(-1)}><Arrow dir="left" /></button>
          <button type="button" aria-label="Notas siguientes" disabled={edge.end} onClick={() => step(1)}><Arrow dir="right" /></button>
        </div>
      </div>
      <div ref={rail} className="blog-rail" role="region" aria-roledescription="carrusel" aria-label="Notas recientes" tabIndex={0} onKeyDown={key} onScroll={sync}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClickCapture={(e) => { if (drag.current.moved > 6) { e.preventDefault(); e.stopPropagation(); drag.current.moved = 0; } }}>
        {items.map((a) => <div className="blog-rail-item" key={a.slug}><Card a={a} sizes="(max-width: 699px) 82vw, 340px" /></div>)}
      </div>
      <div className="blog-rail-dots" aria-hidden="true">{items.map((a, i) => <i key={a.slug} data-on={i === cur} />)}</div>
    </div>
  );
}

export default function BlogIndex() {
  const [filter, setFilter] = useState('Todas'), [shown, setShown] = useState(PAGE), tabs = useRef(null);
  useGlassPill(tabs, filter);
  const cats = ['Todas', ...new Set(articles.map((a) => a.tag))];
  const [featured, ...rest] = articles;
  const pool = filter === 'Todas' ? rest : articles.filter((a) => a.tag === filter);
  const list = pool.slice(0, shown);
  return (
    <>
      {featured && (
        <section className="wrap blog-featured" aria-labelledby="blog-destacado">
          <Link to={`/blog/${featured.slug}`} className="bf-card" draggable="false">
            <span className="bf-media"><Picture photo={featured.image} alt="" priority sizes="(max-width: 899px) 100vw, 60vw" /></span>
            <span className="bf-copy">
              <span className="bc-tag">Nota destacada · {featured.tag}</span>
              <h2 id="blog-destacado">{featured.title}</h2>
              <Meta a={featured} />
              <span className="bf-intro">{featured.intro}</span>
              <span className="bc-more">Leer más<Arrow /></span>
            </span>
          </Link>
        </section>
      )}
      <section className="wrap blog-all" aria-labelledby="blog-todas">
        <div className="blog-tools">
          <h2 id="blog-todas">Todas las notas</h2>
          {cats.length > 2 && <div ref={tabs} className="filters glass-tabs" role="group" aria-label="Filtrar por categoría"><GlassPill />{cats.map((c) => <button key={c} type="button" aria-pressed={filter === c} onClick={() => { setFilter(c); setShown(PAGE); }}>{c}</button>)}</div>}
        </div>
        <p className="result-count" role="status">{pool.length} {pool.length === 1 ? 'nota' : 'notas'}</p>
        {list.length ? <div className="blog-grid-4">{list.map((a, i) => <Card key={a.slug} a={a} sizes="(max-width: 559px) 100vw, (max-width: 1199px) 50vw, 25vw" eager={i < 2} />)}</div> : <p className="empty-note">Aún no hay notas en esta categoría.</p>}
        {pool.length > shown && <div className="blog-more"><button type="button" className="button secondary" onClick={() => setShown((n) => n + PAGE)}>Cargar más</button></div>}
      </section>
      {articles.length >= MIN_RAIL && <section className="wrap blog-recent"><Rail items={articles} /></section>}
    </>
  );
}
