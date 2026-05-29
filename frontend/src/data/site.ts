export const SITE = {
  name: 'Belboore',
  persianName: 'بل بوره',
  domain: 'https://belboore.ir',
  defaultLang: 'fa' as const,
  description: {
    fa: 'جعبه ابزار دیجیتال شما در یکجا، رایگان و متن باز.',
    en: 'Your digital toolbox in one place - free, open-source, and built for everyday work.',
  },
};

export const LANGS = ['fa', 'en'] as const;
export type Lang = (typeof LANGS)[number];
