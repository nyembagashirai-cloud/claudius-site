'use client';

import { useEffect, useRef } from 'react';
import SplitLines from '@/components/primitives/SplitLines';
import Media from '@/components/primitives/Media';
import type { Media as MediaType } from '@/lib/types';

const TILES: { media: MediaType; className: string; depth: number }[] = [
  {
    media: {
      src: '/images/medtech/roadshow-stage.jpg',
      alt: 'Dancers performing on a branded roadshow stage',
      ratio: '4:5',
      slot: 'Roadshow · stage',
    },
    className: 'ht ht-1',
    depth: 26,
  },
  {
    media: {
      src: '/images/opal/pack-2kg.png',
      fit: 'contain',
      alt: 'The Opal washing powder pack',
      ratio: '4:5',
      slot: 'Opal · packaging',
    },
    className: 'ht ht-2',
    depth: 46,
  },
  {
    media: {
      src: '/images/medtech/retail-activation.jpg',
      alt: 'Branded activation gazebos outside a retail store',
      ratio: '16:9',
      slot: 'Retail activation',
    },
    className: 'ht ht-3',
    depth: 34,
  },
  {
    media: {
      src: '/images/icz-591/591-lockup.png',
      fit: 'contain',
      alt: 'The ICZ 591 toll-free emergency line campaign lockup',
      ratio: '3:2',
      slot: '591 · campaign',
    },
    className: 'ht ht-4',
    depth: 18,
  },
];

/**
 * The opening five seconds. Enormous type, a montage of the work drifting
 * behind it on both cursor and scroll, and nothing else.
 */
export default function Hero() {
  const montageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = montageRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const tiles = Array.from(root.querySelectorAll<HTMLElement>('.ht'));
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      const scroll = Math.min(window.scrollY, window.innerHeight) / window.innerHeight;
      for (const tile of tiles) {
        const d = Number(tile.dataset.depth ?? 20);
        tile.style.transform =
          `translate3d(${cx * d}px, ${cy * d * 0.6 - scroll * d * 1.6}px, 0)`;
      }
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
    <section
      className="hero relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-[var(--margin)] pb-[clamp(28px,5vh,56px)]"
      data-ground="light"
    >
      <div ref={montageRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {TILES.map((t) => (
          <div key={t.className} className={t.className} data-depth={t.depth}>
            <Media media={t.media} sizes="(max-width: 900px) 50vw, 25vw" />
          </div>
        ))}
      </div>

      <div className="relative z-[2]">
        <p className="t-label mb-[clamp(18px,3vh,34px)] text-teal-700">
          Harare · Zimbabwe — Integrated creative &amp; marketing
        </p>

        <SplitLines
          as="h1"
          immediate
          delay={550}
          className="hero-headline mb-[clamp(24px,4vh,44px)]"
          lines={[
            'WE BUILD BRANDS',
            'FROM IDEA',
            <span key="tm" className="text-teal-700">TO MARKET.</span>,
          ]}
        />

        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-ink/15 pt-[18px]">
          <p className="max-w-[38ch] text-[clamp(.95rem,1.15vw,1.125rem)] leading-[1.5] text-graphite">
            Strategy, brand, packaging, experiential, content and digital — conceived,
            produced and executed on the ground.
          </p>
          <div className="flex items-center gap-2.5">
            <span className="t-index text-graphite">Scroll</span>
            <span className="scroll-cue" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
