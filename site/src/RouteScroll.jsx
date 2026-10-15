import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
// Spec 04: restauración por entrada de historial, después de resolver la ruta lazy.
const positions = new Map();
let activeKey = null, held = null;
// Al cambiar de idioma la app se vuelve a montar en la misma página: se conserva la posición de scroll (no es una navegación nueva).
export const holdScroll = () => { held = window.scrollY; };
if (typeof window !== 'undefined') {
  history.scrollRestoration = 'manual';
  window.addEventListener('scroll', () => { if(activeKey) positions.set(activeKey,window.scrollY); }, {passive:true});
}
export default function RouteScroll() {
  const location=useLocation(), action=useNavigationType();
  useLayoutEffect(()=>{
    activeKey=null;
    let stopped=false, timer, frame;
    const keep=held; setTimeout(()=>{held=null},0);
    const saved=keep!==null ? keep : positions.get(location.key);
    let anchor=null;
    try { anchor=location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null; } catch { /* hash inválido */ }
    const apply=()=>{
      if(stopped)return;
      const offset=(document.querySelector('.site-header')?.getBoundingClientRect().height||0)+16;
      const top=anchor ? Math.max(0,anchor.getBoundingClientRect().top+window.scrollY-offset) : (action==='POP'||keep!==null)&&saved!==undefined ? saved : 0;
      window.scrollTo({top,behavior:'instant'});
    };
    const stop=()=>{stopped=true;observer.disconnect();clearTimeout(timer);cancelAnimationFrame(frame);};
    const observer=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(apply);});
    apply(); activeKey=location.key;
    // Las imágenes pueden cambiar la altura tras hidratar. Una interacción manual cancela el ajuste.
    if(anchor || ((action==='POP'||keep!==null)&&saved!==undefined)) {observer.observe(document.body);timer=setTimeout(stop,2500);}
    for(const event of ['wheel','touchstart','pointerdown','keydown']) window.addEventListener(event,stop,{once:true,passive:true});
    if(action!=='POP'&&keep===null&&!anchor) document.querySelector('main')?.focus({preventScroll:true});
    return ()=>{stop();activeKey=null;for(const event of ['wheel','touchstart','pointerdown','keydown'])window.removeEventListener(event,stop);};
  },[location.key,location.pathname,location.hash,action]);
  return null;
}
