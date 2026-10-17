import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './icons';
import { useLightMotion } from './PremiumMotion';
import { t as tr } from './i18n';
import './different.css';

/*
 * «¿Qué nos hace diferentes?» — Spec 03 §L «El camino, punto por punto» (aprobado 2026-10-14). Copy literal del cliente (Spec 02, 2026-10-14):
 * los emojis se sustituyen por iconos de línea (avión, vehículo, equipo, gota, globo, reloj, cámara, escudo, mensaje, corazón).
 * Lista semántica (ol > li > h3 + p); contador, icono grande, ruta y punto son decorativos (aria-hidden). Escritorio: columna izquierda fija con contador
 * y 10 tarjetas de vidrio en dos columnas escalonadas con una ruta SVG detrás; móvil: línea de tiempo con scroll natural. Un solo rAF ligado al scroll,
 * detenido fuera de vista; solo transform/opacity/stroke-dashoffset. Reducido/saveData/sin JS: todo visible y estático (el ocultado lo añade JS).
 */
export const DIFERENTES = [
  { icon: 'planeLanding', t: 'Monitoreamos tu vuelo', d: 'Seguimos el estado de tu vuelo hasta su aterrizaje en Medellín para coordinar tu recogida y estar preparados ante posibles cambios de horario.' },
  { icon: 'carFront', t: 'Vehículos para tu recorrido', d: 'Revisamos contigo la categoría, la capacidad y el equipaje para proponer el vehículo de tu servicio. La unidad y su disponibilidad se confirman al cotizar.' },
  { icon: 'users', t: 'Un equipo que responde por ti', d: 'Coordinamos el transporte, las paradas y el acompañamiento de tu recorrido. Antes de contratar, revisamos contigo los servicios incluidos en la propuesta.' },
  { icon: 'droplet', t: 'Los detalles también cuentan', d: 'Consulta la hidratación incluida en tu experiencia. Antes de salir, revisa con el equipo qué llevar según el recorrido y las necesidades de tu grupo.' },
  { icon: 'globe', t: 'Experiencias 100% privadas', d: 'Nuestra propuesta son tours privados para ti y tus acompañantes. Confirmamos el vehículo, el acompañamiento y las condiciones de cada recorrido al cotizar.' },
  { icon: 'clock', t: 'Flexibilidad en tus horarios', d: 'Cuéntanos tus intereses y el tiempo que tienes. Acordamos los horarios según el recorrido, las condiciones operativas y lo que necesitas.' },
  { icon: 'camera', t: 'Recuerdos para llevar contigo', d: 'Consulta las fotografías y los videos incluidos en tu recorrido. La propuesta detalla estos servicios para que sepas qué esperar antes de salir.' },
  { icon: 'shieldCheck', t: 'Seguridad y respaldo legal', d: 'Somos una empresa legalmente constituida, con Registro Nacional de Turismo (RNT 176384). Operamos con vehículos habilitados y las coberturas y pólizas aplicables a nuestros servicios.' },
  { icon: 'messageCircle', t: 'Conversemos por WhatsApp', d: 'Escríbenos para organizar tu viaje o consultar sobre tu servicio. La operación de transporte las 24 horas requiere reserva previa; la asesoría depende de la disponibilidad del equipo.' },
  { icon: 'heart', t: 'Atención desde el primer contacto', d: 'No solo organizamos recorridos. Escuchamos tus necesidades, te asesoramos y diseñamos experiencias que se ajustan a lo que realmente buscas.' },
];
const two = (n) => String(n).padStart(2, '0');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Revelado por palabras (máscara por palabra, translateY .6em→0 + opacidad, 700 ms, escalonado); el texto sigue siendo texto real.
function Words({ text, from = 0, step = 60 }) {
  return tr(text).split(' ').map((w, i, all) => <span key={i}><span className="df-w"><span style={{ '--i': from + i, '--st': `${step}ms` }}>{w}</span></span>{i < all.length - 1 ? ' ' : null}</span>);
}

export default function Different() {
  const root = useRef(null), host = useRef(null), svg = useRef(null);
  const light = useLightMotion();
  const [armed, setArmed] = useState(false), [active, setActive] = useState(0);
  const activeRef = useRef(0);

  // Solo con JS y movimiento completo se ocultan los elementos que luego se revelan (sin JS, todo visible).
  useLayoutEffect(() => { setArmed(!light); }, [light]);

  // Entradas únicas con un IntersectionObserver.
  useEffect(() => {
    if (!armed) return undefined;
    const els = [...root.current.querySelectorAll('[data-rv]')];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [armed]);

  // Ruta, punto y tarjeta activa ligados al scroll (un rAF, detenido fuera de vista).
  useEffect(() => {
    const el = root.current, hostEl = host.current, s = svg.current;
    const base = s.querySelector('.df-route-base'), done = s.querySelector('.df-route-done'), dot = s.querySelector('.df-dot');
    const discs = [...hostEl.querySelectorAll('.df-disc')], cards = [...hostEl.querySelectorAll('.df-card')], endD = hostEl.querySelector('.df-end'), endM = hostEl.querySelector('.df-end-m'), closeT = hostEl.querySelector('.df-close-text');
    let len = 1, y0 = 0, yEnd = 1, hostTop = 0, centers = [], raf = 0, visible = false, q = light ? 1 : 0, last = 0;
    const measure = () => {
      const hr = hostEl.getBoundingClientRect(); hostTop = hr.top + scrollY;
      const wide = innerWidth >= 900, ctr = (d) => { const r = d.getBoundingClientRect(); return [r.left + r.width / 2 - hr.left, r.top + r.height / 2 - hr.top]; };
      const pts = discs.map(ctr), e = ctr(wide ? endD : endM);
      // Escritorio: la ruta baja por la derecha del cierre y llega a «camino.» desde el costado (sin cruzar el texto); móvil: baja por la línea izquierda.
      if (wide) { const cr = closeT.getBoundingClientRect(); const xr = Math.min(hr.width - 12, cr.right - hr.left + 28); pts.push([xr, cr.top - hr.top - 24], [xr, e[1]]); }
      pts.push(e);
      let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) { const [x1, y1] = pts[i - 1], [x2, y2] = pts[i], m = (y2 - y1) / 2; d += ` C${x1.toFixed(1)} ${(y1 + m).toFixed(1)} ${x2.toFixed(1)} ${(y2 - m).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`; }
      s.setAttribute('viewBox', `0 0 ${hr.width.toFixed(1)} ${hr.height.toFixed(1)}`); base.setAttribute('d', d); done.setAttribute('d', d);
      len = base.getTotalLength(); done.style.strokeDasharray = `${len}`; y0 = pts[0][1]; yEnd = pts[pts.length - 1][1];
      centers = cards.map((c) => { const r = c.getBoundingClientRect(); return r.top + scrollY + r.height / 2; });
      paint(true);
    };
    const paint = (force) => {
      const vh = innerHeight, target = light ? 1 : clamp((scrollY + vh * 0.68 - hostTop - y0) / (yEnd - y0));
      if (force || Math.abs(target - q) > 0.12) q = target; else q += (target - q) * (1 - Math.exp(-16 / 80)); // τ 80 ms; saltos > 0,12 se igualan
      const p = Math.abs(target - q) < 0.0005 ? target : q; q = p;
      done.style.strokeDashoffset = `${(len * (1 - p)).toFixed(1)}`;
      const pt = base.getPointAtLength(len * p); dot.style.transform = `translate(${pt.x.toFixed(1)}px,${pt.y.toFixed(1)}px)`;
      dot.classList.toggle('is-end', p > 0.995);
      if (!light && centers.length) { const mid = scrollY + vh * 0.5; let best = 0, bd = 1e9; centers.forEach((c, i) => { const dd = Math.abs(c - mid); if (dd < bd) { bd = dd; best = i; } }); if (best !== activeRef.current) { activeRef.current = best; setActive(best); } }
      return Math.abs(target - q) > 0.0005;
    };
    const tick = () => { raf = 0; if (!visible || document.hidden) return; if (paint(false)) raf = requestAnimationFrame(tick); };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { last = 0; kick(); } }, { rootMargin: '200px 0px' }); io.observe(el);
    const ro = new ResizeObserver(() => { measure(); }); ro.observe(hostEl);
    document.fonts?.ready.then(measure);
    if (!light) { addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick, { passive: true }); }
    measure(); void last;
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); removeEventListener('scroll', kick); removeEventListener('resize', kick); };
  }, [light]);

  return (
    <section ref={root} id="diferentes" className={`df${armed ? ' df--armed' : ''}${light ? ' df--static' : ''}`} aria-labelledby="df-titulo">
      <div className="wrap">
        <header className="df-head">
          <p className="eyebrow df-eyebrow" data-rv>Transporte y Turismo Medellín</p>
          <h2 id="df-titulo" className="df-title" data-rv>
            <span className="df-l1"><Words text="¿Qué nos hace" /></span>{' '}
            <span className="df-l2"><Words text="diferentes?" from={3} /></span>
          </h2>
          <div className="df-intro">
            <p className="df-lead" data-rv>Queremos que conozcas Medellín con la tranquilidad de tener un equipo local a tu lado.</p>
            <p className="df-para" data-rv style={{ '--d': '60ms' }}>Todo empieza por escucharte: quién viaja, qué quiere conocer y cuánto tiempo tiene. Con esa información coordinamos el transporte y el recorrido, y te explicamos las condiciones antes de contratar.</p>
          </div>
        </header>
        <div ref={host} className="df-host">
          <svg ref={svg} className="df-route" aria-hidden="true" focusable="false" preserveAspectRatio="none">
            <path className="df-route-base" fill="none" /><path className="df-route-done" fill="none" /><g className="df-dot"><circle className="df-dot-c" r="5" /></g>
          </svg>
          <div className="df-body">
            <div className="df-side" aria-hidden="true">
              <div className="df-sticky">
                <p className="df-count" key={`c${active}`}>{two(active + 1)}<span> / {two(DIFERENTES.length)}</span></p>
                <div className="df-bigdisc"><i className="df-aura" /><span key={`i${active}`} className="df-bigico"><Icon name={DIFERENTES[active].icon} size={96} draw /></span></div>
                <div className="df-bar"><i style={{ transform: `scaleX(${(active + 1) / DIFERENTES.length})` }} /></div>
              </div>
            </div>
            <ol className="df-list">
              {DIFERENTES.map((x, i) => (
                <li key={x.t} className="df-card" data-rv data-active={active === i ? 'true' : 'false'} style={{ '--d': `${(i % 2) * 80}ms` }}>
                  <div className="df-top"><span className="df-disc"><Icon name={x.icon} size={28} draw /></span><span className="df-num" aria-hidden="true">{two(i + 1)}</span></div>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="df-close">
            <p className="df-close-eyebrow eyebrow" data-rv>Experiencias a otro nivel</p>
            <p className="df-close-text" data-rv>
              <span className="df-c1"><Words text="No es solamente a dónde te llevamos" step={40} /></span>{' '}
              <span className="df-c2"><Words text="Es cómo te hacemos sentir durante todo el camino" from={7} step={40} /><span className="df-end-wrap">.<i className="df-end" aria-hidden="true" /></span></span><i className="df-end-m" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
