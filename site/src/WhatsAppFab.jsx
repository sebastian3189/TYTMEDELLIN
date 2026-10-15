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
/*
 * Pedido del usuario (2026-10-14): el botón NUNCA desaparece por sí solo al hacer scroll. Solo se oculta con un diálogo abierto o el menú móvil abierto (la capa que lo tapa),
 * y, en las fichas móviles, lo sustituye la barra «Cotizar por WhatsApp» (html[data-tourbar=on], ver TourBar.jsx / fab.css); vuelve al instante cuando la barra se retira.
 * Ya no se muestrea con elementsFromPoint (era lo que lo ocultaba al pasar sobre enlaces y costaba layout en cada scroll).
 */
export default function WhatsAppFab() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const check = () => { const value = document.querySelector('.menu-open, dialog[open]') ? 'true' : 'false'; if (el.dataset.hidden !== value) el.dataset.hidden = value; };
    const mo = new MutationObserver(check); mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'open'] });
    const pulse = setInterval(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; el.classList.add('wa-pulse'); setTimeout(() => el.classList.remove('wa-pulse'), 1900); }, 12000); // un pulso suave cada ~12 s (los dos primeros los hace el CSS al cargar)
    check();
    return () => { mo.disconnect(); clearInterval(pulse); };
  }, []);
  return <a ref={ref} className="wa-fab" data-hidden="false" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"><SocialIcon id="whatsapp" size={32} /><span className="wa-label" aria-hidden="true">{language() === 'en' ? "Let's talk?" : '¿Hablamos?'}</span></a>;
}
