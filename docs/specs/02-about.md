# SPEC 02 — About

**Fecha:** 2026-04-13 | **Estado:** APROBADO | **Figma:** [`node-id=20-111`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=20-111&m=dev)

> Prerequisitos: spec 00. Componentes base existentes.

---

## Objetivo

Página institucional de "Quiénes somos". Su función es transmitir credibilidad y experiencia del equipo. Texto corto, mucho whitespace, foco en pilares de la propuesta de valor.

---

## Estructura de la página (orden vertical)

1. **PageHeader** ("ABOUT" gigante de fondo + título + eyebrow)
2. **Statement section** ("We handle every step. You choose where to invest.")
3. **Pillars block** (4 pilares de la firma)
4. **StatsBar**
5. **CTABanner** (`beginProcess`)

---

## 1. PageHeader

**Comportamiento:**
- Background: `navy-900`.
- Padding: `pt-32 md:pt-40 pb-24 md:pb-32`.
- Container max-w-[1280px].

**Contenido:**
- "Huge background text": palabra `"ABOUT"` en `text-display` color `navy-700/40` `font-light` uppercase, posicionada absolutamente arriba a la derecha (`top-16 right-0`), `pointer-events-none`, `select-none`.
- Eyebrow: `/Who we are` en `gold-500`.
- Título h1 en dos líneas:
  - `"Decades of experience."` en white `font-light`
  - `"One clear objective."` en white `font-light`
- Subtítulo en `text-body-lg` color `cream-50/80`:
  `"A legal, financial and concierge team built exclusively for citizenship by investment."`

**Animación:** título fade+up `duration.slow`, background word fade `duration.hero` delay 0.3s.

---

## 2. Statement section

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-24 md:py-32`.
- Layout: dos columnas en desktop (30/70), stackeado mobile.

**Contenido:**
- Columna izquierda: eyebrow `/About us` con un border-left de 2px gold.
- Columna derecha: título grande en dos líneas:
  - `"We handle every step."`
  - `"You choose where to invest."`
- Ambas líneas en `text-h2` `font-light` color `navy-900`.

**Animación:** scroll reveal estándar.

---

## 3. Pillars block

**Comportamiento:**
- Background: `cream-50` (continuación del bloque anterior).
- Padding: `py-16 md:py-24`.
- Subtítulo central como divisor: badge `"BUENOS AIRES, ARGENTINA"` en navy-900 con padding, color cream-50, en el centro de un divider line cream-100 que cruza todo el ancho.

**Contenido posterior al divider:**
- Layout: dos columnas en desktop (40/60), stackeado mobile.
- Columna izquierda: párrafo en `text-body` color `text-muted`:
  `"Argentina Passport is a boutique firm specializing in fast-track Argentine citizenship for qualified investors. We handle every legal, financial, and logistical detail with precision and complete discretion."`
- Quote: `"Our clients don't seek a service. They seek certainty."` en `text-body-lg` color `text-muted/70` italic. Con sangría visual (border-left gold 2px o similar).
- Columna derecha: lista vertical de 4 pilares.

**Cada pilar:**
- Título en `text-h4` color `navy-900` uppercase tracking-wide.
- Body en `text-body` color `text-muted`.
- Border-bottom `1px gold-500/40` entre pilares.

**Los 4 pilares:**

| Título | Body |
|--------|------|
| CELERITY | The fastest legal path to Argentine citizenship. |
| LEGAL EXCELLENCE | Decades of experience in Argentine immigration law. |
| INVESTMENT EXPERTISE | Brokers specialized in real estate, energy and business. |
| ELITE SERVICE | White-glove attention from first consultation to passport delivery. |

**Animación:** stagger de 0.08s entre pilares.

---

## 4. StatsBar

Componente reutilizado.

---

## 5. CTABanner

Variante `beginProcess` (igual que Home).

---

## Claves i18n

```json
{
  "about": {
    "header": {
      "backgroundWord": "ABOUT",
      "eyebrow": "Who we are",
      "titleLine1": "Decades of experience.",
      "titleLine2": "One clear objective.",
      "subtitle": "A legal, financial and concierge team built exclusively for citizenship by investment."
    },
    "statement": {
      "eyebrow": "About us",
      "titleLine1": "We handle every step.",
      "titleLine2": "You choose where to invest."
    },
    "pillars": {
      "location": "BUENOS AIRES, ARGENTINA",
      "intro": "Argentina Passport is a boutique firm specializing in fast-track Argentine citizenship for qualified investors. We handle every legal, financial, and logistical detail with precision and complete discretion.",
      "quote": "Our clients don't seek a service. They seek certainty.",
      "celerity": { "title": "Celerity", "body": "The fastest legal path to Argentine citizenship." },
      "legal": { "title": "Legal excellence", "body": "Decades of experience in Argentine immigration law." },
      "investment": { "title": "Investment expertise", "body": "Brokers specialized in real estate, energy and business." },
      "elite": { "title": "Elite service", "body": "White-glove attention from first consultation to passport delivery." }
    }
  }
}
```

Los títulos de pilares se renderizan uppercase desde el componente, no hay que ponerlos en mayúsculas en el JSON (excepto `location` que es un texto fijo de marca).

---

## Imágenes requeridas

Esta página NO tiene imágenes propias (excepto la del CTABanner reutilizado).

---

## Criterios de aceptación

- [ ] El "huge background text" ABOUT se ve detrás del título sin interferir con la legibilidad.
- [ ] El divider central tiene la badge "BUENOS AIRES, ARGENTINA" centrada y con el color correcto.
- [ ] La quote tiene tratamiento visual diferenciado (italic + color más tenue + posiblemente border).
- [ ] Los 4 pilares se separan con border gold sutil.
- [ ] Funciona en RTL (ar): el eyebrow `/About us` debe quedar visualmente coherente — verificar manualmente.
- [ ] StatsBar y CTABanner reutilizados sin duplicar código.
- [ ] `pnpm typecheck && pnpm lint && pnpm build` pasan.
- [ ] No hay texto hardcoded.

---

## Fuera de scope

- ❌ Equipo / fotos del staff.
- ❌ Línea de tiempo / historia.
- ❌ Videos.

---

## Decisiones de diseño

- No incluir fotos del equipo refuerza la discreción institucional (decisión de marca consistente con el tono de "complete confidentiality" en Contact).
- El "huge background text" se posiciona arriba a la derecha y no centrado para evitar competir con el título principal.
