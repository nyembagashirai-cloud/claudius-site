import { prisma } from '@/lib/db/client';
import { mediaManifest } from '@/content/media-manifest';
import MediaUploader from '@/components/admin/MediaUploader';
import { deleteMedia } from '../actions';
import { addMediaByUrl, syncRepoMedia } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminMedia() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  const uploadsEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  const known = new Set(media.map((m) => m.url));
  const unregistered = mediaManifest.filter((entry) => !known.has(entry.url));

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Media</h1>
          <p className="admin-sub">
            Every image and video the site can use. Anything a project leaves empty renders as a
            labelled placeholder on the front end.
          </p>
        </div>
      </div>

      <div className="a-card">
        <h2>From the repository</h2>
        <p className="admin-sub" style={{ marginBottom: 14 }}>
          Photography lives in <code>public/images/</code>, committed with the code — no upload
          service, no storage allowance. Drop files into a folder named after the client, run{' '}
          <code>npm run media:index</code>, and push. Then register them here so they appear in the
          pickers.
        </p>

        {mediaManifest.length === 0 ? (
          <div className="a-empty">
            Nothing in <code>public/images/</code> yet. See the README in that folder for the
            naming and sizing conventions.
          </div>
        ) : unregistered.length === 0 ? (
          <p className="admin-sub">
            All {mediaManifest.length} file{mediaManifest.length === 1 ? '' : 's'} in{' '}
            <code>public/images/</code> are registered.
          </p>
        ) : (
          <form action={syncRepoMedia}>
            <p className="a-note">
              {unregistered.length} new file{unregistered.length === 1 ? '' : 's'} found:{' '}
              {unregistered.slice(0, 6).map((e) => e.url).join(', ')}
              {unregistered.length > 6 ? ` and ${unregistered.length - 6} more` : ''}
            </p>
            <button type="submit" className="a-btn">
              Register {unregistered.length} file{unregistered.length === 1 ? '' : 's'}
            </button>
          </form>
        )}
      </div>

      <div className="a-card">
        <h2>Other sources</h2>
        <p className="admin-sub" style={{ marginBottom: 14 }}>
          For anything not in the repository — a film on Vimeo, an image on another host.
        </p>

        <form action={addMediaByUrl}>
          <div className="a-grid3">
            <div className="a-field">
              <label htmlFor="url">Add by URL</label>
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

        {uploadsEnabled ? (
          <div style={{ marginTop: 22 }}>
            <MediaUploader enabled />
          </div>
        ) : null}
      </div>

      {media.length === 0 ? (
        <div className="a-empty">Nothing registered yet.</div>
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
                <p>
                  {m.ratio} · {m.kind}
                </p>
                <form action={deleteMedia} style={{ padding: '0 10px 10px' }}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" style={{ color: '#8A2B2B', fontSize: '.75rem' }}>
                    Remove
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
