import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region src/languages.js
var LANGUAGES = [
	{
		code: "es",
		prefix: "",
		label: "Español",
		html: "es-CO",
		og: "es_CO"
	},
	{
		code: "en",
		prefix: "/en",
		label: "English",
		html: "en",
		og: "en_US"
	},
	{
		code: "pt-BR",
		prefix: "/pt-br",
		label: "Português (Brasil)",
		html: "pt-BR",
		og: "pt_BR"
	}
];
var languageInfo = (code) => LANGUAGES.find((x) => x.code === code) || LANGUAGES[0];
var languageFromPath = (path) => /^\/pt-br(?:\/|$)/i.test(path) ? "pt-BR" : /^\/en(?:\/|$)/.test(path) ? "en" : "es";
var stripLanguage = (path) => path.replace(/^\/(?:en|pt-br)(?=\/|$)/i, "") || "/";
var pathForLanguage = (path, code) => languageInfo(code).prefix + (stripLanguage(path) === "/" ? "/" : stripLanguage(path));
//#endregion
//#region src/i18n.js
var S = globalThis.__ttI18n || (globalThis.__ttI18n = {
	locale: typeof window !== "undefined" ? languageFromPath(window.location.pathname) : "es",
	dictionaries: { es: {} }
});
var dictionaries = S.dictionaries;
S.localizedProps = localizedProps;
var loaders = {
	en: () => import("./en-BbsH6lTz.js"),
	"pt-BR": () => import("./pt-BR-CFgXe07O.js")
};
var language = () => S.locale;
var setLanguage = (value) => {
	S.locale = languageInfo(value).code;
};
async function prepareLanguage(value) {
	const code = languageInfo(value).code;
	if (!dictionaries[code]) dictionaries[code] = (await loaders[code]()).default;
}
async function switchLanguage(value) {
	const code = languageInfo(value).code;
	if (code === S.locale) return;
	await prepareLanguage(code);
	const { pathname, search, hash } = window.location, next = pathForLanguage(pathname, code) + search + hash;
	history.pushState(null, "", next);
	setLanguage(code);
	document.documentElement.lang = languageInfo(code).html;
	window.dispatchEvent(new CustomEvent("tyt-language-change", { detail: code }));
}
var unprefix = stripLanguage;
var languagePath = pathForLanguage;
var normalize = (value) => value.replace(/\s+/g, " ").trim();
function t(value) {
	if (S.locale === "es" || typeof value !== "string" || !value.trim()) return value;
	const key = normalize(value);
	const english = dictionaries[S.locale] || {};
	if (Object.hasOwn(english, key)) return value.replace(value.trim(), english[key]);
	const patterns = [
		[/^estos (\d+) campos$/, (n) => `these ${n} fields`],
		[/^Foto (\d+) de (\d+), (.+)$/, (n, total, name) => `Photo ${n} of ${total}, ${t(name)}`],
		[/^(.+)\. (Descubre|Explora|Siente|Conecta|Vive|Disfruta|Sorpréndete|Recuerda|Enamórate|Inspírate): (.+)$/, (name, verb, text) => `${t(name)}. ${t(verb)}: ${t(text)}`],
		[/^Ampliar fotografía (\d+) de (.+)$/, (n, name) => `Enlarge photo ${n} of ${t(name)}`],
		[/^Fotografía (\d+) de (.+)$/, (n, name) => `Photo ${n} of ${t(name)}`],
		[/^Mostrar fotografía (\d+) de (.+)$/, (n, name) => `Show photo ${n} of ${t(name)}`],
		[/^(.+), fotografía (\d+) de (\d+)$/, (name, n, total) => `${t(name)}, photo ${n} of ${total}`],
		[/^Foto (\d+) de (\d+)$/, (n, total) => `Photo ${n} of ${total}`],
		[/^(.+) \(se abre en una pestaña nueva\)$/, (name) => `${t(name)} (opens in a new tab)`],
		[/^Seguir a (.+) en Instagram$/, (handle) => `Follow ${handle} on Instagram`],
		[/^También en TikTok (@.+)$/, (handle) => `Also on TikTok ${handle}`],
		[/^(.+) · Desde Medellín$/, (cat) => `${t(cat)} · From Medellín`],
		[/^(.+), fotografía (\d+)$/, (name, n) => `${t(name)}, photo ${n}`],
		[/^(.+), capítulo (\d+)$/, (name, n) => `${t(name)}, chapter ${n}`],
		[/^Capítulo (\d+): (.+)$/, (n, title) => `Chapter ${n}: ${t(title)}`],
		[/^Fotografías de (.+)$/, (name) => `Photos of ${t(name)}`],
		[/^Elegir fotografía de (.+)$/, (name) => `Choose a photo of ${t(name)}`],
		[/^Galería ampliada de (.+)$/, (name) => `Enlarged gallery of ${t(name)}`],
		[/^Un recorrido por (.+)$/, (name) => `A journey through ${t(name)}`],
		[/^Planea esta experiencia: (.+)$/, (name) => `Plan this experience: ${t(name)}`],
		[/^Leer la nota: (.+)$/, (name) => `Read the article: ${t(name)}`],
		[/^Categoría (.+)$/, (name) => `Category: ${t(name)}`],
		[/^(.+) \| T&T Medellín$/, (title) => `${t(title)} | T&T Medellín`]
	];
	const portuguesePatterns = [
		[/^estos (\d+) campos$/, (n) => `estes ${n} campos`],
		[/^Foto (\d+) de (\d+), (.+)$/, (n, total, name) => `Foto ${n} de ${total}, ${t(name)}`],
		[/^(.+)\. (Descubre|Explora|Siente|Conecta|Vive|Disfruta|Sorpréndete|Recuerda|Enamórate|Inspírate): (.+)$/, (name, verb, text) => `${t(name)}. ${t(verb)}: ${t(text)}`],
		[/^Ampliar fotografía (\d+) de (.+)$/, (n, name) => `Ampliar foto ${n} de ${t(name)}`],
		[/^Fotografía (\d+) de (.+)$/, (n, name) => `Foto ${n} de ${t(name)}`],
		[/^Mostrar fotografía (\d+) de (.+)$/, (n, name) => `Mostrar foto ${n} de ${t(name)}`],
		[/^(.+), fotografía (\d+) de (\d+)$/, (name, n, total) => `${t(name)}, foto ${n} de ${total}`],
		[/^Foto (\d+) de (\d+)$/, (n, total) => `Foto ${n} de ${total}`],
		[/^(.+) \(se abre en una pestaña nueva\)$/, (name) => `${t(name)} (abre em uma nova aba)`],
		[/^Seguir a (.+) en Instagram$/, (name) => `Seguir ${name} no Instagram`],
		[/^También en TikTok (@.+)$/, (name) => `Também no TikTok ${name}`],
		[/^(.+) · Desde Medellín$/, (cat) => `${t(cat)} · Saindo de Medellín`],
		[/^(.+), fotografía (\d+)$/, (name, n) => `${t(name)}, foto ${n}`],
		[/^(.+), capítulo (\d+)$/, (name, n) => `${t(name)}, capítulo ${n}`],
		[/^Capítulo (\d+): (.+)$/, (n, title) => `Capítulo ${n}: ${t(title)}`],
		[/^Fotografías de (.+)$/, (name) => `Fotos de ${t(name)}`],
		[/^Elegir fotografía de (.+)$/, (name) => `Escolher foto de ${t(name)}`],
		[/^Galería ampliada de (.+)$/, (name) => `Galeria ampliada de ${t(name)}`],
		[/^Un recorrido por (.+)$/, (name) => `Um passeio por ${t(name)}`],
		[/^Planea esta experiencia: (.+)$/, (name) => `Planeje esta experiência: ${t(name)}`],
		[/^Leer la nota: (.+)$/, (name) => `Ler o artigo: ${t(name)}`],
		[/^Categoría (.+)$/, (name) => `Categoria: ${t(name)}`],
		[/^(.+) \| T&T Medellín$/, (title) => `${t(title)} | T&T Medellín`]
	];
	for (const [pattern, convert] of S.locale === "pt-BR" ? portuguesePatterns : patterns) {
		const match = key.match(pattern);
		if (match) return convert(...match.slice(1));
	}
	const punctuation = key.match(/^(.+?)([.:*→↗↓]+)$/);
	if (punctuation && Object.hasOwn(english, punctuation[1].trim())) return english[punctuation[1].trim()] + punctuation[2];
	return value;
}
function localizedProps(type, props) {
	if (S.locale === "es" || !props || props.translate === "no") return props;
	const next = { ...props };
	const children = (value) => Array.isArray(value) ? value.map(children) : typeof value === "string" ? t(value) : value;
	if (type !== "script" && type !== "style" && type !== "textarea") next.children = children(props.children);
	for (const key of [
		"aria-label",
		"aria-description",
		"title",
		"alt",
		"placeholder"
	]) if (typeof props[key] === "string") next[key] = t(props[key]);
	if (type === "option" && props.value === void 0 && typeof props.children === "string") next.value = props.children;
	return next;
}
//#endregion
//#region src/company.js
var company = {
	phone: "+57 304 496 1698",
	whatsapp: "573044961698",
	email: "transporteyturismomedellin@gmail.com",
	address: "Carrera 79AA #1A Sur-280, Medellín",
	reviews: "https://www.google.com/maps/place/Transporte+%26+Turismo+Medellin/data=!4m2!3m1!1s0x0:0x676cebadb662a88a",
	instagram: "https://www.instagram.com/transporteenmedellin",
	tiktok: "https://www.tiktok.com/@tytmedellin"
};
var whatsapp = (context = "mi recorrido") => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(language() === "pt-BR" ? `Olá, gostaria de consultar a T&T Medellín sobre ${t(context)}.` : language() === "en" ? `Hello, I'd like to ask T&T Medellín about ${t(context)}.` : `Hola, quiero consultar con T&T Medellín sobre ${context}.`)}`;
//#endregion
//#region src/i18n-runtime/jsx-runtime.js
var localize = (type, props) => {
	const f = globalThis.__ttI18n && globalThis.__ttI18n.localizedProps;
	return f ? f(type, props) : props;
};
var jsx$1 = (type, props, key) => jsx(type, localize(type, props), key);
var jsxs$1 = (type, props, key) => jsxs(type, localize(type, props), key);
//#endregion
//#region src/scroll-bus.js
var subs = /* @__PURE__ */ new Set();
var raf = 0;
var bound = false;
var dirty = false;
var lastY = -1;
var lastVH = -1;
var ro = null;
var frame = () => {
	raf = 0;
	if (document.hidden) return;
	const y = window.scrollY, vh = window.innerHeight, force = vh !== lastVH;
	let measured = false;
	for (const s of subs) if (s.on && (s.needsMeasure || dirty)) {
		s.measure?.();
		s.needsMeasure = false;
		measured = true;
	}
	dirty = false;
	if (y === lastY && !force && !measured) {
		for (const s of subs) if (s.on && s.fresh) {
			s.update(y, vh);
			s.fresh = false;
		}
		return;
	}
	lastY = y;
	lastVH = vh;
	for (const s of subs) if (s.on) {
		s.update(y, vh);
		s.fresh = false;
	}
};
var kick = () => {
	if (!raf) raf = requestAnimationFrame(frame);
};
var onResize = () => {
	dirty = true;
	kick();
};
var bind = () => {
	if (bound) return;
	bound = true;
	window.addEventListener("scroll", kick, { passive: true });
	window.addEventListener("resize", onResize);
	document.addEventListener("visibilitychange", kick);
	ro = new ResizeObserver(onResize);
	ro.observe(document.body);
	document.fonts?.ready.then(onResize);
};
var unbind = () => {
	if (!bound || subs.size) return;
	bound = false;
	window.removeEventListener("scroll", kick);
	window.removeEventListener("resize", onResize);
	document.removeEventListener("visibilitychange", kick);
	ro?.disconnect();
	ro = null;
	cancelAnimationFrame(raf);
	raf = 0;
	lastY = -1;
};
/** `el`: elemento que gobierna la visibilidad (o null = siempre activo); `margin`: px extra alrededor de la ventana. Devuelve la función que desregistra. */
function watchScroll({ el = null, margin = 240, measure, update }) {
	const s = {
		on: !el,
		needsMeasure: true,
		fresh: true,
		measure,
		update
	};
	subs.add(s);
	bind();
	let io = null;
	if (el) {
		io = new IntersectionObserver(([e]) => {
			const on = e.isIntersecting;
			if (on && !s.on) {
				s.needsMeasure = true;
				s.fresh = true;
			}
			s.on = on;
			if (on) {
				lastY = -1;
				kick();
			}
		}, { rootMargin: `${margin}px 0px` });
		io.observe(el);
	}
	lastY = -1;
	kick();
	return () => {
		io?.disconnect();
		subs.delete(s);
		unbind();
	};
}
/** Coordenada de documento del borde superior de un elemento (lectura de layout: solo dentro de `measure`). */
var docTop = (el) => el.getBoundingClientRect().top + window.scrollY;
var clamp01 = (v) => v < 0 ? 0 : v > 1 ? 1 : v;
//#endregion
//#region src/PremiumMotion.jsx
var reducedQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
var subscribeLight = (notify) => {
	const mq = reducedQuery();
	mq.addEventListener("change", notify);
	return () => mq.removeEventListener("change", notify);
};
var readLight = () => reducedQuery().matches;
function useLightMotion() {
	return useSyncExternalStore(subscribeLight, readLight, () => false);
}
var noSubscribe = () => () => {};
function useMounted() {
	return useSyncExternalStore(noSubscribe, () => true, () => false);
}
function useMedia(query, server = false) {
	return useSyncExternalStore((notify) => {
		const mq = window.matchMedia(query);
		mq.addEventListener("change", notify);
		return () => mq.removeEventListener("change", notify);
	}, () => window.matchMedia(query).matches, () => server);
}
function EditorialMotion({ children, className = "" }) {
	const ref = useRef(null), light = useLightMotion();
	useEffect(() => {
		const node = ref.current;
		if (light || !node) return;
		let top = 0, h = 1, last = -1;
		const stop = watchScroll({
			el: node,
			margin: 0,
			measure: () => {
				top = docTop(node);
				h = node.offsetHeight || 1;
			},
			update: (y) => {
				const p = Math.round(clamp01((y - top) / h) * 200) / 200;
				if (p === last) return;
				last = p;
				node.style.setProperty("--editorial-shift", `${p * 4}vw`);
				node.style.setProperty("--photo-shift", `${p * -24}px`);
			}
		});
		return () => {
			stop();
			node.style.removeProperty("--editorial-shift");
			node.style.removeProperty("--photo-shift");
		};
	}, [light]);
	return /* @__PURE__ */ jsx$1("section", {
		ref,
		className: `editorial-motion ${className}`,
		children
	});
}
function measureWidth(host, text) {
	const m = document.createElement("span");
	m.textContent = text;
	m.setAttribute("aria-hidden", "true");
	m.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;font:800 100px/1 Montserrat,Arial,sans-serif;letter-spacing:-.04em";
	host.appendChild(m);
	const w = m.getBoundingClientRect().width / 100;
	m.remove();
	return w;
}
function fitMarquee(host, text) {
	const cs = getComputedStyle(host), avail = host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
	if (avail <= 0) return null;
	const target = avail * .92, one = Math.min(128, target / measureWidth(host, text));
	if (one >= 28 || innerWidth >= 900) return {
		size: one,
		lines: [text]
	};
	const words = text.split(" ");
	let best = null;
	for (let i = 1; i < words.length; i++) {
		const a = words.slice(0, i).join(" "), b = words.slice(i).join(" "), w = Math.max(measureWidth(host, a), measureWidth(host, b));
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
function Marquee({ text }) {
	const ref = useRef(null), light = useLightMotion(), [fit, setFit] = useState({
		size: 56,
		lines: [text]
	});
	useLayoutEffect(() => {
		const node = ref.current;
		if (!node) return;
		let alive = true;
		const run = () => {
			if (!alive) return;
			const f = fitMarquee(node, text);
			if (f) setFit((prev) => prev.size === f.size && prev.lines.join("|") === f.lines.join("|") ? prev : f);
		};
		run();
		document.fonts?.ready.then(run);
		const ro = new ResizeObserver(run);
		ro.observe(node);
		return () => {
			alive = false;
			ro.disconnect();
		};
	}, [text]);
	useEffect(() => {
		const node = ref.current;
		if (light || !node) return;
		let top = 0, h = 1, last = -1;
		const stop = watchScroll({
			el: node,
			margin: 0,
			measure: () => {
				top = docTop(node);
				h = node.offsetHeight || 1;
			},
			update: (y, vh) => {
				const p = Math.round(clamp01((y + vh - top) / (vh + h)) * 500) / 500;
				if (p === last) return;
				last = p;
				node.style.setProperty("--mq-p", p.toFixed(3));
			}
		});
		return () => {
			stop();
			node.style.removeProperty("--mq-p");
		};
	}, [light]);
	return /* @__PURE__ */ jsx$1("section", {
		ref,
		className: "place-marquee",
		children: /* @__PURE__ */ jsx$1("p", {
			"aria-hidden": "true",
			style: { fontSize: `${fit.size.toFixed(2)}px` },
			children: fit.lines.map((l) => /* @__PURE__ */ jsx$1("span", { children: l }, l))
		})
	});
}
function Manifesto({ words }) {
	return /* @__PURE__ */ jsx$1("section", {
		className: "manifesto wrap",
		"aria-label": words.map((w) => t(w)).join(" "),
		children: words.map((word) => /* @__PURE__ */ jsx$1(EditorialMotion, { children: /* @__PURE__ */ jsx$1("p", { children: word }) }, word))
	});
}
function Trust() {
	return /* @__PURE__ */ jsx$1("div", {
		className: "trust wrap",
		children: /* @__PURE__ */ jsx$1("p", { children: "Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles" })
	});
}
function useFlipGrid(ref, keys) {
	const previous = useRef(/* @__PURE__ */ new Map()), light = useLightMotion();
	useLayoutEffect(() => {
		const node = ref.current;
		if (!node) return;
		const next = /* @__PURE__ */ new Map(), animations = [];
		for (const card of node.querySelectorAll("[data-flip-key]")) {
			card.getAnimations().forEach((a) => a.cancel());
			const key = card.dataset.flipKey, to = card.getBoundingClientRect(), from = previous.current.get(key);
			next.set(key, to);
			if (!light && card.animate) {
				const first = from ? {
					transform: `translate(${from.left - to.left}px,${from.top - to.top}px) scale(${from.width / to.width},${from.height / to.height})`,
					opacity: 1
				} : {
					transform: "translateY(16px)",
					opacity: 0
				};
				animations.push(card.animate([first, {
					transform: "none",
					opacity: 1
				}], {
					duration: 450,
					easing: "cubic-bezier(.77,0,.175,1)"
				}));
			}
		}
		previous.current = next;
		return () => animations.forEach((a) => a.cancel());
	}, [
		keys,
		light,
		ref
	]);
}
//#endregion
//#region src/QuoteCopy.jsx
function QuoteCopy({ withType = false }) {
	return /* @__PURE__ */ jsxs$1("div", {
		className: "quote-copy",
		children: [
			/* @__PURE__ */ jsx$1(Trust, {}),
			/* @__PURE__ */ jsx$1("p", {
				className: "eyebrow",
				children: "Hecho para ti"
			}),
			/* @__PURE__ */ jsx$1("h2", { children: withType ? /* @__PURE__ */ jsxs$1(Fragment$1, { children: [
				"Cuéntanos qué",
				/* @__PURE__ */ jsx$1("br", {}),
				"necesitas"
			] }) : /* @__PURE__ */ jsxs$1(Fragment$1, { children: [
				"Tu experiencia",
				/* @__PURE__ */ jsx$1("br", {}),
				"empieza con una",
				/* @__PURE__ */ jsx$1("br", {}),
				/* @__PURE__ */ jsx$1("em", { children: "conversación" })
			] }) }),
			/* @__PURE__ */ jsx$1("p", { children: withType ? "Elige el tipo de solicitud y completa tus datos. Te dejamos el mensaje listo en WhatsApp para que solo pulses Enviar." : "Completa tus datos y te dejamos el mensaje listo en WhatsApp para que solo pulses Enviar." }),
			/* @__PURE__ */ jsx$1("a", {
				href: `tel:${company.phone.replaceAll(" ", "")}`,
				className: "contact-number",
				children: company.phone
			}),
			/* @__PURE__ */ jsx$1("small", { children: "La disponibilidad y el valor se confirman con el equipo." })
		]
	});
}
//#endregion
//#region src/Arrow.jsx
var PATHS = {
	ne: "M7 17 17 7M8 7h9v9",
	right: "M5 12h14M13 6l6 6-6 6",
	left: "M19 12H5M11 6l-6 6 6 6",
	down: "M12 5v14M6 13l6 6 6-6",
	up: "M12 19V5M6 11l6-6 6 6"
};
function Arrow({ dir = "ne" }) {
	return /* @__PURE__ */ jsx$1("svg", {
		className: "ico-arrow",
		viewBox: "0 0 24 24",
		width: "18",
		height: "18",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ jsx$1("path", { d: PATHS[dir] })
	});
}
//#endregion
export { t as C, languageInfo as D, languageFromPath as E, pathForLanguage as O, switchLanguage as S, LANGUAGES as T, whatsapp as _, Marquee as a, prepareLanguage as b, useLightMotion as c, docTop as d, watchScroll as f, company as g, jsxs$1 as h, Manifesto as i, useMedia as l, jsx$1 as m, QuoteCopy as n, Trust as o, Fragment$1 as p, EditorialMotion as r, useFlipGrid as s, Arrow as t, useMounted as u, language as v, unprefix as w, setLanguage as x, languagePath as y };
