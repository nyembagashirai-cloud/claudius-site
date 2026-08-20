import SplitLines from '@/components/primitives/SplitLines';
import type { Ground } from '@/lib/types';

const GROUND: Record<Ground, string> = {
  ink: 'ground-ink',
  teal: 'ground-teal',
  paper: 'bg-paper text-ink',
};

/**
 * One statement, one screen. The pause between movements.
 */
export default function StatementBand({
  lines,
  accentFrom,
  ground = 'ink',
  size = 'xl',
}: {
  lines: string[];
  /** Index from which lines switch to the accent colour. */
  accentFrom?: number;
  ground?: Ground;
  size?: 'xl' | 'xxl';
}) {
  const accent = ground === 'paper' ? 'text-teal-700' : 'text-teal-300';
  return (
    <section
      className={`${GROUND[ground]} grid min-h-[100svh] place-items-center px-[var(--margin)] py-[var(--section)] text-center`}
      data-ground={ground === 'paper' ? 'light' : 'dark'}
    >
      <SplitLines
        className={size === 'xxl' ? 't-display-xxl' : 't-display-xl'}
        lines={lines.map((line, i) =>
          accentFrom !== undefined && i >= accentFrom ? (
            <span key={line} className={accent}>{line}</span>
          ) : (
            line
          ),
        )}
      />
    </section>
  );
}
