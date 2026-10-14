import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { company } from './company';
import { language } from './i18n';
import { SocialIcon } from './Socials';
import Icon from './icons';

/*
 * Extras de las tarjetas de experiencia, copiados del sitio oficial (tnt-colombia-connect: InsigniaGoogle.tsx y CompartirExperiencia.tsx).
 * - GoogleBadge: «★★★★★ 5,0 · Google» en vidrio sobre la foto. Es la valoración de la EMPRESA (no del recorrido) y enlaza a su ficha real de Google.
 * - ShareMenu: botón redondo de vidrio con menú accesible (WhatsApp, Facebook, X, Instagram, TikTok, correo, copiar enlace y hoja nativa del sistema).
 *   Instagram y TikTok no aceptan enlaces por URL: se copia el enlace, se avisa y se abre la red para pegarlo (mismo comportamiento que el oficial).
 */
const RATING = 5.0;
export function GoogleBadge({ className = '' }) {
  const figure = RATING.toLocaleString(language() === 'en' ? 'en-US' : 'es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const label = language() === 'en' ? `Company rating on Google: ${figure} out of 5` : `Valoración de la empresa en Google: ${figure} de 5`;
  return (
    <a className={`card-google ${className}`} href={company.reviews} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <span className="card-google-stars" aria-hidden="true">★★★★★</span>
      <span aria-hidden="true">{figure}</span>
      <span aria-hidden="true" className="card-google-brand">· Google</span>
    </a>
  );
}

export function GoogleBadgeStatic({ className = '' }) {
  const figure = RATING.toLocaleString(language() === 'en' ? 'en-US' : 'es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const label = language() === 'en' ? `Company rating on Google: ${figure} out of 5` : `Valoración de la empresa en Google: ${figure} de 5`;
  return (
    <span className={`card-google card-google--static ${className}`} role="img" aria-label={label}>
      <span className="card-google-stars" aria-hidden="true">★★★★★</span>
      <span aria-hidden="true">{figure}</span>
      <span aria-hidden="true" className="card-google-brand">· Google</span>
    </span>
  );
}

// Facebook («f» en círculo), trazado de Simple Icons; X, Instagram y TikTok ya están en Socials.jsx.
const FACEBOOK = 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z';
const X_PATH = 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z';
const Brand = ({ d, size = 18 }) => <svg className="ico" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false"><path d={d} /></svg>;

// URL canónica de la experiencia: dominio del canonical de la página (cuando ya es el definitivo) o el origen actual; nada personal.
function shareUrl(path) {
  let origin = location.origin;
  try { const c = document.querySelector('link[rel="canonical"]')?.href; if (c) { const u = new URL(c); if (!/\.invalid$/.test(u.hostname)) origin = u.origin; } } catch { /* se usa el origen actual */ }
  return origin + (language() === 'en' ? '/en' : '') + path;
}
const TEXT = {
  es: { button: 'Compartir esta experiencia', title: 'Compartir por', copy: 'Copiar enlace', copied: 'Enlace copiado', error: 'No se pudo copiar. Copia la dirección de la barra del navegador.', more: 'Más opciones…', paste: 'Enlace copiado. Pégalo en tu historia o mensaje de {red}.', mail: 'Correo', message: 'Mira esta experiencia de T&T Medellín:' },
  en: { button: 'Share this experience', title: 'Share via', copy: 'Copy link', copied: 'Link copied', error: "Couldn't copy. Copy the address from the browser bar instead.", more: 'More options…', paste: 'Link copied. Paste it into your {red} story or message.', mail: 'Email', message: 'Check out this experience from T&T Medellín:' },
};

export function ShareMenu({ name, path, className = '' }) {
  const tx = TEXT[language() === 'en' ? 'en' : 'es'];
  const [open, setOpen] = useState(false), [pos, setPos] = useState(null), [native, setNative] = useState(false), [notice, setNotice] = useState('');
  const btn = useRef(null), menu = useRef(null), timer = useRef(0);
  useEffect(() => { setNative(typeof navigator.share === 'function'); }, []);
  const close = (restore = true) => { setOpen(false); setNotice(''); if (restore) btn.current?.focus(); };
  useEffect(() => {
    if (!open) return undefined;
    const r = btn.current.getBoundingClientRect(), w = 224, h = 340;
    const left = Math.max(8, Math.min(r.right - w, innerWidth - w - 8)), below = r.bottom + 8 + h <= innerHeight || r.top < h;
    setPos({ left, top: below ? r.bottom + 8 : Math.max(8, r.top - 8 - h) });
    const first = () => menu.current?.querySelector('[role=menuitem]')?.focus(); requestAnimationFrame(first);
    const away = (e) => { if (!menu.current?.contains(e.target) && !btn.current?.contains(e.target)) close(false); };
    const stop = () => close(false);
    document.addEventListener('pointerdown', away); window.addEventListener('resize', stop); window.addEventListener('scroll', stop, { passive: true });
    return () => { document.removeEventListener('pointerdown', away); window.removeEventListener('resize', stop); window.removeEventListener('scroll', stop); };
  }, [open]);
  const say = (text) => { setNotice(text); clearTimeout(timer.current); timer.current = setTimeout(() => setNotice(''), 3500); };
  const url = () => shareUrl(path), text = () => `${tx.message} ${name}`, openNew = (to) => { window.open(to, '_blank', 'noopener,noreferrer'); close(false); };
  const copy = async (value) => { try { await navigator.clipboard.writeText(value); return true; } catch { return false; } };
  const items = [
    ...(native ? [{ id: 'native', label: tx.more, icon: <Icon name="more" size={18} />, run: async () => { close(false); try { await navigator.share({ title: name, text: text(), url: url() }); } catch { /* la persona cerró la hoja */ } } }] : []),
    { id: 'wa', label: 'WhatsApp', icon: <SocialIcon id="whatsapp" size={18} />, run: () => openNew(`https://wa.me/?text=${encodeURIComponent(`${text()} ${url()}`)}`) },
    { id: 'fb', label: 'Facebook', icon: <Brand d={FACEBOOK} />, run: () => openNew(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`) },
    { id: 'x', label: 'X', icon: <Brand d={X_PATH} />, run: () => openNew(`https://x.com/intent/post?text=${encodeURIComponent(text())}&url=${encodeURIComponent(url())}`) },
    { id: 'ig', label: 'Instagram', icon: <SocialIcon id="instagram" size={18} />, run: async () => { say((await copy(`${text()} ${url()}`)) ? tx.paste.replace('{red}', 'Instagram') : tx.error); window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer'); } },
    { id: 'tt', label: 'TikTok', icon: <SocialIcon id="tiktok" size={18} />, run: async () => { say((await copy(`${text()} ${url()}`)) ? tx.paste.replace('{red}', 'TikTok') : tx.error); window.open('https://www.tiktok.com/', '_blank', 'noopener,noreferrer'); } },
    { id: 'mail', label: tx.mail, icon: <Icon name="mail" size={18} />, run: () => { close(false); location.href = `mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(`${text()}\n${url()}`)}`; } },
    { id: 'copy', label: tx.copy, icon: <Icon name="link" size={18} />, run: async () => say((await copy(url())) ? tx.copied : tx.error) },
  ];
  const onKey = (e) => {
    const els = [...menu.current.querySelectorAll('[role=menuitem]')], i = els.indexOf(document.activeElement);
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); els[(i + 1) % els.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); els[(i - 1 + els.length) % els.length].focus(); }
    else if (e.key === 'Home') { e.preventDefault(); els[0].focus(); }
    else if (e.key === 'End') { e.preventDefault(); els[els.length - 1].focus(); }
    else if (e.key === 'Tab') { e.preventDefault(); els[(i + (e.shiftKey ? -1 : 1) + els.length) % els.length].focus(); } // foco atrapado en el menú
  };
  return (
    <>
      <button ref={btn} type="button" className={`card-share ${className}`} aria-label={`${tx.button}: ${name}`} aria-haspopup="menu" aria-expanded={open} onClick={() => (open ? close() : setOpen(true))}>
        <Icon name="share" size={18} />
      </button>
      {open && pos && createPortal(
        <div ref={menu} className="share-menu" role="menu" aria-label={tx.title} style={{ left: pos.left, top: pos.top }} onKeyDown={onKey}>
          <p className="share-menu-title" aria-hidden="true">{tx.title}</p>
          {items.map((it) => <button key={it.id} type="button" role="menuitem" className="share-item" onClick={it.run}>{it.icon}<span>{it.label}</span></button>)}
          <p className="share-notice" role="status" aria-live="polite">{notice}</p>
        </div>, document.body)}
    </>
  );
}
