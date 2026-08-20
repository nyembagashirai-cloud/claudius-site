export type Discipline =
  | 'BRANDING' | 'STRATEGY' | 'EXPERIENTIAL' | 'DIGITAL'
  | 'PACKAGING' | 'CONTENT' | 'WEB' | 'CAMPAIGNS';

export const DISCIPLINES: Discipline[] = [
  'BRANDING', 'STRATEGY', 'EXPERIENTIAL', 'DIGITAL',
  'PACKAGING', 'CONTENT', 'WEB', 'CAMPAIGNS',
];

export type Ratio = '21:9' | '16:9' | '4:5' | '1:1' | '3:2';
export type Ground = 'ink' | 'paper' | 'teal';
export type Tone = 'teal' | 'ink' | 'default';

/**
 * A media slot. When `src` is empty the <Media> component renders an
 * art-directed placeholder instead — layout stays final, only pixels pend.
 */
export interface Media {
  src?: string;
  kind?: 'image' | 'video';
  alt: string;
  ratio: Ratio;
  poster?: string;
  tone?: Tone;
  /** Short label shown on the placeholder, e.g. "Opal · activation". */
  slot?: string;
}

export type ContentBlock =
  | { type: 'statement'; lines: string[]; ground?: Ground }
  | { type: 'media-full'; media: Media; caption?: string }
  | { type: 'media-split'; left: Media; right: Media }
  | { type: 'media-trio'; items: [Media, Media, Media] }
  | { type: 'text'; heading?: string; body: string[]; columns?: 1 | 2 }
  | { type: 'list'; heading: string; items: string[] }
  | { type: 'quote'; text: string; attribution?: string };

export interface Project {
  slug: string;
  client: string;
  title: string;
  year: number;
  featured: boolean;
  order: number;
  disciplines: Discipline[];
  services: string[];
  shortDescription: string;
  hero: Media;
  challenge: string[];
  idea: string[];
  whatWeDid: string[];
  results?: string[];
  blocks: ContentBlock[];
  credits?: { role: string; name: string }[];
  related?: string[];
  seo?: { title?: string; description?: string };
}

export interface Capability {
  slug: string;
  name: string;
  lead: string;
  items: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  photo?: Media;
}
