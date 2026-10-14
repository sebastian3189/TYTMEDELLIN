import { A as Icon$1, C as useMedia, F as jsxs, L as whatsapp, N as Fragment, P as jsx, S as useLightMotion, _ as EditorialMotion, b as Trust, c as Eyebrow, d as QuoteSection, f as Rail, h as Arrow, k as usePageMeta, p as TourCard, r as tours, u as Picture, w as useMounted, y as Marquee } from "../entry-server.js";
import NotFound from "./NotFound-AZG3jjbu.js";
import { n as useGlassPill, t as GlassPill } from "./glass-B-VmbEHR.js";
import { t as FeaturedGallery } from "./FeaturedGallery-BrgMZdFO.js";
import { t as Reviews } from "./Reviews-BEL79RCZ.js";
import { l as Faq, o as FAQ_TOUR, s as FAQ_TRANSFER, t as DURACIONES } from "./faq-data-BxdktUz_.js";
import { a as smooth, i as smallCaps, l as deckPose, n as placeLugar, o as tourEntry, r as placePhotos, t as clamp } from "./mobile-motion-ZzElizgX.js";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
//#region src/tour-info.json
var tour_info_default = {
	"traslados-aeropuerto-jmc": {
		"descripcion": "Traslados entre el Aeropuerto José María Córdova y tu alojamiento en Medellín, con seguimiento del vuelo y recogida coordinada.",
		"ampliada": ["Coordinamos tu traslado entre el Aeropuerto José María Córdova y tu alojamiento en Medellín. Comparte tu número de vuelo, la dirección y el número de pasajeros para organizar la recogida.", "El servicio incluye seguimiento del vuelo. Confirma con el equipo el punto de encuentro y las condiciones de espera."],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Tu hotel en Medellín o la terminal del Aeropuerto JMC",
		"recomendaciones": ["Envíanos tu número de vuelo apenas reserves: así ajustamos la hora de recogida sin que tengas que llamar.", "Deja margen para el traslado al aeropuerto y confirma la hora de recogida según tu vuelo."],
		"destacados": [
			"Puerta a puerta",
			"Monitoreo de vuelos",
			"Conductores profesionales"
		]
	},
	"guatape-piedra-del-penol": {
		"descripcion": "Contempla el embalse y las montañas desde la Piedra del Peñol. El recorrido continúa por las calles de Guatapé, entre zócalos pintados a mano y el malecón.",
		"ampliada": ["La Piedra del Peñol ofrece una vista abierta del embalse y las montañas de Antioquia. Es una de las paradas del recorrido antes de conocer Guatapé.", "En el pueblo, camina entre calles adoquinadas y zócalos pintados a mano, y visita el malecón frente al agua."],
		"ruta": {
			"titulo": "Ruta de la experiencia",
			"pasos": [
				"Recogida en tu hotel en Medellín",
				"Piedra del Peñol",
				"Vista panorámica de la represa",
				"Pueblo de Guatapé y sus zócalos",
				"Regreso a Medellín"
			]
		},
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Lleva calzado cómodo para subir hasta el mirador de la Piedra del Peñol: es el tramo que regala la vista sobre la represa.", "Reserva tiempo en el pueblo para caminar sus calles y ver los zócalos pintados a mano antes de llegar al malecón."],
		"destacados": [
			"Piedra del Peñol",
			"Pueblo de Guatapé",
			"Represa y vistas panorámicas"
		]
	},
	"city-tour-comuna-13": {
		"descripcion": "Conoce la historia de Medellín a través de sus lugares emblemáticos y la Comuna 13, con sus escaleras eléctricas y murales.",
		"ampliada": ["Este recorrido acerca la historia de Medellín a través de sus lugares emblemáticos y sus barrios. En la Comuna 13, las escaleras eléctricas y los murales forman parte del paisaje urbano que conocerás.", "La visita combina paradas por la ciudad con un acercamiento a los cambios que han vivido sus comunidades."],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Pregunta a tu guía por el mural que más te llame la atención: cada grafiti de la Comuna 13 cuenta una historia distinta.", "Lleva la cámara con espacio de sobra: entre las escaleras eléctricas y el arte urbano, es el recorrido que más fotografías deja."],
		"destacados": [
			"Lugares emblemáticos",
			"Grafiti y arte urbano",
			"Historia y cultura local"
		]
	},
	"tour-nocturno-medellin": {
		"descripcion": "Descubre Medellín después del atardecer: sus miradores ofrecen otra perspectiva del valle y de las luces de la ciudad.",
		"ampliada": [],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Lleva una chaqueta ligera: en los miradores nocturnos refresca más que en el centro de la ciudad.", "Combínalo con un tour de día, como el City Tour o el Tour Miradores, para cerrar la jornada sin perder tiempo de sol."],
		"destacados": [
			"Vistas panorámicas",
			"Ambiente local",
			"Experiencia diferente"
		]
	},
	"vuelta-a-oriente": {
		"descripcion": "Recorre los pueblos del Oriente Antioqueño entre plazas, arquitectura tradicional y paisajes de montaña.",
		"ampliada": [],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Ve con la cámara lista: el recorrido cambia de paisaje de montaña en cada tramo entre pueblo y pueblo.", "Calcula tiempo extra para caminar cada pueblo con calma: la ruta pasa por varios, no por uno solo."],
		"destacados": [
			"Pueblos con encanto",
			"Paisajes de montaña",
			"Cultura y tradición"
		]
	},
	"tour-del-cafe-medellin": {
		"descripcion": "Visita una finca cafetera, camina entre los cultivos y conoce el proceso del grano antes de compartir una taza recién preparada.",
		"ampliada": [],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Prueba la primera taza sin azúcar: así distingues mejor las notas que explica el guía durante la degustación.", "Pregunta por el proceso completo del grano, de la siembra a la taza: es el hilo conductor de todo el recorrido."],
		"destacados": [
			"Finca cafetera",
			"Proceso del café",
			"Degustación y tradición"
		]
	},
	"hacienda-napoles": {
		"descripcion": "Animales, atracciones y zonas acuáticas en Hacienda Nápoles: un parque temático para compartir un día de naturaleza y actividades en familia.",
		"ampliada": [],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Ve con ropa que puedas mojar: el parque tiene zonas acuáticas y son parte del plan.", "Planea el día completo sin prisa: entre animales y atracciones no alcanza a verse todo en pocas horas."],
		"destacados": [
			"Parque temático",
			"Animales y zonas acuáticas",
			"Aventura para toda la familia"
		]
	},
	"salto-del-buey": {
		"descripcion": "Camina por un sendero ecológico hasta la cascada del Salto del Buey. El lugar también ofrece opciones de aventura como canopy y vía ferrata.",
		"ampliada": [],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Calzado cerrado y con buen agarre: el sendero hacia la cascada exige tracción, y si te animas con el canopy o la vía ferrata lo necesitas todavía más.", "Lleva ropa de cambio: entre el sendero y la cascada, es casi seguro que termines mojado."],
		"destacados": [
			"Cascada natural",
			"Senderismo y aventura",
			"Paisajes impresionantes"
		]
	},
	"santa-fe-de-antioquia": {
		"descripcion": "Conoce el Puente de Occidente y recorre el centro histórico de Santa Fe de Antioquia, entre fachadas coloniales, la plaza y su iglesia principal.",
		"ampliada": [],
		"ruta": {
			"titulo": "Ruta de la experiencia",
			"pasos": [
				"Recogida en tu hotel en Medellín",
				"Puente de Occidente",
				"Centro histórico de Santa Fe",
				"Iglesia y plaza principal",
				"Regreso a Medellín"
			]
		},
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Camina el Puente de Occidente con calma y reserva tiempo para contemplar el paisaje.", "Deja tiempo para la plaza principal y la iglesia después del centro histórico: son la última parada de la ruta."],
		"destacados": [
			"Centro histórico",
			"Arquitectura colonial",
			"Tradición y gastronomía"
		]
	},
	"jardin-antioquia": {
		"descripcion": "Recorre Jardín entre fachadas de colores, calles tradicionales y cultura cafetera: una visita para conocer la vida de este pueblo de Antioquia.",
		"ampliada": [],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Camina sin apuro por sus calles de color: es un pueblo para perderse a pie, no para ver desde el carro.", "Pregunta por la cultura cafetera de la zona: es parte central de lo que hace especial a Jardín."],
		"destacados": [
			"Pueblo patrimonio",
			"Color y tradición",
			"Naturaleza y cultura cafetera"
		]
	},
	"tour-de-compras": {
		"descripcion": "Recorre El Hueco, outlets de fábrica y tiendas locales para conocer distintas opciones de compra en Medellín.",
		"ampliada": [],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Usa calzado cómodo y lleva una maleta con espacio extra: el tour está pensado para comprar sin apuro entre El Hueco, los outlets y las tiendas locales.", "Aprovecha el tiempo libre para comparar precios entre El Hueco y los outlets antes de decidir."],
		"destacados": [
			"El Hueco y outlets",
			"Tiendas locales",
			"Tiempo para comprar y disfrutar"
		]
	},
	"tour-miradores": {
		"descripcion": "Recorre los miradores de Medellín al atardecer y contempla la ciudad y las montañas desde distintas perspectivas.",
		"ampliada": [],
		"ruta": null,
		"incluye": [
			"Transporte privado",
			"Vehículos cómodos",
			"Conductores y guías profesionales",
			"Atención personalizada",
			"Fotos y videos del recorrido"
		],
		"punto": "Recogida en tu hotel en Medellín",
		"recomendaciones": ["Llega con la cámara cargada y lista: el recorrido está pensado para el atardecer, y la luz cambia rápido de un mirador a otro.", "Lleva algo de abrigo: los miradores están en alto y refresca más que en el centro de la ciudad."],
		"destacados": [
			"Miradores icónicos",
			"Paisajes inolvidables",
			"Atardecer y fotografía"
		]
	}
};
//#endregion
//#region src/TourDetails.jsx
var ICONS = {
	car: "M5 17h14M6 17V9l2-4h8l2 4v8M3 12h3m12 0h3M8 13h.01M16 13h.01",
	seat: "M7 3h6a2 2 0 0 1 2 2v8H5V5a2 2 0 0 1 2-2Zm-2 10h12v4H5zm2 4v3m10-3v3M15 8h3a1 1 0 0 1 1 1v8",
	guide: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0M17 3l1.2 1.2L21 1.5",
	heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
	camera: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
	check: "m5 12 4 4 10-10"
};
var iconFor = (t) => /transporte/i.test(t) ? "car" : /veh[ií]culo/i.test(t) ? "seat" : /conductor|gu[ií]a/i.test(t) ? "guide" : /atenci/i.test(t) ? "heart" : /foto|video/i.test(t) ? "camera" : "check";
var Icon = ({ name }) => /* @__PURE__ */ jsx("svg", {
	className: "td-icon",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.6",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: ICONS[name],
		pathLength: "1"
	})
});
function TourDetails({ slug }) {
	const d = tour_info_default[slug], list = useRef(null), light = useLightMotion();
	useEffect(() => {
		const node = list.current;
		if (!node || light) return;
		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const r = node.getBoundingClientRect();
				if (r.bottom < 0 || r.top > innerHeight) return;
				const p = Math.min(1, Math.max(0, (innerHeight * .7 - r.top) / r.height));
				node.style.setProperty("--rp", p.toFixed(3));
				node.querySelectorAll("li").forEach((li, i, all) => li.toggleAttribute("data-on", p >= i / all.length - .02));
			});
		};
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		update();
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
			cancelAnimationFrame(frame);
			node.style.removeProperty("--rp");
			node.querySelectorAll("li").forEach((li) => li.removeAttribute("data-on"));
		};
	}, [light, slug]);
	if (!d) return null;
	return /* @__PURE__ */ jsxs("section", {
		className: "tour-details wrap",
		id: "detalles",
		"data-tn": "0",
		"aria-label": "Detalles del recorrido",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "td-lead",
			"data-tr": true,
			children: [
				/* @__PURE__ */ jsx("p", { children: d.descripcion }),
				d.ampliada.map((p) => /* @__PURE__ */ jsx("p", { children: p }, p)),
				d.destacados.length > 0 && /* @__PURE__ */ jsx("ul", {
					className: "td-chips",
					role: "list",
					children: d.destacados.map((h) => /* @__PURE__ */ jsx("li", { children: h }, h))
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "td-grid",
			children: [d.ruta && /* @__PURE__ */ jsxs("div", {
				className: "td-route",
				"data-tr": true,
				children: [/* @__PURE__ */ jsx("h3", { children: d.ruta.titulo }), /* @__PURE__ */ jsx("ol", {
					ref: list,
					className: "td-steps",
					children: d.ruta.pasos.map((p, i) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", {
						className: "td-dot",
						"aria-hidden": "true",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ jsx("span", { children: p })] }, p))
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "td-incl",
				"data-tr": true,
				children: [
					/* @__PURE__ */ jsx("h3", { children: "Qué incluye" }),
					/* @__PURE__ */ jsx("ul", {
						role: "list",
						children: d.incluye.map((t) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx(Icon, { name: iconFor(t) }), /* @__PURE__ */ jsx("span", { children: t })] }, t))
					}),
					d.punto && /* @__PURE__ */ jsxs("div", {
						className: "td-meet",
						children: [/* @__PURE__ */ jsx("h3", { children: "Punto de encuentro" }), /* @__PURE__ */ jsx("p", { children: d.punto })]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/TourArchive.jsx
var SEG_SVH = 230;
function TourArchive({ tour }) {
	const light = useLightMotion(), wide = useMedia("(min-width: 1100px)"), tall = useMedia("(min-height: 640px)");
	const animated = useMounted() && wide && tall && !light;
	const entry = tourEntry(tour.slug), photos = entry.photos.slice(0, 8), n = photos.length;
	const [front, setFront] = useState(0), [viewer, setViewer] = useState(false), [live, setLive] = useState("");
	const track = useRef(null), stage = useRef(null), hand = useRef(null), mq = useRef(null), dlg = useRef(null), st = useRef({
		front: 0,
		manualY: null,
		refresh: () => {}
	});
	st.current.front = front;
	useLayoutEffect(() => {
		if (!animated) return void 0;
		const trackEl = track.current, stageEl = stage.current, handEl = hand.current, mqEl = mq.current;
		let raf = 0, visible = true, q = null, last = 0, RW = 0, RH = 0, sw = 0, trackTop = 0, span = 1, head = 92;
		const measure = () => {
			head = document.querySelector(".site-header")?.offsetHeight || 92;
			RW = handEl.clientWidth;
			RH = handEl.clientHeight;
			sw = stageEl.clientWidth;
			trackTop = trackEl.getBoundingClientRect().top + scrollY;
			span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight);
		};
		const apply = (P) => {
			const imgs = [...handEl.querySelectorAll(".th-photo")], fr = placePhotos(imgs, st.current.front, P * 1, RW, RH, 1, false, null);
			placeLugar(handEl.querySelector(".th-lugar"), fr, P, RH);
			mqEl.style.transform = `translate3d(${(.12 * sw - .25 * P * sw).toFixed(1)}px,-50%,0)`;
		};
		const render = (now) => {
			raf = 0;
			if (!visible || document.hidden) {
				last = 0;
				return;
			}
			const target = clamp((scrollY + head - trackTop) / span), dt = last ? Math.min(64, now - last) : 16;
			last = now;
			if (q === null || Math.abs(target - q) > .12) q = target;
			else q += (target - q) * (1 - Math.exp(-dt / 60));
			let moving = true;
			if (Math.abs(target - q) < 4e-4) {
				q = target;
				moving = false;
			}
			if (st.current.manualY !== null && Math.abs(scrollY - st.current.manualY) > 24) st.current.manualY = null;
			apply(q);
			if (moving) schedule();
			else last = 0;
		};
		const schedule = () => {
			if (!raf) raf = requestAnimationFrame(render);
		};
		st.current.refresh = () => {
			last = 0;
			schedule();
		};
		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			if (visible) {
				last = 0;
				schedule();
			}
		}, { rootMargin: "200px 0px" });
		io.observe(trackEl);
		const ro = new ResizeObserver(() => {
			measure();
			schedule();
		});
		ro.observe(handEl);
		ro.observe(stageEl);
		measure();
		schedule();
		addEventListener("scroll", schedule, { passive: true });
		addEventListener("resize", schedule, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
			ro.disconnect();
			removeEventListener("scroll", schedule);
			removeEventListener("resize", schedule);
			st.current.refresh = () => {};
			handEl.querySelectorAll(".th-photo").forEach((im) => {
				im.removeAttribute("style");
				delete im._w;
			});
		};
	}, [animated, tour.slug]);
	useLayoutEffect(() => {
		st.current.refresh();
	}, [front]);
	const select = useCallback((next, announce) => {
		const f = (next % n + n) % n;
		setFront(f);
		st.current.manualY = scrollY;
		const el = hand.current;
		if (el) {
			el.dataset.flip = "true";
			clearTimeout(st.current.t);
			st.current.t = setTimeout(() => {
				el.dataset.flip = "false";
			}, 650);
		}
		if (announce) setLive(`Foto ${f + 1} de ${n}, ${tour.name}`);
	}, [n, tour.name]);
	if (!animated) return /* @__PURE__ */ jsx(FeaturedGallery, { tour });
	const open = () => {
		setViewer(true);
		requestAnimationFrame(() => dlg.current?.showModal());
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "ta",
		"aria-labelledby": "ta-titulo",
		children: [/* @__PURE__ */ jsx("div", {
			ref: track,
			className: "ta-track",
			style: { "--ta-total": SEG_SVH },
			children: /* @__PURE__ */ jsxs("div", {
				ref: stage,
				className: "ta-stage",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "ta-head",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "eyebrow",
								children: "El archivo de nuestros viajes"
							}),
							/* @__PURE__ */ jsxs("h2", {
								id: "ta-titulo",
								children: [
									"Esto también",
									/* @__PURE__ */ jsx("br", {}),
									"es ",
									/* @__PURE__ */ jsxs("em", { children: [tour.name, "."] })
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "ta-count",
								children: [
									String(front + 1).padStart(2, "0"),
									" / ",
									String(n).padStart(2, "0"),
									" · Toca la foto para ampliar"
								]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "th-mq-clip ta-mq",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("div", {
							ref: mq,
							className: "th-mq",
							children: /* @__PURE__ */ jsx("span", { children: entry.lugar })
						})
					}),
					/* @__PURE__ */ jsx("div", {
						ref: hand,
						className: "th-hand ta-hand",
						role: "region",
						"aria-roledescription": "carrusel",
						"aria-label": `Fotografías de ${tour.name}`,
						tabIndex: 0,
						onKeyDown: (e) => {
							if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
								e.preventDefault();
								select(front + (e.key === "ArrowRight" ? 1 : -1), true);
							} else if (e.key === "Enter") open();
						},
						onClick: (e) => {
							const img = e.target.closest?.(".th-photo");
							if (!img) return;
							const k = Number(img.dataset.k);
							if (k === front) open();
							else select(k, true);
						},
						onPointerDown: (e) => {
							st.current.sx = e.clientX;
							st.current.sy = e.clientY;
						},
						onPointerUp: (e) => {
							const dx = e.clientX - (st.current.sx ?? e.clientX), dy = e.clientY - (st.current.sy ?? e.clientY);
							if (e.pointerType !== "mouse" && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.2) select(front + (dx < 0 ? 1 : -1), true);
						},
						children: /* @__PURE__ */ jsxs("div", {
							className: "th-group",
							children: [photos.map((p, k) => /* @__PURE__ */ jsx("img", {
								className: "th-photo",
								"data-k": k,
								src: p.src,
								srcSet: p.srcSet,
								sizes: k === front ? "36vw" : "18vw",
								width: p.width,
								height: p.height,
								alt: `${tour.name}, fotografía ${k + 1}`,
								loading: "lazy",
								decoding: "async",
								draggable: "false"
							}, k)), /* @__PURE__ */ jsx("span", {
								className: "th-lugar",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("b", { children: smallCaps(entry.lugar) })
							})]
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "ta-foot",
						children: /* @__PURE__ */ jsxs("div", {
							className: "th-arrows",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Fotografía anterior",
								onClick: () => select(front - 1, true),
								children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Fotografía siguiente",
								onClick: () => select(front + 1, true),
								children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
							})]
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "sr-only",
						"aria-live": "polite",
						children: live
					})
				]
			})
		}), viewer && /* @__PURE__ */ jsxs("dialog", {
			ref: dlg,
			className: "gallery-dialog ta-dialog",
			"aria-label": `Galería ampliada de ${tour.name}`,
			onClose: () => setViewer(false),
			onClick: (e) => {
				if (e.target === dlg.current) dlg.current.close();
			},
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "ta-close",
					"aria-label": "Cerrar",
					onClick: () => dlg.current.close(),
					children: "×"
				}),
				/* @__PURE__ */ jsx("img", {
					src: photos[front].src,
					srcSet: photos[front].srcSet,
					sizes: "90vw",
					alt: `${tour.name}, fotografía ${front + 1}`
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "ta-dlg-nav",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Fotografía anterior",
						onClick: () => select(front - 1, true),
						children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Fotografía siguiente",
						onClick: () => select(front + 1, true),
						children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/TourHero.jsx
var MAX_CARDS = 5;
function TourHero({ tour }) {
	const light = useLightMotion(), wide = useMedia("(min-width: 1100px)"), tall = useMedia("(min-height: 640px)");
	const animated = useMounted() && wide && tall && !light;
	const track = useRef(null), stage = useRef(null), region = useRef(null);
	const cards = [tour.hero, ...tour.gallery.filter((g) => g.src !== tour.hero.src)].slice(0, MAX_CARDS);
	useLayoutEffect(() => {
		if (!animated) return void 0;
		const trackEl = track.current, stageEl = stage.current, reg = region.current, els = [...reg.querySelectorAll(".tdk-card")], n = els.length;
		let raf = 0, visible = true, q = null, last = 0, RW = 0, RH = 0, bw = 0, bh = 0, trackTop = 0, span = 1, head = 92;
		const measure = () => {
			head = document.querySelector(".site-header")?.offsetHeight || 92;
			RW = reg.clientWidth;
			RH = reg.clientHeight;
			bw = Math.min(RW * .96, RH * .9 * .8);
			bh = bw * 1.25;
			trackTop = trackEl.getBoundingClientRect().top + scrollY;
			span = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight);
			els.forEach((el) => {
				el.style.width = `${bw}px`;
				el.style.height = `${bh}px`;
			});
		};
		const s0 = .46;
		const apply = (p) => {
			const sh = smooth(clamp(p / .4)), bump = Math.sin(Math.PI * sh), g = smooth(clamp((p - .45) / .5));
			els.forEach((el, i) => {
				const pose = deckPose(i), ang = i * 2.4 + sh * 3, side = i % 2 ? 1 : -1;
				const dx = pose.dx + Math.cos(ang) * bw * s0 * .9 * bump, dy = pose.dy + Math.sin(ang) * bh * s0 * .25 * bump;
				const r0 = pose.r + side * 22 * bump + sh * (i % 3 - 1) * 4;
				const rank = (i + Math.round(bump * 3)) % n;
				let x, y, s, rot, o, z;
				if (i === 0) {
					x = dx * (1 - g);
					y = dy * (1 - g);
					s = s0 * .95 + (1 - s0 * .95) * g;
					rot = r0 * (1 - g) + -3 * g;
					o = 1;
					z = g > .02 ? 60 : 10 + n - rank;
				} else {
					x = dx * (1 - g) + side * bw * .18 * g;
					y = dy * (1 - g) - bh * .06 * g;
					s = s0 * .95 * (1 - g) + .8 * g;
					rot = r0 + side * 8 * g;
					o = 1 - smooth(g / .8);
					z = 10 + n - rank;
				}
				el.style.transform = `translate3d(${(RW / 2 - bw / 2 + x).toFixed(1)}px,${(RH / 2 - bh / 2 + y).toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(4)})`;
				el.style.opacity = o.toFixed(3);
				el.style.zIndex = String(z);
			});
		};
		const render = (now) => {
			raf = 0;
			if (!visible || document.hidden) {
				last = 0;
				return;
			}
			const target = clamp((scrollY + head - trackTop) / span), dt = last ? Math.min(64, now - last) : 16;
			last = now;
			if (q === null || Math.abs(target - q) > .12) q = target;
			else q += (target - q) * (1 - Math.exp(-dt / 60));
			let moving = true;
			if (Math.abs(target - q) < 4e-4) {
				q = target;
				moving = false;
			}
			apply(q);
			if (moving) schedule();
			else last = 0;
		};
		const schedule = () => {
			if (!raf) raf = requestAnimationFrame(render);
		};
		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			if (visible) {
				last = 0;
				schedule();
			}
		}, { rootMargin: "200px 0px" });
		io.observe(trackEl);
		const ro = new ResizeObserver(() => {
			measure();
			schedule();
		});
		ro.observe(reg);
		measure();
		apply(0);
		schedule();
		addEventListener("scroll", schedule, { passive: true });
		addEventListener("resize", schedule, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
			ro.disconnect();
			removeEventListener("scroll", schedule);
			removeEventListener("resize", schedule);
			els.forEach((el) => el.removeAttribute("style"));
		};
	}, [animated, tour.slug]);
	const text = /* @__PURE__ */ jsxs("div", {
		className: "tour-hero-content tdk-text",
		children: [
			/* @__PURE__ */ jsxs(Link, {
				to: "/experiencias",
				className: "back-link",
				children: [/* @__PURE__ */ jsx(Arrow, { dir: "left" }), "Todas las experiencias"]
			}),
			/* @__PURE__ */ jsxs(Eyebrow, { children: [tour.category, " · Desde Medellín"] }),
			/* @__PURE__ */ jsx("h1", { children: tour.name }),
			/* @__PURE__ */ jsx("p", { children: tour.title }),
			/* @__PURE__ */ jsxs("a", {
				className: "button",
				id: "cta-principal",
				href: "#consulta",
				children: ["Planea esta experiencia ", /* @__PURE__ */ jsx(Arrow, {})]
			})
		]
	});
	if (!animated) return /* @__PURE__ */ jsxs(EditorialMotion, {
		className: "tour-hero wrap tdk-static",
		children: [text, /* @__PURE__ */ jsxs("figure", {
			className: "editorial-photo",
			children: [/* @__PURE__ */ jsx(Picture, {
				photo: tour.hero,
				alt: tour.name,
				priority: true,
				sizes: "(max-width: 700px) 72vw, 400px"
			}), /* @__PURE__ */ jsxs("figcaption", { children: [tour.name, " · Archivo T&T"] })]
		})]
	});
	return /* @__PURE__ */ jsx("section", {
		className: "tdk",
		"aria-label": tour.name,
		children: /* @__PURE__ */ jsx("div", {
			ref: track,
			className: "tdk-track",
			children: /* @__PURE__ */ jsxs("div", {
				ref: stage,
				className: "tdk-stage wrap",
				children: [text, /* @__PURE__ */ jsxs("figure", {
					className: "tdk-fig",
					children: [/* @__PURE__ */ jsx("div", {
						ref: region,
						className: "tdk-region",
						children: cards.map((c, i) => /* @__PURE__ */ jsx("div", {
							className: "tdk-card",
							children: /* @__PURE__ */ jsx(Picture, {
								photo: c,
								alt: i === 0 ? tour.name : "",
								priority: i === 0,
								sizes: "440px"
							})
						}, c.src))
					}), /* @__PURE__ */ jsxs("figcaption", { children: [tour.name, " · Archivo T&T"] })]
				})]
			})
		})
	});
}
//#endregion
//#region src/TourChrome.jsx
var TABS = [
	[
		"#esencia",
		"La experiencia",
		0
	],
	[
		"#fotos",
		"Fotografías",
		1
	],
	[
		"#preparar",
		"Antes de viajar",
		2
	],
	[
		"#consulta",
		"Cotizar",
		3
	]
];
/** Pestañas pegajosas: píldora de vidrio, opción activa sólida que viaja (useGlassPill), activa por scroll (IO) y barra de avance con punto naranja. */
function TourNav() {
	const box = useRef(null), sentinel = useRef(null), bar = useRef(null);
	const [active, setActive] = useState(0), [stuck, setStuck] = useState(false);
	const light = useLightMotion();
	useGlassPill(box, active, true);
	useEffect(() => {
		const groups = [...document.querySelectorAll("[data-tn]")];
		const io = new IntersectionObserver((entries) => entries.forEach((e) => {
			if (e.isIntersecting) setActive(Number(e.target.dataset.tn));
		}), { rootMargin: "-45% 0px -50% 0px" });
		groups.forEach((g) => io.observe(g));
		const st = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
		st.observe(sentinel.current);
		return () => {
			io.disconnect();
			st.disconnect();
		};
	}, []);
	useEffect(() => {
		if (light) {
			bar.current?.style.setProperty("--tp", "1");
			return;
		}
		let raf = 0;
		const update = () => {
			raf = 0;
			const end = document.getElementById("consulta");
			if (!end) return;
			const start = sentinel.current.getBoundingClientRect().top + scrollY, stop = end.getBoundingClientRect().top + scrollY;
			bar.current?.style.setProperty("--tp", clamp((scrollY + innerHeight * .5 - start) / Math.max(1, stop - start)).toFixed(4));
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		addEventListener("scroll", kick, { passive: true });
		addEventListener("resize", kick, { passive: true });
		update();
		return () => {
			cancelAnimationFrame(raf);
			removeEventListener("scroll", kick);
			removeEventListener("resize", kick);
		};
	}, [light]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("i", {
		ref: sentinel,
		className: "tn-sentinel",
		"aria-hidden": "true"
	}), /* @__PURE__ */ jsx("nav", {
		className: "tour-nav tn",
		"data-stuck": stuck,
		"aria-label": "En esta experiencia",
		children: /* @__PURE__ */ jsxs("div", {
			ref: box,
			className: "glass-tabs tn-pill",
			children: [
				/* @__PURE__ */ jsx(GlassPill, {}),
				TABS.map(([href, label, i]) => /* @__PURE__ */ jsxs("a", {
					href,
					"aria-current": active === i ? "location" : void 0,
					children: [label, i === 3 && /* @__PURE__ */ jsxs(Fragment, { children: [" ", /* @__PURE__ */ jsx(Arrow, {})] })]
				}, href)),
				/* @__PURE__ */ jsxs("span", {
					ref: bar,
					className: "tn-bar",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ jsx("b", {}), /* @__PURE__ */ jsx("i", {})]
				})
			]
		})
	})] });
}
/** Ruta de la ficha: línea de tinta de 2 px en el margen izquierdo con punto naranja de 10 px que avanza hasta «Cotizar», donde se posa. */
function TourRoute() {
	const el = useRef(null), light = useLightMotion();
	useLayoutEffect(() => {
		const route = el.current, page = route.parentElement;
		let raf = 0, top = 0, len = 1;
		const measure = () => {
			const nav = document.querySelector(".tn"), end = document.getElementById("consulta");
			if (!nav || !end) return;
			const pr = page.getBoundingClientRect();
			top = nav.getBoundingClientRect().bottom - pr.top + (nav.offsetHeight ? 0 : 0);
			len = Math.max(1, end.getBoundingClientRect().top - pr.top - top);
			route.style.top = `${top}px`;
			route.style.height = `${len}px`;
		};
		const update = () => {
			raf = 0;
			const pr = page.getBoundingClientRect(), p = light ? 1 : clamp((innerHeight * .55 - (pr.top + top)) / len);
			route.style.setProperty("--rp", p.toFixed(4));
			route.dataset.end = p > .995 ? "true" : "false";
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		const ro = new ResizeObserver(() => {
			measure();
			kick();
		});
		ro.observe(page);
		document.fonts?.ready.then(() => {
			measure();
			kick();
		});
		measure();
		update();
		if (!light) {
			addEventListener("scroll", kick, { passive: true });
			addEventListener("resize", kick, { passive: true });
		}
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			removeEventListener("scroll", kick);
			removeEventListener("resize", kick);
		};
	}, [light]);
	return /* @__PURE__ */ jsxs("div", {
		ref: el,
		className: "tr-route",
		"aria-hidden": "true",
		"data-end": "false",
		children: [
			/* @__PURE__ */ jsx("i", { className: "tr-line" }),
			/* @__PURE__ */ jsx("i", { className: "tr-done" }),
			/* @__PURE__ */ jsx("i", { className: "tr-dot" })
		]
	});
}
/** Entradas únicas: un solo IntersectionObserver para todo `[data-tr]` de la ficha; lo oculto lo añade JS (`.tr-armed`) y solo con movimiento completo. */
function useTourReveal(rootRef, slug) {
	const light = useLightMotion();
	useLayoutEffect(() => {
		const root = rootRef.current;
		if (!root) return void 0;
		if (light) {
			root.classList.remove("tr-armed");
			return;
		}
		root.classList.add("tr-armed");
		const els = [...root.querySelectorAll("[data-tr]")];
		const io = new IntersectionObserver((entries) => entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("is-in");
				io.unobserve(e.target);
			}
		}), { rootMargin: "0px 0px -12% 0px" });
		els.forEach((x) => io.observe(x));
		return () => {
			io.disconnect();
			root.classList.remove("tr-armed");
			els.forEach((x) => x.classList.remove("is-in"));
		};
	}, [
		rootRef,
		slug,
		light
	]);
}
//#endregion
//#region src/TourBar.jsx
function TourBar({ name }) {
	const mobile = useMedia("(max-width: 767px)");
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (!mobile) return void 0;
		const html = document.documentElement;
		let last = scrollY, timer = 0, formVisible = false;
		html.dataset.tourpage = "1";
		const set = (value) => {
			setShow(value);
			html.dataset.tourbar = value ? "on" : "off";
		};
		const form = document.getElementById("consulta");
		const io = new IntersectionObserver(([entry]) => {
			formVisible = entry.isIntersecting;
			if (formVisible) set(false);
		}, { rootMargin: "0px 0px -10% 0px" });
		if (form) io.observe(form);
		const onScroll = () => {
			const y = scrollY, dy = y - last;
			last = y;
			clearTimeout(timer);
			if (formVisible) {
				set(false);
				return;
			}
			if (dy > 8 && y > 240) set(true);
			else if (dy < -8) set(false);
			timer = setTimeout(() => set(false), 1400);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			io.disconnect();
			clearTimeout(timer);
			delete html.dataset.tourbar;
			delete html.dataset.tourpage;
		};
	}, [mobile]);
	return /* @__PURE__ */ jsxs("aside", {
		className: "tour-bar",
		"data-on": show,
		"aria-label": "Cotizar esta experiencia por WhatsApp",
		inert: !show,
		children: [/* @__PURE__ */ jsx("p", {
			className: "tour-bar-name",
			children: name
		}), /* @__PURE__ */ jsxs("a", {
			className: "button tour-bar-cta",
			href: whatsapp(name),
			target: "_blank",
			rel: "noopener noreferrer",
			children: ["Cotizar por WhatsApp", /* @__PURE__ */ jsx(Arrow, {})]
		})]
	});
}
//#endregion
//#region src/pages/Tour.jsx
function Story({ tour }) {
	const ref = useRef(null);
	const [active, setActive] = useState(0);
	const short = useMedia("(max-height: 600px)", true), light = useLightMotion(), staticMode = short || light;
	useEffect(() => {
		if (staticMode) return;
		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const el = ref.current;
				if (!el) return;
				const r = el.getBoundingClientRect();
				const top = parseFloat(getComputedStyle(el.querySelector(".story-inner")).top) || 0;
				const p = Math.max(0, Math.min(.999, (top - r.top) / (el.offsetHeight - el.querySelector(".story-inner").offsetHeight)));
				setActive(Math.floor(p * 3));
				el.style.setProperty("--story-progress", p);
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
	}, [staticMode]);
	return /* @__PURE__ */ jsx("section", {
		ref,
		"data-tn": "0",
		className: `story mood-${tour.mood} ${staticMode ? "story-static" : ""}`,
		"aria-label": `Un recorrido por ${tour.name}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "story-inner",
			children: [/* @__PURE__ */ jsx("div", {
				className: "story-images",
				"aria-hidden": "true",
				children: tour.moments.map((_, i) => /* @__PURE__ */ jsx(Picture, {
					photo: tour.images[Math.min(i + 1, tour.images.length - 1)],
					alt: "",
					className: active === i ? "active" : ""
				}, i))
			}), /* @__PURE__ */ jsxs("div", {
				className: "story-content",
				children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: tour.name }),
					/* @__PURE__ */ jsx("div", {
						className: "story-articles",
						children: tour.moments.map((title, i) => /* @__PURE__ */ jsxs("article", {
							className: active === i ? "active" : "",
							children: [
								staticMode && /* @__PURE__ */ jsx(Picture, {
									photo: tour.images[Math.min(i + 1, tour.images.length - 1)],
									alt: `${tour.name}, capítulo ${i + 1}`,
									className: "chapter-photo"
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "chapter",
									children: ["0", i + 1]
								}),
								/* @__PURE__ */ jsx("h2", { children: title }),
								/* @__PURE__ */ jsx("p", { children: tour.stories[i] })
							]
						}, title))
					}),
					!staticMode && /* @__PURE__ */ jsx("div", {
						className: "chapter-controls",
						"aria-label": "Elegir capítulo",
						children: tour.moments.map((title, i) => /* @__PURE__ */ jsx("button", {
							"aria-label": `Capítulo ${i + 1}: ${title}`,
							"aria-pressed": active === i,
							onClick: () => {
								const el = ref.current;
								const top = window.scrollY + el.getBoundingClientRect().top;
								window.scrollTo({
									top: top - (parseFloat(getComputedStyle(el.querySelector(".story-inner")).top) || 0) + (el.offsetHeight - el.querySelector(".story-inner").offsetHeight) * (i / 3 + .02),
									behavior: "instant"
								});
								setActive(i);
							},
							children: String(i + 1).padStart(2, "0")
						}, title))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "story-meter",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("i", {})
					}),
					/* @__PURE__ */ jsx("span", {
						className: "story-hint",
						children: staticMode ? "A tu ritmo" : /* @__PURE__ */ jsxs(Fragment, { children: ["Desliza para seguir la historia ", /* @__PURE__ */ jsx(Arrow, { dir: "down" })] })
					})
				]
			})]
		})
	});
}
var ORGANIZAR = {
	id: "organizar",
	q: "¿Cómo organizamos la experiencia?",
	a: "Coordinamos el transporte privado y el recorrido contigo. La propuesta confirma las paradas, el acompañamiento, los horarios y el valor antes de contratar."
};
function Tour() {
	const { slug } = useParams();
	const tour = tours.find((t) => t.slug === slug);
	usePageMeta(tour?.name, tour?.description);
	const page = useRef(null);
	useTourReveal(page, slug);
	if (!tour) return /* @__PURE__ */ jsx(NotFound, {});
	const faq = [ORGANIZAR, ...slug === "traslados-aeropuerto-jmc" ? FAQ_TRANSFER : FAQ_TOUR], duracion = DURACIONES[slug];
	return /* @__PURE__ */ jsxs("div", {
		ref: page,
		className: `tour-page mood-${tour.mood}`,
		children: [
			/* @__PURE__ */ jsx(TourRoute, {}),
			/* @__PURE__ */ jsx(TourHero, { tour }),
			/* @__PURE__ */ jsx(Marquee, { text: tour.name.toLocaleUpperCase("es") }),
			/* @__PURE__ */ jsx(TourNav, {}),
			/* @__PURE__ */ jsxs("section", {
				id: "esencia",
				"data-tn": "0",
				className: "tour-intro tp-band wrap",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "ti-l",
					children: [/* @__PURE__ */ jsx(Eyebrow, { children: "El espíritu del recorrido" }), /* @__PURE__ */ jsx("h2", {
						"data-tr": true,
						children: tour.title
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "ti-r",
					children: [
						/* @__PURE__ */ jsx("p", {
							"data-tr": true,
							children: tour.description
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "trip-facts",
							"data-tr": true,
							children: [
								/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx(Icon$1, {
									name: "mapPin",
									size: 20,
									draw: true
								}), "Salida coordinada en Medellín"] }),
								/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx(Icon$1, {
									name: "clock",
									size: 20,
									draw: true
								}), "Consulta fechas y disponibilidad"] }),
								/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx(Icon$1, {
									name: "users",
									size: 20,
									draw: true
								}), "Propuesta para tu grupo"] })
							]
						}),
						duracion && /* @__PURE__ */ jsxs("div", {
							className: "tour-duration",
							"data-tr": true,
							children: [/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx(Icon$1, {
								name: "clock",
								size: 20,
								draw: true
							}), /* @__PURE__ */ jsxs("span", { children: [
								/* @__PURE__ */ jsx("b", { children: "Duración y salida:" }),
								" ",
								duracion
							] })] }), /* @__PURE__ */ jsx("small", { children: "Los horarios pueden modificarse dependiendo del lugar de recogida, tráfico, condiciones climáticas e itinerario." })]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(Trust, {}),
			/* @__PURE__ */ jsx(TourDetails, { slug: tour.slug }),
			/* @__PURE__ */ jsx(Story, { tour }),
			/* @__PURE__ */ jsx("div", {
				id: "fotos",
				"data-tn": "1",
				children: /* @__PURE__ */ jsx(TourArchive, { tour })
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "prepare tp-band wrap",
				id: "preparar",
				"data-tn": "2",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "Pequeños detalles, mejor viaje" }),
					/* @__PURE__ */ jsxs("h2", {
						"data-tr": true,
						children: [
							"Ven con ganas.",
							/* @__PURE__ */ jsx("br", {}),
							"Lo demás, ",
							/* @__PURE__ */ jsx("em", { children: "planeémoslo." })
						]
					}),
					/* @__PURE__ */ jsx("p", { children: tour.advice }),
					tour_info_default[tour.slug]?.recomendaciones.length > 0 && /* @__PURE__ */ jsx("ul", {
						className: "td-tips",
						role: "list",
						"data-tr": true,
						children: tour_info_default[tour.slug].recomendaciones.map((t) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx(Icon$1, {
							name: "check",
							size: 18,
							draw: true
						}), t] }, t))
					})
				] }), /* @__PURE__ */ jsx(Faq, {
					items: faq,
					headingLevel: 3,
					title: "Preguntas frecuentes",
					eyebrow: "Resolvemos tus dudas",
					className: "faq-in"
				})]
			}),
			/* @__PURE__ */ jsx(QuoteSection, { context: tour.name }),
			/* @__PURE__ */ jsx(Reviews, {}),
			/* @__PURE__ */ jsxs("section", {
				className: "wrap section tp-band",
				"data-tr": true,
				children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "El viaje puede continuar" }),
					/* @__PURE__ */ jsxs("h2", { children: [
						"Otros caminos",
						/* @__PURE__ */ jsx("br", {}),
						"por ",
						/* @__PURE__ */ jsx("em", { children: "descubrir." })
					] }),
					/* @__PURE__ */ jsx(Rail, {
						label: "Más experiencias",
						children: tours.filter((t) => t.slug !== slug).sort((a, b) => Number(b.category === tour.category) - Number(a.category === tour.category)).slice(0, 6).map((t) => /* @__PURE__ */ jsx(TourCard, { tour: t }, t.slug))
					})
				]
			}),
			/* @__PURE__ */ jsx(TourBar, { name: tour.name })
		]
	});
}
//#endregion
export { Tour as default };
