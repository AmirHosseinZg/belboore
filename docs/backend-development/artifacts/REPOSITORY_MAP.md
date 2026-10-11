# Repository Map

Step 01 source map, **2026-10-11**, baseline `88d5e864de7724f02b245e4f797b51db721224f5`.

Paths below are relative to the repository root unless linked. Counts come from the current source, not old plans or generated test/build reports. “Mapped builtin” identifies an imported interactive component; it does not certify runtime correctness or assign a backend tier.

## Repository sections

| Path | Actual purpose / state |
|---|---|
| [AGENTS.md](../../../AGENTS.md) → [RTK.md](../../../RTK.md) | Root agent instructions; shell commands must use `rtk`. No nested agent instruction files found in the source inventory. |
| [README.md](../../../README.md) | Minimal project title (`belboore-mvp`); no implementation or setup specification. |
| `assets/` | Branding originals, palette, logos/icons and prompt text; no application runtime code. |
| `frontend/` | The implemented Astro application, package/lock/config files, source, public assets and Playwright suites. |
| `frontend/.github/workflows/deploy.yml` | Empty (0 bytes), nested under frontend; no root Actions workflow directory. |
| `frontend/playwright-report/`, `frontend/test-results/` | 23 tracked files from earlier runs; not evidence of a passing test run for this audit. |
| `backend/` | Only `.gitignore` and `.gitkeep`; no source, manifests, migrations, tests or OpenAPI. |
| `docs/` | Tool directory, tier breakdown, old execution strategy, UX audit and kickoff Q&A; historical inputs evaluated in [STALE_DOCS.md](STALE_DOCS.md). |
| `docs/backend-development/` | Current operating rules, locked decisions, master roadmap and individual future step specifications. |
| `docs/backend-development/artifacts/` | Discovery outputs. Step 01 adds only [CURRENT_STATE.md](CURRENT_STATE.md), this map and [STALE_DOCS.md](STALE_DOCS.md). |
| `docs/backend-development/architecture/`, `contracts/`, `providers/`, `security/` | Planning directories containing README placeholders; no accepted implementation/contracts/provider adapters. |

## Frontend entry points and data flow

| Source | Responsibility and consumers |
|---|---|
| [package.json](../../../frontend/package.json), [package-lock.json](../../../frontend/package-lock.json) | Astro 6.4.2 (locked), Node `>=22.12.0`, frontend libraries and Playwright tooling; no backend dependencies. Scripts: dev, build, preview, astro and Playwright test variants. |
| [astro.config.mjs](../../../frontend/astro.config.mjs) | `site: https://belboore.ir`, no trailing slash, directory-format builds, sitemap integration, prefixed fa/en routes. No server adapter configured. |
| [tsconfig.json](../../../frontend/tsconfig.json) | Astro strict TypeScript configuration. |
| [tools.ts](../../../frontend/src/data/tools.ts) | `Tool` metadata: slug, builtin/external type, category, featured flag, icons/optional external URL, bilingual text/tags and optional SEO/FAQ/how-to fields. Helpers: `getTool`, `getToolsByCategory`, `getFeaturedTools`, `getBuiltinTools`, `getExternalTools`, `searchTools`. No backend tier/status/endpoint contract field. |
| [categories.ts](../../../frontend/src/data/categories.ts) | 13 category definitions, bilingual copy, icons and order, plus category lookup helper. |
| [navigation.ts](../../../frontend/src/data/navigation.ts) | Static localized navigation metadata; rendered shell is in Header/Footer. |
| [i18n/ui.ts](../../../frontend/src/i18n/ui.ts), [i18n/utils.ts](../../../frontend/src/i18n/utils.ts) | Shared localized strings and fa/en locale/direction/path helpers. Individual tool components also carry their own localized copy. |
| [BaseLayout.astro](../../../frontend/src/layouts/BaseLayout.astro) | HTML language/direction, SEO, header/footer and global styles. |
| [SEO.astro](../../../frontend/src/components/SEO.astro) | Metadata, canonical/alternate URLs, structured data and Google Fonts asset links. |
| `frontend/src/styles/design-tokens.css`, `global.css` | Shared design variables and global CSS; not Tailwind/shadcn. |
| `frontend/src/components/` | Header, Footer, LanguageSwitcher, ThemeToggle, ToolCard, CategoryCard and RecentTools compose navigation, listings and browser preferences/history. |

Source flow: registry/category metadata → localized static routes/cards → explicit slug-to-component map → per-tool browser scripts/shared local helpers. There is no API-client layer between these pieces.

## Routes

| Route source under `frontend/src/pages/` | Generated path / behavior |
|---|---|
| `index.astro` | Root redirect toward `/fa`; static redirect behavior depends on serving the generated output. |
| `[lang]/index.astro` | `/en`, `/fa`: home, featured tools/categories, recent tools and search navigation. |
| `[lang]/tools/index.astro` | `/{lang}/tools`: all registry entries; client-side card filtering, optional initial `q` query. |
| [tools/[slug].astro](../../../frontend/src/pages/[lang]/tools/[slug].astro) | `/{lang}/tools/{slug}`: 101 slugs × 2 languages = 202 static detail paths; metadata, breadcrumbs/schema, explicit component dispatch, related tools and local recent history. |
| `[lang]/categories/index.astro` | `/{lang}/categories`: ordered registry categories and counts. |
| `[lang]/categories/[slug].astro` | `/{lang}/categories/{slug}`: 13 × 2 = 26 detail paths, with tools from that category. |
| `[lang]/about.astro`, `contribute.astro` | Localized informational pages. |
| `[lang]/403.astro`, `404.astro`, `500.astro` | Static localized error-content routes; not backend authorization/error contracts. |

The tool route shows a live workspace only when a mapped component and builtin type are present. Unmapped builtins show a coming-soon notice and disabled use action. External detail pages have a visit link; ToolCard also links external entries directly to their stored URLs.

## Registry totals by actual category

| Category slug | Registered | Mapped builtin | Coming-soon builtin | External |
|---|---:|---:|---:|---:|
| `image` | 8 | 6 | 0 | 2 |
| `text` | 9 | 9 | 0 | 0 |
| `code` | 48 | 45 | 0 | 3 |
| `color` | 2 | 1 | 0 | 1 |
| `security` | 8 | 8 | 0 | 0 |
| `math` | 5 | 5 | 0 | 0 |
| `data` | 2 | 0 | 0 | 2 |
| `devtools` | 3 | 1 | 0 | 2 |
| `datetime` | 4 | 4 | 0 | 0 |
| `general` | 4 | 4 | 0 | 0 |
| `pdf` | 2 | 1 | 1 | 0 |
| `downloader` | 1 | 0 | 1 | 0 |
| `network` | 5 | 5 | 0 | 0 |
| **Total** | **101** | **89** | **2** | **10** |

Every registry category exists in `categories.ts`. All 89 map keys occur in the registry, use builtin type and resolve to existing component imports; there are no extra map keys or duplicate slugs.

## Complete current tool dispatch map

The map is in `frontend/src/pages/[lang]/tools/[slug].astro`, lines 130–220. External URLs below are factual registry values, not provider recommendations. Slugs are route identifiers; component names can differ (for example `time-converter` → `TimestampConverter`).

| Category | Slug | Current state | Component / existing external target |
|---|---|---|---|
| `image` | `image-to-base64` | Mapped builtin | [ImageToBase64.astro](../../../frontend/src/components/tools/ImageToBase64.astro) |
| `image` | `qr-code-generator` | Mapped builtin | [QrGenerator.astro](../../../frontend/src/components/tools/QrGenerator.astro) |
| `image` | `squoosh` | External link | `https://squoosh.app` |
| `image` | `excalidraw` | External link | `https://excalidraw.com` |
| `image` | `image-converter` | Mapped builtin | [ImageConverter.astro](../../../frontend/src/components/tools/ImageConverter.astro) |
| `image` | `svg-placeholder-generator` | Mapped builtin | [SvgPlaceholderGenerator.astro](../../../frontend/src/components/tools/SvgPlaceholderGenerator.astro) |
| `image` | `qr-code-scanner` | Mapped builtin | [QrCodeScanner.astro](../../../frontend/src/components/tools/QrCodeScanner.astro) |
| `image` | `wifi-qr-code-maker` | Mapped builtin | [WifiQrCodeMaker.astro](../../../frontend/src/components/tools/WifiQrCodeMaker.astro) |
| `text` | `text-diff` | Mapped builtin | [TextDiff.astro](../../../frontend/src/components/tools/TextDiff.astro) |
| `text` | `word-counter` | Mapped builtin | [WordCounter.astro](../../../frontend/src/components/tools/WordCounter.astro) |
| `text` | `case-converter` | Mapped builtin | [CaseConverter.astro](../../../frontend/src/components/tools/CaseConverter.astro) |
| `text` | `lorem-ipsum` | Mapped builtin | [LoremIpsum.astro](../../../frontend/src/components/tools/LoremIpsum.astro) |
| `text` | `markdown-preview` | Mapped builtin | [MarkdownEditor.astro](../../../frontend/src/components/tools/MarkdownEditor.astro) |
| `text` | `line-sorter` | Mapped builtin | [LineSorter.astro](../../../frontend/src/components/tools/LineSorter.astro) |
| `text` | `ascii-art-generator` | Mapped builtin | [AsciiArtGenerator.astro](../../../frontend/src/components/tools/AsciiArtGenerator.astro) |
| `text` | `emoji-search` | Mapped builtin | [EmojiSearch.astro](../../../frontend/src/components/tools/EmojiSearch.astro) |
| `text` | `numeronym-generator` | Mapped builtin | [NumeronymGenerator.astro](../../../frontend/src/components/tools/NumeronymGenerator.astro) |
| `code` | `json-formatter` | Mapped builtin | [JsonFormatter.astro](../../../frontend/src/components/tools/JsonFormatter.astro) |
| `code` | `json-minify` | Mapped builtin | [JsonMinifyTool.astro](../../../frontend/src/components/tools/JsonMinifyTool.astro) |
| `code` | `json-to-csv` | Mapped builtin | [JsonToCsvTool.astro](../../../frontend/src/components/tools/JsonToCsvTool.astro) |
| `code` | `json-tree-viewer` | Mapped builtin | [JsonTreeViewerTool.astro](../../../frontend/src/components/tools/JsonTreeViewerTool.astro) |
| `code` | `json-diff` | Mapped builtin | [JsonDiffTool.astro](../../../frontend/src/components/tools/JsonDiffTool.astro) |
| `code` | `yaml-json-converter` | Mapped builtin | [YamlJsonConverter.astro](../../../frontend/src/components/tools/YamlJsonConverter.astro) |
| `code` | `json-toml-converter` | Mapped builtin | [JsonTomlConverter.astro](../../../frontend/src/components/tools/JsonTomlConverter.astro) |
| `code` | `yaml-toml-converter` | Mapped builtin | [YamlTomlConverter.astro](../../../frontend/src/components/tools/YamlTomlConverter.astro) |
| `code` | `xml-json-converter` | Mapped builtin | [XmlJsonConverter.astro](../../../frontend/src/components/tools/XmlJsonConverter.astro) |
| `code` | `html-entities` | Mapped builtin | [HtmlEntitiesTool.astro](../../../frontend/src/components/tools/HtmlEntitiesTool.astro) |
| `code` | `text-binary-converter` | Mapped builtin | [TextBinaryTool.astro](../../../frontend/src/components/tools/TextBinaryTool.astro) |
| `code` | `text-unicode-converter` | Mapped builtin | [TextUnicodeTool.astro](../../../frontend/src/components/tools/TextUnicodeTool.astro) |
| `code` | `text-nato-alphabet` | Mapped builtin | [TextNatoTool.astro](../../../frontend/src/components/tools/TextNatoTool.astro) |
| `code` | `list-converter` | Mapped builtin | [ListConverterTool.astro](../../../frontend/src/components/tools/ListConverterTool.astro) |
| `code` | `url-encoder` | Mapped builtin | [UrlEncoder.astro](../../../frontend/src/components/tools/UrlEncoder.astro) |
| `code` | `base64-encoder` | Mapped builtin | [Base64Encoder.astro](../../../frontend/src/components/tools/Base64Encoder.astro) |
| `code` | `uuid-generator` | Mapped builtin | [UuidGenerator.astro](../../../frontend/src/components/tools/UuidGenerator.astro) |
| `code` | `carbon` | External link | `https://carbon.now.sh` |
| `code` | `devdocs` | External link | `https://devdocs.io` |
| `code` | `regex101` | External link | `https://regex101.com` |
| `code` | `url-parser` | Mapped builtin | [UrlParserTool.astro](../../../frontend/src/components/tools/UrlParserTool.astro) |
| `code` | `slugify` | Mapped builtin | [SlugifyTool.astro](../../../frontend/src/components/tools/SlugifyTool.astro) |
| `code` | `jwt-parser` | Mapped builtin | [JwtParserTool.astro](../../../frontend/src/components/tools/JwtParserTool.astro) |
| `code` | `basic-auth-generator` | Mapped builtin | [BasicAuthTool.astro](../../../frontend/src/components/tools/BasicAuthTool.astro) |
| `code` | `meta-tag-generator` | Mapped builtin | [MetaTagTool.astro](../../../frontend/src/components/tools/MetaTagTool.astro) |
| `code` | `safelink-decoder` | Mapped builtin | [SafelinkDecoderTool.astro](../../../frontend/src/components/tools/SafelinkDecoderTool.astro) |
| `code` | `ulid-generator` | Mapped builtin | [UlidGenerator.astro](../../../frontend/src/components/tools/UlidGenerator.astro) |
| `code` | `bip39-passphrase-generator` | Mapped builtin | [Bip39PassphraseGenerator.astro](../../../frontend/src/components/tools/Bip39PassphraseGenerator.astro) |
| `code` | `random-port-generator` | Mapped builtin | [RandomPortGenerator.astro](../../../frontend/src/components/tools/RandomPortGenerator.astro) |
| `code` | `email-normalizer` | Mapped builtin | [EmailNormalizer.astro](../../../frontend/src/components/tools/EmailNormalizer.astro) |
| `code` | `chmod-calculator` | Mapped builtin | [ChmodCalculator.astro](../../../frontend/src/components/tools/ChmodCalculator.astro) |
| `code` | `cron-job-translator` | Mapped builtin | [CronJobTranslator.astro](../../../frontend/src/components/tools/CronJobTranslator.astro) |
| `code` | `crontab-generator` | Mapped builtin | [CrontabGenerator.astro](../../../frontend/src/components/tools/CrontabGenerator.astro) |
| `code` | `git-memo` | Mapped builtin | [GitMemo.astro](../../../frontend/src/components/tools/GitMemo.astro) |
| `code` | `geojson-viewer` | Mapped builtin | [GeoJsonViewer.astro](../../../frontend/src/components/tools/GeoJsonViewer.astro) |
| `code` | `sql-prettify` | Mapped builtin | [SqlPrettify.astro](../../../frontend/src/components/tools/SqlPrettify.astro) |
| `code` | `xml-formatter` | Mapped builtin | [XmlFormatter.astro](../../../frontend/src/components/tools/XmlFormatter.astro) |
| `code` | `yaml-viewer` | Mapped builtin | [YamlViewer.astro](../../../frontend/src/components/tools/YamlViewer.astro) |
| `code` | `regex-memo` | Mapped builtin | [RegexMemo.astro](../../../frontend/src/components/tools/RegexMemo.astro) |
| `code` | `keycode-info` | Mapped builtin | [KeycodeInfo.astro](../../../frontend/src/components/tools/KeycodeInfo.astro) |
| `code` | `user-agent-parser` | Mapped builtin | [UserAgentParser.astro](../../../frontend/src/components/tools/UserAgentParser.astro) |
| `code` | `device-information` | Mapped builtin | [DeviceInfo.astro](../../../frontend/src/components/tools/DeviceInfo.astro) |
| `code` | `mime-types` | Mapped builtin | [MimeTypes.astro](../../../frontend/src/components/tools/MimeTypes.astro) |
| `code` | `http-status-codes` | Mapped builtin | [HttpStatusCodes.astro](../../../frontend/src/components/tools/HttpStatusCodes.astro) |
| `code` | `regex-tester` | Mapped builtin | [RegexTester.astro](../../../frontend/src/components/tools/RegexTester.astro) |
| `code` | `base-converter` | Mapped builtin | [BaseConverter.astro](../../../frontend/src/components/tools/BaseConverter.astro) |
| `code` | `html-editor` | Mapped builtin | [HtmlEditor.astro](../../../frontend/src/components/tools/HtmlEditor.astro) |
| `code` | `text-obfuscator` | Mapped builtin | [TextObfuscator.astro](../../../frontend/src/components/tools/TextObfuscator.astro) |
| `color` | `color-converter` | Mapped builtin | [ColorConverter.astro](../../../frontend/src/components/tools/ColorConverter.astro) |
| `color` | `coolors` | External link | `https://coolors.co` |
| `security` | `password-generator` | Mapped builtin | [PasswordGenerator.astro](../../../frontend/src/components/tools/PasswordGenerator.astro) |
| `security` | `hash-generator` | Mapped builtin | [HashGenerator.astro](../../../frontend/src/components/tools/HashGenerator.astro) |
| `security` | `password-strength-analyser` | Mapped builtin | [PasswordStrengthAnalyser.astro](../../../frontend/src/components/tools/PasswordStrengthAnalyser.astro) |
| `security` | `bcrypt` | Mapped builtin | [BcryptTool.astro](../../../frontend/src/components/tools/BcryptTool.astro) |
| `security` | `hmac-generator` | Mapped builtin | [HmacGenerator.astro](../../../frontend/src/components/tools/HmacGenerator.astro) |
| `security` | `rsa-key-pair-generator` | Mapped builtin | [RsaKeyPairGenerator.astro](../../../frontend/src/components/tools/RsaKeyPairGenerator.astro) |
| `security` | `encrypt-decrypt-text` | Mapped builtin | [EncryptDecryptText.astro](../../../frontend/src/components/tools/EncryptDecryptText.astro) |
| `security` | `otp-code-generator` | Mapped builtin | [OtpCodeGenerator.astro](../../../frontend/src/components/tools/OtpCodeGenerator.astro) |
| `math` | `unit-converter` | Mapped builtin | [UnitConverter.astro](../../../frontend/src/components/tools/UnitConverter.astro) |
| `math` | `eta-calculator` | Mapped builtin | [EtaCalculator.astro](../../../frontend/src/components/tools/EtaCalculator.astro) |
| `math` | `math-evaluator` | Mapped builtin | [MathEvaluator.astro](../../../frontend/src/components/tools/MathEvaluator.astro) |
| `math` | `random-generator` | Mapped builtin | [RandomGenerator.astro](../../../frontend/src/components/tools/RandomGenerator.astro) |
| `math` | `roman-numeral-converter` | Mapped builtin | [RomanNumeralConverter.astro](../../../frontend/src/components/tools/RomanNumeralConverter.astro) |
| `data` | `json-crack` | External link | `https://jsoncrack.com` |
| `data` | `transform-tools` | External link | `https://transform.tools` |
| `devtools` | `time-converter` | Mapped builtin | [TimestampConverter.astro](../../../frontend/src/components/tools/TimestampConverter.astro) |
| `devtools` | `code-sandbox` | External link | `https://codesandbox.io` |
| `devtools` | `jwt-debugger` | External link | `https://jwt.io` |
| `datetime` | `date-difference` | Mapped builtin | [DateDifference.astro](../../../frontend/src/components/tools/DateDifference.astro) |
| `datetime` | `calendar-converter` | Mapped builtin | [CalendarConverter.astro](../../../frontend/src/components/tools/CalendarConverter.astro) |
| `datetime` | `chronometer` | Mapped builtin | [Chronometer.astro](../../../frontend/src/components/tools/Chronometer.astro) |
| `datetime` | `date-time-converter` | Mapped builtin | [DateTimeConverter.astro](../../../frontend/src/components/tools/DateTimeConverter.astro) |
| `general` | `percentage-calculator` | Mapped builtin | [PercentageCalculator.astro](../../../frontend/src/components/tools/PercentageCalculator.astro) |
| `general` | `random-number` | Mapped builtin | [RandomNumber.astro](../../../frontend/src/components/tools/RandomNumber.astro) |
| `general` | `bmi-calculator` | Mapped builtin | [BmiCalculator.astro](../../../frontend/src/components/tools/BmiCalculator.astro) |
| `general` | `phone-parser` | Mapped builtin | [PhoneParser.astro](../../../frontend/src/components/tools/PhoneParser.astro) |
| `pdf` | `merge-pdf` | Mapped builtin | [MergePdf.astro](../../../frontend/src/components/tools/MergePdf.astro) |
| `pdf` | `compress-pdf` | Coming soon | No component |
| `downloader` | `youtube-downloader` | Coming soon | No component |
| `network` | `ipv4-address-converter` | Mapped builtin | [Ipv4AddressConverter.astro](../../../frontend/src/components/tools/Ipv4AddressConverter.astro) |
| `network` | `ipv4-subnet-calculator` | Mapped builtin | [Ipv4SubnetCalculator.astro](../../../frontend/src/components/tools/Ipv4SubnetCalculator.astro) |
| `network` | `ipv4-range-expander` | Mapped builtin | [Ipv4RangeExpander.astro](../../../frontend/src/components/tools/Ipv4RangeExpander.astro) |
| `network` | `ipv6-ula-generator` | Mapped builtin | [Ipv6UlaGenerator.astro](../../../frontend/src/components/tools/Ipv6UlaGenerator.astro) |
| `network` | `mac-address-generator` | Mapped builtin | [MacAddressGenerator.astro](../../../frontend/src/components/tools/MacAddressGenerator.astro) |

## Shared tool abstractions

There are **102** Astro files in `frontend/src/components/tools/`: 89 mapped tool components and these 13 shared components.

| Component(s) | Current role |
|---|---|
| [ToolWorkspace.astro](../../../frontend/src/components/tools/ToolWorkspace.astro) | Slotted workspace/card layout and common workspace styles. |
| [ToolPrimitives.astro](../../../frontend/src/components/tools/ToolPrimitives.astro) | Shared tool CSS for controls, errors, empty/output/result states and related layout classes. |
| [ToolUtils.astro](../../../frontend/src/components/tools/ToolUtils.astro) | Browser `window.__belbooreTools` helpers for clipboard feedback, output/error/empty states, debouncing and button handlers; no request wrapper. |
| `ToolInputField.astro`, `ToolInputShell.astro`, `ToolControlComposer.astro` | Labeled fields and composed control layouts. |
| `ToolActionButton.astro`, `ToolSegmentedControl.astro`, `ToolResultCard.astro` | Shared action button, options and result/copy presentation. |
| [ToolCalendarField.astro](../../../frontend/src/components/tools/ToolCalendarField.astro) | Gregorian/Jalali picker, `tool-calendar-change` browser event and static holiday JSON fetch. |
| `ConverterDirectionToggle.astro` | Browser converter direction control. |
| `ConverterRelatedTools.astro`, `JsonRelatedTools.astro` | Related-tool navigation for those families. |
| `frontend/src/components/ui/*.astro` | Button, Input, TextArea, Select, Switch, PasswordInput, Checkbox, Tabs, Progress, LucideIcon and ToolDropdown primitives. |

There is no generic server-job/upload abstraction or shared API error schema. File inputs, progress labels and result sections in existing tools are browser UI.

## Local TypeScript helpers

All **11** tool helper modules are in `frontend/src/components/tools/`.

| Module | Actual responsibilities |
|---|---|
| `jsonUtils.ts` | JSON parsing/formatting/minifying, flattening, CSV conversion and diff/error details. |
| `formatConverterUtils.ts` | YAML/TOML/XML ↔ JSON and bidirectional format conversions using installed parser libraries. |
| `textUtils.ts` | HTML entities, binary/Unicode/NATO, lists/case, Base64 and local file reading. |
| `webUtils.ts` | URL parsing, slug generation, safelink decoding, UTF-8 Base64 and JWT decoding; URL strings are not fetched. |
| `Phase6Utils.ts` | Secure randomness/ULIDs, emails, chmod/cron/commit helpers, GeoJSON/XML helpers and localStorage regex memos. |
| `Phase7Data.ts` | MIME and HTTP status reference data and local user-agent parsing. |
| `Phase8Utils.ts` | Password scoring, HMAC/AES/RSA/TOTP, file hashing and Web Crypto conversions/randomness. |
| `Phase9Utils.ts` | Obfuscation, base/Roman conversion, math evaluation, ASCII art, ETA and emoji data/search. |
| `Phase10Utils.ts` | Calendar/timezone, unit and random utilities plus local reference data. |
| [mediaUtils.ts](../../../frontend/src/components/tools/mediaUtils.ts) | Image validation/read/decode, canvas resizing/encoding, Blob/Data URL downloads and SVG generation. |
| [networkUtils.ts](../../../frontend/src/components/tools/networkUtils.ts) | IP/CIDR/subnet/range math, IPv6/MAC generation and bundled vendor-prefix reference data; no network probing. |
| [src/lib/jalali.ts](../../../frontend/src/lib/jalali.ts) | Additional Jalali/Gregorian date conversion and localized date formatting shared by date tools. |

## Public assets, tests and automation

| Path | Actual state |
|---|---|
| `frontend/public/calendar-data/year_1390.json` … `year_1424.json` | 35 bundled static calendar files; the sole explicit frontend `fetch()` reads these. |
| `frontend/public/tool-icons/`, `category-icons/`, `general-icons/` | Static visual assets for tools/categories/navigation. |
| `frontend/public/favicon.svg`, `apple-touch-icon.svg`, `main_icon.webp`, `robots.txt`, `_headers` | Branding, crawling and static-host header/cache configuration. |
| [playwright.config.ts](../../../frontend/playwright.config.ts) | One Chromium project with explicit system Google Chrome path; preview server at 4321 and no build in webServer command. |
| `frontend/tests/core/smoke.spec.ts` | Home, shell/navigation, footer and unknown-page smoke checks. |
| `frontend/tests/routing/routing.spec.ts` | Routes, error-content pages and SEO/structured-data assertions. |
| `frontend/tests/categories/categories.spec.ts` | Category listing, image-category detail/tools and breadcrumb visibility. |
| `frontend/tests/search/search.spec.ts` | Browser tool filtering/search behavior. |
| `frontend/tests/i18n/i18n.spec.ts` | HTML language/direction, language switching and Persian text checks. |
| `frontend/tests/tools/live-tools.spec.ts` | 13 named tools: JSON formatter, Base64, password, UUID, case, word count, color, URL encode, hash, timestamp, unit, Lorem Ipsum and line sorter. |
| `frontend/docs/*.md` | Older frontend status, expansion, phase, QA and SEO planning snapshots. |
| `frontend/opencode.json` | OpenCode config referencing the `openrtk` plugin; not an application dependency or deployment pipeline. |

## Backend boundaries and handoff

`backend/` has no implementation, runtime configuration, OpenAPI, database schema or tests. Descriptions of PostgreSQL, Redis, RabbitMQ/Celery, MinIO, FastAPI, Nginx and ArvanCloud live in planning documents only.

The map records present frontend behavior and omissions. Planned finance/weather/music, link shortener, images-to-PDF, dedicated image compression and active diagnostics are not implemented entries/clients merely because older documents list them. Existing local PDF merge/image conversion and external directory links must be treated as source evidence during later reviewed discovery. This document does not classify tools into new backend tiers, freeze scope, author endpoint contracts or execute Step 02.
