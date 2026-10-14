import { M as Fragment, N as jsx, O as usePageMeta, P as jsxs, c as Eyebrow, h as Arrow, l as PageTitle, s as Button, t as articles, u as Picture } from "../entry-server.js";
import NotFound from "./NotFound-hdxCCg5R.js";
import { Link, useParams } from "react-router-dom";
//#region src/pages/Blog.jsx
function Blog() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageTitle, {
		tag: "Cuaderno de viaje",
		title: /* @__PURE__ */ jsxs(Fragment, { children: [
			"Ideas para viajar",
			/* @__PURE__ */ jsx("br", {}),
			"con más ",
			/* @__PURE__ */ jsx("em", { children: "sentido." })
		] }),
		text: "Notas del equipo para elegir, preparar y disfrutar tus recorridos desde Medellín."
	}), /* @__PURE__ */ jsx("section", {
		className: "wrap blog-grid",
		children: articles.map((a, i) => /* @__PURE__ */ jsxs(Link, {
			to: `/blog/${a.slug}`,
			className: "blog-card",
			children: [
				/* @__PURE__ */ jsx(Picture, {
					photo: a.image,
					alt: "Archivo de viajes de T&T Medellín"
				}),
				/* @__PURE__ */ jsxs(Eyebrow, { children: [
					a.tag,
					" · Nota 0",
					i + 1
				] }),
				/* @__PURE__ */ jsx("h2", { children: a.title }),
				/* @__PURE__ */ jsx("p", { children: a.intro }),
				/* @__PURE__ */ jsxs("span", {
					className: "text-link",
					children: ["Leer la nota", /* @__PURE__ */ jsx(Arrow, {})]
				})
			]
		}, a.slug))
	})] });
}
function Article() {
	const { slug } = useParams(), article = articles.find((a) => a.slug === slug);
	usePageMeta(article?.title, article?.intro);
	if (!article) return /* @__PURE__ */ jsx(NotFound, {});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageTitle, {
			tag: `Cuaderno de viaje · ${article.tag}`,
			title: article.title,
			text: article.intro
		}),
		/* @__PURE__ */ jsx("div", {
			className: "article-image wrap",
			children: /* @__PURE__ */ jsx(Picture, {
				photo: article.image,
				alt: "Recorrido de T&T Medellín",
				priority: true
			})
		}),
		/* @__PURE__ */ jsxs("article", {
			className: "article-body",
			children: [
				article.sections.map(([t, p]) => /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", { children: t }), /* @__PURE__ */ jsx("p", { children: p })] }, t)),
				/* @__PURE__ */ jsx(Button, {
					to: "/experiencias",
					children: "Encuentra tu recorrido"
				}),
				/* @__PURE__ */ jsxs(Link, {
					className: "text-link",
					to: "/blog",
					children: [/* @__PURE__ */ jsx(Arrow, { dir: "left" }), "Volver al cuaderno"]
				})
			]
		})
	] });
}
//#endregion
export { Blog, Article as default };
