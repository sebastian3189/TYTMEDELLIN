import { useEffect, useRef } from 'react';
import { whatsapp } from './company';
import { language } from './i18n';
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
    let timer0 = 0, lastRun = 0, box = null;
    const touch = matchMedia('(pointer:coarse)').matches, GAP = touch ? 220 : 100, POINTS = touch ? 5 : 9; // móvil: ≤ 5 muestreos/s con 5 puntos (el muestreo fuerza layout; el scroll no debe pagarlo)
    // El botón es fijo: su caja se mide solo al cambiar el tamaño (no en cada fotograma de scroll).
    const measureBox = () => { const r = el.getBoundingClientRect(); box = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, r: r.width / 2 + 8 }; };
    const check = () => {
      timer0 = 0; if (document.hidden) return;
      lastRun = performance.now();
      let blocked = Boolean(document.querySelector('.menu-open, dialog[open]'));
      if (!blocked) {
        // Centro y anillo (el círculo + 8 px de margen): 9 puntos en escritorio, 5 en móvil.
        outer: for (let k = -1; k < POINTS - 1; k++) {
          const a = (k * 2 * Math.PI) / (POINTS - 1), x = box.cx + (k < 0 ? 0 : box.r * Math.cos(a)), y = box.cy + (k < 0 ? 0 : box.r * Math.sin(a));
          for (const hit of document.elementsFromPoint(x, y)) { if (hit.closest('.wa-fab')) continue; if (hit.closest(BLOCKERS)) { blocked = true; break outer; } }
        }
      }
      const value = blocked ? 'true' : 'false';
      if (el.dataset.hidden !== value) el.dataset.hidden = value;
    };
    // Con limitación al final del intervalo (trailing): el último scroll siempre deja una medición correcta, sin rAF permanente.
    const schedule = () => { if (!timer0) timer0 = setTimeout(check, Math.max(0, GAP - (performance.now() - lastRun))); };
    const onResize = () => { measureBox(); schedule(); };
    measureBox();
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', onResize);
    const mo = new MutationObserver(schedule); mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'open'] });
    const pulse = setInterval(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; el.classList.add('wa-pulse'); setTimeout(() => el.classList.remove('wa-pulse'), 1900); }, 12000); // un pulso suave cada ~12 s (los dos primeros los hace el CSS al cargar)
    const timer = setInterval(schedule, 1500); // contenido que se mueve solo (baraja, carruseles)
    schedule();
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', onResize); mo.disconnect(); clearInterval(timer); clearInterval(pulse); clearTimeout(timer0); };
  }, []);
  return <a ref={ref} className="wa-fab" data-hidden="false" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"><SocialIcon id="whatsapp" size={32} /><span className="wa-label" aria-hidden="true">{language() === 'en' ? "Let's talk?" : '¿Hablamos?'}</span></a>;
}
