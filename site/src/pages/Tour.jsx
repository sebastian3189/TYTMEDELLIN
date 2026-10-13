import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { tours } from '../content';
import tourInfo from '../tour-info.json';
import TourDetails from '../TourDetails';
import FeaturedGallery from '../FeaturedGallery';
import QuoteBar from '../QuoteBar';
import Reviews from '../Reviews';
import { inicioTextos } from '../inicio-textos';
import { Marquee, Trust, EditorialMotion, useMedia, useLightMotion } from '../PremiumMotion';
import { Picture, Arrow, Eyebrow, Rail, TourCard, QuoteSection } from '../shared';
import { usePageMeta } from '../meta';
import NotFound from './NotFound';

function Story({tour}){
 const ref=useRef(null);const [active,setActive]=useState(0);
 // Prerender: el servidor y la hidratación parten del modo estático (capítulos en flujo, imágenes incluidas); el cliente pasa al modo animado en escritorio.
 const narrow=useMedia('(prefers-reduced-motion: reduce), (max-width: 899px)',true),light=useLightMotion(),staticMode=narrow||light;
 useEffect(()=>{if(staticMode)return;let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const p=Math.max(0,Math.min(.999,-r.top/(el.offsetHeight-window.innerHeight)));setActive(Math.floor(p*3));el.style.setProperty('--story-progress',p)})};window.addEventListener('scroll',update,{passive:true});update();return()=>{window.removeEventListener('scroll',update);cancelAnimationFrame(frame)}},[staticMode]);
 return <section ref={ref} className={`story mood-${tour.mood} ${staticMode?'story-static':''}`} aria-label={`Un recorrido por ${tour.name}`}><div className="story-inner"><div className="story-images" aria-hidden="true">{tour.moments.map((_,i)=><Picture key={i} photo={tour.images[Math.min(i+1,tour.images.length-1)]} alt="" className={active===i?'active':''}/>)}</div><div className="story-content"><Eyebrow>{tour.name}</Eyebrow><div className="story-articles">{tour.moments.map((title,i)=><article key={title} className={active===i?'active':''}>{staticMode&&<Picture photo={tour.images[Math.min(i+1,tour.images.length-1)]} alt={`${tour.name}, capítulo ${i+1}`} className="chapter-photo"/>}<span className="chapter">0{i+1}</span><h2>{title}</h2><p>{tour.stories[i]}</p></article>)}</div>{!staticMode&&<div className="chapter-controls" aria-label="Elegir capítulo">{tour.moments.map((title,i)=><button key={title} aria-label={`Capítulo ${i+1}: ${title}`} aria-pressed={active===i} onClick={()=>{const el=ref.current;const top=window.scrollY+el.getBoundingClientRect().top;window.scrollTo({top:top+(el.offsetHeight-window.innerHeight)*(i/3+.02),behavior:'instant'});setActive(i)}}>{String(i+1).padStart(2,'0')}</button>)}</div>}<div className="story-meter" aria-hidden="true"><i/></div><span className="story-hint">{staticMode?'A tu ritmo':'Desliza para seguir la historia ↓'}</span></div></div></section>
}
function Gallery({tour}){return <FeaturedGallery tour={tour}/>}
export default function Tour(){const {slug}=useParams();const tour=tours.find(t=>t.slug===slug);usePageMeta(tour?.name,tour?.description);if(!tour)return <NotFound/>;return <div className={`tour-page mood-${tour.mood}`}>
 <EditorialMotion className="tour-hero wrap"><div className="tour-hero-content"><Link to="/experiencias" className="back-link">← Todas las experiencias</Link><Eyebrow>{tour.category} · Desde Medellín</Eyebrow><h1>{tour.name}</h1><p>{tour.title}</p><a className="button" id="cta-principal" href="#consulta">Planea esta experiencia <Arrow/></a></div><figure className="editorial-photo"><Picture photo={tour.hero} alt={tour.name} priority sizes="(max-width: 700px) 72vw, 400px"/><figcaption>{tour.name} · Archivo T&T</figcaption></figure></EditorialMotion>
 <Marquee text={inicioTextos.cartas[tour.slug].lugar}/>
 <nav className="tour-nav" aria-label="En esta experiencia"><a href="#esencia">La experiencia</a><a href="#fotos">Fotografías</a><a href="#preparar">Antes de viajar</a><a href="#consulta">Cotizar <Arrow/></a></nav>
 <section id="esencia" className="tour-intro wrap"><Eyebrow>El espíritu del recorrido</Eyebrow><h2>{tour.title}</h2><p>{tour.description}</p><div className="trip-facts"><span>Salida coordinada en Medellín</span><span>Consulta fechas y disponibilidad</span><span>Propuesta para tu grupo</span></div></section>
 <Trust/><TourDetails slug={tour.slug}/><Story tour={tour}/><div id="fotos"><Gallery tour={tour}/></div>
 <section className="prepare wrap" id="preparar"><div><Eyebrow>Pequeños detalles, mejor viaje</Eyebrow><h2>Ven con ganas.<br/>Lo demás, <em>planeémoslo.</em></h2><p>{tour.advice}</p>{tourInfo[tour.slug]?.recomendaciones.length>0&&<ul className="td-tips" role="list">{tourInfo[tour.slug].recomendaciones.map(t=><li key={t}>{t}</li>)}</ul>}</div><div className="faq"><details open><summary>¿Cómo organizamos la experiencia?</summary><p>Coordinamos el transporte privado y el recorrido contigo. La propuesta confirma las paradas, el acompañamiento, los horarios y el valor antes de contratar.</p></details><details><summary>¿Qué debo confirmar sobre el precio?</summary><p>Entradas, alimentación y actividades adicionales se detallan en la cotización. Consulta qué está incluido y qué se paga por separado.</p></details><details><summary>¿Se puede adaptar para mi grupo?</summary><p>Cuéntanos edades, equipaje, movilidad e intereses. El equipo revisa las opciones y confirma lo que es posible para la fecha elegida.</p></details></div></section>
 <QuoteSection context={tour.name}/><Reviews/><section className="wrap section"><Eyebrow>El viaje puede continuar</Eyebrow><h2>Otros caminos<br/>por <em>descubrir.</em></h2><Rail label="Más experiencias">{tours.filter(t=>t.slug!==slug).sort((a,b)=>Number(b.category===tour.category)-Number(a.category===tour.category)).slice(0,6).map(t=><TourCard key={t.slug} tour={t}/>)}</Rail></section>
 <QuoteBar name={tour.name}/>
 </div>}
