import { B as jsx, V as jsxs, g as hiddenByCover, v as Arrow, w as useLightMotion } from "../entry-server.js";
import { useLayoutEffect, useRef, useState } from "react";
//#region src/FeaturedGallery.jsx
function FeaturedGallery({ tour }) {
	const [index, setIndex] = useState(0), dialog = useRef(null), image = useRef(null), origin = useRef(null), swipe = useRef(null), swiped = useRef(false), returnFocus = useRef(null), light = useLightMotion();
	const images = tour.gallery || tour.images;
	if (!images.length) return null;
	const choose = (i, node) => {
		if (i === index) return;
		origin.current = node?.getBoundingClientRect();
		setIndex((i + images.length) % images.length);
	};
	useLayoutEffect(() => {
		const node = image.current, from = origin.current;
		origin.current = null;
		if (!node || light || !node.animate) return;
		const to = node.getBoundingClientRect();
		const animation = node.animate([from ? {
			transform: `translate(${from.left - to.left}px,${from.top - to.top}px) scale(${from.width / to.width})`,
			opacity: .4
		} : {
			transform: "translateY(18px) scale(.98)",
			opacity: .35
		}, {
			transform: "none",
			opacity: 1
		}], {
			duration: 600,
			easing: "cubic-bezier(.77,0,.175,1)"
		});
		return () => animation.cancel();
	}, [index, light]);
	const keys = (e, i) => {
		let n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? images.length - 1 : null;
		if (n === null) return;
		e.preventDefault();
		n = (n + images.length) % images.length;
		choose(n, e.currentTarget.parentElement.children[n]);
		e.currentTarget.parentElement.children[n]?.focus();
	};
	const open = (e) => {
		returnFocus.current = e.currentTarget;
		dialog.current.showModal();
	};
	const img = (photo, full = false) => /* @__PURE__ */ jsx("img", {
		src: full ? photo.src : photo.small || photo.src,
		srcSet: full ? photo.srcset || (photo.small ? `${photo.small} 640w, ${photo.src} ${photo.width}w` : void 0) : void 0,
		sizes: `(max-width:899px) min(100vw, ${photo.width}px), min(62vw, ${photo.width}px)`,
		style: full ? {
			maxWidth: `${photo.width}px`,
			marginInline: "auto"
		} : void 0,
		width: photo.width,
		height: photo.height,
		alt: full ? `${tour.name}, fotografía ${index + 1}` : "",
		loading: "lazy",
		decoding: "async"
	});
	return /* @__PURE__ */ jsxs("section", {
		className: "wrap section gallery",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-title",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: "El archivo de nuestros viajes"
				}), /* @__PURE__ */ jsxs("h2", { children: [
					"Así se vive",
					/* @__PURE__ */ jsx("br", {}),
					/* @__PURE__ */ jsx("em", { children: tour.name })
				] })] }), /* @__PURE__ */ jsxs("span", { children: [images.length, " fotografías · Toca para ampliar"] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "gallery-main",
				children: [/* @__PURE__ */ jsx("button", {
					ref: image,
					className: `gallery-feature${hiddenByCover(images[index], 1.5) > .3 ? " is-fit" : ""}`,
					style: {
						"--ph": `url(${images[index].small || images[index].src})`,
						maxWidth: `${Math.max(480, images[index].width)}px`,
						justifySelf: "start",
						width: "100%"
					},
					onClick: (e) => {
						if (swiped.current) {
							swiped.current = false;
							return;
						}
						open(e);
					},
					"aria-label": `Ampliar fotografía ${index + 1} de ${tour.name}`,
					onPointerDown: (e) => {
						swipe.current = e.clientX;
						swiped.current = false;
						e.currentTarget.setPointerCapture(e.pointerId);
					},
					onPointerCancel: () => {
						swipe.current = null;
					},
					onPointerUp: (e) => {
						if (swipe.current === null) return;
						const dx = e.clientX - swipe.current;
						if (Math.abs(dx) > 45) {
							swiped.current = true;
							choose(index + (dx < 0 ? 1 : -1));
						}
						swipe.current = null;
					},
					children: img(images[index], true)
				}), /* @__PURE__ */ jsxs("div", {
					className: "gallery-caption",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow",
							children: tour.name
						}),
						/* @__PURE__ */ jsx("h3", { children: "El archivo de nuestros viajes" }),
						/* @__PURE__ */ jsxs("p", { children: [
							"Fotografía ",
							String(index + 1).padStart(2, "0"),
							" de ",
							String(images.length).padStart(2, "0")
						] }),
						/* @__PURE__ */ jsxs("button", {
							className: "button secondary",
							onClick: open,
							children: ["Ampliar fotografía", /* @__PURE__ */ jsx(Arrow, {})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "gallery-controls",
							children: [
								/* @__PURE__ */ jsx("button", {
									onClick: () => choose(index - 1),
									"aria-label": "Fotografía anterior",
									children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
								}),
								/* @__PURE__ */ jsxs("span", {
									"aria-live": "polite",
									children: [
										index + 1,
										" / ",
										images.length
									]
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => choose(index + 1),
									"aria-label": "Fotografía siguiente",
									children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "gallery-thumbs",
				role: "group",
				"aria-label": `Elegir fotografía de ${tour.name}`,
				children: images.map((photo, i) => /* @__PURE__ */ jsx("button", {
					tabIndex: i === index ? 0 : -1,
					"aria-pressed": i === index,
					"aria-label": `Fotografía ${i + 1} de ${tour.name}`,
					onClick: (e) => choose(i, e.currentTarget),
					onKeyDown: (e) => keys(e, i),
					children: img(photo)
				}, photo.src))
			}),
			/* @__PURE__ */ jsxs("dialog", {
				ref: dialog,
				className: "lightbox",
				"aria-label": `Galería ampliada de ${tour.name}`,
				onClose: () => returnFocus.current?.focus(),
				onClick: (e) => {
					if (e.target === dialog.current) dialog.current.close();
				},
				onKeyDown: (e) => {
					if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
						e.preventDefault();
						choose(index + (e.key === "ArrowRight" ? 1 : -1));
					}
				},
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "lightbox-close",
						onClick: () => dialog.current.close(),
						children: "Cerrar ×"
					}),
					img(images[index], true),
					/* @__PURE__ */ jsxs("div", {
						className: "gallery-controls",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => choose(index - 1),
								"aria-label": "Fotografía anterior",
								children: /* @__PURE__ */ jsx(Arrow, { dir: "left" })
							}),
							/* @__PURE__ */ jsxs("span", {
								"aria-live": "polite",
								children: [
									tour.name,
									" · ",
									index + 1,
									" / ",
									images.length
								]
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: () => choose(index + 1),
								"aria-label": "Fotografía siguiente",
								children: /* @__PURE__ */ jsx(Arrow, { dir: "right" })
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { FeaturedGallery as t };
