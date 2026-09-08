'use client';

import { useRouter } from 'next/navigation';
import LogoMarquee from '@/components/primitives/LogoMarquee';
import Marquee from '@/components/primitives/Marquee';
import Reveal from '@/components/primitives/Reveal';
import { clientLogos } from '@/content/site';

/**
 * Clients as evidence, not decoration.
 *
 * Two counter-running rows: the marks we hold artwork for, then the rest as
 * type. Every item leads somewhere — a mark to its case study, a name to the
 * work index filtered to that client — so the wall is a way into the work
 * rather than a badge collection.
 */
export default function ClientWall({ clients }: { clients: string[] }) {
  const router = useRouter();

  const withMark = new Set(clientLogos.map((l) => l.name));
  const words = clients.filter((c) => !withMark.has(c));

  const open = (client: string) => {
    router.push(`/work?client=${encodeURIComponent(client)}`);
  };

  return (
    <section className="wrap overflow-hidden bg-paper pb-[clamp(64px,9vh,120px)] pt-[var(--section)]" id="clients" data-ground="light">
      <div className="flex flex-wrap items-baseline justify-between gap-6 pb-[clamp(24px,4vh,40px)]">
        <Reveal>
          <p className="t-label mb-4 text-teal-700">06 — Clients</p>
          <h2 className="t-display-l">
            THE BRANDS
            <br />
            WE BUILD WITH.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="t-body max-w-[34ch] text-graphite">
            A Zimbabwean creative and marketing agency combining strategy, creativity,
            technology and on-ground execution to build brands that matter.
          </p>
        </Reveal>
      </div>

      <div className="-mx-[var(--margin)] space-y-[clamp(14px,2.4vh,30px)]">
        <LogoMarquee logos={clientLogos} direction={-1} />
        {words.length > 0 ? <Marquee items={words} direction={1} duration={40} onSelect={open} /> : null}
      </div>
    </section>
  );
}
