import type { Tool } from './tools';

export const websiteSchema = (url: string, name: string, description: string, lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url,
  name,
  description,
  inLanguage: lang,
});

export const breadcrumbSchema = (items: { name: string; item: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((entry, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: entry.name,
    item: entry.item,
  })),
});

export const collectionPageSchema = (url: string, name: string, description: string, lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  url,
  name,
  description,
  inLanguage: lang,
});

export const softwareToolSchema = (url: string, lang: string, tool: Tool, text: Tool['fa'] | Tool['en']) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: text.title,
  description: text.longDescription,
  url,
  applicationCategory: tool.categorySlug,
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  inLanguage: lang,
});
