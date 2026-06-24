# Frontend Tier 0 — Phased Implementation Planner

**Scope:** Complete all ~88 pure client-side tools across 3 development layers.
**Baseline:** 17 live builtins + 10 external redirects + 5 coming-soon (in data) + ~61 not yet in data.
**Total remaining frontend-only work:** ~66 new tool implementations + 17 UI enhancements.

---

## The 3 Development Layers

| Layer | Focus | When |
|-------|-------|------|
| **Layer 1: Feature Impl.** | Build new tools (data entry + component) | Phases 1–12 |
| **Layer 2: UI Improvement** | Enhance existing tools with poor UX | Phase 13 |
| **Layer 3: Optimization** | Category restructure, performance, a11y, QA | Phase 14 |

---

## Phase 1 — Quick Wins (Coming-Soon Tools)

*Already registered in `tools.ts`, need only component + `[slug].astro` mapping.*

| # | Tool | Slug | Effort |
|---|------|------|:------:|
| 1 | Regex Tester | `regex-tester` | 1d |
| 2 | Date Difference Calculator | `date-difference` | 0.5d |
| 3 | Percentage Calculator | `percentage-calculator` | 0.5d |
| 4 | Random Number Generator | `random-number` | 0.5d |
| 5 | BMI Calculator | `bmi-calculator` | 0.5d |

**Total effort:** ~3 days
**Delivery:** 5 new live tools

---

## Phase 2 — Developer Tools: JSON Toolkit

| # | Tool | Slug | Effort | Notes |
|---|------|------|:------:|-------|
| 1 | JSON Tree Viewer | — | 1.5d | Interactive collapsible tree |
| 2 | JSON Minify | — | 0.5d | Strip whitespace |
| 3 | JSON Diff | — | 1.5d | Side-by-side diff viewer |
| 4 | JSON to CSV | — | 1d | JSON array → flattened CSV |
| 5 | Enhance JSON Formatter | `json-formatter` | 0.5d | Add minify/diff links, better error UX |

**Total effort:** ~5 days
**Delivery:** 4 new + 1 enhanced

---

## Phase 3 — Developer Tools: Format Converters

*Each is bidirectional (one tool with swap toggle — was 2 unidirectional tools).*

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | YAML ↔ JSON | 1d | js-yaml library |
| 2 | YAML ↔ TOML | 1d | @iarna/toml |
| 3 | JSON ↔ TOML | 1d | Reuses parsers from above |
| 4 | XML ↔ JSON | 1d | fast-xml-parser |

**Total effort:** ~4 days
**Delivery:** 4 new bidirectional tools (replaces 8 unidirectional planned)

---

## Phase 4 — Developer Tools: Text & Encoding

| # | Tool | Slug | Effort | Notes |
|---|------|------|:------:|-------|
| 1 | HTML Entities | — | 0.5d | Encode/decode `<>&` etc. |
| 2 | Text to Binary | — | 0.5d | Text ↔ binary string |
| 3 | Text to Unicode | — | 0.5d | Show code points |
| 4 | Text to NATO Alphabet | — | 0.5d | Phonetic spelling |
| 5 | List Converter | — | 1.5d | Extends `line-sorter`: add transpose, prefix/suffix, truncation |
| 6 | Enhance Base64 Encoder/Decoder | `base64-encoder` | 0.5d | Add text/file mode tabs |
| 7 | Enhance Case Converter | `case-converter` | 0.5d | Add more case types |

**Total effort:** ~4.5 days
**Delivery:** 5 new + 2 enhanced

---

## Phase 5 — Developer Tools: Web & HTTP

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | URL Parser | 1d | Break URL → components tree |
| 2 | Slugify String | 0.5d | Text → URL-friendly slug |
| 3 | JWT Parser | 1d | Decode header/payload |
| 4 | Basic Auth Generator | 0.5d | username:password → header |
| 5 | Meta Tag Generator | 1d | Form-based meta tag builder |
| 6 | Safelink Decoder | 0.5d | Decode obfuscated redirects |

**Total effort:** ~4.5 days
**Delivery:** 6 new tools

---

## Phase 6 — Developer Tools: Generators, DevOps & Code Tools

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | ULID Generator | 0.5d | Time-sortable IDs |
| 2 | BIP39 Passphrase Generator | 1d | Crypto mnemonic phrases |
| 3 | Random Port Generator | 0.5d | Random high port |
| 4 | Email Normalizer | 0.5d | Normalize + dedupe emails |
| 5 | Chmod Calculator | 0.5d | Checkbox → octal permission |
| 6 | Cron Job Translator | 1d | Cron → plain English |
| 7 | Crontab Generator | 1d | Visual cron builder |
| 8 | Git Memo | 0.5d | Commit message templates |
| 9 | GeoJSON Viewer | 1.5d | Leaflet map from GeoJSON |
| 10 | SQL Prettify | 1d | sql-formatter library |
| 11 | XML Formatter | 0.5d | Pretty-print XML |
| 12 | YAML Viewer | 0.5d | Format + highlight YAML |
| 13 | Regex Memo | 1d | Save/search regex patterns (localStorage) |

**Total effort:** ~10 days
**Delivery:** 13 new tools

---

## Phase 7 — Developer Tools: References

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | Keycode Info | 1d | Keyboard event key viewer |
| 2 | User Agent Parser | 0.5d | Parse UA → browser/OS/device |
| 3 | Device Information | 0.5d | screen, navigator, WebGL |
| 4 | MIME Types | 0.5d | Extension → MIME lookup |
| 5 | HTTP Status Codes | 1d | Searchable reference table |

**Total effort:** ~3.5 days
**Delivery:** 5 new tools

---

## Phase 8 — Security & Passwords

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | Password Strength Analyser | 1.5d | zxcvbn-like scoring |
| 2 | Bcrypt | 1d | Hash + verify (bcryptjs) |
| 3 | HMAC Generator | 0.5d | HMAC with key selection |
| 4 | RSA Key Pair Generator | 1d | Web Crypto API |
| 5 | Encrypt/Decrypt Text | 1d | AES with passphrase |
| 6 | OTP Code Generator (2FA) | 1d | TOTP from secret |
| 7 | Enhance Password Generator | 0.5d | Add strength meter, exclude ambiguous |
| 8 | Enhance Hash Generator | 0.5d | Add HMAC, file hashing |

**Total effort:** ~7 days
**Delivery:** 6 new + 2 enhanced

---

## Phase 9 — Text & Number Tools

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | String Obfuscator | 1d | ROT13, reverse, Base64, Unicode escape |
| 2 | Emoji Picker | 1.5d | Search + category filter |
| 3 | ASCII Art Text Generator | 1d | figlet-like rendering |
| 4 | Numeronym Generator | 0.5d | i18n → internationalization |
| 5 | Integer Base Converter | 0.5d | Bin/Oct/Dec/Hex |
| 6 | Roman Numeral Converter | 0.5d | Arabic ↔ Roman |
| 7 | Math Evaluator | 1d | Expression parser + real-time eval |
| 8 | ETA Calculator | 0.5d | Speed/distance/time |

**Total effort:** ~6.5 days
**Delivery:** 8 new tools

---

## Phase 10 — Everyday Tools

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | QR Code Scanner | 2d | jsQR WASM + camera integration |
| 2 | WiFi QR Code Maker | 0.5d | WiFi config → QR |
| 3 | Calendar Converter | 1d | Gregorian ↔ Jalali ↔ others |
| 4 | Date-Time Converter | 1d | ISO, Unix, custom format |
| 5 | Chronometer | 0.5d | Stopwatch + lap/reset |
| 6 | Phone Parser/Formatter | 1d | libphonenumber-like |
| 7 | HTML WYSIWYG Editor | 1.5d | contentEditable → HTML source |
| 8 | Random Generator | 1d | Dice, wheel, name picker |
| 9 | Enhance Unit Converter | 0.5d | Add more categories |
| 10 | Enhance Timestamp Converter | 0.5d | Add timezone picker |

**Total effort:** ~9.5 days
**Delivery:** 8 new + 2 enhanced

---

## Phase 11 — Network & Diagnostics (Tier 0)

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | IPv4 Subnet Calculator | 1d | CIDR → subnet details |
| 2 | IPv4 Address Converter | 0.5d | Decimal/dotted/hex/binary |
| 3 | IPv4 Range Expander | 0.5d | CIDR → full IP list |
| 4 | IPv6 ULA Generator | 0.5d | Random fd00::/8 prefix |
| 5 | MAC Address Generator | 0.5d | Random + vendor prefix |

**Total effort:** ~3 days
**Delivery:** 5 new tools

---

## Phase 12 — Media Tools (Tier 0)

| # | Tool | Effort | Notes |
|---|------|:------:|-------|
| 1 | Image Converter | 2d | Client-side canvas format conversion |
| 2 | SVG Placeholder Generator | 1d | Custom dimensions + label |
| 3 | Enhance Image to Base64 | 0.5d | Better preview, resize options |

**Total effort:** ~3.5 days
**Delivery:** 2 new + 1 enhanced

---

## Phase 13 — Layer 2: UI Improvement Pass

*Review every live tool (17 existing + all new from Phases 1–12) for UX quality.*

| Task | Effort | Scope |
|------|:------:|-------|
| Consistent layout & spacing audit | 1d | All tool pages |
| Add bidirectional toggle to format converters | 0.5d | Phase 3 tools |
| Add mode tabs (text/file) to Base64 | 0.5d | Phase 4 |
| Mobile responsiveness pass | 1d | All tools |
| Dark mode consistency | 0.5d | All tools |
| Copy-to-clipboard feedback | 0.5d | All output areas |
| Loading/skeleton states | 1d | Tools with async processing |
| Error states & validation | 1d | All input forms |
| Empty state designs | 0.5d | Tools with no input yet |

**Total effort:** ~6.5 days
**Delivery:** All tools with consistent, polished UI

---

## Phase 14 — Layer 3: Category Restructure & Optimization

| Task | Effort | Notes |
|------|:------:|-------|
| Restructure `categories.ts` to 10-category UX | 1d | Align with `frontend_plan.md` |
| Reorganize tools into correct categories | 1d | Move QR to Everyday, rehome tools |
| Add sub-group accordions to sidebar/nav | 1.5d | Collapsible sub-groups |
| Lazy-load tool components | 1d | Astro islands / dynamic imports |
| Lighthouse audit (target > 90) | 1d | Performance, a11y, SEO |
| Cross-browser testing (Chrome, FF, Safari, mobile) | 1.5d | |
| Playwright E2E for critical flows | 2d | Smoke + 5 tool-specific tests |

**Total effort:** ~9 days
**Delivery:** 10-category UX with optimized performance

---

## Consolidated Timeline

| Phase | Tools | Effort | Layer |
|:-----:|:-----:|:------:|:-----:|
| P1 — Quick Wins | 5 new | 3d | 1 |
| P2 — JSON Toolkit | 4 new + 1 enhanced | 5d | 1 |
| P3 — Format Converters | 4 new | 4d | 1 |
| P4 — Text & Encoding | 5 new + 2 enhanced | 4.5d | 1 |
| P5 — Web & HTTP | 6 new | 4.5d | 1 |
| P6 — Generators, DevOps, Code Tools | 13 new | 10d | 1 |
| P7 — References | 5 new | 3.5d | 1 |
| P8 — Security & Passwords | 6 new + 2 enhanced | 7d | 1 |
| P9 — Text & Number Tools | 8 new | 6.5d | 1 |
| P10 — Everyday Tools | 8 new + 2 enhanced | 9.5d | 1 |
| P11 — Network & Diagnostics | 5 new | 3d | 1 |
| P12 — Media Tools | 2 new + 1 enhanced | 3.5d | 1 |
| P13 — UI Improvement Pass | All tools | 6.5d | 2 |
| P14 — Category Restructure & Optimization | — | 9d | 3 |
| **Total** | **71 new + 8 enhanced** | **~80 days** | |

---

## Dependency Map

```
P1 (Quick Wins)
  ↓
P2 (JSON Toolkit) ──→ P6 (Generators/DevOps)
  ↓                      ↓
P3 (Format Converters)  P7 (References)
  ↓
P4 (Text & Encoding)
  ↓
P5 (Web & HTTP)
         ↓
P8 (Security) ──→ P9 (Text & Number) ──→ P10 (Everyday)
                                               ↓
                                    P11 (Network) ──→ P12 (Media)
                                                           ↓
                                                  P13 (UI Improvement)
                                                           ↓
                                                  P14 (Restructure & QA)
```

- Phases within the **same row** can run in parallel (different devs).
- P1 must finish first (unblocks others by establishing patterns).
- P13 and P14 are **blocked** until all feature phases complete.
- P14 is the final gate before production release.

---

## Effort Legend

| Symbol | Meaning |
|:------:|---------|
| 0.5d | Half-day (simple form + logic) |
| 1d | Full day (standard tool with i18n) |
| 1.5d | Complex (interactive visualization, camera, map) |
| 2d | Heavy (multi-mode, external library integration) |

*Estimates assume existing shared components (`ToolWorkspace`, `ToolPrimitives`, `ToolInputShell`) are reused.*
