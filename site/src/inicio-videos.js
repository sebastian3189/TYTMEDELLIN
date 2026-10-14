import { company } from './company';

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
  hero: { src: null, poster: null },
  historia: { src: null, poster: null, captions: null },
};
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
  posts: [
    { url: perfil, image: null, type: 'reel', alt: '' },
    { url: perfil, image: null, type: 'carousel', alt: '' },
    { url: perfil, image: null, type: 'reel', alt: '' },
    { url: perfil, image: null, type: 'photo', alt: '' },
    { url: perfil, image: null, type: 'carousel', alt: '' },
    { url: perfil, image: null, type: 'reel', alt: '' },
    { url: perfil, image: null, type: 'photo', alt: '' },
    { url: perfil, image: null, type: 'reel', alt: '' },
  ],
};
export const REDES_NOMBRE = { instagram: 'Instagram', tiktok: 'TikTok' };
