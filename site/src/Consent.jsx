import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { readConsent, saveConsent, openConsent } from './consent';
import './consent.css';

export function ConsentLink() { return <button className="consent-link" type="button" onClick={openConsent}>Cookies y preferencias</button>; }
// Icono de galleta (decorativo): mismo trazo que el resto de iconos del sitio.
const CookieIcon = () => <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 1 1 0 0 0-1-1Z"/><circle cx="8.5" cy="11" r=".9" fill="currentColor"/><circle cx="12.5" cy="15.5" r=".9" fill="currentColor"/><circle cx="15.5" cy="12" r=".9" fill="currentColor"/></svg>;
/*
 * Aviso de privacidad (Spec 04 / Spec 03 §I.2): tarjeta flotante compacta de vidrio con tres acciones de MISMO peso visual (Aceptar / Rechazar / Configurar), sin casillas premarcadas.
 * La lógica de decisión (180 días, memoria si no hay almacenamiento, retirada) vive en consent.js. Al resolverse emite `tyt-consent-change` (lo escucha el mensaje de bienvenida).
 */
export default function Consent() {
  const [ready,setReady]=useState(false),[chosen,setChosen]=useState(false),[leaving,setLeaving]=useState(false),[draft,setDraft]=useState(false),[notice,setNotice]=useState('');
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
    const el=banner.current,narrow=matchMedia('(max-width:767px)');
    // Solo en móvil la tarjeta ocupa el ancho y debe apartar el botón de WhatsApp y la barra de ficha; en escritorio flota sin desplazar nada.
    const size=()=>{if(narrow.matches)document.documentElement.style.setProperty('--consent-space',`${Math.ceil(el.getBoundingClientRect().height)+24}px`);else document.documentElement.style.removeProperty('--consent-space');};
    const ro=new ResizeObserver(size);ro.observe(el);narrow.addEventListener('change',size);size();
    return()=>{ro.disconnect();narrow.removeEventListener('change',size);document.documentElement.style.removeProperty('--consent-space');};
  },[ready,chosen]);
  const close=()=>dialog.current?.close();
  const choose=(value)=>{
    const persisted=saveConsent(value);setNotice(persisted?'':'La configuración no pudo guardarse. Se aplicará durante esta visita.');close();
    // Salida breve (ninguna con movimiento reducido) y después se retira la tarjeta.
    if(banner.current&&!matchMedia('(prefers-reduced-motion: reduce)').matches){setLeaving(true);setTimeout(()=>{setChosen(true);setLeaving(false);},200);}else setChosen(true);
  };
  if(!ready)return null;
  return <>
    {!chosen&&<section ref={banner} className={`consent-banner${leaving?' is-leaving':''}`} aria-labelledby="privacy-banner-title">
      <div className="consent-top"><span className="consent-icon"><CookieIcon/></span><h2 id="privacy-banner-title">Tu privacidad</h2></div>
      <p>Usamos almacenamiento local para recordar ajustes del sitio. No usamos analítica ni publicidad. Tú decides si guardamos tu tema preferido.</p>
      <div className="consent-actions"><button type="button" onClick={()=>choose(true)}>Aceptar</button><button type="button" onClick={()=>choose(false)}>Rechazar</button><button type="button" onClick={openConsent}>Configurar</button></div>
    </section>}
    <dialog ref={dialog} className="consent-dialog" aria-labelledby="privacy-title" aria-describedby="privacy-description" onClose={()=>{if(returnFocus.current?.isConnected)returnFocus.current.focus({preventScroll:true});else document.querySelector('.consent-link')?.focus({preventScroll:true});}}>
      <div className="consent-head"><span className="consent-icon"><CookieIcon/></span><h2 id="privacy-title">Preferencias de privacidad</h2><button type="button" onClick={close} aria-label="Cerrar preferencias">×</button></div>
      <p id="privacy-description">Tu elección se guarda durante seis meses en este navegador.</p>
      <section><h3>Necesarias</h3><strong>Siempre activas</strong><p>Guardan tu decisión de privacidad y ajustes funcionales, como reducir el movimiento y la ayuda de navegación.</p></section>
      <section><label className="consent-option"><input type="checkbox" checked={draft} onChange={e=>setDraft(e.target.checked)}/><strong>Preferencias</strong></label><p>Recordar el tema claro u oscuro entre visitas.</p></section>
      <section><h3>Analítica y publicidad</h3><p>No utilizadas actualmente</p></section>
      <Link className="consent-policy" to="/privacidad" onClick={close}>Privacidad</Link>
      <div className="consent-actions"><button type="button" onClick={()=>choose(draft)}>Guardar preferencias</button><button type="button" onClick={()=>choose(false)}>Retirar consentimiento</button></div>
    </dialog>
    {notice&&<p className="consent-notice" role="status">{notice}</p>}
  </>;
}
