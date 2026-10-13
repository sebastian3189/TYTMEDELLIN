import { Link } from 'react-router-dom';
import { tours, photos } from '../content';
import ScrubHero from '../ScrubHero';
import ExperienceExplorer from '../ExperienceExplorer';
import Reviews from '../Reviews';
import { Picture, Arrow, Eyebrow, Button, Reveal } from '../shared';

export default function Home(){return <>
 <ScrubHero nextId="descubrir" cards={tours.map((t,i)=>({slug:t.slug,name:t.name,n:i+1}))}
  actions={<><Link className="button scrub-btn scrub-btn--explore" to="/experiencias">Explorar experiencias<Arrow/></Link><Link className="button scrub-btn scrub-btn--quote" to="/cotizar">Planeemos tu viaje<Arrow/></Link></>}
  summary="Apertura: una baraja de doce experiencias. La carta superior se abre en una transición cinematográfica sobre Medellín que termina en la Plaza Botero y luego se despliegan las doce experiencias, cada una con su enlace."/>
 <section className="intro wrap" id="descubrir" tabIndex={-1}><Eyebrow>Más que llegar</Eyebrow><Reveal><h2>Hay una Medellín que se mira.<br/>Y otra que se <em>vive.</em></h2><p>La encuentras en una conversación, en el color de una calle y en la curva que abre un nuevo paisaje. Queremos acompañarte a descubrirla con el cuidado de un equipo local.</p></Reveal></section>
 <ExperienceExplorer/>
 <section className="service-band wrap"><Eyebrow>Nos encargamos del camino</Eyebrow><h2>Del primer traslado<br/>al último <em>recuerdo.</em></h2><div className="service-links">{[['01','Traslados de aeropuerto','/experiencias/traslados-aeropuerto-jmc'],['02','Recorridos privados','/experiencias'],['03','Empresas, agencias y grupos','/servicios']].map(([n,name,url])=><Link to={url} key={n}><span>{n}</span><h3>{name}</h3><Arrow/></Link>)}</div></section>
 <Reviews/><section className="about-preview wrap section"><Picture photo={photos('equipo')[0]} alt="Personas del equipo de T&T Medellín"/><div><Eyebrow>Una historia que nace aquí</Eyebrow><h2>Personas que<br/>mueven <em>personas.</em></h2><p>Desde los primeros traslados, aprendimos a escuchar. Esa cercanía sigue guiando nuestra forma de recibir y acompañar.</p><Button to="/nosotros">Conoce al equipo</Button></div></section>
 </>}
