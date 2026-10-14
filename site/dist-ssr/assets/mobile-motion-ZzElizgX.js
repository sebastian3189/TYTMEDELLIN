import { E as inicioTextos, r as tours } from "../entry-server.js";
var clamp$1 = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var lerp = (a, b, t) => a + (b - a) * t;
var smooth$1 = (t) => {
	t = clamp$1(t);
	return t * t * (3 - 2 * t);
};
/** Límites del recorrido en svh. Fase del clip: 165 svh escritorio / 140 svh móvil (ajuste aprobado, se conserva). Tras la contracción (t4) solo queda el relevo (t4→t5) y el fundido final. */
function timeline(mobile) {
	if (mobile) {
		const t0 = 24, t1 = 64, t2 = 204, t3 = 228, t4 = 276, t5 = 306;
		return {
			t0,
			t1,
			t2,
			t3,
			t4,
			t5,
			t6: t5,
			total: 310,
			clip: 140
		};
	}
	const t0 = 30, t1 = 80, t2 = 245, t3 = 260, t4 = 305, t5 = 335;
	return {
		t0,
		t1,
		t2,
		t3,
		t4,
		t5,
		t6: t5,
		total: 339,
		clip: 165
	};
}
var ROT = [
	-5.2,
	3.8,
	-2.6,
	5.9,
	-4.1,
	2.9,
	-6,
	4.6,
	-3.3,
	5.1,
	-1.8,
	3.2
];
var DX = [
	-6,
	7,
	-3,
	8,
	-8,
	4,
	-5,
	9,
	-2,
	6,
	-7,
	3
];
var DY = [
	4,
	-5,
	7,
	-3,
	6,
	-6,
	3,
	-4,
	8,
	-2,
	5,
	-7
];
var FRAME_ROT = -2.4;
/** Estado derivado de u: fase de interfaz, ventana del marco y relevo. */
function stateAt(u, T, mobile) {
	let ui = "deck";
	if (u >= T.t0) ui = "flip";
	if (u >= T.t1) ui = "clip";
	if (u >= T.t3) ui = "shrink";
	if (u >= T.t4) ui = "relay";
	let w = 0;
	if (u >= T.t0 && u < T.t1) w = smooth$1((u - T.t0) / (T.t1 - T.t0));
	else if (u >= T.t1 && u < T.t3) w = 1;
	else if (u >= T.t3 && u < T.t4) w = 1 - smooth$1((u - T.t3) / (T.t4 - T.t3));
	let D;
	if (u < T.t1) D = 1 - smooth$1((u - T.t0) / (.45 * (T.t1 - T.t0)));
	else if (u < T.t3) D = 0;
	else if (u < T.t4) D = mobile ? 0 : smooth$1((u - T.t3 - .3 * (T.t4 - T.t3)) / (.7 * (T.t4 - T.t3)));
	else D = mobile ? 0 : 1 - smooth$1((u - T.t4) / (.12 * (T.t5 - T.t4)));
	const clipT = clamp$1((u - T.t1) / (T.t2 - T.t1));
	const rel = smooth$1((u - T.t4) / (T.t5 - T.t4));
	const fade = clamp$1((u - T.t5) / (T.total - T.t5));
	const sh = clamp$1(u / T.t0);
	return {
		ui,
		w,
		D,
		clipT,
		rel,
		fade,
		sh
	};
}
/**
* Caja del mazo en «La mano de viaje» (Spec 03 §K3/K4): abajo a la derecha del escenario. La comparten ScrubHero (destino del relevo) y TravelHand
* (posición del mazo de portadas pendientes): mismo centro, misma altura y las mismas rotaciones (`deckPose`).
*/
function relayDeck(W, H, mobile) {
	const h = mobile ? 96 : 150;
	return mobile ? {
		x: W - 16 - h * .4,
		y: H - 200 - h * .5 - 12,
		h,
		w: h * .8
	} : {
		x: W - clamp$1(W * .05, 22, 88) - h * .4 - 8,
		y: H - h * .5 - 32,
		h,
		w: h * .8
	};
}
var deckPose = (i) => ({
	dx: DX[i % 12],
	dy: DY[i % 12],
	r: ROT[i % 12]
});
/**
* Medidas del escenario. `frame` = rectángulo natural de la capa del clip (x, y, w, h) en coordenadas del escenario.
* Devuelve tamaños base, centro de la baraja, centro de la carta enfocada y rejilla de cierre.
*/
function buildDims(W, H, mobile, frame) {
	const pad = clamp$1(W * .05, 22, 88);
	let Bh, Hd, deck, focus, m = null;
	if (mobile) {
		const A = H - 200, line = clamp$1((W - 44) / 10.5, 28, 40) * 1.05 * 2, short = A < 480;
		const t1Top = short ? 12 : 40, gapT = 16, pb = 12;
		const rotAllow = (hd) => hd * .4 * Math.sin(6.5 * Math.PI / 180) + 8;
		Hd = clamp$1(A - (t1Top + line + gapT + pb) - 2 * rotAllow(300), 150, 300) * .89;
		const al = rotAllow(Hd);
		const deckTop = t1Top + line + gapT + al;
		const free = H - 164 - (deckTop + Hd + al);
		deck = {
			x: W / 2,
			y: deckTop + Hd / 2 + Math.max(0, free / 2)
		};
		Bh = Math.min(Math.min(W - 56, 340) * 1.25, H - 320);
		focus = {
			x: W / 2,
			y: (H - 280) / 2
		};
		m = {
			t1Top,
			short,
			A
		};
	} else {
		Bh = clamp$1(H * .64, 280, 640);
		Hd = clamp$1(H * .31, 220, 360);
		deck = {
			x: W / 2,
			y: H * .49
		};
		focus = {
			x: W * .6,
			y: H * .5
		};
	}
	return {
		W,
		H,
		mobile,
		pad,
		Bw: mobile ? Math.min(W - 56, 340) : Bh * .8,
		Bh,
		sD: Hd / Bh,
		Hd,
		Wd: Hd * .8,
		deck,
		focus,
		frame,
		m,
		relay: relayDeck(W, H, mobile)
	};
}
/**
* Ventana (marco) del clip. Devuelve la transformación y el clip-path de la capa de tamaño natural `frame`
* para que se vea como una carta 4:5 (w=0) o a su tamaño completo (w=1).
*/
var filmOpening = (clipT) => smooth$1((clipT - .6) / .4);
function frameWindow(d, w, out, clipT = 0) {
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
	const s = Math.max(wh / F.h, wx / F.w);
	const ix = Math.max(0, (F.w - wx / s) / 2);
	const iy = Math.max(0, (F.h - wh / s) / 2);
	const radius = lerp(18, 18 * tail, w) / s;
	out.tx = cx - (F.x + F.w / 2);
	out.ty = cy - (F.y + F.h / 2);
	out.rot = rot;
	out.s = s;
	out.ix = ix;
	out.iy = iy;
	out.r = radius;
	return out;
}
/** Posición de la carta i: baraja → mazo del relevo (caja de «La mano de viaje»). Escribe en `out`. */
function cardPlace(d, st, i, out) {
	const { deck, mobile } = d;
	const bump = Math.sin(Math.PI * st.sh), ang = i * 2.4 + st.sh * 3;
	const rank = (i + Math.round(st.sh * 5)) % 12;
	const dk = {
		x: deck.x + DX[i] + Math.cos(ang) * d.Wd * (mobile ? .4 : .55) * bump,
		y: deck.y + DY[i] + Math.sin(ang) * d.Hd * (mobile ? .1 : .2) * bump,
		s: d.sD * .95,
		r: ROT[i] + (i % 2 ? 1 : -1) * 22 * bump + st.sh * (i % 3 - 1) * 4,
		o: mobile && i >= 5 && st.sh < .01 ? 0 : mobile && i >= 5 ? bump : 1,
		z: 22 - rank
	};
	const a = st.rel, R = d.relay, ts = R.h / d.Bh, k = ts / dk.s;
	out.x = lerp(dk.x, R.x + DX[i] * k, a);
	out.y = lerp(dk.y, R.y + DY[i] * k, a);
	out.s = lerp(dk.s, ts, a);
	out.r = lerp(dk.r, ROT[i], a);
	out.o = mobile ? dk.o * (1 - smooth$1(st.w / .2)) : st.w > .9 ? 0 : dk.o;
	out.z = dk.z;
	return out;
}
//#endregion
//#region src/tour-entry.js
var CARDS = "/media/baraja";
function tourEntry(slug) {
	const t = tours.find((x) => x.slug === slug), copy = inicioTextos.cartas[slug];
	const pool = t.gallery.filter((_, i) => i > 0 || slug === "tour-de-compras");
	const n = Math.min(7, pool.length), picked = Array.from({ length: n }, (_, k) => pool[Math.floor(k * pool.length / n)]);
	const g0 = t.gallery[0];
	const photos = [slug === "traslados-aeropuerto-jmc" ? {
		src: g0.src,
		srcSet: g0.srcset || `${g0.small} 640w, ${g0.src} ${g0.width}w`,
		width: g0.width,
		height: g0.height,
		small: g0.small || g0.src
	} : {
		src: `${CARDS}/${slug}-d.webp`,
		srcSet: `${CARDS}/${slug}-m.webp 400w, ${CARDS}/${slug}-d.webp 640w, ${CARDS}/${slug}-h.webp 960w`,
		width: 960,
		height: 1200,
		small: `${CARDS}/${slug}-t.webp`
	}, ...picked.map((p) => ({
		src: p.src,
		srcSet: p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`,
		width: p.width,
		height: p.height,
		small: p.small || p.src
	}))];
	return {
		slug,
		name: t.name,
		category: t.category,
		emocion: copy.emocion,
		frase: copy.frase,
		lugar: copy.lugar,
		photos
	};
}
//#endregion
//#region src/hand-geometria.js
var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var smooth = (t) => {
	t = clamp(t);
	return t * t * (3 - 2 * t);
};
var SLOTS = [
	{
		cx: .5,
		cy: .54,
		h: .76,
		r: 0,
		d: 1
	},
	{
		cx: .2,
		cy: .33,
		h: .4,
		r: -7,
		d: 1.5
	},
	{
		cx: .83,
		cy: .3,
		h: .38,
		r: 6,
		d: .6
	},
	{
		cx: .13,
		cy: .79,
		h: .34,
		r: 5,
		d: 1.2
	},
	{
		cx: .88,
		cy: .74,
		h: .4,
		r: -5,
		d: 1.7
	},
	{
		cx: .36,
		cy: .16,
		h: .27,
		r: 4,
		d: .5
	},
	{
		cx: .68,
		cy: .89,
		h: .28,
		r: -4,
		d: .8
	},
	{
		cx: .63,
		cy: .15,
		h: .26,
		r: 7,
		d: 1.1
	}
];
/**
* Coloca las fotos de un tour. `local` = progreso del tour (<0 antes de llegar, 0–1 durante, >1 al salir); `f` = índice de la foto delantera;
* `RW × RH` = región de la mano; `shrink` = factor de tamaño de las casillas; `mob` = móvil <768 px (foto central ≈ 70 % del ancho, satélites proporcionales).
* Devuelve los datos de la carta delantera (para el nombre del lugar bajo ella).
*/
function placePhotos(imgs, f, local, RW, RH, shrink, mob, keep) {
	const ls = clamp(local, 0, 1);
	let fr = null;
	imgs.forEach((img, k) => {
		const slotIdx = k === f ? 0 : k < f ? k + 1 : k, slot = SLOTS[slotIdx % SLOTS.length];
		const h = mob ? slot.h / .76 * Math.min(RH * .97, RW * .91) * (slotIdx === 0 ? 1 : .6) : slot.h * RH * shrink, w = h * .8;
		if (img._w !== w) {
			img.style.width = `${w}px`;
			img.style.height = `${h}px`;
			img._w = w;
		}
		const front = slotIdx === 0;
		const tIn = front ? 0 : .14 + .055 * (slotIdx - 1), eIn = local < 0 ? 0 : front ? smooth(ls / .15) : smooth((ls - tIn) / .22);
		const eOut = smooth((ls - (.86 + .012 * slotIdx)) / .14);
		const dirx = (slot.cx - .5) * 1.7, diry = (slot.cy - .5) * 1.7, inv = 1 - eIn;
		const par = (.5 - ls) * slot.d * .16 * RH, parx = (ls - .5) * slot.d * .035 * RW;
		const sc = (front ? .82 + .18 * eIn : .55 + .45 * eIn) * (1 + .04 * eOut) * (1 + .03 * (slot.d - 1) * (ls - .5));
		const rot = front ? slot.r - 6 * inv - 8 * eOut : slot.r * (.4 + .6 * eIn) + 14 * inv * Math.sign(dirx || 1) - 8 * eOut;
		const x = slot.cx * RW - w / 2 + (front ? 0 : dirx * RW * .5 * inv) + parx - eOut * RW * .3 * (.4 + slot.d * .3);
		const y = slot.cy * RH - h / 2 + (front ? .28 * RH * inv : diry * RH * .5 * inv) + par - eOut * RH * .45 * (.5 + slot.d * .25);
		let xx = x, yy = y;
		if (mob && keep) {
			const vw = w * sc, vh = h * sc, vl = xx + w / 2 - vw / 2, vt = yy + h / 2 - vh / 2;
			if (vl + vw > keep.l && vt + vh > keep.t) {
				const up = vt + vh - keep.t, left = vl + vw - keep.l;
				if (front || left < up) xx -= left;
				else yy -= up;
			}
		}
		const o = (front ? Math.max(1e-4, smooth(ls / .08) + (local < 0 ? 0 : 0)) : eIn) * (1 - eOut) * (local < 0 ? 0 : 1);
		img.style.transform = `translate3d(${xx.toFixed(1)}px,${yy.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
		img.style.opacity = o.toFixed(3);
		img.style.zIndex = String(front ? 30 : 2 + Math.round(slot.d * 4));
		if (front) fr = {
			x: xx,
			y: yy,
			w,
			h,
			sc,
			o,
			rot
		};
		img.style.pointerEvents = o > .6 && local >= 0 && local <= 1 ? "auto" : "none";
	});
	return fr;
}
/** Nombre del lugar en versalitas bajo la carta delantera: nunca sobre la foto y nunca cortado por la región. */
function placeLugar(lg, fr, ls, RH) {
	if (!lg || !fr) return;
	const ly = fr.y + fr.h / 2 + fr.h * fr.sc / 2 + 7;
	lg.style.transform = `translate3d(${(fr.x + fr.w / 2).toFixed(1)}px,${ly.toFixed(1)}px,0) translateX(-50%)`;
	lg.style.opacity = (fr.o * smooth((ls - .22) / .1) * clamp((RH - 3 - (ly + 26)) / 8)).toFixed(3);
}
var smallCaps = (t) => t.toLocaleLowerCase("es").replace(/(^|[\s·(-])(\p{L})/gu, (m, a, b) => a + b.toLocaleUpperCase("es"));
//#endregion
export { smooth as a, cardPlace as c, frameWindow as d, relayDeck as f, timeline as h, smallCaps as i, deckPose as l, stateAt as m, placeLugar as n, tourEntry as o, smooth$1 as p, placePhotos as r, buildDims as s, clamp as t, filmOpening as u };
