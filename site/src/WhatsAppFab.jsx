import { useEffect, useRef } from 'react';
import { whatsapp } from './company';
import { SocialIcon } from './Socials';
import './fab.css';

/*
 * Botón flotante de WhatsApp (pedido del usuario, 2026-10-14). Abajo a la derecha, siempre flotante, sin cambiar el diseño de nada:
 * mientras taparía un control (enlace, botón, campo), el pie o un diálogo, se atenúa y deja de recibir clics (muestreo con elementsFromPoint).
 * El enlace solo lleva un texto genérico (sin datos personales).
 */
const BLOCKERS = 'a,button,input,select,textarea,label,summary,[role=tab],.site-footer';
export default function WhatsAppFab() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let raf = 0, until = 0, lastRun = 0, box = null;
    // El botón es fijo: su caja se mide solo al cambiar el tamaño (no en cada fotograma de scroll).
    const measureBox = () => { const r = el.getBoundingClientRect(); box = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, r: r.width / 2 + 8 }; };
    const check = (now) => {
      raf = 0;
      if (now < until) raf = requestAnimationFrame(check); // tras cada scroll se sigue midiendo 500 ms (contenido que se maqueta o anima al llegar)
      if (now - lastRun < 120) return; // como mucho 8 muestreos por segundo: el scroll del resto de la página no paga este coste
      lastRun = now;
      let blocked = Boolean(document.querySelector('.menu-open, dialog[open]'));
      if (!blocked) {
        // 9 puntos: centro y anillo (el círculo + 8 px de margen).
        outer: for (let k = -1; k < 8; k++) {
          const x = box.cx + (k < 0 ? 0 : box.r * Math.cos((k * Math.PI) / 4)), y = box.cy + (k < 0 ? 0 : box.r * Math.sin((k * Math.PI) / 4));
          for (const hit of document.elementsFromPoint(x, y)) { if (hit.closest('.wa-fab')) continue; if (hit.closest(BLOCKERS)) { blocked = true; break outer; } }
        }
      }
      const value = blocked ? 'true' : 'false';
      if (el.dataset.hidden !== value) el.dataset.hidden = value;
    };
    const schedule = () => { until = performance.now() + 500; if (!raf) raf = requestAnimationFrame(check); };
    const onResize = () => { measureBox(); schedule(); };
    measureBox();
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', onResize);
    const mo = new MutationObserver(schedule); mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'open'] });
    const timer = setInterval(schedule, 800); // contenido que se mueve solo (baraja, carruseles)
    schedule();
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', onResize); mo.disconnect(); clearInterval(timer); cancelAnimationFrame(raf); };
  }, []);
  return <a ref={ref} className="wa-fab" data-hidden="false" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"><SocialIcon id="whatsapp" size={28} /></a>;
}
