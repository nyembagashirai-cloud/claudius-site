import Image from 'next/image';
import type { Media as MediaType, Ratio } from '@/lib/types';

const RATIO: Record<Ratio, string> = {
  '21:9': '21 / 9',
  '16:9': '16 / 9',
  '4:5': '4 / 5',
  '1:1': '1 / 1',
  '3:2': '3 / 2',
};

interface MediaProps {
  media: MediaType;
  /** Responsive `sizes` hint — always pass one for anything not full-bleed. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Fill the parent instead of establishing its own aspect ratio. */
  fill?: boolean;
}

/**
 * One API for every visual slot on the site.
 *
 * With `media.src` it renders an optimised next/image or a muted looping
 * video. Without one it renders an art-directed placeholder carrying the
 * slot label and target ratio — so layout, rhythm and page weight are
 * final before the photography arrives.
 */
export default function Media({
  media,
  sizes = '100vw',
  priority = false,
  className = '',
  fill = false,
}: MediaProps) {
  const style = fill ? undefined : { aspectRatio: RATIO[media.ratio] };
  const tone = media.tone && media.tone !== 'default' ? media.tone : undefined;

  if (!media.src) {
    return (
      <div
        className={`ph ${fill ? 'ph-fill' : ''} ${className}`}
        style={style}
        data-tone={tone}
        role="img"
        aria-label={`${media.alt} — image pending`}
      >
        <span className="ph-corner tl" />
        <span className="ph-corner br" />
        {media.slot ? <span className="ph-ghost">{media.slot.split(' · ')[0]}</span> : null}
        <span className="ph-meta">
          <span>{media.slot ?? media.alt}</span>
          <span>
            {media.ratio}
            {media.kind === 'video' ? ' · video' : ''} · replace
          </span>
        </span>
      </div>
    );
  }

  if (media.kind === 'video') {
    return (
      <div className={`relative overflow-hidden ${fill ? 'absolute inset-0' : ''} ${className}`} style={style}>
        <video
          className="h-full w-full object-cover"
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-label={media.alt}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${fill ? 'absolute inset-0' : ''} ${className}`} style={style}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
