import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { watchScroll, docTop, clamp01 } from './scroll-bus';

// Spec 03 I5: native scroll and one local rAF / FLIP choreography, no dependencies.
// Prerender (Spec 04): el servidor y la primera pasada de hidratación usan el valor `false` (movimiento completo); `useSyncExternalStore` lo
// corrige con la preferencia real justo después de hidratar, sin desajuste.
const reducedQuery = () => window.matchMedia('(prefers-reduced-motion: reduce)');
const subscribeLight = (notify) => { const mq = reducedQuery(); mq.addEventListener('change', notify); navigator.connection?.addEventListener('change', notify); return () => { mq.removeEventListener('change', notify); navigator.connection?.removeEventListener('change', notify); }; };
const readLight = () => reducedQuery().matches || Boolean(navigator.connection?.saveData);
export function useLightMotion() { return useSyncExternalStore(subscribeLight, readLight, () => false); }
// `false` en el servidor y al hidratar; `true` después. Para contenido que solo existe en el navegador (formulario, portales).
const noSubscribe = () => () => {};
export function useMounted() { return useSyncExternalStore(noSubscribe, () => true, () => false); }
// Consulta de medios con valor de servidor explícito (por defecto false).
export function useMedia(query, server = false) {
 return useSyncExternalStore((notify) => { const mq = window.matchMedia(query); mq.addEventListener('change', notify); return () => mq.removeEventListener('change', notify); }, () => window.matchMedia(query).matches, () => server);
}
export function EditorialMotion({children,className=''}) {
 const ref=useRef(null),light=useLightMotion();
 // Planificador único (scroll-bus): sin lecturas de layout en el scroll; solo escribe cuando el valor cambia (pasos de 0,5 %).
 useEffect(()=>{const node=ref.current;if(light||!node)return;let top=0,h=1,last=-1;const stop=watchScroll({el:node,margin:0,measure:()=>{top=docTop(node);h=node.offsetHeight||1},update:y=>{const p=Math.round(clamp01((y-top)/h)*200)/200;if(p===last)return;last=p;node.style.setProperty('--editorial-shift',`${p*4}vw`);node.style.setProperty('--photo-shift',`${p*-24}px`)}});return()=>{stop();node.style.removeProperty('--editorial-shift');node.style.removeProperty('--photo-shift')}},[light]);
 return <section ref={ref} className={`editorial-motion ${className}`}>{children}</section>;
}
// Marquesina de lugar: el nombre COMPLETO cabe siempre en el ancho disponible. Tamaño = mín(128 px, 0,92 × ancho útil / ancho medido a 1 px),
// medido con un elemento oculto tras cargar las fuentes y recalculado al cambiar el tamaño. Si en móvil bajara de 28 px, se parte en 2 líneas
// equilibradas. El movimiento es una deriva suave ligada al scroll (±3 % del ancho útil) que nunca saca las letras del marco.
function measureWidth(host,text){const m=document.createElement('span');m.textContent=text;m.setAttribute('aria-hidden','true');m.style.cssText='position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;font:800 100px/1 Montserrat,Arial,sans-serif;letter-spacing:-.04em';host.appendChild(m);const w=m.getBoundingClientRect().width/100;m.remove();return w}
function fitMarquee(host,text){
 const cs=getComputedStyle(host),avail=host.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);if(avail<=0)return null;
 const target=avail*.92,one=Math.min(128,target/measureWidth(host,text));
 if(one>=28||innerWidth>=900)return{size:one,lines:[text]};
 const words=text.split(' ');let best=null;
 for(let i=1;i<words.length;i++){const a=words.slice(0,i).join(' '),b=words.slice(i).join(' '),w=Math.max(measureWidth(host,a),measureWidth(host,b));if(!best||w<best.w)best={w,lines:[a,b]}}
 return best?{size:Math.min(128,target/best.w),lines:best.lines}:{size:one,lines:[text]};
}
export function Marquee({text}) {
 const ref=useRef(null),light=useLightMotion(),[fit,setFit]=useState({size:56,lines:[text]});
 useLayoutEffect(()=>{const node=ref.current;if(!node)return;let alive=true;const run=()=>{if(!alive)return;const f=fitMarquee(node,text);if(f)setFit(prev=>prev.size===f.size&&prev.lines.join('|')===f.lines.join('|')?prev:f)};run();document.fonts?.ready.then(run);const ro=new ResizeObserver(run);ro.observe(node);return()=>{alive=false;ro.disconnect()}},[text]);
 useEffect(()=>{const node=ref.current;if(light||!node)return;let top=0,h=1,last=-1;const stop=watchScroll({el:node,margin:0,measure:()=>{top=docTop(node);h=node.offsetHeight||1},update:(y,vh)=>{const p=Math.round(clamp01((y+vh-top)/(vh+h))*500)/500;if(p===last)return;last=p;node.style.setProperty('--mq-p',p.toFixed(3))}});return()=>{stop();node.style.removeProperty('--mq-p')}},[light]);
 return <section ref={ref} className="place-marquee"><p aria-hidden="true" style={{fontSize:`${fit.size.toFixed(2)}px`}}>{fit.lines.map(l=><span key={l}>{l}</span>)}</p></section>}
export function Manifesto({words}) {return <section className="manifesto wrap" aria-label={words.join(' ')}>{words.map(word=><EditorialMotion key={word}><p>{word}</p></EditorialMotion>)}</section>}
export function Trust(){return <div className="trust wrap"><p>Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles</p></div>}
// Spec 03 P3: retain semantic DOM order; animate surviving cards from their old slot.
export function useFlipGrid(ref,keys){
 const previous=useRef(new Map()),light=useLightMotion();
 useLayoutEffect(()=>{const node=ref.current;if(!node)return;const next=new Map(),animations=[];for(const card of node.querySelectorAll('[data-flip-key]')){card.getAnimations().forEach(a=>a.cancel());const key=card.dataset.flipKey,to=card.getBoundingClientRect(),from=previous.current.get(key);next.set(key,to);if(!light&&card.animate){const first=from?{transform:`translate(${from.left-to.left}px,${from.top-to.top}px) scale(${from.width/to.width},${from.height/to.height})`,opacity:1}:{transform:'translateY(16px)',opacity:0};animations.push(card.animate([first,{transform:'none',opacity:1}],{duration:450,easing:'cubic-bezier(.77,0,.175,1)'}))}}previous.current=next;return()=>animations.forEach(a=>a.cancel())},[keys,light,ref]);
}
