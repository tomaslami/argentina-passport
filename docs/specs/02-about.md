# SPEC 02 — About

**Fecha:** 2026-04-14 | **Estado:** APROBADO | **Figma:** [`node-id=20-111`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=20-111&m=dev)

> Prerequisitos: spec 00 y spec 01 implementadas. Componentes `Header`, `Footer`, `CTABanner`, `StatsBar`, `Button`, `Container`, `SectionEyebrow` ya existen.

---

## Objetivo

Página institucional que comunica la identidad, experiencia y filosofía de Argentina Passport. Su función es generar confianza en inversores cualificados antes de que contacten. Debe transmitir autoridad, discreción y precisión.

---

## Estructura de la página (orden vertical)

1. **Hero** (fondo navy con watermark "ABOUT" gigante)
2. **Statement** ("We handle every step. / You choose where to invest.")
3. **About + Pillars** (cuerpo de la firma + 4 pilares de valor)
4. **StatsBar** (componente reutilizable)
5. **CTABanner** (variante `beginProcess`)

---

## 1. Hero

**Comportamiento:**
- Altura: `min-h-[677px]`.
- Background: `bg-navy-900`.
- Sin imagen de fondo — solo color sólido (per Figma, nodo 20:127).
- Container max-w-[1280px].

**Watermark "ABOUT":**
- Posición: absoluta, centrada horizontalmente, `top-[200px]` desde el inicio de la sección.
- Tamaño: `text-[25.5rem]` (408px — valor excepcional, decorativo, usar clase inline).
- Font: `font-extralight` (Thin 200).
- Color: `text-cream-50`.
- Opacidad: `opacity-5` (5%).
- Atributos: `aria-hidden`, `select-none`, `pointer-events-none`, `whitespace-nowrap`.

**Contenido (alineado a la izquierda, dentro del Container):**
- **Eyebrow:** `<SectionEyebrow>Who we are</SectionEyebrow>` — el componente añade el `/` automáticamente.
- **H1:** `"Decades of experience. One clear objective."` — texto completo en una sola cadena.
  - `text-display` (96px), `font-normal` (Regular 400 — per Figma, distinto de Home que usa Light).
  - Color: `text-cream-50`.
  - Ancho máximo: `max-w-[1131px]`.
- **Subtítulo:** `"A legal, financial and concierge team built exclusively for citizenship by investment."`
  - `text-h4` (20px), `font-normal`, color `text-cream-50`.

**Animaciones:**
- Watermark: fade de `opacity-0` a `opacity-5`, `duration.hero` (1s), delay 0s.
- H1: fade + slide up 24px, `duration.slow` (0.7s), delay 0.1s.
- Subtítulo: fade, `duration.slow`, delay 0.3s.

---

## 2. Statement

**Comportamiento:**
- Background: `bg-cream-50`.
- Padding: `py-24 md:py-32`.
- Container max-w-[1280px].

**Contenido:**

- **Eyebrow** (esquina superior izquierda): `<SectionEyebrow>About us</SectionEyebrow>`.
- **Línea decorativa vertical:** `<div className="w-px h-[140px] bg-navy-900/20" />` — posicionada a la izquierda del container, debajo del eyebrow.
- **Statement text** (ocupa todo el ancho del Container, alineado a la **derecha**):
  ```
  We handle every step.
  You choose where to invest.
  ```
  - Dos `<p>` separados dentro de un `<div>`.
  - `text-display` (96px), `font-light`, color `text-navy-900`, `text-right`.
  - `whitespace-nowrap` en desktop para evitar cortes de línea no deseados.
- **Location tag** (centrado horizontalmente, debajo del statement, `mt-16`):
  - `<div className="flex justify-center">` conteniendo `<div className="inline-flex bg-navy-900 px-4 py-4">`.
  - Texto `"BUENOS AIRES, ARGENTINA"` en `text-step-body` (24px), `font-medium` (500), color `text-cream-50`, `uppercase whitespace-nowrap`.

**Animación:** scroll reveal estándar (fade + y: 16px → 0, `duration.base`).

---

## 3. About + Pillars

**Comportamiento:**
- Background: `bg-cream-50` (continuación visual de la sección anterior).
- Padding: `py-24 md:py-32`.
- Container max-w-[1280px].
- Layout desktop: dos columnas al 50% — `grid grid-cols-2 gap-16`.
- Mobile: una columna.

### Columna izquierda

**Body principal:**
```
Argentina Passport is a boutique firm specializing in fast-track Argentine citizenship
for qualified investors. We handle every legal, financial, and logistical detail
with precision and complete discretion.
```
- `text-step-body` (24px), `font-normal`, color `text-navy-900`.

**Cita destacada** (debajo del body, `mt-12`):
```
"Our clients don't seek a service. They seek certainty."
```
- `text-step-body` (24px), `font-normal`, color `text-text-muted`.
- Sin borde lateral — el color más tenue diferencia la cita visualmente (per Figma).

### Columna derecha

4 pilares de valor, separados por `border-b border-navy-900/12`.

**Estructura de cada pilar:**
```tsx
<div className="border-b border-navy-900/12 py-8">
  <p className="text-step-body font-bold text-navy-900 uppercase">{title}</p>
  <p className="text-h4 font-normal text-navy-900 mt-2">{description}</p>
</div>
```

**Los 4 pilares (copy exacto del Figma):**

| Clave i18n | Título | Descripción |
|------------|--------|-------------|
| `pillar1` | CELERITY | The fastest legal path to Argentine citizenship. |
| `pillar2` | LEGAL EXCELLENCE | Decades of experience in Argentine immigration law. |
| `pillar3` | INVESTMENT EXPERTISE | Brokers specialized in real estate, energy and business. |
| `pillar4` | ELITE SERVICE | White-glove attention from first consultation to passport delivery. |

Los títulos van en `uppercase` aplicado por CSS — en el JSON también se guardan en uppercase por ser valores de marca fijos.

**Animación:** stagger de 0.08s entre pilares al entrar en viewport.

---

## 4. StatsBar

Usar `<StatsBar />` — componente reutilizable, sin props. Los stats están hardcoded en el componente per spec 00.

---

## 5. CTABanner

Usar `<CTABanner />` con la variante `beginProcess`:

```tsx
<CTABanner
  eyebrowKey="ctaBanner.beginProcess.eyebrow"
  titleKey="ctaBanner.beginProcess.title"
  highlightKey="ctaBanner.beginProcess.highlight"
  subtitleKey="ctaBanner.beginProcess.subtitle"
  ctaKey="ctaBanner.beginProcess.cta"
/>
```

Imagen de fondo: `public/images/cta/patagonia-lake.jpg`.

---

## Claves i18n necesarias

```json
{
  "about": {
    "hero": {
      "watermark": "ABOUT",
      "eyebrow": "Who we are",
      "title": "Decades of experience. One clear objective.",
      "subtitle": "A legal, financial and concierge team built exclusively for citizenship by investment."
    },
    "statement": {
      "eyebrow": "About us",
      "line1": "We handle every step.",
      "line2": "You choose where to invest.",
      "location": "BUENOS AIRES, ARGENTINA"
    },
    "pillars": {
      "body": "Argentina Passport is a boutique firm specializing in fast-track Argentine citizenship for qualified investors. We handle every legal, financial, and logistical detail with precision and complete discretion.",
      "quote": "\"Our clients don't seek a service. They seek certainty.\"",
      "pillar1": {
        "title": "CELERITY",
        "description": "The fastest legal path to Argentine citizenship."
      },
      "pillar2": {
        "title": "LEGAL EXCELLENCE",
        "description": "Decades of experience in Argentine immigration law."
      },
      "pillar3": {
        "title": "INVESTMENT EXPERTISE",
        "description": "Brokers specialized in real estate, energy and business."
      },
      "pillar4": {
        "title": "ELITE SERVICE",
        "description": "White-glove attention from first consultation to passport delivery."
      }
    }
  }
}
```

El agente `i18n-translator` se encarga de las traducciones a ES/RU/AR.

---

## Imágenes requeridas

| Path | Descripción | Fuente recomendada |
|------|-------------|-------------------|
| `public/images/cta/patagonia-lake.jpg` | Lago patagónico con montañas (compartida con Home) | Stock editorial |

La sección About no requiere imágenes propias. El hero es solo navy sólido + watermark tipográfico.

---

## Criterios de aceptación

- [ ] Hero con fondo `bg-navy-900` puro (sin imagen).
- [ ] Watermark "ABOUT" visible al 5% de opacidad, centrado horizontalmente en el hero.
- [ ] H1 del hero en `font-normal` (Regular 400), `text-display`, color `cream-50`.
- [ ] Eyebrow del hero: `/Who we are` en gold.
- [ ] Subtítulo del hero en `text-h4` color `cream-50`.
- [ ] Sección Statement con fondo `cream-50`, statement text en `text-display` `text-right` color navy.
- [ ] Location tag "BUENOS AIRES, ARGENTINA" centrado con fondo navy y texto cream.
- [ ] Sección Pillars con layout 2 columnas en desktop.
- [ ] Columna izquierda: body 24px navy + cita 24px text-muted.
- [ ] Columna derecha: 4 pilares con título bold uppercase + descripción 20px + separadores `border-navy-900/12`.
- [ ] StatsBar con counters animados.
- [ ] CTABanner con imagen Patagonia y botón funcional.
- [ ] Animaciones respetan `prefers-reduced-motion`.
- [ ] Funciona en `/en`, `/es`, `/ru`, `/ar` (RTL invierte layout).
- [ ] `pnpm typecheck && pnpm lint && pnpm build` pasan.
- [ ] No hay texto hardcoded — todo viene de `messages/`.

---

## Casos de error

| Escenario | Comportamiento |
|-----------|----------------|
| Una clave i18n falta | Se muestra la clave en bruto + warning en consola dev |
| JS deshabilitado | Contenido y links funcionan. Solo se pierden animaciones |

---

## Fuera de scope

- ❌ Equipo individual con fotos de staff.
- ❌ Timeline de historia de la empresa.
- ❌ Testimonios o logos de clientes.
- ❌ Descargables o PDFs.

---

## Decisiones de diseño tomadas

| Decisión | Razón |
|----------|-------|
| Watermark `text-[25.5rem]` (408px inline) | El Figma usa exactamente 408px. No existe token para este tamaño. Es puramente decorativo — excepción al sistema de tokens justificada per design-system.md §13 |
| H1 `font-normal` (Regular 400), no `font-light` | Figma usa `Helvetica Neue Regular` explícitamente para este título, diferente al Home (Light). Diferenciación deliberada de peso entre páginas |
| Statement `text-display text-right` full-width | En Figma el texto está anclado al borde derecho del canvas. En container 1280px, `text-right` replica el efecto correctamente |
| Pilares con `font-bold` (700) en títulos | Único uso justificado de Bold — brandbook permite Bold para "impacto excepcional". Los 4 valores de marca califican |
| Hero sin imagen | Figma: nodo 20:127 es solo `bg-[#173557]` sin imagen. Simplicidad que contrasta con el Home hero |
| Cita sin borde lateral | El Figma no muestra decoración lateral en la cita. El color `text-muted` ya la diferencia del body |
