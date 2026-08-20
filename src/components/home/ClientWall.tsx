'use client';

import { useRouter } from 'next/navigation';
import Marquee from '@/components/primitives/Marquee';
import Reveal from '@/components/primitives/Reveal';

/**
 * Clients as evidence, not decoration. Two counter-running rows; selecting
 * a name filters the work index to that client.
 */
export default function ClientWall({ clients }: { clients: string[] }) {
  const router = useRouter();
  const half = Math.ceil(clients.length / 2);

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

      <div className="-mx-[var(--margin)] space-y-[clamp(10px,1.6vh,22px)]">
        <Marquee items={clients.slice(0, half)} direction={-1} onSelect={open} />
        <Marquee items={clients.slice(half)} direction={1} duration={40} onSelect={open} />
      </div>
    </section>
  );
}
