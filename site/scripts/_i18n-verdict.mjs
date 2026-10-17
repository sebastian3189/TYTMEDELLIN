// Heurísticas compartidas de idioma para los barridos i18n (ES/EN/PT-BR). Nombres propios y de marca se eliminan antes de contar palabras.
const PROPER = /Narciso O.|El Carmen de Viboral|Transporte (?:y|&) Turismo Medell[ií]n|Transporte Turismo Medell[ií]n|T&T Medell[ií]n|Medell[ií]n|Guatap[eé]|N[aá]poles|Pe[nñ]ol|Jard[ií]n|C[oó]rdova|Mar[ií]a|Jos[eé]|Alpujarra|Botero|Cisneros|Inflexi[oó]n|Provenza|Comuna 13|Calle de los Recuerdos|Calle de las Sombrillas|Plazoleta de los Z[oó]calos|Parque de las Luces|Plaza de la Libertad|Palacio de la Cultura|Cerro El Picacho|Cerro Nutibara|Mirador La Palma|Puente de Occidente|Santa Fe de Antioquia|San Antonio de Pereira|Salto del Buey|Alto del Chocho|Octava Maravilla|Pueblito Paisa|Valle de Aburr[aá]|El Hueco|El Tesoro|Santaf[eé]|Hacienda|Antioquia|Oriente|Colombia|Instagram|TikTok|WhatsApp|Google|Facebook|T&T|Piedra del|El Retiro|La Ceja|El Poblado|El Salvador|Echeverr[ií]a|Meo[nñ]o|G[aá]rate|S[aã]o Tom[eé]|Pr[ií]ncipe|C[oô]te d.Ivoire|Carrera 79AA|La Alpujarra|La Palma/gi;
const SP = new Set('de del la las los el un una con para por que tu tus su sus en al es se más desde sobre entre como nos te lo este esta estos estas cada hasta antes después también según sin o qué cómo hay ver noche ciudad pueblos naturaleza cuéntanos escríbenos síguenos enlaces rápidos detalle experiencia experiencias lugar forma viajar pausar imágenes toca fotografía fotografías ampliar cotizar cotización política tratamiento datos autorizo enviar solicitud por favor nuestro nuestra viaje viajes aquí donde cuando mi mis pero ya muy todo todos todas otro otra otros día días hora horas precio valor reserva reservas tarifa pasajeros pasajero vehículo vehículos conductor conductores servicio servicios nosotros contacto inicio vehículos nosotros servicios menú blog nuevo nueva abrir cerrar siguiente anterior pestaña nueva abre un golpe realidad razones visitar aprender recibir preguntas sobre elegirnos imperdibles únicos únicas palabras mejor recuerdo'.split(' '));
const EN = new Set('the and your you with from our is are this that scroll stop step photo photos optional choose quote about read view follow enlarge pending welcome skip details'.split(' '));
const SPX = new Set('el los las del con una tus su sus en al más estos estas hasta después también según sin qué cómo hay día días precio viajes aquí donde cuando mis pero ya muy otro otra otros nuestro nuestra nosotros inicio vehículo vehículos servicio servicios experiencia experiencias contacto cotizar cotización tratamiento datos solicitud siguiente pestaña cerrar escríbenos síguenos nuevo nueva imágenes fotografía fotografías menú preguntas recibir razones realidad mejor recuerdo'.split(' '));
export { PROPER };
export const verdict = (str) => {
  if (/^(del|de)$/i.test(str.trim())) return { sp: false, en: false }; // palabra suelta de un nombre propio dividido por text-motion («Piedra del Peñol»)
  const words = str.replace(PROPER, ' ').toLowerCase().match(/[a-záéíóúñü]+/g) || [];
  if (/^[A-Z]{2} · /.test(str)) return { sp: false, en: false };
  if (words.length === 1) return { sp: (SP.has(words[0]) && !EN.has(words[0])) || /[áéíóúñ]/.test(words[0]) , en: false };
  if (words.length < 1) return { sp: false, en: false };
  let sp = 0, en = 0; for (const w of words) { if (SP.has(w)) sp++; if (EN.has(w)) en++; }
  const acc = /[áéíóúñ¿¡]/.test(str.replace(PROPER, ' '));
  return { sp: sp >= 1 && sp >= en || (acc && en === 0), en: en >= 1 && sp === 0 && !acc };
};
export const verdictPt = (str) => {
  if (/^(del|de)$/i.test(str.trim())) return { sp: false, en: false };
  const clean = str.replace(/Antioque[ñn]o|R[eé]plica del Viejo Pe[nñ]ol|Somos lo que dejamos a los dem[aá]s|Protecci[oó]n de datos/gi, ' ').replace(PROPER, ' ').replace(/-\p{L}+/gu, ' '), words = clean.toLowerCase().match(/[a-záéíóúñüãõçâêô]+/g) || [];
  if (/^[A-Z]{2} · /.test(str) || !words.length) return { bad: false };
  if (/[ñ¿¡]|ci[oó]n(es)?/i.test(clean)) return { bad: true };
  let sp = 0, en = 0; for (const w of words) { if (SPX.has(w)) sp++; if (EN.has(w)) en++; }
  return { bad: sp >= 1 || (en >= 1 && words.length > 0 && en * 2 >= words.length) };
};
