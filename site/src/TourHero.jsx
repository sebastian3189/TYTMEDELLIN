import { useCallback, useEffect, useRef, useState } from 'react';
import { useLightMotion } from './PremiumMotion';
import { Picture, Arrow, Eyebrow } from './shared';
import './card-stack.css';

/*
 * Baraja interactiva de la ficha (pedido del usuario 2026-10-14; sustituye a la baraja decorativa): TODAS las cartas son fotos reales del tour y todas se usan.
 * Pila desplazada (3–4 cartas visibles, giro y profundidad leves). La carta de arriba se arrastra/desliza: sale volando girando en 3D (rotateY/rotateZ ≤ 18°) y
 * se desliza al fondo mientras las demás suben un nivel con resorte escalonado; también con clic/toque, ‹ ›, ←/→. Doble clic o «Ampliar» abre el visor.
 * Distinta de la baraja del inicio. Solo transform/opacity, un único rAF para el arrastre, imágenes decodificadas con decode(); touch-action:pan-y (el scroll
 * vertical nunca se bloquea). Movimiento reducido: fundido cruzado sin vuelo. Región «carrusel» con aria-live al actuar.
 */
const VISIBLE = 4, MAX = 12;
const ROT = [-1, 2.6, -2.4, 3.4];
const pose = (k) => { const j = Math.min(k, VISIBLE - 1); return `translate3d(${j * 12}px,${-j * 14}px,0) rotate(${ROT[j]}deg) scale(${(1 - j * 0.05).toFixed(3)})`; };
const two = (n) => String(n).padStart(2, '0');

export default function TourHero({ tour }) {
  const light = useLightMotion();
  const photos = tour.hero ? [tour.hero, ...tour.gallery.filter((g) => g.src !== tour.hero.src)].slice(0, MAX) : [], n = photos.length; // sin portada (Tour Miradores): sin pila
  const [cur, setCur] = useState(0), [flying, setFlying] = useState(-1), [live, setLive] = useState(''), [viewer, setViewer] = useState(false);
  const stage = useRef(null), els = useRef([]), dlg = useRef(null), busy = useRef(false), drag = useRef(null), raf = useRef(0), tilt = useRef(0), side = useRef(1), moved = useRef(false), curRef = useRef(0);
  curRef.current = cur;

  // Las tres siguientes fotos se decodifican antes de subir de nivel (sin parpadeo).
  useEffect(() => { [1, 2, 3].forEach((d) => { const p = photos[(cur + d) % n]; if (!p) return; const im = new Image(); im.decoding = 'async'; im.sizes = '440px'; im.srcset = p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`; /* sizes ANTES de srcset: si no, el navegador elige con 100vw y baja la versión grande */ im.src = p.src; im.decode?.().catch(() => {}); }); }, [cur, n]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback((dir, from, sd) => {
    if (busy.current || n < 2) return;
    const c = curRef.current, announce = (i) => setLive(`Foto ${i + 1} de ${n}, ${tour.name}`);
    if (light || !stage.current?.animate) { const i = (c + dir + n) % n; setCur(i); announce(i); return; }
    busy.current = true;
    const W = stage.current.offsetWidth || 360, s = sd || (side.current = -side.current);
    const flown = `translate3d(${s * W * 0.85}px,-34px,0) rotateZ(${s * 17}deg) rotateY(${-s * 18}deg)`;
    if (dir > 0) {
      const el = els.current[c], next = (c + 1) % n, fromT = from || getComputedStyle(el).transform;
      setFlying(c); setCur(next); announce(next);
      const a1 = el.animate([{ transform: fromT, opacity: 1 }, { transform: flown, opacity: 0.92 }], { duration: 430, easing: 'cubic-bezier(.25,.7,.3,1)', fill: 'forwards' });
      a1.finished.then(() => {
        setFlying(-1); const k = n - 1;
        const a2 = el.animate([{ transform: flown, opacity: 0.92 }, { transform: pose(k), opacity: k < VISIBLE ? 1 : 0 }], { duration: 480, easing: 'cubic-bezier(.34,1.3,.5,1)', fill: 'forwards' });
        return a2.finished.then(() => { a1.cancel(); a2.cancel(); busy.current = false; });
      }).catch(() => { busy.current = false; });
    } else {
      const prev = (c - 1 + n) % n, el = els.current[prev];
      setFlying(prev); setCur(prev); announce(prev);
      const a = el.animate([{ transform: from || flown, opacity: 0.92 }, { transform: pose(0), opacity: 1 }], { duration: 520, easing: 'cubic-bezier(.34,1.25,.5,1)', fill: 'forwards' });
      a.finished.then(() => { a.cancel(); setFlying(-1); busy.current = false; }).catch(() => { busy.current = false; });
    }
  }, [light, n, tour.name]);

  // Arrastre de la carta de arriba: un solo rAF escribe el transform; al soltar, vuelo (distancia o velocidad) o regreso con resorte.
  const paintDrag = () => {
    raf.current = 0; const d = drag.current, el = els.current[curRef.current]; if (!d || !el) return;
    el.style.transition = 'none'; el.style.transform = `translate3d(${d.dx}px,${(d.dy * 0.25).toFixed(1)}px,0) rotate(${(-1 + d.dx * 0.06).toFixed(2)}deg) rotateY(${(-d.dx * 0.05).toFixed(2)}deg)`;
  };
  const onDown = (e) => {
    if (busy.current || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag.current = { x: e.clientX, y: e.clientY, dx: 0, dy: 0, vx: 0, lx: e.clientX, lt: performance.now() }; moved.current = false;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    const d = drag.current; if (!d) return;
    d.dx = e.clientX - d.x; d.dy = e.clientY - d.y; const now = performance.now(); if (now - d.lt > 16) { d.vx = (e.clientX - d.lx) / (now - d.lt); d.lx = e.clientX; d.lt = now; }
    if (Math.abs(d.dx) > 6) moved.current = true;
    if (!raf.current) raf.current = requestAnimationFrame(paintDrag);
  };
  const onUp = (e) => {
    const d = drag.current; drag.current = null; cancelAnimationFrame(raf.current); raf.current = 0; if (!d) return;
    const el = els.current[curRef.current];
    if (moved.current && el) {
      if (Math.abs(d.dx) > 80 || Math.abs(d.vx) > 0.55) { const sd = (d.dx || d.vx) > 0 ? 1 : -1; side.current = -sd; go(1, getComputedStyle(el).transform, sd); }
      else { el.style.transition = ''; el.style.transform = pose(0); }
    }
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };
  // Inclinación de paralaje sutil (solo puntero fino, sin reducido).
  const onHover = (e) => {
    if (light || e.pointerType !== 'mouse' || drag.current || !stage.current) return;
    const r = stage.current.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(tilt.current);
    tilt.current = requestAnimationFrame(() => { if (stage.current) stage.current.style.transform = `perspective(1100px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`; });
  };
  const onLeave = () => { cancelAnimationFrame(tilt.current); if (stage.current) stage.current.style.transform = ''; };
  const open = () => { setViewer(true); requestAnimationFrame(() => dlg.current?.showModal()); };
  const onKey = (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } else if (e.key === 'Enter') { e.preventDefault(); open(); } };

  if (!n) return null;
  return (
    <section className="cs wrap" aria-label={tour.name}>
      <div className="cs-text">
        <Eyebrow>{tour.category} · Desde Medellín</Eyebrow>
        <h2>{tour.name}</h2>
        <p>{tour.title}</p>
        <a className="button" href="#consulta">Planea esta experiencia <Arrow /></a>
      </div>
      <div className="cs-wrap">
        <div className="cs-region" role="region" aria-roledescription="carrusel" aria-label={`Fotografías de ${tour.name}`} tabIndex={0} onKeyDown={onKey} onPointerMove={onHover} onPointerLeave={onLeave}>
          <div ref={stage} className="cs-stage" data-light={light ? 'true' : 'false'}>
            {photos.map((p, i) => {
              const k = (i - cur + n) % n, top = k === 0;
              return (
                <div key={p.src} ref={(el) => { els.current[i] = el; }} className={`cs-card${top ? ' is-top' : ''}`} aria-hidden={top ? undefined : 'true'}
                  style={{ transform: pose(k), opacity: light ? (top ? 1 : 0) : k < VISIBLE ? 1 : 0, zIndex: i === flying ? 40 : 30 - k, transitionDelay: `${Math.min(k, 4) * 45}ms` }}
                  onPointerDown={top ? onDown : undefined} onPointerMove={top ? onMove : undefined} onPointerUp={top ? onUp : undefined} onPointerCancel={top ? onUp : undefined}
                  onClick={top ? () => { if (moved.current) { moved.current = false; return; } go(1); } : undefined} onDoubleClick={top ? open : undefined}>
                  {k <= VISIBLE && <Picture photo={p} alt={top ? `${tour.name}, fotografía ${i + 1} de ${n}` : ''} priority={false} sizes="(max-width: 700px) 72vw, 440px" />}{/* solo las visibles y la siguiente: las demás no se descargan (2026-10-24) */}
                </div>
              );
            })}
          </div>
        </div>
        <div className="cs-foot">
          <p className="cs-count" aria-hidden="true">{two(cur + 1)} / {two(n)}</p>
          <div className="cs-bar" aria-hidden="true"><i style={{ transform: `scaleX(${(cur + 1) / n})` }} /></div>
          <div className="cs-btns">
            <button type="button" aria-label="Fotografía anterior" onClick={() => go(-1)}><Arrow dir="left" /></button>
            <button type="button" aria-label="Fotografía siguiente" onClick={() => go(1)}><Arrow dir="right" /></button>
            <button type="button" className="cs-zoom" onClick={open}>Ampliar</button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{live}</p>
      </div>
      {viewer && (
        <dialog ref={dlg} className="gallery-dialog ta-dialog" aria-label={`Galería ampliada de ${tour.name}`} onClose={() => setViewer(false)} onClick={(e) => { if (e.target === dlg.current) dlg.current.close(); }}>
          <button type="button" className="ta-close" aria-label="Cerrar" onClick={() => dlg.current.close()}>×</button>
          <img src={photos[cur].src} srcSet={photos[cur].srcset || `${photos[cur].small} 640w, ${photos[cur].src} ${photos[cur].width}w`} sizes="90vw" loading="lazy" alt={`${tour.name}, fotografía ${cur + 1}`} />
          <div className="ta-dlg-nav"><button type="button" aria-label="Fotografía anterior" onClick={() => setCur((c) => (c - 1 + n) % n)}><Arrow dir="left" /></button><button type="button" aria-label="Fotografía siguiente" onClick={() => setCur((c) => (c + 1) % n)}><Arrow dir="right" /></button></div>
        </dialog>
      )}
    </section>
  );
}
