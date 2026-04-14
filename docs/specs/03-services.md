# SPEC 03 — Services

**Fecha:** 2026-04-13 | **Estado:** APROBADO | **Figma:** [`node-id=20-134`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=20-134&m=dev)

> Prerequisitos: spec 00.

---

## Objetivo

Página de servicios. Detalla los 3 servicios (Legal, Investment, VIP) en formato de bloques alternados con iconografía. Más extenso que la sección de Home: incluye listas de inclusiones específicas.

---

## Estructura vertical

1. **PageHeader** (con "SERVICES" gigante de fondo)
2. **Service block 1** — Legal & Administrative (fondo cream)
3. **Service block 2** — Investment Advisory (fondo navy)
4. **Service block 3** — VIP Concierge (fondo cream)
5. **CTABanner** (`getStarted`)

---

## 1. PageHeader

Mismo patrón que About:
- Background `navy-900`.
- Background word: `"SERVICES"` arriba derecha.
- Eyebrow `/What we do` en gold.
- Título h1: `"Three services. One outcome."` (dos líneas, weight 300, white).
- Subtítulo: `"Legal management, investment advisory and elite concierge — handled as a single, seamless process."`

---

## 2. Service block — Legal & Administrative

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-24 md:py-32`.
- Layout: dos columnas en desktop (50/50), stackeado mobile.

**Columna izquierda:**
- Icon: balanza (IconBalance de Tabler), tamaño 48px, color `gold-500`, stroke 1.25.
- Título: `"Legal & Administrative"` en `text-h2` `font-light` color `navy-900`.
- Body: `text-body` color `text-muted`, max-w-[480px]:
  > Complete legal representation throughout the citizenship process. Our team of immigration law specialists handles every filing, liaison, and procedural requirement with Argentine authorities. From document apostille to final passport collection, we manage the entire legal timeline with real-time updates at every milestone.

**Columna derecha:**
- Subtítulo: `"Inclusions"` en `text-h4` color `gold-500`.
- Lista de bullets en `text-body` color `text-muted`, cada uno con prefijo `·` (small dot) en `gold-500`:
  - Initial eligibility assessment and legal consultation
  - Complete document preparation and apostille services
  - Government liaison and filing representation
  - Citizenship application submission and tracking
  - Interview preparation and accompaniment
  - Passport collection and delivery coordination

---

## 3. Service block — Investment Advisory

**Comportamiento:**
- Background: `navy-900`.
- Padding: `py-24 md:py-32`.
- Layout: dos columnas en desktop (50/50). En este bloque el contenido se INVIERTE: subtítulo de "Investment Options" a la izquierda y descripción a la derecha.

**Columna izquierda:**
- Subtítulo: `"Investment Options"` en `text-h4` color `gold-500`.
- Lista de bullets en `text-body` color `cream-50/80`, prefijo `·` gold:
  - Real estate portfolio development
  - Agricultural and energy sector investments
  - Business establishment and expansion
  - Government bond allocations
  - Strategic asset diversification
  - Exit strategy planning and repatriation

**Columna derecha:**
- Icon: maletín (IconBriefcase), 48px, gold-500, stroke 1.25.
- Título: `"Investment Advisory"` en `text-h2` `font-light` color `cream-50`.
- Body: `text-body` color `cream-50/80`, max-w-[480px]:
  > Strategic investment structuring across real estate, energy, and business sectors. Your capital working from day one with full transparency and regulatory compliance. We connect you with verified opportunities aligned with citizenship requirements and your financial objectives.

---

## 4. Service block — VIP Concierge

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-24 md:py-32`.
- Layout: dos columnas (50/50), igual orientación que el bloque 1 (icon + texto a la izquierda, lista a la derecha).

**Columna izquierda:**
- Icon: escudo (IconShield), 48px, gold-500, stroke 1.25.
- Título: `"VIP Concierge"` en `text-h2` `font-light` color `navy-900`.
- Body: `text-body` color `text-muted`:
  > White-glove support for every aspect of your Argentine experience. From accommodation and transport to cultural programming and personal logistics, every detail is managed with discretion and precision. You focus on your decision. We handle everything else.

**Columna derecha:**
- Subtítulo: `"Services Provided"` en `text-h4` color `gold-500`.
- Lista de bullets:
  - Premium accommodation arrangements
  - Private transport and security coordination
  - Cultural programming and local experiences
  - Translation and interpretation services
  - Medical and educational facility introductions
  - Ongoing support throughout residence

---

## 5. CTABanner

Variante `getStarted`:
- title: `"Ready to begin your"`
- highlight: `"citizenship journey?"`
- cta: `"SUBMIT REQUEST"`

---

## Claves i18n

```json
{
  "services": {
    "header": {
      "backgroundWord": "SERVICES",
      "eyebrow": "What we do",
      "titleLine1": "Three services.",
      "titleLine2": "One outcome.",
      "subtitle": "Legal management, investment advisory and elite concierge — handled as a single, seamless process."
    },
    "legal": {
      "title": "Legal & Administrative",
      "body": "...",
      "inclusionsTitle": "Inclusions",
      "inclusion1": "Initial eligibility assessment and legal consultation",
      "inclusion2": "Complete document preparation and apostille services",
      "inclusion3": "Government liaison and filing representation",
      "inclusion4": "Citizenship application submission and tracking",
      "inclusion5": "Interview preparation and accompaniment",
      "inclusion6": "Passport collection and delivery coordination"
    },
    "investment": {
      "title": "Investment Advisory",
      "body": "...",
      "optionsTitle": "Investment Options",
      "option1": "Real estate portfolio development",
      "option2": "Agricultural and energy sector investments",
      "option3": "Business establishment and expansion",
      "option4": "Government bond allocations",
      "option5": "Strategic asset diversification",
      "option6": "Exit strategy planning and repatriation"
    },
    "vip": {
      "title": "VIP Concierge",
      "body": "...",
      "servicesTitle": "Services Provided",
      "service1": "Premium accommodation arrangements",
      "service2": "Private transport and security coordination",
      "service3": "Cultural programming and local experiences",
      "service4": "Translation and interpretation services",
      "service5": "Medical and educational facility introductions",
      "service6": "Ongoing support throughout residence"
    }
  }
}
```

---

## Patrón implementación recomendado

Crear un componente reutilizable `ServiceBlock`:

```ts
type ServiceBlockProps = {
  variant: "light" | "dark";       // cream o navy
  layout: "icon-left" | "icon-right"; // alternancia de columnas
  icon: ReactNode;
  titleKey: string;
  bodyKey: string;
  listTitleKey: string;
  listItemKeys: string[];
};
```

Esto evita duplicar JSX 3 veces.

---

## Criterios de aceptación

- [ ] Los 3 bloques alternan correctamente cream/navy/cream.
- [ ] Los iconos de Tabler renderizan con stroke 1.25 y color gold-500.
- [ ] El bloque de Investment tiene el layout invertido (lista a la izquierda).
- [ ] Las listas usan dot (·) gold como prefijo, no em-dash.
- [ ] El componente `ServiceBlock` se reutiliza para los 3 (no hay duplicación).
- [ ] CTABanner final es la variante `getStarted`.
- [ ] Funciona en RTL — la inversión de columnas debe seguir siendo visualmente coherente.
- [ ] `pnpm build` pasa.

---

## Fuera de scope

- ❌ Pricing detallado por servicio.
- ❌ FAQ.
- ❌ Comparativa con competidores.

---

## Decisiones de diseño

- El bloque del medio (Investment) en navy crea contraste visual y refuerza que es el "core" del servicio (la inversión es el requisito legal).
- Los iconos lineales weight light evitan competir con la tipografía. Usar Tabler (consistente con CRM Synera).
