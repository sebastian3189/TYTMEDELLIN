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
* `RW × RH` = región de la mano; `shrink` = factor de tamaño de las casillas; `mob` = móvil <768 px (foto central = 70 % de su tamaño anterior por pedido del usuario 2026-10-14; los satélites no cambian).
* Devuelve los datos de la carta delantera (para el nombre del lugar bajo ella).
*/
function placePhotos(imgs, f, local, RW, RH, shrink, mob, keep) {
	const ls = clamp(local, 0, 1);
	let fr = null;
	imgs.forEach((img, k) => {
		const slotIdx = k === f ? 0 : k < f ? k + 1 : k, slot = SLOTS[slotIdx % SLOTS.length];
		const h = mob ? slot.h / .76 * Math.min(RH * .97, RW * .91) * (slotIdx === 0 ? .7 : .6) : slot.h * RH * shrink, w = h * .8;
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
export { smooth as a, smallCaps as i, placeLugar as n, placePhotos as r, clamp as t };
