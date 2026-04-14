# Prompt: full-page-cycle

> Pipeline completo: implementar página + i18n + reviews + commit, con gates humanos
> entre sprints y atomic verification por sprint.
> Invocación: `codex exec --prompt .codex/prompts/full-page-cycle.md --var page=01-home`

---

## Variables esperadas

- `${page}` — slug de la spec (ej: `01-home`)

---

## Filosofía

Este es el patrón de "orchestrator con gates humanos" que aprendiste en Synera CRM.
**Cada sprint debe pasar verificación atómica antes de continuar al siguiente.**

Si un sprint falla, no avanzás al próximo — reportás y esperás decisión humana.

---

## Sprint 0 — Setup & sanity check

```bash
test -f docs/specs/${page}.md || { echo "✗ La spec no existe"; exit 1; }
test -f docs/brand/design-system.md || { echo "✗ Design system no encontrado"; exit 1; }
test -d node_modules || pnpm install --frozen-lockfile

# Verificar que la foundation está implementada
test -f src/app/[locale]/layout.tsx || { echo "⚠️ Foundation no implementada — ejecutar primero spec 00"; exit 1; }
test -f i18n/routing.ts || { echo "⚠️ next-intl no configurado"; exit 1; }

# Estado inicial limpio
git status --porcelain | head -5
```

**🛑 GATE 0:** si algo falla acá, detenerse y reportar al desarrollador.

---

## Sprint 1 — Implementación

Invocar agente `frontend-page`:

```bash
codex exec --agent frontend-page "Implementá docs/specs/${page}.md. Reportá al final: archivos creados, componentes reutilizados vs nuevos, y claves i18n agregadas."
```

### Verificación atómica del Sprint 1

```bash
pnpm typecheck && pnpm lint && pnpm build
```

Si falla cualquiera: STOP. Reportar. Esperar decisión humana.

**🛑 GATE 1:** mostrar al desarrollador:
- Lista de archivos modificados (`git diff --stat`)
- Output del agente
- Resultado de los 3 checks

Esperar confirmación: ¿continuar con i18n o hay que ajustar la implementación?

---

## Sprint 2 — i18n

Invocar agente `i18n-translator`:

```bash
codex exec --agent i18n-translator "Sincronizá las claves nuevas agregadas en este branch. Propagá EN → ES/RU/AR respetando glosario."
```

### Verificación atómica del Sprint 2

```bash
node -e "
  const en = require('./messages/en.json');
  const flatten = (o, p='') => Object.entries(o).flatMap(([k,v]) =>
    typeof v === 'object' && v !== null ? flatten(v, p+k+'.') : [p+k]);
  const enKeys = new Set(flatten(en));
  let ok = true;
  ['es','ru','ar'].forEach(l => {
    const data = require('./messages/'+l+'.json');
    const keys = new Set(flatten(data));
    const missing = [...enKeys].filter(k => !keys.has(k));
    const extra = [...keys].filter(k => !enKeys.has(k));
    if (missing.length || extra.length) {
      ok = false;
      console.log(l + ' missing=' + missing.length + ' extra=' + extra.length);
    } else {
      console.log(l + ' ✓');
    }
  });
  if (!ok) process.exit(1);
"

pnpm build  # debe pasar sin warnings de next-intl
```

Si falla: STOP. Volver al traductor a resolver.

---

## Sprint 3 — Reviews paralelos

Estos dos agentes pueden correr en paralelo (no tocan código, son read-only):

```bash
# En terminal 1 o background
codex exec --agent design-reviewer "Revisá docs/specs/${page}.md contra el código actual y el Figma node correspondiente." > /tmp/design-review.md &

# En terminal 2 o background
codex exec --agent code-reviewer "Revisá los cambios desde main." > /tmp/code-review.md &

wait
```

### Verificación atómica del Sprint 3

Inspeccionar ambos reportes:

```bash
echo "=== Design Review ==="
cat /tmp/design-review.md

echo "=== Code Review ==="
cat /tmp/code-review.md
```

**🛑 GATE 3:** mostrar al desarrollador ambos reportes consolidados.

Si hay P0/P1: STOP. Volver a Sprint 1 con los issues a resolver.
Si hay solo P2/P3: pedir decisión — ¿commitear o pulir?
Si todo conforme: continuar.

---

## Sprint 4 — Commit

Solo si Sprint 3 pasó con aprobación humana:

```bash
git diff --stat
git diff
```

**🛑 GATE 4:** confirmación final del desarrollador antes de commitear.

```bash
git add .
git commit -m "feat(${page}): implement page following spec

- Implements docs/specs/${page}.md
- Adds i18n keys for EN/ES/RU/AR
- Reviews approved (design + code)
"
```

---

## Sprint 5 — Reporte final

Generar reporte ejecutivo:

```markdown
## ${page} — Implementation Report

**Sprint 0 — Setup:** ✓
**Sprint 1 — Implementation:** ✓ (X files, Y components reused, Z new)
**Sprint 2 — i18n:** ✓ (N keys translated to ES/RU/AR)
**Sprint 3 — Reviews:** ✓ (design: APROBADO, code: APROBADO)
**Sprint 4 — Commit:** ✓ (commit hash: abc1234)

### Pendientes para el dev
- [ ] Subir imágenes a public/images/${page}/ (lista de paths)
- [ ] Verificar visualmente en preview deploy

### Próximo paso sugerido
codex exec --prompt .codex/prompts/implement-page.md --var page=02-about
```

---

## Reglas anti-fallo

- **Nunca avanzar al próximo sprint si el actual falló.**
- **Nunca saltar gates humanos.**
- **Nunca hacer commit sin que pasen los 3 checks (typecheck + lint + build).**
- **Nunca pushear sin confirmación explícita del desarrollador.**
- **Si un agente reporta P0/P1, el pipeline se DETIENE.**
