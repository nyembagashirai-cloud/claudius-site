'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scrolling at lerp 0.09 — enough to feel considered,
 * not enough to feel like the page is fighting the wheel.
 * Disabled entirely under prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.6 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Keep GSAP ScrollTrigger (used by the pinned sections) in step.
    const sync = () => {
      const st = (window as unknown as { ScrollTrigger?: { update: () => void } }).ScrollTrigger;
      st?.update();
    };
    lenis.on('scroll', sync);

    return () => {
      cancelAnimationFrame(frame);
      lenis.off('scroll', sync);
      lenis.destroy();
    };
  }, []);

  return null;
}
