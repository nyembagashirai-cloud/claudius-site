import type { Metadata } from 'next';
import Link from 'next/link';
import Media from '@/components/primitives/Media';
import Reveal from '@/components/primitives/Reveal';
import SplitLines from '@/components/primitives/SplitLines';
import ApproachSequence from '@/components/home/ApproachSequence';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Claudius & Co. is a Zimbabwean creative and marketing agency combining strategy, creativity, ' +
    'technology and on-ground execution to build brands that matter.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className="ground-ink wrap pb-[clamp(56px,10vh,120px)] pt-[clamp(120px,20vh,220px)]" data-ground="dark">
        <p className="t-label mb-5 text-teal-300">About</p>
        <SplitLines as="h1" immediate className="t-display-xl max-w-[13ch]" lines={['WE’RE', 'CLAUDIUS & CO.']} />
        <Reveal delay={220}>
          <p className="t-body-l mt-10 max-w-[46ch] text-white/80">{site.description}</p>
        </Reveal>
      </section>

      <section className="ground-ink" data-ground="dark">
        <div className="about-media">
          <Media media={{ alt: 'The Claudius & Co. team on an activation', ratio: '21:9', tone: 'teal', slot: 'Team · on the ground' }} sizes="100vw" />
        </div>
      </section>

      <section className="ground-ink wrap py-[var(--section)]" data-ground="dark">
        <div className="case-columns">
          <Reveal>
            <h2 className="t-display-l mb-7 max-w-[14ch]">We don’t simply develop ideas.</h2>
            <p className="t-display-l text-teal-300">We bring them to market.</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body mb-5 text-white/70">
              We are a vibrant and youthful marketing firm that combines the energy of youth with the
              wisdom of experience. Our approach is rooted in a deep understanding of market trends,
              consumer behaviour and the power of branding.
            </p>
            <p className="t-body mb-5 text-white/70">
              What separates us is execution. We conceive campaigns and then physically deliver them —
              promoters, production, retail, roadshows, exhibitions — wherever the consumer is.
            </p>
            <p className="t-body text-white/70">
              We aim to be the leading marketing agency in Zimbabwe, judged by our clients’ growth
              rather than by our own awards shelf.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="ground-teal wrap py-[var(--section)]" data-ground="dark">
        <div className="case-columns">
          <Reveal>
            <h2 className="t-label mb-6 text-teal-100">Mission</h2>
            <p className="t-heading-m">
              To transform the way businesses connect with their customers, with marketing built
              around each client’s objectives rather than around a template.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="t-label mb-6 text-teal-100">Vision</h2>
            <p className="t-heading-m">
              To be the leading marketing agency in Zimbabwe — recognised for client success,
              innovative thinking and a contribution to sustainable business growth.
            </p>
          </Reveal>
        </div>
      </section>

      <ApproachSequence />

      <section className="wrap bg-paper py-[var(--section)] text-ink" data-ground="light">
        <Reveal>
          <h2 className="t-display-l mb-8 max-w-[18ch]">Where vibrant ideas meet professional execution.</h2>
          <Link href="/contact" className="btn btn-primary">
            Start a conversation <span className="arrow">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
