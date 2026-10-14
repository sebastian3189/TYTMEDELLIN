import { A as usePageMeta, C as useMounted, F as jsx, I as jsxs, P as Fragment, R as whatsapp, S as useMedia, T as watchScroll, c as Eyebrow, d as QuoteSection, f as Rail, h as Arrow, j as Icon$1, p as TourCard, r as tours, u as Picture, v as Marquee, w as docTop, x as useLightMotion, y as Trust } from "../entry-server.js";
import NotFound from "./NotFound-DTLybyfR.js";
import { a as TourHeroVideo, n as useGlassPill, o as tourEntry, t as GlassPill } from "./glass-ndxeIHtl.js";
import { t as FeaturedGallery } from "./FeaturedGallery-v6rDM-IO.js";
import { t as Reviews } from "./Reviews-Cp4j-Pnr.js";
import { l as Faq, o as FAQ_TOUR, s as FAQ_TRANSFER, t as DURACIONES } from "./faq-data-DaJGWog5.js";
import { i as smallCaps, n as placeLugar, r as placePhotos, t as clamp } from "./mobile-motion-o2zoinXe.js";
import { useParams } from "react-router-dom";
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
		const items = [...node.querySelectorAll("li")];
		let top = 0, h = 1, last = -1, lit = -1;
		const stop = watchScroll({
			el: node,
			margin: 0,
			measure: () => {
				top = docTop(node);
				h = node.offsetHeight || 1;
			},
			update: (y, vh) => {
				const p = Math.round(Math.min(1, Math.max(0, (y + vh * .7 - top) / h)) * 500) / 500;
				if (p === last) return;
				last = p;
				node.style.setProperty("--rp", p.toFixed(3));
				const n = items.filter((_, i, all) => p >= i / all.length - .02).length;
				if (n !== lit) {
					lit = n;
					items.forEach((li, i) => li.toggleAttribute("data-on", i < n));
				}
			}
		});
		return () => {
			stop();
			node.style.removeProperty("--rp");
			items.forEach((li) => li.removeAttribute("data-on"));
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
var VISIBLE = 4;
var MAX = 12;
var ROT = [
	-1,
	2.6,
	-2.4,
	3.4
];
var pose = (k) => {
	const j = Math.min(k, 3);
	return `translate3d(${j * 12}px,${-j * 14}px,0) rotate(${ROT[j]}deg) scale(${(1 - j * .05).toFixed(3)})`;
};
var two = (n) => String(n).padStart(2, "0");
function TourHero({ tour }) {
	const light = useLightMotion();
	const photos = [tour.hero, ...tour.gallery.filter((g) => g.src !== tour.hero.src)].slice(0, MAX), n = photos.length;
	const [cur, setCur] = useState(0), [flying, setFlying] = useState(-1), [live, setLive] = useState(""), [viewer, setViewer] = useState(false);
	const stage = useRef(null), els = useRef([]), dlg = useRef(null), busy = useRef(false), drag = useRef(null), raf = useRef(0), tilt = useRef(0), side = useRef(1), moved = useRef(false), curRef = useRef(0);
	curRef.current = cur;
	useEffect(() => {
		[
			1,
			2,
			3
		].forEach((d) => {
			const p = photos[(cur + d) % n];
			if (!p) return;
			const im = new Image();
			im.decoding = "async";
			im.srcset = p.srcset || `${p.small} 640w, ${p.src} ${p.width}w`;
			im.sizes = "440px";
			im.src = p.src;
			im.decode?.().catch(() => {});
		});
	}, [cur, n]);
	const go = useCallback((dir, from, sd) => {
		if (busy.current || n < 2) return;
		const c = curRef.current, announce = (i) => setLive(`Foto ${i + 1} de ${n}, ${tour.name}`);
		if (light || !stage.current?.animate) {
			const i = (c + dir + n) % n;
			setCur(i);
			announce(i);
			return;
		}
		busy.current = true;
		const W = stage.current.offsetWidth || 360, s = sd || (side.current = -side.current);
		const flown = `translate3d(${s * W * .85}px,-34px,0) rotateZ(${s * 17}deg) rotateY(${-s * 18}deg)`;
		if (dir > 0) {
			const el = els.current[c], next = (c + 1) % n, fromT = from || getComputedStyle(el).transform;
			setFlying(c);
			setCur(next);
			announce(next);
			const a1 = el.animate([{
				transform: fromT,
				opacity: 1
			}, {
				transform: flown,
				opacity: .92
			}], {
				duration: 430,
				easing: "cubic-bezier(.25,.7,.3,1)",
				fill: "forwards"
			});
			a1.finished.then(() => {
				setFlying(-1);
				const k = n - 1;
				const a2 = el.animate([{
					transform: flown,
					opacity: .92
				}, {
					transform: pose(k),
					opacity: k < VISIBLE ? 1 : 0
				}], {
					duration: 480,
					easing: "cubic-bezier(.34,1.3,.5,1)",
					fill: "forwards"
				});
				return a2.finished.then(() => {
					a1.cancel();
					a2.cancel();
					busy.current = false;
				});
			}).catch(() => {
				busy.current = false;
			});
		} else {
			const prev = (c - 1 + n) % n, el = els.current[prev];
			setFlying(prev);
			setCur(prev);
			announce(prev);
			const a = el.animate([{
				transform: from || flown,
				opacity: .92
			}, {
				transform: pose(0),
				opacity: 1
			}], {
				duration: 520,
				easing: "cubic-bezier(.34,1.25,.5,1)",
				fill: "forwards"
			});
			a.finished.then(() => {
				a.cancel();
				setFlying(-1);
				busy.current = false;
			}).catch(() => {
				busy.current = false;
			});
		}
	}, [
		light,
		n,
		tour.name
	]);
	const paintDrag = () => {
		raf.current = 0;
		const d = drag.current, el = els.current[curRef.current];
		if (!d || !el) return;
		el.style.transition = "none";
		el.style.transform = `translate3d(${d.dx}px,${(d.dy * .25).toFixed(1)}px,0) rotate(${(-1 + d.dx * .06).toFixed(2)}deg) rotateY(${(-d.dx * .05).toFixed(2)}deg)`;
	};
	const onDown = (e) => {
		if (busy.current || e.pointerType === "mouse" && e.button !== 0) return;
		drag.current = {
			x: e.clientX,
			y: e.clientY,
			dx: 0,
			dy: 0,
			vx: 0,
			lx: e.clientX,
			lt: performance.now()
		};
		moved.current = false;
		e.currentTarget.setPointerCapture?.(e.pointerId);
	};
	const onMove = (e) => {
		const d = drag.current;
		if (!d) return;
		d.dx = e.clientX - d.x;
		d.dy = e.clientY - d.y;
		const now = performance.now();
		if (now - d.lt > 16) {
			d.vx = (e.clientX - d.lx) / (now - d.lt);
			d.lx = e.clientX;
			d.lt = now;
		}
		if (Math.abs(d.dx) > 6) moved.current = true;
		if (!raf.current) raf.current = requestAnimationFrame(paintDrag);
	};
	const onUp = (e) => {
		const d = drag.current;
		drag.current = null;
		cancelAnimationFrame(raf.current);
		raf.current = 0;
		if (!d) return;
		const el = els.current[curRef.current];
		if (moved.current && el) {
			if (Math.abs(d.dx) > 80 || Math.abs(d.vx) > .55) {
				const sd = (d.dx || d.vx) > 0 ? 1 : -1;
				side.current = -sd;
				go(1, getComputedStyle(el).transform, sd);
			} else {
				el.style.transition = "";
				el.style.transform = pose(0);
			}
		}
		e.currentTarget.releasePointerCapture?.(e.pointerId);
	};
	const onHover = (e) => {
		if (light || e.pointerType !== "mouse" || drag.current || !stage.current) return;
		const r = stage.current.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
		cancelAnimationFrame(tilt.current);
		tilt.current = requestAnimationFrame(() => {
			if (stage.current) stage.current.style.transform = `perspective(1100px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
		});
	};
	const onLeave = () => {
		cancelAnimationFrame(tilt.current);
		if (stage.current) stage.current.style.transform = "";
	};
	const open = () => {
		setViewer(true);
		requestAnimationFrame(() => dlg.current?.showModal());
	};
	const onKey = (e) => {
		if (e.key === "ArrowRight") {
			e.preventDefault();
			go(1);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			go(-1);
		} else if (e.key === "Enter") {
			e.preventDefault();
			open();
		}
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "cs wrap",
		"aria-label": tour.name,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "cs-text",
				children: [
					/* @__PURE__ */ jsxs(Eyebrow, { children: [tour.category, " · Desde Medellín"] }),
					/* @__PURE__ */ jsx("h2", { children: tour.name }),
					/* @__PURE__ */ jsx("p", { children: tour.title }),
					/* @__PURE__ */ jsxs("a", {
						className: "button",
						href: "#consulta",
						children: ["Planea esta experiencia ", /* @__PURE__ */ jsx(Arrow, {})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "cs-wrap",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "cs-region",
						role: "region",
						"aria-roledescription": "carrusel",
						"aria-label": `Fotografías de ${tour.name}`,
						tabIndex: 0,
						onKeyDown: onKey,
						onPointerMove: onHover,
						onPointerLeave: onLeave,
						children: /* @__PURE__ */ jsx("div", {
							ref: stage,
							className: "cs-stage",
							"data-light": light ? "true" : "false",
							children: photos.map((p, i) => {
								const k = (i - cur + n) % n, top = k === 0;
								return /* @__PURE__ */ jsx("div", {
									ref: (el) => {
										els.current[i] = el;
									},
									className: `cs-card${top ? " is-top" : ""}`,
									"aria-hidden": top ? void 0 : "true",
									style: {
										transform: pose(k),
										opacity: light ? top ? 1 : 0 : k < VISIBLE ? 1 : 0,
										zIndex: i === flying ? 40 : 30 - k,
										transitionDelay: `${Math.min(k, 4) * 45}ms`
									},
									onPointerDown: top ? onDown : void 0,
									onPointerMove: top ? onMove : void 0,
									onPointerUp: top ? onUp : void 0,
									onPointerCancel: top ? onUp : void 0,
									onClick: top ? () => {
										if (moved.current) {
											moved.current = false;
											return;
										}
										go(1);
									} : void 0,
									onDoubleClick: top ? open : void 0,
									children: /* @__PURE__ */ jsx(Picture, {
										photo: p,
										alt: top ? `${tour.name}, fotografía ${i + 1} de ${n}` : "",
										priority: false,
										sizes: "(max-width: 700px) 72vw, 440px"
									})
								}, p.src);
							})
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "cs-foot",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "cs-count",
								"aria-hidden": "true",
								children: [
									two(cur + 1),
									" / ",
									two(n)
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "cs-bar",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("i", { style: { transform: `scaleX(${(cur + 1) / n})` } })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "cs-btns",
								children: [
									/* @__PURE__ */ jsx("button", {
										type: "button",
										"aria-label": "Fotografía anterior",
										onClick: () => go(-1),
										children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										"aria-label": "Fotografía siguiente",
										onClick: () => go(1),
										children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										className: "cs-zoom",
										onClick: open,
										children: "Ampliar"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "sr-only",
						"aria-live": "polite",
						children: live
					})
				]
			}),
			viewer && /* @__PURE__ */ jsxs("dialog", {
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
						src: photos[cur].src,
						srcSet: photos[cur].srcset || `${photos[cur].small} 640w, ${photos[cur].src} ${photos[cur].width}w`,
						sizes: "90vw",
						alt: `${tour.name}, fotografía ${cur + 1}`
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "ta-dlg-nav",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Fotografía anterior",
							onClick: () => setCur((c) => (c - 1 + n) % n),
							children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Fotografía siguiente",
							onClick: () => setCur((c) => (c + 1) % n),
							children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
						})]
					})
				]
			})
		]
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
		let start = 0, end = 1, last = -1, bw = 0;
		const fill = bar.current?.firstElementChild, dot = bar.current?.lastElementChild;
		return watchScroll({
			measure: () => {
				const stop = document.getElementById("consulta");
				if (stop && sentinel.current) {
					start = docTop(sentinel.current);
					end = docTop(stop);
				}
				bw = bar.current?.clientWidth || 0;
				last = -1;
			},
			update: (y, vh) => {
				const p = Math.round(clamp((y + vh * .5 - start) / Math.max(1, end - start)) * 500) / 500;
				if (p === last) return;
				last = p;
				if (fill) fill.style.transform = `scaleX(${p})`;
				if (dot) dot.style.transform = `translate3d(${(p * (bw - 6)).toFixed(1)}px,0,0)`;
			}
		});
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
		const done = route.querySelector(".tr-done"), dot = route.querySelector(".tr-dot");
		let pageTop = 0, top = 0, len = 1, last = -1;
		const measure = () => {
			const sent = document.querySelector(".tn-sentinel"), nav = document.querySelector(".tn"), end = document.getElementById("consulta");
			if (!sent || !nav || !end) return;
			pageTop = docTop(page);
			top = docTop(sent) + 1 + nav.offsetHeight - pageTop;
			len = Math.max(1, docTop(end) - pageTop - top);
			route.style.top = `${top}px`;
			route.style.height = `${len}px`;
			last = -1;
		};
		const paint = (p) => {
			done.style.transform = `scaleY(${p.toFixed(4)})`;
			dot.style.transform = `translate3d(0,${(p * (len - 10)).toFixed(1)}px,0)`;
			route.dataset.end = p > .995 ? "true" : "false";
		};
		if (light) {
			measure();
			route.style.setProperty("--rp", "1");
			route.dataset.end = "true";
			const ro0 = new ResizeObserver(measure);
			ro0.observe(page);
			return () => ro0.disconnect();
		}
		return watchScroll({
			measure,
			update: (y, vh) => {
				const p = Math.round(clamp((y + vh * .55 - pageTop - top) / len) * 1e3) / 1e3;
				if (p === last) return;
				last = p;
				paint(p);
			}
		});
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
		let last = scrollY, timer = 0, formVisible = false, shown = false;
		html.dataset.tourpage = "1";
		const set = (value) => {
			if (value === shown) return;
			shown = value;
			setShow(value);
			html.dataset.tourbar = value ? "on" : "off";
		};
		const form = document.getElementById("consulta");
		const io = new IntersectionObserver(([entry]) => {
			formVisible = entry.isIntersecting;
			if (formVisible) set(false);
		}, { rootMargin: "0px 0px -10% 0px" });
		if (form) io.observe(form);
		const onScroll = (y) => {
			const dy = y - last;
			last = y;
			if (formVisible) {
				set(false);
				return;
			}
			if (dy > 8 && y > 240) set(true);
			else if (dy < -8) set(false);
			if (shown) {
				clearTimeout(timer);
				timer = setTimeout(() => set(false), 1400);
			}
		};
		const stop = watchScroll({ update: onScroll });
		return () => {
			stop();
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
		const el = ref.current, inner = el.querySelector(".story-inner"), meter = el.querySelector(".story-meter i");
		let top = 0, total = 1, stick = 0, cur = -1, last = -1;
		return watchScroll({
			el,
			margin: 0,
			measure: () => {
				top = docTop(el);
				total = Math.max(1, el.offsetHeight - inner.offsetHeight);
				stick = parseFloat(getComputedStyle(inner).top) || 0;
			},
			update: (y) => {
				const p = Math.max(0, Math.min(.999, (stick - (top - y)) / total)), idx = Math.floor(p * 3);
				if (idx !== cur) {
					cur = idx;
					setActive(idx);
				}
				const q = Math.round(p * 1e3) / 1e3;
				if (q !== last) {
					last = q;
					if (meter) meter.style.transform = `scaleX(${q})`;
				}
			}
		});
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
			/* @__PURE__ */ jsx(TourHeroVideo, { tour }),
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
