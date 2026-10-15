import { Link, useParams } from 'react-router-dom';
import { articles } from '../content';
import { Picture, Eyebrow, Button, PageTitle } from '../shared';
import { usePageMeta } from '../meta';
import NotFound from './NotFound';
import Arrow from '../Arrow';
import BlogIndex from '../BlogIndex';

export function Blog(){return <><PageTitle tag="Cuaderno de viaje" title={<>Ideas para viajar<br/>con más <em>sentido.</em></>} text="Notas del equipo para elegir, preparar y disfrutar tus recorridos desde Medellín."/><BlogIndex/></>}
export default function Article(){const {slug}=useParams(),article=articles.find(a=>a.slug===slug);usePageMeta(article?.title,article?.intro);if(!article)return <NotFound/>;return <><PageTitle tag={`Cuaderno de viaje · ${article.tag}`} title={article.title} text={article.intro}/><div className="article-image wrap"><Picture photo={article.image} alt={article.imageAlt} priority/></div><article className="article-body">{article.sections.map(([t,p])=><section key={t}><h2>{t}</h2><p>{p}</p></section>)}<Button to="/experiencias">Encuentra tu recorrido</Button><Link className="text-link" to="/blog"><Arrow dir="left"/>Volver al cuaderno</Link></article></>}
