import { B as jsxs, R as Fragment, U as language, V as company, d as PageTitle, z as jsx } from "../entry-server.js";
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
	if (language() === "en") return /* @__PURE__ */ jsx(DataPolicyEn, {});
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
var SECTIONS_EN = [
	["controller", "1. Data controller"],
	["data", "2. Data we collect"],
	["purpose", "3. Purpose"],
	["authorization", "4. Authorization"],
	["rights", "5. Your rights"],
	["exercise", "6. How to exercise them"],
	["retention", "7. Retention"],
	["cookies", "8. Cookies"],
	["measurement", "9. Site measurement"]
];
function DataPolicyEn() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageTitle, {
		tag: "Law 1581 of 2012 · Habeas Data",
		title: "Personal data processing policy",
		text: "What data you share with us, what we use it for, how long we keep it and how you can exercise your rights."
	}), /* @__PURE__ */ jsxs("div", {
		className: "policy wrap",
		children: [/* @__PURE__ */ jsxs("nav", {
			className: "policy-index",
			"aria-label": "Policy contents",
			children: [/* @__PURE__ */ jsx("p", {
				className: "eyebrow",
				children: "On this page"
			}), /* @__PURE__ */ jsx("ol", { children: SECTIONS_EN.map(([id, label]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
				href: `#${id}`,
				children: label
			}) }, id)) })]
		}), /* @__PURE__ */ jsxs("article", {
			className: "policy-body",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "policy-note",
					lang: "en",
					children: [/* @__PURE__ */ jsx("strong", { children: "This English version is a courtesy translation. In case of discrepancy, the Spanish version prevails." }), " It also requires review by the company's legal consultant (see the legal validation note below)."]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "policy-note",
					children: [/* @__PURE__ */ jsx("strong", { children: "Document pending legal validation." }), " The following content is a technical draft that reflects what Law 1581 of 2012 requires. It must be reviewed and approved by the company's legal counsel before it is considered in force."]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "controller",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "1. Data controller" }),
						/* @__PURE__ */ jsxs("p", { children: [
							"Transporte y Turismo Medellín, domiciled at Carrera 79AA #1A Sur-280, Medellín, email ",
							/* @__PURE__ */ jsx("a", {
								href: `mailto:${company.email}`,
								children: company.email
							}),
							" and telephone +57 304 496 1698."
						] }),
						/* @__PURE__ */ jsx("p", { children: "NIT 901738550-6. RNT 176384." })
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "data",
					children: [/* @__PURE__ */ jsx("h2", { children: "2. Data we collect" }), /* @__PURE__ */ jsx("p", { children: "Only what you write to us in the contact form: name, company or organization, email address, telephone, type of enquiry, number of people, travel date and the message. We do not collect sensitive data or data of minors." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "purpose",
					children: [/* @__PURE__ */ jsx("h2", { children: "3. Purpose" }), /* @__PURE__ */ jsx("p", { children: "To answer your enquiry, prepare the quotation or proposal you request and maintain the commercial contact arising from that request. We do not use your data for anything else and we do not transfer it to third parties for advertising purposes." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "authorization",
					children: [/* @__PURE__ */ jsx("h2", { children: "4. Authorization" }), /* @__PURE__ */ jsx("p", { children: "Processing requires your prior, express and informed authorization, which you give by ticking the corresponding box in the form. The box is never ticked in advance, and you may withdraw your authorization at any time." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "rights",
					children: [/* @__PURE__ */ jsx("h2", { children: "5. Your rights" }), /* @__PURE__ */ jsx("p", { children: "As the data subject you may know, update and rectify your data; request proof of the authorization; be informed of the use we make of it; file complaints with the Superintendencia de Industria y Comercio (Superintendence of Industry and Commerce); and revoke the authorization or request the deletion of your data." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "exercise",
					children: [/* @__PURE__ */ jsx("h2", { children: "6. How to exercise them" }), /* @__PURE__ */ jsxs("p", { children: [
						"By writing to ",
						/* @__PURE__ */ jsx("a", {
							href: `mailto:${company.email}`,
							children: company.email
						}),
						" with the subject \"Protección de datos\" (data protection). We answer enquiries within a maximum of ten business days and claims within fifteen, in accordance with the law."
					] })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "retention",
					children: [/* @__PURE__ */ jsx("h2", { children: "7. Retention" }), /* @__PURE__ */ jsx("p", { children: "We keep the data for as long as the commercial relationship lasts and, afterwards, for the legal period applicable to accounting and tax obligations. Once that period has elapsed, the data is deleted." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "cookies",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "8. Cookies" }),
						/* @__PURE__ */ jsxs("p", { children: [
							"We use two kinds of first-party cookies. The ",
							/* @__PURE__ */ jsx("strong", { children: "necessary" }),
							" ones only store your preferences in this browser —the language, the light or dark theme and your own decision about cookies— and without them the site cannot remember how you left it. The ",
							/* @__PURE__ */ jsx("strong", { children: "measurement" }),
							" ones tell us which pages are visited and which buttons are pressed."
						] }),
						/* @__PURE__ */ jsxs("p", { children: [
							"Measurement cookies ",
							/* @__PURE__ */ jsx("strong", { children: "are not activated until you accept them" }),
							" in the notice that appears when you arrive. If you choose \"only the necessary ones\", no third-party tool is downloaded and no data is sent. You can change your mind whenever you want by deleting this site's cookies in your browser: the notice will appear again."
						] })
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "measurement",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "9. Site measurement" }),
						/* @__PURE__ */ jsx("p", { children: "If you accept measurement cookies, we use Google Tag Manager and Google Analytics to understand how the site is used: which pages are viewed, in which language, which destinations arouse the most interest and from where we are written to on WhatsApp. We do this to improve the website, not to chase you." }),
						/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", { children: "We never send those tools your name, your email, your telephone or the content of your message." }), " What is recorded is the page and the button, never who you are. The IP address is anonymized and the information is kept for a maximum of fourteen months, after which it is deleted."] }),
						/* @__PURE__ */ jsx("p", {
							className: "policy-muted",
							children: "Google acts as data processor and may store that data outside Colombia. By accepting, you authorize that international transfer."
						})
					]
				})
			]
		})]
	})] });
}
//#endregion
export { DataPolicy as default };
