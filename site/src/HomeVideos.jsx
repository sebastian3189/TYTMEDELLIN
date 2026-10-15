import { useEffect, useRef, useState } from 'react';
import PlayIcon, { SoundIcon } from './PlayIcon';
import { prepVideo, safePlay } from './videoPrep';
import { Link } from 'react-router-dom';
import { useLightMotion } from './PremiumMotion';
import { inicioTextos } from './inicio-textos';
import { inicioVideos, instagram } from './inicio-videos';
import { whatsapp } from './company';
import { SocialIcon } from './Socials';
import { Arrow, Eyebrow } from './shared';
import { HeroBlock } from './Hero';
import Logo from './Logo';
import './home.css';

/*
 * Inicio, Spec 03 §J1–J2: hero de video a sangre, historia con video miniatura, cierre y «Síguenos en redes».
 * Los datos de video viven en inicio-videos.js: con `src` nulo cada espacio es un bloque oscuro provisional con las
 * dimensiones finales (CLS 0); con `src` es un <video>. Nada aquí pide archivos mientras no haya `src`.
 */
const Provisional = () => <span className="vlabel">Video próximamente</span>;

export function HomeHero() {
  const t = inicioTextos;
  return (
    <HeroBlock video={inicioVideos.hero} eyebrow={t.lema} support={t.confianza}
      title={<h1 id="hero-titulo"><span className="hero-l1">{t.titular[0]}</span> <span className="hero-l2">{t.titular[1]}</span></h1>}
      actions={<><Link className="button hero-btn hero-btn--explore" to="/experiencias">Explorar experiencias<Arrow /></Link><Link className="button hero-btn hero-btn--quote" to="/cotizar">Planeemos tu viaje<Arrow /></Link></>} />
  );
}

/* Video vertical 9:16 (290×516, §J): reproduce solo al entrar en pantalla y se pausa al salir; sin sonido ni control de volumen; con movimiento reducido no se reproduce solo. */
function StoryVideo({ v }) {
  const light = useLightMotion(), ref = useRef(null), manual = useRef(false), [playing, setPlaying] = useState(false), [sound, setSound] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!v.src || !el) return undefined;
    prepVideo(el, true);
    const sync = () => setPlaying(!el.paused); el.addEventListener('play', sync); el.addEventListener('pause', sync);
    const io = new IntersectionObserver(([e]) => { if (light || manual.current) return; if (e.isIntersecting) safePlay(el); else el.pause(); }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); el.removeEventListener('play', sync); el.removeEventListener('pause', sync); };
  }, [v.src, light]);
  const toggle = () => { const el = ref.current; manual.current = true; if (el.paused) safePlay(el); else el.pause(); };
  // Sonido (el reel conserva su audio original por decisión del usuario): arranca SIEMPRE en silencio (requisito de iOS/Chrome) y solo suena tras tocar este botón.
  // Si el navegador rechaza reproducir con sonido, vuelve a silencio y sigue reproduciendo.
  const toggleSound = async () => {
    const el = ref.current; if (!el) return;
    if (el.muted) {
      el.muted = false; el.removeAttribute('muted'); el.defaultMuted = false; el.volume = 1; setSound(true);
      if (el.paused) { manual.current = false; try { await el.play(); } catch { el.muted = true; el.setAttribute('muted', ''); setSound(false); await el.play().catch(() => {}); } }
    } else { el.muted = true; el.setAttribute('muted', ''); setSound(false); }
  };
  if (!v.src) return <div className="vframe vframe--story"><Provisional /></div>;
  return (
    <figure className="story-media">
      <div className="vframe vframe--story">
        <video ref={ref} src={v.src} poster={v.poster || undefined} muted loop playsInline preload="none" disablePictureInPicture aria-label={v.alt} />
        <button type="button" className="vsound" aria-pressed={sound} onClick={toggleSound} aria-label={sound ? 'Silenciar' : 'Activar sonido'}><SoundIcon on={sound} /></button>
        <button type="button" className="vplay" data-playing={playing} onClick={toggle} aria-label={playing ? 'Pausar video' : 'Reproducir video'}><PlayIcon playing={playing} size={playing ? 16 : 24} /></button>
      </div>
      <figcaption>{v.alt}{v.instagramUrl && <> · <a className="text-link" href={v.instagramUrl} target="_blank" rel="noopener noreferrer">Ver en Instagram<span className="sr-only"> (se abre en una pestaña nueva)</span></a></>}</figcaption>
    </figure>
  );
}

export function HomeStory() {
  const v = inicioVideos.historia;
  return (
    <section className="home-story wrap" id="historia" aria-labelledby="historia-titulo">
      <StoryVideo v={v} />
      <div className="story-copy">
        <Eyebrow>Más que llegar</Eyebrow>
        <h2 id="historia-titulo">Hay una Medellín que se mira.<br />Y otra que se <em>vive.</em></h2>
        <p>La encuentras en una conversación, en el color de una calle y en la curva que abre un nuevo paisaje. Queremos acompañarte a descubrirla con el cuidado de un equipo local.</p>
        <Link className="button secondary" to="/nosotros">Conoce al equipo<Arrow /></Link>
      </div>
    </section>
  );
}

export function HomeClose() {
  const f = inicioTextos.fases.final;
  return (
    <section className="home-close section" aria-labelledby="cierre-titulo">
      <div className="wrap">
        <h2 id="cierre-titulo">Tu viaje, tus tiempos,<br />tu <em>experiencia.</em></h2>
        <p>{f.subtitulo}</p>
        <div className="close-actions">
          <Link className="button" to="/cotizar">Planeemos tu viaje<Arrow /></Link>
          <a className="button secondary" href={whatsapp()} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp<Arrow /></a>
        </div>
      </div>
    </section>
  );
}

const TYPE_LABEL = { reel: 'Reel', carousel: 'Carrusel', photo: 'Publicación' };
const REEL = 'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm0 5h16M9 3l3 5m3-5 3 5M10 12.5v5l4.5-2.5-4.5-2.5Z';
const CAROUSEL = 'M7 7h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm2-3h9a3 3 0 0 1 3 3v9';

export function HomeSocial() {
  const { profile, tiktok, posts } = instagram, st = profile.stats;
  const stats = st ? [['Publicaciones', st.posts], ['Seguidores', st.followers], ['Siguiendo', st.following]].filter(([, v]) => v) : [];
  return (
    <section className="home-social wrap section" aria-labelledby="redes-titulo">
      <h2 id="redes-titulo">Síguenos en redes</h2>
      <div className="ig-head">
        <Logo size={112} sizes="112px" className="ig-avatar" lazy />
        <p className="ig-name">{profile.name}</p>
        <p className="ig-handle">{profile.handle}</p>
        {stats.length > 0 && <dl className="ig-stats">{stats.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
        <a className="ig-follow" href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`Seguir a ${profile.handle} en Instagram (se abre en una pestaña nueva)`}><SocialIcon id="instagram" size={20} />Seguir</a>
      </div>
      <ul className="ig-grid" role="list">
        {posts.map((post, i) => (
          <li key={i}>
            <a className="ig-tile" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`${post.alt || `${TYPE_LABEL[post.type] || 'Publicación'} ${i + 1} de Instagram`} (se abre en una pestaña nueva)`}>
              {post.image && <img src={post.image} srcSet={post.srcSet} sizes="(max-width: 699px) 50vw, 25vw" alt={post.alt || ""} width={post.width || 640} height={post.height || 640} loading="lazy" decoding="async" />}
              {(post.type === 'reel' || post.type === 'carousel') && (
                <svg className="ig-type" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={post.type === 'reel' ? REEL : CAROUSEL} /></svg>
              )}
            </a>
          </li>
        ))}
      </ul>
      <a className="text-link ig-tiktok" href={tiktok.url} target="_blank" rel="noopener noreferrer" aria-label={`También en TikTok ${tiktok.handle} (se abre en una pestaña nueva)`}>También en TikTok {tiktok.handle} <Arrow/></a>
    </section>
  );
}
