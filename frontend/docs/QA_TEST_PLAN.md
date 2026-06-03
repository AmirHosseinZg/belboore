# QA TEST PLAN — BELBOORE MVP

## Test Framework

**Tool:** Playwright (end-to-end browser testing)
**Target browsers:** Chromium (primary), Firefox, WebKit
**Test location:** `/tests/`

## Setup

```bash
npm install -D @playwright/test
npx playwright install
```

## Test Categories

### 1. Core Site Smoke Tests

| Test ID | Description | Priority |
|---------|-------------|----------|
| CORE-01 | Homepage loads in English (`/en/`) | P0 |
| CORE-02 | Homepage loads in Persian (`/fa/`) | P0 |
| CORE-03 | Root `/` redirects to `/fa/` | P0 |
| CORE-04 | Language switcher preserves current route | P0 |
| CORE-05 | Theme toggle switches light/dark and persists | P0 |
| CORE-06 | Mobile hamburger menu opens and closes | P0 |
| CORE-07 | Mobile nav links navigate correctly | P0 |
| CORE-08 | All nav links are functional | P1 |
| CORE-09 | Footer links are functional | P1 |
| CORE-10 | 404 page renders for unknown routes | P1 |
| CORE-11 | Skip-to-content link is focusable and works | P2 |

### 2. Search Tests

| Test ID | Description | Priority |
|---------|-------------|----------|
| SRCH-01 | Hero search redirects to tools page with query | P0 |
| SRCH-02 | Tools page search filters results by query | P0 |
| SRCH-03 | Search returns results for Persian queries | P1 |
| SRCH-04 | Search works with partial matches | P1 |
| SRCH-05 | Ctrl+K focuses search on homepage | P2 |
| SRCH-06 | No results state shows appropriate message | P2 |

### 3. Category Pages

| Test ID | Description | Priority |
|---------|-------------|----------|
| CAT-01 | Categories listing page loads (`/en/categories`) | P1 |
| CAT-02 | Each category page loads and shows tools | P1 |
| CAT-03 | Category tool counts are accurate | P2 |

### 4. Tool Detail Pages

| Test ID | Description | Priority |
|---------|-------------|----------|
| TOOL-01 | Tool detail pages load for all tools | P1 |
| TOOL-02 | Breadcrumb navigation works | P1 |
| TOOL-03 | External tools open in new tab | P1 |
| TOOL-04 | Builtin tools show interactive workspace | P0 |
| TOOL-05 | Coming-soon tools show appropriate badge | P1 |

### 5. Live Built-in Tool Tests

| Test ID | Tool | Description | Priority |
|---------|------|-------------|----------|
| JSON-01 | JSON Formatter | Formats valid JSON correctly | P0 |
| JSON-02 | JSON Formatter | Shows error for invalid JSON | P0 |
| B64-01 | Base64 Encoder | Encodes text to Base64 correctly | P0 |
| B64-02 | Base64 Decoder | Decodes Base64 to text correctly | P0 |
| URL-01 | URL Encoder | Encodes URL string correctly | P0 |
| URL-02 | URL Decoder | Decodes URL string correctly | P0 |
| UUID-01 | UUID Generator | Generates valid UUID v4 | P0 |
| PASS-01 | Password Generator | Generates password with options | P0 |
| CASE-01 | Case Converter | Converts to uppercase correctly | P0 |
| CASE-02 | Case Converter | Converts to lowercase correctly | P0 |
| WORD-01 | Word Counter | Counts words correctly | P0 |
| LOREM-01 | Lorem Ipsum | Generates paragraphs | P1 |
| SORT-01 | Line Sorter | Sorts lines alphabetically | P1 |
| COLOR-01 | Color Converter | Converts HEX to RGB | P1 |
| HASH-01 | Hash Generator | Generates SHA-256 hash | P1 |
| TS-01 | Timestamp Converter | Converts timestamp to date | P1 |
| UNIT-01 | Unit Converter | Converts length units | P1 |
| DIFF-01 | Text Diff | Shows differences between texts | P1 |
| REGEX-01 | Regex Tester | Matches pattern in text | P1 |
| IMG-B64-01 | Image to Base64 | Accepts image upload | P1 |
| QR-01 | QR Code Generator | Generates QR for input text | P1 |
| MARKDOWN-01 | Markdown Previewer | Renders markdown to HTML | P1 |
| IMG-CMP-01 | Image Compressor | Compresses uploaded image | P1 |
| IMG-RSZ-01 | Image Resizer | Resizes uploaded image | P1 |

### 6. SEO Tests

| Test ID | Description | Priority |
|---------|-------------|----------|
| SEO-01 | Canonical URL present on all pages | P1 |
| SEO-02 | hreflang alternates present | P1 |
| SEO-03 | OG tags present on homepage | P1 |
| SEO-04 | JSON-LD schema present on homepage | P1 |
| SEO-05 | BreadcrumbList schema on tool pages | P2 |
| SEO-06 | Sitemap accessible and valid XML | P1 |
| SEO-07 | robots.txt accessible | P1 |
| SEO-08 | Meta description present on all pages | P1 |

### 7. Accessibility Tests

| Test ID | Description | Priority |
|---------|-------------|----------|
| A11Y-01 | Skip-to-content link works | P2 |
| A11Y-02 | Focus indicators visible on Tab | P2 |
| A11Y-03 | ARIA labels on interactive elements | P2 |
| A11Y-04 | Heading hierarchy is valid | P2 |

### 8. RTL / i18n Tests

| Test ID | Description | Priority |
|---------|-------------|----------|
| RTL-01 | Persian pages render RTL | P1 |
| RTL-02 | Language switcher preserves deep routes | P1 |
| RTL-03 | All UI text is translated in Persian | P1 |
| RTL-04 | RTL layout doesn't break on mobile | P2 |

---

## Test Scripts

```json
// package.json additions
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed"
  }
}
```

## CI Integration

For Cloudflare Pages / GitHub Actions:
```yaml
# .github/workflows/test.yml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npx playwright install --with-deps
      - run: npm test
```

---

## Test File Organization

```
tests/
├── playwright.config.ts
├── core/
│   └── smoke.spec.ts
├── search/
│   └── search.spec.ts
├── categories/
│   └── categories.spec.ts
├── tools/
│   ├── json-formatter.spec.ts
│   ├── base64-encoder.spec.ts
│   ├── url-encoder.spec.ts
│   └── ...
├── seo/
│   └── seo.spec.ts
├── i18n/
│   └── i18n.spec.ts
└── a11y/
    └── accessibility.spec.ts
```
