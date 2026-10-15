import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { language, languagePath, switchLanguage, t } from './i18n';
import { holdScroll } from './RouteScroll';
import { LANGUAGES } from './languages';
import { allowPreferences } from './consent';
import './preferences.css';

const SHORT = { es: 'ES', en: 'EN', 'pt-BR': 'PT' };
// Selector de idioma compacto: botón con el idioma actual (ES / EN / PT) y lista de enlaces reales (/en, /pt-br). Cabe y se toca (≥44 px) desde 320 px.
function LanguageMenu() {
  const [open,setOpen]=useState(false), root=useRef(null), button=useRef(null);
  const {pathname,search,hash}=useLocation(), current=language(), info=LANGUAGES.find(x=>x.code===current)||LANGUAGES[0];
  useEffect(()=>{
    if(!open)return;
    const down=e=>{if(!root.current?.contains(e.target))setOpen(false)};
    const key=e=>{
      if(e.key==='Escape'){setOpen(false);button.current?.focus();}
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){const items=[...root.current.querySelectorAll('a')],i=items.indexOf(document.activeElement);e.preventDefault();items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus();}
    };
    document.addEventListener('pointerdown',down);document.addEventListener('keydown',key);
    return()=>{document.removeEventListener('pointerdown',down);document.removeEventListener('keydown',key)};
  },[open]);
  const choose=(e,code)=>{
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button>0)return;
    e.preventDefault();setOpen(false);
    if(code===current){button.current?.focus();return;}
    holdScroll();switchLanguage(code);
  };
  return <div className="language-menu" ref={root}>
    <button ref={button} type="button" className="language-toggle" translate="no" aria-haspopup="true" aria-expanded={open} aria-label={`${t('Idioma del sitio')}: ${info.label}`} onClick={()=>setOpen(!open)}>
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z"/></svg>
      <span>{SHORT[current]}</span>
    </button>
    {open&&<ul className="language-list" role="list">
      {LANGUAGES.map(lang=><li key={lang.code}><a href={languagePath(pathname,lang.code)+search+hash} hrefLang={lang.html} lang={lang.html} translate="no" aria-current={lang.code===current?'true':undefined} onClick={e=>choose(e,lang.code)}><span>{lang.label}</span><span className="language-code" aria-hidden="true">{SHORT[lang.code]}</span></a></li>)}
    </ul>}
  </div>;
}
export default function Preferences() {
  const [dark,setDark]=useState(false);
  const {pathname,search,hash}=useLocation();
  useEffect(()=>{
    const system=matchMedia('(prefers-color-scheme: dark)');
    const sync=()=>{let saved;try{if(allowPreferences())saved=localStorage.getItem('tyt-theme')}catch{}const active=saved==='dark'||(saved!=='light'&&system.matches);document.documentElement.dataset.theme=active?'dark':'light';setDark(active)};
    sync();system.addEventListener('change',sync);window.addEventListener('storage',sync);window.addEventListener('tyt-consent-change',sync);
    return()=>{system.removeEventListener('change',sync);window.removeEventListener('storage',sync);window.removeEventListener('tyt-consent-change',sync)};
  },[]);
  const toggle=()=>{
    const next=!dark;document.documentElement.dataset.theme=next?'dark':'light';setDark(next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',next?'#171A18':'#FAF8F5');
    if(allowPreferences())try{localStorage.setItem('tyt-theme',next?'dark':'light')}catch{}
  };
  return <div className="site-preferences">
    <button type="button" className="theme-toggle" aria-label={dark?'Activar modo claro':'Activar modo oscuro'} aria-pressed={dark} onClick={toggle}>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{dark?<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>:<path d="M20 15A8.5 8.5 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z"/>}</svg>
    </button>
    <LanguageMenu/>
  </div>;
}
