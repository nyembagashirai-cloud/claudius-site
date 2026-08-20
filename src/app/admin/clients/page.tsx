import { prisma } from '@/lib/db/client';
import { deleteClient, saveClient } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminClients() {
  const clients = await prisma.client.findMany({ orderBy: { order: 'asc' } });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Clients</h1>
          <p className="admin-sub">The animated client wall on the homepage. Order runs left to right.</p>
        </div>
      </div>

      <div className="a-card">
        <h2>Add a client</h2>
        <form action={saveClient}>
          <div className="a-grid3">
            <div className="a-field">
              <label htmlFor="name">Name *</label>
              <input id="name" name="name" required />
            </div>
            <div className="a-field">
              <label htmlFor="logoUrl">Logo URL</label>
              <input id="logoUrl" name="logoUrl" placeholder="Optional" />
            </div>
            <div className="a-field">
              <label htmlFor="order">Order</label>
              <input id="order" name="order" type="number" defaultValue={clients.length} />
            </div>
          </div>
          <label className="a-checkbox">
            <input type="checkbox" name="published" defaultChecked />
            Show on the site
          </label>
          <button type="submit" className="a-btn">
            Add client
          </button>
        </form>
      </div>

      {clients.length === 0 ? (
        <div className="a-empty">
          No clients added — the homepage falls back to the built-in list until you add some.
        </div>
      ) : (
        <table className="a-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Logo</th>
              <th>Visible</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.order}</td>
                <td>{c.name}</td>
                <td>{c.logoUrl ? 'Yes' : '—'}</td>
                <td>{c.published ? 'Yes' : 'Hidden'}</td>
                <td style={{ textAlign: 'right' }}>
                  <form action={deleteClient}>
                    <input type="hidden" name="id" value={c.id} />
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
