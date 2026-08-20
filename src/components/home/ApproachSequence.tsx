import Reveal from '@/components/primitives/Reveal';
import { approach } from '@/content/site';

/**
 * THINK → CREATE → BUILD → LAUNCH → AMPLIFY → MEASURE.
 * Six rows, each filling with teal on hover — the end-to-end claim
 * stated as structure rather than as a paragraph.
 */
export default function ApproachSequence() {
  return (
    <section className="wrap bg-fog py-[var(--section)]" id="approach" data-ground="light">
      <div className="flex flex-wrap items-baseline justify-between gap-6 pb-[clamp(24px,4vh,40px)]">
        <Reveal>
          <p className="t-label mb-4 text-teal-700">05 — Approach</p>
          <h2 className="t-display-l">
            WE MAKE
            <br />
            BRANDS MOVE.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="t-body max-w-[34ch] text-graphite">
            Six movements, one agency. We think it, make it, build it, launch it, amplify it —
            and then we measure whether it worked.
          </p>
        </Reveal>
      </div>

      <ol className="approach-list">
        {approach.map((row, i) => (
          <Reveal as="li" key={row.step} delay={i * 60} className="approach-row">
            <span className="t-index approach-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="approach-word">{row.step}</span>
            <span className="t-label approach-note">{row.note}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
