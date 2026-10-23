import { tours, catalogo } from './content';
import { inicioTextos } from './inicio-textos';

/*
 * Datos por tour para el inicio (mano de viaje), la ficha (diaporama de cabecera y «Archivo de nuestros viajes») y el catálogo. Selección fotográfica
 * 2026-10-23, revisión 3: cada capa lee su lista EXPLÍCITA de media.json (generada desde site/fuentes/seleccion-fotos-2026-10-23.json) y ninguna foto se
 * repite entre capas; solo la portada (carta de la baraja) abre la mano y el archivo y es la 1.ª diapositiva.
 */
const CARDS = '/media/baraja';
const photoOf = (p) => ({ src: p.src, srcSet: p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`, width: p.width, height: p.height, small: p.small || p.src });
const find = (slug) => tours.find((x) => x.slug === slug);
/** Diaporama de la cabecera de la ficha (`cabecera_slides`; la 1.ª es la portada). Sin fotos (Tour Miradores) devuelve [] y la cabecera queda sin diaporama. */
export function tourSlides(slug) { return find(slug).slides; }
/** Diaporama de la cabecera de /experiencias (`catalogo_slides`). */
export function catalogSlides() { return catalogo; }
/** Carta de portada de la baraja (4:5). Tour Miradores (sin foto): carta de marca generada por prepare-baraja.py. */
const cover = (slug) => ({ src: `${CARDS}/${slug}-d.webp`, srcSet: `${CARDS}/${slug}-m.webp 400w, ${CARDS}/${slug}-d.webp 640w, ${CARDS}/${slug}-h.webp 960w`, width: 960, height: 1200, small: `${CARDS}/${slug}-t.webp` });
/** Mano de viaje del inicio (TravelHand): portada + `inicio_tarjeta`. */
export function tourEntry(slug) {
  const t = find(slug), copy = inicioTextos.cartas[slug];
  return { slug, name: t.name, category: t.category, emocion: copy.emocion, frase: copy.frase, lugar: copy.lugar, sinFoto: !t.hero, photos: [cover(slug), ...t.inicio.map(photoOf)] };
}
/** «Archivo de nuestros viajes» de la ficha (TourArchive): portada + `galeria`. Sin portada (Tour Miradores) no hay archivo. */
export function archiveEntry(slug) {
  const t = find(slug), copy = inicioTextos.cartas[slug];
  return { slug, name: t.name, category: t.category, lugar: copy.lugar, photos: t.hero ? [cover(slug), ...t.gallery.map(photoOf)] : [] };
}
