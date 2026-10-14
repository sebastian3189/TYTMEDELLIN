import { M as Fragment, N as jsx, P as jsxs, b as Trust, l as PageTitle, p as TourCard, r as tours, x as useFlipGrid, y as Marquee } from "../entry-server.js";
import { n as useGlassPill, t as GlassPill } from "./glass-CyzLLjUo.js";
import { useRef, useState } from "react";
//#region src/pages/Catalog.jsx
function Catalog() {
	const [filter, setFilter] = useState("Todos");
	const [query, setQuery] = useState("");
	const categories = ["Todos", ...new Set(tours.map((t) => t.category))];
	const grid = useRef(null), tabs = useRef(null);
	useGlassPill(tabs, filter);
	const list = tours.filter((t) => (filter === "Todos" || t.category === filter) && `${t.name} ${t.description}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()));
	useFlipGrid(grid, list.map((t) => t.slug).join("|"));
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageTitle, {
			photo: tours[1].images[0],
			floating: [tours[0].images[0], tours[4].images[0]],
			tag: "La colección T&T",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"¿Qué historia",
				/* @__PURE__ */ jsx("br", {}),
				"quieres ",
				/* @__PURE__ */ jsx("em", { children: "vivir?" })
			] }),
			text: "Doce maneras de empezar. Medellín y los recorridos por Antioquia que nacen desde nuestra ciudad."
		}),
		/* @__PURE__ */ jsx(Trust, {}),
		/* @__PURE__ */ jsxs("section", {
			className: "wrap catalog",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "catalog-tools",
					children: [/* @__PURE__ */ jsxs("div", {
						ref: tabs,
						className: "filters glass-tabs",
						"aria-label": "Filtrar experiencias",
						children: [/* @__PURE__ */ jsx(GlassPill, {}), categories.map((c) => /* @__PURE__ */ jsx("button", {
							"aria-pressed": filter === c,
							onClick: () => setFilter(c),
							children: c
						}, c))]
					}), /* @__PURE__ */ jsxs("label", {
						className: "search",
						children: ["Buscar experiencia", /* @__PURE__ */ jsx("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Café, Guatapé, ciudad…",
							type: "search"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "result-count",
					role: "status",
					children: [list.length, " experiencias para explorar"]
				}),
				/* @__PURE__ */ jsx("div", {
					ref: grid,
					className: "tour-grid",
					children: list.map((t) => /* @__PURE__ */ jsx(TourCard, { tour: t }, t.slug))
				}),
				!list.length && /* @__PURE__ */ jsxs("div", {
					className: "empty",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "Probemos con otro camino." }),
						/* @__PURE__ */ jsx("p", { children: "No encontramos experiencias con ese filtro." }),
						/* @__PURE__ */ jsx("button", {
							className: "button",
							onClick: () => {
								setFilter("Todos");
								setQuery("");
							},
							children: "Mostrar todas"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsx(Marquee, { text: "MEDELLÍN · GUATAPÉ · JARDÍN" })
	] });
}
//#endregion
export { Catalog as default };
