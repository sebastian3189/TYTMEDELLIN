import { company } from './company';
import { Trust } from './PremiumMotion';

// Columna de texto del formulario de cotización / contacto. Aparte de Quote.jsx para que el HTML prerenderizado (y el marco de carga) ya traiga el
// encabezado y el teléfono: el formulario (lazy, solo cliente) no es el elemento LCP ni cambia el diseño al llegar.
export default function QuoteCopy({ withType = false }) {
  return <div className="quote-copy"><Trust/><p className="eyebrow">Hecho para ti</p><h2>{withType ? <>Cuéntanos qué<br/>necesitas.</> : <>Tu experiencia<br/>empieza con una<br/><em>conversación.</em></>}</h2><p>{withType ? 'Elige el tipo de solicitud y completa tus datos. Te dejamos el mensaje listo en WhatsApp para que solo pulses Enviar.' : 'Completa tus datos y te dejamos el mensaje listo en WhatsApp para que solo pulses Enviar.'}</p><a href={`tel:${company.phone.replaceAll(' ', '')}`} className="contact-number">{company.phone}</a><small>La disponibilidad y el valor se confirman con el equipo.</small></div>;
}
