import type { Project } from '@/lib/types';

/**
 * Seed content. The CMS writes to Postgres; when DATABASE_URL is absent
 * (local preview, first deploy) the site reads these instead, so the
 * site is never blank.
 *
 * A `Media` entry with no `src` renders as a labelled placeholder, so a slot
 * that has no photograph yet still holds its shape.
 */
export const projects: Project[] = [
  /* ---------------------------------------------------------- OPAL */
  {
    slug: 'opal',
    client: 'OPAL',
    title: 'From Product Idea to Market',
    year: 2025,
    featured: true,
    order: 1,
    disciplines: ['BRANDING', 'PACKAGING', 'STRATEGY', 'EXPERIENTIAL', 'DIGITAL', 'CAMPAIGNS'],
    services: ['Brand Development', 'Packaging', 'Launch Strategy', 'Experiential', 'Merchandising', 'Digital'],
    shortDescription:
      'Building a washing powder brand from concept and packaging into a consumer-facing FMCG brand.',
    hero: {
      src: '/images/opal/activation-dance.jpg',
      alt: 'Promoters dancing in front of the branded Opal roadshow truck at a consumer activation',
      ratio: '21:9',
      slot: 'Opal · roadshow',
    },
    challenge: [
      'The opportunity was bigger than launching another washing powder.',
      'In a highly competitive homecare category, Opal needed a distinctive identity, credible packaging and a market-entry strategy capable of creating recognition quickly.',
    ],
    idea: [
      'Build the brand before the launch, not after it.',
      'Claudius & Co. worked across the whole brand journey — shaping Opal from concept and packaging into a consumer-facing FMCG brand supported by experiential marketing, retail execution, merchandising and digital communication.',
    ],
    whatWeDid: [
      'Brand Naming & Concept Development',
      'Brand Positioning & Visual Direction',
      'Consumer-Facing Identity',
      'Packaging Design',
      'Launch Communication Strategy',
      'Market Launch',
      'Experiential Marketing',
      'Retail Activations',
      'Merchandising',
      'Content Creation',
      'Digital Marketing',
      'Paid Media',
    ],
    results: [
      'Opal transitioned from a product concept into a fully developed and actively marketed FMCG brand, supported by a connected ecosystem of packaging, experiential marketing, retail execution, merchandising and digital communication.',
      'The same identity consumers encountered online appeared on shelf and at activations. Physical experiences generated digital content. Merchandising connected awareness to purchase. Each touchpoint reinforced the next.',
    ],
    blocks: [
      {
        type: 'media-full',
        media: {
          src: '/images/opal/pack-2kg.png',
          fit: 'contain',
          alt: 'The Opal washing powder 2kg pack',
          ratio: '16:9',
          slot: 'Opal · pack',
        },
      },
      {
        type: 'text',
        heading: '01 — Brand Development',
        body: [
          'From a product idea to a consumer brand.',
          'Our involvement began before Opal reached the shelf. The focus was to create a brand that felt immediately credible within the laundry category while retaining enough personality and visual strength to build recognition of its own.',
        ],
      },
      {
        type: 'media-split',
        left: {
          src: '/images/opal/mascot.png',
          fit: 'contain',
          alt: 'The Opal brand mascot in a laundry setting',
          ratio: '4:5',
          slot: 'Opal · brand character',
        },
        right: {
          src: '/images/opal/character-kv.jpg',
          alt: 'The Opal brand character on a campaign key visual with the pack range',
          ratio: '4:5',
          slot: 'Opal · character campaign',
        },
      },
      {
        type: 'text',
        heading: '02 — Packaging Design',
        body: [
          'Designed to win at the shelf.',
          'For FMCG brands, the pack is often the first and most persistent advertisement. Opal’s packaging needed to attract attention, communicate the product clearly and remain recognisable in busy retail environments.',
        ],
      },
      {
        type: 'list',
        heading: 'Packaging objectives',
        items: [
          'Strong shelf visibility',
          'Clear product communication',
          'Distinctive brand recognition',
          'A scalable visual system for future variants',
        ],
      },
      { type: 'statement', lines: ['WE DIDN’T JUST', 'MARKET OPAL.'], ground: 'ink' },
      {
        type: 'text',
        heading: '03 — Market Launch',
        body: [
          'Making Opal difficult to ignore.',
          'The launch was designed as an integrated market-entry programme rather than a single event. The objective was to create repeated consumer exposure across the places where awareness, experience and purchase decisions happen.',
        ],
      },
      {
        type: 'list',
        heading: 'See · Experience · Find · Buy',
        items: ['SEE — Digital & visibility', 'EXPERIENCE — Activations', 'FIND — Merchandising', 'BUY — Retail'],
      },
      {
        type: 'media-trio',
        items: [
          {
            src: '/images/opal/activation-promoters.jpg',
            alt: 'Opal promoters lined up behind the ONE BIG PROMO prize display',
            ratio: '1:1',
            slot: 'Opal · promoters',
          },
          {
            src: '/images/opal/activation-table.jpg',
            alt: 'Promoters behind an Opal activation table stocked with the pack range',
            ratio: '1:1',
            slot: 'Opal · activation table',
          },
          {
            src: '/images/opal/gazebo-shopper.jpg',
            alt: 'A promoter handing an Opal pack to a shopper at a branded gazebo',
            ratio: '1:1',
            slot: 'Opal · sampling',
          },
        ],
      },
      { type: 'statement', lines: ['WE HELPED', 'BUILD IT.'], ground: 'teal' },
      {
        type: 'text',
        heading: '04 — Experiential Marketing',
        body: [
          'Putting the brand in people’s hands.',
          'Consumer activations took Opal directly into real-world environments. Branded setups, promoters, demonstrations, entertainment, giveaways and face-to-face engagement helped turn an unfamiliar product into a brand people could encounter, experience and remember.',
        ],
      },
      {
        type: 'list',
        heading: 'The role of activation',
        items: [
          'Build awareness',
          'Encourage product trial',
          'Demonstrate product benefits',
          'Create memorable brand experiences',
          'Generate campaign content',
          'Support sales activity',
        ],
      },
      {
        type: 'media-full',
        media: {
          src: '/images/opal/activation-dance-wide.jpg',
          alt: 'Promoters dancing with the product range at the Opal roadshow',
          ratio: '21:9',
          slot: 'Opal · roadshow',
        },
      },
      {
        type: 'text',
        heading: '05 — Retail + Digital',
        body: [
          'Owning the shelf. Amplifying the moment.',
          'Awareness only matters when the consumer can find the product. Aggressive merchandising strengthened Opal’s retail visibility, while digital marketing extended each physical campaign beyond the activation footprint.',
        ],
        columns: 2,
      },
      {
        type: 'media-split',
        left: {
          src: '/images/opal/shelf-block.jpg',
          alt: 'A block of Opal facings holding the shelf against competing brands',
          ratio: '4:5',
          slot: 'Opal · shelf block',
        },
        right: {
          src: '/images/opal/shelf-facings.jpg',
          alt: 'Opal packs merchandised across a supermarket laundry aisle',
          ratio: '4:5',
          slot: 'Opal · facings',
        },
      },
      {
        type: 'media-split',
        left: {
          src: '/images/opal/trolley-shopper.jpg',
          alt: 'A shopper with a trolley loaded with Opal packs at a branded stand',
          ratio: '4:5',
          slot: 'Opal · in the trolley',
        },
        right: {
          src: '/images/opal/in-store-shoppers.jpg',
          alt: 'Two shoppers holding Opal packs and a promotion slip in store',
          ratio: '4:5',
          slot: 'Opal · bought',
        },
      },
      { type: 'statement', lines: ['THEN WE PUT IT', 'IN FRONT OF', 'THE CONSUMER.'], ground: 'ink' },
    ],
    credits: [
      { role: 'Brand strategy & naming', name: 'Claudius & Co.' },
      { role: 'Packaging design', name: 'Claudius & Co.' },
      { role: 'Experiential & production', name: 'Claudius & Co.' },
      { role: 'Content & digital', name: 'Claudius & Co.' },
    ],
    related: ['medtech', 'silkea', 'huletts'],
  },

  /* -------------------------------------------------------- SILKÉA */
  {
    slug: 'silkea',
    client: 'SILKÉA',
    title: 'Launching a New Personal Care Experience',
    year: 2025,
    featured: true,
    order: 2,
    disciplines: ['BRANDING', 'EXPERIENTIAL', 'DIGITAL', 'CONTENT', 'CAMPAIGNS'],
    services: ['Brand Launch', 'Experiential', 'Influencer Marketing', 'Retail', 'Content'],
    shortDescription: 'Introducing a new personal care brand through experience rather than advertising.',
    hero: {
      src: '/images/silkea/sampling-gazebo.jpg',
      alt: 'The Silkéa sampling gazebo with the full product range on display',
      ratio: '16:9',
      slot: 'Silkéa · sampling',
    },
    challenge: ['A new personal care brand entering a category where consumers already have a routine — and a favourite.'],
    idea: ['Lead with experience. Let people feel the product before they are asked to believe a claim about it.'],
    whatWeDid: ['Brand Launch Strategy', 'Experiential Marketing', 'Influencer Marketing', 'Retail Activation', 'Content Creation', 'Social Media'],
    blocks: [
      {
        type: 'media-full',
        media: {
          src: '/images/silkea/promo-key-visual.jpg',
          alt: 'The Silkéa One Big Promo campaign key visual',
          ratio: '16:9',
          slot: 'Silkéa · key visual',
        },
      },
      {
        type: 'media-trio',
        items: [
          { src: '/images/silkea/bottle-lagoon-bliss.png', fit: 'contain', alt: 'Silkéa Lagoon Bliss foam bath', ratio: '4:5', slot: 'Silkéa · Lagoon Bliss' },
          { src: '/images/silkea/bottle-purple-pop.png', fit: 'contain', alt: 'Silkéa Purple Pop foam bath', ratio: '4:5', slot: 'Silkéa · Purple Pop' },
          { src: '/images/silkea/bottle-golden-cacao.png', fit: 'contain', alt: 'Silkéa Golden Cacao foam bath', ratio: '4:5', slot: 'Silkéa · Golden Cacao' },
        ],
      },
      { type: 'statement', lines: ['FELT FIRST.', 'BOUGHT SECOND.'], ground: 'ink' },
    ],
    related: ['opal', 'medtech'],
  },

  /* ----------------------------------------------------------- ICZ */
  {
    slug: 'icz-591',
    client: 'INSURANCE COUNCIL OF ZIMBABWE',
    title: 'Insurance Beyond the Boardroom',
    year: 2025,
    featured: true,
    order: 3,
    disciplines: ['STRATEGY', 'DIGITAL', 'CAMPAIGNS', 'EXPERIENTIAL'],
    services: ['Strategy', 'Digital', 'Campaigns', 'Experiential', '591 Consumer Awareness'],
    shortDescription: 'Taking insurance communication out of the boardroom and into the street.',
    hero: {
      src: '/images/icz-591/ambulance-handover.jpg',
      alt: 'A 591-branded emergency ambulance being handed over',
      ratio: '3:2',
      slot: 'ICZ · 591 ambulance',
    },
    challenge: ['Insurance is bought by institutions and misunderstood by consumers. The category speaks a language most people never learn.'],
    idea: ['Translate the category. Meet people where they already are, in the words they already use.'],
    whatWeDid: ['Communication Strategy', 'Campaign Development', 'Digital Marketing', 'Consumer Activations', '591 Consumer Awareness'],
    blocks: [
      {
        type: 'media-split',
        left: { src: '/images/icz-591/campaign-591.jpg', alt: 'The 591 toll-free campaign key visual', ratio: '1:1', slot: '591 · campaign' },
        right: { src: '/images/icz-591/festive-ambulances.jpg', alt: 'Festive season highway emergency support creative', ratio: '1:1', slot: '591 · festive' },
      },
      { type: 'statement', lines: ['COVER MAKES SENSE', 'WHEN IT’S EXPLAINED', 'IN PUBLIC.'], ground: 'teal' },
      {
        type: 'media-full',
        media: { src: '/images/icz-591/launch-officials.jpg', alt: 'Officials at the 591 campaign launch', ratio: '16:9', slot: '591 · launch' },
      },
    ],
    related: ['opal', 'huletts'],
  },

  /* ------------------------------------------------------- HULETTS */
  {
    slug: 'huletts',
    client: 'HULETTS',
    title: 'Turning Brand Presence Into Experience',
    year: 2024,
    featured: true,
    order: 5,
    disciplines: ['EXPERIENTIAL', 'CAMPAIGNS', 'CONTENT'],
    services: ['Experiential', 'Exhibition Design', 'Brand Environments', 'Activations'],
    shortDescription: 'Exhibition design and brand environments that turn presence into participation.',
    hero: {
      src: '/images/huletts/inflatable-pack.jpg',
      fit: 'contain',
      alt: 'A giant inflatable Huletts SunSweet pack standing among Huletts banners and cut cane at an exhibition stand',
      ratio: '4:5',
      slot: 'Huletts · brand environment',
    },
    challenge: ['A well-known brand present at every event — and remembered from none of them.'],
    idea: ['Stop building stands. Start building environments people want to stand inside.'],
    whatWeDid: ['Exhibition Design', 'Brand Environments', 'Activation Concept', 'On-Ground Execution', 'Content Capture'],
    blocks: [
      { type: 'statement', lines: ['PRESENCE IS NOT', 'THE SAME AS', 'PARTICIPATION.'], ground: 'ink' },
    ],
    related: ['opal', 'medtech'],
  },

  /* ------------------------------------------------------- MEDTECH */
  {
    slug: 'medtech',
    client: 'MEDTECH GROUP',
    title: 'Building Consumer Brands Across Categories',
    year: 2025,
    featured: true,
    order: 4,
    disciplines: ['STRATEGY', 'BRANDING', 'PACKAGING', 'DIGITAL', 'CONTENT', 'EXPERIENTIAL'],
    services: ['Strategy', 'Brand Development', 'Packaging', 'Digital', 'Content', 'Experiential'],
    shortDescription: 'A multi-brand portfolio built, packaged, launched and marketed across categories.',
    hero: {
      src: '/images/medtech/roadshow-promoters.jpg',
      alt: 'Promoters presenting the Medtech consumer brand range at a roadshow',
      ratio: '4:5',
      slot: 'Medtech · roadshow',
    },
    challenge: ['A distribution group with strong products and a portfolio of brands that were not yet behaving like brands.'],
    idea: ['Treat the portfolio as a system: shared strategic discipline, distinct consumer personalities.'],
    whatWeDid: ['Marketing & PR Strategy', 'Brand Development', 'Product & Packaging Development', 'Social Media Strategy & Management', 'Content Creation', 'Google Ads & Analytics', 'Product Activations & Experiential Shopping'],
    blocks: [
      {
        type: 'media-trio',
        items: [
          { src: '/images/medtech/satiskin-berry-fantasy.png', fit: 'contain', alt: 'Satiskin Berry Fantasy bubble bath pouch', ratio: '4:5', slot: 'Satiskin · Berry Fantasy' },
          { src: '/images/medtech/satiskin-ocean-paradise.png', fit: 'contain', alt: 'Satiskin Ocean Paradise bubble bath pouch', ratio: '4:5', slot: 'Satiskin · Ocean Paradise' },
          { src: '/images/medtech/satiskin-cocoa-butter.png', fit: 'contain', alt: 'Satiskin Cocoa Butter bubble bath pouch', ratio: '4:5', slot: 'Satiskin · Cocoa Butter' },
        ],
      },
      { type: 'statement', lines: ['ONE DISCIPLINE.', 'MANY BRANDS.'], ground: 'teal' },
      {
        type: 'media-split',
        left: { src: '/images/medtech/eilts-enchante.jpg', alt: 'E.IL.T\u2019S Enchanté fragrance, boxed and bottled', ratio: '4:5', slot: 'E.IL.T\u2019S · Enchanté' },
        right: { src: '/images/medtech/eilts-grandiose.jpg', alt: 'E.IL.T\u2019S Grandiose fragrance, boxed and bottled', ratio: '4:5', slot: 'E.IL.T\u2019S · Grandiose' },
      },
      {
        type: 'media-full',
        media: { src: '/images/medtech/eilts-enchante-macro.jpg', alt: 'Macro detail of the Enchanté bottle', ratio: '21:9', slot: 'E.IL.T\u2019S · detail' },
      },
    ],
    related: ['opal', 'silkea'],
  },

  /* ----------------------------------------------------- SKYLAKE */
  {
    slug: 'skylake',
    client: 'SKYLAKE BOREHOLE DRILLING',
    title: 'A Service Business, Built for Search',
    year: 2024,
    featured: false,
    order: 6,
    disciplines: ['WEB', 'DIGITAL', 'CONTENT', 'STRATEGY'],
    services: ['Website Development', 'Social Media Strategy & Management', 'Content Creation', 'Marketing & PR Strategy', 'Google Ads', 'Analytics'],
    shortDescription: 'Website, content and paid search for a service business that lives on enquiries.',
    hero: {
      src: '/images/skylake/depot-fleet.jpg',
      alt: 'The Skylake Borehole Drilling fleet lined up outside the company yard',
      ratio: '21:9',
      slot: 'Skylake · fleet',
    },
    challenge: ['A capable operator competing for enquiries it could not see coming.'],
    idea: ['Build the shopfront, then buy the doorway.'],
    whatWeDid: ['Website Development', 'Photography & Videography', 'Digital Marketing Strategy', 'Google Ads Execution', 'Analytics Monitoring'],
    blocks: [
      {
        type: 'media-split',
        left: { src: '/images/skylake/crew.jpg', alt: 'The Skylake drilling crew in full PPE on site', ratio: '4:5', slot: 'Skylake · crew' },
        right: { src: '/images/skylake/rig-yard.jpg', alt: 'A Skylake drilling rig and support trucks at the yard', ratio: '4:5', slot: 'Skylake · rig' },
      },
      { type: 'statement', lines: ['THE RIG DOES', 'THE WORK.', 'THE SITE FINDS IT.'], ground: 'ink' },
      {
        type: 'media-full',
        media: {
          src: '/images/skylake/campaign-kv.jpg',
          fit: 'contain',
          alt: 'Skylake Expert Drilling Solutions campaign key visual',
          ratio: '16:9',
          slot: 'Skylake · campaign',
        },
        caption: 'Paid search and social ran to one promise: RC, core, borehole, blasthole, pile.',
      },
      {
        type: 'media-full',
        media: {
          src: '/images/skylake/first-water.jpg',
          alt: 'Children drinking from a newly drilled Skylake borehole',
          ratio: '3:2',
          slot: 'Skylake · first water',
        },
        caption: 'What the enquiry form is actually for.',
      },
    ],
    related: ['medtech'],
  },
];

export const featuredSlugs = ['opal', 'silkea', 'icz-591', 'medtech', 'huletts'];
