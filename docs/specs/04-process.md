# SPEC 04 — Process

**Fecha:** 2026-04-13 | **Estado:** APROBADO | **Figma:** [`node-id=20-153`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=20-153&m=dev)

> Prerequisitos: spec 00.

---

## Objetivo

Página que detalla el proceso completo en 4 pasos. Versión extendida de la sección "How it works" del Home, con párrafos largos, imágenes ilustrativas por paso, y layout zigzag.

---

## Estructura vertical

1. **PageHeader** ("PROCESS" gigante)
2. **Step 01** — Private Consultation (texto izquierda, imagen derecha)
3. **Step 02** — Investment Planning (imagen izquierda, texto derecha)
4. **Step 03** — Legal Filing (texto izquierda, imagen derecha)
5. **Step 04** — Citizenship Granted (imagen izquierda, texto derecha)
6. **CTABanner** (`scheduleConsultation`)

---

## 1. PageHeader

- Background `navy-900`.
- Background word: `"PROCESS"` (uppercase, navy-700/40).
- Eyebrow: `/How it works`.
- Título h1 (dos líneas):
  - `"From first consultation"`
  - `"to Argentine passport."`
- Subtítulo: `"A four-step process managed entirely by our team, from legal filing to investment structure."`

---

## 2-5. Step blocks

**Comportamiento general (todos los steps):**
- Background: `cream-50` (toda la sección de pasos es cream).
- Padding por step: `py-16 md:py-24`.
- Layout: dos columnas (50/50), zigzag entre steps.
- Container max-w-[1280px].

**Estructura de cada step:**

Columna de texto:
- Número grande `"01"` / `"02"` / `"03"` / `"04"` en `text-h1` color `gold-500` `font-light`.
- Etiqueta `"STEP ONE"` / `"STEP TWO"` / etc en `text-eyebrow` uppercase tracking-wider color `text-muted`.
- Título: `text-h2` `font-light` color `navy-900`.
- Body en dos párrafos, `text-body` color `text-muted`, max-w-[480px]:

Columna de imagen:
- Imagen rectangular full-width de la columna, aspect-ratio aprox `4/3`.
- `next/image` con `priority` solo para el step 1.

**Patrón zigzag:**
- Step 01: texto izquierda, imagen derecha
- Step 02: imagen izquierda, texto derecha
- Step 03: texto izquierda, imagen derecha
- Step 04: imagen izquierda, texto derecha

En mobile, todos colapsan a 1 columna con la imagen primero.

### Step 01 — Private Consultation

**Imagen:** notebook negro de cuero + pluma + vaso de whisky sobre escritorio elegante. (`public/images/process/consultation.jpg`)

**Body:**
> Confidential assessment of your eligibility, timeline, and investment structure. We review your objectives, outline the complete process, and answer every question with full transparency. No obligations. Complete discretion.
>
> This initial conversation establishes the foundation for everything that follows — your timeline, your investment strategy, your expectations.

### Step 02 — Investment Planning

**Imagen:** vista aérea nocturna de ciudad o panel solar. (`public/images/process/investment.jpg`)

**Body:**
> Personalized investment portfolio aligned with citizenship requirements and your financial objectives. We present verified opportunities across real estate, energy, and business sectors — each option vetted for compliance and return potential.
>
> Your capital begins working from day one. Full transparency. Full control. Strategic deployment designed for both citizenship qualification and long-term value.

### Step 03 — Legal Filing

**Imagen:** documento argentino con sello dorado embossed (Ministerio de Relaciones Exteriores). (`public/images/process/legal-filing.jpg`)

**Body:**
> Complete document preparation and submission to Argentine authorities. Our legal team handles every filing, apostille, translation, and procedural requirement. You receive real-time updates at every milestone.
>
> This is where decades of experience in Argentine immigration law becomes tangible. Fast-track processing. Government liaison. Interview preparation. Everything managed with precision.

### Step 04 — Citizenship Granted

**Imagen:** pasaporte argentino azul de Mercosur sobre superficie clara. (`public/images/process/passport.jpg`)

**Body:**
> Receive your Argentine passport and full citizenship rights. Access to 171 visa-free countries. Permanent residency. The right to live, work, and invest throughout Argentina and Mercosur.
>
> Our relationship doesn't end here. Ongoing concierge support, investment advisory, and lifetime access to our team for any Argentine matters.

---

## 6. CTABanner

Variante `scheduleConsultation`:
- eyebrow: `"BEGIN YOUR PROCESS"`
- title: `"Schedule your"`
- highlight: `"confidential consultation."`
- cta: `"SUBMIT REQUEST"`

---

## Claves i18n

```json
{
  "process": {
    "header": {
      "backgroundWord": "PROCESS",
      "eyebrow": "How it works",
      "titleLine1": "From first consultation",
      "titleLine2": "to Argentine passport.",
      "subtitle": "A four-step process managed entirely by our team, from legal filing to investment structure."
    },
    "step1": {
      "stepLabel": "STEP ONE",
      "title": "Private Consultation",
      "body1": "Confidential assessment of your eligibility, timeline, and investment structure. We review your objectives, outline the complete process, and answer every question with full transparency. No obligations. Complete discretion.",
      "body2": "This initial conversation establishes the foundation for everything that follows — your timeline, your investment strategy, your expectations."
    },
    "step2": { /* análogo */ },
    "step3": { /* análogo */ },
    "step4": { /* análogo */ }
  }
}
```

---

## Patrón implementación

Crear `ProcessStep` reutilizable:

```ts
type ProcessStepProps = {
  number: "01" | "02" | "03" | "04";
  reverse?: boolean;       // true = imagen izquierda
  imageSrc: string;
  imageAlt: string;
  stepLabelKey: string;
  titleKey: string;
  body1Key: string;
  body2Key: string;
};
```

---

## Imágenes requeridas

| Path | Descripción |
|------|-------------|
| `public/images/process/consultation.jpg` | Notebook + pluma sobre escritorio elegante |
| `public/images/process/investment.jpg` | Vista aérea ciudad nocturna o panel solar |
| `public/images/process/legal-filing.jpg` | Documento con sello dorado argentino |
| `public/images/process/passport.jpg` | Pasaporte azul argentino |

Tamaño: `1200x900` mínimo (4/3), formato `.jpg` calidad 80 o `.webp`.

---

## Criterios de aceptación

- [ ] Los 4 steps alternan zigzag correctamente en desktop.
- [ ] En mobile, todos los steps muestran imagen arriba y texto debajo.
- [ ] Los números 01/02/03/04 son grandes, gold, font-light.
- [ ] La etiqueta "STEP ONE/TWO/..." es eyebrow uppercase.
- [ ] Cada body tiene exactamente 2 párrafos.
- [ ] Las 4 imágenes cargan con `next/image` y tienen `alt` descriptivo.
- [ ] Solo step 1 tiene `priority` (LCP).
- [ ] CTABanner final variante `scheduleConsultation`.
- [ ] RTL invierte el zigzag correctamente.
- [ ] `pnpm build` pasa.

---

## Fuera de scope

- ❌ Timeline visual con conectores entre pasos.
- ❌ Tiempos estimados por paso ("4-6 weeks").
- ❌ Iconos por paso (los números grandes son suficientes).

---

## Decisiones de diseño

- El zigzag mantiene el ojo del lector en movimiento sin saltos bruscos.
- No mostrar tiempos estimados evita compromisos legales sobre plazos.
- Las imágenes son objeto-céntricas (notebook, sello, pasaporte) — no muestran personas, alineado con la discreción institucional.
