# SPEC 00 — Foundation

**Fecha:** 2026-04-13 | **Estado:** APROBADO | **Prioridad:** P0 (bloquea todo)

> Esta spec define la arquitectura común a todas las páginas. **Implementar primero, antes de cualquier página.**

---

## Objetivo

Establecer la base técnica del proyecto: setup de Next.js + Tailwind v4 + next-intl + Resend, layouts globales, navegación, footer, y sistema de i18n con 4 idiomas incluyendo RTL para árabe.

---

## Contexto técnico

- Proyecto nuevo, repositorio vacío.
- Stack ya decidido (ver `CLAUDE.md`).
- 7 páginas finales: Home, About, Services, Process, Investments, VIPs, Contact.
- 4 idiomas: EN (default), ES, RU, AR (RTL).

---

## Setup inicial (paso a paso)

### 1. Inicializar el proyecto

```bash
pnpm create next-app@latest argentina-passport \
  --typescript --tailwind --app --src-dir=true \
  --import-alias="@/*" --no-eslint
cd argentina-passport
```

### 2. Instalar dependencias

```bash
pnpm add next-intl motion resend zod @tabler/icons-react
pnpm add -D prettier prettier-plugin-tailwindcss eslint eslint-config-next
```

### 3. Configurar Tailwind v4

Ya viene configurado por `create-next-app`. Reemplazar `src/app/globals.css` con el contenido del bloque `@theme` del design system (`docs/brand/design-system.md` sección 1 y 2).

### 4. Configurar next-intl

Crear:

```
i18n/
├── routing.ts       # locales soportados, default
├── request.ts       # carga de mensajes por request
└── navigation.ts    # Link, redirect, etc tipados
messages/
├── en.json
├── es.json
├── ru.json
└── ar.json
middleware.ts        # negociación de locale
```

`i18n/routing.ts`:
```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "ru", "ar"],
  defaultLocale: "en",
  localePrefix: "always", // /en, /es, /ru, /ar — sin idioma "implícito"
});
```

`middleware.ts`:
```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### 5. Configurar fuentes

Pedir a Synera los archivos `.woff2` de **Helvetica Neue** (UltraLight 200, Light 300, Regular 400, Medium 500, Bold 700). Colocar en `public/fonts/`.

Cargar en `src/app/[locale]/layout.tsx` con `next/font/local` (snippet en design-system.md sección 2).

⚠️ **El brandbook prohíbe explícitamente alternativas** (Arial, Futura, Times New Roman). Si Helvetica Neue no está disponible, **consultar con Synera antes de usar cualquier alternativa**.

### 6. Variables de entorno

Crear `.env.local` (gitignored) y `.env.example` (commiteado):

```bash
# .env.example
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=consultations@argentinapassport.com
RESEND_TO_EMAIL=info@argentinapassport.com
```

### 7. Configurar Vercel

`vercel.json` mínimo:
```json
{
  "framework": "nextjs",
  "regions": ["gru1"]
}
```

---

## Estructura de carpetas final

```
src/app/
├── [locale]/
│   ├── layout.tsx           # html, body, font, NextIntlProvider
│   ├── page.tsx             # Home
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── process/page.tsx
│   ├── investments/page.tsx
│   ├── vips/page.tsx
│   └── contact/page.tsx
├── actions/
│   └── contact.ts
├── globals.css
└── not-found.tsx
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LocaleSwitcher.tsx
├── sections/
│   ├── CTABanner.tsx
│   ├── StatsBar.tsx
│   └── Hero.tsx              # hero base reutilizable con "huge background text"
└── ui/
    ├── Button.tsx
    ├── Container.tsx
    ├── Input.tsx
    ├── Select.tsx
    ├── Textarea.tsx
    └── SectionEyebrow.tsx
i18n/
├── routing.ts
├── request.ts
└── navigation.ts
lib/
├── motion.ts                 # tokens de animación
├── resend.ts                 # cliente Resend
├── env.ts                    # validación de env vars con zod
└── utils.ts                  # cn() helper
messages/
├── en.json
├── es.json
├── ru.json
└── ar.json
public/
├── fonts/
└── images/
middleware.ts
```

---

## Componentes de layout

### `<Header>`

**Comportamiento:**
- Posición: `sticky top-0 z-50`.
- Background: `navy-900/80` con `backdrop-blur-md` (translúcido).
- Altura: `64px` mobile, `80px` desktop.
- Logo "AP / Argentina Passport" a la izquierda. Logo es SVG inline en `components/layout/Logo.tsx`.
- Nav links a la derecha: HOME, ABOUT, SERVICES, PROCESS, INVESTMENTS, VIPS.
- Botón CTA "CONTACT" en gold a la derecha del nav.
- Mobile (< 768px): menú hamburguesa que abre fullscreen overlay con los mismos links + LocaleSwitcher.
- Link activo: subrayado sutil en gold-500 (border-bottom 2px en el item activo). Detectar con `usePathname()` de next-intl.

**Interfaz:**
```ts
type NavLink = {
  href: "/" | "/about" | "/services" | "/process" | "/investments" | "/vips";
  label: string; // viene de t("nav.home"), etc
};
```

**Texto:** todas las labels via `useTranslations("nav")`.

### `<Footer>`

**Comportamiento:**
- Background: `navy-900` (más oscuro que el header).
- Padding: `py-16 md:py-24 px-6 md:px-12`.
- Grid de 4 columnas en desktop, 1 columna stackeada en mobile.

**Columnas:**
1. Logo + tagline + botón "REQUEST A CONSULTATION" (variant `secondary`).
2. NAVIGATION: Home, About, Services, Process, Investments, Vip.
3. CONTACT: `info@argentinapassport.com` (mailto link).
4. LANGUAGES: EN | RU | AR (links que cambian locale, NO incluir ES en el footer aunque exista la ruta — decisión de marca).

**Bottom bar:**
`© 2026 Argentina Passport. All rights reserved.` (izquierda) + `Privacy Policy · Terms · Cookies` (centro) + `Designed by Synera` (derecha).

`Designed by Synera` es link a `https://synera.dev` (target=_blank).

### `<LocaleSwitcher>`

**Comportamiento:**
- 4 botones de texto: `EN | ES | RU | AR`.
- El locale activo en `gold-500`, los demás en `text-cream-50/70`.
- Click cambia la URL al mismo path con el nuevo locale (usar `Link` de `i18n/navigation.ts`).
- En el footer: solo EN/RU/AR (decisión de marca).
- En el header mobile: los 4.

**Interfaz:**
```ts
type LocaleSwitcherProps = {
  variant?: "header" | "footer"; // determina qué locales mostrar
};
```

### `<Container>`

```tsx
type ContainerProps = { children: ReactNode; className?: string };
// max-w-[1280px] mx-auto px-6 md:px-12
```

### `<CTABanner>`

Reutilizable al final de casi todas las páginas.

**Comportamiento:**
- Background: imagen de Patagonia (lago + montañas) con overlay `bg-navy-900/70`.
- Min-height: `400px`.
- Contenido centrado vertical y horizontalmente.

**Estructura:**
- Eyebrow gold (ej: `BEGIN THE PROCESS`, `EXPERIENCE ARGENTINA`)
- Título grande (h2) en white + segunda línea en gold (configurable).
- Subtítulo opcional en `text-body` color `cream-50/80`.
- Botón primary `SUBMIT REQUEST` que linkea a `/[locale]/contact`.

**Interfaz:**
```ts
type CTABannerProps = {
  eyebrowKey: string;       // i18n key, ej "ctaBanner.beginProcess.eyebrow"
  titleKey: string;
  highlightKey: string;     // segunda línea en gold
  subtitleKey?: string;
  ctaKey: string;
  ctaHref?: string;         // default "/contact"
};
```

### `<StatsBar>`

**Comportamiento:**
- Background: `navy-800`.
- Padding: `py-12 md:py-16 px-6 md:px-12`.
- Grid de 4 columnas en desktop, 2x2 en mobile.
- Cada stat: número grande gold (text-h2) + label small white uppercase.
- Animación: counter desde 0 cuando entra en viewport (ver `motion.md`).

**Stats hardcoded** (mismos en Home y About según diseño):
```ts
const stats = [
  { value: "EN RU AR ES", label: "Languages spoken natively", isText: true },
  { value: "STABLE", label: "Geopolitical environment", isText: true },
  { value: "500K+", label: "Minimum USD investment" },
  { value: "171", label: "Visa-free countries" },
];
```

Los stats que son texto puro (`EN RU AR ES`, `STABLE`) NO se animan como counter. Solo `500K+` y `171` se animan (contar 0→500, 0→171).

---

## Sistema i18n

### Archivos de mensajes

Cada `messages/{locale}.json` tiene la misma estructura. Esquema:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "process": "Process",
    "investments": "Investments",
    "vips": "Vips",
    "contact": "Contact"
  },
  "footer": {
    "tagline": "...",
    "navigation": "Navigation",
    "contact": "Contact",
    "languages": "Languages",
    "copyright": "© 2026 Argentina Passport. All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "terms": "Terms",
    "cookies": "Cookies",
    "designedBy": "Designed by Synera"
  },
  "stats": {
    "languagesLabel": "Languages spoken natively",
    "stabilityValue": "STABLE",
    "stabilityLabel": "Geopolitical environment",
    "investmentLabel": "Minimum USD investment",
    "visaFreeLabel": "Visa-free countries"
  },
  "ctaBanner": {
    "beginProcess": {
      "eyebrow": "BEGIN THE PROCESS",
      "title": "Ready to secure your",
      "highlight": "second nationality?",
      "subtitle": "Confidential consultations available in English, Russian and Arabic.",
      "cta": "SUBMIT REQUEST"
    },
    "experienceArgentina": {
      "eyebrow": "EXPERIENCE ARGENTINA",
      "title": "Begin your",
      "highlight": "Argentine journey.",
      "cta": "SUBMIT REQUEST"
    },
    "startInvesting": {
      "eyebrow": "START INVESTING",
      "title": "Ready to explore",
      "highlight": "investment opportunities?",
      "cta": "SUBMIT REQUEST"
    },
    "getStarted": {
      "eyebrow": "GET STARTED",
      "title": "Ready to begin your",
      "highlight": "citizenship journey?",
      "cta": "SUBMIT REQUEST"
    },
    "scheduleConsultation": {
      "eyebrow": "BEGIN YOUR PROCESS",
      "title": "Schedule your",
      "highlight": "confidential consultation.",
      "cta": "SUBMIT REQUEST"
    }
  },
  "home": { ... },
  "about": { ... },
  "services": { ... },
  "process": { ... },
  "investments": { ... },
  "vips": { ... },
  "contact": { ... }
}
```

Cada spec de página define las claves específicas que necesita en su sección.

### Soporte RTL

En `src/app/[locale]/layout.tsx`:
```tsx
const dir = locale === "ar" ? "rtl" : "ltr";
return (
  <html lang={locale} dir={dir} className={helvetica.variable}>
    <body className="bg-navy-900 text-cream-50 antialiased font-light">  {/* font-light = peso por defecto del brandbook */}
      <NextIntlClientProvider messages={messages}>
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </body>
  </html>
);
```

Componentes deben usar utilidades lógicas (`ms-`, `me-`, `text-start`, `text-end`) en lugar de direccionales.

---

## Criterios de aceptación

- [ ] `pnpm dev` levanta el proyecto en `localhost:3000` y redirige a `/en`.
- [ ] Las 4 rutas `/en`, `/es`, `/ru`, `/ar` cargan sin error.
- [ ] `/ar` aplica `dir="rtl"` en `<html>` y el layout se invierte visualmente.
- [ ] Header sticky con backdrop-blur funciona en todas las páginas.
- [ ] Footer presente en todas las páginas con el copyright "Designed by Synera".
- [ ] LocaleSwitcher cambia el idioma manteniendo el path actual.
- [ ] Helvetica Neue carga correctamente (ver en DevTools que no haya fallback a system-ui).
- [ ] Tokens del design system disponibles como utilidades Tailwind (`bg-navy-900`, `text-gold-500`, etc).
- [ ] `<Button variant="primary">` renderiza correctamente con los tres tamaños.
- [ ] `<CTABanner>` y `<StatsBar>` están implementados y aceptan props i18n keys.
- [ ] `pnpm typecheck` pasa sin errores.
- [ ] `pnpm build` completa sin errores.
- [ ] Lighthouse > 95 en desktop y mobile en una página de prueba (puede ser placeholder).

---

## Casos de error

| Escenario | Comportamiento esperado |
|-----------|------------------------|
| Usuario entra a `/` (sin locale) | Middleware redirige a `/en` (default) |
| Usuario entra a `/fr` (locale no soportado) | 404 vía `src/app/not-found.tsx` |
| Usuario entra a `/en/foo` (ruta no existe) | 404 con layout de `[locale]` aplicado |
| `messages/{locale}.json` falta una clave | next-intl muestra la clave en bruto + warning en consola |
| Helvetica no carga | Fallback a system-ui (sin layout shift gracias a `display: swap`) |

---

## Fuera de scope (explícito)

- ❌ CMS — el contenido vive en `messages/*.json` (decisión tomada).
- ❌ Blog / news.
- ❌ Sistema de auth.
- ❌ Dashboard administrativo.
- ❌ Analytics setup (se hace después por separado).
- ❌ Cookie banner (se evalúa al final del proyecto, fuera de v1).

---

## Decisiones de diseño tomadas

| Decisión | Razón |
|----------|-------|
| `localePrefix: "always"` | URL siempre explícita, mejor para SEO y compartir links |
| Sin shadcn/ui | Reduce dependencias y mantiene control total del estilo institucional |
| Solo Resend (sin DB) | Cliente no necesita historial de leads — emails directos a `info@` son suficientes |
| Footer solo muestra EN/RU/AR | El sitio soporta ES pero el cliente prioriza esos 3 idiomas como audiencia objetivo |
| Helvetica Neue self-hosted | Tipografía oficial del brandbook ("la fuente de la banca privada suiza"). Sin Google Fonts, sin tracking. |
| Sin page transitions en v1 | Complejidad innecesaria; se evalúa en v2 si el cliente lo pide |
