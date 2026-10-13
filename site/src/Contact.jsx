import { useEffect, useRef, useState } from 'react';
import { company } from './company';
import Socials from './Socials';

/*
 * Contacto (Spec 02 «Pedido del usuario», Spec 04 «Integraciones»). Datos de la sede Medellín: tnt-colombia-connect/src/data/sedes.ts
 * (teléfono/WhatsApp +57 304 496 1698) y ui.ts `contactInfo` (dirección «Carrera 79AA #1A Sur-280, Medellín» y coordenadas 6.2085691, -75.602988,
 * OpenStreetMap/Nominatim 2026-09-21). El horario del oficial es general del grupo y la sede no lo declara: PENDIENTE CLIENTE, no se publica.
 * Mapa: MISMA ubicación y MISMO embed que /contacto del sitio oficial (openstreetmap.org/export/embed.html, bbox ±0,008°/±0,006° y marcador).
 * Privacidad y rendimiento: el iframe no se carga hasta que la persona lo pide (fachada); con título accesible y enlaces a Google Maps y OpenStreetMap.
 */
export const MAP = { lat: 6.2085691, lon: -75.602988, title: 'Ubicación de la oficina en Medellín: Carrera 79AA #1A Sur-280' };
const fixed = (n) => n.toFixed(6);
export const mapEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${fixed(MAP.lon - 0.008)}%2C${fixed(MAP.lat - 0.006)}%2C${fixed(MAP.lon + 0.008)}%2C${fixed(MAP.lat + 0.006)}&layer=mapnik&marker=${MAP.lat}%2C${MAP.lon}`;
export const googleMaps = `https://www.google.com/maps/search/?api=1&query=${MAP.lat}%2C${MAP.lon}`;
export const openStreetMap = `https://www.openstreetmap.org/?mlat=${MAP.lat}&mlon=${MAP.lon}#map=16/${MAP.lat}/${MAP.lon}`;

export function MapFacade() {
  const [loaded, setLoaded] = useState(false), frame = useRef(null);
  useEffect(() => { if (loaded) frame.current?.focus({ preventScroll: true }); }, [loaded]);
  return <figure className="map-card">
    <div className="map-frame">
      {loaded
        ? <iframe ref={frame} title={MAP.title} src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"/>
        : <div className="map-facade"><svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg><p><strong>{company.address}</strong></p><button type="button" className="button secondary" onClick={() => setLoaded(true)}>Cargar mapa interactivo <span aria-hidden="true">↗</span></button><small>Al cargarlo, tu navegador se conecta a OpenStreetMap.</small></div>}
    </div>
    <figcaption><a className="text-link" href={googleMaps} target="_blank" rel="noopener noreferrer">Abrir en Google Maps<span className="sr-only"> (se abre en una pestaña nueva)</span> ↗</a><a className="text-link" href={openStreetMap} target="_blank" rel="noopener noreferrer">Abrir en OpenStreetMap<span className="sr-only"> (se abre en una pestaña nueva)</span> ↗</a></figcaption>
  </figure>;
}

export function ContactPlace() {
  return <section className="wrap contact-place" aria-labelledby="contacto-lugar"><div className="contact-address"><p className="eyebrow">Nos encuentras en</p><h2 id="contacto-lugar">{company.address}</h2><p>Oficina de T&T Medellín. Escríbenos antes de venir para coordinar tu visita.</p><p className="eyebrow">Síguenos</p><Socials className="contact-socials"/></div><MapFacade/></section>;
}
