import type { Capability } from '@/lib/types';

export const site = {
  name: 'Claudius & Co.',
  legalName: 'Claudius & Co.',
  tagline: 'We build brands from idea to market.',
  philosophy: 'Vibrant ideas. Professional execution.',
  description:
    'Claudius & Co. is a Zimbabwean creative and marketing agency combining strategy, ' +
    'creativity, technology and on-ground execution to build brands that matter.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://claudiusandco.com',
  locale: 'en_ZW',
  city: 'Harare',
  country: 'Zimbabwe',
  email: 'hello@claudiusandco.com',
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
  'SHOWER TO SHOWER', 'CLERE', 'SATISKIN', 'CHUIPACK', 'THE CHEESEMAN',
  'TURTLE FIT', 'CLOUDS TO YOU',
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
