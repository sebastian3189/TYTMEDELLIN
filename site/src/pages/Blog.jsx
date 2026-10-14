import { Link, useParams } from 'react-router-dom';
import { articles } from '../content';
import { Picture, Eyebrow, Button, PageTitle } from '../shared';
import { usePageMeta } from '../meta';
import NotFound from './NotFound';
import Arrow from '../Arrow';

export function Blog(){return <><PageTitle tag="Cuaderno de viaje" title={<>Ideas para viajar<br/>con más <em>sentido.</em></>} text="Notas del equipo para elegir, preparar y disfrutar tus recorridos desde Medellín."/><section className="wrap blog-grid">{articles.map((a,i)=><Link to={`/blog/${a.slug}`} className="blog-card" key={a.slug}><Picture photo={a.image} alt="Archivo de viajes de T&T Medellín"/><Eyebrow>{a.tag} · Nota 0{i+1}</Eyebrow><h2>{a.title}</h2><p>{a.intro}</p><span className="text-link">Leer la nota<Arrow/></span></Link>)}</section></>}
export default function Article(){const {slug}=useParams(),article=articles.find(a=>a.slug===slug);usePageMeta(article?.title,article?.intro);if(!article)return <NotFound/>;return <><PageTitle tag={`Cuaderno de viaje · ${article.tag}`} title={article.title} text={article.intro}/><div className="article-image wrap"><Picture photo={article.image} alt="Recorrido de T&T Medellín" priority/></div><article className="article-body">{article.sections.map(([t,p])=><section key={t}><h2>{t}</h2><p>{p}</p></section>)}<Button to="/experiencias">Encuentra tu recorrido</Button><Link className="text-link" to="/blog"><Arrow dir="left"/>Volver al cuaderno</Link></article></>}
