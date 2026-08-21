'use client';

import { useState } from 'react';
import type { ContentBlock, Media, Ratio } from '@/lib/types';

const RATIOS: Ratio[] = ['21:9', '16:9', '4:5', '1:1', '3:2'];

type MediaOption = { id: string; url: string; alt: string; ratio: string };

const BLANK_MEDIA: Media = { alt: '', ratio: '16:9', slot: '' };

const TEMPLATES: Record<string, () => ContentBlock> = {
  statement: () => ({ type: 'statement', lines: ['', ''], ground: 'ink' }),
  'media-full': () => ({ type: 'media-full', media: { ...BLANK_MEDIA, ratio: '21:9' } }),
  'media-split': () => ({ type: 'media-split', left: { ...BLANK_MEDIA, ratio: '4:5' }, right: { ...BLANK_MEDIA, ratio: '4:5' } }),
  'media-trio': () => ({
    type: 'media-trio',
    items: [{ ...BLANK_MEDIA, ratio: '1:1' }, { ...BLANK_MEDIA, ratio: '1:1' }, { ...BLANK_MEDIA, ratio: '1:1' }],
  }),
  text: () => ({ type: 'text', heading: '', body: [''], columns: 1 }),
  list: () => ({ type: 'list', heading: '', items: [''] }),
  quote: () => ({ type: 'quote', text: '', attribution: '' }),
};

/**
 * Narrative editor for a case study. Blocks are ordered, typed and
 * art-directed — this is what makes adding a new case study assembly
 * rather than development.
 */
export default function BlockEditor({
  initial,
  mediaOptions,
}: {
  initial: ContentBlock[];
  mediaOptions: MediaOption[];
}) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initial);

  const update = (index: number, next: ContentBlock) =>
    setBlocks((list) => list.map((b, i) => (i === index ? next : b)));

  const move = (index: number, delta: number) =>
    setBlocks((list) => {
      const target = index + delta;
      if (target < 0 || target >= list.length) return list;
      const copy = [...list];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });

  const remove = (index: number) => setBlocks((list) => list.filter((_, i) => i !== index));

  const add = (type: string) => setBlocks((list) => [...list, TEMPLATES[type]()]);

  const mediaField = (
    label: string,
    media: Media,
    onChange: (m: Media) => void,
    key?: React.Key,
  ) => (
    <fieldset key={key} style={{ border: '1px solid #E6E9EA', borderRadius: 3, padding: 12, marginBottom: 10 }}>
      <legend style={{ fontSize: '.72rem', color: '#5A6166', padding: '0 6px' }}>{label}</legend>
      <div className="a-grid3">
        <div className="a-field">
          <label>File</label>
          <select
            value={media.src ?? ''}
            onChange={(e) => {
              const found = mediaOptions.find((m) => m.url === e.target.value);
              onChange({
                ...media,
                src: e.target.value || undefined,
                alt: media.alt || found?.alt || '',
                kind: found && /\.(mp4|webm|mov)$/i.test(found.url) ? 'video' : 'image',
              });
            }}
          >
            <option value="">— placeholder (no file yet) —</option>
            {mediaOptions.map((m) => (
              <option key={m.id} value={m.url}>
                {m.alt || m.url.split('/').pop()}
              </option>
            ))}
          </select>
        </div>
        <div className="a-field">
          <label>Ratio</label>
          <select value={media.ratio} onChange={(e) => onChange({ ...media, ratio: e.target.value as Ratio })}>
            {RATIOS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="a-field">
          <label>Tone (placeholder only)</label>
          <select value={media.tone ?? 'default'} onChange={(e) => onChange({ ...media, tone: e.target.value as Media['tone'] })}>
            <option value="default">Deep teal</option>
            <option value="teal">Claudius teal</option>
            <option value="ink">Charcoal</option>
          </select>
        </div>
      </div>
      <div className="a-grid2">
        <div className="a-field">
          <label>Alt text</label>
          <input value={media.alt} onChange={(e) => onChange({ ...media, alt: e.target.value })} />
        </div>
        <div className="a-field">
          <label>Slot label</label>
          <input
            value={media.slot ?? ''}
            placeholder="e.g. Opal · activation"
            onChange={(e) => onChange({ ...media, slot: e.target.value })}
          />
        </div>
      </div>
    </fieldset>
  );

  return (
    <>
      <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />

      {blocks.map((block, i) => (
        <div className="a-block" key={i}>
          <div className="a-block-head">
            <span className="a-block-type">
              {String(i + 1).padStart(2, '0')} · {block.type}
            </span>
            <span className="a-block-actions">
              <button type="button" onClick={() => move(i, -1)} aria-label="Move up">↑</button>
              <button type="button" onClick={() => move(i, 1)} aria-label="Move down">↓</button>
              <button type="button" onClick={() => remove(i)} aria-label="Remove">Remove</button>
            </span>
          </div>

          {block.type === 'statement' ? (
            <div className="a-grid2">
              <div className="a-field">
                <label>Lines (one per line — keep them short)</label>
                <textarea
                  rows={4}
                  value={block.lines.join('\n')}
                  onChange={(e) => update(i, { ...block, lines: e.target.value.split('\n') })}
                />
                <span className="hint">Four words per line, three lines maximum.</span>
              </div>
              <div className="a-field">
                <label>Ground</label>
                <select value={block.ground ?? 'ink'} onChange={(e) => update(i, { ...block, ground: e.target.value as 'ink' | 'paper' | 'teal' })}>
                  <option value="ink">Black</option>
                  <option value="teal">Deep teal</option>
                  <option value="paper">White</option>
                </select>
              </div>
            </div>
          ) : null}

          {block.type === 'media-full'
            ? mediaField('Media', block.media, (m) => update(i, { ...block, media: m }))
            : null}

          {block.type === 'media-split' ? (
            <>
              {mediaField('Left', block.left, (m) => update(i, { ...block, left: m }))}
              {mediaField('Right', block.right, (m) => update(i, { ...block, right: m }))}
            </>
          ) : null}

          {block.type === 'media-trio' ? (
            <>
              {block.items.map((item, j) =>
                mediaField(
                  `Item ${j + 1}`,
                  item,
                  (m) => {
                    const items = [...block.items] as [Media, Media, Media];
                    items[j] = m;
                    update(i, { ...block, items });
                  },
                  j,
                ),
              )}
            </>
          ) : null}

          {block.type === 'text' ? (
            <>
              <div className="a-grid2">
                <div className="a-field">
                  <label>Heading (small teal label)</label>
                  <input value={block.heading ?? ''} onChange={(e) => update(i, { ...block, heading: e.target.value })} />
                </div>
                <div className="a-field">
                  <label>Columns</label>
                  <select value={block.columns ?? 1} onChange={(e) => update(i, { ...block, columns: Number(e.target.value) as 1 | 2 })}>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                  </select>
                </div>
              </div>
              <div className="a-field">
                <label>Body (first paragraph is set large)</label>
                <textarea rows={5} value={block.body.join('\n')} onChange={(e) => update(i, { ...block, body: e.target.value.split('\n') })} />
              </div>
            </>
          ) : null}

          {block.type === 'list' ? (
            <>
              <div className="a-field">
                <label>Heading</label>
                <input value={block.heading} onChange={(e) => update(i, { ...block, heading: e.target.value })} />
              </div>
              <div className="a-field">
                <label>Items (one per line)</label>
                <textarea rows={5} value={block.items.join('\n')} onChange={(e) => update(i, { ...block, items: e.target.value.split('\n') })} />
              </div>
            </>
          ) : null}

          {block.type === 'quote' ? (
            <div className="a-grid2">
              <div className="a-field">
                <label>Quote</label>
                <textarea rows={3} value={block.text} onChange={(e) => update(i, { ...block, text: e.target.value })} />
              </div>
              <div className="a-field">
                <label>Attribution</label>
                <input value={block.attribution ?? ''} onChange={(e) => update(i, { ...block, attribution: e.target.value })} />
              </div>
            </div>
          ) : null}
        </div>
      ))}

      <div className="a-chips" style={{ marginTop: 8 }}>
        {Object.keys(TEMPLATES).map((type) => (
          <button key={type} type="button" className="a-chip" onClick={() => add(type)}>
            + {type}
          </button>
        ))}
      </div>
    </>
  );
}
