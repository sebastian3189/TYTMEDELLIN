import { B as jsxs, C as useLightMotion, D as watchScroll, E as docTop, F as Icon$1, H as whatsapp, M as usePageMeta, R as Fragment, T as useMounted, U as language, W as t, _ as Arrow, b as Marquee, f as Picture, h as TourCard, m as Rail, p as QuoteSection, r as tours, u as Eyebrow, w as useMedia, x as Trust, z as jsx } from "../entry-server.js";
import NotFound from "./NotFound-DqRFEl7f.js";
import { n as useGlassPill, t as GlassPill } from "./glass-BONCV8ov.js";
import { i as tourEntry, r as TourHeroVideo } from "./Hero-CwPycoWY.js";
import { t as FeaturedGallery } from "./FeaturedGallery-D5J1cQPt.js";
import { t as Reviews } from "./Reviews-BiAb3-Ib.js";
import { l as Faq, o as FAQ_TOUR, s as FAQ_TRANSFER, t as DURACIONES } from "./faq-data-CXHnHuQT.js";
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
		"recomendaciones": ["Comparte tu número de vuelo para coordinar la recogida. Confirma con el equipo el punto de encuentro y cualquier cambio de horario.", "Deja margen para el traslado al aeropuerto y confirma la hora de recogida según tu vuelo."],
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
		"recomendaciones": ["Pregunta a tu guía por el mural que más te llame la atención: cada grafiti de la Comuna 13 cuenta una historia distinta.", "Lleva la cámara con espacio disponible para fotografiar las escaleras eléctricas y el arte urbano de la Comuna 13."],
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
		"recomendaciones": ["Si tu pasaporte incluye zonas acuáticas, lleva ropa para mojar y una muda de cambio. Confirma las atracciones disponibles para tu visita.", "Planea el día completo sin prisa: entre animales y atracciones no alcanza a verse todo en pocas horas."],
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
		"recomendaciones": ["Calzado cerrado y con buen agarre: el sendero hacia la cascada exige tracción, y si te animas con el canopy o la vía ferrata lo necesitas todavía más.", "Lleva ropa de cambio y protección para tus objetos: la lluvia y la humedad de la cascada pueden mojarte durante el recorrido."],
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
		"recomendaciones": ["Camina el Puente de Occidente con calma y reserva tiempo para contemplar el paisaje.", "Consulta el orden de las paradas y deja tiempo para conocer la plaza principal y la iglesia, según el acceso disponible."],
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
	const d = tour_info_default[slug];
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
		}), /* @__PURE__ */ jsx("div", {
			className: "td-grid",
			children: /* @__PURE__ */ jsxs("div", {
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
			})
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
								children: /* @__PURE__ */ jsx("b", { children: smallCaps(t(entry.lugar)) })
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
//#region src/itinerarios-media.json
var itinerarios_media_default = {
	"city-tour-01": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"city-tour-02": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"city-tour-03": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"city-tour-04": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"city-tour-05": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 900
	},
	"city-tour-06": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"city-tour-07": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"city-tour-08": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"city-tour-09": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"guatape-01": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 2133
	},
	"guatape-02": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"guatape-03": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"guatape-04": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"guatape-05": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"guatape-07": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 2133
	},
	"guatape-09": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 2133
	},
	"noche-01": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"noche-02": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"noche-04": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"cafe-01": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"cafe-02": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"cafe-03": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"cafe-04": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"oriente-02": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"oriente-04": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"santa-fe-01": {
		"w": [480, 600],
		"width": 600,
		"height": 600
	},
	"santa-fe-02": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"santa-fe-03": {
		"w": [480, 720],
		"width": 720,
		"height": 540
	},
	"santa-fe-04": {
		"w": [480, 600],
		"width": 600,
		"height": 600
	},
	"santa-fe-05": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 711
	},
	"santa-fe-06": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"napoles-01": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"napoles-04": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"compras-01": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 900
	},
	"salto-01": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"salto-02": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 2133
	},
	"salto-03": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"jardin-01": {
		"w": [
			480,
			800,
			1055
		],
		"width": 1055,
		"height": 523
	},
	"jardin-02": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"jardin-03": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 900
	},
	"jardin-04": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 900
	},
	"jardin-05": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"traslados-03": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	},
	"traslados-04": {
		"w": [
			480,
			800,
			899
		],
		"width": 899,
		"height": 1599
	},
	"salto-04": {
		"w": [
			480,
			800,
			1200
		],
		"width": 1200,
		"height": 1600
	}
};
//#endregion
//#region src/itinerarios.js
var DIR = "/media/itinerarios";
/** Fuentes `srcset` AVIF/WebP de una foto (ids de `itinerarios-media.json`). */
var fotoItinerario = (id) => {
	const m = id && itinerarios_media_default[id];
	if (!m) return null;
	const set = (ext) => m.w.map((w) => `${DIR}/${id}-${w}.${ext} ${w}w`).join(", ");
	return {
		avif: set("avif"),
		webp: set("webp"),
		src: `${DIR}/${id}-${m.width}.webp`,
		width: m.width,
		height: m.height
	};
};
var p = (orden, titulo_corto, ubicacion, descripcion, en_la_visita, imagen, alt, extra = {}) => ({
	orden,
	titulo_corto,
	ubicacion,
	descripcion,
	en_la_visita,
	imagen,
	alt,
	foco: "50% 50%",
	estado_parada: "confirmada",
	etiquetas: [],
	nota_ingreso: null,
	duracion_aproximada: null,
	...extra
});
var AVISO_SUGERIDO = "Itinerario sugerido, sujeto a confirmación operativa";
var itinerarios = {
	"city-tour-comuna-13": {
		corto: "City Tour",
		tituloSeccion: null,
		aviso: null,
		estado: "confirmada",
		paradas: [
			p(1, "Recordar para transformar", "Parque Memorial Inflexión", "Comenzamos con la memoria de Medellín. En el Parque Memorial Inflexión conocemos una parte fundamental de su historia y cómo la ciudad ha trabajado para transformar su pasado.", "Espacio de memoria, explicación histórica, fotografías respetuosas y reflexión.", "city-tour-01", "Visitantes frente a un muro de piedra oscura con la frase «Somos lo que dejamos a los demás» y una torre de apartamentos al fondo", { foco: "50% 70%" }),
			p(2, "El corazón administrativo", "La Alpujarra", "Recorremos el centro administrativo de Medellín, donde se encuentran importantes edificios públicos y espacios representativos de la vida de la ciudad.", "Entorno de la Gobernación, Alcaldía y Plaza de la Libertad; fotografías exteriores.", "city-tour-02", "Grupo de viajeros frente al edificio de la Gobernación de Antioquia en La Alpujarra, con las banderas de Antioquia, Colombia y Medellín", { foco: "50% 55%" }),
			p(3, "Una ciudad que se ilumina", "Parque de las Luces", "Descubrimos la Plaza Cisneros y sus famosas columnas luminosas, símbolo de la renovación de espacios urbanos en Medellín.", "Plaza, columnas y contexto de transformación del centro.", "city-tour-03", "Bosque de columnas de luz de la Plaza Cisneros, con un grupo de viajeros posando en la plaza", { foco: "50% 40%" }),
			p(4, "Arte en el centro", "Plaza Botero", "Entre esculturas monumentales y arquitectura emblemática, conocemos una de las plazas más reconocidas del centro de Medellín.", "Esculturas, exterior del Palacio de la Cultura y fotografías. Entrada a museos no incluida salvo confirmación.", "city-tour-04", "Escultura reclinada de Fernando Botero frente a la fachada de piedra a cuadros del Palacio de la Cultura", {
				estado_parada: "por_confirmar",
				nota_ingreso: "Ingreso no incluido",
				foco: "50% 60%"
			}),
			p(5, "Tradición paisa", "Pueblito Paisa", "Subimos al Cerro Nutibara para descubrir una réplica de un pueblo antioqueño, sus calles tradicionales y una hermosa panorámica de Medellín.", "Iglesia, plaza, fachadas, mirador y artesanías.", "city-tour-05", "Viajeros en la plaza empedrada del Pueblito Paisa, con la iglesia blanca y las fachadas de balcones coloridos al fondo", { foco: "50% 50%" }),
			p(6, "Medellín desde el aire", "Metro y Metrocable", "Vivimos de cerca el sistema de transporte que conecta diferentes sectores de Medellín y disfrutamos de una perspectiva diferente de sus barrios y montañas.", "Trayecto de Metro/Metrocable según línea y accesos acordados. Consulta en tu cotización si los pasajes están incluidos.", "city-tour-06", "Viajeros dentro de una cabina del Metrocable con las montañas de Medellín al fondo", { foco: "50% 55%" }),
			p(7, "Colores que cuentan historias", "Comuna 13", "Nos adentramos en una comunidad que convirtió el arte urbano en una poderosa expresión de identidad, creatividad y transformación.", "Murales y relatos de la comuna.", "city-tour-07", "Mural de un rostro de mujer con un colibrí en una calle de la Comuna 13", { foco: "35% 40%" }),
			p(8, "Subir para descubrir", "Escaleras eléctricas de Comuna 13", "Recorremos las famosas escaleras eléctricas al aire libre, uno de los referentes de accesibilidad y renovación urbana de la zona.", "Escaleras, paisajes del barrio y fotografías.", "city-tour-08", "Grupo de viajeros subiendo por las escaleras eléctricas techadas de la Comuna 13", { foco: "50% 45%" }),
			p(9, "Talento de barrio", "Arte y miradores de Comuna 13", "Terminamos con el talento local: música, expresiones artísticas, emprendimientos y vistas que hacen única la experiencia en la Comuna 13.", "Galerías, emprendimientos y posibles presentaciones según disponibilidad; no se garantiza un espectáculo específico.", "city-tour-09", "Mirador de la Comuna 13 con el letrero «Medellín Comuna 13» y la ciudad al fondo", { foco: "50% 30%" })
		]
	},
	"guatape-piedra-del-penol": {
		corto: "Guatapé",
		tituloSeccion: null,
		aviso: null,
		estado: "confirmada",
		paradas: [
			p(1, "Nuestro primer encuentro con el campo", "Alto del Chocho", "Hacemos una parada para conectar con el paisaje rural del Oriente antioqueño, conocer animales de granja y descubrir sabores típicos de la región.", "Animales, fotografías y alimentos opcionales. Confirmar condiciones de acceso.", "guatape-01", "Alpacas y llamas en el patio de tierra del Alto del Chocho, bajo una gran estructura de madera", { foco: "50% 55%" }),
			p(2, "Un pueblo lleno de memoria", "Réplica del Viejo Peñol", "Conocemos la historia del antiguo Peñol a través de una réplica que conserva el espíritu del pueblo anterior a la construcción del embalse.", "Plaza, fachadas, iglesia y explicación histórica.", "guatape-02", "Viajeros en la plaza frente a la iglesia de torres de ladrillo de la réplica del Viejo Peñol", { foco: "50% 40%" }),
			p(3, "Mirar desde lo alto", "Piedra del Peñol", "La imponente Piedra del Peñol nos recibe con uno de los paisajes más reconocidos de Antioquia. Quienes lo deseen podrán realizar el ascenso para contemplar el embalse desde arriba.", "Base, fotos y ascenso opcional. El ingreso/subida se paga aparte si no figura incluido.", "guatape-03", "La Piedra del Peñol completa vista desde su base, con la escalera que la recorre", {
				nota_ingreso: "Ingreso no incluido",
				foco: "50% 35%"
			}),
			p(4, "Postales de colores", "Calle de los Recuerdos", "Caminamos por las calles llenas de color que narran costumbres, tradiciones y momentos de la vida del municipio.", "Zócalos, arquitectura local, fotos.", "guatape-04", "Fachada de Guatapé con zócalos de colores y balcones con flores, frente a un grupo de viajeros", { foco: "50% 35%" }),
			p(5, "Bajo un cielo de sombrillas", "Calle de las Sombrillas", "Una de las paradas más fotogénicas del recorrido: colores, detalles artesanales y rincones que invitan a llevarse un recuerdo de Guatapé.", "Recorrido corto y fotografías.", "guatape-05", "Calle empedrada de Guatapé cubierta por sombrillas de colores, con una viajera caminando", { foco: "50% 30%" }),
			p(6, "El corazón de Guatapé", "Parque Principal y Parroquia", "Llegamos al corazón del municipio, donde la vida local, la arquitectura y la tradición se reúnen alrededor de su parque principal.", "Plaza, iglesia (ingreso según apertura), comercio local.", null, null),
			p(7, "La esencia de los zócalos", "Plazoleta de los Zócalos", "Los zócalos cuentan historias en cada fachada. En esta plazoleta descubrimos por qué el color es parte de la identidad de Guatapé.", "Plazoleta, arte, fotos y artesanías.", "guatape-07", "Fachada de zócalos coloridos con balcones y una escalera de entrada en Guatapé", { foco: "50% 55%" }),
			p(8, "Frente al agua", "Malecón de Guatapé", "Cerramos el recorrido urbano frente al embalse, disfrutando del paisaje, el aire fresco y el ambiente turístico del malecón.", "Paseo, paisaje y fotografías.", null, null),
			p(9, "Navegar el paisaje", "Paseo en lancha", "Para quienes desean añadir otra perspectiva, existe la opción de navegar el embalse y admirar desde el agua sus islas y montañas.", "Paseo en embarcación opcional; se contrata por separado y no está incluido por defecto.", "guatape-09", "Lancha avanzando por el embalse de Guatapé, con la Piedra del Peñol a lo lejos", {
				estado_parada: "opcional",
				foco: "50% 50%"
			})
		]
	},
	"tour-nocturno-medellin": {
		corto: "Medellín de Noche",
		tituloSeccion: null,
		aviso: null,
		estado: "confirmada",
		paradas: [
			p(1, "Medellín se enciende", "Mirador Octava Maravilla", "Comenzamos contemplando las luces de Medellín desde un mirador que revela la belleza del Valle de Aburrá al anochecer.", "Panorámica, fotografías; consumo gastronómico opcional.", "noche-01", "Letrero luminoso «La Octava Maravilla» en el mirador de noche, con las luces de la ciudad al fondo", { foco: "50% 50%" }),
			p(2, "La energía de Provenza", "Provenza", "Descubrimos el ambiente gastronómico y cultural de Provenza, entre restaurantes, luces y espacios llenos de vida.", "Caminata y tiempo libre; consumos no incluidos salvo acuerdo.", "noche-02", "Grupo de viajeros bajo el arco iluminado «Medellín · Provenza» por la noche", { foco: "50% 55%" }),
			p(3, "Un clásico de El Poblado", "Parque Lleras", "Continuamos por uno de los sectores más conocidos de El Poblado para apreciar el movimiento y el ambiente nocturno de Medellín.", "Caminata y fotografías en zonas acordadas según las necesidades y preferencias de tu grupo.", null, null),
			p(4, "Sabores para cerrar la noche", "Parada gastronómica", "Terminamos con tiempo para disfrutar la gastronomía local o el espacio de entretenimiento que mejor se ajuste a tu estilo de viaje.", "Cena o consumo opcional y por cuenta del cliente salvo inclusión expresa.", "noche-04", "Viajeros con músicos de una cantina tradicional decorada con colores y artesanías", {
				etiquetas: ["Según elección"],
				foco: "50% 45%"
			})
		]
	},
	"tour-miradores": {
		corto: "Miradores",
		tituloSeccion: null,
		aviso: null,
		estado: "confirmada",
		paradas: [
			p(1, "La ciudad a nuestros pies", "Mirador La Palma", "Desde La Palma apreciamos Medellín desde otra perspectiva: barrios, montañas y la inmensidad del valle.", "Vistas, fotografías y parada contemplativa.", null, null),
			p(2, "Montañas y horizonte", "Cerro El Picacho", "Seguimos hacia un punto privilegiado para observar la geografía del Valle de Aburrá y disfrutar de una de las vistas más representativas de la ciudad.", "Mirador y fotografías, sujeto a acceso y condiciones de seguridad.", null, null),
			p(3, "Sabores con vista", "Parada gastronómica", "Si lo deseas, complementamos el recorrido con una parada para probar sabores locales mientras disfrutamos del ambiente de la montaña.", "Comida y bebidas adicionales, no incluidas por defecto.", null, null, { estado_parada: "opcional" })
		]
	},
	"tour-del-cafe-medellin": {
		corto: "Tour del Café",
		tituloSeccion: null,
		aviso: null,
		estado: "confirmada",
		paradas: [
			p(1, "Bienvenidos a la finca", "Finca cafetera", "Llegamos a una finca donde la tradición cafetera se vive de cerca, rodeados de naturaleza y del aroma del café colombiano.", "Bienvenida e introducción.", "cafe-01", "Dos viajeros con sombrero y delantal cafetero entre la vegetación de la finca", { foco: "50% 40%" }),
			p(2, "Donde nace el café", "Cultivos", "Caminamos entre cultivos para descubrir cómo crece el café y qué hace especiales a los granos de esta región.", "Cultivo y explicación del proceso agrícola.", "cafe-02", "Un caficultor muestra un canasto con granos rojos de café junto a los cafetos", { foco: "60% 50%" }),
			p(3, "Manos a la cosecha", "Recolección", "Conocemos el trabajo detrás de cada cosecha y, cuando las condiciones lo permiten, participamos en una demostración de recolección.", "Demostración o práctica solo si está disponible.", "cafe-03", "Viajeros con delantales y canastos de recolección sobre una ladera de la finca", { foco: "50% 60%" }),
			p(4, "Del fruto al grano", "Beneficio y secado", "Descubrimos cómo el fruto se transforma y cómo cada etapa de beneficio y secado influye en la calidad de la bebida.", "Despulpado, lavado y secado según operación de la finca.", "cafe-04", "Persona rastrillando el café extendido en el secadero de la finca, con las montañas al fondo", { foco: "50% 50%" }),
			p(5, "El aroma de la transformación", "Tostión y molienda", "Exploramos la tostión y la molienda, dos procesos que ayudan a construir los aromas y sabores del café que disfrutamos.", "Demostración o explicación según instalaciones.", null, null),
			p(6, "El momento de saborear", "Cata de café", "Terminamos con una degustación para identificar aromas, sabores y matices del café colombiano.", "Cata según modalidad contratada.", null, null),
			p(7, "Llévate un pedacito de la finca", "Productos cafeteros", "Antes de regresar, puedes conocer los productos de la finca y elegir un recuerdo especial para llevar a casa.", "Compras voluntarias, no incluidas.", null, null)
		]
	},
	"vuelta-a-oriente": {
		corto: "Vuelta a Oriente",
		tituloSeccion: null,
		aviso: AVISO_SUGERIDO,
		estado: "sugerida",
		paradas: [
			p(1, "Tradición entre montañas", "El Retiro", "Descubrimos un municipio conocido por sus calles tradicionales, su ambiente tranquilo y su herencia artesanal.", "Parque, iglesia y espacios artesanales sujetos a apertura.", null, null, { estado_parada: "sugerida" }),
			p(2, "Aire del Oriente", "La Ceja", "Seguimos por el Oriente antioqueño para apreciar sus plazas, tradiciones y la vida cotidiana de sus pueblos.", "Plaza principal, entorno local y fotografías.", "oriente-02", "Letras blancas «La Ceja» en la plaza principal del municipio, con árboles y puestos de turismo al fondo", {
				estado_parada: "sugerida",
				foco: "50% 55%"
			}),
			p(3, "Historia que permanece", "Rionegro", "Caminamos por un municipio lleno de historia y arquitectura que conserva una parte importante del pasado regional.", "Centro histórico, parque y exterior de la catedral.", null, null, { estado_parada: "sugerida" }),
			p(4, "Una dulce tradición", "San Antonio de Pereira", "Cerramos entre calles tradicionales y la famosa cultura de postres de San Antonio de Pereira.", "Plaza, iglesia, postrerías; consumo adicional.", "oriente-04", "Fachada de colores de una postrería de San Antonio de Pereira, con una viajera señalando el letrero", {
				estado_parada: "sugerida",
				foco: "50% 45%"
			}),
			p(5, "Paisajes para recordar", "Parada panorámica", "Aprovechamos el recorrido para detenernos, cuando sea posible, y admirar los paisajes del Oriente antioqueño.", "Fotografías en una parada segura y autorizada; el lugar se confirma al acordar el recorrido.", null, null, {
				estado_parada: "sugerida",
				etiquetas: ["Sujeta a selección"]
			})
		]
	},
	"santa-fe-de-antioquia": {
		corto: "Santa Fe de Antioquia",
		tituloSeccion: null,
		aviso: AVISO_SUGERIDO,
		estado: "sugerida",
		paradas: [
			p(1, "Un viaje al pasado", "Calles coloniales", "Las calles de Santa Fe de Antioquia nos transportan a otra época, entre fachadas coloniales y rincones llenos de historia.", "Recorrido peatonal, fotografías y arquitectura.", "santa-fe-01", "Calle empedrada de Santa Fe de Antioquia entre casas blancas coloniales con puertas verdes", {
				estado_parada: "sugerida",
				foco: "55% 50%"
			}),
			p(2, "El corazón de la ciudad colonial", "Plaza Mayor", "Conocemos la plaza principal, donde se encuentran la vida cotidiana, los sabores y las tradiciones del municipio.", "Parque, comercio y gastronomía.", "santa-fe-02", "Grupo de viajeros en el parque principal de Santa Fe de Antioquia, con la fuente y una iglesia blanca detrás", {
				estado_parada: "sugerida",
				foco: "50% 45%"
			}),
			p(3, "Historia en cada detalle", "Catedral de la Inmaculada Concepción", "Visitamos el entorno de uno de los templos más emblemáticos de Santa Fe de Antioquia y descubrimos su legado arquitectónico.", "Fachada e interior cuando esté abierto.", "santa-fe-03", "Fachada blanca con torre de campanario de la catedral de Santa Fe de Antioquia y la plaza frente a ella", {
				estado_parada: "sugerida",
				foco: "40% 50%"
			}),
			p(4, "Patrimonio que se conserva", "Iglesias y arquitectura histórica", "Continuamos por espacios donde se conservan detalles religiosos y arquitectónicos que cuentan la historia de esta antigua capital antioqueña.", "Exteriores y visitas interiores si están autorizadas.", "santa-fe-04", "Fachada colonial blanca con ventanas de rejas de madera tallada sobre una calle empedrada", {
				estado_parada: "sugerida",
				foco: "30% 50%"
			}),
			p(5, "Un puente con historia", "Puente de Occidente", "Admiramos el histórico Puente de Occidente, una obra de ingeniería suspendida sobre el río Cauca y uno de los símbolos de la región.", "Visita, fotografías y explicación patrimonial, según acceso permitido.", "santa-fe-05", "Vista del Puente de Occidente sobre el río Cauca entre montañas", {
				estado_parada: "sugerida",
				foco: "50% 50%"
			}),
			p(6, "Sabores de la región", "Gastronomía local", "Terminamos con la posibilidad de probar sabores tradicionales y disfrutar del ambiente cálido de Santa Fe de Antioquia.", "Alimentos y bebidas según cotización; no incluidos por defecto.", "santa-fe-06", "Grupo de viajeros almorzando en una larga mesa de un restaurante colonial", {
				estado_parada: "opcional",
				foco: "50% 50%"
			})
		]
	},
	"hacienda-napoles": {
		corto: "Hacienda Nápoles",
		tituloSeccion: "Lo que puedes vivir",
		aviso: "Zonas y atracciones del parque: el acceso depende del pasaporte, la apertura y el tiempo disponible, y no se visitan necesariamente todas en un único día.",
		estado: "sugerida",
		paradas: [
			p(1, "Una aventura prehistórica", "Aventura Jurásica", "Comenzamos descubriendo figuras de dinosaurios y espacios temáticos que despiertan la imaginación de grandes y pequeños.", "Recorrido por atracciones jurásicas autorizadas.", "napoles-01", "Visitante junto a una escultura de dinosaurio en un camino de piedra de Aventura Jurásica", {
				estado_parada: "sugerida",
				foco: "55% 40%"
			}),
			p(2, "La emoción de la fauna", "Sabana Africana", "Conocemos espacios dedicados a la fauna donde podemos observar diferentes especies dentro de las condiciones del parque.", "Observación responsable, sin garantía de ver una especie específica ni de contacto con los animales.", null, null, { estado_parada: "sugerida" }),
			p(3, "Conexión con la naturaleza", "Santuario de fauna", "Exploramos áreas dedicadas al conocimiento y la observación de especies animales, respetando su entorno y las indicaciones del parque.", "Zonas de fauna abiertas y habilitadas.", null, null, { estado_parada: "sugerida" }),
			p(4, "Conocer también es viajar", "Espacios históricos", "La visita también ofrece lugares para conocer el contexto histórico de este sitio y cómo se transformó con el paso del tiempo.", "Museos abiertos y accesibles según pasaporte.", "napoles-04", "Arco de entrada de Hacienda Nápoles con la avioneta histórica sobre el letrero", {
				estado_parada: "sugerida",
				foco: "50% 35%"
			}),
			p(5, "Un momento para refrescarse", "Atracciones acuáticas", "Cuando el pasaporte lo permite, disfrutamos de espacios acuáticos para añadir diversión y descanso a la jornada.", "Atracciones acuáticas sujetas a pasaporte, horarios y seguridad.", null, null, {
				estado_parada: "sugerida",
				etiquetas: ["Según pasaporte"]
			}),
			p(6, "Una pausa para recargar energías", "Zona gastronómica", "Hacemos una pausa para almorzar y continuar disfrutando del día con comodidad.", "Comida solo si está incluida en el servicio contratado; si no, pago adicional.", null, null, { estado_parada: "sugerida" })
		]
	},
	"tour-de-compras": {
		corto: "Tour de Compras",
		tituloSeccion: "Tú eliges dónde comprar",
		aviso: "Posibles destinos personalizables, no un itinerario de visita obligatoria.",
		estado: "sugerida",
		paradas: [
			p(1, "Compras a tu ritmo", "El Hueco", "Explora uno de los sectores comerciales más populares de Medellín, con opciones de ropa, calzado, accesorios y productos para diferentes presupuestos.", "Tiendas según interés del cliente.", "compras-01", "Viajeros brindando en una calle comercial concurrida de El Hueco, con toldos y puestos al fondo", {
				estado_parada: "sugerida",
				foco: "50% 45%"
			}),
			p(2, "Encuentra lo que buscas", "Sector comercial del centro", "Podemos adaptar la ruta para visitar comercios especializados del centro de Medellín de acuerdo con tu lista de compras.", "Establecimientos elegidos previamente.", null, null, { estado_parada: "sugerida" }),
			p(3, "Variedad en un solo lugar", "Centro Comercial Santafé", "Si prefieres la comodidad de un centro comercial, Santafé reúne numerosas tiendas, servicios y opciones gastronómicas.", "Tiendas a elección; compras y consumos propios.", null, null, { estado_parada: "sugerida" }),
			p(4, "Compras y estilo", "Centro Comercial El Tesoro", "Una alternativa para disfrutar de tiendas, restaurantes y una experiencia de compras en un entorno moderno.", "Tiendas según preferencias.", null, null, { estado_parada: "sugerida" }),
			p(5, "Una ruta hecha para ti", "Tiendas especializadas", "También podemos diseñar el recorrido alrededor de tus intereses: moda, textiles, accesorios, artesanías o regalos.", "Paradas acordadas antes del servicio.", null, null, {
				estado_parada: "sugerida",
				etiquetas: ["Personalizable"]
			})
		]
	},
	"jardin-antioquia": {
		corto: "Jardín",
		tituloSeccion: null,
		aviso: AVISO_SUGERIDO,
		estado: "sugerida",
		paradas: [
			p(1, "Un pueblo de Antioquia", "Jardín", "Conocemos la vida de este pueblo de Antioquia entre fachadas de colores, calles tradicionales y cultura cafetera.", null, "jardin-01", "Vista aérea del casco urbano de Jardín, con su iglesia entre los tejados", {
				estado_parada: "sugerida",
				foco: "50% 50%"
			}),
			p(2, "Color y tradición", "Calles de Jardín", "Caminamos sin apuro por sus calles de color: es un pueblo para perderse a pie, no para ver desde el carro.", null, "jardin-02", "Calle de Jardín entre fachadas de colores, con las torres de la basílica al fondo", {
				estado_parada: "sugerida",
				foco: "50% 50%"
			}),
			p(3, "Pueblo patrimonio", "Basílica de Jardín", "Jardín es un pueblo patrimonio, de calles tradicionales que se descubren caminando.", null, "jardin-03", "Basílica de torres gemelas de Jardín frente a su plaza, con un monumento y jardines", {
				estado_parada: "sugerida",
				foco: "40% 50%"
			}),
			p(4, "El color también se pinta", "Murales de Jardín", "Un mural de aves de colores se suma a las fachadas y calles que dan color al pueblo.", null, "jardin-04", "Mural de aves de colores sobre un muro de Jardín", {
				estado_parada: "sugerida",
				foco: "50% 50%"
			}),
			p(5, "Naturaleza y cultura cafetera", "Cultura cafetera", "Pregunta por la cultura cafetera de la zona: es parte central de lo que hace especial a Jardín.", null, "jardin-05", "Taza de café sobre una mesa, con las montañas de la zona cafetera al fondo", {
				estado_parada: "sugerida",
				foco: "50% 50%"
			})
		]
	},
	"traslados-aeropuerto-jmc": {
		corto: "Traslados JMC",
		unidad: "Etapa",
		rotulo: "En el servicio",
		tituloSeccion: "Cómo funciona tu traslado",
		aviso: "Etapas del servicio, no un itinerario de visitas.",
		estado: "confirmada",
		paradas: [
			p(1, "Seguimos tu vuelo", "Antes de que aterrices", "Seguimos el estado de tu vuelo hasta su aterrizaje en Medellín para coordinar tu recogida y estar preparados ante posibles cambios de horario.", "Comparte tu número de vuelo, dirección y número de pasajeros.", null, null),
			p(2, "Tu conductor te contacta", "Antes de la recogida", "Nuestro conductor se comunica previamente y comparte las instrucciones del punto de encuentro, así como sus datos y los del vehículo.", "El punto de encuentro y las condiciones de espera se confirman con el equipo.", null, null),
			p(3, "Te recibimos en el aeropuerto", "Aeropuerto José María Córdova", "Entendemos que pueden presentarse demoras en migración, recogida de equipaje o vuelos, por lo que ofrecemos acompañamiento y flexibilidad en la espera.", "En servicios previamente coordinados podemos ofrecer señalización personalizada con el nombre del pasajero o grupo.", "traslados-03", "Viajera con su maleta junto a la zona de salidas del aeropuerto, con la torre de control al fondo", { foco: "50% 55%" }),
			p(4, "De puerta a puerta", "Hasta tu alojamiento en Medellín", "Coordinamos tu traslado entre el Aeropuerto José María Córdova y tu alojamiento en Medellín.", "Puerta a puerta, con transporte privado.", "traslados-04", "Van blanca y pasajeros junto a la zona de salidas del aeropuerto José María Córdova", { foco: "45% 60%" })
		]
	},
	"salto-del-buey": {
		corto: "Salto del Buey",
		tituloSeccion: null,
		aviso: "Sujeto al operador",
		estado: "sugerida",
		paradas: [
			p(1, "Llegar a la montaña", null, "Comenzamos entre montañas y naturaleza para conocer el entorno de esta aventura.", null, "salto-01", "Tres visitantes con casco en un mirador de montaña, con el Salto del Buey al fondo", {
				estado_parada: "sugerida",
				foco: "50% 50%"
			}),
			p(2, "Caminar entre paisajes", null, "Recorremos los senderos habilitados y descubrimos los paisajes que rodean la cascada.", null, "salto-02", "Familia caminando por un sendero de selva entre raíces y vegetación", {
				estado_parada: "sugerida",
				foco: "50% 50%"
			}),
			p(3, "Contemplar la cascada", null, "Disfrutamos de la imponencia de la cascada y de uno de los grandes escenarios naturales de la región.", null, "salto-03", "El Salto del Buey cayendo entre rocas y vegetación, con una visitante en primer plano", {
				estado_parada: "sugerida",
				foco: "50% 40%"
			}),
			p(4, "Aventura opcional", null, "Según el plan contratado, es posible añadir actividades de aventura con acompañamiento especializado.", null, "salto-04", "Pareja con equipo de seguridad en una plataforma de madera de la actividad de aventura, con las montañas detrás", {
				estado_parada: "opcional",
				foco: "50% 40%"
			})
		]
	}
};
//#endregion
//#region src/ItineraryStory.jsx
var pad = (n) => String(n).padStart(2, "0");
var stopOf = (i, n, unit) => t(unit === "Etapa" ? "Etapa {n} de {total}" : "Parada {n} de {total}").replace("{n}", pad(i)).replace("{total}", pad(n));
var SIZES = "(max-width: 699px) 100vw, (max-width: 999px) 52vw, 58vw";
var Pin = () => /* @__PURE__ */ jsxs("svg", {
	className: "it-pin",
	viewBox: "0 0 24 24",
	width: "16",
	height: "16",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	focusable: "false",
	children: [/* @__PURE__ */ jsx("path", { d: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" }), /* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "10",
		r: "2.3"
	})]
});
function Foto({ stop, eager = false }) {
	const f = fotoItinerario(stop.imagen);
	if (!f) return /* @__PURE__ */ jsxs("div", {
		className: "it-pending",
		role: "img",
		"aria-label": `${t("Foto pendiente")}: ${t(stop.ubicacion || stop.titulo_corto)}`,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "it-pending-ring",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("b", { children: "Foto pendiente" }),
			/* @__PURE__ */ jsx("span", { children: stop.ubicacion || stop.titulo_corto })
		]
	});
	return /* @__PURE__ */ jsxs("picture", { children: [
		/* @__PURE__ */ jsx("source", {
			type: "image/avif",
			srcSet: f.avif,
			sizes: SIZES
		}),
		/* @__PURE__ */ jsx("source", {
			type: "image/webp",
			srcSet: f.webp,
			sizes: SIZES
		}),
		/* @__PURE__ */ jsx("img", {
			src: f.src,
			width: f.width,
			height: f.height,
			alt: stop.alt,
			loading: eager ? "eager" : "lazy",
			decoding: "async",
			style: { objectPosition: stop.foco }
		})
	] });
}
var labelsOf = (s) => [
	s.estado_parada === "opcional" && "Opcional",
	s.estado_parada === "por_confirmar" && "Por confirmar en ruta operativa",
	s.nota_ingreso,
	...s.etiquetas
].filter(Boolean);
function StopText({ s, i, n, corto, unit, rotulo, big }) {
	const labels = labelsOf(s);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("p", {
			className: "it-sub",
			children: [
				stopOf(i + 1, n, unit),
				" · ",
				corto
			]
		}),
		/* @__PURE__ */ jsx("span", {
			className: "it-num",
			"aria-hidden": "true",
			children: pad(i + 1)
		}),
		/* @__PURE__ */ jsx("h3", { children: s.titulo_corto }),
		s.ubicacion && /* @__PURE__ */ jsxs("p", {
			className: "it-place",
			children: [/* @__PURE__ */ jsx(Pin, {}), s.ubicacion]
		}),
		labels.length > 0 && /* @__PURE__ */ jsx("ul", {
			className: "it-tags",
			role: "list",
			children: labels.map((l) => /* @__PURE__ */ jsx("li", { children: l }, l))
		}),
		/* @__PURE__ */ jsx("p", {
			className: "it-desc",
			children: s.descripcion
		}),
		s.en_la_visita && /* @__PURE__ */ jsxs("p", {
			className: "it-visit",
			children: [/* @__PURE__ */ jsx("b", { children: rotulo }), s.en_la_visita]
		}),
		s.duracion_aproximada && /* @__PURE__ */ jsxs("p", {
			className: "it-visit",
			children: [/* @__PURE__ */ jsx("b", { children: "Duración aproximada" }), s.duracion_aproximada]
		}),
		!big && /* @__PURE__ */ jsxs("div", {
			className: "it-count-row",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "it-count",
				children: [
					pad(i + 1),
					" / ",
					pad(n)
				]
			}), /* @__PURE__ */ jsx("span", {
				className: "it-bar",
				children: /* @__PURE__ */ jsx("i", { style: { transform: `scaleX(${(i + 1) / n})` } })
			})]
		})
	] });
}
function ItineraryStory({ tour }) {
	const data = itinerarios[tour.slug], stops = data.paradas, n = stops.length;
	const ref = useRef(null), stack = useRef(null), ctrl = useRef(null);
	const [active, setActive] = useState(0), [seen, setSeen] = useState(() => /* @__PURE__ */ new Set([0, 1]));
	const wide = useMedia("(min-width: 1000px) and (min-height: 620px)", false), light = useLightMotion(), sticky = wide && !light;
	useEffect(() => {
		if (!sticky) return;
		const el = ref.current, inner = el.querySelector(".it-inner"), meter = el.querySelector(".it-meter i");
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
				const p = Math.max(0, Math.min(.9999, (stick - (top - y)) / total)), idx = Math.floor(p * n);
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
	}, [sticky, n]);
	useEffect(() => {
		if (!sticky) return;
		setSeen((s) => {
			const next = new Set(s);
			for (let k = active; k <= Math.min(n - 1, active + 2); k++) next.add(k);
			return next.size === s.size ? s : next;
		});
		const nx = stack.current?.children[active + 1]?.querySelector("img");
		if (nx?.src && nx.decode) nx.decode().catch(() => {});
	}, [
		active,
		sticky,
		n,
		seen
	]);
	const go = useCallback((i) => {
		const el = ref.current, inner = el.querySelector(".it-inner");
		const stick = parseFloat(getComputedStyle(inner).top) || 0, total = Math.max(1, el.offsetHeight - inner.offsetHeight);
		const y = docTop(el) - stick + total * ((i + .5) / n);
		window.scrollTo({
			top: y,
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
		});
		setActive(i);
	}, [n]);
	const onKey = (e) => {
		const k = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1
		}[e.key], j = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : k === void 0 ? null : Math.max(0, Math.min(n - 1, active + k));
		if (j === null) return;
		e.preventDefault();
		go(j);
		ctrl.current?.querySelectorAll("button")[j]?.focus();
	};
	const head = /* @__PURE__ */ jsxs("header", {
		className: "it-head wrap",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "eyebrow",
				children: "La experiencia"
			}),
			/* @__PURE__ */ jsx("h2", {
				className: data.tituloSeccion ? "" : "it-sr",
				children: data.tituloSeccion || "El recorrido, parada a parada"
			}),
			data.aviso && /* @__PURE__ */ jsx("p", {
				className: "it-aviso",
				role: "note",
				children: data.aviso
			})
		]
	});
	if (!sticky) return /* @__PURE__ */ jsxs("section", {
		ref,
		"data-tn": "0",
		className: "it it-static",
		"aria-label": `${t("Un recorrido por")} ${t(tour.name)}`,
		children: [head, /* @__PURE__ */ jsx("ol", {
			className: "it-list wrap",
			role: "list",
			children: stops.map((s, i) => /* @__PURE__ */ jsxs("li", {
				className: "it-card",
				children: [/* @__PURE__ */ jsx("div", {
					className: "it-media",
					children: /* @__PURE__ */ jsx(Foto, { stop: s })
				}), /* @__PURE__ */ jsx("div", {
					className: "it-text",
					children: /* @__PURE__ */ jsx(StopText, {
						s,
						i,
						n,
						corto: data.corto,
						unit: data.unidad,
						rotulo: data.rotulo || "En la visita"
					})
				})]
			}, s.orden))
		})]
	});
	return /* @__PURE__ */ jsxs("section", {
		ref,
		"data-tn": "0",
		className: "it it-sticky",
		style: { "--n": n },
		"aria-label": `${t("Un recorrido por")} ${t(tour.name)}`,
		children: [head, /* @__PURE__ */ jsx("div", {
			className: "it-track",
			children: /* @__PURE__ */ jsxs("div", {
				className: "it-inner",
				children: [/* @__PURE__ */ jsx("div", {
					className: "it-media",
					ref: stack,
					children: stops.map((s, i) => /* @__PURE__ */ jsx("div", {
						className: `it-slide${active === i ? " is-active" : ""}`,
						"aria-hidden": active === i ? void 0 : "true",
						children: (seen.has(i) || i === 0) && /* @__PURE__ */ jsx(Foto, {
							stop: s,
							eager: i <= 1
						})
					}, s.orden))
				}), /* @__PURE__ */ jsxs("div", {
					className: "it-panel",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "it-articles",
							children: stops.map((s, i) => /* @__PURE__ */ jsx("article", {
								className: `it-art${active === i ? " is-active" : ""}`,
								"aria-hidden": active === i ? void 0 : "true",
								children: /* @__PURE__ */ jsx(StopText, {
									s,
									i,
									n,
									corto: data.corto,
									unit: data.unidad,
									rotulo: data.rotulo || "En la visita",
									big: true
								})
							}, s.orden))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "it-controls",
							ref: ctrl,
							role: "group",
							"aria-label": t("Elegir parada"),
							onKeyDown: onKey,
							children: /* @__PURE__ */ jsxs("div", {
								className: "it-compact",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "it-count",
									"aria-hidden": "true",
									children: [
										pad(active + 1),
										" / ",
										pad(n)
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "it-segs",
									children: stops.map((s, i) => /* @__PURE__ */ jsx("button", {
										type: "button",
										"aria-label": `${t(data.unidad === "Etapa" ? "Ir a la etapa" : "Ir a la parada")} ${i + 1}: ${t(s.titulo_corto)}`,
										"aria-current": active === i ? "step" : void 0,
										className: i <= active ? "on" : "",
										onClick: () => go(i),
										children: /* @__PURE__ */ jsx("i", {})
									}, s.orden))
								})]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "it-meter",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("i", {})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "it-hint",
							children: ["Desliza para seguir la historia ", /* @__PURE__ */ jsx(Arrow, { dir: "down" })]
						})
					]
				})]
			})
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
			/* @__PURE__ */ jsx(Marquee, { text: t(tour.name).toLocaleUpperCase(language() === "en" ? "en" : "es") }),
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
								}), slug === "traslados-aeropuerto-jmc" ? "Encuentro en aeropuerto o Medellín" : "Salida coordinada en Medellín"] }),
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
			itinerarios[tour.slug] ? /* @__PURE__ */ jsx(ItineraryStory, { tour }) : /* @__PURE__ */ jsx(Story, { tour }),
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
