# ARCHIVADO — Spec 10 anterior, no vigente

> ## ✅ PARCIALMENTE IMPLEMENTADO — 2026-08-10
>
> | Historia | Estado |
> |---|---|
> | **UX-13** · Validación real | ✅ `src/lib/schemas.ts` con zod. Errores **junto al campo**, `aria-invalid`, `aria-describedby`, foco al primer campo con error, mensajes en lenguaje llano y traducidos. El `<Select>` ya participa de la validación |
> | **UX-14** · Habeas Data | ✅ Casilla **no premarcada**, envío bloqueado sin ella (`z.literal(true)`), y página `/privacidad` creada con responsable, finalidad, derechos, canal y retención |
> | Anti-spam | ✅ Honeypot fuera de pantalla (no `display:none`) + marca de tiempo para el time-trap del servidor |
> | Saneamiento | ✅ Longitud máxima en todos los campos; se rechazan `\r` y `\n` en los de una línea (previene inyección de cabeceras) |
> | **UX-15** · Backend | ❌ **Sigue sin backend.** El formulario valida de verdad pero **no envía a ninguna parte** |
> | **UX-30** · Cabeceras | ❌ Pendiente: requiere el despliegue real de Cloudflare |
>
> ### Dos advertencias que no se pueden suavizar
>
> 1. **El formulario todavía no entrega el lead.** La validación es real, pero sin el endpoint de UX-15 el mensaje no llega a nadie. En el código queda un `TODO(agente)` explícito diciéndolo. **No se debe publicar así**: un formulario que confirma éxito sin enviar es peor que no tener formulario.
> 2. **El aviso de `/privacidad` es un borrador técnico y lleva un banner que lo declara.** Redactarlo es asistencia técnica, no asesoría jurídica: **necesita revisión del asesor legal del cliente** antes de considerarse vigente. Además, la identificación del responsable depende de la decisión #1.

**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `especialista-seguridad`
**Depende de:** [`06_spec_modulo_venta_sedes.md`](06_spec_modulo_venta_sedes.md) · [`09_spec_rendimiento.md`](09_spec_rendimiento.md)
**Habilita:** 12 QA

---

## 1. Modelo de amenazas

Sitio corporativo con SSR, sin login, sin pagos, sin base de datos. La superficie es pequeña, pero no es cero.

| Superficie | Amenaza | Severidad |
|---|---|---|
| Formulario de `/contacto` | Spam masivo, abuso de envíos, inyección de cabeceras si se conecta correo | **Alta** |
| Flujo de cotización (capa B) | Datos personales capturados antes de saltar a WhatsApp | **Alta** (legal) |
| `iframe` del mapa | Terceros embebidos, fuga de `Referer` | Media |
| Enlaces externos a sedes | `target="_blank"` sin `rel` correcto → `window.opener` | Media |
| Fuentes, imágenes y mapa externos | Orígenes que la CSP debe permitir explícitamente | Media |
| SSR con Nitro | Cabeceras ausentes, trazas de error expuestas | Media |
| ~70 dependencias npm | Cadena de suministro | Media |
| Clickjacking | El sitio embebido en un dominio de terceros para suplantar la marca | Baja-media |

**Lo que NO es amenaza aquí:** SQL injection (no hay base de datos), robo de sesión (no hay login), fuga de pagos (no hay pasarela). No inventar controles para riesgos inexistentes.

---

## 2. Estado actual

| Control | Estado |
|---|---|
| Validación de servidor | ❌ No existe backend |
| Rate limiting | ❌ (pero ahora **es posible**: ver §2.1) |
| Anti-spam | ❌ |
| Autorización de datos personales | ❌ **Incumplimiento legal — verificado en ejecución** |
| CSP y cabeceras de seguridad | ❌ (el archivo donde declararlas **ya existe**: ver §6) |
| `rel="noopener noreferrer"` en externos | ✅ Correcto en `SedeCard` |
| `sandbox`/`referrerpolicy` en el `iframe` | ❌ |
| Escapado de salida | ✅ React lo hace por defecto; no hay `dangerouslySetInnerHTML` |
| Secretos en el repositorio | ✅ Ninguno |

El formulario de [`contacto.tsx`](src/routes/contacto.tsx) muestra un `toast.success` **sin enviar nada a ninguna parte**. Es peor que no tener formulario: el usuario cree que su mensaje llegó y el lead se pierde en silencio.

### 2.1 Infraestructura de despliegue — VERIFICADO

Esto era la pregunta abierta que mantenía cerrada la compuerta. **Ya está respondida por el propio build.**

`npm run build` genera:

| Artefacto | Qué significa |
|---|---|
| `.output/server/wrangler.json` | El preset de salida es **Cloudflare Workers**, con nombre de worker autogenerado |
| `.output/server/index.mjs` | Punto de entrada del worker: **hay runtime de servidor** |
| `.output/public/_headers` | Archivo de cabeceras de Cloudflare, ya emitido con la regla de caché de `/assets/*` |

Consecuencias directas, todas desarrolladas más abajo:

1. **El despliegue no es estático.** El escenario "no hay dónde implementar rate limiting" queda descartado (§3).
2. El almacenamiento del contador es **Cloudflare KV o Durable Objects**, no memoria de proceso (§3).
3. La IP real del cliente llega en **`CF-Connecting-IP`**, no en `X-Forwarded-For` (§3).
4. Las cabeceras de seguridad de §6 se declaran en **`_headers`**, que ya se genera (§6).
5. Cloudflare aporta además rate limiting de borde (WAF) como **capa adicional**, nunca sustituta (§3).

### 2.2 Verificación en ejecución de `/contacto` — brecha A3 CONFIRMADA

Medido sobre el sitio corriendo, no leído del código:

| Medición | Resultado | Consecuencia |
|---|---|---|
| Campos de formulario | **5** | — |
| Elementos con `aria-invalid` | **0** | No hay identificación de errores por campo. **WCAG SC 3.3.1 incumplido, confirmado** |
| Casillas de verificación | **0** | No existe autorización de tratamiento de datos. **Ley 1581 de 2012 incumplida, confirmado** (§8) |
| `import` de `zod` en `contacto.tsx` | **Ausente** | `zod` está instalado y sin usar: la validación sigue siendo `if` manuales (§5) |
| `font-size` de los inputs | **16 px** | ✅ **No hay zoom automático en iOS.** Este punto está correcto y **no requiere trabajo** |

El último dato **refuta** una preocupación heredada: no hay que tocar el tamaño de fuente de los inputs.

---

## 3. Rate limiting — UX-15

Toda ruta de servidor que reciba envíos del usuario necesita límite.

### Política

| Ventana | Límite | Respuesta al exceder |
|---|---|---|
| 10 minutos por IP | 5 envíos | `429` + `Retry-After: 600` |
| 24 horas por IP | 20 envíos | `429` + `Retry-After` |

### Reglas

1. **Nunca revelar cuántos intentos quedan.** Le da al atacante el mapa del control.
2. El contador es de servidor. Cualquier límite implementado solo en cliente es cosmético.
3. Almacenamiento: **Cloudflare KV o Durable Objects** (ver abajo). La memoria de proceso **no sirve** en Workers: cada petición puede caer en una instancia distinta y el contador se pierde.
4. La IP real del cliente se toma de **`CF-Connecting-IP`**, la cabecera que inyecta Cloudflare. **No usar `X-Forwarded-For`**: en Workers puede venir con varios saltos y es la que un cliente puede falsificar. `CF-Connecting-IP` la escribe el borde y no es sobreescribible desde fuera.

### Dónde vive el contador — decisión de almacenamiento

El despliegue es Cloudflare Workers (§2.1), así que **el rate limiting es posible** y hay dos opciones reales:

| Opción | Consistencia | Qué implica aquí |
|---|---|---|
| **Cloudflare KV** | Eventual | Barato y simple, pero la escritura tarda en propagarse entre puntos de presencia. Bajo **ráfaga** —justo el caso que el control existe para frenar— puede **subcontar**: dos peticiones casi simultáneas leen el mismo valor viejo y ambas pasan. El límite se vuelve aproximado, no exacto |
| **Durable Objects** | Fuerte | Una única instancia serializa las escrituras de esa clave, así que el conteo es **exacto y sin condiciones de carrera**. Cuesta algo más y añade una pieza al despliegue |

**Recomendación: Durable Objects**, con la clave derivada de `CF-Connecting-IP`. Un límite anti-spam que subcuenta precisamente cuando hay ráfaga es un límite que falla en el único momento que importa. KV es aceptable solo como paso intermedio, y en ese caso hay que **documentar que el límite es aproximado** — no presentarlo como exacto.

### Capa adicional: rate limiting de borde (WAF)

Cloudflare ofrece reglas de rate limiting a nivel de borde, antes de que la petición llegue al worker. Es un **complemento útil** —absorbe el abuso masivo sin consumir invocaciones— pero:

- **No sustituye a la validación de servidor.** Se configura en el panel, fuera del repositorio, y puede desactivarse o quedar mal migrada sin que el código se entere.
- El control que garantiza el comportamiento es el del worker. El WAF es defensa en profundidad, no la defensa.

`TODO(cliente)`: confirmar plan de Cloudflare y si el WAF con reglas de rate limiting está disponible en él.

---

## 4. Anti-spam

### Honeypot

Campo real, oculto a personas, visible para bots:

```tsx
<div aria-hidden="true" className="absolute left-[-9999px]">
  <label htmlFor="website">No completar</label>
  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
</div>
```

- **No** usar `display:none` ni el atributo `hidden`: los bots modernos los detectan.
- **Nunca** `required` en el honeypot.
- `tabIndex={-1}` evita que un usuario de teclado caiga en él.

### Time-trap

Se guarda `Date.now()` al montar el formulario. Si el envío llega en menos de **3 segundos**, es un bot.

El rechazo se hace **en servidor y en silencio**: se responde `200` sin procesar. Devolver un error le confirma al atacante que el control existe.

### CAPTCHA

Solo si el spam real lo justifica. **Medir primero.** Añadir fricción a todos los usuarios para un problema que quizá no existe es mal negocio.

Si se añade: Turnstile invisible antes que un puzle visual, y documentado en [`07_spec_accesibilidad_responsive.md`](07_spec_accesibilidad_responsive.md) — muchos CAPTCHA visuales son una barrera de accesibilidad real.

---

## 5. Validación y saneamiento — UX-13

`zod` está instalado y sin usar. `react-hook-form` también.

**Verificado en ejecución:** `contacto.tsx` **no importa `zod`** pese a estar en `package.json`. La validación actual son `if` manuales. Con el runtime de servidor confirmado (§2.1), el esquema compartido ya no es teórico: hay dónde ejecutar la mitad que cuenta.

### Esquema compartido

```ts
// src/lib/schemas.ts
import { z } from "zod";

export const consultaSchema = z.object({
  nombre:   z.string().trim().min(2).max(80),
  empresa:  z.string().trim().max(120).optional(),
  email:    z.string().trim().toLowerCase().email().max(160),
  telefono: z.string().trim().max(30).regex(/^[0-9+()\s-]*$/).optional(),
  tipo:     z.enum(["corporativo", "receptivo", "alianzas", "empleo", "otra"]),
  mensaje:  z.string().trim().min(10).max(2000),
  autoriza: z.literal(true),      // Habeas Data — obligatorio
  website:  z.string().max(0),    // honeypot: debe llegar vacío
  ts:       z.coerce.number(),    // marca de tiempo de apertura
});

export type Consulta = z.infer<typeof consultaSchema>;
```

### Reglas

1. **La validación de cliente es experiencia de usuario. La de servidor es seguridad.** Nunca confiar en la primera.
2. Longitud máxima en **todos** los campos. Sin ella, un atacante envía megabytes.
3. Rechazar `\n` y `\r` en campos de una línea: previene inyección de cabeceras si el envío termina en un correo.
4. Normalizar email a minúsculas y teléfono a dígitos antes de almacenar o enviar.
5. Nunca interpolar entrada del usuario en HTML. React escapa por defecto; **no usar `dangerouslySetInnerHTML` con datos de formulario**, nunca.
6. El `tipo` es un `enum` cerrado: no aceptar valores arbitrarios aunque el `<Select>` los envíe.
7. **Cada error se marca en su campo** con `aria-invalid="true"` y `aria-describedby` apuntando al texto del error. Hoy hay **0 elementos con `aria-invalid`** en `/contacto` (§2.2): un rechazo del servidor no tiene forma de comunicarse por campo. Sin esto, endurecer la validación empeora la experiencia en vez de mejorarla.

---

## 6. Cabeceras de seguridad — UX-30

### Dónde se declaran — VERIFICADO

En **`_headers`**, el archivo de cabeceras de Cloudflare. **Ya existe y ya se genera** en `.output/public/_headers`, hoy con una sola regla:

```
/assets/*
  cache-control: public, max-age=31536000, immutable
```

Las cabeceras de esta sección se añaden ahí, en un bloque `/*` que aplique a todo el sitio, conservando la regla de caché de `/assets/*` que ya está. Es un archivo de salida del build: la fuente que lo produce es la que hay que editar, **no el artefacto generado** (que se sobrescribe en cada `npm run build`).

Alternativa equivalente: emitirlas desde el propio worker. `_headers` se prefiere porque es declarativo, se revisa de un vistazo y aplica también a las respuestas estáticas que nunca tocan el worker.

### CSP

Construida sobre los orígenes que este sitio **realmente** usa:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https://images.unsplash.com;
  frame-src https://www.openstreetmap.org;
  connect-src 'self';
  form-action 'self';
  frame-ancestors 'none';
  base-uri 'self';
  object-src 'none';
  upgrade-insecure-requests;
```

**Advertencias importantes:**

1. **`style-src` sin `'unsafe-inline'` puede romper el sitio.** Tailwind v4 y TanStack Start inyectan estilos; hay que verificar en el despliegue real antes de endurecer. Empezar con `Content-Security-Policy-Report-Only`.
2. Si se aplica la **solución A del spec 09** (script inline para evitar el parpadeo de tema), ese script necesita un `nonce` o un hash en `script-src`. Las dos decisiones están acopladas: coordinar con `especialista-rendimiento`.
3. `wa.me` no necesita entrada en la CSP: es una navegación, no una carga de recurso.
4. Si se añade GA4 (spec 11), habrá que abrir `script-src` y `connect-src` a Google. **No hacerlo por adelantado.**

### Resto de cabeceras

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
X-Frame-Options: DENY
```

`frame-ancestors 'none'` de la CSP hace lo mismo que `X-Frame-Options`; se mantienen ambos por navegadores antiguos.

---

## 7. Terceros e iframes

### Mapa de `/contacto`

Estado actual:

```tsx
<iframe
  title="Mapa de la sede principal…"
  src="https://www.openstreetmap.org/export/embed.html?…"
  loading="lazy"
  className="h-80 w-full rounded-[20px] border border-border"
/>
```

Bien: tiene `title` y `loading="lazy"`. Falta:

```tsx
referrerPolicy="no-referrer"
sandbox="allow-scripts allow-same-origin allow-popups"
```

`sandbox` con el mínimo necesario. Si el mapa deja de funcionar, se amplía permiso a permiso, nunca quitándolo entero.

### Enlaces externos

`rel="noopener noreferrer"` ya está correcto en `SedeCard`. Debe mantenerse en todo enlace externo nuevo, incluido el FAB de WhatsApp.

---

## 8. Habeas Data — Ley 1581 de 2012

**Es obligación legal en Colombia, no una recomendación de diseño.** Hoy el sitio no la cumple.

**Confirmado en ejecución (§2.2):** `/contacto` tiene 5 campos y **0 casillas de verificación**. No hay autorización de tratamiento de datos de ninguna forma. El incumplimiento ya no es una hipótesis del diagnóstico: está medido.

### Qué exige

| Requisito | Implementación |
|---|---|
| Autorización previa, expresa e informada | Casilla **no premarcada** en el formulario |
| Finalidad declarada | Aviso de privacidad accesible desde el formulario |
| Identificación del responsable | Razón social, NIT y contacto en el aviso |
| Derechos del titular | Conocer, actualizar, rectificar y suprimir |
| Canal para ejercerlos | Correo o formulario específico, declarado |
| Política de retención | Cuánto tiempo se conservan los datos |

### Implementación — UX-14

```tsx
<div className="flex items-start gap-3">
  <Checkbox id="autoriza" checked={autoriza} onCheckedChange={setAutoriza} />
  <Label htmlFor="autoriza" className="text-sm font-normal leading-relaxed">
    {t(ui.form.autorizacion)}{" "}
    <Link to="/privacidad" className="underline">
      {t(ui.form.politicaEnlace)}
    </Link>
  </Label>
</div>
```

- Nunca premarcada.
- El envío se bloquea sin ella (`z.literal(true)`).
- Área táctil ≥ 44 px, alcanzable con teclado.
- Textos en `L` con `es` y `en`.

### Alcance en la capa B

**Aplica igual al flujo de cotización.** Si se capturan nombre o teléfono antes de redirigir a WhatsApp, son datos personales.

Matiz útil: si el usuario solo selecciona experiencias y salta a WhatsApp **sin escribir datos personales en el sitio**, no hay tratamiento de datos por parte del sitio — el dato lo aporta él en su propia app. Es un argumento a favor de mantener el flujo de cotización sin campos obligatorios.

### Página `/privacidad`

Ruta nueva necesaria. Requiere los datos legales de la **decisión #1** para identificar al responsable. Sin ella no se puede publicar un aviso válido.

---

## 9. Cadena de suministro

| Control | Cadencia |
|---|---|
| `npm audit` | En cada revisión y antes de cada despliegue |
| Revisión de dependencias nuevas | Al añadirlas: peso, mantenimiento, alternativas |
| Versiones fijadas en el lockfile | Permanente |
| Scripts de terceros | Ninguno sin justificación explícita |

**No desinstalar a ciegas** las dependencias no usadas (`recharts`, `react-day-picker`): `src/components/ui/` las referencia y eliminarlas rompe el build. Ver spec 09 §5.

---

## 10. Operación

### Errores

- Nunca exponer trazas ni rutas del servidor al usuario. El `ErrorComponent` de `__root.tsx` ya muestra un mensaje genérico: correcto.
- `console.error(error)` en producción envía la traza a la consola del cliente. Revisar si conviene silenciarlo fuera de desarrollo.

### Datos personales

- Nunca en logs.
- Nunca en la URL (ni como parámetro de consulta).
- Nunca en `localStorage` sin necesidad. El paquete de tours del spec 06 guarda **slugs de experiencia**, no datos personales — correcto por diseño.

### Suplantación de marca

`frame-ancestors 'none'` impide que el sitio se embeba en otro dominio para imitarlo. Es la mitigación disponible desde el sitio; el resto es vigilancia de marca, fuera de alcance técnico.

---

## 11. Checklist de despliegue

- [ ] Cabeceras verificadas sobre el dominio real, no en local
- [ ] Bloque `/*` presente en `_headers`, sin haber perdido la regla de `/assets/*`
- [ ] CSP probada primero en `Report-Only`, luego aplicada
- [ ] HTTPS forzado, HSTS activo
- [ ] Contador de rate limiting en KV o Durable Objects, con la opción elegida documentada
- [ ] Rate limiting leyendo `CF-Connecting-IP`
- [ ] Rate limiting probado excediendo el límite a propósito
- [ ] Honeypot probado rellenándolo: debe rechazar
- [ ] Time-trap probado enviando en menos de 3 s
- [ ] Formulario probado sin autorización: debe bloquear
- [ ] `/privacidad` publicada y enlazada
- [ ] `npm audit` sin vulnerabilidades altas o críticas
- [ ] Ningún secreto en el repositorio
- [ ] Enlaces externos con `rel="noopener noreferrer"`
- [ ] `iframe` con `sandbox` y `referrerpolicy`

---

## 12. Compuerta hacia el spec 11

Nada se marca por estar escrito. **Nada se declara seguro sin verificarlo en el entorno real.**

| | Punto | Cómo se rectifica |
|---|---|---|
| ☐ | Confirmado que el formulario no envía a ninguna parte | Enviar y revisar el panel de red |
| ☑ | **Infraestructura de despliegue conocida** | **Cloudflare Workers**, confirmado por `.output/server/wrangler.json` (§2.1). **Hay runtime de servidor: el rate limiting es posible** |
| ☑ | Ausencia de `aria-invalid` en `/contacto` | Medido en ejecución: 5 campos, **0 con `aria-invalid`**. WCAG SC 3.3.1 incumplido (§2.2) |
| ☑ | Ausencia de autorización de datos personales | Medido en ejecución: **0 casillas** en `/contacto`. Ley 1581 de 2012 incumplida (§2.2) |
| ☑ | `zod` instalado y sin usar | `contacto.tsx` no lo importa (§5) |
| ☑ | Inputs sin zoom automático en iOS | `font-size: 16px` verificado. **Punto correcto, sin trabajo pendiente** (§2.2) |
| ☐ | Elegido el almacenamiento del contador: KV o Durable Objects | Decisión de §3. Recomendación: **Durable Objects** por conteo exacto |
| ☐ | Rate limiting leyendo `CF-Connecting-IP`, no `X-Forwarded-For` | Revisión del código del worker |
| ☐ | Cabeceras de seguridad añadidas al bloque `/*` de `_headers` | Revisión de la fuente que genera `_headers` (§6) |
| ☐ | CSP probada en `Report-Only` sin romper estilos ni fuentes | Consola del navegador en el despliegue |
| ☐ | Decidido si el script anti-parpadeo del spec 09 necesita `nonce` | Coordinación con `especialista-rendimiento` |
| ☐ | Rate limiting probado excediendo el límite | Prueba real contra el endpoint |
| ☐ | Rate limiting de borde (WAF) disponible en el plan contratado | `TODO(cliente)` — es complemento, no sustituto (§3) |
| ☐ | Honeypot y time-trap probados | Envíos manipulados |
| ☐ | Datos del responsable de tratamiento disponibles | 🔒 Decisión #1 |
| ☐ | Aviso de privacidad revisado por el cliente o su asesor legal | **No es competencia técnica** |
| ☐ | `npm audit` ejecutado y limpio | Comando |
| ☐ | Cabeceras verificadas sobre el dominio real | `curl -I` sobre producción |

**Estado de la compuerta: CERRADA.** Pero el bloqueo cambió de naturaleza: **la infraestructura ya no es una incógnita.** Con Cloudflare Workers confirmado, todo lo que estaba condicionado a "si hay servidor" pasa a ser trabajo ejecutable, no pregunta abierta. Lo que sigue bloqueando es la **decisión #1** (datos del responsable de tratamiento) y la validación legal del aviso de privacidad, que no es competencia técnica. Nada de §3, §6 ni §8 se ha implementado todavía: **conocer dónde implementarlo no es haberlo implementado.**
