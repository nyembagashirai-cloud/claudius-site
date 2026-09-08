'use client';

import { useEffect, useRef } from 'react';

/**
 * Ties a marquee's speed to scroll velocity, so the row feels connected to
 * the page rather than looping in a world of its own. Returns the ref to
 * put on the animated track.
 *
 * Does nothing under `prefers-reduced-motion`; the CSS stops the animation
 * there anyway, and nudging its duration would be pointless work.
 */
export default function useMarqueeSpeed(duration: number) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let last = window.scrollY;
    let timer: number | undefined;
    const onScroll = () => {
      const v = Math.abs(window.scrollY - last);
      last = window.scrollY;
      const boost = Math.min(1 + v / 24, 5);
      track.style.animationDuration = `${duration / boost}s`;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        track.style.animationDuration = `${duration}s`;
      }, 180);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, [duration]);

  return trackRef;
}
