import { Link } from 'react-router-dom';
import { tours, photos } from '../content';
import ScrubHero from '../ScrubHero';
import TravelHand from '../TravelHand';
import BlogBook from '../BlogBook';
import '../mobile-motion.css';
import Reviews from '../Reviews';
import { HomeHero, HomeStory, HomeClose, HomeSocial } from '../HomeVideos';
import { Picture, Arrow, Eyebrow, Button } from '../shared';

// Spec 03 §J1 (aprobado 2026-10-14): hero de video → historia con video miniatura → baraja y película → explorador → servicios → reseñas → equipo → libro → cierre → redes.
export default function Home(){return <>
 <HomeHero/>
 <HomeStory/>
 <ScrubHero nextId="th-inicio" cards={tours.map((t,i)=>({slug:t.slug,name:t.name,n:i+1}))}
  summary="Apertura: una baraja de doce experiencias. La carta superior se abre en una transición cinematográfica sobre Medellín que termina en la Plaza Botero y luego se despliegan las doce experiencias, cada una con su enlace."/>
 <TravelHand/>
 <section className="service-band wrap" id="camino" tabIndex={-1}><Eyebrow>Nos encargamos del camino</Eyebrow><h2>Del primer traslado<br/>al último <em>recuerdo.</em></h2><div className="service-links">{[['01','Traslados de aeropuerto','/experiencias/traslados-aeropuerto-jmc'],['02','Recorridos privados','/experiencias'],['03','Empresas, agencias y grupos','/servicios']].map(([n,name,url])=><Link to={url} key={n}><span>{n}</span><h3>{name}</h3><Arrow/></Link>)}</div></section>
 <Reviews/><section className="about-preview wrap section"><Picture photo={photos('equipo')[0]} alt="Personas del equipo de T&T Medellín"/><div><Eyebrow>Una historia que nace aquí</Eyebrow><h2>Personas que<br/>mueven <em>personas.</em></h2><p>Desde los primeros traslados, aprendimos a escuchar. Esa cercanía sigue guiando nuestra forma de recibir y acompañar.</p><Button to="/nosotros">Conoce al equipo</Button></div></section>
 <BlogBook/>
 <HomeClose/>
 <HomeSocial/>
 </>}
