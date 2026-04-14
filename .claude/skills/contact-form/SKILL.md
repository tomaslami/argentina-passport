---
name: contact-form
description: |
  Trabaja con el formulario de contacto: extender campos, validaciones, integración con
  Resend, rate limiting, manejo de errores. Usar cuando se modifique cualquier cosa
  relacionada con el form (campos nuevos, validación, email template, anti-spam).
  También cuando el form falle en producción y haya que debuggearlo.

when_to_use: |
  Activar cuando el usuario mencione "form de contacto", "Resend", "validación",
  "rate limit", "honeypot", "spam", o trabaje en archivos relacionados:
  src/app/actions/contact.ts, components/sections/ContactForm.tsx, lib/env.ts.

paths:
  - src/app/actions/contact.ts
  - components/sections/ContactForm.tsx
  - lib/env.ts
  - lib/resend.ts

allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(pnpm typecheck)
  - Bash(pnpm test*)

version: "1.0.0"
---

# Contact Form Skill

Ámbito: todo lo relacionado con el formulario de contacto (Server Action + Resend, sin DB).

## Reglas no negociables

1. **Validación server-side con Zod siempre.** Client-side es solo UX.
2. **Honeypot field obligatorio.** Campo `website` invisible al usuario, debe estar vacío.
3. **Rate limiting obligatorio.** 3 submissions por hora por IP.
4. **Sanitizar el HTML del email.** Escapar `<`, `>`, `&`, `"`, `'`.
5. **Nunca loguear el contenido del email.** Solo el éxito/error y el IP truncado.
6. **`replyTo` debe ser el email del usuario** para que el equipo pueda responder.
7. **Validar env vars en build time** con Zod en `lib/env.ts`.

## Esquema Zod canónico

```ts
const ContactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(30).optional().or(z.literal("")),
  country: z.string().min(2).max(100),
  language: z.enum(["English", "Russian", "Arabic", "Spanish"]),
  investmentRange: z.enum(["$500K-$1M", "$1M-$3M", "$3M-$5M", "$5M+"]),
  message: z.string().max(1000).optional().or(z.literal("")),
  website: z.string().max(0, "spam detected"), // honeypot
});
```

## Para agregar un campo nuevo

1. Agregar al schema Zod en `src/app/actions/contact.ts`.
2. Agregar el `<input>` correspondiente en `components/sections/ContactForm.tsx`.
3. Agregar las claves i18n en los 4 idiomas (`messages/*.json` → `contact.form.fields.[campoNuevo]`).
4. Agregar el campo al `renderEmail()` con `esc()` aplicado.
5. Verificar que el form sigue siendo enviable sin JS (progressive enhancement).

## Para modificar el rate limiting

El rate limiting actual es in-memory (Map). Limitaciones:
- Se pierde al reiniciar el proceso (cold start de Vercel).
- No funciona entre regiones (cada serverless function tiene su Map).

Si el cliente quiere persistencia real:

```ts
// Migración a Upstash Redis
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
});

const { success } = await ratelimit.limit(ip);
if (!success) return { status: "error", message: "..." };
```

Requiere agregar `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` a `lib/env.ts`.

## Verificar que funciona end-to-end

```bash
# Setup
pnpm install
cp .env.example .env.local
# editar .env.local con keys reales

# Verificar build
pnpm build

# Test manual
pnpm dev
# abrir http://localhost:3000/en/contact
# llenar form, enviar, verificar:
# 1. mensaje "Thank you" aparece
# 2. email llega a info@argentinapassport.com
# 3. replyTo está al email del usuario
```

## Casos de error a probar manualmente

| Caso | Acción | Resultado esperado |
|------|--------|-------------------|
| Email inválido | Submit con `foo@bar` | Mensaje "Please enter a valid email" |
| Honeypot lleno | DevTools > inspeccionar input `website` y poner valor > submit | Status error genérico, NO se envía email |
| Rate limit | Submit 4 veces seguidas | 4ta vez retorna error de rate limit |
| Resend down | Cambiar `RESEND_API_KEY` a uno inválido > submit | Error genérico al usuario, error real en logs |
| JS deshabilitado | DevTools > disable JS > submit | Form sigue funcionando (Server Action) |

## Anti-patrones

- ❌ Validar solo client-side.
- ❌ Mostrar errores técnicos de Resend al usuario ("Email service responded with 500").
- ❌ Enviar el form a una API route (`src/app/api/contact/route.ts`) en lugar de Server Action.
- ❌ Guardar los datos en una DB sin pedir consentimiento explícito (hay un compromiso de "no data collection").
- ❌ Auto-respuesta al usuario (puede confirmar que el email es válido a un atacante).

## Estado actual

Schema actual:
!`grep -A 15 "ContactSchema = z.object" src/app/actions/contact.ts 2>/dev/null || echo "(archivo no existe aún)"`

Variables de entorno requeridas:
!`grep -E "RESEND|UPSTASH" .env.example 2>/dev/null || echo "(archivo no existe aún)"`
