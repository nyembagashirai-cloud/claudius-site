import type { Capability } from '@/lib/types';

/**
 * Canonical origin, in order of trust:
 *
 *   1. NEXT_PUBLIC_SITE_URL — set it explicitly and it always wins.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel, and it prefers a
 *      custom domain over the .vercel.app one, so production is correct even
 *      if nobody remembers to update the variable after connecting a domain.
 *   3. localhost, for development.
 *
 * This drives canonical URLs, the sitemap and social preview cards, so a wrong
 * value here is what gets a .vercel.app address indexed instead of the real
 * domain. There is deliberately no hardcoded production fallback: guessing a
 * domain is worse than an obviously-local one.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;

  return 'http://localhost:3000';
}

export const site = {
  name: 'Claudius & Co.',
  legalName: 'Claudius & Co.',
  tagline: 'We build brands from idea to market.',
  philosophy: 'Vibrant ideas. Professional execution.',
  description:
    'Claudius & Co. is a Zimbabwean creative and marketing agency combining strategy, ' +
    'creativity, technology and on-ground execution to build brands that matter.',
  url: resolveSiteUrl(),
  locale: 'en_ZW',
  city: 'Harare',
  country: 'Zimbabwe',
  email: 'hello@claudiusco.co.zw',
  phone: '+263 77 228 2549',
  /** Digits only, country code first — the format wa.me expects. */
  whatsapp: '263772282549',
  whatsappMessage: 'Hi Claudius & Co. — I’d like to talk about a project.',
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
};

export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const approach = [
  { step: 'THINK',   note: 'Strategy & Insight' },
  { step: 'CREATE',  note: 'Ideas & Design' },
  { step: 'BUILD',   note: 'Production & Technology' },
  { step: 'LAUNCH',  note: 'Campaigns & Experiences' },
  { step: 'AMPLIFY', note: 'Media & Digital' },
  { step: 'MEASURE', note: 'Performance & Optimisation' },
];

export const capabilities: Capability[] = [
  {
    slug: 'strategy',
    name: 'STRATEGY',
    lead: 'Every brand we build starts with a position worth defending.',
    items: ['Brand Strategy', 'Marketing Strategy', 'Campaign Strategy', 'Market Research', 'Go-To-Market Strategy'],
  },
  {
    slug: 'brand',
    name: 'BRAND',
    lead: 'Identity, packaging and positioning designed to win attention on the shelf and in the feed.',
    items: ['Brand Development', 'Brand Identity', 'Packaging', 'Brand Positioning', 'Creative Direction'],
  },
  {
    slug: 'experience',
    name: 'EXPERIENCE',
    lead: 'We put brands in people’s hands — on the street, in-store, at events and in communities.',
    items: ['Activations', 'Experiential Marketing', 'Roadshows', 'Product Launches', 'Retail Experiences', 'Exhibitions', 'Events'],
  },
  {
    slug: 'digital',
    name: 'DIGITAL',
    lead: 'Where the physical campaign carries on after the crowd goes home.',
    items: ['Digital Strategy', 'Social Media', 'Paid Media', 'Google Ads', 'Content Marketing', 'Influencer Marketing'],
  },
  {
    slug: 'content',
    name: 'CONTENT',
    lead: 'Photography, film and design produced in-house, on location, at campaign speed.',
    items: ['Creative Direction', 'Photography', 'Videography', 'Campaign Development', 'Motion Graphics', 'Copywriting'],
  },
  {
    slug: 'technology',
    name: 'TECHNOLOGY',
    lead: 'Platforms, pages and measurement that turn a campaign into a system.',
    items: ['Website Development', 'Digital Platforms', 'Campaign Landing Pages', 'Analytics', 'SEO'],
  },
];

export const clients = [
  'OPAL', 'MEDTECH GROUP', 'HULETTS', 'SILKÉA', 'INSURANCE COUNCIL OF ZIMBABWE',
  'SANCTUARY INSURANCE', 'AIRDC', 'SKYLAKE BOREHOLE DRILLING', 'INGWEBU',
  'SHOWER TO SHOWER', 'CLERE', 'SATISKIN', 'CHUIPACK',
];

export const contactNeeds = [
  'Brand development',
  'Packaging',
  'Experiential / activations',
  'Digital & social',
  'Content production',
  'Website / platform',
  'Full integrated campaign',
  'Something else',
];

/** Builds a wa.me deep link, pre-filling the first message. */
export function whatsappLink(number: string, message = site.whatsappMessage) {
  const digits = (number ?? '').replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
