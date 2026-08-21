# Site imagery

Photography and campaign stills live here, in the repository, alongside the code.
There is no upload service to configure and no storage allowance to run out of —
Vercel serves these straight from its CDN, and Next.js optimises them on the way.

## Adding images

Drop files into a folder named after the client:

```
public/images/
├─ opal/
│   ├─ activation-crowd.jpg
│   ├─ pack-detail.jpg
│   └─ on-shelf.jpg
├─ huletts/
└─ silkea/
```

Then:

```
npm run media:index
```

That indexes the folder so every file appears by name in the CMS media pickers —
on the project editor's hero field and on every media block in a case study. The
index also rebuilds automatically on `npm run dev` and `npm run build`, so a
push is enough on its own.

Commit the images with the code. They deploy together.

## Naming

Lowercase, hyphenated, describing what the picture *is*: `activation-crowd.jpg`,
not `IMG_4821.jpg`. The name is what you will be picking from a dropdown months
from now.

## Before you commit

Resize to no more than 2560px on the long edge and export at around 80% quality.
Next.js generates the responsive sizes from whatever you give it, but it cannot
undo a 12MB camera original — that weight lands in the repository forever.

## Video

Campaign films do not belong here. Put them on YouTube or Vimeo: adaptive
streaming plays properly on a phone on patchy data, self-hosted MP4 does not.
Short silent loops used as texture are the exception, and should be under a
few MB.
