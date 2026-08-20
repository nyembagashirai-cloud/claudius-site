import Link from 'next/link';
import { prisma } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [projects, published, media, enquiries, clients] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: 'PUBLISHED' } }),
    prisma.media.count(),
    prisma.enquiry.count(),
    prisma.client.count(),
  ]);

  const recent = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Dashboard</h1>
          <p className="admin-sub">Everything on the public site is managed from here.</p>
        </div>
        <Link href="/admin/projects/new" className="a-btn">
          + New project
        </Link>
      </div>

      <div className="a-grid3">
        <div className="a-card">
          <h2>Projects</h2>
          <p className="admin-sub">
            {published} published · {projects - published} draft
          </p>
        </div>
        <div className="a-card">
          <h2>Media</h2>
          <p className="admin-sub">{media} files</p>
        </div>
        <div className="a-card">
          <h2>Enquiries</h2>
          <p className="admin-sub">{enquiries} received</p>
        </div>
      </div>

      {clients === 0 ? (
        <p className="a-note">
          No clients added yet — the homepage client wall falls back to the built-in list until you add some.
        </p>
      ) : null}

      <div className="a-card">
        <h2>Recent enquiries</h2>
        {recent.length === 0 ? (
          <p className="admin-sub">Nothing yet.</p>
        ) : (
          <table className="a-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Need</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.company ?? '—'}</td>
                  <td>{e.need ?? '—'}</td>
                  <td>{e.createdAt.toLocaleDateString('en-GB')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
