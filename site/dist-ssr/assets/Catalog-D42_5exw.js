import { B as jsxs, R as Fragment, S as useFlipGrid, h as TourCard, r as tours, x as Trust, z as jsx } from "../entry-server.js";
import { n as useGlassPill, t as GlassPill } from "./glass-BONCV8ov.js";
import { t as CatalogHero } from "./Hero-8hnWkv8g.js";
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
		/* @__PURE__ */ jsx(CatalogHero, {}),
		/* @__PURE__ */ jsx(Trust, {}),
		/* @__PURE__ */ jsxs("section", {
			className: "wrap catalog",
			id: "catalogo",
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
		})
	] });
}
//#endregion
export { Catalog as default };
