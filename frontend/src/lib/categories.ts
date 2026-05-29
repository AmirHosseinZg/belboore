import type { Lang } from '../data/site';

export type Category = {
  slug: string;
  status: 'live' | 'coming-soon';
  fa: { title: string; description: string; seoTitle: string; seoDescription: string };
  en: { title: string; description: string; seoTitle: string; seoDescription: string };
};

export const categories: Category[] = [
  { slug: 'image-tools', status: 'live', fa: { title: 'ابزار تصویر', description: 'فشرده سازی، تبدیل و تغییر اندازه تصویر.', seoTitle: 'ابزار تصویر بل بوره', seoDescription: 'مجموعه ابزار تصویر آنلاین رایگان.' }, en: { title: 'Image Tools', description: 'Compress, convert, and resize images.', seoTitle: 'Belboore Image Tools', seoDescription: 'Free online image utilities.' } },
  { slug: 'text-tools', status: 'live', fa: { title: 'ابزار متن', description: 'تغییر حالت نوشتار و پاکسازی متن.', seoTitle: 'ابزار متن بل بوره', seoDescription: 'ابزار رایگان برای کارهای متنی.' }, en: { title: 'Text Tools', description: 'Text transformations and cleanup.', seoTitle: 'Belboore Text Tools', seoDescription: 'Free text productivity tools.' } },
  { slug: 'dev-tools', status: 'live', fa: { title: 'ابزار توسعه', description: 'ابزار سریع برای توسعه دهندگان.', seoTitle: 'ابزار توسعه بل بوره', seoDescription: 'فرمت JSON و ابزارهای توسعه.' }, en: { title: 'Dev Tools', description: 'Quick helper tools for developers.', seoTitle: 'Belboore Dev Tools', seoDescription: 'JSON and web utility tools.' } },
  { slug: 'productivity-tools', status: 'live', fa: { title: 'بهره وری', description: 'ابزارهای مفید روزمره و انتخابی.', seoTitle: 'ابزار بهره وری بل بوره', seoDescription: 'ابزارهای بهره وری و لینک های مفید.' }, en: { title: 'Productivity Tools', description: 'Useful curated daily tools.', seoTitle: 'Belboore Productivity Tools', seoDescription: 'Curated productivity resources.' } },
  { slug: 'ai-tools', status: 'coming-soon', fa: { title: 'ابزار هوش مصنوعی', description: 'این دسته به زودی اضافه می شود.', seoTitle: 'ابزار AI بل بوره', seoDescription: 'صفحه در حال آماده سازی همراه با جایگزین ها.' }, en: { title: 'AI Tools', description: 'This category is coming soon.', seoTitle: 'Belboore AI Tools', seoDescription: 'Coming soon page with alternatives.' } },
];

export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const categoryTitle = (c: Category, lang: Lang) => (lang === 'fa' ? c.fa.title : c.en.title);
