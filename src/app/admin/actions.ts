'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSession, destroySession, getSession } from '@/lib/auth';
import { prisma } from '@/lib/db/client';
import type { ContentBlock, Discipline } from '@/lib/types';

/* ------------------------------------------------------------------ auth */

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { error: 'Enter a valid email address and password.' };

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return { error: 'Those details do not match an account.' };
  }

  await createSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  redirect((formData.get('from') as string) || '/admin');
}

export async function logout() {
  await destroySession();
  redirect('/admin/login');
}

async function requireSession() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return session;
}

/* -------------------------------------------------------------- projects */

function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function refreshPublicPages(slug?: string) {
  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/work/${slug}`);
}

export async function saveProject(formData: FormData) {
  await requireSession();

  const id = String(formData.get('id') ?? '');
  const slug = String(formData.get('slug') ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!slug) throw new Error('A slug is required.');

  let blocks: ContentBlock[] = [];
  try {
    blocks = JSON.parse(String(formData.get('blocks') ?? '[]'));
  } catch {
    throw new Error('The narrative blocks could not be read. Check the block editor and try again.');
  }

  const data = {
    slug,
    client: String(formData.get('client') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    year: Number(formData.get('year') ?? new Date().getFullYear()),
    featured: formData.get('featured') === 'on',
    order: Number(formData.get('order') ?? 0),
    status: formData.get('status') === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
    disciplines: formData.getAll('disciplines').map(String) as Discipline[],
    services: lines(formData.get('services')),
    shortDescription: String(formData.get('shortDescription') ?? '').trim(),
    heroMediaId: (formData.get('heroMediaId') as string) || null,
    challenge: lines(formData.get('challenge')),
    idea: lines(formData.get('idea')),
    whatWeDid: lines(formData.get('whatWeDid')),
    results: lines(formData.get('results')),
    blocks: blocks as unknown as object,
    credits: lines(formData.get('credits')).map((line) => {
      const [role, ...rest] = line.split('|');
      return { role: role.trim(), name: rest.join('|').trim() };
    }),
    related: lines(formData.get('related')),
    seoTitle: (String(formData.get('seoTitle') ?? '').trim() || null) as string | null,
    seoDescription: (String(formData.get('seoDescription') ?? '').trim() || null) as string | null,
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
  } else {
    await prisma.project.create({ data });
  }

  refreshPublicPages(slug);
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function deleteProject(formData: FormData) {
  await requireSession();
  const id = String(formData.get('id'));
  const project = await prisma.project.findUnique({ where: { id } });
  await prisma.project.delete({ where: { id } });
  refreshPublicPages(project?.slug);
  revalidatePath('/admin/projects');
}

export async function toggleProjectStatus(formData: FormData) {
  await requireSession();
  const id = String(formData.get('id'));
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return;
  await prisma.project.update({
    where: { id },
    data: { status: project.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED' },
  });
  refreshPublicPages(project.slug);
  revalidatePath('/admin/projects');
}

/* --------------------------------------------------------------- clients */

export async function saveClient(formData: FormData) {
  await requireSession();
  const id = String(formData.get('id') ?? '');
  const data = {
    name: String(formData.get('name') ?? '').trim(),
    logoUrl: (String(formData.get('logoUrl') ?? '').trim() || null) as string | null,
    order: Number(formData.get('order') ?? 0),
    published: formData.get('published') === 'on',
  };
  if (id) await prisma.client.update({ where: { id }, data });
  else await prisma.client.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/clients');
}

export async function deleteClient(formData: FormData) {
  await requireSession();
  await prisma.client.delete({ where: { id: String(formData.get('id')) } });
  revalidatePath('/');
  revalidatePath('/admin/clients');
}

/* -------------------------------------------------------------- settings */

export async function saveSettings(formData: FormData) {
  await requireSession();
  const value = {
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    whatsapp: String(formData.get('whatsapp') ?? '').trim(),
    city: String(formData.get('city') ?? '').trim(),
    country: String(formData.get('country') ?? '').trim(),
    instagram: String(formData.get('instagram') ?? '').trim(),
    linkedin: String(formData.get('linkedin') ?? '').trim(),
    facebook: String(formData.get('facebook') ?? '').trim(),
    seoTitle: String(formData.get('seoTitle') ?? '').trim(),
    seoDescription: String(formData.get('seoDescription') ?? '').trim(),
  };
  await prisma.setting.upsert({
    where: { key: 'site' },
    update: { value },
    create: { key: 'site', value },
  });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
}

/* ----------------------------------------------------------------- media */

export async function deleteMedia(formData: FormData) {
  await requireSession();
  await prisma.media.delete({ where: { id: String(formData.get('id')) } });
  revalidatePath('/admin/media');
}
