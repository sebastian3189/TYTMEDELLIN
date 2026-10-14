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
export const BAND_M = 200;      // móvil: alto fijo (px) de la banda de texto bajo el marco

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };

/** Relevo hacia «La mano de viaje» (Spec 03 §K3): el mazo se traslada a su caja y el escenario se funde sobre uno idéntico. */
export const RELAY_SVH = 30, FADE_SVH = 4;
/** Límites del recorrido en svh. Fase del clip: 165 svh escritorio / 140 svh móvil (ajuste aprobado, se conserva). Tras la contracción (t4) solo queda el relevo (t4→t5) y el fundido final. */
export function timeline(mobile) {
  if (mobile) {
    const t0 = 24, t1 = t0 + 40, t2 = t1 + 140, t3 = t2 + 24, t4 = t3 + 48, t5 = t4 + RELAY_SVH;
    return { t0, t1, t2, t3, t4, t5, t6: t5, total: t5 + FADE_SVH, clip: 140 };
  }
  const t0 = 30, t1 = t0 + 50, t2 = t1 + 165, t3 = t2 + 15, t4 = t3 + 45, t5 = t4 + RELAY_SVH;
  return { t0, t1, t2, t3, t4, t5, t6: t5, total: t5 + FADE_SVH, clip: 165 };
}

// Rotaciones de la baraja (±3–6°), deterministas y estables. Desplazamientos pequeños para que asomen los bordes.
const ROT = [-5.2, 3.8, -2.6, 5.9, -4.1, 2.9, -6, 4.6, -3.3, 5.1, -1.8, 3.2];
const DX = [-6, 7, -3, 8, -8, 4, -5, 9, -2, 6, -7, 3];
const DY = [4, -5, 7, -3, 6, -6, 3, -4, 8, -2, 5, -7];
export const FRAME_ROT = -2.4;

/** Estado derivado de u: fase de interfaz, ventana del marco y relevo. */
export function stateAt(u, T, mobile) {
  let ui = 'deck';
  if (u >= T.t0) ui = 'flip';
  if (u >= T.t1) ui = 'clip';
  if (u >= T.t3) ui = 'shrink';
  if (u >= T.t4) ui = 'relay';

  // w: 0 = carta de la baraja, 1 = pantalla completa.
  let w = 0;
  if (u >= T.t0 && u < T.t1) w = smooth((u - T.t0) / (T.t1 - T.t0));
  else if (u >= T.t1 && u < T.t3) w = 1;
  else if (u >= T.t3 && u < T.t4) w = 1 - smooth((u - T.t3) / (T.t4 - T.t3));

  // D: «baraja a la vista» (título, lema): 1 al inicio, 0 durante el clip, 1 al volver y 0 al empezar el relevo.
  let D;
  if (u < T.t1) D = 1 - smooth((u - T.t0) / (0.45 * (T.t1 - T.t0)));
  else if (u < T.t3) D = 0;
  else if (u < T.t4) D = mobile ? 0 : smooth((u - T.t3 - 0.3 * (T.t4 - T.t3)) / (0.7 * (T.t4 - T.t3)));
  else D = mobile ? 0 : 1 - smooth((u - T.t4) / (0.12 * (T.t5 - T.t4)));

  const clipT = clamp((u - T.t1) / (T.t2 - T.t1));
  const rel = smooth((u - T.t4) / (T.t5 - T.t4)); // relevo: el mazo viaja a su caja de «La mano de viaje»
  const fade = clamp((u - T.t5) / (T.total - T.t5)); // fundido del escenario sobre el de la nueva sección
  const sh = clamp(u / T.t0); // barajado: 0 → 1 en el primer tramo de scroll
  return { ui, w, D, clipT, rel, fade, sh };
}

/**
 * Caja del mazo en «La mano de viaje» (Spec 03 §K3/K4): abajo a la derecha del escenario. La comparten ScrubHero (destino del relevo) y TravelHand
 * (posición del mazo de portadas pendientes): mismo centro, misma altura y las mismas rotaciones (`deckPose`).
 */
export function relayDeck(W, H, mobile) {
  const h = mobile ? 96 : 150;
  return mobile ? { x: W - 16 - h * 0.4, y: H - BAND_M - h * 0.5 - 12, h, w: h * 0.8 } : { x: W - clamp(W * 0.05, 22, 88) - h * 0.4 - 8, y: H - h * 0.5 - 32, h, w: h * 0.8 };
}
export const deckPose = (i) => ({ dx: DX[i % N], dy: DY[i % N], r: ROT[i % N] });

/**
 * Medidas del escenario. `frame` = rectángulo natural de la capa del clip (x, y, w, h) en coordenadas del escenario.
 * Devuelve tamaños base, centro de la baraja, centro de la carta enfocada y rejilla de cierre.
 */
export function buildDims(W, H, mobile, frame) {
  const pad = clamp(W * 0.05, 22, 88);
  let Bh, Hd, deck, focus, m = null;
  if (mobile) {
    // Móvil (Spec 03 §J1): encima de la banda de texto (BAND_M) cabe el título «Elige tu próximo recuerdo» (2 líneas, mismo tamaño que el CSS)
    // y la baraja; el borde superior de la baraja (con su rotación) queda ≥ 16 px bajo el título y la baraja mide ≤ 300 px de alto.
    const A = H - BAND_M, fs = clamp((W - 44) / 10.5, 28, 40), line = fs * 1.05 * 2, short = A < 480;
    const t1Top = short ? 12 : 40, gapT = 16, pb = 12;
    const rotAllow = (hd) => hd * 0.4 * Math.sin(6.5 * Math.PI / 180) + 8; // media anchura × sen(rotación máx.) + desplazamiento
    const fixed = t1Top + line + gapT + pb;
    Hd = clamp((A - fixed) - 2 * rotAllow(300), 150, 300) * 0.89; // móvil: cartas de la baraja ≈ 11 % más pequeñas (pedido del usuario); el Flip parte de d.Wd/d.Hd, así que sigue continuo
    const al = rotAllow(Hd);
    const deckTop = t1Top + line + gapT + al;
    // El espacio libre (sin segunda línea de titular ni confianza) se reparte: la baraja se centra entre el título y la tira de miniaturas (≈148 px sobre el borde inferior).
    const free = (H - 164) - (deckTop + Hd + al);
    deck = { x: W / 2, y: deckTop + Hd / 2 + Math.max(0, free / 2) };
    // Las cartas enfocadas llenan el ancho útil; la altura se adapta al teléfono.
    // Reservar 280 px para nombre, frase y controles, incluso en 360×640.
    Bh = Math.min(Math.min(W - 56, 340) * 1.25, H - 320);
    focus = { x: W / 2, y: (H - 280) / 2 };
    m = { t1Top, short, A };
  } else {
    Bh = clamp(H * 0.64, 280, 640);
    Hd = clamp(H * 0.366, 260, 425); // escritorio: cartas de la baraja previa a la película +18 % (pedido del usuario 2026-10-14); el Flip parte de Wd/Hd, así que sigue continuo
    deck = { x: W / 2, y: H * 0.49 };
    focus = { x: W * 0.6, y: H * 0.5 };
  }
  const Bw = mobile ? Math.min(W - 56, 340) : Bh * 0.8;
  return { W, H, mobile, pad, Bw, Bh, sD: Hd / Bh, Hd, Wd: Hd * 0.8, deck, focus, frame, m, relay: relayDeck(W, H, mobile) };
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

/** Posición de la carta i: baraja → mazo del relevo (caja de «La mano de viaje»). Escribe en `out`. */
export function cardPlace(d, st, i, out) {
  const { deck, mobile } = d;
  // Barajado (primer tramo de scroll): las cartas se abren en abanico, cambian de rotación y de orden y vuelven a apilarse.
  const bump = Math.sin(Math.PI * st.sh), ang = i * 2.4 + st.sh * 3;
  const rank = (i + Math.round(st.sh * 5)) % N;
  const dk = {
    x: deck.x + DX[i] + Math.cos(ang) * d.Wd * (mobile ? 0.4 : 0.55) * bump, y: deck.y + DY[i] + Math.sin(ang) * d.Hd * (mobile ? 0.1 : 0.2) * bump,
    s: d.sD * 0.95, r: ROT[i] + (i % 2 ? 1 : -1) * 22 * bump + st.sh * (i % 3 - 1) * 4, o: mobile && i >= 5 && st.sh < 0.01 ? 0 : (mobile && i >= 5 ? bump : 1), z: 10 + N - rank,
  };
  // Relevo: el mazo viaja a la caja de «La mano de viaje» (mismo centro y rotaciones que el mazo de la nueva sección).
  const a = st.rel, R = d.relay, ts = R.h / d.Bh, k = ts / dk.s;
  out.x = lerp(dk.x, R.x + DX[i] * k, a); out.y = lerp(dk.y, R.y + DY[i] * k, a); out.s = lerp(dk.s, ts, a); out.r = lerp(dk.r, ROT[i], a);
  out.o = mobile ? dk.o * (1 - smooth(st.w / .2)) : (st.w > 0.9 ? 0 : dk.o);
  out.z = dk.z;
  return out;
}
