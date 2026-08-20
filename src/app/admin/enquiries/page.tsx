import { prisma } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export default async function AdminEnquiries() {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Enquiries</h1>
          <p className="admin-sub">Everything submitted through the contact form.</p>
        </div>
      </div>

      {enquiries.length === 0 ? (
        <div className="a-empty">No enquiries yet.</div>
      ) : (
        enquiries.map((e) => (
          <div className="a-card" key={e.id}>
            <div className="admin-head" style={{ marginBottom: 12 }}>
              <div>
                <h2>
                  {e.name}
                  {e.company ? ` · ${e.company}` : ''}
                </h2>
                <p className="admin-sub">
                  <a href={`mailto:${e.email}`}>{e.email}</a>
                  {e.phone ? ` · ${e.phone}` : ''}
                  {e.need ? ` · ${e.need}` : ''}
                </p>
              </div>
              <span className="a-badge draft">{e.createdAt.toLocaleString('en-GB')}</span>
            </div>
            <p style={{ whiteSpace: 'pre-wrap', fontSize: '.92rem', lineHeight: 1.6 }}>{e.message}</p>
          </div>
        ))
      )}
    </>
  );
}
