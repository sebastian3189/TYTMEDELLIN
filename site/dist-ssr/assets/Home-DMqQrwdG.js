import { D as useMedia, E as useLightMotion, G as whatsapp, H as jsx, I as PlayIcon, K as language, L as SoundIcon, M as inicioTextos, N as textoFase, R as Icon, U as jsxs, V as Fragment, a as tours, b as Arrow, d as Button, f as Eyebrow, j as CHAPTERS, m as Picture, q as t, r as nosotros, t as articles, u as Logo, y as GoogleBadgeStatic, z as SocialIcon } from "../entry-server.js";
import { n as useGlassPill, t as GlassPill } from "./glass-nEhUSRvx.js";
import { a as tourEntry, c as prepVideo, l as safePlay, n as HeroBlock, o as inicioVideos, s as instagram } from "./Hero-MO5IjHIT.js";
import { t as Reviews } from "./Reviews-CLKwcIeX.js";
import { a as FAQ_HOME, l as Faq } from "./faq-data-BaHZP5K7.js";
import { a as smooth$1, r as placePhotos } from "./mobile-motion-o2zoinXe.js";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
var inicio_frames_default = {
	source: "clip1d-1080p.mp4",
	fps: 24,
	desktop: {
		"count": 121,
		"step": 1,
		"width": 1920,
		"height": 1080,
		"quality": 82
	},
	mobile: {
		"count": 121,
		"step": 1,
		"width": 778,
		"height": 1080,
		"quality": 82,
		"tail": {
			"from": 96,
			"window": [778, 1300],
			"background": "#F4F4F4"
		}
	},
	poster: {
		"desktop": [1600, 900],
		"mobile": [648, 900]
	},
	ambient: ["data:image/webp;base64,UklGRgICAABXRUJQVlA4IPYBAABwCwCdASpAADAAPs1So0unpKMhrVzMkPAZiWQAx5qgfirhN2yv/9L/s1nwnGLU1bOT0ft4TVjO6kBRfnxkCeFquGrf0nWLzxrg0Kd6RaCtMmIW/Wqbawf5snJ7BuPU3pk2G4cAAP6e6YBeySc31zma12tIzhcczaw9//mPfIq3RyLf/zSvna71y8I3O4950HnXrO42OW7zyjNVZR5W7NGt+MUSqPeERxHKDb5Nmv9DxHnqe/9Tha+C08+vfGKJ7PmFcbuNK4HTEPimAL/tmyQeKbl9XYcCuzO7iWrayrPGIItcFgMU8uKhXdtSJs8y88Ic+9C6Ye6+SNji0guar7FGpRQK4ghIAjI0yADUwzlG3TedQ+jUrrclfmDgVnuKlOSy92LIaiXvM4TMP1vVaRJ03nvKC2+eo2TsvLkNDRZPg8GuVlGGxjrMhxcL+5BNWKT6LYY2D4o0UFp8mBdZ1RkAfdouF57Tse9xbWlbdFSdVZdwBQ2cAiqQipdgazj2ysq6ED8HyvsbrEQ4JYA84PAI+8vowplHjKZG3vuYgRKbCJeFg2Kh1LeoItVl83QJIDX1GKIdkfTKtPn/i7jimsF8lFtTdnr4E2FR7tYfALRV5GWacIu1PYKjaegu0yEjEX9FkFPQTDXrPGzVPs1kJ7WiR33IgAAA", "data:image/webp;base64,UklGRkQDAABXRUJQVlA4IDgDAABwDgCdASpAADAAPrlInEunJCKhtV39+OAXCWQArz+WvchIfXfeX5IQYxxZwMuDTTtEph2LikiXZM7Rm8zcAaQdnYjP49P9ascTqK3R8Ux4K0At89AHcbEa29qC24WR0qlwg6BVoxzp5KigefwSTLfh5lpn/8aFjLQXmYAAAP6exWW1UG93P92cwy8TjkiPGzZwxRj077nsuyOP3mNR83hpIdoxwXX8niX4jWUhHVTkX4Vn7ry88Gv5dNEwkORYRxM6XUsYuWdvXExACEBB/7FX0b5jFKf1TyDx4SWU3MtgWw6exC+av/utvn3CifxcqHBbGyfr+yuL0xU1IX2erqv2abt30391jyTAMMbbnBJUGUELUthX0PydJCehTC4JvBBiMZLSzwHjvsevQKFGl0AtbsLk08j9SKnbTR5Dt+fg3VU3VNiG2dt+5cVHkNTZjoT1SROiaEIN6kwerAQ3JiqhJ+J1N/4FpIkMzn+465BRmIELp+2wqN9kZtOPaFCXQN5YuzwM0mjwbXqG5WTc11ESZllqpL8LtGv4XCXKaQ2Afxy/9ox6UKjhuHAJ7lxW6xZDw8mpBaDSz3e0UUle5ZgbWs+2IEz94ndQ7N5GbNHaxdxEDjzb9TDekgel7LKGokr294isSAJWnIVFiOfLc3dQ4M+yrfrGdt/cZPCyMgls5vRbLR7GibKlwv12XaWmRfXMtsx+DCs5HySaeXa/Oixhae6ANwgJAlLoOvtYvSrSioVJyf/5aTR2nzEYhbHlR5s1r0w6g94HUWpZpvAYxBhvnvEBQ9QubfRW0H0/JImHUBCMaaGU4alyY08m/vhPVXk8TastZLBypeHZ5K+xsoLhNjB5C3fJmttQjlFouk7XsMRiOWD6f8qn+r76aYs41LCmQbZxxhFYqQoPNLziDL320s3M3O2nBUzyGIirvBriPdU+z4g/WDhvLCB+WgdIXd8Rt65yQ90FOHeG3wqq/agq3oxuheCZe4wZpemaGZxW0btK0chTtvBWotbKNvMZLVmjlYChJXqChkDZiCMXlJIJiZM6G1WaD/FXqX+sN0M97vuQtUoyGBbCtVcECDnvLRcC58y/docAAA=="],
	desktop1600: {
		"count": 121,
		"step": 1,
		"width": 1600,
		"height": 900,
		"quality": 74
	}
};
var clamp$3 = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var lerp = (a, b, t) => a + (b - a) * t;
var smooth = (t) => {
	t = clamp$3(t);
	return t * t * (3 - 2 * t);
};
/** Límites del recorrido en svh. Fase del clip: 165 svh escritorio / 140 svh móvil (ajuste aprobado, se conserva). Desde 2026-10-23 escritorio y móvil terminan en el último fotograma (sin contracción ni relevo; `film: true`). */
function timeline(mobile) {
	if (mobile) {
		const t0 = 24, t1 = 64, t2 = 204, t3 = 248;
		return {
			t0,
			t1,
			t2,
			t3,
			t4: t3,
			t5: t3,
			t6: t3,
			total: t3,
			clip: 140,
			film: true
		};
	}
	const t0 = 30, t1 = 80, t2 = 245, t3 = 260;
	return {
		t0,
		t1,
		t2,
		t3,
		t4: t3,
		t5: t3,
		t6: t3,
		total: 294,
		clip: 165,
		film: true
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
	if (T.film) return {
		ui: u >= T.t1 ? "clip" : u >= T.t0 ? "flip" : "deck",
		w: u < T.t0 ? 0 : u < T.t1 ? smooth((u - T.t0) / (T.t1 - T.t0)) : 1,
		D: u < T.t1 ? 1 - smooth((u - T.t0) / (.45 * (T.t1 - T.t0))) : 0,
		clipT: clamp$3((u - T.t1) / (T.t2 - T.t1)),
		rel: 0,
		fade: 0,
		sh: clamp$3(u / T.t0)
	};
	let ui = "deck";
	if (u >= T.t0) ui = "flip";
	if (u >= T.t1) ui = "clip";
	if (u >= T.t3) ui = "shrink";
	if (u >= T.t4) ui = "relay";
	let w = 0;
	if (u >= T.t0 && u < T.t1) w = smooth((u - T.t0) / (T.t1 - T.t0));
	else if (u >= T.t1 && u < T.t3) w = 1;
	else if (u >= T.t3 && u < T.t4) w = 1 - smooth((u - T.t3) / (T.t4 - T.t3));
	let D;
	if (u < T.t1) D = 1 - smooth((u - T.t0) / (.45 * (T.t1 - T.t0)));
	else if (u < T.t3) D = 0;
	else if (u < T.t4) D = mobile ? 0 : smooth((u - T.t3 - .3 * (T.t4 - T.t3)) / (.7 * (T.t4 - T.t3)));
	else D = mobile ? 0 : 1 - smooth((u - T.t4) / (.12 * (T.t5 - T.t4)));
	const clipT = clamp$3((u - T.t1) / (T.t2 - T.t1));
	const rel = smooth((u - T.t4) / (T.t5 - T.t4));
	const fade = clamp$3((u - T.t5) / (T.total - T.t5));
	const sh = clamp$3(u / T.t0);
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
		x: W - clamp$3(W * .05, 22, 88) - h * .4 - 8,
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
	const pad = clamp$3(W * .05, 22, 88);
	let Bh, Hd, deck, focus, m = null;
	if (mobile) {
		const A = H - 200, line = clamp$3((W - 44) / 10.5, 28, 40) * 1.05 * 2, short = A < 480;
		const t1Top = short ? 12 : 40, gapT = 16, pb = 12;
		const rotAllow = (hd) => hd * .4 * Math.sin(6.5 * Math.PI / 180) + 8;
		Hd = clamp$3(A - (t1Top + line + gapT + pb) - 2 * rotAllow(300), 150, 300) * .89;
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
		Bh = clamp$3(H * .64, 280, 640);
		Hd = clamp$3(H * .366, 260, 425);
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
var filmOpening = (clipT) => smooth((clipT - .6) / .4);
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
	out.o = mobile ? dk.o * (1 - smooth(st.w / .2)) : st.w > .9 ? 0 : dk.o;
	out.z = dk.z;
	return out;
}
//#endregion
//#region src/ScrubHero.jsx
var BASE = "/media/inicio";
var CARDS = "/media/baraja";
var MOBILE_QUERY = "(max-width: 799px)";
var REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
var LOW_HEIGHT_QUERY = "(max-height: 560px)";
var REDUCE_KEY$1 = "tyt-reducir-movimiento";
var WINDOW = {
	desktop: {
		ahead: 14,
		behind: 4
	},
	mobile: {
		ahead: 10,
		behind: 3
	}
};
var ANCHOR = 8;
var TAU = {
	desktop: 60,
	mobile: 50
};
var JUMP = .12;
var SETTLE = 3e-4;
var FLOATS = [
	[
		.06,
		.5,
		130,
		.3,
		2,
		-4,
		0,
		16
	],
	[
		.2,
		.66,
		120,
		.15,
		7,
		3,
		0,
		12
	],
	[
		.8,
		.22,
		140,
		.2,
		4,
		4,
		0,
		14
	],
	[
		.9,
		.46,
		124,
		.3,
		10,
		-3,
		0,
		16
	],
	[
		.015,
		.3,
		92,
		.55,
		1,
		5,
		.5,
		30
	],
	[
		.05,
		.74,
		110,
		.1,
		5,
		-5,
		0,
		8
	],
	[
		.7,
		.76,
		108,
		.45,
		0,
		3,
		.4,
		26
	],
	[
		.86,
		.68,
		98,
		.6,
		8,
		-6,
		.6,
		34
	],
	[
		.73,
		.07,
		88,
		.5,
		9,
		4,
		.6,
		30
	]
];
var FLOATS_M = [
	[
		.04,
		.7,
		72,
		.06,
		5,
		-5,
		0,
		0
	],
	[
		.7,
		.72,
		66,
		.1,
		8,
		5,
		.5,
		0
	],
	[
		.76,
		.215,
		52,
		.05,
		0,
		4,
		.4,
		0
	]
];
var clamp$2 = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var readReduce$1 = () => {
	try {
		return localStorage.getItem(REDUCE_KEY$1) === "1";
	} catch {
		return false;
	}
};
var writeReduce = (on) => {
	try {
		if (on) localStorage.setItem(REDUCE_KEY$1, "1");
		else localStorage.removeItem(REDUCE_KEY$1);
	} catch {}
};
var osReduce = () => typeof window !== "undefined" && window.matchMedia(REDUCE_QUERY).matches;
var prefersStatic$1 = (user) => {
	if (typeof window === "undefined") return true;
	return Boolean(user || osReduce() || window.matchMedia(LOW_HEIGHT_QUERY).matches);
};
function frameOrder(count, mobile) {
	const seen = /* @__PURE__ */ new Set(), order = [];
	for (const step of mobile ? [
		10,
		5,
		2,
		1
	] : [
		15,
		5,
		2,
		1
	]) for (let i = 0; i < count; i += step) if (!seen.has(i)) {
		seen.add(i);
		order.push(i);
	}
	if (!seen.has(count - 1)) order.splice(1, 0, count - 1);
	return order;
}
var cardImg = (slug, k) => `${CARDS}/${slug}-${k}.webp`;
var two$3 = (n) => String(n).padStart(2, "0");
function ScrubHero({ cards, skipLabel = "Saltar introducción", nextId, summary }) {
	const root = useRef(null), track = useRef(null), stage = useRef(null), canvas = useRef(null), skipRef = useRef(null), media = useRef(null);
	const haloRef = useRef(null), floatRef = useRef(null), deckRef = useRef(null), titleRef = useRef(null), stackRef = useRef(null);
	const [ready, setReady] = useState(false);
	const [reduce, setReduce] = useState(false);
	const [mode, setMode] = useState("static");
	const tightKey = useRef("");
	const [mobile, setMobile] = useState(false);
	const reduceRef = useRef(reduce);
	reduceRef.current = reduce;
	useLayoutEffect(() => {
		const user = readReduce$1();
		reduceRef.current = user;
		setReduce(user);
		setMobile(window.matchMedia(MOBILE_QUERY).matches);
		setMode(prefersStatic$1(user) ? "static" : "scrub");
		setReady(true);
	}, []);
	const osNow = ready && osReduce();
	useEffect(() => {
		const queries = [REDUCE_QUERY, LOW_HEIGHT_QUERY].map((q) => window.matchMedia(q));
		const size = window.matchMedia(MOBILE_QUERY);
		const onReduce = () => setMode((m) => prefersStatic$1(reduceRef.current) ? "static" : m === "failed" || m === "tight" ? m : "scrub");
		const onSize = () => setMobile(size.matches);
		const onResize = () => setMode((m) => m === "tight" && tightKey.current !== `${innerWidth}x${innerHeight}` ? prefersStatic$1(reduceRef.current) ? "static" : "scrub" : m);
		queries.forEach((q) => q.addEventListener("change", onReduce));
		size.addEventListener("change", onSize);
		window.addEventListener("resize", onResize);
		return () => {
			queries.forEach((q) => q.removeEventListener("change", onReduce));
			size.removeEventListener("change", onSize);
			window.removeEventListener("resize", onResize);
		};
	}, []);
	const toggleReduce = () => {
		const next = !reduce;
		writeReduce(next);
		setReduce(next);
		reduceRef.current = next;
		window.dispatchEvent(new Event("tyt-motion"));
		setMode((m) => prefersStatic$1(next) ? "static" : m === "failed" || m === "tight" ? m : "scrub");
	};
	useLayoutEffect(() => {
		if (!ready || mode !== "scrub") return void 0;
		const section = root.current, trackEl = track.current, stageEl = stage.current, cv = canvas.current, mediaEl = media.current, ctx = cv?.getContext("2d", { alpha: false });
		if (!ctx || typeof createImageBitmap !== "function") {
			setMode("failed");
			return;
		}
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";
		const T = timeline(mobile);
		const wide = !mobile && innerWidth > 1600;
		const set = wide ? inicio_frames_default.desktop : inicio_frames_default.desktop1600;
		const suffix = wide ? "d" : "d16";
		const tau = mobile ? TAU.mobile : TAU.desktop;
		const win = mobile ? WINDOW.mobile : WINDOW.desktop;
		let dir = 1, prevCenter = 0;
		const count = set.count;
		const PLAZA = T.t1 + .7 * (T.t2 - T.t1), CAP_C1 = [T.t0 + .5 * (T.t1 - T.t0), PLAZA];
		const CAP_C2 = [PLAZA, T.film ? Infinity : T.t3 + .5 * (T.t4 - T.t3)];
		const blobs = new Array(count).fill(null), full = new Array(count).fill(null), low = new Array(count).fill(null);
		const pending = /* @__PURE__ */ new Set(), controller = new AbortController();
		let raf = 0, visible = true, destroyed = false, lastKey = "", ui = "", cap = "", chapter = 0, loaded = 0, failures = 0;
		let W = 0, H = 0, stageTop = 92, q = null, lastT = 0, center = 0, version = 0, live = 0, peak = 0, bytes = 0, peakBytes = 0, dims = null, span = 1;
		const fw = {}, cp = {}, lastCard = new Array(12).fill(""), lastFx = {};
		const cardEls = deckRef.current ? [...deckRef.current.querySelectorAll(".bd-card")] : [];
		const fxEls = titleRef.current ? [...titleRef.current.querySelectorAll("[data-fx]")] : [];
		const floatEls = floatRef.current ? [...floatRef.current.querySelectorAll(".bd-float")] : [];
		const haloEl = haloRef.current;
		const track2 = (delta, size) => {
			live += delta;
			bytes += delta * size;
			if (live > peak) peak = live;
			if (bytes > peakBytes) peakBytes = bytes;
			section.dataset.bitmaps = String(live);
			section.dataset.bitmapsPeak = String(peak);
			section.dataset.bitmapMb = (bytes / 1048576).toFixed(1);
			section.dataset.bitmapMbPeak = (peakBytes / 1048576).toFixed(1);
		};
		const drop = (list, i) => {
			const b = list[i];
			if (b) {
				list[i] = null;
				track2(-1, b.width * b.height * 4);
				b.close();
			}
		};
		const fits = () => {
			if (stageEl.offsetHeight + stageTop > innerHeight + 1) return false;
			const box = stageEl.getBoundingClientRect(), tol = 1;
			return [...stageEl.querySelectorAll(".scrub-stack, .scrub-actions a, .scrub-index, .scrub-skip, .scrub-motion")].every((el) => {
				const r = el.getBoundingClientRect();
				return r.width === 0 || r.top >= box.top - tol && r.bottom <= box.bottom + tol && r.left >= box.left - tol && r.right <= box.right + tol;
			});
		};
		const measure = () => {
			const header = document.querySelector(".site-header")?.offsetHeight || 92;
			stageTop = header;
			if (section.style.getPropertyValue("--scrub-top") !== `${header}px`) section.style.setProperty("--scrub-top", `${header}px`);
			if (!fits()) {
				tightKey.current = `${innerWidth}x${innerHeight}`;
				setMode("tight");
				return;
			}
			let ratio = Math.min(window.devicePixelRatio || 1, mobile ? 2.5 : 2);
			if (!mobile) ratio = Math.min(ratio, 2560 / Math.max(1, mediaEl.offsetWidth));
			W = Math.max(1, Math.round(mediaEl.offsetWidth * ratio));
			H = Math.max(1, Math.round(mediaEl.offsetHeight * ratio));
			if (cv.width !== W || cv.height !== H) {
				cv.width = W;
				cv.height = H;
				ctx.imageSmoothingEnabled = true;
				ctx.imageSmoothingQuality = "high";
			}
			dims = buildDims(stageEl.clientWidth, stageEl.clientHeight, mobile, {
				x: mediaEl.offsetLeft,
				y: mediaEl.offsetTop,
				w: mediaEl.offsetWidth,
				h: mediaEl.offsetHeight
			});
			stageEl.style.setProperty("--bw", `${dims.Bw}px`);
			stageEl.style.setProperty("--bh", `${dims.Bh}px`);
			stageEl.style.setProperty("--stage-h", `${stageEl.clientHeight}px`);
			if (dims.m) {
				stageEl.style.setProperty("--m-t1", `${dims.m.t1Top}px`);
				stageEl.dataset.short = dims.m.short ? "1" : "0";
			}
			stageEl.style.setProperty("--deck-x", `${dims.deck.x}px`);
			stageEl.style.setProperty("--deck-y", `${dims.deck.y}px`);
			stageEl.style.setProperty("--deck-h", `${dims.Hd}px`);
			stageEl.style.setProperty("--deck-top", `${dims.deck.y - dims.Hd / 2}px`);
			stageEl.style.setProperty("--deck-bottom", `${dims.deck.y + dims.Hd / 2}px`);
			lastCard.fill("");
			Object.keys(lastFx).forEach((k) => delete lastFx[k]);
			lastKey = "";
		};
		const nearest = (i) => {
			for (let d = 0; d < count; d++) for (const j of [i - d, i + d]) {
				if (full[j]) return full[j];
				if (low[j]) return low[j];
			}
			return null;
		};
		const cover = (img, clipT) => {
			const tail = mobile ? filmOpening(clipT) : 0;
			const visibleH = H + (W * 9 / 16 - H) * tail;
			const iw = img.width, ih = img.height, sc = Math.max(W / iw, visibleH / ih), w = iw * sc, h = ih * sc;
			const focusX = mobile ? .465 + .035 * tail : .5;
			ctx.drawImage(img, -(w - W) * focusX, (H - h) / 2, w, h);
		};
		const decode = (key, blob, options, apply) => {
			if (pending.has(key) || !blob) return;
			pending.add(key);
			createImageBitmap(blob, options).then((bitmap) => {
				pending.delete(key);
				apply(bitmap);
			}, () => pending.delete(key));
		};
		const manage = () => {
			if (center !== prevCenter) {
				dir = center > prevCenter ? 1 : -1;
				prevCenter = center;
			}
			const lo = center - (dir > 0 ? win.behind : win.ahead), hi = center + (dir > 0 ? win.ahead : win.behind);
			for (let d = 0; d <= Math.max(win.ahead, win.behind); d++) for (const i of d ? [center + dir * d, center - dir * d] : [center]) {
				if (i < lo || i > hi || i < 0 || i >= count || full[i] || !blobs[i]) continue;
				decode(`f${i}`, blobs[i], void 0, (bitmap) => {
					if (destroyed || i < center - win.ahead - 2 || i > center + win.ahead + 2 || full[i]) {
						bitmap.close();
						return;
					}
					full[i] = bitmap;
					track2(1, bitmap.width * bitmap.height * 4);
					version++;
					schedule();
				});
			}
			for (let i = 0; i < count; i++) {
				if (full[i] && (i < lo - 2 || i > hi + 2)) drop(full, i);
				if (i % ANCHOR === 0 && !low[i] && blobs[i]) decode(`l${i}`, blobs[i], {
					resizeWidth: Math.round(set.width / 2),
					resizeQuality: "medium"
				}, (bitmap) => {
					if (destroyed || low[i]) {
						bitmap.close();
						return;
					}
					low[i] = bitmap;
					track2(1, bitmap.width * bitmap.height * 4);
					version++;
					schedule();
				});
			}
		};
		const place = (u, st) => {
			frameWindow(dims, st.w, fw, st.clipT);
			const fullFrame = st.w >= .999 && (!mobile || st.clipT <= .6);
			const fkey = fullFrame ? "full" : `${st.D.toFixed(2)}|${fw.tx.toFixed(1)}|${fw.ty.toFixed(1)}|${fw.rot.toFixed(2)}|${fw.s.toFixed(4)}|${fw.ix.toFixed(1)}|${fw.iy.toFixed(1)}|${fw.r.toFixed(2)}`;
			const fo = 1 - smooth(clamp$2(st.rel * 2.5));
			const mkey = `${fkey}|${fo.toFixed(3)}`;
			if (lastFx.media !== mkey) {
				lastFx.media = mkey;
				if (fullFrame) {
					mediaEl.style.transform = "none";
					mediaEl.style.clipPath = "none";
				} else {
					mediaEl.style.transform = `translate3d(${fw.tx}px,${fw.ty}px,0) rotate(${fw.rot}deg) scale(${fw.s})`;
					mediaEl.style.clipPath = `inset(${fw.iy}px ${fw.ix}px round ${fw.r}px)`;
				}
				if (!mobile) {
					mediaEl.style.setProperty("--ix", fw.ix.toFixed(1));
					mediaEl.style.setProperty("--iy", fw.iy.toFixed(1));
					mediaEl.style.setProperty("--s", fw.s.toFixed(4));
					mediaEl.style.setProperty("--deco", (st.w >= .3 ? 0 : (1 - smooth(st.w / .3)) * st.D).toFixed(3));
				}
				mediaEl.style.opacity = String(fo);
				mediaEl.style.visibility = fo < .01 ? "hidden" : "visible";
			}
			for (let i = 0; i < cardEls.length; i++) {
				cardPlace(dims, st, i, cp);
				const key = `${cp.x.toFixed(1)}|${cp.y.toFixed(1)}|${cp.r.toFixed(2)}|${cp.s.toFixed(4)}|${cp.o.toFixed(3)}|${cp.z}`;
				if (key === lastCard[i]) continue;
				lastCard[i] = key;
				const el = cardEls[i];
				el.style.transform = `translate3d(${cp.x - dims.Bw / 2}px,${cp.y - dims.Bh / 2}px,0) rotate(${cp.r}deg) scale(${cp.s})`;
				el.style.opacity = cp.o.toFixed(3);
				el.style.zIndex = String(cp.z);
				el.style.setProperty("--inv", (1 / cp.s).toFixed(3));
			}
			if (haloEl && !mobile) haloEl.style.opacity = (st.D * .9).toFixed(3);
			const dKey = st.D.toFixed(3), dOp = mobile ? clamp$2(st.D * 2 - 1) : st.D, dMove = mobile ? .035 : .05;
			if (lastFx.d !== dKey) {
				lastFx.d = dKey;
				for (const el of fxEls) {
					const dir = Number(el.dataset.fx || 0);
					el.style.opacity = dOp.toFixed(3);
					el.style.transform = dir ? `translate3d(0,${(1 - st.D) * dir * dims.H * dMove}px,0)` : "";
					el.style.visibility = dOp < .01 ? "hidden" : "visible";
				}
			}
			const fp = clamp$2(u / T.t1), fk = `${fp.toFixed(3)}|${dKey}`;
			if (floatEls.length && lastFx.f !== fk) {
				lastFx.f = fk;
				for (const el of floatEls) {
					const dp = Number(el.dataset.dp), x = Number(el.dataset.fx) * dims.W, y = Number(el.dataset.fy) * dims.H - dp * 720 * fp, k = Number(el.dataset.k);
					const e = smooth(clamp$2(st.D * 1.7 - k * .1));
					el.style.transform = `translate3d(${x}px,${y + (1 - e) * 26}px,0) rotate(${Number(el.dataset.rot) * (.4 + .6 * e)}deg) scale(${(.82 + .18 * e).toFixed(3)})`;
					el.style.opacity = e.toFixed(3);
					el.style.visibility = e < .01 ? "hidden" : "visible";
				}
			}
			const fadeKey = st.fade.toFixed(3);
			if (lastFx.fade !== fadeKey) {
				lastFx.fade = fadeKey;
				stageEl.style.opacity = st.fade > 0 ? String(1 - st.fade) : "";
				stageEl.style.pointerEvents = st.fade >= 1 ? "none" : "";
			}
		};
		const render = (now) => {
			raf = 0;
			if (destroyed || !visible || document.hidden) {
				lastT = 0;
				return;
			}
			const rect = trackEl.getBoundingClientRect();
			span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight);
			const target = clamp$2((stageTop - rect.top) / span);
			const dt = lastT ? Math.min(64, now - lastT) : 16;
			lastT = now;
			if (q === null || Math.abs(target - q) > JUMP) q = target;
			else q += (target - q) * (1 - Math.exp(-dt / tau));
			let moving = true;
			if (Math.abs(target - q) < SETTLE) {
				q = target;
				moving = false;
			}
			const u = q * T.total;
			const st = stateAt(u, T, mobile);
			if (mobile) stageEl.dataset.phase = u < T.t2 ? "film" : u < T.t3 ? "hold" : u < T.t4 ? "shrink" : "relay";
			if (st.ui !== ui) {
				ui = st.ui;
				stageEl.dataset.ui = ui;
			}
			let newCap = "";
			if (u >= CAP_C1[0] && u < CAP_C1[1]) newCap = "c1";
			else if (u >= CAP_C2[0] && u < CAP_C2[1]) newCap = "c2";
			if (newCap !== cap) {
				cap = newCap;
				stageEl.dataset.cap = cap;
			}
			const newChapter = u >= PLAZA ? 2 : 1;
			if (newChapter !== chapter) {
				chapter = newChapter;
				stageEl.dataset.ch = String(chapter);
			}
			center = Math.round(st.clipT * (count - 1));
			manage();
			const baseIdx = Math.round(st.clipT * (count - 1));
			const baseImg = nearest(baseIdx);
			const key = `${W}x${H}|${baseIdx}|${version}|${mobile ? st.clipT.toFixed(5) : ""}`;
			if (key !== lastKey && baseImg) {
				lastKey = key;
				ctx.fillStyle = "#3C3F3B";
				ctx.fillRect(0, 0, W, H);
				cover(baseImg, st.clipT);
				section.dataset.frame = String(baseIdx);
				section.dataset.ready = "true";
			}
			if (dims) place(u, st);
			section.dataset.progress = q.toFixed(4);
			section.dataset.target = target.toFixed(4);
			section.dataset.settled = moving ? "false" : "true";
			section.dataset.u = u.toFixed(1);
			if (moving) schedule();
			else lastT = 0;
		};
		const schedule = () => {
			if (!raf && !destroyed) raf = requestAnimationFrame(render);
		};
		const fetchBlob = async (url) => {
			const response = await fetch(url, { signal: controller.signal });
			if (!response.ok) throw new Error(String(response.status));
			return response.blob();
		};
		const load = async () => {
			await new Promise((resolve) => window.requestIdleCallback ? window.requestIdleCallback(resolve, { timeout: 1500 }) : setTimeout(resolve, 200));
			const thumbs = [...stageEl.querySelectorAll(".bd-thumb")].filter((im) => !im.complete);
			if (thumbs.length) await Promise.race([Promise.all(thumbs.map((im) => new Promise((resolve) => {
				im.addEventListener("load", resolve, { once: true });
				im.addEventListener("error", resolve, { once: true });
			}))), new Promise((resolve) => setTimeout(resolve, 3e3))]);
			if (destroyed) return;
			const queue = frameOrder(count, mobile);
			let cursor = 0;
			const worker = async () => {
				while (!destroyed && cursor < queue.length) {
					const i = queue[cursor++];
					try {
						const blob = await fetchBlob(`${BASE}/${suffix}/${String(i + 1).padStart(3, "0")}.webp`);
						if (destroyed) return;
						blobs[i] = blob;
						loaded++;
						section.dataset.loaded = String(loaded);
						schedule();
					} catch (error) {
						if (controller.signal.aborted) return;
						failures++;
						if (failures >= 3 && !blobs.some(Boolean)) {
							setMode("failed");
							return;
						}
					}
				}
			};
			await Promise.all([
				worker(),
				worker(),
				worker(),
				worker()
			]);
		};
		const onScroll = () => schedule();
		const onVisibility = () => {
			if (!document.hidden) {
				lastKey = "";
				lastT = 0;
				schedule();
			} else if (raf) {
				cancelAnimationFrame(raf);
				raf = 0;
			}
		};
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) {
				lastKey = "";
				lastT = 0;
				schedule();
			} else if (raf) {
				cancelAnimationFrame(raf);
				raf = 0;
			}
		}, { rootMargin: "200px 0px" });
		const resize = new ResizeObserver(() => {
			measure();
			schedule();
		});
		measure();
		if (dims) {
			q = clamp$2((stageTop - trackEl.getBoundingClientRect().top) / Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight));
			span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight);
			const st0 = stateAt(q * T.total, T, mobile);
			stageEl.dataset.ui = ui = st0.ui;
			place(q * T.total, st0);
		}
		observer.observe(section);
		resize.observe(cv);
		resize.observe(stageEl);
		document.fonts?.ready.then(() => {
			if (!destroyed) {
				measure();
				schedule();
			}
		});
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		document.addEventListener("visibilitychange", onVisibility);
		schedule();
		let started = false;
		const start = () => {
			if (started || destroyed) return;
			started = true;
			for (const el of floatEls) if (el.dataset.bg) el.style.backgroundImage = `url(${el.dataset.bg})`;
			load();
		};
		const near = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				start();
				near.disconnect();
			}
		}, { rootMargin: "60% 0px" });
		near.observe(section);
		let pmRaf = 0, pmX = 0, pmY = 0, hovered = null;
		const fine = matchMedia("(hover: hover) and (pointer: fine)").matches && floatEls.length > 0;
		const pmTick = () => {
			pmRaf = 0;
			const box = stageEl.getBoundingClientRect();
			floatRef.current?.style.setProperty("--mx", (((pmX - box.left) / box.width - .5) * 2).toFixed(3));
			floatRef.current?.style.setProperty("--my", (((pmY - box.top) / box.height - .5) * 2).toFixed(3));
			let hit = null;
			for (const el of floatEls) {
				if (el.style.visibility === "hidden" || Number(el.style.opacity) < .6) continue;
				const r = el.getBoundingClientRect();
				if (pmX >= r.left && pmX <= r.right && pmY >= r.top && pmY <= r.bottom) hit = el;
			}
			if (hit !== hovered) {
				hovered?.removeAttribute("data-hover");
				hit?.setAttribute("data-hover", "true");
				hovered = hit;
			}
		};
		const onPointer = (e) => {
			pmX = e.clientX;
			pmY = e.clientY;
			if (!pmRaf) pmRaf = requestAnimationFrame(pmTick);
		};
		const onLeave = () => {
			floatRef.current?.style.setProperty("--mx", "0");
			floatRef.current?.style.setProperty("--my", "0");
			hovered?.removeAttribute("data-hover");
			hovered = null;
		};
		if (fine) {
			stageEl.addEventListener("pointermove", onPointer, { passive: true });
			stageEl.addEventListener("pointerleave", onLeave);
		}
		return () => {
			cancelAnimationFrame(pmRaf);
			stageEl.removeEventListener("pointermove", onPointer);
			stageEl.removeEventListener("pointerleave", onLeave);
			destroyed = true;
			controller.abort();
			cancelAnimationFrame(raf);
			observer.disconnect();
			resize.disconnect();
			near.disconnect();
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			document.removeEventListener("visibilitychange", onVisibility);
			for (let i = 0; i < count; i++) {
				drop(full, i);
				drop(low, i);
			}
			blobs.fill(null);
			for (const k of [
				"ready",
				"frame",
				"loaded",
				"progress",
				"target",
				"settled",
				"u",
				"bitmaps",
				"bitmapsPeak",
				"bitmapMb",
				"bitmapMbPeak"
			]) delete section.dataset[k];
			for (const el of [
				mediaEl,
				haloEl,
				...floatEls,
				...cardEls,
				...fxEls
			]) el?.removeAttribute("style");
			stageEl.style.opacity = "";
			stageEl.style.pointerEvents = "";
			stageEl.dataset.ui = "deck";
			stageEl.dataset.cap = "";
			stageEl.dataset.ch = "1";
			for (const k of [
				"--bw",
				"--bh",
				"--stage-h",
				"--m-t1",
				"--deck-top",
				"--deck-bottom",
				"--deck-x",
				"--deck-y",
				"--deck-h"
			]) stageEl.style.removeProperty(k);
			delete stageEl.dataset.short;
			delete stageEl.dataset.phase;
		};
	}, [
		ready,
		mode,
		mobile
	]);
	const skip = () => {
		const next = nextId && document.getElementById(nextId) || document.getElementById("formas-de-viajar");
		if (!next) return;
		next.scrollIntoView({
			behavior: "instant",
			block: "start"
		});
		next.focus({ preventScroll: true });
	};
	const staticMode = mode !== "scrub";
	const animated = !staticMode;
	const t = inicioTextos;
	const bar = /* @__PURE__ */ jsxs("button", {
		type: "button",
		className: "scrub-motion",
		"aria-pressed": reduce || osNow,
		disabled: osNow,
		onClick: toggleReduce,
		title: reduce || osNow ? "Activar movimiento" : "Reducir movimiento",
		children: [/* @__PURE__ */ jsx("svg", {
			className: "ctl-ico",
			viewBox: "0 0 24 24",
			width: "18",
			height: "18",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: reduce || osNow ? /* @__PURE__ */ jsx("path", { d: "M8 5.5v13l10-6.5z" }) : /* @__PURE__ */ jsx("path", { d: "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" })
		}), /* @__PURE__ */ jsx("span", {
			className: "ctl-label",
			children: reduce || osNow ? "Activar movimiento" : "Reducir movimiento"
		})]
	});
	return /* @__PURE__ */ jsxs("section", {
		ref: root,
		className: `scrub-hero ${staticMode ? "is-static" : ""}`,
		"data-hydrated": ready ? "true" : "false",
		"aria-label": "Elige tu próximo recuerdo",
		children: [/* @__PURE__ */ jsx("div", {
			ref: track,
			className: "scrub-track",
			style: animated ? { "--total": timeline(mobile).total } : void 0,
			children: /* @__PURE__ */ jsxs("div", {
				ref: stage,
				className: "scrub-stage",
				"data-ui": "deck",
				"data-cap": "",
				"data-ch": "1",
				"data-textos": t.estado,
				children: [
					/* @__PURE__ */ jsxs("div", {
						ref: media,
						className: "scrub-media",
						children: [
							/* @__PURE__ */ jsxs("picture", {
								className: "scrub-poster",
								children: [/* @__PURE__ */ jsx("source", {
									media: MOBILE_QUERY,
									type: "image/webp",
									srcSet: `${BASE}/poster-m.webp`
								}), /* @__PURE__ */ jsx("img", {
									src: `${BASE}/poster-1600.webp`,
									srcSet: `${BASE}/poster-1280.webp 1280w, ${BASE}/poster-1600.webp 1600w`,
									sizes: "100vw",
									width: "1600",
									height: "900",
									alt: "Vista de Medellín desde la ladera de la Comuna 13",
									loading: "lazy",
									decoding: "async"
								})]
							}),
							animated && /* @__PURE__ */ jsx("canvas", {
								ref: canvas,
								className: "scrub-canvas",
								"aria-hidden": "true"
							}),
							animated && !mobile && /* @__PURE__ */ jsxs("span", {
								className: "md-deco",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ jsx("i", { className: "md-frame" }),
									/* @__PURE__ */ jsx("i", { className: "md-sheen" }),
									/* @__PURE__ */ jsx("i", {
										className: "md-stamp",
										children: /* @__PURE__ */ jsxs("svg", {
											viewBox: "0 0 48 48",
											focusable: "false",
											children: [
												/* @__PURE__ */ jsx("circle", {
													cx: "24",
													cy: "24",
													r: "21",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "1.6",
													strokeDasharray: "3 2.6"
												}),
												/* @__PURE__ */ jsx("circle", {
													cx: "24",
													cy: "24",
													r: "15",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "1.3"
												}),
												/* @__PURE__ */ jsx("path", {
													d: "M15 29l6-7 4 4 3-3 5 6",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "1.8",
													strokeLinecap: "round",
													strokeLinejoin: "round"
												}),
												/* @__PURE__ */ jsx("circle", {
													cx: "30.5",
													cy: "18.5",
													r: "2",
													fill: "currentColor"
												})
											]
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						ref: titleRef,
						className: "scrub-title",
						children: [/* @__PURE__ */ jsx("p", {
							className: "eyebrow scrub-lema",
							"data-fx": "0",
							children: "Experiencias"
						}), /* @__PURE__ */ jsx("h2", {
							className: "scrub-t1",
							"data-fx": "-1",
							children: t.eleccion
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "scrub-panel",
						children: [animated && /* @__PURE__ */ jsxs("div", {
							className: "scrub-index",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ jsx("div", {
								className: "scrub-ch-stack",
								children: CHAPTERS.map((id, i) => /* @__PURE__ */ jsxs("p", {
									className: "scrub-ch",
									"data-for": i + 1,
									children: [/* @__PURE__ */ jsxs("span", {
										className: "scrub-count",
										children: [
											two$3(i + 1),
											" / ",
											two$3(CHAPTERS.length)
										]
									}), /* @__PURE__ */ jsx("span", {
										className: "scrub-place",
										children: t.fases[id].rotulo
									})]
								}, id))
							}), /* @__PURE__ */ jsx("div", {
								className: "scrub-segs",
								children: CHAPTERS.map((id, i) => /* @__PURE__ */ jsx("i", { "data-for": i + 1 }, id))
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "scrub-text",
							children: /* @__PURE__ */ jsxs("div", {
								ref: stackRef,
								className: "scrub-stack",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "scrub-intro",
									children: [/* @__PURE__ */ jsx("p", {
										className: "scrub-vive",
										children: textoFase("c1").titular
									}), /* @__PURE__ */ jsx("p", {
										className: "scrub-vive-sub",
										children: textoFase("c1").subtitulo
									})]
								}), animated && ["c1", "c2"].map((id) => {
									const x = textoFase(id);
									return /* @__PURE__ */ jsxs("div", {
										className: "scrub-cap",
										"data-for": id,
										"aria-hidden": "true",
										children: [/* @__PURE__ */ jsx("p", {
											className: "scrub-cap-title",
											children: x.titular
										}), x.subtitulo ? /* @__PURE__ */ jsx("p", {
											className: "scrub-cap-sub",
											children: x.subtitulo
										}) : null]
									}, id);
								})]
							})
						})]
					}),
					staticMode && /* @__PURE__ */ jsx("ul", {
						className: "scrub-static-cards",
						role: "list",
						"aria-label": "Experiencias",
						children: cards.filter((c) => c.slug !== "traslados-aeropuerto-jmc").map((c) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
							to: `/experiencias/${c.slug}`,
							className: "ssc-card",
							children: [/* @__PURE__ */ jsx("img", {
								src: cardImg(c.slug, "t"),
								width: "320",
								height: "400",
								alt: c.name,
								loading: "lazy",
								decoding: "async"
							}), /* @__PURE__ */ jsx("span", { children: c.name })]
						}) }, c.slug))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "scrub-ctl",
						children: [animated && /* @__PURE__ */ jsxs("button", {
							ref: skipRef,
							type: "button",
							className: "scrub-skip",
							onClick: skip,
							title: skipLabel,
							children: [/* @__PURE__ */ jsx("span", {
								className: "ctl-label",
								children: skipLabel
							}), /* @__PURE__ */ jsx(Arrow, { dir: "down" })]
						}), bar]
					}),
					animated && /* @__PURE__ */ jsx("div", {
						ref: floatRef,
						className: "bd-floats",
						"aria-hidden": "true",
						children: (mobile ? FLOATS_M : FLOATS).map(([fx, fy, w, dp, ci, rot, bl, md], k) => /* @__PURE__ */ jsx("i", {
							className: "bd-float",
							"data-k": k,
							"data-fx": fx,
							"data-fy": fy,
							"data-dp": dp,
							"data-rot": rot,
							"data-bg": cardImg(cards[ci].slug, "t"),
							style: {
								width: w,
								height: w * 1.25,
								"--bl": `${bl}px`,
								"--md": md
							}
						}, k))
					}),
					/* @__PURE__ */ jsxs("div", {
						ref: deckRef,
						className: "bd-deck",
						children: [animated && !mobile && /* @__PURE__ */ jsx("i", {
							ref: haloRef,
							className: "bd-halo",
							"aria-hidden": "true"
						}), animated && cards.map((c) => /* @__PURE__ */ jsx("div", {
							className: "bd-card",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsxs("span", {
								className: "bd-tilt",
								children: [/* @__PURE__ */ jsx("img", {
									className: "bd-thumb",
									src: cardImg(c.slug, "t"),
									width: "320",
									height: "400",
									alt: "",
									decoding: "async",
									loading: "lazy"
								}), /* @__PURE__ */ jsx("i", {
									className: "bd-stamp",
									children: /* @__PURE__ */ jsxs("svg", {
										viewBox: "0 0 48 48",
										focusable: "false",
										children: [
											/* @__PURE__ */ jsx("circle", {
												cx: "24",
												cy: "24",
												r: "21",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "1.6",
												strokeDasharray: "3 2.6"
											}),
											/* @__PURE__ */ jsx("circle", {
												cx: "24",
												cy: "24",
												r: "15",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "1.3"
											}),
											/* @__PURE__ */ jsx("path", {
												d: "M15 29l6-7 4 4 3-3 5 6",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "1.8",
												strokeLinecap: "round",
												strokeLinejoin: "round"
											}),
											/* @__PURE__ */ jsx("circle", {
												cx: "30.5",
												cy: "18.5",
												r: "2",
												fill: "currentColor"
											})
										]
									})
								})]
							})
						}, c.slug))]
					})
				]
			})
		}), summary && /* @__PURE__ */ jsx("p", {
			className: "scrub-summary",
			children: summary
		})]
	});
}
//#endregion
//#region src/TravelHand.jsx
var ORDER = [
	"city-tour-comuna-13",
	"tour-de-compras",
	"guatape-piedra-del-penol",
	"vuelta-a-oriente",
	"santa-fe-de-antioquia",
	"jardin-antioquia",
	"tour-del-cafe-medellin",
	"salto-del-buey",
	"hacienda-napoles",
	"tour-nocturno-medellin",
	"tour-miradores"
];
var N = ORDER.length;
var SEG = {
	wide: 30,
	compact: 80
};
var EXIT = 20;
var RELAY = 34;
var REST = .48;
var COMPACT_SVH = 232;
var COMPACT_END = 10;
var PH_A = .16;
var PH_C = .88;
var totalFor = (wide) => wide ? RELAY + N * SEG.wide + EXIT : RELAY + COMPACT_SVH + COMPACT_END;
var mapLocal = (tl) => tl < PH_A ? .62 * (tl / PH_A) : .62 + .18 * clamp$1((tl - PH_A) / .72);
var WIDE = "(min-width: 900px)";
var SMALL = "(max-width: 799px)";
var REDUCE = "(prefers-reduced-motion: reduce)";
var LOW = "(max-height: 560px)";
var REDUCE_KEY = "tyt-reducir-movimiento";
var two$2 = (n) => String(n).padStart(2, "0");
var clamp$1 = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var readReduce = () => {
	try {
		return localStorage.getItem(REDUCE_KEY) === "1";
	} catch {
		return false;
	}
};
var prefersStatic = () => {
	if (typeof window === "undefined") return true;
	return readReduce() || window.matchMedia(REDUCE).matches || window.matchMedia(WIDE).matches && window.matchMedia(LOW).matches;
};
var ENTRIES = ORDER.map(tourEntry);
var GROUPS = ENTRIES.reduce((acc, e, i) => {
	const last = acc[acc.length - 1];
	if (last && last.name === e.category) last.items.push(i);
	else acc.push({
		name: e.category,
		items: [i]
	});
	return acc;
}, []);
function measure(host, text) {
	const m = document.createElement("span");
	m.textContent = text;
	m.setAttribute("aria-hidden", "true");
	m.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;font:800 100px/1 Montserrat,Arial,sans-serif;letter-spacing:-.04em";
	host.appendChild(m);
	const w = m.getBoundingClientRect().width / 100;
	m.remove();
	return w;
}
function fitTitle(host, text, small) {
	const avail = host.clientWidth;
	if (avail <= 0) return null;
	const target = avail * .92, one = Math.min(128, target / measure(host, text));
	if (!small && one >= 44) return {
		size: one,
		lines: [text]
	};
	const words = text.split(" ");
	let best = null;
	for (let i = 1; i < words.length; i++) {
		const a = words.slice(0, i).join(" "), b = words.slice(i).join(" "), w = Math.max(measure(host, a), measure(host, b));
		if (!best || w < best.w) best = {
			w,
			lines: [a, b]
		};
	}
	return best ? {
		size: Math.min(128, target / best.w),
		lines: best.lines
	} : {
		size: one,
		lines: [text]
	};
}
function Photo({ photo, entry, k, primary }) {
	return /* @__PURE__ */ jsx("img", {
		className: "th-photo",
		"data-k": k,
		src: photo.src,
		srcSet: photo.srcSet,
		sizes: primary ? "(max-width: 799px) 84vw, (max-width: 899px) 44vw, 24vw" : "(max-width: 799px) 40vw, (max-width: 899px) 22vw, 14vw",
		width: photo.width,
		height: photo.height,
		alt: `${entry.name}, fotografía ${k + 1}`,
		loading: primary ? "eager" : "lazy",
		fetchPriority: primary ? "auto" : "low",
		decoding: "async",
		draggable: "false"
	});
}
function TravelHand() {
	const [ready, setReady] = useState(false), [mode, setMode] = useState("static"), [layout, setLayout] = useState("wide");
	const [active, setActive] = useState(0), [shown, setShown] = useState(0), [swap, setSwap] = useState("");
	const [full, setFull] = useState(() => /* @__PURE__ */ new Set([0])), [fronts, setFronts] = useState({}), [live, setLive] = useState("");
	const [fit, setFit] = useState({
		size: 64,
		lines: [ENTRIES[0].name]
	});
	const decoEl = useRef(null), tabList = useRef(null), root = useRef(null), track = useRef(null), stage = useRef(null), handEl = useRef(null), titleHost = useRef(null), mqEl = useRef(null), deckEl = useRef(null), tabs = useRef([]);
	const st = useRef({
		active: 0,
		fronts: {},
		manualY: null,
		jump: () => {},
		flip: 0
	});
	st.current.fronts = fronts;
	const animated = mode === "scrub";
	const display = (i) => t(ENTRIES[i].name).toLocaleUpperCase(language() === "en" ? "en" : "es");
	useLayoutEffect(() => {
		const decide = () => {
			const head = document.querySelector(".site-header")?.offsetHeight || 92, wide = window.matchMedia(WIDE).matches;
			const fits = !wide || window.innerHeight - head >= 500;
			setLayout(wide ? "wide" : "compact");
			setMode(prefersStatic() || !fits ? "static" : "scrub");
		};
		decide();
		setReady(true);
		let last = [innerWidth, innerHeight];
		const onResize = () => {
			if (innerWidth === last[0] && Math.abs(innerHeight - last[1]) < 120) return;
			last = [innerWidth, innerHeight];
			decide();
		};
		const queries = [
			WIDE,
			REDUCE,
			LOW,
			SMALL
		].map((q) => window.matchMedia(q));
		queries.forEach((q) => q.addEventListener("change", decide));
		window.addEventListener("tyt-motion", decide);
		window.addEventListener("resize", onResize);
		return () => {
			queries.forEach((q) => q.removeEventListener("change", decide));
			window.removeEventListener("tyt-motion", decide);
			window.removeEventListener("resize", onResize);
		};
	}, []);
	const shownRef = useRef(0), swapTimer = useRef(0);
	useEffect(() => {
		if (active === shownRef.current) return void 0;
		if (!animated) {
			shownRef.current = active;
			setShown(active);
			return;
		}
		setSwap("out");
		clearTimeout(swapTimer.current);
		swapTimer.current = setTimeout(() => {
			shownRef.current = active;
			setShown(active);
			setSwap("");
		}, 220);
		return () => clearTimeout(swapTimer.current);
	}, [active, animated]);
	useEffect(() => {
		if (!animated) return void 0;
		const done = [];
		[[active + 1, true], [active + 2, false]].forEach(([gi, all]) => {
			const e = ENTRIES[gi];
			if (!e || navigator.connection?.saveData) return;
			(all ? e.photos : e.photos.slice(0, 1)).forEach((p, k) => {
				const im = new Image();
				im.decoding = "async";
				im.sizes = k === 0 ? "(max-width: 799px) 84vw, (max-width: 899px) 44vw, 24vw" : "(max-width: 799px) 40vw, (max-width: 899px) 22vw, 14vw";
				im.srcset = p.srcSet;
				im.src = p.src;
				im.decode?.().catch(() => {});
				done.push(im);
			});
		});
		return () => {
			done.length = 0;
		};
	}, [active, animated]);
	useEffect(() => {
		setFull((prev) => prev.has(active) ? prev : new Set(prev).add(active));
	}, [active]);
	useEffect(() => {
		const el = tabs.current[active], list = el?.closest("[role=tablist]");
		if (!animated || layout !== "compact" || !el || !list) return;
		list.scrollTo({
			left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2,
			behavior: "instant"
		});
	}, [
		active,
		animated,
		layout
	]);
	useLayoutEffect(() => {
		if (!animated || !titleHost.current) return void 0;
		const run = () => {
			const f = fitTitle(titleHost.current, display(shown), window.matchMedia(SMALL).matches);
			if (f) setFit((p) => p.size === f.size && p.lines.join("|") === f.lines.join("|") ? p : f);
		};
		run();
		document.fonts?.ready.then(run);
		const ro = new ResizeObserver(run);
		ro.observe(titleHost.current);
		return () => ro.disconnect();
	}, [
		animated,
		shown,
		layout
	]);
	const flipOn = useCallback(() => {
		const el = handEl.current;
		if (el) {
			el.dataset.flip = "true";
			clearTimeout(st.current.flip);
			st.current.flip = setTimeout(() => {
				el.dataset.flip = "false";
			}, 650);
		}
	}, []);
	const warm = useCallback((gi) => {
		const e = ENTRIES[gi];
		if (!e || navigator.connection?.saveData) return;
		e.photos.forEach((p, k) => {
			const im = new Image();
			im.decoding = "async";
			im.sizes = k === 0 ? "(max-width: 799px) 84vw, (max-width: 899px) 44vw, 24vw" : "(max-width: 799px) 40vw, (max-width: 899px) 22vw, 14vw";
			im.srcset = p.srcSet;
			im.src = p.src;
			im.decode?.().catch(() => {});
		});
		setFull((prev) => prev.has(gi) ? prev : new Set(prev).add(gi));
	}, []);
	useLayoutEffect(() => {
		if (!ready || !animated) return void 0;
		const trackEl = track.current, stageEl = stage.current, hand = handEl.current, mq = mqEl.current, deck = deckEl.current;
		const small = window.matchMedia(SMALL).matches, wide = layout === "wide", seg = wide ? SEG.wide : SEG.compact, shrink = wide ? 1 : innerWidth < 768 ? .62 : .82, mob = innerWidth < 768;
		const compact = !wide, total = totalFor(wide);
		let raf = 0, visible = !compact, destroyed = false, q = null, lastT = 0, stageTop = 92, span = 1, RW = 0, RH = 0, sw = 0, sh = 0, arrT = compact ? performance.now() + 1e9 : 0, leaving = null;
		let groupCache = null, trackTop = 0;
		const groups = () => groupCache || (groupCache = [...hand.querySelectorAll(".th-group")]);
		const measureTrack = () => {
			span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight);
			trackTop = trackEl.getBoundingClientRect().top + scrollY;
		};
		const metrics = () => {
			stageTop = document.querySelector(".site-header")?.offsetHeight || 92;
			root.current.style.setProperty("--th-top", `${stageTop}px`);
			RW = hand.clientWidth;
			RH = hand.clientHeight;
			sw = stageEl.clientWidth;
			sh = stageEl.clientHeight;
			measureTrack();
			const R = relayDeck(sw, sh, small);
			deck.style.setProperty("--dw", `${R.w}px`);
			deck.style.setProperty("--dh", `${R.h}px`);
			deck.style.setProperty("--dx", `${R.x - R.w / 2}px`);
			deck.style.setProperty("--dy", `${R.y - R.h / 2}px`);
			const hr = hand.getBoundingClientRect(), sr = stageEl.getBoundingClientRect();
			keep = mob ? {
				l: innerWidth - 16 - 58 - 30 - (hr.left - sr.left),
				t: innerHeight - 16 - 58 - 30 - stageTop - (hr.top - sr.top)
			} : null;
			lastKey = "";
		};
		let lastKey = "", keep = null;
		const apply = (P, now) => {
			let idx, eff, P2 = 0;
			if (compact) {
				idx = st.current.active;
				const ramp = arrT ? smooth$1(clamp$1((now - arrT) / 700)) : 1;
				eff = mapLocal(P) * ramp;
				if (arrT && ramp >= 1) arrT = 0;
				if (leaving && now > leaving.until) {
					leaving = null;
					lastKey = "";
				}
				const n = ENTRIES[idx].photos.length;
				Math.floor(clamp$1((P - PH_A) / .72) * n), n - 1;
			} else {
				idx = clamp$1(Math.floor(P), 0, N - 1);
				P2 = clamp$1(P, 0, N);
				if (idx !== st.current.active) {
					st.current.active = idx;
					setActive(idx);
				}
				eff = clamp$1(P2 - idx, 0, 1);
			}
			const key = `${compact ? `${eff.toFixed(4)}|${idx}|${leaving ? leaving.gi : ""}|${P > PH_C ? P.toFixed(3) : ""}` : P2.toFixed(4)}|${RW}x${RH}|${JSON.stringify(st.current.fronts)}`;
			if (key === lastKey) return;
			lastKey = key;
			for (const g of groups()) {
				const gi = Number(g.dataset.i), f = st.current.fronts[gi] || 0;
				let local;
				if (compact) {
					if (gi !== idx) {
						const out = leaving && leaving.gi === gi;
						g.style.visibility = out ? "visible" : "hidden";
						g.style.transition = out ? "opacity 220ms ease" : "";
						g.style.opacity = out ? "0" : "";
						g.style.transform = "";
						continue;
					}
					local = eff;
					g.style.visibility = "visible";
					g.style.transition = "";
					const bye = smooth$1((P - PH_C) / .12);
					g.style.opacity = bye ? String((1 - bye).toFixed(3)) : "";
					g.style.transform = bye ? `translate3d(0,${(bye * 28).toFixed(1)}px,0)` : "";
				} else {
					local = P2 - gi;
					const vis = local > -.2 && local < 1.25;
					g.style.visibility = vis ? "visible" : "hidden";
					if (!vis) continue;
				}
				placePhotos([...g.querySelectorAll(".th-photo")], f, local, RW, RH, shrink, mob, keep);
			}
			mq.style.transform = `translate3d(${(.12 * sw - .25 * eff * sw).toFixed(1)}px,-50%,0)`;
			if (!compact) deck.style.opacity = String(clamp$1(1 - (P2 - (N - 2)) * 1.2));
		};
		const render = (now) => {
			raf = 0;
			if (destroyed || !visible || document.hidden) {
				lastT = 0;
				return;
			}
			if (compact) {
				apply(REST, now);
				if (arrT || leaving) schedule();
				return;
			}
			const u = clamp$1((scrollY + stageTop - trackTop) / span) * total;
			const fin = clamp$1((u - (RELAY - 4)) / 4);
			const cfin = wide ? fin : smooth$1(clamp$1(u / (RELAY - 4)));
			if (stageEl._fin !== fin || stageEl._cfin !== cfin) {
				stageEl._fin = fin;
				stageEl._cfin = cfin;
				stageEl.style.setProperty("--cfin", cfin.toFixed(3));
				stageEl.style.setProperty("--fin", fin.toFixed(3));
				stageEl.style.pointerEvents = cfin < 1 ? "none" : "";
				stageEl.dataset.on = fin > 0 ? "true" : "false";
			}
			const target = compact ? clamp$1((u - RELAY) / COMPACT_SVH) : clamp$1((u - RELAY) / seg, 0, N);
			const dt = lastT ? Math.min(64, now - lastT) : 16;
			lastT = now;
			if (q === null || Math.abs(target - q) > (compact ? .12 : .36)) q = target;
			else q += (target - q) * (1 - Math.exp(-dt / (wide ? 60 : 45)));
			let moving = true;
			if (Math.abs(target - q) < 4e-4) {
				q = target;
				moving = false;
			}
			if (st.current.manualY !== null && Math.abs(scrollY - st.current.manualY) > 24) {
				st.current.manualY = null;
				if (Object.keys(st.current.fronts).length) setFronts({});
			}
			apply(q, now);
			if (moving || arrT || leaving) schedule();
			else lastT = 0;
		};
		const schedule = () => {
			if (!raf && !destroyed) raf = requestAnimationFrame(render);
		};
		const onScroll = () => schedule();
		const observer = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			if (visible) {
				if (compact && arrT > performance.now() + 1e8) arrT = performance.now();
				lastT = 0;
				lastKey = "";
				schedule();
			} else if (raf) {
				cancelAnimationFrame(raf);
				raf = 0;
			}
		}, { rootMargin: "200px 0px" });
		const resize = new ResizeObserver(() => {
			metrics();
			schedule();
		});
		st.current.jump = (i, s = .56) => {
			const u = RELAY + (i + s) * seg;
			window.scrollTo({
				top: trackTop - stageTop + u / total * span,
				behavior: "instant"
			});
			schedule();
		};
		st.current.choose = (i) => {
			if (!compact) {
				st.current.jump(i);
				return;
			}
			if (i === st.current.active) return;
			leaving = {
				gi: st.current.active,
				until: performance.now() + 260
			};
			arrT = performance.now() + 120;
			lastKey = "";
			st.current.manualY = null;
			st.current.active = i;
			setActive(i);
			setFronts({});
			schedule();
		};
		st.current.refresh = () => {
			groupCache = null;
			lastKey = "";
			schedule();
		};
		const bodyRO = new ResizeObserver(() => {
			measureTrack();
			lastKey = "";
			schedule();
		});
		bodyRO.observe(document.body);
		metrics();
		observer.observe(root.current);
		resize.observe(hand);
		resize.observe(stageEl);
		if (!compact) window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		if (compact) {
			stageEl.style.setProperty("--cfin", "1");
			stageEl.style.setProperty("--fin", "1");
			stageEl.style.pointerEvents = "";
			stageEl.dataset.on = "true";
		}
		document.addEventListener("visibilitychange", onScroll);
		schedule();
		return () => {
			destroyed = true;
			cancelAnimationFrame(raf);
			observer.disconnect();
			resize.disconnect();
			bodyRO.disconnect();
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			document.removeEventListener("visibilitychange", onScroll);
			st.current.jump = () => {};
			st.current.choose = () => {};
			st.current.refresh = () => {};
			for (const img of hand.querySelectorAll(".th-photo")) {
				img.removeAttribute("style");
				delete img._w;
			}
		};
	}, [
		ready,
		animated,
		layout
	]);
	useLayoutEffect(() => {
		st.current.refresh?.();
	}, [
		full,
		fronts,
		active
	]);
	const select = useCallback((gi, next, announce) => {
		const n = ENTRIES[gi].photos.length, f = (next % n + n) % n;
		setFronts((p) => ({
			...p,
			[gi]: f
		}));
		st.current.manualY = scrollY;
		flipOn();
		if (announce) setLive(`Foto ${f + 1} de ${n}, ${ENTRIES[gi].name}`);
	}, [flipOn]);
	const onTabKey = (e, i) => {
		const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % N : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i + N - 1) % N : e.key === "Home" ? 0 : e.key === "End" ? N - 1 : null;
		if (next === null) return;
		e.preventDefault();
		st.current.choose(next);
		tabs.current[next]?.focus({ preventScroll: true });
	};
	useGlassPill(tabList, active, animated && layout === "compact");
	const nowFront = fronts[active] || 0, entry = ENTRIES[shown], t$1 = inicioTextos;
	layout === "wide" ? SEG.wide : SEG.compact;
	const trackStyle = animated ? { "--th-total": totalFor(layout === "wide") } : void 0;
	const header = /* @__PURE__ */ jsxs("div", {
		className: "th-head",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "eyebrow",
			children: [t$1.eleccion, animated && /* @__PURE__ */ jsxs("span", {
				className: "th-idx",
				"aria-hidden": "true",
				children: [
					two$2(shown + 1),
					" / ",
					two$2(N)
				]
			})]
		}), /* @__PURE__ */ jsxs("h2", {
			id: "th-titulo",
			children: [
				"Un lugar para cada",
				" ",
				/* @__PURE__ */ jsx("br", {}),
				/* @__PURE__ */ jsx("em", { children: "forma de viajar" })
			]
		})]
	});
	if (!animated) return /* @__PURE__ */ jsxs("section", {
		ref: root,
		className: "th th--static wrap section",
		id: "formas-de-viajar",
		tabIndex: -1,
		"data-hydrated": ready ? "true" : "false",
		"aria-labelledby": "th-titulo",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "section-title",
			children: [/* @__PURE__ */ jsx("div", { children: header }), /* @__PURE__ */ jsxs(Link, {
				className: "text-link",
				to: "/experiencias",
				children: ["Ver las 12 experiencias", /* @__PURE__ */ jsx(Arrow, {})]
			})]
		}), /* @__PURE__ */ jsx("ul", {
			className: "th-list",
			role: "list",
			children: ENTRIES.map((e, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
				className: "th-card",
				to: `/experiencias/${e.slug}`,
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "th-card-img",
						children: [/* @__PURE__ */ jsx(GoogleBadgeStatic, { className: "th-card-badge" }), /* @__PURE__ */ jsx("img", {
							src: e.photos[0].small,
							srcSet: e.photos[0].srcSet,
							sizes: "(max-width: 699px) 92vw, (max-width: 1099px) 46vw, 30vw",
							width: "400",
							height: "500",
							alt: "",
							loading: "lazy",
							decoding: "async"
						})]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "th-card-count",
						children: [
							two$2(i + 1),
							" / ",
							two$2(N),
							" · ",
							e.category
						]
					}),
					/* @__PURE__ */ jsx("h3", { children: e.name }),
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsxs("b", { children: [e.emocion, ":"] }),
						" ",
						e.frase
					] })
				]
			}) }, e.slug))
		})]
	});
	return /* @__PURE__ */ jsxs("section", {
		ref: root,
		className: "th",
		id: "formas-de-viajar",
		tabIndex: -1,
		"data-hydrated": "true",
		"data-layout": layout,
		"aria-labelledby": "th-titulo",
		children: [
			/* @__PURE__ */ jsx("div", {
				ref: track,
				className: "th-track",
				style: trackStyle,
				children: /* @__PURE__ */ jsxs("div", {
					ref: stage,
					className: "th-stage",
					"data-on": "false",
					"data-swap": swap,
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "th-bg",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ jsx("div", {
							ref: decoEl,
							className: "th-deco",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("i", { className: "th-glow" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "th-mq-clip",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("div", {
								ref: mqEl,
								className: "th-mq",
								children: /* @__PURE__ */ jsx("span", { children: entry.lugar })
							})
						}),
						header,
						/* @__PURE__ */ jsx("div", {
							ref: titleHost,
							className: "th-title-host",
							children: /* @__PURE__ */ jsx("h3", {
								className: "th-title",
								style: { fontSize: `${fit.size.toFixed(2)}px` },
								children: /* @__PURE__ */ jsx(Link, {
									className: "th-title-link",
									to: `/experiencias/${entry.slug}`,
									children: fit.lines.map((l) => /* @__PURE__ */ jsx("span", { children: l }, l))
								})
							})
						}),
						/* @__PURE__ */ jsxs("nav", {
							className: "th-index",
							"aria-label": "Experiencias",
							children: [/* @__PURE__ */ jsxs("div", {
								ref: tabList,
								role: "tablist",
								className: layout === "compact" ? "glass-tabs" : "",
								"aria-orientation": layout === "wide" ? "vertical" : "horizontal",
								children: [layout === "compact" && /* @__PURE__ */ jsx(GlassPill, {}), GROUPS.map((g) => /* @__PURE__ */ jsx("div", {
									className: "th-group-tabs",
									children: g.items.map((i) => /* @__PURE__ */ jsxs("button", {
										ref: (el) => {
											tabs.current[i] = el;
										},
										type: "button",
										role: "tab",
										id: `th-tab-${i}`,
										"aria-controls": "th-hand",
										"aria-selected": active === i,
										tabIndex: active === i ? 0 : -1,
										onClick: () => st.current.choose(i),
										onPointerDown: () => warm(i),
										onKeyDown: (e) => onTabKey(e, i),
										children: [/* @__PURE__ */ jsx("span", { children: two$2(i + 1) }), ENTRIES[i].name]
									}, ENTRIES[i].slug))
								}, g.name))]
							}), /* @__PURE__ */ jsx("a", {
								className: "th-skip",
								href: "#camino",
								children: "Saltar experiencias"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							ref: handEl,
							id: "th-hand",
							className: "th-hand",
							role: "region",
							"aria-roledescription": "carrusel",
							"aria-label": `Fotografías de ${ENTRIES[active].name}`,
							tabIndex: 0,
							onKeyDown: (e) => {
								if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
									e.preventDefault();
									select(active, nowFront + (e.key === "ArrowRight" ? 1 : -1), true);
								}
							},
							onClick: (e) => {
								const img = e.target.closest?.(".th-photo");
								if (img) select(active, Number(img.dataset.k), true);
							},
							onPointerDown: (e) => {
								st.current.sx = e.clientX;
								st.current.sy = e.clientY;
							},
							onPointerUp: (e) => {
								const dx = e.clientX - (st.current.sx ?? e.clientX), dy = e.clientY - (st.current.sy ?? e.clientY);
								if (e.pointerType !== "mouse" && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.2) select(active, nowFront + (dx < 0 ? 1 : -1), true);
							},
							children: ENTRIES.map((e, gi) => {
								const near = Math.abs(gi - active) <= 1, hasFull = full.has(gi);
								if (!near && !hasFull) return null;
								return /* @__PURE__ */ jsx("div", {
									className: "th-group",
									"data-i": gi,
									"aria-hidden": gi === active ? void 0 : "true",
									children: e.photos.map((p, k) => k === 0 || hasFull ? /* @__PURE__ */ jsx(Photo, {
										photo: p,
										entry: e,
										k,
										primary: gi === active || k === 0
									}, k) : null)
								}, e.slug);
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "th-foot",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "th-cap",
									children: [
										ENTRIES[active].name,
										" · fotografía ",
										two$2(nowFront + 1),
										" de ",
										two$2(ENTRIES[active].photos.length)
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "th-dots",
									role: "group",
									"aria-label": "Fotografías",
									style: { "--dotw": ENTRIES[active].photos.length > 6 ? "17px" : "24px" },
									children: ENTRIES[active].photos.map((_, k) => /* @__PURE__ */ jsx("button", {
										type: "button",
										"aria-label": `Foto ${k + 1} de ${ENTRIES[active].photos.length}`,
										"aria-current": k === nowFront ? "true" : void 0,
										onClick: () => select(active, k, true),
										children: /* @__PURE__ */ jsx("i", {})
									}, k))
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "th-arrows",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										"aria-label": "Fotografía anterior",
										onClick: () => select(active, nowFront - 1, true),
										children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										"aria-label": "Fotografía siguiente",
										onClick: () => select(active, nowFront + 1, true),
										children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("aside", {
							className: "th-panel",
							"aria-label": "Detalle de la experiencia",
							children: [
								/* @__PURE__ */ jsxs(Link, {
									className: "button",
									to: `/experiencias/${entry.slug}#consulta`,
									children: ["Planea esta experiencia", /* @__PURE__ */ jsx(Arrow, {})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "th-row",
									children: /* @__PURE__ */ jsxs("div", {
										className: "th-arrows th-arrows--in",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											"aria-label": "Fotografía anterior",
											onClick: () => select(active, nowFront - 1, true),
											children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											"aria-label": "Fotografía siguiente",
											onClick: () => select(active, nowFront + 1, true),
											children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
										})]
									})
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "th-count",
									children: [
										two$2(shown + 1),
										" / ",
										two$2(N),
										" · ",
										entry.category
									]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "th-line",
									children: [
										/* @__PURE__ */ jsxs("b", { children: [entry.emocion, ":"] }),
										" ",
										entry.frase
									]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							ref: deckEl,
							className: "th-deck",
							"aria-hidden": "true",
							inert: true,
							children: ENTRIES.slice(active + 1, active + 6).map((e, i) => {
								const pose = deckPose(i);
								return /* @__PURE__ */ jsx("img", {
									src: e.photos[0].small,
									alt: "",
									width: "120",
									height: "150",
									style: {
										transform: `translate(${pose.dx * .5}px,${pose.dy * .5}px) rotate(${pose.r}deg)`,
										zIndex: 9 - i
									}
								}, e.slug);
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "sr-only",
							"aria-live": "polite",
							children: live
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				id: "th-inicio",
				className: "th-marker",
				tabIndex: -1,
				role: "group",
				"aria-label": "Un lugar para cada forma de viajar",
				style: { top: `calc(${RELAY} * 1svh)` }
			}),
			/* @__PURE__ */ jsx("p", {
				className: "th-all",
				children: /* @__PURE__ */ jsxs(Link, {
					className: "text-link",
					to: "/experiencias",
					children: ["Ver las 12 experiencias", /* @__PURE__ */ jsx(Arrow, {})]
				})
			})
		]
	});
}
//#endregion
//#region src/BlogBook.jsx
var two$1 = (n) => String(n).padStart(2, "0");
var EASE = "cubic-bezier(.77,0,.175,1)";
var ANGLE_B = [
	[0, 0],
	[.4, -14],
	[.75, 6],
	[1, 0]
];
var SPLIT = .3;
var HINT_KEY = "tyt-libro-gesto";
var hintSeen = () => {
	try {
		return sessionStorage.getItem(HINT_KEY) === "1";
	} catch {
		return false;
	}
};
var markSeen = () => {
	try {
		sessionStorage.setItem(HINT_KEY, "1");
	} catch {}
};
function PagePhoto({ item, link }) {
	const image = /* @__PURE__ */ jsx(Picture, {
		photo: item.image,
		alt: "",
		sizes: "(max-width:799px) 90vw, 42vw"
	});
	return link ? /* @__PURE__ */ jsx(Link, {
		className: "ft-media",
		to: `/blog/${link.slug}`,
		"aria-label": link.title,
		children: image
	}) : /* @__PURE__ */ jsx("span", {
		className: "ft-media",
		children: image
	});
}
function PageText({ item, live }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "bk-text",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "eyebrow book-tag",
				children: item.tag
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "ft-name",
				children: item.title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "ft-line",
				children: item.intro
			}),
			live ? /* @__PURE__ */ jsxs(Link, {
				className: "ft-plan",
				to: `/blog/${item.slug}`,
				"aria-label": `Leer la nota: ${item.title}`,
				children: ["Leer la nota ", /* @__PURE__ */ jsx(Arrow, {})]
			}) : /* @__PURE__ */ jsxs("span", {
				className: "ft-plan",
				children: ["Leer la nota ", /* @__PURE__ */ jsx(Arrow, {})]
			})
		]
	});
}
var photoPage = (item) => /* @__PURE__ */ jsx("div", {
	className: "bk-page bk-page--photo",
	children: /* @__PURE__ */ jsx(PagePhoto, { item })
});
var textPage = (item) => /* @__PURE__ */ jsx("div", {
	className: "bk-page bk-page--text",
	children: /* @__PURE__ */ jsx(PageText, { item })
});
var faceContent = (kind, item) => kind === "photo" ? photoPage(item) : kind === "text" ? textPage(item) : /* @__PURE__ */ jsxs(Fragment, { children: [photoPage(item), textPage(item)] });
function Face({ kind, item, side, spine, segment, split }) {
	const w = segment === "a" ? SPLIT : .7;
	const inner = split ? `${(100 / w).toFixed(4)}%` : "100%";
	let left = 0;
	if (split) left = spine === "left" === (segment === "a") ? 0 : -((1 - w) / w) * 100;
	return /* @__PURE__ */ jsx("div", {
		className: `bk-face bk-face--${side}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `bk-face-in bk-paper--${kind === "photo" ? "back" : "front"}`,
			"data-kind": kind,
			style: {
				width: inner,
				left: `${left}%`
			},
			"data-spine": spine,
			children: [
				faceContent(kind, item),
				/* @__PURE__ */ jsx("i", { className: "bk-shade" }),
				/* @__PURE__ */ jsx("i", { className: "bk-gloss" })
			]
		})
	});
}
function Leaf({ turn, cards, split, mobileSingle }) {
	const fw = turn.forward;
	const from = cards[turn.from], to = cards[turn.to];
	const front = mobileSingle ? {
		kind: "both",
		item: fw ? from : to,
		spine: "left"
	} : fw ? {
		kind: "text",
		item: from,
		spine: "left"
	} : {
		kind: "photo",
		item: from,
		spine: "right"
	};
	const back = mobileSingle ? {
		kind: "both",
		item: fw ? to : from,
		spine: "right"
	} : fw ? {
		kind: "photo",
		item: to,
		spine: "right"
	} : {
		kind: "text",
		item: to,
		spine: "left"
	};
	return /* @__PURE__ */ jsx("div", {
		className: "ft-leaf",
		"data-direction": fw ? "next" : "previous",
		"data-single": mobileSingle || void 0,
		children: (split ? ["a", "b"] : ["a"]).map((s) => /* @__PURE__ */ jsxs("div", {
			className: `bk-seg bk-seg--${s}`,
			"data-seg": s,
			children: [/* @__PURE__ */ jsx(Face, {
				side: "front",
				kind: front.kind,
				item: front.item,
				spine: front.spine,
				segment: s,
				split
			}), /* @__PURE__ */ jsx(Face, {
				side: "back",
				kind: back.kind,
				item: back.item,
				spine: back.spine,
				segment: s,
				split
			})]
		}, s))
	});
}
function BlogBook() {
	const cards = articles, light = useLightMotion(), mobile = useMedia("(max-width: 799px)");
	const [sel, setSel] = useState(0);
	const [view, setView] = useState({
		l: 0,
		r: 0
	});
	const [turn, setTurn] = useState(null);
	const [tip, setTip] = useState(false), [hint, setHint] = useState(false), [breathe, setBreathe] = useState(false);
	const hintRef = useRef(null);
	const windowRef = useRef(null), selected = useRef(0), serial = useRef(0), touch = useRef(null), wasLight = useRef(light);
	const canAnimate = () => !light && typeof Element.prototype.animate === "function";
	const rootRef = useRef(null);
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				cards.forEach((c) => {
					const img = new Image();
					img.sizes = "(max-width:799px) 90vw, 42vw";
					img.srcset = c.image.srcset || "";
					img.src = c.image.src;
				});
				observer.disconnect();
			}
		}, { rootMargin: "50% 0px" });
		observer.observe(rootRef.current);
		return () => observer.disconnect();
	}, [cards]);
	useEffect(() => {
		if (!mobile) {
			setTip(false);
			setHint(false);
			return;
		}
		const seen = hintSeen();
		setTip(!seen);
		if (seen) return void 0;
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			observer.disconnect();
			if (!light && typeof Element.prototype.animate === "function") {
				setBreathe(true);
				setHint(true);
			}
		}, { threshold: .6 });
		observer.observe(hintRef.current);
		return () => observer.disconnect();
	}, [mobile, light]);
	useLayoutEffect(() => {
		if (!hint || turn) return void 0;
		const root = windowRef.current;
		if (!root) return void 0;
		const a = root.querySelector(".ft-leaf").animate([
			{ transform: "translateZ(0) rotateY(0deg)" },
			{
				transform: "translateZ(12px) rotateY(-15deg)",
				offset: .45
			},
			{ transform: "translateZ(0) rotateY(0deg)" }
		], {
			duration: 1100,
			easing: "ease-in-out",
			fill: "both"
		});
		const shades = [...root.querySelectorAll(".bk-shade")].map((el) => el.animate([
			{ opacity: 0 },
			{
				opacity: .28,
				offset: .45
			},
			{ opacity: 0 }
		], {
			duration: 1100,
			easing: "ease-in-out",
			fill: "both"
		}));
		a.onfinish = () => {
			setHint(false);
			setBreathe(false);
		};
		return () => {
			a.onfinish = null;
			a.cancel();
			shades.forEach((x) => x.cancel());
		};
	}, [hint, turn]);
	const settle = (to) => {
		setView((v) => v.l === to && v.r === to ? v : {
			l: to,
			r: to
		});
		setTurn(null);
	};
	const choose = (i) => {
		i = Math.min(cards.length - 1, Math.max(0, i));
		const from = selected.current;
		if (i === from) return;
		selected.current = i;
		setSel(i);
		markSeen();
		setTip(false);
		setHint(false);
		if (!canAnimate()) {
			settle(i);
			return;
		}
		const forward = i > from;
		setView(mobile ? {
			l: forward ? i : from,
			r: forward ? i : from
		} : forward ? {
			l: from,
			r: i
		} : {
			l: i,
			r: from
		});
		setTurn({
			from,
			to: i,
			forward,
			id: ++serial.current
		});
	};
	const mounted = useRef(false);
	useLayoutEffect(() => {
		if (!mounted.current) {
			mounted.current = true;
			return;
		}
		if (light) rootRef.current?.querySelectorAll(".bk-fade").forEach((el) => el.animate?.([{ opacity: 0 }, { opacity: 1 }], {
			duration: 150,
			easing: "ease"
		}));
	}, [view.l, view.r]);
	useEffect(() => {
		if (light && !wasLight.current) settle(selected.current);
		wasLight.current = light;
	}, [light]);
	useEffect(() => {
		settle(selected.current);
	}, [mobile]);
	useLayoutEffect(() => {
		if (!turn) return void 0;
		const root = windowRef.current;
		if (!root) return void 0;
		const fw = turn.forward, opt = {
			duration: mobile ? 700 : 850,
			easing: EASE,
			fill: "both"
		};
		const anims = [];
		const play = (el, frames) => {
			if (el) anims.push(el.animate(frames, opt));
		};
		const leaf = root.querySelector(".ft-leaf");
		const single = mobile;
		const dir = fw ? -1 : 1;
		const rot = (a, z) => `translateZ(${z}px) rotateY(${a}deg)`;
		if (single && !fw) play(leaf, [
			{
				transform: rot(-180, 0),
				offset: 0
			},
			{
				transform: rot(-90, 24),
				offset: .5
			},
			{
				transform: rot(0, 0),
				offset: 1
			}
		]);
		else play(leaf, [
			{
				transform: rot(0, 0),
				offset: 0
			},
			{
				transform: rot(90 * dir, 24),
				offset: .5
			},
			{
				transform: rot(180 * dir, 0),
				offset: 1
			}
		]);
		if (single) play(leaf, fw ? [
			{
				opacity: 1,
				offset: 0
			},
			{
				opacity: 1,
				offset: 100 / 180
			},
			{
				opacity: 0,
				offset: 160 / 180
			},
			{
				opacity: 0,
				offset: 1
			}
		] : [
			{
				opacity: 0,
				offset: 0
			},
			{
				opacity: 0,
				offset: 20 / 180
			},
			{
				opacity: 1,
				offset: 80 / 180
			},
			{
				opacity: 1,
				offset: 1
			}
		]);
		else play(root.querySelector(".bk-seg--b"), ANGLE_B.map(([offset, a]) => ({
			transform: `rotateY(${fw ? a : -a}deg)`,
			offset
		})));
		root.querySelectorAll(".bk-shade").forEach((el) => play(el, [
			{
				opacity: 0,
				offset: 0
			},
			{
				opacity: .4,
				offset: .5
			},
			{
				opacity: 0,
				offset: 1
			}
		]));
		root.querySelectorAll(".bk-gloss").forEach((el) => play(el, [{
			transform: "translateX(-100%)",
			opacity: 1
		}, {
			transform: "translateX(733%)",
			opacity: 1
		}]));
		play(root.querySelector(".bk-cast"), [
			{
				opacity: 0,
				offset: 0
			},
			{
				opacity: 1,
				offset: 1 / 3
			},
			{
				opacity: 1,
				offset: 2 / 3
			},
			{
				opacity: 0,
				offset: 1
			}
		]);
		const main = anims[0];
		if (main) main.onfinish = () => {
			setView({
				l: turn.to,
				r: turn.to
			});
			setTurn((current) => current?.id === turn.id ? null : current);
		};
		return () => {
			anims.forEach((a) => {
				a.onfinish = null;
				a.cancel();
			});
		};
	}, [turn, mobile]);
	const onKey = (e, i) => {
		const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? cards.length - 1 : null;
		if (n === null || n < 0 || n >= cards.length) return;
		e.preventDefault();
		choose(n);
		const strip = e.currentTarget.parentElement, target = strip.children[n];
		target?.focus({ preventScroll: true });
		if (target) {
			const viewport = strip.getBoundingClientRect(), item = target.getBoundingClientRect();
			if (item.left < viewport.left + 4) strip.scrollLeft += item.left - viewport.left - 4;
			else if (item.right > viewport.right - 4) strip.scrollLeft += item.right - viewport.right + 4;
		}
	};
	const onTouchStart = (e) => {
		const t = e.touches[0];
		touch.current = {
			x: t.clientX,
			y: t.clientY
		};
	};
	const onTouchEnd = (e) => {
		const start = touch.current;
		touch.current = null;
		if (!start || !mobile) return;
		const t = e.changedTouches[0], dx = t.clientX - start.x, dy = t.clientY - start.y;
		if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.2) choose(selected.current + (dx < 0 ? 1 : -1));
	};
	const card = cards[sel], left = cards[view.l], right = cards[view.r];
	const fw = turn?.forward;
	return /* @__PURE__ */ jsxs("section", {
		ref: rootRef,
		className: "blog-book wrap section",
		"aria-labelledby": "blog-book-title",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "section-title",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "eyebrow",
				children: "Cuaderno de viaje"
			}), /* @__PURE__ */ jsx("h2", {
				id: "blog-book-title",
				children: "Ideas y consejos para tu viaje"
			})] }), /* @__PURE__ */ jsxs(Link, {
				className: "text-link",
				to: "/blog",
				children: ["Todas las notas", /* @__PURE__ */ jsx(Arrow, {})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "ft ft-book",
			"data-turning": Boolean(turn),
			"data-mobile": mobile || void 0,
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "ft-main",
					onTouchStart,
					onTouchEnd,
					children: /* @__PURE__ */ jsxs("div", {
						className: "bk-spread",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "bk-page bk-page--photo",
								children: /* @__PURE__ */ jsx("div", {
									className: "bk-fade",
									children: /* @__PURE__ */ jsx(PagePhoto, {
										item: left,
										link: card
									})
								}, view.l)
							}),
							/* @__PURE__ */ jsx("div", {
								className: "bk-page bk-page--text",
								children: /* @__PURE__ */ jsx("div", {
									className: "bk-fade",
									children: /* @__PURE__ */ jsx(PageText, {
										item: right,
										live: true
									})
								}, view.r)
							}),
							/* @__PURE__ */ jsx("span", {
								className: "bk-spine",
								"aria-hidden": "true"
							}),
							hint && !turn && mobile && /* @__PURE__ */ jsx("div", {
								ref: windowRef,
								className: "ft-turn-window",
								"aria-hidden": "true",
								inert: true,
								"data-direction": "next",
								children: /* @__PURE__ */ jsx(Leaf, {
									turn: {
										from: sel,
										to: sel,
										forward: true
									},
									cards,
									split: false,
									mobileSingle: true
								}, "hint")
							}),
							mobile && sel < cards.length - 1 && /* @__PURE__ */ jsx("span", {
								className: "bk-curl",
								"data-breathe": breathe || void 0,
								"aria-hidden": "true"
							}),
							turn && /* @__PURE__ */ jsxs("div", {
								ref: windowRef,
								className: "ft-turn-window",
								"aria-hidden": "true",
								inert: true,
								"data-direction": fw ? "next" : "previous",
								children: [/* @__PURE__ */ jsx("i", { className: "bk-cast" }), /* @__PURE__ */ jsx(Leaf, {
									turn,
									cards,
									split: !mobile,
									mobileSingle: mobile
								}, turn.id)]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					ref: hintRef,
					className: "bk-hint-anchor"
				}),
				mobile && tip && /* @__PURE__ */ jsxs("p", {
					className: "bk-swipe",
					children: [/* @__PURE__ */ jsxs("svg", {
						viewBox: "0 0 24 24",
						width: "20",
						height: "20",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.75",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						focusable: "false",
						children: [/* @__PURE__ */ jsx("path", { d: "M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" }), /* @__PURE__ */ jsx("circle", {
							cx: "12",
							cy: "12",
							r: "2.2",
							fill: "currentColor",
							stroke: "none"
						})]
					}), "Desliza para pasar la página"]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bk-footer",
					children: [/* @__PURE__ */ jsx("div", {
						className: "ft-strip",
						role: "group",
						"aria-label": "Elegir nota",
						children: cards.map((x, i) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							className: "ft-thumb",
							"aria-pressed": i === sel,
							"aria-label": x.title,
							onClick: () => choose(i),
							onKeyDown: (e) => onKey(e, i),
							children: [/* @__PURE__ */ jsx("span", {
								className: "book-index",
								children: two$1(i + 1)
							}), /* @__PURE__ */ jsx("span", { children: x.tag })]
						}, x.slug))
					}), /* @__PURE__ */ jsxs("div", {
						className: "bk-ctl",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "ft-count",
							role: "status",
							"aria-live": "polite",
							children: [
								two$1(sel + 1),
								" / ",
								two$1(cards.length)
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "ft-nav",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Nota anterior",
								disabled: sel === 0,
								onClick: () => choose(selected.current - 1),
								children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Nota siguiente",
								disabled: sel === cards.length - 1,
								onClick: () => choose(selected.current + 1),
								children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
							})]
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/Different.jsx
var DIFERENTES = [
	{
		icon: "planeLanding",
		t: "Monitoreamos tu vuelo",
		d: "Seguimos el estado de tu vuelo hasta su aterrizaje en Medellín para coordinar tu recogida y estar preparados ante posibles cambios de horario."
	},
	{
		icon: "carFront",
		t: "Vehículos para tu recorrido",
		d: "Revisamos contigo la categoría, la capacidad y el equipaje para proponer el vehículo de tu servicio. La unidad y su disponibilidad se confirman al cotizar."
	},
	{
		icon: "users",
		t: "Un equipo que responde por ti",
		d: "Coordinamos el transporte, las paradas y el acompañamiento de tu recorrido. Antes de contratar, revisamos contigo los servicios incluidos en la propuesta."
	},
	{
		icon: "droplet",
		t: "Los detalles también cuentan",
		d: "Consulta la hidratación incluida en tu experiencia. Antes de salir, revisa con el equipo qué llevar según el recorrido y las necesidades de tu grupo."
	},
	{
		icon: "globe",
		t: "Experiencias 100% privadas",
		d: "Nuestra propuesta son tours privados para ti y tus acompañantes. Confirmamos el vehículo, el acompañamiento y las condiciones de cada recorrido al cotizar."
	},
	{
		icon: "clock",
		t: "Flexibilidad en tus horarios",
		d: "Cuéntanos tus intereses y el tiempo que tienes. Acordamos los horarios según el recorrido, las condiciones operativas y lo que necesitas."
	},
	{
		icon: "camera",
		t: "Recuerdos para llevar contigo",
		d: "Consulta las fotografías y los videos incluidos en tu recorrido. La propuesta detalla estos servicios para que sepas qué esperar antes de salir."
	},
	{
		icon: "shieldCheck",
		t: "Seguridad y respaldo legal",
		d: "Somos una empresa legalmente constituida, con Registro Nacional de Turismo (RNT 176384). Operamos con vehículos habilitados y las coberturas y pólizas aplicables a nuestros servicios."
	},
	{
		icon: "messageCircle",
		t: "Conversemos por WhatsApp",
		d: "Escríbenos para organizar tu viaje o consultar sobre tu servicio. La operación de transporte las 24 horas requiere reserva previa; la asesoría depende de la disponibilidad del equipo."
	},
	{
		icon: "heart",
		t: "Atención desde el primer contacto",
		d: "No solo organizamos recorridos. Escuchamos tus necesidades, te asesoramos y diseñamos experiencias que se ajustan a lo que realmente buscas."
	}
];
var two = (n) => String(n).padStart(2, "0");
var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
function Words({ text, from = 0, step = 60 }) {
	return t(text).split(" ").map((w, i, all) => /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
		className: "df-w",
		children: /* @__PURE__ */ jsx("span", {
			style: {
				"--i": from + i,
				"--st": `${step}ms`
			},
			children: w
		})
	}), i < all.length - 1 ? " " : null] }, i));
}
function Different() {
	const root = useRef(null), host = useRef(null), svg = useRef(null);
	const light = useLightMotion();
	const [armed, setArmed] = useState(false), [active, setActive] = useState(0);
	const activeRef = useRef(0);
	useLayoutEffect(() => {
		setArmed(!light);
	}, [light]);
	useEffect(() => {
		if (!armed) return void 0;
		const els = [...root.current.querySelectorAll("[data-rv]")];
		const io = new IntersectionObserver((entries) => entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("is-in");
				io.unobserve(e.target);
			}
		}), { rootMargin: "0px 0px -12% 0px" });
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, [armed]);
	useEffect(() => {
		const el = root.current, hostEl = host.current, s = svg.current;
		const base = s.querySelector(".df-route-base"), done = s.querySelector(".df-route-done"), dot = s.querySelector(".df-dot");
		const discs = [...hostEl.querySelectorAll(".df-disc")], cards = [...hostEl.querySelectorAll(".df-card")], endD = hostEl.querySelector(".df-end"), endM = hostEl.querySelector(".df-end-m"), closeT = hostEl.querySelector(".df-close-text");
		let len = 1, y0 = 0, yEnd = 1, hostTop = 0, centers = [], raf = 0, visible = false, q = light ? 1 : 0;
		const measure = () => {
			const hr = hostEl.getBoundingClientRect();
			hostTop = hr.top + scrollY;
			const wide = innerWidth >= 900, ctr = (d) => {
				const r = d.getBoundingClientRect();
				return [r.left + r.width / 2 - hr.left, r.top + r.height / 2 - hr.top];
			};
			const pts = discs.map(ctr), e = ctr(wide ? endD : endM);
			if (wide) {
				const cr = closeT.getBoundingClientRect();
				const xr = Math.min(hr.width - 12, cr.right - hr.left + 28);
				pts.push([xr, cr.top - hr.top - 24], [xr, e[1]]);
			}
			pts.push(e);
			let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
			for (let i = 1; i < pts.length; i++) {
				const [x1, y1] = pts[i - 1], [x2, y2] = pts[i], m = (y2 - y1) / 2;
				d += ` C${x1.toFixed(1)} ${(y1 + m).toFixed(1)} ${x2.toFixed(1)} ${(y2 - m).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
			}
			s.setAttribute("viewBox", `0 0 ${hr.width.toFixed(1)} ${hr.height.toFixed(1)}`);
			base.setAttribute("d", d);
			done.setAttribute("d", d);
			len = base.getTotalLength();
			done.style.strokeDasharray = `${len}`;
			y0 = pts[0][1];
			yEnd = pts[pts.length - 1][1];
			centers = cards.map((c) => {
				const r = c.getBoundingClientRect();
				return r.top + scrollY + r.height / 2;
			});
			paint(true);
		};
		const paint = (force) => {
			const vh = innerHeight, target = light ? 1 : clamp((scrollY + vh * .68 - hostTop - y0) / (yEnd - y0));
			if (force || Math.abs(target - q) > .12) q = target;
			else q += (target - q) * (1 - Math.exp(-16 / 80));
			const p = Math.abs(target - q) < 5e-4 ? target : q;
			q = p;
			done.style.strokeDashoffset = `${(len * (1 - p)).toFixed(1)}`;
			const pt = base.getPointAtLength(len * p);
			dot.style.transform = `translate(${pt.x.toFixed(1)}px,${pt.y.toFixed(1)}px)`;
			dot.classList.toggle("is-end", p > .995);
			if (!light && centers.length) {
				const mid = scrollY + vh * .5;
				let best = 0, bd = 1e9;
				centers.forEach((c, i) => {
					const dd = Math.abs(c - mid);
					if (dd < bd) {
						bd = dd;
						best = i;
					}
				});
				if (best !== activeRef.current) {
					activeRef.current = best;
					setActive(best);
				}
			}
			return Math.abs(target - q) > 5e-4;
		};
		const tick = () => {
			raf = 0;
			if (!visible || document.hidden) return;
			if (paint(false)) raf = requestAnimationFrame(tick);
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(tick);
		};
		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			if (visible) kick();
		}, { rootMargin: "200px 0px" });
		io.observe(el);
		const ro = new ResizeObserver(() => {
			measure();
		});
		ro.observe(hostEl);
		document.fonts?.ready.then(measure);
		if (!light) {
			addEventListener("scroll", kick, { passive: true });
			addEventListener("resize", kick, { passive: true });
		}
		measure();
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
			ro.disconnect();
			removeEventListener("scroll", kick);
			removeEventListener("resize", kick);
		};
	}, [light]);
	return /* @__PURE__ */ jsx("section", {
		ref: root,
		id: "diferentes",
		className: `df${armed ? " df--armed" : ""}${light ? " df--static" : ""}`,
		"aria-labelledby": "df-titulo",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "df-head",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow df-eyebrow",
						"data-rv": true,
						children: "Transporte y Turismo Medellín"
					}),
					/* @__PURE__ */ jsxs("h2", {
						id: "df-titulo",
						className: "df-title",
						"data-rv": true,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "df-l1",
								children: /* @__PURE__ */ jsx(Words, { text: "¿Qué nos hace" })
							}),
							" ",
							/* @__PURE__ */ jsx("span", {
								className: "df-l2",
								children: /* @__PURE__ */ jsx(Words, {
									text: "diferentes?",
									from: 3
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "df-intro",
						children: [/* @__PURE__ */ jsx("p", {
							className: "df-lead",
							"data-rv": true,
							children: "Queremos que conozcas Medellín con la tranquilidad de tener un equipo local a tu lado."
						}), /* @__PURE__ */ jsx("p", {
							className: "df-para",
							"data-rv": true,
							style: { "--d": "60ms" },
							children: "Todo empieza por escucharte: quién viaja, qué quiere conocer y cuánto tiempo tiene. Con esa información coordinamos el transporte y el recorrido, y te explicamos las condiciones antes de contratar."
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				ref: host,
				className: "df-host",
				children: [
					/* @__PURE__ */ jsxs("svg", {
						ref: svg,
						className: "df-route",
						"aria-hidden": "true",
						focusable: "false",
						preserveAspectRatio: "none",
						children: [
							/* @__PURE__ */ jsx("path", {
								className: "df-route-base",
								fill: "none"
							}),
							/* @__PURE__ */ jsx("path", {
								className: "df-route-done",
								fill: "none"
							}),
							/* @__PURE__ */ jsx("g", {
								className: "df-dot",
								children: /* @__PURE__ */ jsx("circle", {
									className: "df-dot-c",
									r: "5"
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "df-body",
						children: [/* @__PURE__ */ jsx("div", {
							className: "df-side",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsxs("div", {
								className: "df-sticky",
								children: [
									/* @__PURE__ */ jsxs("p", {
										className: "df-count",
										children: [two(active + 1), /* @__PURE__ */ jsxs("span", { children: [" / ", two(DIFERENTES.length)] })]
									}, `c${active}`),
									/* @__PURE__ */ jsxs("div", {
										className: "df-bigdisc",
										children: [/* @__PURE__ */ jsx("i", { className: "df-aura" }), /* @__PURE__ */ jsx("span", {
											className: "df-bigico",
											children: /* @__PURE__ */ jsx(Icon, {
												name: DIFERENTES[active].icon,
												size: 96,
												draw: true
											})
										}, `i${active}`)]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "df-bar",
										children: /* @__PURE__ */ jsx("i", { style: { transform: `scaleX(${(active + 1) / DIFERENTES.length})` } })
									})
								]
							})
						}), /* @__PURE__ */ jsx("ol", {
							className: "df-list",
							children: DIFERENTES.map((x, i) => /* @__PURE__ */ jsxs("li", {
								className: "df-card",
								"data-rv": true,
								"data-active": active === i ? "true" : "false",
								style: { "--d": `${i % 2 * 80}ms` },
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "df-top",
										children: [/* @__PURE__ */ jsx("span", {
											className: "df-disc",
											children: /* @__PURE__ */ jsx(Icon, {
												name: x.icon,
												size: 28,
												draw: true
											})
										}), /* @__PURE__ */ jsx("span", {
											className: "df-num",
											"aria-hidden": "true",
											children: two(i + 1)
										})]
									}),
									/* @__PURE__ */ jsx("h3", { children: x.t }),
									/* @__PURE__ */ jsx("p", { children: x.d })
								]
							}, x.t))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "df-close",
						children: [/* @__PURE__ */ jsx("p", {
							className: "df-close-eyebrow eyebrow",
							"data-rv": true,
							children: "Experiencias a otro nivel"
						}), /* @__PURE__ */ jsxs("p", {
							className: "df-close-text",
							"data-rv": true,
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "df-c1",
									children: /* @__PURE__ */ jsx(Words, {
										text: "No es solamente a dónde te llevamos",
										step: 40
									})
								}),
								" ",
								/* @__PURE__ */ jsxs("span", {
									className: "df-c2",
									children: [/* @__PURE__ */ jsx(Words, {
										text: "Es cómo te hacemos sentir durante todo el camino",
										from: 7,
										step: 40
									}), /* @__PURE__ */ jsxs("span", {
										className: "df-end-wrap",
										children: [".", /* @__PURE__ */ jsx("i", {
											className: "df-end",
											"aria-hidden": "true"
										})]
									})]
								}),
								/* @__PURE__ */ jsx("i", {
									className: "df-end-m",
									"aria-hidden": "true"
								})
							]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/HomeVideos.jsx
var Provisional = () => /* @__PURE__ */ jsx("span", {
	className: "vlabel",
	children: "Video próximamente"
});
function HomeHero() {
	const t = inicioTextos;
	return /* @__PURE__ */ jsx(HeroBlock, {
		video: inicioVideos.hero,
		eyebrow: t.lema,
		support: t.confianza,
		title: /* @__PURE__ */ jsxs("h1", {
			id: "hero-titulo",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "hero-l1",
					children: t.titular[0]
				}),
				" ",
				/* @__PURE__ */ jsx("span", {
					className: "hero-l2",
					children: t.titular[1]
				})
			]
		}),
		actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Link, {
			className: "button hero-btn hero-btn--explore",
			to: "/experiencias",
			children: ["Explorar experiencias", /* @__PURE__ */ jsx(Arrow, {})]
		}), /* @__PURE__ */ jsxs(Link, {
			className: "button hero-btn hero-btn--quote",
			to: "/cotizar",
			children: ["Planeemos tu viaje", /* @__PURE__ */ jsx(Arrow, {})]
		})] })
	});
}
function StoryVideo({ v }) {
	const light = useLightMotion(), ref = useRef(null), manual = useRef(false), [playing, setPlaying] = useState(false), [sound, setSound] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!v.src || !el) return void 0;
		prepVideo(el, true);
		if (!el.getAttribute("src")) el.src = v.src;
		const silence = () => {
			el.muted = true;
			el.defaultMuted = true;
			el.setAttribute("muted", "");
			setSound(false);
		};
		const sync = () => setPlaying(!el.paused);
		el.addEventListener("play", sync);
		el.addEventListener("pause", sync);
		const vol = () => setSound(!el.muted);
		el.addEventListener("volumechange", vol);
		const io = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				if (!light && !manual.current) {
					if (!el.muted) silence();
					safePlay(el);
				}
			} else {
				el.pause();
				silence();
			}
		}, { threshold: .5 });
		io.observe(el);
		const hide = () => {
			if (document.hidden) {
				el.pause();
				silence();
			}
		};
		document.addEventListener("visibilitychange", hide);
		return () => {
			io.disconnect();
			document.removeEventListener("visibilitychange", hide);
			el.removeEventListener("play", sync);
			el.removeEventListener("pause", sync);
			el.removeEventListener("volumechange", vol);
			el.pause();
			el.muted = true;
			el.removeAttribute("src");
			el.load();
		};
	}, [v.src, light]);
	const toggle = () => {
		const el = ref.current;
		if (el.paused) {
			manual.current = false;
			safePlay(el);
		} else {
			manual.current = true;
			el.pause();
			el.muted = true;
			el.setAttribute("muted", "");
			setSound(false);
		}
	};
	const toggleSound = async () => {
		const el = ref.current;
		if (!el) return;
		if (el.muted) {
			el.muted = false;
			el.removeAttribute("muted");
			el.defaultMuted = false;
			el.volume = 1;
			setSound(true);
			if (el.paused) {
				manual.current = false;
				try {
					await el.play();
				} catch {
					el.muted = true;
					el.setAttribute("muted", "");
					setSound(false);
					await el.play().catch(() => {});
				}
			}
		} else {
			el.muted = true;
			el.setAttribute("muted", "");
			setSound(false);
		}
	};
	if (!v.src) return /* @__PURE__ */ jsx("div", {
		className: "vframe vframe--story",
		children: /* @__PURE__ */ jsx(Provisional, {})
	});
	return /* @__PURE__ */ jsxs("figure", {
		className: "story-media",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "vframe vframe--story",
			children: [
				/* @__PURE__ */ jsx("video", {
					ref,
					src: v.src,
					poster: v.poster || void 0,
					muted: true,
					loop: true,
					playsInline: true,
					preload: "none",
					disablePictureInPicture: true,
					"aria-label": v.alt
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "vsound",
					"aria-pressed": sound,
					onClick: toggleSound,
					"aria-label": sound ? "Silenciar" : "Activar sonido",
					children: /* @__PURE__ */ jsx(SoundIcon, { on: sound })
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "vplay",
					"data-playing": playing,
					onClick: toggle,
					"aria-label": playing ? "Pausar video" : "Reproducir video",
					children: /* @__PURE__ */ jsx(PlayIcon, {
						playing,
						size: playing ? 16 : 24
					})
				})
			]
		}), /* @__PURE__ */ jsxs("figcaption", { children: [v.alt, v.instagramUrl && /* @__PURE__ */ jsxs(Fragment, { children: [" · ", /* @__PURE__ */ jsxs("a", {
			className: "text-link",
			href: v.instagramUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			children: ["Ver en Instagram", /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: " (se abre en una pestaña nueva)"
			})]
		})] })] })]
	});
}
function HomeStory() {
	const v = inicioVideos.historia;
	return /* @__PURE__ */ jsxs("section", {
		className: "home-story wrap",
		id: "historia",
		"aria-labelledby": "historia-titulo",
		children: [/* @__PURE__ */ jsx(StoryVideo, { v }), /* @__PURE__ */ jsxs("div", {
			className: "story-copy",
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Más que llegar" }),
				/* @__PURE__ */ jsxs("h2", {
					id: "historia-titulo",
					children: [
						"Hay una Medellín que se mira.",
						/* @__PURE__ */ jsx("br", {}),
						"Y otra que se ",
						/* @__PURE__ */ jsx("em", { children: "vive" })
					]
				}),
				/* @__PURE__ */ jsx("p", { children: "La encuentras en una conversación, en el color de una calle y en la curva que abre un nuevo paisaje. Queremos acompañarte a descubrirla con el cuidado de un equipo local." }),
				/* @__PURE__ */ jsxs(Link, {
					className: "button secondary",
					to: "/nosotros",
					children: ["Conoce al equipo", /* @__PURE__ */ jsx(Arrow, {})]
				})
			]
		})]
	});
}
function HomeClose() {
	const f = inicioTextos.fases.final;
	return /* @__PURE__ */ jsx("section", {
		className: "home-close section",
		"aria-labelledby": "cierre-titulo",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ jsxs("h2", {
					id: "cierre-titulo",
					children: [
						"Tu viaje, tus tiempos,",
						/* @__PURE__ */ jsx("br", {}),
						"tu ",
						/* @__PURE__ */ jsx("em", { children: "experiencia" })
					]
				}),
				/* @__PURE__ */ jsx("p", { children: f.subtitulo }),
				/* @__PURE__ */ jsxs("div", {
					className: "close-actions",
					children: [/* @__PURE__ */ jsxs(Link, {
						className: "button",
						to: "/cotizar",
						children: ["Planeemos tu viaje", /* @__PURE__ */ jsx(Arrow, {})]
					}), /* @__PURE__ */ jsxs("a", {
						className: "button secondary",
						href: whatsapp(),
						target: "_blank",
						rel: "noopener noreferrer",
						children: ["Escríbenos por WhatsApp", /* @__PURE__ */ jsx(Arrow, {})]
					})]
				})
			]
		})
	});
}
var TYPE_LABEL = {
	reel: "Reel",
	carousel: "Carrusel",
	photo: "Publicación"
};
var REEL = "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm0 5h16M9 3l3 5m3-5 3 5M10 12.5v5l4.5-2.5-4.5-2.5Z";
var CAROUSEL = "M7 7h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm2-3h9a3 3 0 0 1 3 3v9";
function HomeSocial() {
	const { profile, tiktok, posts } = instagram, st = profile.stats;
	const stats = st ? [
		["Publicaciones", st.posts],
		["Seguidores", st.followers],
		["Siguiendo", st.following]
	].filter(([, v]) => v) : [];
	return /* @__PURE__ */ jsxs("section", {
		className: "home-social wrap section",
		"aria-labelledby": "redes-titulo",
		children: [
			/* @__PURE__ */ jsx("h2", {
				id: "redes-titulo",
				children: "Síguenos en redes"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "ig-head",
				children: [
					/* @__PURE__ */ jsx(Logo, {
						size: 112,
						sizes: "112px",
						className: "ig-avatar",
						lazy: true
					}),
					/* @__PURE__ */ jsx("p", {
						className: "ig-name",
						children: profile.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "ig-handle",
						children: profile.handle
					}),
					stats.length > 0 && /* @__PURE__ */ jsx("dl", {
						className: "ig-stats",
						children: stats.map(([label, value]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: label }), /* @__PURE__ */ jsx("dd", { children: value })] }, label))
					}),
					/* @__PURE__ */ jsxs("a", {
						className: "ig-follow",
						href: profile.url,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": `Seguir a ${profile.handle} en Instagram (se abre en una pestaña nueva)`,
						children: [/* @__PURE__ */ jsx(SocialIcon, {
							id: "instagram",
							size: 20
						}), "Seguir"]
					})
				]
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "ig-grid",
				role: "list",
				children: posts.map((post, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
					className: "ig-tile",
					href: post.url,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `${post.alt || `${TYPE_LABEL[post.type] || "Publicación"} ${i + 1} de Instagram`} (se abre en una pestaña nueva)`,
					children: [post.image && /* @__PURE__ */ jsx("img", {
						src: post.image,
						srcSet: post.srcSet,
						sizes: "(max-width: 699px) 50vw, 25vw",
						alt: post.alt || "",
						width: post.width || 640,
						height: post.height || 640,
						loading: "lazy",
						decoding: "async"
					}), (post.type === "reel" || post.type === "carousel") && /* @__PURE__ */ jsx("svg", {
						className: "ig-type",
						viewBox: "0 0 24 24",
						width: "24",
						height: "24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						focusable: "false",
						children: /* @__PURE__ */ jsx("path", { d: post.type === "reel" ? REEL : CAROUSEL })
					})]
				}) }, i))
			}),
			/* @__PURE__ */ jsxs("a", {
				className: "text-link ig-tiktok",
				href: tiktok.url,
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": `También en TikTok ${tiktok.handle} (se abre en una pestaña nueva)`,
				children: [
					"También en TikTok ",
					tiktok.handle,
					" ",
					/* @__PURE__ */ jsx(Arrow, {})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/Home.jsx
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(HomeHero, {}),
		/* @__PURE__ */ jsx(HomeStory, {}),
		/* @__PURE__ */ jsx(ScrubHero, {
			nextId: "th-inicio",
			cards: tours.map((t, i) => ({
				slug: t.slug,
				name: t.name,
				n: i + 1
			})),
			summary: "Apertura: una baraja de doce experiencias. La carta superior se abre en una transición cinematográfica sobre Medellín que termina en la Plaza Botero y luego se despliegan las doce experiencias, cada una con su enlace."
		}),
		/* @__PURE__ */ jsx(TravelHand, {}),
		/* @__PURE__ */ jsxs("section", {
			className: "service-band wrap",
			id: "camino",
			tabIndex: -1,
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Cómo te acompañamos" }),
				/* @__PURE__ */ jsx("h2", { children: "Te acompañamos de principio a fin" }),
				/* @__PURE__ */ jsx("div", {
					className: "service-links",
					children: [
						[
							"01",
							"Traslados de aeropuerto",
							"/experiencias/traslados-aeropuerto-jmc"
						],
						[
							"02",
							"Recorridos privados",
							"/experiencias"
						],
						[
							"03",
							"Empresas, agencias y grupos",
							"/servicios"
						]
					].map(([n, name, url]) => /* @__PURE__ */ jsxs(Link, {
						to: url,
						children: [
							/* @__PURE__ */ jsx("span", { children: n }),
							/* @__PURE__ */ jsx("h3", { children: name }),
							/* @__PURE__ */ jsx(Arrow, {})
						]
					}, n))
				})
			]
		}),
		/* @__PURE__ */ jsx(Different, {}),
		/* @__PURE__ */ jsx(Reviews, {}),
		/* @__PURE__ */ jsxs("section", {
			className: "about-preview wrap section",
			children: [/* @__PURE__ */ jsx(Picture, {
				photo: nosotros.equipo.find((p) => p.src.includes("img-9257")),
				alt: "Equipo de T&T Medellín en fila delante de vans y automóviles de la flota"
			}), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Nuestro equipo" }),
				/* @__PURE__ */ jsx("h2", { children: "Un equipo local que te acompaña" }),
				/* @__PURE__ */ jsx("p", { children: "Desde los primeros traslados, aprendimos a escuchar. Esa cercanía sigue guiando nuestra forma de recibir y acompañar." }),
				/* @__PURE__ */ jsx(Button, {
					to: "/nosotros",
					children: "Conoce al equipo"
				})
			] })]
		}),
		/* @__PURE__ */ jsx(BlogBook, {}),
		/* @__PURE__ */ jsx("section", {
			className: "wrap section faq-page",
			children: /* @__PURE__ */ jsx(Faq, {
				items: FAQ_HOME,
				eyebrow: "Antes de decidir"
			})
		}),
		/* @__PURE__ */ jsx(HomeClose, {}),
		/* @__PURE__ */ jsx(HomeSocial, {})
	] });
}
//#endregion
export { Home as default };
