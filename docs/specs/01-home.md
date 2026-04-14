# SPEC 01 — Home

**Fecha:** 2026-04-13 | **Estado:** APROBADO | **Figma:** [`node-id=15-2`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=15-2&m=dev)

> Prerequisitos: spec 00 implementada. Componentes `Header`, `Footer`, `CTABanner`, `StatsBar`, `Button`, `Container` ya existen.

---

## Objetivo

Página principal del sitio. Su función es captar a inversores cualificados y dirigirlos al formulario de contacto. Debe transmitir solidez institucional, exclusividad y claridad del valor entregado.

---

## Estructura de la página (orden vertical)

1. **Hero** (fullscreen, fondo navy con imagen de skyline)
2. **Intro statement** ("For those who choose where they belong.")
3. **Three services** (sección oscura con tres cards numeradas)
4. **How it works** (4 pasos sobre cream)
5. **StatsBar** (componente reutilizable)
6. **CTABanner** ("Ready to secure your second nationality?")

---

## 1. Hero

**Comportamiento:**
- Altura: `min-h-screen` (mínimo 100vh).
- Background: imagen de skyline urbano (Buenos Aires), full-bleed.
- Overlay: gradiente `bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-900/30`.
- Header transparente sobre el hero (el sticky se vuelve sólido al scroll).

**Contenido (alineado abajo a la izquierda, con padding):**
- H1 en dos líneas:
  - Línea 1: `"Your passport to"` en `text-h1` `font-light` color `cream-50`.
  - Línea 2: `"everywhere."` en `text-h1` `font-light` color `gold-500` (acento).
- Subtítulo en `text-body-lg` color `cream-50/85`, max-width `560px`:
  - `"We handle the legal process, structure your investment and manage your stay in Argentina. One firm. One outcome. Your Argentine passport."`
- Botón primary `"REQUEST A PRIVATE CONSULTATION"` linkea a `/[locale]/contact`.

**Animación:**
- Título: fade + slide up, `duration.slow`, delay 0.1s.
- Subtítulo: fade, `duration.slow`, delay 0.3s.
- Botón: fade + slide up, `duration.slow`, delay 0.5s.

---

## 2. Intro statement

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-24 md:py-32`.
- Container: max-w-[1280px].
- Layout: dos columnas en desktop (40/60), stackeado en mobile.

**Contenido:**
- Columna izquierda: Título grande `"For those who choose where they belong."` en `text-h2` `font-light` color `navy-900`.
- Columna derecha: Párrafo `text-body-lg` color `text-muted`:
  `"Argentina Passport is a private firm specializing in citizenship by investment. We manage every legal, financial and logistical step — so the only decision you make is where to invest."`

**Animación:** scroll reveal estándar.

---

## 3. Three services

**Comportamiento:**
- Background: `navy-900`.
- Padding: `py-24 md:py-32`.

**Estructura:**
- Eyebrow: `/What we do` en `gold-500`.
- Título: `"Three services. One outcome."` en `text-h1` `font-light` color `cream-50`.
- Grid de 3 cards (1 columna mobile, 3 columnas desktop con `gap-16`).

**Cada card:**
- Numeración a la izquierda en columna vertical: `01 / 02 / 03` en `text-h1` color `gold-500`. El número activo en sólido, los otros en `gold-500/30`. (En el diseño, los 3 números aparecen apilados a la izquierda de cada card pero solo uno destaca — implementar como bloque de 3 numerales con el correspondiente destacado).
- Imagen al lado derecho del título (en desktop). En mobile la imagen va arriba del texto.
- Título de la card: `text-h3` `font-light` color `cream-50`.
- Body: `text-body` color `cream-50/80`, max-width `420px`.
- Lista de 4 bullets debajo del body, cada uno con prefijo `—` (em-dash) en `gold-500`, texto en `cream-50/80`, `text-small`.

**Las 3 cards (textos exactos):**

### Card 01 — Legal & Administrative Management
> We provide full legal representation throughout the Argentine citizenship process. Our licensed attorneys manage all communication with the Ministry of Economy, prepare and file every required document, and follow your case through to final resolution. This is not a referral service. Our legal team works exclusively on citizenship cases and has direct access to the relevant government departments. You never interact with authorities directly — we handle every step. From initial document translation to final passport issuance, the process is managed with complete discretion and professional oversight.

Bullets:
- Ministry of Economy representation
- Document preparation & filing
- Full administrative follow-up
- Legal resolution & delivery

Imagen: `public/images/home/legal.jpg` (documento con sello sobre escritorio).

### Card 02 — Investment Advisory
> Argentine citizenship by investment requires a minimum capital commitment of USD $500,000. We structure your investment across three pre-approved channels: real estate, renewable energy infrastructure, or direct business equity. Our advisory team designs a personalized portfolio aligned with your risk profile and citizenship timeline. All investments comply with Ministry of Economy regulations and are structured to ensure immediate recognition by Argentine authorities. Capital transfer channels are established before filing. We work with registered financial institutions to ensure full transparency and regulatory compliance at every step.

Bullets:
- Real estate investment packages
- Renewable energy infrastructure
- Direct business equity placement
- Immediate capital transfer setup

Imagen: `public/images/home/investment.jpg` (skyline o paneles solares).

### Card 03 — VIP Concierge & Experiences
> Citizenship processing requires physical presence in Argentina. We ensure your time here is productive, comfortable and memorable. From arrival to departure, our concierge team manages every logistical detail. Private transport, curated accommodation, and personalized cultural programming are included. Whether you're staying for two weeks or two months, we design your experience to match your schedule and interests. This is not tourism. It's white-glove support designed for clients who value discretion, precision and immediate solutions.

Bullets:
- Private transport & drivers
- Curated accommodation
- Cultural programming & access
- 24/7 logistical support

Imagen: `public/images/home/concierge.jpg` (mesa elegante al atardecer).

**CTA al final de la sección:** botón primary centrado `"EXPLORE OUR SERVICES"` linkea a `/[locale]/services`.

**Animación:** stagger de 0.08s entre cards.

---

## 4. How it works

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-24 md:py-32`.

**Estructura:**
- Eyebrow: `/How it works` en `gold-500`.
- Título: `"From first consultation to Argentine passport."` en `text-h1` `font-light` color `navy-900`.
- Lista vertical de 4 pasos (no grid).

**Cada paso:**
- Layout: número grande gold a la izquierda + título y texto a la derecha.
- Número: `text-h1` color `gold-500`, weight 300.
- Título: `text-h3` color `navy-900`.
- Body: `text-body` color `text-muted`, max-width `680px`.
- Separador `border-b border-border-on-cream` entre pasos.

**Los 4 pasos (textos exactos):**

| # | Título | Body |
|---|--------|------|
| 01 | Private Consultation | We assess your profile, investment capacity and objectives. You receive a complete roadmap before any commitment is made. |
| 02 | Investment Structure | Our brokers design your personalized investment package. Capital transfer channels are established immediately. |
| 03 | Legal Filing | Our legal team files your citizenship application before the Ministry of Economy and manages every administrative step through to resolution. |
| 04 | Citizenship Granted | Your Argentine passport is issued. One of the world's most powerful travel documents, secured through a fully legal and expedited process. |

**CTA al final:** botón secondary `"SEE THE FULL PROCESS"` linkea a `/[locale]/process`.

**Animación:** stagger de 0.08s entre pasos.

---

## 5. StatsBar

Usar `<StatsBar />` con los stats hardcoded definidos en `00-foundation.md`.

---

## 6. CTABanner

Usar `<CTABanner />` con la variante `beginProcess`:
- eyebrowKey: `ctaBanner.beginProcess.eyebrow`
- titleKey: `ctaBanner.beginProcess.title`
- highlightKey: `ctaBanner.beginProcess.highlight`
- subtitleKey: `ctaBanner.beginProcess.subtitle`
- ctaKey: `ctaBanner.beginProcess.cta`

Imagen de fondo: `public/images/cta/patagonia-lake.jpg`.

---

## Claves i18n necesarias

```json
{
  "home": {
    "hero": {
      "titleLine1": "Your passport to",
      "titleLine2": "everywhere.",
      "subtitle": "We handle the legal process, structure your investment and manage your stay in Argentina. One firm. One outcome. Your Argentine passport.",
      "cta": "REQUEST A PRIVATE CONSULTATION"
    },
    "intro": {
      "title": "For those who choose where they belong.",
      "body": "Argentina Passport is a private firm specializing in citizenship by investment. We manage every legal, financial and logistical step — so the only decision you make is where to invest."
    },
    "services": {
      "eyebrow": "What we do",
      "title": "Three services. One outcome.",
      "exploreCta": "EXPLORE OUR SERVICES",
      "card1": {
        "title": "Legal & Administrative Management",
        "body": "...",
        "bullet1": "Ministry of Economy representation",
        "bullet2": "Document preparation & filing",
        "bullet3": "Full administrative follow-up",
        "bullet4": "Legal resolution & delivery"
      },
      "card2": { /* análogo */ },
      "card3": { /* análogo */ }
    },
    "process": {
      "eyebrow": "How it works",
      "title": "From first consultation to Argentine passport.",
      "step1": { "title": "Private Consultation", "body": "..." },
      "step2": { "title": "Investment Structure", "body": "..." },
      "step3": { "title": "Legal Filing", "body": "..." },
      "step4": { "title": "Citizenship Granted", "body": "..." },
      "fullProcessCta": "SEE THE FULL PROCESS"
    }
  }
}
```

Nombres exactos de claves arriba. El agente `i18n-translator` se encarga de las traducciones a ES/RU/AR.

---

## Imágenes requeridas

| Path | Descripción | Source recomendado |
|------|-------------|-------------------|
| `public/images/home/hero-skyline.jpg` | Skyline de Buenos Aires al atardecer | Unsplash / stock |
| `public/images/home/legal.jpg` | Documento con sello argentino sobre escritorio de madera | Stock |
| `public/images/home/investment.jpg` | Skyline urbano nocturno o paneles solares | Stock |
| `public/images/home/concierge.jpg` | Mesa elegante en exterior al atardecer | Stock |
| `public/images/cta/patagonia-lake.jpg` | Lago patagónico con montañas | Stock |

Optimizar a `1920x1080` máximo, formato `.jpg` con calidad 80, o `.webp`.

---

## Criterios de aceptación

- [ ] Hero ocupa pantalla completa con la imagen de fondo y el gradiente correctos.
- [ ] Las dos líneas del título tienen los colores correctos (white + gold).
- [ ] El botón "REQUEST A PRIVATE CONSULTATION" linkea a `/[locale]/contact`.
- [ ] La sección de Three services tiene fondo navy-900 y las 3 cards bien espaciadas.
- [ ] Cada card muestra el bloque numérico 01/02/03 con la numeración correspondiente destacada.
- [ ] Los bullets usan em-dash (—) en gold como prefijo.
- [ ] La sección How it works alterna fondo cream con la sección anterior.
- [ ] Cada paso muestra número grande gold + título navy + body muted.
- [ ] StatsBar muestra los 4 stats con los counters animando.
- [ ] CTABanner final con imagen Patagonia, overlay y botón funcional.
- [ ] Animaciones respetan `prefers-reduced-motion`.
- [ ] Funciona correctamente en `/en`, `/es`, `/ru`, `/ar` (RTL invierte layout).
- [ ] Lighthouse desktop y mobile > 95.
- [ ] `pnpm typecheck && pnpm lint && pnpm build` pasan.
- [ ] No hay texto hardcoded — todo viene de `messages/`.

---

## Casos de error

| Escenario | Comportamiento |
|-----------|----------------|
| Imagen del hero no carga | Background fallback `bg-navy-900` (no layout shift gracias a `next/image` con `priority`) |
| Una clave i18n falta | Se muestra la clave en bruto + warning en consola dev |
| Usuario abre en navegador con JS deshabilitado | Hero, contenido y links funcionan. Solo se pierden las animaciones de motion (degradación graceful) |

---

## Fuera de scope

- ❌ Newsletter signup en home.
- ❌ Testimonios.
- ❌ Logos de prensa o partners.
- ❌ Video en hero (puede evaluarse en v2).

---

## Decisiones de diseño tomadas

- El hero usa imagen estática (no video) para mantener el rendimiento óptimo en mobile y respetar planes de datos.
- Las 3 cards de servicios muestran los 3 números en cada card (pattern del Figma) en lugar de un único número, para reforzar visualmente la posición en el set.
- La sección "How it works" en home es resumida (4 pasos cortos). La página `/process` tiene la versión extendida con párrafos completos.
