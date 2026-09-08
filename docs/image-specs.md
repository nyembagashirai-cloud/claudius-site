# Image specifications — homepage

Every slot on the homepage is `object-fit: cover`, which means the image fills
the frame and whatever does not fit is cropped from the edges. Supply generous
files and let the site crop them; do not pre-crop to each ratio.

Everything below is measured from the actual CSS, at 2× for retina screens.

---

## 1. Selected work — the five project cards

**This is the set that matters.** These are the largest images on the site and
the first work anyone sees.

**One master file per project:**

| | |
|---|---|
| **Dimensions** | **2560 × 1440 px** (16:9) |
| Format | JPEG, sRGB, quality ~80 |
| Target file size | Under 450 KB |
| Naming | `public/images/<client>/hero.jpg` |

### The crop problem — read this before choosing photographs

The same file is used at three different shapes, and the site crops from the
centre each time:

| Where | Shape | What survives |
|---|---|---|
| Card 1, desktop (Opal) | 21:9 | Full width, middle **1097 px** of height |
| Cards 2–5, desktop | 16:9 / 3:2 | Nearly all of it |
| **Every card on mobile** | 4:5 | Full height, middle **1152 px** of width |

So a photograph has to work both as a letterbox strip *and* as a tall portrait.

**Safe area: keep the subject inside the central 1152 × 1097 px box.** That is
roughly the middle 45% of the width and 76% of the height. Anything outside it
disappears on one device or the other.

In practice this means: subject centred, room around it, no important detail
near an edge. A wide shot of an activation with the branding hard left will lose
the branding on every phone.

If a project's best photograph simply cannot survive both crops, say so — the
site can be extended to take a separate mobile file per project. It does not do
that today.

---

## 2. Hero montage — four tiles

The tiles drifting behind the headline. They render small — 300 px at the very
largest — so these do not need to be big.

| Slot | Shape | Supply | Subject |
|---|---|---|---|
| Top right, tall | 4:5 | **800 × 1000** | An activation — people, crowd, energy |
| Upper middle, square | 1:1 | **800 × 800** | Packaging, close and graphic |
| Lower right, wide | 16:9 | **1200 × 675** | Roadshow or event, wide |
| Upper left, small | 3:2 | **1000 × 667** | Retail POS or merchandising |

Under 200 KB each. Pick four that read instantly at postcard size — a face, a
pack, a crowd. Anything requiring study is wasted here.

The fourth is hidden on mobile; the other three stay.

---

## 3. Experiential strip — six panels

The horizontal scroll. Roughly half-screen each on desktop.

| Shape | Supply | Suggested subject |
|---|---|---|
| 16:9 | **1600 × 900** | Roadshow, wide |
| 4:5 | **1000 × 1250** | Sampling, close on the interaction |
| 16:9 | **1600 × 900** | Retail activation |
| 4:5 | **1000 × 1250** | Exhibition build |
| 16:9 | **1600 × 900** | Product launch |
| 3:2 | **1400 × 933** | Promoter team |

Under 300 KB each. Three of these were designed as video slots — for now use the
strongest still frame from that footage. See the note on video below.

---

## 4. Client logos

Not needed. The client wall is typographic — outlined names in the brand
typeface, not logos. Nothing to supply.

---

## Preparing the files

**Export settings.** JPEG, sRGB colour profile, quality 80. Not PNG — it will be
three to five times larger for a photograph with no visible benefit. PNG only
for graphics with flat colour or transparency.

**Do not upscale.** If the original is 1400 px wide, supply 1400 px. Enlarging it
adds file size and no detail.

**Do not pre-optimise beyond this.** Next.js generates WebP and AVIF versions at
every screen size automatically. Your job is to supply one good large original.

**Colour.** These sit on white, black and deep teal grounds. Images with a strong
colour cast will fight the identity. Neutral, well-exposed, properly white
balanced.

---

## Video

The site plays a `<video>` file if you give it one, but campaign films should not
go in the repository — they are large, they get committed to git history
permanently, and a self-hosted MP4 has no adaptive streaming, which matters on
Zimbabwean mobile data.

Put films on YouTube or Vimeo. The site does not yet support embedding them;
that is a small piece of work whenever you are ready.

Short silent loops used as texture are the exception — under 3 MB, `.mp4`, no
audio track.
