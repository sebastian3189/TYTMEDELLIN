/*
 * Geometría de «La baraja de recuerdos» (Spec 03 §H1). Funciones puras de un único progreso de scroll `u`
 * (unidades de svh dentro de la pista fijada). Nada aquí toca el DOM ni el scroll: el componente lee `u`,
 * llama a `layout()` y escribe transform/opacity. Un solo progreso compartido entre las cartas y el lienzo del clip.
 *
 * Motor (decisión del constructor, Spec 04): FLIP propio por progreso (opción B). El «Flip» de la carta superior a pantalla
 * completa es una interpolación determinista rect-inicial → rect-final aplicada con transform + clip-path, por lo que
 * es simétrica al subir y no añade dependencias.
 */
export const N = 12;
export const CARD_VH = 34;      // scroll por carta en escritorio (svh)
export const BAND_M = 200;      // móvil: alto fijo (px) de la banda de texto bajo el marco

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };

/** Límites del recorrido en svh. Fase del clip: 165 svh escritorio / 140 svh móvil (ajuste aprobado, se conserva). */
export function timeline(mobile) {
  if (mobile) {
    // CONSTRUIR, Spec 03 §H1/§I: pausa final → postal → revelado separados; cierre en flujo normal.
    const t0 = 24, t1 = t0 + 40, t2 = t1 + 140, t3 = t2 + 24, t4 = t3 + 48, t5 = t4 + 24;
    const t6 = t5 + CARD_VH * N;
    return { t0, t1, t2, t3, t4, t5, t6, total: t6 + 24, clip: 140 };
  }
  const t0 = 30, t1 = t0 + 50, t2 = t1 + 165, t3 = t2 + 15, t4 = t3 + 45, t5 = t4 + 30, t6 = t5 + CARD_VH * N;
  return { t0, t1, t2, t3, t4, t5, t6, total: t6 + 24, clip: 165 };
}

/** Progreso (svh) en el que la carta i queda enfocada (meseta). */
export const uForCard = (T, i) => T.t5 + CARD_VH * i + CARD_VH * 0.2;

// Rotaciones de la baraja (±3–6°), deterministas y estables. Desplazamientos pequeños para que asomen los bordes.
const ROT = [-5.2, 3.8, -2.6, 5.9, -4.1, 2.9, -6, 4.6, -3.3, 5.1, -1.8, 3.2];
const DX = [-6, 7, -3, 8, -8, 4, -5, 9, -2, 6, -7, 3];
const DY = [4, -5, 7, -3, 6, -6, 3, -4, 8, -2, 5, -7];
export const FRAME_ROT = -2.4;

/** Estado derivado de u: fase de interfaz, ventana del marco, foco de cartas. */
export function stateAt(u, T, mobile) {
  let ui = 'deck';
  if (u >= T.t0) ui = 'flip';
  if (u >= T.t1) ui = 'clip';
  if (u >= T.t3) ui = 'shrink';
  if (mobile && u >= T.t4) ui = 'reveal';
  if (!mobile && u >= T.t3 + 0.5 * (T.t4 - T.t3)) ui = 'deck'; // escritorio: las acciones vuelven a media contracción
  if (!mobile && u >= T.t4) ui = 'fan';
  if (u >= T.t5) ui = 'cards';

  // w: 0 = carta de la baraja, 1 = pantalla completa.
  let w = 0;
  if (u >= T.t0 && u < T.t1) w = smooth((u - T.t0) / (T.t1 - T.t0));
  else if (u >= T.t1 && u < T.t3) w = 1;
  else if (u >= T.t3 && u < T.t4) w = 1 - smooth((u - T.t3) / (T.t4 - T.t3));

  // D: «baraja a la vista» (titulares, tira, lema): 1 al inicio, 0 durante el clip, 1 al volver, 0 al desplegar.
  let D;
  if (u < T.t1) D = 1 - smooth((u - T.t0) / (0.45 * (T.t1 - T.t0)));
  else if (u < T.t3) D = 0;
  else if (u < T.t4) D = mobile ? 0 : smooth((u - T.t3 - 0.3 * (T.t4 - T.t3)) / (0.7 * (T.t4 - T.t3)));
  else D = mobile ? 0 : 1 - smooth((u - T.t4) / (0.35 * (T.t5 - T.t4)));

  const clipT = clamp((u - T.t1) / (T.t2 - T.t1));
  const fanT = smooth((u - T.t4) / (T.t5 - T.t4));
  // Foco: cada carta tiene una meseta (40 %) y luego pasa a la siguiente.
  let f = 0;
  if (u >= T.t5) {
    const raw = clamp((u - T.t5) / CARD_VH, 0, N);
    const i = Math.min(N - 1, Math.floor(raw));
    f = i + (i < N - 1 ? smooth(((raw - i) - 0.4) / 0.6) : 0);
  }
  const active = Math.round(f);
  const sh = clamp(u / T.t0); // barajado: 0 → 1 en el primer tramo de scroll
  return { ui, w, D, clipT, fanT, f, active, sh };
}

/**
 * Medidas del escenario. `frame` = rectángulo natural de la capa del clip (x, y, w, h) en coordenadas del escenario.
 * Devuelve tamaños base, centro de la baraja, centro de la carta enfocada y rejilla de cierre.
 */
export function buildDims(W, H, mobile, frame) {
  const pad = clamp(W * 0.05, 22, 88);
  let Bh, Hd, deck, focus, m = null;
  if (mobile) {
    // Móvil: encima de la banda de texto (BAND_M) cabe «Medellín,» / baraja / «a otro nivel.» / confianza, sin solapes:
    // el borde superior de la baraja (con su rotación) queda ≥ 16 px bajo «Medellín,» y la baraja mide ≤ 300 px de alto.
    const A = H - BAND_M, fs = clamp(Math.min(W * 0.13, (W - 44) / 7.8), 38, 64), line = fs * 0.95, short = A < 480;
    const t1Top = short ? 12 : 40, microH = short ? 0 : 44, gapT = 16, gapB = 14, pb = 12;
    const rotAllow = (hd) => hd * 0.4 * Math.sin(6.5 * Math.PI / 180) + 8; // media anchura × sen(rotación máx.) + desplazamiento
    const fixed = t1Top + line + gapT + gapB + line + (short ? 0 : 10 + microH) + pb;
    Hd = clamp((A - fixed) - 2 * rotAllow(300), 150, 300);
    const al = rotAllow(Hd);
    const deckTop = t1Top + line + gapT + al;
    deck = { x: W / 2, y: deckTop + Hd / 2 };
    // Las cartas enfocadas llenan el ancho útil; la altura se adapta al teléfono.
    // Reservar 280 px para nombre, frase y controles, incluso en 360×640.
    Bh = Math.min(Math.min(W - 56, 340) * 1.25, H - 320);
    focus = { x: W / 2, y: (H - 280) / 2 };
    const bottomEdge = deck.y + Hd / 2 + al, t2Top = bottomEdge + gapB;
    m = { t1Top, t2Top, microTop: t2Top + line + 10, short, A };
  } else {
    Bh = clamp(H * 0.64, 280, 640);
    Hd = clamp(H * 0.31, 220, 360);
    deck = { x: W / 2, y: H * 0.49 };
    focus = { x: W * 0.6, y: H * 0.5 };
  }
  const Bw = mobile ? Math.min(W - 56, 340) : Bh * 0.8;
  return { W, H, mobile, pad, Bw, Bh, sD: Hd / Bh, Hd, Wd: Hd * 0.8, deck, focus, frame, m };
}

/**
 * Ventana (marco) del clip. Devuelve la transformación y el clip-path de la capa de tamaño natural `frame`
 * para que se vea como una carta 4:5 (w=0) o a su tamaño completo (w=1).
 */
export const filmOpening = (clipT) => smooth((clipT - 0.6) / 0.4);

export function frameWindow(d, w, out, clipT = 0) {
  const { frame: F } = d;
  const tail = d.mobile ? filmOpening(clipT) : 0;
  const insetScale = 1 - tail * 32 / F.w;
  const fullW = F.w * insetScale;
  const fullH = lerp(F.h, F.w * 9 / 16, tail) * insetScale;
  const cardW = lerp(d.Wd, Math.min(d.W - 56, 320), tail);
  const cardH = lerp(d.Hd, Math.min(d.W - 56, 320) * 9 / 16, tail);
  const cx0 = d.deck.x, cy0 = d.deck.y;
  const wx = lerp(cardW, fullW, w), wh = lerp(cardH, fullH, w);
  const cx = lerp(cx0, F.x + F.w / 2, w), cy = lerp(cy0, F.y + F.h / 2, w);
  const rot = lerp(FRAME_ROT, 0, w);
  // La capa cubre la ventana (cover): escala mínima que llena ancho y alto; el sobrante se recorta con clip-path.
  const s = Math.max(wh / F.h, wx / F.w);
  const ix = Math.max(0, (F.w - wx / s) / 2); // recorte lateral en coordenadas de la capa
  const iy = Math.max(0, (F.h - wh / s) / 2); // recorte vertical (marco móvil más estrecho que 4:5)
  const radius = lerp(18, 18 * tail, w) / s;
  out.tx = cx - (F.x + F.w / 2); out.ty = cy - (F.y + F.h / 2); out.rot = rot; out.s = s; out.ix = ix; out.iy = iy; out.r = radius;
  return out;
}

/** Posición de la carta i: mezcla baraja → columna (fan) → rejilla (gridT). Escribe en `out`. */
export function cardPlace(d, st, i, out) {
  const { Bw, Bh, deck, focus, mobile } = d;
  // Baraja
  // Barajado (primer tramo de scroll): las cartas se abren en abanico, cambian de rotación y de orden y vuelven a apilarse.
  const bump = Math.sin(Math.PI * st.sh), ang = i * 2.4 + st.sh * 3;
  const rank = (i + Math.round(st.sh * 5)) % N;
  const dk = {
    x: deck.x + DX[i] + Math.cos(ang) * d.Wd * (mobile ? 0.4 : 0.55) * bump, y: deck.y + DY[i] + Math.sin(ang) * d.Hd * (mobile ? 0.1 : 0.2) * bump,
    s: d.sD * 0.95, r: ROT[i] + (i % 2 ? 1 : -1) * 22 * bump + st.sh * (i % 3 - 1) * 4, o: mobile && i >= 5 && st.sh < 0.01 ? 0 : (mobile && i >= 5 ? bump : 1), z: 10 + N - rank,
  };
  // Fan en columna (solo escritorio)
  // Móvil: solo la carta superior (el marco) hace el Flip; las demás se desvanecen al empezar y no asoman bajo él.
  if (mobile) {
    const dd = i - st.f, ad = Math.abs(dd), a = st.fanT;
    // Una sola dirección, la del gesto: las cartas entran por abajo y salen por arriba.
    const col = { x: focus.x, y: focus.y,
      s: 1, r: 0,
      o: i === st.active ? 1 : 0, z: i === st.active ? 200 : 1 };
    for (const k of ['x', 'y', 's', 'r']) out[k] = lerp(dk[k], col[k], a);
    out.o = st.clipT === 1 ? col.o * a : dk.o * (1 - smooth(st.w / .2));
    out.z = a > 0 ? col.z : dk.z;
    return out;
  }
  const dd = i - st.f, ad = Math.abs(dd), sg = Math.sign(dd);
  const near = Math.min(ad, 1), far = Math.max(0, ad - 1);
  const sc = (1 - 0.6 * smooth(near)) * (1 - 0.06 * far);
  const col = {
    x: focus.x + sg * Bw * ((sg < 0 ? 0.78 : 0.62) * near + 0.4 * far),
    y: focus.y + sg * Bh * ((sg < 0 ? 0.12 : 0.8) * near + (sg < 0 ? 0.2 : 0.3) * far),
    s: sc, r: clamp(dd, -2.5, 2.5) * 4.5,
    o: clamp(3 - ad, 0, 1), z: Math.round(200 - ad * 20),
  };
  const a = st.fanT;
  const mix = (k) => lerp(dk[k], col[k], a);
  out.x = mix('x'); out.y = mix('y'); out.s = mix('s'); out.r = mix('r'); out.o = mix('o');
  // Mientras el marco (postal) aún se ve, las cartas siguen debajo de él.
  out.z = a < 0.5 ? dk.z : col.z;
  if (st.w > 0.9) out.o = 0; // ocultas bajo el marco (clip y pausa)
  return out;
}
