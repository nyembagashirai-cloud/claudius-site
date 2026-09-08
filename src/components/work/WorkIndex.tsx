'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Media from '@/components/primitives/Media';
import Reveal from '@/components/primitives/Reveal';
import { DISCIPLINES, type Discipline, type Project } from '@/lib/types';

/**
 * Work index. Filtering is reflected in the URL so a filtered view is
 * shareable and indexable, and so the client wall on the homepage can
 * deep-link into it.
 */
export default function WorkIndex({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const active = (params.get('discipline') ?? 'ALL') as Discipline | 'ALL';
  const client = params.get('client');

  const available = useMemo(() => {
    const used = new Set<Discipline>();
    for (const p of projects) for (const d of p.disciplines) used.add(d);
    return DISCIPLINES.filter((d) => used.has(d));
  }, [projects]);

  const filtered = useMemo(() => {
    let list = projects;
    if (client) list = list.filter((p) => p.client.toUpperCase() === client.toUpperCase());
    if (active !== 'ALL') list = list.filter((p) => p.disciplines.includes(active));
    return list;
  }, [projects, active, client]);

  const setFilter = (value: Discipline | 'ALL') => {
    const next = new URLSearchParams(params.toString());
    if (value === 'ALL') next.delete('discipline');
    else next.set('discipline', value);
    next.delete('client');
    router.replace(next.size ? `/work?${next}` : '/work', { scroll: false });
  };

  return (
    <>
      <div className="work-filters" role="group" aria-label="Filter work by discipline">
        <button
          type="button"
          className="filter-chip"
          data-active={active === 'ALL' && !client}
          onClick={() => setFilter('ALL')}
        >
          All
        </button>
        {available.map((d) => (
          <button
            key={d}
            type="button"
            className="filter-chip"
            data-active={active === d}
            onClick={() => setFilter(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {client ? (
        <p className="t-label mt-6 text-teal-300">
          Showing work for {client} ·{' '}
          <button type="button" className="link-underline" onClick={() => setFilter('ALL')}>
            clear
          </button>
        </p>
      ) : null}

      <div className="work-grid">
        {filtered.map((project, i) => {
          // Every fifth tile spans two of the three columns. Telling the
          // browser otherwise makes it fetch a file too small for the slot.
          const wide = i % 5 === 0;
          return (
          <Reveal key={project.slug} delay={(i % 3) * 70} className={wide ? 'work-tile-wide' : undefined}>
            <Link href={`/work/${project.slug}`} className="work-tile group" data-cursor="View">
              <div
                className="work-tile-media"
                style={{ ['--ar' as string]: i % 3 === 1 ? '4 / 5' : '16 / 9' }}
              >
                <Media
                  media={{ ...project.hero, ratio: i % 3 === 1 ? '4:5' : '16:9' }}
                  sizes={
                    wide
                      ? '(max-width: 1200px) 100vw, 68vw'
                      : '(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 34vw'
                  }
                  fill
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <span className="t-label block text-teal-300">{project.client}</span>
                  <h2 className="t-heading-s mt-1.5">{project.title}</h2>
                </div>
                <span className="t-index whitespace-nowrap text-white/60">{project.year}</span>
              </div>
              <p className="t-index mt-2.5 text-white/60">{project.services.slice(0, 4).join(' · ')}</p>
            </Link>
          </Reveal>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="t-body-l py-24 text-white/60">
          No projects under that filter yet.{' '}
          <button type="button" className="link-underline text-teal-300" onClick={() => setFilter('ALL')}>
            Show all work
          </button>
        </p>
      ) : null}
    </>
  );
}
