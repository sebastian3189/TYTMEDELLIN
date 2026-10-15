import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { readConsent, saveConsent, openConsent } from './consent';
import './consent.css';

export function ConsentLink() { return <button className="consent-link" type="button" onClick={openConsent}>Cookies y preferencias</button>; }
export default function Consent() {
  const [ready,setReady]=useState(false),[chosen,setChosen]=useState(false),[draft,setDraft]=useState(false),[notice,setNotice]=useState('');
  const banner=useRef(null),dialog=useRef(null),returnFocus=useRef(null);
  useEffect(()=>{
    setChosen(Boolean(readConsent())); setReady(true);
    const open=()=>{setDraft(readConsent()?.preferences===true);returnFocus.current=document.activeElement;dialog.current?.showModal();};
    const sync=()=>setChosen(Boolean(readConsent()));
    window.addEventListener('tyt-open-consent',open);window.addEventListener('storage',sync);
    return()=>{window.removeEventListener('tyt-open-consent',open);window.removeEventListener('storage',sync)};
  },[]);
  useEffect(()=>{
    if(!ready||chosen){document.documentElement.style.removeProperty('--consent-space');return;}
    const el=banner.current;
    const size=()=>document.documentElement.style.setProperty('--consent-space',`${Math.ceil(el.getBoundingClientRect().height)+32}px`);
    const ro=new ResizeObserver(size);ro.observe(el);size();
    return()=>{ro.disconnect();document.documentElement.style.removeProperty('--consent-space');};
  },[ready,chosen]);
  const close=()=>dialog.current?.close();
  const choose=(value)=>{
    const persisted=saveConsent(value);setChosen(true);setNotice(persisted?'':'La configuración no pudo guardarse. Se aplicará durante esta visita.');close();
  };
  if(!ready)return null;
  return <>
    {!chosen&&<section ref={banner} className="consent-banner" aria-labelledby="privacy-banner-title">
      <h2 id="privacy-banner-title">Tu privacidad</h2>
      <p>Usamos almacenamiento local para recordar ajustes del sitio. No usamos analítica ni publicidad. Tú decides si guardamos tu tema preferido.</p>
      <div className="consent-actions"><button onClick={()=>choose(true)}>Aceptar</button><button onClick={()=>choose(false)}>Rechazar no esenciales</button><button onClick={openConsent}>Configurar</button></div>
    </section>}
    <dialog ref={dialog} className="consent-dialog" aria-labelledby="privacy-title" aria-describedby="privacy-description" onClose={()=>{if(returnFocus.current?.isConnected)returnFocus.current.focus({preventScroll:true});else document.querySelector('.consent-link')?.focus({preventScroll:true});}}>
      <div className="consent-head"><h2 id="privacy-title">Preferencias de privacidad</h2><button type="button" onClick={close} aria-label="Cerrar preferencias">×</button></div>
      <p id="privacy-description">Tu elección se guarda durante seis meses en este navegador.</p>
      <section><h3>Necesarias</h3><strong>Siempre activas</strong><p>Guardan tu decisión de privacidad y ajustes funcionales, como reducir el movimiento y la ayuda de navegación.</p></section>
      <section><label className="consent-option"><input type="checkbox" checked={draft} onChange={e=>setDraft(e.target.checked)}/><strong>Preferencias</strong></label><p>Recordar el tema claro u oscuro entre visitas.</p></section>
      <section><h3>Analítica y publicidad</h3><p>No utilizadas actualmente</p></section>
      <Link to="/privacidad" onClick={close}>Privacidad</Link>
      <div className="consent-actions"><button type="button" onClick={()=>choose(draft)}>Guardar preferencias</button><button type="button" onClick={()=>choose(false)}>Retirar consentimiento</button></div>
    </dialog>
    {notice&&<p className="consent-notice" role="status">{notice}</p>}
  </>;
}
