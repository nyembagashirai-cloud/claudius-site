'use client';

import useMarqueeSpeed from './useMarqueeSpeed';

interface MarqueeProps {
  items: string[];
  direction?: 1 | -1;
  /** Seconds for one full pass. */
  duration?: number;
  onSelect?: (item: string) => void;
}

/**
 * Continuous client marquee. Speed is modulated by scroll velocity so the
 * wall feels connected to the page rather than looping in its own world.
 */
export default function Marquee({ items, direction = -1, duration = 34, onSelect }: MarqueeProps) {
  const trackRef = useMarqueeSpeed(duration);

  // Tripled so the loop never shows an edge.
  const loop = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{
          animation: `marquee-${direction === -1 ? 'l' : 'r'} ${duration}s linear infinite`,
        }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-[clamp(28px,4vw,64px)] px-[clamp(14px,2vw,32px)]">
            <button
              type="button"
              onClick={() => onSelect?.(item)}
              className="marquee-word whitespace-nowrap"
              tabIndex={i < items.length ? 0 : -1}
              aria-hidden={i >= items.length}
            >
              {item}
            </button>
            <span className="text-teal-300 text-lg" aria-hidden>✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
