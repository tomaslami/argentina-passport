# Arquitectura — Argentina Passport

> Documento de contexto cargado por los agentes Codex. Resumen ejecutivo de la arquitectura.
> Para detalles completos, ver `docs/specs/00-foundation.md`.

## Stack canónico

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | Next.js 16 (App Router) | NO Pages Router |
| Lenguaje | TypeScript strict | `any` prohibido |
| Estilos | Tailwind v4 | Sin shadcn/ui, sin CSS modules |
| i18n | next-intl | Subpath `/en /es /ru /ar` |
| Animación | motion/react | Uso medido (ver `docs/brand/motion.md`) |
| Email | Resend | Server Action, sin DB |
| Fuente | Helvetica self-hosted | `next/font/local` |
| Deploy | Vercel | Via `vercel --prod` |
| Package manager | pnpm | NO npm, NO yarn |

## Estructura de carpetas

```
src/app/
├── [locale]/              # Routing i18n
│   ├── layout.tsx         # NextIntlProvider, dir RTL/LTR, font
│   ├── page.tsx           # Home
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── process/page.tsx
│   ├── investments/page.tsx
│   ├── vips/page.tsx
│   └── contact/page.tsx
├── actions/
│   └── contact.ts         # Server Action del formulario
└── globals.css            # Tailwind v4 + @theme tokens

components/
├── layout/                # Header, Footer, LocaleSwitcher
├── sections/              # Reutilizables (Hero, CTABanner, StatsBar)
└── ui/                    # Primitivos (Button, Input, Container)

lib/
├── motion.ts              # tokens de animación
├── resend.ts              # cliente Resend
├── env.ts                 # validación de env vars con Zod
└── utils.ts

i18n/
├── routing.ts             # locales soportados
├── request.ts             # carga de mensajes por request
└── navigation.ts          # Link, redirect, etc tipados

messages/
├── en.json                # ← fuente de verdad
├── es.json
├── ru.json
└── ar.json

middleware.ts              # negociación de locale
```

## Páginas y especificaciones

| Página | URL | Spec | Figma node-id |
|--------|-----|------|---------------|
| Home | `/[locale]` | `docs/specs/01-home.md` | `15-2` |
| About | `/[locale]/about` | `docs/specs/02-about.md` | `20-111` |
| Services | `/[locale]/services` | `docs/specs/03-services.md` | `20-134` |
| Process | `/[locale]/process` | `docs/specs/04-process.md` | `20-153` |
| Investments | `/[locale]/investments` | `docs/specs/05-investments.md` | `20-172` |
| VIPs | `/[locale]/vips` | `docs/specs/06-vips.md` | `20-191` |
| Contact | `/[locale]/contact` | `docs/specs/07-contact.md` | `26-2` |

URL base Figma: `https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport`

## Flujo del usuario

Cualquier CTA del sitio → `/[locale]/contact` → form → Server Action → Resend → email a
`info@argentinapassport.com`.

## Decisiones arquitectónicas claves

- **Server Components por defecto.** `"use client"` es la excepción, no el default.
- **Sin DB.** El cliente NO necesita historial de leads. Emails directos son suficientes.
- **`localePrefix: "always"`.** URL siempre explícita (mejor SEO, mejor compartir links).
- **Helvetica self-hosted.** Sin Google Fonts, sin tracking.
- **Sin shadcn/ui.** Reduce dependencias, control total del estilo institucional.
- **Footer muestra solo EN/RU/AR.** ES existe como ruta pero no en el switcher visible
  (decisión de marca — audiencia primaria).

## Componentes reutilizables que SIEMPRE existen

Después de implementar `docs/specs/00-foundation.md`, estos componentes están disponibles
y deben reutilizarse, no recrearse:

- `<Container>` — wrapper max-w-[1280px] con padding lateral
- `<Button variant="primary|secondary|ghost" size="sm|md|lg">`
- `<SectionEyebrow>` — el `/eyebrow` con tracking y color gold
- `<CTABanner>` — banner final reutilizable con imagen de Patagonia
- `<StatsBar>` — barra de stats con counters animados
- `<Header>`, `<Footer>`, `<LocaleSwitcher>` — layout

## Lo que NO existe (y por qué)

- **Sin CMS.** Contenido en `messages/*.json`. Cliente no edita.
- **Sin DB.** Form usa Resend directamente.
- **Sin auth.** Sitio público.
- **Sin analytics.** Alineado con privacy ("no data collection beyond what is necessary").
- **Sin tests automatizados** (deuda técnica conocida — flag para v2).
- **Sin newsletter / blog / testimonials.** Fuera de scope intencional.
