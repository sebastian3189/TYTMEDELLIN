import { tours } from './content';
import { inicioTextos } from './inicio-textos';

/*
 * Datos de la mano de viaje por tour (misma construcción que TravelHand): portada de la baraja + hasta 7 fotos oficiales de la galería (repartidas de forma
 * pareja; la portada JMC con cartel no entra porque `gallery` ya la excluye; Compras usa sus 3 oficiales). Una sola fuente para el inicio y las fichas.
 */
const CARDS = '/media/baraja';
const MAX_PHOTOS = 8;
/**
 * Fotos del diaporama provisional del hero de la ficha (4–6 oficiales, ya sin la portada JMC con cartel porque `gallery` la excluye): primero la foto principal,
 * luego las horizontales y por último el resto repartido de forma pareja. Si el tour tiene menos de 4 fotos oficiales (Compras 3, Traslados 2) salen todas.
 */
export function tourSlides(slug, max = 6) {
  const t = tours.find((x) => x.slug === slug), pool = t.gallery, first = pool.find((p) => p.src === t.hero.src) || pool[0];
  const rest = pool.filter((p) => p !== first), wide = rest.filter((p) => p.width > p.height), tall = rest.filter((p) => p.width <= p.height);
  const out = [first, ...wide.slice(0, 2)], need = Math.min(max, pool.length) - out.length, step = tall.length / Math.max(1, need);
  for (let k = 0; k < need && k < tall.length; k++) out.push(tall[Math.floor(k * step)]);
  return out.filter(Boolean).slice(0, max);
}
export function tourEntry(slug) {
  const t = tours.find((x) => x.slug === slug), copy = inicioTextos.cartas[slug];
  const pool = t.gallery.filter((_, i) => i > 0 || slug === 'tour-de-compras');
  const n = Math.min(MAX_PHOTOS - 1, pool.length), picked = Array.from({ length: n }, (_, k) => pool[Math.floor((k * pool.length) / n)]);
  const g0 = t.gallery[0], cover = slug === 'traslados-aeropuerto-jmc' ? { src: g0.src, srcSet: g0.srcset || `${g0.small} 640w, ${g0.src} ${g0.width}w`, width: g0.width, height: g0.height, small: g0.small || g0.src } : { src: `${CARDS}/${slug}-d.webp`, srcSet: `${CARDS}/${slug}-m.webp 400w, ${CARDS}/${slug}-d.webp 640w, ${CARDS}/${slug}-h.webp 960w`, width: 960, height: 1200, small: `${CARDS}/${slug}-t.webp` };
  const photos = [cover, ...picked.map((p) => ({ src: p.src, srcSet: p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`, width: p.width, height: p.height, small: p.small || p.src }))];
  return { slug, name: t.name, category: t.category, emocion: copy.emocion, frase: copy.frase, lugar: copy.lugar, photos };
}
