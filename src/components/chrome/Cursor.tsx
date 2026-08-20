'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor. A small difference-blended dot normally; over anything
 * carrying `data-cursor` it expands into a teal disc with a label.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let px = tx;
    let py = ty;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor]');
      setLabel(target ? (target as HTMLElement).dataset.cursor ?? null : null);
    };

    const tick = () => {
      px += (tx - px) * 0.18;
      py += (ty - py) * 0.18;
      el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" data-state={label ? 'label' : 'dot'} aria-hidden>
      <span>{label}</span>
    </div>
  );
}
