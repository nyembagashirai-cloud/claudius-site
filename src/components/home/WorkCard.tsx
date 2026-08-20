import Link from 'next/link';
import Media from '@/components/primitives/Media';
import Reveal from '@/components/primitives/Reveal';
import type { Project, Ratio } from '@/lib/types';

export interface WorkCardLayout {
  /** CSS grid-column span across the 12-column grid. */
  col: string;
  ratio: Ratio;
  /** The first card carries the largest type. */
  lead?: boolean;
  sizes: string;
}

/**
 * Image-dominant project card. The media leads; client, title and
 * disciplines sit beneath it on the same columns. Hover promotes the
 * media and reveals the case-study call to action.
 */
export default function WorkCard({
  project,
  index,
  layout,
}: {
  project: Project;
  index: number;
  layout: WorkCardLayout;
}) {
  return (
    <Reveal>
      <Link
        href={`/work/${project.slug}`}
        className="work-card group"
        data-cursor="View"
        data-lead={layout.lead ? 'true' : undefined}
        style={{ ['--col' as string]: layout.col, ['--ar' as string]: layout.ratio.replace(':', ' / ') }}
      >
        <div className="wc-media">
          <Media
            media={{ ...project.hero, ratio: layout.ratio }}
            sizes={layout.sizes}
            priority={index === 0}
            fill
          />
        </div>

        <div className="wc-info">
          <div className="wc-left">
            <span className="t-index text-teal-300">{String(index + 1).padStart(2, '0')}</span>
            <span className="t-label text-teal-300">{project.client}</span>
            <h3 className="wc-title">{project.title}</h3>
          </div>
          <div className="wc-right">
            <div className="wc-disciplines t-index">
              {project.services.slice(0, 6).map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <span className="wc-view t-index">View case study →</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
