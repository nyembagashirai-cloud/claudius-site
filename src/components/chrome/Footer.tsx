import Image from 'next/image';
import Link from 'next/link';
import { nav } from '@/content/site';
import { getSiteSettings } from '@/lib/content';
import { featuredSlugs, projects } from '@/content/projects';

export default async function Footer() {
  const settings = await getSiteSettings();
  const featured = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <footer className="ground-ink wrap pb-8 pt-[clamp(56px,8vh,90px)]" data-ground="dark">
      <div className="flex flex-wrap items-start justify-between gap-10">
        <div>
          <Image
            src="/brand/claudius-logo-reversed.png"
            alt="Claudius & Co."
            width={760}
            height={110}
            className="h-auto w-[clamp(160px,16vw,220px)]"
          />
          <p className="mt-5 max-w-[30ch] text-[.95rem] leading-relaxed text-white/70">
            Vibrant ideas.
            <br />
            Professional execution.
          </p>
        </div>

        <div className="flex flex-wrap gap-[clamp(24px,4vw,64px)] text-white/70">
          <nav aria-label="Footer">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="t-label block py-1 transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div>
            {featured.map((p) => (
              <Link key={p!.slug} href={`/work/${p!.slug}`} className="t-label block py-1 transition-colors hover:text-white">
                {p!.client}
              </Link>
            ))}
          </div>
          <div>
            {settings.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="t-label block py-1 transition-colors hover:text-white"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="t-index mt-[clamp(40px,6vh,72px)] flex flex-wrap justify-between gap-5 border-t border-white/15 pt-5 text-white/60">
        <span>© {new Date().getFullYear()} Claudius &amp; Co. All rights reserved.</span>
        <span>
          {settings.city} · {settings.country}
        </span>
      </div>
    </footer>
  );
}
