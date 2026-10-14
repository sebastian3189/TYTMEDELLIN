import { useEffect, useRef } from 'react';
import info from './tour-info.json';
import { useLightMotion } from './PremiumMotion';
import { watchScroll, docTop } from './scroll-bus';

// Detalle real de cada recorrido: textos del sitio oficial de la marca (tnt-colombia-connect, src/data/sedes.ts, sede Medellín).
// Solo lo que existe: no se inventan duraciones, precios ni horarios. Ningún texto sobre fotografía.
const ICONS = {
  car: 'M5 17h14M6 17V9l2-4h8l2 4v8M3 12h3m12 0h3M8 13h.01M16 13h.01',
  seat: 'M7 3h6a2 2 0 0 1 2 2v8H5V5a2 2 0 0 1 2-2Zm-2 10h12v4H5zm2 4v3m10-3v3M15 8h3a1 1 0 0 1 1 1v8',
  guide: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0M17 3l1.2 1.2L21 1.5',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  check: 'm5 12 4 4 10-10',
};
const iconFor = t => /transporte/i.test(t) ? 'car' : /veh[ií]culo/i.test(t) ? 'seat' : /conductor|gu[ií]a/i.test(t) ? 'guide' : /atenci/i.test(t) ? 'heart' : /foto|video/i.test(t) ? 'camera' : 'check';
const Icon = ({ name }) => <svg className="td-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[name]} pathLength="1" /></svg>;

export default function TourDetails({ slug }) {
  const d = info[slug], list = useRef(null), light = useLightMotion();
  useEffect(() => {
    const node = list.current;
    if (!node || light) return;
    // Planificador único (scroll-bus): medidas una vez; la línea es un transform y los pasos solo cambian al cruzar su umbral.
    const items = [...node.querySelectorAll('li')]; let top = 0, h = 1, last = -1, lit = -1;
    const stop = watchScroll({
      el: node, margin: 0,
      measure: () => { top = docTop(node); h = node.offsetHeight || 1; },
      update: (y, vh) => {
        const p = Math.round(Math.min(1, Math.max(0, (y + vh * .7 - top) / h)) * 500) / 500; if (p === last) return; last = p; node.style.setProperty('--rp', p.toFixed(3));
        const n = items.filter((_, i, all) => p >= i / all.length - .02).length; if (n !== lit) { lit = n; items.forEach((li, i) => li.toggleAttribute('data-on', i < n)); }
      },
    });
    return () => { stop(); node.style.removeProperty('--rp'); items.forEach(li => li.removeAttribute('data-on')); };
  }, [light, slug]);
  if (!d) return null;
  return <section className="tour-details wrap" id="detalles" data-tn="0" aria-label="Detalles del recorrido">
    <div className="td-lead" data-tr>
      <p>{d.descripcion}</p>
      {d.ampliada.map(p => <p key={p}>{p}</p>)}
      {d.destacados.length > 0 && <ul className="td-chips" role="list">{d.destacados.map(h => <li key={h}>{h}</li>)}</ul>}
    </div>
    <div className="td-grid">
      {d.ruta && <div className="td-route" data-tr><h3>{d.ruta.titulo}</h3><ol ref={list} className="td-steps">{d.ruta.pasos.map((p, i) => <li key={p}><span className="td-dot" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span>{p}</span></li>)}</ol></div>}
      <div className="td-incl" data-tr>
        <h3>Qué incluye</h3>
        <ul role="list">{d.incluye.map(t => <li key={t}><Icon name={iconFor(t)} /><span>{t}</span></li>)}</ul>
        {d.punto && <div className="td-meet"><h3>Punto de encuentro</h3><p>{d.punto}</p></div>}
      </div>
    </div>
  </section>;
}
