# Claudius & Co.

The website for Claudius & Co. — a Zimbabwean integrated marketing and creative agency.

Built as a living portfolio rather than a company profile: **the work is the hero, About is a nav item.**

- **Front end** — Next.js 16 (App Router), TypeScript, Tailwind CSS v4, GSAP + Lenis
- **CMS** — custom admin at `/admin`, Postgres via Prisma
- **Media** — Vercel Blob (optional; the site runs without it)

Design system, sitemap and component architecture: [`docs/01-foundations.md`](./docs/01-foundations.md).

---

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run db:push                # create the tables
npm run db:seed                # seed content + the first editor account
npm run dev
```

Open <http://localhost:3000>. The CMS is at <http://localhost:3000/admin>.

### Running without a database

Leave `DATABASE_URL` unset and the public site renders from the seed content in
`src/content/projects.ts`. Everything works except the CMS. This is deliberate — a
database outage degrades the site to its last-known content rather than to a blank page.

---

## Environment

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URLs, sitemap, social previews |
| `DATABASE_URL` | for the CMS | Postgres connection string |
| `AUTH_SECRET` | for the CMS | Signs admin sessions. `openssl rand -base64 48` |
| `BLOB_READ_WRITE_TOKEN` | for uploads | Vercel Blob store. Without it, media can still be added by URL |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | first run only | Creates the first editor account via `npm run db:seed` |

Never commit `.env.local`. Rotate `AUTH_SECRET` and the seeded admin password before launch.

---

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | `prisma generate` then a production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run db:push` | Sync the schema to the database (no migration history) |
| `npm run db:migrate` | Create and apply a migration |
| `npm run db:seed` | Seed projects, clients, capabilities, first admin |
| `npm run db:studio` | Prisma Studio |

---

## Project structure

```
src/
├─ app/
│  ├─ (site)/            Public site — carries the header, footer, cursor, smooth scroll
│  │   ├─ page.tsx           Homepage: seven movements
│  │   ├─ work/              Index + /work/[slug] case studies
│  │   ├─ capabilities/ about/ contact/
│  │   └─ template.tsx       Route-transition curtain
│  ├─ admin/             CMS — no public chrome, gated by middleware
│  ├─ api/               contact form, signed blob uploads
│  ├─ layout.tsx         Fonts + globals only
│  ├─ globals.css        Design tokens and every component style
│  └─ sitemap.ts · robots.ts · opengraph-image.tsx · icon.png
├─ components/
│  ├─ chrome/            Header, MobileMenu, Footer, Cursor, SmoothScroll
│  ├─ primitives/        Reveal, SplitLines, Media, Marquee, MagneticLink
│  ├─ home/ work/ case-study/ capabilities/ contact/ admin/
├─ content/              Seed content — projects, site settings, capabilities
├─ lib/                  content access, types, seo, auth, fonts, db
└─ fonts/                Self-hosted Archivo + IBM Plex Mono (woff2)
```

---

## Adding a project

1. **Media → Add media** — upload the campaign images and video, or paste URLs.
2. **Projects → + New project** — client, title, slug, short description, hero.
3. Tick the disciplines. These drive filtering on `/work`.
4. Fill **The story** — challenge, idea, what we did, outcome.
5. Build the **Narrative**: alternate media blocks with short statement blocks.
   That rhythm is what makes the case study cinematic. Keep statements to four
   words a line, three lines maximum.
6. Set **Status → Published**, and tick *Feature on the homepage* for the top five.

The public pages revalidate automatically on save.

### Placeholders

Any media slot without a file renders as a labelled, correctly-proportioned
placeholder — `OPAL · CAMPAIGN IMAGE · 21:9 · REPLACE`. Layout, rhythm and page
weight are therefore already final; only the pixels are pending. Replacing one is
a single dropdown change in the CMS.

---

## Design rules worth keeping

- The logo is used as supplied. It is never redrawn, recoloured, stretched or set in type.
  `public/brand/claudius-logo-original.png` is the untouched original.
- Claudius Teal is `#075467`, sampled from that logo. No gold. No unrelated corporate colour.
- Three grounds only: white, black, deep teal. Every section sits on one of them.
- Colour and energy come from the work. The identity supplies the structure.
- A statement never exceeds four words per line or three lines. If it does not fit,
  the copy is wrong — not the type size.
- Motion is `transform` and `opacity` only. Everything triggers once, at 20% viewport entry.

---

## Accessibility & performance

- Passes automated WCAG 2.1 AA checks (axe-core) on every public page.
- Full `prefers-reduced-motion` support: mask reveals become instant, parallax,
  marquees and scroll-pinning switch off, and the horizontal experiential strip
  becomes an ordinary scroller. The site stops moving; nothing is lost.
- Keyboard reachable throughout, with a skip link and visible focus rings.
- Fonts are self-hosted and preloaded — no third-party requests at runtime.
- Public pages are statically generated and revalidated on CMS publish.

To re-run the accessibility check locally, build and start the site, then point
axe-core at it (see `docs/` for the script used during development).

---

## Deployment

Designed for Vercel.

1. Push the repo and import it.
2. Add the environment variables above.
3. Provision Postgres (Vercel Postgres, Neon, Supabase — any Postgres works) and a Blob store.
4. First deploy: run `npm run db:push` and `npm run db:seed` against the production
   database, then remove `ADMIN_PASSWORD` from the environment.
5. Sign in at `/admin`, change the password, and start replacing placeholders with
   the real work.

`/admin` and `/api/` are excluded from `robots.txt` and the CMS is `noindex`.

---

## Still to come

- Real photography, campaign video and client logos (every slot is labelled and waiting).
- The official reversed (white) logo asset. `claudius-logo-reversed.png` is a
  knock-out of the supplied original, used on dark grounds until the brand pack version lands.
- News / Thinking section — the route is in the sitemap plan but not yet built.
- Team profiles on About.
