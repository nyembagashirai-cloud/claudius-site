'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { nav } from '@/content/site';

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div className="mobile-menu" data-open={open} aria-hidden={!open}>
      <button
        type="button"
        onClick={onClose}
        className="t-label absolute right-[var(--margin)] top-6"
        tabIndex={open ? 0 : -1}
      >
        Close ✕
      </button>
      {nav.map((item) => (
        <Link key={item.href} href={item.href} onClick={onClose} tabIndex={open ? 0 : -1}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
