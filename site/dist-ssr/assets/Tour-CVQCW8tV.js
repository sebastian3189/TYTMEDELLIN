import { C as useMedia, E as inicioTextos, I as whatsapp, N as jsx, P as jsxs, S as useLightMotion, _ as EditorialMotion, b as Trust, c as Arrow, f as Picture, h as TourCard, k as usePageMeta, m as Rail, p as QuoteSection, r as tours, u as Eyebrow, w as useMounted, y as Marquee } from "../entry-server.js";
import NotFound from "./NotFound-D0uRj_7U.js";
import { t as FeaturedGallery } from "./FeaturedGallery-C4tRee2w.js";
import { t as Reviews } from "./Reviews-CZkkVS5X.js";
/* empty css                       */
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
	children: /* @__PURE__ */ jsx("path", { d: ICONS[name] })
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
		"aria-label": "Detalles del recorrido",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "td-lead",
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
//#region src/QuoteBar.jsx
function QuoteBar({ name, ctaId = "cta-principal", formId = "consulta" }) {
	const [passed, setPassed] = useState(false), [formSeen, setFormSeen] = useState(false), [formAbove, setFormAbove] = useState(false);
	const visible = passed && !formSeen && !formAbove, mounted = useMounted();
	useEffect(() => {
		const cta = document.getElementById(ctaId), form = document.getElementById(formId);
		if (!cta || !form || !("IntersectionObserver" in window)) return void 0;
		const observer = new IntersectionObserver((entries) => {
			for (const e of entries) if (e.target === cta) setPassed(!e.isIntersecting);
			else {
				setFormSeen(e.isIntersecting);
				setFormAbove(!e.isIntersecting && e.boundingClientRect.bottom < 0);
			}
		});
		observer.observe(cta);
		observer.observe(form);
		return () => observer.disconnect();
	}, [ctaId, formId]);
	useEffect(() => {
		document.documentElement.toggleAttribute("data-barra-cotizar", visible);
		return () => document.documentElement.removeAttribute("data-barra-cotizar");
	}, [visible]);
	if (!mounted) return null;
	return createPortal(/* @__PURE__ */ jsxs("aside", {
		className: `quote-bar ${visible ? "is-visible" : ""}`,
		"aria-label": "Cotizar esta experiencia",
		inert: !visible,
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "quote-bar-name",
				children: name
			}),
			/* @__PURE__ */ jsxs("a", {
				className: "button quote-bar-cta",
				href: `#${formId}`,
				children: ["Cotizar", /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					children: "↗"
				})]
			}),
			/* @__PURE__ */ jsx("a", {
				className: "quote-bar-wa",
				href: whatsapp(name),
				target: "_blank",
				rel: "noreferrer",
				"aria-label": `Consultar por WhatsApp sobre ${name} (se abre en una pestaña nueva)`,
				children: /* @__PURE__ */ jsx("svg", {
					viewBox: "0 0 24 24",
					"aria-hidden": "true",
					width: "24",
					height: "24",
					fill: "currentColor",
					children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" })
				})
			})
		]
	}), document.body);
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
						children: staticMode ? "A tu ritmo" : "Desliza para seguir la historia ↓"
					})
				]
			})]
		})
	});
}
function Gallery({ tour }) {
	return /* @__PURE__ */ jsx(FeaturedGallery, { tour });
}
function Tour() {
	const { slug } = useParams();
	const tour = tours.find((t) => t.slug === slug);
	usePageMeta(tour?.name, tour?.description);
	if (!tour) return /* @__PURE__ */ jsx(NotFound, {});
	return /* @__PURE__ */ jsxs("div", {
		className: `tour-page mood-${tour.mood}`,
		children: [
			/* @__PURE__ */ jsxs(EditorialMotion, {
				className: "tour-hero wrap",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "tour-hero-content",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/experiencias",
							className: "back-link",
							children: "← Todas las experiencias"
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
				}), /* @__PURE__ */ jsxs("figure", {
					className: "editorial-photo",
					children: [/* @__PURE__ */ jsx(Picture, {
						photo: tour.hero,
						alt: tour.name,
						priority: true,
						sizes: "(max-width: 700px) 72vw, 400px"
					}), /* @__PURE__ */ jsxs("figcaption", { children: [tour.name, " · Archivo T&T"] })]
				})]
			}),
			/* @__PURE__ */ jsx(Marquee, { text: inicioTextos.cartas[tour.slug].lugar }),
			/* @__PURE__ */ jsxs("nav", {
				className: "tour-nav",
				"aria-label": "En esta experiencia",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "#esencia",
						children: "La experiencia"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "#fotos",
						children: "Fotografías"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "#preparar",
						children: "Antes de viajar"
					}),
					/* @__PURE__ */ jsxs("a", {
						href: "#consulta",
						children: ["Cotizar ", /* @__PURE__ */ jsx(Arrow, {})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				id: "esencia",
				className: "tour-intro wrap",
				children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "El espíritu del recorrido" }),
					/* @__PURE__ */ jsx("h2", { children: tour.title }),
					/* @__PURE__ */ jsx("p", { children: tour.description }),
					/* @__PURE__ */ jsxs("div", {
						className: "trip-facts",
						children: [
							/* @__PURE__ */ jsx("span", { children: "Salida coordinada en Medellín" }),
							/* @__PURE__ */ jsx("span", { children: "Consulta fechas y disponibilidad" }),
							/* @__PURE__ */ jsx("span", { children: "Propuesta para tu grupo" })
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(Trust, {}),
			/* @__PURE__ */ jsx(TourDetails, { slug: tour.slug }),
			/* @__PURE__ */ jsx(Story, { tour }),
			/* @__PURE__ */ jsx("div", {
				id: "fotos",
				children: /* @__PURE__ */ jsx(Gallery, { tour })
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "prepare wrap",
				id: "preparar",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "Pequeños detalles, mejor viaje" }),
					/* @__PURE__ */ jsxs("h2", { children: [
						"Ven con ganas.",
						/* @__PURE__ */ jsx("br", {}),
						"Lo demás, ",
						/* @__PURE__ */ jsx("em", { children: "planeémoslo." })
					] }),
					/* @__PURE__ */ jsx("p", { children: tour.advice }),
					tour_info_default[tour.slug]?.recomendaciones.length > 0 && /* @__PURE__ */ jsx("ul", {
						className: "td-tips",
						role: "list",
						children: tour_info_default[tour.slug].recomendaciones.map((t) => /* @__PURE__ */ jsx("li", { children: t }, t))
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "faq",
					children: [
						/* @__PURE__ */ jsxs("details", {
							open: true,
							children: [/* @__PURE__ */ jsx("summary", { children: "¿Cómo organizamos la experiencia?" }), /* @__PURE__ */ jsx("p", { children: "Coordinamos el transporte privado y el recorrido contigo. La propuesta confirma las paradas, el acompañamiento, los horarios y el valor antes de contratar." })]
						}),
						/* @__PURE__ */ jsxs("details", { children: [/* @__PURE__ */ jsx("summary", { children: "¿Qué debo confirmar sobre el precio?" }), /* @__PURE__ */ jsx("p", { children: "Entradas, alimentación y actividades adicionales se detallan en la cotización. Consulta qué está incluido y qué se paga por separado." })] }),
						/* @__PURE__ */ jsxs("details", { children: [/* @__PURE__ */ jsx("summary", { children: "¿Se puede adaptar para mi grupo?" }), /* @__PURE__ */ jsx("p", { children: "Cuéntanos edades, equipaje, movilidad e intereses. El equipo revisa las opciones y confirma lo que es posible para la fecha elegida." })] })
					]
				})]
			}),
			/* @__PURE__ */ jsx(QuoteSection, { context: tour.name }),
			/* @__PURE__ */ jsx(Reviews, {}),
			/* @__PURE__ */ jsxs("section", {
				className: "wrap section",
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
			/* @__PURE__ */ jsx(QuoteBar, { name: tour.name })
		]
	});
}
//#endregion
export { Tour as default };
