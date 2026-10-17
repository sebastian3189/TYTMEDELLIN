import { Link } from 'react-router-dom';
import { tours } from '../content';
import { TourCard, PageTitle } from '../shared';
import { usePageMeta, NOT_FOUND } from '../meta';
import Arrow from '../Arrow';

export default function NotFound(){usePageMeta(NOT_FOUND[0],NOT_FOUND[1]);return <><PageTitle tag="404 · Otro camino" title={<>Este recorrido<br/>no está <em>aquí</em></>}/><section className="wrap section"><div className="tour-grid">{[tours[1],tours[0],tours[4]].map(t=><TourCard key={t.slug} tour={t}/>)}</div><Link className="text-link" to="/experiencias">Volver a las experiencias<Arrow/></Link></section></>}
