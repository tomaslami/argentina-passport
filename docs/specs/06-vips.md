# SPEC 06 — VIPs / Experiences

**Fecha:** 2026-04-13 | **Estado:** APROBADO | **Figma:** [`node-id=20-191`](https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport?node-id=20-191&m=dev)

> Prerequisitos: spec 00.

---

## Objetivo

Página de experiencias VIP. Muestra qué hacen los clientes mientras esperan la ciudadanía: gastronomía, polo, cultura, Patagonia. Es la página más visualmente rica del sitio (4 imágenes grandes en grid).

---

## Estructura vertical

1. **PageHeader** ("EXPERIENCIE" gigante)
2. **Experiences grid** (4 categorías con imagen)
3. **Concierge services** (6 servicios en grid)
4. **Quote block** ("Every detail managed...")
5. **CTABanner** (`experienceArgentina`)

---

## 1. PageHeader

- Background `navy-900`.
- Background word: `"EXPERIENCE"` (uppercase, navy-700/40, posicionado arriba a la derecha — nota: el Figma muestra "EXPERIENCIE" pero usar `"EXPERIENCE"` correctamente escrito).
- Eyebrow: `/While you wait`.
- Título h1 (dos líneas):
  - `"Argentina."`
  - `"Experienced differently."`
- Subtítulo: `"Private accommodation, curated travel and white-glove concierge throughout your stay."`

---

## 2. Experiences grid

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-24 md:py-32`.

**Header de la sección:**
- Eyebrow: `/VIP & Experiences` en gold-500.
- Título: `"Argentina. Experienced differently."` en `text-h1` `font-light` color `navy-900` (dos líneas, igual que el header pero diferente background).

**Grid:** 2x2 en desktop, 1 columna mobile.

**Cada experiencia (card):**
- Imagen full-width del card, aspect-ratio `4/3`.
- Sobre la imagen, en la parte inferior: gradient overlay de `from-black/80 to-transparent` (bottom to top).
- Texto encima del overlay (alineado abajo izquierda con padding):
  - Título en `text-h3` color `cream-50`.
  - Body en `text-body` color `cream-50/85`, max-w-[420px].

**Las 4 experiencias:**

| Título | Body | Imagen sugerida |
|--------|------|-----------------|
| Wine & Gastronomy | Private vineyard tours, exclusive tastings, and reservations at Argentina's most distinguished restaurants. | Mesa con copas de vino en bodega |
| Polo & Equestrian | Access to private polo clubs, horseback riding across estancias, and VIP seating at championship matches. | Caballo en estancia al atardecer |
| Culture & Arts | Private tango lessons, exclusive access to Teatro Colón, and curated contemporary art gallery tours. | Interior dorado del Teatro Colón |
| Patagonia & Adventure | Helicopter glacier tours, private lodge accommodations, and guided expeditions across Argentina's wilderness. | Torres del Paine / glaciar |

**Animación:** stagger entre cards (0.1s).

---

## 3. Concierge services

**Comportamiento:**
- Background: `navy-900`.
- Padding: `py-24 md:py-32`.

**Estructura:**
- Eyebrow: `/Concierge Services` en gold-500.
- Título: `"Every detail."` (en white) + `"Managed."` (en gold-500). Una sola línea h1 `font-light`.
- Grid 3x2 en desktop, 1 columna mobile.

**Cada servicio:**
- Título en `text-h3` color `gold-500`.
- Body en `text-body` color `cream-50/80`, max-w-[340px].

**Los 6 servicios:**

| Título | Body |
|--------|------|
| Accommodation | Premium hotels, serviced apartments, and private residences. Fully vetted properties in Buenos Aires and beyond. |
| Transportation | Private drivers, executive vehicles, and helicopter transfers. Secure, discreet, on-demand. |
| Cultural Access | Exclusive access to Argentina's cultural institutions, private collections, and VIP event invitations. |
| Personal Services | Medical introductions, educational facility tours, translation services, and ongoing support. |
| Lifestyle Management | Restaurant reservations, spa bookings, fitness facilities, and personal shopping assistance. |
| Family Services | Childcare, education consultations, family activities, and age-appropriate cultural programming. |

**Animación:** stagger entre items (0.06s).

---

## 4. Quote block

**Comportamiento:**
- Background: `cream-50`.
- Padding: `py-16 md:py-24`.
- Container max-w-[800px] centrado.

**Contenido:**
- Quote: `"Every detail managed. Every preference anticipated."` en `text-h3` `font-light` italic color `navy-900`. Border-top sutil `border-t border-border-on-cream pt-12`.
- Atribución y descripción debajo:
  - `"This is not tourism. It's white-glove support designed for clients who value discretion, precision and immediate solutions."` en `text-body` color `text-muted`.
  - `"— Argentina Passport"` en `text-small` color `gold-500`.
- Alineación: derecha (según Figma).

---

## 5. CTABanner

Variante `experienceArgentina`:
- eyebrow: `"EXPERIENCE ARGENTINA"`
- title: `"Begin your"`
- highlight: `"Argentine journey."`
- cta: `"SUBMIT REQUEST"`

---

## Claves i18n

```json
{
  "vips": {
    "header": {
      "backgroundWord": "EXPERIENCE",
      "eyebrow": "While you wait",
      "titleLine1": "Argentina.",
      "titleLine2": "Experienced differently.",
      "subtitle": "Private accommodation, curated travel and white-glove concierge throughout your stay."
    },
    "experiences": {
      "eyebrow": "VIP & Experiences",
      "titleLine1": "Argentina.",
      "titleLine2": "Experienced differently.",
      "wine": { "title": "Wine & Gastronomy", "body": "Private vineyard tours..." },
      "polo": { "title": "Polo & Equestrian", "body": "Access to private polo clubs..." },
      "culture": { "title": "Culture & Arts", "body": "Private tango lessons..." },
      "patagonia": { "title": "Patagonia & Adventure", "body": "Helicopter glacier tours..." }
    },
    "concierge": {
      "eyebrow": "Concierge Services",
      "titleLine1": "Every detail.",
      "titleHighlight": "Managed.",
      "accommodation": { "title": "Accommodation", "body": "..." },
      "transportation": { "title": "Transportation", "body": "..." },
      "culturalAccess": { "title": "Cultural Access", "body": "..." },
      "personal": { "title": "Personal Services", "body": "..." },
      "lifestyle": { "title": "Lifestyle Management", "body": "..." },
      "family": { "title": "Family Services", "body": "..." }
    },
    "quote": {
      "text": "Every detail managed. Every preference anticipated.",
      "description": "This is not tourism. It's white-glove support designed for clients who value discretion, precision and immediate solutions.",
      "attribution": "Argentina Passport"
    }
  }
}
```

---

## Imágenes requeridas

| Path | Descripción | Tamaño mínimo |
|------|-------------|---------------|
| `public/images/vips/wine.jpg` | Bodega elegante con copas | 1200x900 |
| `public/images/vips/polo.jpg` | Caballo solo en estancia al atardecer | 1200x900 |
| `public/images/vips/culture.jpg` | Interior dorado del Teatro Colón | 1200x900 |
| `public/images/vips/patagonia.jpg` | Torres del Paine o glaciar | 1200x900 |

Formato `.jpg` calidad 80 o `.webp`.

---

## Patrón implementación

Crear `ExperienceCard` reutilizable:

```ts
type ExperienceCardProps = {
  imageSrc: string;
  imageAlt: string;
  titleKey: string;
  bodyKey: string;
};
```

Y `ConciergeService`:

```ts
type ConciergeServiceProps = {
  titleKey: string;
  bodyKey: string;
};
```

---

## Criterios de aceptación

- [ ] Las 4 experiencias renderizan en grid 2x2 con imágenes y overlay correctos.
- [ ] El gradient overlay no oculta el texto pero lo hace legible sobre cualquier imagen.
- [ ] Los 6 concierge services renderizan en grid 3x2 sobre fondo navy.
- [ ] El quote block tiene tratamiento visual diferenciado (italic + atribución gold).
- [ ] CTABanner final variante `experienceArgentina`.
- [ ] Las imágenes están optimizadas (verificar peso < 200KB cada una con webp).
- [ ] Funciona en RTL — los grids se invierten correctamente.
- [ ] `pnpm build` pasa.

---

## Fuera de scope

- ❌ Booking integrado (tipo Airbnb).
- ❌ Catálogo de hoteles específicos.
- ❌ Galería de fotos lightbox.
- ❌ Videos.

---

## Decisiones de diseño

- 4 experiencias (no más) para mantener foco. Cada una representa una "vertical" claramente diferenciada.
- El overlay con gradient permite usar cualquier foto sin perder legibilidad — buena defensa contra cambios futuros de imágenes.
