import { useState } from 'react';
import PlayIcon from './PlayIcon';

// Aliados y referencias (sitio oficial: MarcaConfianza.tsx). Los logos identifican entidades y plataformas; no declaran certificaciones.
// Tira continua lenta que se pausa con el cursor o el foco y con el botón; en movimiento reducido es una rejilla estática.
// No se usa tyt-logo-96.webp (logo maestro T&T: regla de marca pendiente).
const ITEMS = [
  { name: 'RNT Medellín · 176384', text: true },
  { name: 'Google', logo: 'google.svg', w: 112, h: 40 },
  { name: 'Tripadvisor', logo: 'tripadvisor.svg', w: 112, h: 40 },
  { name: 'ANATO', logo: 'anato.webp', w: 243, h: 64, dark: true },
  { name: 'COTELCO', logo: 'cotelco.webp', w: 400, h: 150 },
  { name: 'Cámara de Comercio de Medellín', logo: 'camara-comercio-medellin.webp', w: 141, h: 56 },
  { name: 'Alcaldía de Guatapé', logo: 'alcaldia-guatape.webp', w: 83, h: 112 },
  { name: 'Alcaldía de Medellín', logo: 'alcaldia-medellin.webp', w: 78, h: 112 },
  { name: 'Hacienda Nápoles', logo: 'hacienda-napoles.webp', w: 400, h: 282 },
];
function Item({ item, hidden }) {
  return <li aria-hidden={hidden || undefined} className="ally">{item.text
    ? <span className="ally-rnt">{item.name}</span>
    : <span className={`ally-chip ${item.dark ? 'is-dark' : ''}`}><img src={`/media/marca/${item.logo}`} alt={hidden ? '' : item.name} width={item.w} height={item.h} loading="lazy" decoding="async" /></span>}</li>;
}
export default function Allies() {
  const [paused, setPaused] = useState(false);
  return <section className="allies wrap" aria-label="Aliados y referencias">
    <div className={`allies-viewport ${paused ? 'is-paused' : ''}`}>
      <div className="allies-track">
        <ul role="list">{ITEMS.map(i => <Item key={i.name} item={i} />)}</ul>
        <ul role="list" aria-hidden="true" className="allies-copy">{ITEMS.map(i => <Item key={i.name} item={i} hidden />)}</ul>
      </div>
    </div>
    <button type="button" className="allies-pause" aria-pressed={paused} aria-label={paused ? 'Reanudar el movimiento de los aliados' : 'Pausar el movimiento de los aliados'} onClick={() => setPaused(!paused)}><PlayIcon playing={!paused} /></button>
  </section>;
}
