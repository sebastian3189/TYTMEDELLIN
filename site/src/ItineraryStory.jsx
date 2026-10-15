import { useCallback, useEffect, useRef, useState } from 'react';
import { watchScroll, docTop } from './scroll-bus';
import { useMedia, useLightMotion } from './PremiumMotion';
import { fotoItinerario, itinerarios } from './itinerarios';
import { t } from './i18n';
import Arrow from './Arrow';
import './itinerary.css';

/*
 * «La experiencia»: historia vertical por paradas (Spec 02 «Itinerarios por parada», anexo SPECS/anexos/instrucciones_scroll_experiencias_TT.md; Spec 03 §I/§M).
 * Datos: src/itinerarios.js (única fuente editable). Escritorio (≥1000×620, sin movimiento reducido): foto sticky a la izquierda y panel a la derecha; el scroll
 * del navegador manda (sin preventDefault) y un solo planificador (scroll-bus) cambia la escena activa. Resto (móvil, tableta, horizontal bajo, movimiento
 * reducido, prerender): lista estática, foto arriba y texto abajo, sin pins. Indicador único «03 / 09» + mini barra (estilo Guatapé) en todos los tours. Imágenes: AVIF/WebP con srcset; las escenas futuras se cargan solo al acercarse.
 */
const pad = (n) => String(n).padStart(2, '0');
const stopOf = (i, n, unit) => t(unit === 'Etapa' ? 'Etapa {n} de {total}' : 'Parada {n} de {total}').replace('{n}', pad(i)).replace('{total}', pad(n));
const SIZES = '(max-width: 699px) 100vw, (max-width: 999px) 52vw, 58vw';

const Pin = () => <svg className="it-pin" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></svg>;

function Foto({ stop, eager = false }) {
  const f = fotoItinerario(stop.imagen);
  if (!f) return <div className="it-pending" role="img" aria-label={`${t('Foto pendiente')}: ${t(stop.ubicacion || stop.titulo_corto)}`}><span className="it-pending-ring" aria-hidden="true" /><b>Foto pendiente</b><span>{stop.ubicacion || stop.titulo_corto}</span></div>;
  return <picture>
    <source type="image/avif" srcSet={f.avif} sizes={SIZES} />
    <source type="image/webp" srcSet={f.webp} sizes={SIZES} />
    <img src={f.src} width={f.width} height={f.height} alt={stop.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: stop.foco }} />
  </picture>;
}

const labelsOf = (s) => [s.estado_parada === 'opcional' && 'Opcional', s.estado_parada === 'por_confirmar' && 'Por confirmar en ruta operativa', s.nota_ingreso, ...s.etiquetas].filter(Boolean);

function StopText({ s, i, n, corto, unit, rotulo, big }) {
  const labels = labelsOf(s);
  return <>
    <p className="it-sub">{stopOf(i + 1, n, unit)} · {corto}</p>
    <span className="it-num" aria-hidden="true">{pad(i + 1)}</span>
    <h3>{s.titulo_corto}</h3>
    {s.ubicacion && <p className="it-place"><Pin />{s.ubicacion}</p>}
    {labels.length > 0 && <ul className="it-tags" role="list">{labels.map((l) => <li key={l}>{l}</li>)}</ul>}
    <p className="it-desc">{s.descripcion}</p>
    {s.en_la_visita && <p className="it-visit"><b>{rotulo}</b>{s.en_la_visita}</p>}
    {s.duracion_aproximada && <p className="it-visit"><b>Duración aproximada</b>{s.duracion_aproximada}</p>}
    {!big && <div className="it-count-row" aria-hidden="true"><span className="it-count">{pad(i + 1)} / {pad(n)}</span><span className="it-bar"><i style={{ transform: `scaleX(${(i + 1) / n})` }} /></span></div>}
  </>;
}

export default function ItineraryStory({ tour }) {
  const data = itinerarios[tour.slug], stops = data.paradas, n = stops.length;
  const ref = useRef(null), stack = useRef(null), ctrl = useRef(null);
  const [active, setActive] = useState(0), [seen, setSeen] = useState(() => new Set([0, 1]));
  const wide = useMedia('(min-width: 1000px) and (min-height: 620px)', false), light = useLightMotion(), sticky = wide && !light;

  // Planificador único: medidas una vez; en el scroll solo cambia la escena al cruzar un umbral y la barra (transform).
  useEffect(() => {
    if (!sticky) return;
    const el = ref.current, inner = el.querySelector('.it-inner'), meter = el.querySelector('.it-meter i');
    let top = 0, total = 1, stick = 0, cur = -1, last = -1;
    return watchScroll({ el, margin: 0,
      measure: () => { top = docTop(el); total = Math.max(1, el.offsetHeight - inner.offsetHeight); stick = parseFloat(getComputedStyle(inner).top) || 0; },
      update: (y) => {
        const p = Math.max(0, Math.min(.9999, (stick - (top - y)) / total)), idx = Math.floor(p * n);
        if (idx !== cur) { cur = idx; setActive(idx); }
        const q = Math.round(p * 1000) / 1000; if (q !== last) { last = q; if (meter) meter.style.transform = `scaleX(${q})`; }
      } });
  }, [sticky, n]);

  // Escenas futuras: solo se piden la activa y las dos siguientes; la siguiente se decodifica antes de mostrarse.
  useEffect(() => {
    if (!sticky) return;
    setSeen((s) => { const next = new Set(s); for (let k = active; k <= Math.min(n - 1, active + 2); k++) next.add(k); return next.size === s.size ? s : next; });
    const nx = stack.current?.children[active + 1]?.querySelector('img');
    if (nx?.src && nx.decode) nx.decode().catch(() => {});
  }, [active, sticky, n, seen]);

  const go = useCallback((i) => {
    const el = ref.current, inner = el.querySelector('.it-inner');
    const stick = parseFloat(getComputedStyle(inner).top) || 0, total = Math.max(1, el.offsetHeight - inner.offsetHeight);
    const y = docTop(el) - stick + total * ((i + .5) / n);
    window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    setActive(i);
  }, [n]);
  const onKey = (e) => {
    const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key], j = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : k === undefined ? null : Math.max(0, Math.min(n - 1, active + k));
    if (j === null) return;
    e.preventDefault(); go(j); ctrl.current?.querySelectorAll('button')[j]?.focus();
  };

  const head = <header className="it-head wrap">
    <p className="eyebrow">La experiencia</p>
    <h2 className={data.tituloSeccion ? '' : 'it-sr'}>{data.tituloSeccion || 'El recorrido, parada a parada'}</h2>
    {data.aviso && <p className="it-aviso" role="note">{data.aviso}</p>}
  </header>;

  if (!sticky) return <section ref={ref} data-tn="0" className="it it-static" aria-label={`${t('Un recorrido por')} ${t(tour.name)}`}>
    {head}
    <ol className="it-list wrap" role="list">{stops.map((s, i) => <li key={s.orden} className="it-card">
      <div className="it-media"><Foto stop={s} /></div>
      <div className="it-text"><StopText s={s} i={i} n={n} corto={data.corto} unit={data.unidad} rotulo={data.rotulo || 'En la visita'} /></div>
    </li>)}</ol>
  </section>;

  return <section ref={ref} data-tn="0" className="it it-sticky" style={{ '--n': n }} aria-label={`${t('Un recorrido por')} ${t(tour.name)}`}>
    {head}
    <div className="it-track">
      <div className="it-inner">
        <div className="it-media" ref={stack}>
          {stops.map((s, i) => <div key={s.orden} className={`it-slide${active === i ? ' is-active' : ''}`} aria-hidden={active === i ? undefined : 'true'}>{(seen.has(i) || i === 0) && <Foto stop={s} eager={i <= 1} />}</div>)}
        </div>
        <div className="it-panel">
          <div className="it-articles">{stops.map((s, i) => <article key={s.orden} className={`it-art${active === i ? ' is-active' : ''}`} aria-hidden={active === i ? undefined : 'true'}><StopText s={s} i={i} n={n} corto={data.corto} unit={data.unidad} rotulo={data.rotulo || 'En la visita'} big /></article>)}</div>
          <div className="it-controls" ref={ctrl} role="group" aria-label={t('Elegir parada')} onKeyDown={onKey}>
            <div className="it-compact"><span className="it-count" aria-hidden="true">{pad(active + 1)} / {pad(n)}</span>
              <div className="it-segs">{stops.map((s, i) => <button key={s.orden} type="button" aria-label={`${t(data.unidad === 'Etapa' ? 'Ir a la etapa' : 'Ir a la parada')} ${i + 1}: ${t(s.titulo_corto)}`} aria-current={active === i ? 'step' : undefined} className={i <= active ? 'on' : ''} onClick={() => go(i)}><i /></button>)}</div></div>
          </div>
          <div className="it-meter" aria-hidden="true"><i /></div>
          <span className="it-hint">Desliza para seguir la historia <Arrow dir="down" /></span>
        </div>
      </div>
    </div>
  </section>;
}
