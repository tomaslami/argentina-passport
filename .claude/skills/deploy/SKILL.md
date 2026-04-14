---
name: deploy
description: |
  Pipeline completo de deploy a Vercel: typecheck, lint, build, validación de env vars,
  smoke tests, y deploy a producción. Usar cuando el usuario diga "deploy", "subir a
  producción", "publicar", "release". También para preview deploys (a una rama).

when_to_use: |
  Activar SOLO con invocación explícita del usuario. No auto-deployar. Es una acción
  con side effects en producción.

disable-model-invocation: true   # solo el usuario puede invocar /deploy

allowed-tools:
  - Bash(pnpm typecheck)
  - Bash(pnpm lint)
  - Bash(pnpm build)
  - Bash(pnpm test*)
  - Bash(vercel *)
  - Bash(git status)
  - Bash(git log *)
  - Bash(git diff *)
  - Read

argument-hint: "[preview | prod]"

version: "1.0.0"
---

# Deploy Skill

Pipeline de deploy a Vercel con verificaciones obligatorias.

## Reglas

1. **Nunca deployar con git status sucio.** Detener si hay cambios sin commitear.
2. **Nunca deployar sin que pasen typecheck + lint + build.**
3. **Nunca deployar a prod sin pasar primero por preview.**
4. **Pedir confirmación explícita antes de `vercel --prod`.**

## Procedimiento

### Paso 0 — Pre-flight checks

```bash
# Verificar que estamos en el directorio correcto
test -f package.json || { echo "✗ No estoy en la raíz del proyecto"; exit 1; }

# Verificar git limpio
git status --porcelain
# Si hay output, DETENER y pedir al usuario que commitee primero
```

### Paso 1 — Verificación local

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm build
```

Cualquier error: detener y reportar al usuario.

### Paso 2 — Verificar variables de entorno en Vercel

```bash
vercel env ls production
```

Verificar que existen:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

Si falta alguna, detener y pedir al usuario que las agregue:
```bash
vercel env add RESEND_API_KEY production
```

### Paso 3 — Preview deploy

```bash
vercel --yes
```

Capturar la URL del preview. Pedirle al usuario que verifique manualmente:

- [ ] Home `/en` carga sin errores.
- [ ] Cambio de idioma funciona (`/es`, `/ru`, `/ar`).
- [ ] El layout RTL en `/ar` se ve correctamente.
- [ ] El form de contacto se ve y se envía correctamente (probar con email real propio).
- [ ] El email del form llega a `info@argentinapassport.com`.
- [ ] Lighthouse desktop > 95.
- [ ] Todas las imágenes cargan.

**Esperar confirmación del usuario** antes de seguir.

### Paso 4 — Production deploy (solo con confirmación)

```bash
vercel --prod --yes
```

Capturar la URL de producción.

### Paso 5 — Smoke tests post-deploy

```bash
PROD_URL=$(vercel ls --prod --limit 1 | tail -1 | awk '{print $2}')

# Verificar que las páginas devuelven 200
for path in /en /es /ru /ar /en/about /en/services /en/process /en/investments /en/vips /en/contact; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "https://$PROD_URL$path")
  echo "$path → $status"
done
```

Todas deben devolver 200.

### Paso 6 — Reportar al usuario

Mensaje final con:
- URL de producción.
- Commit deployado (`git rev-parse --short HEAD`).
- Resultados de los smoke tests.
- Recordatorio: "Probá el form de contacto end-to-end al menos una vez después de cada deploy."

## Rollback

Si algo sale mal después del deploy:

```bash
# Listar deployments recientes
vercel ls --prod

# Promover el deployment anterior
vercel promote <DEPLOYMENT_URL_PREVIO> --prod
```

## Estado actual

Branch:
!`git branch --show-current 2>/dev/null || echo "(sin git)"`

Último commit:
!`git log -1 --oneline 2>/dev/null || echo "(sin git)"`

Cambios sin commitear:
!`git status --short 2>/dev/null || echo "(sin git)"`

Vercel CLI:
!`which vercel >/dev/null 2>&1 && vercel --version || echo "✗ Vercel CLI no instalado. Instalar con: pnpm add -g vercel"`
