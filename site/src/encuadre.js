// Encuadre (ronda 2026-10-16): fracción de la foto que `object-fit: cover` ocultaría en un marco de proporción `frame` (ancho/alto).
export const hiddenByCover = (photo, frame) => { if (!photo?.width || !photo?.height || !frame) return 0; const r = photo.width / photo.height; return r > frame ? 1 - frame / r : 1 - r / frame; };
