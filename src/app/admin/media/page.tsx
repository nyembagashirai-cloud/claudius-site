import { prisma } from '@/lib/db/client';
import MediaUploader from '@/components/admin/MediaUploader';
import { deleteMedia } from '../actions';
import { addMediaByUrl } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminMedia() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  const uploadsEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Media</h1>
          <p className="admin-sub">
            Every image and video used across the site. Anything not filled here renders as a labelled
            placeholder on the front end.
          </p>
        </div>
      </div>

      <div className="a-card">
        <h2>Add media</h2>
        <MediaUploader enabled={uploadsEnabled} />

        <form action={addMediaByUrl} style={{ marginTop: 18 }}>
          <div className="a-grid3">
            <div className="a-field">
              <label htmlFor="url">…or add by URL</label>
              <input id="url" name="url" placeholder="https://…" required />
            </div>
            <div className="a-field">
              <label htmlFor="alt">Alt text</label>
              <input id="alt" name="alt" />
            </div>
            <div className="a-field">
              <label htmlFor="ratio">Ratio</label>
              <select id="ratio" name="ratio" defaultValue="16:9">
                {['21:9', '16:9', '4:5', '1:1', '3:2'].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="a-btn ghost">
            Add
          </button>
        </form>
      </div>

      {media.length === 0 ? (
        <div className="a-empty">No media yet.</div>
      ) : (
        <div className="a-media-grid">
          {media.map((m) => (
            <figure key={m.id} className="a-media-item">
              {m.kind === 'video' ? (
                <video src={m.url} muted playsInline style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={m.url} alt={m.alt} />
              )}
              <figcaption>
                <p>{m.alt || m.url.split('/').pop()}</p>
                <p>{m.ratio} · {m.kind}</p>
                <form action={deleteMedia} style={{ padding: '0 10px 10px' }}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" style={{ color: '#8A2B2B', fontSize: '.75rem' }}>
                    Delete
                  </button>
                </form>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
