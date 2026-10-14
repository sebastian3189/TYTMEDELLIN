import { F as jsx, I as jsxs, L as company, N as Socials, P as Fragment, R as whatsapp, _ as Manifesto, c as Eyebrow, d as QuoteSection, h as Arrow, i as values, l as PageTitle, n as photos, s as Button, u as Picture } from "../entry-server.js";
import { t as FeaturedGallery } from "./FeaturedGallery-v6rDM-IO.js";
import { t as Reviews } from "./Reviews-Cp4j-Pnr.js";
import { l as Faq, n as FAQ_ABOUT, r as FAQ_CONTACT } from "./faq-data-DaJGWog5.js";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
//#region src/Contact.jsx
var MAP = {
	lat: 6.2085691,
	lon: -75.602988,
	title: "Ubicación de la oficina en Medellín: Carrera 79AA #1A Sur-280"
};
var fixed = (n) => n.toFixed(6);
var mapEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${fixed(MAP.lon - .008)}%2C${fixed(MAP.lat - .006)}%2C${fixed(MAP.lon + .008)}%2C${fixed(MAP.lat + .006)}&layer=mapnik&marker=${MAP.lat}%2C${MAP.lon}`;
var googleMaps = `https://www.google.com/maps/search/?api=1&query=${MAP.lat}%2C${MAP.lon}`;
var openStreetMap = `https://www.openstreetmap.org/?mlat=${MAP.lat}&mlon=${MAP.lon}#map=16/${MAP.lat}/${MAP.lon}`;
function MapFacade() {
	const [loaded, setLoaded] = useState(false), frame = useRef(null);
	useEffect(() => {
		if (loaded) frame.current?.focus({ preventScroll: true });
	}, [loaded]);
	return /* @__PURE__ */ jsxs("figure", {
		className: "map-card",
		children: [/* @__PURE__ */ jsx("div", {
			className: "map-frame",
			children: loaded ? /* @__PURE__ */ jsx("iframe", {
				ref: frame,
				title: MAP.title,
				src: mapEmbed,
				loading: "lazy",
				referrerPolicy: "no-referrer-when-downgrade",
				sandbox: "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
			}) : /* @__PURE__ */ jsxs("div", {
				className: "map-facade",
				children: [
					/* @__PURE__ */ jsxs("svg", {
						viewBox: "0 0 24 24",
						width: "40",
						height: "40",
						"aria-hidden": "true",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.6",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ jsx("path", { d: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" }), /* @__PURE__ */ jsx("circle", {
							cx: "12",
							cy: "9.5",
							r: "2.5"
						})]
					}),
					/* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: company.address }) }),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "button secondary",
						onClick: () => setLoaded(true),
						children: ["Cargar mapa interactivo ", /* @__PURE__ */ jsx(Arrow, {})]
					}),
					/* @__PURE__ */ jsx("small", { children: "Al cargarlo, tu navegador se conecta a OpenStreetMap." })
				]
			})
		}), /* @__PURE__ */ jsxs("figcaption", { children: [/* @__PURE__ */ jsxs("a", {
			className: "text-link",
			href: googleMaps,
			target: "_blank",
			rel: "noopener noreferrer",
			children: [
				"Abrir en Google Maps",
				/* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: " (se abre en una pestaña nueva)"
				}),
				/* @__PURE__ */ jsx(Arrow, {})
			]
		}), /* @__PURE__ */ jsxs("a", {
			className: "text-link",
			href: openStreetMap,
			target: "_blank",
			rel: "noopener noreferrer",
			children: [
				"Abrir en OpenStreetMap",
				/* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: " (se abre en una pestaña nueva)"
				}),
				/* @__PURE__ */ jsx(Arrow, {})
			]
		})] })]
	});
}
function ContactPlace() {
	return /* @__PURE__ */ jsxs("section", {
		className: "wrap contact-place",
		"aria-labelledby": "contacto-lugar",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "contact-address",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: "Nos encuentras en"
				}),
				/* @__PURE__ */ jsx("h2", {
					id: "contacto-lugar",
					children: company.address
				}),
				/* @__PURE__ */ jsx("p", { children: "Oficina de T&T Medellín. Escríbenos antes de venir para coordinar tu visita." }),
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: "Síguenos"
				}),
				/* @__PURE__ */ jsx(Socials, { className: "contact-socials" })
			]
		}), /* @__PURE__ */ jsx(MapFacade, {})]
	});
}
//#endregion
//#region src/pages/Company.jsx
var Gallery = ({ tour }) => /* @__PURE__ */ jsx(FeaturedGallery, { tour });
function About() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageTitle, {
			photo: photos("historia")[0],
			floating: photos("historia").slice(1, 3),
			tag: "Nuestra casa. Nuestra gente.",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"Somos del camino.",
				/* @__PURE__ */ jsx("br", {}),
				"Somos de ",
				/* @__PURE__ */ jsx("em", { children: "Medellín." })
			] }),
			text: "Nacimos con la intención de recibir bien. Crecemos escuchando a las personas que nos acompañan."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "about-photo wrap",
			children: /* @__PURE__ */ jsx(Picture, {
				photo: photos("equipo")[0],
				alt: "Equipo de T&T Medellín",
				priority: true
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "wrap section history",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Una historia en movimiento" }),
				/* @__PURE__ */ jsxs("h2", { children: [
					"De un sueño",
					/* @__PURE__ */ jsx("br", {}),
					"a muchos ",
					/* @__PURE__ */ jsx("em", { children: "encuentros." })
				] }),
				/* @__PURE__ */ jsx("p", { children: "En 2020 nació la idea. En 2021 comenzaron los primeros traslados con un automóvil. Las conversaciones con los viajeros ayudaron a dar forma a nuestra manera de trabajar." }),
				/* @__PURE__ */ jsx("p", { children: "Hoy seguimos cuidando lo que nos hizo empezar: hospitalidad, dedicación y orgullo por compartir nuestra tierra." })
			] }), /* @__PURE__ */ jsx("div", {
				className: "timeline",
				children: [
					[
						"2020",
						"Imaginar el camino",
						"Una idea que une el amor por Medellín y las ganas de servir."
					],
					[
						"2021",
						"Recibir a los primeros viajeros",
						"Los traslados al aeropuerto nos enseñan a escuchar."
					],
					[
						"2024",
						"Consolidar un equipo",
						"Oficina, equipo y desarrollo de flota en Medellín."
					],
					[
						"Hoy",
						"Conservar la cercanía",
						"Cada recorrido es una nueva oportunidad para hacerlo bien."
					]
				].map(([year, title, text]) => /* @__PURE__ */ jsxs("article", { children: [
					/* @__PURE__ */ jsx("span", { children: year }),
					/* @__PURE__ */ jsx("h3", { children: title }),
					/* @__PURE__ */ jsx("p", { children: text })
				] }, year))
			})]
		}),
		/* @__PURE__ */ jsx(Manifesto, { words: [
			"Confianza.",
			"Calidad.",
			"Cercanía.",
			"Hospitalidad.",
			"Autenticidad."
		] }),
		/* @__PURE__ */ jsxs("section", {
			className: "values wrap section",
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Lo que nos mueve" }),
				/* @__PURE__ */ jsxs("h2", { children: [
					"Nuestros valores",
					/* @__PURE__ */ jsx("br", {}),
					"se viven ",
					/* @__PURE__ */ jsx("em", { children: "en el trato." })
				] }),
				/* @__PURE__ */ jsx("div", {
					className: "values-grid",
					children: values.map(([t, d], i) => /* @__PURE__ */ jsxs("article", { children: [
						/* @__PURE__ */ jsxs("span", { children: ["0", i + 1] }),
						/* @__PURE__ */ jsx("h3", { children: t }),
						/* @__PURE__ */ jsx("p", { children: d })
					] }, t))
				})
			]
		}),
		/* @__PURE__ */ jsx(Gallery, { tour: {
			name: "Nuestra historia",
			images: photos("historia")
		} }),
		/* @__PURE__ */ jsxs("section", {
			className: "wrap section faq-page",
			children: [/* @__PURE__ */ jsx("p", {
				className: "legal-ids",
				children: "Registro Nacional de Turismo RNT 176384 · NIT 901738550-6"
			}), /* @__PURE__ */ jsx(Faq, {
				items: FAQ_ABOUT,
				eyebrow: "Confianza y respaldo",
				title: "Lo que debes saber de nosotros"
			})]
		})
	] });
}
function Services() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageTitle, {
			tag: "Transporte con atención local",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"Tu plan tiene",
				/* @__PURE__ */ jsx("br", {}),
				"muchas formas.",
				/* @__PURE__ */ jsx("br", {}),
				/* @__PURE__ */ jsx("em", { children: "Nos adaptamos." })
			] }),
			text: "Recorridos, traslados y movilidad coordinada desde Medellín para viajeros, empresas y aliados."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "wrap services-list",
			children: [
				[
					"Viajeros y familias",
					"Tiempo para conocer, acompañamiento para organizar. Explora recorridos por Medellín y excursiones por Antioquia.",
					"/experiencias",
					"Explorar experiencias"
				],
				[
					"Aeropuerto y traslados",
					"Comparte vuelo, dirección, equipaje y fecha. Preparamos la recogida y el recorrido.",
					"/experiencias/traslados-aeropuerto-jmc",
					"Conocer el traslado"
				],
				[
					"Empresas y eventos",
					"Coordinación de personas, puntos de encuentro y horarios para el propósito de tu jornada.",
					"/cotizar?servicio=Empresas%20y%20eventos",
					"Solicitar propuesta"
				],
				[
					"Agencias, hoteles y aliados",
					"Una conversación operativa para revisar recorridos y necesidades de tus viajeros.",
					"/cotizar?servicio=Agencias%20y%20aliados",
					"Hablar con el equipo"
				]
			].map(([title, text, url, cta], i) => /* @__PURE__ */ jsxs("article", { children: [
				/* @__PURE__ */ jsxs("span", { children: ["0", i + 1] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", { children: title }), /* @__PURE__ */ jsx("p", { children: text })] }),
				/* @__PURE__ */ jsx(Button, {
					to: url,
					children: cta
				})
			] }, title))
		}),
		/* @__PURE__ */ jsx(Manifesto, { words: [
			"Experiencias a medida.",
			"Vehículo privado.",
			"Atención personalizada."
		] }),
		/* @__PURE__ */ jsx(Reviews, {})
	] });
}
function Contact() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageTitle, {
			tag: "Aquí empieza la conversación",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"Tu plan merece",
				/* @__PURE__ */ jsx("br", {}),
				"que lo ",
				/* @__PURE__ */ jsx("em", { children: "escuchemos." })
			] }),
			text: "Escríbenos, llámanos o prepara una consulta con los detalles de tu recorrido."
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "wrap contact-grid",
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: whatsapp(),
					target: "_blank",
					rel: "noreferrer",
					children: [
						/* @__PURE__ */ jsx(Eyebrow, { children: "WhatsApp Medellín" }),
						/* @__PURE__ */ jsx("h2", { children: company.phone }),
						/* @__PURE__ */ jsxs("span", { children: ["Conversar con el equipo", /* @__PURE__ */ jsx(Arrow, {})] })
					]
				}),
				/* @__PURE__ */ jsxs("a", {
					href: `tel:${company.phone.replaceAll(" ", "")}`,
					children: [
						/* @__PURE__ */ jsx(Eyebrow, { children: "Llámanos" }),
						/* @__PURE__ */ jsx("h2", { children: company.phone }),
						/* @__PURE__ */ jsxs("span", { children: ["Llamar a T&T Medellín", /* @__PURE__ */ jsx(Arrow, {})] })
					]
				}),
				/* @__PURE__ */ jsxs("a", {
					href: `mailto:${company.email}`,
					children: [
						/* @__PURE__ */ jsx(Eyebrow, { children: "Correo" }),
						/* @__PURE__ */ jsxs("h2", {
							className: "contact-email",
							children: [
								company.email.split("@")[0],
								/* @__PURE__ */ jsx("wbr", {}),
								"@",
								company.email.split("@")[1]
							]
						}),
						/* @__PURE__ */ jsxs("span", { children: ["Escribir un correo", /* @__PURE__ */ jsx(Arrow, {})] })
					]
				})
			]
		}),
		/* @__PURE__ */ jsx(ContactPlace, {}),
		/* @__PURE__ */ jsx(QuoteSection, { mode: "contacto" }),
		/* @__PURE__ */ jsx("section", {
			className: "wrap section faq-page",
			children: /* @__PURE__ */ jsx(Faq, { items: FAQ_CONTACT })
		})
	] });
}
function QuotePage() {
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageTitle, {
			tag: "Planeemos el siguiente camino",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"Tu viaje, tus tiempos,",
				/* @__PURE__ */ jsx("br", {}),
				"tu ",
				/* @__PURE__ */ jsx("em", { children: "experiencia." })
			] })
		}),
		/* @__PURE__ */ jsx(QuoteSection, { context: params.get("vehiculo") || params.get("servicio") || "Un recorrido a mi medida" }),
		/* @__PURE__ */ jsx("section", {
			className: "wrap section faq-page",
			children: /* @__PURE__ */ jsx(Faq, { items: FAQ_CONTACT })
		})
	] });
}
function Privacy() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageTitle, {
		tag: "Información clara",
		title: /* @__PURE__ */ jsxs(Fragment, { children: [
			"Tu información,",
			/* @__PURE__ */ jsx("br", {}),
			"bajo tu ",
			/* @__PURE__ */ jsx("em", { children: "control." })
		] })
	}), /* @__PURE__ */ jsxs("article", {
		className: "article-body",
		children: [
			/* @__PURE__ */ jsx("h2", { children: "Cómo funciona esta consulta" }),
			/* @__PURE__ */ jsx("p", { children: "El formulario prepara un resumen en tu navegador. No envía datos a una base de datos ni confirma reservas. Al pulsar «Copiar solicitud», el contenido se copia al portapapeles; tú decides si lo pegas y envías por WhatsApp." }),
			/* @__PURE__ */ jsx("h2", { children: "Qué compartes" }),
			/* @__PURE__ */ jsx("p", { children: "Nombre, teléfono, correo opcional y los detalles del recorrido. El equipo utiliza la solicitud que envíes para responder y preparar la propuesta. Evita incluir documentos de identidad o información sensible." }),
			/* @__PURE__ */ jsx("h2", { children: "Contacto y derechos" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Para consultar, actualizar o solicitar la eliminación de información compartida con T&T, contacta a ",
				/* @__PURE__ */ jsx("a", {
					href: `mailto:${company.email}`,
					children: company.email
				}),
				". WhatsApp y los sitios externos aplican sus propias políticas al abrirlos."
			] }),
			/* @__PURE__ */ jsxs("p", { children: ["Responsable identificado en el sitio de la marca: T&T, NIT 901738550-6. ", /* @__PURE__ */ jsxs("a", {
				href: "https://www.transporteyturismocolombia.com/privacidad",
				target: "_blank",
				rel: "noreferrer",
				children: ["Consultar la política de tratamiento de datos de la empresa", /* @__PURE__ */ jsx(Arrow, {})]
			})] }),
			/* @__PURE__ */ jsx("p", { children: "Este sitio no incorpora analítica publicitaria ni almacenamiento de solicitudes. Las fotografías y las fuentes se sirven desde el proyecto." })
		]
	})] });
}
function Ratings() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageTitle, {
		tag: "Confianza con fuente",
		title: /* @__PURE__ */ jsxs(Fragment, { children: [
			"Lo que cuenta",
			/* @__PURE__ */ jsx("br", {}),
			"quien ya ",
			/* @__PURE__ */ jsx("em", { children: "viajó." })
		] })
	}), /* @__PURE__ */ jsx(Reviews, { full: true })] });
}
//#endregion
export { About, Contact, Privacy, QuotePage, Ratings, Services };
