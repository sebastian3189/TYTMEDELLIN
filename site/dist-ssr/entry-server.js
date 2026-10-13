import { renderToString } from "react-dom/server";
import { Link, NavLink, Navigate, Route, Routes, StaticRouter, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region src/company.js
var company = {
	phone: "+57 304 496 1698",
	whatsapp: "573044961698",
	email: "transporteturismocolombia@gmail.com",
	address: "Carrera 79AA #1A Sur-280, Medellín",
	reviews: "https://www.google.com/maps/place/Transporte+%26+Turismo+Medellin/data=!4m2!3m1!1s0x0:0x676cebadb662a88a",
	instagram: "https://www.instagram.com/transporteenmedellin",
	tiktok: "https://www.tiktok.com/@tytmedellin"
};
var whatsapp = (context = "mi recorrido") => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hola, quiero consultar con T&T Medellín sobre ${context}.`)}`;
//#endregion
//#region src/Socials.jsx
var PATHS = {
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
function Socials({ className = "" }) {
	return /* @__PURE__ */ jsx("ul", {
		role: "list",
		className: `socials ${className}`,
		children: SOCIALS().map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
			href: s.url,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": `${s.label} (se abre en una pestaña nueva)`,
			children: /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 24 24",
				fill: "currentColor",
				"aria-hidden": "true",
				style: { color: s.color },
				children: /* @__PURE__ */ jsx("path", { d: PATHS[s.id] })
			})
		}) }, s.id))
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
	return /* @__PURE__ */ jsx("li", {
		"aria-hidden": hidden || void 0,
		className: "ally",
		children: item.text ? /* @__PURE__ */ jsx("span", {
			className: "ally-rnt",
			children: item.name
		}) : /* @__PURE__ */ jsx("span", {
			className: `ally-chip ${item.dark ? "is-dark" : ""}`,
			children: /* @__PURE__ */ jsx("img", {
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
	return /* @__PURE__ */ jsxs("section", {
		className: "allies wrap",
		"aria-label": "Aliados y referencias",
		children: [/* @__PURE__ */ jsx("div", {
			className: `allies-viewport ${paused ? "is-paused" : ""}`,
			children: /* @__PURE__ */ jsxs("div", {
				className: "allies-track",
				children: [/* @__PURE__ */ jsx("ul", {
					role: "list",
					children: ITEMS.map((i) => /* @__PURE__ */ jsx(Item, { item: i }, i.name))
				}), /* @__PURE__ */ jsx("ul", {
					role: "list",
					"aria-hidden": "true",
					className: "allies-copy",
					children: ITEMS.map((i) => /* @__PURE__ */ jsx(Item, {
						item: i,
						hidden: true
					}, i.name))
				})]
			})
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "allies-pause",
			"aria-pressed": paused,
			"aria-label": paused ? "Reanudar el movimiento de los aliados" : "Pausar el movimiento de los aliados",
			onClick: () => setPaused(!paused),
			children: /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				children: paused ? "▶" : "❚❚"
			})
		})]
	});
}
//#endregion
//#region src/meta.js
var staticMeta = {
	"/": ["Medellín, a otro nivel", "Medellín, a otro nivel. Transporte privado y experiencias desde Medellín con un equipo local."],
	"/experiencias": ["Experiencias", "Explora doce recorridos desde Medellín: ciudad, cultura, café y paisajes de Antioquia."],
	"/vehiculos": ["Vehículos", "Conoce las categorías de vehículos para tu traslado privado o viaje en grupo desde Medellín."],
	"/servicios": ["Servicios", "Traslados, recorridos privados y transporte para empresas, agencias y grupos en Medellín."],
	"/nosotros": ["Nosotros", "Conoce la historia, el equipo y los valores de Transporte y Turismo Medellín."],
	"/blog": ["Cuaderno de viaje", "Ideas y consejos para preparar tus experiencias y recorridos desde Medellín."],
	"/contacto": ["Contacto", "Habla con el equipo de T&T Medellín por teléfono, correo o WhatsApp."],
	"/cotizar": ["Planea tu viaje", "Prepara tu consulta de transporte o turismo para recibir una propuesta del equipo de Medellín."],
	"/calificaciones": ["Calificaciones", "Consulta la referencia histórica de calificaciones y las reseñas actuales de T&T Medellín en Google."],
	"/privacidad": ["Privacidad", "Conoce cómo se prepara tu consulta y qué información decides compartir con T&T Medellín."]
};
var NOT_FOUND = ["Página no encontrada", "Regresa a las experiencias de T&T Medellín para encontrar tu recorrido."];
var fullTitle = (title) => `${title} | T&T Medellín`;
function applyMeta(title, description) {
	document.title = fullTitle(title);
	document.querySelector("meta[name=\"description\"]")?.setAttribute("content", description);
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
	titular: ["Medellín,", "a otro nivel."],
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
			titular: "No solo visites Medellín. Vívela.",
			subtitulo: "Una mirada al valle desde la ladera."
		},
		c2: {
			rotulo: "Plaza Botero",
			titular: "La ciudad como punto de partida",
			subtitulo: "Un grupo reunido frente al Palacio de la Cultura."
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
			titular: "Una ciudad que vuelve a dibujarse.",
			subtitulo: "El Metrocable regala otra mirada de la ciudad."
		},
		c4: {
			rotulo: "Comuna 13",
			titular: "El color cuenta una historia",
			subtitulo: "Arte urbano y escaleras eléctricas acompañan el relato del barrio."
		},
		c5: {
			rotulo: "Guatapé",
			titular: "El horizonte tiene otro color.",
			subtitulo: "Agua entre montañas y un pueblo que se cuenta en sus zócalos."
		}
	},
	cartas: {
		"city-tour-comuna-13": {
			emocion: "Descubre",
			frase: "plazas, murales e historias de Medellín.",
			lugar: "COMUNA 13"
		},
		"guatape-piedra-del-penol": {
			emocion: "Explora",
			frase: "agua entre montañas y zócalos de color.",
			lugar: "GUATAPÉ · PIEDRA DEL PEÑOL"
		},
		"tour-nocturno-medellin": {
			emocion: "Siente",
			frase: "el valle cuando enciende sus luces.",
			lugar: "MEDELLÍN"
		},
		"vuelta-a-oriente": {
			emocion: "Conecta",
			frase: "con pueblos y plazas, sin carreras.",
			lugar: "VUELTA A ORIENTE"
		},
		"tour-del-cafe-medellin": {
			emocion: "Vive",
			frase: "el oficio detrás de cada taza.",
			lugar: "TOUR DEL CAFÉ"
		},
		"hacienda-napoles": {
			emocion: "Disfruta",
			frase: "un día en familia, con transporte coordinado.",
			lugar: "HACIENDA NÁPOLES"
		},
		"salto-del-buey": {
			emocion: "Sorpréndete",
			frase: "una cascada al final del sendero.",
			lugar: "SALTO DEL BUEY"
		},
		"santa-fe-de-antioquia": {
			emocion: "Recuerda",
			frase: "calles coloniales y el Puente de Occidente.",
			lugar: "SANTA FE DE ANTIOQUIA"
		},
		"jardin-antioquia": {
			emocion: "Enamórate",
			frase: "fachadas de color y plaza sin prisa.",
			lugar: "JARDÍN"
		},
		"tour-de-compras": {
			emocion: "Descubre",
			frase: "El Hueco, outlets y tiendas locales.",
			lugar: "TOUR DE COMPRAS"
		},
		"tour-miradores": {
			emocion: "Inspírate",
			frase: "el valle cambia con la luz.",
			lugar: "TOUR MIRADORES"
		},
		"traslados-aeropuerto-jmc": {
			emocion: "Conecta",
			frase: "del aeropuerto a tu alojamiento, coordinado.",
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
		if (light) return;
		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const r = node.getBoundingClientRect();
				if (r.bottom < 0 || r.top > innerHeight || document.hidden) return;
				const p = Math.min(1, Math.max(0, -r.top / r.height));
				node.style.setProperty("--editorial-shift", `${p * 4}vw`);
				node.style.setProperty("--photo-shift", `${p * -24}px`);
			});
		};
		window.addEventListener("scroll", update, { passive: true });
		update();
		return () => {
			window.removeEventListener("scroll", update);
			cancelAnimationFrame(frame);
			node.style.removeProperty("--editorial-shift");
			node.style.removeProperty("--photo-shift");
		};
	}, [light]);
	return /* @__PURE__ */ jsx("section", {
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
		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const r = node.getBoundingClientRect();
				if (r.bottom < 0 || r.top > innerHeight || document.hidden) return;
				node.style.setProperty("--mq-p", Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height))).toFixed(4));
			});
		};
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		update();
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
			cancelAnimationFrame(frame);
			node.style.removeProperty("--mq-p");
		};
	}, [light]);
	return /* @__PURE__ */ jsx("section", {
		ref,
		className: "place-marquee",
		children: /* @__PURE__ */ jsx("p", {
			"aria-hidden": "true",
			style: { fontSize: `${fit.size.toFixed(2)}px` },
			children: fit.lines.map((l) => /* @__PURE__ */ jsx("span", { children: l }, l))
		})
	});
}
function Manifesto({ words }) {
	return /* @__PURE__ */ jsx("section", {
		className: "manifesto wrap",
		"aria-label": words.join(" "),
		children: words.map((word) => /* @__PURE__ */ jsx(EditorialMotion, { children: /* @__PURE__ */ jsx("p", { children: word }) }, word))
	});
}
function Trust() {
	return /* @__PURE__ */ jsx("div", {
		className: "trust wrap",
		children: /* @__PURE__ */ jsx("p", { children: "Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles" })
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
	return /* @__PURE__ */ jsxs("div", {
		className: "quote-copy",
		children: [
			/* @__PURE__ */ jsx(Trust, {}),
			/* @__PURE__ */ jsx("p", {
				className: "eyebrow",
				children: "Hecho para ti"
			}),
			/* @__PURE__ */ jsx("h2", { children: withType ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
				"Cuéntanos qué",
				/* @__PURE__ */ jsx("br", {}),
				"necesitas."
			] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
				"Tu experiencia",
				/* @__PURE__ */ jsx("br", {}),
				"empieza con una",
				/* @__PURE__ */ jsx("br", {}),
				/* @__PURE__ */ jsx("em", { children: "conversación." })
			] }) }),
			/* @__PURE__ */ jsx("p", { children: withType ? "Elige el tipo de solicitud y prepara tu mensaje. Compártelo con nuestro equipo en WhatsApp." : "Revisa tu solicitud, cópiala y compártela con nuestro equipo en WhatsApp." }),
			/* @__PURE__ */ jsx("a", {
				href: `tel:${company.phone.replaceAll(" ", "")}`,
				className: "contact-number",
				children: company.phone
			}),
			/* @__PURE__ */ jsx("small", { children: "La disponibilidad y el valor se confirman con el equipo." })
		]
	});
}
//#endregion
//#region src/shared.jsx
var Quote = lazy(() => import("./assets/Quote-DSQOpICT.js"));
var reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Picture({ photo, alt, priority = false, className = "", native = false, sizes = "(max-width: 700px) 100vw, 65vw" }) {
	if (!photo) return null;
	const style = native ? { maxWidth: `min(100%, ${photo.width}px)` } : photo.focus ? { objectPosition: photo.focus } : void 0;
	return /* @__PURE__ */ jsx("img", {
		className,
		style,
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
function Reveal({ children, className = "" }) {
	const ref = useRef(null);
	useEffect(() => {
		const node = ref.current;
		if (!("IntersectionObserver" in window)) return;
		const observer = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				node.classList.add("visible");
				observer.disconnect();
			}
		}, { threshold: .08 });
		node.classList.add("will-reveal");
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: `reveal ${className}`,
		ref,
		children
	});
}
function Arrow() {
	return /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		children: "↗"
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ jsx("p", {
		className: "eyebrow",
		children
	});
}
function Button({ to, children, ...props }) {
	return /* @__PURE__ */ jsxs(Link, {
		className: "button",
		to,
		...props,
		children: [children, /* @__PURE__ */ jsx(Arrow, {})]
	});
}
function Rail({ children, label }) {
	const ref = useRef(null), drag = useRef(null), moved = useRef(false);
	const move = (d) => ref.current.scrollBy({
		left: d * ref.current.clientWidth * .8,
		behavior: reduced() ? "instant" : "smooth"
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "rail-shell",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "rail-controls",
			children: [
				/* @__PURE__ */ jsx("span", { children: "Explora a tu ritmo" }),
				/* @__PURE__ */ jsx("button", {
					onClick: () => move(-1),
					"aria-label": `Anterior: ${label}`,
					children: "←"
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: () => move(1),
					"aria-label": `Siguiente: ${label}`,
					children: "→"
				})
			]
		}), /* @__PURE__ */ jsx("div", {
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
	return /* @__PURE__ */ jsxs(Link, {
		className: "tour-card",
		"data-flip-key": tour.slug,
		to: `/experiencias/${tour.slug}`,
		children: [/* @__PURE__ */ jsx("div", {
			className: "tour-card-image",
			children: /* @__PURE__ */ jsx(Picture, {
				photo: tour.images[0],
				alt: tour.name,
				sizes: "(max-width: 700px) 100vw, (max-width: 1099px) 50vw, 33vw"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "card-copy",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "card-meta",
					children: [/* @__PURE__ */ jsx("span", { children: tour.category }), /* @__PURE__ */ jsxs("span", { children: [tour.number, " / T&T"] })]
				}),
				/* @__PURE__ */ jsx("h3", { children: tour.name }),
				/* @__PURE__ */ jsxs("p", { children: [
					/* @__PURE__ */ jsxs("b", { children: [copy.emocion, ":"] }),
					" ",
					copy.frase
				] }),
				/* @__PURE__ */ jsxs("span", {
					className: "card-action",
					children: ["Planea esta experiencia ", /* @__PURE__ */ jsx(Arrow, {})]
				})
			]
		})]
	});
}
function PageTitle({ tag, title, text, photo, floating = [] }) {
	return /* @__PURE__ */ jsxs(EditorialMotion, {
		className: `page-title wrap ${photo ? "page-title-with-photo" : ""}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "page-title-copy",
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: tag }),
				/* @__PURE__ */ jsx("h1", { children: title }),
				text && /* @__PURE__ */ jsx("p", { children: text })
			]
		}), photo && /* @__PURE__ */ jsxs("div", {
			className: "page-title-media",
			children: [/* @__PURE__ */ jsx("figure", {
				className: "page-title-card",
				children: /* @__PURE__ */ jsx(Picture, {
					photo,
					alt: tag,
					priority: true,
					sizes: "(max-width: 700px) 72vw, 320px"
				})
			}), floating.map((p, i) => /* @__PURE__ */ jsx("figure", {
				className: `editorial-float editorial-float-${i}`,
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx(Picture, {
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
	const frame = /* @__PURE__ */ jsxs("section", {
		className: "quote-section wrap",
		"aria-busy": "true",
		children: [/* @__PURE__ */ jsx(QuoteCopy, { withType: mode === "contacto" }), /* @__PURE__ */ jsx("div", {
			className: "quote-form quote-form-frame",
			"aria-hidden": "true"
		})]
	});
	return /* @__PURE__ */ jsx("div", {
		id: "consulta",
		children: mounted ? /* @__PURE__ */ jsx(Suspense, {
			fallback: frame,
			children: /* @__PURE__ */ jsx(Quote, {
				context,
				mode
			})
		}) : frame
	});
}
//#endregion
//#region src/Website.jsx
var LOGO_SRCSET = "/media/marca/logo/logo-40.webp 40w, /media/marca/logo/logo-44.webp 44w, /media/marca/logo/logo-56.webp 56w, /media/marca/logo/logo-80.webp 80w, /media/marca/logo/logo-88.webp 88w, /media/marca/logo/logo-112.webp 112w, /media/marca/logo/logo-120.webp 120w, /media/marca/logo/logo-132.webp 132w, /media/marca/logo/logo-168.webp 168w, /media/marca/logo/logo-224.webp 224w, /media/marca/logo/logo-240.webp 240w, /media/marca/logo/logo-336.webp 336w, /media/marca/logo/logo-360.webp 360w, /media/marca/logo/logo-400.webp 400w";
function Logo({ size, sizes, className = "" }) {
	return /* @__PURE__ */ jsx("img", {
		className: `logo-mark ${className}`,
		src: "/media/marca/logo/logo-400.png",
		srcSet: LOGO_SRCSET,
		sizes,
		width: size,
		height: size,
		alt: "Transporte y Turismo Medellín",
		decoding: "async"
	});
}
function lazyRoute(loader) {
	let Loaded = null, promise = null;
	const preload = () => promise || (promise = loader().then((component) => {
		Loaded = component;
		return component;
	}));
	const Lazy = lazy(() => preload().then((component) => ({ default: component })));
	function Route() {
		return useRef(Loaded !== null).current ? /* @__PURE__ */ jsx(Loaded, {}) : /* @__PURE__ */ jsx(Lazy, {});
	}
	Route.preload = preload;
	return Route;
}
var pick = (loader, name) => () => loader().then((m) => m[name]);
var company_ = () => import("./assets/Company-n6I4HdkR.js");
var R = {
	home: lazyRoute(() => import("./assets/Home-i63G9bhY.js").then((m) => m.default)),
	catalog: lazyRoute(() => import("./assets/Catalog-CiSqxbZB.js").then((m) => m.default)),
	tour: lazyRoute(() => import("./assets/Tour-Dcod6lXc.js").then((m) => m.default)),
	fleet: lazyRoute(() => import("./assets/Fleet-DSJl0g1j.js").then((m) => m.default)),
	blog: lazyRoute(pick(() => import("./assets/Blog-CIThthQV.js"), "Blog")),
	article: lazyRoute(() => import("./assets/Blog-CIThthQV.js").then((m) => m.default)),
	about: lazyRoute(pick(company_, "About")),
	services: lazyRoute(pick(company_, "Services")),
	contact: lazyRoute(pick(company_, "Contact")),
	quote: lazyRoute(pick(company_, "QuotePage")),
	privacy: lazyRoute(pick(company_, "Privacy")),
	ratings: lazyRoute(pick(company_, "Ratings")),
	notFound: lazyRoute(() => import("./assets/NotFound-ADShijO8.js").then((m) => m.default))
};
R.home, R.catalog, R.tour, R.fleet, R.blog, R.article, R.about, R.services, R.contact, R.quote, R.privacy, R.ratings;
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
	const { pathname, hash } = useLocation();
	const first = useRef(true);
	useEffect(() => {
		if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" }));
		else {
			window.scrollTo({
				top: 0,
				behavior: "instant"
			});
			if (!first.current) document.querySelector("main")?.focus({ preventScroll: true });
		}
		first.current = false;
	}, [pathname, hash]);
	useEffect(() => {
		if (/^\/(experiencias|blog)\/[^/]+\/?$/.test(pathname)) return;
		const page = staticMeta[pathname] || NOT_FOUND;
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
	return /* @__PURE__ */ jsxs("header", {
		className: "site-header",
		children: [
			/* @__PURE__ */ jsx(Link, {
				to: "/",
				className: "brand",
				"aria-label": "Transporte y Turismo Medellín, inicio",
				children: /* @__PURE__ */ jsx(Logo, {
					size: 56,
					sizes: "(max-width: 899px) 44px, 56px"
				})
			}),
			/* @__PURE__ */ jsxs("button", {
				ref: toggle,
				className: "menu-toggle",
				onClick: () => setOpen(!open),
				"aria-expanded": open,
				"aria-controls": "navigation",
				children: [
					open ? "Cerrar" : "Menú",
					" ",
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: open ? "−" : "+"
					})
				]
			}),
			/* @__PURE__ */ jsxs("nav", {
				id: "navigation",
				className: open ? "open" : "",
				"aria-label": "Principal",
				children: [
					nav.map(([label, url]) => /* @__PURE__ */ jsx(NavLink, {
						to: url,
						end: url === "/",
						children: label
					}, url)),
					/* @__PURE__ */ jsx(Socials, { className: "header-socials" }),
					/* @__PURE__ */ jsxs(Link, {
						to: "/cotizar",
						className: "nav-cta",
						children: ["Planeemos tu viaje ", /* @__PURE__ */ jsx(Arrow, {})]
					})
				]
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "site-footer",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "footer-top",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"Tu próxima historia",
					/* @__PURE__ */ jsx("br", {}),
					"empieza ",
					/* @__PURE__ */ jsx("em", { children: "aquí." })
				] }), /* @__PURE__ */ jsx(Button, {
					to: "/experiencias",
					children: "Encuentra tu experiencia"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "footer-grid",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Link, {
							className: "footer-brand",
							to: "/",
							"aria-label": "Transporte y Turismo Medellín, inicio",
							children: /* @__PURE__ */ jsx(Logo, {
								size: 120,
								sizes: "120px",
								className: "logo-footer"
							})
						}),
						/* @__PURE__ */ jsx("p", { children: "Experiencias a otro nivel" }),
						/* @__PURE__ */ jsxs("p", { children: [
							"Nos mueve nuestra tierra.",
							/* @__PURE__ */ jsx("br", {}),
							"Nos importan las personas."
						] }),
						/* @__PURE__ */ jsx(Socials, { className: "footer-socials" })
					] }),
					/* @__PURE__ */ jsx("nav", {
						"aria-label": "Enlaces del pie",
						children: nav.map(([label, url]) => /* @__PURE__ */ jsx(Link, {
							to: url,
							children: label
						}, url))
					}),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("a", {
							href: `tel:${company.phone.replaceAll(" ", "")}`,
							children: company.phone
						}),
						/* @__PURE__ */ jsx("a", {
							href: `mailto:${company.email}`,
							children: company.email
						}),
						/* @__PURE__ */ jsx("p", { children: company.address })
					] })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "footer-bottom",
				children: [
					/* @__PURE__ */ jsxs("span", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" T&T Medellín · NIT 901738550-6 · RNT 176384"
					] }),
					/* @__PURE__ */ jsx(Link, {
						to: "/privacidad",
						children: "Privacidad"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/calificaciones",
						children: "Calificaciones"
					})
				]
			})
		]
	});
}
function Layout() {
	const { pathname } = useLocation();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("a", {
			className: "skip-link",
			href: "#contenido",
			children: "Saltar al contenido"
		}),
		/* @__PURE__ */ jsx(PageEffects, {}),
		/* @__PURE__ */ jsx(Header, {}),
		/* @__PURE__ */ jsx("main", {
			id: "contenido",
			tabIndex: -1,
			children: /* @__PURE__ */ jsx(Suspense, {
				fallback: null,
				children: /* @__PURE__ */ jsxs(Routes, { children: [
					/* @__PURE__ */ jsx(Route, {
						path: "/",
						element: /* @__PURE__ */ jsx(R.home, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/site",
						element: /* @__PURE__ */ jsx(Navigate, {
							to: "/",
							replace: true
						})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/experiencias",
						element: /* @__PURE__ */ jsx(R.catalog, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/experiencias/:slug",
						element: /* @__PURE__ */ jsx(R.tour, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/servicios",
						element: /* @__PURE__ */ jsx(R.services, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/vehiculos",
						element: /* @__PURE__ */ jsx(R.fleet, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/flota",
						element: /* @__PURE__ */ jsx(Navigate, {
							to: "/vehiculos",
							replace: true
						})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/nosotros",
						element: /* @__PURE__ */ jsx(R.about, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/blog",
						element: /* @__PURE__ */ jsx(R.blog, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/blog/:slug",
						element: /* @__PURE__ */ jsx(R.article, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/contacto",
						element: /* @__PURE__ */ jsx(R.contact, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/cotizar",
						element: /* @__PURE__ */ jsx(R.quote, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/calificaciones",
						element: /* @__PURE__ */ jsx(R.ratings, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/privacidad",
						element: /* @__PURE__ */ jsx(R.privacy, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "*",
						element: /* @__PURE__ */ jsx(R.notFound, {})
					})
				] })
			})
		}, pathname),
		/* @__PURE__ */ jsx(Allies, {}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
function Website() {
	return /* @__PURE__ */ jsx(Layout, {});
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
		"src": "/media/marca/logo/logo-400.png",
		"small": "/media/marca/logo/logo-168.webp",
		"width": 400,
		"height": 400,
		"srcset": "/media/marca/logo/logo-40.webp 40w, /media/marca/logo/logo-44.webp 44w, /media/marca/logo/logo-56.webp 56w, /media/marca/logo/logo-80.webp 80w, /media/marca/logo/logo-88.webp 88w, /media/marca/logo/logo-112.webp 112w, /media/marca/logo/logo-120.webp 120w, /media/marca/logo/logo-132.webp 132w, /media/marca/logo/logo-168.webp 168w, /media/marca/logo/logo-224.webp 224w, /media/marca/logo/logo-240.webp 240w, /media/marca/logo/logo-336.webp 336w, /media/marca/logo/logo-360.webp 360w, /media/marca/logo/logo-400.webp 400w",
		"source": "IMAGENES/logo/logo-tyt-medellin-aportado.png: aportado por el usuario 2026-10-12; maestro vectorial PENDIENTE. Uso tal cual, solo reducido."
	}]
};
//#endregion
//#region src/tours-text.js
var rawTours = [
	[
		"city-tour-comuna-13",
		"City Tour & Comuna 13",
		"Ciudad",
		"Una ciudad que vuelve a dibujarse.",
		"De las plazas a los murales, descubre Medellín a través de las personas y las historias que le dan forma.",
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
		"El horizonte tiene otro color.",
		"Agua entre montañas, una piedra que domina el paisaje y un pueblo que narra su vida en cada zócalo.",
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
		"Cuando el valle enciende sus luces.",
		"La noche cambia las distancias, los colores y la forma de sentir Medellín. Recorre su otra cara con un plan coordinado.",
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
		"El camino también es el destino.",
		"Pueblos, plazas y montañas: una salida desde Medellín para mirar Antioquia a un ritmo más tranquilo.",
		[
			"Salir hacia las montañas",
			"La vida alrededor de una plaza",
			"Pequeñas paradas, grandes recuerdos"
		],
		[
			"El paisaje cambia al dejar la ciudad y entrar en el Oriente Antioqueño.",
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
		"Una historia que empieza en la tierra.",
		"Acércate al cultivo y al trabajo detrás de una taza. Un encuentro con la cultura cafetera desde Medellín.",
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
		"Un día para volver a sorprenderse.",
		"Una salida al parque temático para compartir naturaleza y actividades en familia, con transporte coordinado desde Medellín.",
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
		"Sigue el sonido del agua.",
		"Senderos y vegetación conducen a una cascada que cambia la escala de todo lo que la rodea.",
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
		"Hay lugares que enseñan a ir despacio.",
		"Calles coloniales, plazas y el Puente de Occidente en una escapada para acercarte a la historia de Antioquia.",
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
		"El color se vive sin prisa.",
		"Fachadas, conversaciones de plaza y cultura cafetera en uno de los recorridos por Antioquia que parten de Medellín.",
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
		"Tus hallazgos, a tu ritmo.",
		"Organiza una jornada por El Hueco, outlets y tiendas locales con los lugares que realmente te interesan.",
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
		"Tour Miradores",
		"Noche",
		"Una ciudad. Infinitas perspectivas.",
		"Contempla el valle y las montañas mientras la luz transforma el paisaje de Medellín.",
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
		"Aterriza. Nosotros conectamos el camino.",
		"El enlace entre el Aeropuerto José María Córdova y tu alojamiento en Medellín, organizado desde antes de llegar.",
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
var FOCUS = { "traslados-aeropuerto-jmc": "92% 50%" };
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
var vehicles = [
	[
		"Sedán Ejecutivo",
		"1–3",
		"Ideal para viajes ejecutivos y traslados al aeropuerto. Máximo confort y elegancia para una a tres personas."
	],
	[
		"SUV Ejecutiva",
		"1–4",
		"Perfecta para grupos pequeños que buscan espacio y comodidad superior, con altura y versatilidad para rutas regionales."
	],
	[
		"Van Ejecutiva",
		"1–8",
		"Excelente para grupos familiares o pequeños equipos de trabajo, con asientos individuales y sitio de sobra para el equipaje."
	],
	[
		"Van Master",
		"1–14",
		"Amplia y cómoda para grupos medianos: excursiones, equipos de trabajo y traslados con equipaje. Consulta su disponibilidad para tu recorrido."
	],
	[
		"Van Sprinter",
		"1–17",
		"Diseñada especialmente para tours grupales con máxima visibilidad. Consulta su disponibilidad para el recorrido que tienes en mente."
	],
	[
		"Buses",
		"25–40",
		"Ideal para grupos grandes, eventos corporativos y excursiones extendidas. Disponibles en configuraciones de 25, 35 y 40 pasajeros."
	]
].map(([name, capacity, use], i) => ({
	name,
	capacity,
	use,
	image: photos("vehiculos")[i]
}));
var articles = [
	{
		slug: "preparar-tu-recorrido",
		title: "El buen viaje empieza con cinco datos.",
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
		title: "¿Ciudad, pueblos o naturaleza?",
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
		title: "Viajar juntos sin improvisar cada parada.",
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
//#endregion
//#region src/entry-server.jsx
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
	...tours.map((t) => `/experiencias/${t.slug}`),
	...articles.map((a) => `/blog/${a.slug}`)
];
function metaFor(path) {
	const tour = tours.find((t) => path === `/experiencias/${t.slug}`), article = articles.find((a) => path === `/blog/${a.slug}`);
	if (tour) return [tour.name, tour.description];
	if (article) return [article.title, article.intro];
	return staticMeta[path] || NOT_FOUND;
}
async function render(url) {
	await preloadAllRoutes();
	return renderToString(/* @__PURE__ */ jsx(StaticRouter, {
		location: url,
		children: /* @__PURE__ */ jsx(Website, {})
	}));
}
//#endregion
export { usePageMeta as A, useLightMotion as C, inicioTextos as D, CHAPTERS as E, company as M, whatsapp as N, textoFase as O, useFlipGrid as S, useMounted as T, QuoteCopy as _, vehicles as a, Marquee as b, Arrow as c, PageTitle as d, Picture as f, TourCard as g, Reveal as h, values as i, Socials as j, NOT_FOUND as k, Button as l, Rail as m, metaFor, photos as n, rawTours as o, QuoteSection as p, paths, tours as r, render, media_default as s, articles as t, Eyebrow as u, EditorialMotion as v, useMedia as w, Trust as x, Manifesto as y };
