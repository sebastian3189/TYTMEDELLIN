import { company } from './company';
import media from './media.json' with { type: 'json' };

/*
 * Videos del inicio (Spec 03 §J2). UNICO archivo que hay que tocar para reemplazar los espacios provisionales.
 *
 *   src: null            -> espacio oscuro provisional («Video próximamente»); sin src no se pide ningún archivo.
 *   src: '/media/videos/hero.mp4' -> se usa el video (archivo en site/public/media/videos/).
 *   poster: '/media/videos/hero-poster.webp'  (recomendado: imagen del primer cuadro; en movimiento reducido o ahorro de datos es lo único que se ve).
 *   captions: '/media/videos/historia.es.vtt' (solo historia; si el video tiene voz, los subtítulos son obligatorios — PENDIENTE CLIENTE).
 *
 * Formatos: MP4 (H.264, AAC) 16:9 para el hero (≤ 8 MB, sin audio útil: se reproduce silenciado); 9:16 para historia y redes (≥ 720×1280).
 * redes[i].url: PENDIENTE CLIENTE la dirección de cada reel; mientras tanto, el perfil de la red.
 */
export const inicioVideos = {
  // hero.image: fondo provisional (panorámica real, scripts/prepare-hero.py) MIENTRAS `src` sea null; al poner un `src` el video lo sustituye solo.
  // hero (2026-10-16): video de dron real, `adaptive` = una fuente por dispositivo (movil 9:16 / hd720 / hd1080, elegida en Hero.jsx); `poster` = primer cuadro (LCP, lo único
  // que se ve con movimiento reducido, ahorro de datos o 2g/3g); `image` = la foto anterior, solo como respaldo si el póster o el video fallan.
  hero: { src: null, adaptive: media['hero-dron'].videos, poster: media['hero-dron'].poster, image: media['hero-inicio'] },
  // historia: el reel propio del tour privado (sin audio: la música original tiene derechos y solo está licenciada dentro de Instagram; NO añadir audio ni usar el archivo original).
  historia: { src: '/media/videos/reel-tour-privado.mp4', poster: '/media/videos/reel-tour-privado-poster.webp', captions: null, instagramUrl: 'https://www.instagram.com/p/DdXYS5gJ-GH/', alt: 'Reel: viajar por Medellín a tu propio ritmo, en tour privado' },
};
/*
 * Video de cabecera de CADA ficha de experiencia (Spec 03 §M, pedido del usuario 2026-10-14): mismo espacio y mismas dimensiones que el hero del inicio
 * (100vw × 100svh, componente compartido Hero.jsx). Con `src: null` la ficha muestra, MIENTRAS tanto, un diaporama de fotos oficiales del tour (fundido
 * cruzado + Ken Burns). Para reemplazarlo basta pegar la ruta del archivo (en site/public/media/videos/tours/):
 *   'city-tour-comuna-13': { src: '/media/videos/tours/city-tour-comuna-13.mp4', poster: '/media/videos/tours/city-tour-comuna-13.webp' }
 * Formato: MP4 (H.264) 16:9, sin audio útil (se reproduce silenciado), ≤ 8 MB; el póster es lo único que se ve con movimiento reducido o ahorro de datos.
 * La clave es el `slug` de la ficha. PENDIENTE CLIENTE: los videos y pósteres reales de cada experiencia.
 */
/* Video de cabecera del catálogo /experiencias (mismo hero compartido; mientras no haya video, diaporama con fotos oficiales de varios tours). */
export const catalogoVideo = { src: null, poster: null };
export const toursVideos = {
  'city-tour-comuna-13': { src: null, poster: null },
  'guatape-piedra-del-penol': { src: null, poster: null },
  'tour-nocturno-medellin': { src: null, poster: null },
  'vuelta-a-oriente': { src: null, poster: null },
  'tour-del-cafe-medellin': { src: null, poster: null },
  'hacienda-napoles': { src: null, poster: null },
  'salto-del-buey': { src: null, poster: null },
  'santa-fe-de-antioquia': { src: null, poster: null },
  'jardin-antioquia': { src: null, poster: null },
  'tour-de-compras': { src: null, poster: null },
  'tour-miradores': { src: null, poster: null },
  'traslados-aeropuerto-jmc': { src: null, poster: null },
};
export const videoDeTour = (slug) => toursVideos[slug] || { src: null, poster: null };
/*
 * «Síguenos en redes» (Spec 03 §J, cambio del usuario 2026-10-14): perfil + cuadrícula 4×2 de publicaciones cuadradas, todo estático y local
 * (sin scripts, iframes ni widgets de Instagram). Para publicar un post basta pegar `url` e `image` (WebP/JPG cuadrado ≥ 640 px en public/media/instagram/).
 *   type: 'reel' | 'carousel' | 'photo' (reel y carrusel muestran su icono arriba a la derecha). Sin `image` el cuadro es el bloque oscuro provisional.
 * stats: null = oculto (PENDIENTE CLIENTE: no se inventan cifras). Ejemplo: { posts: '120', followers: '3,4 mil', following: '85' }.
 */
const perfil = company.instagram;
export const instagram = {
  profile: { name: 'Transporte y Turismo Medellín', handle: '@transporteenmedellin', url: company.instagram, stats: null },
  tiktok: { handle: '@tytmedellin', url: company.tiktok },
  // Instantánea fija de las últimas 8 publicaciones (contenido propio). Para refrescarla: scripts/prepare-instagram.py (instrucciones en su cabecera); lee src/media.json → «instagram-posts».
  posts: media['instagram-posts'].map((p) => ({ url: p.url, image: p.src, srcSet: p.srcset, width: p.width, height: p.height, type: p.type, alt: p.alt })),
};
export const REDES_NOMBRE = { instagram: 'Instagram', tiktok: 'TikTok' };
