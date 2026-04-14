# Motion Guidelines — Argentina Passport

> Reglas de animación. Nivel: **medio**. Sutil, intencional, nunca decorativo.

---

## Filosofía

Esta es una marca premium e institucional. La animación debe transmitir **calma y precisión**, no entusiasmo. Cada animación debe tener un propósito funcional: dirigir atención, indicar transición, dar feedback.

**Si una animación no responde a la pregunta "¿qué problema resuelve?", no va.**

---

## Librería

`motion/react` (Framer Motion). Importar como:

```tsx
import { motion } from "motion/react";
```

NUNCA importar de `framer-motion` (paquete legacy).

---

## Curvas y duraciones canónicas

### Easing

```ts
// lib/motion.ts
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,        // entradas, scroll reveals
  inOut: [0.65, 0, 0.35, 1] as const,      // transiciones de estado
  spring: { type: "spring", damping: 22, stiffness: 180 } as const,
} as const;

export const duration = {
  fast: 0.2,    // hovers, micro-interacciones
  base: 0.4,    // entradas estándar
  slow: 0.7,    // entradas de hero, secciones grandes
  hero: 1.0,    // efectos de hero gigantes
} as const;
```

**Usar siempre estos tokens.** No inventar duraciones inline.

---

## Patrones aprobados

### 1. Scroll reveal (entrada de secciones)

Cuando una sección entra en viewport, fade + slide up sutil (16px).

```tsx
<motion.section
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: duration.base, ease: ease.out }}
>
```

Reglas:
- `once: true` siempre (no re-disparar al hacer scroll arriba).
- `margin: "-100px"` para que se dispare un poco antes de ser visible.
- NUNCA escalar (`scale`). Solo opacity + y.

### 2. Stagger en grids (cards numeradas, services)

Cuando hay 3+ items en grid, escalonar la entrada.

```tsx
const container = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
};

const item = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};
```

Stagger máximo: `0.1s`. Más alto se siente artificial.

### 3. Hero (Home + headers de páginas)

El título principal entra con un fade más lento. El "huge background text" entra con opacidad solamente, ligeramente después.

```tsx
<motion.h1
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: duration.slow, ease: ease.out, delay: 0.1 }}
>
```

```tsx
<motion.span  // background word
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.4 }}
  transition={{ duration: duration.hero, ease: ease.out, delay: 0.3 }}
>
```

### 4. Hover en botones y cards

CSS transitions (no motion). Más performante.

```tsx
<button className="transition-colors duration-200 hover:bg-gold-400">
<a className="transition-opacity duration-200 hover:opacity-80">
```

### 5. Page transitions

**No implementar en v1.** Si el cliente las pide después, evaluar.

### 6. Parallax

**No usar.** Confunde y rara vez se ve bien en mobile.

### 7. Counter animations en stats (`500K+`, `171`)

Cuando el `<StatsBar>` entra en viewport, los números cuentan desde 0. Usar `useMotionValue` + `useTransform`.

```tsx
import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";

function Counter({ to }: { to: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) animate(count, to, { duration: 1.2, ease: ease.out });
  }, [inView, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
```

---

## Performance

- **`prefers-reduced-motion`:** SIEMPRE respetar. Wrappear en utility:

```tsx
// lib/motion.ts
export function useReducedMotionSafe<T>(animated: T, reduced: T): T {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reduced : animated;
}
```

Implementación mínima en cada componente animado:

```tsx
const prefersReduced = useReducedMotion();
const animation = prefersReduced
  ? { opacity: 1, y: 0 }
  : { opacity: [0, 1], y: [16, 0] };
```

- **Evitar animar `width`, `height`, `top`, `left`.** Solo `opacity`, `transform`, `filter`.
- **`will-change`:** NO agregarlo manualmente. Framer Motion lo gestiona.
- **Lazy-load motion** en componentes que están below the fold con `dynamic` import si el bundle pesa.

---

## Anti-patrones (rechazar siempre)

- ❌ Bouncing, springs exagerados.
- ❌ Animar más de 2 propiedades a la vez (excepto `opacity` + `transform`).
- ❌ Loops infinitos (excepto un loader sutil si fuera necesario).
- ❌ Confetti, partículas, sparkles.
- ❌ Cursor trails, custom cursors elaborados.
- ❌ Texto que aparece letra por letra (typewriter) — pretencioso para esta marca.
- ❌ Animaciones > 1.2s.
- ❌ Animaciones que bloquean la interacción.

---

## Checklist antes de aceptar una animación

- [ ] Tiene un propósito claro (no es decorativa).
- [ ] Usa tokens de `lib/motion.ts` (no valores inline).
- [ ] Respeta `prefers-reduced-motion`.
- [ ] Solo anima `opacity` y/o `transform`.
- [ ] Duración ≤ 1.2s.
- [ ] Probada en mobile (60fps).
- [ ] Probada con scroll rápido (no se ve trabada).
