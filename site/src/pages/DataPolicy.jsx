import { PageTitle } from '../shared';
import { company } from '../company';
import '../policy.css';

/*
 * Política de tratamiento de datos personales — Ley 1581 de 2012 (Habeas Data). Texto tomado LITERALMENTE de la ruta oficial /privacidad de
 * tnt-colombia-connect (src/routes/privacidad.tsx, solo lectura), adaptando ÚNICAMENTE la identificación y el contacto del responsable a la sede
 * Medellín (Transporte y Turismo Medellín, NIT 901738550-6, RNT 176384, Carrera 79AA #1A Sur-280, Medellín, correo y WhatsApp de esta sede). No se
 * cambian obligaciones, finalidades, derechos, plazos ni procedimientos.
 * REQUIERE REVISIÓN DEL ASESOR LEGAL antes de considerarse vigente (igual que la fuente). PENDIENTE: versión en inglés (no hay una oficial).
 * Nota para el asesor: los apartados 8 y 9 (cookies y medición) se conservan literales de la fuente; confirmar si aplican a esta sede, porque este sitio hoy no carga
 * herramientas de medición ni muestra aviso de cookies.
 */
const SECTIONS = [
  ['responsable', '1. Responsable del tratamiento'], ['datos', '2. Datos que recogemos'], ['finalidad', '3. Finalidad'], ['autorizacion', '4. Autorización'],
  ['derechos', '5. Tus derechos'], ['ejercer', '6. Cómo ejercerlos'], ['retencion', '7. Retención'], ['cookies', '8. Cookies'], ['medicion', '9. Medición del sitio'],
];
export default function DataPolicy() {
  return <>
    <PageTitle tag="Ley 1581 de 2012 · Habeas Data" title="Política de tratamiento de datos personales" text="Qué datos nos compartes, con qué finalidad los usamos, cuánto tiempo los conservamos y cómo puedes ejercer tus derechos." />
    <div className="policy wrap">
      <nav className="policy-index" aria-label="Contenido de la política">
        <p className="eyebrow">En esta página</p>
        <ol>{SECTIONS.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
      </nav>
      <article className="policy-body">
        <p className="policy-note"><strong>Documento pendiente de validación legal.</strong> El contenido siguiente es un borrador técnico que recoge lo que exige la Ley 1581 de 2012. Debe ser revisado y aprobado por el asesor jurídico de la empresa antes de considerarse vigente.</p>
        <section id="responsable"><h2>1. Responsable del tratamiento</h2>
          <p>Transporte y Turismo Medellín, con domicilio en Carrera 79AA #1A Sur-280, Medellín, correo <a href={`mailto:${company.email}`}>{company.email}</a> y teléfono +57 304 496 1698.</p>
          <p>NIT 901738550-6. RNT 176384.</p></section>
        <section id="datos"><h2>2. Datos que recogemos</h2>
          <p>Únicamente los que nos escribes en el formulario de contacto: nombre, empresa u organización, correo electrónico, teléfono, tipo de consulta, número de personas, fecha del viaje y el mensaje. No recogemos datos sensibles ni datos de menores de edad.</p></section>
        <section id="finalidad"><h2>3. Finalidad</h2>
          <p>Responder a tu consulta, elaborar la cotización o propuesta que solicites y mantener el contacto comercial derivado de esa solicitud. No usamos tus datos para ninguna otra cosa ni los cedemos a terceros con fines publicitarios.</p></section>
        <section id="autorizacion"><h2>4. Autorización</h2>
          <p>El tratamiento requiere tu autorización previa, expresa e informada, que otorgas marcando la casilla correspondiente en el formulario. La casilla nunca viene marcada de antemano, y puedes retirar tu autorización en cualquier momento.</p></section>
        <section id="derechos"><h2>5. Tus derechos</h2>
          <p>Como titular puedes conocer, actualizar y rectificar tus datos; solicitar prueba de la autorización; ser informado del uso que les damos; presentar quejas ante la Superintendencia de Industria y Comercio; y revocar la autorización o solicitar la supresión de tus datos.</p></section>
        <section id="ejercer"><h2>6. Cómo ejercerlos</h2>
          <p>Escribiendo a <a href={`mailto:${company.email}`}>{company.email}</a> con el asunto «Protección de datos». Atendemos consultas en un plazo máximo de diez días hábiles y reclamos en quince, conforme a la ley.</p></section>
        <section id="retencion"><h2>7. Retención</h2>
          <p>Conservamos los datos mientras dure la relación comercial y, después, durante el plazo legal aplicable a las obligaciones contables y fiscales. Cumplido ese plazo, se suprimen.</p></section>
        <section id="cookies"><h2>8. Cookies</h2>
          <p>Usamos dos clases de cookies propias. Las <strong>necesarias</strong> solo guardan tus preferencias en este navegador —el idioma, el tema claro u oscuro y tu propia decisión sobre cookies— y sin ellas el sitio no puede recordarte cómo lo dejaste. Las <strong>de medición</strong> nos dicen qué páginas se visitan y qué botones se pulsan.</p>
          <p>Las de medición <strong>no se activan hasta que las aceptas</strong> en el aviso que aparece al entrar. Si eliges «solo las necesarias», no se descarga ninguna herramienta de terceros y no se envía ningún dato. Puedes cambiar de opinión cuando quieras borrando las cookies de este sitio en tu navegador: el aviso volverá a aparecer.</p></section>
        <section id="medicion"><h2>9. Medición del sitio</h2>
          <p>Si aceptas las cookies de medición, usamos Google Tag Manager y Google Analytics para entender cómo se usa el sitio: qué páginas se ven, en qué idioma, qué destinos despiertan más interés y desde dónde se nos escribe por WhatsApp. Lo hacemos para mejorar la web, no para perseguirte.</p>
          <p><strong>Nunca enviamos a esas herramientas tu nombre, tu correo, tu teléfono ni el contenido de tu mensaje.</strong> Lo que se registra es la página y el botón, nunca quién eres. La dirección IP se anonimiza y la información se conserva un máximo de catorce meses, tras los cuales se elimina.</p>
          <p className="policy-muted">Google actúa como encargado del tratamiento y puede almacenar esos datos fuera de Colombia. Al aceptar, autorizas esa transferencia internacional.</p></section>
      </article>
    </div>
  </>;
}
