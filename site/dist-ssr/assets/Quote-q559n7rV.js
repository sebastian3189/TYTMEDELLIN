import { F as jsxs, I as company, L as whatsapp, P as jsx, R as language, g as QuoteCopy, h as Arrow, o as rawTours, z as t } from "../entry-server.js";
import { Link } from "react-router-dom";
import { startTransition, useEffect, useRef, useState } from "react";
//#region src/indicativos.json
var indicativos_default = [
	[
		"+57",
		"CO",
		"Colombia"
	],
	[
		"+1",
		"US",
		"Estados Unidos / Canadá"
	],
	[
		"+52",
		"MX",
		"México"
	],
	[
		"+51",
		"PE",
		"Perú"
	],
	[
		"+593",
		"EC",
		"Ecuador"
	],
	[
		"+58",
		"VE",
		"Venezuela"
	],
	[
		"+507",
		"PA",
		"Panamá"
	],
	[
		"+506",
		"CR",
		"Costa Rica"
	],
	[
		"+56",
		"CL",
		"Chile"
	],
	[
		"+54",
		"AR",
		"Argentina"
	],
	[
		"+55",
		"BR",
		"Brasil"
	],
	[
		"+591",
		"BO",
		"Bolivia"
	],
	[
		"+595",
		"PY",
		"Paraguay"
	],
	[
		"+598",
		"UY",
		"Uruguay"
	],
	[
		"+502",
		"GT",
		"Guatemala"
	],
	[
		"+503",
		"SV",
		"El Salvador"
	],
	[
		"+504",
		"HN",
		"Honduras"
	],
	[
		"+505",
		"NI",
		"Nicaragua"
	],
	[
		"+501",
		"BZ",
		"Belice"
	],
	[
		"+53",
		"CU",
		"Cuba"
	],
	[
		"+509",
		"HT",
		"Haití"
	],
	[
		"+592",
		"GY",
		"Guyana"
	],
	[
		"+597",
		"SR",
		"Surinam"
	],
	[
		"+594",
		"GF",
		"Guayana Francesa"
	],
	[
		"+596",
		"MQ",
		"Martinica"
	],
	[
		"+590",
		"GP",
		"Guadalupe"
	],
	[
		"+599",
		"CW",
		"Curazao / Caribe Neerlandés"
	],
	[
		"+297",
		"AW",
		"Aruba"
	],
	[
		"+500",
		"FK",
		"Islas Malvinas"
	],
	[
		"+34",
		"ES",
		"España"
	],
	[
		"+351",
		"PT",
		"Portugal"
	],
	[
		"+33",
		"FR",
		"Francia"
	],
	[
		"+39",
		"IT",
		"Italia"
	],
	[
		"+49",
		"DE",
		"Alemania"
	],
	[
		"+44",
		"GB",
		"Reino Unido"
	],
	[
		"+353",
		"IE",
		"Irlanda"
	],
	[
		"+31",
		"NL",
		"Países Bajos"
	],
	[
		"+32",
		"BE",
		"Bélgica"
	],
	[
		"+352",
		"LU",
		"Luxemburgo"
	],
	[
		"+41",
		"CH",
		"Suiza"
	],
	[
		"+43",
		"AT",
		"Austria"
	],
	[
		"+45",
		"DK",
		"Dinamarca"
	],
	[
		"+46",
		"SE",
		"Suecia"
	],
	[
		"+47",
		"NO",
		"Noruega"
	],
	[
		"+358",
		"FI",
		"Finlandia"
	],
	[
		"+354",
		"IS",
		"Islandia"
	],
	[
		"+48",
		"PL",
		"Polonia"
	],
	[
		"+420",
		"CZ",
		"Chequia"
	],
	[
		"+421",
		"SK",
		"Eslovaquia"
	],
	[
		"+36",
		"HU",
		"Hungría"
	],
	[
		"+40",
		"RO",
		"Rumania"
	],
	[
		"+359",
		"BG",
		"Bulgaria"
	],
	[
		"+30",
		"GR",
		"Grecia"
	],
	[
		"+90",
		"TR",
		"Turquía"
	],
	[
		"+357",
		"CY",
		"Chipre"
	],
	[
		"+356",
		"MT",
		"Malta"
	],
	[
		"+385",
		"HR",
		"Croacia"
	],
	[
		"+386",
		"SI",
		"Eslovenia"
	],
	[
		"+381",
		"RS",
		"Serbia"
	],
	[
		"+387",
		"BA",
		"Bosnia y Herzegovina"
	],
	[
		"+382",
		"ME",
		"Montenegro"
	],
	[
		"+389",
		"MK",
		"Macedonia del Norte"
	],
	[
		"+355",
		"AL",
		"Albania"
	],
	[
		"+383",
		"XK",
		"Kosovo"
	],
	[
		"+370",
		"LT",
		"Lituania"
	],
	[
		"+371",
		"LV",
		"Letonia"
	],
	[
		"+372",
		"EE",
		"Estonia"
	],
	[
		"+380",
		"UA",
		"Ucrania"
	],
	[
		"+375",
		"BY",
		"Bielorrusia"
	],
	[
		"+373",
		"MD",
		"Moldavia"
	],
	[
		"+7",
		"RU",
		"Rusia / Kazajistán"
	],
	[
		"+995",
		"GE",
		"Georgia"
	],
	[
		"+374",
		"AM",
		"Armenia"
	],
	[
		"+994",
		"AZ",
		"Azerbaiyán"
	],
	[
		"+377",
		"MC",
		"Mónaco"
	],
	[
		"+376",
		"AD",
		"Andorra"
	],
	[
		"+378",
		"SM",
		"San Marino"
	],
	[
		"+423",
		"LI",
		"Liechtenstein"
	],
	[
		"+350",
		"GI",
		"Gibraltar"
	],
	[
		"+86",
		"CN",
		"China"
	],
	[
		"+81",
		"JP",
		"Japón"
	],
	[
		"+82",
		"KR",
		"Corea del Sur"
	],
	[
		"+886",
		"TW",
		"Taiwán"
	],
	[
		"+852",
		"HK",
		"Hong Kong"
	],
	[
		"+853",
		"MO",
		"Macao"
	],
	[
		"+91",
		"IN",
		"India"
	],
	[
		"+92",
		"PK",
		"Pakistán"
	],
	[
		"+880",
		"BD",
		"Bangladés"
	],
	[
		"+94",
		"LK",
		"Sri Lanka"
	],
	[
		"+977",
		"NP",
		"Nepal"
	],
	[
		"+975",
		"BT",
		"Bután"
	],
	[
		"+960",
		"MV",
		"Maldivas"
	],
	[
		"+65",
		"SG",
		"Singapur"
	],
	[
		"+60",
		"MY",
		"Malasia"
	],
	[
		"+62",
		"ID",
		"Indonesia"
	],
	[
		"+63",
		"PH",
		"Filipinas"
	],
	[
		"+66",
		"TH",
		"Tailandia"
	],
	[
		"+84",
		"VN",
		"Vietnam"
	],
	[
		"+855",
		"KH",
		"Camboya"
	],
	[
		"+856",
		"LA",
		"Laos"
	],
	[
		"+95",
		"MM",
		"Myanmar"
	],
	[
		"+673",
		"BN",
		"Brunéi"
	],
	[
		"+670",
		"TL",
		"Timor Oriental"
	],
	[
		"+976",
		"MN",
		"Mongolia"
	],
	[
		"+850",
		"KP",
		"Corea del Norte"
	],
	[
		"+998",
		"UZ",
		"Uzbekistán"
	],
	[
		"+996",
		"KG",
		"Kirguistán"
	],
	[
		"+992",
		"TJ",
		"Tayikistán"
	],
	[
		"+993",
		"TM",
		"Turkmenistán"
	],
	[
		"+93",
		"AF",
		"Afganistán"
	],
	[
		"+98",
		"IR",
		"Irán"
	],
	[
		"+964",
		"IQ",
		"Irak"
	],
	[
		"+963",
		"SY",
		"Siria"
	],
	[
		"+961",
		"LB",
		"Líbano"
	],
	[
		"+962",
		"JO",
		"Jordania"
	],
	[
		"+972",
		"IL",
		"Israel"
	],
	[
		"+970",
		"PS",
		"Palestina"
	],
	[
		"+966",
		"SA",
		"Arabia Saudita"
	],
	[
		"+971",
		"AE",
		"Emiratos Árabes Unidos"
	],
	[
		"+974",
		"QA",
		"Catar"
	],
	[
		"+973",
		"BH",
		"Baréin"
	],
	[
		"+965",
		"KW",
		"Kuwait"
	],
	[
		"+968",
		"OM",
		"Omán"
	],
	[
		"+967",
		"YE",
		"Yemen"
	],
	[
		"+61",
		"AU",
		"Australia"
	],
	[
		"+64",
		"NZ",
		"Nueva Zelanda"
	],
	[
		"+675",
		"PG",
		"Papúa Nueva Guinea"
	],
	[
		"+679",
		"FJ",
		"Fiyi"
	],
	[
		"+685",
		"WS",
		"Samoa"
	],
	[
		"+676",
		"TO",
		"Tonga"
	],
	[
		"+678",
		"VU",
		"Vanuatu"
	],
	[
		"+677",
		"SB",
		"Islas Salomón"
	],
	[
		"+687",
		"NC",
		"Nueva Caledonia"
	],
	[
		"+689",
		"PF",
		"Polinesia Francesa"
	],
	[
		"+691",
		"FM",
		"Micronesia"
	],
	[
		"+692",
		"MH",
		"Islas Marshall"
	],
	[
		"+680",
		"PW",
		"Palaos"
	],
	[
		"+686",
		"KI",
		"Kiribati"
	],
	[
		"+674",
		"NR",
		"Nauru"
	],
	[
		"+688",
		"TV",
		"Tuvalu"
	],
	[
		"+20",
		"EG",
		"Egipto"
	],
	[
		"+212",
		"MA",
		"Marruecos"
	],
	[
		"+213",
		"DZ",
		"Argelia"
	],
	[
		"+216",
		"TN",
		"Túnez"
	],
	[
		"+218",
		"LY",
		"Libia"
	],
	[
		"+27",
		"ZA",
		"Sudáfrica"
	],
	[
		"+234",
		"NG",
		"Nigeria"
	],
	[
		"+233",
		"GH",
		"Ghana"
	],
	[
		"+254",
		"KE",
		"Kenia"
	],
	[
		"+255",
		"TZ",
		"Tanzania"
	],
	[
		"+256",
		"UG",
		"Uganda"
	],
	[
		"+250",
		"RW",
		"Ruanda"
	],
	[
		"+251",
		"ET",
		"Etiopía"
	],
	[
		"+221",
		"SN",
		"Senegal"
	],
	[
		"+225",
		"CI",
		"Costa de Marfil"
	],
	[
		"+237",
		"CM",
		"Camerún"
	],
	[
		"+243",
		"CD",
		"República Democrática del Congo"
	],
	[
		"+242",
		"CG",
		"República del Congo"
	],
	[
		"+244",
		"AO",
		"Angola"
	],
	[
		"+258",
		"MZ",
		"Mozambique"
	],
	[
		"+260",
		"ZM",
		"Zambia"
	],
	[
		"+263",
		"ZW",
		"Zimbabue"
	],
	[
		"+267",
		"BW",
		"Botsuana"
	],
	[
		"+264",
		"NA",
		"Namibia"
	],
	[
		"+261",
		"MG",
		"Madagascar"
	],
	[
		"+230",
		"MU",
		"Mauricio"
	],
	[
		"+248",
		"SC",
		"Seychelles"
	],
	[
		"+238",
		"CV",
		"Cabo Verde"
	],
	[
		"+220",
		"GM",
		"Gambia"
	],
	[
		"+223",
		"ML",
		"Malí"
	],
	[
		"+226",
		"BF",
		"Burkina Faso"
	],
	[
		"+227",
		"NE",
		"Níger"
	],
	[
		"+228",
		"TG",
		"Togo"
	],
	[
		"+229",
		"BJ",
		"Benín"
	],
	[
		"+231",
		"LR",
		"Liberia"
	],
	[
		"+232",
		"SL",
		"Sierra Leona"
	],
	[
		"+224",
		"GN",
		"Guinea"
	],
	[
		"+245",
		"GW",
		"Guinea-Bisáu"
	],
	[
		"+240",
		"GQ",
		"Guinea Ecuatorial"
	],
	[
		"+241",
		"GA",
		"Gabón"
	],
	[
		"+235",
		"TD",
		"Chad"
	],
	[
		"+236",
		"CF",
		"República Centroafricana"
	],
	[
		"+249",
		"SD",
		"Sudán"
	],
	[
		"+211",
		"SS",
		"Sudán del Sur"
	],
	[
		"+291",
		"ER",
		"Eritrea"
	],
	[
		"+253",
		"DJ",
		"Yibuti"
	],
	[
		"+252",
		"SO",
		"Somalia"
	],
	[
		"+257",
		"BI",
		"Burundi"
	],
	[
		"+265",
		"MW",
		"Malaui"
	],
	[
		"+266",
		"LS",
		"Lesoto"
	],
	[
		"+268",
		"SZ",
		"Esuatini"
	],
	[
		"+222",
		"MR",
		"Mauritania"
	],
	[
		"+269",
		"KM",
		"Comoras"
	],
	[
		"+239",
		"ST",
		"Santo Tomé y Príncipe"
	]
];
//#endregion
//#region src/Quote.jsx
var countryLabel = (row) => language() === "en" ? new Intl.DisplayNames(["en"], { type: "region" }).of(row[1]) : row[2];
var TIPOS = [
	["turismo", "Turismo y traslados"],
	["peticion", "Petición"],
	["queja", "Queja"],
	["reclamo", "Reclamo"],
	["sugerencia", "Sugerencia"],
	["contacto", "Contacto"],
	["felicitacion", "Felicitación"]
];
var ORDER = [
	"experiencia",
	"fecha",
	"personas",
	"salida",
	"nombre",
	"indicativo",
	"telefono",
	"correo",
	"empresa",
	"mensaje",
	"consentimiento"
];
var LABEL = {
	experiencia: "Tu experiencia",
	fecha: "Fecha del recorrido",
	personas: "Personas",
	salida: "Punto de salida",
	nombre: "Nombre",
	indicativo: "Indicativo",
	telefono: "Teléfono / WhatsApp",
	correo: "Correo electrónico",
	empresa: "Empresa",
	mensaje: "Mensaje",
	consentimiento: "Autorización de datos"
};
var today = () => {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
var normalizeCode = (text) => {
	const digits = text.replace(/\D/g, "").slice(0, 4);
	return digits ? `+${digits}` : "+";
};
var country = (code) => indicativos_default.find(([c]) => c === code);
function validate(v, plan) {
	const e = {};
	if (v.nombre.trim().length < 2) e.nombre = "Escribe tu nombre (al menos 2 letras).";
	const digits = v.telefono.replace(/\D/g, "");
	if (!v.telefono.trim()) e.telefono = "Escribe un teléfono o WhatsApp para poder responderte.";
	else if (!/^[0-9+()\s-]+$/.test(v.telefono.trim())) e.telefono = "Escribe solo números, espacios o guiones.";
	else if (digits.length < 7 || digits.length > 15) e.telefono = "Revisa el número: debe tener entre 7 y 15 dígitos.";
	if (v.telefono.trim() && !country(v.indicativo)) e.indicativo = "Indicativo no reconocido: escribe el de tu país, por ejemplo +57.";
	if (v.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.correo.trim())) e.correo = "Escribe un correo válido, por ejemplo nombre@correo.com.";
	if (plan) {
		if (!v.fecha) e.fecha = "Elige la fecha en la que quieres hacer el recorrido.";
		else if (v.fecha < today()) e.fecha = "Elige una fecha de hoy en adelante.";
		const n = Number(v.personas);
		if (!/^\d{1,2}$/.test(v.personas) || n < 1 || n > 99) e.personas = "Escribe cuántas personas son, en números (de 1 a 99).";
	} else if (v.mensaje.trim().length < 10) e.mensaje = "Cuéntanos un poco más: mínimo 10 caracteres.";
	if (!v.consentimiento) e.consentimiento = "Necesitamos tu autorización para poder responderte.";
	return e;
}
function Quote({ context = "Un recorrido a mi medida", mode = "cotizar" }) {
	const withType = mode === "contacto";
	const [v, setV] = useState({
		tipo: "turismo",
		experiencia: context,
		fecha: "",
		personas: "",
		salida: "",
		nombre: "",
		indicativo: "+57",
		telefono: "",
		correo: "",
		empresa: "",
		mensaje: "",
		consentimiento: false
	});
	const [errors, setErrors] = useState({}), [summary, setSummary] = useState(""), [copied, setCopied] = useState("idle"), [retry, setRetry] = useState(false);
	const form = useRef(null), opened = useRef(Date.now()), honey = useRef(null), touched = useRef(false);
	const plan = !withType || v.tipo === "turismo";
	const set = (key) => (event) => {
		const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
		setV((p) => ({
			...p,
			[key]: value
		}));
		setSummary("");
		setCopied("idle");
		setRetry(false);
		if (errors[key]) setErrors((p) => {
			const n = { ...p };
			delete n[key];
			return n;
		});
	};
	useEffect(() => {
		setV((p) => ({
			...p,
			experiencia: context
		}));
		setSummary("");
		setErrors({});
		setCopied("idle");
	}, [context]);
	const options = [.../* @__PURE__ */ new Set([
		context,
		...rawTours.map((t) => t[1]),
		"Un recorrido a mi medida"
	])];
	const pais = country(v.indicativo);
	const attrs = (name, extra, own = true) => ({
		id: name,
		name,
		"aria-invalid": Boolean(errors[name]),
		"aria-describedby": [own && errors[name] && `${name}-error`, extra].filter(Boolean).join(" ") || void 0
	});
	const error = (name) => errors[name] && /* @__PURE__ */ jsx("small", {
		id: `${name}-error`,
		className: "error",
		children: errors[name]
	});
	async function submit(event) {
		event.preventDefault();
		if (honey.current?.value || !touched.current && Date.now() - opened.current < 2e3) {
			setErrors({});
			setSummary("");
			setRetry(true);
			return;
		}
		setRetry(false);
		const next = validate(v, plan);
		setErrors(next);
		setCopied("idle");
		const first = ORDER.find((name) => next[name]);
		if (first) {
			setSummary("");
			requestAnimationFrame(() => form.current?.querySelector(`#${first}`)?.focus());
			return;
		}
		const phone = `${v.indicativo} ${v.telefono.trim()}${pais ? ` (${countryLabel(pais)})` : ""}`;
		const tipo = TIPOS.find(([id]) => id === v.tipo)[1];
		const lines = [
			`Hola, T&T Medellín. ${plan ? `Quiero cotizar: ${v.experiencia}.` : `${tipo}.`}`,
			withType ? `Tipo de solicitud: ${tipo}` : "",
			`Nombre: ${v.nombre.trim()}`,
			v.empresa.trim() && `Empresa: ${v.empresa.trim()}`,
			`Teléfono: ${phone}`,
			v.correo.trim() && `Correo: ${v.correo.trim()}`,
			plan && `Fecha: ${v.fecha}`,
			plan && `Personas: ${Number(v.personas)}`,
			plan && `Punto de salida: ${v.salida.trim() || "Por acordar"}`,
			`${plan ? "Detalles" : "Mensaje"}: ${v.mensaje.trim() || "Me gustaría conocer las opciones disponibles."}`
		].filter(Boolean);
		const englishLines = [
			`Hello, T&T Medellín. ${plan ? `I'd like a quote for: ${t(v.experiencia)}.` : `${t(tipo)}.`}`,
			withType && `Inquiry type: ${t(tipo)}`,
			`Name: ${v.nombre.trim()}`,
			v.empresa.trim() && `Company: ${v.empresa.trim()}`,
			`Phone: ${phone}`,
			v.correo.trim() && `Email: ${v.correo.trim()}`,
			plan && `Date: ${v.fecha}`,
			plan && `People: ${Number(v.personas)}`,
			plan && `Departure point: ${v.salida.trim() || "To be arranged"}`,
			`${plan ? "Details" : "Message"}: ${v.mensaje.trim() || "I'd like to know what options are available."}`
		].filter(Boolean);
		const text = (language() === "en" ? englishLines : lines).join("\n");
		startTransition(() => setSummary(text));
		try {
			await navigator.clipboard.writeText(text);
			setCopied("ok");
		} catch {
			setCopied("manual");
		}
		requestAnimationFrame(() => document.querySelector("#resumen-solicitud")?.focus());
	}
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(summary);
			setCopied("ok");
		} catch {
			setCopied("manual");
			document.querySelector(".summary textarea")?.select();
		}
	};
	const errorList = ORDER.filter((name) => errors[name]);
	const message = copied === "ok" ? "Solicitud copiada. Abre WhatsApp y pégala en la conversación." : "No pudimos copiar automáticamente: usa «Copiar solicitud» o selecciona el texto.";
	return /* @__PURE__ */ jsxs("section", {
		className: "quote-section wrap",
		children: [/* @__PURE__ */ jsx(QuoteCopy, { withType }), /* @__PURE__ */ jsxs("form", {
			ref: form,
			className: "quote-form",
			noValidate: true,
			onSubmit: submit,
			onInputCapture: () => {
				touched.current = true;
			},
			onKeyDownCapture: () => {
				touched.current = true;
			},
			onPointerDownCapture: () => {
				touched.current = true;
			},
			"aria-label": withType ? "Formulario de contacto" : "Formulario de cotización",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "honeypot",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsxs("label", { children: ["No completar", /* @__PURE__ */ jsx("input", {
						ref: honey,
						name: "website",
						tabIndex: -1,
						autoComplete: "off"
					})] })
				}),
				/* @__PURE__ */ jsx("p", {
					className: "form-note full",
					children: "Los campos con * son obligatorios."
				}),
				withType && /* @__PURE__ */ jsxs("fieldset", {
					className: "form-group full",
					children: [/* @__PURE__ */ jsx("legend", { children: "Tipo de solicitud *" }), /* @__PURE__ */ jsx("div", {
						className: "chips",
						role: "radiogroup",
						"aria-label": "Tipo de solicitud",
						children: TIPOS.map(([id, label]) => /* @__PURE__ */ jsxs("label", {
							className: `chip ${v.tipo === id ? "is-on" : ""}`,
							children: [/* @__PURE__ */ jsx("input", {
								type: "radio",
								name: "tipo",
								value: id,
								checked: v.tipo === id,
								onChange: set("tipo")
							}), /* @__PURE__ */ jsx("span", { children: label })]
						}, id))
					})]
				}),
				plan && /* @__PURE__ */ jsxs("fieldset", {
					className: "form-group full",
					children: [/* @__PURE__ */ jsx("legend", { children: "Tu plan" }), /* @__PURE__ */ jsxs("div", {
						className: "form-grid",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "field full",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "experiencia",
									children: "Tu experiencia *"
								}), /* @__PURE__ */ jsx("select", {
									...attrs("experiencia"),
									value: v.experiencia,
									onChange: set("experiencia"),
									children: options.map((n) => /* @__PURE__ */ jsx("option", { children: n }, n))
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "field",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "fecha",
										children: "Fecha del recorrido *"
									}),
									/* @__PURE__ */ jsx("input", {
										...attrs("fecha"),
										type: "date",
										min: today(),
										value: v.fecha,
										onChange: set("fecha"),
										required: true
									}),
									error("fecha")
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "field",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "personas",
										children: "Personas *"
									}),
									/* @__PURE__ */ jsx("input", {
										...attrs("personas", "personas-ayuda"),
										type: "text",
										inputMode: "numeric",
										autoComplete: "off",
										maxLength: 2,
										value: v.personas,
										onChange: (e) => {
											e.target.value = e.target.value.replace(/\D/g, "");
											set("personas")(e);
										},
										required: true
									}),
									/* @__PURE__ */ jsx("small", {
										id: "personas-ayuda",
										className: "hint",
										children: "Cuántas personas viajan, incluyéndote."
									}),
									error("personas")
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "field full",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "salida",
										children: "Punto de salida"
									}),
									/* @__PURE__ */ jsx("input", {
										...attrs("salida", "salida-ayuda"),
										autoComplete: "off",
										maxLength: 160,
										value: v.salida,
										onChange: set("salida")
									}),
									/* @__PURE__ */ jsx("small", {
										className: "hint",
										id: "salida-ayuda",
										children: "Hotel, barrio o aeropuerto. Si aún no lo sabes, lo acordamos."
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("fieldset", {
					className: "form-group full",
					children: [/* @__PURE__ */ jsx("legend", { children: "Tus datos" }), /* @__PURE__ */ jsxs("div", {
						className: "form-grid",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "field",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "nombre",
										children: "Nombre *"
									}),
									/* @__PURE__ */ jsx("input", {
										...attrs("nombre"),
										autoComplete: "name",
										maxLength: 80,
										value: v.nombre,
										onChange: set("nombre"),
										required: true
									}),
									error("nombre")
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "field",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "empresa",
									children: "Empresa (si aplica)"
								}), /* @__PURE__ */ jsx("input", {
									...attrs("empresa"),
									autoComplete: "organization",
									maxLength: 120,
									value: v.empresa,
									onChange: set("empresa")
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "field full",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "field-label",
										id: "telefono-label",
										children: "Teléfono / WhatsApp *"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "phone-row",
										role: "group",
										"aria-labelledby": "telefono-label",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "field",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "indicativo",
												className: "hint-label",
												children: "Indicativo"
											}), /* @__PURE__ */ jsx("input", {
												...attrs("indicativo", "indicativo-pais", false),
												type: "text",
												inputMode: "tel",
												autoComplete: "tel-country-code",
												list: "indicativos-lista",
												maxLength: 5,
												value: v.indicativo,
												onChange: (e) => {
													e.target.value = normalizeCode(e.target.value);
													set("indicativo")(e);
												},
												onBlur: () => v.indicativo === "+" && setV((p) => ({
													...p,
													indicativo: "+57"
												}))
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "field",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "telefono",
												className: "hint-label",
												children: "Número"
											}), /* @__PURE__ */ jsx("input", {
												...attrs("telefono"),
												type: "tel",
												inputMode: "tel",
												autoComplete: "tel-national",
												maxLength: 30,
												value: v.telefono,
												onChange: set("telefono"),
												required: true
											})]
										})]
									}),
									/* @__PURE__ */ jsx("datalist", {
										id: "indicativos-lista",
										children: indicativos_default.map(([code, iso, name]) => /* @__PURE__ */ jsx("option", {
											value: code,
											children: `${iso} · ${countryLabel([
												code,
												iso,
												name
											])}`
										}, code))
									}),
									/* @__PURE__ */ jsx("small", {
										id: "indicativo-pais",
										"aria-live": "polite",
										className: pais ? "hint" : "error",
										children: pais ? `${pais[1]} · ${countryLabel(pais)}` : "Indicativo no reconocido: escribe el de tu país, por ejemplo +57."
									}),
									error("telefono")
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "field full",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "correo",
										children: "Correo electrónico (opcional)"
									}),
									/* @__PURE__ */ jsx("input", {
										...attrs("correo"),
										type: "email",
										autoComplete: "email",
										maxLength: 120,
										value: v.correo,
										onChange: set("correo")
									}),
									error("correo")
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "field full",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "mensaje",
										children: plan ? "¿Qué haría especial este viaje?" : "Cuéntanos tu consulta *"
									}),
									/* @__PURE__ */ jsx("textarea", {
										...attrs("mensaje", "mensaje-ayuda"),
										rows: 4,
										maxLength: 800,
										value: v.mensaje,
										onChange: set("mensaje")
									}),
									/* @__PURE__ */ jsxs("small", {
										id: "mensaje-ayuda",
										className: "hint",
										children: [
											plan ? "Opcional: intereses, equipaje o necesidades del grupo. " : "",
											v.mensaje.length,
											"/800"
										]
									}),
									error("mensaje")
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "consent full",
					children: [
						/* @__PURE__ */ jsx("input", {
							...attrs("consentimiento"),
							type: "checkbox",
							checked: v.consentimiento,
							onChange: set("consentimiento"),
							required: true
						}),
						/* @__PURE__ */ jsxs("label", {
							htmlFor: "consentimiento",
							children: [
								"He leído el ",
								/* @__PURE__ */ jsx(Link, {
									to: "/privacidad",
									target: "_blank",
									children: "aviso de privacidad"
								}),
								" y autorizo compartir esta solicitud con T&T cuando la envíe."
							]
						}),
						error("consentimiento")
					]
				}),
				retry && /* @__PURE__ */ jsxs("div", {
					className: "form-errors full",
					role: "alert",
					children: [/* @__PURE__ */ jsx("strong", { children: "No pudimos preparar tu consulta." }), " Inténtalo de nuevo en unos segundos."]
				}),
				!retry && errorList.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "form-errors full",
					role: "alert",
					children: [
						/* @__PURE__ */ jsxs("strong", { children: [
							"Revisa ",
							errorList.length === 1 ? "este campo" : `estos ${errorList.length} campos`,
							":"
						] }),
						" ",
						errorList.map((name, i) => /* @__PURE__ */ jsxs("span", { children: [i > 0 && ", ", /* @__PURE__ */ jsx("a", {
							href: `#${name}`,
							onClick: (e) => {
								e.preventDefault();
								form.current.querySelector(`#${name}`)?.focus();
							},
							children: LABEL[name]
						})] }, name)),
						"."
					]
				}),
				/* @__PURE__ */ jsxs("button", {
					className: "button full",
					type: "submit",
					children: [withType && !plan ? "Preparar mi mensaje" : "Preparar mi consulta", /* @__PURE__ */ jsx(Arrow, {})]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "form-note full",
					children: [
						"Los datos permanecen en esta página hasta que tú decidas compartirlos. Preparar la consulta no confirma una reserva. También puedes llamarnos: ",
						/* @__PURE__ */ jsx("a", {
							href: `tel:${company.phone.replaceAll(" ", "")}`,
							children: company.phone
						}),
						"."
					]
				}),
				summary && /* @__PURE__ */ jsxs("div", {
					className: "summary full",
					id: "resumen-solicitud",
					tabIndex: -1,
					children: [
						/* @__PURE__ */ jsx("h3", { children: "Revisa y comparte tu solicitud" }),
						/* @__PURE__ */ jsxs("ol", {
							className: "summary-steps",
							children: [
								/* @__PURE__ */ jsx("li", { children: "Revisa el texto." }),
								/* @__PURE__ */ jsx("li", { children: "Cópialo (ya lo intentamos por ti)." }),
								/* @__PURE__ */ jsx("li", { children: "Ábrelo en WhatsApp y pégalo." })
							]
						}),
						/* @__PURE__ */ jsx("textarea", {
							"aria-label": "Resumen de solicitud",
							value: summary,
							readOnly: true,
							rows: 8
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "summary-actions",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "button",
								onClick: copy,
								children: "Copiar solicitud"
							}), /* @__PURE__ */ jsxs("a", {
								className: "button",
								href: whatsapp(plan ? v.experiencia : "mi consulta"),
								target: "_blank",
								rel: "noreferrer",
								children: ["Abrir WhatsApp y pegar", /* @__PURE__ */ jsx(Arrow, {})]
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							role: "status",
							children: message
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "text-link",
							onClick: () => {
								setSummary("");
								form.current.querySelector("#nombre")?.focus();
							},
							children: "Editar mis datos"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Quote as default };
