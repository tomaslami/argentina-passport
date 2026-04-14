# Prompt: ship-checklist

> Pipeline de pre-deploy: verifica que todo está listo para producción antes de
> ejecutar `vercel --prod`.
> Invocación: `codex exec --prompt .codex/prompts/ship-checklist.md`

---

## Filosofía

Este prompt NO deploya por sí solo. Genera un checklist verificable y muestra
el estado actual de cada item. El desarrollador decide cuándo correr `vercel --prod`.

---

## Sprint 1 — Estado del repositorio

```bash
echo "=== Branch actual ==="
git branch --show-current

echo "=== Último commit ==="
git log -1 --oneline

echo "=== Cambios sin commitear ==="
git status --porcelain

echo "=== Diferencia con main ==="
git rev-list --count main..HEAD
```

**🛑 Si hay cambios sin commitear: BLOQUEAR. Pedir al dev que commitee primero.**

---

## Sprint 2 — Verificación de build

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm build
```

Cada uno debe pasar. Si alguno falla: STOP.

Capturar métricas del build:

```bash
pnpm build 2>&1 | grep -E "First Load JS|kB|Route" | head -20
```

Reportar:
- Páginas generadas (debe ser 7 × 4 idiomas = 28 + extras)
- First Load JS por ruta (debe ser < 200 KB para ser saludable)

---

## Sprint 3 — Validación de i18n

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
    if (missing.length) { ok = false; console.log(l + ' missing ' + missing.length + ' keys'); }
    else console.log(l + ' ✓');
  });
  if (!ok) process.exit(1);
"
```

Si falla: STOP. Invocar `i18n-translator` para resolver.

---

## Sprint 4 — Code review automático

```bash
codex exec --agent code-reviewer "Revisá toda la branch actual contra main. Reportá P0/P1 si existen."
```

**🛑 GATE:** si reporta P0/P1, BLOQUEAR el deploy.

---

## Sprint 5 — Verificación de seguridad

```bash
echo "=== Buscar secrets en código ==="
git ls-files | xargs grep -l "RESEND_API_KEY\s*=\s*['\"]re_" 2>/dev/null && { echo "✗ SECRET EN CÓDIGO"; exit 1; } || echo "✓ Sin secrets en código"

echo "=== .env.local en .gitignore ==="
git check-ignore .env.local && echo "✓" || { echo "✗ .env.local NO está en .gitignore"; exit 1; }

echo "=== .env.example commiteado ==="
git ls-files .env.example | grep -q . && echo "✓" || echo "⚠️ .env.example no commiteado"
```

---

## Sprint 6 — Verificación de Vercel

```bash
which vercel >/dev/null 2>&1 || { echo "✗ Vercel CLI no instalado"; exit 1; }

echo "=== Variables de entorno en producción ==="
vercel env ls production 2>/dev/null
```

Verificar que existen:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

Si falta alguna: STOP. Pedir al dev que las agregue:
```bash
vercel env add RESEND_API_KEY production
```

---

## Sprint 7 — Preview deploy

```bash
echo "Lanzando preview deploy..."
vercel --yes 2>&1 | tee /tmp/vercel-preview.log
PREVIEW_URL=$(grep -oE 'https://[a-z0-9-]+\.vercel\.app' /tmp/vercel-preview.log | head -1)
echo "Preview URL: $PREVIEW_URL"
```

**🛑 GATE 7 — verificación humana:**

Pedirle al desarrollador que verifique manualmente en `$PREVIEW_URL`:

- [ ] Home `/en` carga correctamente
- [ ] Cambio de idioma funciona (`/es`, `/ru`, `/ar`)
- [ ] `/ar` se ve coherente con RTL
- [ ] Form de contacto se ve y se envía (probar con email propio)
- [ ] El email del form llega a `info@argentinapassport.com`
- [ ] Lighthouse desktop > 95
- [ ] Lighthouse mobile > 90

**Esperar confirmación explícita** antes de continuar a producción.

---

## Sprint 8 — Production deploy

Solo después de aprobación humana del Sprint 7:

```bash
vercel --prod --yes 2>&1 | tee /tmp/vercel-prod.log
PROD_URL=$(grep -oE 'https://[a-z0-9-]+\.vercel\.app' /tmp/vercel-prod.log | head -1)
echo "Production URL: $PROD_URL"
```

---

## Sprint 9 — Smoke tests post-deploy

```bash
for path in /en /es /ru /ar /en/about /en/services /en/process /en/investments /en/vips /en/contact; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "https://${PROD_URL}${path}")
  if [ "$status" = "200" ]; then
    echo "✓ $path → 200"
  else
    echo "✗ $path → $status"
  fi
done
```

Todas deben devolver 200.

---

## Reporte final

```markdown
## Ship Report — $(date +%Y-%m-%d)

**Branch:** [branch]
**Commit:** [hash]
**Production URL:** [url]

### Resultados
- Sprint 1 (repo state): ✓
- Sprint 2 (build): ✓
- Sprint 3 (i18n): ✓
- Sprint 4 (code review): ✓
- Sprint 5 (security): ✓
- Sprint 6 (vercel envs): ✓
- Sprint 7 (preview): ✓ (aprobado por dev)
- Sprint 8 (production): ✓
- Sprint 9 (smoke tests): ✓

### Métricas
- First Load JS: XX kB
- Páginas generadas: 28
- Tiempo de build: X.X s

### Recordatorios para el dev
- Probar el form de contacto end-to-end al menos una vez después de cada deploy
- Si algo falla, rollback con: `vercel promote <DEPLOYMENT_URL_PREVIO> --prod`
```

---

## Rollback

Si algo sale mal después del deploy:

```bash
# Listar deployments recientes
vercel ls --prod

# Promover el deployment anterior
vercel promote <DEPLOYMENT_URL_PREVIO> --prod
```
