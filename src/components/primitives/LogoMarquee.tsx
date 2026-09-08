'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ClientLogo } from '@/content/site';
import useMarqueeSpeed from './useMarqueeSpeed';

interface LogoMarqueeProps {
  logos: ClientLogo[];
  direction?: 1 | -1;
  /** Seconds for one full pass. */
  duration?: number;
}

/**
 * The client marks, running as a continuous row.
 *
 * Each mark sits desaturated until it is reached, then resolves to full
 * colour — thirteen brand palettes shouting at once is noise, and the
 * restraint is what makes the row read as evidence rather than decoration.
 * Every mark is a link: to its case study where there is one, otherwise to
 * the work index filtered to that client.
 */
export default function LogoMarquee({ logos, direction = -1, duration = 46 }: LogoMarqueeProps) {
  const trackRef = useMarqueeSpeed(duration);

  // Tripled so the loop never shows an edge.
  const loop = [...logos, ...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ animation: `marquee-${direction === -1 ? 'l' : 'r'} ${duration}s linear infinite` }}
      >
        {loop.map((logo, i) => {
          const real = i < logos.length;
          return (
            <Link
              key={i}
              href={
                logo.project
                  ? `/work/${logo.project}`
                  : `/work?client=${encodeURIComponent(logo.name)}`
              }
              className="client-mark"
              tabIndex={real ? 0 : -1}
              aria-hidden={!real}
              title={logo.name}
            >
              <Image
                src={logo.src}
                alt={real ? logo.name : ''}
                width={880}
                height={320}
                sizes="(max-width: 700px) 34vw, 210px"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
