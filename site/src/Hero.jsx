import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLightMotion } from './PremiumMotion';
import Arrow from './Arrow';
import { videoDeTour } from './inicio-videos';
import { tourSlides } from './tour-entry';
import './home.css';

/*
 * Hero a sangre (Spec 03 §J1–J2), COMPARTIDO por el inicio y por las 12 fichas de experiencia (pedido del usuario 2026-10-14): 100vw × 100svh (mín. 640 px
 * escritorio, 560 px móvil), velo ≥ 0,60, título, botones y cabecera transparente encima. El medio sale de `inicio-videos.js` (UN archivo para todos los
 * espacios): con `src` es un <video autoplay muted loop playsinline poster>; MIENTRAS no hay video, `slides` muestra un diaporama de fotos oficiales con
 * fundido cruzado y leve Ken Burns (solo transform/opacity), que se pausa con el botón del hero y queda en foto fija con movimiento reducido o ahorro de datos.
 */

/* Mantiene el estado de «Pausar / Reproducir» de un video y lo detiene fuera de vista (sin pisar la decisión de la persona). */
function useHeroPlayback(ref, light, enabled) {
  const [playing, setPlaying] = useState(false);
  const manual = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return undefined;
    const sync = () => setPlaying(!el.paused);
    el.addEventListener('play', sync); el.addEventListener('pause', sync);
    if (light) el.pause(); else el.play().catch(() => {});
    const observer = new IntersectionObserver(([entry]) => {
      if (light || manual.current) return;
      if (entry.isIntersecting) el.play().catch(() => {}); else el.pause();
    });
    observer.observe(el);
    return () => { observer.disconnect(); el.removeEventListener('play', sync); el.removeEventListener('pause', sync); };
  }, [ref, light, enabled]);
  const toggle = () => {
    const el = ref.current; if (!el) return;
    manual.current = true;
    if (el.paused) el.play().catch(() => {}); else el.pause();
  };
  return [playing, toggle];
}

const SLIDE_MS = 5800; // tiempo por foto (5–6 s); el fundido cruzado dura 1,2 s dentro de ese tiempo

/* Diaporama provisional: una sola capa activa + la saliente (fundido cruzado). Se decodifica la siguiente antes de mostrarla y solo corre a la vista. */
function HeroSlides({ slides, paused, still }) {
  const [cur, setCur] = useState(0), [prev, setPrev] = useState(-1), [reach, setReach] = useState(1);
  const box = useRef(null), curRef = useRef(0), imgs = useRef([]);
  const n = slides.length;
  useEffect(() => {
    if (still || paused || n < 2) return undefined;
    let visible = true, busy = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(box.current);
    const tick = () => {
      if (!visible || document.hidden || busy) return;
      busy = true;
      const next = (curRef.current + 1) % n;
      setReach((r) => Math.max(r, next + 1)); // la siguiente foto se monta (y se pide) justo antes de mostrarla
      requestAnimationFrame(() => {
        const im = imgs.current[next];
        Promise.resolve(im?.decode?.()).catch(() => {}).then(() => { setPrev(curRef.current); curRef.current = next; setCur(next); busy = false; });
      });
    };
    const id = setInterval(tick, SLIDE_MS);
    return () => { clearInterval(id); io.disconnect(); };
  }, [still, paused, n]);
  useEffect(() => { if (prev < 0) return undefined; const t = setTimeout(() => setPrev(-1), 1400); return () => clearTimeout(t); }, [prev]);
  // Tras la primera foto se adelanta la segunda en reposo (nunca compite con el LCP).
  useEffect(() => { if (still || n < 2) return undefined; const idle = window.requestIdleCallback || ((f) => setTimeout(f, 1200)); const h = idle(() => setReach((r) => Math.max(r, 2))); return () => { (window.cancelIdleCallback || clearTimeout)(h); }; }, [still, n]);
  return (
    <div ref={box} className="hero-slides" data-paused={paused ? 'true' : 'false'} data-still={still ? 'true' : 'false'}>
      {slides.slice(0, still ? 1 : reach).map((p, i) => (
        <img key={p.src} ref={(el) => { imgs.current[i] = el; }} className={`hs-img hs-${i % 2 ? 'b' : 'a'}${i === cur ? ' is-on' : i === prev ? ' is-prev' : ''}`}
          src={p.src} srcSet={p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`} sizes="100vw" width={p.width} height={p.height} alt="" style={{ objectPosition: p.focus || '50% 38%' }}
          loading="eager" fetchPriority={i === 0 ? 'high' : 'low'} decoding="async" draggable="false" />
      ))}
    </div>
  );
}

/**
 * `video` = { src, poster } del archivo central; `slides` = fotos provisionales (opcional); `eyebrow`, `title` (nodo del h1), `support`, `actions` (nodos).
 * `tour` = true en las fichas: el h1 admite nombres largos (varias líneas equilibradas).
 */
export function HeroBlock({ video, slides, eyebrow, title, support, actions, tour = false, labelId = 'hero-titulo' }) {
  const light = useLightMotion(), media = useRef(null), section = useRef(null);
  const hasSlides = !video.src && Boolean(slides?.length);
  const [playing, toggle] = useHeroPlayback(media, light, Boolean(video.src));
  const [slidesPaused, setSlidesPaused] = useState(false);
  const onSlidesToggle = useCallback(() => setSlidesPaused((v) => !v), []);
  // La cabecera es transparente sobre el hero y vuelve a su material sólido al salir de él (umbral = alto de la cabecera).
  useEffect(() => {
    const html = document.documentElement, header = document.querySelector('.site-header')?.offsetHeight || 92;
    const observer = new IntersectionObserver(([entry]) => { html.dataset.hero = entry.isIntersecting ? 'over' : 'past'; }, { rootMargin: `-${header}px 0px 0px 0px` });
    observer.observe(section.current);
    return () => { observer.disconnect(); delete html.dataset.hero; };
  }, []);
  const shade = Boolean(video.src) || hasSlides;
  return (
    <section ref={section} className={`home-hero${tour ? ' is-tour' : ''}`} data-hero data-video={video.src ? 'on' : hasSlides ? 'slides' : 'off'} aria-labelledby={labelId}>
      <div className="hero-media" aria-hidden="true">
        {video.src && <video ref={media} src={video.src} poster={video.poster || undefined} muted loop playsInline autoPlay={!light} preload="metadata" tabIndex={-1} />}
        {hasSlides && <HeroSlides slides={slides} paused={slidesPaused} still={light} />}
      </div>
      {shade && <div className="hero-shade" aria-hidden="true" />}
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">{eyebrow}</p>
        {title}
        <p className="hero-support">{support}</p>
        <div className="hero-actions">{actions}</div>
      </div>
      {video.src && (
        <button type="button" className="hero-pause" onClick={toggle} aria-label={playing ? 'Pausar video' : 'Reproducir video'}>
          <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
        </button>
      )}
      {hasSlides && slides.length > 1 && !light && (
        <button type="button" className="hero-pause" onClick={onSlidesToggle} aria-pressed={slidesPaused} aria-label={slidesPaused ? 'Reproducir imágenes' : 'Pausar imágenes'}>
          <span aria-hidden="true">{slidesPaused ? '▶' : '❚❚'}</span>
        </button>
      )}
    </section>
  );
}

/** Hero de la ficha: el MISMO bloque del inicio, parametrizado por tour (video del archivo central o diaporama de fotos oficiales mientras no haya video). */
export function TourHeroVideo({ tour }) {
  return (
    <HeroBlock tour labelId="tour-hero-titulo" video={videoDeTour(tour.slug)} slides={tourSlides(tour.slug)} eyebrow={`${tour.category} · Desde Medellín`} support={tour.title}
      title={<h1 id="tour-hero-titulo" className="hero-h1--tour">{tour.name}</h1>}
      actions={<><a className="button hero-btn hero-btn--explore" id="cta-principal" href="#consulta">Planea esta experiencia<Arrow /></a><Link className="button hero-btn hero-btn--quote" to="/experiencias">Todas las experiencias<Arrow /></Link></>} />
  );
}
