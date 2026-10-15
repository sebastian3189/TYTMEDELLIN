import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { language, languagePath } from './i18n';
import { LANGUAGES } from './languages';
import { allowPreferences } from './consent';
import './preferences.css';

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
    <select className="language-toggle" aria-label="Idioma del sitio" value={language()} onChange={e=>{window.location.assign(languagePath(pathname,e.target.value)+search+hash);}}>
      {LANGUAGES.map(lang=><option key={lang.code} value={lang.code} aria-label={lang.label} lang={lang.html} translate="no">{lang.code==='pt-BR'?'PT-BR':lang.code.toUpperCase()}</option>)}
    </select>
  </div>;
}
