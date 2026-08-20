import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().max(160).optional().or(z.literal('')),
  email: z.string().email().max(200),
  phone: z.string().max(60).optional().or(z.literal('')),
  need: z.string().max(120).optional().or(z.literal('')),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
});

/** Very small in-memory throttle. Replace with a shared store if you scale out. */
const hits = new Map<string, { count: number; reset: number }>();
function throttled(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (throttled(ip)) {
    return NextResponse.json({ error: 'Too many enquiries. Please try again shortly.' }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }

  const { website, ...enquiry } = parsed.data;
  if (website) {
    // Bot filled the honeypot. Accept silently so it learns nothing.
    return NextResponse.json({ ok: true });
  }

  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import('@/lib/db/client');
      await prisma.enquiry.create({
        data: {
          name: enquiry.name,
          company: enquiry.company || null,
          email: enquiry.email,
          phone: enquiry.phone || null,
          need: enquiry.need || null,
          message: enquiry.message,
        },
      });
    } catch (error) {
      console.error('[contact] failed to store enquiry', error);
      return NextResponse.json({ error: 'We could not send that. Please email us directly.' }, { status: 500 });
    }
  } else {
    console.info('[contact] enquiry received (no database configured)', enquiry);
  }

  return NextResponse.json({ ok: true });
}
