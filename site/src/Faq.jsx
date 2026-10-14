import { useId } from 'react';
import { t } from './i18n';
import Icon from './icons';
import './tour-motion.css';

/*
 * Preguntas frecuentes accesibles (Spec 02 «Ubicación y marcado»): details/summary nativos (teclado, lector de pantalla y sin JS), filas de vidrio con la abierta
 * en --surface-2 + --shadow-1 (Spec 03 §M3.8). JSON-LD FAQPage SOLO con lo que se muestra en esta página (texto idéntico al visible, una vez por página).
 * El «+» rota 45° en 200 ms y el contenido entra con opacidad y desplazamiento de 8 px; la altura nunca se anima.
 */
const ld = (items) => JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((x) => ({ '@type': 'Question', name: t(x.q), acceptedAnswer: { '@type': 'Answer', text: t(x.a) } })) }).replace(/</g, '\\u003c');
export default function Faq({ items, title = 'Preguntas frecuentes', eyebrow = 'Antes de decidir', open = 0, className = '', headingLevel = 2, noJsonLd = false }) {
  const id = useId(), H = `h${headingLevel}`;
  if (!items.length) return null;
  return (
    <section className={`faq-sec ${className}`} aria-labelledby={`${id}-t`} data-tr>
      <div className="faq-head"><p className="eyebrow">{eyebrow}</p><H id={`${id}-t`}>{title}</H></div>
      <div className="faq-list">
        {items.map((x, i) => (
          <details key={x.id} className="faq-row" open={i === open ? true : undefined}>
            <summary><span>{x.q}</span><Icon name="plus" size={20} /></summary>
            <p>{x.a}</p>
          </details>
        ))}
      </div>
      {!noJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(items) }} />}
    </section>
  );
}
