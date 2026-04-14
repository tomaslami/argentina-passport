# Argentina Passport — Sitio Web

Sitio institucional. Stack: Next.js 16 App Router + TypeScript strict + Tailwind v4 + next-intl + Resend. Deploy en Vercel.

## Comandos

- `pnpm dev` — dev server (puerto 3000)
- `pnpm build` — build de producción (correr antes de cada deploy)
- `pnpm typecheck` — verificación de tipos (debe pasar antes de commit)
- `pnpm lint` — ESLint
- `pnpm format` — Prettier
- `vercel --prod` — deploy a producción (usar el skill `/deploy`)

## Stack y convenciones

- **Server Components por defecto.** Solo marcar `"use client"` cuando se necesite estado, eventos o hooks del browser.
- **TypeScript strict mode.** NUNCA `any`. Usar `unknown` y narrowing.
- **Named exports.** NUNCA default exports (excepto archivos que Next.js exige: `page.tsx`, `layout.tsx`, `route.ts`, `error.tsx`, `loading.tsx`, `not-found.tsx`).
- **Tailwind v4.** Sin CSS custom salvo casos documentados en `docs/brand/design-system.md`. Sin shadcn/ui.
- **Animación:** `motion/react`. Uso medido — ver `docs/brand/motion.md`.
- **i18n:** `next-intl` con routing por subpath (`/en`, `/ru`, `/ar`, `/es`). Árabe es RTL.
- **Formulario:** Server Action + Resend. Sin DB.

## Estructura de carpetas

```
src/app/
├── [locale]/              # Routing i18n
│   ├── layout.tsx         # Locale layout (next-intl provider, dir RTL/LTR)
│   ├── page.tsx           # Home
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── process/page.tsx
│   ├── investments/page.tsx
│   ├── vips/page.tsx
│   └── contact/page.tsx
├── api/                   # Solo si es necesario (preferir Server Actions)
└── actions/
    └── contact.ts         # Server Action del formulario
components/
├── layout/                # Header, Footer, LocaleSwitcher
├── sections/              # Secciones reutilizables (Hero, CTABanner, StatsBar)
└── ui/                    # Primitivos (Button, Input, Container)
lib/
├── resend.ts              # Cliente Resend
├── i18n/                  # config de next-intl
└── utils.ts
messages/                  # Traducciones JSON
├── en.json
├── ru.json
├── ar.json
└── es.json
public/
├── fonts/                 # Helvetica self-hosted
└── images/
```

## Reglas de código

- **Componentes:** un componente por archivo. Nombre de archivo = nombre del componente en PascalCase (`Header.tsx`, `CTABanner.tsx`).
- **Tamaño:** si un componente pasa de 200 líneas, partirlo.
- **Server Actions:** archivo `src/app/actions/[feature].ts`. Validación con Zod. Nunca exponer secrets al cliente.
- **Imágenes:** usar siempre `next/image`. Imágenes en `public/images/[seccion]/`.
- **Fuentes:** Helvetica self-hosted, cargada con `next/font/local`. Configuración en `src/app/[locale]/layout.tsx`.
- **Colores y espaciado:** SOLO usar tokens de `docs/brand/design-system.md`. NUNCA hex codes inline.

## Reglas de seguridad

- **NUNCA hacer commit de:** `.env*`, `RESEND_API_KEY`, ni cualquier archivo con secrets.
- El form de contacto debe validar TODOS los campos en server-side (Zod). El client-side es solo UX.
- Rate limiting en el form de contacto (ver `docs/specs/07-contact.md`).
- Sanitizar el contenido del campo "message" antes de enviarlo por email.

## Workflow obligatorio para cualquier tarea

1. **Leer la spec correspondiente en `docs/specs/`** antes de tocar código.
2. **Leer `docs/brand/design-system.md`** si vas a tocar UI.
3. Si la tarea no tiene spec y toca más de un archivo: **detenerse y pedir una**.
4. Implementar siguiendo los criterios de aceptación de la spec.
5. Antes de marcar como terminado: `pnpm typecheck && pnpm lint && pnpm build`.

## Anti-patrones (rechazar siempre)

- Componentes con "use client" sin razón clara (estado, eventos, hooks de browser).
- Colores o tamaños hardcoded fuera del design system.
- Texto hardcoded en componentes (siempre usar `useTranslations` de next-intl).
- Default exports en archivos que no los exigen Next.
- `any` en TypeScript.
- CSS modules o styled-components (solo Tailwind).

## Referencias clave

@docs/brand/design-system.md
@docs/brand/voice.md
@docs/brand/motion.md
@docs/specs/00-foundation.md

**Brandbook oficial de Synera:** `docs/brand/assets/Brandbook_Argentina_Passport.pdf`.
Las reglas están extraídas en los `.md` de `docs/brand/`. Ante cualquier duda, consultar el PDF.

## Agentes y skills disponibles

- `/figma-implement` — implementar un nodo de Figma respetando el design system
- `/i18n` — agregar/actualizar claves de traducción en los 4 idiomas
- `/contact-form` — validar/extender el form de contacto
- `/deploy` — pipeline completo de deploy a Vercel

Subagentes:
- `frontend-page` — implementa páginas completas desde una spec
- `design-reviewer` — revisa fidelidad visual contra Figma
- `i18n-translator` — traduce y valida claves en EN/RU/AR/ES
- `code-reviewer` — revisión técnica independiente
