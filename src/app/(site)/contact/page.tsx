import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/primitives/Reveal';
import SplitLines from '@/components/primitives/SplitLines';
import { whatsappLink } from '@/content/site';
import { getSiteSettings } from '@/lib/content';
import { WhatsAppGlyph } from '@/components/chrome/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a project? Let’s make it impossible to ignore. Talk to Claudius & Co. in Harare, Zimbabwe.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const site = await getSiteSettings();
  const whatsapp = whatsappLink(site.whatsapp);
  return (
    <section className="wrap bg-teal-700 pb-[var(--section)] pt-[clamp(120px,20vh,220px)] text-white" data-ground="dark">
      <p className="t-label mb-5 text-teal-100">Contact</p>
      <SplitLines as="h1" immediate className="t-display-xl" lines={['HAVE A PROJECT?']} />
      <Reveal delay={200}>
        <p className="cta-sub mb-[clamp(48px,8vh,90px)] mt-3 text-teal-100">
          Let’s make it impossible to ignore.
        </p>
      </Reveal>

      {whatsapp ? (
        <Reveal delay={260}>
          <div className="contact-fast">
            <div>
              <h2 className="t-label mb-2 text-teal-100">In a hurry?</h2>
              <p className="t-body max-w-[38ch]">
                Message us on WhatsApp and you will usually get a reply the same day.
              </p>
            </div>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="wa-inline">
              <WhatsAppGlyph size={18} /> {site.phone || 'WhatsApp us'}
            </a>
          </div>
        </Reveal>
      ) : null}

      <div className="contact-layout">
        <ContactForm />

        <aside className="contact-aside">
          <Reveal>
            <h2 className="t-label mb-3 text-teal-100">Studio</h2>
            <p className="t-body mb-8">
              {site.city}, {site.country}
            </p>
            <h2 className="t-label mb-3 text-teal-100">New business</h2>
            <p className="t-body mb-8">
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </p>
            <h2 className="t-label mb-3 text-teal-100">WhatsApp</h2>
            <p className="t-body mb-8">
              {whatsapp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {site.phone || 'Message us'}
                </a>
              ) : (
                '—'
              )}
            </p>
            <h2 className="t-label mb-3 text-teal-100">Social</h2>
            <ul className="t-body">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="link-underline" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
