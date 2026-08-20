import Reveal from '@/components/primitives/Reveal';
import type { Project } from '@/lib/types';

export default function CaseIntro({ project }: { project: Project }) {
  return (
    <section className="ground-ink wrap py-[var(--section)]" data-ground="dark">
      <div className="case-columns">
        <Reveal>
          <h2 className="t-label mb-6 text-teal-300">The challenge</h2>
          {project.challenge.map((p, i) => (
            <p key={i} className={i === 0 ? 't-heading-m mb-5' : 't-body mb-4 text-white/70'}>
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal delay={120}>
          <h2 className="t-label mb-6 text-teal-300">The idea</h2>
          {project.idea.map((p, i) => (
            <p key={i} className={i === 0 ? 't-heading-m mb-5' : 't-body mb-4 text-white/70'}>
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
