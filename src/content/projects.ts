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
      src: '/images/opal/activation-promoters.jpg',
      alt: 'Claudius & Co. promoters presenting Opal washing powder at a consumer activation',
      ratio: '21:9',
      slot: 'Opal · activation',
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
          src: '/images/medtech/retail-activation.jpg',
          alt: 'Branded activation gazebos outside a retail store',
          ratio: '4:5',
          slot: 'Retail · in front of store',
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
            src: '/images/medtech/roadshow-stage.jpg',
            alt: 'Dancers performing on the branded roadshow stage',
            ratio: '1:1',
            slot: 'Roadshow · stage',
          },
          {
            src: '/images/medtech/roadshow-promoters.jpg',
            alt: 'Promoters presenting product to the crowd at a roadshow',
            ratio: '1:1',
            slot: 'Roadshow · promoters',
          },
          {
            src: '/images/silkea/sampling-gazebo.jpg',
            alt: 'A sampling gazebo stocked with product, staffed by promoters',
            ratio: '1:1',
            slot: 'Sampling · gazebo',
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
          src: '/images/medtech/roadshow-stage.jpg',
          alt: 'The roadshow stage mid-performance, crowd gathered',
          ratio: '21:9',
          slot: 'Roadshow · stage',
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
          src: '/images/medtech/retail-activation.jpg',
          alt: 'Branded gazebos and merchandising at a retail activation',
          ratio: '3:2',
          slot: 'Retail · merchandising',
        },
        right: {
          src: '/images/silkea/promo-key-visual.jpg',
          alt: 'The One Big Promo campaign key visual',
          ratio: '3:2',
          slot: 'Campaign · key visual',
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
    hero: { alt: 'Skylake Borehole Drilling', ratio: '16:9', tone: 'ink', slot: 'Skylake · site & content' },
    challenge: ['A capable operator competing for enquiries it could not see coming.'],
    idea: ['Build the shopfront, then buy the doorway.'],
    whatWeDid: ['Website Development', 'Photography & Videography', 'Digital Marketing Strategy', 'Google Ads Execution', 'Analytics Monitoring'],
    blocks: [],
    related: ['medtech'],
  },

  /* ------------------------------------------------- THE CHEESEMAN */
  {
    slug: 'the-cheeseman',
    client: 'THE CHEESEMAN',
    title: 'A Small Brand With a Big Appetite',
    year: 2024,
    featured: false,
    order: 7,
    disciplines: ['WEB', 'DIGITAL', 'CONTENT'],
    services: ['Website Development', 'Social Media Strategy & Management', 'Content Creation'],
    shortDescription: 'Website, social and content for a specialist food brand.',
    hero: { alt: 'The Cheeseman', ratio: '4:5', tone: 'default', slot: 'The Cheeseman · content' },
    challenge: ['A specialist product with a loyal following and no shopfront online.'],
    idea: ['Make the craft visible.'],
    whatWeDid: ['Website Development', 'Social Media Management', 'Content Creation'],
    blocks: [],
    related: ['clouds-to-you'],
  },

  /* ------------------------------------------------- CLOUDS TO YOU */
  {
    slug: 'clouds-to-you',
    client: 'CLOUDS TO YOU',
    title: 'Packaging a Product People Share',
    year: 2024,
    featured: false,
    order: 8,
    disciplines: ['PACKAGING', 'CONTENT', 'DIGITAL'],
    services: ['Packaging Design', 'Social Media Strategy & Management', 'Content Creation'],
    shortDescription: 'Packaging design and social content for a consumer brand built on sharing.',
    hero: { alt: 'Clouds To You packaging', ratio: '1:1', tone: 'teal', slot: 'Clouds To You · packaging' },
    challenge: ['A product bought as a gift, packaged as a commodity.'],
    idea: ['Design the pack for the moment it is handed over.'],
    whatWeDid: ['Packaging Design', 'Social Media Management', 'Content Creation'],
    blocks: [],
    related: ['the-cheeseman'],
  },

  /* ----------------------------------------------------- TURTLE FIT */
  {
    slug: 'turtle-fit',
    client: 'TURTLE FIT',
    title: 'Getting a Fitness Brand Online',
    year: 2024,
    featured: false,
    order: 9,
    disciplines: ['WEB', 'DIGITAL', 'CONTENT'],
    services: ['Website Development', 'Social Media Strategy & Management', 'Content Creation'],
    shortDescription: 'Website and social for a fitness brand building an audience.',
    hero: { alt: 'Turtle Fit', ratio: '16:9', tone: 'ink', slot: 'Turtle Fit · site & social' },
    challenge: ['An energetic brand with no digital home.'],
    idea: ['Put the energy where people already scroll.'],
    whatWeDid: ['Website Development', 'Social Media Strategy', 'Content Creation'],
    blocks: [],
    related: ['skylake'],
  },
];

export const featuredSlugs = ['opal', 'silkea', 'icz-591', 'medtech', 'huletts'];
