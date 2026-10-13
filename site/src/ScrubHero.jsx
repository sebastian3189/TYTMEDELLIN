import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import manifest from './inicio-frames.json';
import { inicioTextos, CHAPTERS, textoFase } from './inicio-textos';
import { N, timeline, stateAt, buildDims, frameWindow, cardPlace, uForCard, smooth } from './baraja-geometria';
import './scrub-hero.css';
import './experience-book.css';

/*
 * Apertura del inicio: «La baraja de recuerdos» (Spec 03 §H1) sobre la película controlada por scroll (§E, §G) — Spec 04.
 * Un único progreso de scroll compartido: el scroll solo cambia `q` (suavizado exponencial) y de él salen, en el mismo
 * fotograma, el fotograma del clip, el Flip de la carta superior (transform + clip-path), la baraja y la marquesina.
 * Scroll nativo + contenedor sticky: nunca se intercepta rueda, teclado ni gesto. Texto en HTML; imagen en <canvas>.
 * Memoria acotada (ventana de ImageBitmap, ver WINDOW).
 */
const BASE = '/media/inicio';
const CARDS = '/media/baraja';
const MOBILE_QUERY = '(max-width: 799px)';
const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';
// Alturas bajas (móvil horizontal, zoom 200 %+): modo estático (póster + texto en flujo normal); nada enfocable queda fuera de vista.
const LOW_HEIGHT_QUERY = '(max-height: 560px)';
const REDUCE_KEY = 'tyt-reducir-movimiento';
// Memoria: solo una ventana de fotogramas queda decodificada (ImageBitmap); el resto se conserva comprimido (Blob).
// Ventana direccional: más fotogramas por delante del sentido de desplazamiento que por detrás (121 fotogramas completos, 24 fps).
const WINDOW = { desktop: { ahead: 14, behind: 4 }, mobile: { ahead: 18, behind: 5 } };
const ANCHOR = 8; // cada 8.º fotograma se conserva además a media resolución (respaldo mientras se decodifica la ventana)
const TAU = { desktop: 60, mobile: 50 }; // suavizado corto, sin inercia que se quede atrás
const JUMP = 0.12, SETTLE = 0.0003;
// Miniaturas flotantes decorativas (x, y en fracción del escenario, ancho px, profundidad, carta, rotación): paralaje a distintas profundidades.
const FLOATS = [[0.06, 0.5, 130, 0.3, 2, -4], [0.2, 0.66, 120, 0.15, 7, 3], [0.8, 0.22, 140, 0.2, 4, 4], [0.9, 0.46, 124, 0.3, 10, -3]];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const readReduce = () => { try { return localStorage.getItem(REDUCE_KEY) === '1'; } catch { return false; } };
const writeReduce = (on) => { try { if (on) localStorage.setItem(REDUCE_KEY, '1'); else localStorage.removeItem(REDUCE_KEY); } catch { /* sin almacenamiento: la preferencia dura la sesión */ } };
const osReduce = () => typeof window !== 'undefined' && window.matchMedia(REDUCE_QUERY).matches;

const prefersStatic = (user) => {
  if (typeof window === 'undefined') return true;
  if (user || osReduce() || window.matchMedia(LOW_HEIGHT_QUERY).matches) return true;
  const c = navigator.connection;
  return Boolean(c && (c.saveData || ['slow-2g', '2g', '3g'].includes(c.effectiveType)));
};

function frameOrder(count, mobile) {
  // Primera pasada navegable (≈2 MB escritorio / ≈1,2 MB móvil): cada 15.º / 10.º fotograma; luego cada 5.º, cada 2.º y el resto.
  const seen = new Set(), order = [];
  for (const step of mobile ? [10, 5, 2, 1] : [15, 5, 2, 1]) for (let i = 0; i < count; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
  if (!seen.has(count - 1)) order.splice(1, 0, count - 1);
  return order;
}

const cardImg = (slug, k) => `${CARDS}/${slug}-${k}.webp`;
const copy = (slug) => inicioTextos.cartas[slug];
const two = (n) => String(n).padStart(2, '0');

/* Carta de rejilla / carrusel (estático y móvil): foto, nombre y la línea aprobada «Emoción: frase». */
function CartaLista({ card }) {
  const c = copy(card.slug);
  return (
    <Link className="sc-card" to={`/experiencias/${card.slug}`}>
      <span className="sc-img">
        <img src={cardImg(card.slug, 't')} srcSet={`${cardImg(card.slug, 't')} 320w, ${cardImg(card.slug, 'm')} 400w, ${cardImg(card.slug, 'd')} 640w`} sizes="(max-width: 600px) 46vw, (max-width: 1000px) 30vw, 22vw" width="320" height="400" alt="" loading="lazy" decoding="async" />
      </span>
      <span className="sc-count">{two(card.n)} / {N}</span>
      <h3 className="sc-name">{card.name}</h3>
      <p className="sc-line"><b>{c.emocion}:</b> {c.frase}</p>
    </Link>
  );
}

/* Cierre (estático y móvil): lema de cierre + «Planeemos tu viaje» (única acción naranja) y «Explorar experiencias». */
function Cierre({ actions }) {
  const f = textoFase('final');
  return (
    <div className="sc-close">
      <p className="sc-close-title">{f.titular}</p>
      <p className="sc-close-sub">{f.subtitulo}</p>
      <div className="scrub-actions sc-close-actions">{actions}</div>
    </div>
  );
}

/* Cierre del inicio: carta destacada grande (16:10 en escritorio, 4:5 a todo el ancho en móvil) con nombre, línea y CTA debajo,
   y debajo la tira de las 12 miniaturas que cambian la destacada (clic, hover con puntero fino o teclado) con Flip desde la miniatura. */
function Destacada({ cards, actions, reduce }) {
  const [sel, setSel] = useState(0);
  const [turn, setTurn] = useState(null);
  const leafRef = useRef(null), selected = useRef(0), serial = useRef(0);
  const card = cards[sel], c = copy(card.slug);
  useEffect(() => {
    const query = window.matchMedia(REDUCE_QUERY);
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
    setTurn(prefersStatic(reduce) ? null : { from: previous, to: i, forward: i > previous, id: ++serial.current });
  };
  useLayoutEffect(() => {
    if (!turn) return;
    const el = leafRef.current;
    if (!el?.animate || prefersStatic(reduce)) { setTurn(null); return; }
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
  const pageImage = (item) => <picture><source media={MOBILE_QUERY} srcSet={cardImg(item.slug, 'm')} /><img src={cardImg(item.slug, 'w')} width="900" height="600" alt="" loading="lazy" decoding="async" /></picture>;
  const t = inicioTextos;
  return (
    <div className="scrub-after is-featured">
      <div className="scrub-after-head"><p className="eyebrow">{t.eleccion}</p></div>
      <div className="ft ft-book" data-turning={Boolean(turn) && !prefersStatic(reduce)}>
        <div className="ft-main">
          <div className="ft-card">
            <Link className="ft-media" to={`/experiencias/${card.slug}`} aria-label={`${card.name}. ${c.emocion}: ${c.frase}`}>
              {pageImage(card)}
            </Link>
          </div>
          <div className="ft-side">
            <p className="ft-count" role="status" aria-live="polite">{two(sel + 1)} / {cards.length}</p>
            <h2 className="ft-name">{card.name}</h2>
            <p className="ft-line"><b>{c.emocion}:</b> {c.frase}</p>
            <Link className="ft-plan" to={`/experiencias/${card.slug}#consulta`} aria-label={`Planea esta experiencia: ${card.name}`}>Planea esta experiencia <span aria-hidden="true">↗</span></Link>
            <div className="ft-nav">
              <button type="button" aria-label="Experiencia anterior" disabled={sel === 0} onClick={() => choose(selected.current - 1)}>←</button>
              <button type="button" aria-label="Experiencia siguiente" disabled={sel === cards.length - 1} onClick={() => choose(selected.current + 1)}>→</button>
            </div>
          </div>
          {turn && !prefersStatic(reduce) && <div className="ft-turn-window" aria-hidden="true" inert>
            <div ref={leafRef} key={turn.id} className="ft-leaf" data-direction={turn.forward ? 'next' : 'previous'}>
              <div className="ft-leaf-front">{pageImage(cards[turn.forward ? turn.from : turn.to])}</div>
              <div className="ft-leaf-back"><span>{two(turn.forward ? turn.to + 1 : turn.from + 1)}</span></div>
            </div>
          </div>}
        </div>
        <div className="ft-strip" role="group" aria-label="Elegir experiencia">
          {cards.map((x, i) => (
            <button key={x.slug} type="button" className="ft-thumb" aria-pressed={i === sel} aria-label={x.name} onClick={() => choose(i)} onKeyDown={(e) => onKey(e, i)}>
              <img src={cardImg(x.slug, 't')} width="320" height="400" alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>
      <Cierre actions={actions} />
    </div>
  );
}

export default function ScrubHero({ actions, cards, skipLabel = 'Saltar introducción', nextId, summary }) {
  const root = useRef(null), track = useRef(null), stage = useRef(null), canvas = useRef(null), skipRef = useRef(null), media = useRef(null);
  const floatRef = useRef(null), deckRef = useRef(null), mqRef = useRef(null), titleRef = useRef(null), stripRef = useRef(null), stackRef = useRef(null);
  const api = useRef({ jump: () => {}, step: () => {}, active: 0 });
  // Prerender (Spec 04): el servidor y la primera pasada de hidratación son el modo estático (HTML legible, enlaces reales, sin JS); un efecto de
  // diseño lee el entorno (preferencias, tamaño, red) y pasa al modo animado antes del primer pintado, así no hay desajuste de hidratación.
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);
  // mode: 'scrub' | 'static' (movimiento reducido, red lenta, altura baja, o aún sin entorno) | 'failed' (carga) | 'tight' (no cabe: se midió desbordamiento)
  const [mode, setMode] = useState('static');
  const tightKey = useRef('');
  const [mobile, setMobile] = useState(false);
  const reduceRef = useRef(reduce); reduceRef.current = reduce;
  useLayoutEffect(() => {
    const user = readReduce();
    reduceRef.current = user;
    setReduce(user); setMobile(window.matchMedia(MOBILE_QUERY).matches); setMode(prefersStatic(user) ? 'static' : 'scrub'); setReady(true);
  }, []);
  const osNow = ready && osReduce();

  // Retira el póster de arranque de index.html cuando la primera carta de React ya está pintada en el mismo sitio (LCP estable).
  useEffect(() => {
    let r2 = 0; const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => { document.getElementById('boot')?.remove(); document.documentElement.classList.remove('boot-scrub'); }); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, []);

  // Cambios dinámicos: movimiento reducido y tamaño de pantalla.
  useEffect(() => {
    const queries = [REDUCE_QUERY, LOW_HEIGHT_QUERY].map((q) => window.matchMedia(q));
    const size = window.matchMedia(MOBILE_QUERY);
    const onReduce = () => setMode((m) => (prefersStatic(reduceRef.current) ? 'static' : m === 'failed' || m === 'tight' ? m : 'scrub'));
    const onSize = () => setMobile(size.matches);
    // Si el tamaño cambió tras un desbordamiento medido, se vuelve a intentar el modo animado (el guardián lo re-evalúa).
    const onResize = () => setMode((m) => (m === 'tight' && tightKey.current !== `${innerWidth}x${innerHeight}` ? (prefersStatic(reduceRef.current) ? 'static' : 'scrub') : m));
    queries.forEach((q) => q.addEventListener('change', onReduce)); size.addEventListener('change', onSize); window.addEventListener('resize', onResize);
    return () => { queries.forEach((q) => q.removeEventListener('change', onReduce)); size.removeEventListener('change', onSize); window.removeEventListener('resize', onResize); };
  }, []);

  const toggleReduce = () => {
    const next = !reduce;
    writeReduce(next); setReduce(next); reduceRef.current = next; window.dispatchEvent(new Event('tyt-motion'));
    setMode((m) => (prefersStatic(next) ? 'static' : m === 'failed' || m === 'tight' ? m : 'scrub'));
  };

  useLayoutEffect(() => {
    if (!ready || mode !== 'scrub') return undefined;
    const section = root.current, trackEl = track.current, stageEl = stage.current, cv = canvas.current, mediaEl = media.current, ctx = cv?.getContext('2d', { alpha: false });
    if (!ctx || typeof createImageBitmap !== 'function') { setMode('failed'); return undefined; }
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    const T = timeline(mobile);
    // Escritorio: ventanas ≤1600 px usan d16/ (1600×900 q74); >1600 conservan d/ (1920×1080 q82). Móvil: m/ (encuadre por fotograma en el tramo final).
    const wide = !mobile && innerWidth > 1600;
    const set = mobile ? manifest.mobile : wide ? manifest.desktop : manifest.desktop1600;
    const suffix = mobile ? 'm' : wide ? 'd' : 'd16';
    const tau = mobile ? TAU.mobile : TAU.desktop;
    const win = mobile ? WINDOW.mobile : WINDOW.desktop;
    let dir = 1, prevCenter = 0;
    const count = set.count;
    // Rótulos sin huecos: c1 entra a mitad del Flip y dura hasta que entra c2 (PLAZA); c2 dura hasta media contracción.
    const PLAZA = T.t1 + 0.7 * (T.t2 - T.t1), CAP_C1 = [T.t0 + 0.5 * (T.t1 - T.t0), PLAZA];
    const CAP_C2 = [PLAZA, T.t3 + 0.5 * (T.t4 - T.t3)];
    // Comprimidos: Blob de cada fotograma (≈ 8 MB). Decodificados: ImageBitmap solo en ventana (se cierran al salir).
    const blobs = new Array(count).fill(null), full = new Array(count).fill(null), low = new Array(count).fill(null);
    const pending = new Set(), controller = new AbortController();
    let raf = 0, visible = true, destroyed = false, lastKey = '', ui = '', cap = '', chapter = 0, activeCard = -1, loaded = 0, failures = 0;
    let W = 0, H = 0, stageTop = 92, q = null, lastT = 0, center = 0, version = 0, live = 0, peak = 0, bytes = 0, peakBytes = 0, dims = null, mqWidths = [], span = 1;
    const fw = {}, cp = {}, lastCard = new Array(N).fill(''), lastFx = {};
    const cardEls = deckRef.current ? [...deckRef.current.querySelectorAll('.bd-card')] : [];
    const fullImgs = cardEls.map((el) => el.querySelector('.bd-full'));
    const mqItems = mqRef.current ? [...mqRef.current.querySelectorAll('.bd-mq-item')] : [];
    const fxEls = titleRef.current ? [...titleRef.current.querySelectorAll('[data-fx]')] : [], stripEl = stripRef.current;
    const floatEls = floatRef.current ? [...floatRef.current.querySelectorAll('.bd-float')] : [];
    const capEls = [...stageEl.querySelectorAll('.bd-cap')], planEls = [...stageEl.querySelectorAll('.bd-plan')], stripBtns = [...stageEl.querySelectorAll('.scrub-strip [data-i]')];

    const track2 = (delta, size) => {
      live += delta; bytes += delta * size; if (live > peak) peak = live; if (bytes > peakBytes) peakBytes = bytes;
      section.dataset.bitmaps = String(live); section.dataset.bitmapsPeak = String(peak);
      section.dataset.bitmapMb = (bytes / 1048576).toFixed(1); section.dataset.bitmapMbPeak = (peakBytes / 1048576).toFixed(1); // RGBA decodificado, medido
    };
    const drop = (list, i) => { const b = list[i]; if (b) { list[i] = null; track2(-1, b.width * b.height * 4); b.close(); } };

    // Guardián de desbordamiento: si algún elemento del escenario (texto, índice, acciones, «Saltar») queda fuera de él
    // o el escenario excede la ventana, se pasa al modo estático. Nunca debe haber un elemento enfocable fuera de vista.
    const fits = () => {
      if (stageEl.offsetHeight + stageTop > innerHeight + 1) return false;
      const box = stageEl.getBoundingClientRect(), tol = 1;
      return [...stageEl.querySelectorAll('.scrub-stack, .scrub-actions a, .scrub-index, .scrub-skip, .scrub-motion')].every((el) => {
        const r = el.getBoundingClientRect();
        return r.width === 0 || (r.top >= box.top - tol && r.bottom <= box.bottom + tol && r.left >= box.left - tol && r.right <= box.right + tol);
      });
    };

    const measure = () => {
      const header = document.querySelector('.site-header')?.offsetHeight || 92;
      stageTop = header;
      if (section.style.getPropertyValue('--scrub-top') !== `${header}px`) section.style.setProperty('--scrub-top', `${header}px`);
      if (!fits()) { tightKey.current = `${innerWidth}x${innerHeight}`; setMode('tight'); return; }
      // G4: escritorio min(dpr,2) con ancho interno ≤2560; móvil min(dpr, 2.5).
      let ratio = Math.min(window.devicePixelRatio || 1, mobile ? 2.5 : 2);
      if (!mobile) ratio = Math.min(ratio, 2560 / Math.max(1, mediaEl.offsetWidth));
      W = Math.max(1, Math.round(mediaEl.offsetWidth * ratio)); H = Math.max(1, Math.round(mediaEl.offsetHeight * ratio));
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; }
      dims = buildDims(stageEl.clientWidth, stageEl.clientHeight, mobile, { x: mediaEl.offsetLeft, y: mediaEl.offsetTop, w: mediaEl.offsetWidth, h: mediaEl.offsetHeight });
      stageEl.style.setProperty('--bw', `${dims.Bw}px`); stageEl.style.setProperty('--bh', `${dims.Bh}px`); stageEl.style.setProperty('--stage-h', `${stageEl.clientHeight}px`);
      if (dims.m) { // móvil: posiciones del titular partido y la confianza calculadas con la baraja (sin solapes)
        stageEl.style.setProperty('--m-t1', `${dims.m.t1Top}px`); stageEl.style.setProperty('--m-t2', `${dims.m.t2Top}px`); stageEl.style.setProperty('--m-micro', `${dims.m.microTop}px`);
        stageEl.dataset.short = dims.m.short ? '1' : '0';
      }
      stageEl.style.setProperty('--deck-top', `${dims.deck.y - dims.Hd / 2}px`); stageEl.style.setProperty('--deck-bottom', `${dims.deck.y + dims.Hd / 2}px`);
      // Marquesina: tamaño por elemento = mín(120 px, 0,9 × ancho útil / ancho natural, espacio sobre la carta enfocada − 32 px).
      const room = Math.max(40, (dims.focus.y - dims.Bh / 2 - 22 - 26) / 0.9), usable = 0.9 * (dims.W - 2 * dims.pad);
      mqWidths = mqItems.map((el) => {
        el.style.fontSize = '100px';
        const w100 = el.firstElementChild?.getBoundingClientRect().width || 1, size = Math.min(120, room, (usable * 100) / w100);
        el.style.fontSize = `${size.toFixed(1)}px`;
        return (w100 * size) / 100;
      });
      lastCard.fill(''); Object.keys(lastFx).forEach((k) => delete lastFx[k]);
      lastKey = '';
    };

    // Mejor imagen disponible para el fotograma i: la decodificada más cercana (completa; si no, la de media resolución).
    const nearest = (i) => {
      for (let d = 0; d < count; d++) {
        for (const j of [i - d, i + d]) { if (full[j]) return full[j]; if (low[j]) return low[j]; }
      }
      return null;
    };
    const cover = (img) => {
      const iw = img.width, ih = img.height, sc = Math.max(W / iw, H / ih), w = iw * sc, h = ih * sc;
      ctx.drawImage(img, -(w - W) * 0.5, -(h - H) * 0.5, w, h);
    };

    // Decodificación en ventana: se pide lo cercano al fotograma actual y se cierra lo que sale de ella.
    const decode = (key, blob, options, apply) => {
      if (pending.has(key) || !blob) return;
      pending.add(key);
      createImageBitmap(blob, options).then((bitmap) => { pending.delete(key); apply(bitmap); }, () => pending.delete(key));
    };
    const manage = () => {
      if (center !== prevCenter) { dir = center > prevCenter ? 1 : -1; prevCenter = center; }
      const lo = center - (dir > 0 ? win.behind : win.ahead), hi = center + (dir > 0 ? win.ahead : win.behind);
      // Se decodifica de cerca a lejos, empezando por el sentido de desplazamiento.
      for (let d = 0; d <= Math.max(win.ahead, win.behind); d++) {
        for (const i of d ? [center + dir * d, center - dir * d] : [center]) {
          if (i < lo || i > hi || i < 0 || i >= count || full[i] || !blobs[i]) continue;
          decode(`f${i}`, blobs[i], undefined, (bitmap) => {
            if (destroyed || i < center - win.ahead - 2 || i > center + win.ahead + 2 || full[i]) { bitmap.close(); return; }
            full[i] = bitmap; track2(1, bitmap.width * bitmap.height * 4); version++; schedule();
          });
        }
      }
      for (let i = 0; i < count; i++) {
        if (full[i] && (i < lo - 2 || i > hi + 2)) drop(full, i);
        if (i % ANCHOR === 0 && !low[i] && blobs[i]) {
          decode(`l${i}`, blobs[i], { resizeWidth: Math.round(set.width / 2), resizeQuality: 'medium' }, (bitmap) => {
            if (destroyed || low[i]) { bitmap.close(); return; }
            low[i] = bitmap; track2(1, bitmap.width * bitmap.height * 4); version++; schedule();
          });
        }
      }
    };

    // Carta enfocada: se pide su foto grande (640×800) y la de sus vecinas cuando el recorrido se acerca a las cartas.
    const wantFull = (from, to) => {
      for (let i = Math.max(0, from); i <= Math.min(N - 1, to); i++) {
        const img = fullImgs[i];
        if (img && !img.getAttribute('src')) img.setAttribute('src', img.dataset.src);
      }
    };

    const place = (u, st) => {
      // Marco del clip (Flip): transform + clip-path de la capa de tamaño natural; la carta superior y el lienzo son la misma capa.
      frameWindow(dims, st.w, fw);
      const fkey = st.w >= 0.999 ? 'full' : `${fw.tx.toFixed(1)}|${fw.ty.toFixed(1)}|${fw.rot.toFixed(2)}|${fw.s.toFixed(4)}|${fw.ix.toFixed(1)}|${fw.iy.toFixed(1)}|${fw.r.toFixed(2)}`;
      const fo = mobile ? 1 : 1 - smooth(clamp(st.fanT * 2));
      const mkey = `${fkey}|${fo.toFixed(3)}`;
      if (lastFx.media !== mkey) {
        lastFx.media = mkey;
        if (st.w >= 0.999) { mediaEl.style.transform = 'none'; mediaEl.style.clipPath = 'none'; }
        else { mediaEl.style.transform = `translate3d(${fw.tx}px,${fw.ty}px,0) rotate(${fw.rot}deg) scale(${fw.s})`; mediaEl.style.clipPath = `inset(${fw.iy}px ${fw.ix}px round ${fw.r}px)`; }
        mediaEl.style.opacity = String(fo); mediaEl.style.visibility = fo < 0.01 ? 'hidden' : 'visible';
      }
      // Baraja de cartas.
      for (let i = 0; i < cardEls.length; i++) {
        cardPlace(dims, st, i, cp);
        const key = `${cp.x.toFixed(1)}|${cp.y.toFixed(1)}|${cp.r.toFixed(2)}|${cp.s.toFixed(4)}|${cp.o.toFixed(3)}|${cp.z}`;
        if (key === lastCard[i]) continue;
        lastCard[i] = key;
        const el = cardEls[i];
        el.style.transform = `translate3d(${cp.x - dims.Bw / 2}px,${cp.y - dims.Bh / 2}px,0) rotate(${cp.r}deg) scale(${cp.s})`;
        el.style.opacity = cp.o.toFixed(3); el.style.zIndex = String(cp.z);
        el.style.setProperty('--inv', (1 / cp.s).toFixed(3));
      }
      // «Baraja a la vista»: titular partido, lema, confianza y tira se van y vuelven con D.
      // Móvil: el texto se desvanece en la primera mitad del cambio y se desplaza poco, para no cruzarse con el lema, la confianza ni la banda.
      const dKey = st.D.toFixed(3), dOp = mobile ? clamp(st.D * 2 - 1) : st.D, dMove = mobile ? 0.035 : 0.05;
      if (lastFx.d !== dKey) {
        lastFx.d = dKey;
        for (const el of fxEls) {
          const dir = Number(el.dataset.fx || 0);
          el.style.opacity = dOp.toFixed(3); el.style.transform = dir ? `translate3d(0,${(1 - st.D) * dir * dims.H * dMove}px,0)` : '';
          el.style.visibility = dOp < 0.01 ? 'hidden' : 'visible';
        }
      }
      // Miniaturas flotantes: paralaje por profundidad durante el barajado y el Flip; se van con la baraja.
      const fp = clamp(u / T.t1), fk = `${fp.toFixed(3)}|${dKey}`;
      if (floatEls.length && lastFx.f !== fk) {
        lastFx.f = fk;
        for (const el of floatEls) {
          const dp = Number(el.dataset.dp), x = Number(el.dataset.fx) * dims.W, y = Number(el.dataset.fy) * dims.H - dp * 720 * fp;
          el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${Number(el.dataset.rot)}deg)`;
          el.style.opacity = st.D.toFixed(3); el.style.visibility = st.D < 0.01 ? 'hidden' : 'visible';
        }
      }
      // La tira de miniaturas acompaña a la baraja y al despliegue.
      const sv = Math.max(st.D, st.fanT), sKey = sv.toFixed(3);
      if (stripEl && lastFx.s !== sKey) { lastFx.s = sKey; stripEl.style.opacity = sKey; stripEl.style.visibility = sv < 0.01 ? 'hidden' : 'visible'; }
      // Marquesina de lugar (P2): una franja sobre la carta enfocada (≥24 px de separación). El nombre se lee entero: tamaño
      // por elemento ajustado al ancho, centrado y quieto en el 60 % central de su tramo, con una deriva ≤ ±4 vw en los extremos.
      const mqA = st.fanT, drift = dims.W * 0.04;
      for (let i = 0; i < mqItems.length; i++) {
        const a = st.f - i, o = clamp(1 - Math.abs(a) * 1.6) * mqA;
        const dx = -Math.sign(a) * drift * clamp((Math.abs(a) - 0.3) / 0.7);
        const mk = `${o.toFixed(2)}|${Math.round(dx)}`;
        if (lastFx[`m${i}`] === mk) continue;
        lastFx[`m${i}`] = mk;
        const el = mqItems[i];
        el.style.opacity = o.toFixed(3); el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
        if (o >= 0.01) el.style.transform = `translate3d(${(dims.W - mqWidths[i]) / 2 + dx}px,0,0)`;
      }
    };

    const render = (now) => {
      raf = 0;
      if (destroyed || !visible || document.hidden) { lastT = 0; return; }
      const rect = trackEl.getBoundingClientRect();
      span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight);
      const target = clamp((stageTop - rect.top) / span);
      // Suavizado exponencial dependiente del tiempo; salto grande (ancla, «Saltar», foco de carta) se iguala.
      const dt = lastT ? Math.min(64, now - lastT) : 16;
      lastT = now;
      if (q === null || Math.abs(target - q) > JUMP) q = target;
      else q += (target - q) * (1 - Math.exp(-dt / tau));
      let moving = true;
      if (Math.abs(target - q) < SETTLE) { q = target; moving = false; }
      const u = q * T.total;
      const st = stateAt(u, T, mobile);
      if (st.ui !== ui) { ui = st.ui; stageEl.dataset.ui = ui; }
      let newCap = '';
      if (st.ui === 'cards') newCap = 'cards';
      else if (u >= CAP_C1[0] && u < CAP_C1[1]) newCap = 'c1';
      else if (u >= CAP_C2[0] && u < CAP_C2[1]) newCap = 'c2';
      if (newCap !== cap) { cap = newCap; stageEl.dataset.cap = cap; }
      const newChapter = u >= PLAZA ? 2 : 1;
      if (newChapter !== chapter) { chapter = newChapter; stageEl.dataset.ch = String(chapter); }
      const act = st.ui === 'cards' ? st.active : -1;
      if (act !== activeCard) {
        activeCard = act; stageEl.dataset.card = String(act); api.current.active = act;
        capEls.forEach((el, i) => el.classList.toggle('is-on', i === act));
        planEls.forEach((el, i) => el.classList.toggle('is-on', i === act));
        stripBtns.forEach((el, i) => el.toggleAttribute('data-on', i === act));
        if (act >= 0) wantFull(act - 1, act + 2);
      }
      if (!mobile && u >= T.t2 && u < T.t5 && !fullImgs[0]?.getAttribute('src')) wantFull(0, 2);

      center = Math.round(st.clipT * (count - 1));
      manage();
      // Un fotograma real por posición (24 fps completos): sin mezcla entre fotogramas, para evitar fantasmas y desenfoque.
      const baseIdx = Math.round(st.clipT * (count - 1));
      const baseImg = nearest(baseIdx);
      const key = `${W}x${H}|${baseIdx}|${version}`;
      if (key !== lastKey && baseImg) {
        lastKey = key;
        ctx.fillStyle = '#3C3F3B'; ctx.fillRect(0, 0, W, H);
        cover(baseImg);
        section.dataset.frame = String(baseIdx);
        section.dataset.ready = 'true';
      }
      if (dims) place(u, st);
      section.dataset.progress = q.toFixed(4);
      section.dataset.target = target.toFixed(4);
      section.dataset.settled = moving ? 'false' : 'true';
      section.dataset.u = u.toFixed(1);
      if (moving) schedule(); else lastT = 0;
    };
    const schedule = () => { if (!raf && !destroyed) raf = requestAnimationFrame(render); };

    // Salto a un progreso en svh (foco de carta, tira, botones): scroll nativo instantáneo, nunca animado ni interceptado.
    api.current.jump = (u) => {
      const top = trackEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - stageTop + (u / T.total) * span, behavior: 'instant' });
      schedule();
    };
    api.current.step = (dir) => api.current.jump(uForCard(T, clamp(Math.max(api.current.active, 0) + dir, 0, N - 1)));
    api.current.card = (i) => { if (!mobile && Math.abs((q === null ? 0 : q * T.total) - uForCard(T, i)) > 6) api.current.jump(uForCard(T, i)); };
    api.current.T = T;

    const fetchBlob = async (url) => {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(String(response.status));
      return response.blob();
    };

    const load = async () => {
      // Tras el primer pintado: el póster (LCP) ya es visible antes de pedir fotogramas.
      await new Promise((resolve) => (window.requestIdleCallback ? window.requestIdleCallback(resolve, { timeout: 1500 }) : setTimeout(resolve, 200)));
      // Las miniaturas de la baraja (visibles al entrar) se descargan antes que los fotogramas: así ninguna se pinta tarde y desplaza el LCP.
      const thumbs = [...stageEl.querySelectorAll('.bd-thumb')].filter((im) => !im.complete);
      if (thumbs.length) await Promise.race([Promise.all(thumbs.map((im) => new Promise((resolve) => { im.addEventListener('load', resolve, { once: true }); im.addEventListener('error', resolve, { once: true }); }))), new Promise((resolve) => setTimeout(resolve, 3000))]);
      if (destroyed) return;
      const queue = frameOrder(count, mobile);
      let cursor = 0;
      const worker = async () => {
        while (!destroyed && cursor < queue.length) {
          const i = queue[cursor++];
          try {
            const blob = await fetchBlob(`${BASE}/${suffix}/${String(i + 1).padStart(3, '0')}.webp`);
            if (destroyed) return;
            blobs[i] = blob; loaded++;
            section.dataset.loaded = String(loaded);
            schedule();
          } catch (error) {
            if (controller.signal.aborted) return;
            failures++;
            // Sin ningún fotograma tras varios fallos: póster + texto estático.
            if (failures >= 3 && !blobs.some(Boolean)) { setMode('failed'); return; }
          }
        }
      };
      await Promise.all([worker(), worker(), worker(), worker()]);
    };

    const onScroll = () => schedule();
    const onVisibility = () => { if (!document.hidden) { lastKey = ''; lastT = 0; schedule(); } else if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { lastKey = ''; lastT = 0; schedule(); } else if (raf) { cancelAnimationFrame(raf); raf = 0; } }, { rootMargin: '200px 0px' });
    const resize = new ResizeObserver(() => { measure(); schedule(); });
    measure();
    if (dims) { // primer pintado ya como baraja (antes de que el navegador pinte)
      const target0 = clamp((stageTop - trackEl.getBoundingClientRect().top) / Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight));
      q = target0; span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight);
      const st0 = stateAt(q * T.total, T, mobile); stageEl.dataset.ui = ui = st0.ui; place(q * T.total, st0);
    }
    observer.observe(section); resize.observe(cv); resize.observe(stageEl);
    document.fonts?.ready.then(() => { if (!destroyed) { measure(); schedule(); } });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    schedule();
    load();

    return () => {
      destroyed = true; controller.abort();
      cancelAnimationFrame(raf); observer.disconnect(); resize.disconnect();
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      for (let i = 0; i < count; i++) { drop(full, i); drop(low, i); }
      blobs.fill(null);
      for (const k of ['ready', 'frame', 'loaded', 'progress', 'target', 'settled', 'u', 'bitmaps', 'bitmapsPeak', 'bitmapMb', 'bitmapMbPeak']) delete section.dataset[k];
      for (const el of [mediaEl, stripEl, ...floatEls, ...cardEls, ...mqItems, ...fxEls]) { el?.removeAttribute('style'); }
      stageEl.dataset.ui = 'deck'; stageEl.dataset.cap = ''; stageEl.dataset.ch = '1'; stageEl.dataset.card = '-1';
      for (const k of ['--bw', '--bh', '--stage-h', '--m-t1', '--m-t2', '--m-micro', '--deck-top', '--deck-bottom']) stageEl.style.removeProperty(k);
      delete stageEl.dataset.short;
      api.current.jump = () => {}; api.current.step = () => {}; api.current.card = () => {};
    };
  }, [ready, mode, mobile]);

  const skip = () => {
    const next = nextId && document.getElementById(nextId);
    if (!next) return;
    next.scrollIntoView({ behavior: 'instant', block: 'start' });
    next.focus({ preventScroll: true });
  };
  const tilt = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget.querySelector('.bd-tilt'); if (!el) return;
    const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`); el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
  };
  const untilt = (e) => { const el = e.currentTarget.querySelector('.bd-tilt'); if (el) { el.style.removeProperty('--ry'); el.style.removeProperty('--rx'); } };
  const onCardKey = (e, i) => {
    // Flechas izquierda/derecha recorren las cartas sin cancelar el evento (no se secuestra el scroll).
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
    if (next === null || next < 0 || next >= N) return;
    deckRef.current?.querySelectorAll('.bd-card')[next]?.focus({ preventScroll: true });
  };

  const staticMode = mode !== 'scrub';
  const animated = !staticMode;
  const deckLinks = animated && !mobile; // escritorio: las cartas de la baraja son los enlaces
  const t = inicioTextos;
  const bar = (
    <button type="button" className="scrub-motion" aria-pressed={reduce || osNow} disabled={osNow} onClick={toggleReduce}>
      {reduce || osNow ?'Activar movimiento' : 'Reducir movimiento'}
    </button>
  );

  return (
    <section ref={root} className={`scrub-hero ${staticMode ? 'is-static' : ''}`} data-hydrated={ready ? 'true' : 'false'} aria-label="Apertura: Medellín, a otro nivel">
      <div ref={track} className="scrub-track" style={animated ? { '--total': timeline(mobile).total } : undefined}>
        <div ref={stage} className="scrub-stage" data-ui="deck" data-cap="" data-ch="1" data-card="-1" data-textos={t.estado}>
          {animated && !mobile && (
            <div ref={mqRef} className="bd-mq" aria-hidden="true">
              {cards.map((c) => {
                const place = copy(c.slug).lugar;
                return <p key={c.slug} className="bd-mq-item"><span>{place}</span></p>;
              })}
            </div>
          )}
          <div ref={media} className="scrub-media">
            <picture className="scrub-poster">
              <source media={MOBILE_QUERY} type="image/avif" srcSet={`${BASE}/poster-m.avif`} />
              <source media={MOBILE_QUERY} type="image/webp" srcSet={`${BASE}/poster-m.webp`} />
              <source type="image/avif" srcSet={`${BASE}/poster-1280.avif 1280w, ${BASE}/poster-1600.avif 1600w`} sizes="100vw" />
              <img src={`${BASE}/poster-1600.webp`} srcSet={`${BASE}/poster-1280.webp 1280w, ${BASE}/poster-1600.webp 1600w`} sizes="100vw" width="1600" height="900" alt="Vista de Medellín desde la ladera de la Comuna 13" loading="eager" fetchPriority="high" decoding="async" />
            </picture>
            {animated && <canvas ref={canvas} className="scrub-canvas" aria-hidden="true" />}
          </div>
          <div ref={titleRef} className="scrub-title">
            <p className="eyebrow scrub-lema" data-fx="0">{t.lema}</p>
            <h1><span className="scrub-t1" data-fx="-1"><i className="ln">{t.titular[0]}</i></span> <span className="scrub-t2" data-fx="1"><i className="ln">{t.titular[1]}</i></span></h1>
            <p className="scrub-micro" data-fx="0">{t.confianza}</p>
          </div>
          <div className="scrub-panel">
            {animated && (
              <div className="scrub-index" aria-hidden="true">
                <div className="scrub-ch-stack">
                  {CHAPTERS.map((id, i) => (
                    <p key={id} className="scrub-ch" data-for={i + 1}><span className="scrub-count">{two(i + 1)} / {two(CHAPTERS.length)}</span><span className="scrub-place">{t.fases[id].rotulo}</span></p>
                  ))}
                </div>
                <div className="scrub-segs">{CHAPTERS.map((id, i) => <i key={id} data-for={i + 1} />)}</div>
              </div>
            )}
            <div className="scrub-text">
              <div ref={stackRef} className="scrub-stack">
                <div className="scrub-intro">
                  <p className="scrub-vive">{textoFase('c1').titular}</p>
                  <p className="scrub-vive-sub">{textoFase('c1').subtitulo}</p>
                </div>
                {animated && ['c1', 'c2'].map((id) => {
                  const x = textoFase(id);
                  return (
                    <div key={id} className="scrub-cap" data-for={id} aria-hidden="true">
                      <p className="scrub-cap-title">{x.titular}</p>
                      <p className="scrub-cap-sub">{x.subtitulo}</p>
                    </div>
                  );
                })}
                {deckLinks && cards.map((c, i) => {
                  const tx = copy(c.slug);
                  return (
                    <div key={c.slug} className="scrub-cap bd-cap" data-for="card" data-i={i}>
                      <p className="scrub-count bd-count">{two(i + 1)} / {N}</p>
                      <h2 className="scrub-cap-title bd-name">{c.name}</h2>
                      <p className="scrub-cap-sub"><b>{tx.emocion}:</b> {tx.frase}</p>
                    </div>
                  );
                })}
              </div>
              <div className="scrub-actions">{actions}</div>
            </div>
          </div>
          {animated && !mobile && (
            <div ref={stripRef} className="scrub-strip" aria-hidden="true">
              {cards.map((c, i) => (
                <button key={c.slug} type="button" tabIndex={-1} data-i={i} onClick={() => api.current.jump(uForCard(api.current.T, i))} aria-label={c.name}>
                  <img src={cardImg(c.slug, 't')} width="48" height="60" alt="" decoding="async" loading="lazy" />
                </button>
              ))}
            </div>
          )}
          {animated && mobile && (
            <div ref={stripRef} className="scrub-strip scrub-strip--m" aria-hidden="true">
              {cards.map((c) => <i key={c.slug} style={{ backgroundImage: `url(${cardImg(c.slug, 't')})` }} />)}
            </div>
          )}
          <div className="scrub-ctl">
            {animated && <button ref={skipRef} type="button" className="scrub-skip" onClick={skip}>{skipLabel} <span aria-hidden="true">↓</span></button>}
            {bar}
          </div>
          {animated && !mobile && (
            <div ref={floatRef} className="bd-floats" aria-hidden="true">
              {FLOATS.map(([fx, fy, w, dp, ci, rot], k) => <i key={k} className="bd-float" data-fx={fx} data-fy={fy} data-dp={dp} data-rot={rot} style={{ width: w, height: w * 1.25, backgroundImage: `url(${cardImg(cards[ci].slug, 't')})` }} />)}
            </div>
          )}
          <div ref={deckRef} className="bd-deck">
            {animated && cards.map((c, i) => {
              const tx = copy(c.slug);
              return deckLinks ? (
                <Fragment key={c.slug}>
                  <Link className="bd-card" to={`/experiencias/${c.slug}`} aria-label={`${c.name}. ${tx.emocion}: ${tx.frase}`} onFocus={() => api.current.card(i)} onKeyDown={(e) => onCardKey(e, i)} onPointerMove={tilt} onPointerLeave={untilt}>
                    <span className="bd-tilt">
                      <img className="bd-thumb" src={cardImg(c.slug, 't')} width="320" height="400" alt="" decoding="async" fetchPriority="low" />
                      <img className="bd-full" data-src={cardImg(c.slug, 'd')} width="640" height="800" alt="" decoding="async" onLoad={(e) => e.currentTarget.classList.add('ready')} />
                    </span>
                    
                  </Link>
                  <Link className="bd-plan scrub-btn-plan" to={`/experiencias/${c.slug}#consulta`} aria-label={`Planea esta experiencia: ${c.name}`}>Planea esta experiencia <span aria-hidden="true">↗</span></Link>
                </Fragment>
              ) : (
                <div key={c.slug} className="bd-card" aria-hidden="true"><span className="bd-tilt"><img className="bd-thumb" src={cardImg(c.slug, 't')} width="320" height="400" alt="" decoding="async" fetchPriority="low" /></span></div>
              );
            })}
          </div>
          {animated && !mobile && (
            <div className="bd-nav">
              <button type="button" className="bd-arrow" aria-label="Carta anterior" onClick={() => api.current.step(-1)}>←</button>
              <button type="button" className="bd-arrow" aria-label="Carta siguiente" onClick={() => api.current.step(1)}>→</button>
            </div>
          )}
        </div>
      </div>
      {summary && <p className="scrub-summary">{summary}</p>}
      <Destacada cards={cards} actions={actions} reduce={reduce || staticMode} />
    </section>
  );
}
