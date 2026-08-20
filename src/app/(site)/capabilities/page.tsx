import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/primitives/Reveal';
import SplitLines from '@/components/primitives/SplitLines';
import StatementBand from '@/components/home/StatementBand';
import { capabilities } from '@/content/site';

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Strategy, brand, experience, digital, content and technology — the six capabilities ' +
    'Claudius & Co. uses to build brands and take them to market.',
  alternates: { canonical: '/capabilities' },
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="ground-ink wrap pb-[var(--section)] pt-[clamp(120px,20vh,220px)]" data-ground="dark">
        <p className="t-label mb-5 text-teal-300">Capabilities</p>
        <SplitLines
          as="h1"
          immediate
          className="t-display-xl max-w-[12ch]"
          lines={['WE MAKE', <span key="a" className="text-teal-300">BRANDS MOVE.</span>]}
        />
        <Reveal delay={200}>
          <p className="t-body-l mt-10 text-white/70">
            We don’t simply develop ideas. We bring them to market — and we are on the ground when
            they get there.
          </p>
        </Reveal>
      </section>

      <section className="bg-paper text-ink" data-ground="light">
        {capabilities.map((cap, i) => (
          <article key={cap.slug} id={cap.slug} className="capability-row wrap">
            <Reveal className="capability-index">
              <span className="t-index text-graphite">{String(i + 1).padStart(2, '0')}</span>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="capability-name">{cap.name}</h2>
              <p className="t-body-l mt-5 text-graphite">{cap.lead}</p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="capability-items">
                {cap.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </article>
        ))}
      </section>

      <StatementBand
        lines={['VIBRANT IDEAS.', 'PROFESSIONAL EXECUTION.']}
        accentFrom={1}
        ground="teal"
      />

      <section className="wrap bg-paper py-[var(--section)] text-ink" data-ground="light">
        <Reveal>
          <h2 className="t-display-l mb-8 max-w-[16ch]">See what these capabilities look like in market.</h2>
          <Link href="/work" className="btn btn-primary">
            View the work <span className="arrow">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
