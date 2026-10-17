import { useCallback, useEffect, useRef, useState } from 'react';
import PlayIcon from './PlayIcon';
import { prepVideo, safePlay } from './videoPrep';
import { Link } from 'react-router-dom';
import { useLightMotion } from './PremiumMotion';
import Arrow from './Arrow';
import { videoDeTour, catalogoVideo } from './inicio-videos';
import { tourSlides, catalogSlides } from './tour-entry';
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
    prepVideo(el);
    if (light) el.pause(); else safePlay(el);
    const observer = new IntersectionObserver(([entry]) => {
      if (light || manual.current) return;
      if (entry.isIntersecting) safePlay(el); else el.pause();
    });
    observer.observe(el);
    return () => { observer.disconnect(); el.removeEventListener('play', sync); el.removeEventListener('pause', sync); el.pause(); };
  }, [ref, light, enabled]);
  const toggle = () => {
    const el = ref.current; if (!el) return;
    manual.current = true;
    if (el.paused) safePlay(el); else el.pause();
  };
  return [playing, toggle];
}

/*
 * Video de dron ADAPTATIVO del inicio (2026-10-16): una sola etiqueta <video> cuya fuente se elige por JS según orientación, ancho y densidad
 * (vertical → 9:16 · horizontal ≤ 1599 → 720p · ≥ 1600 o DPR ≥ 2 en ≥ 1280 → 1080p) y se re-evalúa al girar o redimensionar SIN reiniciar: solo cambia
 * al cruzar de orientación o al subir de nivel (nunca baja de nivel por redimensionar) y retoma el tiempo actual. Sin src en el HTML prerenderizado: el
 * póster (<picture>, LCP) se ve primero y el video entra con fundido al empezar a reproducir. Pedido del usuario 2026-10-17: reproduce SIEMPRE, sin botón de
 * pausa y sin depender de movimiento reducido, ahorro de datos ni tipo de red; si el navegador rechaza play() (p. ej. iOS en bajo consumo) se reintenta al
 * cargar datos, al volver a la pestaña y con el primer toque, desplazamiento o tecla de la persona.
 */
const RANK = { movil: 0, hd720: 1, hd1080: 2 };
export function pickHeroTier() {
  if (window.matchMedia('(orientation: portrait)').matches) return 'movil';
  const w = window.innerWidth, dpr = window.devicePixelRatio || 1;
  return w >= 1600 || (dpr >= 2 && w >= 1280) ? 'hd1080' : 'hd720';
}
function useAdaptiveHero(ref, sources) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!sources || !el) return undefined;
    prepVideo(el);
    let tier = null, visible = true, resume = 0, timer = 0, alive = true;
    const want = () => alive && visible && !document.hidden;
    const sync = () => { if (want()) { if (el.paused) safePlay(el); } else el.pause(); };
    // Reintento: si algo lo pausó (o play() fue rechazado) mientras debe verse, vuelve a reproducir.
    const retry = () => { if (want() && el.paused) safePlay(el); };
    const GESTURES = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
    const choose = () => {
      const next = pickHeroTier();
      if (tier && (tier === 'movil') === (next === 'movil') && RANK[next] <= RANK[tier]) return;
      resume = tier ? el.currentTime : 0; tier = next;
      el.src = sources[next]; sync();
    };
    const onMeta = () => { if (resume > 0 && el.duration) { try { el.currentTime = resume % el.duration; } catch { /* sin retomar */ } } resume = 0; };
    const onPlaying = () => { el.dataset.ready = 'true'; };
    const onPause = () => { setTimeout(retry, 300); };
    const onError = () => { if (!el.dataset.ready) setFailed(true); };
    const onResize = () => { clearTimeout(timer); timer = setTimeout(choose, 250); };
    const media = [['loadedmetadata', onMeta], ['playing', onPlaying], ['pause', onPause], ['canplay', retry], ['stalled', retry], ['error', onError]];
    for (const [n, f] of media) el.addEventListener(n, f);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
    io.observe(el);
    window.addEventListener('resize', onResize); window.addEventListener('orientationchange', onResize); document.addEventListener('visibilitychange', sync);
    for (const g of GESTURES) window.addEventListener(g, retry, { passive: true });
    window.addEventListener('pageshow', retry);
    choose();
    return () => {
      alive = false; clearTimeout(timer); io.disconnect();
      window.removeEventListener('resize', onResize); window.removeEventListener('orientationchange', onResize); document.removeEventListener('visibilitychange', sync);
      for (const g of GESTURES) window.removeEventListener(g, retry);
      window.removeEventListener('pageshow', retry);
      for (const [n, f] of media) el.removeEventListener(n, f);
      el.pause(); el.removeAttribute('src'); delete el.dataset.ready; el.load();
    };
  }, [ref, sources]);
  return failed;
}

const SLIDE_MS = 5800; // tiempo por foto (5–6 s); el fundido cruzado dura 1,2 s dentro de ese tiempo

/* Diaporama provisional: una sola capa activa + la saliente (fundido cruzado). Se decodifica la siguiente antes de mostrarla y solo corre a la vista. */
function HeroSlides({ slides, paused, still }) {
  const [cur, setCur] = useState(0), [prev, setPrev] = useState(-1), [reach, setReach] = useState(1);
  const box = useRef(null), curRef = useRef(0), imgs = useRef([]);
  const n = slides.length;
  // Fuera de vista el Ken Burns se detiene (sin trabajo de compositor mientras se lee el resto de la página).
  useEffect(() => { const io = new IntersectionObserver(([e]) => { box.current.dataset.off = e.isIntersecting ? 'false' : 'true'; }); io.observe(box.current); return () => io.disconnect(); }, []);
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
  const light = useLightMotion(), media = useRef(null), adaptiveRef = useRef(null), section = useRef(null);
  const adaptive = !video.src && Boolean(video.adaptive);
  const [playing, toggle] = useHeroPlayback(media, light, Boolean(video.src));
  const aFailed = useAdaptiveHero(adaptiveRef, adaptive ? video.adaptive : null);
  const hasSlides = !video.src && !adaptive && Boolean(slides?.length);
  const img = adaptive ? (aFailed ? video.image : video.poster) : !video.src && !hasSlides ? video.image : null; // imagen fija provisional (p. ej. la panorámica del inicio) mientras no haya video
  // Con video adaptativo el póster se elige por ORIENTACIÓN (coincide con el recorte del video); en el resto, por ancho.
  const mqMobile = adaptive ? '(orientation: portrait)' : '(max-width: 799px)', mqDesktop = adaptive ? '(orientation: landscape)' : '(min-width: 800px)';
  const [slidesPaused, setSlidesPaused] = useState(false);
  const onSlidesToggle = useCallback(() => setSlidesPaused((v) => !v), []);
  // La cabecera es transparente sobre el hero y vuelve a su material sólido al salir de él (umbral = alto de la cabecera).
  useEffect(() => {
    const html = document.documentElement, header = document.querySelector('.site-header')?.offsetHeight || 92;
    const observer = new IntersectionObserver(([entry]) => { html.dataset.hero = entry.isIntersecting ? 'over' : 'past'; }, { rootMargin: `-${header}px 0px 0px 0px` });
    observer.observe(section.current);
    return () => { observer.disconnect(); delete html.dataset.hero; };
  }, []);
  const shade = Boolean(video.src) || adaptive || hasSlides || Boolean(img);
  return (
    <section ref={section} className={`home-hero${tour ? ' is-tour' : ''}`} data-hero data-video={video.src || adaptive ? 'on' : hasSlides ? 'slides' : img ? 'image' : 'off'} aria-labelledby={labelId}>
      <div className="hero-media" aria-hidden="true">
        {video.src && <video ref={media} src={video.src} poster={video.poster || undefined} muted loop playsInline autoPlay={!light} preload="metadata" tabIndex={-1} />}
        {hasSlides && <HeroSlides slides={slides} paused={slidesPaused} still={light} />}
        {img && <>
          <link rel="preload" as="image" href={img.desktop.src} imageSrcSet={img.desktop.srcset} imageSizes="100vw" media={mqDesktop} fetchPriority="high" />
          <link rel="preload" as="image" href={img.mobile.src} imageSrcSet={img.mobile.srcset} imageSizes="100vw" media={mqMobile} fetchPriority="high" />
        </>}
        {img && (
          <picture>
            <source media={mqMobile} srcSet={img.mobile.srcset} sizes="100vw" />
            <img className="hero-img" src={img.desktop.src} srcSet={img.desktop.srcset} sizes="100vw" width={img.desktop.width} height={img.desktop.height} alt="" loading="eager" fetchPriority="high" decoding="async" />
          </picture>
        )}
        {adaptive && <video ref={adaptiveRef} className="hero-dron" muted loop playsInline preload="metadata" tabIndex={-1} disablePictureInPicture />}
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
          <PlayIcon playing={playing} />
        </button>
      )}
      {hasSlides && slides.length > 1 && !light && (
        <button type="button" className="hero-pause" onClick={onSlidesToggle} aria-pressed={slidesPaused} aria-label={slidesPaused ? 'Reproducir imágenes' : 'Pausar imágenes'}>
          <PlayIcon playing={!slidesPaused} />
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

/** Hero del catálogo /experiencias: mismo bloque, espacio de video propio (`catalogoVideo`) y fotos de varios tours mientras no haya video. */
export function CatalogHero() {
  return (
    <HeroBlock tour labelId="catalogo-hero-titulo" video={catalogoVideo} slides={catalogSlides()} eyebrow="La colección T&T" support="Ciudad, pueblos, café o naturaleza. Elige tu recorrido y planeemos los detalles para tu grupo."
      title={<h1 id="catalogo-hero-titulo" className="hero-h1--tour">Experiencias desde Medellín</h1>}
      actions={<><a className="button hero-btn hero-btn--explore" href="#catalogo">Ver las experiencias<Arrow /></a><Link className="button hero-btn hero-btn--quote" to="/cotizar">Planeemos tu viaje<Arrow /></Link></>} />
  );
}
