import { M as jsx, N as jsxs, a as vehicles, c as Eyebrow, j as Fragment, l as PageTitle, s as Button, u as Picture } from "../entry-server.js";
//#region src/pages/Fleet.jsx
function Fleet() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageTitle, {
			tag: "La comodidad también es parte del viaje",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"El espacio justo.",
				/* @__PURE__ */ jsx("br", {}),
				"El camino ",
				/* @__PURE__ */ jsx("em", { children: "compartido." })
			] }),
			text: "Elige la categoría que se ajusta a tu grupo. Confirmamos unidad, equipaje y equipamiento al cotizar."
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
						/* @__PURE__ */ jsxs("span", {
							className: "capacity",
							children: [v.capacity, " pasajeros"]
						}),
						/* @__PURE__ */ jsx("p", { children: v.use }),
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
				/* @__PURE__ */ jsxs("h2", { children: [
					"Personas, maletas",
					/* @__PURE__ */ jsx("br", {}),
					"y todo lo que ",
					/* @__PURE__ */ jsx("em", { children: "importa." })
				] }),
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
		})
	] });
}
//#endregion
export { Fleet as default };
