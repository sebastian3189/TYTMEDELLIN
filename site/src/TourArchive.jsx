import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useLightMotion, useMedia, useMounted } from './PremiumMotion';
import { smooth, clamp, placePhotos, placeLugar, smallCaps } from './hand-geometria';
import { archiveEntry } from './tour-entry';
import FeaturedGallery from './FeaturedGallery';
import Arrow from './Arrow';
import { t } from './i18n';
import './travel-hand.css';
import './tour-motion.css';

/*
 * «Archivo de nuestros viajes» como mano de viaje — Spec 03 §M3.7 + precisión del usuario (2026-10-14): MISMA geometría que el inicio (`hand-geometria.js`:
 * casillas, parallax por profundidad, llegada desde el mazo, apertura en abanico, salida), parametrizada por tour. Marquesina del lugar detrás, flechas, teclado,
 * gesto de deslizar y visor al tocar la foto delantera. Escritorio: escenario fijado un tramo corto (un progreso de scroll nativo, nunca interceptado).
 * Móvil, tablet, reducido y sin JS: la galería de siempre (scroll natural, miniaturas y visor).
 */
const SEG_SVH = 230;
export default function TourArchive({ tour }) {
  const light = useLightMotion(), wide = useMedia('(min-width: 1100px)'), tall = useMedia('(min-height: 640px)'), mounted = useMounted();
  const animated = mounted && wide && tall && !light;
  const entry = archiveEntry(tour.slug), photos = entry.photos.slice(0, 8), n = photos.length;
  const [front, setFront] = useState(0), [viewer, setViewer] = useState(false), [live, setLive] = useState('');
  const track = useRef(null), stage = useRef(null), hand = useRef(null), mq = useRef(null), dlg = useRef(null), st = useRef({ front: 0, manualY: null, refresh: () => {} });
  st.current.front = front;

  useLayoutEffect(() => {
    if (!animated) return undefined;
    const trackEl = track.current, stageEl = stage.current, handEl = hand.current, mqEl = mq.current;
    let raf = 0, visible = true, q = null, last = 0, RW = 0, RH = 0, sw = 0, trackTop = 0, span = 1, head = 92;
    const measure = () => { head = document.querySelector('.site-header')?.offsetHeight || 92; RW = handEl.clientWidth; RH = handEl.clientHeight; sw = stageEl.clientWidth; trackTop = trackEl.getBoundingClientRect().top + scrollY; span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight); };
    const apply = (P) => {
      const imgs = [...handEl.querySelectorAll('.th-photo')], fr = placePhotos(imgs, st.current.front, P * 1.0, RW, RH, 1, false, null);
      placeLugar(handEl.querySelector('.th-lugar'), fr, P, RH);
      mqEl.style.transform = `translate3d(${(0.12 * sw - 0.25 * P * sw).toFixed(1)}px,-50%,0)`;
    };
    const render = (now) => {
      raf = 0; if (!visible || document.hidden) { last = 0; return; }
      const target = clamp((scrollY + head - trackTop) / span), dt = last ? Math.min(64, now - last) : 16; last = now;
      if (q === null || Math.abs(target - q) > 0.12) q = target; else q += (target - q) * (1 - Math.exp(-dt / 60));
      let moving = true; if (Math.abs(target - q) < 0.0004) { q = target; moving = false; }
      if (st.current.manualY !== null && Math.abs(scrollY - st.current.manualY) > 24) { st.current.manualY = null; }
      apply(q); if (moving) schedule(); else last = 0;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
    st.current.refresh = () => { last = 0; schedule(); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { last = 0; schedule(); } }, { rootMargin: '200px 0px' }); io.observe(trackEl);
    const ro = new ResizeObserver(() => { measure(); schedule(); }); ro.observe(handEl); ro.observe(stageEl);
    measure(); schedule();
    addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); st.current.refresh = () => {}; handEl.querySelectorAll('.th-photo').forEach((im) => { im.removeAttribute('style'); delete im._w; }); };
  }, [animated, tour.slug]);
  useLayoutEffect(() => { st.current.refresh(); }, [front]);

  const select = useCallback((next, announce) => {
    const f = ((next % n) + n) % n; setFront(f); st.current.manualY = scrollY;
    const el = hand.current; if (el) { el.dataset.flip = 'true'; clearTimeout(st.current.t); st.current.t = setTimeout(() => { el.dataset.flip = 'false'; }, 650); }
    if (announce) setLive(`Foto ${f + 1} de ${n}, ${tour.name}`);
  }, [n, tour.name]);

  if (tour.gallery.length === 0) return null; // sin galería (Tour Miradores y Tour de Compras): se oculta de forma limpia
  if (!animated) return <FeaturedGallery tour={tour} />;
  const open = () => { setViewer(true); requestAnimationFrame(() => dlg.current?.showModal()); };
  return (
    <section className="ta" aria-labelledby="ta-titulo">
      <div ref={track} className="ta-track" style={{ '--ta-total': SEG_SVH }}>
        <div ref={stage} className="ta-stage">
          <div className="ta-head"><p className="eyebrow">El archivo de nuestros viajes</p><h2 id="ta-titulo">Así se vive<br /><em>{tour.name}</em></h2><p className="ta-count">{String(front + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · Toca la foto para ampliar</p></div>
          <div className="th-mq-clip ta-mq" aria-hidden="true"><div ref={mq} className="th-mq"><span>{entry.lugar}</span></div></div>
          <div ref={hand} className="th-hand ta-hand" role="region" aria-roledescription="carrusel" aria-label={`Fotografías de ${tour.name}`} tabIndex={0}
            onKeyDown={(e) => { if (['ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); select(front + (e.key === 'ArrowRight' ? 1 : -1), true); } else if (e.key === 'Enter') open(); }}
            onClick={(e) => { const img = e.target.closest?.('.th-photo'); if (!img) return; const k = Number(img.dataset.k); if (k === front) open(); else select(k, true); }}
            onPointerDown={(e) => { st.current.sx = e.clientX; st.current.sy = e.clientY; }}
            onPointerUp={(e) => { const dx = e.clientX - (st.current.sx ?? e.clientX), dy = e.clientY - (st.current.sy ?? e.clientY); if (e.pointerType !== 'mouse' && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.2) select(front + (dx < 0 ? 1 : -1), true); }}>
            <div className="th-group">
              {photos.map((p, k) => <img key={k} className="th-photo" data-k={k} src={p.src} srcSet={p.srcSet} sizes={k === front ? '(max-width: 799px) 84vw, 24vw' : '(max-width: 799px) 40vw, 14vw'} width={p.width} height={p.height} alt={`${tour.name}, fotografía ${k + 1}`} loading="lazy" decoding="async" draggable="false" />)}
              <span className="th-lugar" aria-hidden="true"><b>{smallCaps(t(entry.lugar))}</b></span>
            </div>
          </div>
          <div className="ta-foot">
            <div className="th-arrows">
              <button type="button" aria-label="Fotografía anterior" onClick={() => select(front - 1, true)}><Arrow dir="left" /></button>
              <button type="button" aria-label="Fotografía siguiente" onClick={() => select(front + 1, true)}><Arrow dir="right" /></button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{live}</p>
        </div>
      </div>
      {viewer && (
        <dialog ref={dlg} className="gallery-dialog ta-dialog" aria-label={`Galería ampliada de ${tour.name}`} onClose={() => setViewer(false)} onClick={(e) => { if (e.target === dlg.current) dlg.current.close(); }}>
          <button type="button" className="ta-close" aria-label="Cerrar" onClick={() => dlg.current.close()}>×</button>
          <img src={photos[front].src} srcSet={photos[front].srcSet} sizes="90vw" loading="lazy" alt={`${tour.name}, fotografía ${front + 1}`} />
          <div className="ta-dlg-nav"><button type="button" aria-label="Fotografía anterior" onClick={() => select(front - 1, true)}><Arrow dir="left" /></button><button type="button" aria-label="Fotografía siguiente" onClick={() => select(front + 1, true)}><Arrow dir="right" /></button></div>
        </dialog>
      )}
    </section>
  );
}
