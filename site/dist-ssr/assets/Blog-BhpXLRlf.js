import { B as jsxs, M as usePageMeta, R as Fragment, U as language, _ as Arrow, d as PageTitle, f as Picture, l as Button, t as articles, z as jsx } from "../entry-server.js";
import NotFound from "./NotFound-DqRFEl7f.js";
import { n as useGlassPill, t as GlassPill } from "./glass-BONCV8ov.js";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
//#region src/BlogIndex.jsx
var PAGE = 12;
var MIN_RAIL = 5;
var reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
var fmt = (iso) => {
	try {
		return (/* @__PURE__ */ new Date(`${iso}T12:00:00`)).toLocaleDateString(language() === "es" ? "es-CO" : language(), {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	} catch {
		return iso;
	}
};
function Meta({ a }) {
	const bits = [a.date && /* @__PURE__ */ jsx("time", {
		dateTime: a.date,
		children: fmt(a.date)
	}, "d"), a.minutes && /* @__PURE__ */ jsxs("span", { children: [a.minutes, " min de lectura"] }, "m")].filter(Boolean);
	return bits.length ? /* @__PURE__ */ jsx("span", {
		className: "bc-meta",
		children: bits.reduce((acc, b, i) => i ? [
			...acc,
			" · ",
			b
		] : [b], [])
	}) : null;
}
function Card({ a, sizes, eager }) {
	return /* @__PURE__ */ jsxs(Link, {
		to: `/blog/${a.slug}`,
		className: "blog-card",
		draggable: "false",
		children: [/* @__PURE__ */ jsx("span", {
			className: "bc-media",
			children: /* @__PURE__ */ jsx(Picture, {
				photo: a.image,
				alt: "",
				sizes,
				priority: eager
			})
		}), /* @__PURE__ */ jsxs("span", {
			className: "bc-body",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "bc-tag",
					children: a.tag
				}),
				/* @__PURE__ */ jsx("h3", { children: a.title }),
				/* @__PURE__ */ jsx(Meta, { a }),
				/* @__PURE__ */ jsxs("span", {
					className: "bc-more",
					children: ["Leer la nota", /* @__PURE__ */ jsx(Arrow, {})]
				})
			]
		})]
	});
}
function Rail({ items }) {
	const rail = useRef(null), drag = useRef({
		on: false,
		moved: 0,
		x: 0,
		left: 0,
		v: 0,
		t: 0,
		raf: 0
	});
	const [edge, setEdge] = useState({
		start: true,
		end: false
	}), [cur, setCur] = useState(0);
	const sync = useCallback(() => {
		const el = rail.current;
		if (!el) return;
		setEdge({
			start: el.scrollLeft < 4,
			end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
		});
		const it = el.firstElementChild;
		if (it) setCur(Math.min(el.children.length - 1, Math.round(el.scrollLeft / (it.offsetWidth + 14))));
	}, []);
	useEffect(() => {
		sync();
		const el = rail.current, ro = new ResizeObserver(sync), d = drag.current;
		ro.observe(el);
		return () => {
			ro.disconnect();
			cancelAnimationFrame(d.raf);
		};
	}, [sync, items.length]);
	const step = (dir) => {
		const el = rail.current;
		el.scrollBy({
			left: dir * Math.max(240, el.clientWidth * .8),
			behavior: reduced() ? "auto" : "smooth"
		});
	};
	const down = (e) => {
		if (e.pointerType !== "mouse" || e.button !== 0) return;
		const d = drag.current, el = rail.current;
		cancelAnimationFrame(d.raf);
		Object.assign(d, {
			on: true,
			moved: 0,
			x: e.clientX,
			left: el.scrollLeft,
			v: 0,
			t: performance.now()
		});
		el.dataset.drag = "true";
	};
	const move = (e) => {
		const d = drag.current;
		if (!d.on) return;
		const el = rail.current, dx = e.clientX - d.x, now = performance.now();
		d.moved = Math.max(d.moved, Math.abs(dx));
		if (d.moved > 6 && !el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId);
		const prev = el.scrollLeft;
		el.scrollLeft = d.left - dx;
		d.v = .8 * d.v + .2 * ((el.scrollLeft - prev) / Math.max(1, now - d.t));
		d.t = now;
	};
	const up = (e) => {
		const d = drag.current, el = rail.current;
		if (!d.on) return;
		d.on = false;
		try {
			el.releasePointerCapture(e.pointerId);
		} catch {}
		let v = d.v * 16;
		const run = () => {
			const before = el.scrollLeft;
			el.scrollLeft += v;
			v *= .94;
			if (Math.abs(v) > .4 && el.scrollLeft !== before) d.raf = requestAnimationFrame(run);
			else {
				delete el.dataset.drag;
				sync();
			}
		};
		if (Math.abs(v) > 1 && !reduced()) run();
		else delete el.dataset.drag;
	};
	const key = (e) => {
		if (e.key === "ArrowRight") {
			e.preventDefault();
			step(1);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			step(-1);
		} else if (e.key === "Home") {
			e.preventDefault();
			rail.current.scrollTo({ left: 0 });
		} else if (e.key === "End") {
			e.preventDefault();
			rail.current.scrollTo({ left: rail.current.scrollWidth });
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "blog-rail-wrap",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "blog-rail-head",
				children: [/* @__PURE__ */ jsx("h2", { children: "Recientes" }), /* @__PURE__ */ jsxs("div", {
					className: "blog-rail-arrows",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Notas anteriores",
						disabled: edge.start,
						onClick: () => step(-1),
						children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Notas siguientes",
						disabled: edge.end,
						onClick: () => step(1),
						children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				ref: rail,
				className: "blog-rail",
				role: "region",
				"aria-roledescription": "carrusel",
				"aria-label": "Notas recientes",
				tabIndex: 0,
				onKeyDown: key,
				onScroll: sync,
				onPointerDown: down,
				onPointerMove: move,
				onPointerUp: up,
				onPointerCancel: up,
				onClickCapture: (e) => {
					if (drag.current.moved > 6) {
						e.preventDefault();
						e.stopPropagation();
						drag.current.moved = 0;
					}
				},
				children: items.map((a) => /* @__PURE__ */ jsx("div", {
					className: "blog-rail-item",
					children: /* @__PURE__ */ jsx(Card, {
						a,
						sizes: "(max-width: 699px) 82vw, 340px"
					})
				}, a.slug))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "blog-rail-dots",
				"aria-hidden": "true",
				children: items.map((a, i) => /* @__PURE__ */ jsx("i", { "data-on": i === cur }, a.slug))
			})
		]
	});
}
function BlogIndex() {
	const [filter, setFilter] = useState("Todas"), [shown, setShown] = useState(PAGE), tabs = useRef(null);
	useGlassPill(tabs, filter);
	const cats = ["Todas", ...new Set(articles.map((a) => a.tag))];
	const [featured, ...rest] = articles;
	const pool = filter === "Todas" ? rest : articles.filter((a) => a.tag === filter);
	const list = pool.slice(0, shown);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		featured && /* @__PURE__ */ jsx("section", {
			className: "wrap blog-featured",
			"aria-labelledby": "blog-destacado",
			children: /* @__PURE__ */ jsxs(Link, {
				to: `/blog/${featured.slug}`,
				className: "bf-card",
				draggable: "false",
				children: [/* @__PURE__ */ jsx("span", {
					className: "bf-media",
					children: /* @__PURE__ */ jsx(Picture, {
						photo: featured.image,
						alt: "",
						priority: true,
						sizes: "(max-width: 899px) 100vw, 60vw"
					})
				}), /* @__PURE__ */ jsxs("span", {
					className: "bf-copy",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "bc-tag",
							children: ["Nota destacada · ", featured.tag]
						}),
						/* @__PURE__ */ jsx("h2", {
							id: "blog-destacado",
							children: featured.title
						}),
						/* @__PURE__ */ jsx(Meta, { a: featured }),
						/* @__PURE__ */ jsx("span", {
							className: "bf-intro",
							children: featured.intro
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "bc-more",
							children: ["Leer la nota", /* @__PURE__ */ jsx(Arrow, {})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "wrap blog-all",
			"aria-labelledby": "blog-todas",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "blog-tools",
					children: [/* @__PURE__ */ jsx("h2", {
						id: "blog-todas",
						children: "Todas las notas"
					}), cats.length > 2 && /* @__PURE__ */ jsxs("div", {
						ref: tabs,
						className: "filters glass-tabs",
						role: "group",
						"aria-label": "Filtrar por categoría",
						children: [/* @__PURE__ */ jsx(GlassPill, {}), cats.map((c) => /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-pressed": filter === c,
							onClick: () => {
								setFilter(c);
								setShown(PAGE);
							},
							children: c
						}, c))]
					})]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "result-count",
					role: "status",
					children: [
						pool.length,
						" ",
						pool.length === 1 ? "nota" : "notas"
					]
				}),
				list.length ? /* @__PURE__ */ jsx("div", {
					className: "blog-grid-4",
					children: list.map((a, i) => /* @__PURE__ */ jsx(Card, {
						a,
						sizes: "(max-width: 559px) 100vw, (max-width: 1199px) 50vw, 25vw",
						eager: i < 2
					}, a.slug))
				}) : /* @__PURE__ */ jsx("p", {
					className: "empty-note",
					children: "Aún no hay notas en esta categoría."
				}),
				pool.length > shown && /* @__PURE__ */ jsx("div", {
					className: "blog-more",
					children: /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "button secondary",
						onClick: () => setShown((n) => n + PAGE),
						children: "Cargar más"
					})
				})
			]
		}),
		articles.length >= MIN_RAIL && /* @__PURE__ */ jsx("section", {
			className: "wrap blog-recent",
			children: /* @__PURE__ */ jsx(Rail, { items: articles })
		})
	] });
}
//#endregion
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
	}), /* @__PURE__ */ jsx(BlogIndex, {})] });
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
				alt: article.imageAlt,
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
