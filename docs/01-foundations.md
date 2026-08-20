# CLAUDIUS & CO. — WEBSITE FOUNDATIONS
### Sitemap · Component Architecture · Design System
Version 1.0 — August 2026

---

## 0. WHAT WE TOOK FROM THE REFERENCES

**TBWA** — one idea per screen. The homepage is a stack of full-bleed video cards, each carrying nothing but *client name*, *project title* and an arrow. Navigation is four words. The tagline ("Convention is the enemy.") does the positioning work so the copy never has to. Whitespace is not empty space; it is the pause between statements.

**Ogilvy** — the portfolio *is* the homepage. An 80-card grid of work with client + title metadata, no explanatory paragraphs. The brand is asserted in one sentence at the top and then evidenced for the rest of the page.

**What we are taking:**

| Principle | How Claudius applies it |
|---|---|
| Four-item navigation | Work · Capabilities · About · Contact + persistent `START A PROJECT ↗` |
| Client name above project title | Every card, every case study header, every index row |
| Work presented full-bleed, not thumbnailed | Homepage work cards run edge to edge; hover promotes video |
| One statement per screen | Hero, transition statements, capability sections all get their own viewport |
| Evidence over explanation | About sits *below* the work, not above it |

**What we are deliberately doing differently:** Claudius is not a network — it is an agency that *physically executes*. Neither reference has to prove on-the-ground delivery. We do. So the architecture carries a dedicated **Experiential** movement on the homepage, and every case study ends on execution rather than on awards.

---

## 1. SITEMAP

```
/                             Homepage
/work                         Work index — filterable
/work/[slug]                  Case study
    /work/opal                    Opal — From Idea to Market            [flagship]
    /work/silkea                  Silkéa — Launching a New Personal Care Experience
    /work/icz-591                 Insurance Council of Zimbabwe — Beyond the Boardroom
    /work/huletts                 Huletts — Turning Brand Presence Into Experience
    /work/medtech                 Medtech Group — Building Consumer Brands Across Categories
    /work/sanctuary-insurance     Sanctuary Insurance
    /work/airdc                   AIRDC
    /work/skylake                 Skylake Borehole Drilling
    /work/ingwebu                 Ingwebu
    /work/shower-to-shower        Shower to Shower
    /work/clere                   Clere
    /work/satiskin                Satiskin
    /work/chuipack                Chuipack
/capabilities                 Capabilities — typographic, six movements
/capabilities/[slug]          Optional deep-dive (experiential first)
/about                        About + Approach + Team
/contact                      Contact
/news                         News / Thinking index          [CMS-driven]
/news/[slug]                  Article
/clients/[slug]               Client filter view → /work?client=

/admin                        CMS — authenticated
/admin/projects               List / create / edit / reorder / feature
/admin/projects/[id]          Project editor (all fields)
/admin/media                  Image + video library
/admin/clients                Client logos + ordering
/admin/capabilities           Capability copy
/admin/news                   Articles
/admin/team                   Team members
/admin/settings               Contact details, socials, global SEO

/sitemap.xml  /robots.txt  /opengraph-image  /work/[slug]/opengraph-image
```

**URL rules.** Lowercase, hyphenated, no dates, no `/case-study/` segment. `/work/opal` is the canonical form and never changes once published — the CMS locks the slug after first publish and offers a redirect if it must change.

---

## 2. HOMEPAGE ARCHITECTURE

The homepage is composed as **seven movements**. Each is a full viewport or more. There is no sidebar, no card wall, no "our services".

| # | Movement | Purpose | Dominant element |
|---|---|---|---|
| 1 | **HERO** | Assert the position in five seconds | `WE BUILD BRANDS / FROM IDEA / TO MARKET.` over a cycling montage of work |
| 2 | **SELECTED WORK** | Prove it immediately | Five full-bleed project cards, scroll-driven |
| 3 | **THE STATEMENT** | One line of positioning, alone on black | `WE DON'T JUST MARKET BRANDS. WE HELP BUILD THEM.` |
| 4 | **EXPERIENTIAL** | The differentiator | Horizontal-scroll strip of activation footage |
| 5 | **APPROACH** | End-to-end capability | THINK → CREATE → BUILD → LAUNCH → AMPLIFY → MEASURE, scroll-pinned |
| 6 | **CLIENTS** | Evidence | Dual-direction marquee, click → filtered work |
| 7 | **CONTACT CTA** | Convert | `HAVE A PROJECT? LET'S MAKE IT IMPOSSIBLE TO IGNORE.` |

About does not appear on the homepage as a section. It appears as a single line in the footer and as a nav item. **Show the work. Show the thinking. Show the experience. Then tell people who we are.**

---

## 3. COMPONENT ARCHITECTURE

```
src/
├─ app/
│  ├─ layout.tsx                    Fonts, Lenis, page-transition shell, JSON-LD
│  ├─ page.tsx                      Homepage — composes the 7 movements
│  ├─ work/page.tsx                 Index
│  ├─ work/[slug]/page.tsx          Case study — generateStaticParams
│  ├─ capabilities/page.tsx
│  ├─ about/page.tsx
│  ├─ contact/page.tsx
│  ├─ news/…                        Index + article
│  ├─ admin/…                       CMS (route group, auth-gated)
│  ├─ api/…                         contact, upload, revalidate
│  ├─ sitemap.ts · robots.ts · opengraph-image.tsx
│
├─ components/
│  ├─ chrome/                       Site chrome — persists across routes
│  │   ├─ Header.tsx                Logo + 4 links + CTA; inverts over dark
│  │   ├─ MobileMenu.tsx            Full-screen, staggered, teal ground
│  │   ├─ Footer.tsx
│  │   ├─ Cursor.tsx                Custom cursor; VIEW / DRAG / PLAY states
│  │   └─ PageTransition.tsx        Teal curtain wipe between routes
│  │
│  ├─ primitives/                   The design system in code
│  │   ├─ Reveal.tsx                Fade + rise on enter, staggerable
│  │   ├─ SplitText.tsx             Per-line/word/char mask reveal
│  │   ├─ Marquee.tsx               Bi-directional, velocity-linked
│  │   ├─ MagneticButton.tsx
│  │   ├─ Arrow.tsx · Eyebrow.tsx · SectionIndex.tsx
│  │   ├─ Media.tsx                 next/image or looping <video>, one API
│  │   └─ Placeholder.tsx           Art-directed asset slot (see §7)
│  │
│  ├─ home/
│  │   ├─ Hero.tsx  HeroMontage.tsx
│  │   ├─ SelectedWork.tsx  WorkCard.tsx
│  │   ├─ StatementBand.tsx
│  │   ├─ ExperientialStrip.tsx     Horizontal scroll, pinned
│  │   ├─ ApproachSequence.tsx      Six-step pinned scroll
│  │   ├─ ClientWall.tsx
│  │   └─ ContactCta.tsx
│  │
│  ├─ work/
│  │   ├─ WorkGrid.tsx  WorkFilters.tsx  WorkTile.tsx
│  │
│  ├─ case-study/                   The reusable case-study template
│  │   ├─ CaseHero.tsx              Client · Title · Year · Services
│  │   ├─ CaseIntro.tsx             Challenge / Idea
│  │   ├─ WhatWeDid.tsx             Discipline list, staggered
│  │   ├─ StatementBreak.tsx        Full-screen line between imagery
│  │   ├─ MediaBand.tsx             Full-bleed / split / triptych / portrait pair
│  │   ├─ ResultsBand.tsx
│  │   ├─ Credits.tsx
│  │   └─ RelatedWork.tsx
│  │
│  ├─ capabilities/CapabilityRow.tsx
│  └─ contact/ContactForm.tsx
│
├─ lib/  animation.ts · tokens.ts · seo.ts · db.ts · auth.ts
└─ content/  (pre-CMS seed data; replaced by DB reads)
```

**Rendering strategy.** Every public page is statically generated and revalidated on CMS publish (`revalidateTag`). Animation lives in small `'use client'` leaves; page shells stay server components so the HTML — and therefore the SEO and the LCP — never waits on JavaScript.

---

## 4. DESIGN SYSTEM — COLOUR

Sampled from the supplied logo. Teal 700 is the logo colour, unmodified.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A0A0A` | Primary type, dark grounds |
| `charcoal` | `#151515` | Secondary dark ground, card fills |
| `graphite` | `#3D4144` | Muted type on white |
| `paper` | `#FFFFFF` | Primary ground |
| `fog` | `#F2F4F4` | Quiet neutral band |
| **`teal-700`** | **`#075467`** | **BRAND. Logo, CTAs, curtain, key accents** |
| `teal-900` | `#04323D` | Deep ground, footer, hovers |
| `teal-500` | `#0C7E97` | Interactive / link states |
| `teal-300` | `#4FB6C9` | Pale teal accent |
| `teal-100` | `#B6E2EA` | Light cyan — rules, indices, graphic marks |
| `teal-50` | `#E6F4F7` | Tint ground |

**Rules.** No gold, no unrelated corporate colour, no gradients as decoration. Teal is used *structurally* — the curtain, the CTA, the active filter, the footer — not sprayed across surfaces. Colour and energy come from the work; the identity supplies the frame. Three grounds only: **paper**, **ink**, **teal-900**. Every section sits on one of them.

**Contrast.** Body type meets 4.5:1, large display type 3:1. `teal-700` on `paper` = 8.4:1. `paper` on `teal-700` = 8.4:1. `teal-300` is never used for body text on white.

---

## 5. DESIGN SYSTEM — TYPOGRAPHY

Two families. One variable file does most of the work.

- **Archivo** (variable, `wght` 400–800, `wdth` 62–125) — display and interface. Expanded widths for the enormous statements; normal width for running text.
- **IBM Plex Mono** (400/500) — eyebrows, indices, metadata, filters. Uppercase, tracked `+0.12em`. This is what makes the site read as editorial rather than corporate.

The logo is never set in type. It is always the supplied asset.

### Scale — fluid, `clamp()`-based

| Token | Size | Width / Weight | Leading | Use |
|---|---|---|---|---|
| `display-xxl` | `clamp(3.5rem, 13vw, 13rem)` | 115 / 800 | 0.86 | Hero, statement breaks |
| `display-xl` | `clamp(2.75rem, 8vw, 7.5rem)` | 110 / 800 | 0.90 | Section openers |
| `display-l` | `clamp(2.25rem, 5.5vw, 5rem)` | 105 / 700 | 0.94 | Case-study titles |
| `heading-m` | `clamp(1.5rem, 2.6vw, 2.5rem)` | 100 / 600 | 1.05 | Sub-headings |
| `heading-s` | `clamp(1.125rem, 1.6vw, 1.5rem)` | 100 / 600 | 1.2 | Card titles |
| `body-l` | `clamp(1.0625rem, 1.35vw, 1.375rem)` | 100 / 400 | 1.5 | Lead paragraphs |
| `body` | `1rem` | 100 / 400 | 1.6 | Running text (max 68ch) |
| `label` | `0.75rem` | Mono / 500 | 1.2 | Eyebrows, filters, metadata |
| `index` | `0.6875rem` | Mono / 400 | 1 | Section numbers `01 —` |

**Tracking.** Display sizes tighten to `-0.03em`; body sits at `0`; mono labels open to `+0.12em`. Display type is set flush-left, hyphens off, `text-wrap: balance` on short statements.

**The big-type rule.** A statement never exceeds four words per line and never exceeds three lines. If it does not fit, the copy is wrong — not the type size.

---

## 6. GRID, SPACE, RATIOS

**Grid.** 12 columns desktop · 6 tablet · 4 mobile. Gutter `24px`. Page margin `clamp(20px, 4vw, 72px)`. Full-bleed sections ignore the margin entirely — and they should, often. Asymmetry is the default: content sits on columns 2–8 or 5–12, rarely 1–12.

**Spacing scale** (`4px` base): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 · 256`.
Section rhythm: `clamp(96px, 14vh, 192px)` vertical padding. Statement bands get `100vh` and nothing else.

**Image ratios** — five, no more:

| Ratio | Use |
|---|---|
| `21:9` | Full-bleed cinematic bands, hero video |
| `16:9` | Standard media, activation footage, work cards |
| `4:5` | Editorial portrait — packaging, people, POS |
| `1:1` | Grid tiles, social creative, client marquee |
| `3:2` | Documentary / behind-the-scenes |

Work index tiles alternate `16:9` and `4:5` to break the grid rhythm. All media carries a blur placeholder and an explicit `sizes` attribute.

**Buttons.**

- *Primary* — solid `teal-700`, white mono label, no radius above `2px`, magnetic on hover, arrow translates `4px` right.
- *Secondary* — `1px` rule, transparent fill, fill wipes in from bottom on hover.
- *Text link* — underline draws left-to-right over `320ms`.

Nothing is pill-shaped. Nothing is a rounded card.

**Navigation behaviour.** Fixed, `mix-blend-mode: difference` is *not* used (it fights the logo); instead an IntersectionObserver watches section ground colour and swaps the logo asset + link colour with a `240ms` cross-fade. Header hides on scroll-down past `20vh`, returns on scroll-up. Mobile: full-screen teal-900 overlay, links stagger in at `70ms`, current page marked with a mono index.

**Portfolio card anatomy.**

```
┌──────────────────────────────────────┐
│                                      │  Media fills. Scales 1.0 → 1.04
│            [ 16:9 media ]            │  over 700ms on hover.
│                                      │  Video swaps in, muted, loops.
├──────────────────────────────────────┤
│ 01 —              CLIENT NAME        │  mono index · client (mono, tracked)
│ PROJECT TITLE                        │  display-l, mask-reveals upward
│ Branding · Packaging · Experiential  │  disciplines fade + rise, 60ms stagger
│                    VIEW CASE STUDY → │  appears last
└──────────────────────────────────────┘
```

On touch devices the hover state is the resting state — metadata is always visible, video autoplays only when >60% in view and `prefers-reduced-data` is not set.

---

## 7. ANIMATION LANGUAGE

**Easing.** One curve does 90% of the work: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`. Transitions between states use `cubic-bezier(0.65, 0, 0.35, 1)`. Nothing bounces. Nothing overshoots.

**Durations.** Micro `180ms` · Standard `600ms` · Cinematic `1000–1400ms` (hero, curtain, statement reveals).

**The eight motions** — the whole vocabulary:

1. **Mask reveal** — text rises from behind a clipping edge, per line, `80ms` stagger. Every heading enters this way.
2. **Rise + fade** — `24px` up, opacity 0→1. Every body block, image and list item.
3. **Scale settle** — media enters at `1.06`, settles to `1.0` over `1200ms`.
4. **Parallax drift** — background media moves at `0.85×` scroll. Subtle. Never more than `12%` displacement.
5. **Horizontal pin** — Experiential strip and case-study galleries translate on vertical scroll.
6. **Curtain** — teal-700 panel wipes up on exit, down on enter. `700ms` total. Covers route change.
7. **Marquee** — continuous, speed modulated by scroll velocity, reverses direction on scroll reverse.
8. **Magnetic** — buttons and the cursor attract within a `60px` radius, `0.25` strength, spring-damped.

**Rules.** Everything triggers once, at 20% viewport entry. Nothing animates on scroll-back. Only `transform` and `opacity` — never `width`, `height`, `top` or `filter` in a scroll handler. Scroll smoothing via Lenis at `lerp 0.09`.

**`prefers-reduced-motion`.** Mask reveals become instant. Parallax, scale settle, marquee and pinning switch off. The curtain becomes a `150ms` cross-fade. Horizontal-pin sections reflow to a native horizontal scroller. The site remains complete — it simply stops moving.

---

## 8. PROJECT DATA MODEL

Drives the case-study template, the work index and the CMS.

```ts
Project {
  slug            string   @unique   // locked after publish
  client          string
  title           string
  year            number
  featured        boolean
  order           int                // homepage sequence
  disciplines     Discipline[]       // BRANDING STRATEGY EXPERIENTIAL DIGITAL
                                     // PACKAGING CONTENT WEB CAMPAIGNS
  shortDescription string            // ≤ 160 chars, used on cards + meta
  hero            Media              // image or video
  challenge       richtext
  idea            richtext
  whatWeDid       string[]           // discipline list
  results         richtext?
  blocks          ContentBlock[]     // ordered narrative — see below
  credits         { role, name }[]
  related         Project[]          // manual, falls back to shared disciplines
  seo             { title?, description?, ogImage? }
  status          DRAFT | PUBLISHED
}

ContentBlock =
  | { type: 'statement',  lines: string[], ground: 'ink'|'paper'|'teal' }
  | { type: 'media-full', media: Media, caption? }
  | { type: 'media-split', left: Media, right: Media }
  | { type: 'media-trio', items: Media[3] }
  | { type: 'text',       heading?, body: richtext, columns: 1|2 }
  | { type: 'quote',      text, attribution }
  | { type: 'before-after', before: Media, after: Media }

Media { url, kind: 'image'|'video', alt, ratio, width, height, blurDataUrl, poster? }
```

**Asset placeholders.** Until real photography lands, `<Placeholder>` renders a correctly-proportioned block in `teal-900` carrying a mono label — `OPAL · ACTIVATION · 16:9 · REPLACE`. Layout, rhythm and page weight are therefore final; only the pixels are pending. No stock. No AI imagery. Swapping a placeholder for a real asset is a one-line change in the CMS.

---

## 9. BUILD SEQUENCE

1. ✅ Reference analysis · sitemap · component architecture · design system *(this document)*
2. Homepage prototype — locks the visual system
3. Next.js + TypeScript + Tailwind + GSAP scaffold, tokens codified
4. Production homepage
5. Opal case study → becomes the reusable template
6. Work index, Capabilities, About, Contact, remaining case studies
7. CMS — Postgres + Prisma + `/admin`
8. SEO, performance, accessibility pass
9. Verification and handover

---

*Claudius Teal `#075467` sampled directly from the supplied logo. The logo asset is used as supplied and is never redrawn, recoloured, stretched or set in type.*
