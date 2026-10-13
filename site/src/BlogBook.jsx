import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from './content';
import { Picture } from './shared';
import { useLightMotion } from './PremiumMotion';
import './experience-book.css';
const two = n => String(n).padStart(2, '0');
// CONSTRUIR, Spec 02/03: cierre editorial con artículos existentes, no otro catálogo.
export default function BlogBook() {
  const cards = articles, reduce = useLightMotion();
  const [sel, setSel] = useState(0);
  const [turn, setTurn] = useState(null);
  const leafRef = useRef(null), selected = useRef(0), serial = useRef(0);
  const card = cards[sel];
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cancelReducedTurn = () => { if (query.matches) setTurn(null); };
    query.addEventListener('change', cancelReducedTurn);
    return () => query.removeEventListener('change', cancelReducedTurn);
  }, []);
  useEffect(() => { if (reduce) setTurn(null); }, [reduce]); // movimiento reducido (sistema o botón) a mitad de giro: la hoja desaparece
  const choose = (i) => {
    i = Math.min(cards.length - 1, Math.max(0, i));
    const previous = selected.current;
    if (i === previous) return;
    selected.current = i;
    setSel(i);
    setTurn(reduce ? null : { from: previous, to: i, forward: i > previous, id: ++serial.current });
  };
  useLayoutEffect(() => {
    if (!turn) return;
    const el = leafRef.current;
    if (!el?.animate || reduce) { setTurn(null); return; }
    const animation = el.animate([
      { transform: `rotateY(${turn.forward ? 0 : 180}deg)` },
      { transform: `rotateY(${turn.forward ? 180 : 0}deg)` },
    ], { duration: 600, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'both' });
    animation.onfinish = () => setTurn((current) => current?.id === turn.id ? null : current);
    return () => { animation.onfinish = null; animation.cancel(); };
  }, [turn, reduce]);
  const onKey = (e, i) => {
    const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? cards.length - 1 : null;
    if (n === null || n < 0 || n >= cards.length) return;
    e.preventDefault();
    choose(n);
    const strip = e.currentTarget.parentElement, target = strip.children[n];
    target?.focus({ preventScroll: true });
    if (target) {
      const viewport = strip.getBoundingClientRect(), item = target.getBoundingClientRect();
      if (item.left < viewport.left + 4) strip.scrollLeft += item.left - viewport.left - 4;
      else if (item.right > viewport.right - 4) strip.scrollLeft += item.right - viewport.right + 4;
    }
  };
  const pageImage = (item) => <Picture photo={item.image} alt="" sizes="(max-width:799px) 90vw, 42vw"/>;
  return (
    <section className="blog-book wrap section" aria-labelledby="blog-book-title">
      <div className="section-title"><div><p className="eyebrow">Cuaderno de viaje</p><h2 id="blog-book-title">Ideas para viajar<br/>con más <em>sentido.</em></h2></div><Link className="text-link" to="/blog">Todas las notas ↗</Link></div>
      <div className="ft ft-book" data-turning={Boolean(turn) && !reduce}>
        <div className="ft-main">
          <div className="ft-card">
            <Link className="ft-media" to={`/blog/${card.slug}`} aria-label={card.title}>
              {pageImage(card)}
            </Link>
          </div>
          <div className="ft-side">
            <p className="ft-count" role="status" aria-live="polite">{two(sel + 1)} / {cards.length}</p>
            <p className="eyebrow book-tag">{card.tag}</p><h3 className="ft-name">{card.title}</h3>
            <p className="ft-line">{card.intro}</p>
            <Link className="ft-plan" to={`/blog/${card.slug}`} aria-label={`Leer la nota: ${card.title}`}>Leer la nota <span aria-hidden="true">↗</span></Link>
            <div className="ft-nav">
              <button type="button" aria-label="Nota anterior" disabled={sel === 0} onClick={() => choose(selected.current - 1)}>←</button>
              <button type="button" aria-label="Nota siguiente" disabled={sel === cards.length - 1} onClick={() => choose(selected.current + 1)}>→</button>
            </div>
          </div>
          {turn && !reduce && <div className="ft-turn-window" aria-hidden="true" inert>
            <div ref={leafRef} key={turn.id} className="ft-leaf" data-direction={turn.forward ? 'next' : 'previous'}>
              <div className="ft-leaf-front">{pageImage(cards[turn.forward ? turn.from : turn.to])}</div>
              <div className="ft-leaf-back"><span>{two(turn.forward ? turn.to + 1 : turn.from + 1)}</span></div>
            </div>
          </div>}
        </div>
        <div className="ft-strip" role="group" aria-label="Elegir nota">
          {cards.map((x, i) => (
            <button key={x.slug} type="button" className="ft-thumb" aria-pressed={i === sel} aria-label={x.title} onClick={() => choose(i)} onKeyDown={(e) => onKey(e, i)}>
              <span className="book-index">{two(i + 1)}</span><span>{x.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
