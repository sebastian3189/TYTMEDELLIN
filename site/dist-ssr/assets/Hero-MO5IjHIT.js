import { E as useLightMotion, H as jsx, I as PlayIcon, M as inicioTextos, U as jsxs, V as Fragment, W as company, a as tours, b as Arrow, l as media_default, n as catalogo } from "../entry-server.js";
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
var photoOf = (p) => ({
	src: p.src,
	srcSet: p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`,
	width: p.width,
	height: p.height,
	small: p.small || p.src
});
var find = (slug) => tours.find((x) => x.slug === slug);
/** Diaporama de la cabecera de la ficha (`cabecera_slides`; la 1.ª es la portada). Sin fotos (Tour Miradores) devuelve [] y la cabecera queda sin diaporama. */
function tourSlides(slug) {
	return find(slug).slides;
}
/** Diaporama de la cabecera de /experiencias (`catalogo_slides`). */
function catalogSlides() {
	return catalogo;
}
/** Carta de portada de la baraja (4:5). Tour Miradores (sin foto): carta de marca generada por prepare-baraja.py. */
var cover = (slug) => ({
	src: `${CARDS}/${slug}-d.webp`,
	srcSet: `${CARDS}/${slug}-m.webp 400w, ${CARDS}/${slug}-d.webp 640w, ${CARDS}/${slug}-h.webp 960w`,
	width: 960,
	height: 1200,
	small: `${CARDS}/${slug}-t.webp`
});
/** Mano de viaje del inicio (TravelHand): portada + `inicio_tarjeta`. */
function tourEntry(slug) {
	const t = find(slug), copy = inicioTextos.cartas[slug];
	return {
		slug,
		name: t.name,
		category: t.category,
		emocion: copy.emocion,
		frase: copy.frase,
		lugar: copy.lugar,
		sinFoto: !t.hero,
		photos: [cover(slug), ...t.inicio.map(photoOf)]
	};
}
/** «Archivo de nuestros viajes» de la ficha (TourArchive): portada + `galeria`. Sin portada (Tour Miradores) no hay archivo. */
function archiveEntry(slug) {
	const t = find(slug), copy = inicioTextos.cartas[slug];
	return {
		slug,
		name: t.name,
		category: t.category,
		lugar: copy.lugar,
		photos: t.hero ? [cover(slug), ...t.gallery.map(photoOf)] : []
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
function useAdaptiveHero(ref, sources) {
	const [failed, setFailed] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!sources || !el) return void 0;
		prepVideo(el);
		let tier = null, visible = true, resume = 0, timer = 0, alive = true;
		const want = () => alive && visible && !document.hidden;
		const sync = () => {
			if (want()) {
				if (el.paused) safePlay(el);
			} else el.pause();
		};
		const retry = () => {
			if (want() && el.paused) safePlay(el);
		};
		const GESTURES = [
			"pointerdown",
			"touchstart",
			"keydown",
			"scroll"
		];
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
		const onPause = () => {
			setTimeout(retry, 300);
		};
		const onError = () => {
			if (!el.dataset.ready) setFailed(true);
		};
		const onResize = () => {
			clearTimeout(timer);
			timer = setTimeout(choose, 250);
		};
		const media = [
			["loadedmetadata", onMeta],
			["playing", onPlaying],
			["pause", onPause],
			["canplay", retry],
			["stalled", retry],
			["error", onError]
		];
		for (const [n, f] of media) el.addEventListener(n, f);
		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			sync();
		});
		io.observe(el);
		window.addEventListener("resize", onResize);
		window.addEventListener("orientationchange", onResize);
		document.addEventListener("visibilitychange", sync);
		for (const g of GESTURES) window.addEventListener(g, retry, { passive: true });
		window.addEventListener("pageshow", retry);
		choose();
		return () => {
			alive = false;
			clearTimeout(timer);
			io.disconnect();
			window.removeEventListener("resize", onResize);
			window.removeEventListener("orientationchange", onResize);
			document.removeEventListener("visibilitychange", sync);
			for (const g of GESTURES) window.removeEventListener(g, retry);
			window.removeEventListener("pageshow", retry);
			for (const [n, f] of media) el.removeEventListener(n, f);
			el.pause();
			el.removeAttribute("src");
			delete el.dataset.ready;
			el.load();
		};
	}, [ref, sources]);
	return failed;
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
	const aFailed = useAdaptiveHero(adaptiveRef, adaptive ? video.adaptive : null);
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
export { tourEntry as a, prepVideo as c, archiveEntry as i, safePlay as l, HeroBlock as n, inicioVideos as o, TourHeroVideo as r, instagram as s, CatalogHero as t };
