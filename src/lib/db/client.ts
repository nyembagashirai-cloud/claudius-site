import { PrismaClient, Prisma } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** Idle serverless Postgres closing its connections is routine, not a fault. */
const IDLE_SUSPEND =
  /terminating connection due to administrator command|E57P01|Server has closed the connection|Connection terminated|Can't reach database server/i;

function createClient() {
  const log: Prisma.LogDefinition[] = [
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
  ];

  const client = new PrismaClient({ log });

  client.$on('error' as never, (event: Prisma.LogEvent) => {
    // Neon suspends an idle compute and drops its connections. Prisma opens a
    // fresh one on the next query, so this is the platform working as designed —
    // one quiet line, not four stack traces.
    if (IDLE_SUSPEND.test(event.message)) {
      console.info('[db] idle database suspended its connections; reconnecting on next query');
      return;
    }
    console.error('[db]', event.message);
  });

  client.$on('warn' as never, (event: Prisma.LogEvent) => {
    console.warn('[db]', event.message);
  });

  return client;
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Runs a query, and retries once if the connection was closed underneath it.
 *
 * Serverless Postgres suspends when idle: the first query after a suspension
 * loses the connection it was handed, while the second gets a fresh one and
 * succeeds. Without this, the first visitor after a quiet spell would be served
 * fallback content for no good reason.
 */
export async function resilient<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!IDLE_SUSPEND.test(message)) throw error;
    return run();
  }
}
