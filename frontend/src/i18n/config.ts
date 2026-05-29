import type { Lang } from '../data/site';
import { LANGS } from '../data/site';

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);
export const dirForLang = (lang: Lang) => (lang === 'fa' ? 'rtl' : 'ltr');
