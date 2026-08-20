export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const EASE_IO = 'cubic-bezier(0.65, 0, 0.35, 1)';

export const DUR = { micro: 180, std: 600, cine: 1200 } as const;

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
