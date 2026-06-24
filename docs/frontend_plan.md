# Frontend Development Plan — Belboore UI

## Developer: Senior Frontend Developer (+ AI coding assistants)

## UI Architecture Overview

```
belboore-ui/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout (theme, fonts, PWA)
│   ├── page.tsx                  # Home page (tool grid)
│   ├── tools/
│   │   ├── [category]/
│   │   │   └── [tool]/page.tsx   # Dynamic tool page
│   │   ├── image/                # 🖼️ Image Tools (8 pages)
│   │   ├── video/                # 🎥 Video Tools (3 pages)
│   │   ├── audio/                # 🎵 Audio Tools (3 pages)
│   │   ├── pdf/                  # 📄 PDF Tools (5 pages)
│   │   ├── crypto/               # 🔐 Crypto Tools (7 pages)
│   │   ├── converter/            # 🔄 Converter Tools (17 pages)
│   │   ├── text/                 # 📝 Text Tools (7 pages)
│   │   ├── math/                 # 🧮 Math Tools (3 pages)
│   │   ├── measurement/          # ⏱️ Measurement Tools (2 pages)
│   │   ├── data/                 # 📊 Data Tools (2 pages)
│   │   ├── downloader/           # 📥 Downloader Tools (9 pages)
│   │   ├── network/              # 🌐 Network & Security (16 pages)
│   │   ├── developer/            # 💻 Developer Tools (38 pages)
│   │   ├── datetime/             # 🕒 Date & Time Tools (5 pages)
│   │   ├── financial/            # 💰 Financial Tools (6 pages)
│   │   ├── geo/                  # 🌍 Geo & Weather Tools (3 pages)
│   │   └── general/              # 🛠️ General Tools (9 pages)
│   ├── admin/                    # Admin panel
│   ├── auth/                     # Login, register, profile
│   └── api/                      # API routes (proxy, mock)
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── dialog.tsx
│   │   ├── card.tsx
│   │   ├── switch.tsx
│   │   ├── slider.tsx
│   │   ├── progress.tsx
│   │   ├── textarea.tsx
│   │   ├── tooltip.tsx
│   │   └── skeleton.tsx
│   ├── layout/
│   │   ├── Shell.tsx             # App shell (sidebar + header + content)
│   │   ├── Sidebar.tsx           # Category navigation + search
│   │   ├── Header.tsx            # Top bar (search, theme, auth)
│   │   ├── ToolCategoryGrid.tsx  # Home page tool cards by category
│   │   ├── Footer.tsx            # Site footer
│   │   └── MobileNav.tsx         # Mobile hamburger menu
│   ├── tools/
│   │   ├── ToolPage.tsx          # ** Generic tool wrapper (most important!) **
│   │   ├── ToolInput.tsx         # Input area (multi-variant)
│   │   ├── ToolOutput.tsx        # Output area (multi-variant)
│   │   ├── ToolConfig.tsx        # Settings sidebar
│   │   ├── ToolHeader.tsx        # Title + description + copy button
│   │   ├── SplitPane.tsx         # Resizable left/right split
│   │   ├── InputPanel.tsx        # Text input panel
│   │   ├── EditorPanel.tsx       # Code editor (CodeMirror/Monaco)
│   │   ├── OutputPanel.tsx       # Rendered output panel
│   │   ├── DiffViewer.tsx        # Side-by-side diff component
│   │   ├── TreeViewer.tsx        # Interactive JSON tree
│   │   ├── QRCodeDisplay.tsx     # QR code renderer
│   │   ├── ColorPicker.tsx       # Color picker widget
│   │   ├── FileDropZone.tsx      # Drag-drop file upload
│   │   ├── ProgressBar.tsx       # Processing progress with ETA
│   │   ├── DownloadButton.tsx    # Download result button
│   │   ├── CopyButton.tsx        # Copy to clipboard
│   │   └── ShareButton.tsx       # Generate share link
│   ├── data-display/
│   │   ├── DataTable.tsx         # Sortable table
│   │   ├── Chart.tsx             # Chart wrapper (recharts)
│   │   ├── StatCard.tsx          # Single stat display
│   │   ├── TickerWidget.tsx      # Real-time price ticker
│   │   ├── MapView.tsx           # Map component (Leaflet)
│   │   ├── JsonTree.tsx          # Recursive JSON tree
│   │   └── Badge.tsx             # Status badge
│   └── auth/
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       ├── ProfileSettings.tsx
│       ├── ApiKeyManager.tsx
│       └── AuthGuard.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts            # API fetch wrapper (typed)
│   │   ├── endpoints.ts         # All API endpoint definitions
│   │   ├── mocks.ts             # Mock API handlers (MSW)
│   │   └── websocket.ts         # WebSocket client
│   ├── tools/
│   │   ├── registry.ts          # Tool registry (metadata for all 149)
│   │   ├── types.ts             # Tool types and interfaces
│   │   └── categories.ts        # Category definitions + icons
│   ├── utils/
│   │   ├── formatters.ts        # String/date/number formatters
│   │   ├── validators.ts        # Input validation
│   │   ├── converters.ts        # Client-side converters
│   │   ├── crypto.ts            # Client-side crypto (Hash, Encrypt, etc.)
│   │   ├── files.ts             # File helpers (blob, download, etc.)
│   │   └── dates.ts             # Date/time utilities (Jalali, etc.)
│   ├── hooks/
│   │   ├── useClipboard.ts
│   │   ├── useDebounce.ts
│   │   ├── useFileUpload.ts
│   │   ├── useJobStatus.ts      # Poll/WS for background job status
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── useRtl.ts
│   └── stores/
│       ├── auth.ts              # Zustand auth store
│       ├── theme.ts             # Theme (dark/light, font, background)
│       ├── tools.ts             # Recent/favorite tools
│       └── notifications.ts     # Toast notifications
├── styles/
│   ├── globals.css              # Tailwind + CSS variables
│   └── markdown.css             # Markdown preview styles (LaTeX, RTL)
├── public/
│   ├── fonts/
│   │   ├── vazirmatn/           # Persian/Arabic font
│   │   └── jetbrains-mono/      # Code font
│   ├── icons/                   # App icons + PWA
│   └── sw.js                    # Service Worker
├── tests/
│   ├── e2e/                     # Playwright tests
│   └── unit/                    # Vitest tests
└── storybook/                    # Component stories
```

---

## The Generic Tool Framework (CRITICAL — Sprint 0 Investment)

This is the single most important architectural decision. Instead of building 149 unique pages, we build **one generic `<ToolPage>`** component that renders any tool based on its registry metadata.

### Tool Registry Schema

```typescript
interface ToolDefinition {
  id: string;                    // e.g. "json-formatter"
  name: string;                  // Display name
  description: string;           // Short description
  category: CategoryId;          // e.g. "developer"
  icon: string;                  // Lucide icon name
  tier: 0 | 1 | 2 | 3;          // Backend dependency level
  inputs: InputDefinition[];     // What the tool accepts
  outputs: OutputDefinition[];   // What the tool produces
  processor: 'client' | 'api' | 'hybrid'; // Where processing happens
  apiEndpoint?: string;          // If backend needed
  clientProcessor?: string;      // Name of client-side processor function
  config?: ConfigField[];        // Settings/options
  enabled: boolean;              // Feature flag
  tags: string[];                // Search tags
}
```

### Input Variants Supported

| Variant | Description | Example Tools |
|---------|-------------|---------------|
| `textarea` | Single text area | JSON Formatter, Hash Generator |
| `dual-textarea` | Two text areas (left/right) | Text Diff, JSON Diff |
| `editor` | Code editor (CodeMirror/Monaco) | SQL Prettify, XML Formatter |
| `editor-preview` | Code editor + live preview | Markdown Viewer |
| `file-drop` | File drag-and-drop zone | Image Compressor, PDF Tools |
| `url-input` | URL input field | Downloaders, URL tools |
| `form` | Structured form fields | QR Code Maker, Password Generator |
| `search-input` | Search field with results | Spotify, Movie DB |
| `interactive` | Canvas/click/keyboard | Emoji Picker, Keycode Info, Camera |
| `config-only` | Settings UI → auto-generate output | Password Generator, UUID Generator |

### Output Variants Supported

| Variant | Description | Example Tools |
|---------|-------------|---------------|
| `text` | Plain text output | Hash Generator, Base64 |
| `code` | Syntax-highlighted code | JSON Formatter, SQL Prettify |
| `html-preview` | Rendered HTML/markdown | Markdown Viewer |
| `image` | Image display | QR Code, Compressor comparison |
| `table` | Data table | JSON to CSV, Text Statistics |
| `tree` | Collapsible tree | JSON Tree Viewer |
| `chart` | Chart/graph | Financial tools, Weather |
| `map` | Interactive map | GeoJSON Viewer, IP Locator |
| `file-download` | Download button for file | Media processing, downloaders |
| `status` | Processing status/progress | Heavy backend tools |
| `copy-button` | Copy to clipboard | Token Generator, UUID |
| `qrcode` | QR code image | All QR tools |

### ToolPage Core Logic

```
ToolPage reads tool definition from registry
  → Renders appropriate Input component based on inputS variant
  → User provides input / configures options
  → Calls processor (client function or API)
  → Shows loading state (skeleton if fast, progress if slow)
  → Renders appropriate Output component based on outputs variant
  → Offers copy / download / share actions
```

**Result:** 149 unique tools rendered from 149 config objects + ~10 shared components.

---

## Sprint 0: Architecture & Setup (2 weeks)

### Objectives
- Next.js project scaffolded with all config
- shadcn/ui theme integrated
- Generic Tool framework working (end-to-end with 5 sample tools)
- Mock API layer operational
- CI/CD pipeline green

### Tasks & Assignments

#### Day 1-2: Project Foundation
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Create Next.js 14 project with TypeScript + App Router | 0.5d | Node.js |
| Configure Tailwind CSS + CSS variables for theme | 0.5d | Tailwind |
| Install + configure shadcn/ui (all needed primitives) | 1d | Tailwind |
| Set up font loading (Vazirmatn for Persian, JetBrains Mono for code) | 0.5d | None |
| Dark/light theme toggle + CSS variable switching | 0.5d | shadcn/ui |
| ESLint + Prettier config | 0.5d | None |
| Path aliases (`@/components`, `@/lib`, `@/tools`) | 0.5d | tsconfig |

#### Day 3-4: Layout Shell
| Task | Effort | Dependencies |
|------|:---:|-------------|
| `Shell.tsx` — main layout with sidebar + header + content | 1d | shadcn/ui |
| `Sidebar.tsx` — category list with icons, search, collapse | 1.5d | Shell |
| `Header.tsx` — search bar, theme toggle, auth button | 0.5d | Shell |
| `MobileNav.tsx` — hamburger menu for mobile | 0.5d | Shell |
| Responsive layout: mobile-first, breakpoints | 0.5d | All layout |
| Tool search: fuzzy search across all 149 tool names/descriptions | 1d | Tool registry |

#### Day 5-7: Generic Tool Framework
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Tool registry data structure (`lib/tools/registry.ts`) | 0.5d | None |
| `ToolPage.tsx` — core wrapper (reads registry, routes input→output) | 2d | Registry |
| `ToolInput.tsx` — multi-variant input (textarea, editor, file-drop, form) | 2d | ToolPage |
| `ToolOutput.tsx` — multi-variant output (text, code, image, table, tree, chart) | 2d | ToolPage |
| `SplitPane.tsx` — resizable split for editor/preview tools | 1d | None |
| `CodeEditor.tsx` — CodeMirror 6 wrapper with language support | 1d | CodeMirror |

#### Day 8-9: Mock Data & API Layer
| Task | Effort | Dependencies |
|------|:---:|-------------|
| API client (`lib/api/client.ts`) — typed fetch wrapper with error handling | 1d | FE types from BE2 TS generation |
| MSW (Mock Service Worker) setup for offline development | 1d | API client |
| Mock handlers for 10 sample API endpoints | 1d | MSW |
| API → mock fallback: use mock when backend unavailable | 0.5d | MSW |
| WebSocket mock client for real-time features | 0.5d | WS protocol |

#### Day 10: Validation — 5 Sample Tools
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Build **JSON Formatter** end-to-end (editor → format → output) | 0.5d | Tool framework |
| Build **Base64 Converter** end-to-end (textarea → encode/decode) | 0.5d | Tool framework |
| Build **Password Generator** end-to-end (form → generate → copy) | 0.5d | Tool framework |
| Build **UUID Generator** end-to-end (config → generate → list → copy) | 0.5d | Tool framework |
| Build **Hash Generator** end-to-end (textarea → select algo → hash) | 0.5d | Tool framework |

### Deliverables
- [x] Next.js app running on port 3000
- [x] shadcn/ui theme with dark/light mode
- [x] Full layout: sidebar + header + content area
- [x] Generic Tool framework working with 5 sample tools
- [x] Mock API layer: frontend works without backend
- [x] CI/CD: lint, typecheck, build green

---

## Sprint 1: Core Foundation (3 weeks)

### Objectives
- ALL 88 Tier 0 (client-side) tools implemented
- Tool registry fully populated
- Home page tool grid

### Tasks & Assignments

#### Week 1: Converter + Text Tools (24 tools)
| Task | Tools | Effort |
|------|-------|:---:|
| **Converter Tools** — ALL 17: Integer Base, Roman, Color, Case, NATO, Binary, Unicode, YAML↔JSON, YAML↔TOML, JSON↔TOML, JSON↔YAML, List, TOML↔JSON, TOML↔YAML, XML↔JSON, JSON↔XML | 17 tools | 3d |
| **Text Tools** — ALL 7: Lorem Ipsum, Text Statistics, Emoji Picker, String Obfuscator, Text Diff, Numeronym, ASCII Art | 7 tools | 2d |

#### Week 2: Developer Tools — Batch 1 (20 tools)
| Task | Tools | Effort |
|------|-------|:---:|
| JSON family: Formatter (already done), Tree Viewer, Minify, Diff, JSON to CSV | 4 tools | 1.5d |
| Code tools: SQL Prettify, XML Formatter, YAML Viewer, Chmod Calculator | 4 tools | 1.5d |
| Regex: Regex Tester, Regex Memo | 2 tools | 1d |
| Web tools: JWT Parser, URL Encode/Decode (already), HTML Entities, URL Parser, Slugify, Basic Auth, Meta Tags, HTML WYSIWYG Editor, MIME Types, HTTP Status Codes, Keycode Info, User Agent Parser, Device Info, Safelink Decoder | 14 tools | 3d |

#### Week 3: Remaining Tier 0 Tools (39 tools)
| Task | Tools | Effort |
|------|-------|:---:|
| **Crypto Tools** (client-side): Token Generator, ULID Generator, RSA Key Pair, BIP39 Passphrase | 4 tools | 1d |
| **Developer Tools** — remaining: Crontab Generator, Cron Job Translator, GeoJSON Viewer, Git Memo, Random Port, Email Normalizer, UUID (already), Hash (already), Base64 (already) | 5 tools | 1.5d |
| **Math Tools**: Math Evaluator, ETA Calculator, Percentage Calculator | 3 tools | 0.5d |
| **Measurement**: Chronometer | 1 tool | 0.5d |
| **Date & Time** (client-side): Calendar Converter, Timestamp Converter, Date-Time Converter | 3 tools | 1d |
| **General** (client-side): Password Generator (already), Password Strength, Unit Converter, Random Generator, WiFi QR Code Maker | 4 tools | 1d |
| **Image** (client-side): Image Converter, QR Code Scanner, Make QR Code, SVG Placeholder, File/Audio QR (offline mode) | 5 tools | 1.5d |
| **Home page**: Tool grid with category cards + featured tools | 1d |

### Sprint 1 Deliverables
- [x] 88 Tier 0 tools fully functional (no backend needed)
- [x] Tool registry complete (all 149 entries populated)
- [x] Home page with tool grid
- [x] Search works across all tools
- [x] All client-side converters/formatters tested

---

## Sprint 2: Major Features (4 weeks)

### Objectives
- All Tier 1 (API proxy) and Tier 2 (server processing) tool UIs
- Auth UI (login, register, profile)
- Real-time WebSocket integration
- File handling (upload, progress, download)

### Tasks & Assignments

#### Week 1: Auth + Downloader UI
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Login page + form | 1d | Auth API (BE1) |
| Register page + form | 1d | Auth API |
| Profile settings page | 1d | Auth API |
| Protected route wrapper (`AuthGuard.tsx`) | 0.5d | Auth store |
| **Downloader UI** — YouTube (search → select → download → progress) | 2d | Downloader API (BE1) |
| YouTube to MP3 UI | 0.5d | Downloader API |
| Download progress component (WebSocket bar + ETA) | 1d | WS (BE2) |
| Download result display (file preview, link, metadata) | 0.5d | Downloader API |

#### Week 2: More Downloaders + File Tools
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Instagram Downloader UI | 0.5d | Downloader API |
| TikTok Downloader UI | 0.5d | Downloader API |
| X/Twitter Downloader UI | 0.5d | Downloader API |
| SoundCloud Downloader UI | 0.5d | Downloader API |
| Playlist Downloader UI (multi-select, progress per item) | 1.5d | Downloader API + WS |
| Movie Database UI (search → info → poster → rating) | 1d | TMDB proxy (BE1) |
| GitHub Downloader UI (URL → file tree → select → download) | 1d | GitHub API (BE1) |
| `FileDropZone.tsx` — reusable drag-drop component | 1d | None |
| `ProgressBar.tsx` — processing progress with ETA + cancel | 1d | WS |

#### Week 3: PDF, Video, Image Processing UIs
| Task | Effort | Dependencies |
|------|:---:|-------------|
| **PDF Tools** — Images to PDF, Merge, Compress, PDF to Markdown, Signature Checker | 5 tools | PDF API (BE1) |
| PDF page preview + delete UI (Merge tool) | 1d | PDF API |
| **Video Tools** — Compressor, Converter, Optimizer | 3 tools | 1.5d |
| Video format/quality selector UI | 0.5d | Video API |
| Video optimizer preset selector (Instagram, TikTok, etc.) | 0.5d | Video API |
| **Image Tools** — Image Compressor (split-screen slider) | 1d | Image API |
| Image text extraction (OCR) — upload → boxes overlay → text | 1d | OCR API (BE1) |
| Comparison image slider component | 1d | None |
| `FilePreview.tsx` — preview before/after processing | 0.5d | None |

#### Week 4: Financial, Weather, Geo & Remaining UIs
| Task | Effort | Dependencies |
|------|:---:|-------------|
| **Financial Tools** — Currency, Rial, Crypto, Gold, Oil, Stocks | 6 tools | 2d |
| Live price ticker component (WebSocket updates) | 1d | WS finance |
| Chart component (recharts: line, bar, candlestick) | 1d | recharts |
| **Weather/Geo** — Weather, AQI, Earthquake Map | 3 tools | 1d |
| MapView component (Leaflet: markers, heatmap, earthquake) | 1d | leaflet |
| **Audio Tools** — Spotify search + preview, Music/Lyrics | 2 tools | 1d |
| **Data Tools** — Phone Parser, IBAN Validator | 2 tools | 0.5d |
| **Network & Security** — batch 1 (IP, Ping, DNS, Whois, etc.) | 8 tools | 2d |

### Sprint 2 Deliverables
- [x] Auth system: login, register, profile operational
- [x] All 9 downloaders with progress tracking
- [x] All media tools (image, video, audio, PDF) with processing UI
- [x] Financial dashboards with live charts
- [x] Weather/Geo maps operational
- [x] WebSocket real-time integration working

---

## Sprint 3: Integrations & Stabilization (3 weeks)

### Objectives
- Complete remaining Network & Security tools (8 more)
- Complete remaining Developer tools
- Admin panel UI
- PWA setup
- RTL/LTR + i18n
- Accessibility

### Tasks & Assignments

#### Week 1: Network & Security — Remaining
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Speed Test UI (speedometer gauge) | 1d | Speed test API (BE2) |
| Port Check + Port Scan UI (results table) | 1d | Port API (BE2) |
| VPN Leak Check UI | 0.5d | VPN API (BE2) |
| SSL Security Check UI (cert card) | 0.5d | SSL API (BE2) |
| APK Virus Scanner UI (upload + scan result) | 1d | APK API (BE2) |
| Email Security Check UI (header paste + SPF/DKIM/DMARC) | 1d | Email API (BE2) |
| IPv4 tools UI (Subnet, Converter, Range) | 1d | IPv4 API (BE2) |
| IPv6 + MAC tools UI | 0.5d | Network API (BE2) |

#### Week 2: Advanced Features & Polish
| Task | Effort | Dependencies |
|------|:---:|-------------|
| **Remaining Developer Tools**: Docker Run→Compose, Benchmark Builder | 0.5d | APIs |
| Markdown Viewer/Exporter enhancement: LaTeX rendering (KaTeX) | 1d | None |
| Markdown Viewer: RTL support for Persian/Arabic text | 1d | None |
| Markdown Viewer: font selector, background color, custom CSS export | 1d | None |
| File/Audio QR Code: upload → progress → QR display | 0.5d | QR API (BE1) |
| Instant URL UI: enter text → get link → copy | 0.5d | Instant URL API (BE1) |
| Local File Share (Mizban) UI: room create → join → transfer | 1.5d | WebRTC + signaling (BE1) |
| Cloud Storage Uploader: file browser + drag-drop + share | 1.5d | Storage API (BE1) |
| Telegram News: channel list + post feed | 1d | Telegram API (BE2) |

#### Week 3: Admin, PWA, i18n, Accessibility
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Admin panel: user management table | 1d | Admin API (BE2) |
| Admin: usage statistics dashboard (charts: usage, users, tools) | 1.5d | Admin API + recharts |
| Admin: system health dashboard | 0.5d | Health API (BE2) |
| PWA: `manifest.json`, service worker, offline caching | 1d | Next.js PWA |
| PWA: "Install App" prompt | 0.5d | PWA |
| Service worker: cache static assets + tool pages | 1d | PWA |
| RTL/LTR bidirectional layout support | 1.5d | CSS + layout |
| i18n infrastructure (`next-intl`): EN + FA translations | 2d | next-intl |
| Translate tool registry descriptions to Persian | 1d | i18n |
| Accessibility audit + fixes (WCAG 2.1 AA) | 2d | axe-core |
| Keyboard navigation for all tool pages | 0.5d | Accessibility |
| Screen reader support (aria-labels, live regions) | 1d | Accessibility |
| Font size/scale preferences | 0.5d | Theme store |
| Custom background/font settings for Markdown export | 1d | Markdown Viewer |
| Toast notification system | 0.5d | shadcn toast |

### Sprint 3 Deliverables
- [x] All 149 tools have working UI
- [x] Admin panel operational
- [x] PWA installable + offline-capable
- [x] RTL support for Persian/Arabic
- [x] i18n with English + Persian
- [x] Accessibility: WCAG 2.1 AA compliant

---

## Sprint 4: QA, Bug Fixes & Release (2 weeks)

### Objectives
- End-to-end testing
- Cross-browser testing
- Performance optimization
- Final polish + release

### Tasks & Assignments

| Task | Effort | Dependencies |
|------|:---:|-------------|
| Playwright E2E tests: critical user flows (auth → tool → output) | 3d | All tools live |
| Playwright: 20 most-used tool paths | 1d | E2E framework |
| Cross-browser testing: Chrome, Firefox, Safari, Safari iOS, Chrome Android | 2d | All tools |
| Mobile responsive audit: all tools on mobile viewport | 1.5d | Responsive |
| Lighthouse audit + optimization (target > 90) | 2d | All pages |
| Bundle size optimization (tree shake, dynamic imports) | 1d | Webpack/Next |
| Image optimization (next/image, WebP, lazy load) | 1d | Next.js |
| Font loading optimization (font-display: swap, subset) | 0.5d | Fonts |
| Bug fixes from QA backlog | 3d | All |
| Cookie consent / GDPR banner | 0.5d | None |
| SEO: meta tags, Open Graph, sitemap.xml, robots.txt | 1d | Next.js |
| Loading states + skeletons for all pages | 1d | All tools |
| Error boundaries + fallback UIs | 1d | All tools |
| Empty state designs for all pages | 0.5d | All tools |
| Release notes page | 0.5d | None |

### Deliverables
- [x] E2E tests passing (20 critical flows)
- [x] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [x] Cross-browser compatible
- [x] Mobile responsive (all tools usable on phone)
- [x] Zero critical bugs
- [x] Release notes published

---

## Tool Implementation Batch Plan

All 149 tools organized by implementation wave:

### Wave 1 — Sprint 0 (5 tools)
```
JSON Formatter, Base64 Converter, Password Generator, UUID Generator, Hash Generator
```
These validate the Tool framework. ~0.5d each.

### Wave 2 — Sprint 1, Week 1 (24 tools)
```
Converter: Integer Base, Roman, Color, Case, NATO, Binary, Unicode,
          YAML→JSON, YAML→TOML, JSON→YAML, JSON→TOML, List,
          TOML→JSON, TOML→YAML, XML→JSON, JSON→XML
Text:      Lorem Ipsum, Text Stats, Emoji Picker, Obfuscator,
          Text Diff, Numeronym, ASCII Art
```
Pure client-side text processing. ~0.5h each with framework.

### Wave 3 — Sprint 1, Week 2 (18 tools)
```
Dev:       JSON Tree, JSON Minify, JSON Diff, JSON→CSV, SQL Prettify,
           XML Formatter, YAML Viewer, Chmod, Regex Tester, Regex Memo,
           JWT Parser, HTML Entities, URL Parser, Slugify, Basic Auth,
           Meta Tags, HTML WYSIWYG, MIME Types
```
Client-side dev tools. ~0.5-1h each.

### Wave 4 — Sprint 1, Week 3 (41 tools)
```
Dev:       HTTP Status, Keycode, User Agent, Device Info, Safelink,
           Crontab Gen, Cron Translator, GeoJSON, Git Memo,
           Random Port, Email Normalizer
Crypto:    Token Gen, ULID, RSA Key Pair, BIP39
Math:      Math Evaluator, ETA, Percentage
Measure:   Chronometer
Date/Time: Calendar, Timestamp, Date-Time
General:   Password Strength, Unit Converter, Random Gen, WiFi QR
Image:     Image Converter, QR Scanner, Branded QR, SVG Placeholder,
           File QR (offline)
```
All remaining Tier 0 tools. Rapid with framework. ~0.5h each.

### Wave 5 — Sprint 2, Weeks 1-2 (Auth + 9 downloaders)
```
Auth:      Login, Register, Profile
Download:  YouTube, YouTube MP3, Instagram, TikTok, X/Twitter,
           SoundCloud, Playlist, Movie DB, GitHub
```
Backend-dependent. ~0.5-2d each.

### Wave 6 — Sprint 2, Weeks 3-4 (22 tools)
```
PDF:       5 tools
Video:     3 tools
Image:     Compressor, OCR
Audio:     Converter, Spotify, Lyrics
Financial: 6 tools
Weather:   3 tools
Data:      2 tools
```
Media processing + data display. ~0.5-1d each.

### Wave 7 — Sprint 3, Week 1 (16 tools)
```
Network:   My IP, Speed Test, Ping, Site Status, IP Locator, DNS,
           Whois, Traceroute, HTTP Headers, Port Check, Port Scan,
           VPN Leak, SSL Check, APK Scan, Email Security
IPv4/v6:   Subnet, Converter, Range, ULA
MAC:       Lookup, Generator
Blacklist: Check
```
Network diagnostics UIs. ~0.5-1h each.

### Wave 8 — Sprint 3, Week 2 (14 tools)
```
Dev:       Docker Compose, Benchmark Builder, Cron Job Translator
Markdown:  Enhanced viewer (LaTeX, RTL, export)
QR:        File/Audio QR (hosted mode)
Instant:   Instant URL
Share:     Mizban (local file share)
Storage:   Cloud Storage Uploader
Telegram:  Telegram News
Admin:     All admin pages
```
Remaining features + admin. ~0.5-1.5d each.

---

## API Integration Strategy

### Mock-First Development
All API calls go through `lib/api/client.ts` which checks `NEXT_PUBLIC_USE_MOCKS` env var. When `true`, MSW intercepts and returns mock data. This enables frontend development to proceed fully independently.

```typescript
// lib/api/client.ts
const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (useMocks) {
    // MSW intercepts
  }
  const res = await fetch(`/api/proxy${endpoint}`, options);
  if (!res.ok) throw new ApiError(res.status, await res.json());
  return res.json();
}
```

### Real-Time Integration (WebSocket)
```typescript
// lib/api/websocket.ts
class WSClient {
  private ws: WebSocket;
  private subscriptions: Map<string, (data: any) => void>;

  connect(token: string): void { ... }
  subscribe(channel: string, callback: (data: any) => void): void { ... }
  unsubscribe(channel: string): void { ... }

  // Channels:
  // "download:{taskId}" → Download progress updates
  // "process:{taskId}"  → Media processing progress
  // "finance:live"      → Real-time price updates
  // "weather:live"      → Weather update stream
}
```

### Job Status Polling (Fallback)
```typescript
// lib/hooks/useJobStatus.ts
function useJobStatus(taskId: string) {
  // 1. Try WebSocket subscription
  // 2. Fallback to polling every 2 seconds
  // 3. Return { status, progress, result, error }
}
```

---

## Key Component Specifications

### ToolPage (Generic Wrapper)
```typescript
interface ToolPageProps {
  toolId: string; // Look up in registry
}

// Internal flow:
// 1. Lookup tool definition from registry
// 2. Render ToolHeader (name, description, copy/share)
// 3. Render ToolInput based on tool.inputs[].variant
// 4. On input change, call processor (client or API)
// 5. While processing, show skeleton or progress
// 6. Render ToolOutput based on tool.outputs[].variant
// 7. Handle errors gracefully
```

### CodeEditor (CodeMirror 6)
```typescript
interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'json' | 'xml' | 'yaml' | 'sql' | 'javascript' | 'html' | 'css' | 'markdown' | 'regex' | 'toml' | 'python' | 'dockerfile';
  readOnly?: boolean;
  minHeight?: string;
}
```

### FileDropZone
```typescript
interface FileDropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string; // e.g., "image/*", ".pdf", ".mp4"
  maxSize?: number; // in bytes
  maxFiles?: number;
  multiple?: boolean;
}
// Features: drag highlight, file preview, size warning, progress bar
```

### TreeViewer (JSON/Vercel-style)
```typescript
interface TreeViewerProps {
  data: any;
  rootLabel?: string;
  searchable?: boolean;
  collapsible?: boolean;
  copyPath?: boolean; // Copy JSON path on click
}
// Features: expand/collapse all, search highlight, line numbers, copy value/path
```

### DiffViewer
```typescript
interface DiffViewerProps {
  left: string;
  right: string;
  leftLabel?: string;
  rightLabel?: string;
  language?: string;
  format?: 'side-by-side' | 'unified';
}
// Features: added (green), removed (red), unchanged (dimmed), line numbers sync
```

### QRCodeDisplay
```typescript
interface QRCodeDisplayProps {
  data: string;
  size?: number;
  logo?: string; // Optional center logo
  fgColor?: string;
  bgColor?: string;
  downloadFormat?: 'png' | 'svg';
}
```

---

## External Dependencies (npm packages)

| Package | Purpose |
|---------|---------|
| next 14 | Framework |
| react 18 | UI library |
| typescript | Type safety |
| tailwindcss | Utility CSS |
| shadcn/ui | Component primitives |
| zustand | State management |
| @codemirror/view, @codemirror/state, @codemirror/lang-* | Code editor |
| react-markdown + remark-math + rehype-katex | Markdown with LaTeX |
| katex | LaTeX math rendering |
| mermaid | Diagram rendering |
| leaflet + react-leaflet | Maps |
| recharts | Charts |
| qrcode (client) | QR generation |
| js-yaml | YAML parsing |
| toml | TOML parsing |
| fast-xml-parser | XML parsing |
| diff + diff2html | Diff visualization |
| crypto-js | Client-side hashing |
| zxcvbn | Password strength |
| uuid | UUID generation |
| ulid | ULID generation |
| jose | JWT parsing |
| sql-formatter | SQL formatting |
| prettier (standalone) | General code formatting |
| tesseract.js (optional WASM) | Client-side OCR |
| next-intl | Internationalization |
| next-pwa | PWA support |
| msw | Mock Service Worker |
| vitest + @testing-library/react | Unit testing |
| playwright | E2E testing |
| storybook | Component documentation |
| lucide-react | Icons |
| clsx + tailwind-merge | Class utilities |
| date-fns + date-fns-jalali | Date utilities |
| zod | Schema validation |
| react-hot-toast / sonner | Toast notifications |
