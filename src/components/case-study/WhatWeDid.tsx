import Reveal from '@/components/primitives/Reveal';

export default function WhatWeDid({ items }: { items: string[] }) {
  return (
    <section className="ground-ink wrap pb-[var(--section)]" data-ground="dark">
      <Reveal>
        <h2 className="t-label mb-8 text-teal-300">What we did</h2>
      </Reveal>
      <ul className="what-we-did">
        {items.map((item, i) => (
          <Reveal as="li" key={item} delay={i * 45}>
            <span className="t-index text-white/60">{String(i + 1).padStart(2, '0')}</span>
            <span>{item}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
