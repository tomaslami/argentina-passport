# Codex Setup — Argentina Passport

Este directorio contiene la configuración de **Codex CLI** (`openai/codex`) para el proyecto. Es el equivalente de `.claude/` para Codex.

## Estructura

```
.codex/
├── README.md                          # este archivo
├── config.toml                        # config global del proyecto para Codex CLI
├── agents/                            # agentes especializados (TOML)
│   ├── frontend-page.toml
│   ├── design-reviewer.toml
│   ├── i18n-translator.toml
│   └── code-reviewer.toml
├── docs/                              # contexto que cargan los agentes
│   ├── architecture.md
│   ├── conventions.md
│   └── quality-gates.md
└── prompts/                           # prompts orquestadores
    ├── implement-page.md
    ├── ship-checklist.md
    └── full-page-cycle.md
```

## Equivalencia con `.claude/`

| Propósito | Claude Code | Codex CLI |
|-----------|-------------|-----------|
| Constitución del proyecto | `CLAUDE.md` (raíz) | `AGENTS.md` (raíz) + `.codex/docs/` |
| Subagentes especializados | `.claude/agents/*.md` | `.codex/agents/*.toml` |
| Slash commands / skills | `.claude/skills/*/SKILL.md` | Prompts en `.codex/prompts/*.md` |
| Config de modelo / aprobaciones | inline en frontmatter | `.codex/config.toml` + por-agente |

Las reglas, decisiones y especificaciones técnicas son **idénticas** entre ambos setups — viven en `docs/specs/` y `docs/brand/`, que ambos agentes leen.

## Cómo invocar agentes con Codex CLI

```bash
# Implementar una página
codex exec --agent frontend-page "Implementá docs/specs/01-home.md"

# Revisar fidelidad visual
codex exec --agent design-reviewer "Revisá la página Home contra docs/specs/01-home.md"

# Sincronizar i18n
codex exec --agent i18n-translator "Sincronizá messages/*.json"

# Revisión técnica
codex exec --agent code-reviewer "Revisá los cambios desde main"
```

O usar un prompt orquestador que combina varios agentes:

```bash
codex exec --prompt .codex/prompts/full-page-cycle.md \
  --var page=01-home
```

## Política de aprobaciones

Por defecto: **`on-failure`** — Codex ejecuta autónomamente y solo pide aprobación cuando un comando falla o cuando intenta una acción destructiva.

Override por agente en su `.toml` correspondiente.

## Sandbox

Por defecto: **`workspace-write`** — Codex puede escribir dentro del repositorio pero no fuera. Comandos de red están restringidos a los necesarios (`pnpm install`, `vercel`).

## Modelo

Default: **`gpt-5-codex`** con `reasoning_effort = "medium"`.

Override por tarea:
- `code-reviewer` → `high` effort (necesita razonar profundo).
- `i18n-translator` → `medium` effort.
- `frontend-page` → `medium` effort.
- `design-reviewer` → `medium` effort.
