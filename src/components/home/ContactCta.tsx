import Link from 'next/link';
import Reveal from '@/components/primitives/Reveal';
import SplitLines from '@/components/primitives/SplitLines';
import { getSiteSettings } from '@/lib/content';

export default async function ContactCta() {
  const site = await getSiteSettings();
  return (
    <section
      className="wrap bg-teal-700 py-[clamp(110px,18vh,220px)] text-white"
      id="contact-cta"
      data-ground="dark"
    >
      <Reveal>
        <p className="t-label mb-6 text-teal-100">07 — Contact</p>
      </Reveal>

      <SplitLines className="t-display-xl mb-2.5" lines={['HAVE A PROJECT?']} />

      <Reveal delay={120}>
        <p className="cta-sub mb-[clamp(36px,6vh,64px)] text-teal-100">
          Let’s make it impossible to ignore.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <Link href="/contact" className="btn btn-lg">
          Start a conversation <span className="arrow">→</span>
        </Link>
      </Reveal>

      <div className="mt-[clamp(56px,9vh,110px)] grid gap-7 border-t border-white/25 pt-6 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
        <Reveal>
          <h3 className="t-label mb-2 text-teal-100">Studio</h3>
          <p className="text-[.95rem] leading-relaxed">
            {site.city}, {site.country}
          </p>
        </Reveal>
        <Reveal delay={60}>
          <h3 className="t-label mb-2 text-teal-100">New business</h3>
          <p className="text-[.95rem] leading-relaxed">
            <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h3 className="t-label mb-2 text-teal-100">Telephone</h3>
          <p className="text-[.95rem] leading-relaxed">{site.phone || '—'}</p>
        </Reveal>
        <Reveal delay={180}>
          <h3 className="t-label mb-2 text-teal-100">Social</h3>
          <p className="text-[.95rem] leading-relaxed">
            {site.social.map((s) => s.label).join(' · ')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
