import Media from '@/components/primitives/Media';
import Reveal from '@/components/primitives/Reveal';
import SplitLines from '@/components/primitives/SplitLines';
import type { ContentBlock } from '@/lib/types';

const GROUND = { ink: 'ground-ink', teal: 'ground-teal', paper: 'bg-paper text-ink' } as const;

/**
 * The case-study narrative. Blocks are ordered by the CMS, so a new case
 * study is assembled rather than coded — but every block is art-directed,
 * not a generic content well.
 */
export default function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'statement': {
            const ground = block.ground ?? 'ink';
            return (
              <section
                key={i}
                className={`${GROUND[ground]} grid min-h-[86svh] place-items-center px-[var(--margin)] py-[var(--section)] text-center`}
                data-ground={ground === 'paper' ? 'light' : 'dark'}
              >
                <SplitLines className="t-display-xl" lines={block.lines} />
              </section>
            );
          }

          case 'media-full':
            return (
              <section key={i} className="ground-ink" data-ground="dark">
                <Reveal distance={0}>
                  <Media media={block.media} sizes="100vw" />
                  {block.caption ? (
                    <p className="t-index wrap py-4 text-white/60">{block.caption}</p>
                  ) : null}
                </Reveal>
              </section>
            );

          case 'media-split':
            return (
              <section key={i} className="ground-ink wrap py-[clamp(48px,8vh,110px)]" data-ground="dark">
                <div className="media-split">
                  <Reveal distance={0}>
                    <Media media={block.left} sizes="(max-width: 900px) 100vw, 50vw" />
                  </Reveal>
                  <Reveal distance={0} delay={120}>
                    <Media media={block.right} sizes="(max-width: 900px) 100vw, 50vw" />
                  </Reveal>
                </div>
              </section>
            );

          case 'media-trio':
            return (
              <section key={i} className="ground-ink wrap py-[clamp(48px,8vh,110px)]" data-ground="dark">
                <div className="media-trio">
                  {block.items.map((m, j) => (
                    <Reveal key={j} distance={0} delay={j * 110}>
                      <Media media={m} sizes="(max-width: 900px) 100vw, 33vw" />
                    </Reveal>
                  ))}
                </div>
              </section>
            );

          case 'text':
            return (
              <section key={i} className="ground-ink wrap py-[clamp(56px,10vh,140px)]" data-ground="dark">
                <div className={block.columns === 2 ? 'case-columns' : 'max-w-[62ch]'}>
                  <Reveal>
                    {block.heading ? (
                      <h2 className="t-label mb-6 text-teal-300">{block.heading}</h2>
                    ) : null}
                    {block.body.map((p, j) => (
                      <p key={j} className={j === 0 ? 't-display-l mb-6 max-w-[18ch]' : 't-body mb-4 text-white/70'}>
                        {p}
                      </p>
                    ))}
                  </Reveal>
                </div>
              </section>
            );

          case 'list':
            return (
              <section key={i} className="ground-ink wrap pb-[clamp(56px,10vh,140px)]" data-ground="dark">
                <Reveal>
                  <h2 className="t-label mb-7 text-teal-300">{block.heading}</h2>
                </Reveal>
                <ul className="what-we-did">
                  {block.items.map((item, j) => (
                    <Reveal as="li" key={item} delay={j * 45}>
                      <span className="t-index text-white/60">{String(j + 1).padStart(2, '0')}</span>
                      <span>{item}</span>
                    </Reveal>
                  ))}
                </ul>
              </section>
            );

          case 'quote':
            return (
              <section key={i} className="ground-teal wrap py-[var(--section)]" data-ground="dark">
                <Reveal>
                  <blockquote className="t-display-l max-w-[20ch]">“{block.text}”</blockquote>
                  {block.attribution ? (
                    <p className="t-label mt-8 text-teal-100">{block.attribution}</p>
                  ) : null}
                </Reveal>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
