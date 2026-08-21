'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db/client';
import { mediaManifest } from '@/content/media-manifest';

export async function registerMedia(input: { url: string; alt: string; ratio: string; kind: string }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  await prisma.media.create({
    data: { url: input.url, alt: input.alt, ratio: input.ratio, kind: input.kind },
  });
  revalidatePath('/admin/media');
}

export async function addMediaByUrl(formData: FormData) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const url = String(formData.get('url') ?? '').trim();
  if (!url) return;

  await prisma.media.create({
    data: {
      url,
      alt: String(formData.get('alt') ?? '').trim(),
      ratio: String(formData.get('ratio') ?? '16:9'),
      kind: /\.(mp4|webm|mov)(\?|$)/i.test(url) ? 'video' : 'image',
    },
  });
  revalidatePath('/admin/media');
}

/**
 * Registers anything in public/images that the media library has not seen yet.
 *
 * Images live in the repository, so a push is what "uploads" them. This is the
 * step that makes them selectable in the CMS: one row per file, so the hero
 * picker and every media block can offer them by name.
 *
 * Idempotent — files already registered are left alone, including any alt text
 * or ratio you have since edited.
 */
export async function syncRepoMedia(): Promise<void> {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const known = new Set(
    (await prisma.media.findMany({ select: { url: true } })).map((m) => m.url),
  );

  const missing = mediaManifest.filter((entry) => !known.has(entry.url));

  for (const entry of missing) {
    await prisma.media.create({
      data: {
        url: entry.url,
        kind: entry.kind,
        // A sensible starting point; edit it to describe the actual picture.
        alt: entry.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
        ratio: '16:9',
      },
    });
  }

  revalidatePath('/admin/media');
}
