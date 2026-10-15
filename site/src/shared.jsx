import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inicioTextos } from './inicio-textos';
import { useMounted, EditorialMotion } from './PremiumMotion';
import QuoteCopy from './QuoteCopy';
import Arrow from './Arrow';
import { GoogleBadge, ShareMenu } from './CardExtras';

const Quote = lazy(() => import('./Quote')); // formulario, indicativos y validaciones: fuera del paquete inicial
export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Picture({ photo, alt, priority=false, className='', native=false, sizes='(max-width: 700px) 100vw, 65vw' }) {
  if (!photo) return null;
  // Fotos oficiales: `srcset` con la escalera real 400/800/1200/original (sin ampliar). `focus` = punto focal del recorte cover.
  const style = native ? { maxWidth:`min(100%, ${photo.width}px)` } : photo.focus ? { objectPosition:photo.focus } : undefined;
  return <img className={className} style={style} src={photo.src} srcSet={photo.srcset||`${photo.small} 640w, ${photo.src} ${photo.width}w`} sizes={sizes} width={photo.width} height={photo.height} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" />;
}
export function Reveal({children,className=''}){
 const ref=useRef(null);
 useEffect(()=>{const node=ref.current;if(!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting){node.classList.add('visible');observer.disconnect()}},{threshold:.08});node.classList.add('will-reveal');observer.observe(node);return()=>observer.disconnect()},[]);
 return <div className={`reveal ${className}`} ref={ref}>{children}</div>;
}
export { Arrow };
export function Eyebrow({children}){return <p className="eyebrow">{children}</p>}
export function Button({to,children,...props}){return <Link className="button" to={to} {...props}>{children}<Arrow/></Link>}
export function Rail({children,label}){
 const ref=useRef(null),drag=useRef(null),moved=useRef(false);
 const move=d=>ref.current.scrollBy({left:d*ref.current.clientWidth*.8,behavior:reduced()?'instant':'smooth'});
 return <div className="rail-shell"><div className="rail-controls"><span>Explora a tu ritmo</span><button onClick={()=>move(-1)} aria-label={`Anterior: ${label}`}><Arrow dir="left"/></button><button onClick={()=>move(1)} aria-label={`Siguiente: ${label}`}><Arrow dir="right"/></button></div><div ref={ref} className="rail" role="region" aria-label={label} tabIndex={0} onKeyDown={e=>{if(e.target===e.currentTarget&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-1:1)}}} onPointerDown={e=>{if(e.pointerType==='mouse'&&e.button===0){drag.current={x:e.clientX,left:ref.current.scrollLeft};moved.current=false}}} onPointerMove={e=>{if(!drag.current)return;const dx=e.clientX-drag.current.x;if(Math.abs(dx)>8){moved.current=true;ref.current.scrollLeft=drag.current.left-dx}}} onPointerUp={()=>{drag.current=null}} onPointerLeave={()=>{drag.current=null}} onClickCapture={e=>{if(moved.current){e.preventDefault();e.stopPropagation();moved.current=false}}} onDragStart={e=>e.preventDefault()}>{children}</div></div>;
}
// Tarjeta de experiencia (Spec 03 P3 + pedido del usuario 2026-10-14): foto con insignia de Google (valoración de la empresa) y botón de compartir encima;
// el enlace a la ficha cubre foto y texto y los dos extras quedan por encima con su propio clic (sin anidar enlaces).
export function TourCard({tour}){const copy=inicioTextos.cartas[tour.slug];return <article className="tour-card" data-flip-key={tour.slug}><Link className="tour-card-main" to={`/experiencias/${tour.slug}`}><div className="tour-card-image"><Picture photo={tour.images[0]} alt={tour.name} sizes="(max-width: 700px) 100vw, (max-width: 1099px) 50vw, 33vw"/></div><div className="card-copy"><div className="card-meta"><span>{tour.category}</span><span>{tour.number} / T&T</span></div><h3>{tour.name}</h3><p><b>{copy.emocion}:</b> {copy.frase}</p><span className="card-action">Planea esta experiencia <Arrow/></span></div></Link><ShareMenu name={tour.name} path={`/experiencias/${tour.slug}`} className="tour-card-share"/><GoogleBadge className="tour-card-badge"/></article>}
export function PageTitle({tag,title,text,photo,photoAlt=tag,floating=[]}){return <EditorialMotion className={`page-title wrap ${photo?'page-title-with-photo':''}`}><div className="page-title-copy"><Eyebrow>{tag}</Eyebrow><h1>{title}</h1>{text&&<p>{text}</p>}</div>{photo&&<div className="page-title-media"><figure className="page-title-card"><Picture photo={photo} alt={photoAlt} priority sizes="(max-width: 700px) 72vw, 320px"/></figure>{floating.map((p,i)=><figure className={`editorial-float editorial-float-${i}`} key={p.src} aria-hidden="true"><Picture photo={p} alt="" sizes="140px"/></figure>)}</div>}</EditorialMotion>}
// `#consulta` es un contenedor estable (ancla y scroll); el formulario se carga aparte (lazy) y solo en el cliente
// (usa la fecha de hoy y el portapapeles): el HTML prerenderizado trae el marco con el alto reservado.
export function QuoteSection({context,mode}){const mounted=useMounted();const frame=<section className="quote-section wrap" aria-busy="true"><QuoteCopy withType={mode==='contacto'}/><div className="quote-form quote-form-frame" aria-hidden="true"/></section>;return <div id="consulta" data-tn="3">{mounted?<Suspense fallback={frame}><Quote context={context} mode={mode}/></Suspense>:frame}</div>}

