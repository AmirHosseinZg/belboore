/* ═══════════════════════════════════════════
   BELBOORE TOOL DATA
   Single source of truth for all tools
   ═══════════════════════════════════════════ */

export type ToolType = 'builtin' | 'external';

export interface Tool {
  slug: string;
  type: ToolType;
  category: string;
  featured: boolean;
  icon: string;
  iconPath?: string;
  url?: string;
  name: { en: string; fa: string };
  description: { en: string; fa: string };
  longDescription: { en: string; fa: string };
  howToUse?: { en: string; fa: string };
  tags: { en: string[]; fa: string[] };
  order?: number;
}

export const tools: Tool[] = [
  /* ── IMAGE TOOLS ── */
  {
    slug: 'image-to-base64',
    type: 'builtin',
    category: 'image',
    featured: true,
    icon: '🖼️',
    iconPath: '/tool-icons/images.svg',
    name: { en: 'Image to Base64', fa: 'تبدیل تصویر به Base64' },
    description: { en: 'Convert images to Base64 strings instantly in your browser.', fa: 'تبدیل تصاویر به رشته Base64 مستقیماً در مرورگر.' },
    longDescription: { en: 'Convert any image to a Base64 data URI string right in your browser. No upload to any server — your images stay private on your device. Supports PNG, JPEG, WebP, and SVG formats.', fa: 'هر تصویری را به رشته Base64 data URI در مرورگر خود تبدیل کنید. بدون آپلود به هیچ سروری — تصاویر شما روی دستگاه خودتان می‌مانند. پشتیبانی از فرمت‌های PNG، JPEG، WebP و SVG.' },
    howToUse: { en: 'Drag and drop an image or click to browse. The Base64 string appears instantly. Copy it with one click.', fa: 'تصویر را بکشید و رها کنید یا کلیک کنید تا انتخاب شود. رشته Base64 بلافاصله نمایش داده می‌شود. با یک کلیک کپی کنید.' },
    tags: { en: ['image', 'base64', 'converter', 'encoder', 'data uri'], fa: ['تصویر', 'base64', 'مبدل', 'کدگذاری', 'data uri'] },
  },
  {
    slug: 'qr-code-generator',
    type: 'builtin',
    category: 'image',
    featured: true,
    icon: '📱',
    iconPath: '/tool-icons/QR.svg',
    name: { en: 'QR Code Generator', fa: 'سازنده QR Code' },
    description: { en: 'Generate QR codes from text, URLs, or any data. Download as PNG or SVG.', fa: 'تولید QR Code از متن، لینک یا هر داده‌ای. دانلود با فرمت PNG یا SVG.' },
    longDescription: { en: 'Create QR codes instantly for URLs, text, contact information, WiFi credentials, and more. Customize colors and download in high-quality PNG or SVG format. All processing happens in your browser.', fa: 'QR Code برای لینک‌ها، متن، اطلاعات تماس، اطلاعات WiFi و بیشتر بسازید. رنگ‌ها را سفارشی کنید و با کیفیت بالا در فرمت PNG یا SVG دانلود کنید. تمام پردازش در مرورگر شما انجام می‌شود.' },
    howToUse: { en: 'Enter your text or URL, choose colors if you like, and your QR code appears instantly. Click download to save it.', fa: 'متن یا لینک خود را وارد کنید، در صورت تمایل رنگ‌ها را انتخاب کنید و QR Code شما بلافاصله ظاهر می‌شود. برای ذخیره روی دانلود کلیک کنید.' },
    tags: { en: ['qr code', 'generator', 'barcode', 'link', 'share'], fa: ['qr code', 'تولید', 'بارکد', 'لینک', 'اشتراک'] },
  },
  {
    slug: 'squoosh',
    type: 'external',
    category: 'image',
    featured: true,
    icon: '🗜️',
    iconPath: '/tool-icons/compress.svg',
    url: 'https://squoosh.app',
    name: { en: 'Squoosh', fa: 'Squoosh' },
    description: { en: 'Compress and optimize images with live preview. By Google Chrome Labs.', fa: 'فشرده‌سازی و بهینه‌سازی تصاویر با پیش‌نمایش زنده. از Google Chrome Labs.' },
    longDescription: { en: 'Squoosh is an image compression web app from Google Chrome Labs that lets you compress images with various codecs, compare results side-by-side, and resize — all in the browser.', fa: 'Squoosh یک برنامه تحت وب فشرده‌سازی تصویر از Google Chrome Labs است که امکان فشرده‌سازی تصاویر با کدک‌های مختلف، مقایسه نتایج و تغییر اندازه را — همگی در مرورگر — فراهم می‌کند.' },
    tags: { en: ['image', 'compression', 'optimization', 'webp', 'avif'], fa: ['تصویر', 'فشرده‌سازی', 'بهینه‌سازی', 'webp', 'avif'] },
  },
  {
    slug: 'excalidraw',
    type: 'external',
    category: 'image',
    featured: false,
    icon: '✏️',
    iconPath: '/tool-icons/pencil.svg',
    url: 'https://excalidraw.com',
    name: { en: 'Excalidraw', fa: 'Excalidraw' },
    description: { en: 'Hand-drawn style diagrams and sketches. Collaborative whiteboard tool.', fa: 'نمودارها و طرح‌های دست‌نویس. ابزار تخته‌سفید مشارکتی.' },
    longDescription: { en: 'Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams with a hand-drawn feel. Great for wireframes, flowcharts, and architecture diagrams.', fa: 'Excalidraw یک ابزار تخته‌سفید مشارکتی مجازی است که امکان رسم نمودارهای دست‌نویس را فراهم می‌کند. عالی برای وایرفریم، فلوچارت و نمودارهای معماری.' },
    tags: { en: ['drawing', 'diagram', 'whiteboard', 'sketch', 'collaboration'], fa: ['نقاشی', 'نمودار', 'تخته‌سفید', 'طرح', 'مشارکتی'] },
  },

  /* ── TEXT TOOLS ── */
  {
    slug: 'text-diff',
    type: 'builtin',
    category: 'text',
    featured: true,
    icon: '📝',
    iconPath: '/tool-icons/text-comparison.svg',
    name: { en: 'Text Diff Checker', fa: 'مقایسه متن' },
    description: { en: 'Compare two texts and see the differences highlighted line by line.', fa: 'دو متن را مقایسه کنید و تفاوت‌ها را خط به خط برجسته ببینید.' },
    longDescription: { en: 'A fast, client-side text comparison tool. Paste two texts and see additions, deletions, and changes highlighted instantly. No data leaves your browser.', fa: 'یک ابزار سریع مقایسه متن در سمت کاربر. دو متن را وارد کنید و اضافات، حذفیات و تغییرات را فوراً برجسته ببینید. هیچ داده‌ای از مرورگر خارج نمی‌شود.' },
    howToUse: { en: 'Paste or type your original text on the left and the modified text on the right. Differences are highlighted automatically.', fa: 'متن اصلی را در سمت چپ و متن تغییر یافته را در سمت راست وارد کنید. تفاوت‌ها به صورت خودکار برجسته می‌شوند.' },
    tags: { en: ['diff', 'compare', 'text', 'difference', 'merge'], fa: ['مقایسه', 'تفاوت', 'متن', 'ادغام'] },
  },
  {
    slug: 'word-counter',
    type: 'builtin',
    category: 'text',
    featured: false,
    icon: '🔢',
    iconPath: '/tool-icons/text-word-count.svg',
    name: { en: 'Word & Character Counter', fa: 'شمارنده کلمات و کاراکترها' },
    description: { en: 'Count words, characters, sentences, and paragraphs in real time.', fa: 'شمارش کلمات، کاراکترها، جملات و پاراگراف‌ها به صورت زنده.' },
    longDescription: { en: 'Real-time text statistics: words, characters (with and without spaces), sentences, paragraphs, and estimated reading time. Supports Persian, English, and mixed text.', fa: 'آمار زنده متن: کلمات، کاراکترها (با و بدون فاصله)، جملات، پاراگراف‌ها و زمان تخمینی مطالعه. پشتیبانی از متن فارسی، انگلیسی و ترکیبی.' },
    howToUse: { en: 'Type or paste your text. Statistics update instantly as you type.', fa: 'متن خود را تایپ یا جای‌گذاری کنید. آمار به صورت زنده هنگام تایپ به‌روز می‌شود.' },
    tags: { en: ['word count', 'character count', 'statistics', 'writing'], fa: ['شمارش کلمات', 'شمارش کاراکتر', 'آمار', 'نوشتن'] },
  },
  {
    slug: 'case-converter',
    type: 'builtin',
    category: 'text',
    featured: false,
    icon: '🔤',
    iconPath: '/tool-icons/case-convertor.svg',
    name: { en: 'Case Converter', fa: 'تغییر حالت حروف' },
    description: { en: 'Convert text between uppercase, lowercase, title case, camelCase, and more.', fa: 'تبدیل متن بین حروف بزرگ، کوچک، عنوان، camelCase و حالت‌های دیگر.' },
    longDescription: { en: 'Convert text to any case: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and more. Works instantly in your browser.', fa: 'تبدیل متن به حالت‌های مختلف: حروف بزرگ، حروف کوچک، حالت عنوان، حالت جمله، camelCase، PascalCase، snake_case، kebab-case و بیشتر. فوراً در مرورگر انجام می‌شود.' },
    howToUse: { en: 'Paste your text, then click any case conversion button. The result appears instantly. Copy with one click.', fa: 'متن خود را جای‌گذاری کنید، سپس روی هر دکمه تبدیل کلیک کنید. نتیجه فوراً نمایش داده می‌شود. با یک کلیک کپی کنید.' },
    tags: { en: ['case', 'uppercase', 'lowercase', 'convert', 'format'], fa: ['حروف', 'بزرگ', 'کوچک', 'تبدیل', 'فرمت'] },
  },
  {
    slug: 'lorem-ipsum',
    type: 'builtin',
    category: 'text',
    featured: false,
    iconPath: '/tool-icons/paragraph.svg',
    icon: '📄',
    name: { en: 'Lorem Ipsum Generator', fa: 'تولید متن ساختگی' },
    description: { en: 'Generate placeholder text for designs and mockups. Customize paragraphs, words, or bytes.', fa: 'تولید متن ساختگی برای طراحی‌ها و ماکت‌ها. قابل تنظیم بر اساس پاراگراف، کلمه یا بایت.' },
    longDescription: { en: 'Quickly generate Lorem Ipsum placeholder text in your desired amount — by paragraphs, sentences, words, or characters. Copy with one click. All generated client-side.', fa: 'سریع متن ساختگی Lorem Ipsum به مقدار دلخواه تولید کنید — بر اساس پاراگراف، جمله، کلمه یا کاراکتر. با یک کلیک کپی کنید. تمام تولید در سمت کاربر انجام می‌شود.' },
    howToUse: { en: 'Choose your desired unit (paragraphs, sentences, words) and amount. Text generates instantly. Click to copy.', fa: 'واحد مورد نظر (پاراگراف، جمله، کلمه) و مقدار را انتخاب کنید. متن فوراً تولید می‌شود. برای کپی کلیک کنید.' },
    tags: { en: ['lorem ipsum', 'placeholder', 'dummy text', 'design', 'mockup'], fa: ['متن ساختگی', 'متن آزمایشی', 'طراحی', 'ماکت'] },
  },
  {
    slug: 'markdown-preview',
    type: 'builtin',
    category: 'text',
    featured: false,
    icon: '📋',
    iconPath: '/tool-icons/markdown.svg',
    name: { en: 'Markdown Previewer', fa: 'پیش‌نمایش Markdown' },
    description: { en: 'Write Markdown and see the rendered HTML preview in real time.', fa: 'Markdown بنویسید و پیش‌نمایش HTML آن را به صورت زنده ببینید.' },
    longDescription: { en: 'A live Markdown editor with side-by-side preview. Write in the left panel, see the rendered output on the right. Supports GitHub Flavored Markdown including tables, task lists, and code highlighting.', fa: 'ویرایشگر زنده Markdown با پیش‌نمایش کنار هم. در پنل سمت چپ بنویسید و خروجی را در سمت راست ببینید. پشتیبانی از GitHub Flavored Markdown شامل جداول، لیست وظایف و برجسته‌سازی کد.' },
    howToUse: { en: 'Write Markdown on the left. The rendered HTML appears on the right instantly.', fa: 'Markdown را در سمت چپ بنویسید. خروجی HTML فوراً در سمت راست نمایش داده می‌شود.' },
    tags: { en: ['markdown', 'preview', 'editor', 'md', 'documentation'], fa: ['مارک‌داون', 'پیش‌نمایش', 'ویرایشگر', 'مستندسازی'] },
  },

  /* ── CODE TOOLS ── */
  {
    slug: 'json-formatter',
    type: 'builtin',
    category: 'code',
    featured: true,
    iconPath: '/tool-icons/json.svg',
    icon: '{ }',
    name: { en: 'JSON Formatter', fa: 'مرتب‌کننده JSON' },
    description: { en: 'Format, validate, and beautify JSON data. Tree view and error highlighting.', fa: 'مرتب‌سازی، اعتبارسنجی و زیباسازی داده‌های JSON. نمایش درختی و برجسته‌سازی خطا.' },
    longDescription: { en: 'A powerful JSON tool in your browser. Paste messy JSON and get it formatted instantly with syntax highlighting. Tree view for exploring large objects. Clear error messages with line numbers for invalid JSON.', fa: 'یک ابزار قدرتمند JSON در مرورگر شما. JSON نامرتب را جای‌گذاری کنید و فوراً با برجسته‌سازی نحوی مرتب شده تحویل بگیرید. نمایش درختی برای کاوش اشیاء بزرگ. پیام‌های خطای واضح با شماره خط برای JSON نامعتبر.' },
    howToUse: { en: 'Paste your JSON, click Format. The result appears with syntax highlighting. Use tree view to explore nested data. Errors show with line numbers.', fa: 'JSON خود را جای‌گذاری کنید، روی مرتب‌سازی کلیک کنید. نتیجه با برجسته‌سازی نحوی نمایش داده می‌شود. از نمایش درختی برای کاوش داده‌های تودرتو استفاده کنید. خطاها با شماره خط نمایش داده می‌شوند.' },
    tags: { en: ['json', 'formatter', 'validator', 'beautify', 'parser'], fa: ['json', 'مرتب‌سازی', 'اعتبارسنجی', 'زیباسازی', 'تجزیه'] },
  },
  {
    slug: 'url-encoder',
    type: 'builtin',
    category: 'code',
    featured: false,
    icon: '🔗',
    iconPath: '/tool-icons/url.svg',
    name: { en: 'URL Encoder / Decoder', fa: 'کدگذاری / رمزگشایی URL' },
    description: { en: 'Encode or decode URL strings. Handle query parameters with ease.', fa: 'کدگذاری یا رمزگشایی رشته‌های URL. مدیریت آسان پارامترهای query.' },
    longDescription: { en: 'Quickly encode or decode URLs and query strings. Perfect for working with API endpoints, sharing links with special characters, or debugging URL-encoded data.', fa: 'سریع URL ها و رشته‌های query را کدگذاری یا رمزگشایی کنید. عالی برای کار با endpoint های API، اشتراک لینک‌های حاوی کاراکترهای خاص یا اشکال‌زدایی داده‌های URL-encoded.' },
    howToUse: { en: 'Paste your text, click Encode or Decode. Result appears instantly.', fa: 'متن خود را جای‌گذاری کنید، روی Encode یا Decode کلیک کنید. نتیجه فوراً نمایش داده می‌شود.' },
    tags: { en: ['url', 'encode', 'decode', 'query string', 'api'], fa: ['url', 'کدگذاری', 'رمزگشایی', 'query string', 'api'] },
  },
  {
    slug: 'base64-encoder',
    type: 'builtin',
    category: 'code',
    featured: false,
    icon: '🔐',
    iconPath: '/tool-icons/key.svg',
    name: { en: 'Base64 Encoder / Decoder', fa: 'کدگذاری / رمزگشایی Base64' },
    description: { en: 'Encode and decode Base64 strings. Works with text and binary data.', fa: 'کدگذاری و رمزگشایی رشته‌های Base64. کار با متن و داده‌های باینری.' },
    longDescription: { en: 'A fast Base64 encoder and decoder that runs entirely in your browser. Encode any text to Base64 or decode Base64 strings back to readable text. Supports UTF-8 for multilingual content.', fa: 'یک رمزگذار و رمزگشای سریع Base64 که کاملاً در مرورگر شما اجرا می‌شود. هر متنی را به Base64 تبدیل کنید یا رشته‌های Base64 را به متن قابل خواندن برگردانید. پشتیبانی از UTF-8 برای محتوای چند زبانه.' },
    tags: { en: ['base64', 'encode', 'decode', 'binary', 'utf-8'], fa: ['base64', 'کدگذاری', 'رمزگشایی', 'باینری', 'utf-8'] },
  },
  {
    slug: 'uuid-generator',
    type: 'builtin',
    category: 'code',
    featured: false,
    icon: '🆔',
    name: { en: 'UUID Generator', fa: 'تولید UUID' },
    description: { en: 'Generate random UUIDs (v4). Single or bulk generation.', fa: 'تولید UUID تصادفی (نسخه ۴). تولید تکی یا گروهی.' },
    longDescription: { en: 'Generate RFC 4122 compliant UUID v4 strings. Create single UUIDs or generate up to 100 at once. All generated using crypto.randomUUID() for true randomness.', fa: 'تولید رشته‌های UUID نسخه ۴ مطابق با RFC 4122. یک UUID یا تا ۱۰۰ عدد به صورت همزمان تولید کنید. تمام تولید با استفاده از crypto.randomUUID() برای تصادفی بودن واقعی.' },
    howToUse: { en: 'Set how many UUIDs you need and click Generate. Click any UUID to copy it.', fa: 'تعداد UUID های مورد نیاز را تنظیم کنید و Generate را بزنید. روی هر UUID کلیک کنید تا کپی شود.' },
    tags: { en: ['uuid', 'guid', 'generator', 'identifier', 'random'], fa: ['uuid', 'guid', 'تولید', 'شناسه', 'تصادفی'] },
  },
  {
    slug: 'carbon',
    type: 'external',
    category: 'code',
    featured: false,
    icon: '🎨',
    iconPath: '/tool-icons/color-pallet.svg',
    url: 'https://carbon.now.sh',
    name: { en: 'Carbon', fa: 'Carbon' },
    description: { en: 'Create beautiful images of your source code. Great for sharing on social media.', fa: 'تصاویر زیبا از کد منبع خود بسازید. عالی برای اشتراک‌گذاری در شبکه‌های اجتماعی.' },
    longDescription: { en: 'Carbon lets you create and share beautiful images of your source code. Choose from dozens of themes, customize window styling, and export as PNG or SVG. Perfect for presentations, blogs, and social media.', fa: 'Carbon به شما امکان می‌دهد تصاویر زیبایی از کد منبع خود بسازید. از ده‌ها تم انتخاب کنید، استایل پنجره را سفارشی کنید و به صورت PNG یا SVG خروجی بگیرید. عالی برای ارائه‌ها، وبلاگ‌ها و شبکه‌های اجتماعی.' },
    tags: { en: ['code', 'screenshot', 'share', 'image', 'social'], fa: ['کد', 'اسکرین‌شات', 'اشتراک', 'تصویر', 'شبکه اجتماعی'] },
  },
  {
    slug: 'devdocs',
    type: 'external',
    category: 'code',
    featured: false,
    icon: '📚',
    url: 'https://devdocs.io',
    name: { en: 'DevDocs', fa: 'DevDocs' },
    description: { en: 'Searchable documentation for 100+ programming languages and frameworks.', fa: 'مستندات قابل جستجو برای بیش از ۱۰۰ زبان برنامه‌نویسی و فریم‌ورک.' },
    longDescription: { en: 'DevDocs combines multiple API documentations in a fast, organized, and searchable interface. Works offline. Covers JavaScript, Python, React, CSS, and dozens more.', fa: 'DevDocs مستندات چندین API را در یک رابط سریع، منظم و قابل جستجو ترکیب می‌کند. به صورت آفلاین کار می‌کند. پوشش JavaScript، Python، React، CSS و ده‌ها مورد دیگر.' },
    tags: { en: ['documentation', 'api', 'reference', 'docs', 'offline'], fa: ['مستندات', 'api', 'مرجع', 'داکیومنت', 'آفلاین'] },
  },
  {
    slug: 'regex101',
    type: 'external',
    category: 'code',
    featured: false,
    icon: '🔍',
    url: 'https://regex101.com',
    name: { en: 'Regex101', fa: 'Regex101' },
    description: { en: 'Build, test, and debug regular expressions with real-time explanation.', fa: 'ساخت، تست و اشکال‌زدایی عبارات منظم با توضیح زنده.' },
    longDescription: { en: 'Regex101 is a powerful regex tester and debugger. It explains every part of your regex pattern in plain English, shows match groups, and supports multiple flavors (PCRE, JavaScript, Python, Go).', fa: 'Regex101 یک تستر و اشکال‌زدا قدرتمند regex است. هر بخش از الگوی regex شما را به زبان ساده توضیح می‌دهد، گروه‌های تطابق را نشان می‌دهد و از چندین طعم (PCRE، JavaScript، Python، Go) پشتیبانی می‌کند.' },
    tags: { en: ['regex', 'regular expression', 'test', 'debug', 'pattern'], fa: ['regex', 'عبارت منظم', 'تست', 'اشکال‌زدایی', 'الگو'] },
  },

  /* ── COLOR TOOLS ── */
  {
    slug: 'color-converter',
    type: 'builtin',
    category: 'color',
    featured: false,
    icon: '🎨',
    iconPath: '/tool-icons/color-pallet.svg',
    name: { en: 'Color Converter', fa: 'مبدل رنگ' },
    description: { en: 'Convert colors between HEX, RGB, HSL, and more. Color picker included.', fa: 'تبدیل رنگ‌ها بین HEX، RGB، HSL و بیشتر. شامل انتخاب‌گر رنگ.' },
    longDescription: { en: 'Convert colors between all major formats: HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK. Includes an interactive color picker and a preview of the selected color. All processing is client-side.', fa: 'تبدیل رنگ‌ها بین تمام فرمت‌های اصلی: HEX، RGB، RGBA، HSL، HSLA، HSV و CMYK. شامل انتخاب‌گر رنگ تعاملی و پیش‌نمایش رنگ انتخاب شده. تمام پردازش در سمت کاربر.' },
    howToUse: { en: 'Use the color picker or enter a color value. All other formats update instantly.', fa: 'از انتخاب‌گر رنگ استفاده کنید یا یک مقدار رنگ وارد کنید. تمام فرمت‌های دیگر فوراً به‌روز می‌شوند.' },
    tags: { en: ['color', 'converter', 'hex', 'rgb', 'hsl', 'picker'], fa: ['رنگ', 'مبدل', 'hex', 'rgb', 'hsl', 'انتخاب‌گر'] },
  },
  {
    slug: 'coolors',
    type: 'external',
    category: 'color',
    featured: false,
    icon: '🌈',
    iconPath: '/tool-icons/color-convertor.svg',
    url: 'https://coolors.co',
    name: { en: 'Coolors', fa: 'Coolors' },
    description: { en: 'Generate beautiful color palettes. Fast palette generator for designers.', fa: 'تولید پالت‌های رنگی زیبا. مولد سریع پالت برای طراحان.' },
    longDescription: { en: 'Coolors is a super fast color palette generator. Press spacebar to generate new palettes, lock colors you like, and export in various formats. Also includes palette exploration, contrast checking, and more.', fa: 'Coolors یک مولد فوق سریع پالت رنگ است. Spacebar را برای تولید پالت‌های جدید بزنید، رنگ‌های مورد علاقه را قفل کنید و در فرمت‌های مختلف خروجی بگیرید. شامل کاوش پالت، بررسی کنتراست و بیشتر.' },
    tags: { en: ['color', 'palette', 'generator', 'design', 'scheme'], fa: ['رنگ', 'پالت', 'تولید', 'طراحی', 'طرح رنگی'] },
  },

  /* ── SECURITY TOOLS ── */
  {
    slug: 'password-generator',
    type: 'builtin',
    category: 'security',
    featured: true,
    icon: '🔑',
    iconPath: '/tool-icons/password.svg',
    name: { en: 'Password Generator', fa: 'تولید رمز عبور' },
    description: { en: 'Generate strong, random passwords with custom length and character sets.', fa: 'تولید رمزهای عبور قوی و تصادفی با طول و مجموعه کاراکترهای قابل تنظیم.' },
    longDescription: { en: 'Create cryptographically strong passwords in your browser. Customize length, character types (uppercase, lowercase, numbers, symbols), and exclude ambiguous characters. Passwords are generated locally and never transmitted.', fa: 'رمزهای عبور قوی رمزنگاری شده در مرورگر خود بسازید. طول، انواع کاراکتر (حروف بزرگ، کوچک، اعداد، نمادها) را تنظیم کنید و کاراکترهای مبهم را حذف کنید. رمزها به صورت محلی تولید می‌شوند و هرگز ارسال نمی‌شوند.' },
    howToUse: { en: 'Choose your password settings, click Generate. Click the password to copy it to clipboard.', fa: 'تنظیمات رمز عبور را انتخاب کنید، Generate را بزنید. روی رمز کلیک کنید تا در کلیپ‌بورد کپی شود.' },
    tags: { en: ['password', 'generator', 'security', 'strong', 'random'], fa: ['رمز عبور', 'تولید', 'امنیت', 'قوی', 'تصادفی'] },
  },
  {
    slug: 'hash-generator',
    type: 'builtin',
    category: 'security',
    featured: false,
    icon: '🔒',
    iconPath: '/tool-icons/hash.svg',
    name: { en: 'Hash Generator', fa: 'تولید Hash' },
    description: { en: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text.', fa: 'تولید Hash های MD5، SHA-1، SHA-256 و SHA-512 از هر متنی.' },
    longDescription: { en: 'Compute cryptographic hashes (MD5, SHA-1, SHA-256, SHA-384, SHA-512) from any input text. All hashing is performed client-side using the Web Crypto API. Useful for integrity checks and quick fingerprinting.', fa: 'محاسبه hash های رمزنگاری (MD5، SHA-1، SHA-256، SHA-384، SHA-512) از هر متن ورودی. تمام عملیات hash با استفاده از Web Crypto API در سمت کاربر انجام می‌شود. مفید برای بررسی صحت و fingerprinting سریع.' },
    howToUse: { en: 'Enter text, select hash algorithm, and the hash appears instantly. Updates as you type.', fa: 'متن را وارد کنید، الگوریتم hash را انتخاب کنید و hash فوراً نمایش داده می‌شود. با تایپ به‌روز می‌شود.' },
    tags: { en: ['hash', 'md5', 'sha', 'crypto', 'checksum'], fa: ['hash', 'md5', 'sha', 'رمزنگاری', 'checksum'] },
  },

  /* ── MATH TOOLS ── */
  {
    slug: 'unit-converter',
    type: 'builtin',
    category: 'math',
    featured: false,
    icon: '📐',
    iconPath: '/tool-icons/rule.svg',
    name: { en: 'Unit Converter', fa: 'مبدل واحدها' },
    description: { en: 'Convert between common units: length, weight, temperature, area, speed, and more.', fa: 'تبدیل بین واحدهای رایج: طول، وزن، دما، مساحت، سرعت و بیشتر.' },
    longDescription: { en: 'A comprehensive unit converter supporting 15+ categories: length, mass, temperature, area, volume, speed, time, pressure, energy, and more. Real-time conversion with high precision.', fa: 'یک مبدل جامع واحدها با پشتیبانی از بیش از ۱۵ دسته: طول، جرم، دما، مساحت، حجم، سرعت، زمان، فشار، انرژی و بیشتر. تبدیل زنده با دقت بالا.' },
    howToUse: { en: 'Select a category, enter a value, and pick your units. Conversion results update in real time.', fa: 'یک دسته را انتخاب کنید، مقدار را وارد کنید و واحدهای مبدا و مقصد را انتخاب کنید. نتایج تبدیل به صورت زنده به‌روز می‌شوند.' },
    tags: { en: ['unit', 'converter', 'length', 'weight', 'temperature', 'metric'], fa: ['واحد', 'مبدل', 'طول', 'وزن', 'دما', 'متریک'] },
  },

  /* ── DATA TOOLS ── */
  {
    slug: 'json-crack',
    type: 'external',
    category: 'data',
    featured: false,
    icon: '🧩',
    url: 'https://jsoncrack.com',
    name: { en: 'JSON Crack', fa: 'JSON Crack' },
    description: { en: 'Visualize JSON data as interactive node graphs. Great for exploring APIs.', fa: 'نمایش داده‌های JSON به صورت نمودارهای گره تعاملی. عالی برای کاوش API ها.' },
    longDescription: { en: 'JSON Crack transforms JSON, YAML, XML, and CSV data into interactive, visually appealing node graphs. Perfect for understanding complex data structures, APIs, and configurations at a glance.', fa: 'JSON Crack داده‌های JSON، YAML، XML و CSV را به نمودارهای گره تعاملی و جذاب تبدیل می‌کند. عالی برای درک سریع ساختارهای پیچیده داده، API ها و پیکربندی‌ها.' },
    tags: { en: ['json', 'visualization', 'graph', 'data', 'api'], fa: ['json', 'نمایش', 'گراف', 'داده', 'api'] },
  },
  {
    slug: 'transform-tools',
    type: 'external',
    category: 'data',
    featured: false,
    icon: '🔄',
    url: 'https://transform.tools',
    name: { en: 'Transform Tools', fa: 'Transform Tools' },
    description: { en: 'Convert between JSON, YAML, TOML, XML, and many other data formats.', fa: 'تبدیل بین JSON، YAML، TOML، XML و بسیاری فرمت‌های داده دیگر.' },
    longDescription: { en: 'Transform.tools is a polyglot web converter that handles dozens of formats: JSON to/from TypeScript, YAML, GraphQL, Rust, Go, and many more. Instant, client-side conversion.', fa: 'Transform.tools یک مبدل وب چند فرمته است که ده‌ها فرمت را پشتیبانی می‌کند: JSON به/از TypeScript، YAML، GraphQL، Rust، Go و بسیاری دیگر. تبدیل فوری در سمت کاربر.' },
    tags: { en: ['transform', 'convert', 'json', 'yaml', 'toml', 'xml'], fa: ['تبدیل', 'json', 'yaml', 'toml', 'xml', 'فرمت'] },
  },

  /* ── DEVELOPER TOOLS ── */
  {
    slug: 'time-converter',
    type: 'builtin',
    category: 'devtools',
    featured: false,
    icon: '🕐',
    name: { en: 'Timestamp Converter', fa: 'مبدل Timestamp' },
    description: { en: 'Convert Unix timestamps to human-readable dates and vice versa.', fa: 'تبدیل Timestamp های Unix به تاریخ قابل خواندن و بالعکس.' },
    longDescription: { en: 'Convert Unix timestamps (in seconds or milliseconds) to human-readable dates across timezones. Also convert dates back to timestamps. Perfect for developers working with APIs and databases.', fa: 'تبدیل Timestamp های Unix (به ثانیه یا میلی‌ثانیه) به تاریخ قابل خواندن در مناطق زمانی مختلف. همچنین تبدیل تاریخ به Timestamp. عالی برای توسعه‌دهندگانی که با API ها و پایگاه داده کار می‌کنند.' },
    howToUse: { en: 'Enter a timestamp or pick a date. The conversion appears instantly with multiple timezone options.', fa: 'یک Timestamp وارد کنید یا یک تاریخ انتخاب کنید. تبدیل فوراً با گزینه‌های منطقه زمانی نمایش داده می‌شود.' },
    tags: { en: ['timestamp', 'unix', 'epoch', 'date', 'timezone'], fa: ['timestamp', 'unix', 'epoch', 'تاریخ', 'منطقه زمانی'] },
  },
  {
    slug: 'code-sandbox',
    type: 'external',
    category: 'devtools',
    featured: false,
    icon: '💻',
    url: 'https://codesandbox.io',
    name: { en: 'CodeSandbox', fa: 'CodeSandbox' },
    description: { en: 'Online code editor and prototyping environment for web development.', fa: 'ویرایشگر کد آنلاین و محیط نمونه‌سازی برای توسعه وب.' },
    longDescription: { en: 'CodeSandbox is an instant, collaborative sandbox for rapid web development. Run React, Vue, Angular, or vanilla projects in your browser without any setup. Great for prototyping and sharing demos.', fa: 'CodeSandbox یک sandbox فوری و مشارکتی برای توسعه سریع وب است. پروژه‌های React، Vue، Angular یا vanilla را بدون هیچ تنظیماتی در مرورگر اجرا کنید. عالی برای نمونه‌سازی و اشتراک‌گذاری دموها.' },
    tags: { en: ['sandbox', 'editor', 'prototyping', 'react', 'vue'], fa: ['sandbox', 'ویرایشگر', 'نمونه‌سازی', 'react', 'vue'] },
  },
  {
    slug: 'jwt-debugger',
    type: 'external',
    category: 'devtools',
    featured: false,
    icon: '🎫',
    url: 'https://jwt.io',
    name: { en: 'JWT Debugger', fa: 'اشکال‌زدا JWT' },
    description: { en: 'Decode, verify, and debug JSON Web Tokens. See header, payload, and signature.', fa: 'رمزگشایی، تایید و اشکال‌زدایی JSON Web Token ها. مشاهده header، payload و signature.' },
    longDescription: { en: 'JWT.io debugger lets you decode, verify, and generate JWTs. Paste a token and instantly see the decoded header and payload. Verify signatures with public keys or secrets.', fa: 'اشکال‌زدا JWT.io امکان رمزگشایی، تایید و تولید JWT را فراهم می‌کند. یک token را جای‌گذاری کنید و فوراً header و payload رمزگشایی شده را ببینید. امضاها را با کلیدهای عمومی یا secrets تایید کنید.' },
    tags: { en: ['jwt', 'token', 'debug', 'auth', 'security'], fa: ['jwt', 'token', 'اشکال‌زدایی', 'احراز هویت', 'امنیت'] },
  },

  /* ── MORE BUILT-IN TOOLS ── */
  {
    slug: 'line-sorter',
    type: 'builtin',
    category: 'text',
    featured: false,
    icon: '📋',
    name: { en: 'Line Sorter', fa: 'مرتب‌کننده خطوط' },
    description: { en: 'Sort lines alphabetically, numerically, or randomly. Remove duplicates.', fa: 'مرتب‌سازی خطوط به صورت الفبایی، عددی یا تصادفی. حذف موارد تکراری.' },
    longDescription: { en: 'Sort lines of text alphabetically (ascending/descending), numerically, by length, or randomly. Remove duplicate lines, trim whitespace, and reverse line order. All processing happens in your browser.', fa: 'مرتب‌سازی خطوط متن به صورت الفبایی (صعودی/نزولی)، عددی، بر اساس طول یا تصادفی. حذف خطوط تکراری، حذف فاصله‌های اضافی و معکوس کردن ترتیب خطوط. تمام پردازش در مرورگر انجام می‌شود.' },
    howToUse: { en: 'Paste your text, choose a sort method, and click Sort. Results appear instantly.', fa: 'متن خود را جای‌گذاری کنید، روش مرتب‌سازی را انتخاب کنید و Sort را بزنید. نتایج فوراً نمایش داده می‌شوند.' },
    tags: { en: ['sort', 'lines', 'alphabetical', 'duplicate', 'order'], fa: ['مرتب‌سازی', 'خطوط', 'الفبایی', 'تکراری', 'ترتیب'] },
  },
  {
    slug: 'regex-tester',
    type: 'builtin',
    category: 'code',
    featured: false,
    icon: '🔍',
    name: { en: 'Regex Tester', fa: 'تستر Regex' },
    description: { en: 'Test regular expressions against sample text. See matches and groups in real time.', fa: 'تست عبارات منظم روی متن نمونه. مشاهده تطابق‌ها و گروه‌ها به صورت زنده.' },
    longDescription: { en: 'A simple, fast regex tester that updates as you type. Enter a pattern and test text, see all matches highlighted with group details. Supports JavaScript regex flavor.', fa: 'یک تستر regex ساده و سریع که با تایپ شما به‌روز می‌شود. الگو و متن تست را وارد کنید، تمام تطابق‌ها را با جزئیات گروه‌ها برجسته ببینید. پشتیبانی از طعم JavaScript.' },
    howToUse: { en: 'Enter a regex pattern (without delimiters) and test text. Matches appear highlighted in real time.', fa: 'الگوی regex (بدون delimiter) و متن تست را وارد کنید. تطابق‌ها به صورت زنده برجسته می‌شوند.' },
    tags: { en: ['regex', 'regular expression', 'test', 'match', 'pattern'], fa: ['regex', 'عبارت منظم', 'تست', 'تطابق', 'الگو'] },
  },

  /* ── DATE & TIME TOOLS ── */
  {
    slug: 'date-difference',
    type: 'builtin',
    category: 'datetime',
    featured: false,
    icon: '📅',
    name: { en: 'Date Difference Calculator', fa: 'محاسبه اختلاف تاریخ' },
    description: { en: 'Calculate days, weeks, months, and years between two dates.', fa: 'محاسبه روز، هفته، ماه و سال بین دو تاریخ.' },
    longDescription: { en: 'Find the exact difference between any two dates. Calculate in days, weeks, months, or years. Useful for project planning, age calculation between specific dates, and deadline tracking.', fa: 'تفاوت دقیق بین هر دو تاریخ را پیدا کنید. محاسبه به روز، هفته، ماه یا سال. مفید برای برنامه‌ریزی پروژه، محاسبه سن بین تاریخ‌های خاص و پیگیری مهلت‌ها.' },
    howToUse: { en: 'Select the start and end dates. The difference updates automatically in days, months, and years.', fa: 'تاریخ شروع و پایان را انتخاب کنید. اختلاف به صورت خودکار به روز، ماه و سال به‌روز می‌شود.' },
    tags: { en: ['date', 'difference', 'calculator', 'days', 'between'], fa: ['تاریخ', 'اختلاف', 'محاسبه', 'روز', 'بین'] },
  },

  /* ── GENERAL TOOLS ── */
  {
    slug: 'percentage-calculator',
    type: 'builtin',
    category: 'general',
    featured: true,
    icon: '💯',
    name: { en: 'Percentage Calculator', fa: 'محاسبه درصد' },
    description: { en: 'Calculate percentages, percentage change, and find the percentage of a number.', fa: 'محاسبه درصد، تغییر درصد و یافتن درصد یک عدد.' },
    longDescription: { en: 'A versatile percentage calculator. Find what percentage X is of Y, calculate percentage increase/decrease, find a percentage of a number, and more.', fa: 'یک ماشین‌حساب درصد همه‌کاره. ببینید X چند درصد Y است، محاسبه افزایش/کاهش درصد، یافتن درصد یک عدد و بیشتر.' },
    howToUse: { en: 'Choose a calculation type, enter your numbers, and the result appears instantly.', fa: 'نوع محاسبه را انتخاب کنید، اعداد را وارد کنید و نتیجه فوراً نمایش داده می‌شود.' },
    tags: { en: ['percentage', 'calculator', 'percent', 'math', 'ratio'], fa: ['درصد', 'محاسبه', 'ریاضی', 'نسبت'] },
  },
  {
    slug: 'random-number',
    type: 'builtin',
    category: 'general',
    featured: false,
    icon: '🎲',
    name: { en: 'Random Number Generator', fa: 'تولید عدد تصادفی' },
    description: { en: 'Generate random numbers within a range. Choose your min, max, and count.', fa: 'تولید اعداد تصادفی در یک بازه. حداقل، حداکثر و تعداد را انتخاب کنید.' },
    longDescription: { en: 'Generate truly random numbers within any range. Set minimum and maximum values, choose how many numbers to generate, and decide whether to allow duplicates.', fa: 'تولید اعداد واقعاً تصادفی در هر بازه. مقادیر حداقل و حداکثر را تنظیم کنید، تعداد اعداد را انتخاب کنید و تصمیم بگیرید آیا اعداد تکراری مجاز هستند.' },
    howToUse: { en: 'Set the minimum, maximum, and count. Click Generate. Numbers appear instantly.', fa: 'حداقل، حداکثر و تعداد را تنظیم کنید. Generate را بزنید. اعداد فوراً نمایش داده می‌شوند.' },
    tags: { en: ['random', 'number', 'generator', 'dice', 'roll'], fa: ['تصادفی', 'عدد', 'تولید', 'تاس', 'قرعه'] },
  },
  {
    slug: 'bmi-calculator',
    type: 'builtin',
    category: 'general',
    featured: false,
    icon: '⚖️',
    name: { en: 'BMI Calculator', fa: 'محاسبه BMI' },
    description: { en: 'Calculate your Body Mass Index (BMI) and see your weight category.', fa: 'شاخص توده بدنی (BMI) خود را محاسبه کنید و دسته وزنی خود را ببینید.' },
    longDescription: { en: 'Calculate your Body Mass Index using standard or metric units. Enter your height and weight to get your BMI value and weight category classification.', fa: 'شاخص توده بدنی خود را با واحدهای استاندارد یا متریک محاسبه کنید. قد و وزن خود را وارد کنید تا مقدار BMI و طبقه‌بندی دسته وزنی خود را دریافت کنید.' },
    howToUse: { en: 'Enter your weight and height. Your BMI and weight category update automatically.', fa: 'وزن و قد خود را وارد کنید. BMI و دسته وزنی شما به صورت خودکار به‌روز می‌شود.' },
    tags: { en: ['bmi', 'body mass', 'health', 'weight', 'calculator'], fa: ['bmi', 'توده بدنی', 'سلامت', 'وزن', 'محاسبه'] },
  },

  /* ── PDF TOOLS (coming soon) ── */
  {
    slug: 'merge-pdf',
    type: 'builtin',
    category: 'pdf',
    featured: false,
    icon: '📎',
    name: { en: 'Merge PDF', fa: 'ادغام PDF' },
    description: { en: 'Combine multiple PDF files into a single document. Coming soon.', fa: 'ترکیب چند فایل PDF در یک سند. به زودی.' },
    longDescription: { en: 'Merge multiple PDF files into one document. Upload your PDFs, arrange them in the desired order, and download the combined file. This tool is currently in development.', fa: 'ادغام چند فایل PDF در یک سند. فایل‌های PDF خود را آپلود کنید، به ترتیب دلخواه بچینید و فایل ترکیبی را دانلود کنید. این ابزار در حال توسعه است.' },
    tags: { en: ['pdf', 'merge', 'combine', 'document', 'join'], fa: ['pdf', 'ادغام', 'ترکیب', 'سند', 'اتصال'] },
  },
  {
    slug: 'compress-pdf',
    type: 'builtin',
    category: 'pdf',
    featured: false,
    icon: '🗜️',
    name: { en: 'Compress PDF', fa: 'فشرده‌سازی PDF' },
    description: { en: 'Reduce PDF file size while maintaining quality. Coming soon.', fa: 'کاهش حجم فایل PDF با حفظ کیفیت. به زودی.' },
    longDescription: { en: 'Compress PDF files to reduce their size for easier sharing and storage. Choose your compression level and download the optimized file. This tool is currently in development.', fa: 'فشرده‌سازی فایل‌های PDF برای کاهش حجم جهت اشتراک و ذخیره‌سازی آسان‌تر. سطح فشرده‌سازی را انتخاب کنید و فایل بهینه شده را دانلود کنید. این ابزار در حال توسعه است.' },
    tags: { en: ['pdf', 'compress', 'reduce', 'size', 'optimize'], fa: ['pdf', 'فشرده‌سازی', 'کاهش حجم', 'بهینه‌سازی'] },
  },

  /* ── DOWNLOADER TOOLS (coming soon) ── */
  {
    slug: 'youtube-downloader',
    type: 'builtin',
    category: 'downloader',
    featured: false,
    icon: '▶️',
    name: { en: 'YouTube Downloader', fa: 'دانلود از یوتیوب' },
    description: { en: 'Download YouTube videos in various formats and qualities. Coming soon.', fa: 'دانلود ویدیوهای یوتیوب در فرمت‌ها و کیفیت‌های مختلف. به زودی.' },
    longDescription: { en: 'Download YouTube videos for offline viewing. Support for multiple formats and resolutions. This tool is currently in development — please check back soon or suggest alternative tools.', fa: 'دانلود ویدیوهای یوتیوب برای مشاهده آفلاین. پشتیبانی از فرمت‌ها و کیفیت‌های مختلف. این ابزار در حال توسعه است — لطفاً به زودی بررسی کنید یا ابزارهای جایگزین پیشنهاد دهید.' },
    tags: { en: ['youtube', 'download', 'video', 'mp4', 'offline'], fa: ['یوتیوب', 'دانلود', 'ویدیو', 'mp4', 'آفلاین'] },
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(t => t.featured);
}

export function getBuiltinTools(): Tool[] {
  return tools.filter(t => t.type === 'builtin');
}

export function getExternalTools(): Tool[] {
  return tools.filter(t => t.type === 'external');
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(t =>
    t.name.en.toLowerCase().includes(q) ||
    t.name.fa.includes(q) ||
    t.description.en.toLowerCase().includes(q) ||
    t.description.fa.includes(q) ||
    t.tags.en.some(tag => tag.toLowerCase().includes(q)) ||
    t.tags.fa.some(tag => tag.includes(q))
  );
}
