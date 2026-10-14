import { useEffect, useRef } from 'react';
import { whatsapp } from './company';
import { SocialIcon } from './Socials';
import './fab.css';

/*
 * Botón flotante de WhatsApp (pedido del usuario, 2026-10-14). Abajo a la derecha, siempre flotante, sin cambiar el diseño de nada:
 * mientras taparía un control (enlace, botón, campo), el pie o un diálogo, se atenúa y deja de recibir clics (muestreo con elementsFromPoint).
 * El enlace solo lleva un texto genérico (sin datos personales). Con la QuoteBar móvil visible se eleva sobre ella (fab.css).
 */
const BLOCKERS = 'a,button,input,select,textarea,label,summary,[role=tab],.site-footer';
export default function WhatsAppFab() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let raf = 0, until = 0;
    const check = () => {
      raf = 0;
      if (performance.now() < until) raf = requestAnimationFrame(check); // tras cada scroll se sigue midiendo 500 ms (contenido que se maqueta o anima al llegar)
      const r = el.getBoundingClientRect();
      let blocked = Boolean(document.querySelector('.menu-open, dialog[open]'));
      if (!blocked) {
        const pad = 8, line = (a, b) => [0, 1, 2, 3, 4, 5, 6].map((k) => a + ((b - a) * k) / 6), xs = line(r.left - pad, r.right + pad), ys = line(r.top - pad, r.bottom + pad); // rejilla 7×7 con margen
        outer: for (const x of xs) for (const y of ys) {
          for (const hit of document.elementsFromPoint(x, y)) { if (hit === el || el.contains(hit) || hit.closest('.wa-fab')) continue; if (hit.closest(BLOCKERS)) { blocked = true; break outer; } }
        }
      }
      el.dataset.hidden = blocked ? 'true' : 'false';
    };
    const schedule = () => { until = performance.now() + 500; if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule);
    const mo = new MutationObserver(schedule); mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'open'] });
    const timer = setInterval(schedule, 600); // contenido que se mueve solo (baraja, carruseles)
    schedule();
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); mo.disconnect(); clearInterval(timer); cancelAnimationFrame(raf); };
  }, []);
  return <a ref={ref} className="wa-fab" data-hidden="false" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"><SocialIcon id="whatsapp" size={28} /></a>;
}
