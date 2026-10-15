import { B as jsxs, R as Fragment, U as language, V as company, d as PageTitle, z as jsx } from "../entry-server.js";
//#region src/pages/DataPolicy.jsx
var SECTIONS = [
	["responsable", "1. Responsable del tratamiento"],
	["datos", "2. Datos que recogemos"],
	["whatsapp", "3. Envío de tu solicitud por WhatsApp"],
	["finalidad", "4. Finalidad"],
	["autorizacion", "5. Autorización"],
	["derechos", "6. Tus derechos"],
	["ejercer", "7. Cómo ejercerlos"],
	["retencion", "8. Retención"],
	["cookies", "9. Cookies"],
	["medicion", "10. Medición del sitio"]
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
					children: [/* @__PURE__ */ jsx("h2", { children: "2. Datos que recogemos" }), /* @__PURE__ */ jsx("p", { children: "Únicamente los que nos escribes en los formularios de contacto y cotización: nombre, empresa u organización, correo electrónico, teléfono, tipo de consulta, número de personas, fecha del viaje, los demás detalles del viaje que decidas incluir (por ejemplo, punto de recogida) y el mensaje. No recogemos datos sensibles ni datos de menores de edad." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "whatsapp",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "3. Envío de tu solicitud por WhatsApp" }),
						/* @__PURE__ */ jsx("p", { children: "Cuando completas un formulario y lo envías, este sitio no guarda tus datos: con la información que escribiste prepara un mensaje y abre WhatsApp (en la aplicación o en WhatsApp Web) con ese mensaje ya escrito, dirigido a nuestro número +57 304 496 1698. Tú decides si lo envías." }),
						/* @__PURE__ */ jsxs("p", { children: [
							"Para prellenar el mensaje, sus datos viajan dentro del enlace que abre WhatsApp, por lo que pueden quedar registrados en el historial de tu navegador o dispositivo. WhatsApp es un servicio de un tercero (WhatsApp LLC, del grupo Meta Platforms) que trata la información conforme a sus propias condiciones y política de privacidad, y puede almacenarla fuera de Colombia. Al enviar el mensaje, autorizas esa transmisión y transferencia internacional. Si prefieres no usar WhatsApp, puedes copiar el mensaje y enviarlo a ",
							/* @__PURE__ */ jsx("a", {
								href: `mailto:${company.email}`,
								children: company.email
							}),
							"."
						] })
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "finalidad",
					children: [/* @__PURE__ */ jsx("h2", { children: "4. Finalidad" }), /* @__PURE__ */ jsx("p", { children: "Responder a tu consulta, elaborar la cotización o propuesta que solicites y mantener el contacto comercial derivado de esa solicitud. No usamos tus datos para ninguna otra cosa ni los cedemos a terceros con fines publicitarios." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "autorizacion",
					children: [/* @__PURE__ */ jsx("h2", { children: "5. Autorización" }), /* @__PURE__ */ jsx("p", { children: "El tratamiento requiere tu autorización previa, expresa e informada, que otorgas marcando la casilla correspondiente en el formulario. La casilla nunca viene marcada de antemano, y puedes retirar tu autorización en cualquier momento." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "derechos",
					children: [/* @__PURE__ */ jsx("h2", { children: "6. Tus derechos" }), /* @__PURE__ */ jsx("p", { children: "Como titular puedes conocer, actualizar y rectificar tus datos; solicitar prueba de la autorización; ser informado del uso que les damos; presentar quejas ante la Superintendencia de Industria y Comercio; y revocar la autorización o solicitar la supresión de tus datos." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "ejercer",
					children: [/* @__PURE__ */ jsx("h2", { children: "7. Cómo ejercerlos" }), /* @__PURE__ */ jsxs("p", { children: [
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
					children: [/* @__PURE__ */ jsx("h2", { children: "8. Retención" }), /* @__PURE__ */ jsx("p", { children: "Conservamos los datos mientras dure la relación comercial y, después, durante el plazo legal aplicable a las obligaciones contables y fiscales. Cumplido ese plazo, se suprimen." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "cookies",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "9. Cookies" }),
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
						/* @__PURE__ */ jsx("h2", { children: "10. Medición del sitio" }),
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
	["whatsapp", "3. Sending your request via WhatsApp"],
	["purpose", "4. Purpose"],
	["authorization", "5. Authorization"],
	["rights", "6. Your rights"],
	["exercise", "7. How to exercise them"],
	["retention", "8. Retention"],
	["cookies", "9. Cookies"],
	["measurement", "10. Site measurement"]
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
					children: [/* @__PURE__ */ jsx("h2", { children: "2. Data we collect" }), /* @__PURE__ */ jsx("p", { children: "Only what you write to us in the contact and quote forms: name, company or organization, email address, telephone, type of enquiry, number of people, travel date, any other trip details you choose to include (for example, pickup point) and the message. We do not collect sensitive data or data of minors." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "whatsapp",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "3. Sending your request via WhatsApp" }),
						/* @__PURE__ */ jsx("p", { children: "When you complete and submit a form, this site does not store your data: with the information you wrote it prepares a message and opens WhatsApp (in the app or in WhatsApp Web) with that message already written, addressed to our number +57 304 496 1698. You decide whether to send it." }),
						/* @__PURE__ */ jsxs("p", { children: [
							"To pre-fill the message, its data travels inside the link that opens WhatsApp, so it may be recorded in the history of your browser or device. WhatsApp is a third-party service (WhatsApp LLC, part of the Meta Platforms group) that processes the information under its own terms and privacy policy, and may store it outside Colombia. By sending the message, you authorize that transmission and international transfer. If you prefer not to use WhatsApp, you can copy the message and send it to ",
							/* @__PURE__ */ jsx("a", {
								href: `mailto:${company.email}`,
								children: company.email
							}),
							"."
						] })
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "purpose",
					children: [/* @__PURE__ */ jsx("h2", { children: "4. Purpose" }), /* @__PURE__ */ jsx("p", { children: "To answer your enquiry, prepare the quotation or proposal you request and maintain the commercial contact arising from that request. We do not use your data for anything else and we do not transfer it to third parties for advertising purposes." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "authorization",
					children: [/* @__PURE__ */ jsx("h2", { children: "5. Authorization" }), /* @__PURE__ */ jsx("p", { children: "Processing requires your prior, express and informed authorization, which you give by ticking the corresponding box in the form. The box is never ticked in advance, and you may withdraw your authorization at any time." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "rights",
					children: [/* @__PURE__ */ jsx("h2", { children: "6. Your rights" }), /* @__PURE__ */ jsx("p", { children: "As the data subject you may know, update and rectify your data; request proof of the authorization; be informed of the use we make of it; file complaints with the Superintendencia de Industria y Comercio (Superintendence of Industry and Commerce); and revoke the authorization or request the deletion of your data." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "exercise",
					children: [/* @__PURE__ */ jsx("h2", { children: "7. How to exercise them" }), /* @__PURE__ */ jsxs("p", { children: [
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
					children: [/* @__PURE__ */ jsx("h2", { children: "8. Retention" }), /* @__PURE__ */ jsx("p", { children: "We keep the data for as long as the commercial relationship lasts and, afterwards, for the legal period applicable to accounting and tax obligations. Once that period has elapsed, the data is deleted." })]
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "cookies",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "9. Cookies" }),
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
						/* @__PURE__ */ jsx("h2", { children: "10. Site measurement" }),
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
