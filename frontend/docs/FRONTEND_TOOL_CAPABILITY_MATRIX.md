# FRONTEND TOOL CAPABILITY MATRIX — BELBOORE MVP

**Purpose:** Classify every tool by implementation feasibility and priority for the MVP completion phase.

---

## Classification Legend

| Field | Description |
|-------|-------------|
| `type` | `builtin` (our page) \| `external` (link out) |
| `implementation` | `frontend` (client-side browser APIs) \| `backend-required` (server processing) \| `external-redirect` (third-party) |
| `status` | `live` (implemented) \| `coming-soon` (planned) \| `curated` (external link) |
| `seoPriority` | `high` (high-intent search queries) \| `medium` \| `low` |

### Decision Rule
- **live** ← Can function fully in-browser with Web APIs + optional small JS libraries (no server)
- **coming-soon** ← Requires server rendering, CORS-blocked fetches, authenticated scraping, heavy transcoding, backend storage
- **curated** ← High-quality external tool with a dedicated landing page

---

## Existing Tools — Reclassified

### IMAGE TOOLS

| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 1 | `image-to-base64` | builtin | frontend | **live** | high |
| 2 | `qr-code-generator` | builtin | frontend | **live** | high |
| 3 | `squoosh` | external | external-redirect | curated | medium |
| 4 | `excalidraw` | external | external-redirect | curated | medium |

### TEXT TOOLS

| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 5 | `text-diff` | builtin | frontend | **live** | medium |
| 6 | `word-counter` | builtin | frontend | **live** | high |
| 7 | `case-converter` | builtin | frontend | **live** | high |
| 8 | `lorem-ipsum` | builtin | frontend | **live** | medium |
| 9 | `markdown-preview` | builtin | frontend | **live** | medium |
| 10 | `line-sorter` | builtin | frontend | **live** | low |

### CODE TOOLS

| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 11 | `json-formatter` | builtin | frontend | **live** | high |
| 12 | `url-encoder` | builtin | frontend | **live** | high |
| 13 | `base64-encoder` | builtin | frontend | **live** | high |
| 14 | `uuid-generator` | builtin | frontend | **live** | medium |
| 15 | `regex-tester` | builtin | frontend | **live** | medium |
| 16 | `carbon` | external | external-redirect | curated | low |
| 17 | `devdocs` | external | external-redirect | curated | low |
| 18 | `regex101` | external | external-redirect | curated | medium |

### COLOR TOOLS

| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 19 | `color-converter` | builtin | frontend | **live** | high |
| 20 | `coolors` | external | external-redirect | curated | low |

### SECURITY TOOLS

| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 21 | `password-generator` | builtin | frontend | **live** | high |
| 22 | `hash-generator` | builtin | frontend | **live** | medium |

### MATH TOOLS

| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 23 | `unit-converter` | builtin | frontend | **live** | high |

### DATA TOOLS

| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 24 | `json-crack` | external | external-redirect | curated | low |
| 25 | `transform-tools` | external | external-redirect | curated | low |

### DEVELOPER TOOLS

| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 26 | `time-converter` | builtin | frontend | **live** | medium |
| 27 | `code-sandbox` | external | external-redirect | curated | low |
| 28 | `jwt-debugger` | external | external-redirect | curated | low |

---

## New Tools — To Be Added

### IMAGE TOOLS (expanded)
| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 29 | `image-compressor` | builtin | frontend | **live** | high |
| 30 | `image-resizer` | builtin | frontend | **live** | high |
| 31 | `image-converter` | builtin | frontend | **live** | high |
| 32 | `color-picker` | builtin | frontend | **live** | high |
| 33 | `favicon-generator` | builtin | frontend | **live** | medium |

### TEXT TOOLS (expanded)
| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 34 | `slug-generator` | builtin | frontend | **live** | medium |
| 35 | `html-escape` | builtin | frontend | **live** | medium |
| 36 | `remove-duplicate-lines` | builtin | frontend | **live** | low |

### CODE / DEV TOOLS (expanded)
| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 37 | `csv-to-json` | builtin | frontend | **live** | medium |
| 38 | `json-to-csv` | builtin | frontend | **live** | medium |
| 39 | `html-previewer` | builtin | frontend | **live** | low |
| 40 | `query-string-parser` | builtin | frontend | **live** | low |

### DATE & TIME TOOLS (new category)
| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 41 | `date-difference` | builtin | frontend | **live** | medium |
| 42 | `countdown-timer` | builtin | frontend | **live** | low |

### GENERAL TOOLS (new category)
| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 43 | `percentage-calculator` | builtin | frontend | **live** | high |
| 44 | `random-number` | builtin | frontend | **live** | medium |
| 45 | `random-picker` | builtin | frontend | **live** | low |
| 46 | `bmi-calculator` | builtin | frontend | **live** | medium |
| 47 | `age-calculator` | builtin | frontend | **live** | medium |
| 48 | `tip-calculator` | builtin | frontend | **live** | medium |

### PDF / DOCS TOOLS (new category, mostly coming-soon)
| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 49 | `merge-pdf` | builtin | backend-required | **coming-soon** | high |
| 50 | `compress-pdf` | builtin | backend-required | **coming-soon** | high |
| 51 | `pdf-to-jpg` | builtin | backend-required | **coming-soon** | high |

### DOWNLOADER TOOLS (coming-soon only)
| # | Slug | Type | Implementation | Status | SEO Priority |
|---|------|------|---------------|--------|--------------|
| 52 | `youtube-downloader` | builtin | backend-required | **coming-soon** | high |
| 53 | `instagram-downloader` | builtin | backend-required | **coming-soon** | high |

---

## Implementation Feasibility Notes

### Fully feasible frontend (no dependencies beyond what's in browser)
- JSON formatter, URL encoder, Base64 encoder, UUID generator, Password generator, Case converter, Word counter, Lorem ipsum, Line sorter, Hash generator (Web Crypto), Timestamp converter, Unit converter, Color converter, Slug generator, HTML escape, CSV↔JSON, Percentage calculator, Random number/picker, BMI calculator, Age calculator, Tip calculator, Date difference, Countdown timer, Regex tester, Text diff, Query string parser, HTML previewer

### Feasible with small JS libraries
- QR Code Generator (needs `qrcode` library or Canvas API)
- Markdown Previewer (needs `marked` or similar)
- Image Compressor (Canvas API — feasible)
- Image Resizer (Canvas API — feasible)
- Image Converter (Canvas API — feasible for jpg/png/webp)
- Image to Base64 (FileReader API — already classified as feasible)
- Favicon Generator (Canvas API)
- Color Picker (native `<input type="color">` — trivial)

### Backend-required (honest coming-soon)
- PDF tools (merge, compress, convert — need server-side PDF library)
- Downloader tools (need server-side fetching, legal constraints)
- Advanced image processing (batch, heavy compression, AI-based)
- Large file handling beyond browser memory limits
