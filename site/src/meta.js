import { LANGUAGES, languageInfo, pathForLanguage } from './languages';
import { useEffect } from 'react';
import { t, language } from './i18n';

// Metadatos por ruta (Spec 05 SEO): una sola fuente para el cliente (PageEffects / usePageMeta) y el prerender (scripts/prerender.mjs).
export const staticMeta = {
  '/': ['Tours privados y transporte en Medellín', 'Descubre Medellín con tours privados y transporte coordinado por un equipo local. Cuéntanos tu plan y cotiza una experiencia para tu grupo.'],
  '/experiencias': ['Tours y experiencias desde Medellín', 'Elige entre doce experiencias desde Medellín: Comuna 13, Guatapé, café, pueblos y naturaleza. Conoce los recorridos y consulta las condiciones para tu grupo.'],
  '/vehiculos': ['Vehículos para traslados y grupos en Medellín', 'Compara sedanes, SUV, vans y buses para traslados y viajes desde Medellín. Consulta capacidad, equipaje y disponibilidad para elegir con el equipo.'],
  '/servicios': ['Transporte privado y servicios en Medellín', 'Organiza tours privados, traslados al aeropuerto y transporte para empresas, eventos o agencias en Medellín. Comparte tu ruta y solicita una propuesta.'],
  '/nosotros': ['Nuestro equipo local en Medellín', 'Conoce la historia, el equipo y los valores de Transporte y Turismo Medellín.'],
  '/blog': ['Guía para planear tu viaje desde Medellín', 'Ideas y consejos para preparar tus experiencias y recorridos desde Medellín.'],
  '/contacto': ['Contacto y WhatsApp de T&T Medellín', 'Habla con nuestro equipo en Medellín por WhatsApp, teléfono o correo. Comparte tu recorrido, resuelve dudas y consulta la ubicación de la oficina.'],
  '/cotizar': ['Cotiza tu tour o traslado en Medellín', 'Cuéntanos fechas, viajeros y punto de salida para cotizar tu tour o traslado en Medellín. Revisa y envía tu mensaje por WhatsApp; cotizar no confirma una reserva.'],
  '/calificaciones': ['Opiniones de viajeros sobre T&T Medellín', 'Consulta la referencia histórica de calificaciones y las reseñas actuales de T&T Medellín en Google.'],
  '/politica-de-tratamiento-de-datos': ['Política de tratamiento de datos', 'Qué datos personales recogemos, con qué finalidad, cuánto tiempo los conservamos y cómo ejercer tus derechos (Ley 1581 de 2012).'],
  '/privacidad': ['Privacidad', 'Conoce cómo se prepara tu consulta y qué información decides compartir con T&T Medellín.'],
};
export const NOT_FOUND = ['Página no encontrada', 'Regresa a las experiencias de T&T Medellín para encontrar tu recorrido.'];
export const fullTitle = (title) => `${title} | T&T Medellín`;
export function applyMeta(title, description) {
  document.title = fullTitle(t(title));
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(description));
  // Mantener los textos sociales al navegar entre páginas sin recargar.
  for (const [key, value] of [['og:title',document.title], ['og:description',t(description)], ['og:locale',languageInfo(language()).og], ['twitter:title',document.title], ['twitter:description',t(description)]]) {
    const attribute = key.startsWith('og:') ? 'property' : 'name';
    let node = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!node) { node=document.createElement('meta'); node.setAttribute(attribute,key); document.head.appendChild(node); }
    node.setAttribute('content',value);
  }
  // Canonical absoluto por ruta (lo escribe el prerender); en la navegación del cliente solo cambia la ruta, no el dominio.
  if(title===NOT_FOUND[0]) {document.querySelectorAll('link[rel="canonical"],link[hreflang],meta[property="og:url"]').forEach(n=>n.remove());return;}
  let canonical = document.querySelector('link[rel="canonical"]');
  if(!canonical) {canonical=document.createElement('link');canonical.rel='canonical';canonical.href=document.querySelector('meta[name="tyt-site-origin"]')?.content||location.origin;document.head.appendChild(canonical);}
  try {
    const url=new URL(canonical.href);url.pathname=location.pathname.replace(/\/+$/,'')||'/';url.search='';url.hash='';canonical.href=url.href;
    let og=document.querySelector('meta[property="og:url"]');if(!og){og=document.createElement('meta');og.setAttribute('property','og:url');document.head.appendChild(og);}og.content=url.href;
    for(const item of [...LANGUAGES,{code:'x-default'}]) {
      let node=document.querySelector(`link[hreflang="${item.code}"]`);
      if(!node){node=document.createElement('link');node.rel='alternate';node.hreflang=item.code;document.head.appendChild(node);}
      const alternate=new URL(url);alternate.pathname=pathForLanguage(location.pathname,item.code==='x-default'?'es':item.code).replace(/\/+$/,'')||'/';node.href=alternate.href;
    }
  } catch { /* origen inválido: no inventar otro dominio */ }
}
// Fichas y notas: título y descripción de la propia página (el 404 de un slug desconocido lo fija NotFound).
export function usePageMeta(title, description) {
  useEffect(() => { if (title) applyMeta(title, description); }, [title, description]);
}
