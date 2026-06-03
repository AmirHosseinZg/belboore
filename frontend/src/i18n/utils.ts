export type Lang = 'en' | 'fa';

export const languages = {
  en: {
    code: 'en' as const,
    name: 'English',
    nativeName: 'English',
    dir: 'ltr' as const,
    locale: 'en_US',
  },
  fa: {
    code: 'fa' as const,
    name: 'Persian',
    nativeName: 'فارسی',
    dir: 'rtl' as const,
    locale: 'fa_IR',
  },
};

export const defaultLang: Lang = 'fa';
export const supportedLangs: Lang[] = ['en', 'fa'];

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'fa') return lang;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  return `/${lang}${path}`;
}

export function getAlternateUrls(pathname: string): { lang: Lang; url: string }[] {
  const pathWithoutLang = pathname.replace(/^\/(en|fa)/, '') || '/';
  return supportedLangs.map(lang => ({
    lang,
    url: `/${lang}${pathWithoutLang}`,
  }));
}

export function getRouteFromUrl(url: URL): string {
  return url.pathname.replace(/^\/(en|fa)/, '') || '/';
}
