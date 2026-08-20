'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface SplitLinesProps {
  /** One entry per line. Kept explicit so line breaks are an editorial decision. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  /** Play immediately rather than on scroll (used by the hero). */
  immediate?: boolean;
}

/**
 * Mask reveal — each line rises from behind a clipping edge.
 * This is the site's signature heading entrance.
 */
export default function SplitLines({
  lines,
  as: Tag = 'h2',
  className = '',
  stagger = 80,
  delay = 0,
  immediate = false,
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (immediate) {
      const t = window.setTimeout(() => setShown(true), 40);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span
            style={{
              transform: shown ? 'translateY(0)' : 'translateY(105%)',
              transition: `transform 1100ms var(--ease) ${delay + i * stagger}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
