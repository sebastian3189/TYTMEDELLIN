import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from './content';
import { Picture } from './shared';
import { useLightMotion, useMedia } from './PremiumMotion';
import './experience-book.css';
import Arrow from './Arrow';

/*
 * Libro «Ideas para viajar con más sentido» — Spec 03 §J4 (aprobado 2026-10-14).
 * Escritorio: dos páginas (foto a la izquierda, texto a la derecha). Avanzar = la hoja es la página derecha (anverso: copia del texto actual;
 * reverso: foto de la nota siguiente) y gira de 0° a −180° sobre el lomo; retroceder es simétrico con la página izquierda. Mientras gira, la página
 * que se descubre ya muestra el destino y la otra conserva la actual hasta que la hoja la cubre. La hoja tiene dos segmentos (30 % junto al lomo y
 * 70 % exterior) con el mismo contenido recortado: el exterior se retrasa para curvar la hoja. Todas las capas (hoja, segmento, sombreado por cara,
 * reflejo y sombra proyectada) usan WAAPI con los mismos tiempos (850 ms; 700 ms en móvil) y el mismo easing. Las copias son decorativas
 * (aria-hidden, inert, sin enlaces). Un clic durante el giro termina el actual y lanza un único giro hacia el último destino.
 * Móvil (<800 px): una sola página; la hoja es la página entera sobre su borde izquierdo (un segmento) y se funde entre 100° y 160°.
 * Reducido / ahorro de datos / sin WAAPI: sin 3D, fundido cruzado de 150 ms.
 */
const two = (n) => String(n).padStart(2, '0');
const EASE = 'cubic-bezier(.77,0,.175,1)';
const ANGLE_B = [[0, 0], [0.4, -14], [0.75, 6], [1, 0]]; // giro relativo del segmento exterior (hacia delante; hacia atrás se invierte)
const SPLIT = 0.3;
const HINT_KEY = 'tyt-libro-gesto'; // sessionStorage: la pista de «desliza» desaparece tras el primer giro
const hintSeen = () => { try { return sessionStorage.getItem(HINT_KEY) === '1'; } catch { return false; } };
const markSeen = () => { try { sessionStorage.setItem(HINT_KEY, '1'); } catch { /* sin almacenamiento: dura lo que la página */ } };

/* Contenido de una página (también usado por las copias de la hoja: mismas clases, sin enlaces). */
function PagePhoto({ item, link }) {
  const image = <Picture photo={item.image} alt="" sizes="(max-width:799px) 90vw, 42vw" />;
  return link
    ? <Link className="ft-media" to={`/blog/${link.slug}`} aria-label={link.title}>{image}</Link>
    : <span className="ft-media">{image}</span>;
}
function PageText({ item, live }) {
  return (
    <div className="bk-text">
      <p className="eyebrow book-tag">{item.tag}</p>
      <h3 className="ft-name">{item.title}</h3>
      <p className="ft-line">{item.intro}</p>
      {live
        ? <Link className="ft-plan" to={`/blog/${item.slug}`} aria-label={`Leer la nota: ${item.title}`}>Leer la nota <Arrow/></Link>
        : <span className="ft-plan">Leer la nota <Arrow/></span>}
    </div>
  );
}
const photoPage = (item) => <div className="bk-page bk-page--photo"><PagePhoto item={item} /></div>;
const textPage = (item) => <div className="bk-page bk-page--text"><PageText item={item} /></div>;
const faceContent = (kind, item) => kind === 'photo' ? photoPage(item) : kind === 'text' ? textPage(item) : <>{photoPage(item)}{textPage(item)}</>;

/* Una cara de un segmento: el contenido completo de la página, desplazado para mostrar solo su tramo. */
function Face({ kind, item, side, spine, segment, split }) {
  // spine: lado de la página (en sus propias coordenadas) donde está el lomo; el segmento A es el tramo pegado al lomo.
  const w = segment === 'a' ? SPLIT : 1 - SPLIT;
  const inner = split ? `${(100 / w).toFixed(4)}%` : '100%';
  let left = 0;
  if (split) {
    const fromLeft = (spine === 'left') === (segment === 'a'); // este segmento muestra el tramo izquierdo de la página
    left = fromLeft ? 0 : -((1 - w) / w) * 100;
  }
  return (
    <div className={`bk-face bk-face--${side}`}>
      <div className={`bk-face-in bk-paper--${kind === 'photo' ? 'back' : 'front'}`} data-kind={kind} style={{ width: inner, left: `${left}%` }} data-spine={spine}>
        {faceContent(kind, item)}
        <i className="bk-shade" />
        <i className="bk-gloss" />
      </div>
    </div>
  );
}

function Leaf({ turn, cards, split, mobileSingle }) {
  const fw = turn.forward;
  const from = cards[turn.from], to = cards[turn.to];
  // Escritorio. Avanzar: anverso = texto actual (lomo a la izquierda), reverso = foto destino (lomo a la derecha). Retroceder: simétrico.
  // Móvil: una página entera (foto + texto) que se va (avanzar) o llega (retroceder).
  const front = mobileSingle ? { kind: 'both', item: fw ? from : to, spine: 'left' } : fw ? { kind: 'text', item: from, spine: 'left' } : { kind: 'photo', item: from, spine: 'right' };
  const back = mobileSingle ? { kind: 'both', item: fw ? to : from, spine: 'right' } : fw ? { kind: 'photo', item: to, spine: 'right' } : { kind: 'text', item: to, spine: 'left' };
  const segs = split ? ['a', 'b'] : ['a'];
  return (
    <div className="ft-leaf" data-direction={fw ? 'next' : 'previous'} data-single={mobileSingle || undefined}>
      {segs.map((s) => (
        <div key={s} className={`bk-seg bk-seg--${s}`} data-seg={s}>
          <Face side="front" kind={front.kind} item={front.item} spine={front.spine} segment={s} split={split} />
          <Face side="back" kind={back.kind} item={back.item} spine={back.spine} segment={s} split={split} />
        </div>
      ))}
    </div>
  );
}

export default function BlogBook() {
  const cards = articles, light = useLightMotion(), mobile = useMedia('(max-width: 799px)');
  const [sel, setSel] = useState(0);
  const [view, setView] = useState({ l: 0, r: 0 }); // nota que muestran la página izquierda (foto) y la derecha (texto)
  const [turn, setTurn] = useState(null);
  const [tip, setTip] = useState(false), [hint, setHint] = useState(false), [breathe, setBreathe] = useState(false); // afordancia móvil: texto, giro de 15° y esquina que respira
  const hintRef = useRef(null);
  const windowRef = useRef(null), selected = useRef(0), serial = useRef(0), touch = useRef(null), wasLight = useRef(light);
  const canAnimate = () => !light && typeof Element.prototype.animate === 'function'; // evaluado solo en eventos (el servidor no lo necesita)

  // Las fotos de las notas se piden al acercarse (solo tres): así el reverso de la hoja no llega vacío.
  const rootRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { cards.forEach((c) => { const img = new Image(); img.srcset = c.image.srcset || ''; img.sizes = '(max-width:799px) 90vw, 42vw'; img.src = c.image.src; }); observer.disconnect(); } }, { rootMargin: '50% 0px' });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [cards]);

  // Afordancia móvil (pedido del usuario 2026-10-14): esquina levantada que «respira» una vez y la hoja se inclina ~15° la primera vez que entra en pantalla.
  useEffect(() => {
    if (!mobile) { setTip(false); setHint(false); return undefined; }
    const seen = hintSeen(); setTip(!seen);
    if (seen) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!light && typeof Element.prototype.animate === 'function') { setBreathe(true); setHint(true); }
    }, { threshold: 0.6 });
    observer.observe(hintRef.current);
    return () => observer.disconnect();
  }, [mobile, light]);
  useLayoutEffect(() => {
    if (!hint || turn) return undefined;
    const root = windowRef.current;
    if (!root) return undefined;
    const leaf = root.querySelector('.ft-leaf'), a = leaf.animate([{ transform: 'translateZ(0) rotateY(0deg)' }, { transform: 'translateZ(12px) rotateY(-15deg)', offset: 0.45 }, { transform: 'translateZ(0) rotateY(0deg)' }], { duration: 1100, easing: 'ease-in-out', fill: 'both' });
    const shades = [...root.querySelectorAll('.bk-shade')].map((el) => el.animate([{ opacity: 0 }, { opacity: 0.28, offset: 0.45 }, { opacity: 0 }], { duration: 1100, easing: 'ease-in-out', fill: 'both' }));
    a.onfinish = () => { setHint(false); setBreathe(false); };
    return () => { a.onfinish = null; a.cancel(); shades.forEach((x) => x.cancel()); };
  }, [hint, turn]);
  const settle = (to) => { setView((v) => (v.l === to && v.r === to ? v : { l: to, r: to })); setTurn(null); };
  const choose = (i) => {
    i = Math.min(cards.length - 1, Math.max(0, i));
    const from = selected.current;
    if (i === from) return;
    selected.current = i; setSel(i);
    markSeen(); setTip(false); setHint(false);
    if (!canAnimate()) { settle(i); return; }
    const forward = i > from;
    // Si había un giro en curso, `from` ya es su destino: se da por terminado y solo se gira hacia el último destino.
    setView(mobile ? { l: forward ? i : from, r: forward ? i : from } : forward ? { l: from, r: i } : { l: i, r: from });
    setTurn({ from, to: i, forward, id: ++serial.current });
  };
  // Reducido / ahorro de datos: fundido cruzado de 150 ms de ambas páginas (WAAPI: la regla global de movimiento reducido anula las animaciones CSS).
  const mounted = useRef(false);
  useLayoutEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (light) rootRef.current?.querySelectorAll('.bk-fade').forEach((el) => el.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: 'ease' }));
  }, [view.l, view.r]); // eslint-disable-line react-hooks/exhaustive-deps
  // Movimiento reducido (sistema o botón) a mitad de giro: se termina de inmediato.
  useEffect(() => { if (light && !wasLight.current) settle(selected.current); wasLight.current = light; }, [light]);
  // Cambiar de escritorio a móvil a mitad de giro: se termina de inmediato.
  useEffect(() => { settle(selected.current); }, [mobile]);

  useLayoutEffect(() => {
    if (!turn) return undefined;
    const root = windowRef.current;
    if (!root) return undefined;
    const fw = turn.forward, dur = mobile ? 700 : 850, opt = { duration: dur, easing: EASE, fill: 'both' };
    const anims = [];
    const play = (el, frames) => { if (el) anims.push(el.animate(frames, opt)); };
    const leaf = root.querySelector('.ft-leaf');
    const single = mobile;
    // Hoja: rotateY con elevación translateZ 0 → 24 px → 0. Avanzar gira hacia −180°; retroceder, hacia +180° (en móvil la hoja que llega viene de −180° a 0°).
    const dir = fw ? -1 : 1;
    const rot = (a, z) => `translateZ(${z}px) rotateY(${a}deg)`;
    if (single && !fw) play(leaf, [{ transform: rot(-180, 0), offset: 0 }, { transform: rot(-90, 24), offset: 0.5 }, { transform: rot(0, 0), offset: 1 }]);
    else play(leaf, [{ transform: rot(0, 0), offset: 0 }, { transform: rot(90 * dir, 24), offset: 0.5 }, { transform: rot(180 * dir, 0), offset: 1 }]);
    if (single) {
      // 100°–160° se funde a 0 (fuera del libro, dentro de overflow:hidden).
      play(leaf, fw ? [{ opacity: 1, offset: 0 }, { opacity: 1, offset: 100 / 180 }, { opacity: 0, offset: 160 / 180 }, { opacity: 0, offset: 1 }]
        : [{ opacity: 0, offset: 0 }, { opacity: 0, offset: 20 / 180 }, { opacity: 1, offset: 80 / 180 }, { opacity: 1, offset: 1 }]);
    } else {
      // Curvatura: el segmento exterior se retrasa respecto al interior.
      const b = root.querySelector('.bk-seg--b');
      play(b, ANGLE_B.map(([offset, a]) => ({ transform: `rotateY(${(fw ? a : -a)}deg)`, offset })));
    }
    // Sombreado por cara: opacidad 0 → .40 a 90° → 0 (mismo progreso que el ángulo).
    root.querySelectorAll('.bk-shade').forEach((el) => play(el, [{ opacity: 0, offset: 0 }, { opacity: 0.4, offset: 0.5 }, { opacity: 0, offset: 1 }]));
    // Reflejo: franja del 12 % que recorre la hoja.
    root.querySelectorAll('.bk-gloss').forEach((el) => play(el, [{ transform: 'translateX(-100%)', opacity: 1 }, { transform: 'translateX(733%)', opacity: 1 }]));
    // Sombra proyectada sobre la página que se descubre: máxima entre 60° y 120°, cero al terminar.
    play(root.querySelector('.bk-cast'), [{ opacity: 0, offset: 0 }, { opacity: 1, offset: 1 / 3 }, { opacity: 1, offset: 2 / 3 }, { opacity: 0, offset: 1 }]);
    const main = anims[0];
    if (main) main.onfinish = () => { setView({ l: turn.to, r: turn.to }); setTurn((current) => (current?.id === turn.id ? null : current)); };
    return () => { anims.forEach((a) => { a.onfinish = null; a.cancel(); }); };
  }, [turn, mobile]);

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
  // Móvil: deslizar horizontal ≥ 48 px dispara el giro al soltar (sin arrastre guiado; el scroll vertical no se bloquea).
  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    const start = touch.current; touch.current = null;
    if (!start || !mobile) return;
    const t = e.changedTouches[0], dx = t.clientX - start.x, dy = t.clientY - start.y;
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.2) choose(selected.current + (dx < 0 ? 1 : -1));
  };

  const card = cards[sel], left = cards[view.l], right = cards[view.r];
  const fw = turn?.forward;
  return (
    <section ref={rootRef} className="blog-book wrap section" aria-labelledby="blog-book-title">
      <div className="section-title"><div><p className="eyebrow">Cuaderno de viaje</p><h2 id="blog-book-title">Ideas para viajar<br />con más <em>sentido.</em></h2></div><Link className="text-link" to="/blog">Todas las notas<Arrow/></Link></div>
      <div className="ft ft-book" data-turning={Boolean(turn)} data-mobile={mobile || undefined}>
        <div className="ft-main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="bk-spread">
            <div className="bk-page bk-page--photo"><div className="bk-fade" key={view.l}><PagePhoto item={left} link={card} /></div></div>
            <div className="bk-page bk-page--text"><div className="bk-fade" key={view.r}><PageText item={right} live /></div></div>
            <span className="bk-spine" aria-hidden="true" />
            {hint && !turn && mobile && (
              <div ref={windowRef} className="ft-turn-window" aria-hidden="true" inert data-direction="next">
                <Leaf key="hint" turn={{ from: sel, to: sel, forward: true }} cards={cards} split={false} mobileSingle />
              </div>
            )}
            {mobile && sel < cards.length - 1 && <span className="bk-curl" data-breathe={breathe || undefined} aria-hidden="true" />}
            {turn && (
              <div ref={windowRef} className="ft-turn-window" aria-hidden="true" inert data-direction={fw ? 'next' : 'previous'}>
                <i className="bk-cast" />
                <Leaf key={turn.id} turn={turn} cards={cards} split={!mobile} mobileSingle={mobile} />
              </div>
            )}
          </div>
        </div>
        <div ref={hintRef} className="bk-hint-anchor" />
        {mobile && tip && <p className="bk-swipe"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" /><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" /></svg>Desliza para pasar la página</p>}
        <div className="bk-footer">
          <div className="ft-strip" role="group" aria-label="Elegir nota">
            {cards.map((x, i) => (
              <button key={x.slug} type="button" className="ft-thumb" aria-pressed={i === sel} aria-label={x.title} onClick={() => choose(i)} onKeyDown={(e) => onKey(e, i)}>
                <span className="book-index">{two(i + 1)}</span><span>{x.tag}</span>
              </button>
            ))}
          </div>
          <div className="bk-ctl">
            <p className="ft-count" role="status" aria-live="polite">{two(sel + 1)} / {two(cards.length)}</p>
            <div className="ft-nav">
              <button type="button" aria-label="Nota anterior" disabled={sel === 0} onClick={() => choose(selected.current - 1)}><Arrow dir="left"/></button>
              <button type="button" aria-label="Nota siguiente" disabled={sel === cards.length - 1} onClick={() => choose(selected.current + 1)}><Arrow dir="right"/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
