/**
 * Removes projects from the database by slug, and any client rows named
 * after them.
 *
 * Taking a project out of src/content/projects.ts stops it being seeded, but
 * the live site reads from Postgres — a row already there stays there. This
 * is the other half of that edit.
 *
 *   npm run projects:remove -- the-cheeseman clouds-to-you turtle-fit
 *
 * It names what it will delete and refuses an empty argument list, because a
 * case study is not something to lose to a typo. Anything referencing a
 * removed slug in its `related` list is cleaned up too, so no case study is
 * left pointing at a page that no longer exists.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const slugs = process.argv.slice(2).filter(Boolean);
  if (slugs.length === 0) {
    console.error('Nothing to do. Pass one or more slugs:\n  npm run projects:remove -- turtle-fit');
    process.exit(1);
  }

  const found = await prisma.project.findMany({ where: { slug: { in: slugs } } });
  const missing = slugs.filter((s) => !found.some((p) => p.slug === s));
  for (const s of missing) console.log(`· ${s}: not in the database`);

  for (const project of found) {
    await prisma.project.delete({ where: { id: project.id } });
    console.log(`✓ ${project.slug}: removed (${project.client})`);

    const client = await prisma.client.findFirst({ where: { name: project.client } });
    if (client) {
      await prisma.client.delete({ where: { id: client.id } });
      console.log(`  · client "${project.client}" removed from the logo wall`);
    }
  }

  // No case study should link to a page that has gone.
  const rest = await prisma.project.findMany();
  for (const p of rest) {
    const cleaned = p.related.filter((r) => !slugs.includes(r));
    if (cleaned.length !== p.related.length) {
      await prisma.project.update({ where: { id: p.id }, data: { related: cleaned } });
      console.log(`  · ${p.slug}: dropped a stale related link`);
    }
  }

  console.log(`\n${found.length} project(s) removed. Redeploy for the live site to catch up.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
