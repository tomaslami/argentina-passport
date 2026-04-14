# Argentina Passport — Sitio Web

> Sitio institucional para Argentina Passport, firma boutique de ciudadanía argentina por inversión.
> **Diseñado por Synera.**

---

## Para los agentes (Claude Code / Codex): leer primero

Este repositorio está diseñado para ser ejecutado por agentes de codificación.
**Antes de escribir una sola línea de código, leer en este orden:**

1. `CLAUDE.md` — la constitución del proyecto. Stack, comandos, reglas.
2. `AGENTS.md` — el equivalente para Codex. Mismas reglas, distinto formato.
3. `docs/brand/design-system.md` — la única fuente de verdad de tokens visuales.
4. `docs/specs/00-foundation.md` — arquitectura y decisiones globales.
5. La spec específica de la página en la que vas a trabajar (`docs/specs/01-home.md`, etc).

**Regla de oro:** si una decisión de implementación no está en una spec o en el design system, **no inventarla** — preguntarle al desarrollador.

---

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript strict
- **Estilos:** Tailwind CSS v4 (sin shadcn/ui)
- **i18n:** next-intl con routing por subpath (`/en`, `/ru`, `/ar`, `/es`)
- **Animación:** motion/react (Framer Motion) — uso medido, ver `docs/brand/motion.md`
- **Formulario:** Server Action + Resend (sin DB)
- **Deploy:** Vercel
- **Tipografía:** Helvetica (self-hosted desde `/public/fonts/`)
- **Package manager:** pnpm

---

## Estructura del repositorio

```
.
├── CLAUDE.md                          # Constitución para Claude Code
├── AGENTS.md                          # Constitución para Codex
├── README.md                          # Este archivo
├── .env.example
├── .gitignore
│
├── .claude/                           # Setup para Claude Code
│   ├── agents/                        # Subagentes especializados
│   │   ├── frontend-page.md
│   │   ├── design-reviewer.md
│   │   ├── i18n-translator.md
│   │   └── code-reviewer.md
│   └── skills/                        # Skills invocables como slash commands
│       ├── figma-implement/SKILL.md
│       ├── i18n/SKILL.md
│       ├── contact-form/SKILL.md
│       └── deploy/SKILL.md
│
├── .codex/                            # Setup para Codex CLI
│   ├── README.md
│   ├── config.toml                    # config global del proyecto
│   ├── agents/                        # 4 agentes en formato TOML
│   │   ├── frontend-page.toml
│   │   ├── design-reviewer.toml
│   │   ├── i18n-translator.toml
│   │   └── code-reviewer.toml
│   ├── docs/                          # contexto que cargan los agentes
│   │   ├── architecture.md
│   │   ├── conventions.md
│   │   └── quality-gates.md
│   └── prompts/                       # orquestadores con gates humanos
│       ├── implement-page.md
│       ├── full-page-cycle.md
│       └── ship-checklist.md
│
└── docs/
    ├── brand/
    │   ├── design-system.md           # Tokens, tipografía, logo, componentes
    │   ├── voice.md                   # Voz de marca, glosario por idioma
    │   ├── motion.md                  # Reglas de animación
    │   └── assets/
    │       └── Brandbook_Argentina_Passport.pdf  # Brandbook oficial
    └── specs/
        ├── 00-foundation.md           # arquitectura, layouts, i18n, RTL
        ├── 01-home.md
        ├── 02-about.md
        ├── 03-services.md
        ├── 04-process.md
        ├── 05-investments.md
        ├── 06-vips.md
        └── 07-contact.md
```

**Las specs y el brand system son compartidos.** Tanto Claude Code como Codex leen desde
`docs/specs/` y `docs/brand/`. Cambiá una vez, ambos agentes lo ven.

---

## Mapa de diseño en Figma

Cada spec referencia su nodo de Figma. Mapa completo:

| Página | Spec | Nodo Figma |
|--------|------|-----------|
| Home | `01-home.md` | `node-id=15-2` |
| About | `02-about.md` | `node-id=20-111` |
| Services | `03-services.md` | `node-id=20-134` |
| Process | `04-process.md` | `node-id=20-153` |
| Investments | `05-investments.md` | `node-id=20-172` |
| VIPs | `06-vips.md` | `node-id=20-191` |
| Contact | `07-contact.md` | `node-id=26-2` |

URL base: `https://www.figma.com/design/XS0ovLo47zgtAzYYiopcMN/Argentina-Passport`

---

## Workflow recomendado

### Para implementar una página nueva (Claude Code)

```bash
# Lanzar el agente especializado con la spec
> Lanzá el agente frontend-page con la spec docs/specs/01-home.md

# o usar el skill /figma-implement con el nodo específico
> /figma-implement node-id=15-2 page=home
```

### Para implementar una página nueva (Codex)

```bash
# Pipeline orquestador completo (recomendado)
codex exec --prompt .codex/prompts/full-page-cycle.md --var page=01-home

# O agente individual
codex exec --agent frontend-page "Implementá docs/specs/01-home.md"
```

### Para revisar una página completada

```bash
# Claude Code
> Lanzá el agente design-reviewer y code-reviewer en paralelo

# Codex
codex exec --agent design-reviewer "Revisá la página Home"
codex exec --agent code-reviewer "Revisá los cambios desde main"
```

### Para deployar

```bash
# Claude Code
> /deploy

# Codex
codex exec --prompt .codex/prompts/ship-checklist.md
```

---

## Estado del proyecto

- [ ] Setup inicial (Next.js + Tailwind + next-intl + Resend)
- [ ] Foundation (layouts, navegación, footer, design system implementado)
- [ ] Home
- [ ] About
- [ ] Services
- [ ] Process
- [ ] Investments
- [ ] VIPs
- [ ] Contact
- [ ] Traducciones EN/RU/AR/ES completas
- [ ] Lighthouse > 95 en todas las páginas
- [ ] Deploy a producción
