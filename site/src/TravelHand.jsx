import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { tours } from './content';
import { inicioTextos } from './inicio-textos';
import { relayDeck, deckPose, RELAY_SVH, FADE_SVH, smooth } from './baraja-geometria';
import Arrow from './Arrow';
import { t as tr, language } from './i18n';
import './travel-hand.css';

/*
 * «La mano de viaje» — Spec 03 §K (aprobado 2026-10-14) con los ajustes (a)–(f) del usuario. Sustituye a ExperienceExplorer y al tramo de cartas de ScrubHero:
 * cada experiencia aparece UNA vez. Un solo progreso de scroll nativo (nunca interceptado) reparte las 11 experiencias: la portada llega desde el mazo,
 * 6–8 fotos oficiales se abren como una mano de naipes con parallax por profundidad, el nombre del tour va en un título gigante arriba (tinta sólida,
 * nombre completo medido) y una marquesina decorativa del lugar queda detrás. También se elige por índice, ‹ ›, teclado y deslizamiento.
 * Relevo desde la película: la sección se superpone a la pista de ScrubHero (margen negativo) y su escenario, fijo en el mismo sitio, se funde sobre el
 * de la película mientras el mazo ya está en su caja (relayDeck, compartida con baraja-geometria.js). Escrituras solo en `style` (transform/opacity).
 */
const ORDER = ['city-tour-comuna-13', 'tour-de-compras', 'guatape-piedra-del-penol', 'vuelta-a-oriente', 'santa-fe-de-antioquia', 'jardin-antioquia', 'tour-del-cafe-medellin', 'salto-del-buey', 'tour-nocturno-medellin', 'tour-miradores', 'hacienda-napoles'];
const N = ORDER.length;
const CARDS = '/media/baraja';
const SEG = { wide: 30, compact: 80 }; // svh por experiencia (móvil: ≈0,8 pantallas por tour, sin tramos muertos)
const EXIT = 20, RELAY = RELAY_SVH + FADE_SVH;
const WIDE = '(min-width: 1100px)', SMALL = '(max-width: 799px)', REDUCE = '(prefers-reduced-motion: reduce)', LOW = '(max-height: 560px)', REDUCE_KEY = 'tyt-reducir-movimiento';
const MAX_PHOTOS = 8;
const two = (n) => String(n).padStart(2, '0');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const readReduce = () => { try { return localStorage.getItem(REDUCE_KEY) === '1'; } catch { return false; } };
const prefersStatic = () => {
  if (typeof window === 'undefined') return true;
  if (readReduce() || window.matchMedia(REDUCE).matches || window.matchMedia(LOW).matches) return true;
  const c = navigator.connection; return Boolean(c && (c.saveData || ['slow-2g', '2g', '3g'].includes(c.effectiveType)));
};

// Datos: portada de la baraja + hasta 7 fotos oficiales (galería oficial repartida de forma pareja; Traslados JMC no entra; Compras usa sus 3 oficiales).
const ENTRIES = ORDER.map((slug) => {
  const t = tours.find((x) => x.slug === slug), copy = inicioTextos.cartas[slug];
  const pool = t.gallery.filter((_, i) => i > 0 || slug === 'tour-de-compras');
  const n = Math.min(MAX_PHOTOS - 1, pool.length), picked = Array.from({ length: n }, (_, k) => pool[Math.floor((k * pool.length) / n)]);
  const cover = { src: `${CARDS}/${slug}-d.webp`, srcSet: `${CARDS}/${slug}-m.webp 400w, ${CARDS}/${slug}-d.webp 640w, ${CARDS}/${slug}-h.webp 960w`, width: 960, height: 1200, small: `${CARDS}/${slug}-t.webp` };
  const photosList = [cover, ...picked.map((p) => ({ src: p.src, srcSet: p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`, width: p.width, height: p.height, small: p.small || p.src }))];
  return { slug, name: t.name, category: t.category, emocion: copy.emocion, frase: copy.frase, lugar: copy.lugar, photos: photosList };
});
const GROUPS = ENTRIES.reduce((acc, e, i) => { const last = acc[acc.length - 1]; if (last && last.name === e.category) last.items.push(i); else acc.push({ name: e.category, items: [i] }); return acc; }, []);

// Casillas de la mano (fracciones de la región: centro, alto, giro, profundidad de parallax). La 0 es la delantera.
const SLOTS = [
  { cx: 0.5, cy: 0.54, h: 0.76, r: 0, d: 1 }, { cx: 0.2, cy: 0.33, h: 0.4, r: -7, d: 1.5 }, { cx: 0.83, cy: 0.3, h: 0.38, r: 6, d: 0.6 }, { cx: 0.13, cy: 0.79, h: 0.34, r: 5, d: 1.2 },
  { cx: 0.88, cy: 0.74, h: 0.4, r: -5, d: 1.7 }, { cx: 0.36, cy: 0.16, h: 0.27, r: 4, d: 0.5 }, { cx: 0.68, cy: 0.89, h: 0.28, r: -4, d: 0.8 }, { cx: 0.63, cy: 0.15, h: 0.26, r: 7, d: 1.1 },
];

/* Título gigante: tamaño = mín(128 px, ancho útil × 0,92 / ancho medido a 1 px); 2 líneas equilibradas si no cabe en una a ≥ 44 px o en móvil. */
function measure(host, text) {
  const m = document.createElement('span'); m.textContent = text; m.setAttribute('aria-hidden', 'true');
  m.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;font:800 100px/1 Montserrat,Arial,sans-serif;letter-spacing:-.04em'; host.appendChild(m);
  const w = m.getBoundingClientRect().width / 100; m.remove(); return w;
}
function fitTitle(host, text, small) {
  const avail = host.clientWidth; if (avail <= 0) return null;
  const target = avail * 0.92, one = Math.min(128, target / measure(host, text));
  if (!small && one >= 44) return { size: one, lines: [text] };
  const words = text.split(' '); let best = null;
  for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(' '), b = words.slice(i).join(' '), w = Math.max(measure(host, a), measure(host, b)); if (!best || w < best.w) best = { w, lines: [a, b] }; }
  return best ? { size: Math.min(128, target / best.w), lines: best.lines } : { size: one, lines: [text] };
}

function Photo({ photo, entry, k, primary }) {
  return <img className="th-photo" data-k={k} src={photo.src} srcSet={photo.srcSet} sizes={primary ? '(max-width: 799px) 84vw, 36vw' : '(max-width: 799px) 40vw, 18vw'} width={photo.width} height={photo.height} alt={`${entry.name}, fotografía ${k + 1}`} loading={primary ? 'eager' : 'lazy'} fetchPriority={primary ? 'auto' : 'low'} decoding="async" draggable="false" />;
}

export default function TravelHand() {
  const [ready, setReady] = useState(false), [mode, setMode] = useState('static'), [layout, setLayout] = useState('wide');
  const [active, setActive] = useState(0), [shown, setShown] = useState(0), [swap, setSwap] = useState(''); // swap: '' | 'out'
  const [full, setFull] = useState(() => new Set([0])), [fronts, setFronts] = useState({}), [live, setLive] = useState('');
  const [fit, setFit] = useState({ size: 64, lines: [ENTRIES[0].name] });
  const root = useRef(null), track = useRef(null), stage = useRef(null), handEl = useRef(null), titleHost = useRef(null), mqEl = useRef(null), deckEl = useRef(null), tabs = useRef([]);
  const st = useRef({ active: 0, fronts: {}, manualY: null, jump: () => {}, flip: 0 });
  st.current.fronts = fronts;
  const animated = mode === 'scrub';
  const display = (i) => tr(ENTRIES[i].name).toLocaleUpperCase(language() === 'en' ? 'en' : 'es');

  useLayoutEffect(() => {
    const decide = () => {
      const head = document.querySelector('.site-header')?.offsetHeight || 92, wide = window.matchMedia(WIDE).matches;
      const fits = window.innerHeight - head >= (wide ? 560 : 640);
      setLayout(wide ? 'wide' : 'compact'); setMode(prefersStatic() || !fits ? 'static' : 'scrub');
    };
    decide(); setReady(true);
    // La barra de direcciones del móvil cambia la altura de la ventana: los cambios de alto < 120 px con el mismo ancho se ignoran (nada se recalcula).
    let last = [innerWidth, innerHeight];
    const onResize = () => { if (innerWidth === last[0] && Math.abs(innerHeight - last[1]) < 120) return; last = [innerWidth, innerHeight]; decide(); };
    const queries = [WIDE, REDUCE, LOW, SMALL].map((q) => window.matchMedia(q));
    queries.forEach((q) => q.addEventListener('change', decide)); window.addEventListener('tyt-motion', decide); window.addEventListener('resize', onResize);
    return () => { queries.forEach((q) => q.removeEventListener('change', decide)); window.removeEventListener('tyt-motion', decide); window.removeEventListener('resize', onResize); };
  }, []);

  // Cambio de experiencia: el título y el panel salen (220 ms) y entran (420 ms); se mantiene quieto mientras se lee.
  const shownRef = useRef(0), swapTimer = useRef(0);
  useEffect(() => {
    if (active === shownRef.current) return undefined;
    if (!animated) { shownRef.current = active; setShown(active); return undefined; }
    setSwap('out'); clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => { shownRef.current = active; setShown(active); setSwap(''); }, 220);
    return () => clearTimeout(swapTimer.current);
  }, [active, animated]);
  // Imágenes decodificadas antes de mostrarse (sin parpadeo al cambiar de tour): el siguiente tour completo y la portada del que sigue.
  useEffect(() => {
    if (!animated) return undefined;
    const done = [];
    [[active + 1, true], [active + 2, false]].forEach(([gi, all]) => {
      const e = ENTRIES[gi]; if (!e || navigator.connection?.saveData) return;
      (all ? e.photos : e.photos.slice(0, 1)).forEach((p, k) => { const im = new Image(); im.decoding = 'async'; im.sizes = k === 0 ? '(max-width: 799px) 84vw, 36vw' : '(max-width: 799px) 40vw, 18vw'; im.srcset = p.srcSet; im.src = p.src; im.decode?.().catch(() => {}); done.push(im); });
    });
    return () => { done.length = 0; };
  }, [active, animated]);
  useEffect(() => { setFull((prev) => (prev.has(active) ? prev : new Set(prev).add(active))); }, [active]);

  // Compacto: el chip activo se centra dentro del carril sin mover la página.
  useEffect(() => {
    const el = tabs.current[active], list = el?.closest('[role=tablist]');
    if (!animated || layout !== 'compact' || !el || !list) return;
    list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2, behavior: 'instant' });
  }, [active, animated, layout]);

  // Ajuste del título gigante.
  useLayoutEffect(() => {
    if (!animated || !titleHost.current) return undefined;
    const run = () => { const f = fitTitle(titleHost.current, display(shown), window.matchMedia(SMALL).matches); if (f) setFit((p) => (p.size === f.size && p.lines.join('|') === f.lines.join('|') ? p : f)); };
    run(); document.fonts?.ready.then(run);
    const ro = new ResizeObserver(run); ro.observe(titleHost.current);
    return () => ro.disconnect();
  }, [animated, shown, layout]);

  useLayoutEffect(() => {
    if (!ready || !animated) return undefined;
    const trackEl = track.current, stageEl = stage.current, hand = handEl.current, mq = mqEl.current, deck = deckEl.current;
    const small = window.matchMedia(SMALL).matches, wide = layout === 'wide', seg = wide ? SEG.wide : SEG.compact, shrink = wide ? 1 : 0.82; // móvil: fotos ≈18 % más pequeñas, dentro de su propia región
    const total = RELAY + N * seg + EXIT;
    let raf = 0, visible = true, destroyed = false, q = null, lastT = 0, stageTop = 92, span = 1, RW = 0, RH = 0, sw = 0, sh = 0;
    let groupCache = null, trackTop = 0;
    const groups = () => groupCache || (groupCache = [...hand.querySelectorAll('.th-group')]);
    // Medidas del carril precalculadas (resize / ResizeObserver): el cuadro de scroll no lee layout.
    const measureTrack = () => { span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight); trackTop = trackEl.getBoundingClientRect().top + scrollY; };

    const metrics = () => {
      stageTop = document.querySelector('.site-header')?.offsetHeight || 92;
      root.current.style.setProperty('--th-top', `${stageTop}px`);
      RW = hand.clientWidth; RH = hand.clientHeight; sw = stageEl.clientWidth; sh = stageEl.clientHeight; measureTrack();
      // Mazo de portadas pendientes: misma caja y rotaciones que el relevo de la película.
      const R = relayDeck(sw, sh, small);
      deck.style.setProperty('--dw', `${R.w}px`); deck.style.setProperty('--dh', `${R.h}px`); deck.style.setProperty('--dx', `${R.x - R.w / 2}px`); deck.style.setProperty('--dy', `${R.y - R.h / 2}px`);
      lastKey = '';
    };
    let lastKey = '';

    const apply = (P) => {
      const idx = clamp(Math.floor(P), 0, N - 1), s = clamp(P - idx, 0, 1), P2 = clamp(P, 0, N);
      if (idx !== st.current.active) { st.current.active = idx; setActive(idx); }
      const key = `${P2.toFixed(4)}|${RW}x${RH}|${JSON.stringify(st.current.fronts)}`;
      if (key === lastKey) return; lastKey = key;
      for (const g of groups()) {
        const gi = Number(g.dataset.i), local = P2 - gi, f = st.current.fronts[gi] || 0;
        const vis = local > -0.2 && local < 1.25; g.style.visibility = vis ? 'visible' : 'hidden';
        if (!vis) continue;
        const ls = clamp(local, 0, 1), before = local < 0 ? smooth(clamp(1 + local * 4)) : 0; // llega desde el mazo en el 0–15 % del tramo
        const imgs = [...g.querySelectorAll('.th-photo')], n = imgs.length;
        imgs.forEach((img, k) => {
          const slotIdx = k === f ? 0 : k < f ? k + 1 : k, slot = SLOTS[slotIdx % SLOTS.length], h = slot.h * RH * shrink, w = h * 0.8;
          if (img._w !== w) { img.style.width = `${w}px`; img.style.height = `${h}px`; img._w = w; }
          const front = slotIdx === 0;
          const tIn = front ? 0 : 0.14 + 0.055 * (slotIdx - 1), eIn = local < 0 ? 0 : front ? smooth(ls / 0.15) : smooth((ls - tIn) / 0.22);
          const eOut = smooth((ls - (0.86 + 0.012 * slotIdx)) / 0.14);
          const dirx = (slot.cx - 0.5) * 1.7, diry = (slot.cy - 0.5) * 1.7, inv = 1 - eIn;
          const par = (0.5 - ls) * slot.d * 0.16 * RH, parx = (ls - 0.5) * slot.d * 0.035 * RW;
          const sc = (front ? 0.82 + 0.18 * eIn : 0.55 + 0.45 * eIn) * (1 + 0.04 * eOut) * (1 + 0.03 * (slot.d - 1) * (ls - 0.5));
          const rot = front ? slot.r - 6 * inv - 8 * eOut : slot.r * (0.4 + 0.6 * eIn) + 14 * inv * Math.sign(dirx || 1) - 8 * eOut;
          const x = slot.cx * RW - w / 2 + (front ? 0 : dirx * RW * 0.5 * inv) + parx - eOut * RW * 0.3 * (0.4 + slot.d * 0.3);
          const y = slot.cy * RH - h / 2 + (front ? 0.28 * RH * inv : diry * RH * 0.5 * inv) + par - eOut * RH * 0.45 * (0.5 + slot.d * 0.25);
          const o = (front ? Math.max(0.0001, smooth(ls / 0.08) + (local < 0 ? 0 : 0)) : eIn) * (1 - eOut) * (local < 0 ? 0 : 1);
          img.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
          img.style.opacity = o.toFixed(3); img.style.zIndex = String(front ? 30 : 2 + Math.round(slot.d * 4));
          img.style.pointerEvents = o > 0.6 && local >= 0 && local <= 1 ? 'auto' : 'none';
        });
      }
      // Marquesina decorativa del lugar: −25 % del ancho por tramo, sin bucle.
      const ls0 = clamp(P2 - idx, 0, 1);
      mq.style.transform = `translate3d(${(0.12 * sw - 0.25 * ls0 * sw).toFixed(1)}px,-50%,0)`;
      // Mazo pendiente: cartas del siguiente al quinto; se desvanece al final.
      deck.style.opacity = String(clamp(1 - (P2 - (N - 2)) * 1.2));
    };

    const render = (now) => {
      raf = 0;
      if (destroyed || !visible || document.hidden) { lastT = 0; return; }
      const f = clamp((scrollY + stageTop - trackTop) / span), u = f * total;
      // Fundido de entrada del escenario sobre el de la película (últimos FADE_SVH del relevo); al subir, simétrico.
      const fin = clamp((u - (RELAY - FADE_SVH)) / FADE_SVH);
      if (stageEl._fin !== fin) { stageEl._fin = fin; stageEl.style.setProperty('--fin', fin.toFixed(3)); stageEl.style.pointerEvents = fin < 1 ? 'none' : ''; stageEl.dataset.on = fin > 0 ? 'true' : 'false'; }
      const target = clamp((u - RELAY) / seg, 0, N);
      const dt = lastT ? Math.min(64, now - lastT) : 16; lastT = now;
      if (q === null || Math.abs(target - q) > 0.12 * 3) q = target; else q += (target - q) * (1 - Math.exp(-dt / (wide ? 60 : 45))); // móvil: τ ≤ 50 ms, sin sensación elástica
      let moving = true; if (Math.abs(target - q) < 0.0004) { q = target; moving = false; }
      // La elección manual de foto se mantiene hasta que el scroll se mueve > 24 px.
      if (st.current.manualY !== null && Math.abs(scrollY - st.current.manualY) > 24) { st.current.manualY = null; if (Object.keys(st.current.fronts).length) setFronts({}); }
      apply(q);
      if (moving) schedule(); else lastT = 0;
    };
    const schedule = () => { if (!raf && !destroyed) raf = requestAnimationFrame(render); };
    const onScroll = () => schedule();
    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { lastT = 0; lastKey = ''; schedule(); } else if (raf) { cancelAnimationFrame(raf); raf = 0; } }, { rootMargin: '200px 0px' });
    const resize = new ResizeObserver(() => { metrics(); schedule(); });

    st.current.jump = (i, s = 0.56) => {
      const u = RELAY + (i + s) * seg;
      window.scrollTo({ top: trackTop - stageTop + (u / total) * span, behavior: 'instant' }); schedule();
    };
    st.current.refresh = () => { groupCache = null; lastKey = ''; schedule(); };
    const bodyRO = new ResizeObserver(() => { measureTrack(); lastKey = ''; schedule(); }); bodyRO.observe(document.body);
    metrics(); observer.observe(root.current); resize.observe(hand); resize.observe(stageEl);
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onScroll);
    schedule();
    return () => {
      destroyed = true; cancelAnimationFrame(raf); observer.disconnect(); resize.disconnect(); bodyRO.disconnect();
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); document.removeEventListener('visibilitychange', onScroll);
      st.current.jump = () => {}; st.current.refresh = () => {};
      for (const img of hand.querySelectorAll('.th-photo')) { img.removeAttribute('style'); delete img._w; }
    };
  }, [ready, animated, layout]);

  // Tras montar un grupo o cambiar la foto delantera, se recoloca de inmediato.
  useLayoutEffect(() => { st.current.refresh?.(); }, [full, fronts, active]);

  const select = useCallback((gi, next, announce) => {
    const n = ENTRIES[gi].photos.length, f = ((next % n) + n) % n;
    setFronts((p) => ({ ...p, [gi]: f })); st.current.manualY = scrollY;
    const el = handEl.current; if (el) { el.dataset.flip = 'true'; clearTimeout(st.current.flip); st.current.flip = setTimeout(() => { el.dataset.flip = 'false'; }, 650); }
    if (announce) setLive(`Foto ${f + 1} de ${n}, ${ENTRIES[gi].name}`);
  }, []);
  const onTabKey = (e, i) => {
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % N : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i + N - 1) % N : e.key === 'Home' ? 0 : e.key === 'End' ? N - 1 : null;
    if (next === null) return; e.preventDefault(); st.current.jump(next); tabs.current[next]?.focus({ preventScroll: true });
  };
  const nowFront = fronts[active] || 0, entry = ENTRIES[shown];
  const t = inicioTextos, seg = layout === 'wide' ? SEG.wide : SEG.compact;
  const trackStyle = animated ? { '--th-total': RELAY + N * seg + EXIT } : undefined;

  const header = (
    <div className="th-head">
      <p className="eyebrow">{t.eleccion}</p>
      <h2 id="th-titulo">Un lugar para cada{' '}<br /><em>forma de viajar.</em></h2>
    </div>
  );

  if (!animated) {
    // Estático / sin JS / reducido: lista de las 11 experiencias con foto, nombre, emoción y frase (K8).
    return (
      <section ref={root} className="th th--static wrap section" id="formas-de-viajar" tabIndex={-1} data-hydrated={ready ? 'true' : 'false'} aria-labelledby="th-titulo">
        <div className="section-title"><div>{header}</div><Link className="text-link" to="/experiencias">Ver las 12 experiencias<Arrow /></Link></div>
        <ul className="th-list" role="list">
          {ENTRIES.map((e, i) => (
            <li key={e.slug}>
              <Link className="th-card" to={`/experiencias/${e.slug}`}>
                <span className="th-card-img"><img src={e.photos[0].small} srcSet={e.photos[0].srcSet} sizes="(max-width: 699px) 92vw, (max-width: 1099px) 46vw, 30vw" width="400" height="500" alt="" loading="lazy" decoding="async" /></span>
                <span className="th-card-count">{two(i + 1)} / {two(N)} · {e.category}</span>
                <h3>{e.name}</h3>
                <p><b>{e.emocion}:</b> {e.frase}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section ref={root} className="th" id="formas-de-viajar" tabIndex={-1} data-hydrated="true" data-layout={layout} aria-labelledby="th-titulo">
      <div ref={track} className="th-track" style={trackStyle}>
        <div ref={stage} className="th-stage" data-on="false" data-swap={swap}>
          <div className="th-mq-clip" aria-hidden="true"><div ref={mqEl} className="th-mq"><span>{entry.lugar}</span></div></div>
          {header}
          <div ref={titleHost} className="th-title-host">
            <h3 className="th-title" style={{ fontSize: `${fit.size.toFixed(2)}px` }}>{fit.lines.map((l) => <span key={l}>{l}</span>)}</h3>
          </div>
          <nav className="th-index" aria-label="Experiencias">
            <div role="tablist" aria-orientation={layout === 'wide' ? 'vertical' : 'horizontal'}>
              {GROUPS.map((g) => (
                <div className="th-group-tabs" key={g.name}>
                  {g.items.map((i) => (
                    <button key={ENTRIES[i].slug} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`th-tab-${i}`} aria-controls="th-hand" aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => st.current.jump(i)} onKeyDown={(e) => onTabKey(e, i)}><span>{two(i + 1)}</span>{ENTRIES[i].name}</button>
                  ))}
                </div>
              ))}
            </div>
            <a className="th-skip" href="#camino">Saltar experiencias</a>
          </nav>
          <div ref={handEl} id="th-hand" className="th-hand" role="region" aria-roledescription="carrusel" aria-label={`Fotografías de ${ENTRIES[active].name}`} tabIndex={0}
            onKeyDown={(e) => { if (['ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); select(active, nowFront + (e.key === 'ArrowRight' ? 1 : -1), true); } }}
            onClick={(e) => { const img = e.target.closest?.('.th-photo'); if (img) select(active, Number(img.dataset.k), true); }}
            onPointerDown={(e) => { st.current.sx = e.clientX; st.current.sy = e.clientY; }}
            onPointerUp={(e) => { const dx = e.clientX - (st.current.sx ?? e.clientX), dy = e.clientY - (st.current.sy ?? e.clientY); if (e.pointerType !== 'mouse' && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.2) select(active, nowFront + (dx < 0 ? 1 : -1), true); }}>
            {ENTRIES.map((e, gi) => {
              const near = Math.abs(gi - active) <= 1, hasFull = full.has(gi);
              if (!near && !hasFull) return null;
              return <div className="th-group" data-i={gi} key={e.slug} aria-hidden={gi === active ? undefined : 'true'}>{e.photos.map((p, k) => (k === 0 || hasFull) ? <Photo key={k} photo={p} entry={e} k={k} primary={gi === active || k === 0} /> : null)}</div>;
            })}
          </div>
          <div className="th-foot">
            <p className="th-cap">{ENTRIES[active].name} · fotografía {two(nowFront + 1)} de {two(ENTRIES[active].photos.length)}</p>
            <div className="th-dots" role="group" aria-label="Fotografías">
              {ENTRIES[active].photos.map((_, k) => <button key={k} type="button" aria-label={`Foto ${k + 1} de ${ENTRIES[active].photos.length}`} aria-current={k === nowFront ? 'true' : undefined} onClick={() => select(active, k, true)}><i /></button>)}
            </div>
            <div className="th-arrows">
              <button type="button" aria-label="Fotografía anterior" onClick={() => select(active, nowFront - 1, true)}><Arrow dir="left" /></button>
              <button type="button" aria-label="Fotografía siguiente" onClick={() => select(active, nowFront + 1, true)}><Arrow dir="right" /></button>
            </div>
          </div>
          <aside className="th-panel" aria-label="Detalle de la experiencia">
            <p className="th-count">{two(shown + 1)} / {two(N)} · {entry.category}</p>
            <p className="th-line"><b>{entry.emocion}:</b> {entry.frase}</p>
            <Link className="text-link" to={`/experiencias/${entry.slug}`}>Ver experiencia<Arrow /></Link>
            <Link className="button" to={`/experiencias/${entry.slug}#consulta`}>Planea esta experiencia<Arrow /></Link>
          </aside>
          <div ref={deckEl} className="th-deck" aria-hidden="true" inert>
            {ENTRIES.slice(active + 1, active + 6).map((e, i) => { const pose = deckPose(i); return <img key={e.slug} src={e.photos[0].small} alt="" width="120" height="150" style={{ transform: `translate(${pose.dx * 0.5}px,${pose.dy * 0.5}px) rotate(${pose.r}deg)`, zIndex: 9 - i }} />; })}
          </div>
          <p className="sr-only" aria-live="polite">{live}</p>
        </div>
      </div>
      {layout === 'compact' && ENTRIES.map((e, i) => <i key={e.slug} className="th-snap" aria-hidden="true" style={{ top: `calc(${RELAY + (i + 0.56) * seg} * 1svh)` }} />)}
      <div id="th-inicio" className="th-marker" tabIndex={-1} role="group" aria-label="Un lugar para cada forma de viajar" style={{ top: `calc(${RELAY} * 1svh)` }} />
      <p className="th-all"><Link className="text-link" to="/experiencias">Ver las 12 experiencias<Arrow /></Link></p>
    </section>
  );
}
