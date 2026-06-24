# Project Execution Strategy — Belboore Tool Platform

## 1. Scope Overview

**Total tools: 149** across **17 internal categories + 4 external services**.

### Tool Classification by Backend Complexity

| Tier | Description | Count | Backend Required |
|------|------------|:---:|:---:|
| **Tier 0 — Pure Client-Side** | Runs entirely in browser (JS/WASM). Zero backend. | **88** | No |
| **Tier 1 — API Proxy** | Thin backend that proxies external APIs (weather, finance, lyrics). | **18** | Yes (light) |
| **Tier 2 — Server Processing** | Heavy backend processing (media, PDF, downloaders). | **32** | Yes (heavy) |
| **Tier 3 — Real Infrastructure** | Network scanning, file storage, security checks. | **11** | Yes (dedicated) |

### Tier 0 — Pure Client-Side (88 tools)
> These can be built in parallel by the frontend developer with zero backend dependency, starting Sprint 0.

```
Crypto:       Token Generator, ULID Generator, RSA Key Pair, BIP39 Passphrase
Converter:    ALL 17 tools (Base converters, Color, Case, YAML/JSON/TOML/XML, List, NATO, Binary, Unicode, Roman)
Text:         ALL 7 tools (Lorem Ipsum, Text Stats, Emoji, Obfuscator, Text Diff, Numeronym, ASCII Art)
Math:         ALL 3 tools (Math Evaluator, ETA, Percentage)
Measurement:  Chronometer
Developer:    JSON Formatter, JSON Tree Viewer, JSON Minify, JSON Diff, JSON to CSV, Markdown Viewer,
              UUID Generator, Hash Generator, Base64 Converter, Cron Job Translator,
              Crontab Generator, GeoJSON Viewer, Regex Tester, Regex Memo,
              SQL Prettify, Chmod Calculator, XML Formatter, YAML Viewer,
              Email Normalizer, Git Memo, Random Port Generator, JWT Parser,
              HTML Entities, URL Parser, Slugify String, Basic Auth Generator,
              Meta Tag Generator, HTML WYSIWYG Editor, MIME Types,
              HTTP Status Codes, Keycode Info, User Agent Parser, Device Info, Safelink Decoder
Date/Time:    Calendar Converter, Timestamp Converter, Date-Time Converter
General:      Password Generator, Password Strength Analyser, Unit Converter,
              Random Generator, WiFi QR Code Maker
Image:        Image Converter, QR Code Scanner, SVG Placeholder Generator,
              Make a Branded QR Code, File/Audio to QR Code (self-contained mode)
```

### Tier 1 — API Proxy (18 tools)
> Backend acts as thin proxy to external APIs with caching. Light development.

```
Audio:        Spotify Preview, Music & Lyrics Database
Financial:    ALL 6 (Currency, Rial, Crypto, Gold, Oil, Stocks)
Date/Time:    Global Timezones, Sunrise & Sunset
Geo/Weather:  ALL 3 (Weather, Air Quality, Earthquake Map)
Developer:    OTP Code Generator (TOTP validation), Weather Data API
General:      Telegram News, Cloud Storage Uploader (metadata + link)
```

### Tier 2 — Server Processing (32 tools)
> Heavy backend: FFmpeg, OCR, PDF libraries, download engines. Most complex.

```
Image:        Image Compressor, Extract Text from Images (OCR), File/Audio to QR Code (hosted URL)
Video:        ALL 3 (Compressor, Converter, Optimizer)
Audio:        Audio Converter
PDF:          ALL 5 (Images to PDF, Merge, Compressor, PDF to Markdown, Signature Checker)
Downloader:   ALL 9 (YouTube, YouTube→MP3, Instagram, TikTok, X/Twitter, SoundCloud, Playlist, Movie DB, GitHub)
Crypto:       Bcrypt, Encrypt/Decrypt, HMAC Generator
```

### Tier 3 — Real Infrastructure (11 tools)
> Unique server-side capabilities. Needs real network access and security tooling.

```
Network:      What is My IP, Speed Test, VPN Leak Check, Site Status, IP Locator,
              Ping Test, Blacklist Check, SSL Security Check, App Virus Scanner,
              Email Security Check, Advanced Net Tools (DNS, Whois, Port Check, Port Scan,
              HTTP Headers, Subnet Calculator, Traceroute, IP Live API),
              IPv4 Address Converter, IPv4 Range Expander, MAC Address Lookup,
              MAC Address Generator, IPv6 ULA Generator
General:      Instant URL, Local File Share (Mizban)
Measurement:  Benchmark Builder
```

---

## 2. Architecture Decisions

### Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|----------|
| Frontend | **Next.js 14 + TypeScript** | SSR for SEO, API routes for proxies, mature ecosystem |
| UI Components | **shadcn/ui + Tailwind CSS** | Rapid development, accessible, customizable |
| State Management | **Zustand** | Lightweight, no boilerplate |
| Backend Framework | **Python FastAPI** | Async, auto OpenAPI docs, great for proxy services |
| Media Processing | **FFmpeg (WASM for browser, native for server)** | Industry standard |
| PDF Processing | **PyMuPDF + Poppler + pdfkit** | Comprehensive PDF manipulation |
| Download Engine | **yt-dlp (Python)** | Universal downloader, actively maintained |
| Database | **PostgreSQL** | Reliable, mature, full-text search |
| Cache | **Redis** | Session store, rate limiter, real-time cache |
| Queue/Tasks | **Celery + Redis** | Background job processing |
| Storage | **MinIO (S3-compatible)** | Self-hosted object storage |
| Containerization | **Docker + Docker Compose** | Consistent environments |
| CI/CD | **GitHub Actions** | Free for public repos, easy setup |
| Monitoring | **Sentry + Prometheus + Grafana** | Error tracking + metrics |

### Deployment Architecture

```
                    ┌──────────────┐
                    │   Cloudflare │ (CDN + DDoS + SSL)
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  Nginx       │ (Reverse Proxy)
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
     ┌────────▼───┐ ┌──────▼──────┐ ┌──▼──────────┐
     │ Next.js FE │ │ FastAPI     │ │ FastAPI      │
     │ (port 3000)│ │ Main API    │ │ Media API    │
     └────────────┘ │ (port 8000) │ │ (port 8001)  │
                    └──────┬──────┘ └──────┬───────┘
                           │               │
              ┌────────────┼───────────────┼────────────┐
              │            │               │            │
     ┌────────▼───┐ ┌──────▼──────┐ ┌──────▼──────┐ ┌──▼──────────┐
     │ PostgreSQL │ │   Redis     │ │   MinIO     │ │  Celery     │
     └────────────┘ └─────────────┘ └─────────────┘ │  Workers    │
                                                    └─────────────┘
```

---

## 3. Sprint Plan

### Sprint 0: Architecture & Setup (2 weeks)
**Objectives:** Lay the foundation. Every developer has a working dev environment. CI/CD is green.

| Task | Assignee | Effort |
|------|----------|:---:|
| Project scaffolding (FE + BE repos or monorepo) | All | 2d |
| Docker Compose dev environment (Postgres, Redis, MinIO) | BE2 | 2d |
| CI/CD pipeline (GitHub Actions: lint, test, build, deploy) | BE2 | 2d |
| API Gateway setup (FastAPI routing + OpenAPI spec) | BE2 | 2d |
| Next.js project setup + shadcn/ui theme | FE | 3d |
| Component library skeleton (Button, Input, ToolLayout, Tabs) | FE | 3d |
| Auth boilerplate (JWT + refresh tokens) | BE1 | 2d |
| Database schema design + migrations (Alembic) | BE1 | 2d |
| Shared API types package | BE2 | 1d |
| Media processing Docker service (FFmpeg installed) | BE1 | 1d |
| yt-dlp integration and sandbox testing | BE1 | 1d |

**Deliverables:** Running dev environment, green CI, auth working, API docs at /docs.

---

### Sprint 1: Core Foundation (3 weeks)
**Objectives:** Ship Tier 0 tools (all client-side). Backend: Tier 1 API proxies. Storage service.

#### Backend Dev 1 — Media & Content Services
| Task | Effort |
|------|:---:|
| Celery worker setup + job queue for media tasks | 2d |
| Image processing service (compression via Pillow/Sharp) | 3d |
| PDF processing service (merge, compress, Images→PDF, PDF→MD) | 4d |
| Audio converter service (FFmpeg pipeline) | 3d |
| MinIO storage integration (upload/get/signed URLs) | 2d |
| **API endpoints:** image upload/process, PDF operations, audio convert | 3d |

#### Backend Dev 2 — Data & Infrastructure Services
| Task | Effort |
|------|:---:|
| Financial data service (exchange rates, crypto, gold/oil) | 4d |
| Redis caching layer for all proxy APIs (TTL-based) | 2d |
| Weather/Geo proxy service (weather, AQI, earthquakes) | 3d |
| Spotify + Lyrics API proxy | 2d |
| Rate limiter middleware | 1d |
| **API endpoints:** finance, weather, audio proxy | 3d |

#### Frontend
| Task | Effort |
|------|:---:|
| Generic `<Tool />` layout component (input→process→output) | 2d |
| **Crypto Tools** — 7 pages | 2d |
| **Converter Tools** — 17 pages | 5d |
| **Text Tools** — 7 pages | 2d |
| **Math Tools** — 3 pages | 1d |
| **Measurement Tools** — 1 page (Chronometer) | 1d |
| **Developer Tools** — Batch 1 (JSON family, SQL, regex, diff tools) — 15 pages | 5d |
| State management store (Zustand) | 2d |
| Dark/light theme toggle | 1d |
| API integration layer (fetch wrapper with mock support) | 2d |

**Deliverables:** 50+ client-side tools live. Backend APIs for finance, weather, Spotify ready. Storage service operational.

---

### Sprint 2: Major Features (4 weeks)
**Objectives:** Media processing tools. Downloader ecosystem. Network tools. Auth & user dashboards.

#### Backend Dev 1 — Downloaders + Heavy Processing
| Task | Effort |
|------|:---:|
| YouTube downloader service (yt-dlp integration) | 4d |
| YouTube to MP3 pipeline | 2d |
| Instagram + TikTok downloader integration | 3d |
| X/Twitter + SoundCloud downloader | 2d |
| Playlist downloader (batch processing with progress) | 3d |
| Movie Database API proxy (TMDB integration) | 2d |
| GitHub Downloader (file/folder archive) | 2d |
| Video processing service (compress, convert, optimize via FFmpeg) | 4d |
| OCR service (Tesseract) for image text extraction | 3d |
| PDF signature checker | 2d |
| QR code hosted URL service (file upload → permanent link → QR) | 2d |

#### Backend Dev 2 — Network, Security & Infrastructure
| Task | Effort |
|------|:---:|
| What is My IP service | 1d |
| Speed Test service (download/upload test endpoint) | 3d |
| Ping test + Site Status checker | 2d |
| DNS Lookup, Whois, Traceroute | 3d |
| Port Check + Port Scan service | 3d |
| SSL certificate checker | 2d |
| APK virus scanner (VirusTotal API / ClamAV) | 3d |
| Email security check (header parsing + SPF/DKIM/DMARC) | 2d |
| Blacklist check (DNSBL lookup) | 1d |
| IPv4/IPv6/MAC tools (subnet calc, converter, range, ULA) | 3d |
| VPN Leak Check (IP comparison) | 1d |
| User auth service (register, login, sessions, API keys) | 3d |
| Admin dashboard backend (usage stats, rate limits) | 2d |

#### Frontend
| Task | Effort |
|------|:---:|
| **Developer Tools** — Batch 2 (Docker, XML, YAML, Crontab, Git Memo, Chmod) — 10 pages | 3d |
| **Date & Time Tools** — 5 pages | 2d |
| **General Tools** — 9 pages | 3d |
| Auth UI (login/register/profile pages) | 3d |
| **Downloader UI** — 9 pages (YouTube, Insta, TikTok, etc.) | 4d |
| **PDF Tools UI** — 4 pages | 2d |
| **Image Tools UI** — 8 pages | 2d |
| **Video Tools UI** — 3 pages | 2d |
| File upload component (drag-drop, progress, multi-file) | 3d |
| Real-time progress WebSocket integration for downloads/processing | 2d |
| Toast/notification system | 1d |

**Deliverables:** All media processing tools live. Downloader ecosystem functional. Network diagnostics operational. User auth system complete.

---

### Sprint 3: Integrations & Stabilization (3 weeks)
**Objectives:** Remaining tools. Real-time features. Admin panel. Performance optimization.

#### Backend Dev 1 — Media & Remaining Tools
| Task | Effort |
|------|:---:|
| Video Optimizer (preset profiles for Instagram, TikTok, etc.) | 2d |
| Cloud Storage Uploader (drag-drop + signed URLs + file management) | 3d |
| Local File Share — Mizban (WebRTC signaling server) | 3d |
| Instant URL service (temporary text hosting + expiry) | 2d |
| Benchmark Builder (command generation + test execution) | 2d |
| Performance optimization: media processing queues | 2d |
| Error handling + retry logic for all download/media services | 2d |

#### Backend Dev 2 — Final Features & Hardening
| Task | Effort |
|------|:---:|
| Telegram News feed integration (Telegram API → RSS) | 2d |
| Internal link shortener service (for r2u.ir) | 3d |
| Real-time WebSocket events for processing progress | 2d |
| Admin dashboard (usage analytics, user management) | 3d |
| API key management for developers (Weather Data API) | 2d |
| Rate limiting fine-tuning per endpoint | 1d |
| Database query optimization + indexing | 2d |
| Security audit (OWASP top 10 check) | 2d |

#### Frontend
| Task | Effort |
|------|:---:|
| **Network & Security UI** — 16 pages | 5d |
| **Financial Tools UI** — 6 pages | 2d |
| **Geo & Weather UI** — 3 pages | 1d |
| **Audio Tools UI** — 3 pages | 1d |
| **Data Tools UI** — 2 pages | 1d |
| Real-time dashboards (financial tickers, weather, etc.) | 3d |
| Admin panel UI | 3d |
| Progressive Web App (PWA) setup + offline support | 2d |
| RTL/LTR bidirectional support (for Persian/Arabic) | 2d |
| PWA installation + service worker for offline tools | 2d |
| i18n infrastructure (react-intl / next-intl) | 2d |

**Deliverables:** All 149 tools implemented. Admin panel live. Real-time updates working. PWA operational.

---

### Sprint 4: QA, Bug Fixes & Release (2 weeks)
**Objectives:** Polish, test, document, release.

#### All Developers
| Task | Assignee | Effort |
|------|----------|:---:|
| End-to-end testing (Playwright) — critical paths | FE | 3d |
| API integration testing (all endpoints) | BE1 + BE2 | 2d |
| Load testing (k6/Artillery) — downloaders, media, finance | BE2 | 2d |
| Cross-browser testing (Chrome, Firefox, Safari, mobile) | FE | 2d |
| Accessibility audit (WCAG 2.1 AA) | FE | 2d |
| Performance profiling + Lighthouse score > 90 | FE | 2d |
| Bug fixes from QA backlog | All | 4d |
| Documentation: API docs, user guide, tool descriptions | All | 3d |
| Production deployment setup (Docker Compose → k8s guide) | BE2 | 2d |
| Monitoring + alerting setup (Grafana dashboards) | BE2 | 2d |
| Release notes + changelog | BE2 | 1d |
| Security hardening (CSP headers, CORS, dependency audit) | BE1 | 2d |
| Final smoke test on production-like environment | All | 1d |

**Deliverables:** Production-ready release. All tests passing. Documentation complete.

---

## 4. Critical Path Analysis

### Tasks That Block Other Work
> These MUST be completed before dependent tasks can start.

| # | Blocker | Blocks | Assigned |
|---|---------|--------|----------|
| 1 | Docker dev environment setup | All development | BE2 (Sprint 0) |
| 2 | Shared API types/contracts | Frontend API integration | BE2 (Sprint 0) |
| 3 | Auth service | User-required features (storage, downloads, admin) | BE1 (Sprint 0) |
| 4 | Generic `<Tool />` component | All 88 Tier-0 tool pages | FE (Sprint 1) |
| 5 | MinIO storage service | PDF tools, media processing, file uploads | BE1 (Sprint 1) |
| 6 | Celery task queue | All async processing (video, PDF, downloads) | BE1 (Sprint 1) |
| 7 | Redis cache | Financial data, weather, all proxy APIs | BE2 (Sprint 1) |
| 8 | yt-dlp integration | All 9 downloader tools | BE1 (Sprint 2) |
| 9 | FFmpeg pipeline | Video/Audio processing tools | BE1 (Sprint 2) |

### Highest-Risk Technical Areas

| Risk | Severity | Mitigation |
|------|:---:|-----------|
| **Downloader reliability** — yt-dlp breaks when platforms change | Critical | Auto-update yt-dlp daily, fallback error messages, monitor GitHub releases |
| **Video processing performance** — FFmpeg is CPU-intensive | High | Queue large jobs, show progress, limit concurrent jobs per user |
| **Financial data freshness** — API rate limits from providers | High | Aggressive Redis caching (30s-5min TTL per endpoint), multiple fallback providers |
| **PDF processing accuracy** — complex layouts break extraction | Medium | Use PyMuPDF for structured PDFs, Tesseract OCR as fallback |
| **Network scan tool safety** — port scanning could be abused | High | Strict rate limiting, require auth for port scan, CAPTCHA |
| **File storage costs** — unlimited uploads risk abuse | Medium | Quotas per user, auto-expiry for temp files, signed URLs |
| **APK virus scanning** — false positives, file size limits | Medium | VirusTotal API (rate-limited), clamav as fallback, max 100MB |

### Opportunities for Parallel Development

| Parallel group | Tools | Can start | Dependency |
|---------------|-------|-----------|------------|
| **All Tier 0 client-side tools (88)** | Formatters, converters, generators | Sprint 0 | Only `<Tool />` component |
| **All Tier 1 API proxy tools (18)** | Finance, weather, Spotify, lyrics | Sprint 1 backend | External API keys |
| **Downloaders (9)** | YouTube, Instagram, TikTok, etc. | Sprint 2 | yt-dlp + Celery |
| **Network tools (16)** | IP, ping, DNS, Whois, port scan | Sprint 2 | Server with raw network access |
| **Media processing (10)** | Video, audio, image compress | Sprint 2 | FFmpeg + Celery + MinIO |

---

## 5. Merge & Integration Strategy

### Branching Strategy: Trunk-Based Development

```
main ──────────────────────────────────────────────► production
  │
  ├── feature/<tool-name> ──► short-lived (1-3 days)
  │     (merge with squash)
  │
  └── sprint-<N>/<dev-name> ──► 1 week max
        (merge with rebase)
```

- **Never commit directly to `main`.**
- **Feature branches:** max 3 days old. Rebase daily from `main`.
- **PR reviews:** Required before merge. At least 1 approval.
- **CI must pass:** Lint + typecheck + unit tests + integration tests.
- **Deploy previews:** Vercel (FE) + Docker staging (BE) on every PR.

### API Contract Management

- **Single source of truth:** OpenAPI 3.1 spec in `/api/openapi.yaml`
- **Generated clients:** Frontend TypeScript types auto-generated from spec
- **Contract testing:** Dredd or Schemathesis validates BE against spec
- **Update process:**
  1. Backend dev updates OpenAPI spec
  2. CI generates new FE types
  3. Frontend uses typed API client (no surprises)

### CI/CD Pipeline

```
Push to feature branch
     │
     ▼
┌─────────────────┐
│ Lint + Typecheck│ (ruff, mypy, eslint, tsc)
└────────┬────────┘
         ▼
┌─────────────────┐
│ Unit Tests      │ (pytest, vitest)
└────────┬────────┘
         ▼
┌─────────────────┐
│ Integration Tests│ (API + DB)
└────────┬────────┘
         ▼
┌─────────────────┐
│ Build Docker    │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Deploy Preview  │ (staging environment)
└────────┬────────┘
         ▼
   PR review → merge to main
         │
         ▼
┌─────────────────┐
│ E2E Tests       │ (Playwright)
└────────┬────────┘
         ▼
┌─────────────────┐
│ Deploy to Prod  │ (manual approval gate)
└─────────────────┘
```

### Testing Strategy

| Layer | Tool | Coverage Target | Runs On |
|-------|------|:---:|---------|
| Backend unit | pytest | 80%+ | Every push |
| Backend integration | pytest + testcontainers | Critical paths | Every push |
| Frontend unit | vitest + testing-library | 70%+ | Every push |
| Frontend component | Storybook + Chromatic | Visual diffs | Every PR |
| API contract | Schemathesis | All endpoints | Every push |
| E2E | Playwright | Critical user flows | Pre-merge to main |
| Load | k6 | Download, media, finance | Nightly |

### Code Review Process

1. **Author:** Self-review checklist before requesting review
2. **Reviewer:** Check within 4 hours (same timezone overlap assumed)
3. **Review criteria:**
   - Architecture: Does it follow established patterns?
   - Security: SQL injection, XSS, auth bypass, input validation?
   - Tests: Adequate coverage for the change?
   - Performance: N+1 queries, unnecessary API calls, bundle size?
   - Documentation: OpenAPI spec updated? Tool description accurate?
4. **Merge when:** 1 approval + CI green + all conversations resolved

### Daily Synchronization

| Time | Activity | Duration | Participants |
|------|----------|:---:|-------------|
| 09:30 | **Standup** — What did you do? What today? Any blockers? | 15 min | All |
| 10:00 | **Sync Session** — BE1 ↔ BE2 coordinate on shared services | 15 min | BE1 + BE2 |
| 11:00 | **FE↔BE Alignment** — API contract changes, mock updates | 15 min | FE + relevant BE |
| 16:00 | **Code Review Hour** — Review open PRs | 30-60 min | All |
| 17:00 | **Async status update** — Post in Slack/Teams channel | 5 min | All |

### Deployment Milestones

| Milestone | Date | What's Live |
|-----------|------|------------|
| **M0 — Dev Ready** | End of Sprint 0 | CI/CD green, auth working, 0 tools |
| **M1 — Core Tools** | End of Sprint 1 | 50+ Tier 0 tools + 18 Tier 1 proxy APIs |
| **M2 — Beta Launch** | End of Sprint 2 | All 149 tools implemented, internal beta |
| **M3 — RC** | Mid Sprint 4 | Bug fixes complete, all tests passing |
| **M4 — Public Release** | End of Sprint 4 | Production deployment, public announcement |

---

## 6. Development Metrics & Tracking

### Velocity Tracking

| Sprint | Planned Story Points | Actual | Tools Shipped |
|--------|:---:|:---:|:---:|
| Sprint 0 | 34 | — | 0 |
| Sprint 1 | 55 | — | 68 |
| Sprint 2 | 72 | — | 119 |
| Sprint 3 | 48 | — | 149 |
| Sprint 4 | 42 | — | 149 (polish) |
| **Total** | **251** | — | **149** |

### Quality Gates Per Milestone

| Gate | Criterion |
|------|----------|
| **M1 Gate** | All Tier 0 tools functional. API proxy endpoints respond. |
| **M2 Gate** | Downloaders work (test: download 100MB YouTube video). Media processing completes without timeout. Auth system handles 100 concurrent users. |
| **M3 Gate** | Lighthouse score > 90. PWA installable. All E2E tests pass. Zero critical/security bugs. |
| **M4 Gate** | Load test: 500 concurrent users without errors. 99.9% API uptime in staging. |
