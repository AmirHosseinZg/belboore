# Frontend-Only Tool Status Table

**Last updated:** 2026-06-25
**Source:** `docs/Tools_breakdown.md` — Tier 0 (Pure Client-Side)
**Cross-reference:** `src/data/tools.ts`, `src/pages/[lang]/tools/[slug].astro` (component map), `src/components/tools/` (live components)

---

## Status Legend

| Status | Meaning |
|--------|---------|
| `live` | Tool has a live interactive component mapped in `[slug].astro` |
| `coming-soon` | Tool is registered in `tools.ts` but has no live component |
| `not-in-data` | Tool is planned in `Tools_breakdown.md` but not yet in `tools.ts` |
| `external-redirect` | Tool redirects to a 3rd-party site via `url` field |
| `merged-into` | Tool was consolidated into another tool (see Notes) |

---

## Summary

| Metric | Count |
|--------|:-----:|
| Tier 0 tools planned in `Tools_breakdown.md` | ~88 |
| Already registered in `tools.ts` | 35 total (25 builtin + 10 external) |
| Live builtin components | 17 |
| Coming-soon builtins (in data, no component) | 8 |
| External redirects | 10 |
| **Tier 0 tools not yet in data** | **~61** |
| Extra tools in codebase (not in planned Tier 0) | 5 |

---

## 1. 🖼️ Media Tools (Tier 0)

**Sub-group: Images & Design**

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 1 | Image Converter | — | `not-in-data` | — | — | Convert between image formats (PNG, JPG, WebP, etc.) |
| 2 | SVG Placeholder Generator | — | `not-in-data` | — | — | Generate SVG placeholders with custom dimensions |

**Extra tools in codebase (not in planned Tier 0):**
- `image-to-base64` → live (converts image files to Base64 strings)
- `qr-code-generator` → live (generic QR code generator, placed in `image` category currently)

---

## 2. 🔐 Security & Passwords (Tier 0)

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 1 | Password Generator | `password-generator` | `live` | ✅ | needs-improvement | Basic implementation exists |
| 2 | Password Strength Analyser | — | `not-in-data` | — | — | Uses zxcvbn-like logic (client-side) |
| 3 | Hash Generator | `hash-generator` | `live` | ✅ | needs-improvement | Basic MD5/SHA hashing |
| 4 | Bcrypt | — | `not-in-data` | — | — | Hash & verify with bcrypt |
| 5 | HMAC Generator | — | `not-in-data` | — | — | HMAC with secret key |
| 6 | RSA Key Pair Generator | — | `not-in-data` | — | — | Generate pub/priv RSA keys |
| 7 | Encrypt/Decrypt Text | — | `not-in-data` | — | — | AES symmetric encryption |
| 8 | OTP Code Generator (2FA) | — | `not-in-data` | — | — | TOTP-based 2FA codes |

**Notes:**
- The `belboore tools.md` also lists **Token Generator** (random string tokens) — it is missing from the Tier 0 breakdown but would be frontend-only.

---

## 3. 🌐 Network & Diagnostics (Tier 0)

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 1 | IPv4 Subnet Calculator | — | `not-in-data` | — | — | CIDR/subnet math |
| 2 | IPv4 Address Converter | — | `not-in-data` | — | — | Decimal ↔ dotted ↔ hex ↔ binary |
| 3 | IPv4 Range Expander | — | `not-in-data` | — | — | Expand CIDR → full IP list |
| 4 | IPv6 ULA Generator | — | `not-in-data` | — | — | Generate random Unique Local Address |
| 5 | MAC Address Generator | — | `not-in-data` | — | — | Random or vendor-prefixed MAC |
| 6 | HTTP Status Codes | — | `not-in-data` | — | — | Searchable status code reference |

---

## 4. 💻 Developer Tools (Tier 0)

### 4a. JSON Toolkit

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 1 | JSON Formatter | `json-formatter` | `live` | ✅ | good | Format, validate, tree view |
| 2 | JSON Tree Viewer | — | `not-in-data` | — | — | Interactive collapsible tree |
| 3 | JSON Minify | — | `not-in-data` | — | — | Strip whitespace from JSON |
| 4 | JSON Diff | — | `not-in-data` | — | — | Side-by-side JSON comparison |
| 5 | JSON to CSV | — | `not-in-data` | — | — | Convert JSON array → CSV |

### 4b. Format Converters (Bidirectional — each is ONE tool with swap toggle)

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 6 | YAML ↔ JSON | — | `not-in-data` | — | — | Bidirectional; was 2 unidirectional tools |
| 7 | YAML ↔ TOML | — | `not-in-data` | — | — | Bidirectional |
| 8 | JSON ↔ TOML | — | `not-in-data` | — | — | Bidirectional |
| 9 | XML ↔ JSON | — | `not-in-data` | — | — | Bidirectional |

> **Subtool note:** Previously 8 separate tools (YAML→JSON, JSON→YAML, etc.). Consolidated to 4 bidirectional tools. Each needs a direction-swap toggle in the UI.

### 4c. Code Tools

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 10 | SQL Prettify | — | `not-in-data` | — | — | Format SQL queries |
| 11 | XML Formatter | — | `not-in-data` | — | — | Pretty-print XML |
| 12 | YAML Viewer | — | `not-in-data` | — | — | Format & view YAML |
| 13 | Markdown Viewer & Exporter | `markdown-preview` | `live` | ✅ | needs-improvement | Live preview; needs LaTeX/RTL/PDF export |
| 14 | Regex Tester | `regex-tester` | `coming-soon` | — | — | In tools.ts, no component yet |
| 15 | Regex Memo | — | `not-in-data` | — | — | Save/organize regex patterns |

### 4d. Text & Encoding

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 16 | Base64 Encoder/Decoder | `base64-encoder` | `live` | ✅ | needs-improvement | Merged tool (text + file modes via tabs) |
| 17 | Case Converter | `case-converter` | `live` | ✅ | needs-improvement | Multi-case conversion |
| 18 | HTML Entities | — | `not-in-data` | — | — | Encode/decode HTML entities |
| 19 | Text to Binary | — | `not-in-data` | — | — | Text ↔ binary representation |
| 20 | Text to Unicode | — | `not-in-data` | — | — | See Unicode code points |
| 21 | Text to NATO Alphabet | — | `not-in-data` | — | — | Spell out in NATO phonetic |
| 22 | List Converter | line-sorter? | `live` (partial) | ✅ | needs-improvement | `line-sorter` covers sort/dedup but not transpose/prefix/suffix |

> **Subtool note:** `line-sorter` (current live) is a simplified version of the planned **List Converter**. The planned tool also handles transpose, prefix/suffix, truncation, etc.

### 4e. Web & HTTP

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 23 | URL Encode/Decode | `url-encoder` | `live` | ✅ | needs-improvement | Basic encode/decode |
| 24 | URL Parser | — | `not-in-data` | — | — | Break URL into components |
| 25 | Slugify String | — | `not-in-data` | — | — | Convert text to URL slug |
| 26 | JWT Parser | — | `not-in-data` | — | — | Decode JWT header/payload |
| 27 | Basic Auth Generator | — | `not-in-data` | — | — | Generate Authorization header |
| 28 | Meta Tag Generator | — | `not-in-data` | — | — | Generate `<meta>` tags |
| 29 | Safelink Decoder | — | `not-in-data` | — | — | Decode obfuscated redirect URLs |

### 4f. Generators & IDs

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 30 | UUID Generator | `uuid-generator` | `live` | ✅ | good | Single/bulk UUID v4 |
| 31 | ULID Generator | — | `not-in-data` | — | — | Time-sortable ULIDs |
| 32 | BIP39 Passphrase Generator | — | `not-in-data` | — | — | Crypto mnemonic phrases |
| 33 | Random Port Generator | — | `not-in-data` | — | — | Random high-numbered port |
| 34 | Email Normalizer | — | `not-in-data` | — | — | Normalize email addresses |

### 4g. DevOps

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 35 | Chmod Calculator | — | `not-in-data` | — | — | Visual UNIX permission calculator |
| 36 | Cron Job Translator | — | `not-in-data` | — | — | Cron expression → plain English |
| 37 | Crontab Generator | — | `not-in-data` | — | — | Visual cron builder |
| 38 | Git Memo | — | `not-in-data` | — | — | Git commit message templates |
| 39 | GeoJSON Viewer | — | `not-in-data` | — | — | Interactive map from GeoJSON |

### 4h. References

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 40 | Keycode Info | — | `not-in-data` | — | — | JS key code reference |
| 41 | User Agent Parser | — | `not-in-data` | — | — | Parse UA strings |
| 42 | Device Information | — | `not-in-data` | — | — | Browser/device specs |
| 43 | MIME Types | — | `not-in-data` | — | — | MIME type lookup by extension |

---

## 5. 📝 Text & Number Tools (Tier 0)

### 5a. Text Utilities

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 1 | Lorem Ipsum Generator | `lorem-ipsum` | `live` | ✅ | needs-improvement | Basic paragraph/word/sentence generation |
| 2 | Text Statistics | `word-counter` | `live` | ✅ | needs-improvement | Word/char/sentence/paragraph count |
| 3 | Text Diff | `text-diff` | `live` | ✅ | needs-improvement | Side-by-side diff (NEW) |
| 4 | String Obfuscator | — | `not-in-data` | — | — | ROT13, reverse, Unicode escape, etc. |
| 5 | Emoji Picker | — | `not-in-data` | — | — | Search & copy emojis |
| 6 | ASCII Art Text Generator | — | `not-in-data` | — | — | Generate ASCII art from text |
| 7 | Numeronym Generator | — | `not-in-data` | — | — | Generate i18n-style numeronyms |

### 5b. Numbers & Color

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 8 | Integer Base Converter | — | `not-in-data` | — | — | Bin/Oct/Dec/Hex conversion |
| 9 | Roman Numeral Converter | — | `not-in-data` | — | — | Arabic ↔ Roman numerals |
| 10 | Color Converter | `color-converter` | `live` | ✅ | good | HEX/RGB/HSL/HSV/CMYK |
| 11 | Math Evaluator | — | `not-in-data` | — | — | Real-time expression evaluator |
| 12 | Percentage Calculator | `percentage-calculator` | `coming-soon` | — | — | In tools.ts, no component yet |
| 13 | ETA Calculator | — | `not-in-data` | — | — | Time/speed/distance calculator |

---

## 6. 🛠️ Everyday Tools (Tier 0)

### 6a. QR Code Hub

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 1 | QR Code Scanner | — | `not-in-data` | — | — | Client-side WASM scanning |
| 2 | WiFi QR Code Maker | — | `not-in-data` | — | — | Generate WiFi-config QR |
| 3 | Make a Branded QR Code | `qr-code-generator` | `live` (partial) | ✅ | needs-improvement | Current `qr-code-generator` covers this partially |
| 4 | File/Audio to QR Code | — | `not-in-data` | — | — | Tier 2 (hosted URL mode); offline mode is frontend-only |

> **Subtool note:** The plan groups all 4 QR tools under "QR Code Hub" in Everyday Tools. Currently `qr-code-generator` lives in the `image` category, not Everyday.

### 6b. Date & Time

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 5 | Calendar Converter | — | `not-in-data` | — | — | Gregorian ↔ Jalali ↔ other calendars |
| 6 | Timestamp Converter | `time-converter` | `live` | ✅ | needs-improvement | Unix timestamp ↔ date |
| 7 | Date-Time Converter | — | `not-in-data` | — | — | ISO 8601 / custom format conversion |
| 8 | Chronometer | — | `not-in-data` | — | — | Stopwatch + lap timer |
| 9 | Global Timezones | — | `not-in-data` | — | — | **Tier 1** (API proxy, not frontend-only) |
| 10 | Sunrise & Sunset | — | `not-in-data` | — | — | **Tier 1** (API proxy, not frontend-only) |

### 6c. Utilities

| # | Tool | Slug | Status | Component | UI Quality | Notes |
|---|------|------|--------|-----------|------------|-------|
| 11 | Unit Converter | `unit-converter` | `live` | ✅ | needs-improvement | 15+ conversion categories |
| 12 | Phone Parser/Formatter | — | `not-in-data` | — | — | Parse international phone numbers |
| 13 | HTML WYSIWYG Editor | — | `not-in-data` | — | — | Rich text → HTML source |
| 14 | Random Generator | — | `not-in-data` | — | — | Dice, wheel, random picker |

---

## 7. Extra Tools in Codebase (Not in Planned Tier 0)

These tools exist in `tools.ts` but are **not** listed in the `Tools_breakdown.md` Tier 0 list:

| Tool | Slug | Status | Why it exists |
|------|------|--------|---------------|
| BMI Calculator | `bmi-calculator` | `coming-soon` | Ad-hoc addition; health utility |
| Random Number Generator | `random-number` | `coming-soon` | Simplified version of "Random Generator" |
| Date Difference Calculator | `date-difference` | `coming-soon` | Ad-hoc addition; date math |
| Line Sorter | `line-sorter` | `live` | Simplified version of "List Converter" |
| Image to Base64 | `image-to-base64` | `live` | Not in planned list (separate from Image Converter) |

---

## 8. Key Architecture Differences from Plan

| Aspect | Planned (`Tools_breakdown.md`) | Actual (`tools.ts` + `categories.ts`) | Impact |
|--------|-------------------------------|----------------------------------------|--------|
| Categories | 10 categories with sub-groups | 12 flat categories (no sub-groups) | Navigation doesn't match UX design |
| QR Code Hub | Under Everyday Tools | `qr-code-generator` under `image` | Wrong category placement |
| Line Sorter | Part of "List Converter" (Text & Encoding) | Standalone tool under `text` | Overlap with planned tool |
| Color Converter | Listed under Text & Number Tools | Standalone `color` category | Different UX grouping |
| Format Converters | 4 bidirectional tools | Not implemented at all | Missing 4 key dev tools |
| Markdown Viewer | Enhanced with LaTeX/RTL/PDF export | Basic preview only | Needs enhancement |

---

## 9. Implementation Priority by Category

Based on **implementation gap** (how many Tier 0 tools are missing):

| Priority | Category | Planned | Live | Coming-Soon | Not-in-Data | Coverage |
|:--------:|----------|:-------:|:----:|:-----------:|:-----------:|:--------:|
| **P0** | Developer Tools | 43 | 6 | 1 | 36 | **16%** |
| **P1** | Text & Number Tools | 13 | 4 | 1 | 8 | **38%** |
| **P2** | Everyday Tools | 11 | 2 | 0 | 9 | **18%** |
| **P3** | Security & Passwords | 8 | 2 | 0 | 6 | **25%** |
| **P4** | Network & Diagnostics | 6 | 0 | 0 | 6 | **0%** |
| **P5** | Media Tools | 2 | 0 | 0 | 2 | **0%** |

**Coverage = (live + coming-soon) / planned × 100%**

---

## 10. Data Source Reconciliation

| Document | Total Tools | Frontend-Only | Backend-Required | External |
|----------|:-----------:|:-------------:|:----------------:|:--------:|
| `docs/Tools_breakdown.md` (planned) | ~150 | ~88 | ~52 | ~10 |
| `src/data/tools.ts` (current) | **35** | 24 | 1 | 10 |
| `frontend/docs/FRONTEND_TOOL_STATUS.md` | 35 | 34* | 1 | 10 |

> *FRONTEND_TOOL_STATUS.md classifies Merge/Compress PDF and YouTube Downloader as `frontend-only (heavy)` but Tools_breakdown.md marks them as Tier 2 (backend-required).

---

*Generated by analyzing `docs/Tools_breakdown.md` Tier 0 list against `src/data/tools.ts` and component map in `[slug].astro`.*
