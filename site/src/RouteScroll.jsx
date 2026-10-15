import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
// Spec 04: restauración por entrada de historial, después de resolver la ruta lazy.
const positions = new Map();
let activeKey = null;
if (typeof window !== 'undefined') {
  history.scrollRestoration = 'manual';
  window.addEventListener('scroll', () => { if(activeKey) positions.set(activeKey,window.scrollY); }, {passive:true});
}
export default function RouteScroll() {
  const location=useLocation(), action=useNavigationType();
  useLayoutEffect(()=>{
    activeKey=null;
    let stopped=false, timer, frame;
    const saved=positions.get(location.key);
    let anchor=null;
    try { anchor=location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null; } catch { /* hash inválido */ }
    const apply=()=>{
      if(stopped)return;
      const offset=(document.querySelector('.site-header')?.getBoundingClientRect().height||0)+16;
      const top=anchor ? Math.max(0,anchor.getBoundingClientRect().top+window.scrollY-offset) : action==='POP'&&saved!==undefined ? saved : 0;
      window.scrollTo({top,behavior:'instant'});
    };
    const stop=()=>{stopped=true;observer.disconnect();clearTimeout(timer);cancelAnimationFrame(frame);};
    const observer=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(apply);});
    apply(); activeKey=location.key;
    // Las imágenes pueden cambiar la altura tras hidratar. Una interacción manual cancela el ajuste.
    if(anchor || (action==='POP'&&saved!==undefined)) {observer.observe(document.body);timer=setTimeout(stop,2500);}
    for(const event of ['wheel','touchstart','pointerdown','keydown']) window.addEventListener(event,stop,{once:true,passive:true});
    if(action!=='POP'&&!anchor) document.querySelector('main')?.focus({preventScroll:true});
    return ()=>{stop();activeKey=null;for(const event of ['wheel','touchstart','pointerdown','keydown'])window.removeEventListener(event,stop);};
  },[location.key,location.pathname,location.hash,action]);
  return null;
}
