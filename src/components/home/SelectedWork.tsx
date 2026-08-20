import Link from 'next/link';
import Reveal from '@/components/primitives/Reveal';
import WorkCard, { type WorkCardLayout } from './WorkCard';
import type { Project } from '@/lib/types';

/**
 * Deliberately asymmetric: spans and ratios alternate so the eye never
 * settles into a grid. Card one runs full width and cinematic.
 */
const LAYOUTS: WorkCardLayout[] = [
  { col: '1 / 13', ratio: '21:9', lead: true, sizes: '100vw' },
  { col: '1 / 10', ratio: '16:9', sizes: '(max-width: 900px) 100vw, 75vw' },
  { col: '6 / 13', ratio: '3:2',  sizes: '(max-width: 900px) 100vw, 58vw' },
  { col: '1 / 9',  ratio: '16:9', sizes: '(max-width: 900px) 100vw, 66vw' },
  { col: '4 / 13', ratio: '16:9', sizes: '(max-width: 900px) 100vw, 75vw' },
];

export default function SelectedWork({ projects, total }: { projects: Project[]; total: number }) {
  return (
    <section className="ground-ink wrap" id="work" data-ground="dark">
      <div className="flex flex-wrap items-baseline justify-between gap-6 pb-[clamp(24px,4vh,40px)] pt-[clamp(56px,8vh,96px)]">
        <Reveal>
          <p className="t-label mb-4 text-teal-300">02 — Selected work</p>
          <h2 className="t-display-l">
            SELECTED
            <br />
            WORK
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <Link href="/work" className="t-label link-underline text-teal-300">
            All work ({total}) →
          </Link>
        </Reveal>
      </div>

      <div className="work-list">
        {projects.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} layout={LAYOUTS[i % LAYOUTS.length]} />
        ))}
      </div>
    </section>
  );
}
