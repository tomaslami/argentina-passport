# Prompt: implement-page

> Usar para implementar una página individual del sitio.
> Invocación: `codex exec --prompt .codex/prompts/implement-page.md --var page=01-home`

---

## Variables esperadas

- `${page}` — slug de la spec (ej: `01-home`, `02-about`, `07-contact`)

## Tarea

Implementá la página descrita en `docs/specs/${page}.md` siguiendo el siguiente procedimiento estricto:

### Sprint 1 — Preparación (5 min)

1. Leé en este orden:
   - `AGENTS.md`
   - `.codex/docs/architecture.md`
   - `.codex/docs/conventions.md`
   - `.codex/docs/quality-gates.md`
   - `docs/brand/design-system.md`
   - `docs/brand/motion.md`
   - `docs/specs/00-foundation.md` (si no fue implementado, **DETENERSE** y avisar)
   - `docs/specs/${page}.md`

2. Auditá componentes existentes:
   ```bash
   ls components/ui/ components/sections/ components/layout/ 2>/dev/null
   ```

3. Listá los componentes que vas a reutilizar y los que vas a crear nuevos.

**🛑 GATE — esperar aprobación humana antes de continuar.**

### Sprint 2 — Implementación (sin gates internos)

Invocá al agente `frontend-page` con el contexto cargado:

```bash
codex exec --agent frontend-page "Implementá docs/specs/${page}.md siguiendo todas las reglas de tus instrucciones."
```

El agente:
- Crea el archivo `src/app/[locale]/[slug]/page.tsx`
- Crea componentes específicos en `components/sections/`
- Agrega claves i18n a `messages/en.json`
- Verifica con `pnpm typecheck && pnpm lint && pnpm build`

### Sprint 3 — i18n (paralelo a Sprint 4)

Invocá al agente `i18n-translator`:

```bash
codex exec --agent i18n-translator "Sincronizá las claves nuevas agregadas a messages/en.json. Propagá a es/ru/ar respetando glosario."
```

### Sprint 4 — Reviews (paralelo a Sprint 3)

Invocá ambos reviewers:

```bash
codex exec --agent design-reviewer "Revisá la implementación de docs/specs/${page}.md contra Figma node-id correspondiente."
codex exec --agent code-reviewer "Revisá los cambios desde main para esta página."
```

**🛑 GATE — esperar aprobación humana antes de mergear/commitear.**

### Sprint 5 — Cierre

Si los reviewers no encontraron P0/P1 bloqueantes:

1. Mostrar diff final:
   ```bash
   git diff --stat
   git diff
   ```

2. Esperar confirmación humana antes de:
   ```bash
   git add .
   git commit -m "feat(${page}): implement page following spec"
   ```

## Output esperado del prompt

Reporte final con:
- Archivos creados/modificados
- Componentes nuevos vs reutilizados
- Claves i18n agregadas (cantidad por idioma)
- Resultado de cada gate (✓ / ✗)
- Resumen del design review
- Resumen del code review
- Recomendación final: COMMITEAR / AJUSTAR / RECHAZAR

## Detenerse y preguntar si

- La spec no existe o está incompleta
- El Figma muestra algo que no está en el design system
- Algún gate falla y la causa no es obvia
- Hay que introducir una nueva dependencia
