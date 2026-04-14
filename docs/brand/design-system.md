# Design System — Argentina Passport

> **Única fuente de verdad** para colores, tipografía, espaciado, logo y componentes base.
> **Basado en el Brandbook oficial de Argentina Passport** (Synera).
> Si necesitás un valor que no está acá, **pedí extender este documento** antes de hardcodearlo.

---

## 0. Filtro de marca — el principio rector

Cita textual del brandbook:

> **Premium. Confianza.**
> Estas dos palabras son el filtro de cada decisión de marca — visual, verbal y estratégica.
> Si algo no las refuerza, no pertenece a la identidad.

Antes de aceptar cualquier propuesta visual o textual, hacer la pregunta del brandbook:
**¿esto comunica premium y confianza?** Si la respuesta no es un sí inmediato, no aplica.

---

## 1. Paleta de colores (oficial del brandbook)

El sistema cromático tiene **exactamente 3 colores**. Cada uno cumple un rol específico
y ninguno es intercambiable con otro.

### Tokens canónicos

| Token | Hex | RGB | Rol |
|-------|-----|-----|-----|
| `--color-navy-900` | `#1A3557` | 26 / 53 / 87 | **Color primario.** Logo, fondos oscuros, textos principales, autoridad institucional |
| `--color-gold-500` | `#C9A84C` | 201 / 168 / 76 | **Color acento.** Separadores, taglines, detalles. NUNCA como fondo dominante |
| `--color-cream-50` | `#F7F4EF` | 247 / 244 / 239 | **Color base.** Blanco roto cálido. Fondo principal en versión light |

### Reglas no negociables (del brandbook)

1. **Los hex codes son los únicos valores de referencia válidos.** Un azul "parecido" NO es el azul de Argentina Passport.
2. **El Gold NUNCA se usa como color dominante de fondo.** Es acento, contenido y preciso.
3. **El blanco puro `#FFFFFF` NUNCA reemplaza al Blanco Roto `#F7F4EF`.**
4. **No sustituir colores por aproximaciones.**

### Tonos derivados (uso operativo)

Para hovers, bordes y backgrounds secundarios, derivamos tonos del navy primario.
Estos NO aparecen en el brandbook pero son necesarios para la implementación web.
Mantienen la familia tonal del navy primario:

| Token | Hex | Derivación | Uso |
|-------|-----|-----------|-----|
| `--color-navy-800` | `#21405F` | navy-900 +10% lightness | Footer, CTA banners oscuros |
| `--color-navy-700` | `#2A4A6B` | navy-900 +18% lightness | Hover sobre navy, "huge background text" |
| `--color-gold-400` | `#D4B968` | gold-500 +10% lightness | Hover de botones gold |
| `--color-text-muted` | `#5C6E84` | navy-900 desaturado | Texto secundario sobre cream |

Para texto sobre navy: usar **`text-cream-50`** (NUNCA `text-white`).
Para texto sobre cream: usar **`text-navy-900`**.
Para bordes sobre navy: `border-cream-50/15`.
Para bordes sobre cream: `border-navy-900/12`.

### Configuración en Tailwind v4

En `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Brandbook oficial */
  --color-navy-900: #1A3557;
  --color-gold-500: #C9A84C;
  --color-cream-50: #F7F4EF;

  /* Tonos derivados (operativos) */
  --color-navy-800: #21405F;
  --color-navy-700: #2A4A6B;
  --color-gold-400: #D4B968;
  --color-text-muted: #5C6E84;
}
```

### Uso correcto vs incorrecto

```tsx
// ✅ Correcto
<div className="bg-navy-900 text-cream-50">
<button className="bg-gold-500 hover:bg-gold-400 text-navy-900">
<section className="bg-cream-50 text-navy-900">

// ❌ Incorrecto
<div className="bg-[#1A3557]">             {/* hex inline */}
<div className="bg-white">                  {/* blanco puro prohibido */}
<div style={{ background: "#1A3557" }}>     {/* style inline */}
<section className="bg-gold-500">           {/* gold como dominante */}
```

---

## 2. Tipografía

### Familia única: Helvetica Neue

Cita del brandbook:

> La tipografía de la banca privada suiza, los documentos de estado y las marcas más rigurosas
> del mundo. Sin concesiones, sin carácter decorativo. Solo peso y claridad.

**Una sola familia. Esto es una decisión deliberada del brandbook**, no una limitación.

Self-hosted desde `/public/fonts/`. Cargada con `next/font/local`:

```ts
// src/app/[locale]/layout.tsx
import localFont from "next/font/local";

const helveticaNeue = localFont({
  src: [
    { path: "../../../public/fonts/HelveticaNeue-UltraLight.woff2", weight: "200", style: "normal" },
    { path: "../../../public/fonts/HelveticaNeue-Light.woff2", weight: "300", style: "normal" },
    { path: "../../../public/fonts/HelveticaNeue-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/HelveticaNeue-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/HelveticaNeue-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
});
```

En `@theme`:
```css
--font-sans: var(--font-helvetica-neue), "Helvetica Neue", Helvetica, system-ui, sans-serif;
```

**Si Helvetica Neue no está disponible en algún entorno**: el brandbook indica consultar con Synera antes de usar cualquier alternativa. Arial, Futura, Times New Roman están **explícitamente prohibidas**.

### Pesos permitidos y su uso (textual del brandbook)

| Peso | Numérico | Uso prescrito por el brandbook |
|------|----------|-------------------------------|
| UltraLight | 200 | Tagline, labels secundarios, texto de apoyo |
| Light | 300 | Cuerpo de texto, descripciones, pie de página |
| Regular | 400 | Textos generales, navegación, formularios |
| Medium | 500 | Énfasis puntual, subtítulos, etiquetas de sección |
| Bold | 700 | Títulos de impacto, **uso excepcional y justificado** |

**Nota crítica:** Bold (700) se usa solo cuando está justificado. Los títulos H1/H2 grandes
van en **Light (300)**, no Bold. Esto es contraintuitivo si venís de otros proyectos pero
es lo que pide el brandbook (alineado con la estética de banca privada suiza).

### Escala tipográfica

| Token | Tamaño desktop | Tamaño mobile | Weight | Line-height | Uso |
|-------|---------------|---------------|--------|-------------|-----|
| `text-display` | 96px | 56px | 200 (UltraLight) | 1.05 | "Huge background text" tipo "ABOUT", "SERVICES" |
| `text-h1` | 56px | 36px | 300 (Light) | 1.1 | Título principal de página |
| `text-h2` | 40px | 28px | 300 (Light) | 1.15 | Títulos de sección |
| `text-h3` | 28px | 22px | 300 (Light) | 1.2 | Sub-secciones |
| `text-h4` | 20px | 18px | 500 (Medium) | 1.3 | Etiquetas de sección |
| `text-body-lg` | 18px | 16px | 300 (Light) | 1.6 | Párrafos principales |
| `text-body` | 16px | 14px | 400 (Regular) | 1.6 | Texto general, navegación, formularios |
| `text-small` | 14px | 12px | 400 (Regular) | 1.5 | Captions, labels de form |
| `text-eyebrow` | 12px | 11px | 200 (UltraLight) | 1.4 | Eyebrows tipo `/While you wait` (tracking +0.1em, uppercase) |

### Implementación en Tailwind v4

```css
@theme {
  --text-display: 6rem;       --text-display--line-height: 1.05;
  --text-h1: 3.5rem;          --text-h1--line-height: 1.1;
  --text-h2: 2.5rem;          --text-h2--line-height: 1.15;
  --text-h3: 1.75rem;         --text-h3--line-height: 1.2;
  --text-h4: 1.25rem;         --text-h4--line-height: 1.3;
  --text-body-lg: 1.125rem;   --text-body-lg--line-height: 1.6;
  --text-body: 1rem;          --text-body--line-height: 1.6;
  --text-small: 0.875rem;     --text-small--line-height: 1.5;
  --text-eyebrow: 0.75rem;    --text-eyebrow--line-height: 1.4;
}
```

### Uso

```tsx
{/* Eyebrow */}
<span className="text-eyebrow font-extralight tracking-[0.1em] uppercase text-gold-500">
  /Who we are
</span>

{/* Título principal */}
<h1 className="text-h1 font-light text-cream-50">
  {t("titleLine1")}
</h1>

{/* Body */}
<p className="text-body-lg font-light text-text-muted">
  {t("body")}
</p>
```

### Reglas de tipografía

- **Eyebrows con prefijo `/`**: el brandbook usa este patrón consistentemente (`/Logo`, `/Paleta de Color`). Lo aplicamos en eyebrows del sitio.
- **Títulos grandes (H1/H2)** en weight **Light (300)**, NUNCA Bold. Sigue la estética de banca privada.
- **Bold (700)** reservado para casos excepcionales y justificados.
- **Números grandes** (`01`, `02`, `03`, `500K+`, `171`) usan `text-h1`/`text-h2` en `font-light` color `gold-500`.

---

## 3. Logo / Monograma AP

### Identidad oficial

Del brandbook:

> El logo de Argentina Passport es un monograma AP geométrico. Dos iniciales construidas con
> geometría limpia y peso tipográfico contundente — sin ornamentos, sin referencias culturales
> explícitas. Solo la marca, con toda la autoridad del mundo.

### Tres versiones del logo

| Versión | Cuándo usar | Path esperado |
|---------|-------------|---------------|
| **Isologo (monograma AP)** | Header del sitio, favicon, casos compactos | `public/logo/ap-monogram.svg` |
| **Imagotipo vertical** | Footer, página de contacto, splash | `public/logo/ap-vertical.svg` |
| **Imagotipo horizontal** | Header alternativo, papelería | `public/logo/ap-horizontal.svg` |

Cada uno con dos variantes de color:
- **Positivo** (logo navy sobre fondo cream): `*-positive.svg`
- **Negativo** (logo cream sobre fondo navy): `*-negative.svg`

### Tagline oficial

Bajo el imagotipo va siempre la tagline: **`FAST CITIZENSHIP BY INVESTMENT`** (uppercase).

### Tamaños mínimos (no negociables)

| Versión | Mínimo digital | Mínimo físico |
|---------|---------------|---------------|
| Imagotipo (vertical/horizontal) | 120px | 30mm |
| Isologo (monograma AP) | 32px | 10mm |

Si el espacio disponible es menor, usar el isologo (no encoger más el imagotipo).

### Zona de respeto

Espacio libre alrededor del logo equivalente a **la altura de la letra A del monograma**.
Ningún elemento puede invadir esa zona.

En implementación: padding mínimo de `1em` (relativo al tamaño del logo) en todas las direcciones.

### Usos prohibidos del logo (textual del brandbook)

El logo NUNCA:
- Se estira, se deforma o se inclina.
- Se aplica sobre fondos que comprometan su legibilidad.
- Se reproduce en colores fuera del sistema definido (solo navy `#1A3557` o cream `#F7F4EF`).
- Se usa con opacidad reducida o efectos de transparencia.
- Se acompaña de otros logos al mismo nivel visual sin separación clara.
- Se redibuja, se recrea o se reinterpreta. **Solo se usan los archivos originales entregados.**
- Lleva sombras, brillos o degradados.

### Componente `<Logo>`

```tsx
// components/layout/Logo.tsx
type LogoProps = {
  variant?: "monogram" | "vertical" | "horizontal";
  theme?: "positive" | "negative";  // positive = navy sobre cream, negative = cream sobre navy
  className?: string;
};
```

Implementar como SVG inline para evitar request HTTP adicional y mantener color via `currentColor`. **NO redibujar** — usar los SVG provistos por Synera (cuando estén disponibles, mientras tanto crear un placeholder fiel al monograma del brandbook).

---

## 4. Espaciado

Sistema basado en múltiplos de 4px (default de Tailwind v4).

| Token | Valor | Uso típico |
|-------|-------|-----------|
| `space-1` | 4px | Espaciado interno mínimo |
| `space-2` | 8px | Gap entre icon y label |
| `space-3` | 12px | Padding interno de inputs |
| `space-4` | 16px | Espacio entre elementos relacionados |
| `space-6` | 24px | Espacio entre elementos de un grupo |
| `space-8` | 32px | Espacio entre grupos |
| `space-12` | 48px | Espacio entre sub-secciones |
| `space-16` | 64px | Espacio entre secciones (mobile) |
| `space-24` | 96px | Espacio entre secciones (desktop) |
| `space-32` | 128px | Espacio entre secciones grandes (desktop) |

### Padding de secciones (canónico)

```tsx
<section className="py-16 md:py-24 lg:py-32 px-6 md:px-12">
```

### Container

Ancho máximo `1280px` centrado:
```tsx
<div className="mx-auto max-w-[1280px] px-6 md:px-12">
```

Componente `<Container>` en `components/ui/Container.tsx`.

---

## 5. Layout breakpoints

Defaults de Tailwind v4: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`.

**Mobile-first siempre.** Diseñar para 375px y escalar.

---

## 6. Componentes base

### `<Button>`

```tsx
type ButtonProps = {
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
};
```

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `gold-500` | `navy-900` | none | `gold-400` |
| `secondary` | transparent | `cream-50` | `1px cream-50/30` | `bg-cream-50/10` |
| `ghost` | transparent | `gold-500` | none | text-gold-400 |

| Size | Padding | Font | Letter-spacing |
|------|---------|------|----------------|
| `sm` | `px-4 py-2` | `text-small font-normal` | `tracking-wide` |
| `md` | `px-6 py-3` | `text-small font-medium` | `tracking-wider` |
| `lg` | `px-8 py-4` | `text-body font-medium` | `tracking-wider` |

Todos los botones van en **uppercase** con `tracking-wider`. **Sin border-radius** (corners rectos, alineado con la estética institucional sobria del brandbook).

### `<Container>`

Wrapper con `max-w-[1280px]` y padding lateral responsive.

### `<SectionEyebrow>`

```tsx
<span className="text-eyebrow font-extralight tracking-[0.1em] uppercase text-gold-500">
  /{children}
</span>
```

### `<Logo>`

Ver sección 3.

---

## 7. Patrones visuales recurrentes

### El "huge background text" en hero

Patrón usado en About, Services, Process, Investments, VIPs, Contact: una palabra gigante
("ABOUT", "SERVICES", "CAPITAL", etc.) en `text-display` color `navy-700/40` (sobre navy-900) o
`navy-900/8` (sobre cream), posicionada absolutamente detrás del título real.

```tsx
<div className="relative">
  <span aria-hidden className="absolute -top-8 right-0 text-display font-extralight uppercase text-navy-700/40 select-none pointer-events-none">
    {t("backgroundWord")}
  </span>
  <h1 className="relative text-h1 font-light text-cream-50">
    {t("title")}
  </h1>
</div>
```

### El "stats bar" oscuro

4 stats en grid horizontal, fondo `navy-800`, números grandes en `gold-500`, label en `cream-50` `text-small uppercase`.

### El "CTA banner" con imagen de Patagonia

Imagen de fondo + overlay `bg-navy-900/80` + eyebrow gold + título grande en cream + segunda línea en gold + botón primary.

### Cards numeradas (`01 / 02 / 03`)

Patrón de Home (Three services), About (los 4 pilares): número grande gold a la izquierda + contenido a la derecha. La numeración inactiva va en `gold-500/30`, la activa en `gold-500` sólido.

---

## 8. Iconografía

Iconos lineales, weight light, color `gold-500` cuando son destacados.

**Librería:** Tabler Icons (`@tabler/icons-react`). Tamaño base `32px`, configurable. Stroke `1.25` para mantener consistencia con la estética light de la tipografía.

```tsx
import { IconBalance } from "@tabler/icons-react";
<IconBalance size={32} className="text-gold-500" stroke={1.25} aria-hidden />
```

**No usar:** iconos rellenos, iconos con stroke pesado, emojis, iconos con múltiples colores.

---

## 9. Fotografía e imágenes (textual del brandbook)

Cita del brandbook:

> La fotografía de Argentina Passport debe ser **editorial, sobria y de producción propia o
> cuidadosamente curada**. NUNCA imágenes de banco de fotos genéricas, personas sonriendo con
> trajes, apretones de manos, globos terráqueos.

**Implicaciones para selección de imágenes:**

✅ Sí:
- Detalles arquitectónicos (Palacio Barolo, Teatro Colón, Casa Rosada de costado, no postales).
- Objetos significativos (sello argentino, pluma sobre escritorio, pasaporte azul).
- Paisajes editoriales (Patagonia, viñedos al atardecer, estancias).
- Composiciones desaturadas o con paleta natural alineada con cream/navy/gold.

❌ No:
- Personas en traje sonriendo a cámara.
- Apretones de manos.
- Globos terráqueos, planetas, conexiones digitales.
- Stock photos obvios (Shutterstock, iStock estándar).
- Composiciones con saturación alta o paletas que choquen con cream/navy/gold.

---

## 10. Soporte RTL (árabe)

Cuando el locale es `ar`, todo el layout debe invertirse. next-intl + `dir="rtl"` en el `<html>`.

```tsx
const dir = locale === "ar" ? "rtl" : "ltr";
return <html lang={locale} dir={dir}>...</html>
```

Reglas para componentes:
- Usar `start` y `end` en lugar de `left` y `right` (Tailwind v4: `ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`).
- Iconos direccionales (flechas) deben invertirse en RTL: `rtl:rotate-180`.
- El logo NO se invierte (es un monograma con dirección de lectura definida).
- Imágenes y layouts asimétricos: probar visualmente en `/ar/`.

---

## 11. Voz de marca (textual del brandbook)

Aunque la voz vive en el copy (`messages/*.json`), influye en decisiones visuales (jerarquía, énfasis, brevedad).

### La marca ES

- **Directa.** Frases cortas. No rodeos.
- **Segura.** "we handle", no "we could potentially help".
- **Discreta.** No alardea. Los hechos hablan.
- **Precisa.** "90 days" no "approximately three months".

### La marca NUNCA es

- **Exclamativa.** Sin signos de exclamación. Ninguno. En ningún idioma.
- **Informal.** Sin jerga, sin abreviaciones, sin emojis.
- **Genérica.** Sin frases hechas como "soluciones integrales" o "a tu medida".
- **Burocrática.** No habla como un formulario del estado.

**Implicación de diseño:** los CTAs son cortos y declarativos (`SUBMIT REQUEST`, no `Submit your request now!`). Los títulos son afirmaciones, no preguntas exclamativas.

---

## 12. Accesibilidad — mínimos no negociables

- Contraste WCAG AA en todo texto (ratio ≥ 4.5 para body, ≥ 3 para títulos grandes).
- Verificar combinaciones canónicas:
  - `navy-900` (#1A3557) sobre `cream-50` (#F7F4EF) → ratio ~10.9 ✓
  - `cream-50` (#F7F4EF) sobre `navy-900` (#1A3557) → ratio ~10.9 ✓
  - `gold-500` (#C9A84C) sobre `navy-900` (#1A3557) → ratio ~5.4 ✓ (botones, eyebrows OK)
  - `gold-500` (#C9A84C) sobre `cream-50` (#F7F4EF) → ratio ~2.7 ✗ (NO usar para body, solo decoración o títulos ≥ 24px)
- Iconos puramente decorativos: `aria-hidden="true"`.
- Focus states visibles: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2`.
- Inputs con `<label>` siempre. No solo placeholder.
- Imágenes con `alt` descriptivo (o `alt=""` si decorativa).
- Navegación por teclado funcional.

---

## 13. Cómo extender este documento

Si una nueva spec necesita un token que no existe acá:

1. Detener la implementación.
2. Verificar primero si el brandbook lo cubre — en ese caso, agregarlo aquí citando el brandbook.
3. Si no está en el brandbook, proponer el nuevo token al desarrollador con justificación.
4. Aplicar el filtro: **¿esto comunica premium y confianza?**
5. Una vez aprobado, agregarlo a este documento Y a `src/app/globals.css`.
6. Recién entonces usarlo.

**No agregar tokens "sobre la marcha" en componentes.**

**Ante cualquier caso no contemplado, el brandbook indica:** consultar con el equipo de Synera.
