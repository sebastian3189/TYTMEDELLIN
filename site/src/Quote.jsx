import { startTransition, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { rawTours } from './tours-text';
import { company, whatsapp } from './company';
import indicativos from './indicativos.json';
import QuoteCopy from './QuoteCopy';
import { language, t } from './i18n';
const countryLabel = row => language()==='en' ? new Intl.DisplayNames(['en'],{type:'region'}).of(row[1]) : row[2];

/*
 * Formulario de cotización (Spec 02 «Conversión», Spec 04 «Formularios», Spec 03 §I).
 * Adaptado de tnt-colombia-connect/src/components/venta/FormularioCotizacion.tsx (campos, validaciones, mensajes, indicativo con país
 * reconocido en vivo, tipo de solicitud PQRSF solo en /contacto, foco al primer error, honeypot) al sistema claro premium de este sitio.
 * Canal: sin backend. Se valida, se muestra un resumen, se copia al portapapeles y se abre WhatsApp con SOLO el nombre del recorrido en el
 * enlace (Spec 02: nunca nombre/teléfono/correo en la URL); el oficial manda todos los datos dentro del enlace de WhatsApp: se mantiene la
 * decisión del spec. Honeypot y time-trap en cliente; sin analítica con datos personales.
 */
const TIPOS = [['turismo', 'Turismo y traslados'], ['peticion', 'Petición'], ['queja', 'Queja'], ['reclamo', 'Reclamo'], ['sugerencia', 'Sugerencia'], ['contacto', 'Contacto'], ['felicitacion', 'Felicitación']];
const ORDER = ['experiencia', 'fecha', 'personas', 'salida', 'nombre', 'indicativo', 'telefono', 'correo', 'empresa', 'mensaje', 'consentimiento'];
const LABEL = { experiencia: 'Tu experiencia', fecha: 'Fecha del recorrido', personas: 'Personas', salida: 'Punto de salida', nombre: 'Nombre', indicativo: 'Indicativo', telefono: 'Teléfono / WhatsApp', correo: 'Correo electrónico', empresa: 'Empresa', mensaje: 'Mensaje', consentimiento: 'Autorización de datos' };
// Fecha local AAAA-MM-DD sin Intl (toLocaleDateString inicializa ICU: ~160 ms de tarea larga con CPU×4 al montar el formulario).
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const normalizeCode = (text) => { const digits = text.replace(/\D/g, '').slice(0, 4); return digits ? `+${digits}` : '+'; };
const country = (code) => indicativos.find(([c]) => c === code);

function validate(v, plan) {
  const e = {};
  if (v.nombre.trim().length < 2) e.nombre = 'Escribe tu nombre (al menos 2 letras).';
  const digits = v.telefono.replace(/\D/g, '');
  if (!v.telefono.trim()) e.telefono = 'Escribe un teléfono o WhatsApp para poder responderte.';
  else if (!/^[0-9+()\s-]+$/.test(v.telefono.trim())) e.telefono = 'Escribe solo números, espacios o guiones.';
  else if (digits.length < 7 || digits.length > 15) e.telefono = 'Revisa el número: debe tener entre 7 y 15 dígitos.';
  if (v.telefono.trim() && !country(v.indicativo)) e.indicativo = 'Indicativo no reconocido: escribe el de tu país, por ejemplo +57.';
  if (v.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.correo.trim())) e.correo = 'Escribe un correo válido, por ejemplo nombre@correo.com.';
  if (plan) {
    if (!v.fecha) e.fecha = 'Elige la fecha en la que quieres hacer el recorrido.';
    else if (v.fecha < today()) e.fecha = 'Elige una fecha de hoy en adelante.';
    const n = Number(v.personas);
    if (!/^\d{1,2}$/.test(v.personas) || n < 1 || n > 99) e.personas = 'Escribe cuántas personas son, en números (de 1 a 99).';
  } else if (v.mensaje.trim().length < 10) e.mensaje = 'Cuéntanos un poco más: mínimo 10 caracteres.';
  if (!v.consentimiento) e.consentimiento = 'Necesitamos tu autorización para poder responderte.';
  return e;
}

export default function Quote({ context = 'Un recorrido a mi medida', mode = 'cotizar' }) {
  const withType = mode === 'contacto';
  const [v, setV] = useState({ tipo: 'turismo', experiencia: context, fecha: '', personas: '', salida: '', nombre: '', indicativo: '+57', telefono: '', correo: '', empresa: '', mensaje: '', consentimiento: false });
  const [errors, setErrors] = useState({}), [summary, setSummary] = useState(''), [copied, setCopied] = useState('idle'), [retry, setRetry] = useState(false);
  const form = useRef(null), opened = useRef(Date.now()), honey = useRef(null), touched = useRef(false);
  const plan = !withType || v.tipo === 'turismo';
  const set = (key) => (event) => { const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value; setV((p) => ({ ...p, [key]: value })); setSummary(''); setCopied('idle'); setRetry(false); if (errors[key]) setErrors((p) => { const n = { ...p }; delete n[key]; return n; }); };
  useEffect(() => { setV((p) => ({ ...p, experiencia: context })); setSummary(''); setErrors({}); setCopied('idle'); }, [context]);
  const options = [...new Set([context, ...rawTours.map((t) => t[1]), 'Un recorrido a mi medida'])];
  const pais = country(v.indicativo);
  // Errores de campo: solo aria-invalid + aria-describedby (el único role="alert" es el resumen del formulario). `own` = false cuando el mensaje de error
  // ya lo da otro elemento (el indicativo usa la línea del país), para no repetirlo.
  const attrs = (name, extra, own = true) => ({ id: name, name, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': [own && errors[name] && `${name}-error`, extra].filter(Boolean).join(' ') || undefined });
  const error = (name) => errors[name] && <small id={`${name}-error`} className="error">{errors[name]}</small>;

  async function submit(event) {
    event.preventDefault();
    // Honeypot (los bots lo rellenan) y time-trap (envío en <2 s SIN ninguna interacción previa: teclado, puntero o autocompletado cuentan como interacción, así
    // no hay falsos positivos con personas). Ambos descartan con el mismo aviso genérico de reintento, sin revelar el motivo, para no fallar en silencio.
    if (honey.current?.value || (!touched.current && Date.now() - opened.current < 2000)) { setErrors({}); setSummary(''); setRetry(true); return; }
    setRetry(false);
    const next = validate(v, plan);
    setErrors(next); setCopied('idle');
    const first = ORDER.find((name) => next[name]);
    if (first) { setSummary(''); requestAnimationFrame(() => form.current?.querySelector(`#${first}`)?.focus()); return; }
    const phone = `${v.indicativo} ${v.telefono.trim()}${pais ? ` (${countryLabel(pais)})` : ''}`;
    const tipo = TIPOS.find(([id]) => id === v.tipo)[1];
    const lines = [`Hola, T&T Medellín. ${plan ? `Quiero cotizar: ${v.experiencia}.` : `${tipo}.`}`, withType ? `Tipo de solicitud: ${tipo}` : '', `Nombre: ${v.nombre.trim()}`, v.empresa.trim() && `Empresa: ${v.empresa.trim()}`, `Teléfono: ${phone}`, v.correo.trim() && `Correo: ${v.correo.trim()}`, plan && `Fecha: ${v.fecha}`, plan && `Personas: ${Number(v.personas)}`, plan && `Punto de salida: ${v.salida.trim() || 'Por acordar'}`, `${plan ? 'Detalles' : 'Mensaje'}: ${v.mensaje.trim() || 'Me gustaría conocer las opciones disponibles.'}`].filter(Boolean);
    const englishLines=[`Hello, T&T Medellín. ${plan?`I'd like a quote for: ${t(v.experiencia)}.`:`${t(tipo)}.`}`,withType&&`Inquiry type: ${t(tipo)}`,`Name: ${v.nombre.trim()}`,v.empresa.trim()&&`Company: ${v.empresa.trim()}`,`Phone: ${phone}`,v.correo.trim()&&`Email: ${v.correo.trim()}`,plan&&`Date: ${v.fecha}`,plan&&`People: ${Number(v.personas)}`,plan&&`Departure point: ${v.salida.trim()||'To be arranged'}`,`${plan?'Details':'Message'}: ${v.mensaje.trim()||"I'd like to know what options are available."}`].filter(Boolean);
    const text = (language()==='en'?englishLines:lines).join('\n');
    startTransition(() => setSummary(text)); // el resumen es trabajo diferible: no retrasa la respuesta al clic (INP)
    try { await navigator.clipboard.writeText(text); setCopied('ok'); } catch { setCopied('manual'); }
    requestAnimationFrame(() => document.querySelector('#resumen-solicitud')?.focus());
  }
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied('ok'); } catch { setCopied('manual'); document.querySelector('.summary textarea')?.select(); } };
  const errorList = ORDER.filter((name) => errors[name]);
  const message = copied === 'ok' ? 'Solicitud copiada. Abre WhatsApp y pégala en la conversación.' : 'No pudimos copiar automáticamente: usa «Copiar solicitud» o selecciona el texto.';

  return <section className="quote-section wrap"><QuoteCopy withType={withType}/>
    <form ref={form} className="quote-form" noValidate onSubmit={submit} onInputCapture={() => { touched.current = true; }} onKeyDownCapture={() => { touched.current = true; }} onPointerDownCapture={() => { touched.current = true; }} aria-label={withType ? 'Formulario de contacto' : 'Formulario de cotización'}>
      <div className="honeypot" aria-hidden="true"><label>No completar<input ref={honey} name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <p className="form-note full">Los campos con * son obligatorios.</p>
      {withType && <fieldset className="form-group full"><legend>Tipo de solicitud *</legend><div className="chips" role="radiogroup" aria-label="Tipo de solicitud">{TIPOS.map(([id, label]) => <label key={id} className={`chip ${v.tipo === id ? 'is-on' : ''}`}><input type="radio" name="tipo" value={id} checked={v.tipo === id} onChange={set('tipo')}/><span>{label}</span></label>)}</div></fieldset>}
      {plan && <fieldset className="form-group full"><legend>Tu plan</legend><div className="form-grid">
        <div className="field full"><label htmlFor="experiencia">Tu experiencia *</label><select {...attrs('experiencia')} value={v.experiencia} onChange={set('experiencia')}>{options.map((n) => <option key={n}>{n}</option>)}</select></div>
        <div className="field"><label htmlFor="fecha">Fecha del recorrido *</label><input {...attrs('fecha')} type="date" min={today()} value={v.fecha} onChange={set('fecha')} required/>{error('fecha')}</div>
        <div className="field"><label htmlFor="personas">Personas *</label><input {...attrs('personas', 'personas-ayuda')} type="text" inputMode="numeric" autoComplete="off" maxLength={2} value={v.personas} onChange={(e) => { e.target.value = e.target.value.replace(/\D/g, ''); set('personas')(e); }} required/><small id="personas-ayuda" className="hint">Cuántas personas viajan, incluyéndote.</small>{error('personas')}</div>
        <div className="field full"><label htmlFor="salida">Punto de salida</label><input {...attrs('salida','salida-ayuda')} autoComplete="off" maxLength={160} value={v.salida} onChange={set('salida')}/><small className="hint" id="salida-ayuda">Hotel, barrio o aeropuerto. Si aún no lo sabes, lo acordamos.</small></div>
      </div></fieldset>}
      <fieldset className="form-group full"><legend>Tus datos</legend><div className="form-grid">
        <div className="field"><label htmlFor="nombre">Nombre *</label><input {...attrs('nombre')} autoComplete="name" maxLength={80} value={v.nombre} onChange={set('nombre')} required/>{error('nombre')}</div>
        <div className="field"><label htmlFor="empresa">Empresa (si aplica)</label><input {...attrs('empresa')} autoComplete="organization" maxLength={120} value={v.empresa} onChange={set('empresa')}/></div>
        <div className="field full"><span className="field-label" id="telefono-label">Teléfono / WhatsApp *</span><div className="phone-row" role="group" aria-labelledby="telefono-label">
          <div className="field"><label htmlFor="indicativo" className="hint-label">Indicativo</label><input {...attrs('indicativo', 'indicativo-pais', false)} type="text" inputMode="tel" autoComplete="tel-country-code" list="indicativos-lista" maxLength={5} value={v.indicativo} onChange={(e) => { e.target.value = normalizeCode(e.target.value); set('indicativo')(e); }} onBlur={() => v.indicativo === '+' && setV((p) => ({ ...p, indicativo: '+57' }))}/></div>
          <div className="field"><label htmlFor="telefono" className="hint-label">Número</label><input {...attrs('telefono')} type="tel" inputMode="tel" autoComplete="tel-national" maxLength={30} value={v.telefono} onChange={set('telefono')} required/></div></div>
          <datalist id="indicativos-lista">{indicativos.map(([code, iso, name]) => <option key={code} value={code}>{`${iso} · ${countryLabel([code,iso,name])}`}</option>)}</datalist>
          <small id="indicativo-pais" aria-live="polite" className={pais ? 'hint' : 'error'}>{pais ? `${pais[1]} · ${countryLabel(pais)}` : 'Indicativo no reconocido: escribe el de tu país, por ejemplo +57.'}</small>{error('telefono')}</div>
        <div className="field full"><label htmlFor="correo">Correo electrónico (opcional)</label><input {...attrs('correo')} type="email" autoComplete="email" maxLength={120} value={v.correo} onChange={set('correo')}/>{error('correo')}</div>
        <div className="field full"><label htmlFor="mensaje">{plan ? '¿Qué haría especial este viaje?' : 'Cuéntanos tu consulta *'}</label><textarea {...attrs('mensaje', 'mensaje-ayuda')} rows={4} maxLength={800} value={v.mensaje} onChange={set('mensaje')}/><small id="mensaje-ayuda" className="hint">{plan ? 'Opcional: intereses, equipaje o necesidades del grupo. ' : ''}{v.mensaje.length}/800</small>{error('mensaje')}</div>
      </div></fieldset>
      <div className="consent full"><input {...attrs('consentimiento')} type="checkbox" checked={v.consentimiento} onChange={set('consentimiento')} required/><label htmlFor="consentimiento">He leído el <Link to="/privacidad" target="_blank">aviso de privacidad</Link> y autorizo compartir esta solicitud con T&T cuando la envíe.</label>{error('consentimiento')}</div>
      {retry && <div className="form-errors full" role="alert"><strong>No pudimos preparar tu consulta.</strong> Inténtalo de nuevo en unos segundos.</div>}
      {!retry && errorList.length > 0 && <div className="form-errors full" role="alert"><strong>Revisa {errorList.length === 1 ? 'este campo' : `estos ${errorList.length} campos`}:</strong> {errorList.map((name, i) => <span key={name}>{i > 0 && ', '}<a href={`#${name}`} onClick={(e) => { e.preventDefault(); form.current.querySelector(`#${name}`)?.focus(); }}>{LABEL[name]}</a></span>)}.</div>}
      <button className="button full" type="submit">{withType && !plan ? 'Preparar mi mensaje' : 'Preparar mi consulta'}<span aria-hidden="true">↗</span></button>
      <p className="form-note full">Los datos permanecen en esta página hasta que tú decidas compartirlos. Preparar la consulta no confirma una reserva. También puedes llamarnos: <a href={`tel:${company.phone.replaceAll(' ', '')}`}>{company.phone}</a>.</p>
      {summary && <div className="summary full" id="resumen-solicitud" tabIndex={-1}><h3>Revisa y comparte tu solicitud</h3><ol className="summary-steps"><li>Revisa el texto.</li><li>Cópialo (ya lo intentamos por ti).</li><li>Ábrelo en WhatsApp y pégalo.</li></ol><textarea aria-label="Resumen de solicitud" value={summary} readOnly rows={8}/><div className="summary-actions"><button type="button" className="button" onClick={copy}>Copiar solicitud</button><a className="button" href={whatsapp(plan ? v.experiencia : 'mi consulta')} target="_blank" rel="noreferrer">Abrir WhatsApp y pegar<span aria-hidden="true">↗</span></a></div><p role="status">{message}</p><button type="button" className="text-link" onClick={() => { setSummary(''); form.current.querySelector('#nombre')?.focus(); }}>Editar mis datos</button></div>}
    </form></section>;
}
