import { F as jsx, I as jsxs, L as company, P as Fragment, l as PageTitle } from "../entry-server.js";
//#region src/pages/DataPolicy.jsx
var SECTIONS = [
	["responsable", "1. Responsable del tratamiento"],
	["datos", "2. Datos que recogemos"],
	["finalidad", "3. Finalidad"],
	["autorizacion", "4. Autorización"],
	["derechos", "5. Tus derechos"],
	["ejercer", "6. Cómo ejercerlos"],
	["retencion", "7. Retención"],
	["cookies", "8. Cookies"],
	["medicion", "9. Medición del sitio"]
];
function DataPolicy() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageTitle, {
		tag: "Ley 1581 de 2012 · Habeas Data",
		title: "Política de tratamiento de datos personales",
		text: "Qué datos nos compartes, con qué finalidad los usamos, cuánto tiempo los conservamos y cómo puedes ejercer tus derechos."
	}), /* @__PURE__ */ jsxs("div", {
		className: "policy wrap",
		children: [/* @__PURE__ */ jsxs("nav", {
			className: "policy-index",
			"aria-label": "Contenido de la política",
			children: [/* @__PURE__ */ jsx("p", {
				className: "eyebrow",
				children: "En esta página"
			}), /* @__PURE__ */ jsx("ol", { children: SECTIONS.map(([id, label]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
				href: `#${id}`,
				children: label
			}) }, id)) })]
		}), /* @__PURE__ */ jsxs("article", {
			className: "policy-body",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "policy-note",
					children: [/* @__PURE__ */ jsx("strong", { children: "Documento pendiente de validación legal." }), " El contenido siguiente es un borrador técnico que recoge lo que exige la Ley 1581 de 2012. Debe ser revisado y aprobado por el asesor jurídico de la empresa antes de considerarse vigente."]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "responsable",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "1. Responsable del tratamiento" }),
						/* @__PURE__ */ jsxs("p", { children: [
							"Transporte y Turismo Medellín, con domicilio en Carrera 79AA #1A Sur-280, Medellín, correo ",
							/* @__PURE__ */ jsx("a", {
								href: `mailto:${company.email}`,
								children: company.email
							}),
							" y teléfono +57 304 496 1698."
						] }),
						/* @__PURE__ */ jsx("p", { children: "NIT 901738550-6. RNT 176384." })
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "datos",
					children: [/* @__PURE__ */ jsx("h2", { children: "2. Datos que recogemos" }), /* @__PURE__ */ jsx("p", { children: "Únicamente los que nos escribes en el formulario de contacto: nombre, empresa u organización, correo electrónico, teléfono, tipo de consulta, número de personas, fecha del viaje y el mensaje. No recogemos datos sensibles ni datos de menores de edad." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "finalidad",
					children: [/* @__PURE__ */ jsx("h2", { children: "3. Finalidad" }), /* @__PURE__ */ jsx("p", { children: "Responder a tu consulta, elaborar la cotización o propuesta que solicites y mantener el contacto comercial derivado de esa solicitud. No usamos tus datos para ninguna otra cosa ni los cedemos a terceros con fines publicitarios." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "autorizacion",
					children: [/* @__PURE__ */ jsx("h2", { children: "4. Autorización" }), /* @__PURE__ */ jsx("p", { children: "El tratamiento requiere tu autorización previa, expresa e informada, que otorgas marcando la casilla correspondiente en el formulario. La casilla nunca viene marcada de antemano, y puedes retirar tu autorización en cualquier momento." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "derechos",
					children: [/* @__PURE__ */ jsx("h2", { children: "5. Tus derechos" }), /* @__PURE__ */ jsx("p", { children: "Como titular puedes conocer, actualizar y rectificar tus datos; solicitar prueba de la autorización; ser informado del uso que les damos; presentar quejas ante la Superintendencia de Industria y Comercio; y revocar la autorización o solicitar la supresión de tus datos." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "ejercer",
					children: [/* @__PURE__ */ jsx("h2", { children: "6. Cómo ejercerlos" }), /* @__PURE__ */ jsxs("p", { children: [
						"Escribiendo a ",
						/* @__PURE__ */ jsx("a", {
							href: `mailto:${company.email}`,
							children: company.email
						}),
						" con el asunto «Protección de datos». Atendemos consultas en un plazo máximo de diez días hábiles y reclamos en quince, conforme a la ley."
					] })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "retencion",
					children: [/* @__PURE__ */ jsx("h2", { children: "7. Retención" }), /* @__PURE__ */ jsx("p", { children: "Conservamos los datos mientras dure la relación comercial y, después, durante el plazo legal aplicable a las obligaciones contables y fiscales. Cumplido ese plazo, se suprimen." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "cookies",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "8. Cookies" }),
						/* @__PURE__ */ jsxs("p", { children: [
							"Usamos dos clases de cookies propias. Las ",
							/* @__PURE__ */ jsx("strong", { children: "necesarias" }),
							" solo guardan tus preferencias en este navegador —el idioma, el tema claro u oscuro y tu propia decisión sobre cookies— y sin ellas el sitio no puede recordarte cómo lo dejaste. Las ",
							/* @__PURE__ */ jsx("strong", { children: "de medición" }),
							" nos dicen qué páginas se visitan y qué botones se pulsan."
						] }),
						/* @__PURE__ */ jsxs("p", { children: [
							"Las de medición ",
							/* @__PURE__ */ jsx("strong", { children: "no se activan hasta que las aceptas" }),
							" en el aviso que aparece al entrar. Si eliges «solo las necesarias», no se descarga ninguna herramienta de terceros y no se envía ningún dato. Puedes cambiar de opinión cuando quieras borrando las cookies de este sitio en tu navegador: el aviso volverá a aparecer."
						] })
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "medicion",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "9. Medición del sitio" }),
						/* @__PURE__ */ jsx("p", { children: "Si aceptas las cookies de medición, usamos Google Tag Manager y Google Analytics para entender cómo se usa el sitio: qué páginas se ven, en qué idioma, qué destinos despiertan más interés y desde dónde se nos escribe por WhatsApp. Lo hacemos para mejorar la web, no para perseguirte." }),
						/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", { children: "Nunca enviamos a esas herramientas tu nombre, tu correo, tu teléfono ni el contenido de tu mensaje." }), " Lo que se registra es la página y el botón, nunca quién eres. La dirección IP se anonimiza y la información se conserva un máximo de catorce meses, tras los cuales se elimina."] }),
						/* @__PURE__ */ jsx("p", {
							className: "policy-muted",
							children: "Google actúa como encargado del tratamiento y puede almacenar esos datos fuera de Colombia. Al aceptar, autorizas esa transferencia internacional."
						})
					]
				})
			]
		})]
	})] });
}
//#endregion
export { DataPolicy as default };
