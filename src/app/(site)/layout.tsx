import Header from '@/components/chrome/Header';
import Footer from '@/components/chrome/Footer';
import Cursor from '@/components/chrome/Cursor';
import SmoothScroll from '@/components/chrome/SmoothScroll';
import { organisationJsonLd } from '@/lib/seo';

/**
 * Public site chrome. The CMS sits outside this group so it never inherits
 * the fixed header, the custom cursor or smooth scrolling.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <Cursor />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd()) }}
      />
    </>
  );
}
