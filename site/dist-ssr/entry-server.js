import { renderToString } from "react-dom/server";
import { Link, NavLink, Navigate, Route, Routes, StaticRouter, useLocation, useNavigationType } from "react-router-dom";
import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
//#region src/text-motion.js
var SCENES = ".home-hero,.scrub-hero,.th,.it,.blog-book,.different,.story,.explorer-track,[data-rv],.afx,[data-no-tx],dialog,form,details,[aria-live],.review-panel,.consent,.welcome,.tour-bar";
var CARDS = ".tour-card,.card-copy,.vehicle,li,figure,blockquote,button,label,summary";
var NUMS = ".timeline>article>span,.vehicle-index,.chapter";
var WORDS_MAX = 14;
var booted = false;
var inView = (el) => {
	const r = el.getBoundingClientRect();
	return r.bottom > 0 && r.top < innerHeight;
};
function splitWords(el) {
	let i = 0;
	const walk = (node) => {
		for (const child of [...node.childNodes]) if (child.nodeType === 3) {
			if (!child.nodeValue.trim()) continue;
			const frag = document.createDocumentFragment();
			for (const part of child.nodeValue.split(/(\s+)/)) {
				if (!part) continue;
				if (/^\s+$/.test(part)) {
					frag.append(part);
					continue;
				}
				const w = document.createElement("span"), inner = document.createElement("span");
				w.className = "tx-w";
				inner.className = "tx-wi";
				inner.style.setProperty("--i", i++);
				inner.textContent = part;
				w.append(inner);
				frag.append(w);
			}
			child.replaceWith(frag);
		} else if (child.nodeType === 1 && !/^(BR|SVG|IMG)$/i.test(child.tagName)) walk(child);
	};
	walk(el);
	return i;
}
function count(el) {
	const node = el.firstChild, text = node.nodeValue, m = /^(\s*)(\d{1,4})(\s*)$/.exec(text);
	if (!m) return;
	const end = Number(m[2]), pad = m[2].length, t0 = performance.now(), dur = 700;
	const step = (now) => {
		const k = Math.min(1, (now - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
		node.nodeValue = m[1] + String(v).padStart(pad, "0") + m[3];
		if (k < 1) requestAnimationFrame(step);
		else node.nodeValue = text;
	};
	node.nodeValue = m[1] + "0".repeat(pad) + m[3];
	requestAnimationFrame(step);
}
function useTextMotion(pathname) {
	useEffect(() => {
		if (typeof window === "undefined" || !("IntersectionObserver" in window)) return void 0;
		if (matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData) return void 0;
		const main = document.getElementById("contenido");
		if (!main) return void 0;
		const first = !booted;
		booted = true;
		const seen = /* @__PURE__ */ new WeakSet();
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				const el = e.target;
				io.unobserve(el);
				requestAnimationFrame(() => {
					el.classList.add("tx-in");
					if (el.dataset.tx === "n") count(el);
				});
			}
		}, {
			rootMargin: "0px 0px -8% 0px",
			threshold: .01
		});
		const prepare = () => {
			let prevParent = null, k = 0;
			for (const el of main.querySelectorAll("h1,h2,.eyebrow,p," + NUMS)) {
				if (seen.has(el)) continue;
				const isNum = el.matches(NUMS);
				if (el.closest(SCENES) || !isNum && el.closest(CARDS)) continue;
				seen.add(el);
				if (first && inView(el)) continue;
				if (!el.offsetParent) continue;
				let kind;
				if (el.matches("h1,h2")) {
					const words = (el.textContent.match(/\S+/g) || []).length;
					kind = words > 0 && words <= WORDS_MAX ? "h" : "p";
					if (kind === "h" && first) kind = "b";
					else if (kind === "h") try {
						splitWords(el);
					} catch {
						kind = "p";
					}
				} else if (el.matches(".eyebrow")) {
					const h = el.offsetHeight;
					el.dataset.tx = "e";
					kind = el.offsetHeight !== h ? "p" : "e";
				} else if (isNum) {
					kind = !first && el.childNodes.length === 1 && el.firstChild.nodeType === 3 && /^\s*\d{1,4}\s*$/.test(el.textContent) ? "n" : null;
					if (!kind) continue;
				} else kind = "p";
				if (kind === "p") {
					if (el.parentElement === prevParent) k++;
					else {
						k = 0;
						prevParent = el.parentElement;
					}
					el.style.setProperty("--d", `${Math.min(k, 4) * 70}ms`);
				}
				el.dataset.tx = kind;
				io.observe(el);
			}
		};
		let frame = 0;
		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(prepare);
		};
		prepare();
		const mo = new MutationObserver((records) => {
			if (records.some((r) => [...r.addedNodes].some((n) => n.nodeType === 1 && !n.classList?.contains("tx-w")))) schedule();
		});
		mo.observe(main, {
			childList: true,
			subtree: true
		});
		return () => {
			cancelAnimationFrame(frame);
			mo.disconnect();
			io.disconnect();
		};
	}, [pathname]);
}
var pending = null;
function notifyRouteReady() {
	if (!pending) return;
	const done = pending;
	pending = null;
	let tries = 0;
	const wait = () => {
		if (document.querySelector("main#contenido > *") || ++tries > 60) done();
		else setTimeout(wait, 16);
	};
	setTimeout(wait, 16);
}
//#endregion
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
	en: () => import("./assets/en-Ck76SkYT.js"),
	"pt-BR": () => import("./assets/pt-BR-C53S7aXP.js")
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
//#region src/Socials.jsx
var PATHS$1 = {
	instagram: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03Zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
	tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z",
	whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
};
var SOCIALS = () => [
	{
		id: "instagram",
		label: "Síguenos en Instagram",
		url: company.instagram,
		color: "#E4405F"
	},
	{
		id: "tiktok",
		label: "Síguenos en TikTok",
		url: company.tiktok,
		color: "currentColor"
	},
	{
		id: "whatsapp",
		label: "Escríbenos por WhatsApp",
		url: whatsapp(),
		color: "#128C7E"
	}
];
function SocialIcon({ id, size = 24, color, className = "" }) {
	return /* @__PURE__ */ jsx$1("svg", {
		className,
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "currentColor",
		"aria-hidden": "true",
		focusable: "false",
		style: color ? { color } : void 0,
		children: /* @__PURE__ */ jsx$1("path", { d: PATHS$1[id] })
	});
}
function Socials({ className = "", only }) {
	return /* @__PURE__ */ jsx$1("ul", {
		role: "list",
		className: `socials ${className}`,
		children: SOCIALS().filter((s) => !only || only.includes(s.id)).map((s) => /* @__PURE__ */ jsx$1("li", { children: /* @__PURE__ */ jsx$1("a", {
			href: s.url,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": `${s.label} (se abre en una pestaña nueva)`,
			children: /* @__PURE__ */ jsx$1("svg", {
				viewBox: "0 0 24 24",
				fill: "currentColor",
				"aria-hidden": "true",
				style: { color: s.color },
				children: /* @__PURE__ */ jsx$1("path", { d: PATHS$1[s.id] })
			})
		}) }, s.id))
	});
}
//#endregion
//#region src/icons.jsx
var P = (d) => ["path", { d }];
var C = (cx, cy, r) => ["circle", {
	cx,
	cy,
	r
}];
var L = (x1, y1, x2, y2) => ["line", {
	x1,
	y1,
	x2,
	y2
}];
var R$1 = (x, y, width, height, rx) => ["rect", {
	x,
	y,
	width,
	height,
	rx
}];
var NODES = {
	snowflake: [
		P("m10 20-1.25-2.5L6 18"),
		P("M10 4 8.75 6.5 6 6"),
		P("m14 20 1.25-2.5L18 18"),
		P("m14 4 1.25 2.5L18 6"),
		P("m17 21-3-6h-4"),
		P("m17 3-3 6 1.5 3"),
		P("M2 12h6.5L10 9"),
		P("m20 10-1.5 2 1.5 2"),
		P("M22 12h-6.5L14 15"),
		P("m4 10 1.5 2L4 14"),
		P("m7 21 3-6-1.5-3"),
		P("m7 3 3 6h4")
	],
	armchair: [
		P("M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"),
		P("M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"),
		P("M5 18v2"),
		P("M19 18v2")
	],
	wifi: [
		P("M12 20h.01"),
		P("M2 8.82a15 15 0 0 1 20 0"),
		P("M5 12.859a10 10 0 0 1 14 0"),
		P("M8.5 16.429a5 5 0 0 1 7 0")
	],
	usb: [
		C(10, 7, 1),
		C(4, 20, 1),
		P("M4.7 19.3 19 5"),
		P("m21 3-3 1 2 2Z"),
		P("M9.26 7.68 5 12l2 5"),
		P("m10 14 5 2 3.5-3.5"),
		P("m18 12 1-1 1 1-1 1Z")
	],
	music: [
		P("M9 18V5l12-2v13"),
		C(6, 18, 3),
		C(18, 16, 3)
	],
	luggage: [
		P("M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"),
		P("M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"),
		P("M10 20h4"),
		C(16, 20, 2),
		C(8, 20, 2)
	],
	frame: [
		L(22, 6, 2, 6),
		L(22, 18, 2, 18),
		L(6, 2, 6, 22),
		L(18, 2, 18, 22)
	],
	mic: [
		P("M12 19v3"),
		P("M19 10v2a7 7 0 0 1-14 0v-2"),
		R$1(9, 2, 6, 13, 3)
	],
	refrigerator: [
		P("M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"),
		P("M5 10h14"),
		P("M15 7v6")
	],
	lightbulb: [
		P("M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"),
		P("M9 18h6"),
		P("M10 22h4")
	],
	monitorPlay: [
		P("M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"),
		P("M12 17v4"),
		P("M8 21h8"),
		R$1(2, 3, 20, 14, 2)
	],
	thermometer: [P("M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z")],
	users: [
		P("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"),
		P("M16 3.128a4 4 0 0 1 0 7.744"),
		P("M22 21v-2a4 4 0 0 0-3-3.87"),
		C(9, 7, 4)
	],
	share: [
		C(18, 5, 3),
		C(6, 12, 3),
		C(18, 19, 3),
		L(8.59, 13.51, 15.42, 17.49),
		L(15.41, 6.51, 8.59, 10.49)
	],
	mail: [P("m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"), R$1(2, 4, 20, 16, 2)],
	link: [
		P("M9 17H7A5 5 0 0 1 7 7h2"),
		P("M15 7h2a5 5 0 1 1 0 10h-2"),
		L(8, 12, 16, 12)
	],
	check: [P("M20 6 9 17l-5-5")],
	mapPin: [P("M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"), C(12, 10, 3)],
	phone: [P("M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384")],
	planeLanding: [P("M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z")],
	carFront: [
		P("m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"),
		P("M7 14h.01"),
		P("M17 14h.01"),
		R$1(3, 10, 18, 8, 2),
		P("M5 18v2"),
		P("M19 18v2")
	],
	droplet: [P("M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z")],
	globe: [
		C(12, 12, 10),
		P("M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"),
		P("M2 12h20")
	],
	clock: [C(12, 12, 10), P("M12 6v6l4 2")],
	camera: [P("M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"), C(12, 13, 3)],
	shieldCheck: [P("M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"), P("m9 12 2 2 4-4")],
	messageCircle: [P("M7.9 20A9 9 0 1 0 4 16.1L2 22Z")],
	heart: [P("M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5")],
	plus: [P("M5 12h14"), P("M12 5v14")],
	star: [P("M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z")],
	more: [
		C(12, 12, 1),
		C(19, 12, 1),
		C(5, 12, 1)
	]
};
function Icon({ name, size = 16, className = "", draw = false }) {
	return /* @__PURE__ */ jsx$1("svg", {
		className: `ico ${className}`,
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		focusable: "false",
		children: NODES[name].map(([tag, attrs], i) => {
			return /* @__PURE__ */ jsx$1(tag, {
				...attrs,
				...draw ? { pathLength: 1 } : null
			}, i);
		})
	});
}
//#endregion
//#region src/Skyline.jsx
function Skyline() {
	return /* @__PURE__ */ jsxs$1("svg", {
		className: "skyline",
		viewBox: "0 0 1440 120",
		preserveAspectRatio: "xMidYMax slice",
		"aria-hidden": "true",
		focusable: "false",
		children: [
			/* @__PURE__ */ jsx$1("path", {
				className: "skyline-far",
				d: "M0 120V74C90 52 170 60 260 66C350 72 400 38 510 34C600 31 650 56 760 58C880 60 930 30 1050 28C1160 26 1220 52 1320 50C1380 49 1415 58 1440 54V120Z"
			}),
			/* @__PURE__ */ jsx$1("path", {
				className: "skyline-mid",
				d: "M0 120V92C120 72 220 84 330 80C450 76 520 56 640 60C760 64 840 84 960 80C1080 76 1160 60 1290 66C1360 69 1410 78 1440 74V120Z"
			}),
			/* @__PURE__ */ jsx$1("path", {
				className: "skyline-near",
				d: "M0 120V92H34V120ZM42 120V104H92V120ZM92 120V52H150V120ZM98 120V44H144V120ZM162 120V52H188V120ZM168 120V44H182V120ZM188 120V66H226V120ZM194 120V58H220V120ZM226 120V66H270V120ZM232 120V58H264V120ZM282 120V86H308V120ZM320 120V66H346V120ZM326 120V58H340V120ZM346 120V52H372V120ZM376 120V92H414V120ZM426 120V80H452V120ZM464 120V92H522V120ZM522 120V86H566V120ZM570 120V86H596V120ZM596 120V104H640V120ZM652 120V86H682V120ZM694 120V86H732V120ZM762 120V86H806V120ZM810 120V86H844V120ZM844 120V86H894V120ZM894 120V80H938V120ZM950 120V74H988V120ZM992 120V98H1036V120ZM1036 120V66H1080V120ZM1042 120V58H1074V120ZM1084 120V60H1114V120ZM1090 120V52H1108V120ZM1114 120V52H1172V120ZM1176 120V74H1210V120ZM1222 120V60H1280V120ZM1228 120V52H1274V120ZM1280 120V60H1314V120ZM1314 120V80H1340V120ZM1352 120V60H1402V120ZM1358 120V52H1396V120ZM1410 120V74H1460V120ZM1416 120V66H1454V120ZM708 120V58H716V44H722V30H727V18H730V4H731V0H732V4H734V18H737V30H742V44H748V58H756V120Z"
			})
		]
	});
}
//#endregion
//#region src/PlayIcon.jsx
function PlayIcon({ playing, size = 16 }) {
	return /* @__PURE__ */ jsx$1("svg", {
		className: "ico-play",
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "currentColor",
		"aria-hidden": "true",
		focusable: "false",
		children: playing ? /* @__PURE__ */ jsx$1("path", { d: "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" }) : /* @__PURE__ */ jsx$1("path", { d: "M8 5.5v13l10.5-6.5z" })
	});
}
function SoundIcon({ on, size = 20 }) {
	return /* @__PURE__ */ jsxs$1("svg", {
		className: "ico-sound",
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		focusable: "false",
		children: [/* @__PURE__ */ jsx$1("path", {
			d: "M4 9.5h3.5L12 6v12l-4.5-3.5H4z",
			fill: "currentColor",
			stroke: "none"
		}), on ? /* @__PURE__ */ jsx$1("path", { d: "M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" }) : /* @__PURE__ */ jsx$1("path", { d: "M16 9.5l5 5M21 9.5l-5 5" })]
	});
}
//#endregion
//#region src/Allies.jsx
var ITEMS = [
	{
		name: "RNT Medellín · 176384",
		text: true
	},
	{
		name: "Google",
		logo: "google.svg",
		w: 112,
		h: 40
	},
	{
		name: "Tripadvisor",
		logo: "tripadvisor.svg",
		w: 112,
		h: 40
	},
	{
		name: "ANATO",
		logo: "anato.webp",
		w: 243,
		h: 64,
		dark: true
	},
	{
		name: "COTELCO",
		logo: "cotelco.webp",
		w: 400,
		h: 150
	},
	{
		name: "Cámara de Comercio de Medellín",
		logo: "camara-comercio-medellin.webp",
		w: 141,
		h: 56
	},
	{
		name: "Alcaldía de Guatapé",
		logo: "alcaldia-guatape.webp",
		w: 83,
		h: 112
	},
	{
		name: "Alcaldía de Medellín",
		logo: "alcaldia-medellin.webp",
		w: 78,
		h: 112
	},
	{
		name: "Hacienda Nápoles",
		logo: "hacienda-napoles.webp",
		w: 400,
		h: 282
	}
];
function Item({ item, hidden }) {
	return /* @__PURE__ */ jsx$1("li", {
		"aria-hidden": hidden || void 0,
		className: "ally",
		children: item.text ? /* @__PURE__ */ jsx$1("span", {
			className: "ally-rnt",
			children: item.name
		}) : /* @__PURE__ */ jsx$1("span", {
			className: `ally-chip ${item.dark ? "is-dark" : ""}`,
			children: /* @__PURE__ */ jsx$1("img", {
				src: `/media/marca/${item.logo}`,
				alt: hidden ? "" : item.name,
				width: item.w,
				height: item.h,
				loading: "lazy",
				decoding: "async"
			})
		})
	});
}
function Allies() {
	const [paused, setPaused] = useState(false);
	return /* @__PURE__ */ jsxs$1("section", {
		className: "allies wrap",
		"aria-label": "Aliados y reconocimientos",
		children: [/* @__PURE__ */ jsx$1("div", {
			className: `allies-viewport ${paused ? "is-paused" : ""}`,
			children: /* @__PURE__ */ jsxs$1("div", {
				className: "allies-track",
				children: [/* @__PURE__ */ jsx$1("ul", {
					role: "list",
					children: ITEMS.map((i) => /* @__PURE__ */ jsx$1(Item, { item: i }, i.name))
				}), /* @__PURE__ */ jsx$1("ul", {
					role: "list",
					"aria-hidden": "true",
					className: "allies-copy",
					children: ITEMS.map((i) => /* @__PURE__ */ jsx$1(Item, {
						item: i,
						hidden: true
					}, i.name))
				})]
			})
		}), /* @__PURE__ */ jsx$1("button", {
			type: "button",
			className: "allies-pause",
			"aria-pressed": paused,
			"aria-label": paused ? "Reanudar el movimiento de los aliados" : "Pausar el movimiento de los aliados",
			onClick: () => setPaused(!paused),
			children: /* @__PURE__ */ jsx$1(PlayIcon, { playing: !paused })
		})]
	});
}
//#endregion
//#region src/meta.js
var staticMeta = {
	"/": ["Tours privados y transporte en Medellín", "Descubre Medellín con tours privados y transporte coordinado por un equipo local. Cuéntanos tu plan y cotiza una experiencia para tu grupo."],
	"/experiencias": ["Tours y experiencias desde Medellín", "Elige entre doce experiencias desde Medellín: Comuna 13, Guatapé, café, pueblos y naturaleza. Conoce los recorridos y consulta las condiciones para tu grupo."],
	"/vehiculos": ["Vehículos para traslados y grupos en Medellín", "Compara sedanes, SUV, vans y buses para traslados y viajes desde Medellín. Consulta capacidad, equipaje y disponibilidad para elegir con el equipo."],
	"/servicios": ["Transporte privado y servicios en Medellín", "Organiza tours privados, traslados al aeropuerto y transporte para empresas, eventos o agencias en Medellín. Comparte tu ruta y solicita una propuesta."],
	"/nosotros": ["Nuestro equipo local en Medellín", "Conoce la historia, el equipo y los valores de Transporte y Turismo Medellín."],
	"/blog": ["Guía para planear tu viaje desde Medellín", "Ideas y consejos para preparar tus experiencias y recorridos desde Medellín."],
	"/contacto": ["Contacto y WhatsApp de T&T Medellín", "Habla con nuestro equipo en Medellín por WhatsApp, teléfono o correo. Comparte tu recorrido, resuelve dudas y consulta la ubicación de la oficina."],
	"/cotizar": ["Cotiza tu tour o traslado en Medellín", "Cuéntanos fechas, viajeros y punto de salida para cotizar tu tour o traslado en Medellín. Revisa y envía tu mensaje por WhatsApp; cotizar no confirma una reserva."],
	"/calificaciones": ["Opiniones de viajeros sobre T&T Medellín", "Consulta la referencia histórica de calificaciones y las reseñas actuales de T&T Medellín en Google."],
	"/politica-de-tratamiento-de-datos": ["Política de tratamiento de datos", "Qué datos personales recogemos, con qué finalidad, cuánto tiempo los conservamos y cómo ejercer tus derechos (Ley 1581 de 2012)."],
	"/privacidad": ["Privacidad", "Conoce cómo se prepara tu consulta y qué información decides compartir con T&T Medellín."]
};
var NOT_FOUND = ["Página no encontrada", "Regresa a las experiencias de T&T Medellín para encontrar tu recorrido."];
var fullTitle = (title) => `${title} | T&T Medellín`;
function applyMeta(title, description) {
	document.title = fullTitle(t(title));
	document.querySelector("meta[name=\"description\"]")?.setAttribute("content", t(description));
	for (const [key, value] of [
		["og:title", document.title],
		["og:description", t(description)],
		["og:locale", languageInfo(language()).og],
		["twitter:title", document.title],
		["twitter:description", t(description)]
	]) {
		const attribute = key.startsWith("og:") ? "property" : "name";
		let node = document.querySelector(`meta[${attribute}="${key}"]`);
		if (!node) {
			node = document.createElement("meta");
			node.setAttribute(attribute, key);
			document.head.appendChild(node);
		}
		node.setAttribute("content", value);
	}
	if (title === NOT_FOUND[0]) {
		document.querySelectorAll("link[rel=\"canonical\"],link[hreflang],meta[property=\"og:url\"]").forEach((n) => n.remove());
		return;
	}
	let canonical = document.querySelector("link[rel=\"canonical\"]");
	if (!canonical) {
		canonical = document.createElement("link");
		canonical.rel = "canonical";
		canonical.href = document.querySelector("meta[name=\"tyt-site-origin\"]")?.content || location.origin;
		document.head.appendChild(canonical);
	}
	try {
		const url = new URL(canonical.href);
		url.pathname = location.pathname.replace(/\/+$/, "") || "/";
		url.search = "";
		url.hash = "";
		canonical.href = url.href;
		let og = document.querySelector("meta[property=\"og:url\"]");
		if (!og) {
			og = document.createElement("meta");
			og.setAttribute("property", "og:url");
			document.head.appendChild(og);
		}
		og.content = url.href;
		for (const item of [...LANGUAGES, { code: "x-default" }]) {
			let node = document.querySelector(`link[hreflang="${item.code}"]`);
			if (!node) {
				node = document.createElement("link");
				node.rel = "alternate";
				node.hreflang = item.code;
				document.head.appendChild(node);
			}
			const alternate = new URL(url);
			alternate.pathname = pathForLanguage(location.pathname, item.code === "x-default" ? "es" : item.code).replace(/\/+$/, "") || "/";
			node.href = alternate.href;
		}
	} catch {}
}
function usePageMeta(title, description) {
	useEffect(() => {
		if (title) applyMeta(title, description);
	}, [title, description]);
}
//#endregion
//#region src/inicio-textos.js
var inicioTextos = {
	estado: "APROBADO — concepto H1, copy del inicio (2026-10-12)",
	titular: ["Medellín,", "a otro nivel"],
	lema: "Experiencias a otro nivel",
	confianza: "Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles",
	eleccion: "Elige tu próximo recuerdo",
	marquesinaCompleta: [
		"Medellín",
		"Metrocable",
		"Comuna 13",
		"Guatapé",
		"Piedra del Peñol",
		"Santa Fe de Antioquia",
		"Jardín",
		"Salto del Buey",
		"Hacienda Nápoles"
	],
	fases: {
		c1: {
			rotulo: "Medellín",
			titular: "No solo visites Medellín. Vívela",
			subtitulo: "Una mirada al valle desde la ladera"
		},
		c2: {
			rotulo: "Plaza Botero",
			titular: "La ciudad como punto de partida",
			subtitulo: ""
		},
		final: {
			rotulo: "Cierre",
			titular: "Tu viaje, tus tiempos, tu experiencia.",
			subtitulo: "Cuéntanos tu plan y lo preparamos contigo."
		}
	},
	retiradas: {
		c3: {
			rotulo: "Metrocable",
			titular: "Una ciudad que vuelve a dibujarse",
			subtitulo: "El Metrocable regala otra mirada de la ciudad."
		},
		c4: {
			rotulo: "Comuna 13",
			titular: "El color cuenta una historia",
			subtitulo: "Arte urbano y escaleras eléctricas acompañan el relato del barrio."
		},
		c5: {
			rotulo: "Guatapé",
			titular: "El horizonte tiene otro color",
			subtitulo: "Agua entre montañas y un pueblo que se cuenta en sus zócalos."
		}
	},
	cartas: {
		"city-tour-comuna-13": {
			emocion: "Descubre",
			frase: "plazas, murales e historias de Medellín",
			lugar: "COMUNA 13"
		},
		"guatape-piedra-del-penol": {
			emocion: "Explora",
			frase: "agua entre montañas y zócalos de color",
			lugar: "GUATAPÉ · PIEDRA DEL PEÑOL"
		},
		"tour-nocturno-medellin": {
			emocion: "Siente",
			frase: "el valle cuando enciende sus luces",
			lugar: "MEDELLÍN"
		},
		"vuelta-a-oriente": {
			emocion: "Conecta",
			frase: "con pueblos y plazas, sin carreras",
			lugar: "VUELTA A ORIENTE"
		},
		"tour-del-cafe-medellin": {
			emocion: "Vive",
			frase: "el oficio detrás de cada taza",
			lugar: "TOUR DEL CAFÉ"
		},
		"hacienda-napoles": {
			emocion: "Disfruta",
			frase: "un día en familia, con transporte coordinado",
			lugar: "HACIENDA NÁPOLES"
		},
		"salto-del-buey": {
			emocion: "Sorpréndete",
			frase: "una cascada al final del sendero",
			lugar: "SALTO DEL BUEY"
		},
		"santa-fe-de-antioquia": {
			emocion: "Recuerda",
			frase: "calles coloniales y el Puente de Occidente",
			lugar: "SANTA FE DE ANTIOQUIA"
		},
		"jardin-antioquia": {
			emocion: "Enamórate",
			frase: "fachadas de color y plaza sin prisa",
			lugar: "JARDÍN"
		},
		"tour-de-compras": {
			emocion: "Descubre",
			frase: "El Hueco, outlets y tiendas locales",
			lugar: "TOUR DE COMPRAS"
		},
		"tour-miradores": {
			emocion: "Inspírate",
			frase: "el valle cambia con la luz",
			lugar: "TOUR DE MIRADORES"
		},
		"traslados-aeropuerto-jmc": {
			emocion: "Conecta",
			frase: "del aeropuerto a tu alojamiento, coordinado",
			lugar: "TRASLADOS JMC"
		}
	}
};
var CHAPTERS = ["c1", "c2"];
/** Titular, subtítulo y rótulo de una fase del clip o del cierre. */
function textoFase(id) {
	const fase = inicioTextos.fases[id];
	return {
		rotulo: fase.rotulo,
		titular: fase.titular,
		subtitulo: fase.subtitulo
	};
}
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
	navigator.connection?.addEventListener("change", notify);
	return () => {
		mq.removeEventListener("change", notify);
		navigator.connection?.removeEventListener("change", notify);
	};
};
var readLight = () => reducedQuery().matches || Boolean(navigator.connection?.saveData);
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
			/* @__PURE__ */ jsx$1("h2", { children: withType ? /* @__PURE__ */ jsxs$1(Fragment, { children: [
				"Cuéntanos qué",
				/* @__PURE__ */ jsx$1("br", {}),
				"necesitas"
			] }) : /* @__PURE__ */ jsxs$1(Fragment, { children: [
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
//#region src/CardExtras.jsx
var RATING = 5;
var reviewsText = () => language() === "pt-BR" ? "265 avaliações no Google" : language() === "en" ? "265 Google reviews" : "265 reseñas en Google";
var fullLabel = (figure) => language() === "pt-BR" ? `${figure} · 265 avaliações no Google · avaliação da empresa · set. 2026` : language() === "en" ? `${figure} · 265 Google reviews · company rating · Sept. 2026` : `${figure} · 265 reseñas en Google · valoración de la empresa · sept. 2026`;
function GoogleBadge({ className = "" }) {
	const figure = RATING.toLocaleString(languageInfo(language()).html, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
	const label = fullLabel(figure);
	return /* @__PURE__ */ jsxs$1("a", {
		className: `card-google ${className}`,
		href: company.reviews,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": label,
		title: label,
		children: [
			/* @__PURE__ */ jsx$1("span", {
				className: "card-google-stars",
				"aria-hidden": "true",
				children: "★★★★★"
			}),
			/* @__PURE__ */ jsx$1("span", {
				"aria-hidden": "true",
				children: figure
			}),
			/* @__PURE__ */ jsxs$1("span", {
				"aria-hidden": "true",
				className: "card-google-brand",
				children: ["· ", reviewsText()]
			})
		]
	});
}
function GoogleBadgeStatic({ className = "" }) {
	const figure = RATING.toLocaleString(languageInfo(language()).html, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
	const label = fullLabel(figure);
	return /* @__PURE__ */ jsxs$1("span", {
		className: `card-google card-google--static ${className}`,
		role: "img",
		"aria-label": label,
		children: [
			/* @__PURE__ */ jsx$1("span", {
				className: "card-google-stars",
				"aria-hidden": "true",
				children: "★★★★★"
			}),
			/* @__PURE__ */ jsx$1("span", {
				"aria-hidden": "true",
				children: figure
			}),
			/* @__PURE__ */ jsxs$1("span", {
				"aria-hidden": "true",
				className: "card-google-brand",
				children: ["· ", reviewsText()]
			})
		]
	});
}
var FACEBOOK = "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z";
var X_PATH = "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z";
var Brand = ({ d, size = 18 }) => /* @__PURE__ */ jsx$1("svg", {
	className: "ico",
	viewBox: "0 0 24 24",
	width: size,
	height: size,
	fill: "currentColor",
	"aria-hidden": "true",
	focusable: "false",
	children: /* @__PURE__ */ jsx$1("path", { d })
});
function shareUrl(path) {
	let origin = location.origin;
	try {
		const c = document.querySelector("link[rel=\"canonical\"]")?.href;
		if (c) {
			const u = new URL(c);
			if (!/\.invalid$/.test(u.hostname)) origin = u.origin;
		}
	} catch {}
	return origin + pathForLanguage(path, language());
}
var TEXT = {
	"pt-BR": {
		button: "Compartilhar esta experiência",
		title: "Compartilhar por",
		copy: "Copiar link",
		copied: "Link copiado",
		error: "Não foi possível copiar. Copie o endereço da barra do navegador.",
		more: "Mais opções…",
		paste: "Link copiado. Cole no seu story ou mensagem do {red}.",
		mail: "E-mail",
		message: "Confira esta experiência da T&T Medellín:"
	},
	es: {
		button: "Compartir esta experiencia",
		title: "Compartir por",
		copy: "Copiar enlace",
		copied: "Enlace copiado",
		error: "No se pudo copiar. Copia la dirección de la barra del navegador.",
		more: "Más opciones…",
		paste: "Enlace copiado. Pégalo en tu historia o mensaje de {red}.",
		mail: "Correo",
		message: "Mira esta experiencia de T&T Medellín:"
	},
	en: {
		button: "Share this experience",
		title: "Share via",
		copy: "Copy link",
		copied: "Link copied",
		error: "Couldn't copy. Copy the address from the browser bar instead.",
		more: "More options…",
		paste: "Link copied. Paste it into your {red} story or message.",
		mail: "Email",
		message: "Check out this experience from T&T Medellín:"
	}
};
function ShareMenu({ name: rawName, path, className = "" }) {
	const name = t(rawName);
	const tx = TEXT[language()];
	const [open, setOpen] = useState(false), [pos, setPos] = useState(null), [native, setNative] = useState(false), [notice, setNotice] = useState("");
	const btn = useRef(null), menu = useRef(null), timer = useRef(0);
	useEffect(() => {
		setNative(typeof navigator.share === "function");
	}, []);
	const close = (restore = true) => {
		setOpen(false);
		setNotice("");
		if (restore) btn.current?.focus();
	};
	useEffect(() => {
		if (!open) return void 0;
		const r = btn.current.getBoundingClientRect(), w = 224, h = 340;
		const left = Math.max(8, Math.min(r.right - w, innerWidth - w - 8)), below = r.bottom + 8 + h <= innerHeight || r.top < h;
		setPos({
			left,
			top: below ? r.bottom + 8 : Math.max(8, r.top - 8 - h)
		});
		const first = () => menu.current?.querySelector("[role=menuitem]")?.focus();
		requestAnimationFrame(first);
		const away = (e) => {
			if (!menu.current?.contains(e.target) && !btn.current?.contains(e.target)) close(false);
		};
		const stop = () => close(false);
		document.addEventListener("pointerdown", away);
		window.addEventListener("resize", stop);
		window.addEventListener("scroll", stop, { passive: true });
		return () => {
			document.removeEventListener("pointerdown", away);
			window.removeEventListener("resize", stop);
			window.removeEventListener("scroll", stop);
		};
	}, [open]);
	const say = (text) => {
		setNotice(text);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setNotice(""), 3500);
	};
	const url = () => shareUrl(path), text = () => `${tx.message} ${name}`, openNew = (to) => {
		window.open(to, "_blank", "noopener,noreferrer");
		close(false);
	};
	const copy = async (value) => {
		try {
			await navigator.clipboard.writeText(value);
			return true;
		} catch {
			return false;
		}
	};
	const items = [
		...native ? [{
			id: "native",
			label: tx.more,
			icon: /* @__PURE__ */ jsx$1(Icon, {
				name: "more",
				size: 18
			}),
			run: async () => {
				close(false);
				try {
					await navigator.share({
						title: name,
						text: text(),
						url: url()
					});
				} catch {}
			}
		}] : [],
		{
			id: "wa",
			label: "WhatsApp",
			icon: /* @__PURE__ */ jsx$1(SocialIcon, {
				id: "whatsapp",
				size: 18
			}),
			run: () => openNew(`https://wa.me/?text=${encodeURIComponent(`${text()} ${url()}`)}`)
		},
		{
			id: "fb",
			label: "Facebook",
			icon: /* @__PURE__ */ jsx$1(Brand, { d: FACEBOOK }),
			run: () => openNew(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`)
		},
		{
			id: "x",
			label: "X",
			icon: /* @__PURE__ */ jsx$1(Brand, { d: X_PATH }),
			run: () => openNew(`https://x.com/intent/post?text=${encodeURIComponent(text())}&url=${encodeURIComponent(url())}`)
		},
		{
			id: "ig",
			label: "Instagram",
			icon: /* @__PURE__ */ jsx$1(SocialIcon, {
				id: "instagram",
				size: 18
			}),
			run: async () => {
				say(await copy(`${text()} ${url()}`) ? tx.paste.replace("{red}", "Instagram") : tx.error);
				window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
			}
		},
		{
			id: "tt",
			label: "TikTok",
			icon: /* @__PURE__ */ jsx$1(SocialIcon, {
				id: "tiktok",
				size: 18
			}),
			run: async () => {
				say(await copy(`${text()} ${url()}`) ? tx.paste.replace("{red}", "TikTok") : tx.error);
				window.open("https://www.tiktok.com/", "_blank", "noopener,noreferrer");
			}
		},
		{
			id: "mail",
			label: tx.mail,
			icon: /* @__PURE__ */ jsx$1(Icon, {
				name: "mail",
				size: 18
			}),
			run: () => {
				close(false);
				location.href = `mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(`${text()}\n${url()}`)}`;
			}
		},
		{
			id: "copy",
			label: tx.copy,
			icon: /* @__PURE__ */ jsx$1(Icon, {
				name: "link",
				size: 18
			}),
			run: async () => say(await copy(url()) ? tx.copied : tx.error)
		}
	];
	const onKey = (e) => {
		const els = [...menu.current.querySelectorAll("[role=menuitem]")], i = els.indexOf(document.activeElement);
		if (e.key === "Escape") {
			e.preventDefault();
			close();
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			els[(i + 1) % els.length].focus();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			els[(i - 1 + els.length) % els.length].focus();
		} else if (e.key === "Home") {
			e.preventDefault();
			els[0].focus();
		} else if (e.key === "End") {
			e.preventDefault();
			els[els.length - 1].focus();
		} else if (e.key === "Tab") {
			e.preventDefault();
			els[(i + (e.shiftKey ? -1 : 1) + els.length) % els.length].focus();
		}
	};
	return /* @__PURE__ */ jsxs$1(Fragment, { children: [/* @__PURE__ */ jsx$1("button", {
		ref: btn,
		type: "button",
		className: `card-share ${className}`,
		"aria-label": `${tx.button}: ${name}`,
		"aria-haspopup": "menu",
		"aria-expanded": open,
		onClick: () => open ? close() : setOpen(true),
		children: /* @__PURE__ */ jsx$1(Icon, {
			name: "share",
			size: 18
		})
	}), open && pos && createPortal(/* @__PURE__ */ jsxs$1("div", {
		ref: menu,
		className: "share-menu",
		role: "menu",
		"aria-label": tx.title,
		style: {
			left: pos.left,
			top: pos.top
		},
		onKeyDown: onKey,
		children: [
			/* @__PURE__ */ jsx$1("p", {
				className: "share-menu-title",
				"aria-hidden": "true",
				children: tx.title
			}),
			items.map((it) => /* @__PURE__ */ jsxs$1("button", {
				type: "button",
				role: "menuitem",
				className: "share-item",
				onClick: it.run,
				children: [it.icon, /* @__PURE__ */ jsx$1("span", { children: it.label })]
			}, it.id)),
			/* @__PURE__ */ jsx$1("p", {
				className: "share-notice",
				role: "status",
				"aria-live": "polite",
				children: notice
			})
		]
	}), document.body)] });
}
//#endregion
//#region src/encuadre.js
var hiddenByCover = (photo, frame) => {
	if (!photo?.width || !photo?.height || !frame) return 0;
	const r = photo.width / photo.height;
	return r > frame ? 1 - frame / r : 1 - r / frame;
};
//#endregion
//#region src/shared.jsx
var Quote = lazy(() => import("./assets/Quote-6WXT6Jwf.js"));
var reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Picture({ photo, alt, priority = false, className = "", native = false, sizes = "(max-width: 700px) 100vw, 65vw", frame = 0, max = .5 }) {
	if (!photo) return null;
	if (frame && hiddenByCover(photo, frame) > max) return /* @__PURE__ */ jsx$1("span", {
		className: "pic-fit",
		style: { "--ph": `url(${photo.small || photo.src})` },
		children: /* @__PURE__ */ jsx$1(Picture, {
			photo,
			alt,
			priority,
			className,
			native,
			sizes
		})
	});
	return /* @__PURE__ */ jsx$1("img", {
		className,
		style: native ? { maxWidth: `min(100%, ${photo.width}px)` } : photo.focus ? { objectPosition: photo.focus } : void 0,
		src: photo.src,
		srcSet: photo.srcset || `${photo.small} 640w, ${photo.src} ${photo.width}w`,
		sizes,
		width: photo.width,
		height: photo.height,
		alt,
		loading: priority ? "eager" : "lazy",
		fetchPriority: priority ? "high" : "auto",
		decoding: "async"
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ jsx$1("p", {
		className: "eyebrow",
		children
	});
}
function Button({ to, children, ...props }) {
	return /* @__PURE__ */ jsxs$1(Link, {
		className: "button",
		to,
		...props,
		children: [children, /* @__PURE__ */ jsx$1(Arrow, {})]
	});
}
function Rail({ children, label }) {
	const ref = useRef(null), drag = useRef(null), moved = useRef(false);
	const move = (d) => ref.current.scrollBy({
		left: d * ref.current.clientWidth * .8,
		behavior: reduced() ? "instant" : "smooth"
	});
	return /* @__PURE__ */ jsxs$1("div", {
		className: "rail-shell",
		children: [/* @__PURE__ */ jsxs$1("div", {
			className: "rail-controls",
			children: [
				/* @__PURE__ */ jsx$1("span", { children: "Explora a tu ritmo" }),
				/* @__PURE__ */ jsx$1("button", {
					onClick: () => move(-1),
					"aria-label": `Anterior: ${label}`,
					children: /* @__PURE__ */ jsx$1(Arrow, { dir: "left" })
				}),
				/* @__PURE__ */ jsx$1("button", {
					onClick: () => move(1),
					"aria-label": `Siguiente: ${label}`,
					children: /* @__PURE__ */ jsx$1(Arrow, { dir: "right" })
				})
			]
		}), /* @__PURE__ */ jsx$1("div", {
			ref,
			className: "rail",
			role: "region",
			"aria-label": label,
			tabIndex: 0,
			onKeyDown: (e) => {
				if (e.target === e.currentTarget && ["ArrowLeft", "ArrowRight"].includes(e.key)) {
					e.preventDefault();
					move(e.key === "ArrowLeft" ? -1 : 1);
				}
			},
			onPointerDown: (e) => {
				if (e.pointerType === "mouse" && e.button === 0) {
					drag.current = {
						x: e.clientX,
						left: ref.current.scrollLeft
					};
					moved.current = false;
				}
			},
			onPointerMove: (e) => {
				if (!drag.current) return;
				const dx = e.clientX - drag.current.x;
				if (Math.abs(dx) > 8) {
					moved.current = true;
					ref.current.scrollLeft = drag.current.left - dx;
				}
			},
			onPointerUp: () => {
				drag.current = null;
			},
			onPointerLeave: () => {
				drag.current = null;
			},
			onClickCapture: (e) => {
				if (moved.current) {
					e.preventDefault();
					e.stopPropagation();
					moved.current = false;
				}
			},
			onDragStart: (e) => e.preventDefault(),
			children
		})]
	});
}
function TourCard({ tour }) {
	const copy = inicioTextos.cartas[tour.slug];
	return /* @__PURE__ */ jsxs$1("article", {
		className: "tour-card",
		"data-flip-key": tour.slug,
		children: [
			/* @__PURE__ */ jsxs$1(Link, {
				className: "tour-card-main",
				to: `/experiencias/${tour.slug}`,
				children: [/* @__PURE__ */ jsx$1("div", {
					className: "tour-card-image",
					children: /* @__PURE__ */ jsx$1(Picture, {
						photo: tour.images[0],
						alt: tour.name,
						sizes: "(max-width: 700px) 100vw, (max-width: 1099px) 50vw, 33vw"
					})
				}), /* @__PURE__ */ jsxs$1("div", {
					className: "card-copy",
					children: [
						/* @__PURE__ */ jsxs$1("div", {
							className: "card-meta",
							children: [/* @__PURE__ */ jsx$1("span", { children: tour.category }), /* @__PURE__ */ jsxs$1("span", { children: [tour.number, " / T&T"] })]
						}),
						/* @__PURE__ */ jsx$1("h3", { children: tour.name }),
						/* @__PURE__ */ jsxs$1("p", { children: [
							/* @__PURE__ */ jsxs$1("b", { children: [copy.emocion, ":"] }),
							" ",
							copy.frase
						] }),
						/* @__PURE__ */ jsxs$1("span", {
							className: "card-action",
							children: ["Planea esta experiencia ", /* @__PURE__ */ jsx$1(Arrow, {})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx$1(ShareMenu, {
				name: tour.name,
				path: `/experiencias/${tour.slug}`,
				className: "tour-card-share"
			}),
			/* @__PURE__ */ jsx$1(GoogleBadge, { className: "tour-card-badge" })
		]
	});
}
function PageTitle({ tag, title, text, photo, photoAlt = tag, floating = [] }) {
	return /* @__PURE__ */ jsxs$1(EditorialMotion, {
		className: `page-title wrap ${photo ? "page-title-with-photo" : ""}`,
		children: [/* @__PURE__ */ jsxs$1("div", {
			className: "page-title-copy",
			children: [
				/* @__PURE__ */ jsx$1(Eyebrow, { children: tag }),
				/* @__PURE__ */ jsx$1("h1", { children: title }),
				text && /* @__PURE__ */ jsx$1("p", { children: text })
			]
		}), photo && /* @__PURE__ */ jsxs$1("div", {
			className: "page-title-media",
			children: [/* @__PURE__ */ jsx$1("figure", {
				className: "page-title-card",
				children: /* @__PURE__ */ jsx$1(Picture, {
					photo,
					alt: photoAlt,
					priority: true,
					sizes: "(max-width: 700px) 72vw, 320px"
				})
			}), floating.map((p, i) => /* @__PURE__ */ jsx$1("figure", {
				className: `editorial-float editorial-float-${i}`,
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx$1(Picture, {
					photo: p,
					alt: "",
					sizes: "140px"
				})
			}, p.src))]
		})]
	});
}
function QuoteSection({ context, mode }) {
	const mounted = useMounted();
	const frame = /* @__PURE__ */ jsxs$1("section", {
		className: "quote-section wrap",
		"aria-busy": "true",
		children: [/* @__PURE__ */ jsx$1(QuoteCopy, { withType: mode === "contacto" }), /* @__PURE__ */ jsx$1("div", {
			className: "quote-form quote-form-frame",
			"aria-hidden": "true"
		})]
	});
	return /* @__PURE__ */ jsx$1("div", {
		id: "consulta",
		"data-tn": "3",
		children: mounted ? /* @__PURE__ */ jsx$1(Suspense, {
			fallback: frame,
			children: /* @__PURE__ */ jsx$1(Quote, {
				context,
				mode
			})
		}) : frame
	});
}
//#endregion
//#region src/RouteScroll.jsx
var positions = /* @__PURE__ */ new Map();
var activeKey = null;
var held = null;
var holdScroll = () => {
	held = window.scrollY;
};
if (typeof window !== "undefined") {
	history.scrollRestoration = "manual";
	window.addEventListener("scroll", () => {
		if (activeKey) positions.set(activeKey, window.scrollY);
	}, { passive: true });
}
function RouteScroll() {
	const location = useLocation(), action = useNavigationType();
	useLayoutEffect(() => {
		activeKey = null;
		let stopped = false, timer, frame;
		const keep = held;
		setTimeout(() => {
			held = null;
		}, 0);
		const saved = keep !== null ? keep : positions.get(location.key);
		let anchor = null;
		try {
			anchor = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
		} catch {}
		const apply = () => {
			if (stopped) return;
			const offset = (document.querySelector(".site-header")?.getBoundingClientRect().height || 0) + 16;
			const top = anchor ? Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - offset) : (action === "POP" || keep !== null) && saved !== void 0 ? saved : 0;
			window.scrollTo({
				top,
				behavior: "instant"
			});
		};
		const stop = () => {
			stopped = true;
			observer.disconnect();
			clearTimeout(timer);
			cancelAnimationFrame(frame);
		};
		const observer = new ResizeObserver(() => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(apply);
		});
		apply();
		activeKey = location.key;
		if (anchor || (action === "POP" || keep !== null) && saved !== void 0) {
			observer.observe(document.body);
			timer = setTimeout(stop, 2500);
		}
		for (const event of [
			"wheel",
			"touchstart",
			"pointerdown",
			"keydown"
		]) window.addEventListener(event, stop, {
			once: true,
			passive: true
		});
		if (action !== "POP" && keep === null && !anchor) document.querySelector("main")?.focus({ preventScroll: true });
		return () => {
			stop();
			activeKey = null;
			for (const event of [
				"wheel",
				"touchstart",
				"pointerdown",
				"keydown"
			]) window.removeEventListener(event, stop);
		};
	}, [
		location.key,
		location.pathname,
		location.hash,
		action
	]);
	return null;
}
//#endregion
//#region src/consent.js
var CONSENT_KEY = "tyt-privacy-v1";
var VERSION = 1;
var LIFETIME = 15552e6;
var memory = null;
if (typeof window !== "undefined") window.addEventListener("storage", (event) => {
	if (event.key === "tyt-privacy-v1" || event.key === null) memory = null;
});
function readConsent() {
	if (memory && memory.expires > Date.now()) return memory;
	try {
		const value = JSON.parse(localStorage.getItem(CONSENT_KEY));
		if (value?.version === VERSION && typeof value.preferences === "boolean" && value.expires > Date.now()) return value;
	} catch {}
	return null;
}
var allowPreferences = () => readConsent()?.preferences === true;
function saveConsent(preferences) {
	memory = {
		version: VERSION,
		preferences: Boolean(preferences),
		expires: Date.now() + LIFETIME
	};
	let persisted = false;
	try {
		localStorage.setItem(CONSENT_KEY, JSON.stringify(memory));
		persisted = true;
	} catch {}
	if (!preferences) try {
		localStorage.removeItem("tyt-theme");
	} catch {}
	window.dispatchEvent(new CustomEvent("tyt-consent-change"));
	return persisted;
}
var openConsent = () => window.dispatchEvent(new CustomEvent("tyt-open-consent"));
//#endregion
//#region src/Preferences.jsx
var SHORT = {
	es: "ES",
	en: "EN",
	"pt-BR": "PT"
};
function LanguageMenu() {
	const [open, setOpen] = useState(false), root = useRef(null), button = useRef(null);
	const { pathname, search, hash } = useLocation(), current = language(), info = LANGUAGES.find((x) => x.code === current) || LANGUAGES[0];
	useEffect(() => {
		if (!open) return;
		const down = (e) => {
			if (!root.current?.contains(e.target)) setOpen(false);
		};
		const key = (e) => {
			if (e.key === "Escape") {
				setOpen(false);
				button.current?.focus();
			}
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				const items = [...root.current.querySelectorAll("a")], i = items.indexOf(document.activeElement);
				e.preventDefault();
				items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
			}
		};
		document.addEventListener("pointerdown", down);
		document.addEventListener("keydown", key);
		return () => {
			document.removeEventListener("pointerdown", down);
			document.removeEventListener("keydown", key);
		};
	}, [open]);
	const choose = (e, code) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return;
		e.preventDefault();
		setOpen(false);
		if (code === current) {
			button.current?.focus();
			return;
		}
		holdScroll();
		switchLanguage(code);
	};
	return /* @__PURE__ */ jsxs$1("div", {
		className: "language-menu",
		ref: root,
		children: [/* @__PURE__ */ jsxs$1("button", {
			ref: button,
			type: "button",
			className: "language-toggle",
			translate: "no",
			"aria-haspopup": "true",
			"aria-expanded": open,
			"aria-label": `${t("Idioma del sitio")}: ${info.label}`,
			onClick: () => setOpen(!open),
			children: [/* @__PURE__ */ jsxs$1("svg", {
				"aria-hidden": "true",
				width: "18",
				height: "18",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.7",
				children: [/* @__PURE__ */ jsx$1("circle", {
					cx: "12",
					cy: "12",
					r: "9"
				}), /* @__PURE__ */ jsx$1("path", { d: "M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" })]
			}), /* @__PURE__ */ jsx$1("span", { children: SHORT[current] })]
		}), open && /* @__PURE__ */ jsx$1("ul", {
			className: "language-list",
			role: "list",
			children: LANGUAGES.map((lang) => /* @__PURE__ */ jsx$1("li", { children: /* @__PURE__ */ jsxs$1("a", {
				href: languagePath(pathname, lang.code) + search + hash,
				hrefLang: lang.html,
				lang: lang.html,
				translate: "no",
				"aria-current": lang.code === current ? "true" : void 0,
				onClick: (e) => choose(e, lang.code),
				children: [/* @__PURE__ */ jsx$1("span", { children: lang.label }), /* @__PURE__ */ jsx$1("span", {
					className: "language-code",
					"aria-hidden": "true",
					children: SHORT[lang.code]
				})]
			}) }, lang.code))
		})]
	});
}
function Preferences() {
	const [dark, setDark] = useState(false);
	const { pathname, search, hash } = useLocation();
	useEffect(() => {
		const system = matchMedia("(prefers-color-scheme: dark)");
		const sync = () => {
			let saved;
			try {
				if (allowPreferences()) saved = localStorage.getItem("tyt-theme");
			} catch {}
			const active = saved === "dark" || saved !== "light" && system.matches;
			document.documentElement.dataset.theme = active ? "dark" : "light";
			setDark(active);
		};
		sync();
		system.addEventListener("change", sync);
		window.addEventListener("storage", sync);
		window.addEventListener("tyt-consent-change", sync);
		return () => {
			system.removeEventListener("change", sync);
			window.removeEventListener("storage", sync);
			window.removeEventListener("tyt-consent-change", sync);
		};
	}, []);
	const toggle = () => {
		const next = !dark;
		document.documentElement.dataset.theme = next ? "dark" : "light";
		setDark(next);
		document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", next ? "#171A18" : "#FAF8F5");
		if (allowPreferences()) try {
			localStorage.setItem("tyt-theme", next ? "dark" : "light");
		} catch {}
	};
	return /* @__PURE__ */ jsxs$1("div", {
		className: "site-preferences",
		children: [/* @__PURE__ */ jsx$1("button", {
			type: "button",
			className: "theme-toggle",
			"aria-label": dark ? "Activar modo claro" : "Activar modo oscuro",
			"aria-pressed": dark,
			onClick: toggle,
			children: /* @__PURE__ */ jsx$1("svg", {
				"aria-hidden": "true",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.7",
				children: dark ? /* @__PURE__ */ jsxs$1(Fragment, { children: [/* @__PURE__ */ jsx$1("circle", {
					cx: "12",
					cy: "12",
					r: "4"
				}), /* @__PURE__ */ jsx$1("path", { d: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" })] }) : /* @__PURE__ */ jsx$1("path", { d: "M20 15A8.5 8.5 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z" })
			})
		}), /* @__PURE__ */ jsx$1(LanguageMenu, {})]
	});
}
//#endregion
//#region src/Consent.jsx
function ConsentLink() {
	return /* @__PURE__ */ jsx$1("button", {
		className: "consent-link",
		type: "button",
		onClick: openConsent,
		children: "Cookies y preferencias"
	});
}
var CookieIcon = () => /* @__PURE__ */ jsxs$1("svg", {
	"aria-hidden": "true",
	width: "26",
	height: "26",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.6",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ jsx$1("path", { d: "M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 1 1 0 0 0-1-1Z" }),
		/* @__PURE__ */ jsx$1("circle", {
			cx: "8.5",
			cy: "11",
			r: ".9",
			fill: "currentColor"
		}),
		/* @__PURE__ */ jsx$1("circle", {
			cx: "12.5",
			cy: "15.5",
			r: ".9",
			fill: "currentColor"
		}),
		/* @__PURE__ */ jsx$1("circle", {
			cx: "15.5",
			cy: "12",
			r: ".9",
			fill: "currentColor"
		})
	]
});
function Consent() {
	const [ready, setReady] = useState(false), [chosen, setChosen] = useState(false), [leaving, setLeaving] = useState(false), [draft, setDraft] = useState(false), [notice, setNotice] = useState("");
	const banner = useRef(null), dialog = useRef(null), returnFocus = useRef(null);
	useEffect(() => {
		setChosen(Boolean(readConsent()));
		setReady(true);
		const open = () => {
			setDraft(readConsent()?.preferences === true);
			returnFocus.current = document.activeElement;
			dialog.current?.showModal();
		};
		const sync = () => setChosen(Boolean(readConsent()));
		window.addEventListener("tyt-open-consent", open);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("tyt-open-consent", open);
			window.removeEventListener("storage", sync);
		};
	}, []);
	useEffect(() => {
		if (!ready || chosen) {
			document.documentElement.style.removeProperty("--consent-space");
			return;
		}
		const el = banner.current, narrow = matchMedia("(max-width:767px)");
		const size = () => {
			if (narrow.matches) document.documentElement.style.setProperty("--consent-space", `${Math.ceil(el.getBoundingClientRect().height) + 24}px`);
			else document.documentElement.style.removeProperty("--consent-space");
		};
		const ro = new ResizeObserver(size);
		ro.observe(el);
		narrow.addEventListener("change", size);
		size();
		return () => {
			ro.disconnect();
			narrow.removeEventListener("change", size);
			document.documentElement.style.removeProperty("--consent-space");
		};
	}, [ready, chosen]);
	const close = () => dialog.current?.close();
	const choose = (value) => {
		const persisted = saveConsent(value);
		setNotice(persisted ? "" : "La configuración no pudo guardarse. Se aplicará durante esta visita.");
		close();
		if (banner.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setLeaving(true);
			setTimeout(() => {
				setChosen(true);
				setLeaving(false);
			}, 200);
		} else setChosen(true);
	};
	if (!ready) return null;
	return /* @__PURE__ */ jsxs$1(Fragment, { children: [
		!chosen && /* @__PURE__ */ jsxs$1("section", {
			ref: banner,
			className: `consent-banner${leaving ? " is-leaving" : ""}`,
			"aria-labelledby": "privacy-banner-title",
			children: [
				/* @__PURE__ */ jsxs$1("div", {
					className: "consent-top",
					children: [/* @__PURE__ */ jsx$1("span", {
						className: "consent-icon",
						children: /* @__PURE__ */ jsx$1(CookieIcon, {})
					}), /* @__PURE__ */ jsx$1("h2", {
						id: "privacy-banner-title",
						children: "Tu privacidad"
					})]
				}),
				/* @__PURE__ */ jsx$1("p", { children: "Usamos almacenamiento local para recordar ajustes del sitio. No usamos analítica ni publicidad. Tú decides si guardamos tu tema preferido." }),
				/* @__PURE__ */ jsxs$1("div", {
					className: "consent-actions",
					children: [
						/* @__PURE__ */ jsx$1("button", {
							type: "button",
							onClick: () => choose(true),
							children: "Aceptar"
						}),
						/* @__PURE__ */ jsx$1("button", {
							type: "button",
							onClick: () => choose(false),
							children: "Rechazar"
						}),
						/* @__PURE__ */ jsx$1("button", {
							type: "button",
							onClick: openConsent,
							children: "Configurar"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsxs$1("dialog", {
			ref: dialog,
			className: "consent-dialog",
			"aria-labelledby": "privacy-title",
			"aria-describedby": "privacy-description",
			onClose: () => {
				if (returnFocus.current?.isConnected) returnFocus.current.focus({ preventScroll: true });
				else document.querySelector(".consent-link")?.focus({ preventScroll: true });
			},
			children: [
				/* @__PURE__ */ jsxs$1("div", {
					className: "consent-head",
					children: [
						/* @__PURE__ */ jsx$1("span", {
							className: "consent-icon",
							children: /* @__PURE__ */ jsx$1(CookieIcon, {})
						}),
						/* @__PURE__ */ jsx$1("h2", {
							id: "privacy-title",
							children: "Preferencias de privacidad"
						}),
						/* @__PURE__ */ jsx$1("button", {
							type: "button",
							onClick: close,
							"aria-label": "Cerrar preferencias",
							children: "×"
						})
					]
				}),
				/* @__PURE__ */ jsx$1("p", {
					id: "privacy-description",
					children: "Tu elección se guarda durante seis meses en este navegador."
				}),
				/* @__PURE__ */ jsxs$1("section", { children: [
					/* @__PURE__ */ jsx$1("h3", { children: "Necesarias" }),
					/* @__PURE__ */ jsx$1("strong", { children: "Siempre activas" }),
					/* @__PURE__ */ jsx$1("p", { children: "Guardan tu decisión de privacidad y ajustes funcionales, como reducir el movimiento y la ayuda de navegación." })
				] }),
				/* @__PURE__ */ jsxs$1("section", { children: [/* @__PURE__ */ jsxs$1("label", {
					className: "consent-option",
					children: [/* @__PURE__ */ jsx$1("input", {
						type: "checkbox",
						checked: draft,
						onChange: (e) => setDraft(e.target.checked)
					}), /* @__PURE__ */ jsx$1("strong", { children: "Preferencias" })]
				}), /* @__PURE__ */ jsx$1("p", { children: "Recordar el tema claro u oscuro entre visitas." })] }),
				/* @__PURE__ */ jsxs$1("section", { children: [/* @__PURE__ */ jsx$1("h3", { children: "Analítica y publicidad" }), /* @__PURE__ */ jsx$1("p", { children: "No utilizadas actualmente" })] }),
				/* @__PURE__ */ jsx$1(Link, {
					className: "consent-policy",
					to: "/privacidad",
					onClick: close,
					children: "Privacidad"
				}),
				/* @__PURE__ */ jsxs$1("div", {
					className: "consent-actions",
					children: [/* @__PURE__ */ jsx$1("button", {
						type: "button",
						onClick: () => choose(draft),
						children: "Guardar preferencias"
					}), /* @__PURE__ */ jsx$1("button", {
						type: "button",
						onClick: () => choose(false),
						children: "Retirar consentimiento"
					})]
				})
			]
		}),
		notice && /* @__PURE__ */ jsx$1("p", {
			className: "consent-notice",
			role: "status",
			children: notice
		})
	] });
}
//#endregion
//#region src/Welcome.jsx
var KEY = "tyt-bienvenida";
var EXCLUDED = /^\/(cotizar|contacto)\/?$/;
var DELAY = 3500;
var shownInMemory = false;
var seen = () => {
	if (shownInMemory) return true;
	if (!allowPreferences()) return false;
	try {
		return sessionStorage.getItem(KEY) === "1";
	} catch {
		return false;
	}
};
var markSeen = () => {
	shownInMemory = true;
	if (allowPreferences()) try {
		sessionStorage.setItem(KEY, "1");
	} catch {}
};
var Sun = () => /* @__PURE__ */ jsxs$1("svg", {
	"aria-hidden": "true",
	width: "28",
	height: "28",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	children: [/* @__PURE__ */ jsx$1("circle", {
		cx: "12",
		cy: "12",
		r: "4.2",
		fill: "currentColor",
		fillOpacity: ".22"
	}), /* @__PURE__ */ jsx$1("path", { d: "M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" })]
});
function Welcome() {
	const { pathname } = useLocation();
	const [resolved, setResolved] = useState(false), [open, setOpen] = useState(false), [leaving, setLeaving] = useState(false);
	const card = useRef(null), blocked = EXCLUDED.test(pathname);
	useEffect(() => {
		const sync = () => setResolved(Boolean(readConsent()));
		sync();
		window.addEventListener("tyt-consent-change", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("tyt-consent-change", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	useEffect(() => {
		if (!resolved || blocked || open || seen()) return;
		let timer, tries = 0;
		const attempt = () => {
			if (document.querySelector("dialog[open], .menu-open, .consent-banner") && tries++ < 20) {
				timer = setTimeout(attempt, 1500);
				return;
			}
			if (tries >= 20) return;
			const header = document.querySelector(".site-header");
			document.documentElement.style.setProperty("--welcome-top", `${Math.round((header?.getBoundingClientRect().bottom || 0) + 12)}px`);
			markSeen();
			setOpen(true);
		};
		timer = setTimeout(attempt, DELAY);
		return () => clearTimeout(timer);
	}, [
		resolved,
		blocked,
		open,
		pathname
	]);
	const close = () => {
		if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setOpen(false);
			return;
		}
		setLeaving(true);
		setTimeout(() => {
			setOpen(false);
			setLeaving(false);
		}, 200);
	};
	useEffect(() => {
		if (!open) return;
		const key = (e) => {
			if (e.key === "Escape" && !e.defaultPrevented && !document.querySelector("dialog[open], .menu-open, .language-list")) close();
		};
		document.addEventListener("keydown", key);
		return () => document.removeEventListener("keydown", key);
	}, [open]);
	return /* @__PURE__ */ jsx$1("div", {
		className: "welcome-live",
		role: "status",
		"aria-live": "polite",
		children: open && !blocked && /* @__PURE__ */ jsxs$1("aside", {
			ref: card,
			className: `welcome${leaving ? " is-leaving" : ""}`,
			"aria-labelledby": "welcome-title",
			children: [
				/* @__PURE__ */ jsx$1("button", {
					type: "button",
					className: "welcome-close",
					onClick: close,
					"aria-label": "Cerrar mensaje de bienvenida",
					children: /* @__PURE__ */ jsx$1("span", {
						"aria-hidden": "true",
						children: "×"
					})
				}),
				/* @__PURE__ */ jsx$1("span", {
					className: "welcome-icon",
					children: /* @__PURE__ */ jsx$1(Sun, {})
				}),
				/* @__PURE__ */ jsxs$1("div", {
					className: "welcome-body",
					children: [
						/* @__PURE__ */ jsx$1("h2", {
							id: "welcome-title",
							children: "No dejes para mañana lo que puedes disfrutar hoy"
						}),
						/* @__PURE__ */ jsx$1("p", { children: "Elige un destino y cotiza por WhatsApp en un minuto." }),
						/* @__PURE__ */ jsx$1(Link, {
							className: "welcome-cta",
							to: "/experiencias",
							onClick: () => setOpen(false),
							children: "Ver destinos"
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/WhatsAppFab.jsx
function WhatsAppFab() {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		const check = () => {
			const value = document.querySelector(".menu-open, dialog[open]") ? "true" : "false";
			if (el.dataset.hidden !== value) el.dataset.hidden = value;
		};
		const mo = new MutationObserver(check);
		mo.observe(document.body, {
			subtree: true,
			attributes: true,
			attributeFilter: ["class", "open"]
		});
		check();
		return () => {
			mo.disconnect();
		};
	}, []);
	return /* @__PURE__ */ jsxs$1("a", {
		ref,
		className: "wa-fab",
		"data-hidden": "false",
		href: whatsapp(),
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Escribir por WhatsApp",
		children: [/* @__PURE__ */ jsx$1(SocialIcon, {
			id: "whatsapp",
			size: 32
		}), /* @__PURE__ */ jsx$1("span", {
			className: "wa-label",
			"aria-hidden": "true",
			children: language() === "pt-BR" ? "Vamos conversar?" : language() === "en" ? "Shall we talk?" : "¿Hablamos?"
		})]
	});
}
//#endregion
//#region src/Logo.jsx
var LOGO_SRCSET = "/media/marca/logo/logo-40.webp 40w, /media/marca/logo/logo-44.webp 44w, /media/marca/logo/logo-56.webp 56w, /media/marca/logo/logo-80.webp 80w, /media/marca/logo/logo-88.webp 88w, /media/marca/logo/logo-112.webp 112w, /media/marca/logo/logo-120.webp 120w, /media/marca/logo/logo-132.webp 132w, /media/marca/logo/logo-168.webp 168w, /media/marca/logo/logo-224.webp 224w, /media/marca/logo/logo-240.webp 240w, /media/marca/logo/logo-336.webp 336w, /media/marca/logo/logo-360.webp 360w, /media/marca/logo/logo-400.webp 400w";
function Logo({ size, sizes, className = "", lazy = false }) {
	return /* @__PURE__ */ jsx$1("img", {
		className: `logo-mark ${className}`,
		fetchPriority: lazy ? void 0 : "low",
		loading: lazy ? "lazy" : void 0,
		src: "/media/marca/logo/logo-400.webp",
		srcSet: LOGO_SRCSET,
		sizes,
		width: size,
		height: size,
		alt: "Transporte y Turismo Medellín",
		decoding: "async"
	});
}
//#endregion
//#region src/Website.jsx
function lazyRoute(loader) {
	let Loaded = null, promise = null;
	const preload = () => promise || (promise = loader().then((component) => {
		Loaded = component;
		return component;
	}));
	const Lazy = lazy(() => preload().then((component) => ({ default: component })));
	function Route() {
		return useRef(Loaded !== null).current ? /* @__PURE__ */ jsx$1(Loaded, {}) : /* @__PURE__ */ jsx$1(Lazy, {});
	}
	Route.preload = preload;
	return Route;
}
var pick = (loader, name) => () => loader().then((m) => m[name]);
var company_ = () => import("./assets/Company-BQqe_tyO.js");
var R = {
	home: lazyRoute(() => import("./assets/Home-kBousz5S.js").then((m) => m.default)),
	catalog: lazyRoute(() => import("./assets/Catalog-DjCLVYLA.js").then((m) => m.default)),
	tour: lazyRoute(() => import("./assets/Tour-B83M0GQP.js").then((m) => m.default)),
	fleet: lazyRoute(() => import("./assets/Fleet-DBPQgyYz.js").then((m) => m.default)),
	blog: lazyRoute(pick(() => import("./assets/Blog-81mSLSOU.js"), "Blog")),
	article: lazyRoute(() => import("./assets/Blog-81mSLSOU.js").then((m) => m.default)),
	about: lazyRoute(pick(company_, "About")),
	services: lazyRoute(pick(company_, "Services")),
	contact: lazyRoute(pick(company_, "Contact")),
	quote: lazyRoute(pick(company_, "QuotePage")),
	privacy: lazyRoute(pick(company_, "Privacy")),
	ratings: lazyRoute(pick(company_, "Ratings")),
	dataPolicy: lazyRoute(() => import("./assets/DataPolicy-CFr0aenm.js").then((m) => m.default)),
	notFound: lazyRoute(() => import("./assets/NotFound-Uo5CGhb_.js").then((m) => m.default))
};
R.home, R.catalog, R.tour, R.fleet, R.blog, R.article, R.about, R.services, R.contact, R.quote, R.privacy, R.dataPolicy, R.ratings;
var preloadAllRoutes = () => Promise.all(Object.values(R).map((route) => route.preload()));
var nav = [
	["Inicio", "/"],
	["Experiencias", "/experiencias"],
	["Servicios", "/servicios"],
	["Vehículos", "/vehiculos"],
	["Nosotros", "/nosotros"],
	["Blog", "/blog"],
	["Contacto", "/contacto"]
];
function PageEffects() {
	const { pathname } = useLocation();
	useEffect(() => {
		if (/^\/(experiencias|blog)\/[^/]+\/?$/.test(pathname)) return;
		const page = staticMeta[pathname.replace(/\/+$/, "") || "/"] || NOT_FOUND;
		applyMeta(page[0], page[1]);
	}, [pathname]);
	return null;
}
function Header() {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const toggle = useRef(null);
	useEffect(() => setOpen(false), [location]);
	useEffect(() => {
		const key = (e) => {
			if (e.key === "Escape" && open) {
				setOpen(false);
				toggle.current?.focus();
			}
		};
		window.addEventListener("keydown", key);
		return () => window.removeEventListener("keydown", key);
	}, [open]);
	const path = unprefix(location.pathname);
	return /* @__PURE__ */ jsxs$1("header", {
		className: `site-header${path === "/" || path === "/experiencias" || /^\/experiencias\/[^/]+\/?$/.test(path) ? " is-home" : ""}${open ? " menu-open" : ""}`,
		children: [
			/* @__PURE__ */ jsx$1(Link, {
				to: "/",
				className: "brand",
				"aria-label": "Transporte y Turismo Medellín, inicio",
				children: /* @__PURE__ */ jsx$1(Logo, {
					size: 56,
					sizes: "(max-width: 899px) 44px, 56px"
				})
			}),
			/* @__PURE__ */ jsx$1(Preferences, {}),
			/* @__PURE__ */ jsx$1("a", {
				className: "menu-nojs",
				href: "#pie",
				children: "Menú"
			}),
			/* @__PURE__ */ jsxs$1("button", {
				ref: toggle,
				className: "menu-toggle",
				onClick: () => setOpen(!open),
				"aria-expanded": open,
				"aria-controls": "navigation",
				children: [
					open ? "Cerrar" : "Menú",
					" ",
					/* @__PURE__ */ jsx$1("span", {
						"aria-hidden": "true",
						children: open ? "−" : "+"
					})
				]
			}),
			/* @__PURE__ */ jsxs$1("nav", {
				id: "navigation",
				className: open ? "open" : "",
				"aria-label": "Principal",
				children: [
					nav.map(([label, url]) => /* @__PURE__ */ jsx$1(NavLink, {
						to: url,
						end: url === "/",
						children: label
					}, url)),
					/* @__PURE__ */ jsx$1(Socials, { className: "header-socials" }),
					/* @__PURE__ */ jsxs$1(Link, {
						to: "/cotizar",
						className: "nav-cta",
						children: ["Planeemos tu viaje ", /* @__PURE__ */ jsx$1(Arrow, {})]
					})
				]
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs$1("div", {
		className: "pie-wrap",
		children: [/* @__PURE__ */ jsx$1(Skyline, {}), /* @__PURE__ */ jsxs$1("footer", {
			className: "site-footer tone-dark",
			id: "pie",
			children: [
				/* @__PURE__ */ jsxs$1("div", {
					className: "pie-top",
					children: [/* @__PURE__ */ jsxs$1("p", { children: [
						"Tu próximo viaje",
						/* @__PURE__ */ jsx$1("br", {}),
						"empieza ",
						/* @__PURE__ */ jsx$1("em", { children: "aquí" })
					] }), /* @__PURE__ */ jsx$1(Button, {
						to: "/experiencias",
						children: "Encuentra tu experiencia"
					})]
				}),
				/* @__PURE__ */ jsxs$1("div", {
					className: "pie-grid",
					children: [
						/* @__PURE__ */ jsxs$1("div", {
							className: "pie-brand",
							children: [
								/* @__PURE__ */ jsx$1(Link, {
									className: "footer-brand",
									to: "/",
									"aria-label": "Transporte y Turismo Medellín, inicio",
									children: /* @__PURE__ */ jsx$1(Logo, {
										size: 120,
										sizes: "120px",
										className: "logo-footer",
										lazy: true
									})
								}),
								/* @__PURE__ */ jsx$1("p", {
									className: "pie-line",
									children: "Experiencias a otro nivel"
								}),
								/* @__PURE__ */ jsxs$1("p", { children: [
									"Nos mueve nuestra tierra.",
									/* @__PURE__ */ jsx$1("br", {}),
									"Nos importan las personas"
								] })
							]
						}),
						/* @__PURE__ */ jsxs$1("nav", {
							"aria-label": "Enlaces rápidos",
							children: [/* @__PURE__ */ jsx$1("h2", {
								className: "pie-h",
								children: "Enlaces rápidos"
							}), /* @__PURE__ */ jsx$1("ul", {
								role: "list",
								children: [
									["Inicio", "/"],
									["Experiencias", "/experiencias"],
									["Vehículos", "/vehiculos"],
									["Nosotros", "/nosotros"],
									["Contacto", "/contacto"]
								].map(([label, url]) => /* @__PURE__ */ jsx$1("li", { children: /* @__PURE__ */ jsx$1(Link, {
									to: url,
									children: label
								}) }, url))
							})]
						}),
						/* @__PURE__ */ jsxs$1("div", { children: [/* @__PURE__ */ jsx$1("h2", {
							className: "pie-h",
							children: "Contacto directo"
						}), /* @__PURE__ */ jsxs$1("ul", {
							role: "list",
							className: "pie-contact",
							children: [
								/* @__PURE__ */ jsxs$1("li", { children: [/* @__PURE__ */ jsx$1("span", {
									className: "pie-ico",
									children: /* @__PURE__ */ jsx$1(Icon, {
										name: "mapPin",
										size: 18
									})
								}), /* @__PURE__ */ jsx$1("span", { children: company.address })] }),
								/* @__PURE__ */ jsxs$1("li", { children: [/* @__PURE__ */ jsx$1("span", {
									className: "pie-ico",
									children: /* @__PURE__ */ jsx$1(Icon, {
										name: "phone",
										size: 18
									})
								}), /* @__PURE__ */ jsx$1("a", {
									href: `tel:${company.phone.replaceAll(" ", "")}`,
									children: company.phone
								})] }),
								/* @__PURE__ */ jsxs$1("li", { children: [/* @__PURE__ */ jsx$1("span", {
									className: "pie-ico",
									children: /* @__PURE__ */ jsx$1(Icon, {
										name: "mail",
										size: 18
									})
								}), /* @__PURE__ */ jsx$1("a", {
									href: `mailto:${company.email}`,
									children: company.email
								})] })
							]
						})] }),
						/* @__PURE__ */ jsxs$1("div", { children: [/* @__PURE__ */ jsx$1("h2", {
							className: "pie-h",
							children: "Síguenos"
						}), /* @__PURE__ */ jsx$1("ul", {
							role: "list",
							className: "pie-social",
							children: [[
								"instagram",
								"Instagram",
								company.instagram,
								"@transporteenmedellin"
							], [
								"tiktok",
								"TikTok",
								company.tiktok,
								"@tytmedellin"
							]].map(([id, name, url, handle]) => /* @__PURE__ */ jsx$1("li", { children: /* @__PURE__ */ jsxs$1("a", {
								href: url,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": `Síguenos en ${name} (se abre en una pestaña nueva)`,
								children: [/* @__PURE__ */ jsx$1("span", {
									className: "pie-circle",
									children: /* @__PURE__ */ jsx$1(SocialIcon, {
										id,
										size: 20
									})
								}), /* @__PURE__ */ jsx$1("span", { children: handle })]
							}) }, id))
						})] })
					]
				}),
				/* @__PURE__ */ jsxs$1("div", {
					className: "pie-legal",
					children: [/* @__PURE__ */ jsx$1("p", { children: "Transporte y Turismo Medellín rechaza la explotación y el abuso sexual de niños, niñas y adolescentes. Denuncia: Línea 141 ICBF y Línea 123. Ley 679 de 2001 y Ley 1336 de 2009." }), /* @__PURE__ */ jsxs$1("p", { children: [
						"PQRS: ",
						/* @__PURE__ */ jsx$1("a", {
							href: `mailto:${company.email}`,
							children: company.email
						}),
						" · ",
						/* @__PURE__ */ jsx$1("a", {
							href: "https://www.sic.gov.co",
							target: "_blank",
							rel: "noopener noreferrer",
							children: "Superintendencia de Industria y Comercio (sic.gov.co)"
						})
					] })]
				}),
				/* @__PURE__ */ jsxs$1("div", {
					className: "pie-bottom",
					children: [
						/* @__PURE__ */ jsx$1("span", { children: "RNT 176384" }),
						/* @__PURE__ */ jsx$1("span", { children: "NIT 901738550-6" }),
						/* @__PURE__ */ jsx$1("span", { children: "© 2026 Transporte y Turismo Medellín" }),
						/* @__PURE__ */ jsx$1(Link, {
							to: "/privacidad",
							children: "Privacidad"
						}),
						/* @__PURE__ */ jsx$1(Link, {
							to: "/politica-de-tratamiento-de-datos",
							children: "Tratamiento de datos"
						}),
						/* @__PURE__ */ jsx$1(Link, {
							to: "/calificaciones",
							children: "Calificaciones"
						}),
						/* @__PURE__ */ jsx$1(ConsentLink, {})
					]
				})
			]
		})]
	});
}
function Layout() {
	const { pathname } = useLocation();
	useTextMotion(pathname);
	useEffect(() => {
		notifyRouteReady();
	}, [pathname]);
	return /* @__PURE__ */ jsxs$1(Fragment, { children: [
		/* @__PURE__ */ jsx$1("a", {
			className: "skip-link",
			href: "#contenido",
			children: "Saltar al contenido"
		}),
		/* @__PURE__ */ jsx$1(PageEffects, {}),
		/* @__PURE__ */ jsx$1(Header, {}),
		/* @__PURE__ */ jsx$1("main", {
			id: "contenido",
			tabIndex: -1,
			children: /* @__PURE__ */ jsxs$1(Suspense, {
				fallback: null,
				children: [/* @__PURE__ */ jsxs$1(Routes, { children: [
					/* @__PURE__ */ jsx$1(Route, {
						path: "/",
						element: /* @__PURE__ */ jsx$1(R.home, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/site",
						element: /* @__PURE__ */ jsx$1(Navigate, {
							to: "/",
							replace: true
						})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/experiencias",
						element: /* @__PURE__ */ jsx$1(R.catalog, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/experiencias/:slug",
						element: /* @__PURE__ */ jsx$1(R.tour, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/servicios",
						element: /* @__PURE__ */ jsx$1(R.services, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/vehiculos",
						element: /* @__PURE__ */ jsx$1(R.fleet, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/flota",
						element: /* @__PURE__ */ jsx$1(Navigate, {
							to: "/vehiculos",
							replace: true
						})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/nosotros",
						element: /* @__PURE__ */ jsx$1(R.about, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/blog",
						element: /* @__PURE__ */ jsx$1(R.blog, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/blog/:slug",
						element: /* @__PURE__ */ jsx$1(R.article, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/contacto",
						element: /* @__PURE__ */ jsx$1(R.contact, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/cotizar",
						element: /* @__PURE__ */ jsx$1(R.quote, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/calificaciones",
						element: /* @__PURE__ */ jsx$1(R.ratings, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/privacidad",
						element: /* @__PURE__ */ jsx$1(R.privacy, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "/politica-de-tratamiento-de-datos",
						element: /* @__PURE__ */ jsx$1(R.dataPolicy, {})
					}),
					/* @__PURE__ */ jsx$1(Route, {
						path: "*",
						element: /* @__PURE__ */ jsx$1(R.notFound, {})
					})
				] }), /* @__PURE__ */ jsx$1(RouteScroll, {})]
			})
		}, pathname),
		/* @__PURE__ */ jsx$1(Allies, {}),
		/* @__PURE__ */ jsx$1(Footer, {}),
		/* @__PURE__ */ jsx$1(WhatsAppFab, {}),
		/* @__PURE__ */ jsx$1(Consent, {}),
		/* @__PURE__ */ jsx$1(Welcome, {})
	] });
}
function Website() {
	return /* @__PURE__ */ jsx$1(Layout, {});
}
var media_default = {
	"city-tour-comuna-13": [
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3163-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3163-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3163-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3163-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/img-3163-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/img-3163-1600.webp 1600w",
			"width": 1600,
			"height": 1200,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3163-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-2275-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-2275-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-2275-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-2275-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-2275-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-2275-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-2383-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-2383-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-2383-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-2383-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-2383-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-2383-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-2776-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-2776-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-2776-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-2776-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-2776-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-2776-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3231-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3231-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3231-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3231-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3231-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3231-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3322-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3322-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3322-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3322-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3322-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3322-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3366-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3366-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3366-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3366-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3366-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3366-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3402-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3402-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3402-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3402-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3402-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3402-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3478-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3478-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3478-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3478-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3478-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3478-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-3707-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-3707-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-3707-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-3707-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-3707-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-3707-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-5077-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-5077-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-5077-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-5077-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-5077-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-5077-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-5178-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-5178-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-5178-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-5178-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-5178-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-5178-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-5193-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-5193-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-5193-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-5193-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-5193-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-5193-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-7392-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-7392-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-7392-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-7392-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-7392-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-7392-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-7461-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-7461-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-7461-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-7461-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-7461-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-7461-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-8609-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-8609-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-8609-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-8609-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-8609-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-8609-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/img-8981-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/img-8981-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/img-8981-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/img-8981-1600.webp 800w, /media/oficial/orig/city-tour-comuna-13/img-8981-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/img-8981-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/comuna13-parce-medellin-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/comuna13-parce-medellin-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/comuna13-parce-medellin-grupo-1600.webp 400w, /media/oficial/w800/_sede/comuna13-parce-medellin-grupo-1600.webp 800w, /media/oficial/w1200/_sede/comuna13-parce-medellin-grupo-1600.webp 1200w, /media/oficial/orig/_sede/comuna13-parce-medellin-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 900,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/comuna13-parce-medellin-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/mural-grupo-551.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/mural-grupo-551.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/mural-grupo-551.webp 400w, /media/oficial/orig/city-tour-comuna-13/mural-grupo-551.webp 551w",
			"width": 551,
			"height": 310,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/mural-grupo-551.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/citytour-medellin-letras-plaza-botero-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/citytour-metrocable-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp",
			"small": "/media/oficial/w400/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp",
			"srcset": "/media/oficial/w400/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp 400w, /media/oficial/w800/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp 800w, /media/oficial/w1200/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp 1200w, /media/oficial/orig/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"guatape-piedra-del-penol": [
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9328-card-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9328-card-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9328-card-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9328-card-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9328-card-1600.webp 1200w",
			"width": 1200,
			"height": 720,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9328-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9345-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9345-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9345-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9345-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9345-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9345-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4197-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4197-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4197-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4197-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4197-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4197-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9312-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9312-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9312-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9312-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9312-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9312-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp 1600w",
			"width": 1600,
			"height": 2844,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-zocalos-balcones-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp 1600w",
			"width": 1600,
			"height": 2844,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-embalse-mirador-pareja-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-paseo-lancha-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-aqua-xtreme-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-alto-del-chocho-banderas-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-granja-alpacas-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp 1600w",
			"width": 1600,
			"height": 1400,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-granja-alpacas-mini-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp 800w, /media/oficial/w1200/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp 1200w, /media/oficial/orig/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/guatape-piedra-mirador-poncho-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9386-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9386-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9386-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9386-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9386-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9386-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9137-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9137-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9137-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9137-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9137-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9137-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9191-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9191-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9191-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9191-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9191-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9191-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4177-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4177-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4177-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4177-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4177-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4177-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4206-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4206-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4206-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4206-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4206-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4206-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4454-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4454-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4454-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4454-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4454-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4454-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-4491-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-4491-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-4491-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-4491-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-4491-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-4491-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/guatape-piedra-del-penol/img-9018-1600.webp",
			"small": "/media/oficial/w400/guatape-piedra-del-penol/img-9018-1600.webp",
			"srcset": "/media/oficial/w400/guatape-piedra-del-penol/img-9018-1600.webp 400w, /media/oficial/w800/guatape-piedra-del-penol/img-9018-1600.webp 800w, /media/oficial/orig/guatape-piedra-del-penol/img-9018-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/guatape-piedra-del-penol/img-9018-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"tour-nocturno-medellin": [
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-bandera-mirador-card-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-card-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-card-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-bandera-mirador-card-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-bandera-mirador-card-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-bandera-mirador-card-1600.webp 1600w",
			"width": 1600,
			"height": 960,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-bandera-mirador-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1695-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1695-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1695-1600.webp 400w, /media/oficial/w800/_sede/img-1695-1600.webp 800w, /media/oficial/orig/_sede/img-1695-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1695-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1881-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1881-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1881-1600.webp 400w, /media/oficial/w800/_sede/img-1881-1600.webp 800w, /media/oficial/orig/_sede/img-1881-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1881-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-pareja-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-pareja-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-pareja-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-pareja-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-pareja-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-pareja-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-pareja-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1908-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1908-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1908-1600.webp 400w, /media/oficial/w800/_sede/img-1908-1600.webp 800w, /media/oficial/orig/_sede/img-1908-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1908-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-bandera-mirador-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-bandera-mirador-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-bandera-mirador-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-bandera-mirador-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-bandera-mirador-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-payaso-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-payaso-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-payaso-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-payaso-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-payaso-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-payaso-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-payaso-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1905-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1905-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1905-1600.webp 400w, /media/oficial/w800/_sede/img-1905-1600.webp 800w, /media/oficial/orig/_sede/img-1905-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1905-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-grupo-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-grupo-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-grupo-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-ruanas-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-ruanas-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-ruanas-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-ruanas-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-ruanas-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-ruanas-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-ruanas-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-la70-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-la70-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-la70-grupo-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-la70-grupo-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-la70-grupo-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-la70-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-la70-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-restaurante-tematico-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-restaurante-tematico-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-restaurante-tematico-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-restaurante-tematico-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-restaurante-tematico-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-restaurante-tematico-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-restaurante-tematico-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-restaurante-folclorico-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-restaurante-folclorico-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-restaurante-folclorico-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-restaurante-folclorico-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-restaurante-folclorico-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-restaurante-folclorico-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-restaurante-folclorico-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"vuelta-a-oriente": [
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-2686-card-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-2686-card-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-2686-card-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-2686-card-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-2686-card-1600.webp 1200w",
			"width": 1200,
			"height": 720,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-2686-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-2686-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-2686-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-2686-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-2686-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-2686-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-2686-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0774-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0774-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0774-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0774-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0774-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0774-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0768-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0768-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0768-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0768-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0768-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0768-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-2698-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-2698-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-2698-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-2698-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-2698-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-2698-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0801-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0801-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0801-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0801-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0801-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0801-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0815-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0815-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0815-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0815-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0815-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0815-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-0858-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-0858-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-0858-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-0858-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-0858-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-0858-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/img-2617-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/img-2617-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/img-2617-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/img-2617-1600.webp 800w, /media/oficial/orig/vuelta-a-oriente/img-2617-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/img-2617-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp 800w, /media/oficial/w1200/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp 1200w, /media/oficial/orig/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/oriente-la-ceja-letras-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/oriente-postres-marinilla-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/oriente-postres-marinilla-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/oriente-postres-marinilla-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/oriente-postres-marinilla-1600.webp 800w, /media/oficial/w1200/vuelta-a-oriente/oriente-postres-marinilla-1600.webp 1200w, /media/oficial/orig/vuelta-a-oriente/oriente-postres-marinilla-1600.webp 1600w",
			"width": 1600,
			"height": 1442,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/oriente-postres-marinilla-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp",
			"small": "/media/oficial/w400/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp",
			"srcset": "/media/oficial/w400/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp 400w, /media/oficial/w800/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp 800w, /media/oficial/w1200/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp 1200w, /media/oficial/orig/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/vuelta-a-oriente/oriente-postres-san-antonio-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"tour-del-cafe-medellin": [
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-2466-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-2466-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-2466-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-2466-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-2466-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-2466-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-0657-1600.webp",
			"small": "/media/oficial/w400/_sede/img-0657-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-0657-1600.webp 400w, /media/oficial/w800/_sede/img-0657-1600.webp 800w, /media/oficial/orig/_sede/img-0657-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-0657-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0731-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0731-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0731-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0731-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0731-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0731-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0626-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0626-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0626-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0626-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0626-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0626-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0759-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0759-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0759-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0759-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0759-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0759-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0775-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0775-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0775-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0775-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0775-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0775-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-0785-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-0785-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-0785-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-0785-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-0785-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-0785-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-del-cafe-medellin/img-2509-1600.webp",
			"small": "/media/oficial/w400/tour-del-cafe-medellin/img-2509-1600.webp",
			"srcset": "/media/oficial/w400/tour-del-cafe-medellin/img-2509-1600.webp 400w, /media/oficial/w800/tour-del-cafe-medellin/img-2509-1600.webp 800w, /media/oficial/orig/tour-del-cafe-medellin/img-2509-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-del-cafe-medellin/img-2509-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"hacienda-napoles": [
		{
			"src": "/media/oficial/orig/hacienda-napoles/hacienda-napoles-480.webp",
			"small": "/media/oficial/w400/hacienda-napoles/hacienda-napoles-480.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/hacienda-napoles-480.webp 400w, /media/oficial/orig/hacienda-napoles/hacienda-napoles-480.webp 480w",
			"width": 480,
			"height": 640,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/hacienda-napoles-480.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1747-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1747-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1747-1600.webp 400w, /media/oficial/w800/_sede/img-1747-1600.webp 800w, /media/oficial/orig/_sede/img-1747-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1747-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-1754-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-1754-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-1754-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-1754-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-1754-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-1754-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5205-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5205-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5205-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5205-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5205-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5205-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5231-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5231-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5231-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5231-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5231-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5231-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5290-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5290-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5290-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5290-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5290-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5290-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5304-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5304-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5304-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5304-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5304-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5304-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-1811-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-1811-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-1811-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-1811-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-1811-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-1811-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-1828-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-1828-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-1828-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-1828-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-1828-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-1828-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-1832-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-1832-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-1832-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-1832-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-1832-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-1832-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/hacienda-napoles/img-5346-1600.webp",
			"small": "/media/oficial/w400/hacienda-napoles/img-5346-1600.webp",
			"srcset": "/media/oficial/w400/hacienda-napoles/img-5346-1600.webp 400w, /media/oficial/w800/hacienda-napoles/img-5346-1600.webp 800w, /media/oficial/orig/hacienda-napoles/img-5346-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/hacienda-napoles/img-5346-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"salto-del-buey": [
		{
			"src": "/media/oficial/orig/_sede/img-7241-1600.webp",
			"small": "/media/oficial/w400/_sede/img-7241-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-7241-1600.webp 400w, /media/oficial/w800/_sede/img-7241-1600.webp 800w, /media/oficial/orig/_sede/img-7241-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-7241-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-2114-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-2114-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-2114-1600.webp 400w, /media/oficial/orig/salto-del-buey/img-2114-1600.webp 627w",
			"width": 627,
			"height": 836,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-2114-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-2161-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-2161-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-2161-1600.webp 400w, /media/oficial/orig/salto-del-buey/img-2161-1600.webp 627w",
			"width": 627,
			"height": 836,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-2161-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7125-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7125-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7125-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7125-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7125-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7125-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7157-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7157-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7157-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7157-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7157-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7157-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7170-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7170-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7170-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7170-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7170-1600.webp 900w",
			"width": 900,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7170-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7225-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7225-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7225-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7225-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7225-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7225-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/img-7271-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/img-7271-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/img-7271-1600.webp 400w, /media/oficial/w800/salto-del-buey/img-7271-1600.webp 800w, /media/oficial/orig/salto-del-buey/img-7271-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/img-7271-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/salto-del-buey-cascada-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/salto-del-buey-cascada-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/salto-del-buey-cascada-1600.webp 400w, /media/oficial/w800/salto-del-buey/salto-del-buey-cascada-1600.webp 800w, /media/oficial/w1200/salto-del-buey/salto-del-buey-cascada-1600.webp 1200w, /media/oficial/orig/salto-del-buey/salto-del-buey-cascada-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/salto-del-buey-cascada-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp 400w, /media/oficial/w800/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp 800w, /media/oficial/w1200/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp 1200w, /media/oficial/orig/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/salto-del-buey-cascada-hombre-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/salto-del-buey-zipline-familia-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/salto-del-buey-zipline-familia-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/salto-del-buey-zipline-familia-1600.webp 400w, /media/oficial/w800/salto-del-buey/salto-del-buey-zipline-familia-1600.webp 800w, /media/oficial/w1200/salto-del-buey/salto-del-buey-zipline-familia-1600.webp 1200w, /media/oficial/orig/salto-del-buey/salto-del-buey-zipline-familia-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/salto-del-buey-zipline-familia-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/salto-del-buey/salto-del-buey-sendero-familia-1600.webp",
			"small": "/media/oficial/w400/salto-del-buey/salto-del-buey-sendero-familia-1600.webp",
			"srcset": "/media/oficial/w400/salto-del-buey/salto-del-buey-sendero-familia-1600.webp 400w, /media/oficial/w800/salto-del-buey/salto-del-buey-sendero-familia-1600.webp 800w, /media/oficial/w1200/salto-del-buey/salto-del-buey-sendero-familia-1600.webp 1200w, /media/oficial/orig/salto-del-buey/salto-del-buey-sendero-familia-1600.webp 1600w",
			"width": 1600,
			"height": 2844,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/salto-del-buey/salto-del-buey-sendero-familia-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"santa-fe-de-antioquia": [
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-puente-occidente.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-puente-occidente.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-puente-occidente.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/santa-fe-puente-occidente.webp 800w, /media/oficial/w1200/santa-fe-de-antioquia/santa-fe-puente-occidente.webp 1200w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-puente-occidente.webp 1920w",
			"width": 1920,
			"height": 1137,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-puente-occidente.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-3634-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-3634-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-3634-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-3634-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-3634-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-3634-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-3596-1600.webp",
			"small": "/media/oficial/w400/_sede/img-3596-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-3596-1600.webp 400w, /media/oficial/w800/_sede/img-3596-1600.webp 800w, /media/oficial/orig/_sede/img-3596-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-3596-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-3589-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-3589-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-3589-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-3589-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-3589-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-3589-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-3604-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-3604-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-3604-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-3604-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-3604-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-3604-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-3637-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-3637-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-3637-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-3637-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-3637-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-3637-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-5974-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-5974-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-5974-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-5974-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-5974-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-5974-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/img-5981-1600.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/img-5981-1600.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/img-5981-1600.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/img-5981-1600.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/img-5981-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/img-5981-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp 400w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp 720w",
			"width": 720,
			"height": 540,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-catedral-plaza.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp 800w, /media/oficial/w1200/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp 1200w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp 1920w",
			"width": 1920,
			"height": 1284,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-centro-historico-noche.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-puente-interior.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-puente-interior.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-puente-interior.webp 400w, /media/oficial/w800/santa-fe-de-antioquia/santa-fe-puente-interior.webp 800w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-puente-interior.webp 945w",
			"width": 945,
			"height": 1680,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-puente-interior.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-calle-colonial.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-calle-colonial.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-calle-colonial.webp 400w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-calle-colonial.webp 600w",
			"width": 600,
			"height": 600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-calle-colonial.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp 400w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp 600w",
			"width": 600,
			"height": 600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-balcon-colonial.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp",
			"small": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp",
			"srcset": "/media/oficial/w400/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp 400w, /media/oficial/orig/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp 600w",
			"width": 600,
			"height": 600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"tour-de-compras": [
		{
			"src": "/media/oficial/orig/_sede/tour-de-compras-1120.webp",
			"small": "/media/oficial/w400/_sede/tour-de-compras-1120.webp",
			"srcset": "/media/oficial/w400/_sede/tour-de-compras-1120.webp 400w, /media/oficial/w800/_sede/tour-de-compras-1120.webp 800w, /media/oficial/orig/_sede/tour-de-compras-1120.webp 1120w",
			"width": 1120,
			"height": 840,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/tour-de-compras-1120.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-de-compras/img-2686-1600.webp",
			"small": "/media/oficial/w400/tour-de-compras/img-2686-1600.webp",
			"srcset": "/media/oficial/w400/tour-de-compras/img-2686-1600.webp 400w, /media/oficial/w800/tour-de-compras/img-2686-1600.webp 800w, /media/oficial/orig/tour-de-compras/img-2686-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-de-compras/img-2686-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/tour-de-compras/img-3181-1600.webp",
			"small": "/media/oficial/w400/tour-de-compras/img-3181-1600.webp",
			"srcset": "/media/oficial/w400/tour-de-compras/img-3181-1600.webp 400w, /media/oficial/w800/tour-de-compras/img-3181-1600.webp 800w, /media/oficial/orig/tour-de-compras/img-3181-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-de-compras/img-3181-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"traslados-aeropuerto-jmc": [
		{
			"src": "/media/oficial/orig/traslados-aeropuerto-jmc/img-9035-card-1600.webp",
			"small": "/media/oficial/w400/traslados-aeropuerto-jmc/img-9035-card-1600.webp",
			"srcset": "/media/oficial/w400/traslados-aeropuerto-jmc/img-9035-card-1600.webp 400w, /media/oficial/w800/traslados-aeropuerto-jmc/img-9035-card-1600.webp 800w, /media/oficial/orig/traslados-aeropuerto-jmc/img-9035-card-1600.webp 1200w",
			"width": 1200,
			"height": 720,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/traslados-aeropuerto-jmc/img-9035-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp",
			"small": "/media/oficial/w400/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp",
			"srcset": "/media/oficial/w400/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp 400w, /media/oficial/w800/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp 800w, /media/oficial/orig/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp 899w",
			"width": 899,
			"height": 1599,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/traslados-aeropuerto-jmc/img-3444-1600.webp",
			"small": "/media/oficial/w400/traslados-aeropuerto-jmc/img-3444-1600.webp",
			"srcset": "/media/oficial/w400/traslados-aeropuerto-jmc/img-3444-1600.webp 400w, /media/oficial/w800/traslados-aeropuerto-jmc/img-3444-1600.webp 800w, /media/oficial/orig/traslados-aeropuerto-jmc/img-3444-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/traslados-aeropuerto-jmc/img-3444-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	equipo: [
		{
			"src": "/media/equipo/1.webp",
			"small": "/media/equipo/1-small.webp",
			"width": 900,
			"height": 1600,
			"source": "IMAGENES: 78150182-2FD5-4570-B03C-9D96F491BC8B.jpg"
		},
		{
			"src": "/media/equipo/2.webp",
			"small": "/media/equipo/2-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_0023.jpg"
		},
		{
			"src": "/media/equipo/3.webp",
			"small": "/media/equipo/3-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_0373.jpg"
		},
		{
			"src": "/media/equipo/4.webp",
			"small": "/media/equipo/4-small.webp",
			"width": 1024,
			"height": 768,
			"source": "IMAGENES: IMG_EQUIPO.jpg"
		}
	],
	historia: [
		{
			"src": "/media/historia/1.webp",
			"small": "/media/historia/1-small.webp",
			"width": 1080,
			"height": 1343,
			"source": "IMAGENES: 102013_Original.JPG"
		},
		{
			"src": "/media/historia/2.webp",
			"small": "/media/historia/2-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_0873-EFFECTS_Original.JPG"
		},
		{
			"src": "/media/historia/3.webp",
			"small": "/media/historia/3-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_20210614_200857_Original.JPG"
		},
		{
			"src": "/media/historia/4.webp",
			"small": "/media/historia/4-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_20221127_150741_Original.JPG"
		},
		{
			"src": "/media/historia/5.webp",
			"small": "/media/historia/5-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_3148_Original.HEIC"
		},
		{
			"src": "/media/historia/6.webp",
			"small": "/media/historia/6-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_5612_Original.HEIC"
		},
		{
			"src": "/media/historia/7.webp",
			"small": "/media/historia/7-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_7070_Original.HEIC"
		},
		{
			"src": "/media/historia/8.webp",
			"small": "/media/historia/8-small.webp",
			"width": 1200,
			"height": 1600,
			"source": "IMAGENES: IMG_9541_Original.HEIC"
		}
	],
	"jardin-antioquia": [
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-panoramica.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-panoramica.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-panoramica.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-panoramica.webp 800w, /media/oficial/orig/jardin-antioquia/jardin-panoramica.webp 1055w",
			"width": 1055,
			"height": 523,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-panoramica.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-basilica.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-basilica.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-basilica.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-basilica.webp 800w, /media/oficial/w1200/jardin-antioquia/jardin-basilica.webp 1200w, /media/oficial/orig/jardin-antioquia/jardin-basilica.webp 1920w",
			"width": 1920,
			"height": 1440,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-basilica.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-calles.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-calles.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-calles.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-calles.webp 800w, /media/oficial/w1200/jardin-antioquia/jardin-calles.webp 1200w, /media/oficial/orig/jardin-antioquia/jardin-calles.webp 1440w",
			"width": 1440,
			"height": 1920,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-calles.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-mural-aves.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-mural-aves.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-mural-aves.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-mural-aves.webp 800w, /media/oficial/w1200/jardin-antioquia/jardin-mural-aves.webp 1200w, /media/oficial/orig/jardin-antioquia/jardin-mural-aves.webp 1920w",
			"width": 1920,
			"height": 1440,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-mural-aves.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/jardin-antioquia/jardin-cafe-origen.webp",
			"small": "/media/oficial/w400/jardin-antioquia/jardin-cafe-origen.webp",
			"srcset": "/media/oficial/w400/jardin-antioquia/jardin-cafe-origen.webp 400w, /media/oficial/w800/jardin-antioquia/jardin-cafe-origen.webp 800w, /media/oficial/w1200/jardin-antioquia/jardin-cafe-origen.webp 1200w, /media/oficial/orig/jardin-antioquia/jardin-cafe-origen.webp 1440w",
			"width": 1440,
			"height": 1920,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/jardin-antioquia/jardin-cafe-origen.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	"tour-miradores": [
		{
			"src": "/media/oficial/orig/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp",
			"small": "/media/oficial/w400/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp",
			"srcset": "/media/oficial/w400/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp 400w, /media/oficial/w800/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp 800w, /media/oficial/w1200/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp 1200w, /media/oficial/orig/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp 1600w",
			"width": 1600,
			"height": 960,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/tour-miradores/noche-medellin-mirador-ruanas-card-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-ruanas-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-ruanas-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-ruanas-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-ruanas-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-ruanas-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-ruanas-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-ruanas-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-grupo-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-grupo-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-grupo-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-payaso-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-payaso-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-payaso-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-payaso-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-payaso-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-payaso-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-payaso-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-mirador-pareja-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-mirador-pareja-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-mirador-pareja-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-mirador-pareja-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-mirador-pareja-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-mirador-pareja-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-pareja-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-bandera-mirador-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-bandera-mirador-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-bandera-mirador-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-bandera-mirador-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-bandera-mirador-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-bandera-mirador-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1881-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1881-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1881-1600.webp 400w, /media/oficial/w800/_sede/img-1881-1600.webp 800w, /media/oficial/orig/_sede/img-1881-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1881-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1905-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1905-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1905-1600.webp 400w, /media/oficial/w800/_sede/img-1905-1600.webp 800w, /media/oficial/orig/_sede/img-1905-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1905-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1908-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1908-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1908-1600.webp 400w, /media/oficial/w800/_sede/img-1908-1600.webp 800w, /media/oficial/orig/_sede/img-1908-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1908-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/img-1695-1600.webp",
			"small": "/media/oficial/w400/_sede/img-1695-1600.webp",
			"srcset": "/media/oficial/w400/_sede/img-1695-1600.webp 400w, /media/oficial/w800/_sede/img-1695-1600.webp 800w, /media/oficial/orig/_sede/img-1695-1600.webp 1200w",
			"width": 1200,
			"height": 1600,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/img-1695-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-la70-grupo-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-la70-grupo-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-la70-grupo-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-la70-grupo-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-la70-grupo-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-la70-grupo-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-la70-grupo-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-restaurante-tematico-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-restaurante-tematico-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-restaurante-tematico-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-restaurante-tematico-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-restaurante-tematico-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-restaurante-tematico-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-restaurante-tematico-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		},
		{
			"src": "/media/oficial/orig/_sede/noche-medellin-restaurante-folclorico-1600.webp",
			"small": "/media/oficial/w400/_sede/noche-medellin-restaurante-folclorico-1600.webp",
			"srcset": "/media/oficial/w400/_sede/noche-medellin-restaurante-folclorico-1600.webp 400w, /media/oficial/w800/_sede/noche-medellin-restaurante-folclorico-1600.webp 800w, /media/oficial/w1200/_sede/noche-medellin-restaurante-folclorico-1600.webp 1200w, /media/oficial/orig/_sede/noche-medellin-restaurante-folclorico-1600.webp 1600w",
			"width": 1600,
			"height": 2133,
			"source": "tnt-colombia-connect/public/img/paginas/sedes/medellin/_sede/noche-medellin-restaurante-folclorico-1600.webp (copiado sin recomprimir; escalera oficial _w/{400,800,1200} cuando existe)"
		}
	],
	vehiculos: [
		{
			"src": "/media/vehiculos/1.webp",
			"small": "/media/vehiculos/1-small.webp",
			"width": 1024,
			"height": 563,
			"source": "webp/ (aportado por el usuario)",
			"file": "sedan-ejecutivo.webp",
			"alt": "Sedán ejecutivo",
			"srcset": "/media/vehiculos/1-small.webp 640w, /media/vehiculos/1.webp 1024w"
		},
		{
			"src": "/media/vehiculos/2.webp",
			"small": "/media/vehiculos/2-small.webp",
			"width": 800,
			"height": 400,
			"source": "webp/ (aportado por el usuario)",
			"file": "suv-ejecutiva.webp",
			"alt": "SUV ejecutiva",
			"srcset": "/media/vehiculos/2-small.webp 640w, /media/vehiculos/2.webp 800w"
		},
		{
			"src": "/media/vehiculos/3.webp",
			"small": "/media/vehiculos/3-small.webp",
			"width": 900,
			"height": 519,
			"source": "webp/ (aportado por el usuario)",
			"file": "van-ejecutiva-h1.webp",
			"alt": "Van ejecutiva",
			"srcset": "/media/vehiculos/3-small.webp 640w, /media/vehiculos/3.webp 900w"
		},
		{
			"src": "/media/vehiculos/4.webp",
			"small": "/media/vehiculos/4-small.webp",
			"width": 1024,
			"height": 680,
			"source": "VANMASTER.jpg (TYTCOLOMBIA/) recortado con scripts/recortar_van_master.py; comparado con tnt-colombia-connect/public/img/paginas/vehiculos/van-master.webp (equivalente; se usa el propio por quitar la linea gris del borde inferior)",
			"alt": "Van Master",
			"srcset": "/media/vehiculos/4-small.webp 640w, /media/vehiculos/4.webp 1024w"
		},
		{
			"src": "/media/vehiculos/5.webp",
			"small": "/media/vehiculos/5-small.webp",
			"width": 533,
			"height": 374,
			"source": "webp/ (aportado por el usuario)",
			"file": "van-turistica.webp",
			"alt": "Van turística",
			"srcset": "/media/vehiculos/5-small.webp 400w, /media/vehiculos/5.webp 533w"
		},
		{
			"src": "/media/vehiculos/6.webp",
			"small": "/media/vehiculos/6-small.webp",
			"width": 1024,
			"height": 682,
			"source": "tnt-colombia-connect/public/img/paginas/vehiculos/bus.webp (sitio oficial de la marca, /vehiculos)",
			"file": "bus.webp",
			"alt": "Bus",
			"srcset": "/media/vehiculos/6-small.webp 640w, /media/vehiculos/6.webp 1024w"
		}
	],
	"logo-marca": [{
		"src": "/media/marca/logo/logo-400.webp",
		"small": "/media/marca/logo/logo-168.webp",
		"width": 400,
		"height": 400,
		"srcset": "/media/marca/logo/logo-40.webp 40w, /media/marca/logo/logo-44.webp 44w, /media/marca/logo/logo-56.webp 56w, /media/marca/logo/logo-80.webp 80w, /media/marca/logo/logo-88.webp 88w, /media/marca/logo/logo-112.webp 112w, /media/marca/logo/logo-120.webp 120w, /media/marca/logo/logo-132.webp 132w, /media/marca/logo/logo-168.webp 168w, /media/marca/logo/logo-224.webp 224w, /media/marca/logo/logo-240.webp 240w, /media/marca/logo/logo-336.webp 336w, /media/marca/logo/logo-360.webp 360w, /media/marca/logo/logo-400.webp 400w",
		"source": "IMAGENES/logo/logo-tyt-medellin-aportado.png: aportado por el usuario 2026-10-12; maestro vectorial PENDIENTE. Uso tal cual, solo reducido."
	}],
	"instagram-posts": [
		{
			"shortCode": "C6j0AcQuJNN",
			"url": "https://www.instagram.com/p/C6j0AcQuJNN/",
			"type": "reel",
			"pinned": true,
			"alt": "¿Por qué elegirnos?",
			"src": "/media/instagram/C6j0AcQuJNN-540.webp",
			"width": 540,
			"height": 540,
			"srcset": "/media/instagram/C6j0AcQuJNN-320.webp 320w, /media/instagram/C6j0AcQuJNN-540.webp 540w",
			"source": "Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 (https://www.instagram.com/p/C6j0AcQuJNN/). Recorte cuadrado centrado (foco vertical 0.4), WebP sin EXIF."
		},
		{
			"shortCode": "C6jgprQuTNw",
			"url": "https://www.instagram.com/p/C6jgprQuTNw/",
			"type": "reel",
			"pinned": true,
			"alt": "Razones para visitar Medellín",
			"src": "/media/instagram/C6jgprQuTNw-540.webp",
			"width": 540,
			"height": 540,
			"srcset": "/media/instagram/C6jgprQuTNw-320.webp 320w, /media/instagram/C6jgprQuTNw-540.webp 540w",
			"source": "Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 (https://www.instagram.com/p/C6jgprQuTNw/). Recorte cuadrado centrado (foco vertical 0.4), WebP sin EXIF."
		},
		{
			"shortCode": "C6jQepfu1bO",
			"url": "https://www.instagram.com/p/C6jQepfu1bO/",
			"type": "reel",
			"pinned": true,
			"alt": "Tours y servicios imperdibles",
			"src": "/media/instagram/C6jQepfu1bO-540.webp",
			"width": 540,
			"height": 540,
			"srcset": "/media/instagram/C6jQepfu1bO-320.webp 320w, /media/instagram/C6jQepfu1bO-540.webp 540w",
			"source": "Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 (https://www.instagram.com/p/C6jQepfu1bO/). Recorte cuadrado centrado (foco vertical 0.4), WebP sin EXIF."
		},
		{
			"shortCode": "DefYPNpp6HL",
			"url": "https://www.instagram.com/p/DefYPNpp6HL/",
			"type": "reel",
			"pinned": false,
			"alt": "Aprender y recibir en Medellín",
			"src": "/media/instagram/DefYPNpp6HL-540.webp",
			"width": 540,
			"height": 540,
			"srcset": "/media/instagram/DefYPNpp6HL-320.webp 320w, /media/instagram/DefYPNpp6HL-540.webp 540w",
			"source": "Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 (https://www.instagram.com/p/DefYPNpp6HL/). Recorte cuadrado centrado (foco vertical 0.4), WebP sin EXIF."
		},
		{
			"shortCode": "Dec1OOUibqi",
			"url": "https://www.instagram.com/p/Dec1OOUibqi/",
			"type": "carousel",
			"pinned": false,
			"alt": "Sus palabras, nuestro mejor recuerdo",
			"src": "/media/instagram/Dec1OOUibqi-640.webp",
			"width": 640,
			"height": 640,
			"srcset": "/media/instagram/Dec1OOUibqi-320.webp 320w, /media/instagram/Dec1OOUibqi-540.webp 540w, /media/instagram/Dec1OOUibqi-640.webp 640w",
			"source": "Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 (https://www.instagram.com/p/Dec1OOUibqi/). Recorte cuadrado centrado (foco vertical 0.4), WebP sin EXIF."
		},
		{
			"shortCode": "DeShg7YJ-3j",
			"url": "https://www.instagram.com/p/DeShg7YJ-3j/",
			"type": "reel",
			"pinned": false,
			"alt": "Preguntas sobre transporte en Medellín",
			"src": "/media/instagram/DeShg7YJ-3j-540.webp",
			"width": 540,
			"height": 540,
			"srcset": "/media/instagram/DeShg7YJ-3j-320.webp 320w, /media/instagram/DeShg7YJ-3j-540.webp 540w",
			"source": "Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 (https://www.instagram.com/p/DeShg7YJ-3j/). Recorte cuadrado centrado (foco vertical 0.4), WebP sin EXIF."
		},
		{
			"shortCode": "DePyyGOJaYy",
			"url": "https://www.instagram.com/p/DePyyGOJaYy/",
			"type": "reel",
			"pinned": false,
			"alt": "Un golpe de realidad",
			"src": "/media/instagram/DePyyGOJaYy-640.webp",
			"width": 640,
			"height": 640,
			"srcset": "/media/instagram/DePyyGOJaYy-320.webp 320w, /media/instagram/DePyyGOJaYy-540.webp 540w, /media/instagram/DePyyGOJaYy-640.webp 640w",
			"source": "Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 (https://www.instagram.com/p/DePyyGOJaYy/). Recorte cuadrado centrado (foco vertical 0.4), WebP sin EXIF."
		},
		{
			"shortCode": "DeNcCtMiYdb",
			"url": "https://www.instagram.com/p/DeNcCtMiYdb/",
			"type": "carousel",
			"pinned": false,
			"alt": "Tours únicos, fotos únicas",
			"src": "/media/instagram/DeNcCtMiYdb-640.webp",
			"width": 640,
			"height": 640,
			"srcset": "/media/instagram/DeNcCtMiYdb-320.webp 320w, /media/instagram/DeNcCtMiYdb-540.webp 540w, /media/instagram/DeNcCtMiYdb-640.webp 640w",
			"source": "Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 (https://www.instagram.com/p/DeNcCtMiYdb/). Recorte cuadrado centrado (foco vertical 0.5), WebP sin EXIF."
		}
	],
	"hero-inicio": {
		"desktop": {
			"src": "/media/hero/hero-d-1920.webp",
			"srcset": "/media/hero/hero-d-1280.webp 1280w, /media/hero/hero-d-1920.webp 1920w, /media/hero/hero-d-2560.webp 2560w",
			"width": 1920,
			"height": 1080
		},
		"mobile": {
			"src": "/media/hero/hero-m-750.webp",
			"srcset": "/media/hero/hero-m-540.webp 540w, /media/hero/hero-m-750.webp 750w, /media/hero/hero-m-1080.webp 1080w",
			"width": 750,
			"height": 1626
		},
		"source": "IMAGENES/FotosMedellin/City Tour/dji_fly_20260522_162510_854_1779485191655_photo_optimized.jpg (foto propia, dron, 4000×2250): completa 16:9 (escritorio) y vertical ~9:19,5 centrado en el grupo (móvil). WebP sin EXIF."
	},
	"hero-dron": {
		"poster": {
			"desktop": {
				"src": "/media/hero/hero-dron-poster-1920.webp",
				"srcset": "/media/hero/hero-dron-poster-1280.webp 1280w, /media/hero/hero-dron-poster-1920.webp 1920w",
				"width": 1920,
				"height": 1080
			},
			"mobile": {
				"src": "/media/hero/hero-dron-poster-movil.webp",
				"srcset": "/media/hero/hero-dron-poster-movil.webp 540w",
				"width": 540,
				"height": 960
			}
		},
		"videos": {
			"movil": "/media/videos/hero-dron-movil.mp4",
			"hd720": "/media/videos/hero-dron-720.mp4",
			"hd1080": "/media/videos/hero-dron-1080.mp4"
		},
		"source": "video de dron aportado por el usuario 2026-10-16 (Comuna 13, letrero «PARCE Medellín»), acelerado ×2 (25,9 s), sin audio, H.264 faststart: 1920×1080, 1280×720 y 540×960 (recorte central 9:16). Pósters = primer fotograma, WebP."
	}
};
//#endregion
//#region src/tours-text.js
var rawTours = [
	[
		"city-tour-comuna-13",
		"City Tour & Comuna 13",
		"Ciudad",
		"Historia y arte urbano en Medellín",
		"Descubre las plazas de Medellín y el arte urbano de la Comuna 13. Planeamos contigo un recorrido privado para acercarte a la ciudad y sus historias.",
		[
			"La ciudad como punto de partida",
			"El color cuenta una historia",
			"Una mirada que te llevas"
		],
		[
			"Lugares emblemáticos para ubicarte en Medellín y empezar a entender su identidad.",
			"En la Comuna 13, el arte urbano y las escaleras eléctricas acompañan el relato del barrio.",
			"Camina, observa y conversa. Las mejores fotografías también nacen de escuchar."
		],
		"Calzado cómodo, protección para el sol y espacio en la cámara. Consulta las condiciones de caminata si alguien del grupo necesita apoyo.",
		"urban"
	],
	[
		"guatape-piedra-del-penol",
		"Guatapé & Piedra del Peñol",
		"Pueblos",
		"Guatapé y la Piedra del Peñol en un día",
		"Desde Medellín, descubre los zócalos de Guatapé y el paisaje de la Piedra del Peñol. Acordamos el recorrido contigo; consulta entradas y opciones de ascenso.",
		[
			"Mirar desde lo alto",
			"Caminar entre colores",
			"Volver con otra perspectiva"
		],
		[
			"La Piedra del Peñol abre el paisaje del embalse. Consulta el acceso y las opciones de ascenso al organizar tu visita.",
			"Las calles de Guatapé invitan a detenerse frente a los zócalos y a recorrer el pueblo a pie.",
			"El malecón y las vistas del agua completan un día que comienza y termina en Medellín."
		],
		"La subida a la Piedra exige esfuerzo. Cuéntanos las necesidades de movilidad del grupo y confirma entradas, alimentación y actividades antes de viajar.",
		"water"
	],
	[
		"tour-nocturno-medellin",
		"Noche en Medellín",
		"Noche",
		"Medellín de noche: miradores y Provenza",
		"Conoce Medellín de noche entre luces, vistas del valle y ambiente local. Coordinamos la salida y el regreso; los horarios y las paradas se acuerdan contigo.",
		[
			"El día se despide",
			"La ciudad se ilumina",
			"Regresar con tranquilidad"
		],
		[
			"El recorrido comienza al bajar la luz: definimos contigo el punto de salida y el ritmo del plan.",
			"Las vistas nocturnas y el ambiente local son el centro de esta experiencia.",
			"La recogida y el regreso se coordinan para que puedas concentrarte en disfrutar."
		],
		"Lleva una capa ligera para los miradores. Confirma horarios y paradas con el equipo; el recorrido no implica entradas a establecimientos.",
		"night"
	],
	[
		"vuelta-a-oriente",
		"Vuelta a Oriente",
		"Pueblos",
		"Pueblos y paisajes del Oriente antioqueño",
		"Sal de Medellín hacia los pueblos y las montañas del Oriente antioqueño. Cuéntanos tus intereses para acordar las paradas y disfrutar las plazas con calma.",
		[
			"Salir hacia las montañas",
			"La vida alrededor de una plaza",
			"Pequeñas paradas, grandes recuerdos"
		],
		[
			"El paisaje cambia al dejar la ciudad y entrar en el Oriente antioqueño.",
			"Arquitectura tradicional y encuentros cotidianos le dan carácter a cada pueblo.",
			"Acordamos las paradas según tus intereses y el tiempo disponible, sin convertir el día en una carrera."
		],
		"El clima puede cambiar entre pueblos. Consulta las localidades del itinerario y lleva ropa para una jornada de carretera y caminatas.",
		"earth"
	],
	[
		"tour-del-cafe-medellin",
		"Tour del Café",
		"Naturaleza",
		"Del cultivo a la taza",
		"Descubre la cultura cafetera en una visita desde Medellín: del cultivo al oficio detrás de una taza. La finca y la degustación se confirman en tu propuesta.",
		[
			"Entre hojas y granos",
			"El oficio detrás del aroma",
			"La pausa de una taza"
		],
		[
			"Recorre el entorno de una finca y conoce cómo empieza el camino del café.",
			"Sigue las etapas del grano y conversa sobre el trabajo que hay detrás del sabor.",
			"La degustación reúne la historia del recorrido en un momento para detenerse y compartir."
		],
		"Usa zapatos para terreno rural. La finca, el alcance de la visita y la degustación se confirman en tu propuesta.",
		"coffee"
	],
	[
		"hacienda-napoles",
		"Hacienda Nápoles",
		"Familia",
		"Un día en familia en Hacienda Nápoles",
		"Planea un día en Hacienda Nápoles con transporte desde Medellín. Comparte naturaleza y actividades en familia; confirma el pasaporte y las entradas al cotizar.",
		[
			"Poner rumbo a un día distinto",
			"Explorar juntos",
			"El agua también es parte del plan"
		],
		[
			"Organiza con nosotros la salida y el regreso: es una experiencia que necesita tiempo de carretera.",
			"Consulta las áreas de fauna y atracciones disponibles para el día de tu visita.",
			"Las zonas acuáticas ofrecen otra forma de compartir. Acordamos el pasaporte y las actividades antes de confirmar."
		],
		"Lleva cambio de ropa, protección solar y lo necesario para actividades acuáticas. El pasaporte, las entradas y las restricciones deben confirmarse.",
		"wild"
	],
	[
		"salto-del-buey",
		"Salto del Buey",
		"Naturaleza",
		"Senderismo hasta la cascada",
		"Camina entre senderos y vegetación hasta el Salto del Buey en una salida desde Medellín. Revisamos contigo las condiciones del recorrido y las actividades opcionales.",
		[
			"Entrar en el verde",
			"Encontrarse con la cascada",
			"Elegir tu nivel de aventura"
		],
		[
			"El recorrido invita a caminar por un entorno natural y a observar el paisaje de cerca.",
			"El agua es el centro de la experiencia: un momento para detenerse y mirar.",
			"Consulta las opciones de canopy y vía ferrata si quieres ampliar el plan. Se confirman por separado."
		],
		"Calzado con agarre y ropa de cambio. Comunica cualquier necesidad física; las actividades de aventura dependen de requisitos y condiciones del operador.",
		"forest"
	],
	[
		"santa-fe-de-antioquia",
		"Santa Fe de Antioquia",
		"Pueblos",
		"Calles coloniales y Puente de Occidente",
		"Recorre Santa Fe de Antioquia desde Medellín: calles coloniales, plazas y el Puente de Occidente. Organiza con nosotros las paradas y los tiempos de caminata.",
		[
			"Un puente entre paisajes",
			"Caminar la memoria",
			"El tiempo de la plaza"
		],
		[
			"El Puente de Occidente conecta el recorrido con el paisaje de la región.",
			"El centro histórico se descubre a pie, mirando fachadas y detalles de su arquitectura.",
			"La plaza y la iglesia principal son puntos de encuentro para cerrar la visita antes de regresar."
		],
		"Lleva ropa fresca y protección solar. Consulta tiempos de caminata, entradas y paradas de alimentación al organizar la salida.",
		"earth"
	],
	[
		"jardin-antioquia",
		"Jardín",
		"Pueblos",
		"Un pueblo de colores y café",
		"Viaja de Medellín a Jardín para conocer sus fachadas de color, su plaza y su cultura cafetera. Coordinamos el recorrido considerando el trayecto y a tu grupo.",
		[
			"Tomar el camino del pueblo",
			"Encontrar color en lo cotidiano",
			"Compartir una pausa"
		],
		[
			"El viaje forma parte de la experiencia. Coordinamos tiempos para aprovechar la visita con calma.",
			"Las calles tradicionales y las fachadas de Jardín invitan a caminar y observar.",
			"La vida alrededor de la plaza y la cultura cafetera dan contexto a cada encuentro."
		],
		"Reserva tiempo suficiente para el viaje. El itinerario se adapta a las condiciones del día y a las necesidades del grupo.",
		"garden"
	],
	[
		"tour-de-compras",
		"Tour de Compras",
		"Ciudad",
		"Compras en Medellín a tu ritmo",
		"Organiza tu tour de compras en Medellín por El Hueco, outlets y tiendas locales. Cuéntanos qué buscas para acordar las paradas y el espacio para tus compras.",
		[
			"Definir qué estás buscando",
			"Recorrer y comparar",
			"Dejar espacio para lo que encuentres"
		],
		[
			"Nos cuentas el tipo de compras y las zonas de interés para orientar la ruta.",
			"Combina opciones de comercio local y outlets con tiempo para decidir.",
			"Acordamos paradas, recogidas y espacio de equipaje según el grupo."
		],
		"Lleva calzado cómodo y comunica el volumen de compras previsto. Las compras y acuerdos con comercios no están incluidos en el transporte.",
		"urban"
	],
	[
		"tour-miradores",
		"Tour de Miradores",
		"Noche",
		"Medellín desde sus miradores",
		"Descubre Medellín desde sus miradores y observa cómo cambia la luz sobre el valle. Acordamos las paradas contigo; la visibilidad depende del clima.",
		[
			"Buscar una nueva perspectiva",
			"Esperar el cambio de luz",
			"Guardar el panorama"
		],
		[
			"La ruta conecta puntos desde los que la ciudad se descubre con otra escala.",
			"El atardecer es una invitación a observar. El clima decide los colores de cada salida.",
			"Prepara la cámara y disfruta de las vistas antes de regresar al punto acordado."
		],
		"Lleva abrigo ligero y batería para la cámara. La visibilidad depende del clima y las paradas se confirman con el equipo.",
		"sunset"
	],
	[
		"traslados-aeropuerto-jmc",
		"Traslados Aeropuerto JMC",
		"Traslados",
		"Traslados del aeropuerto a tu alojamiento",
		"Coordina tu traslado entre el Aeropuerto José María Córdova y Medellín. Comparte vuelo, dirección y equipaje: seguimos tu vuelo y acordamos el punto de encuentro.",
		[
			"Antes de aterrizar",
			"Un encuentro coordinado",
			"El primer trayecto en Medellín"
		],
		[
			"Comparte vuelo, fecha, número de personas y equipaje para preparar la recogida.",
			"El seguimiento del vuelo ayuda a coordinar el encuentro. Confirma las condiciones de espera.",
			"La dirección de llegada y las necesidades del grupo guían la elección del vehículo."
		],
		"Confirma vuelo, equipaje, punto de encuentro y condiciones de espera. El valor y la disponibilidad se acuerdan antes de contratar.",
		"road"
	]
];
//#endregion
//#region src/content.js
var FOCUS = {
	"traslados-aeropuerto-jmc": "92% 50%",
	"guatape-piedra-del-penol": "36% 50%",
	"tour-nocturno-medellin": "52% 50%",
	"vuelta-a-oriente": "46% 50%",
	"jardin-antioquia": "40% 50%",
	"tour-miradores": "66% 50%"
};
var photos = (slug) => {
	const items = media_default[slug] || [];
	if (slug === "equipo") return [items[3], ...items.slice(0, 3)].filter(Boolean);
	if (FOCUS[slug]) return items.map((item, i) => i === 0 ? {
		...item,
		focus: FOCUS[slug]
	} : item);
	return items;
};
var GALLERY_EXCLUDE = { "traslados-aeropuerto-jmc": [0] };
var HERO = { "hacienda-napoles": 1 };
var tours = rawTours.map(([slug, name, category, title, description, moments, stories, advice, mood], index) => {
	const images = photos(slug), skip = GALLERY_EXCLUDE[slug] || [];
	return {
		slug,
		name,
		category,
		title,
		description,
		moments,
		stories,
		advice,
		mood,
		number: String(index + 1).padStart(2, "0"),
		images,
		gallery: images.filter((_, i) => !skip.includes(i)),
		hero: images[HERO[slug] || 0]
	};
});
var values = [
	["Confianza", "Te contamos qué esperar y confirmamos las condiciones antes de salir."],
	["Calidad", "Los detalles importan: desde el primer mensaje hasta el punto de regreso."],
	["Seguridad", "Planeamos teniendo en cuenta las personas, la ruta y las condiciones del recorrido."],
	["Compromiso", "Escuchamos tu propósito y damos seguimiento a lo acordado."],
	["Sencillez", "Información comprensible y una conversación directa para organizarte."],
	["Servicio", "Hospitalidad, respeto y disposición para acompañar a cada viajero."]
];
var FEATURES = {
	ac: ["snowflake", "Aire acondicionado"],
	cuero: ["armchair", "Asientos en cuero"],
	wifi: ["wifi", "WiFi a bordo"],
	usb: ["usb", "Cargadores USB"],
	sonido: ["music", "Sistema de sonido"],
	equipaje: ["luggage", "Espacio para equipaje"],
	reclinables: ["armchair", "Asientos reclinables"],
	panoramicas: ["frame", "Ventanas panorámicas"],
	microfono: ["mic", "Micrófono para el guía"],
	nevera: ["refrigerator", "Nevera"],
	led: ["lightbulb", "Iluminación LED ambiental"],
	entretenimiento: ["monitorPlay", "Sistema de entretenimiento"],
	climaDual: ["thermometer", "Control de clima dual"]
};
var vehicles = [
	[
		"Sedán Ejecutivo",
		"1–3",
		"Para viajes ejecutivos y traslados al aeropuerto de una a tres personas. Confirma el espacio de equipaje según tu viaje.",
		[
			"ac",
			"cuero",
			"wifi",
			"usb",
			"sonido"
		]
	],
	[
		"SUV Ejecutiva",
		"1–4",
		"Para grupos pequeños que buscan comodidad en traslados y rutas regionales. Consulta la unidad adecuada para tu recorrido.",
		[
			"equipaje",
			"cuero",
			"entretenimiento",
			"wifi",
			"climaDual"
		]
	],
	[
		"Van Ejecutiva",
		"1–8",
		"Para familias o equipos pequeños, con asientos individuales. Comparte cuántas maletas llevan para confirmar el espacio disponible.",
		[
			"reclinables",
			"equipaje",
			"wifi",
			"ac"
		]
	],
	[
		"Van Master",
		"1–14",
		"Amplia y cómoda para grupos medianos: excursiones, equipos de trabajo y traslados con equipaje. Consulta su disponibilidad para tu recorrido.",
		[
			"reclinables",
			"equipaje",
			"ac",
			"sonido"
		]
	],
	[
		"Van Sprinter",
		"1–17",
		"Para recorridos en grupo, con ventanas panorámicas. Consulta la disponibilidad y el espacio de equipaje para tu salida.",
		[
			"reclinables",
			"sonido",
			"panoramicas",
			"equipaje",
			"microfono"
		]
	],
	[
		"Buses",
		"25–40",
		"Ideal para grupos grandes, eventos corporativos y excursiones extendidas. Disponibles en configuraciones de 25, 35 y 40 pasajeros.",
		[
			"reclinables",
			"entretenimiento",
			"nevera",
			"led"
		]
	]
].map(([name, capacity, use, features], i) => ({
	name,
	capacity,
	use,
	features: features.map((k) => ({
		key: k,
		icon: FEATURES[k][0],
		label: FEATURES[k][1]
	})),
	image: photos("vehiculos")[i]
}));
var articles = [
	{
		slug: "preparar-tu-recorrido",
		imageAlt: "Grupo de viajeros en una plaza empedrada, con iglesia blanca y fachadas de balcones al fondo",
		title: "Cómo preparar tu recorrido desde Medellín",
		tag: "Planeación",
		image: tours[0].images[0],
		intro: "Organizar un recorrido es más sencillo cuando la conversación empieza por lo importante.",
		sections: [
			["La fecha y el punto de partida", "Comparte el día y la dirección desde la que quieres salir. Si llegas en avión, incluye tu número de vuelo cuando hables con el equipo."],
			["Quiénes van contigo", "La cantidad de personas, el equipaje y las necesidades de movilidad ayudan a proponer un vehículo y un ritmo adecuados."],
			["Lo que esperas del día", "Cuéntanos qué te interesa y cuánto tiempo tienes. Antes de confirmar, revisa las paradas, los servicios incluidos, el valor y las condiciones de cambio."]
		]
	},
	{
		slug: "elegir-tu-experiencia",
		imageAlt: "Tres viajeras frente a la base de la Piedra del Peñol y su escalera",
		title: "Qué experiencia elegir desde Medellín",
		tag: "Inspiración",
		image: tours[1].images[0],
		intro: "No hay una única forma de descubrir Medellín y los recorridos que parten desde aquí. Elige según lo que quieras sentir.",
		sections: [
			["Ciudad para escuchar historias", "El City Tour y la Comuna 13 acercan arte y vida urbana. El recorrido de compras pone el acento en el comercio local."],
			["Pueblos para cambiar de ritmo", "Guatapé, Santa Fe, Jardín y Oriente ofrecen maneras diferentes de acercarse al territorio. Consulta tiempos de traslado antes de llenar tu agenda."],
			["Naturaleza para mirar de cerca", "El café y el Salto del Buey proponen experiencias al aire libre distintas. Describe tus preferencias y condición para que el equipo oriente el plan."]
		]
	},
	{
		slug: "viajar-en-grupo",
		imageAlt: "Grupo de personas junto a automóviles y vans en una calle de Medellín",
		title: "Cómo organizar un viaje en grupo desde Medellín",
		tag: "En grupo",
		image: photos("equipo")[0],
		intro: "Una familia, una agencia o un equipo de trabajo: cada grupo tiene su propio ritmo.",
		sections: [
			["Acordar un punto de encuentro", "Una dirección precisa y una persona de contacto simplifican el comienzo. Confirma si habrá recogidas adicionales."],
			["Pensar en el equipaje", "El número de asientos no cuenta toda la historia. Comparte cuántas maletas llevan y cualquier requerimiento especial."],
			["Dejar espacio para disfrutar", "Revisa con el equipo las pausas y prioridades. Un itinerario claro también debe considerar el tiempo que cada persona necesita."]
		]
	}
];
var paths = [
	"/",
	"/experiencias",
	"/servicios",
	"/vehiculos",
	"/nosotros",
	"/blog",
	"/contacto",
	"/cotizar",
	"/calificaciones",
	"/privacidad",
	"/politica-de-tratamiento-de-datos",
	...tours.map((t) => `/experiencias/${t.slug}`),
	...articles.map((a) => `/blog/${a.slug}`)
].flatMap((path) => LANGUAGES.map((lang) => pathForLanguage(path, lang.code)));
async function metaFor(path) {
	const lang = languageFromPath(path);
	await prepareLanguage(lang);
	setLanguage(lang);
	path = unprefix(path).replace(/\/+$/, "") || "/";
	const tour = tours.find((t) => path === `/experiencias/${t.slug}`), article = articles.find((a) => path === `/blog/${a.slug}`);
	if (tour) return [t(tour.name), t(tour.description)];
	if (article) return [t(article.title), t(article.intro)];
	return (staticMeta[path] || NOT_FOUND).map(t);
}
async function render(url) {
	await preloadAllRoutes();
	const lang = languageFromPath(url);
	await prepareLanguage(lang);
	setLanguage(lang);
	return renderToString(/* @__PURE__ */ jsx$1(StaticRouter, {
		basename: languageInfo(lang).prefix || "/",
		location: url,
		children: /* @__PURE__ */ jsx$1(Website, {})
	}));
}
//#endregion
export { inicioTextos as A, jsx$1 as B, useFlipGrid as C, docTop as D, useMounted as E, SoundIcon as F, t as G, company as H, Icon as I, SocialIcon as L, NOT_FOUND as M, usePageMeta as N, watchScroll as O, PlayIcon as P, Socials as R, Trust as S, useMedia as T, whatsapp as U, jsxs$1 as V, language as W, GoogleBadgeStatic as _, vehicles as a, Manifesto as b, Logo as c, PageTitle as d, Picture as f, hiddenByCover as g, TourCard as h, values as i, textoFase as j, CHAPTERS as k, Button as l, Rail as m, metaFor, photos as n, rawTours as o, QuoteSection as p, paths, tours as r, render, media_default as s, articles as t, Eyebrow as u, Arrow as v, useLightMotion as w, Marquee as x, QuoteCopy as y, Fragment as z };
