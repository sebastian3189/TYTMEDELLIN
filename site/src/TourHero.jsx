import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { EditorialMotion, useLightMotion, useMedia, useMounted } from './PremiumMotion';
import { deckPose } from './baraja-geometria';
import { smooth, clamp } from './hand-geometria';
import { Picture, Arrow, Eyebrow } from './shared';
import './tour-motion.css';

/*
 * Portada de la ficha — Spec 03 §M1/M3.1 («La ruta se juega carta a carta»). Reutiliza la baraja del inicio: las mismas rotaciones (deckPose), la misma curva
 * (smooth) y la misma coreografía de barajado → la carta superior (la foto principal del tour) crece (Flip por progreso, simétrico al subir) hasta ser la foto
 * principal. Un solo progreso de scroll nativo, nunca interceptado; escrituras solo en `style` (transform/opacity). Móvil, tablet, reducido y sin JS: la figura
 * estática de siempre (scroll natural, sin pin) con una entrada única.
 */
const MAX_CARDS = 5;
export default function TourHero({ tour }) {
  const light = useLightMotion(), wide = useMedia('(min-width: 1100px)'), tall = useMedia('(min-height: 640px)'), mounted = useMounted();
  const animated = mounted && wide && tall && !light;
  const track = useRef(null), stage = useRef(null), region = useRef(null);
  // Baraja: la foto principal arriba + fotos distintas del mismo tour.
  const cards = [tour.hero, ...tour.gallery.filter((g) => g.src !== tour.hero.src)].slice(0, MAX_CARDS);

  useLayoutEffect(() => {
    if (!animated) return undefined;
    const trackEl = track.current, stageEl = stage.current, reg = region.current, els = [...reg.querySelectorAll('.tdk-card')], n = els.length;
    let raf = 0, visible = true, q = null, last = 0, RW = 0, RH = 0, bw = 0, bh = 0, trackTop = 0, span = 1, head = 92;
    const measure = () => {
      head = document.querySelector('.site-header')?.offsetHeight || 92;
      RW = reg.clientWidth; RH = reg.clientHeight; bw = Math.min(RW * 0.96, RH * 0.9 * 0.8); bh = bw * 1.25;
      trackTop = trackEl.getBoundingClientRect().top + scrollY; span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight);
      els.forEach((el) => { el.style.width = `${bw}px`; el.style.height = `${bh}px`; });
    };
    const s0 = 0.46;
    const apply = (p) => {
      const sh = smooth(clamp(p / 0.4)), bump = Math.sin(Math.PI * sh), g = smooth(clamp((p - 0.45) / 0.5));
      els.forEach((el, i) => {
        const pose = deckPose(i), ang = i * 2.4 + sh * 3, side = i % 2 ? 1 : -1;
        const dx = pose.dx + Math.cos(ang) * bw * s0 * 0.9 * bump, dy = pose.dy + Math.sin(ang) * bh * s0 * 0.25 * bump;
        const r0 = pose.r + side * 22 * bump + sh * ((i % 3) - 1) * 4;
        const rank = (i + Math.round(bump * 3)) % n;
        let x, y, s, rot, o, z;
        if (i === 0) { x = dx * (1 - g); y = dy * (1 - g); s = s0 * 0.95 + (1 - s0 * 0.95) * g; rot = r0 * (1 - g) + -3 * g; o = 1; z = g > 0.02 ? 60 : 10 + n - rank; }
        else { x = dx * (1 - g) + side * bw * 0.18 * g; y = dy * (1 - g) - bh * 0.06 * g; s = (s0 * 0.95) * (1 - g) + 0.8 * g; rot = r0 + side * 8 * g; o = 1 - smooth(g / 0.8); z = 10 + n - rank; }
        el.style.transform = `translate3d(${(RW / 2 - bw / 2 + x).toFixed(1)}px,${(RH / 2 - bh / 2 + y).toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(4)})`;
        el.style.opacity = o.toFixed(3); el.style.zIndex = String(z);
      });
    };
    const render = (now) => {
      raf = 0; if (!visible || document.hidden) { last = 0; return; }
      const target = clamp((scrollY + head - trackTop) / span), dt = last ? Math.min(64, now - last) : 16; last = now;
      if (q === null || Math.abs(target - q) > 0.12) q = target; else q += (target - q) * (1 - Math.exp(-dt / 60));
      let moving = true; if (Math.abs(target - q) < 0.0004) { q = target; moving = false; }
      apply(q); if (moving) schedule(); else last = 0;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { last = 0; schedule(); } }, { rootMargin: '200px 0px' }); io.observe(trackEl);
    const ro = new ResizeObserver(() => { measure(); schedule(); }); ro.observe(reg);
    measure(); apply(0); schedule();
    addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); els.forEach((el) => el.removeAttribute('style')); };
  }, [animated, tour.slug]);


  const text = (
    <div className="tour-hero-content tdk-text"><Link to="/experiencias" className="back-link"><Arrow dir="left" />Todas las experiencias</Link><Eyebrow>{tour.category} · Desde Medellín</Eyebrow><h2>{tour.name}</h2><p>{tour.title}</p><a className="button" href="#consulta">Planea esta experiencia <Arrow /></a></div>
  );
  if (!animated) {
    return (
      <EditorialMotion className="tour-hero wrap tdk-static">{text}
        <figure className="editorial-photo"><Picture photo={tour.hero} alt={tour.name} priority sizes="(max-width: 700px) 72vw, 400px" /><figcaption>{tour.name} · Archivo T&T</figcaption></figure>
      </EditorialMotion>
    );
  }
  return (
    <section className="tdk" aria-label={tour.name}>
      <div ref={track} className="tdk-track">
        <div ref={stage} className="tdk-stage wrap">
          {text}
          <figure className="tdk-fig">
            <div ref={region} className="tdk-region">
              {cards.map((c, i) => <div className="tdk-card" key={c.src}><Picture photo={c} alt={i === 0 ? tour.name : ''} priority={i === 0} sizes="440px" /></div>)}
            </div>
            <figcaption>{tour.name} · Archivo T&T</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
