# Frontend Development Plan — Belboore UI (10-Category UX Structure)

## Developer: Senior Frontend Developer (+ AI coding assistants)

## 10-Category Navigation Structure

### Category Registry

```typescript
interface CategoryDefinition {
  id: string;             // URL slug
  name: string;           // Display name
  icon: string;           // Lucide icon name
  description: string;
  subGroups?: SubGroupDefinition[];
}

interface SubGroupDefinition {
  id: string;
  name: string;
  toolIds: string[];
}
```

### The 10 Categories

| # | Category | Icon | Sub-Groups | Tools |
|---|----------|------|-----------|:---:|
| 1 | Files & Documents | FolderOpen | None | 8 |
| 2 | Media Tools | Film | Images & Design, Video, Audio & Music | 11 |
| 3 | Downloaders | Download | None | 9 |
| 4 | Security & Passwords | Shield | None | 9 |
| 5 | Network & Diagnostics | Globe | IP & Address, Network Tests, Security Checks | 22 |
| 6 | Finance & World Data | DollarSign | Markets & Money, World & Weather | 10 |
| 7 | Developer Tools | Code2 | JSON Toolkit, Format Converters, Code Tools, Text & Encoding, Web & HTTP, Generators & IDs, DevOps, References | 49 |
| 8 | Text & Number Tools | Type | Text Utilities, Numbers & Color | 13 |
| 9 | Everyday Tools | Wrench | QR Code Hub, Date & Time, Utilities | 16 |
| 10 | Communication | MessageCircle | None | 3 |

---

## Sidebar Component Behavior

```
Sidebar
├── Search bar (always visible, / shortcut)
├── Files & Documents        → expand tool list (8)
├── Media Tools              → show sub-group tabs
│   ├── Images & Design (5)
│   ├── Video (3)
│   └── Audio & Music (3)
├── Downloaders (9)
├── Security & Passwords (9)
├── Network & Diagnostics    → show sub-group tabs
│   ├── IP & Address Tools (8)
│   ├── Network Tests (9)
│   └── Security Checks (6)
├── Finance & World Data
│   ├── Markets & Money (7)
│   └── World & Weather (3)
├── Developer Tools          → 8 sub-group accordion
│   ├── JSON Toolkit (5)
│   ├── Format Converters (4)
│   ├── Code Tools (6)
│   ├── Text & Encoding (7)
│   ├── Web & HTTP (7)
│   ├── Generators & IDs (5)
│   ├── DevOps (7)
│   └── References (6)
├── Text & Number Tools
│   ├── Text Utilities (7)
│   └── Numbers & Color (6)
├── Everyday Tools
│   ├── QR Code Hub (4)
│   ├── Date & Time (5)
│   └── Utilities (6)
└── Communication (3)

Bottom: Favorites (starred) + Recently Used (last 5)
```

---

## New Components Needed (vs Original Plan)

| Component | Purpose |
|-----------|---------|
| `SubGroupAccordion.tsx` | Expand/collapse sub-category in sidebar |
| `CategoryPage.tsx` | Landing page per category showing sub-group tool grids |
| `CategoryGrid.tsx` | Home page: 10 category cards with tool counts |
| `BidirectionalToggle.tsx` | Swap input/output direction for YAML↔JSON etc. |
| `ModeTabs.tsx` | Text/File tabs for Base64 Encoder/Decoder |

---

## Tool Registry Update Summary

| Change | Details |
|--------|---------|
| 18 categories → 10 | 8 dissolved, 6 merged, 4 created |
| Format converters consolidated | 8 unidirectional → 4 bidirectional (YAML↔JSON, YAML↔TOML, JSON↔TOML, XML↔JSON) |
| Base64 merged | Base64 Converter + Base64 File Converter → 1 tool with text/file tabs |
| QR tools unified | All 4 QR tools now in Everyday Tools → QR Code Hub sub-group |
| Security tools unified | Password Gen, Strength, Hash, Bcrypt, HMAC, RSA, Encrypt, OTP, Token → one category |
| Sub-groups added | Developer (8), Network (3), Media (3), Finance (2), Text (2), Everyday (3) |

---

## Sprint 0: Architecture & Setup (2 weeks)

### Objectives
- Next.js project with 10-category navigation
- Sub-group accordion sidebar
- Generic Tool framework with bidirectional support
- Mock API layer

### Tasks

| Task | Effort |
|------|:---:|
| Next.js 14 project setup + Tailwind + shadcn/ui | 2d |
| 10-category `Sidebar.tsx` with `SubGroupAccordion.tsx` | 2d |
| `CategoryGrid.tsx` + `CategoryPage.tsx` | 1d |
| `ToolPage.tsx` with bidirectional toggle + mode tabs support | 2d |
| Tool registry: populate all 150 tools with new categories | 1d |
| `CodeEditor.tsx` (CodeMirror 6), `FileDropZone.tsx`, `SplitPane.tsx` | 2d |
| Mock API layer (MSW) + typed API client | 1d |
| 5 sample tools: JSON Formatter, Base64 Encoder/Decoder, Password Generator, YAML ↔ JSON, QR Scanner | 1d |

### Deliverables
- [x] 10-category sidebar with sub-group accordions
- [x] Generic Tool framework working (bidirectional + file mode support)
- [x] 5 sample tools end-to-end
- [x] API client with mock fallback

---

## Sprint 1: Core Foundation (3 weeks)

### Objectives
- All Tier 0 client-side tools (~88) implemented
- 6 of 10 categories populated

### Tasks

| Week | Category | Tools | Effort |
|:---:|----------|-------|:---:|
| 1 | Security & Passwords | 9 tools | 2d |
| 1 | Text & Number Tools | 13 tools (2 sub-groups) | 3d |
| 2 | Developer Tools — Batch 1 | JSON Toolkit (5) + Code Tools (6) + Text & Encoding (7) + Format Converters (4) = 22 | 4d |
| 2 | Everyday Tools — Batch 1 | QR Hub (4) + Date & Time (5) + Utilities (6) = 15 | 3d |
| 3 | Developer Tools — Batch 2 | Web & HTTP (7) + Generators (5) + DevOps (7) + References (6) = 25 | 4d |
| 3 | Media Tools — Batch 1 | Images & Design (2 client-side: Image Converter, SVG) | 0.5d |
| 3 | Network — Batch 1 | IP & Address (6 client-side: Subnet, Converter, Range, ULA, MAC Gen) | 1d |

### Deliverables
- [x] ~65 client-side tools across 6 categories
- [x] Sub-group navigation fully functional
- [x] Bidirectional converters working (4 tools with swap toggle)
- [x] Base64 with text/file mode tabs

---

## Sprint 2: Major Features (4 weeks)

### Objectives
- All remaining tool UIs
- Auth UI
- Backend-dependent tools integrated
- Real-time WebSocket integration
- File handling

### Tasks

| Week | Task | Effort |
|:---:|------|:---:|
| 1 | Auth UI (login, register, profile) | 3d |
| 1 | Downloaders UI — 9 tools | 4d |
| 2 | Files & Documents UI — 8 tools | 4d |
| 2 | Media Tools — remaining: Compressor, OCR, Video (3), Audio (3), Camera | 4d |
| 3 | Finance & World Data UI — 10 tools (2 sub-groups) | 4d |
| 3 | Network — remaining: Network Tests (9) + Security Checks (6) = 15 | 4d |
| 4 | Real-time WebSocket integration (download progress, price tickers) | 2d |
| 4 | File upload component with progress | 1d |
| 4 | Toast/notification system | 1d |
| 4 | Communication UI — 3 pages | 1d |

### Deliverables
- [x] All ~150 tools have UI
- [x] All 10 categories populated
- [x] Auth system: login, register, profile
- [x] Real-time progress for downloads/processing
- [x] 8 sub-group accordions working in sidebar

---

## Sprint 3: Integrations & Stabilization (3 weeks)

### Objectives
- Admin panel
- PWA
- RTL/LTR + i18n
- Accessibility
- Search + command palette

### Tasks

| Week | Task | Effort |
|:---:|------|:---:|
| 1 | Admin panel UI (user management, usage stats, health) | 3d |
| 1 | PWA setup (manifest, service worker, offline caching) | 2d |
| 1 | Category landing pages finalization with sub-group tool grids | 1d |
| 2 | RTL/LTR bidirectional layout support | 2d |
| 2 | i18n infrastructure (next-intl: EN + FA) | 2d |
| 2 | Accessibility audit + fixes (WCAG 2.1 AA) | 2d |
| 3 | Command palette: Ctrl+K to search any tool | 1d |
| 3 | Favorites + Recently Used (localStorage) | 1d |
| 3 | Breadcrumb navigation on tool pages | 0.5d |
| 3 | Tool aliases: "stopwatch"→Chronometer, "ocr"→Extract Text, etc. | 1d |
| 3 | Markdown Viewer enhancements (LaTeX, RTL, custom CSS export) | 1d |

### Deliverables
- [x] Admin panel operational
- [x] PWA installable + offline-capable
- [x] RTL support for Persian/Arabic
- [x] i18n with English + Persian
- [x] Favorites + Recently Used on sidebar
- [x] Command palette (Ctrl+K)

---

## Sprint 4: QA, Bug Fixes & Release (2 weeks)

| Task | Effort |
|------|:---:|
| Playwright E2E tests: critical flows (20 scenarios) | 3d |
| Cross-browser testing (Chrome, Firefox, Safari, mobile) | 2d |
| Lighthouse audit + optimization (target > 90) | 2d |
| Bundle size optimization (dynamic imports, tree shaking) | 1d |
| Bug fixes from QA backlog | 3d |
| SEO: meta tags, Open Graph, sitemap.xml | 1d |
| Loading states + skeleton screens for all pages | 1d |
| Error boundaries + fallback UIs | 1d |
| Release notes page | 0.5d |

---

## Key Component Specifications

### ToolPage (Updated for Bidirectional/Mode Support)

```typescript
interface ToolPageProps {
  toolId: string;
}

// Internal flow:
// 1. Lookup tool from registry
// 2. If tool.bidirectional → show BidirectionalToggle
//    - On toggle: swap input/output, reverse processor direction
// 3. If tool.hasFileMode → show ModeTabs (Text | File)
//    - On tab change: switch input variant (textarea ↔ file-drop)
// 4. Render ToolHeader with breadcrumb (Category > Sub-Group > Tool)
// 5. Render ToolInput based on variant
// 6. On input change, call processor
// 7. Render ToolOutput
// 8. Show "Related Tools" at bottom (same sub-group)
```

### Sidebar with Sub-Group Accordions

```
Categories with sub-groups:
  expand to show sub-group list
    sub-group expands to show tool list

Categories without sub-groups:
  expand directly to tool list
```

Active state: persists in URL or localStorage across navigation.

---

## Implementation Waves

### Wave 1 — Sprint 0 (5 tools)
JSON Formatter, Base64 Encoder/Decoder, Password Generator, YAML ↔ JSON, QR Scanner

### Wave 2 — Sprint 1, Week 1 (22 tools)
Security (9) + Text Utilities (7) + Numbers & Color (6)

### Wave 3 — Sprint 1, Week 2 (37 tools)
JSON Toolkit (5) + Code Tools (6) + Text & Encoding (7) + Format Converters (4) + QR Hub (4) + Date & Time (5) + Utilities (6)

### Wave 4 — Sprint 1, Week 3 (32 tools)
Web & HTTP (7) + Generators (5) + DevOps (7) + References (6) + Images client-side (2) + IP client-side (6)

### Wave 5 — Sprint 2, Weeks 1-2 (21 tools)
Auth (3) + Downloaders (9) + Files & Documents (8)

### Wave 6 — Sprint 2, Weeks 3-4 (31 tools)
Media remaining (9) + Finance & World Data (10) + Network remaining (15) + Communication (3)

---

## External Dependencies (npm)

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
| leaflet + react-leaflet | Maps |
| recharts | Charts |
| qrcode | QR generation |
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
| prettier (standalone) | Code formatting |
| next-intl | Internationalization |
| next-pwa | PWA support |
| msw | Mock Service Worker |
| vitest + @testing-library/react | Unit testing |
| playwright | E2E testing |
| lucide-react | Icons |
| clsx + tailwind-merge | Class utilities |
| date-fns + date-fns-jalali | Date utilities |
| zod | Schema validation |
| sonner | Toast notifications |
