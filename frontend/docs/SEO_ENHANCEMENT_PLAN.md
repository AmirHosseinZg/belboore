# SEO ENHANCEMENT PLAN — BELBOORE MVP

## Current State
- Canonical URLs ✓
- hreflang alternates ✓
- Open Graph + Twitter Cards ✓
- JSON-LD WebSite schema ✓
- Auto-generated sitemap ✓
- robots.txt ✓
- Semantic HTML ✓

## Gaps to Close

### 1. Missing Assets
- **og-default.png** — 1200×630 social sharing image with Belboore branding
- **apple-touch-icon.png** — 180×180 iOS bookmark icon

### 2. Schema Markup Expansion
Current: Only `WebSite` schema on the SEO component.

To add:
- **`SoftwareApplication`** or **`WebApplication`** schema on tool pages
- **`BreadcrumbList`** schema on all interior pages
- **`FAQPage`** schema on tool pages with FAQ sections
- **`ItemList`** schema on tools listing and category pages
- **`HowTo`** schema on tool pages with how-to-use instructions

### 3. Metadata Quality
- Add `meta keywords` (though deprecated, still used by some crawlers for Persian search)
- Review all `<title>` tags for keyword optimization
- Ensure meta descriptions are within 150-160 char limit
- Add unique `<title>` per tool page that includes primary keyword

### 4. Content Quality
- Add substantive intro copy on tool pages (not just one sentence)
- Add FAQ sections to all tool pages
- Add use-case lists
- Add privacy/local-processing disclaimers
- Internal linking between related tools and categories
- Category page intro copy with keyword-rich descriptions

### 5. Technical SEO
- Verify no crawl errors (404 pages returning proper status)
- Ensure `_headers` security rules don't block crawlers
- Verify sitemap includes all pages
- Add `lastmod` to sitemap entries (requires build time tracking)

### 6. Mobile SEO
- Ensure mobile-friendly design (Google mobile-first indexing)
- Viewport meta tag present ✓
- Touch targets adequate (min 44px) ✓
- Content not hidden on mobile (fix nav issue)

### 7. Performance for SEO
- PageSpeed/Core Web Vitals optimization
- Font loading strategy (font-display: swap)
- Minimal render-blocking resources
- Image optimization

### 8. Persian SEO
- All Persian pages need equivalent SEO quality to English
- Persian meta descriptions must be natural and compelling
- Persian keywords must match actual Persian search behavior
- Schema markup in Persian where appropriate

---

## Implementation Priority

| Priority | Task | Impact |
|----------|------|--------|
| P0 | Add OG image + Apple icon | Fixes 404s, enables social sharing |
| P0 | BreadcrumbList schema on all pages | Structured data for search results |
| P1 | FAQPage schema on tool pages | Rich results in SERP |
| P1 | SoftwareApplication schema on tool pages | Rich results for tool queries |
| P1 | Enhanced tool page copy (FAQs, use cases) | Content depth for ranking |
| P2 | ItemList schema on listing pages | Structured data for index pages |
| P2 | HowTo schema on tool pages | Rich results for how-to queries |
| P2 | Performance optimization | Core Web Vitals |
| P3 | `lastmod` in sitemap | Crawl efficiency |
| P3 | Meta keywords | Marginal benefit (Persian) |

---

## High-Intent Query Targeting

The following tool/category pages should be optimized to rank for their respective queries:

### English queries
| Tool | Target Query |
|------|-------------|
| JSON Formatter | "json formatter", "json validator", "beautify json" |
| Password Generator | "password generator", "strong password generator" |
| Base64 Encoder | "base64 encode decode", "base64 converter" |
| URL Encoder | "url encode decode", "url encoder" |
| Image Compressor | "compress image online", "image compressor" |
| QR Code Generator | "qr code generator", "create qr code" |
| Word Counter | "word counter", "character counter" |
| Case Converter | "case converter", "uppercase to lowercase" |
| Color Converter | "hex to rgb", "color converter" |
| Timestamp Converter | "unix timestamp converter", "epoch converter" |
| Unit Converter | "unit converter", "metric converter" |
| Hash Generator | "sha256 generator", "md5 hash generator" |
| UUID Generator | "uuid generator", "guid generator" |
| Markdown Previewer | "markdown preview", "markdown editor" |
| Regex Tester | "regex tester", "regex101 alternative" |

### Persian queries (فارسی)
| Tool | Target Query |
|------|-------------|
| JSON Formatter | "مرتب کننده json", "فرمت json" |
| Password Generator | "تولید رمز عبور", "ساخت پسورد قوی" |
| QR Code Generator | "ساخت qr code", "تولید بارکد" |
| Image Compressor | "فشرده سازی عکس", "کاهش حجم تصویر" |
| Word Counter | "شمارش کلمات", "شمارنده کاراکتر" |
| Image to Base64 | "تبدیل عکس به base64" |
