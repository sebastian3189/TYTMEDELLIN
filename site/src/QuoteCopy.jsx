import { company } from './company';
import { Trust } from './PremiumMotion';

// Columna de texto del formulario de cotización / contacto. Aparte de Quote.jsx para que el HTML prerenderizado (y el marco de carga) ya traiga el
// encabezado y el teléfono: el formulario (lazy, solo cliente) no es el elemento LCP ni cambia el diseño al llegar.
export default function QuoteCopy({ withType = false }) {
  return <div className="quote-copy"><Trust/><p className="eyebrow">Hecho para ti</p><h2>{withType ? <>Cuéntanos qué<br/>necesitas.</> : <>Tu experiencia<br/>empieza con una<br/><em>conversación.</em></>}</h2><p>{withType ? 'Elige el tipo de solicitud y prepara tu mensaje. Compártelo con nuestro equipo en WhatsApp.' : 'Revisa tu solicitud, cópiala y compártela con nuestro equipo en WhatsApp.'}</p><a href={`tel:${company.phone.replaceAll(' ', '')}`} className="contact-number">{company.phone}</a><small>La disponibilidad y el valor se confirman con el equipo.</small></div>;
}
