import type { Metadata } from 'next';
import { site } from '@/content/site';
import type { Project } from '@/lib/types';

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'creative agency Zimbabwe',
    'marketing agency Harare',
    'experiential marketing Zimbabwe',
    'brand development',
    'packaging design',
    'activations',
    'digital marketing Zimbabwe',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: '/' },
};

export function projectMetadata(project: Project): Metadata {
  const title = project.seo?.title ?? `${project.client} — ${project.title}`;
  const description = project.seo?.description ?? project.shortDescription;
  const url = `/work/${project.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title, description, url: absoluteUrl(url) },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function organisationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: absoluteUrl('/brand/claudius-logo.png'),
    description: site.description,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressCountry: 'ZW',
    },
    sameAs: site.social.filter((s) => s.href !== '#').map((s) => s.href),
  };
}

export function projectJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${project.client} — ${project.title}`,
    description: project.shortDescription,
    url: absoluteUrl(`/work/${project.slug}`),
    dateCreated: String(project.year),
    creator: { '@type': 'Organization', name: site.name, url: site.url },
    about: project.client,
    keywords: project.services.join(', '),
  };
}
