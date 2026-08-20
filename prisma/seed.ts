/**
 * Seeds the CMS from src/content — so the database starts out matching the
 * site you can already see, rather than empty.
 *
 *   npm run db:seed
 *
 * Set ADMIN_EMAIL and ADMIN_PASSWORD to create the first editor account.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { projects } from '../src/content/projects';
import { capabilities, clients } from '../src/content/site';

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? '').toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? '';

  if (email && password) {
    if (password.length < 12) {
      throw new Error('ADMIN_PASSWORD must be at least 12 characters.');
    }
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: email.split('@')[0].replace(/[._-]+/g, ' '),
        passwordHash: await bcrypt.hash(password, 12),
        role: 'ADMIN',
      },
    });
    console.log(`✓ admin user ready: ${email}`);
  } else {
    console.log('· skipped user creation (set ADMIN_EMAIL and ADMIN_PASSWORD to create one)');
  }

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        slug: project.slug,
        client: project.client,
        title: project.title,
        year: project.year,
        featured: project.featured,
        order: project.order,
        status: 'PUBLISHED',
        disciplines: project.disciplines,
        services: project.services,
        shortDescription: project.shortDescription,
        challenge: project.challenge,
        idea: project.idea,
        whatWeDid: project.whatWeDid,
        results: project.results ?? [],
        blocks: project.blocks as unknown as object,
        credits: (project.credits ?? []) as unknown as object,
        related: project.related ?? [],
      },
    });
  }
  console.log(`✓ ${projects.length} projects seeded`);

  for (const [index, name] of clients.entries()) {
    await prisma.client.upsert({
      where: { name },
      update: {},
      create: { name, order: index },
    });
  }
  console.log(`✓ ${clients.length} clients seeded`);

  for (const [index, cap] of capabilities.entries()) {
    await prisma.capability.upsert({
      where: { slug: cap.slug },
      update: {},
      create: { slug: cap.slug, name: cap.name, lead: cap.lead, items: cap.items, order: index },
    });
  }
  console.log(`✓ ${capabilities.length} capabilities seeded`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
