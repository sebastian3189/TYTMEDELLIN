ARCHIVADO
name: tt-formularios-seguros
description: Receta para formularios y captura de datos — validación con zod en cliente y servidor, honeypot y time-trap anti-spam, rate limiting, mensajes de error accesibles y autorización de datos personales según la Ley 1581 de 2012. Úsala al crear o modificar cualquier formulario o campo que reciba datos del usuario.
---

# Skill — Formularios seguros

## 1. Validación con zod

```ts
import { z } from "zod";

export const formSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email().max(254),
  mensaje: z.string().min(10).max(2000),
});
```

- **Esquema único** compartido entre cliente y servidor.
- La validación de cliente es UX; **la de servidor es la que cuenta**.
- Longitudes máximas en todo campo.
- Normalizar email (lowercase, trim). Rechazar HTML y saltos de línea en campos de una línea.

## 2. Anti-spam

### Honeypot
Campo invisible para el usuario, visible para bots:
```tsx
<input name="website" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
```
Si llega con valor → rechazo silencioso (respuesta 200 pero sin procesar).

### Time-trap
Timestamp en campo oculto al montar el formulario. Si `envío - montaje < 3 s` → rechazo. Bots rellenan instantáneamente.

### CAPTCHA
Solo si el spam real lo justifica. Siempre accesible (alternativa de audio o texto). No como primera línea de defensa.

## 3. Rate limiting

| Límite | Valor |
|---|---|
| Por IP / 10 min | 5 envíos |
| Por IP / 24 h | 20 envíos |
| Respuesta | `429 Too Many Requests` + `Retry-After` |

## 4. Mensajes de error accesibles

```tsx
<p id="email-error" role="alert" className="text-sm text-destructive mt-1">
  {t(errors.email)}
</p>
<input aria-describedby="email-error" aria-invalid="true" ... />
```

- Texto en `L` (bilingüe).
- `role="alert"` para lectores de pantalla.
- `aria-describedby` vinculando input con error.
- `aria-invalid="true"` en el input.

## 5. Estados del formulario

| Estado | Comportamiento |
|---|---|
| Reposo | Campos habilitados, sin errores |
| Enviando | Botón deshabilitado, spinner, campos readonly |
| Éxito | Toast/mensaje de confirmación, campos limpios |
| Error de validación | Errores en rojo bajo cada campo, foco en el primero |
| Error de servidor | Mensaje genérico, sin exponer detalles técnicos |

## 6. Privacidad — Ley 1581 de 2012 (Habeas Data)

Obligación legal en Colombia:

- **Casilla de autorización explícita y NO premarcada:**
  ```tsx
  <label className="flex items-start gap-2">
    <input type="checkbox" name="autorizacion" required />
    <span>{t(form.autorizacion)}</span>
  </label>
  ```
- Enlace a la política de tratamiento de datos.
- Finalidad, responsable y canal de ejercicio de derechos declarados.
- Sin la casilla marcada → el formulario NO se envía.

> **Nota:** Si el proyecto opera en otra jurisdicción, adaptar a GDPR, LGPD u otra normativa local.

## 7. Checklist

- [ ] Validación zod en cliente Y servidor
- [ ] Honeypot y time-trap
- [ ] Rate limiting configurado
- [ ] Errores accesibles con `role="alert"` y `aria-describedby`
- [ ] Casilla de autorización explícita y no premarcada
- [ ] Enlace a política de privacidad
- [ ] Textos en `L` (bilingüe)
- [ ] Estados: reposo, enviando, éxito, error
