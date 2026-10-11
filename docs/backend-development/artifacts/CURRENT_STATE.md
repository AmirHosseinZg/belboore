# Current-State Audit

Audited on **2026-10-11** for Step 01 only, from repository root.

- Branch: `backend/01-current-state-audit` (already active).
- Baseline commit: `88d5e864de7724f02b245e4f797b51db721224f5`.
- Initial `rtk git status --short`: `ok` (clean working tree).
- Scope: root agent files, frontend source/config/tests/assets, documentation, workflow files, and backend placeholders. No deployment or external service was contacted.

## Evidence and precedence

The required files were read in order: `AGENTS.md`, `RTK.md`, `00_AGENT_OPERATING_RULES.md`, `00_LOCKED_DECISIONS.md`, `00_MASTER_ROADMAP.md`, then `01_CURRENT_STATE_AUDIT.md`. Shell commands use `rtk`.

There is no accepted OpenAPI artifact or `backend/openapi/` directory. Implemented frontend source is the factual baseline. Locked decisions describe the future backend; historical plans do not prove that services, endpoints, or integrations exist. See [repository map](REPOSITORY_MAP.md) and [stale documentation register](STALE_DOCS.md).

## Observed baseline

| Area | Actual repository state | Evidence |
|---|---|---|
| Frontend | Astro **6.4.2**, TypeScript, native Astro components and CSS; Node requirement `>=22.12.0` | [package.json](../../../frontend/package.json), [package-lock.json](../../../frontend/package-lock.json), [tsconfig.json](../../../frontend/tsconfig.json) |
| Rendering | Static page generation through `getStaticPaths()`; no server adapter, API route, or server output configuration found | [astro.config.mjs](../../../frontend/astro.config.mjs), [tool route](../../../frontend/src/pages/[lang]/tools/[slug].astro) |
| Localization | English and Persian; `/en` and `/fa` prefixes, Persian default, LTR/RTL layouts | [i18n utilities](../../../frontend/src/i18n/utils.ts), [BaseLayout](../../../frontend/src/layouts/BaseLayout.astro) |
| Tool inventory | **101** registry entries: **91 builtin**, **10 external**; **13** categories | [tools.ts](../../../frontend/src/data/tools.ts), [categories.ts](../../../frontend/src/data/categories.ts) |
| Interactive tool mappings | **89** unique mapped builtin components, all imported files exist; **2** unmapped builtin placeholders | `toolComponentMap` in [tool route](../../../frontend/src/pages/[lang]/tools/[slug].astro), lines 130–220 |
| Backend | Only `.gitignore` and zero-byte `.gitkeep`; no implementation | [backend/.gitignore](../../../backend/.gitignore), directory inventory at audit start |
| API integration | No Belboore backend calls, API client, mock handler/server, accepted OpenAPI, or upload/job/polling contract found | Repository-wide and frontend-specific searches below |
| Automation | Only `frontend/.github/workflows/deploy.yml`, **0 bytes**; no root `.github/workflows/` | Filesystem and tracked-file inventory |

“Mapped” means the route includes an interactive component. It is not a claim that every tool has passed browser tests. Registry type `builtin` does not establish a backend requirement.

The two coming-soon entries are `compress-pdf` and `youtube-downloader`. Their static detail pages contain descriptions, a coming-soon message, and a disabled use button; they have no processing components. The 10 external entries link to sites already listed in the registry. Those links are directory content, not selected backend providers.

## Current frontend behavior

The root route uses `Astro.redirect` toward the Persian homepage. Each language has home, tools, categories, about, contribute, and error pages. Tool pages are generated for every registry slug in both languages (**202 tool detail paths**); category pages are generated for 13 categories in both languages (**26 category detail paths**). These are counts derived from source, not a fresh build result.

The tools index renders registry cards and filters them in the browser. Home search navigates to `/{lang}/tools?q=...`; it does not query a server search endpoint. Related tools come from the same category in the registry. Recent-tool history and theme preference use browser `localStorage`; regex memos also have local persistence. No account/session service backs these features.

## Requests and integrations actually present

| Source | Request or behavior | Meaning for backend discovery |
|---|---|---|
| [ToolCalendarField.astro](../../../frontend/src/components/tools/ToolCalendarField.astro), line 516 | `fetch('/calendar-data/year_'+jy+'.json')` | Reads bundled static assets. There are **35** `year_*.json` files for Jalali years **1390–1424** under `frontend/public/calendar-data/`. It caches data locally and returns `null` on missing/error responses. No backend endpoint. |
| [GeoJsonViewer.astro](../../../frontend/src/components/tools/GeoJsonViewer.astro), line 141 | Leaflet tiles from `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` | Browser map imagery from an existing external tile source; pasted GeoJSON is parsed/rendered locally. Tile requests disclose the requested map area and ordinary request metadata to that source. No Belboore API. |
| [SEO.astro](../../../frontend/src/components/SEO.astro), lines 77–80 | Google Fonts stylesheet and preconnect links | Existing browser asset requests, independent of backend tool APIs. |
| [ToolCard.astro](../../../frontend/src/components/ToolCard.astro) and the tool route | External-tool navigation links | Open existing third-party URLs. No backend proxy/provider integration. |

URLs in example inputs, generated meta tags, JSON-LD, and URL-parsing helpers are not requests. Dynamic `import('leaflet')` loads a frontend dependency; it is not a backend client. Consequently, “no backend API calls” is supported; “the frontend makes no network requests” would be inaccurate.

## Implemented capabilities that older plans misrepresent

| Capability | Current implementation | Boundary to preserve during later discovery |
|---|---|---|
| PDF merge | [MergePdf.astro](../../../frontend/src/components/tools/MergePdf.astro) imports `PDFDocument` from `pdf-lib` inside its browser script; reads local `File.arrayBuffer()`, copies all pages in selected file order, saves bytes and downloads a Blob | Already local processing. Client checks allow up to **20 files**, **50 MiB per file**. These are frontend limits, not a server upload contract. There is no per-page preview/deletion workflow. |
| Image conversion | [ImageConverter.astro](../../../frontend/src/components/tools/ImageConverter.astro) and [mediaUtils.ts](../../../frontend/src/components/tools/mediaUtils.ts) use local images, canvas, quality/resize controls, Blob/Data URL output | PNG/JPEG/WebP options and a **10 MiB** input check already exist in frontend code. No file is submitted to Belboore. This is distinct from a future dedicated image-compression service. |
| Image-to-Base64 and SVG placeholders | Local file reading and text/SVG generation | No server upload or storage needed by the current implementation. |
| QR generation/scanning | `qrcode`, `jsqr`, browser image/camera processing and WiFi payload generation | No hosted-file QR service or server scanner exists. |
| Security utilities | Browser Web Crypto/helpers, `bcryptjs`, and `bip39`; JWT decoding and Basic Auth header generation are local utilities | These tools do not implement platform login, signup, identity, or admin APIs. |
| Network-category utilities | [networkUtils.ts](../../../frontend/src/components/tools/networkUtils.ts) and five mapped components perform IP/subnet/range arithmetic and random address generation | PTR text generation is not DNS resolution. There is no active ping, port scan, remote probe, downloader, or server network access. |

The locked initial slice includes PDF merge, while the locked product rules also keep frontend-only tools frontend-only. The existing local merge implementation must be reconciled explicitly in later scope work; this audit does not decide to replace it or require a server path.

The registry has no link shortener, dedicated image compressor, images-to-PDF, or live Tier-1 data tool entries. Finance/weather/music/news/diagnostic requirements in historical docs therefore do not have implemented frontend API interactions to adopt.

## Backend, infrastructure, and test baseline

No Python project manifest/lockfile, FastAPI app/router, Pydantic API schema, ORM model, migration, backend tests, Dockerfile, Compose stack, CI backend job, or object-storage/queue/provider integration was found. Backend technologies in locked decisions and roadmap text are planned, not running repository services.

The frontend package has development/build/preview commands and Playwright scripts. There are **six** checked-in suites: core smoke, routing/SEO/error pages, categories, search, i18n, and live tools. The live-tool suite covers **13 named tools**, not all 89 mappings. The Playwright config uses one Chromium project, a hard-coded `/usr/bin/google-chrome` executable, and an Astro preview server at port 4321; its web-server command does not build the frontend first.

There are **23 tracked files** under `frontend/playwright-report/` and `frontend/test-results/`. They are previous run artifacts and provide no current pass/fail evidence. No frontend build or browser suite was required or run for this documentation-only step.

`frontend/public/_headers` contains frame/content-type/referrer rules and static cache rules. This records an intended static-host header file, not evidence of a deployed Nginx, Arvan edge configuration, firewall, or production security posture.

## Verification evidence

All commands were run from the repository root with `rtk`. Repository-wide search was run before adding these audit files:

```sh
rtk git status --short
rtk git branch --show-current
rtk proxy ls -la backend
rtk proxy rg -n --hidden -i '(\bfetch\s*\(|\baxios\b|XMLHttpRequest|WebSocket|EventSource|sendBeacon|\bgraphql\b|\bopenapi\b|\bswagger\b|\bmsw\b|mock(serviceworker|server|handler)?|api[_-]?(client|base|url)|/api/|https?://)' . -g '!.git/**' -g '!**/node_modules/**' -g '!**/dist/**' -g '!**/.astro/**' -g '!**/playwright-report/**' -g '!**/test-results/**' -g '!**/package-lock.json' -g '!**/*.svg'
rtk proxy rg -n '(\bfetch\s*\(|\baxios\b|XMLHttpRequest|WebSocket|EventSource|sendBeacon|\bmsw\b|MockServiceWorker|setupWorker|setupServer|openapi|swagger|API_BASE|API_URL|PUBLIC_API|/api/|Astro\.request|APIRoute|prerender\s*=\s*false|form[^>]*action=)' frontend/src frontend/tests frontend/package.json frontend/astro.config.mjs frontend/public frontend/.github backend -g '!*.svg' -g '!*.webp'
```

| Check | Actual result |
|---|---|
| Status before changes | Clean (`ok`); already on the requested branch |
| Backend absence at start | Exactly `.gitignore` and `.gitkeep` |
| Repository-wide API/integration search | Planning-document references, external links/assets, sample URLs, and one static-calendar fetch; no backend client or call found |
| Frontend/backend implementation-specific search | Exactly `frontend/src/components/tools/ToolCalendarField.astro:516`, the bundled-calendar fetch |
| `rtk proxy python3 -` source assertions | Passed: 101 unique registry slugs, 13 categories, 89 unique component mappings/imports, two exact placeholders, backend absence, missing OpenAPI, empty nested workflow, one static fetch, 35 calendar files, and no axios/MSW/OpenAPI/Swagger packages in the frontend lockfile |
| `rtk --version` | Passed: `rtk 0.41.0` |
| `rtk proxy which rtk` | Passed: `/home/amirhosseinzg/.local/bin/rtk` |
| `rtk gain` | Failed (exit 1): tracking database could not be opened, SQLite error code 14. Other RTK commands worked; tracking/global configuration was not changed. |

Searches exclude Git internals, dependencies, generated build output and old test reports; the lockfile was inspected separately. Negative findings describe the checked repository, not any unobserved deployed system. Final artifact/link/scope checks and after-change Git status are reported in the Step 01 completion report.

## Handoff and limits

Step 01 produces only this baseline, the repository map, and the stale-doc register. It creates no implementation, dependencies, migration, API contract, provider selection, frontend change, or commit.

Later reviewed discovery should use the exact registry/mapping and distinguish absent planned tools from actual components. Reconcile local PDF merge and image conversion with product scope before assuming upload/job requirements. Runtime correctness of every tool, production hosting, provider availability, VPS details, and external service behavior remain unverified here. Step 02 has not been started.
