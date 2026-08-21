import { prisma, resilient } from './client';
import type { ContentBlock, Discipline, Media, Project } from '@/lib/types';

type Row = Awaited<ReturnType<typeof prisma.project.findMany>>[number] & {
  hero?: { url: string; kind: string; alt: string; ratio: string; poster: string | null } | null;
};

function toMedia(hero: Row['hero'], fallbackAlt: string, slot?: string): Media {
  if (!hero) return { alt: fallbackAlt, ratio: '16:9', slot: slot ?? fallbackAlt };
  return {
    src: hero.url,
    kind: hero.kind === 'video' ? 'video' : 'image',
    alt: hero.alt || fallbackAlt,
    ratio: (hero.ratio as Media['ratio']) ?? '16:9',
    poster: hero.poster ?? undefined,
  };
}

function toProject(row: Row): Project {
  return {
    slug: row.slug,
    client: row.client,
    title: row.title,
    year: row.year,
    featured: row.featured,
    order: row.order,
    disciplines: row.disciplines as Discipline[],
    services: row.services,
    shortDescription: row.shortDescription,
    hero: toMedia(row.hero, `${row.client} — ${row.title}`, `${row.client} · campaign image`),
    challenge: row.challenge,
    idea: row.idea,
    whatWeDid: row.whatWeDid,
    results: row.results?.length ? row.results : undefined,
    blocks: (row.blocks as unknown as ContentBlock[]) ?? [],
    credits: (row.credits as unknown as { role: string; name: string }[]) ?? [],
    related: row.related,
    seo: { title: row.seoTitle ?? undefined, description: row.seoDescription ?? undefined },
  };
}

export async function getPublishedProjects(): Promise<Project[]> {
  const rows = await resilient(() =>
    prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { order: 'asc' },
      include: { hero: true },
    }),
  );
  return rows.map((row) => toProject(row as Row));
}

export async function getAllProjectsForAdmin() {
  return prisma.project.findMany({ orderBy: { order: 'asc' }, include: { hero: true } });
}
