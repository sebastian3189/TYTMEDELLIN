import { startTransition, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { rawTours } from './tours-text';
import { company } from './company';
import indicativos from './indicativos.json';
import QuoteCopy from './QuoteCopy';
import { language, t } from './i18n';
import Arrow from './Arrow';
const countryLabel = row => language()!=='es' ? new Intl.DisplayNames([language()],{type:'region'}).of(row[1]) : row[2];

/*
 * Formulario de cotización (Spec 02 «Conversión», Spec 04 «Formularios», Spec 03 §I).
 * Adaptado de tnt-colombia-connect/src/components/venta/FormularioCotizacion.tsx (campos, validaciones, mensajes, indicativo con país
 * reconocido en vivo, tipo de solicitud PQRSF solo en /contacto, foco al primer error, honeypot) al sistema claro premium de este sitio.
 * Canal: sin backend. Se valida y, tras la autorización de datos, se abre wa.me con el mensaje completo ya escrito (excepción aprobada por el usuario el
 * 2026-10-15, Spec 04 «Excepción WhatsApp»); la persona solo pulsa Enviar. «Copiar mensaje» como alternativa. Honeypot y time-trap en cliente; sin
 * localStorage ni analítica con datos personales.
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

// Mensaje de WhatsApp (ES/EN según la página). Sin emojis; saltos de línea reales que encodeURIComponent convierte en %0A. Máx. ~1.800 caracteres: se recortan las notas.
const MAX_MESSAGE = 1800;
function buildMessage(v, plan, withType, pais) {
  const en = language() === 'en', tipo = TIPOS.find(([id]) => id === v.tipo)[1];
  const phone = `${v.indicativo} ${v.telefono.trim()}${pais ? ` (${countryLabel(pais)})` : ''}`;
  const L = language()==='pt-BR' ? {hi:plan?'Olá, Transporte y Turismo Medellín. Gostaria de solicitar um orçamento:':`Olá, Transporte y Turismo Medellín. Minha solicitação (${t(tipo)}):`,type:'Tipo de solicitação',exp:'Experiência',date:'Data',people:'Viajantes',pickup:'Ponto de saída',tbd:'A combinar',lang:'Idioma',langName:'Português (Brasil)',notes:plan?'Observações':'Mensagem',name:'Nome',company:'Empresa',phone:'Telefone',email:'E-mail',none:'Gostaria de conhecer as opções disponíveis.',sent:'Enviado pelo site'} : en
    ? { hi: plan ? "Hello, Transporte y Turismo Medellín. I'd like a quote:" : `Hello, Transporte y Turismo Medellín. My request (${t(tipo)}):`, type: 'Inquiry type', exp: 'Experience', date: 'Date', people: 'Travelers', pickup: 'Departure point', tbd: 'To be arranged', lang: 'Language', langName: 'English', notes: plan ? 'Notes' : 'Message', name: 'Name', company: 'Company', phone: 'Phone', email: 'Email', none: "I'd like to know what options are available.", sent: 'Sent from the website' }
    : { hi: plan ? 'Hola, Transporte y Turismo Medellín. Quiero cotizar:' : `Hola, Transporte y Turismo Medellín. Mi solicitud (${tipo}):`, type: 'Tipo de solicitud', exp: 'Experiencia', date: 'Fecha', people: 'Viajeros', pickup: 'Punto de salida', tbd: 'Por acordar', lang: 'Idioma', langName: 'Español', notes: plan ? 'Notas' : 'Mensaje', name: 'Nombre', company: 'Empresa', phone: 'Teléfono', email: 'Correo', none: 'Me gustaría conocer las opciones disponibles.', sent: 'Enviado desde la web' };
  const build = (notes) => [L.hi, withType && `${L.type}: ${t(tipo)}`, plan && `${L.exp}: ${t(v.experiencia)}`, plan && `${L.date}: ${v.fecha}`, plan && `${L.people}: ${Number(v.personas)}`, plan && `${L.pickup}: ${v.salida.trim() || L.tbd}`, `${L.lang}: ${L.langName}`, `${L.notes}: ${notes}`, `${L.name}: ${v.nombre.trim()}`, v.empresa.trim() && `${L.company}: ${v.empresa.trim()}`, `${L.phone}: ${phone}`, v.correo.trim() && `${L.email}: ${v.correo.trim()}`, `
${L.sent}`].filter(Boolean).join('\n');
  let notes = v.mensaje.trim().replace(/\s*\n\s*/g, ' ') || L.none, text = build(notes);
  if (text.length > MAX_MESSAGE) { notes = notes.slice(0, Math.max(0, notes.length - (text.length - MAX_MESSAGE) - 1)).trimEnd() + '…'; text = build(notes); }
  return text;
}
const waUrl = (text) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

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

  function submit(event) {
    event.preventDefault();
    // Honeypot (los bots lo rellenan) y time-trap (envío en <2 s SIN ninguna interacción previa: teclado, puntero o autocompletado cuentan como interacción, así
    // no hay falsos positivos con personas). Ambos descartan con el mismo aviso genérico de reintento, sin revelar el motivo, para no fallar en silencio.
    if (honey.current?.value || (!touched.current && Date.now() - opened.current < 2000)) { setErrors({}); setSummary(''); setRetry(true); return; }
    setRetry(false);
    const next = validate(v, plan);
    setErrors(next); setCopied('idle');
    const first = ORDER.find((name) => next[name]);
    if (first) { setSummary(''); requestAnimationFrame(() => form.current?.querySelector(`#${first}`)?.focus()); return; }
    const text = buildMessage(v, plan, withType, pais);
    const url = waUrl(text);
    // Excepción aprobada por el usuario (Spec 04 «Excepción WhatsApp»): el mensaje completo va en el enlace de wa.me. Se abre de forma síncrona dentro del gesto
    // del usuario (no se bloquea). Con 'noopener' window.open devuelve siempre null, así que el bloqueo no es detectable: el panel con el botón grande queda siempre visible.
    window.open(url, '_blank', 'noopener,noreferrer');
    startTransition(() => setSummary(text));
    requestAnimationFrame(() => document.querySelector('#resumen-solicitud')?.focus());
  }
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied('ok'); } catch { setCopied('manual'); document.querySelector('.summary textarea')?.select(); } };
  const errorList = ORDER.filter((name) => errors[name]);

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
      <div className="consent full"><input {...attrs('consentimiento')} type="checkbox" checked={v.consentimiento} onChange={set('consentimiento')} required/><label htmlFor="consentimiento">{/* Razón social completa: PENDIENTE CLIENTE (hoy figura la marca y el NIT 901738550-6). */}Autorizo a Transporte y Turismo Medellín, NIT 901738550-6, a tratar mis datos para responder y cotizar mi solicitud, según la <Link to="/politica-de-tratamiento-de-datos" target="_blank">Política de tratamiento de datos</Link></label>{error('consentimiento')}</div>
      {retry && <div className="form-errors full" role="alert"><strong>No pudimos preparar tu consulta.</strong> Inténtalo de nuevo en unos segundos.</div>}
      {!retry && errorList.length > 0 && <div className="form-errors full" role="alert"><strong>Revisa {errorList.length === 1 ? 'este campo' : `estos ${errorList.length} campos`}:</strong> {errorList.map((name, i) => <span key={name}>{i > 0 && ', '}<a href={`#${name}`} onClick={(e) => { e.preventDefault(); form.current.querySelector(`#${name}`)?.focus(); }}>{LABEL[name]}</a></span>)}.</div>}
      <button className="button full" type="submit">Enviar por WhatsApp<Arrow/></button>
      <p className="form-note full">Se abrirá WhatsApp con tu mensaje listo; revisa y pulsa Enviar.</p>
      <p className="form-note full">No guardamos tus datos en este navegador. Enviar la consulta no confirma una reserva. También puedes llamarnos: <a href={`tel:${company.phone.replaceAll(' ', '')}`}>{company.phone}</a>.</p>
      {summary && <div className="summary full" id="resumen-solicitud" tabIndex={-1}><h3>Tu mensaje está listo</h3><p>Abrimos WhatsApp con tu mensaje escrito. Revisa y pulsa Enviar. Si no se abrió, usa el botón.</p><a className="button wa-open" href={waUrl(summary)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp con mi mensaje<Arrow/></a><textarea aria-label="Resumen de solicitud" value={summary} readOnly rows={8}/><div className="summary-actions"><button type="button" className="button" onClick={copy}>Copiar mensaje</button></div><p role="status">{copied === 'ok' ? 'Mensaje copiado. Si WhatsApp no está instalado, pégalo en WhatsApp Web.' : copied === 'manual' ? 'No pudimos copiar automáticamente: selecciona el texto y cópialo.' : ''}</p><button type="button" className="text-link" onClick={() => { setSummary(''); form.current.querySelector('#nombre')?.focus(); }}>Editar mis datos</button></div>}
    </form></section>;
}
