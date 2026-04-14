import { useReducedMotion } from "motion/react";

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: { type: "spring", damping: 22, stiffness: 180 } as const,
} as const;

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  hero: 1.0,
} as const;

export function useReducedMotionSafe<T>(animated: T, reduced: T) {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reduced : animated;
}