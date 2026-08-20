import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { logout } from './actions';
import './admin.css';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/enquiries', label: 'Enquiries' },
  { href: '/admin/settings', label: 'Settings' },
];

export const metadata = { title: 'CMS', robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // The login screen renders inside this layout too, before a session exists.
  if (!session) return <div className="admin-plain">{children}</div>;

  return (
    <div className="admin">
      <aside className="admin-nav">
        <p className="admin-brand">
          Claudius &amp; Co.
          <span>Content</span>
        </p>
        <nav>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="admin-user">
          <p>{session.name}</p>
          <form action={logout}>
            <button type="submit">Sign out</button>
          </form>
          <Link href="/" target="_blank" rel="noopener">
            View site ↗
          </Link>
        </div>
      </aside>
      <div className="admin-body">{children}</div>
    </div>
  );
}
