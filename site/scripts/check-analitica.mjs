// Analítica con consentimiento (Spec 04, Spec 05): sin aceptar no se carga Google; al aceptar llegan los eventos, una sola vez y sin datos personales; al retirar se detienen y se borran las cookies.
// Google se simula (no hay peticiones reales). Uso: VITE_GTM_ID=GTM-PRUEBA npm run build && node scripts/serve-static.mjs dist 4650 &  TYT_TEST_URL=http://127.0.0.1:4650 node scripts/check-analitica.mjs
// Con --sin-id comprueba una compilación sin VITE_GTM_ID: nunca se carga nada, ni aceptando.
import { chromium } from '@playwright/test';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4650', sinId = process.argv.includes('--sin-id');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const fallos = [];
const ok = (cond, msg) => { console.log(`${cond ? 'ok   ' : 'FALLA'} ${msg}`); if (!cond) fallos.push(msg); };
const PII = { nombre: 'Ana Prueba Secreta', telefono: '3001234567', correo: 'ana.secreta@ejemplo.com', mensaje: 'MensajeConfidencialDePrueba' };

async function contexto(inicial) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }), google = [];
  await ctx.route(/googletagmanager\.com|google-analytics\.com/, (route) => { google.push(route.request().url()); route.fulfill({ contentType: 'text/javascript', body: '' }); });
  await ctx.route(/wa\.me/, (route) => route.fulfill({ contentType: 'text/html', body: '' }));
  if (inicial) await ctx.addInitScript((valor) => { if (!sessionStorage.getItem('sembrado')) { localStorage.setItem('tyt-privacy-v1', JSON.stringify(valor)); sessionStorage.setItem('sembrado', '1'); } }, inicial);
  return { ctx, google };
}
const capa = (page) => page.evaluate(() => (window.dataLayer || []).map((x) => (x && typeof x.length === 'number' && !x.event ? Array.from(x) : { ...x })));
const eventos = async (page, nombre) => (await capa(page)).filter((x) => x.event === nombre);
const consentimiento = async (page) => (await capa(page)).filter((x) => Array.isArray(x) && x[0] === 'consent');
const aceptado = { version: 2, preferences: true, analytics: true, expires: Date.now() + 1e10 };

{ // Primera visita: aviso visible y nada de Google.
  const { ctx, google } = await contexto(), page = await ctx.newPage();
  await page.goto(base + '/tours/guatape', { waitUntil: 'load' }); await page.waitForTimeout(2800);
  ok(await page.locator('.consent-banner').isVisible(), 'el aviso aparece en la primera visita');
  ok(/Google Analytics/.test(await page.locator('.consent-banner').innerText()), 'el aviso menciona Google Analytics');
  ok(google.length === 0, 'sin decidir no se pide nada a Google');
  ok(!(await ctx.cookies()).some((c) => c.name.startsWith('_ga')), 'sin decidir no hay cookies _ga');
  ok((await eventos(page, 'view_item')).length === 0, 'sin decidir no queda ningún view_item');
  await page.locator('.consent-banner button', { hasText: 'Rechazar' }).click(); await page.waitForTimeout(1800);
  ok(google.length === 0, 'al rechazar no se pide nada a Google');
  await ctx.close();
}
if (sinId) {
  const { ctx, google } = await contexto(aceptado), page = await ctx.newPage();
  await page.goto(base + '/tours/guatape', { waitUntil: 'load' }); await page.waitForTimeout(3200);
  ok(google.length === 0, 'sin VITE_GTM_ID no se carga Google aunque se acepte');
  ok(await page.evaluate(() => window.dataLayer === undefined), 'sin VITE_GTM_ID no existe dataLayer');
  await ctx.close();
} else {
  { // Aceptar con la ficha abierta.
    const { ctx, google } = await contexto(), page = await ctx.newPage();
    await page.goto(base + '/tours/guatape', { waitUntil: 'load' }); await page.waitForTimeout(800);
    const inicial = await consentimiento(page);
    ok(inicial[0]?.[1] === 'default' && inicial[0]?.[2]?.analytics_storage === 'denied' && inicial[0]?.[2]?.ad_storage === 'denied', 'el consentimiento por defecto es denegado');
    await page.locator('.consent-banner button', { hasText: 'Aceptar' }).click(); await page.waitForTimeout(2800);
    ok(google.some((u) => /gtm\.js\?id=/.test(u)), 'al aceptar se carga Tag Manager');
    ok((await consentimiento(page)).some((x) => x[1] === 'update' && x[2]?.analytics_storage === 'granted'), 'al aceptar el consentimiento pasa a concedido');
    const vistas = await eventos(page, 'view_item');
    ok(vistas.length === 1 && vistas[0].slug === 'guatape-piedra-del-penol' && vistas[0].tipo === 'experiencia', 'la ficha abierta envía un view_item al aceptar');
    await ctx.close();
  }
  { // Un evento anterior al consentimiento no se envía después.
    const { ctx } = await contexto(), page = await ctx.newPage();
    await page.goto(base + '/cotizar', { waitUntil: 'load' }); await page.waitForTimeout(800);
    await page.fill('#nombre', PII.nombre);
    await page.locator('.consent-banner button', { hasText: 'Aceptar' }).click(); await page.waitForTimeout(600);
    ok((await eventos(page, 'quote_start')).length === 0, 'lo hecho antes de aceptar no se envía');
    await ctx.close();
  }
  { // Clic en tarjeta, una sola vez aunque la transición reenvíe el clic.
    const { ctx } = await contexto(aceptado), page = await ctx.newPage();
    await page.goto(base + '/tours', { waitUntil: 'load' }); await page.waitForTimeout(1500);
    await page.locator('.tour-grid a.tour-card-main').first().click({ force: true }); await page.waitForURL(/\/tours\/[^/]+$/); await page.waitForTimeout(900);
    const sel = await eventos(page, 'select_item');
    ok(sel.length === 1 && sel[0].lista === 'catalogo' && sel[0].posicion === 1 && Boolean(sel[0].slug), `select_item único con lista y posición (${JSON.stringify(sel.map((s) => [s.lista, s.posicion, s.slug]))})`);
    ok((await eventos(page, 'view_item')).length === 1, 'la ficha abierta desde el catálogo envía un view_item');
    await ctx.close();
  }
  { // Formulario: inicio único, error, envío y ningún dato personal.
    const { ctx } = await contexto(aceptado), page = await ctx.newPage();
    await page.goto(base + '/cotizar', { waitUntil: 'load' }); await page.waitForTimeout(1500);
    await page.fill('#nombre', PII.nombre); await page.fill('#telefono', PII.telefono); await page.fill('#correo', PII.correo); await page.fill('#mensaje', PII.mensaje);
    ok((await eventos(page, 'quote_start')).length === 1, 'quote_start se envía una sola vez');
    await page.locator('.quote-form button[type=submit]').click(); await page.waitForTimeout(300);
    const errores = await eventos(page, 'quote_error');
    ok(errores.length === 1 && errores[0].tipo_error === 'validacion' && errores[0].origen === '/cotizar', 'quote_error por validación');
    const manana = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
    await page.fill('#fecha', manana); await page.fill('#personas', '4'); await page.check('#consentimiento');
    const [ventana] = await Promise.all([ctx.waitForEvent('page'), page.locator('.quote-form button[type=submit]').click()]);
    await ventana.close(); await page.waitForTimeout(300);
    const envios = await eventos(page, 'quote_submit');
    ok(envios.length === 1 && envios[0].origen === '/cotizar' && envios[0].tipo === 'cotizacion', 'quote_submit con origen y tipo');
    const [wa] = await Promise.all([ctx.waitForEvent('page'), page.locator('.wa-fab').click({ force: true })]);
    await wa.close(); await page.waitForTimeout(200);
    const clics = await eventos(page, 'whatsapp_click');
    ok(clics.length === 1 && clics[0].origen === 'boton_flotante', 'whatsapp_click del botón flotante');
    const texto = JSON.stringify(await capa(page));
    for (const [campo, valor] of Object.entries(PII)) ok(!texto.includes(valor), `la capa de datos no contiene ${campo}`);
    ok(!/wa\.me/.test(texto), 'la capa de datos no contiene URLs de WhatsApp');
    await ctx.close();
  }
  { // Idioma y texto traducido.
    const { ctx } = await contexto(aceptado), page = await ctx.newPage();
    await page.goto(base + '/en/tours/guatape', { waitUntil: 'load' }); await page.waitForTimeout(1500);
    ok((await eventos(page, 'view_item'))[0]?.idioma === 'en', 'los eventos llevan el idioma de la página');
    await ctx.close();
    const nuevo = await contexto(), en = await nuevo.ctx.newPage();
    await en.goto(base + '/en', { waitUntil: 'load' }); await en.waitForTimeout(800);
    ok(/if you accept/.test(await en.locator('.consent-banner').innerText()), 'el aviso está traducido al inglés');
    await nuevo.ctx.close();
  }
  { // Retirar el consentimiento.
    const { ctx } = await contexto(aceptado), page = await ctx.newPage();
    await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(1500);
    await page.evaluate(() => { document.cookie = '_ga=GA1.1.prueba; path=/'; document.cookie = '_ga_PRUEBA=GS1; path=/'; });
    await page.locator('.consent-link').click();
    ok(await page.locator('.consent-dialog input[type=checkbox]').nth(1).isChecked(), 'el panel muestra la analítica aceptada');
    await page.locator('.consent-dialog button', { hasText: 'Retirar consentimiento' }).click(); await page.waitForTimeout(300);
    ok(!(await ctx.cookies()).some((c) => c.name.startsWith('_ga')), 'al retirar se borran las cookies _ga');
    ok((await consentimiento(page)).at(-1)?.[2]?.analytics_storage === 'denied', 'al retirar el consentimiento pasa a denegado');
    const antes = (await capa(page)).length;
    const [wa] = await Promise.all([ctx.waitForEvent('page'), page.locator('.wa-fab').click({ force: true })]);
    await wa.close(); await page.waitForTimeout(200);
    ok((await capa(page)).length === antes, 'al retirar no se envían más eventos');
    await ctx.close();
  }
}
{ // Una decisión guardada con la versión anterior vuelve a preguntar.
  const { ctx, google } = await contexto({ version: 1, preferences: true, expires: Date.now() + 1e10 }), page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(1500);
  ok(await page.locator('.consent-banner').isVisible(), 'quien decidió antes vuelve a ver el aviso');
  ok(google.length === 0, 'una decisión antigua no activa Google');
  await ctx.close();
}
await browser.close();
if (fallos.length) { console.error(`\nFALLA check-analitica: ${fallos.length}`); process.exit(1); }
console.log(`\nPASS check-analitica${sinId ? ' (sin VITE_GTM_ID)' : ''}`);
