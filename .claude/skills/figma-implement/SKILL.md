---
name: figma-implement
description: |
  Implementa un nodo de Figma como página o componente Next.js, respetando estrictamente
  el design system del proyecto. Usar cuando el usuario diga "implementá este nodo de
  Figma", "hacé esta página", "convertí este diseño a código", o pase un link de Figma.
  También usar cuando el usuario mencione "node-id" o pase una URL de figma.com/design.

when_to_use: |
  Activar siempre que la tarea sea convertir un diseño visual de Figma en código React
  para este proyecto. NO usar para crear componentes desde cero sin diseño de referencia
  (en ese caso, pedir la spec o el nodo de Figma primero).

allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(pnpm typecheck)
  - Bash(pnpm lint)
  - Bash(pnpm build)
  - Bash(pnpm dev)

argument-hint: "[node-id] [page-name]"

version: "1.0.0"
---

# Figma Implement

Tu trabajo es traducir un nodo de Figma a código Next.js de producción siguiendo las reglas estrictas de este proyecto.

## Procedimiento obligatorio

### Paso 1 — Leer el contexto antes de mirar el Figma

NUNCA mirar el Figma primero. Leer en este orden:

1. `CLAUDE.md` — reglas técnicas del proyecto.
2. `docs/brand/design-system.md` — tokens visuales (la única fuente de verdad).
3. `docs/brand/motion.md` — reglas de animación.
4. La spec correspondiente en `docs/specs/` que mapee al `node-id`.

Mapping nodo → spec:

| node-id | Spec |
|---------|------|
| `15-2` | `docs/specs/01-home.md` |
| `20-111` | `docs/specs/02-about.md` |
| `20-134` | `docs/specs/03-services.md` |
| `20-153` | `docs/specs/04-process.md` |
| `20-172` | `docs/specs/05-investments.md` |
| `20-191` | `docs/specs/06-vips.md` |
| `26-2` | `docs/specs/07-contact.md` |

Si no hay spec para el nodo, **detenerse y pedirle al usuario que cree una primero** (o invocar al subagente correspondiente).

### Paso 2 — Verificar prerequisitos del proyecto

```bash
test -f CLAUDE.md && echo "✓ CLAUDE.md presente"
test -d src/app/[locale] && echo "✓ Routing i18n configurado"
test -f i18n/routing.ts && echo "✓ next-intl configurado"
test -f docs/brand/design-system.md && echo "✓ Design system presente"
```

Si la foundation (spec 00) no está implementada, **detenerse**. Ejecutarla primero.

### Paso 3 — Abrir el nodo de Figma con el MCP

Usar el MCP de Figma (si está conectado) o pedir al usuario un screenshot del nodo si no lo está.

```
Figma URL base: https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport
Nodo a implementar: $ARGUMENTS
```

### Paso 4 — Mapear el diseño a tokens

Antes de escribir JSX, hacer una pasada de mapeo:

- Cada color del Figma → ¿está en `design-system.md`? Si no, **detenerse y proponer el token al usuario**.
- Cada tamaño de fuente → ¿es uno de `text-display`, `text-h1`, ..., `text-eyebrow`?
- Cada espaciado → ¿es múltiplo de 4px alineado con la escala de Tailwind?
- Cada componente reutilizable (button, card, eyebrow) → ¿usa los componentes de `components/ui/` o `components/sections/`?

### Paso 5 — Implementar siguiendo la spec

Estructura del trabajo:

1. Crear/actualizar el archivo de página en `src/app/[locale]/[slug]/page.tsx`.
2. Crear secciones en `components/sections/[Nombre].tsx` si son específicas de la página.
3. Reutilizar componentes existentes (`Container`, `Button`, `CTABanner`, `StatsBar`).
4. Agregar las claves i18n en los 4 archivos de `messages/*.json` (usar el agente `i18n-translator` para traducir las nuevas claves).
5. Implementar animaciones SOLO según `docs/brand/motion.md`.

### Paso 6 — Verificar antes de cerrar

```bash
pnpm typecheck   # debe pasar sin errores
pnpm lint        # debe pasar
pnpm build       # debe completarse
```

Verificar visualmente:
- Abrir `pnpm dev` y comparar con el nodo de Figma.
- Probar en `/en`, `/es`, `/ru`, `/ar`.
- Verificar mobile (375px) y desktop (1280px+).
- Verificar que `prefers-reduced-motion: reduce` desactiva las animaciones.

## Reglas de output

✅ HACER:
- Server Components por defecto.
- Tokens del design system (`bg-navy-900`, `text-gold-500`, etc).
- Texto desde `useTranslations` de next-intl.
- Imágenes con `next/image` + alt + dimensions.
- Componentes < 200 líneas.

❌ NO HACER:
- Hex codes inline (`bg-[#0F2A44]`, `style={{ color: "#C9A14A" }}`).
- Texto hardcoded.
- `"use client"` sin razón documentada.
- Animaciones fuera de los patrones de `motion.md`.
- Crear nuevos tokens visuales sin actualizar `design-system.md` primero.

## Cuando algo no encaja

Si el Figma muestra algo que no encaja con el design system o con la spec:

1. Detenerse.
2. Documentar la discrepancia: "El Figma muestra X pero el design system dice Y".
3. Preguntar al usuario qué prefiere (extender el sistema o ajustar la implementación).
4. NO inventar la decisión.

## Variables disponibles

- `${CLAUDE_SKILL_DIR}` — path del skill
- `$ARGUMENTS` — node-id pasado al slash command

Estado actual del repositorio:
!`git status --short 2>/dev/null || echo "(no git status disponible)"`

Branch actual:
!`git branch --show-current 2>/dev/null || echo "(no branch info)"`
