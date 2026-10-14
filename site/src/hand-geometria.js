/*
 * Geometría de «La mano de viaje» (Spec 03 §K y §M): la comparten TravelHand (inicio, 11 experiencias) y TourArchive («Archivo de nuestros viajes» de cada ficha).
 * Una sola fuente de casillas, curvas y tiempos: la ficha usa EXACTAMENTE la misma matemática que el inicio, parametrizada por tour (fotos, foto delantera, progreso).
 * Funciones puras salvo `placePhotos`, que escribe transform/opacity en los <img> recibidos (nunca estado de React por cuadro).
 */
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };

// Casillas de la mano (fracciones de la región: centro, alto, giro, profundidad de parallax). La 0 es la delantera.
export const SLOTS = [
  { cx: 0.5, cy: 0.54, h: 0.76, r: 0, d: 1 }, { cx: 0.2, cy: 0.33, h: 0.4, r: -7, d: 1.5 }, { cx: 0.83, cy: 0.3, h: 0.38, r: 6, d: 0.6 }, { cx: 0.13, cy: 0.79, h: 0.34, r: 5, d: 1.2 },
  { cx: 0.88, cy: 0.74, h: 0.4, r: -5, d: 1.7 }, { cx: 0.36, cy: 0.16, h: 0.27, r: 4, d: 0.5 }, { cx: 0.68, cy: 0.89, h: 0.28, r: -4, d: 0.8 }, { cx: 0.63, cy: 0.15, h: 0.26, r: 7, d: 1.1 },
];

/**
 * Coloca las fotos de un tour. `local` = progreso del tour (<0 antes de llegar, 0–1 durante, >1 al salir); `f` = índice de la foto delantera;
 * `RW × RH` = región de la mano; `shrink` = factor de tamaño de las casillas; `mob` = móvil <768 px (foto central ≈ 70 % del ancho, satélites proporcionales).
 * Devuelve los datos de la carta delantera (para el nombre del lugar bajo ella).
 */
export function placePhotos(imgs, f, local, RW, RH, shrink, mob) {
  const ls = clamp(local, 0, 1); let fr = null;
  imgs.forEach((img, k) => {
    const slotIdx = k === f ? 0 : k < f ? k + 1 : k, slot = SLOTS[slotIdx % SLOTS.length];
    const h = mob ? (slot.h / 0.76) * Math.min(RH * 0.86, RW * 0.7 * 1.25) * (slotIdx === 0 ? 1 : 0.6) : slot.h * RH * shrink, w = h * 0.8;
    if (img._w !== w) { img.style.width = `${w}px`; img.style.height = `${h}px`; img._w = w; }
    const front = slotIdx === 0;
    const tIn = front ? 0 : 0.14 + 0.055 * (slotIdx - 1), eIn = local < 0 ? 0 : front ? smooth(ls / 0.15) : smooth((ls - tIn) / 0.22);
    const eOut = smooth((ls - (0.86 + 0.012 * slotIdx)) / 0.14);
    const dirx = (slot.cx - 0.5) * 1.7, diry = (slot.cy - 0.5) * 1.7, inv = 1 - eIn;
    const par = (0.5 - ls) * slot.d * 0.16 * RH, parx = (ls - 0.5) * slot.d * 0.035 * RW;
    const sc = (front ? 0.82 + 0.18 * eIn : 0.55 + 0.45 * eIn) * (1 + 0.04 * eOut) * (1 + 0.03 * (slot.d - 1) * (ls - 0.5));
    const rot = front ? slot.r - 6 * inv - 8 * eOut : slot.r * (0.4 + 0.6 * eIn) + 14 * inv * Math.sign(dirx || 1) - 8 * eOut;
    const x = slot.cx * RW - w / 2 + (front ? 0 : dirx * RW * 0.5 * inv) + parx - eOut * RW * 0.3 * (0.4 + slot.d * 0.3);
    const y = slot.cy * RH - h / 2 + (front ? 0.28 * RH * inv : diry * RH * 0.5 * inv) + par - eOut * RH * 0.45 * (0.5 + slot.d * 0.25);
    const o = (front ? Math.max(0.0001, smooth(ls / 0.08) + (local < 0 ? 0 : 0)) : eIn) * (1 - eOut) * (local < 0 ? 0 : 1);
    img.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
    img.style.opacity = o.toFixed(3); img.style.zIndex = String(front ? 30 : 2 + Math.round(slot.d * 4));
    if (front) fr = { x, y, w, h, sc, o, rot };
    img.style.pointerEvents = o > 0.6 && local >= 0 && local <= 1 ? 'auto' : 'none';
  });
  return fr;
}

/** Nombre del lugar en versalitas bajo la carta delantera: nunca sobre la foto y nunca cortado por la región. */
export function placeLugar(lg, fr, ls, RH) {
  if (!lg || !fr) return;
  const ly = fr.y + fr.h / 2 + (fr.h * fr.sc) / 2 + 7;
  lg.style.transform = `translate3d(${(fr.x + fr.w / 2).toFixed(1)}px,${ly.toFixed(1)}px,0) translateX(-50%)`;
  lg.style.opacity = (fr.o * smooth((ls - 0.22) / 0.1) * clamp((RH - 3 - (ly + 26)) / 8)).toFixed(3);
}
export const smallCaps = (t) => t.toLocaleLowerCase('es').replace(/(^|[\s·(-])(\p{L})/gu, (m, a, b) => a + b.toLocaleUpperCase('es'));
