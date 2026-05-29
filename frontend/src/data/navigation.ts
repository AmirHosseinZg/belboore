import type { Lang } from './site';

export type NavItem = { href: string; label: string };

export function getNav(lang: Lang): NavItem[] {
  return [
    { href: `/${lang}/`, label: lang === 'fa' ? 'خانه' : 'Home' },
    { href: `/${lang}/categories/image-tools`, label: lang === 'fa' ? 'دسته بندی ها' : 'Categories' },
    { href: `/${lang}/about`, label: lang === 'fa' ? 'درباره' : 'About' },
  ];
}
