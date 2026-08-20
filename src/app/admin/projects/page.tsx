import Link from 'next/link';
import { prisma } from '@/lib/db/client';
import { deleteProject, toggleProjectStatus } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Projects</h1>
          <p className="admin-sub">Order controls the sequence on the homepage and work index.</p>
        </div>
        <Link href="/admin/projects/new" className="a-btn">
          + New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="a-empty">
          No projects yet. The site is showing the built-in seed content until you add the first one.
        </div>
      ) : (
        <table className="a-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Project</th>
              <th>Year</th>
              <th>Featured</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.order}</td>
                <td>
                  <strong>{p.client}</strong>
                  <br />
                  <span className="admin-sub">/work/{p.slug}</span>
                </td>
                <td>{p.title}</td>
                <td>{p.year}</td>
                <td>{p.featured ? 'Yes' : '—'}</td>
                <td>
                  <span className={`a-badge ${p.status === 'PUBLISHED' ? 'published' : 'draft'}`}>
                    {p.status.toLowerCase()}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Link href={`/admin/projects/${p.id}`} className="a-btn ghost">
                    Edit
                  </Link>
                  <form action={toggleProjectStatus}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="a-btn ghost">
                      {p.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                    </button>
                  </form>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="a-btn danger">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
