# Quality Gates — Argentina Passport

> Verificaciones obligatorias antes de marcar cualquier tarea como terminada.
> Los agentes Codex ejecutan estos checks como gates atómicos.

## Gate 1 — Pre-flight (al recibir una tarea)

Antes de empezar a codear:

```bash
test -f package.json || { echo "✗ No estoy en la raíz del proyecto"; exit 1; }
test -d node_modules || pnpm install --frozen-lockfile
git status --porcelain  # registrar estado inicial
```

Si hay cambios sin commitear que no son tuyos: **detenerse y preguntar al desarrollador**.

## Gate 2 — Mid-task (cada vez que terminás un archivo)

Después de crear/modificar un archivo:

```bash
pnpm typecheck
```

Si falla: arreglar antes de seguir con el próximo archivo. NO acumular type errors.

## Gate 3 — Pre-commit (al terminar la implementación)

Los 3 checks deben pasar en este orden exacto:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

Si alguno falla:
- Arreglar el problema
- Re-correr el comando que falló
- Solo seguir cuando los 3 pasan

## Gate 4 — Verificación visual (manual, antes de PR)

El desarrollador debe verificar manualmente:

- [ ] `pnpm dev` levanta sin errores
- [ ] La página renderiza correctamente en `/en/[slug]`
- [ ] Cambio de idioma funciona (`/es`, `/ru`, `/ar`)
- [ ] `/ar` se ve coherente con RTL
- [ ] Mobile (375px en DevTools): nada se rompe
- [ ] DevTools `prefers-reduced-motion: reduce` desactiva las animaciones
- [ ] Lighthouse desktop > 95 (DevTools > Lighthouse > Performance)

## Gate 5 — Pre-deploy (antes de `vercel --prod`)

Además de los anteriores:

- [ ] Git status limpio (todo commiteado)
- [ ] Variables de entorno presentes en Vercel (`vercel env ls production`)
- [ ] Code review aprobado (correr el agente `code-reviewer`)
- [ ] Design review aprobado (correr el agente `design-reviewer`)
- [ ] i18n sincronizado en los 4 idiomas

```bash
node -e "
  const en = require('./messages/en.json');
  const flatten = (o, p='') => Object.entries(o).flatMap(([k,v]) =>
    typeof v === 'object' && v !== null ? flatten(v, p+k+'.') : [p+k]);
  const enKeys = new Set(flatten(en));
  ['es','ru','ar'].forEach(l => {
    const data = require('./messages/'+l+'.json');
    const keys = new Set(flatten(data));
    const missing = [...enKeys].filter(k => !keys.has(k));
    if (missing.length) { console.log(l + ': missing ' + missing.length); process.exit(1); }
  });
  console.log('✓ i18n sincronizado');
"
```

## Gate 6 — Post-deploy

Smoke tests automáticos contra producción:

```bash
PROD_URL=$(vercel ls --prod --limit 1 | tail -1 | awk '{print $2}')
for path in /en /es /ru /ar /en/about /en/services /en/process /en/investments /en/vips /en/contact; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "https://$PROD_URL$path")
  [ "$status" = "200" ] || { echo "✗ $path → $status"; exit 1; }
done
echo "✓ Todas las páginas responden 200"
```

Verificación manual post-deploy:

- [ ] Form de contacto funciona end-to-end (enviar uno real)
- [ ] El email llega a `info@argentinapassport.com`
- [ ] El email tiene `replyTo` correcto

## Definición de "terminado"

Una tarea está terminada cuando:

1. ✓ Pasa Gate 3 (typecheck + lint + build)
2. ✓ Cumple los criterios de aceptación de la spec correspondiente
3. ✓ Tiene los 4 idiomas sincronizados (si agregó claves)
4. ✓ Está commiteada con mensaje descriptivo
5. ✓ El reporte de output del agente lista todo lo anterior con ✓

NO está terminada si:
- ✗ Hay type errors "menores"
- ✗ Hay warnings de lint que "no importan"
- ✗ Las claves i18n están solo en EN
- ✗ Hay TODOs sin documentar
- ✗ El build pasa pero la página no se ve correctamente
