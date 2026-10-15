import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { allowPreferences, readConsent } from './consent';
import './welcome.css';

/*
 * Mensaje de bienvenida (pedido del usuario, 2026-10-15; Spec 03 §I.2 y Spec 04): tarjeta flotante NO modal (role="status", aria-live="polite", sin robar el foco).
 * Reglas: aparece unos segundos después de cargar y solo cuando el aviso de cookies ya se resolvió; una vez por sesión (sessionStorage solo si el usuario aceptó
 * el almacenamiento opcional; si no, solo memoria del módulo, sin persistir); nunca en /cotizar ni /contacto ni con un diálogo o el menú abierto; cierra con × y Escape.
 * Posición: arriba a la derecha en escritorio y arriba, bajo la cabecera, en móvil: no toca el botón de WhatsApp ni la barra de ficha (ambos abajo).
 */
const KEY = 'tyt-bienvenida', EXCLUDED = /^\/(cotizar|contacto)\/?$/, DELAY = 3500;
let shownInMemory = false;
const seen = () => { if (shownInMemory) return true; if (!allowPreferences()) return false; try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; } };
const markSeen = () => { shownInMemory = true; if (allowPreferences()) try { sessionStorage.setItem(KEY, '1'); } catch { /* sin almacenamiento: queda la memoria */ } };
const Sun = () => <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4.2" fill="currentColor" fillOpacity=".22"/><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>;

export default function Welcome() {
  const { pathname } = useLocation();
  const [resolved, setResolved] = useState(false), [open, setOpen] = useState(false), [leaving, setLeaving] = useState(false);
  const card = useRef(null), blocked = EXCLUDED.test(pathname);
  useEffect(() => {
    const sync = () => setResolved(Boolean(readConsent()));
    sync(); window.addEventListener('tyt-consent-change', sync); window.addEventListener('storage', sync);
    return () => { window.removeEventListener('tyt-consent-change', sync); window.removeEventListener('storage', sync); };
  }, []);
  useEffect(() => {
    if (!resolved || blocked || open || seen()) return;
    let timer, tries = 0;
    const attempt = () => {
      // Nunca encima de un diálogo, del menú móvil ni del aviso de cookies; si algo lo ocupa, reintenta con calma.
      if (document.querySelector('dialog[open], .menu-open, .consent-banner') && tries++ < 20) { timer = setTimeout(attempt, 1500); return; }
      if (tries >= 20) return;
      const header = document.querySelector('.site-header');
      document.documentElement.style.setProperty('--welcome-top', `${Math.round((header?.getBoundingClientRect().bottom || 0) + 12)}px`);
      markSeen(); setOpen(true);
    };
    timer = setTimeout(attempt, DELAY);
    return () => clearTimeout(timer);
  }, [resolved, blocked, open, pathname]);
  const close = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setOpen(false); return; }
    setLeaving(true); setTimeout(() => { setOpen(false); setLeaving(false); }, 200);
  };
  useEffect(() => {
    if (!open) return;
    const key = (e) => { if (e.key === 'Escape' && !e.defaultPrevented && !document.querySelector('dialog[open], .menu-open, .language-list')) close(); };
    document.addEventListener('keydown', key); return () => document.removeEventListener('keydown', key);
  }, [open]);
  return <div className="welcome-live" role="status" aria-live="polite">
    {open && !blocked && <aside ref={card} className={`welcome${leaving ? ' is-leaving' : ''}`} aria-labelledby="welcome-title">
      <button type="button" className="welcome-close" onClick={close} aria-label="Cerrar mensaje de bienvenida"><span aria-hidden="true">×</span></button>
      <span className="welcome-icon"><Sun /></span>
      <div className="welcome-body">
        <h2 id="welcome-title">No dejes para mañana lo que puedes disfrutar hoy</h2>
        <p>Elige un destino y cotiza por WhatsApp en un minuto.</p>
        <Link className="welcome-cta" to="/experiencias" onClick={() => setOpen(false)}>Ver destinos</Link>
      </div>
    </aside>}
  </div>;
}
