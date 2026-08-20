'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/content/site';
import MobileMenu from './MobileMenu';

/**
 * Fixed header. Two behaviours:
 *  1. It swaps between the standard and reversed logo (and link colour)
 *     depending on the ground colour of the section behind it.
 *  2. It hides on scroll-down past 20vh and returns on scroll-up.
 */
export default function Header() {
  const pathname = usePathname();
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > window.innerHeight * 0.2 && y > last);
      last = y;

      // Ground detection: whichever [data-ground] section sits under the header.
      const probe = document.elementsFromPoint(24, 40);
      const section = probe.find((n) => (n as HTMLElement).dataset?.ground) as HTMLElement | undefined;
      if (section) setMode(section.dataset.ground === 'dark' ? 'dark' : 'light');
    };

    const initial = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return (
    <>
      <header className="site-header" data-mode={mode} data-hidden={hidden && !menuOpen}>
        <Link href="/" className="header-logo" aria-label={`Claudius & Co. — home`}>
          <Image
            src="/brand/claudius-logo.png"
            alt="Claudius & Co."
            width={760}
            height={110}
            priority
            className="logo-standard h-auto w-full"
          />
          <Image
            src="/brand/claudius-logo-reversed.png"
            alt=""
            aria-hidden
            width={760}
            height={110}
            priority
            className="logo-reversed h-auto w-full"
          />
        </Link>

        <nav className="flex items-center gap-[clamp(18px,2.6vw,42px)]" aria-label="Primary">
          <div className="nav-desktop flex items-center gap-[clamp(18px,2.6vw,42px)]">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link t-label"
                aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary">
              Start a project <span className="arrow">↗</span>
            </Link>
          </div>

          <button
            type="button"
            className="burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <i />
            <i />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
