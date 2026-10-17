import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { tours } from '../content';
import tourInfo from '../tour-info.json';
import TourDetails from '../TourDetails';
import TourArchive from '../TourArchive';
import TourHero from '../TourHero';
import { TourHeroVideo } from '../Hero';
import { TourNav, TourRoute, useTourReveal } from '../TourChrome';
import { watchScroll, docTop } from '../scroll-bus';
import Faq from '../Faq';
import Icon from '../icons';
import { FAQ_TOUR, FAQ_TRANSFER, DURACIONES, NOTA_HORARIOS } from '../faq-data';
import Reviews from '../Reviews';
import { inicioTextos } from '../inicio-textos';
import { Marquee, Trust, EditorialMotion, useMedia, useLightMotion } from '../PremiumMotion';
import { Picture, Arrow, Eyebrow, Rail, TourCard, QuoteSection } from '../shared';
import { usePageMeta } from '../meta';
import { t, language } from '../i18n';
import NotFound from './NotFound';
import '../mobile-motion.css';
import TourBar from '../TourBar';
import ItineraryStory from '../ItineraryStory';
import { itinerarios } from '../itinerarios';

function Story({tour}){
 const ref=useRef(null);const [active,setActive]=useState(0);
 // Prerender: el servidor y la hidratación parten del modo estático (capítulos en flujo, imágenes incluidas); el cliente pasa al modo animado en escritorio.
 const short=useMedia('(max-height: 600px)',true),light=useLightMotion(),staticMode=short||light;
 // Planificador único (scroll-bus): medidas una vez; en el scroll solo se cambia el capítulo (estado, solo al cruzar) y la barra de avance (transform).
 useEffect(()=>{if(staticMode)return;const el=ref.current,inner=el.querySelector('.story-inner'),meter=el.querySelector('.story-meter i');let top=0,total=1,stick=0,cur=-1,last=-1;return watchScroll({el,margin:0,measure:()=>{top=docTop(el);total=Math.max(1,el.offsetHeight-inner.offsetHeight);stick=parseFloat(getComputedStyle(inner).top)||0},update:y=>{const p=Math.max(0,Math.min(.999,(stick-(top-y))/total)),idx=Math.floor(p*3);if(idx!==cur){cur=idx;setActive(idx)}const q=Math.round(p*1000)/1000;if(q!==last){last=q;if(meter)meter.style.transform=`scaleX(${q})`}}})},[staticMode]);
 return <section ref={ref} data-tn="0" className={`story mood-${tour.mood} ${staticMode?'story-static':''}`} aria-label={`Un recorrido por ${tour.name}`}><div className="story-inner"><div className="story-images" aria-hidden="true">{tour.moments.map((_,i)=><Picture key={i} photo={tour.images[Math.min(i+1,tour.images.length-1)]} alt="" className={active===i?'active':''}/>)}</div><div className="story-content"><Eyebrow>{tour.name}</Eyebrow><div className="story-articles">{tour.moments.map((title,i)=><article key={title} className={active===i?'active':''}>{staticMode&&<Picture photo={tour.images[Math.min(i+1,tour.images.length-1)]} alt={`${tour.name}, capítulo ${i+1}`} className="chapter-photo"/>}<span className="chapter">0{i+1}</span><h2>{title}</h2><p>{tour.stories[i]}</p></article>)}</div>{!staticMode&&<div className="chapter-controls" aria-label="Elegir capítulo">{tour.moments.map((title,i)=><button key={title} aria-label={`Capítulo ${i+1}: ${title}`} aria-pressed={active===i} onClick={()=>{const el=ref.current;const top=window.scrollY+el.getBoundingClientRect().top;window.scrollTo({top:top-(parseFloat(getComputedStyle(el.querySelector('.story-inner')).top)||0)+(el.offsetHeight-el.querySelector('.story-inner').offsetHeight)*(i/3+.02),behavior:'instant'});setActive(i)}}>{String(i+1).padStart(2,'0')}</button>)}</div>}<div className="story-meter" aria-hidden="true"><i/></div><span className="story-hint">{staticMode?'A tu ritmo':<>Desliza para seguir la historia <Arrow dir="down"/></>}</span></div></div></section>
}
const ORGANIZAR={id:'organizar',q:'¿Cómo organizamos la experiencia?',a:'Coordinamos el transporte privado y el recorrido contigo. La propuesta confirma las paradas, el acompañamiento, los horarios y el valor antes de contratar.'};
export default function Tour(){const {slug}=useParams();const tour=tours.find(t=>t.slug===slug);usePageMeta(tour?.name,tour?.description);const page=useRef(null);useTourReveal(page,slug);if(!tour)return <NotFound/>;
 const faq=[ORGANIZAR,...(slug==='traslados-aeropuerto-jmc'?FAQ_TRANSFER:FAQ_TOUR)],duracion=DURACIONES[slug];
 return <div ref={page} className={`tour-page mood-${tour.mood}`}>
 <TourRoute/>
 <TourHeroVideo tour={tour}/>
 <TourHero tour={tour}/>
 <Marquee text={t(tour.name).toLocaleUpperCase(language()==='en'?'en':'es')}/>
 <TourNav/>
 <section id="esencia" data-tn="0" className="tour-intro tp-band wrap"><div className="ti-l"><Eyebrow>Sobre esta experiencia</Eyebrow><h2 data-tr>{tour.title}</h2></div><div className="ti-r"><p data-tr>{tour.description}</p><div className="trip-facts" data-tr><span><Icon name="mapPin" size={20} draw/>{slug==='traslados-aeropuerto-jmc'?'Encuentro en aeropuerto o Medellín':'Salida coordinada en Medellín'}</span><span><Icon name="clock" size={20} draw/>Consulta fechas y disponibilidad</span><span><Icon name="users" size={20} draw/>Propuesta para tu grupo</span></div>{duracion&&<div className="tour-duration" data-tr><p><Icon name="clock" size={20} draw/><span><b>Duración y salida:</b> {duracion}</span></p><small>{NOTA_HORARIOS}</small></div>}</div></section>
 <Trust/><TourDetails slug={tour.slug}/>{itinerarios[tour.slug]?<ItineraryStory tour={tour}/>:<Story tour={tour}/>}<div id="fotos" data-tn="1"><TourArchive tour={tour}/></div>
 <section className="prepare tp-band wrap" id="preparar" data-tn="2"><div><Eyebrow>Antes de viajar</Eyebrow><h2 data-tr>Recomendaciones para tu recorrido</h2><p>{tour.advice}</p>{tourInfo[tour.slug]?.recomendaciones.length>0&&<ul className="td-tips" role="list" data-tr>{tourInfo[tour.slug].recomendaciones.map(t=><li key={t}><Icon name="check" size={18} draw/>{t}</li>)}</ul>}</div><Faq items={faq} headingLevel={3} title="Preguntas frecuentes" eyebrow="Resolvemos tus dudas" className="faq-in"/></section>
 <QuoteSection context={tour.name}/><Reviews/><section className="wrap section tp-band" data-tr><Eyebrow>Más experiencias</Eyebrow><h2>Otras experiencias desde Medellín</h2><Rail label="Más experiencias">{tours.filter(t=>t.slug!==slug).sort((a,b)=>Number(b.category===tour.category)-Number(a.category===tour.category)).slice(0,6).map(t=><TourCard key={t.slug} tour={t}/>)}</Rail></section>
 <TourBar name={tour.name}/>
 </div>}
