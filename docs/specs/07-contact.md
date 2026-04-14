# SPEC 07 — Contact

**Fecha:** 2026-04-13 | **Estado:** APROBADO | **Figma:** [`node-id=26-2`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=26-2&m=dev)

> Prerequisitos: spec 00. **Esta es la única spec con backend** (Server Action + Resend).

---

## Objetivo

Página de contacto. Es el destino final de todos los CTAs del sitio. Debe transmitir confidencialidad y profesionalismo. Backend: Server Action + Resend (sin DB).

---

## Estructura vertical

1. **PageHeader** ("CONTACT" gigante)
2. **Form section** (formulario izquierda, imagen ornamental derecha)
3. **Confidentiality block** (con stats de discreción)

NO lleva CTABanner final (la página YA es el destino final).

---

## 1. PageHeader

- Background `navy-900`.
- Background word: `"CONTACT"` (uppercase, navy-700/40, posicionado arriba).
- Eyebrow: `/While you wait` ⚠️ — en el Figma dice "While you wait" pero no tiene mucho sentido en Contact. **Cambiar a `/Get in touch`** (decisión consciente, ver "Decisiones de diseño" abajo).
- Título h1 (dos líneas):
  - `"Argentina."`
  - `"Experienced differently."` ⚠️ — mismo issue. **Cambiar a:**
  - Línea 1: `"Begin a private"`
  - Línea 2: `"conversation."`
- Subtítulo: `"Confidential consultations available in English, Russian, Arabic and Spanish. All inquiries handled with complete discretion."`

---

## 2. Form section

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-24 md:py-32`.
- Layout: dos columnas (50/50) en desktop, stackeado en mobile (form arriba).

**Columna izquierda — Form:**

Header del form:
- Eyebrow: `"SCHEDULE CONSULTATION"` en `text-eyebrow` uppercase tracking-wider color `gold-500`.
- Título: `"Request a private consultation."` en `text-h2` `font-light` color `navy-900`.

Form fields (todos con label uppercase pequeño y border-bottom como underline en gold-500/40 — estilo minimalista del Figma):

| Field | Tipo | Required | Notas |
|-------|------|----------|-------|
| `fullName` | text | sí | min 2 chars |
| `email` | email | sí | validación Zod email |
| `phone` | tel | no | E.164 si presente |
| `country` | text | sí | país de residencia |
| `language` | select | sí | English / Russian / Arabic / Spanish — default "English" |
| `investmentRange` | select | sí | $500K-$1M / $1M-$3M / $3M-$5M / $5M+ — default "$500K-$1M" |
| `message` | textarea | no | max 1000 chars |

Botón: primary gold `"SUBMIT REQUEST"` ancho `auto` (no full-width), alineado a la izquierda.

**Estados del form:**
- Idle: vacío, enviable.
- Submitting: botón muestra spinner + texto "SENDING…", inputs deshabilitados.
- Success: form se reemplaza por mensaje "Thank you. We'll respond within 24 hours." en `text-h3` navy-900 + body explicativo.
- Error: mensaje rojo discreto debajo del botón con el mensaje de error.

**Columna derecha — Imagen ornamental:**
- Imagen: detalle arquitectónico ornamental en blanco y negro (estilo gotico/clásico, ej: ornamento de fachada de Palacio Barolo o similar).
- Path: `public/images/contact/ornament.jpg`.
- Aspect ratio: cuadrado o ligeramente vertical (`4/5`).
- `next/image` con `fill` y `object-cover`.

---

## 3. Confidentiality block

**Comportamiento:**
- Background: `navy-900` con imagen de fondo (estatua de la justicia o balanza) + overlay `bg-navy-900/85`.
- Padding: `py-24 md:py-32`.
- Container max-w-[800px] centrado, texto centrado.

**Contenido:**
- Eyebrow: `"DISCRETION GUARANTEED"` en `text-eyebrow` uppercase tracking-wider color `gold-500`.
- Título: `"All inquiries handled with"` (white) + `"complete confidentiality."` (gold-500). Una línea h2 `font-light`.
- Body: en `text-body` color `cream-50/80`:
  > Every consultation is protected under attorney-client privilege. Your information is never shared with third parties. No data collection beyond what is necessary for service delivery. Absolute discretion from first contact to final outcome.
- Stats inline (3 stats horizontales debajo):
  - `24HS` / `RESPONSE TIME`
  - `4` / `LANGUAGES AVAILABLE`
  - `100%` / `CONFIDENTIAL`

Mismo estilo que `<StatsBar>` pero sin animación de counter (los valores son cualitativos).

---

## Backend: Server Action

Crear `src/app/actions/contact.ts`:

```ts
"use server";

import { z } from "zod";
import { Resend } from "resend";
import { headers } from "next/headers";

const ContactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(30).optional().or(z.literal("")),
  country: z.string().min(2).max(100),
  language: z.enum(["English", "Russian", "Arabic", "Spanish"]),
  investmentRange: z.enum(["$500K-$1M", "$1M-$3M", "$3M-$5M", "$5M+"]),
  message: z.string().max(1000).optional().or(z.literal("")),
  // Honeypot anti-spam: campo invisible, debe estar vacío
  website: z.string().max(0, "spam detected"),
});

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "validation"; errors: Record<string, string> };

const resend = new Resend(process.env.RESEND_API_KEY!);

// Rate limiting in-memory (simple). Para producción real, usar Upstash Redis.
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;          // máximo 3 submissions
const RATE_WINDOW_MS = 3600000; // por hora

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const history = (submissions.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  if (history.length >= RATE_LIMIT) return true;
  history.push(now);
  submissions.set(ip, history);
  return false;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (isRateLimited(ip)) {
    return { status: "error", message: "Too many requests. Please try again later." };
  }

  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path.join(".")] = issue.message;
    }
    return { status: "validation", errors };
  }

  const data = parsed.data;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: data.email,
      subject: `New consultation request — ${data.fullName} (${data.investmentRange})`,
      html: renderEmail(data),
    });
    return { status: "success" };
  } catch (err) {
    console.error("[contact] Resend failed:", err);
    return { status: "error", message: "Could not send your request. Please email us directly at info@argentinapassport.com." };
  }
}

function renderEmail(data: z.infer<typeof ContactSchema>): string {
  // Sanitización básica anti-XSS
  const esc = (s: string) =>
    s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
  return `
    <h2>New consultation request</h2>
    <p><strong>Name:</strong> ${esc(data.fullName)}</p>
    <p><strong>Email:</strong> ${esc(data.email)}</p>
    <p><strong>Phone:</strong> ${esc(data.phone ?? "—")}</p>
    <p><strong>Country:</strong> ${esc(data.country)}</p>
    <p><strong>Preferred Language:</strong> ${esc(data.language)}</p>
    <p><strong>Investment Range:</strong> ${esc(data.investmentRange)}</p>
    <p><strong>Message:</strong></p>
    <p>${esc(data.message ?? "—").replace(/\n/g, "<br/>")}</p>
  `;
}
```

**Honeypot:** el form incluye un campo `<input name="website" type="text" tabIndex={-1} aria-hidden className="hidden" />`. Bots lo llenan, humanos no lo ven. Si llega con valor, se rechaza.

---

## Componente del form (cliente)

`components/sections/ContactForm.tsx` con `"use client"`:

```ts
"use client";
import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, { status: "idle" });
  // ...
}
```

Usar `useActionState` (React 19). Mostrar errores de `state.errors[fieldName]` debajo de cada input cuando el status sea "validation".

---

## Variables de entorno

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=consultations@argentinapassport.com  # debe estar verificado en Resend
RESEND_TO_EMAIL=info@argentinapassport.com
```

Validar con Zod en `lib/env.ts`:

```ts
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  RESEND_TO_EMAIL: z.string().email(),
});

export const env = envSchema.parse(process.env);
```

Si falta una env var, `pnpm build` debe fallar con mensaje claro.

---

## Claves i18n

```json
{
  "contact": {
    "header": {
      "backgroundWord": "CONTACT",
      "eyebrow": "Get in touch",
      "titleLine1": "Begin a private",
      "titleLine2": "conversation.",
      "subtitle": "Confidential consultations available in English, Russian, Arabic and Spanish. All inquiries handled with complete discretion."
    },
    "form": {
      "eyebrow": "SCHEDULE CONSULTATION",
      "title": "Request a private consultation.",
      "fields": {
        "fullName": "Full name",
        "email": "Email address",
        "phone": "Phone number (optional)",
        "country": "Country of residence",
        "language": "Preferred language",
        "investmentRange": "Investment range",
        "message": "Message (optional)"
      },
      "languages": { "english": "English", "russian": "Russian", "arabic": "Arabic", "spanish": "Spanish" },
      "ranges": { "tier1": "$500K - $1M", "tier2": "$1M - $3M", "tier3": "$3M - $5M", "tier4": "$5M+" },
      "submit": "Submit request",
      "submitting": "Sending…",
      "success": {
        "title": "Thank you.",
        "body": "We'll respond within 24 hours from a private email address."
      },
      "errors": {
        "generic": "Could not send your request. Please email us directly at info@argentinapassport.com.",
        "rateLimit": "Too many requests. Please try again later.",
        "validation": "Please check the highlighted fields and try again."
      }
    },
    "confidentiality": {
      "eyebrow": "DISCRETION GUARANTEED",
      "titleLine1": "All inquiries handled with",
      "titleHighlight": "complete confidentiality.",
      "body": "Every consultation is protected under attorney-client privilege. Your information is never shared with third parties. No data collection beyond what is necessary for service delivery. Absolute discretion from first contact to final outcome.",
      "stat1Value": "24HS",
      "stat1Label": "Response time",
      "stat2Value": "4",
      "stat2Label": "Languages available",
      "stat3Value": "100%",
      "stat3Label": "Confidential"
    }
  }
}
```

---

## Imágenes requeridas

| Path | Descripción |
|------|-------------|
| `public/images/contact/ornament.jpg` | Detalle arquitectónico ornamental B&N |
| `public/images/contact/justice.jpg` | Estatua/balanza de la justicia (background sutil del confidentiality block) |

---

## Criterios de aceptación

### Visuales
- [ ] El form tiene 7 campos en el orden especificado.
- [ ] Inputs con underline gold-500/40 (estilo del Figma), no border completo.
- [ ] Labels en uppercase pequeño arriba de cada input.
- [ ] Selects con flecha custom (chevron down gold).
- [ ] Imagen ornamental en columna derecha en desktop.
- [ ] El bloque de confidencialidad tiene background sutil y stats.

### Funcionales
- [ ] El form valida client-side mientras el usuario escribe (HTML5 + estilos de error).
- [ ] El form valida server-side con Zod (defensa real).
- [ ] Submitting muestra estado loading.
- [ ] Success reemplaza el form con mensaje de gracias.
- [ ] Error muestra mensaje sin perder los datos del form.
- [ ] Honeypot funciona: si `website` tiene valor, retorna error sin enviar email.
- [ ] Rate limiting funciona: 4to envío del mismo IP en 1h retorna error.
- [ ] El email a `info@argentinapassport.com` llega correctamente con todos los campos.
- [ ] El email tiene `replyTo` configurado al email del usuario.
- [ ] El HTML del email está sanitizado (sin XSS).

### Técnicos
- [ ] `lib/env.ts` valida las env vars en build time.
- [ ] Sin envs: `pnpm build` falla con mensaje claro.
- [ ] El Server Action está en `src/app/actions/contact.ts` con `"use server"`.
- [ ] Usa `useActionState` (no el viejo `useFormState`).
- [ ] No hay datos sensibles en logs (no loguear el contenido del email).
- [ ] `pnpm build` pasa.
- [ ] Funciona en RTL — el form se invierte correctamente (labels a la derecha).

---

## Casos de error

| Escenario | Comportamiento esperado |
|-----------|------------------------|
| Usuario envía con email inválido | Validación client (HTML5) + server (Zod). Mensaje "Please enter a valid email." |
| Usuario envía con honeypot lleno | Server retorna `{ status: "error" }` genérico. NO loguear como spam para no revelar el truco. |
| Usuario envía 4 veces en 1 hora | Server retorna `{ status: "error", message: "Too many requests..." }`. |
| Resend API key inválida | Build falla en `lib/env.ts` validation. |
| Resend devuelve 500 | Server retorna error genérico. Loguear el error para debugging. NO mostrar el error de Resend al usuario. |
| Usuario abre con JS deshabilitado | El form sigue funcionando (Server Actions funcionan sin JS gracias a progressive enhancement). Solo se pierde el feedback de loading. |
| Network falla a mitad de submit | El usuario ve error genérico. El form mantiene los datos (no se limpia). |

---

## Fuera de scope

- ❌ Captcha visible (Google reCAPTCHA, hCaptcha) — el honeypot + rate limiting es suficiente para v1.
- ❌ Tracking de leads en analytics.
- ❌ Confirmación por email automática al usuario que envió.
- ❌ Calendario de booking (Cal.com, Calendly).
- ❌ Persistencia en DB.

---

## Decisiones de diseño

- **Cambio del eyebrow original:** El Figma dice `/While you wait` y `Argentina. Experienced differently.` en Contact. Esto parece un copy-paste accidental de la página VIPs. Cambiar a copy específico de Contact (`Get in touch` + `Begin a private conversation.`) tiene más sentido. **Verificar con el cliente antes de implementar** — si insiste en el copy original, mantenerlo.
- **Sin DB:** los emails directos son suficientes y mantienen la promesa de "no data collection beyond what is necessary".
- **Honeypot vs Captcha:** captcha visible lastimaría la experiencia premium. Honeypot + rate limiting cubre el 95% de los bots sin fricción.
- **Rate limiting in-memory:** OK para v1. Si se escala a múltiples regiones de Vercel, migrar a Upstash Redis o similar (anotar como deuda técnica).
- **No analytics:** alineado con el énfasis en privacy. Si se requieren métricas, evaluar Plausible (cookieless, EU-friendly) en una fase posterior.
