# AGENTS.md — Argentina Passport

> Este archivo es el equivalente de `CLAUDE.md` para Codex. Mismas reglas, formato adaptado al estándar Agent Skills (`agentskills.io`).

## Identidad del repositorio

- **Proyecto:** Argentina Passport (sitio institucional, marketing).
- **Cliente:** Argentina Passport (firma boutique de ciudadanía por inversión).
- **Diseñado por:** Synera.
- **Repositorio tipo:** sitio web estático multi-idioma con un único formulario de contacto.

## Stack canónico

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | Next.js 16 (App Router) | NO Pages Router |
| Lenguaje | TypeScript strict | `any` prohibido |
| Estilos | Tailwind CSS v4 | Sin shadcn/ui, sin CSS modules |
| i18n | next-intl | Subpath routing `/en /ru /ar /es` |
| Animación | motion/react | Uso medido (ver `docs/brand/motion.md`) |
| Email | Resend | Server Action, sin DB |
| Fuente | Helvetica self-hosted | `next/font/local` desde `/public/fonts/` |
| Deploy | Vercel | Via `vercel --prod` |
| Package manager | pnpm | NO npm, NO yarn |

## Comandos esenciales

```bash
pnpm dev          # dev server
pnpm build        # build de producción
pnpm typecheck    # verificación TS — debe pasar SIEMPRE antes de commit
pnpm lint         # ESLint
pnpm format       # Prettier
```

## Reglas no negociables

1. **Server Components por defecto.** Marcar `"use client"` solo cuando hay estado, evento o hook de browser. Justificarlo en un comentario al inicio del archivo.
2. **TypeScript strict.** `any` está prohibido. Usar `unknown` con narrowing.
3. **Named exports.** Excepciones: solo archivos que Next.js exige (`page.tsx`, `layout.tsx`, `route.ts`, `error.tsx`, `loading.tsx`, `not-found.tsx`).
4. **Tokens del design system.** Colores, espaciado y tipografía SOLO desde `docs/brand/design-system.md`. NUNCA hex codes ni px arbitrarios inline.
5. **Texto en componentes:** SIEMPRE traducido con `useTranslations` de next-intl. NUNCA hardcoded.
6. **Imágenes:** SIEMPRE `next/image` con `width`, `height` y `alt`.
7. **Form de contacto:** validación server-side con Zod obligatoria. Rate limiting obligatorio.

## Workflow obligatorio

Antes de modificar código:

1. Leer este archivo (`AGENTS.md`).
2. Leer `docs/brand/design-system.md`.
3. Leer `docs/specs/00-foundation.md`.
4. Leer la spec de la página específica (`docs/specs/01-home.md`, etc).

Antes de cerrar una tarea:

1. `pnpm typecheck` — debe pasar sin errores.
2. `pnpm lint` — debe pasar sin warnings nuevos.
3. `pnpm build` — debe completarse sin errores.
4. Verificar visualmente contra el nodo de Figma de la spec.

## Si una decisión no está documentada

**Detener la implementación y preguntar al desarrollador.** No inventar.

Casos típicos:
- "El diseño no muestra qué pasa cuando se selecciona el idioma RU/AR" → preguntar.
- "El form de contacto no especifica qué pasa si Resend falla" → ya está en `docs/specs/07-contact.md`. Si no estuviera, preguntar.
- "El diseño de Figma usa un color que no está en el design system" → preguntar antes de extender el sistema.

## Estructura del repositorio

Igual a la documentada en `CLAUDE.md`. Codex y Claude Code comparten exactamente la misma estructura.

## Subagentes y prompts (Codex CLI)

Este proyecto tiene infraestructura específica para Codex CLI en `.codex/`:

```
.codex/
├── README.md                # índice del setup
├── config.toml              # config global del proyecto
├── agents/                  # 4 agentes especializados (TOML)
│   ├── frontend-page.toml   # implementa páginas desde spec
│   ├── design-reviewer.toml # fidelidad visual + brandbook
│   ├── i18n-translator.toml # EN/ES/RU/AR sincronizados
│   └── code-reviewer.toml   # revisión técnica (read-only, high effort)
├── docs/                    # contexto que cargan los agentes
│   ├── architecture.md
│   ├── conventions.md
│   └── quality-gates.md
└── prompts/                 # orquestadores con gates humanos
    ├── implement-page.md    # implementación individual
    ├── full-page-cycle.md   # pipeline completo (5 sprints + gates)
    └── ship-checklist.md    # pre-deploy checklist
```

### Invocación

```bash
# Agente individual
codex exec --agent frontend-page "Implementá docs/specs/01-home.md"
codex exec --agent design-reviewer "Revisá la página Home"
codex exec --agent i18n-translator "Sincronizá messages/*.json"
codex exec --agent code-reviewer "Revisá los cambios desde main"

# Pipeline orquestador (recomendado para implementación completa)
codex exec --prompt .codex/prompts/full-page-cycle.md --var page=01-home

# Pre-deploy
codex exec --prompt .codex/prompts/ship-checklist.md
```

### Política por defecto

- **Aprobación:** `on-failure` (Codex pide permiso solo cuando algo falla o intenta acción destructiva)
- **Sandbox:** `workspace-write` (puede escribir en el repo, no fuera)
- **Modelo:** `gpt-5-codex` con `reasoning_effort = "medium"` (override por agente)

Para detalles completos, ver `.codex/README.md`.

## Setup equivalente para Claude Code

Si preferís usar Claude Code en vez de (o además de) Codex, hay un setup paralelo en `.claude/`:

```
.claude/
├── agents/                  # mismos 4 agentes en formato Claude Code
└── skills/                  # skills invocables como slash commands
    ├── figma-implement/
    ├── i18n/
    ├── contact-form/
    └── deploy/
```

Las **specs y design system son compartidos** — viven en `docs/specs/` y `docs/brand/`,
ambas infraestructuras leen desde ahí.

## Brandbook oficial

La identidad de marca está definida en `docs/brand/assets/Brandbook_Argentina_Passport.pdf`
(documento oficial de Synera). Sus reglas están extraídas y formalizadas en:

- `docs/brand/design-system.md` — paleta, tipografía, logo, componentes
- `docs/brand/voice.md` — voz de marca, tono, glosario por idioma
- `docs/brand/motion.md` — reglas de animación

**Ante cualquier duda sobre identidad:** el filtro del brandbook es **"¿esto comunica
premium y confianza?"**. Si la respuesta no es un sí inmediato, no aplica.

## Qué NO hacer (errores comunes de agentes)

- ❌ Empezar a codear sin leer la spec.
- ❌ Usar shadcn/ui (este proyecto NO lo usa).
- ❌ Hardcodear texto en lugar de claves de traducción.
- ❌ Crear componentes monolíticos > 200 líneas.
- ❌ Marcar todo como `"use client"` "por las dudas".
- ❌ Inventar colores o espaciados que no están en el design system.
- ❌ Hacer commit de `.env*` o keys.
