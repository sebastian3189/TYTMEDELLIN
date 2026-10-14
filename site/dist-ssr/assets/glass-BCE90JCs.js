import { M as jsx } from "../entry-server.js";
import { useLayoutEffect } from "react";
//#region src/glass.jsx
var GlassPill = () => /* @__PURE__ */ jsx("span", {
	className: "glass-pill",
	"aria-hidden": "true"
});
function useGlassPill(ref, signal, enabled = true) {
	useLayoutEffect(() => {
		const box = ref.current;
		if (!enabled || !box) return void 0;
		const place = () => {
			const el = box.querySelector("[aria-pressed=\"true\"],[aria-selected=\"true\"]");
			if (!el) return;
			box.style.setProperty("--px", `${el.offsetLeft}px`);
			box.style.setProperty("--py", `${el.offsetTop}px`);
			box.style.setProperty("--pw", `${el.offsetWidth}px`);
			box.style.setProperty("--ph", `${el.offsetHeight}px`);
			if (box.scrollWidth > box.clientWidth + 1) box.scrollTo({
				left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2,
				behavior: box.classList.contains("is-ready") ? "smooth" : "instant"
			});
			if (!box.classList.contains("is-ready")) requestAnimationFrame(() => box.classList.add("is-ready"));
		};
		place();
		document.fonts?.ready.then(place);
		const ro = new ResizeObserver(place);
		ro.observe(box);
		return () => ro.disconnect();
	}, [
		ref,
		signal,
		enabled
	]);
}
//#endregion
export { useGlassPill as n, GlassPill as t };
