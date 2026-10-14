import { A as SocialIcon, C as useMedia, D as textoFase, E as inicioTextos, F as company, I as whatsapp, M as Fragment$1, N as jsx, P as jsxs, S as useLightMotion, T as CHAPTERS, c as Arrow, f as Picture, l as Button, n as photos, o as rawTours, r as tours, t as articles, u as Eyebrow } from "../entry-server.js";
import { t as Reviews } from "./Reviews-CZkkVS5X.js";
/* empty css                       */
import { Link } from "react-router-dom";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
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
var clamp$1 = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var lerp = (a, b, t) => a + (b - a) * t;
var smooth = (t) => {
	t = clamp$1(t);
	return t * t * (3 - 2 * t);
};
/** Límites del recorrido en svh. Fase del clip: 165 svh escritorio / 140 svh móvil (ajuste aprobado, se conserva). */
function timeline(mobile) {
	if (mobile) return {
		t0: 24,
		t1: 64,
		t2: 204,
		t3: 228,
		t4: 276,
		t5: 300,
		t6: 708,
		total: 732,
		clip: 140
	};
	return {
		t0: 30,
		t1: 80,
		t2: 245,
		t3: 260,
		t4: 305,
		t5: 335,
		t6: 743,
		total: 767,
		clip: 165
	};
}
/** Progreso (svh) en el que la carta i queda enfocada (meseta). */
var uForCard = (T, i) => T.t5 + 34 * i + 34 * .2;
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
/** Estado derivado de u: fase de interfaz, ventana del marco, foco de cartas. */
function stateAt(u, T, mobile) {
	let ui = "deck";
	if (u >= T.t0) ui = "flip";
	if (u >= T.t1) ui = "clip";
	if (u >= T.t3) ui = "shrink";
	if (mobile && u >= T.t4) ui = "reveal";
	if (!mobile && u >= T.t3 + .5 * (T.t4 - T.t3)) ui = "deck";
	if (!mobile && u >= T.t4) ui = "fan";
	if (u >= T.t5) ui = "cards";
	let w = 0;
	if (u >= T.t0 && u < T.t1) w = smooth((u - T.t0) / (T.t1 - T.t0));
	else if (u >= T.t1 && u < T.t3) w = 1;
	else if (u >= T.t3 && u < T.t4) w = 1 - smooth((u - T.t3) / (T.t4 - T.t3));
	let D;
	if (u < T.t1) D = 1 - smooth((u - T.t0) / (.45 * (T.t1 - T.t0)));
	else if (u < T.t3) D = 0;
	else if (u < T.t4) D = mobile ? 0 : smooth((u - T.t3 - .3 * (T.t4 - T.t3)) / (.7 * (T.t4 - T.t3)));
	else D = mobile ? 0 : 1 - smooth((u - T.t4) / (.35 * (T.t5 - T.t4)));
	const clipT = clamp$1((u - T.t1) / (T.t2 - T.t1));
	const fanT = smooth((u - T.t4) / (T.t5 - T.t4));
	let f = 0;
	if (u >= T.t5) {
		const raw = clamp$1((u - T.t5) / 34, 0, 12);
		const i = Math.min(11, Math.floor(raw));
		f = i + (i < 11 ? smooth((raw - i - .4) / .6) : 0);
	}
	const active = Math.round(f);
	const sh = clamp$1(u / T.t0);
	return {
		ui,
		w,
		D,
		clipT,
		fanT,
		f,
		active,
		sh
	};
}
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
		Hd = clamp$1(A - (t1Top + line + gapT + pb) - 2 * rotAllow(300), 150, 300);
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
		m
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
/** Posición de la carta i: mezcla baraja → columna (fan) → rejilla (gridT). Escribe en `out`. */
function cardPlace(d, st, i, out) {
	const { Bw, Bh, deck, focus, mobile } = d;
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
	if (mobile) {
		i - st.f;
		const a = st.fanT;
		const col = {
			x: focus.x,
			y: focus.y,
			s: 1,
			r: 0,
			o: i === st.active ? 1 : 0,
			z: i === st.active ? 200 : 1
		};
		for (const k of [
			"x",
			"y",
			"s",
			"r"
		]) out[k] = lerp(dk[k], col[k], a);
		out.o = st.clipT === 1 ? col.o * a : dk.o * (1 - smooth(st.w / .2));
		out.z = a > 0 ? col.z : dk.z;
		return out;
	}
	const dd = i - st.f, ad = Math.abs(dd), sg = Math.sign(dd);
	const near = Math.min(ad, 1), far = Math.max(0, ad - 1);
	const sc = (1 - .6 * smooth(near)) * (1 - .06 * far);
	const col = {
		x: focus.x + sg * Bw * ((sg < 0 ? .78 : .62) * near + .4 * far),
		y: focus.y + sg * Bh * ((sg < 0 ? .12 : .8) * near + (sg < 0 ? .2 : .3) * far),
		s: sc,
		r: clamp$1(dd, -2.5, 2.5) * 4.5,
		o: clamp$1(3 - ad, 0, 1),
		z: Math.round(200 - ad * 20)
	};
	const a = st.fanT;
	const mix = (k) => lerp(dk[k], col[k], a);
	out.x = mix("x");
	out.y = mix("y");
	out.s = mix("s");
	out.r = mix("r");
	out.o = mix("o");
	out.z = a < .5 ? dk.z : col.z;
	if (st.w > .9) out.o = 0;
	return out;
}
//#endregion
//#region src/ScrubHero.jsx
var BASE = "/media/inicio";
var CARDS = "/media/baraja";
var MOBILE_QUERY = "(max-width: 799px)";
var REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
var LOW_HEIGHT_QUERY = "(max-height: 560px)";
var REDUCE_KEY = "tyt-reducir-movimiento";
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
		-4
	],
	[
		.2,
		.66,
		120,
		.15,
		7,
		3
	],
	[
		.8,
		.22,
		140,
		.2,
		4,
		4
	],
	[
		.9,
		.46,
		124,
		.3,
		10,
		-3
	]
];
var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var readReduce = () => {
	try {
		return localStorage.getItem(REDUCE_KEY) === "1";
	} catch {
		return false;
	}
};
var writeReduce = (on) => {
	try {
		if (on) localStorage.setItem(REDUCE_KEY, "1");
		else localStorage.removeItem(REDUCE_KEY);
	} catch {}
};
var osReduce = () => typeof window !== "undefined" && window.matchMedia(REDUCE_QUERY).matches;
var prefersStatic = (user) => {
	if (typeof window === "undefined") return true;
	if (user || osReduce() || window.matchMedia(LOW_HEIGHT_QUERY).matches) return true;
	const c = navigator.connection;
	return Boolean(c && (c.saveData || [
		"slow-2g",
		"2g",
		"3g"
	].includes(c.effectiveType)));
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
var copy = (slug) => inicioTextos.cartas[slug];
var two$1 = (n) => String(n).padStart(2, "0");
function CartaLista({ card }) {
	const c = copy(card.slug);
	return /* @__PURE__ */ jsxs(Link, {
		className: "sc-card",
		to: `/experiencias/${card.slug}`,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "sc-img",
				children: /* @__PURE__ */ jsx("img", {
					src: cardImg(card.slug, "t"),
					srcSet: `${cardImg(card.slug, "t")} 320w, ${cardImg(card.slug, "m")} 400w, ${cardImg(card.slug, "d")} 640w`,
					sizes: "(max-width: 600px) 46vw, (max-width: 1000px) 30vw, 22vw",
					width: "320",
					height: "400",
					alt: "",
					loading: "lazy",
					decoding: "async"
				})
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "sc-count",
				children: [
					two$1(card.n),
					" / ",
					12
				]
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "sc-name",
				children: card.name
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "sc-line",
				children: [
					/* @__PURE__ */ jsxs("b", { children: [c.emocion, ":"] }),
					" ",
					c.frase
				]
			})
		]
	});
}
function ScrubHero({ cards, skipLabel = "Saltar introducción", nextId, summary }) {
	const root = useRef(null), track = useRef(null), stage = useRef(null), canvas = useRef(null), skipRef = useRef(null), media = useRef(null);
	const floatRef = useRef(null), deckRef = useRef(null), mqRef = useRef(null), titleRef = useRef(null), stripRef = useRef(null), stackRef = useRef(null);
	const api = useRef({
		jump: () => {},
		step: () => {},
		active: 0
	});
	const [ready, setReady] = useState(false);
	const [reduce, setReduce] = useState(false);
	const [mode, setMode] = useState("static");
	const tightKey = useRef("");
	const [mobile, setMobile] = useState(false);
	const reduceRef = useRef(reduce);
	reduceRef.current = reduce;
	useLayoutEffect(() => {
		const user = readReduce();
		reduceRef.current = user;
		setReduce(user);
		setMobile(window.matchMedia(MOBILE_QUERY).matches);
		setMode(prefersStatic(user) ? "static" : "scrub");
		setReady(true);
	}, []);
	const osNow = ready && osReduce();
	useEffect(() => {
		const queries = [REDUCE_QUERY, LOW_HEIGHT_QUERY].map((q) => window.matchMedia(q));
		const size = window.matchMedia(MOBILE_QUERY);
		const onReduce = () => setMode((m) => prefersStatic(reduceRef.current) ? "static" : m === "failed" || m === "tight" ? m : "scrub");
		const onSize = () => setMobile(size.matches);
		const onResize = () => setMode((m) => m === "tight" && tightKey.current !== `${innerWidth}x${innerHeight}` ? prefersStatic(reduceRef.current) ? "static" : "scrub" : m);
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
		setMode((m) => prefersStatic(next) ? "static" : m === "failed" || m === "tight" ? m : "scrub");
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
		const CAP_C2 = [PLAZA, T.t3 + .5 * (T.t4 - T.t3)];
		const blobs = new Array(count).fill(null), full = new Array(count).fill(null), low = new Array(count).fill(null);
		const pending = /* @__PURE__ */ new Set(), controller = new AbortController();
		let raf = 0, visible = true, destroyed = false, lastKey = "", ui = "", cap = "", chapter = 0, activeCard = -1, loaded = 0, failures = 0;
		let W = 0, H = 0, stageTop = 92, q = null, lastT = 0, center = 0, version = 0, live = 0, peak = 0, bytes = 0, peakBytes = 0, dims = null, mqWidths = [], span = 1;
		const fw = {}, cp = {}, lastCard = new Array(12).fill(""), lastFx = {};
		const cardEls = deckRef.current ? [...deckRef.current.querySelectorAll(".bd-card")] : [];
		const fullImgs = cardEls.map((el) => el.querySelector(".bd-full"));
		const mqItems = mqRef.current ? [...mqRef.current.querySelectorAll(".bd-mq-item")] : [];
		const fxEls = titleRef.current ? [...titleRef.current.querySelectorAll("[data-fx]")] : [], stripEl = stripRef.current;
		const floatEls = floatRef.current ? [...floatRef.current.querySelectorAll(".bd-float")] : [];
		const capEls = [...stageEl.querySelectorAll(".bd-cap")], planEls = [...stageEl.querySelectorAll(".bd-plan")], stripBtns = [...stageEl.querySelectorAll(".scrub-strip [data-i]")];
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
			stageEl.style.setProperty("--deck-top", `${dims.deck.y - dims.Hd / 2}px`);
			stageEl.style.setProperty("--deck-bottom", `${dims.deck.y + dims.Hd / 2}px`);
			const room = Math.max(40, (dims.focus.y - dims.Bh / 2 - 22 - 26) / .9), usable = .9 * (dims.W - 2 * dims.pad);
			mqWidths = mqItems.map((el) => {
				el.style.fontSize = "100px";
				const w100 = el.firstElementChild?.getBoundingClientRect().width || 1, size = Math.min(120, room, usable * 100 / w100);
				el.style.fontSize = `${size.toFixed(1)}px`;
				return w100 * size / 100;
			});
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
		const wantFull = (from, to) => {
			for (let i = Math.max(0, from); i <= Math.min(11, to); i++) {
				const img = fullImgs[i];
				if (img && !img.getAttribute("src")) img.setAttribute("src", img.dataset.src);
			}
		};
		const place = (u, st) => {
			frameWindow(dims, st.w, fw, st.clipT);
			const fullFrame = st.w >= .999 && (!mobile || st.clipT <= .6);
			const fkey = fullFrame ? "full" : `${fw.tx.toFixed(1)}|${fw.ty.toFixed(1)}|${fw.rot.toFixed(2)}|${fw.s.toFixed(4)}|${fw.ix.toFixed(1)}|${fw.iy.toFixed(1)}|${fw.r.toFixed(2)}`;
			const fo = 1 - smooth(clamp(st.fanT * 2));
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
				mediaEl.style.opacity = String(fo);
				mediaEl.style.visibility = fo < .01 ? "hidden" : "visible";
			}
			for (let i = 0; i < cardEls.length; i++) {
				cardPlace(dims, st, i, cp);
				if (mobile) {
					const interactive = st.ui === "cards" && i === st.active;
					cardEls[i].tabIndex = interactive ? 0 : -1;
					cardEls[i].setAttribute("aria-hidden", String(!interactive));
					cardEls[i].style.pointerEvents = interactive ? "auto" : "none";
				}
				const key = `${cp.x.toFixed(1)}|${cp.y.toFixed(1)}|${cp.r.toFixed(2)}|${cp.s.toFixed(4)}|${cp.o.toFixed(3)}|${cp.z}`;
				if (key === lastCard[i]) continue;
				lastCard[i] = key;
				const el = cardEls[i];
				el.style.transform = `translate3d(${cp.x - dims.Bw / 2}px,${cp.y - dims.Bh / 2}px,0) rotate(${cp.r}deg) scale(${cp.s})`;
				el.style.opacity = cp.o.toFixed(3);
				el.style.zIndex = String(cp.z);
				el.style.setProperty("--inv", (1 / cp.s).toFixed(3));
			}
			const dKey = st.D.toFixed(3), dOp = mobile ? clamp(st.D * 2 - 1) : st.D, dMove = mobile ? .035 : .05;
			if (lastFx.d !== dKey) {
				lastFx.d = dKey;
				for (const el of fxEls) {
					const dir = Number(el.dataset.fx || 0);
					el.style.opacity = dOp.toFixed(3);
					el.style.transform = dir ? `translate3d(0,${(1 - st.D) * dir * dims.H * dMove}px,0)` : "";
					el.style.visibility = dOp < .01 ? "hidden" : "visible";
				}
			}
			const fp = clamp(u / T.t1), fk = `${fp.toFixed(3)}|${dKey}`;
			if (floatEls.length && lastFx.f !== fk) {
				lastFx.f = fk;
				for (const el of floatEls) {
					const dp = Number(el.dataset.dp), x = Number(el.dataset.fx) * dims.W, y = Number(el.dataset.fy) * dims.H - dp * 720 * fp;
					el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${Number(el.dataset.rot)}deg)`;
					el.style.opacity = st.D.toFixed(3);
					el.style.visibility = st.D < .01 ? "hidden" : "visible";
				}
			}
			const sv = Math.max(st.D, st.fanT), sKey = sv.toFixed(3);
			if (stripEl && lastFx.s !== sKey) {
				lastFx.s = sKey;
				stripEl.style.opacity = sKey;
				stripEl.style.visibility = sv < .01 ? "hidden" : "visible";
			}
			const mqA = st.fanT, drift = dims.W * .04;
			for (let i = 0; i < mqItems.length; i++) {
				const a = st.f - i, o = clamp(1 - Math.abs(a) * 1.6) * mqA;
				const dx = -Math.sign(a) * drift * clamp((Math.abs(a) - .3) / .7);
				const mk = `${o.toFixed(2)}|${Math.round(dx)}`;
				if (lastFx[`m${i}`] === mk) continue;
				lastFx[`m${i}`] = mk;
				const el = mqItems[i];
				el.style.opacity = o.toFixed(3);
				el.style.visibility = o < .01 ? "hidden" : "visible";
				if (o >= .01) el.style.transform = `translate3d(${(dims.W - mqWidths[i]) / 2 + dx}px,0,0)`;
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
			const target = clamp((stageTop - rect.top) / span);
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
			if (mobile) stageEl.dataset.phase = u < T.t2 ? "film" : u < T.t3 ? "hold" : u < T.t4 ? "shrink" : u < T.t5 ? "reveal" : "cards";
			if (st.ui !== ui) {
				ui = st.ui;
				stageEl.dataset.ui = ui;
			}
			let newCap = "";
			if (st.ui === "cards") newCap = "cards";
			else if (u >= CAP_C1[0] && u < CAP_C1[1]) newCap = "c1";
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
			const act = st.ui === "cards" ? st.active : -1;
			if (act !== activeCard) {
				stageEl.style.setProperty("--card-enter", act >= activeCard ? "22px" : "-22px");
				cardEls.forEach((el, i) => el.classList.toggle("is-current", i === act));
				activeCard = act;
				stageEl.dataset.card = String(act);
				api.current.active = act;
				capEls.forEach((el, i) => el.classList.toggle("is-on", i === act));
				planEls.forEach((el, i) => el.classList.toggle("is-on", i === act));
				stripBtns.forEach((el, i) => el.toggleAttribute("data-on", i === act));
				if (act >= 0) wantFull(act - 1, act + 2);
			}
			if (u >= T.t2 && u < T.t5 && !fullImgs[0]?.getAttribute("src")) wantFull(0, 2);
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
		api.current.jump = (u) => {
			const top = trackEl.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({
				top: top - stageTop + u / T.total * span,
				behavior: "instant"
			});
			schedule();
		};
		api.current.step = (dir) => api.current.jump(uForCard(T, clamp(Math.max(api.current.active, 0) + dir, 0, 11)));
		api.current.card = (i) => {
			if (Math.abs((q === null ? 0 : q * T.total) - uForCard(T, i)) > 6) api.current.jump(uForCard(T, i));
		};
		api.current.T = T;
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
			q = clamp((stageTop - trackEl.getBoundingClientRect().top) / Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight));
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
			for (const el of [...floatEls, ...stripEl ? stripEl.querySelectorAll("i[data-bg]") : []]) if (el.dataset.bg) el.style.backgroundImage = `url(${el.dataset.bg})`;
			load();
		};
		const near = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				start();
				near.disconnect();
			}
		}, { rootMargin: "100% 0px" });
		near.observe(section);
		return () => {
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
				stripEl,
				...floatEls,
				...cardEls,
				...mqItems,
				...fxEls
			]) el?.removeAttribute("style");
			stageEl.dataset.ui = "deck";
			stageEl.dataset.cap = "";
			stageEl.dataset.ch = "1";
			stageEl.dataset.card = "-1";
			for (const k of [
				"--bw",
				"--bh",
				"--stage-h",
				"--m-t1",
				"--deck-top",
				"--deck-bottom"
			]) stageEl.style.removeProperty(k);
			delete stageEl.dataset.short;
			delete stageEl.dataset.phase;
			api.current.jump = () => {};
			api.current.step = () => {};
			api.current.card = () => {};
		};
	}, [
		ready,
		mode,
		mobile
	]);
	const skip = () => {
		const next = nextId && document.getElementById(nextId);
		if (!next) return;
		next.scrollIntoView({
			behavior: "instant",
			block: "start"
		});
		next.focus({ preventScroll: true });
	};
	const tilt = (e) => {
		if (e.pointerType !== "mouse") return;
		const el = e.currentTarget.querySelector(".bd-tilt");
		if (!el) return;
		const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
		el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
		el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
	};
	const untilt = (e) => {
		const el = e.currentTarget.querySelector(".bd-tilt");
		if (el) {
			el.style.removeProperty("--ry");
			el.style.removeProperty("--rx");
		}
	};
	const onCardKey = (e, i) => {
		const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
		if (next === null || next < 0 || next >= 12) return;
		deckRef.current?.querySelectorAll(".bd-card")[next]?.focus({ preventScroll: true });
	};
	const staticMode = mode !== "scrub";
	const animated = !staticMode;
	const deckLinks = animated;
	const t = inicioTextos;
	const bar = /* @__PURE__ */ jsx("button", {
		type: "button",
		className: "scrub-motion",
		"aria-pressed": reduce || osNow,
		disabled: osNow,
		onClick: toggleReduce,
		children: reduce || osNow ? "Activar movimiento" : "Reducir movimiento"
	});
	return /* @__PURE__ */ jsxs("section", {
		ref: root,
		className: `scrub-hero ${staticMode ? "is-static" : ""}`,
		"data-hydrated": ready ? "true" : "false",
		"aria-label": "Elige tu próximo recuerdo",
		children: [
			/* @__PURE__ */ jsx("div", {
				ref: track,
				className: "scrub-track",
				style: animated ? { "--total": timeline(mobile).total } : void 0,
				children: /* @__PURE__ */ jsxs("div", {
					ref: stage,
					className: "scrub-stage",
					"data-ui": "deck",
					"data-cap": "",
					"data-ch": "1",
					"data-card": "-1",
					"data-textos": t.estado,
					children: [
						animated && !mobile && /* @__PURE__ */ jsx("div", {
							ref: mqRef,
							className: "bd-mq",
							"aria-hidden": "true",
							children: cards.map((c) => {
								const place = copy(c.slug).lugar;
								return /* @__PURE__ */ jsx("p", {
									className: "bd-mq-item",
									children: /* @__PURE__ */ jsx("span", { children: place })
								}, c.slug);
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							ref: media,
							className: "scrub-media",
							children: [/* @__PURE__ */ jsxs("picture", {
								className: "scrub-poster",
								children: [
									/* @__PURE__ */ jsx("source", {
										media: MOBILE_QUERY,
										type: "image/avif",
										srcSet: `${BASE}/poster-m.avif`
									}),
									/* @__PURE__ */ jsx("source", {
										media: MOBILE_QUERY,
										type: "image/webp",
										srcSet: `${BASE}/poster-m.webp`
									}),
									/* @__PURE__ */ jsx("source", {
										type: "image/avif",
										srcSet: `${BASE}/poster-1280.avif 1280w, ${BASE}/poster-1600.avif 1600w`,
										sizes: "100vw"
									}),
									/* @__PURE__ */ jsx("img", {
										src: `${BASE}/poster-1600.webp`,
										srcSet: `${BASE}/poster-1280.webp 1280w, ${BASE}/poster-1600.webp 1600w`,
										sizes: "100vw",
										width: "1600",
										height: "900",
										alt: "Vista de Medellín desde la ladera de la Comuna 13",
										loading: "lazy",
										decoding: "async"
									})
								]
							}), animated && /* @__PURE__ */ jsx("canvas", {
								ref: canvas,
								className: "scrub-canvas",
								"aria-hidden": "true"
							})]
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
												two$1(i + 1),
												" / ",
												two$1(CHAPTERS.length)
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
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "scrub-intro",
											children: [/* @__PURE__ */ jsx("p", {
												className: "scrub-vive",
												children: textoFase("c1").titular
											}), /* @__PURE__ */ jsx("p", {
												className: "scrub-vive-sub",
												children: textoFase("c1").subtitulo
											})]
										}),
										animated && ["c1", "c2"].map((id) => {
											const x = textoFase(id);
											return /* @__PURE__ */ jsxs("div", {
												className: "scrub-cap",
												"data-for": id,
												"aria-hidden": "true",
												children: [/* @__PURE__ */ jsx("p", {
													className: "scrub-cap-title",
													children: x.titular
												}), /* @__PURE__ */ jsx("p", {
													className: "scrub-cap-sub",
													children: x.subtitulo
												})]
											}, id);
										}),
										deckLinks && cards.map((c, i) => {
											const tx = copy(c.slug);
											return /* @__PURE__ */ jsxs("div", {
												className: "scrub-cap bd-cap",
												"data-for": "card",
												"data-i": i,
												children: [
													/* @__PURE__ */ jsxs("p", {
														className: "scrub-count bd-count",
														children: [
															two$1(i + 1),
															" / ",
															12
														]
													}),
													/* @__PURE__ */ jsx("h2", {
														className: "scrub-cap-title bd-name",
														children: c.name
													}),
													/* @__PURE__ */ jsxs("p", {
														className: "scrub-cap-sub",
														children: [
															/* @__PURE__ */ jsxs("b", { children: [tx.emocion, ":"] }),
															" ",
															tx.frase
														]
													})
												]
											}, c.slug);
										})
									]
								})
							})]
						}),
						animated && !mobile && /* @__PURE__ */ jsx("div", {
							ref: stripRef,
							className: "scrub-strip",
							"aria-hidden": "true",
							children: cards.map((c, i) => /* @__PURE__ */ jsx("button", {
								type: "button",
								tabIndex: -1,
								"data-i": i,
								onClick: () => api.current.jump(uForCard(api.current.T, i)),
								"aria-label": c.name,
								children: /* @__PURE__ */ jsx("img", {
									src: cardImg(c.slug, "t"),
									width: "48",
									height: "60",
									alt: "",
									decoding: "async",
									loading: "lazy"
								})
							}, c.slug))
						}),
						animated && mobile && /* @__PURE__ */ jsx("div", {
							ref: stripRef,
							className: "scrub-strip scrub-strip--m",
							"aria-hidden": "true",
							children: cards.map((c) => /* @__PURE__ */ jsx("i", { "data-bg": cardImg(c.slug, "t") }, c.slug))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "scrub-ctl",
							children: [animated && /* @__PURE__ */ jsxs("button", {
								ref: skipRef,
								type: "button",
								className: "scrub-skip",
								onClick: skip,
								children: [
									skipLabel,
									" ",
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										children: "↓"
									})
								]
							}), bar]
						}),
						animated && !mobile && /* @__PURE__ */ jsx("div", {
							ref: floatRef,
							className: "bd-floats",
							"aria-hidden": "true",
							children: FLOATS.map(([fx, fy, w, dp, ci, rot], k) => /* @__PURE__ */ jsx("i", {
								className: "bd-float",
								"data-fx": fx,
								"data-fy": fy,
								"data-dp": dp,
								"data-rot": rot,
								"data-bg": cardImg(cards[ci].slug, "t"),
								style: {
									width: w,
									height: w * 1.25
								}
							}, k))
						}),
						/* @__PURE__ */ jsx("div", {
							ref: deckRef,
							className: "bd-deck",
							children: animated && cards.map((c, i) => {
								const tx = copy(c.slug);
								return deckLinks ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Link, {
									className: "bd-card",
									to: `/experiencias/${c.slug}`,
									"aria-label": `${c.name}. ${tx.emocion}: ${tx.frase}`,
									onFocus: () => api.current.card(i),
									onKeyDown: (e) => onCardKey(e, i),
									onPointerMove: tilt,
									onPointerLeave: untilt,
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
										}), /* @__PURE__ */ jsx("img", {
											className: "bd-full",
											"data-src": cardImg(c.slug, "h"),
											width: "960",
											height: "1200",
											alt: "",
											decoding: "async",
											onLoad: (e) => e.currentTarget.classList.add("ready")
										})]
									})
								}) }, c.slug) : /* @__PURE__ */ jsx("div", {
									className: "bd-card",
									"aria-hidden": "true",
									children: /* @__PURE__ */ jsx("span", {
										className: "bd-tilt",
										children: /* @__PURE__ */ jsx("img", {
											className: "bd-thumb",
											src: cardImg(c.slug, "t"),
											width: "320",
											height: "400",
											alt: "",
											decoding: "async",
											loading: "lazy"
										})
									})
								}, c.slug);
							})
						}),
						animated && cards.map((c) => /* @__PURE__ */ jsxs(Link, {
							className: "bd-plan scrub-btn-plan",
							to: `/experiencias/${c.slug}#consulta`,
							"aria-label": `Planea esta experiencia: ${c.name}`,
							children: ["Planea esta experiencia ", /* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								children: "↗"
							})]
						}, c.slug)),
						animated && /* @__PURE__ */ jsxs("div", {
							className: "bd-nav",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "bd-arrow",
								"aria-label": "Carta anterior",
								onClick: () => api.current.step(-1),
								children: mobile ? "↑" : "←"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "bd-arrow",
								"aria-label": "Carta siguiente",
								onClick: () => api.current.step(1),
								children: mobile ? "↓" : "→"
							})]
						})
					]
				})
			}),
			summary && /* @__PURE__ */ jsx("p", {
				className: "scrub-summary",
				children: summary
			}),
			staticMode && /* @__PURE__ */ jsx("div", {
				className: "wrap sc-list",
				children: cards.map((card) => /* @__PURE__ */ jsx(CartaLista, { card }, card.slug))
			})
		]
	});
}
//#endregion
//#region src/ExperienceExplorer.jsx
var entries = [
	"city-tour-comuna-13",
	"tour-de-compras",
	"guatape-piedra-del-penol",
	"vuelta-a-oriente",
	"santa-fe-de-antioquia",
	"jardin-antioquia",
	"tour-del-cafe-medellin",
	"salto-del-buey",
	"tour-nocturno-medellin",
	"tour-miradores",
	"hacienda-napoles"
].map((slug) => {
	const t = rawTours.find((r) => r[0] === slug);
	return {
		slug,
		name: t[1],
		category: t[2]
	};
});
var MOBILE = "(max-width:899px)";
var idle = (fn) => window.requestIdleCallback ? window.requestIdleCallback(fn, { timeout: 2e3 }) : setTimeout(fn, 300);
function ExperienceExplorer() {
	const [tourIndex, setTour] = useState(0), [view, setView] = useState({
		photo: 0,
		prev: -1,
		slots: [
			0,
			1,
			2,
			3
		]
	}), [pin, setPin] = useState(false), [failed, setFailed] = useState(/* @__PURE__ */ new Set()), [near, setNear] = useState(false), [data, setData] = useState(null);
	const root = useRef(null), stage = useRef(null), tabs = useRef([]), fan = useRef(null), mobile = useRef(null), positions = useRef(/* @__PURE__ */ new Map()), manual = useRef(null), light = useLightMotion();
	const tour = entries[tourIndex], pictures = (data?.[tour.slug] || []).filter((p) => !failed.has(p.src)), copy = inicioTextos.cartas[tour.slug], index = pictures.length ? view.photo % pictures.length : 0;
	const setPhoto = (n) => setView((v) => {
		if (n === v.photo) return v;
		const slots = [...v.slots], cur = slots.indexOf(0), to = slots.indexOf(0) >= 0 && n < slots.length ? n : cur;
		[slots[cur], slots[to]] = [slots[to], slots[cur]];
		return {
			photo: n,
			prev: v.photo,
			slots
		};
	});
	useEffect(() => {
		let alive = true;
		const id = idle(() => import("./explorer-data-Dicxwxqs.js").then((m) => {
			if (alive) setData(m.pictures);
		}));
		return () => {
			alive = false;
			window.cancelIdleCallback?.(id);
		};
	}, []);
	useEffect(() => {
		const observer = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				setNear(true);
				observer.disconnect();
			}
		}, { rootMargin: "50%" });
		observer.observe(root.current);
		return () => observer.disconnect();
	}, []);
	useLayoutEffect(() => {
		const check = () => {
			if (!stage.current) return;
			const index = stage.current.querySelector(".explorer-index"), visual = stage.current.querySelector(".explorer-visual");
			setPin(!light && (innerWidth < 900 ? stage.current.scrollHeight <= innerHeight - 88 : innerWidth >= 1100 && Math.max(index.scrollHeight, visual.scrollHeight) <= innerHeight - 108));
		};
		const observer = new ResizeObserver(check);
		observer.observe(stage.current);
		window.addEventListener("resize", check);
		check();
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", check);
		};
	}, [light]);
	useEffect(() => {
		if (light || !pin && innerWidth < 1100 || pictures.length < 2) return;
		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				if (!root.current || !stage.current) return;
				const r = root.current.getBoundingClientRect();
				if (r.bottom < 0 || r.top > innerHeight || document.hidden) return;
				if (manual.current !== null && Math.abs(scrollY - manual.current) < 24) return;
				manual.current = null;
				const top = innerWidth < 900 ? 76 : 108;
				const span = Math.max(1, root.current.offsetHeight - stage.current.offsetHeight);
				const progress = Math.min(.999, Math.max(0, (top - r.top) / span));
				setPhoto(Math.floor(progress * pictures.length));
			});
		};
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		update();
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
			cancelAnimationFrame(frame);
		};
	}, [
		light,
		pin,
		pictures.length,
		tourIndex
	]);
	useEffect(() => {
		if (!near || navigator.connection?.saveData || light) return;
		const phone = matchMedia(MOBILE).matches;
		pictures.forEach((p, i) => {
			const d = Math.abs(i - index), around = d <= 1 || d === pictures.length - 1;
			if (phone) {
				if (around) new Image().src = p.mobile;
				return;
			}
			new Image().src = p.small || p.src;
			if (around) new Image().src = p.src;
		});
	}, [
		near,
		tourIndex,
		index,
		light,
		pictures.length
	]);
	const chooseTour = (i) => {
		setTour(i);
		setView({
			photo: 0,
			prev: -1,
			slots: [
				0,
				1,
				2,
				3
			]
		});
		positions.current.clear();
		requestAnimationFrame(() => {
			if (mobile.current) mobile.current.scrollLeft = 0;
		});
	};
	const choosePhoto = (i) => {
		if (!pictures.length) return;
		const n = (i + pictures.length) % pictures.length;
		manual.current = scrollY;
		setPhoto(n);
	};
	const onTabKey = (e, i) => {
		const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % entries.length : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i + entries.length - 1) % entries.length : e.key === "Home" ? 0 : e.key === "End" ? entries.length - 1 : null;
		if (next === null) return;
		e.preventDefault();
		chooseTour(next);
		tabs.current[next]?.focus();
	};
	const preload = (t) => {
		if (!near || !data || navigator.connection?.saveData || matchMedia(MOBILE).matches) return;
		data[t.slug].forEach((p) => {
			const img = new Image();
			img.src = p.small || p.src;
		});
	};
	const picture = (p, i, small = false) => /* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
		media: "(max-width:899px)",
		srcSet: `${p.mobile} 600w, ${p.main} 720w`,
		sizes: "(max-width:899px) 80vw, 42vw"
	}), /* @__PURE__ */ jsx("img", {
		src: small ? p.satellite : p.main,
		width: p.width,
		height: p.height,
		alt: `${tour.name}, fotografía ${i + 1}`,
		decoding: "async",
		loading: "lazy",
		onError: () => setFailed((previous) => /* @__PURE__ */ new Set([...previous, p.src]))
	})] });
	const panel = /* @__PURE__ */ jsxs("div", {
		className: "explorer-copy",
		children: [
			/* @__PURE__ */ jsx("h3", { children: tour.name }),
			/* @__PURE__ */ jsxs("p", { children: [
				/* @__PURE__ */ jsxs("b", { children: [copy.emocion, ":"] }),
				" ",
				copy.frase
			] }),
			/* @__PURE__ */ jsx(Link, {
				className: "text-link",
				to: `/experiencias/${tour.slug}`,
				children: "Ver experiencia ↗"
			}),
			/* @__PURE__ */ jsx(Link, {
				className: "button",
				to: `/experiencias/${tour.slug}#consulta`,
				children: "Planea esta experiencia ↗"
			})
		]
	}, tour.slug);
	return /* @__PURE__ */ jsxs("section", {
		className: `experience-explorer wrap section ${light ? "explorer-light" : ""}`,
		id: "formas-de-viajar",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-title",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: "Elige tu próximo recuerdo"
				}), /* @__PURE__ */ jsxs("h2", { children: [
					"Un lugar para cada",
					/* @__PURE__ */ jsx("br", {}),
					/* @__PURE__ */ jsx("em", { children: "forma de viajar." })
				] })] }), /* @__PURE__ */ jsx(Link, {
					className: "text-link",
					to: "/experiencias",
					children: "Ver las 12 experiencias ↗"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				ref: root,
				className: `explorer-track ${pin ? "is-pinned" : ""}`,
				children: /* @__PURE__ */ jsxs("div", {
					ref: stage,
					className: "explorer-stage",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "explorer-index",
						children: [/* @__PURE__ */ jsx("div", {
							role: "tablist",
							"aria-label": "Formas de viajar",
							"aria-orientation": "vertical",
							children: entries.map((t, i) => /* @__PURE__ */ jsxs("div", {
								className: "explorer-item",
								children: [(i === 0 || entries[i - 1].category !== t.category) && /* @__PURE__ */ jsx("p", {
									className: "explorer-group",
									children: t.category
								}), /* @__PURE__ */ jsxs("button", {
									ref: (el) => tabs.current[i] = el,
									role: "tab",
									id: `explorer-tab-${i}`,
									"aria-controls": "explorer-panel",
									"aria-selected": tourIndex === i,
									tabIndex: tourIndex === i ? 0 : -1,
									onClick: () => chooseTour(i),
									onKeyDown: (e) => onTabKey(e, i),
									onMouseEnter: () => preload(t),
									onFocus: () => preload(t),
									children: [/* @__PURE__ */ jsx("span", { children: String(i + 1).padStart(2, "0") }), t.name]
								})]
							}, t.slug))
						}), panel]
					}), /* @__PURE__ */ jsxs("div", {
						id: "explorer-panel",
						role: "tabpanel",
						"aria-labelledby": `explorer-tab-${tourIndex}`,
						className: "explorer-visual",
						tabIndex: 0,
						onKeyDown: (e) => {
							if (e.target === e.currentTarget && ["ArrowLeft", "ArrowRight"].includes(e.key)) {
								e.preventDefault();
								choosePhoto(index + (e.key === "ArrowRight" ? 1 : -1));
							}
						},
						children: [
							/* @__PURE__ */ jsx("div", {
								ref: fan,
								className: "explorer-fan",
								role: "region",
								"aria-roledescription": "carrusel",
								"aria-label": `Fotografías de ${tour.name}`,
								children: pictures.map((p, i) => {
									const order = view.slots[i] ?? i, role = i === index ? view.prev >= 0 ? "in" : "" : i === view.prev ? "out" : "";
									return /* @__PURE__ */ jsx("button", {
										"data-photo": p.src,
										"data-role": role,
										className: `fan-photo fan-slot-${order} ${p.horizontal ? "fan-horizontal" : ""}`,
										style: {
											aspectRatio: p.horizontal ? "4 / 3" : "4 / 5",
											"--photo-width": `${p.width}px`
										},
										onClick: () => choosePhoto(i),
										"aria-label": `Mostrar fotografía ${i + 1} de ${tour.name}`,
										tabIndex: order === 0 ? 0 : -1,
										children: near && picture(p, i, order !== 0)
									}, p.src);
								})
							}),
							/* @__PURE__ */ jsx("div", {
								ref: mobile,
								className: "explorer-mobile",
								onScroll: (e) => {
									const el = e.currentTarget;
									const w = el.children[0]?.offsetWidth + 16;
									if (w) setPhoto(Math.min(pictures.length - 1, Math.round(el.scrollLeft / w)));
								},
								children: pictures.map((p, i) => /* @__PURE__ */ jsx("div", {
									style: { aspectRatio: p.horizontal ? "4 / 3" : "4 / 5" },
									children: near && picture(p, i)
								}, p.src))
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "explorer-caption",
								children: [
									tour.name,
									" · fotografía ",
									String(index + 1).padStart(2, "0"),
									" de ",
									String(pictures.length).padStart(2, "0")
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "gallery-controls",
								children: [
									/* @__PURE__ */ jsx("button", {
										onClick: () => choosePhoto(index - 1),
										disabled: !pictures.length,
										"aria-label": "Fotografía anterior",
										children: "←"
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "sr-only",
										"aria-live": "polite",
										children: [
											"Foto ",
											pictures.length ? index + 1 : 0,
											" de ",
											pictures.length,
											", ",
											tour.name
										]
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => choosePhoto(index + 1),
										disabled: !pictures.length,
										"aria-label": "Fotografía siguiente",
										children: "→"
									})
								]
							}),
							data && !pictures.length && /* @__PURE__ */ jsxs("p", { children: ["No pudimos cargar las fotografías. ", /* @__PURE__ */ jsx(Link, {
								className: "text-link",
								to: `/experiencias/${tour.slug}`,
								children: "Ver experiencia"
							})] }),
							/* @__PURE__ */ jsx("div", {
								className: "explorer-mobile-copy",
								children: panel
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("ul", { children: entries.map((t) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
				href: `/experiencias/${t.slug}`,
				children: t.name
			}) }, t.slug)) }) })
		]
	});
}
//#endregion
//#region src/BlogBook.jsx
var two = (n) => String(n).padStart(2, "0");
var EASE = "cubic-bezier(.77,0,.175,1)";
var ANGLE_B = [
	[0, 0],
	[.4, -14],
	[.75, 6],
	[1, 0]
];
var SPLIT = .3;
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
				children: ["Leer la nota ", /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					children: "↗"
				})]
			}) : /* @__PURE__ */ jsxs("span", {
				className: "ft-plan",
				children: ["Leer la nota ", /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					children: "↗"
				})]
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
var faceContent = (kind, item) => kind === "photo" ? photoPage(item) : kind === "text" ? textPage(item) : /* @__PURE__ */ jsxs(Fragment$1, { children: [photoPage(item), textPage(item)] });
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
	const windowRef = useRef(null), selected = useRef(0), serial = useRef(0), touch = useRef(null), wasLight = useRef(light);
	const canAnimate = () => !light && typeof Element.prototype.animate === "function";
	const rootRef = useRef(null);
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				cards.forEach((c) => {
					const img = new Image();
					img.srcset = c.image.srcset || "";
					img.sizes = "(max-width:799px) 90vw, 42vw";
					img.src = c.image.src;
				});
				observer.disconnect();
			}
		}, { rootMargin: "50% 0px" });
		observer.observe(rootRef.current);
		return () => observer.disconnect();
	}, [cards]);
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
			}), /* @__PURE__ */ jsxs("h2", {
				id: "blog-book-title",
				children: [
					"Ideas para viajar",
					/* @__PURE__ */ jsx("br", {}),
					"con más ",
					/* @__PURE__ */ jsx("em", { children: "sentido." })
				]
			})] }), /* @__PURE__ */ jsx(Link, {
				className: "text-link",
				to: "/blog",
				children: "Todas las notas ↗"
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "ft ft-book",
			"data-turning": Boolean(turn),
			"data-mobile": mobile || void 0,
			children: [/* @__PURE__ */ jsx("div", {
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
			}), /* @__PURE__ */ jsxs("div", {
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
							children: two(i + 1)
						}), /* @__PURE__ */ jsx("span", { children: x.tag })]
					}, x.slug))
				}), /* @__PURE__ */ jsxs("div", {
					className: "bk-ctl",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "ft-count",
						role: "status",
						"aria-live": "polite",
						children: [
							two(sel + 1),
							" / ",
							two(cards.length)
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "ft-nav",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Nota anterior",
							disabled: sel === 0,
							onClick: () => choose(selected.current - 1),
							children: "←"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Nota siguiente",
							disabled: sel === cards.length - 1,
							onClick: () => choose(selected.current + 1),
							children: "→"
						})]
					})]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/inicio-videos.js
var inicioVideos = {
	hero: {
		src: null,
		poster: null
	},
	historia: {
		src: null,
		poster: null,
		captions: null
	}
};
var perfil = company.instagram;
var instagram = {
	profile: {
		name: "Transporte y Turismo Medellín",
		handle: "@transporteenmedellin",
		url: company.instagram,
		stats: null
	},
	tiktok: {
		handle: "@tytmedellin",
		url: company.tiktok
	},
	posts: [
		{
			url: perfil,
			image: null,
			type: "reel",
			alt: ""
		},
		{
			url: perfil,
			image: null,
			type: "carousel",
			alt: ""
		},
		{
			url: perfil,
			image: null,
			type: "reel",
			alt: ""
		},
		{
			url: perfil,
			image: null,
			type: "photo",
			alt: ""
		},
		{
			url: perfil,
			image: null,
			type: "carousel",
			alt: ""
		},
		{
			url: perfil,
			image: null,
			type: "reel",
			alt: ""
		},
		{
			url: perfil,
			image: null,
			type: "photo",
			alt: ""
		},
		{
			url: perfil,
			image: null,
			type: "reel",
			alt: ""
		}
	]
};
//#endregion
//#region src/HomeVideos.jsx
var Provisional = () => /* @__PURE__ */ jsx("span", {
	className: "vlabel",
	children: "Video próximamente"
});
function useHeroPlayback(ref, light, enabled) {
	const [playing, setPlaying] = useState(false);
	const manual = useRef(false);
	useEffect(() => {
		const el = ref.current;
		if (!enabled || !el) return void 0;
		const sync = () => setPlaying(!el.paused);
		el.addEventListener("play", sync);
		el.addEventListener("pause", sync);
		if (light) el.pause();
		else el.play().catch(() => {});
		const observer = new IntersectionObserver(([entry]) => {
			if (light || manual.current) return;
			if (entry.isIntersecting) el.play().catch(() => {});
			else el.pause();
		});
		observer.observe(el);
		return () => {
			observer.disconnect();
			el.removeEventListener("play", sync);
			el.removeEventListener("pause", sync);
		};
	}, [
		ref,
		light,
		enabled
	]);
	const toggle = () => {
		const el = ref.current;
		if (!el) return;
		manual.current = true;
		if (el.paused) el.play().catch(() => {});
		else el.pause();
	};
	return [playing, toggle];
}
function HomeHero() {
	const v = inicioVideos.hero, light = useLightMotion(), video = useRef(null), section = useRef(null);
	const [playing, toggle] = useHeroPlayback(video, light, Boolean(v.src));
	useEffect(() => {
		const html = document.documentElement, header = document.querySelector(".site-header")?.offsetHeight || 92;
		const observer = new IntersectionObserver(([entry]) => {
			html.dataset.hero = entry.isIntersecting ? "over" : "past";
		}, { rootMargin: `-${header}px 0px 0px 0px` });
		observer.observe(section.current);
		return () => {
			observer.disconnect();
			delete html.dataset.hero;
		};
	}, []);
	const t = inicioTextos;
	return /* @__PURE__ */ jsxs("section", {
		ref: section,
		className: "home-hero",
		"data-hero": true,
		"data-video": v.src ? "on" : "off",
		"aria-labelledby": "hero-titulo",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "hero-media",
				"aria-hidden": "true",
				children: v.src && /* @__PURE__ */ jsx("video", {
					ref: video,
					src: v.src,
					poster: v.poster || void 0,
					muted: true,
					loop: true,
					playsInline: true,
					autoPlay: !light,
					preload: "metadata",
					tabIndex: -1
				})
			}),
			v.src && /* @__PURE__ */ jsx("div", {
				className: "hero-shade",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "hero-copy",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow hero-eyebrow",
						children: t.lema
					}),
					/* @__PURE__ */ jsxs("h1", {
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
					/* @__PURE__ */ jsx("p", {
						className: "hero-support",
						children: t.confianza
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hero-actions",
						children: [/* @__PURE__ */ jsxs(Link, {
							className: "button hero-btn hero-btn--explore",
							to: "/experiencias",
							children: ["Explorar experiencias", /* @__PURE__ */ jsx(Arrow, {})]
						}), /* @__PURE__ */ jsxs(Link, {
							className: "button hero-btn hero-btn--quote",
							to: "/cotizar",
							children: ["Planeemos tu viaje", /* @__PURE__ */ jsx(Arrow, {})]
						})]
					})
				]
			}),
			v.src && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "hero-pause",
				onClick: toggle,
				"aria-label": playing ? "Pausar video" : "Reproducir video",
				children: /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					children: playing ? "❚❚" : "▶"
				})
			})
		]
	});
}
function HomeStory() {
	const v = inicioVideos.historia;
	return /* @__PURE__ */ jsxs("section", {
		className: "home-story wrap",
		id: "historia",
		"aria-labelledby": "historia-titulo",
		children: [/* @__PURE__ */ jsx("div", {
			className: "vframe vframe--story",
			children: v.src ? /* @__PURE__ */ jsx("video", {
				src: v.src,
				poster: v.poster || void 0,
				controls: true,
				playsInline: true,
				preload: "none",
				"aria-label": "Video de presentación de T&T Medellín",
				children: v.captions && /* @__PURE__ */ jsx("track", {
					kind: "captions",
					srcLang: "es",
					label: "Español",
					src: v.captions,
					default: true
				})
			}) : /* @__PURE__ */ jsx(Provisional, {})
		}), /* @__PURE__ */ jsxs("div", {
			className: "story-copy",
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Más que llegar" }),
				/* @__PURE__ */ jsxs("h2", {
					id: "historia-titulo",
					children: [
						"Hay una Medellín que se mira.",
						/* @__PURE__ */ jsx("br", {}),
						"Y otra que se ",
						/* @__PURE__ */ jsx("em", { children: "vive." })
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
						/* @__PURE__ */ jsx("em", { children: "experiencia." })
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
					/* @__PURE__ */ jsx("img", {
						className: "ig-avatar",
						src: "/media/marca/logo/logo-112.webp",
						srcSet: "/media/marca/logo/logo-112.webp 112w, /media/marca/logo/logo-168.webp 168w, /media/marca/logo/logo-224.webp 224w",
						sizes: "112px",
						width: "112",
						height: "112",
						alt: "",
						loading: "lazy",
						decoding: "async"
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
						alt: "",
						width: "640",
						height: "640",
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
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "↗"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/Home.jsx
function Home() {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(HomeHero, {}),
		/* @__PURE__ */ jsx(HomeStory, {}),
		/* @__PURE__ */ jsx(ScrubHero, {
			nextId: "formas-de-viajar",
			cards: tours.map((t, i) => ({
				slug: t.slug,
				name: t.name,
				n: i + 1
			})),
			summary: "Apertura: una baraja de doce experiencias. La carta superior se abre en una transición cinematográfica sobre Medellín que termina en la Plaza Botero y luego se despliegan las doce experiencias, cada una con su enlace."
		}),
		/* @__PURE__ */ jsx(ExperienceExplorer, {}),
		/* @__PURE__ */ jsxs("section", {
			className: "service-band wrap",
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Nos encargamos del camino" }),
				/* @__PURE__ */ jsxs("h2", { children: [
					"Del primer traslado",
					/* @__PURE__ */ jsx("br", {}),
					"al último ",
					/* @__PURE__ */ jsx("em", { children: "recuerdo." })
				] }),
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
		/* @__PURE__ */ jsx(Reviews, {}),
		/* @__PURE__ */ jsxs("section", {
			className: "about-preview wrap section",
			children: [/* @__PURE__ */ jsx(Picture, {
				photo: photos("equipo")[0],
				alt: "Personas del equipo de T&T Medellín"
			}), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Una historia que nace aquí" }),
				/* @__PURE__ */ jsxs("h2", { children: [
					"Personas que",
					/* @__PURE__ */ jsx("br", {}),
					"mueven ",
					/* @__PURE__ */ jsx("em", { children: "personas." })
				] }),
				/* @__PURE__ */ jsx("p", { children: "Desde los primeros traslados, aprendimos a escuchar. Esa cercanía sigue guiando nuestra forma de recibir y acompañar." }),
				/* @__PURE__ */ jsx(Button, {
					to: "/nosotros",
					children: "Conoce al equipo"
				})
			] })]
		}),
		/* @__PURE__ */ jsx(BlogBook, {}),
		/* @__PURE__ */ jsx(HomeClose, {}),
		/* @__PURE__ */ jsx(HomeSocial, {})
	] });
}
//#endregion
export { Home as default };
