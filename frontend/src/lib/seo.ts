import { SITE } from '../data/site';
import type { Lang } from '../data/site';
export const makeSeo = (lang: Lang, path: string, title: string, description: string) => ({
  title,
  description,
  canonical: `${SITE.domain}${path}`,
  alternates: [
    { lang: 'fa', href: `${SITE.domain}${path.replace('/en/', '/fa/')}` },
    { lang: 'en', href: `${SITE.domain}${path.replace('/fa/', '/en/')}` },
  ],
});
