import { projects as seedProjects, featuredSlugs } from '@/content/projects';
import type { Project, Discipline } from '@/lib/types';

/**
 * Content access layer.
 *
 * The CMS writes to Postgres. When DATABASE_URL is not set — local preview,
 * a first deploy, or a database outage — these fall back to the seed content
 * in `src/content/projects.ts` so the site is never blank.
 */

/**
 * Turns the two failures people actually hit into one actionable line each,
 * instead of the same twelve-frame stack repeated for every read on the page.
 */
function explain(label: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes('did not initialize yet')) {
    console.warn(
      `[content] ${label}: the Prisma client has not been generated. ` +
        'Run `npx prisma generate` (or reinstall — it runs on postinstall). ' +
        'Serving seed content until then.',
    );
    return;
  }

  if (message.includes("Can't reach database server") || message.includes('ECONNREFUSED')) {
    console.warn(
      `[content] ${label}: cannot reach the database. Check DATABASE_URL, and ` +
        'note that Neon computes sleep when idle and take a moment to wake. ' +
        'Serving seed content until then.',
    );
    return;
  }

  console.error(`[content] ${label}: database read failed, serving seed content.`, error);
}

async function fromDatabase(): Promise<Project[] | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { getPublishedProjects } = await import('@/lib/db/projects');
    const rows = await getPublishedProjects();
    return rows.length ? rows : null;
  } catch (error) {
    explain('projects', error);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const db = await fromDatabase();
  const list = db ?? seedProjects;
  return [...list].sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.featured);
  if (featured.length) return featured.slice(0, 5);
  return featuredSlugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p))
    .slice(0, 5);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug);
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const all = await getAllProjects();
  const explicit = (project.related ?? [])
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
  if (explicit.length >= limit) return explicit.slice(0, limit);

  const bySharedDiscipline = all
    .filter((p) => p.slug !== project.slug && !explicit.some((e) => e.slug === p.slug))
    .map((p) => ({
      project: p,
      shared: p.disciplines.filter((d) => project.disciplines.includes(d)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .map((x) => x.project);

  return [...explicit, ...bySharedDiscipline].slice(0, limit);
}

export async function getDisciplinesInUse(): Promise<Discipline[]> {
  const all = await getAllProjects();
  const set = new Set<Discipline>();
  for (const p of all) for (const d of p.disciplines) set.add(d);
  return Array.from(set);
}

/* --------------------------------------------------------------- clients */

export async function getClients(): Promise<string[]> {
  if (!process.env.DATABASE_URL) return (await import('@/content/site')).clients;
  try {
    const { prisma, resilient } = await import('@/lib/db/client');
    const rows = await resilient(() =>
      prisma.client.findMany({
        where: { published: true },
        orderBy: { order: 'asc' },
        select: { name: true },
      }),
    );
    if (rows.length) return rows.map((r) => r.name);
  } catch (error) {
    explain('clients', error);
  }
  return (await import('@/content/site')).clients;
}

/* -------------------------------------------------------------- settings */

export interface SiteSettings {
  email: string;
  phone: string;
  whatsapp: string;
  city: string;
  country: string;
  social: { label: string; href: string }[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { site } = await import('@/content/site');
  const fallback: SiteSettings = {
    email: site.email,
    phone: site.phone,
    whatsapp: site.whatsapp,
    city: site.city,
    country: site.country,
    social: site.social,
  };

  if (!process.env.DATABASE_URL) return fallback;
  try {
    const { prisma, resilient } = await import('@/lib/db/client');
    const row = await resilient(() => prisma.setting.findUnique({ where: { key: 'site' } }));
    if (!row) return fallback;
    const v = row.value as Record<string, string>;
    const social = [
      { label: 'Instagram', href: v.instagram },
      { label: 'LinkedIn', href: v.linkedin },
      { label: 'Facebook', href: v.facebook },
    ].filter((s) => s.href) as { label: string; href: string }[];
    return {
      email: v.email || fallback.email,
      phone: v.phone || fallback.phone,
      whatsapp: v.whatsapp || fallback.whatsapp,
      city: v.city || fallback.city,
      country: v.country || fallback.country,
      social: social.length ? social : fallback.social,
    };
  } catch (error) {
    explain('settings', error);
    return fallback;
  }
}
