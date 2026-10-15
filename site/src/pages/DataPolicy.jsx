import { PageTitle } from '../shared';
import { company } from '../company';
import { language } from '../i18n';
import '../policy.css';

/*
 * Política de tratamiento de datos personales — Ley 1581 de 2012 (Habeas Data). Texto tomado LITERALMENTE de la ruta oficial /privacidad de
 * tnt-colombia-connect (src/routes/privacidad.tsx, solo lectura), adaptando ÚNICAMENTE la identificación y el contacto del responsable a la sede
 * Medellín (Transporte y Turismo Medellín, NIT 901738550-6, RNT 176384, Carrera 79AA #1A Sur-280, Medellín, correo y WhatsApp de esta sede). No se
 * cambian obligaciones, finalidades, derechos, plazos ni procedimientos.
 * REQUIERE REVISIÓN DEL ASESOR LEGAL antes de considerarse vigente (igual que la fuente). Versión en inglés: DataPolicyEn (traducción de cortesía, también por revisar por el asesor; prevalece el español).
 * Modificación 2026-10-15 (decisión del usuario, Spec 04 «Excepción WhatsApp»): se añade el apartado «Envío de tu solicitud por WhatsApp» y se
 * precisa el apartado 2 porque los formularios ya no copian un resumen, sino que abren WhatsApp con el mensaje prellenado. Revisar con el asesor.
 * Auditoría técnica autorizada 2026-10-15: apartados 9 y 10 actualizados al almacenamiento real, consentimiento de preferencias y ausencia de analítica.
 * Traducción portuguesa de cortesía mediante i18n. La clasificación técnica y ambas traducciones siguen pendientes de validación jurídica.
 */
const SECTIONS = [
  ['responsable', '1. Responsable del tratamiento'], ['datos', '2. Datos que recogemos'], ['whatsapp', '3. Envío de tu solicitud por WhatsApp'], ['finalidad', '4. Finalidad'], ['autorizacion', '5. Autorización'],
  ['derechos', '6. Tus derechos'], ['ejercer', '7. Cómo ejercerlos'], ['retencion', '8. Retención'], ['cookies', '9. Cookies'], ['medicion', '10. Medición del sitio'],
];
export default function DataPolicy() {
  if (language() === 'en') return <DataPolicyEn />;
  return <>
    <PageTitle tag="Ley 1581 de 2012 · Habeas Data" title="Política de tratamiento de datos personales" text="Qué datos nos compartes, con qué finalidad los usamos, cuánto tiempo los conservamos y cómo puedes ejercer tus derechos." />
    <div className="policy wrap">
      <nav className="policy-index" aria-label="Contenido de la política">
        <p className="eyebrow">En esta página</p>
        <ol>{SECTIONS.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
      </nav>
      <article className="policy-body">
        {language()==='pt-BR'&&<p className="policy-note" lang="pt-BR">Esta versão em português é uma tradução de cortesia. Em caso de divergência, prevalece a versão em espanhol. A validação jurídica permanece pendente.</p>}
        <p className="policy-note"><strong>Documento pendiente de validación legal.</strong> El contenido siguiente es un borrador técnico que recoge lo que exige la Ley 1581 de 2012. Debe ser revisado y aprobado por el asesor jurídico de la empresa antes de considerarse vigente.</p>
        <section id="responsable"><h2>1. Responsable del tratamiento</h2>
          <p>Transporte y Turismo Medellín, con domicilio en Carrera 79AA #1A Sur-280, Medellín, correo <a href={`mailto:${company.email}`}>{company.email}</a> y teléfono +57 304 496 1698.</p>
          <p>NIT 901738550-6. RNT 176384.</p></section>
        <section id="datos"><h2>2. Datos que recogemos</h2>
          <p>Únicamente los que nos escribes en los formularios de contacto y cotización: nombre, empresa u organización, correo electrónico, teléfono, tipo de consulta, número de personas, fecha del viaje, los demás detalles del viaje que decidas incluir (por ejemplo, punto de recogida) y el mensaje. No recogemos datos sensibles ni datos de menores de edad.</p></section>
        <section id="whatsapp"><h2>3. Envío de tu solicitud por WhatsApp</h2>
          <p>Cuando completas un formulario y lo envías, este sitio no guarda tus datos: con la información que escribiste prepara un mensaje y abre WhatsApp (en la aplicación o en WhatsApp Web) con ese mensaje ya escrito, dirigido a nuestro número +57 304 496 1698. Tú decides si lo envías.</p>
          <p>Para prellenar el mensaje, sus datos viajan dentro del enlace que abre WhatsApp, por lo que pueden quedar registrados en el historial de tu navegador o dispositivo. WhatsApp es un servicio de un tercero (WhatsApp LLC, del grupo Meta Platforms) que trata la información conforme a sus propias condiciones y política de privacidad, y puede almacenarla fuera de Colombia. Al enviar el mensaje, autorizas esa transmisión y transferencia internacional. Si prefieres no usar WhatsApp, puedes copiar el mensaje y enviarlo a <a href={`mailto:${company.email}`}>{company.email}</a>.</p></section>
        <section id="finalidad"><h2>4. Finalidad</h2>
          <p>Responder a tu consulta, elaborar la cotización o propuesta que solicites y mantener el contacto comercial derivado de esa solicitud. No usamos tus datos para ninguna otra cosa ni los cedemos a terceros con fines publicitarios.</p></section>
        <section id="autorizacion"><h2>5. Autorización</h2>
          <p>El tratamiento requiere tu autorización previa, expresa e informada, que otorgas marcando la casilla correspondiente en el formulario. La casilla nunca viene marcada de antemano, y puedes retirar tu autorización en cualquier momento.</p></section>
        <section id="derechos"><h2>6. Tus derechos</h2>
          <p>Como titular puedes conocer, actualizar y rectificar tus datos; solicitar prueba de la autorización; ser informado del uso que les damos; presentar quejas ante la Superintendencia de Industria y Comercio; y revocar la autorización o solicitar la supresión de tus datos.</p></section>
        <section id="ejercer"><h2>7. Cómo ejercerlos</h2>
          <p>Escribiendo a <a href={`mailto:${company.email}`}>{company.email}</a> con el asunto «Protección de datos». Atendemos consultas en un plazo máximo de diez días hábiles y reclamos en quince, conforme a la ley.</p></section>
        <section id="retencion"><h2>8. Retención</h2>
          <p>Conservamos los datos mientras dure la relación comercial y, después, durante el plazo legal aplicable a las obligaciones contables y fiscales. Cumplido ese plazo, se suprimen.</p></section>
        <section id="cookies"><h2>9. Cookies</h2><p>Este sitio no instala cookies de analítica ni publicidad. Usa almacenamiento local para guardar tu decisión de privacidad durante seis meses y ajustes funcionales de accesibilidad; la ayuda de navegación se recuerda solo durante la sesión.</p><p>Guardar el tema claro u oscuro entre visitas es opcional y requiere tu aceptación. El idioma se determina por la dirección de la página. Puedes configurar o retirar tu consentimiento desde «Cookies y preferencias» en el pie del sitio.</p></section>
        <section id="medicion"><h2>10. Medición del sitio</h2><p>No usamos Google Analytics, Google Tag Manager ni otras herramientas de medición o publicidad. No enviamos eventos ni datos de los formularios a servicios de analítica.</p><p>El mapa de OpenStreetMap solo se carga cuando pulsas el botón para mostrarlo. Ese clic establece una conexión con el proveedor del mapa. Los enlaces a WhatsApp y otras plataformas se abren cuando tú los eliges.</p></section>
      </article>
    </div>
  </>;
}

/* English courtesy translation (literal; no obligations, rights, deadlines or procedures added, removed or softened). Requires review by the legal consultant. */
const SECTIONS_EN = [
  ['controller', '1. Data controller'], ['data', '2. Data we collect'], ['whatsapp', '3. Sending your request via WhatsApp'], ['purpose', '4. Purpose'], ['authorization', '5. Authorization'],
  ['rights', '6. Your rights'], ['exercise', '7. How to exercise them'], ['retention', '8. Retention'], ['cookies', '9. Cookies'], ['measurement', '10. Site measurement'],
];
function DataPolicyEn() {
  return <>
    <PageTitle tag="Law 1581 of 2012 · Habeas Data" title="Personal data processing policy" text="What data you share with us, what we use it for, how long we keep it and how you can exercise your rights." />
    <div className="policy wrap">
      <nav className="policy-index" aria-label="Policy contents">
        <p className="eyebrow">On this page</p>
        <ol>{SECTIONS_EN.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
      </nav>
      <article className="policy-body">
        <p className="policy-note" lang="en"><strong>This English version is a courtesy translation. In case of discrepancy, the Spanish version prevails.</strong> It also requires review by the company's legal consultant (see the legal validation note below).</p>
        <p className="policy-note"><strong>Document pending legal validation.</strong> The following content is a technical draft that reflects what Law 1581 of 2012 requires. It must be reviewed and approved by the company's legal counsel before it is considered in force.</p>
        <section id="controller"><h2>1. Data controller</h2>
          <p>Transporte y Turismo Medellín, domiciled at Carrera 79AA #1A Sur-280, Medellín, email <a href={`mailto:${company.email}`}>{company.email}</a> and telephone +57 304 496 1698.</p>
          <p>NIT 901738550-6. RNT 176384.</p></section>
        <section id="data"><h2>2. Data we collect</h2>
          <p>Only what you write to us in the contact and quote forms: name, company or organization, email address, telephone, type of enquiry, number of people, travel date, any other trip details you choose to include (for example, pickup point) and the message. We do not collect sensitive data or data of minors.</p></section>
        <section id="whatsapp"><h2>3. Sending your request via WhatsApp</h2>
          <p>When you complete and submit a form, this site does not store your data: with the information you wrote it prepares a message and opens WhatsApp (in the app or in WhatsApp Web) with that message already written, addressed to our number +57 304 496 1698. You decide whether to send it.</p>
          <p>To pre-fill the message, its data travels inside the link that opens WhatsApp, so it may be recorded in the history of your browser or device. WhatsApp is a third-party service (WhatsApp LLC, part of the Meta Platforms group) that processes the information under its own terms and privacy policy, and may store it outside Colombia. By sending the message, you authorize that transmission and international transfer. If you prefer not to use WhatsApp, you can copy the message and send it to <a href={`mailto:${company.email}`}>{company.email}</a>.</p></section>
        <section id="purpose"><h2>4. Purpose</h2>
          <p>To answer your enquiry, prepare the quotation or proposal you request and maintain the commercial contact arising from that request. We do not use your data for anything else and we do not transfer it to third parties for advertising purposes.</p></section>
        <section id="authorization"><h2>5. Authorization</h2>
          <p>Processing requires your prior, express and informed authorization, which you give by ticking the corresponding box in the form. The box is never ticked in advance, and you may withdraw your authorization at any time.</p></section>
        <section id="rights"><h2>6. Your rights</h2>
          <p>As the data subject you may know, update and rectify your data; request proof of the authorization; be informed of the use we make of it; file complaints with the Superintendencia de Industria y Comercio (Superintendence of Industry and Commerce); and revoke the authorization or request the deletion of your data.</p></section>
        <section id="exercise"><h2>7. How to exercise them</h2>
          <p>By writing to <a href={`mailto:${company.email}`}>{company.email}</a> with the subject "Protección de datos" (data protection). We answer enquiries within a maximum of ten business days and claims within fifteen, in accordance with the law.</p></section>
        <section id="retention"><h2>8. Retention</h2>
          <p>We keep the data for as long as the commercial relationship lasts and, afterwards, for the legal period applicable to accounting and tax obligations. Once that period has elapsed, the data is deleted.</p></section>
        <section id="cookies"><h2>9. Cookies</h2><p>This site does not install analytics or advertising cookies. It uses local storage to remember your privacy choice for six months and functional accessibility settings; navigation guidance is remembered only during the session.</p><p>Saving your light or dark theme between visits is optional and requires your acceptance. The language is determined by the page address. You can configure or withdraw consent through “Cookies and preferences” in the footer.</p></section>
        <section id="measurement"><h2>10. Site measurement</h2><p>We do not use Google Analytics, Google Tag Manager or other measurement or advertising tools. We do not send events or form data to analytics services.</p><p>The OpenStreetMap map loads only when you press the button to show it. That click connects to the map provider. Links to WhatsApp and other platforms open when you choose them.</p></section>
      </article>
    </div>
  </>;
}
