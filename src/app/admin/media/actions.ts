'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db/client';

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
