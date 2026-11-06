import { R as slugFromPath, Y as company, d as allowAnalytics, et as stripLanguage } from "../entry-server.js";
//#region src/analytics.js
var GTM_ID = void 0;
var PERMITIDOS = [
	"tipo",
	"slug",
	"origen",
	"posicion",
	"lista",
	"tipo_error"
];
`${company.whatsapp}`;
var activa = () => Boolean(GTM_ID) && allowAnalytics();
function track(event, params = {}) {
	if (!activa()) return;
	const limpios = Object.fromEntries(PERMITIDOS.map((clave) => [clave, typeof params[clave] === "string" ? params[clave].slice(0, 100) : params[clave]]));
	window.dataLayer.push({
		event,
		idioma: document.documentElement.lang,
		...limpios
	});
}
function trackView(params) {
	if (activa()) track("view_item", params);
	return () => {};
}
function contextoPagina() {
	const origen = stripLanguage(location.pathname), slug = slugFromPath(origen);
	return {
		origen,
		slug,
		tipo: slug ? "experiencia" : "general"
	};
}
//#endregion
export { track as n, trackView as r, contextoPagina as t };
