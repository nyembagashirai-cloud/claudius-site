'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** ms of delay before this element starts. */
  delay?: number;
  /** px travelled on the y axis. */
  distance?: number;
  as?: ElementType;
  className?: string;
  /** Fraction of the element that must be visible before it fires. */
  threshold?: number;
}

/**
 * Rise + fade, once, at 20% viewport entry.
 * Uses IntersectionObserver + CSS transitions — no animation library on the
 * critical path, and it degrades to "already visible" without JS.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 24,
  as: Tag = 'div',
  className = '',
  threshold = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${distance}px)`,
        transition: `opacity 900ms var(--ease) ${delay}ms, transform 900ms var(--ease) ${delay}ms`,
        willChange: shown ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
