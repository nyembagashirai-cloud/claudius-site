'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

/** A link that leans towards the cursor. Spring-damped, disabled on touch. */
export default function MagneticLink({
  href,
  children,
  className = '',
  strength = 0.25,
  radius = 60,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > r.width / 2 + radius) return;
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0,0)';
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transition: 'transform 500ms var(--ease)' }}
    >
      {children}
    </Link>
  );
}
