/**
 * Pushes the imagery in src/content/projects.ts into the database.
 *
 * Images live in the repository; the live site reads its case studies from
 * Postgres. This is the bridge: it registers every referenced file in the
 * media library, sets each project's hero, and writes the seed's narrative
 * blocks — which is where the media slots live — onto the matching rows.
 *
 *   npm run media:apply
 *
 * It only touches projects whose seed entry actually references a file, and on
 * those it REPLACES the narrative blocks, the featured flag and the running
 * order, and re-syncs each media row's alt text, ratio and framing. Any block
 * re-ordering, copy edit or running-order change made in the CMS for those case
 * studies will be overwritten, so run it while placement is still being worked
 * out, not after someone has edited a case study by hand.
 */
import { PrismaClient } from '@prisma/client';
import { projects } from '../src/content/projects';
import type { ContentBlock, Media } from '../src/lib/types';

const prisma = new PrismaClient();

function mediaIn(block: ContentBlock): Media[] {
  switch (block.type) {
    case 'media-full': return [block.media];
    case 'media-split': return [block.left, block.right];
    case 'media-trio': return [...block.items];
    default: return [];
  }
}

async function ensureMedia(m: Media) {
  if (!m.src) return null;
  const data = {
    url: m.src,
    kind: m.kind === 'video' ? 'video' : 'image',
    alt: m.alt,
    ratio: m.ratio,
    fit: m.fit ?? 'cover',
  };
  const existing = await prisma.media.findFirst({ where: { url: m.src } });
  // Keep an existing row's identity — projects point at it — but bring its
  // alt, ratio and framing back in line with the seed.
  if (existing) return prisma.media.update({ where: { id: existing.id }, data });
  return prisma.media.create({ data });
}

async function main() {
  let registered = 0;
  let updated = 0;

  for (const project of projects) {
    const all = [project.hero, ...project.blocks.flatMap(mediaIn)];
    const withFiles = all.filter((m) => m.src);
    if (withFiles.length === 0) {
      console.log(`· ${project.slug}: no imagery in the seed, left alone`);
      continue;
    }

    for (const m of withFiles) {
      const before = await prisma.media.findFirst({ where: { url: m.src } });
      await ensureMedia(m);
      if (!before) registered += 1;
    }

    const row = await prisma.project.findUnique({ where: { slug: project.slug } });
    if (!row) {
      console.log(`! ${project.slug}: not in the database, skipped`);
      continue;
    }

    const hero = project.hero.src
      ? await prisma.media.findFirst({ where: { url: project.hero.src } })
      : null;

    await prisma.project.update({
      where: { slug: project.slug },
      data: {
        heroMediaId: hero?.id ?? row.heroMediaId,
        blocks: project.blocks as unknown as object,
        featured: project.featured,
        order: project.order,
      },
    });

    updated += 1;
    console.log(`✓ ${project.slug}: ${withFiles.length} image slot(s) applied`);
  }

  console.log(`\n${registered} new file(s) registered, ${updated} project(s) updated.`);
  console.log('Redeploy, or wait for revalidation, for the live site to pick them up.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
