import Header from '@/components/chrome/Header';
import Footer from '@/components/chrome/Footer';
import Cursor from '@/components/chrome/Cursor';
import SmoothScroll from '@/components/chrome/SmoothScroll';
import WhatsAppButton from '@/components/chrome/WhatsAppButton';
import { whatsappLink } from '@/content/site';
import { getSiteSettings } from '@/lib/content';
import { organisationJsonLd } from '@/lib/seo';

/**
 * Public site chrome. The CMS sits outside this group so it never inherits
 * the fixed header, the custom cursor or smooth scrolling.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const whatsapp = whatsappLink(settings.whatsapp);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <Cursor />
      <Header />
      <main id="main">{children}</main>
      {whatsapp ? <WhatsAppButton href={whatsapp} /> : null}
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd()) }}
      />
    </>
  );
}
