export interface Category {
  slug: string;
  icon: string;
  iconPath?: string;
  name: { en: string; fa: string };
  description: { en: string; fa: string };
  order: number;
}

export const categories: Category[] = [
  {
    slug: 'image',
    icon: '🖼️',
    iconPath: '/category-icons/image-2.webp',
    name: { en: 'Image Tools', fa: 'ابزارهای تصویری' },
    description: { en: 'Convert, compress, edit, and generate images — all from your browser.', fa: 'تبدیل، فشرده‌سازی، ویرایش و تولید تصاویر — همگی در مرورگر شما.' },
    order: 1,
  },
  {
    slug: 'text',
    icon: '📝',
    iconPath: '/category-icons/text-2.webp',
    name: { en: 'Text Tools', fa: 'ابزارهای متنی' },
    description: { en: 'Format, analyze, compare, and transform text with powerful utilities.', fa: 'فرمت‌دهی، تحلیل، مقایسه و تبدیل متن با ابزارهای قدرتمند.' },
    order: 2,
  },
  {
    slug: 'code',
    icon: '💻',
    iconPath: '/category-icons/coding-2.webp',
    name: { en: 'Code Tools', fa: 'ابزارهای کدنویسی' },
    description: { en: 'Format, validate, and generate code. Developer utilities that save time.', fa: 'مرتب‌سازی، اعتبارسنجی و تولید کد. ابزارهای توسعه‌دهنده که در زمان صرفه‌جویی می‌کنند.' },
    order: 3,
  },
  {
    slug: 'color',
    icon: '🎨',
    iconPath: '/category-icons/edit-2.webp',
    name: { en: 'Color Tools', fa: 'ابزارهای رنگ' },
    description: { en: 'Convert colors, generate palettes, and explore color harmonies.', fa: 'تبدیل رنگ‌ها، تولید پالت‌ها و کاوش هارمونی‌های رنگی.' },
    order: 4,
  },
  {
    slug: 'security',
    icon: '🔒',
    iconPath: '/category-icons/security-2.webp',
    name: { en: 'Security Tools', fa: 'ابزارهای امنیتی' },
    description: { en: 'Generate strong passwords, compute hashes, and verify data integrity.', fa: 'تولید رمزهای عبور قوی، محاسبه hash و تایید صحت داده‌ها.' },
    order: 5,
  },
  {
    slug: 'math',
    icon: '📐',
    iconPath: '/category-icons/calculate-2.webp',
    name: { en: 'Math Tools', fa: 'ابزارهای ریاضی' },
    description: { en: 'Convert units, calculate values, and solve common math problems.', fa: 'تبدیل واحدها، محاسبه مقادیر و حل مسائل رایج ریاضی.' },
    order: 6,
  },
  {
    slug: 'data',
    icon: '📊',
    iconPath: '/category-icons/data-2.webp',
    name: { en: 'Data Tools', fa: 'ابزارهای داده' },
    description: { en: 'Transform, visualize, and convert between data formats.', fa: 'تبدیل، نمایش و تغییر فرمت‌های داده.' },
    order: 7,
  },
  {
    slug: 'devtools',
    icon: '🛠️',
    iconPath: '/category-icons/development-2.webp',
    name: { en: 'Developer Tools', fa: 'ابزارهای توسعه' },
    description: { en: 'Essential utilities for developers: timestamps, encoders, debuggers, and more.', fa: 'ابزارهای ضروری برای توسعه‌دهندگان: timestamp، کدگذاری، اشکال‌زدایی و بیشتر.' },
    order: 8,
  },
  {
    slug: 'datetime',
    icon: '📅',
    iconPath: '/category-icons/calendar-2.webp',
    name: { en: 'Date & Time Tools', fa: 'ابزارهای تاریخ و زمان' },
    description: { en: 'Convert timestamps, calculate date differences, and manage time zones.', fa: 'تبدیل timestamp، محاسبه اختلاف تاریخ و مدیریت مناطق زمانی.' },
    order: 9,
  },
  {
    slug: 'general',
    icon: '🧰',
    iconPath: '/category-icons/general-.webp',
    name: { en: 'General Tools', fa: 'ابزارهای عمومی' },
    description: { en: 'Everyday calculators and utility tools for quick tasks.', fa: 'ماشین‌حساب‌ها و ابزارهای روزمره برای کارهای سریع.' },
    order: 10,
  },
  {
    slug: 'pdf',
    icon: '📄',
    iconPath: '/category-icons/pdf-2.webp',
    name: { en: 'PDF Tools', fa: 'ابزارهای PDF' },
    description: { en: 'Merge, compress, and convert PDF documents. Some tools coming soon.', fa: 'ادغام، فشرده‌سازی و تبدیل اسناد PDF. برخی ابزارها به زودی.' },
    order: 11,
  },
  {
    slug: 'downloader',
    icon: '⬇️',
    iconPath: '/category-icons/download-2.webp',
    name: { en: 'Downloader Tools', fa: 'ابزارهای دانلود' },
    description: { en: 'Media downloader utilities. Currently in development.', fa: 'ابزارهای دانلود مدیا. در حال توسعه.' },
    order: 12,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
