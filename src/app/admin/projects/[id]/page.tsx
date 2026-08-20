import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlockEditor from '@/components/admin/BlockEditor';
import { prisma } from '@/lib/db/client';
import { DISCIPLINES, type ContentBlock } from '@/lib/types';
import { saveProject } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function ProjectEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === 'new';

  const project = isNew ? null : await prisma.project.findUnique({ where: { id } });
  if (!isNew && !project) notFound();

  const [media, all] = await Promise.all([
    prisma.media.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.project.findMany({ select: { slug: true, client: true }, orderBy: { order: 'asc' } }),
  ]);

  const credits = ((project?.credits as unknown as { role: string; name: string }[]) ?? [])
    .map((c) => `${c.role} | ${c.name}`)
    .join('\n');

  return (
    <form action={saveProject}>
      <input type="hidden" name="id" value={project?.id ?? ''} />

      <div className="admin-head">
        <div>
          <h1>{isNew ? 'New project' : project!.client}</h1>
          <p className="admin-sub">
            {isNew
              ? 'Client, title, slug and a hero image are enough to publish. The rest builds the case study.'
              : `/work/${project!.slug}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/admin/projects" className="a-btn ghost">
            Cancel
          </Link>
          <button type="submit" className="a-btn">
            Save project
          </button>
        </div>
      </div>

      <div className="a-card">
        <h2>The basics</h2>
        <div className="a-grid2">
          <div className="a-field">
            <label htmlFor="client">Client *</label>
            <input id="client" name="client" defaultValue={project?.client ?? ''} required />
          </div>
          <div className="a-field">
            <label htmlFor="title">Project title *</label>
            <input id="title" name="title" defaultValue={project?.title ?? ''} required />
          </div>
        </div>
        <div className="a-grid3">
          <div className="a-field">
            <label htmlFor="slug">URL slug *</label>
            <input id="slug" name="slug" defaultValue={project?.slug ?? ''} required />
            <span className="hint">Lives at /work/&lt;slug&gt;. Avoid changing it once published.</span>
          </div>
          <div className="a-field">
            <label htmlFor="year">Year</label>
            <input id="year" name="year" type="number" defaultValue={project?.year ?? new Date().getFullYear()} />
          </div>
          <div className="a-field">
            <label htmlFor="order">Order</label>
            <input id="order" name="order" type="number" defaultValue={project?.order ?? 0} />
          </div>
        </div>
        <div className="a-field">
          <label htmlFor="shortDescription">Short description *</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows={2}
            maxLength={200}
            defaultValue={project?.shortDescription ?? ''}
            required
          />
          <span className="hint">Used on cards and as the fallback meta description. Keep under 160 characters.</span>
        </div>
        <div className="a-grid2">
          <div className="a-field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={project?.status ?? 'DRAFT'}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
          <div className="a-field">
            <label htmlFor="heroMediaId">Hero image or video</label>
            <select id="heroMediaId" name="heroMediaId" defaultValue={project?.heroMediaId ?? ''}>
              <option value="">— placeholder (no file yet) —</option>
              {media.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.alt || m.url.split('/').pop()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="a-checkbox">
          <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} />
          Feature on the homepage
        </label>
      </div>

      <div className="a-card">
        <h2>Disciplines</h2>
        <p className="admin-sub" style={{ marginBottom: 14 }}>
          Drives filtering on the work index.
        </p>
        <div className="a-chips">
          {DISCIPLINES.map((d) => (
            <label key={d} className="a-chip">
              <input
                type="checkbox"
                name="disciplines"
                value={d}
                defaultChecked={project?.disciplines?.includes(d) ?? false}
              />
              {d}
            </label>
          ))}
        </div>
      </div>

      <div className="a-card">
        <h2>The story</h2>
        <div className="a-grid2">
          <div className="a-field">
            <label htmlFor="challenge">The challenge (one paragraph per line)</label>
            <textarea id="challenge" name="challenge" rows={5} defaultValue={project?.challenge?.join('\n') ?? ''} />
          </div>
          <div className="a-field">
            <label htmlFor="idea">The idea (one paragraph per line)</label>
            <textarea id="idea" name="idea" rows={5} defaultValue={project?.idea?.join('\n') ?? ''} />
          </div>
        </div>
        <div className="a-grid2">
          <div className="a-field">
            <label htmlFor="whatWeDid">What we did (one per line)</label>
            <textarea id="whatWeDid" name="whatWeDid" rows={7} defaultValue={project?.whatWeDid?.join('\n') ?? ''} />
          </div>
          <div className="a-field">
            <label htmlFor="services">Services shown on cards (one per line)</label>
            <textarea id="services" name="services" rows={7} defaultValue={project?.services?.join('\n') ?? ''} />
          </div>
        </div>
        <div className="a-field">
          <label htmlFor="results">The outcome (one paragraph per line)</label>
          <textarea id="results" name="results" rows={4} defaultValue={project?.results?.join('\n') ?? ''} />
        </div>
      </div>

      <div className="a-card">
        <h2>Narrative</h2>
        <p className="admin-sub" style={{ marginBottom: 16 }}>
          The visual storytelling sequence between the story and the outcome. Alternate imagery with
          short statements — that rhythm is what makes the page cinematic.
        </p>
        <BlockEditor
          initial={(project?.blocks as unknown as ContentBlock[]) ?? []}
          mediaOptions={media.map((m) => ({ id: m.id, url: m.url, alt: m.alt, ratio: m.ratio }))}
        />
      </div>

      <div className="a-card">
        <h2>Credits &amp; related</h2>
        <div className="a-grid2">
          <div className="a-field">
            <label htmlFor="credits">Credits — one per line, &ldquo;Role | Name&rdquo;</label>
            <textarea id="credits" name="credits" rows={5} defaultValue={credits} />
          </div>
          <div className="a-field">
            <label htmlFor="related">Related project slugs (one per line)</label>
            <textarea id="related" name="related" rows={5} defaultValue={project?.related?.join('\n') ?? ''} />
            <span className="hint">
              Available: {all.map((p) => p.slug).join(', ') || 'none yet'}. Leave blank to match automatically by discipline.
            </span>
          </div>
        </div>
      </div>

      <div className="a-card">
        <h2>SEO</h2>
        <div className="a-grid2">
          <div className="a-field">
            <label htmlFor="seoTitle">Meta title</label>
            <input id="seoTitle" name="seoTitle" defaultValue={project?.seoTitle ?? ''} />
            <span className="hint">Defaults to &ldquo;Client — Project title&rdquo;.</span>
          </div>
          <div className="a-field">
            <label htmlFor="seoDescription">Meta description</label>
            <textarea id="seoDescription" name="seoDescription" rows={3} defaultValue={project?.seoDescription ?? ''} />
            <span className="hint">Defaults to the short description.</span>
          </div>
        </div>
      </div>

      <button type="submit" className="a-btn">
        Save project
      </button>
    </form>
  );
}
