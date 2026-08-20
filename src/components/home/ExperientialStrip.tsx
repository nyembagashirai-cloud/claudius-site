'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Media from '@/components/primitives/Media';
import type { Media as MediaType } from '@/lib/types';

const PANELS: { media: MediaType; tall?: boolean }[] = [
  { media: { alt: 'Roadshow in Bulawayo', kind: 'video', ratio: '16:9', tone: 'default', slot: 'Roadshow · Bulawayo' } },
  { media: { alt: 'Product sampling', ratio: '4:5', tone: 'teal', slot: 'Sampling · Opal' }, tall: true },
  { media: { alt: 'Retail activation', kind: 'video', ratio: '16:9', tone: 'ink', slot: 'Retail activation' } },
  { media: { alt: 'Exhibition build', ratio: '4:5', tone: 'default', slot: 'Exhibition build' }, tall: true },
  { media: { alt: 'Product launch', kind: 'video', ratio: '16:9', tone: 'teal', slot: 'Product launch' } },
  { media: { alt: 'Promoter team', ratio: '3:2', tone: 'ink', slot: 'Promoter team' } },
];

/**
 * Experiential is the differentiator, so it gets its own horizontal
 * movement: the section pins and the strip travels sideways on vertical
 * scroll. Under reduced motion it becomes a native horizontal scroller —
 * the same content, no hijacking.
 */
export default function ExperientialStrip() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // No scroll hijacking: the strip becomes an ordinary horizontal scroller.
      pin.style.overflowX = 'auto';
      pin.style.height = 'auto';
      pin.style.paddingBlock = 'var(--section)';
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      (window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;

      ctx = gsap.context(() => {
        const distance = () => Math.max(track.scrollWidth - window.innerWidth + 48, 0);
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });
      }, pin);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="overflow-hidden bg-paper text-ink" id="experiential" data-ground="light">
      <div ref={pinRef} className="flex h-[100svh] items-center overflow-hidden">
        <div ref={trackRef} className="exp-track">
          <div className="exp-lead">
            <p className="t-label mb-5 text-teal-700">04 — Experiential</p>
            <h2 className="exp-heading">
              WE DON’T
              <br />
              JUST PLAN IT.
              <br />
              WE SHOW UP
              <br />
              AND DO IT.
            </h2>
            <p className="t-body mt-6 text-graphite">
              Roadshows, sampling, retail promotions, launches, exhibitions and large-format
              installations — conceived in the studio, executed on the ground.
            </p>
          </div>

          {PANELS.map((panel, i) => (
            <div key={i} className={`exp-panel${panel.tall ? ' exp-panel-tall' : ''}`}>
              <Media media={panel.media} sizes="(max-width: 900px) 78vw, 40vw" />
            </div>
          ))}

          <div className="exp-panel exp-panel-outro">
            <h3 className="t-heading-m">
              Crowds. Product in hands.
              <br />
              Content that fuels the campaign.
            </h3>
            <Link href="/capabilities#experience" className="t-label link-underline mt-5 inline-block text-teal-700">
              See experiential capability →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
