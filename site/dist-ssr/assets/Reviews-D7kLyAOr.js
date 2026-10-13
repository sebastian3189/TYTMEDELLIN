import { M as company } from "../entry-server.js";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/reviews.json
var reviews_default = [
	{
		"nombre": "David Ramirez",
		"local": false,
		"texto": "Nuestra experiencia con el tour privado fue sencillamente excepcional. Desde el primer momento, la organización y comunicación fueron impecables, lo que nos brindó mucha confianza y tranquilidad durante todo el proceso. Se nota claramente el excelente manejo administrativo que tienen."
	},
	{
		"nombre": "Alexandra Echeverría",
		"local": false,
		"texto": "Queremos agradecer a todo el equipo de Transporte y Turismo Medellín por los tours que nos brindaron como grupo. Todo fue excelente: puntualidad, guías muy amables, transporte cómodo y seguro, y las rutas súper bien organizadas. De verdad que la experiencia fue 100% satisfactoria."
	},
	{
		"nombre": "Narciso Oceguera",
		"local": true,
		"texto": "Tuve una experiencia espectacular con Alhan de Transporte y Turismo Medellín. Desde el inicio, la organización fue impecable y todo se desarrolló de manera puntual y fluida. La ruta estuvo muy bien planificada, permitiendo disfrutar al máximo cada uno de los lugares visitados."
	},
	{
		"nombre": "Fernando Espino",
		"local": false,
		"texto": "Perfecto con excelente, el city tour comuna 13 excelente servicio, por parte del conductor (Francisco) y el guía (Brian), sin palabras, que Chimba Medellín, ahhh no olviden pedir la bandeja paisa al la hora del almuerzo brutal!!!"
	},
	{
		"nombre": "Clara Martinez",
		"local": false,
		"texto": "El servicio prestado superó las expectativas que traía. Tienes un equipo súper, híper, mega genial y profesional. Si regresara en otra ocasión de seguro los escogería y con seguridad lo recomendaré a mis amigos que quieran visitar Colombia."
	},
	{
		"nombre": "Ileana Lassus",
		"local": false,
		"texto": "¡Una experiencia increíble de principio a fin! El servicio fue excelente y la comunicación siempre fue rápida, clara y muy profesional. Todo el equipo, especialmente los guías y coordinadores, fue sumamente atento, amable y flexible."
	},
	{
		"nombre": "Monika Meoño",
		"local": false,
		"texto": "Desde el inicio fueron demasiado amables, la atención y seguimiento de cada día fue excelente. Nos sentimos cómodos, seguros y bien recibidos. La experiencia superó nuestras expectativas, volveríamos a contratarlos sin dudar."
	},
	{
		"nombre": "Diego Robles",
		"local": false,
		"texto": "¡Una experiencia simplemente impecable y de otro nivel! Quiero recomendar con total confianza a Transporte y Turismo Medellín, una empresa que superó todas mis expectativas desde el primer momento. Cada tour fue inolvidable: el Tour a Guatapé, el City Tour y el Tour de Compras estuvieron organizados de manera excelente."
	},
	{
		"nombre": "Gabriela Gárate",
		"local": false,
		"texto": "Fuimos 2 personas y tuvimos una muy buena experiencia con todo el equipo. Todo estuvo bien organizado, el transporte fue puntual y siempre fueron muy atentos. Queremos destacar especialmente al guía Albeiro, quien fue súper amable y excelente guía."
	},
	{
		"nombre": "Elba Acosta",
		"local": false,
		"texto": "Empresa muy seria, responsable. Sarai fue nuestra asesora comercial y es una persona increíble. En general, todo el personal que tuvimos en cada tour fueron excelentes! Recomendados al 100%. Volveríamos a contratar con ellos."
	},
	{
		"nombre": "Sebas",
		"local": false,
		"texto": "Quiero agradecer a la empresa de transporte turismo Medellín, por el excelente servicio que nos brindó durante la celebración de mi cumpleaños. Desde el primer contacto demostraron profesionalismo, puntualidad y una atención impecable."
	},
	{
		"nombre": "Kristel Aguilar",
		"local": false,
		"texto": "Excelente experiencia de principio a fin. Desde la planificación del viaje hasta la ejecución de cada actividad, el equipo demostró un alto nivel de profesionalismo, organización y conocimiento. Todo el personal fue sumamente amable y atento."
	},
	{
		"nombre": "Alexander Rodriguez",
		"local": false,
		"texto": "La experiencia fue súper buena. Desde la atención previa a los tours y las recomendaciones, el trato de Sarai siempre fue excepcional. El guía Albeiro fue súper atento, súper amable, súper paciente y con gran conocimiento. Los almuerzos incluidos son muy buenos."
	},
	{
		"nombre": "Daniel Zapata",
		"local": false,
		"texto": "Fue un excelente servicio de inicio a fin, la comunicación con Sarai fue excepcional. Nos recogieron de forma muy cumplida y al final del concierto nos recogieron en el lugar acordado. Los vehículos en muy buen estado."
	},
	{
		"nombre": "Meysbol Torres",
		"local": false,
		"texto": "Todo maravilloso. Allan y su equipo nos recogieron en el aeropuerto, nos dieron consejos, fuimos a un espectacular tour nocturno familiar, conocimos la ciudad, Guatapé, Comuna 13 y hasta fuimos a la Hacienda Nápoles. Un saludo desde Guanacaste, Costa Rica."
	},
	{
		"nombre": "Christian S.",
		"local": false,
		"texto": "Otro nivel de servicio. Alan es un tipazo, las unidades están impecables y la atención es impecable de principio a fin. Te resuelven todo y viajas con total tranquilidad. Si vienes a Medellín, este es el contacto que tienes que asegurar."
	},
	{
		"nombre": "Maria Velez",
		"local": false,
		"texto": "Es la segunda vez que utilizamos la compañía, y la seguiremos utilizando en el futuro. Estamos 100% complacidos con el servicio. Yo tengo una lesión en la rodilla y ellos hasta me cargaron en la espalda para ayudarme a bajar escaleras, y me consiguieron silla de ruedas en todos los lugares."
	},
	{
		"nombre": "Victor Hugo Araya",
		"local": false,
		"texto": "Gracias por tanto calor humano en estas vacaciones, nos cuidaron, siempre estuvieron atentos a lo que necesitamos, nos guiaron y nos aconsejaron. Son un gran equipo, nunca nos vieron como cliente sino nos trataron como si fuéramos grandes amigos de mucho tiempo."
	}
];
//#endregion
//#region src/Reviews.jsx
var TRIPADVISOR = "https://www.tripadvisor.es/Attraction_Review-g297478-d25190482-Reviews-Transporte_y_Turismo_Medellin-Medellin_Antioquia_Department.html";
var reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var Stars = () => /* @__PURE__ */ jsx("span", {
	className: "g-stars",
	"aria-hidden": "true",
	children: "★★★★★"
});
function Card({ r }) {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs("article", {
		className: "g-card",
		children: [
			/* @__PURE__ */ jsx(Stars, {}),
			/* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Calificación: 5.0 de 5 estrellas."
			}),
			/* @__PURE__ */ jsx("p", {
				className: `g-text ${open ? "is-open" : ""}`,
				children: r.texto
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "g-more",
				"aria-expanded": open,
				onClick: () => setOpen(!open),
				children: open ? "Leer menos" : "Leer más"
			}),
			/* @__PURE__ */ jsxs("footer", {
				className: "g-author",
				children: [/* @__PURE__ */ jsx("strong", { children: r.nombre }), r.local && /* @__PURE__ */ jsx("span", { children: "Guía Local" })]
			})
		]
	});
}
function Reviews({ full = false }) {
	const ref = useRef(null), drag = useRef(null), moved = useRef(false);
	const move = (d) => ref.current.scrollBy({
		left: d * ref.current.clientWidth * .8,
		behavior: reducedMotion() ? "instant" : "smooth"
	});
	return /* @__PURE__ */ jsx("section", {
		className: "reviews-g",
		"aria-labelledby": "resenas-titulo",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "g-head",
					children: [
						/* @__PURE__ */ jsx("h2", {
							id: "resenas-titulo",
							children: "Historias de quienes viajaron con nosotros"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "g-sub",
							children: "Opiniones sobre Transporte & Turismo Medellín publicadas en Google. Referencia: septiembre de 2026."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "g-score",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "g-big",
									children: ["5.0", /* @__PURE__ */ jsx("span", {
										className: "sr-only",
										children: " de 5 estrellas en Google"
									})]
								}),
								/* @__PURE__ */ jsx(Stars, {}),
								/* @__PURE__ */ jsx("span", {
									className: "g-count",
									children: "265 reseñas en Google"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "g-actions",
							children: [/* @__PURE__ */ jsxs("a", {
								className: "button g-dark",
								href: company.reviews,
								target: "_blank",
								rel: "noopener noreferrer",
								children: ["Ver todas las reseñas en Google ", /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									children: "↗"
								})]
							}), /* @__PURE__ */ jsxs("a", {
								className: "g-ta",
								href: TRIPADVISOR,
								target: "_blank",
								rel: "noopener noreferrer",
								children: [/* @__PURE__ */ jsx("img", {
									src: "/media/marca/tripadvisor.svg",
									alt: "",
									width: "32",
									height: "32",
									loading: "lazy",
									decoding: "async"
								}), /* @__PURE__ */ jsxs("span", { children: [
									"Tripadvisor ",
									/* @__PURE__ */ jsx("b", { children: "5.0" }),
									" · 5 reseñas ",
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										children: "↗"
									})
								] })]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "g-controls",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => move(-1),
						"aria-label": "Reseñas anteriores",
						children: "←"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => move(1),
						"aria-label": "Reseñas siguientes",
						children: "→"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					ref,
					className: "g-rail",
					role: "region",
					"aria-roledescription": "carrusel",
					"aria-label": "Reseñas de clientes en Google",
					tabIndex: 0,
					onKeyDown: (e) => {
						if (e.target === e.currentTarget && ["ArrowLeft", "ArrowRight"].includes(e.key)) {
							e.preventDefault();
							move(e.key === "ArrowLeft" ? -1 : 1);
						}
					},
					onPointerDown: (e) => {
						if (e.pointerType === "mouse" && e.button === 0 && !e.target.closest("button")) {
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
						if (Math.abs(dx) > 6) {
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
					onDragStart: (e) => e.preventDefault(),
					children: reviews_default.map((r) => /* @__PURE__ */ jsx(Card, { r }, r.nombre))
				}),
				!full && /* @__PURE__ */ jsx(Link, {
					className: "text-link g-about",
					to: "/calificaciones",
					children: "Sobre nuestras calificaciones →"
				})
			]
		})
	});
}
//#endregion
export { Reviews as t };
