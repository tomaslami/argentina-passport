# Convenciones de código — Argentina Passport

> Documento de contexto para agentes Codex. Reglas de estilo y patrones obligatorios.

## TypeScript

- **Strict mode.** Configurado en `tsconfig.json`.
- **Sin `any`.** Usar `unknown` con narrowing. Si necesitás `any`, hay un bug de diseño.
- **Sin `// @ts-ignore` o `// @ts-expect-error`** sin justificación documentada en comentario adyacente.
- **Tipos explícitos en boundaries** (props de componentes, retornos de Server Actions, esquemas Zod).
- **Inferencia adentro** — no anotar variables internas que TS infiere correctamente.

```ts
// ✓ Bien
type ButtonProps = { variant: "primary" | "secondary"; size: "sm" | "md" | "lg" };
export function Button({ variant, size }: ButtonProps) {
  const classes = computeClasses(variant, size); // ← inferencia interna OK
  return <button className={classes}>...</button>;
}

// ✗ Mal
export function Button({ variant, size }: any) { ... }
```

## React / Next.js

### Server vs Client

- **Server Components por defecto.** Si el archivo no necesita estado, eventos o hooks de browser,
  NO marcarlo `"use client"`.
- **Cuando uses `"use client"`,** poner comentario al inicio justificando:

```tsx
"use client";
// Reason: useActionState para manejar estados de Server Action en el form.
```

### Exports

- **Named exports siempre.** Excepto en archivos que Next.js exige default export:
  `page.tsx`, `layout.tsx`, `route.ts`, `error.tsx`, `loading.tsx`, `not-found.tsx`, `middleware.ts`.

```tsx
// ✓ Bien — components/sections/Hero.tsx
export function Hero({ titleKey }: HeroProps) { ... }

// ✗ Mal
export default function Hero(...) { ... }
```

### Tamaño de archivos

- Componentes < 200 líneas. Si crece, partirlo en sub-componentes.
- Server Actions < 150 líneas. Extraer helpers a `lib/`.

### Imágenes

- **SIEMPRE `next/image`.** NUNCA `<img>`.
- Hero / above-the-fold: `priority`.
- Below-the-fold: lazy (default).
- `alt` descriptivo. `alt=""` solo para imágenes puramente decorativas.

```tsx
// ✓ Bien
import Image from "next/image";
<Image
  src="/images/home/hero-skyline.jpg"
  alt="Buenos Aires skyline at sunset"
  width={1920}
  height={1080}
  priority
/>
```

### Texto

- **TODO el texto user-facing viene de `useTranslations`** de next-intl.
- Excepción: nombres propios fijos como `"Argentina Passport"` (pero igual va en messages para consistencia).

```tsx
// ✓ Bien
import { useTranslations } from "next-intl";
const t = useTranslations("home.hero");
return <h1>{t("titleLine1")}</h1>;

// ✗ Mal
return <h1>Your passport to everywhere.</h1>;
```

## Tailwind v4

### Tokens

- **SIEMPRE usar tokens del design system.** Definidos en `src/app/globals.css` con `@theme`.
- **NUNCA hex codes inline** (`bg-[#0F2A44]`, `style={{ color: "#C9A14A" }}`).
- **NUNCA tamaños arbitrarios** (`text-[24px]`, `p-[37px]`).

```tsx
// ✓ Bien
<div className="bg-navy-900 text-gold-500 py-24 md:py-32">

// ✗ Mal
<div className="bg-[#0F2A44] text-[#C9A14A] py-[96px]">
<div style={{ backgroundColor: "#0F2A44" }}>
```

### RTL

- Usar **utilidades lógicas**: `ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`.
- NO usar direccionales: `ml-`, `mr-`, `pl-`, `pr-`, `text-left`, `text-right`, `left-`, `right-`.

```tsx
// ✓ Bien
<div className="ms-4 me-8 text-start">

// ✗ Mal
<div className="ml-4 mr-8 text-left">
```

### Iconos

- **Tabler Icons** (`@tabler/icons-react`).
- Stroke 1.25 para iconos hero/grandes.
- Color `text-gold-500` cuando son destacados.
- `aria-hidden="true"` si son decorativos.

```tsx
import { IconBalance } from "@tabler/icons-react";
<IconBalance size={48} className="text-gold-500" stroke={1.25} aria-hidden />
```

## Animaciones

- **Solo `motion/react`.** NO importar de `framer-motion` (legacy).
- **Solo patrones de `docs/brand/motion.md`.** No inventar.
- **Tokens de `lib/motion.ts`** (`ease.out`, `duration.base`, etc).
- **`prefers-reduced-motion`** respetado siempre.

```tsx
import { motion } from "motion/react";
import { ease, duration } from "@/lib/motion";

<motion.section
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: duration.base, ease: ease.out }}
>
```

## Server Actions

- **Archivo:** `src/app/actions/[feature].ts` con `"use server"` al inicio.
- **Validación con Zod siempre.**
- **Errores genéricos al usuario.** No exponer detalles internos.
- **Sin logging de datos sensibles.**

```ts
"use server";
import { z } from "zod";

const Schema = z.object({ ... });

export async function submitContact(_prev, formData) {
  const parsed = Schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "validation", errors: ... };
  // ...
}
```

## Variables de entorno

- **Validar con Zod en `lib/env.ts`** al inicio.
- **`.env.local` en `.gitignore`.** `.env.example` commiteado.
- **NUNCA secrets en código fuente** ni en logs.

```ts
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  RESEND_TO_EMAIL: z.string().email(),
});

export const env = envSchema.parse(process.env);
```

## Naming

- **Componentes:** PascalCase, un componente por archivo (`Header.tsx`).
- **Hooks:** camelCase con prefijo `use` (`useReducedMotionSafe.ts`).
- **Utilities:** camelCase (`utils.ts`, `cn()`).
- **Tipos / interfaces:** PascalCase (`ButtonProps`, `ContactState`).
- **Constantes:** UPPER_SNAKE_CASE solo para verdaderas constantes globales.
- **Server Actions:** camelCase con verbo (`submitContact`, `requestConsultation`).

## Imports

Orden:
1. React / Next built-ins
2. Librerías externas
3. Imports absolutos del proyecto (`@/...`)
4. Imports relativos (`./`, `../`)

```ts
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { ease, duration } from "@/lib/motion";

import { localHelper } from "./helper";
```

## Comentarios

- **Solo cuando el "por qué" no es obvio.** El "qué" debe leerse del código.
- **JSDoc** para utilities exportados con lógica no trivial.
- **`// TODO:`** con tu nombre y fecha si dejás algo pendiente.

## Lo que NO se hace

- ❌ shadcn/ui
- ❌ CSS modules / styled-components
- ❌ Default exports (excepto donde Next.js exige)
- ❌ `any` en TypeScript
- ❌ Texto hardcoded en componentes
- ❌ Hex codes inline
- ❌ `<img>` (siempre `next/image`)
- ❌ Animaciones fuera de los patrones de `motion.md`
- ❌ Acciones no-Server-Action que podrían serlo (preferir Server Actions sobre API routes)
