import { F as NOT_FOUND, I as usePageMeta, J as jsxs, K as Fragment, a as tours, m as PageTitle, q as jsx, v as TourCard, x as Arrow } from "../entry-server.js";
import { Link } from "react-router-dom";
//#region src/pages/NotFound.jsx
function NotFound() {
	usePageMeta(NOT_FOUND[0], NOT_FOUND[1]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageTitle, {
		tag: "404 · Página no encontrada",
		title: "No encontramos esta página"
	}), /* @__PURE__ */ jsxs("section", {
		className: "wrap section",
		children: [/* @__PURE__ */ jsx("div", {
			className: "tour-grid",
			children: [
				tours[1],
				tours[0],
				tours[4]
			].map((t) => /* @__PURE__ */ jsx(TourCard, { tour: t }, t.slug))
		}), /* @__PURE__ */ jsxs(Link, {
			className: "text-link",
			to: "/tours",
			children: ["Volver a las experiencias", /* @__PURE__ */ jsx(Arrow, {})]
		})]
	})] });
}
//#endregion
export { NotFound as default };
