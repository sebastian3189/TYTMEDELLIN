import { B as jsx, I as Icon, V as jsxs, a as vehicles, d as PageTitle, f as Picture, l as Button, u as Eyebrow, z as Fragment } from "../entry-server.js";
import { i as FAQ_FLEET, l as Faq } from "./faq-data-BdDInLlq.js";
//#region src/pages/Fleet.jsx
function Fleet() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageTitle, {
			tag: "Nuestra flota",
			title: "Vehículos para cada tipo de viaje",
			text: "Elige la categoría según el tamaño de tu grupo y tu equipaje. Confirmamos la unidad al cotizar."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "wrap fleet-grid",
			children: vehicles.map((v, i) => /* @__PURE__ */ jsxs("article", {
				className: "vehicle",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "vehicle-index",
						children: ["0", i + 1]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "vehicle-media",
						children: /* @__PURE__ */ jsx(Picture, {
							photo: v.image,
							alt: `Categoría ${v.name}`,
							native: true,
							priority: i === 0
						})
					}),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h2", { children: v.name }),
						/* @__PURE__ */ jsxs("p", {
							className: "capacity",
							children: [/* @__PURE__ */ jsx(Icon, {
								name: "users",
								size: 16
							}), /* @__PURE__ */ jsxs("span", { children: [v.capacity, " pasajeros"] })]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "vehicle-use",
							children: v.use
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "vehicle-features",
							role: "list",
							children: v.features.map((f) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx(Icon, {
								name: f.icon,
								size: 15
							}), /* @__PURE__ */ jsx("span", { children: f.label })] }, f.key))
						}),
						/* @__PURE__ */ jsx(Button, {
							to: `/cotizar?vehiculo=${encodeURIComponent(v.name)}`,
							children: "Consultar este vehículo"
						})
					] })
				]
			}, v.name))
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "wrap section",
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "Antes de elegir" }),
				/* @__PURE__ */ jsx("h2", { children: "Qué tener en cuenta al elegir" }),
				/* @__PURE__ */ jsx("div", {
					className: "three-columns",
					children: [
						["El tamaño del grupo", "Comparte el número de viajeros y edades para revisar opciones."],
						["El equipaje", "Indica maletas y equipos: la capacidad cambia según lo que lleves."],
						["Tu recorrido", "La ruta, las paradas y la fecha determinan la unidad disponible."]
					].map(([t, p]) => /* @__PURE__ */ jsxs("article", { children: [/* @__PURE__ */ jsx("h3", { children: t }), /* @__PURE__ */ jsx("p", { children: p })] }, t))
				}),
				/* @__PURE__ */ jsx("p", {
					className: "fine-print",
					children: "Categorías del catálogo de la marca. Fotografías de referencia; la unidad asignada y su disponibilidad en Medellín se confirman en la propuesta."
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "wrap section faq-page",
			children: /* @__PURE__ */ jsx(Faq, {
				items: FAQ_FLEET,
				eyebrow: "Antes de elegir",
				title: "Dudas sobre vehículos y grupos"
			})
		})
	] });
}
//#endregion
export { Fleet as default };
