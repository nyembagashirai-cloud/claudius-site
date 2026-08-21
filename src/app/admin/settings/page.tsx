import { prisma } from '@/lib/db/client';
import { site } from '@/content/site';
import { saveSettings } from '../actions';

export const dynamic = 'force-dynamic';

interface SiteSettings {
  email?: string; phone?: string; whatsapp?: string; city?: string; country?: string;
  instagram?: string; linkedin?: string; facebook?: string;
  seoTitle?: string; seoDescription?: string;
}

export default async function AdminSettings() {
  const row = await prisma.setting.findUnique({ where: { key: 'site' } });
  const s = (row?.value as SiteSettings) ?? {};

  return (
    <form action={saveSettings}>
      <div className="admin-head">
        <div>
          <h1>Settings</h1>
          <p className="admin-sub">Contact details, social links and the site-wide SEO defaults.</p>
        </div>
        <button type="submit" className="a-btn">
          Save settings
        </button>
      </div>

      <div className="a-card">
        <h2>Contact</h2>
        <div className="a-grid2">
          <div className="a-field">
            <label htmlFor="email">New business email</label>
            <input id="email" name="email" type="email" defaultValue={s.email ?? site.email} />
          </div>
          <div className="a-field">
            <label htmlFor="phone">Telephone</label>
            <input id="phone" name="phone" defaultValue={s.phone ?? site.phone} />
          </div>
          <div className="a-field">
            <label htmlFor="whatsapp">WhatsApp number</label>
            <input id="whatsapp" name="whatsapp" defaultValue={s.whatsapp ?? site.whatsapp} />
            <span className="hint">
              Country code first, digits only — e.g. 263772282549. Drives the floating WhatsApp
              button and the contact page. Clear it to hide both.
            </span>
          </div>
          <div className="a-field">
            <label htmlFor="city">City</label>
            <input id="city" name="city" defaultValue={s.city ?? site.city} />
          </div>
          <div className="a-field">
            <label htmlFor="country">Country</label>
            <input id="country" name="country" defaultValue={s.country ?? site.country} />
          </div>
        </div>
      </div>

      <div className="a-card">
        <h2>Social</h2>
        <div className="a-grid3">
          <div className="a-field">
            <label htmlFor="instagram">Instagram</label>
            <input id="instagram" name="instagram" defaultValue={s.instagram ?? ''} />
          </div>
          <div className="a-field">
            <label htmlFor="linkedin">LinkedIn</label>
            <input id="linkedin" name="linkedin" defaultValue={s.linkedin ?? ''} />
          </div>
          <div className="a-field">
            <label htmlFor="facebook">Facebook</label>
            <input id="facebook" name="facebook" defaultValue={s.facebook ?? ''} />
          </div>
        </div>
      </div>

      <div className="a-card">
        <h2>SEO defaults</h2>
        <div className="a-field">
          <label htmlFor="seoTitle">Default page title</label>
          <input id="seoTitle" name="seoTitle" defaultValue={s.seoTitle ?? `${site.name} — ${site.tagline}`} />
        </div>
        <div className="a-field">
          <label htmlFor="seoDescription">Default meta description</label>
          <textarea id="seoDescription" name="seoDescription" rows={3} defaultValue={s.seoDescription ?? site.description} />
        </div>
      </div>

      <button type="submit" className="a-btn">
        Save settings
      </button>
    </form>
  );
}
