# SPEC 03 — Services

**Fecha:** 2026-04-14 | **Estado:** APROBADO | **Figma:** [`node-id=20-134`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=20-134&m=dev)

> Prerequisitos: spec 00 y spec 01 implementadas. Componentes `Header`, `Footer`, `CTABanner`, `StatsBar`, `Button`, `Container`, `SectionEyebrow` ya existen. Tokens `text-card-title` (64px) ya en `globals.css`.

---

## Objetivo

Página de servicios. Detalla los 3 servicios (Legal, Investment Advisory, VIP Concierge) en bloques alternos cream/navy/cream con icono, título a 64px, body a 20px y lista de inclusiones específicas. Es la versión extendida de la sección "Three services" de Home.

---

## Estructura vertical

1. **Hero** (navy, watermark "SERVICES")
2. **Service block 1** — Legal & Administrative (cream bg)
3. **Service block 2** — Investment Advisory (navy bg, layout invertido)
4. **Service block 3** — VIP Concierge (cream bg)
5. **CTABanner** (variante `getStarted`)

---

## 1. Hero

**Comportamiento:**
- Altura: `min-h-[677px]`.
- Background: `bg-navy-900` puro (sin imagen, igual que About).
- Container max-w-[1280px].

**Watermark "SERVICES":**
- Texto `"SERVICES"` en 408px Thin, cream-50, opacity 5%.
- Clase: `text-[25.5rem] font-extralight text-cream-50 opacity-5`.
- Posición: centrado horizontalmente, `top-[200px]`, `aria-hidden`, `select-none`, `pointer-events-none`, `whitespace-nowrap`.

**Contenido (bottom-left, dentro del Container):**
- **Eyebrow:** `<SectionEyebrow>What we do</SectionEyebrow>`
- **H1:** `"Three services. One outcome."` — texto completo en una sola línea.
  - `text-display` (96px), `font-normal` (Regular 400), color `text-cream-50`.
  - Ancho máximo: `max-w-[833px]`.
- **Subtítulo:** `"Legal management, investment advisory and elite concierge — handled as a single, seamless process."`
  - `text-h4` (20px), `font-normal`, color `text-cream-50`.

**Animaciones:** igual a About hero (fade+slide H1, fade subtitle).

---

## 2. Service block — Legal & Administrative

**Comportamiento:**
- Background: `bg-cream-50`.
- Padding: `py-24 md:py-32`.
- Container max-w-[1280px].
- Layout desktop: dos columnas **[contenido | inclusiones]**, ratio `55fr:45fr`, gap `gap-16 lg:gap-20`.
- Mobile: una columna (contenido primero, inclusiones debajo).

### Columna izquierda — Contenido (width ~55%)

- **Icon:** `<IconScale>` de `@tabler/icons-react`, `size={80}`, `className="text-gold-500"`, `stroke={1.25}`, `aria-hidden`.
- **Título:** `"Legal & Administrative"` — `text-card-title` (64px), `font-normal`, color `text-navy-900`, `leading-tight`, `mt-10`.
- **Body:** `text-h4` (20px), `font-normal`, color `text-navy-900`, `mt-10`:
  > Complete legal representation throughout the citizenship process. Our team of immigration law specialists handles every filing, liaison, and procedural requirement with Argentine authorities. From document apostille to final passport collection, we manage the entire legal timeline with real-time updates at every milestone.

### Columna derecha — Inclusiones (width ~45%)

- **Header:** `"Inclusions"` — `text-[2rem]` (32px), `font-bold`, color `text-gold-500`.
- **Lista** (gap vertical `gap-6` entre items), cada item:
  - Bullet: `•` (dot) en `text-gold-500`.
  - Texto: `text-h4` (20px), `font-normal`, color `text-navy-900`.

**Items de la lista (copy exacto del Figma):**
1. Initial eligibility assessment and legal consultation
2. Complete document preparation and apostille services
3. Government liaison and filing representation
4. Citizenship application submission and tracking
5. Interview preparation and accompaniment
6. Passport collection and delivery coordination

**Animación:** scroll reveal stagger 0.08s entre items de la lista.

---

## 3. Service block — Investment Advisory

**Comportamiento:**
- Background: `bg-navy-900`.
- Padding: `py-24 md:py-32`.
- Container max-w-[1280px].
- Layout desktop: **INVERTIDO** respecto al bloque anterior — **[inclusiones | contenido]**.
  - Columna izquierda (45%): lista de "Investment Options".
  - Columna derecha (55%): icono + título + body.
- Mobile: contenido primero (icono/título/body), lista debajo.

### Columna derecha — Contenido (55%, orden visual derecha en desktop)

- **Icon:** `<IconBriefcase>` de `@tabler/icons-react`, `size={80}`, `className="text-gold-500"`, `stroke={1.25}`, `aria-hidden`.
- **Título:** `"Investment Advisory"` — `text-card-title` (64px), `font-normal`, color `text-cream-50`, `leading-tight`, `mt-10`.
- **Body:** `text-h4` (20px), `font-normal`, color `text-cream-50`, `mt-10`:
  > Strategic investment structuring across real estate, energy, and business sectors. Your capital working from day one with full transparency and regulatory compliance. We connect you with verified opportunities aligned with citizenship requirements and your financial objectives.

### Columna izquierda — Inclusiones (45%, orden visual izquierda en desktop)

- **Header:** `"Investment Options"` — `text-[2rem]` (32px), `font-bold`, color `text-gold-500`.
- **Lista** (gap `gap-6`), cada item:
  - Bullet: `•` en `text-gold-500`.
  - Texto: `text-h4` (20px), `font-normal`, color `text-cream-50`.

**Items de la lista (copy exacto del Figma):**
1. Real estate portfolio development
2. Agricultural and energy sector investments
3. Business establishment and expansion
4. Government bond allocations
5. Strategic asset diversification
6. Exit strategy planning and repatriation

**Implementación del layout invertido en Tailwind:**
```tsx
// En desktop: la columna de inclusiones va PRIMERO en el DOM pero visualmente a la izquierda.
// Usar `order-last lg:order-first` para el contenido en mobile vs desktop.
// O alternativamente usar grid con order explícito:
<div className="grid gap-16 lg:grid-cols-[45fr_55fr]">
  {/* Col izquierda — inclusiones */}
  <div className="order-2 lg:order-1">...</div>
  {/* Col derecha — contenido */}
  <div className="order-1 lg:order-2">...</div>
</div>
```

**Animación:** scroll reveal stagger en lista.

---

## 4. Service block — VIP Concierge

**Comportamiento:**
- Background: `bg-cream-50`.
- Padding: `py-24 md:py-32`.
- Container max-w-[1280px].
- Layout desktop: **[contenido | inclusiones]** — mismo orden que bloque 1.

### Columna izquierda — Contenido (55%)

- **Icon:** `<IconShield>` de `@tabler/icons-react`, `size={80}`, `className="text-gold-500"`, `stroke={1.25}`, `aria-hidden`.
- **Título:** `"VIP Concierge"` — `text-card-title` (64px), `font-normal`, color `text-navy-900`, `leading-tight`, `mt-10`.
- **Body:** `text-h4` (20px), `font-normal`, color `text-navy-900`, `mt-10`:
  > White-glove support for every aspect of your Argentine experience. From accommodation and transport to cultural programming and personal logistics, every detail is managed with discretion and precision. You focus on your decision. We handle everything else.

### Columna derecha — Inclusiones (45%)

- **Header:** `"Services Provided"` — `text-[2rem]` (32px), `font-bold`, color `text-gold-500`.
- **Lista** (gap `gap-6`), cada item:
  - Bullet: `•` en `text-gold-500`.
  - Texto: `text-h4` (20px), `font-normal`, color `text-navy-900`.

**Items de la lista (copy exacto del Figma):**
1. Premium accommodation arrangements
2. Private transport and security coordination
3. Cultural programming and local experiences
4. Translation and interpretation services
5. Medical and educational facility introductions
6. Ongoing support throughout residence

**Animación:** scroll reveal stagger en lista.

---

## 5. CTABanner

Variante `getStarted`:

```tsx
<CTABanner
  eyebrowKey="ctaBanner.getStarted.eyebrow"
  titleKey="ctaBanner.getStarted.title"
  highlightKey="ctaBanner.getStarted.highlight"
  ctaKey="ctaBanner.getStarted.cta"
/>
```

La clave `ctaBanner.getStarted` ya existe en `en.json`:
- eyebrow: `"GET STARTED"`
- title: `"Ready to begin your"`
- highlight: `"citizenship journey?"`
- cta: `"SUBMIT REQUEST"`

---

## Patrón de implementación — Componente `ServiceBlock`

Crear un componente reutilizable para evitar duplicar JSX:

```tsx
// src/components/sections/services/ServiceBlock.tsx
type ServiceBlockProps = {
  variant: "light" | "dark";          // "light" = cream bg, "dark" = navy bg
  layout: "content-left" | "content-right"; // posición del icono+título+body
  icon: ReactNode;
  title: string;
  body: string;
  listTitle: string;
  items: string[];
};
```

- `variant="light"` → `bg-cream-50`, texto navy, bullets navy.
- `variant="dark"` → `bg-navy-900`, texto cream, bullets cream.
- `layout="content-left"` → columna izquierda contenido, derecha lista (bloques 1 y 3).
- `layout="content-right"` → columna izquierda lista, derecha contenido (bloque 2).

---

## Claves i18n necesarias

```json
{
  "services": {
    "hero": {
      "watermark": "SERVICES",
      "eyebrow": "What we do",
      "title": "Three services. One outcome.",
      "subtitle": "Legal management, investment advisory and elite concierge — handled as a single, seamless process."
    },
    "legal": {
      "title": "Legal & Administrative",
      "body": "Complete legal representation throughout the citizenship process. Our team of immigration law specialists handles every filing, liaison, and procedural requirement with Argentine authorities. From document apostille to final passport collection, we manage the entire legal timeline with real-time updates at every milestone.",
      "listTitle": "Inclusions",
      "item1": "Initial eligibility assessment and legal consultation",
      "item2": "Complete document preparation and apostille services",
      "item3": "Government liaison and filing representation",
      "item4": "Citizenship application submission and tracking",
      "item5": "Interview preparation and accompaniment",
      "item6": "Passport collection and delivery coordination"
    },
    "investment": {
      "title": "Investment Advisory",
      "body": "Strategic investment structuring across real estate, energy, and business sectors. Your capital working from day one with full transparency and regulatory compliance. We connect you with verified opportunities aligned with citizenship requirements and your financial objectives.",
      "listTitle": "Investment Options",
      "item1": "Real estate portfolio development",
      "item2": "Agricultural and energy sector investments",
      "item3": "Business establishment and expansion",
      "item4": "Government bond allocations",
      "item5": "Strategic asset diversification",
      "item6": "Exit strategy planning and repatriation"
    },
    "vip": {
      "title": "VIP Concierge",
      "body": "White-glove support for every aspect of your Argentine experience. From accommodation and transport to cultural programming and personal logistics, every detail is managed with discretion and precision. You focus on your decision. We handle everything else.",
      "listTitle": "Services Provided",
      "item1": "Premium accommodation arrangements",
      "item2": "Private transport and security coordination",
      "item3": "Cultural programming and local experiences",
      "item4": "Translation and interpretation services",
      "item5": "Medical and educational facility introductions",
      "item6": "Ongoing support throughout residence"
    }
  }
}
```

El agente `i18n-translator` se encarga de ES/RU/AR.

---

## Imágenes requeridas

Esta página NO tiene imágenes propias (excepto la del CTABanner reutilizado).
Los iconos son SVG de Tabler Icons — no requieren assets externos.

---

## Criterios de aceptación

- [ ] Hero con watermark "SERVICES" al 5% de opacidad, centrado.
- [ ] H1 hero en `text-display font-normal`, color cream.
- [ ] Bloque 1 (Legal) fondo `cream-50`, icono `IconScale` 80px gold.
- [ ] Bloque 2 (Investment) fondo `navy-900`, layout INVERTIDO (lista izquierda, contenido derecha).
- [ ] Bloque 3 (VIP) fondo `cream-50`, icono `IconShield` 80px gold.
- [ ] Títulos de servicio en `text-card-title` (64px) `font-normal`.
- [ ] Cuerpos de servicio en `text-h4` (20px) `font-normal`.
- [ ] Headers de listas en 32px bold gold (`text-[2rem] font-bold text-gold-500`).
- [ ] Bullets con `•` gold como prefijo (no em-dash, no lista nativa).
- [ ] Texto de bullets en cream en el bloque navy, navy en los bloques cream.
- [ ] El bloque de Investment invierte correctamente en mobile (contenido primero, lista debajo).
- [ ] CTABanner variante `getStarted` funcional.
- [ ] Animaciones respetan `prefers-reduced-motion`.
- [ ] Funciona en `/en`, `/es`, `/ru`, `/ar` (RTL: inversión de columnas visualmente coherente).
- [ ] `pnpm typecheck && pnpm lint && pnpm build` pasan.
- [ ] No hay texto hardcoded.

---

## Casos de error

| Escenario | Comportamiento |
|-----------|----------------|
| `@tabler/icons-react` no instalado | Build falla — confirmar que `pnpm add @tabler/icons-react` ya fue ejecutado en spec 00 |
| Una clave i18n falta | Clave en bruto en UI + warning en consola |
| JS deshabilitado | Contenido y links funcionan, sin animaciones |

---

## Fuera de scope

- ❌ Pricing por servicio.
- ❌ FAQ o accordion.
- ❌ Comparativa con competidores.
- ❌ StatsBar (no aparece en el Figma de Services, solo en Home y About).

---

## Decisiones de diseño tomadas

| Decisión | Razón |
|----------|-------|
| Títulos de servicio en `text-card-title` (64px) `font-normal` | Figma usa 64px `Helvetica Neue Regular` — token ya existe de la Home |
| Body en `text-h4` (20px) en lugar de `text-body` (16px) | Figma usa 20px para el cuerpo de cada servicio — más legible para bloques de texto largo |
| Headers de lista en `text-[2rem]` (32px) inline | 32px no tiene token propio. Es uso decorativo puntual — excepción justificada per design-system.md §13 |
| Bullets con `•` (dot) no em-dash | El Figma usa `list-disc` de CSS (punto redondo) con color gold. Implementar como `<span aria-hidden>•</span>` para control explícito del color |
| Iconos a 80px, `stroke={1.25}` | Figma muestra 80x80px. El stroke 1.25 es el estándar del design system para mantener la estética light |
| Bloque Investment en navy | Crea contraste visual, refuerza que la inversión es el requisito central del proceso. El alternado cream/navy/cream es la estructura exacta del Figma |
| `content-right` en mobile muestra contenido primero | En mobile sin columnas, el usuario debe leer primero el contexto (icono + descripción) antes de ver la lista de inclusiones |
