import { A as usePageMeta, M as Fragment, N as jsx, P as jsxs, d as PageTitle, g as TourCard, k as NOT_FOUND, r as tours } from "../entry-server.js";
import { Link } from "react-router-dom";
//#region src/pages/NotFound.jsx
function NotFound() {
	usePageMeta(NOT_FOUND[0], NOT_FOUND[1]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageTitle, {
		tag: "404 · Otro camino",
		title: /* @__PURE__ */ jsxs(Fragment, { children: [
			"Este recorrido",
			/* @__PURE__ */ jsx("br", {}),
			"no está ",
			/* @__PURE__ */ jsx("em", { children: "aquí." })
		] })
	}), /* @__PURE__ */ jsxs("section", {
		className: "wrap section",
		children: [/* @__PURE__ */ jsx("div", {
			className: "tour-grid",
			children: [
				tours[1],
				tours[0],
				tours[4]
			].map((t) => /* @__PURE__ */ jsx(TourCard, { tour: t }, t.slug))
		}), /* @__PURE__ */ jsx(Link, {
			className: "text-link",
			to: "/experiencias",
			children: "Volver a las experiencias ↗"
		})]
	})] });
}
//#endregion
export { NotFound as default };
