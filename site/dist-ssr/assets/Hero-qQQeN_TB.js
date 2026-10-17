import { A as inicioTextos, B as jsx, H as company, P as PlayIcon, V as jsxs, r as tours, s as media_default, v as Arrow, w as useLightMotion, z as Fragment } from "../entry-server.js";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
//#region src/videoPrep.js
function prepVideo(el, muted = true) {
	if (!el) return;
	if (muted) {
		el.muted = true;
		el.defaultMuted = true;
		el.setAttribute("muted", "");
	}
	el.setAttribute("playsinline", "");
	el.setAttribute("webkit-playsinline", "");
	el.playsInline = true;
	el.disableRemotePlayback = true;
}
function safePlay(el) {
	prepVideo(el, el.muted);
	const p = el.play();
	return p && p.catch ? p.catch(() => {}) : Promise.resolve();
}
//#endregion
//#region src/inicio-videos.js
var inicioVideos = {
	hero: {
		src: null,
		adaptive: media_default["hero-dron"].videos,
		poster: media_default["hero-dron"].poster,
		image: media_default["hero-inicio"]
	},
	historia: {
		src: "/media/videos/reel-tour-privado.mp4",
		poster: "/media/videos/reel-tour-privado-poster.webp",
		captions: null,
		instagramUrl: "https://www.instagram.com/p/DdXYS5gJ-GH/",
		alt: "Reel: viajar por Medellín a tu propio ritmo, en tour privado"
	}
};
var catalogoVideo = {
	src: null,
	poster: null
};
var toursVideos = {
	"city-tour-comuna-13": {
		src: null,
		poster: null
	},
	"guatape-piedra-del-penol": {
		src: null,
		poster: null
	},
	"tour-nocturno-medellin": {
		src: null,
		poster: null
	},
	"vuelta-a-oriente": {
		src: null,
		poster: null
	},
	"tour-del-cafe-medellin": {
		src: null,
		poster: null
	},
	"hacienda-napoles": {
		src: null,
		poster: null
	},
	"salto-del-buey": {
		src: null,
		poster: null
	},
	"santa-fe-de-antioquia": {
		src: null,
		poster: null
	},
	"jardin-antioquia": {
		src: null,
		poster: null
	},
	"tour-de-compras": {
		src: null,
		poster: null
	},
	"tour-miradores": {
		src: null,
		poster: null
	},
	"traslados-aeropuerto-jmc": {
		src: null,
		poster: null
	}
};
var videoDeTour = (slug) => toursVideos[slug] || {
	src: null,
	poster: null
};
company.instagram;
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
	posts: media_default["instagram-posts"].map((p) => ({
		url: p.url,
		image: p.src,
		srcSet: p.srcset,
		width: p.width,
		height: p.height,
		type: p.type,
		alt: p.alt
	}))
};
//#endregion
//#region src/tour-entry.js
var CARDS = "/media/baraja";
/**
* Fotos del diaporama provisional del hero de la ficha (4–6 oficiales, ya sin la portada JMC con cartel porque `gallery` la excluye): primero la foto principal,
* luego las horizontales y por último el resto repartido de forma pareja. Si el tour tiene menos de 4 fotos oficiales (Compras 3, Traslados 2) salen todas.
*/
function tourSlides(slug, max = 6) {
	const t = tours.find((x) => x.slug === slug), pool = t.gallery, first = pool.find((p) => p.src === t.hero.src) || pool[0];
	const rest = pool.filter((p) => p !== first), wide = rest.filter((p) => p.width > p.height), tall = rest.filter((p) => p.width <= p.height);
	const out = [first, ...wide.slice(0, 2)], need = Math.min(max, pool.length) - out.length, step = tall.length / Math.max(1, need);
	for (let k = 0; k < need && k < tall.length; k++) out.push(tall[Math.floor(k * step)]);
	return out.filter(Boolean).slice(0, max);
}
/** Diaporama del hero del catálogo: una foto oficial de cada uno de 6 tours distintos (nunca la portada JMC con cartel: `gallery` ya la excluye ni se usa Traslados). */
function catalogSlides() {
	return [
		"city-tour-comuna-13",
		"guatape-piedra-del-penol",
		"jardin-antioquia",
		"tour-del-cafe-medellin",
		"tour-nocturno-medellin",
		"santa-fe-de-antioquia"
	].map((s) => {
		const t = tours.find((x) => x.slug === s);
		return t.gallery.find((p) => p.width > p.height) || t.gallery.find((p) => p.src === t.hero.src) || t.gallery[0];
	});
}
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
//#region src/Hero.jsx
function useHeroPlayback(ref, light, enabled) {
	const [playing, setPlaying] = useState(false);
	const manual = useRef(false);
	useEffect(() => {
		const el = ref.current;
		if (!enabled || !el) return void 0;
		const sync = () => setPlaying(!el.paused);
		el.addEventListener("play", sync);
		el.addEventListener("pause", sync);
		prepVideo(el);
		if (light) el.pause();
		else safePlay(el);
		const observer = new IntersectionObserver(([entry]) => {
			if (light || manual.current) return;
			if (entry.isIntersecting) safePlay(el);
			else el.pause();
		});
		observer.observe(el);
		return () => {
			observer.disconnect();
			el.removeEventListener("play", sync);
			el.removeEventListener("pause", sync);
			el.pause();
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
		if (el.paused) safePlay(el);
		else el.pause();
	};
	return [playing, toggle];
}
var SLOW_NET = [
	"slow-2g",
	"2g",
	"3g"
];
var RANK = {
	movil: 0,
	hd720: 1,
	hd1080: 2
};
function pickHeroTier() {
	if (window.matchMedia("(orientation: portrait)").matches) return "movil";
	const w = window.innerWidth, dpr = window.devicePixelRatio || 1;
	return w >= 1600 || dpr >= 2 && w >= 1280 ? "hd1080" : "hd720";
}
function useAdaptiveHero(ref, sources, light) {
	const [playing, setPlaying] = useState(false), [mode, setMode] = useState("init"), [failed, setFailed] = useState(false);
	const manual = useRef(false), api = useRef({});
	useEffect(() => {
		const el = ref.current;
		if (!sources || !el) return void 0;
		prepVideo(el);
		if (light || SLOW_NET.includes(navigator.connection?.effectiveType)) {
			setMode("poster");
			return;
		}
		setMode("video");
		let tier = null, visible = true, resume = 0, timer = 0;
		const want = () => visible && !manual.current && !document.hidden;
		const sync = () => {
			if (want()) safePlay(el);
			else el.pause();
		};
		const choose = () => {
			const next = pickHeroTier();
			if (tier && tier === "movil" === (next === "movil") && RANK[next] <= RANK[tier]) return;
			resume = tier ? el.currentTime : 0;
			tier = next;
			el.src = sources[next];
			sync();
		};
		const onMeta = () => {
			if (resume > 0 && el.duration) try {
				el.currentTime = resume % el.duration;
			} catch {}
			resume = 0;
		};
		const onPlaying = () => {
			el.dataset.ready = "true";
		};
		const onState = () => setPlaying(!el.paused);
		const onError = () => {
			if (!el.dataset.ready) setFailed(true);
		};
		const onResize = () => {
			clearTimeout(timer);
			timer = setTimeout(choose, 250);
		};
		el.addEventListener("loadedmetadata", onMeta);
		el.addEventListener("playing", onPlaying);
		el.addEventListener("play", onState);
		el.addEventListener("pause", onState);
		el.addEventListener("error", onError);
		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			sync();
		});
		io.observe(el);
		window.addEventListener("resize", onResize);
		window.addEventListener("orientationchange", onResize);
		document.addEventListener("visibilitychange", sync);
		api.current.sync = sync;
		choose();
		return () => {
			clearTimeout(timer);
			io.disconnect();
			window.removeEventListener("resize", onResize);
			window.removeEventListener("orientationchange", onResize);
			document.removeEventListener("visibilitychange", sync);
			for (const [n, f] of [
				["loadedmetadata", onMeta],
				["playing", onPlaying],
				["play", onState],
				["pause", onState],
				["error", onError]
			]) el.removeEventListener(n, f);
			el.pause();
			el.removeAttribute("src");
			delete el.dataset.ready;
			el.load();
		};
	}, [
		ref,
		sources,
		light
	]);
	const toggle = () => {
		const el = ref.current;
		if (!el) return;
		if (el.paused) {
			manual.current = false;
			safePlay(el);
		} else {
			manual.current = true;
			el.pause();
		}
	};
	return [
		playing,
		toggle,
		mode,
		failed
	];
}
var SLIDE_MS = 5800;
function HeroSlides({ slides, paused, still }) {
	const [cur, setCur] = useState(0), [prev, setPrev] = useState(-1), [reach, setReach] = useState(1);
	const box = useRef(null), curRef = useRef(0), imgs = useRef([]);
	const n = slides.length;
	useEffect(() => {
		const io = new IntersectionObserver(([e]) => {
			box.current.dataset.off = e.isIntersecting ? "false" : "true";
		});
		io.observe(box.current);
		return () => io.disconnect();
	}, []);
	useEffect(() => {
		if (still || paused || n < 2) return void 0;
		let visible = true, busy = false;
		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
		});
		io.observe(box.current);
		const tick = () => {
			if (!visible || document.hidden || busy) return;
			busy = true;
			const next = (curRef.current + 1) % n;
			setReach((r) => Math.max(r, next + 1));
			requestAnimationFrame(() => {
				const im = imgs.current[next];
				Promise.resolve(im?.decode?.()).catch(() => {}).then(() => {
					setPrev(curRef.current);
					curRef.current = next;
					setCur(next);
					busy = false;
				});
			});
		};
		const id = setInterval(tick, SLIDE_MS);
		return () => {
			clearInterval(id);
			io.disconnect();
		};
	}, [
		still,
		paused,
		n
	]);
	useEffect(() => {
		if (prev < 0) return void 0;
		const t = setTimeout(() => setPrev(-1), 1400);
		return () => clearTimeout(t);
	}, [prev]);
	useEffect(() => {
		if (still || n < 2) return void 0;
		const h = (window.requestIdleCallback || ((f) => setTimeout(f, 1200)))(() => setReach((r) => Math.max(r, 2)));
		return () => {
			(window.cancelIdleCallback || clearTimeout)(h);
		};
	}, [still, n]);
	return /* @__PURE__ */ jsx("div", {
		ref: box,
		className: "hero-slides",
		"data-paused": paused ? "true" : "false",
		"data-still": still ? "true" : "false",
		children: slides.slice(0, still ? 1 : reach).map((p, i) => /* @__PURE__ */ jsx("img", {
			ref: (el) => {
				imgs.current[i] = el;
			},
			className: `hs-img hs-${i % 2 ? "b" : "a"}${i === cur ? " is-on" : i === prev ? " is-prev" : ""}`,
			src: p.src,
			srcSet: p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`,
			sizes: "100vw",
			width: p.width,
			height: p.height,
			alt: "",
			style: { objectPosition: p.focus || "50% 38%" },
			loading: "eager",
			fetchPriority: i === 0 ? "high" : "low",
			decoding: "async",
			draggable: "false"
		}, p.src))
	});
}
/**
* `video` = { src, poster } del archivo central; `slides` = fotos provisionales (opcional); `eyebrow`, `title` (nodo del h1), `support`, `actions` (nodos).
* `tour` = true en las fichas: el h1 admite nombres largos (varias líneas equilibradas).
*/
function HeroBlock({ video, slides, eyebrow, title, support, actions, tour = false, labelId = "hero-titulo" }) {
	const light = useLightMotion(), media = useRef(null), adaptiveRef = useRef(null), section = useRef(null);
	const adaptive = !video.src && Boolean(video.adaptive);
	const [playing, toggle] = useHeroPlayback(media, light, Boolean(video.src));
	const [aPlaying, aToggle, aMode, aFailed] = useAdaptiveHero(adaptiveRef, adaptive ? video.adaptive : null, light);
	const hasSlides = !video.src && !adaptive && Boolean(slides?.length);
	const img = adaptive ? aFailed ? video.image : video.poster : !video.src && !hasSlides ? video.image : null;
	const mqMobile = adaptive ? "(orientation: portrait)" : "(max-width: 799px)", mqDesktop = adaptive ? "(orientation: landscape)" : "(min-width: 800px)";
	const [slidesPaused, setSlidesPaused] = useState(false);
	const onSlidesToggle = useCallback(() => setSlidesPaused((v) => !v), []);
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
	const shade = Boolean(video.src) || adaptive || hasSlides || Boolean(img);
	return /* @__PURE__ */ jsxs("section", {
		ref: section,
		className: `home-hero${tour ? " is-tour" : ""}`,
		"data-hero": true,
		"data-video": video.src || adaptive ? "on" : hasSlides ? "slides" : img ? "image" : "off",
		"aria-labelledby": labelId,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "hero-media",
				"aria-hidden": "true",
				children: [
					video.src && /* @__PURE__ */ jsx("video", {
						ref: media,
						src: video.src,
						poster: video.poster || void 0,
						muted: true,
						loop: true,
						playsInline: true,
						autoPlay: !light,
						preload: "metadata",
						tabIndex: -1
					}),
					hasSlides && /* @__PURE__ */ jsx(HeroSlides, {
						slides,
						paused: slidesPaused,
						still: light
					}),
					img && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("link", {
						rel: "preload",
						as: "image",
						href: img.desktop.src,
						imageSrcSet: img.desktop.srcset,
						imageSizes: "100vw",
						media: mqDesktop,
						fetchPriority: "high"
					}), /* @__PURE__ */ jsx("link", {
						rel: "preload",
						as: "image",
						href: img.mobile.src,
						imageSrcSet: img.mobile.srcset,
						imageSizes: "100vw",
						media: mqMobile,
						fetchPriority: "high"
					})] }),
					img && /* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
						media: mqMobile,
						srcSet: img.mobile.srcset,
						sizes: "100vw"
					}), /* @__PURE__ */ jsx("img", {
						className: "hero-img",
						src: img.desktop.src,
						srcSet: img.desktop.srcset,
						sizes: "100vw",
						width: img.desktop.width,
						height: img.desktop.height,
						alt: "",
						loading: "eager",
						fetchPriority: "high",
						decoding: "async"
					})] }),
					adaptive && /* @__PURE__ */ jsx("video", {
						ref: adaptiveRef,
						className: "hero-dron",
						muted: true,
						loop: true,
						playsInline: true,
						preload: "metadata",
						tabIndex: -1,
						disablePictureInPicture: true
					})
				]
			}),
			shade && /* @__PURE__ */ jsx("div", {
				className: "hero-shade",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "hero-copy",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow hero-eyebrow",
						children: eyebrow
					}),
					title,
					/* @__PURE__ */ jsx("p", {
						className: "hero-support",
						children: support
					}),
					/* @__PURE__ */ jsx("div", {
						className: "hero-actions",
						children: actions
					})
				]
			}),
			video.src && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "hero-pause",
				onClick: toggle,
				"aria-label": playing ? "Pausar video" : "Reproducir video",
				children: /* @__PURE__ */ jsx(PlayIcon, { playing })
			}),
			adaptive && aMode === "video" && !aFailed && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "hero-pause",
				onClick: aToggle,
				"aria-label": aPlaying ? "Pausar video" : "Reproducir video",
				children: /* @__PURE__ */ jsx(PlayIcon, { playing: aPlaying })
			}),
			hasSlides && slides.length > 1 && !light && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "hero-pause",
				onClick: onSlidesToggle,
				"aria-pressed": slidesPaused,
				"aria-label": slidesPaused ? "Reproducir imágenes" : "Pausar imágenes",
				children: /* @__PURE__ */ jsx(PlayIcon, { playing: !slidesPaused })
			})
		]
	});
}
/** Hero de la ficha: el MISMO bloque del inicio, parametrizado por tour (video del archivo central o diaporama de fotos oficiales mientras no haya video). */
function TourHeroVideo({ tour }) {
	return /* @__PURE__ */ jsx(HeroBlock, {
		tour: true,
		labelId: "tour-hero-titulo",
		video: videoDeTour(tour.slug),
		slides: tourSlides(tour.slug),
		eyebrow: `${tour.category} · Desde Medellín`,
		support: tour.title,
		title: /* @__PURE__ */ jsx("h1", {
			id: "tour-hero-titulo",
			className: "hero-h1--tour",
			children: tour.name
		}),
		actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("a", {
			className: "button hero-btn hero-btn--explore",
			id: "cta-principal",
			href: "#consulta",
			children: ["Planea esta experiencia", /* @__PURE__ */ jsx(Arrow, {})]
		}), /* @__PURE__ */ jsxs(Link, {
			className: "button hero-btn hero-btn--quote",
			to: "/experiencias",
			children: ["Todas las experiencias", /* @__PURE__ */ jsx(Arrow, {})]
		})] })
	});
}
/** Hero del catálogo /experiencias: mismo bloque, espacio de video propio (`catalogoVideo`) y fotos de varios tours mientras no haya video. */
function CatalogHero() {
	return /* @__PURE__ */ jsx(HeroBlock, {
		tour: true,
		labelId: "catalogo-hero-titulo",
		video: catalogoVideo,
		slides: catalogSlides(),
		eyebrow: "La colección T&T",
		support: "Ciudad, pueblos, café o naturaleza. Elige tu recorrido y planeemos los detalles para tu grupo.",
		title: /* @__PURE__ */ jsx("h1", {
			id: "catalogo-hero-titulo",
			className: "hero-h1--tour",
			children: "Experiencias desde Medellín"
		}),
		actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("a", {
			className: "button hero-btn hero-btn--explore",
			href: "#catalogo",
			children: ["Ver las experiencias", /* @__PURE__ */ jsx(Arrow, {})]
		}), /* @__PURE__ */ jsxs(Link, {
			className: "button hero-btn hero-btn--quote",
			to: "/cotizar",
			children: ["Planeemos tu viaje", /* @__PURE__ */ jsx(Arrow, {})]
		})] })
	});
}
//#endregion
export { inicioVideos as a, safePlay as c, tourEntry as i, HeroBlock as n, instagram as o, TourHeroVideo as r, prepVideo as s, CatalogHero as t };
