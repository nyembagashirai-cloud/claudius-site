import Link from 'next/link';
import Media from '@/components/primitives/Media';
import Reveal from '@/components/primitives/Reveal';
import type { Project } from '@/lib/types';

export default function RelatedWork({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  return (
    <section className="ground-ink wrap py-[var(--section)]" data-ground="dark">
      <Reveal>
        <h2 className="t-label mb-9 text-teal-300">Related work</h2>
      </Reveal>
      <div className="grid gap-x-[var(--gutter)] gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <Link href={`/work/${p.slug}`} className="work-tile group block" data-cursor="View">
              <div className="work-tile-media" style={{ ['--ar' as string]: '16 / 9' }}>
                <Media media={{ ...p.hero, ratio: '16:9' }} sizes="(max-width: 900px) 100vw, 33vw" fill />
              </div>
              <span className="t-label mt-4 block text-teal-300">{p.client}</span>
              <h3 className="t-heading-s mt-1.5">{p.title}</h3>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
