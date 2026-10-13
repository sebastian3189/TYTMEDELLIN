import media from './media.json';
import derivatives from './exploration-media.json';

// Spec 03 I.1 — fotos de «Un lugar para cada forma de viajar», cargadas aparte del paquete de la ruta (import dinámico desde ExperienceExplorer):
// los dos JSON (media + derivados) no viajan en el chunk del inicio.
// Fotos oficiales de Medellín (índices de media.json; 0 = portada). Mismos índices que scripts/prepare-exploracion.py.
// Tour de Compras (decisión del usuario, 2026-10-12): solo tiene 3 fotos oficiales y se usan las 3, portada incluida (la regla «sin repetir portada»
// no admite alternativa con 3 fotos); en las demás la portada se excluye porque ya es la tarjeta del tour.
export const selection = {
 'city-tour-comuna-13':[5,7,9,16],'tour-de-compras':[0,1,2],'guatape-piedra-del-penol':[1,2,6,13],
 'vuelta-a-oriente':[2,5,6,9],'santa-fe-de-antioquia':[2,3,4,6],'jardin-antioquia':[1,2,3,4],
 'tour-del-cafe-medellin':[1,2,3,5],'salto-del-buey':[3,6,8,10],
 'tour-nocturno-medellin':[1,3,6,8],'tour-miradores':[1,3,5,7],'hacienda-napoles':[1,4,6,9]
};
export const pictures = Object.fromEntries(Object.entries(selection).map(([slug, numbers]) => [slug, numbers.map((n) => {
  const photo = media[slug][n], derived = derivatives[slug][n];
  return photo && derived && { ...photo, ...derived, src: derived.main, small: derived.satellite };
}).filter(Boolean)]));
