# SPEC 05 — Investments

**Fecha:** 2026-04-13 | **Estado:** APROBADO | **Figma:** [`node-id=20-172`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=20-172&m=dev)

> Prerequisitos: spec 00.

---

## Objetivo

Página que detalla los canales de inversión disponibles. Incluye una tabla comparativa con rangos, retornos y timelines, y un bloque de "Complete investment support" con 4 pilares.

---

## Estructura vertical

1. **PageHeader** ("CAPITAL" gigante)
2. **Strategic Allocation table** (3 categorías de inversión)
3. **Complete investment support** (4 pilares en grid)
4. **CTABanner** (`startInvesting`)

---

## 1. PageHeader

- Background `navy-900`.
- Background word: `"CAPITAL"` (uppercase, navy-700/40, posicionado arriba a la derecha).
- Eyebrow: `/Where your capital goes`.
- Título h1 (dos líneas):
  - `"Your capital."`
  - `"Working from day one."`
- Subtítulo: `"Personalized investment packages across real estate, energy and business sectors."`

---

## 2. Strategic Allocation

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-24 md:py-32`.
- Container max-w-[1280px].

**Estructura:**
- Título: `"Strategic allocation."` en `text-h1` `font-light` color `navy-900`. Centrado o alineado izquierda según Figma (alineado izquierda).
- Tabla de 3 filas (Real Estate / Energy / Business) + 1 fila de minimum requirement.

**Layout de la tabla (desktop):**

```
| Categoría     | Range          | Return                | Timeline   |
| ------------- | -------------- | --------------------- | ---------- |
| Real Estate   | $500K–$2M      | Rental + Appreciation | 2–5 years  |
| Energy        | $750K–$3M      | Long-term PPA         | 5–10 years |
| Business      | $500K–$1.5M    | Equity + Dividends    | 3–7 years  |
```

Cada fila:
- Columna 1: nombre de categoría en `text-h3` `font-light` color `navy-900`.
- Columna 2: header pequeño `"Range"` en `text-eyebrow` color `gold-500` + valor en `text-body` color `navy-900`.
- Columna 3: header `"Return"` + valor (mismo estilo).
- Columna 4: header `"Timeline"` + valor.

Separador `border-t border-border-on-cream` entre filas.

**Mobile (< 768px):** cada categoría se convierte en una "card" stackeada:
- Nombre de categoría arriba grande.
- Tres líneas debajo: Range / Return / Timeline cada una con label gold + valor.

**Fila final — Minimum Requirement:**
- Span de toda la tabla con tratamiento destacado.
- Layout: 2 columnas (40/60) en desktop.
- Columna izquierda: label `"Minimum Requirement"` en `text-eyebrow` gold + valor `"USD 500,000"` en `text-h2` `font-light` navy-900 + botón primary gold `"BEGIN THE PROCESS"` debajo.
- Columna derecha: párrafo en `text-body` color `text-muted`:
  > Minimum qualifying investment for Argentine citizenship by investment program. All investments fully documented and compliance-verified.

**Animación:** stagger entre filas (0.08s).

---

## 3. Complete investment support

**Comportamiento:**
- Background: `navy-900`.
- Padding: `py-24 md:py-32`.

**Estructura:**
- Eyebrow: `/What We Provide` en gold-500.
- Título: `"Complete"` (en white) + `"investment support."` (en gold-500). Una sola línea h1 `font-light`.
- Grid 2x2 en desktop, 1 columna mobile.

**Cada pilar:**
- Título en `text-h3` color `gold-500`.
- Body en `text-body` color `cream-50/80`, max-w-[420px].

**Los 4 pilares:**

| Título | Body |
|--------|------|
| Opportunity Vetting | Every investment opportunity is verified for legal compliance, market viability, and alignment with citizenship requirements. |
| Portfolio Structuring | Personalized investment allocation designed for both citizenship qualification and long-term financial objectives. |
| Regulatory Compliance | Full documentation and adherence to Argentine investment regulations. Every transaction fully traceable and auditable. |
| Exit Strategy Planning | Clear exit pathways established at investment initiation. Capital repatriation and liquidity options built into every portfolio. |

---

## 4. CTABanner

Variante `startInvesting`:
- eyebrow: `"START INVESTING"`
- title: `"Ready to explore"`
- highlight: `"investment opportunities?"`
- cta: `"SUBMIT REQUEST"`

---

## Claves i18n

```json
{
  "investments": {
    "header": {
      "backgroundWord": "CAPITAL",
      "eyebrow": "Where your capital goes",
      "titleLine1": "Your capital.",
      "titleLine2": "Working from day one.",
      "subtitle": "Personalized investment packages across real estate, energy and business sectors."
    },
    "table": {
      "title": "Strategic allocation.",
      "headerRange": "Range",
      "headerReturn": "Return",
      "headerTimeline": "Timeline",
      "realEstate": { "name": "Real Estate", "range": "$500K–$2M", "return": "Rental + Appreciation", "timeline": "2–5 years" },
      "energy": { "name": "Energy", "range": "$750K–$3M", "return": "Long-term PPA", "timeline": "5–10 years" },
      "business": { "name": "Business", "range": "$500K–$1.5M", "return": "Equity + Dividends", "timeline": "3–7 years" },
      "minimumLabel": "Minimum Requirement",
      "minimumValue": "USD 500,000",
      "minimumCta": "BEGIN THE PROCESS",
      "minimumDescription": "Minimum qualifying investment for Argentine citizenship by investment program. All investments fully documented and compliance-verified."
    },
    "support": {
      "eyebrow": "What We Provide",
      "titleLine1": "Complete",
      "titleHighlight": "investment support.",
      "vetting": { "title": "Opportunity Vetting", "body": "Every investment opportunity is verified for legal compliance, market viability, and alignment with citizenship requirements." },
      "structuring": { "title": "Portfolio Structuring", "body": "Personalized investment allocation designed for both citizenship qualification and long-term financial objectives." },
      "compliance": { "title": "Regulatory Compliance", "body": "Full documentation and adherence to Argentine investment regulations. Every transaction fully traceable and auditable." },
      "exit": { "title": "Exit Strategy Planning", "body": "Clear exit pathways established at investment initiation. Capital repatriation and liquidity options built into every portfolio." }
    }
  }
}
```

**Importante:** Los valores `$500K–$2M`, `2–5 years` etc usan **en-dash** (`–`, U+2013), no guión normal. Los símbolos de moneda y números mantenerse igual en todos los idiomas (no localizar el "K" o "M").

---

## Patrón implementación

Para la tabla, evaluar 2 enfoques:

**Opción A:** `<table>` HTML semántico con CSS responsive (mejor para a11y).
**Opción B:** Grid CSS custom (más control visual).

**Recomendación: Opción A** con `<table>`, `<thead>`, `<tbody>`. Usar `aria-label`. En mobile, transformar visualmente con CSS (`display: block` en filas, headers visualmente ocultos pero presentes para screen readers).

---

## Criterios de aceptación

- [ ] La tabla tiene 3 filas de inversión + 1 fila de minimum requirement.
- [ ] Los rangos usan en-dash (`–`), no guión.
- [ ] La fila final destaca visualmente con USD 500,000 grande + botón.
- [ ] El botón "BEGIN THE PROCESS" linkea a `/[locale]/contact`.
- [ ] En mobile, la tabla se transforma a cards stackeadas legibles.
- [ ] El bloque "Complete investment support" tiene fondo navy y los 4 pilares en grid 2x2.
- [ ] El título alterna color: "Complete" en white, "investment support." en gold.
- [ ] CTABanner variante `startInvesting`.
- [ ] La tabla es accesible: navegable por teclado, screen reader friendly.
- [ ] `pnpm build` pasa.

---

## Fuera de scope

- ❌ Calculadora interactiva de retorno.
- ❌ Listado de propiedades / proyectos específicos.
- ❌ Filtros por tipo de inversión.
- ❌ Disclaimers legales largos (se evalúa con el cliente para v2).

---

## Decisiones de diseño

- Los rangos y timelines son ilustrativos. El cliente puede actualizar valores en `messages/*.json` sin tocar código.
- No mostrar proyectos específicos refuerza que cada inversión es personalizada (alineado con "personalized investment packages" del subtítulo).
