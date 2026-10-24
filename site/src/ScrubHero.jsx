import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import manifest from './inicio-frames.json';
import { inicioTextos, CHAPTERS, textoFase } from './inicio-textos';
import { N, timeline, stateAt, buildDims, frameWindow, filmOpening, cardPlace, smooth } from './baraja-geometria';
import './scrub-hero.css';
import { Link } from 'react-router-dom';
import Arrow from './Arrow';

/*
 * Apertura del inicio: «La baraja de recuerdos» (Spec 03 §H1) sobre la película controlada por scroll (§E, §G) — Spec 04.
 * Un único progreso de scroll compartido: el scroll solo cambia `q` (suavizado exponencial) y de él salen, en el mismo
 * fotograma, el fotograma del clip, el Flip de la carta superior (transform + clip-path), la baraja y la marquesina.
 * Scroll nativo + contenedor sticky: nunca se intercepta rueda, teclado ni gesto. Texto en HTML; imagen en <canvas>.
 * Memoria acotada (ventana de ImageBitmap, ver WINDOW).
 * Spec 03 §J1: el bloque vive bajo el pliegue (tras el hero de video y la historia). Nada se pide hasta acercarse (ver `near`):
 * ni los fotogramas, ni las miniaturas flotantes, ni la tira móvil.
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
const WINDOW = { desktop: { ahead: 14, behind: 4 }, mobile: { ahead: 10, behind: 3 } };
const ANCHOR = 8; // cada 8.º fotograma se conserva además a media resolución (respaldo mientras se decodifica la ventana)
const TAU = { desktop: 60, mobile: 50 }; // suavizado corto, sin inercia que se quede atrás
const JUMP = 0.12, SETTLE = 0.0003;
// Miniaturas flotantes decorativas (x, y en fracción del escenario, ancho px, profundidad, carta, rotación): paralaje a distintas profundidades.
// [x, y (fracción del escenario), ancho px, profundidad (velocidad de paralaje), carta, rotación, desenfoque px (las más lejanas), amplitud del paralaje del ratón px]. Fotos de tours distintos, sin repetir y sin la portada del traslado JMC (carta 11).
// Desenfoque de profundidad (7.º valor) rebajado a 0,4–0,6 px (usuario, 2026-10-23: las cartas del fondo se veían borrosas).
const FLOATS = [[0.06, 0.5, 130, 0.3, 2, -4, 0, 16], [0.2, 0.66, 120, 0.15, 7, 3, 0, 12], [0.8, 0.22, 140, 0.2, 4, 4, 0, 14], [0.9, 0.46, 124, 0.3, 10, -3, 0, 16],
  [0.015, 0.3, 92, 0.55, 1, 5, 0.5, 30], [0.05, 0.74, 110, 0.1, 5, -5, 0, 8], [0.7, 0.76, 108, 0.45, 0, 3, 0.4, 26], [0.86, 0.68, 98, 0.6, 8, -6, 0.6, 34], [0.73, 0.07, 88, 0.5, 9, 4, 0.6, 30]];
// Móvil (<800 px): solo 3 cartas sueltas, en los huecos bajo el titular y bajo el mazo (nunca sobre el texto ni sobre el botón de WhatsApp).
const FLOATS_M = [[0.04, 0.7, 72, 0.06, 5, -5, 0, 0], [0.7, 0.72, 66, 0.1, 8, 5, 0.5, 0], [0.76, 0.215, 52, 0.05, 0, 4, 0.4, 0]];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const readReduce = () => { try { return localStorage.getItem(REDUCE_KEY) === '1'; } catch { return false; } };
const writeReduce = (on) => { try { if (on) localStorage.setItem(REDUCE_KEY, '1'); else localStorage.removeItem(REDUCE_KEY); } catch { /* sin almacenamiento: la preferencia dura la sesión */ } };
const osReduce = () => typeof window !== 'undefined' && window.matchMedia(REDUCE_QUERY).matches;

const prefersStatic = (user) => {
  if (typeof window === 'undefined') return true;
  // Sin condición por estimación de red (saveData/3G): Edge la activa en Wi‑Fi normales (usuario, 2026-10-23).
  return Boolean(user || osReduce() || window.matchMedia(LOW_HEIGHT_QUERY).matches);
};

function frameOrder(count, mobile) {
  // Primera pasada navegable (≈2 MB escritorio / ≈1,2 MB móvil): cada 15.º / 10.º fotograma; luego cada 5.º, cada 2.º y el resto.
  const seen = new Set(), order = [];
  for (const step of mobile ? [10, 5, 2, 1] : [15, 5, 2, 1]) for (let i = 0; i < count; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
  if (!seen.has(count - 1)) order.splice(1, 0, count - 1);
  return order;
}

const cardImg = (slug, k) => `${CARDS}/${slug}-${k}.webp`;
const two = (n) => String(n).padStart(2, '0');

export default function ScrubHero({ cards, skipLabel = 'Saltar introducción', nextId, summary }) {
  const root = useRef(null), track = useRef(null), stage = useRef(null), canvas = useRef(null), skipRef = useRef(null), media = useRef(null);
  const haloRef = useRef(null), floatRef = useRef(null), deckRef = useRef(null), titleRef = useRef(null), stackRef = useRef(null);
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
    // Spec 03: móvil comparte los 121 originales completos de d16; ningún relleno ni foto fija interrumpe el clip.
    const wide = !mobile && innerWidth > 1600;
    const set = wide ? manifest.desktop : manifest.desktop1600;
    const suffix = wide ? 'd' : 'd16';
    const tau = mobile ? TAU.mobile : TAU.desktop;
    const win = mobile ? WINDOW.mobile : WINDOW.desktop;
    let dir = 1, prevCenter = 0;
    const count = set.count;
    // Rótulos sin huecos: c1 entra a mitad del Flip y dura hasta que entra c2 (PLAZA); c2 dura hasta media contracción.
    const PLAZA = T.t1 + 0.7 * (T.t2 - T.t1), CAP_C1 = [T.t0 + 0.5 * (T.t1 - T.t0), PLAZA];
    const CAP_C2 = [PLAZA, T.film ? Infinity : T.t3 + 0.5 * (T.t4 - T.t3)]; // móvil: el rótulo «Plaza Botero» se queda hasta el final
    // Comprimidos: Blob de cada fotograma (≈ 8 MB). Decodificados: ImageBitmap solo en ventana (se cierran al salir).
    const blobs = new Array(count).fill(null), full = new Array(count).fill(null), low = new Array(count).fill(null);
    const pending = new Set(), controller = new AbortController();
    let raf = 0, visible = true, destroyed = false, lastKey = '', ui = '', cap = '', chapter = 0, loaded = 0, failures = 0;
    let W = 0, H = 0, stageTop = 92, q = null, lastT = 0, center = 0, version = 0, live = 0, peak = 0, bytes = 0, peakBytes = 0, dims = null, span = 1;
    const fw = {}, cp = {}, lastCard = new Array(N).fill(''), lastFx = {};
    const cardEls = deckRef.current ? [...deckRef.current.querySelectorAll('.bd-card')] : [];
    const fxEls = titleRef.current ? [...titleRef.current.querySelectorAll('[data-fx]')] : [];
    const floatEls = floatRef.current ? [...floatRef.current.querySelectorAll('.bd-float')] : [];
    const haloEl = haloRef.current;


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
      if (dims.m) { // móvil: posición del título calculada con la baraja (sin solapes)
        stageEl.style.setProperty('--m-t1', `${dims.m.t1Top}px`);
        stageEl.dataset.short = dims.m.short ? '1' : '0';
      }
      stageEl.style.setProperty('--deck-x', `${dims.deck.x}px`); stageEl.style.setProperty('--deck-y', `${dims.deck.y}px`); stageEl.style.setProperty('--deck-h', `${dims.Hd}px`);
      stageEl.style.setProperty('--deck-top', `${dims.deck.y - dims.Hd / 2}px`); stageEl.style.setProperty('--deck-bottom', `${dims.deck.y + dims.Hd / 2}px`);
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
    const cover = (img, clipT) => {
      const tail = mobile ? filmOpening(clipT) : 0;
      const visibleH = H + (W * 9 / 16 - H) * tail;
      const iw = img.width, ih = img.height, sc = Math.max(W / iw, visibleH / ih), w = iw * sc, h = ih * sc;
      // El recorte inicial coincide con el póster; se abre hasta mostrar toda la fuente 16:9.
      const focusX = mobile ? .465 + .035 * tail : .5;
      ctx.drawImage(img, -(w - W) * focusX, (H - h) / 2, w, h);
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

    const place = (u, st) => {
      // Marco del clip (Flip): transform + clip-path de la capa de tamaño natural; la carta superior y el lienzo son la misma capa.
      frameWindow(dims, st.w, fw, st.clipT);
      const fullFrame = st.w >= .999 && (!mobile || st.clipT <= .6);
      const fkey = fullFrame ? 'full' : `${st.D.toFixed(2)}|${fw.tx.toFixed(1)}|${fw.ty.toFixed(1)}|${fw.rot.toFixed(2)}|${fw.s.toFixed(4)}|${fw.ix.toFixed(1)}|${fw.iy.toFixed(1)}|${fw.r.toFixed(2)}`;
      const fo = 1 - smooth(clamp(st.rel * 2.5)); // la postal se funde mientras el mazo viaja a su caja
      const mkey = `${fkey}|${fo.toFixed(3)}`;
      if (lastFx.media !== mkey) {
        lastFx.media = mkey;
        if (fullFrame) { mediaEl.style.transform = 'none'; mediaEl.style.clipPath = 'none'; }
        else { mediaEl.style.transform = `translate3d(${fw.tx}px,${fw.ty}px,0) rotate(${fw.rot}deg) scale(${fw.s})`; mediaEl.style.clipPath = `inset(${fw.iy}px ${fw.ix}px round ${fw.r}px)`; }
        if (!mobile) { // detalle postal de la carta de arriba (marco, brillo y sello): sigue la ventana del Flip y se va en el primer cuarto
          mediaEl.style.setProperty('--ix', fw.ix.toFixed(1)); mediaEl.style.setProperty('--iy', fw.iy.toFixed(1)); mediaEl.style.setProperty('--s', fw.s.toFixed(4));
          mediaEl.style.setProperty('--deco', (st.w >= 0.3 ? 0 : (1 - smooth(st.w / 0.3)) * st.D).toFixed(3));
        }
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
      if (haloEl && !mobile) haloEl.style.opacity = (st.D * 0.9).toFixed(3);
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
          const dp = Number(el.dataset.dp), x = Number(el.dataset.fx) * dims.W, y = Number(el.dataset.fy) * dims.H - dp * 720 * fp, k = Number(el.dataset.k);
          const e = smooth(clamp(st.D * 1.7 - k * 0.1)); // entrada escalonada: cada carta suelta aparece un poco después de la anterior
          el.style.transform = `translate3d(${x}px,${y + (1 - e) * 26}px,0) rotate(${Number(el.dataset.rot) * (0.4 + 0.6 * e)}deg) scale(${(0.82 + 0.18 * e).toFixed(3)})`;
          el.style.opacity = e.toFixed(3); el.style.visibility = e < 0.01 ? 'hidden' : 'visible';
        }
      }
      // Fundido final del escenario sobre el de «La mano de viaje» (Spec 03 §K3).
      const fadeKey = st.fade.toFixed(3);
      if (lastFx.fade !== fadeKey) { lastFx.fade = fadeKey; stageEl.style.opacity = st.fade > 0 ? String(1 - st.fade) : ''; stageEl.style.pointerEvents = st.fade >= 1 ? 'none' : ''; }
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
      if (mobile) {
        stageEl.dataset.phase = u < T.t2 ? 'film' : u < T.t3 ? 'hold' : u < T.t4 ? 'shrink' : 'relay';
      }
      if (st.ui !== ui) { ui = st.ui; stageEl.dataset.ui = ui; }
      let newCap = '';
      if (u >= CAP_C1[0] && u < CAP_C1[1]) newCap = 'c1';
      else if (u >= CAP_C2[0] && u < CAP_C2[1]) newCap = 'c2';
      if (newCap !== cap) { cap = newCap; stageEl.dataset.cap = cap; }
      const newChapter = u >= PLAZA ? 2 : 1;
      if (newChapter !== chapter) { chapter = newChapter; stageEl.dataset.ch = String(chapter); }

      center = Math.round(st.clipT * (count - 1));
      manage();
      // Un fotograma real por posición (24 fps completos): sin mezcla entre fotogramas, para evitar fantasmas y desenfoque.
      const baseIdx = Math.round(st.clipT * (count - 1));
      const baseImg = nearest(baseIdx);
      const key = `${W}x${H}|${baseIdx}|${version}|${mobile ? st.clipT.toFixed(5) : ''}`;
      if (key !== lastKey && baseImg) {
        lastKey = key;
        ctx.fillStyle = '#3C3F3B'; ctx.fillRect(0, 0, W, H);
        cover(baseImg, st.clipT);
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
    // Inicialización perezosa (Spec 03 §J1): el bloque está bajo el pliegue; los fotogramas y las imágenes decorativas se piden
    // cuando la sección queda a menos de una pantalla (margen 60 % de la ventana). Antes, solo el HTML y el layout.
    let started = false;
    const start = () => {
      if (started || destroyed) return; started = true;
      for (const el of floatEls) if (el.dataset.bg) el.style.backgroundImage = `url(${el.dataset.bg})`;
      load();
    };
    const near = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { start(); near.disconnect(); } }, { rootMargin: '60% 0px' });
    near.observe(section);
    // Cartas sueltas (ronda 3): paralaje con el ratón (puntero fino; `translate` independiente del transform de scroll) y elevación + brillo al pasar el puntero.
    // Las cartas no reciben eventos (no tapan nada): el cursor se compara con sus cajas, una vez por cuadro.
    let pmRaf = 0, pmX = 0, pmY = 0, hovered = null;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches && floatEls.length > 0;
    const pmTick = () => {
      pmRaf = 0; const box = stageEl.getBoundingClientRect();
      floatRef.current?.style.setProperty('--mx', (((pmX - box.left) / box.width - 0.5) * 2).toFixed(3)); floatRef.current?.style.setProperty('--my', (((pmY - box.top) / box.height - 0.5) * 2).toFixed(3));
      let hit = null; for (const el of floatEls) { if (el.style.visibility === 'hidden' || Number(el.style.opacity) < 0.6) continue; const r = el.getBoundingClientRect(); if (pmX >= r.left && pmX <= r.right && pmY >= r.top && pmY <= r.bottom) hit = el; }
      if (hit !== hovered) { hovered?.removeAttribute('data-hover'); hit?.setAttribute('data-hover', 'true'); hovered = hit; }
    };
    const onPointer = (e) => { pmX = e.clientX; pmY = e.clientY; if (!pmRaf) pmRaf = requestAnimationFrame(pmTick); };
    const onLeave = () => { floatRef.current?.style.setProperty('--mx', '0'); floatRef.current?.style.setProperty('--my', '0'); hovered?.removeAttribute('data-hover'); hovered = null; };
    if (fine) { stageEl.addEventListener('pointermove', onPointer, { passive: true }); stageEl.addEventListener('pointerleave', onLeave); }

    return () => {
      cancelAnimationFrame(pmRaf); stageEl.removeEventListener('pointermove', onPointer); stageEl.removeEventListener('pointerleave', onLeave);
      destroyed = true; controller.abort();
      cancelAnimationFrame(raf); observer.disconnect(); resize.disconnect(); near.disconnect();
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      for (let i = 0; i < count; i++) { drop(full, i); drop(low, i); }
      blobs.fill(null);
      for (const k of ['ready', 'frame', 'loaded', 'progress', 'target', 'settled', 'u', 'bitmaps', 'bitmapsPeak', 'bitmapMb', 'bitmapMbPeak']) delete section.dataset[k];
      for (const el of [mediaEl, haloEl, ...floatEls, ...cardEls, ...fxEls]) { el?.removeAttribute('style'); }
      stageEl.style.opacity = ''; stageEl.style.pointerEvents = '';
      stageEl.dataset.ui = 'deck'; stageEl.dataset.cap = ''; stageEl.dataset.ch = '1';
      for (const k of ['--bw', '--bh', '--stage-h', '--m-t1', '--deck-top', '--deck-bottom', '--deck-x', '--deck-y', '--deck-h']) stageEl.style.removeProperty(k);
      delete stageEl.dataset.short;
      delete stageEl.dataset.phase;
    };
  }, [ready, mode, mobile]);

  const skip = () => {
    const next = (nextId && document.getElementById(nextId)) || document.getElementById('formas-de-viajar');
    if (!next) return;
    next.scrollIntoView({ behavior: 'instant', block: 'start' });
    next.focus({ preventScroll: true });
  };
  const staticMode = mode !== 'scrub';
  const animated = !staticMode;
  const t = inicioTextos;
  const bar = (
    <button type="button" className="scrub-motion" aria-pressed={reduce || osNow} disabled={osNow} onClick={toggleReduce} title={reduce || osNow ? 'Activar movimiento' : 'Reducir movimiento'}>
      <svg className="ctl-ico" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">{reduce || osNow ? <path d="M8 5.5v13l10-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}</svg><span className="ctl-label">{reduce || osNow ?'Activar movimiento' : 'Reducir movimiento'}</span>
    </button>
  );

  return (
    <section ref={root} className={`scrub-hero ${staticMode ? 'is-static' : ''}`} data-hydrated={ready ? 'true' : 'false'} aria-label="Elige tu próximo recuerdo">
      <div ref={track} className="scrub-track" style={animated ? { '--total': timeline(mobile).total } : undefined}>
        <div ref={stage} className="scrub-stage" data-ui="deck" data-cap="" data-ch="1" data-textos={t.estado}>
          <div ref={media} className="scrub-media">
            <picture className="scrub-poster">
              <source media={MOBILE_QUERY} type="image/webp" srcSet={`${BASE}/poster-m.webp`} />
              <img src={`${BASE}/poster-1600.webp`} srcSet={`${BASE}/poster-1280.webp 1280w, ${BASE}/poster-1600.webp 1600w`} sizes="100vw" width="1600" height="900" alt="Vista de Medellín desde la ladera de la Comuna 13" loading="lazy" decoding="async" />
            </picture>
            {animated && <canvas ref={canvas} className="scrub-canvas" aria-hidden="true" />}
            {animated && !mobile && <span className="md-deco" aria-hidden="true"><i className="md-frame" /><i className="md-sheen" /></span>}
          </div>
          <div ref={titleRef} className="scrub-title">
            <p className="eyebrow scrub-lema" data-fx="0">Experiencias</p>
            <h2 className="scrub-t1" data-fx="-1">{t.eleccion}</h2>
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
                      {x.subtitulo ? <p className="scrub-cap-sub">{x.subtitulo}</p> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {staticMode && (
            <ul className="scrub-static-cards" role="list" aria-label="Experiencias">
              {cards.filter((c) => c.slug !== 'traslados-aeropuerto-jmc').map((c) => (
                <li key={c.slug}><Link to={`/experiencias/${c.slug}`} className="ssc-card"><img src={cardImg(c.slug, 't')} width="320" height="400" alt={c.name} loading="lazy" decoding="async" /><span>{c.name}</span></Link></li>
              ))}
            </ul>
          )}
          <div className="scrub-ctl">
            {animated && <button ref={skipRef} type="button" className="scrub-skip" onClick={skip} title={skipLabel}><span className="ctl-label">{skipLabel}</span><Arrow dir="down"/></button>}
            {bar}
          </div>
          {animated && (
            <div ref={floatRef} className="bd-floats" aria-hidden="true">
              {(mobile ? FLOATS_M : FLOATS).map(([fx, fy, w, dp, ci, rot, bl, md], k) => <i key={k} className="bd-float" data-k={k} data-fx={fx} data-fy={fy} data-dp={dp} data-rot={rot} data-bg={cardImg(cards[ci].slug, 't')} style={{ width: w, height: w * 1.25, '--bl': `${bl}px`, '--md': md }} />)}
            </div>
          )}
          <div ref={deckRef} className="bd-deck">
            {animated && !mobile && <i ref={haloRef} className="bd-halo" aria-hidden="true" />}
            {animated && cards.map((c) => (
              <div key={c.slug} className="bd-card" aria-hidden="true">
                <span className="bd-tilt"><img className="bd-thumb" src={cardImg(c.slug, 't')} width="320" height="400" alt="" decoding="async" loading="lazy" /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {summary && <p className="scrub-summary">{summary}</p>}
    </section>
  );
}
