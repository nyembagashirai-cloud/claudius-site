import Media from '@/components/primitives/Media';
import SplitLines from '@/components/primitives/SplitLines';
import Reveal from '@/components/primitives/Reveal';
import type { Project } from '@/lib/types';

export default function CaseHero({ project }: { project: Project }) {
  return (
    <section className="ground-ink" data-ground="dark">
      <div className="wrap pb-[clamp(32px,6vh,72px)] pt-[clamp(120px,20vh,220px)]">
        <p className="t-label mb-4 text-teal-300">Client — {project.client}</p>
        <SplitLines as="h1" className="t-display-xl max-w-[16ch]" lines={[project.title]} immediate />

        <div className="mt-[clamp(28px,5vh,56px)] flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-6">
          <Reveal>
            <h2 className="t-index mb-2 text-white/60">Year</h2>
            <p className="t-label">{project.year}</p>
          </Reveal>
          <Reveal delay={60} className="max-w-[52ch]">
            <h2 className="t-index mb-2 text-white/60">Services</h2>
            <p className="t-label leading-relaxed">{project.services.join(' · ')}</p>
          </Reveal>
        </div>
      </div>

      <div
        className="case-hero-media"
        data-portrait={project.hero.fit === 'contain' ? 'true' : undefined}
      >
        <Media media={project.hero} sizes="100vw" priority fill />
      </div>
    </section>
  );
}
