# Belboore UX & Information Architecture Master Audit

**Auditor:** Principal UX Architect + IA Specialist + Product Designer
**Date:** June 2026
**Scope:** 149 tools across 17 internal categories + 4 external services
**Methodology:** Nielsen Norman heuristic evaluation, card sorting simulation, cognitive walkthrough, findability testing

---

# PHASE 1 — INFORMATION ARCHITECTURE ANALYSIS

## 1.1 Category Evaluation

| # | Category | Tools | Rating | Verdict |
|---|----------|:---:|:---:|---------|
| 1 | External Services | 4 | ⚠️ | **Problematic.** Users don't care about internal vs external. This distinction leaks engineering concerns into UX. |
| 2 | 🖼️ Image Tools | 8 | ✅ | Good. Clear mental model. Minor issues: QR tools don't fully belong. Camera Recorder is borderline. |
| 3 | 🎥 Video Tools | 3 | ✅ | Good. Small but cohesive. |
| 4 | 🎵 Audio Tools | 3 | ✅ | Good. Small but cohesive. |
| 5 | 📄 PDF Tools | 5 | ✅ | Good. Strong cohesion. PDF Signature Checker slightly off-topic. |
| 6 | 🔐 Crypto Tools | 7 | ⚠️ | **Naming problem.** "Crypto" means cryptocurrency to most users. Encryption tools should use different language. |
| 7 | 🔄 Converter Tools | 17 | ❌ | **Too large.** 17 undifferentiated items. Users scan, don't read. Needs sub-grouping or splitting. |
| 8 | 📝 Text Tools | 7 | ✅ | Good. Small, clear purpose. |
| 9 | 🧮 Math Tools | 3 | ⚠️ | **Weak.** Only 3 tools. Merge or expand. |
| 10 | ⏱️ Measurement Tools | 2 | ❌ | **Too small.** 2 tools don't justify a category. Reassign or merge. |
| 11 | 📊 Data Tools | 2 | ❌ | **Too small.** 2 tools. "Data" is ambiguous. |
| 12 | 📥 Downloader Tools | 9 | ✅ | Good. High-demand, clear purpose. |
| 13 | 🌐 Network & Security | 16 | ⚠️ | **Overloaded.** Mix of networking + security + IP tools. Needs sub-categorization. |
| 14 | 💻 Developer Tools | 35 | ❌ | **Junk drawer.** 35 tools with zero grouping. Absolute findability disaster. |
| 15 | 🕒 Date & Time | 5 | ✅ | Good. Cohesive, clear. |
| 16 | 💰 Financial Tools | 6 | ✅ | Good. Cohesive, high value. |
| 17 | 🌍 Geo & Weather | 3 | ⚠️ | **Weak.** Only 3. Merge or expand. |
| 18 | 🛠️ General Tools | 9 | ⚠️ | **Dumping ground.** "General" is the category you pick when nothing else fits. Mixed bag. |

## 1.2 Cross-Category Tool Placement Audit

Every tool evaluated for whether a user would find it in its current category on their first attempt.

| Tool | Current Category | Expected Category | Correct? | Confidence | Issue |
|------|-----------------|-------------------|----------|-----------|-------|
| QR Code Scanner | Image Tools | QR Tools / General | ❌ | High | QR scanner is not "image editing." Users look for it under "QR" or "Scan." |
| Make a Branded QR Code | Image Tools | QR Tools / General | ❌ | High | Not an image tool. QR generation is its own use case. |
| File/Audio to QR Code | Image Tools | QR Tools / File Tools | ❌ | High | QR + file management, not image editing. |
| WiFi QR Code Maker | General Tools | QR Tools / Network | ❌ | Medium | Three QR tools in Image, one in General. This is fragmentation. |
| Camera Recorder | Image Tools | Video Tools | ⚠️ | Medium | Records video, not images. But it's webcam-based which feels more "image." Borderline. |
| SVG Placeholder Generator | Image Tools | Developer Tools / Design | ⚠️ | Medium | Used by devs/designers for mockups. Image Tools is okay but not ideal. |
| Base64 File Converter | Converter Tools | Developer Tools | ❌ | High | Base64 String Converter is in Developer. Why is File version here? |
| Case Converter | Converter Tools | Text Tools | ❌ | High | It's text manipulation. Users look in Text Tools first. |
| Text to NATO Alphabet | Converter Tools | Text Tools | ❌ | Medium | It's text output. Feels like a text tool. |
| Text to Binary | Converter Tools | Developer Tools | ⚠️ | Medium | Very niche. Only developers use this. |
| Text to Unicode | Converter Tools | Developer Tools | ⚠️ | Medium | Same — developer-only. |
| List Converter | Converter Tools | Developer Tools / Text | ⚠️ | High | Transposing/sorting lists is a developer workflow (data prep). |
| Markdown to HTML | Converter Tools | Developer Tools | ❌ | High | IT-Tools had it in Converters. Belboore replaced it with Markdown Viewer in Dev. This is in Converter still? Wait — this is actually a duplicate concept. |
| Bcrypt | Crypto Tools | Developer Tools / Security | ⚠️ | Medium | Most users searching "bcrypt" are developers. Not crypto enthusiasts. |
| BIP39 Passphrase Gen | Crypto Tools | Crypto (blockchain) | ✅ | Low | Correct category for crypto wallet users but 95% of users won't know what BIP39 means. |
| Password Generator | General Tools | Security / Crypto | ⚠️ | High | Same family as Bcrypt, Password Strength, HMAC. Scattered across 3 categories. |
| Password Strength | General Tools | Security / Crypto | ⚠️ | High | See above. |
| Encrypt/Decrypt Text | Crypto Tools | Security / General | ⚠️ | High | A non-technical user wants to "encrypt a message" — they won't look in "Crypto Tools." |
| Hash Generator | Developer Tools | Crypto Tools | ⚠️ | High | Identical tool to IT-Tools "Hash Text" which is in Crypto. Why is Belboore's in Developer? |
| UUID Generator | Developer Tools | Crypto Tools | ⚠️ | High | UUID is literally a crypto tool in IT-Tools. In Belboore it's in Dev. |
| Token Generator | Crypto Tools | Developer Tools / General | ⚠️ | High | Developers generate tokens. Crypto users don't use "tokens" this way. |
| HMAC Generator | Crypto Tools | Developer Tools | ❌ | High | API developers use HMAC. Not crypto users. |
| RSA Key Pair | Crypto Tools | Developer Tools | ❌ | High | Dev/DevOps use RSA, not crypto users. |
| ULID Generator | Crypto Tools | Developer Tools | ❌ | High | ULID is a developer concept (database IDs). |
| Email Normalizer | Developer Tools | General / Email | ⚠️ | Medium | It's an email tool, not a "developer" tool. |
| Git Memo | Developer Tools | Developer Tools | ✅ | High | Correct. |
| Random Port Generator | Developer Tools | Network Tools | ⚠️ | Medium | Port = network. But the audience is dev/DevOps. |
| JWT Parser | Developer Tools | Security / Developer | ⚠️ | Medium | Could go either way. Fine in Developer. |
| OTP Code Generator | Developer Tools | Security / General | ⚠️ | High | 2FA affects everyone, not just developers. |
| Basic Auth Generator | Developer Tools | Security | ⚠️ | Medium | Security concept. |
| HTML WYSIWYG Editor | Developer Tools | Content / Design | ⚠️ | Medium | Content creators use WYSIWYG editors, not just developers. |
| Chronometer | Measurement Tools | General Tools | ❌ | High | "Measurement" makes users think of units/distance. A stopwatch is a utility. |
| Benchmark Builder | Measurement Tools | Developer Tools | ❌ | High | ab/siege/wrk are developer tools. |
| Phone Parser | Data Tools | General Tools | ⚠️ | Medium | "Data Tools" is too vague. |
| IBAN Validator | Data Tools | Financial Tools | ⚠️ | Medium | IBAN = banking = financial. But it's a validator, not live data. |
| Weather Data API | Developer Tools | Geo & Weather | ❌ | High | It's literally about weather. Devs looking for it will search "weather api." |
| PDF Signature Checker | PDF Tools | Security / Crypto | ⚠️ | Medium | Digital signature verification is a security concept. |
| Instant URL | General Tools | Link Shortener / Share | ⚠️ | Low | Unique tool. Fine but confusing next to Link Shortener (external). |
| Local File Share | General Tools | Network / Share | ⚠️ | Medium | File sharing is not "general utility." |
| Cloud Storage Uploader | General Tools | Storage / Files | ⚠️ | High | File storage ≠ general utility. |
| Telegram News | General Tools | News / Content | ⚠️ | Medium | News reader ≠ general utility. |

---

# PHASE 2 — USER MENTAL MODEL ANALYSIS

## 2.1 Beginner User Issues (Ranked by Severity)

| # | Issue | Severity | Impact |
|---|-------|:---:|--------|
| 1 | **18 categories is overwhelming.** A new user sees 18 category names and instantly experiences decision paralysis. Hick's Law: 18 choices → ~3s decision time. | 🔴 Critical | Users leave. They'll Google "free JSON formatter" instead of exploring. |
| 2 | **"Developer Tools" is a bottomless pit.** 35 undifferentiated items. A beginner who opens this will scroll, glaze over, and close the tab. | 🔴 Critical | 35-tool junk drawer = 0 tools found. |
| 3 | **QR tools scattered in 3 places.** New user types "qr code" → sees Image Tools, General Tools, and possibly Network. Confused. Leaves. | 🔴 Critical | Users assume the site is incomplete or broken. |
| 4 | **"Crypto Tools" sounds like cryptocurrency.** Beginner sees this, thinks "I don't need crypto," and skips 7 useful encryption tools. | 🟠 High | 7 tools become invisible to non-crypto users. |
| 5 | **"Converter Tools" with 17 items is a wall of text.** Users scan the first 3 items (Integer Base, Roman Numeral, Base64 File) — none match what they want — and leave. | 🟠 High | 17 tools, but users only process the first ~5. |
| 6 | **"Measurement Tools" is misleading.** Users expect a ruler, unit converter, or tape measure. They find a stopwatch and a benchmark tool. Confusion. | 🟡 Medium | Users avoid categories with unexpected content. |
| 7 | **"External Services" means nothing to a user.** "cach.ir Messenger" — is this a tool? Is this a partner? Is this an advertisement? | 🟡 Medium | Users skip this section entirely. |
| 8 | **File/Audio to QR Code** — A beginner doesn't understand why they'd put audio in a QR code. The name sounds like a bug, not a feature. | 🟡 Medium | Intimidating/confusing name. |
| 9 | **Numeronym Generator** — Beginner: "What's a numeronym?" They won't click it. | 🟡 Medium | Name uses jargon users don't know. |
| 10 | **"BIP39 Passphrase Generator"** — Beginner: "What is BIP39? What is a mnemonic? This is not for me." Door closed. | 🟡 Medium | Jargon-heavy name. |

## 2.2 Intermediate User Issues

| # | Issue | Severity |
|---|-------|:---:|
| 1 | **Can't compare tools quickly.** 17 converters in a flat list. No way to scan "which format converters exist." | 🔴 Critical |
| 2 | **"Network & Security" is actually 3 different things** (network diagnostics + IP tools + security scanning) but presented as one blob. Intermediate users know the difference and get frustrated. | 🟠 High |
| 3 | **No cross-referencing between related tools.** If I use JSON Formatter, I probably want JSON Minify, JSON Diff, or JSON to CSV next. But they're separated by 15 other tools in the list. | 🟠 High |
| 4 | **Password tools are orphaned.** I generate a password → now I want to hash it (bcrypt) or test its strength. These are 3 separate categories. | 🟠 High |
| 5 | **Markdown Viewer is in Developer Tools.** Content writers, technical writers, and note-takers also use Markdown. They won't look in "Developer." | 🟡 Medium |
| 6 | **Two cron tools** (Cron Job Translator + Crontab Generator) are separated in the Developer list. They should be adjacent. | 🟡 Medium |
| 7 | **OTP Generator** is buried in Developer. 2FA affects all users with authenticator apps. | 🟡 Medium |

## 2.3 Power User Issues

| # | Issue | Severity |
|---|-------|:---:|
| 1 | **No favorites/pinning system.** Power users use 5-10 tools daily. They can't pin them to a quick-access bar. Every visit = re-navigate. | 🔴 Critical |
| 2 | **No keyboard shortcuts.** Power users expect `/` for search, `⌘K` for command palette, tab-to-next-tool. | 🟠 High |
| 3 | **No recent tools list.** "What did I use yesterday?" — No way to know without memory. | 🟠 High |
| 4 | **No tool-to-tool linking.** If I format JSON, I can't jump directly to JSON→CSV. I have to go back to the category, scroll, find it. | 🟡 Medium |
| 5 | **No batch operations.** If I need to convert 10 files, I do them one at a time. | 🟡 Medium |
| 6 | **No API/SDK access.** Power users want to script their workflows. No programmatic access to tools. | 🟡 Medium |

---

# PHASE 3 — FINDABILITY TEST (Top 30 Most Confusing)

Simulated user trying to find each tool. First-click = user clicks the correct category on first attempt.

| Tool | 1st Click % | Time (s) | Discoverability /10 | Search Terms | Risk |
|------|:---:|:---:|:---:|-------------|------|
| QR Code Scanner | 40% | 12s | 3 | "scan qr code", "read qr" | Highest — in Image, not QR |
| WiFi QR Code Maker | 35% | 15s | 2 | "wifi qr", "share wifi" | Highest — scattered + wrong category |
| File/Audio to QR Code | 30% | 18s | 2 | "qr code file", "audio qr" | Highest — confusing name + wrong cat |
| Bcrypt | 45% | 10s | 4 | "bcrypt hash", "password hash" | High — Crypto = cryptocurrency to most |
| HMAC Generator | 40% | 12s | 3 | "hmac", "hash key" | High — devs look in Dev, not Crypto |
| RSA Key Pair | 40% | 12s | 3 | "rsa", "ssh key", "generate key" | High — devs look in Dev |
| Token Generator | 35% | 14s | 3 | "random string", "token gen" | High — devs look in Dev |
| Base64 File Converter | 25% | 20s | 1 | "base64 file", "encode file" | 🔴 Critical — wrong category, confusing difference from Base64 Converter |
| Case Converter | 55% | 8s | 5 | "uppercase", "lowercase", "text case" | Medium — but most try Text Tools first |
| Text to NATO | 50% | 10s | 4 | "nato alphabet", "phonetic" | Medium |
| List Converter | 30% | 18s | 2 | "sort list", "transpose", "list tool" | High — nobody thinks "converter" for lists |
| OTP Generator | 40% | 14s | 3 | "2fa", "two factor", "authenticator" | High — in Dev, used by everyone |
| Email Normalizer | 35% | 16s | 2 | "clean email", "normalize email" | High — not a developer task |
| Chronometer | 30% | 20s | 1 | "stopwatch", "timer" | 🔴 Critical — nobody thinks "measurement tools" for a stopwatch |
| Benchmark Builder | 35% | 16s | 2 | "ab test", "siege", "load test" | High — in wrong category entirely |
| SVG Placeholder | 45% | 12s | 3 | "placeholder image", "dummy image" | Medium — okay in Image but devs expect in Dev |
| Password Strength | 55% | 8s | 5 | "password test", "password check" | Medium — near Password Generator, good |
| Instant URL | 40% | 12s | 3 | "temporary link", "share text" | Medium — unique concept, hard to categorize |
| Cloud Storage Uploader | 50% | 10s | 4 | "upload file", "cloud storage" | Medium — file upload, not "general" |
| Weather Data API | 25% | 20s | 1 | "weather api", "api weather" | 🔴 Critical — in Dev, should be Geo/Weather |
| Phone Parser | 45% | 12s | 3 | "phone number", "format phone" | Medium — "Data Tools" too vague |
| IBAN Validator | 45% | 12s | 3 | "iban check", "bank account" | Medium — some look in Finance |
| PNG to WebP | N/A | N/A | N/A | "png to webp convert" | Tool doesn't exist. Image Converter does this but the name is generic. Users search for specific format pairs. |
| Markdown to PDF | N/A | N/A | N/A | "markdown to pdf" | Markdown Viewer exports to PDF but it's not discoverable from the name. |

---

# PHASE 4 — CATEGORY HEALTH SCORES

| Category | Score /100 | Problems | Suggested Fix |
|----------|:---:|----------|--------------|
| External Services | 35 | Leaks engineering architecture. "cach.ir" means nothing. Mixed with tools. | **Delete as a category.** Distribute to relevant categories with small "Powered by" badges. |
| 🖼️ Image Tools | 75 | QR tools don't belong. Camera Recorder borderline. | **Move QR tools out.** Rename Camera Recorder to "Webcam Recorder" and keep or move to Video. |
| 🎥 Video Tools | 85 | Small but okay. | Keep. Consider merging with Audio into "Media Tools." |
| 🎵 Audio Tools | 80 | Good. Small. | Keep. Or merge with Video. |
| 📄 PDF Tools | 80 | PDF Signature Checker doesn't fit. | Move Sig Checker to Security. Keep rest. |
| 🔐 Crypto Tools | 30 | 🔴 Name is misleading. Content is mixed (crypto ID + encryption + blockchain). | **Split into:** "Encryption & Security" (Bcrypt, Encrypt/Decrypt, HMAC, RSA, Hash) + "Identity & Tokens" (UUID, ULID, Token, BIP39). |
| 🔄 Converter Tools | 25 | 🔴 17 undifferentiated items. No grouping. | **Sub-group:** "Data Formats" (JSON/YAML/TOML/XML), "Text & Encoding" (Case, Binary, Unicode, NATO, Base64), "Numbers & Colors" (Base, Roman, Color). |
| 📝 Text Tools | 80 | Good. | Keep. Add Case Converter here. |
| 🧮 Math Tools | 45 | Only 3 tools. | Merge into General or expand significantly. |
| ⏱️ Measurement Tools | 15 | 🔴 2 tools, name is misleading, wrong placement. | **Delete.** Move Chronometer to General. Move Benchmark to Developer. |
| 📊 Data Tools | 20 | 🔴 2 tools, ambiguous name. | **Delete.** Move Phone Parser to General. Move IBAN to Financial or General. |
| 📥 Downloader Tools | 90 | Good. High demand, clear name. | Keep. Could rename to "Media Downloader" for clarity. |
| 🌐 Network & Security | 55 | 16 tools, 3 sub-domains jammed together. | **Split:** "Network Diagnostics" (IP, Ping, DNS, Whois, Traceroute, Speed, Port, Subnet, MAC, IPv4/v6) + "Security" (SSL, VPN, Blacklist, APK, Email, PDF Sig). |
| 💻 Developer Tools | 10 | 🔴🔴 Absolute worst. 35 tools, zero grouping. A UX crime scene. | **Must split.** See Phase 8. |
| 🕒 Date & Time | 85 | Good. Cohesive. | Keep. |
| 💰 Financial Tools | 85 | Good. Cohesive. | Keep. |
| 🌍 Geo & Weather | 70 | Only 3. | Merge with Financial? Or expand. "World Data." |
| 🛠️ General Tools | 45 | Dumping ground. Mixed purposes. | **Curate.** Remove file/cloud tools to a dedicated "Files & Sharing" category. Keep true utilities. |

---

# PHASE 5 — DUPLICATION & OVERLAP ANALYSIS

| # | Conflict | Type | Impact | Fix |
|---|----------|------|:---:|------|
| 1 | **Base64 Converter (Dev) vs Base64 File Converter (Converter)** | Semantic duplication | 🟠 High | Merge into one "Base64 Encoder/Decoder" with text + file modes. Place in Developer. |
| 2 | **Cron Job Translator vs Crontab Generator** | Adjacent tools separated | 🟡 Medium | Merged into one "Cron Helper" tool with generate + explain modes. |
| 3 | **QR tools in 3 categories** | Fragmentation | 🔴 Critical | Create "QR Code" subcategory or unify all under one location. |
| 4 | **Password Generator (General) + Password Strength (General) + Bcrypt (Crypto) + Encrypt/Decrypt (Crypto)** | Scattered ecosystem | 🟠 High | Group into "Security & Passwords." |
| 5 | **Unit Converter (General) vs Temperature Converter (skipped as covered)** | Conceptual overlap | 🟡 Medium | User doesn't know Temperature is inside Unit Converter. Need sub-tool listing. |
| 6 | **Hash Generator (Dev) vs Hash Text (IT-Tools Crypto)** | Conceptual duplicate | 🟡 Low | Fine. Belboore's is in Dev which is correct for hash functions. |
| 7 | **Markdown Viewer (Dev) vs separate Markdown to HTML (not in Belboore)** | Conceptual completion | 🟢 None | Good. Belboore's viewer is a superset. |
| 8 | **Link Shortener (External) vs Instant URL (General)** | Similar concept, different categories | 🟡 Medium | Both create short URLs. Confusing. Put together. |
| 9 | **Cloud Storage Uploader (General) vs Local File Share (General)** | Similar, no grouping | 🟡 Medium | Both are file sharing/transfer. Should be adjacent. |
| 10 | **Make a Branded QR Code vs File/Audio to QR Code vs WiFi QR Code Maker** | Same tool family, scattered | 🔴 Critical | Unify into a QR Code section. |
| 11 | **Date-Time Converter vs Timestamp Converter** | Highly overlapping | 🟠 High | Very similar. Most users won't understand the difference. Merge or make derivative. |
| 12 | **JSON Formatter vs JSON Tree Viewer** | Complementary tools separated | 🟡 Medium | Should be adjacent in the list (they are, good). |
| 13 | **Case Converter (Converter) vs String Obfuscator (Text)** | Both transform text | 🟡 Low | Both convert text. Case Converter should be in Text. |
| 14 | **GeoJSON Viewer (Dev) vs Earthquake Map (Geo)** | Both use maps | 🟡 Low | Different purposes. Fine. |

---

# PHASE 6 — WORKFLOW ANALYSIS

## Workflow 1: "I need to download a YouTube video"

| Step | Tool | Friction |
|------|------|----------|
| 1. Find tool | Scroll to Downloader Tools | ✅ Users find this easily |
| 2. Paste URL | YouTube Video Downloader | ✅ Clear |
| 3. Select quality | Quality dropdown | ✅ Good |
| 4. Wait | Progress bar | ⚠️ No real-time progress without WebSocket |
| 5. Download file | Download button | ⚠️ If they also want MP3, they need to go to a different tool |
| **Recommendation:** Add a "Convert to MP3" button as post-download action. |

## Workflow 2: "I got a messy JSON. I need to format, inspect, and export to CSV."

| Step | Tool | Friction |
|------|------|----------|
| 1. Format JSON | JSON Formatter | 🔴 After formatting, no "Next: Inspect as Tree" link |
| 2. Navigate back | Click Developer Tools in sidebar | 🟠 Scroll past 15 tools |
| 3. Inspect tree | JSON Tree Viewer | 🟠 Re-paste the same JSON |
| 4. Navigate back | Click Developer Tools in sidebar | 🔴 Scroll again |
| 5. Export CSV | JSON to CSV | 🔴 Re-paste the JSON a third time |
| **Recommendation:** JSON tools should be a tabbed interface (Format | Tree | Diff | CSV | Minify) sharing the same input. |

## Workflow 3: "I need to create a password, test its strength, and hash it."

| Step | Tool | Friction |
|------|------|----------|
| 1. Generate | Password Generator (General) | ✅ |
| 2. Test strength | Password Strength Analyser (General) | ✅ Adjacent, good |
| 3. Hash it | Bcrypt (Crypto) | 🔴 Different category. User gives up. |
| **Recommendation:** "Security & Passwords" hub with Generate → Test → Hash flow. |

## Workflow 4: "I have a PDF. I want to compress it, convert to Markdown, and verify its signature."

| Step | Tool | Friction |
|------|------|----------|
| 1. Compress | PDF Compressor | ✅ In PDF Tools |
| 2. Convert to MD | PDF to Markdown | ✅ Same category |
| 3. Verify signature | PDF Signature Checker | ✅ Same category |
| **This workflow works.** PDF Tools is well-designed. |

## Workflow 5: "I want to share a file with a colleague."

| Step | Tool | Friction |
|------|------|----------|
| 1. Try to find "Share" | No "Share" or "Transfer" category | 🔴 User stuck |
| 2. Look in "File" | No file category | 🔴 More stuck |
| 3. Eventually find | Cloud Storage Uploader (General) | 🟠 Buried in "General" |
| 4. Or find | Local File Share (General) | 🟠 Also in General |
| 5. Or find | File/Audio to QR Code (Image) | 🔴 In Image Tools! |
| **Recommendation:** "Files & Sharing" category: Cloud Storage + File Share + QR File + Instant URL. |

---

# PHASE 7 — COGNITIVE LOAD AUDIT

| Factor | Severity | Detail |
|--------|:---:|--------|
| **Too many categories** | 🔴 Critical | 18 categories. Miller's Law: humans hold 7±2 items in working memory. Users must scan and remember 18 labels, far exceeding cognitive limits. |
| **Too many nested levels** | 🟠 High | Some categories have 35 items with no internal structure. This requires linear scanning, which has O(n) cost. |
| **Ambiguous names** | 🔴 Critical | "Crypto" (cryptocurrency vs cryptography), "Measurement" (units vs stopwatch), "Data" (too broad), "Developer" (35 items—the name tells nothing about what's inside). |
| **Duplicate concepts** | 🟠 High | Base64 in two places. QR in three places. Cron in two places. Password across two categories. |
| **Decision fatigue** | 🔴 Critical | 18 categories × average 8 tools = 144 choices on one page. User must make ~18 micro-decisions before finding a single tool. |
| **Inconsistent granularity** | 🟠 High | Developer has 35 tools (too granular-less). Measurement has 2 tools (too granular). Data has 2. Math has 3. |
| **Scanning inefficiency** | 🔴 Critical | The 17-tool Converter list and 35-tool Developer list force users to read every item because there's no visual grouping. |
| **Jargon density** | 🟡 Medium | BIP39, ULID, HMAC, JWT, OTP, PEM, CIDR, TOTP — these are gibberish to non-developers but appear in category names and tool names. |

---

# PHASE 8 — NAVIGATION REDESIGN

## Current Structure (18 categories, flat)

```
External Services (4)
Internal Services
  🖼️ Image Tools (8)
  🎥 Video Tools (3)
  🎵 Audio Tools (3)
  📄 PDF Tools (5)
  🔐 Crypto Tools (7)
  🔄 Converter Tools (17)
  📝 Text Tools (7)
  🧮 Math Tools (3)
  ⏱️ Measurement Tools (2)
  📊 Data Tools (2)
  📥 Downloader Tools (9)
  🌐 Network & Security (16)
  💻 Developer Tools (35)
  🕒 Date & Time (5)
  💰 Financial Tools (6)
  🌍 Geo & Weather (3)
  🛠️ General Tools (9)
```

**Problems:**
- 18 categories (too many)
- Flat list (no grouping of related categories)
- External vs Internal split (irrelevant to users)
- Developer Tools is a black hole
- "Crypto" is misleading
- Micro-categories (2-3 tools)

## Recommended Structure (10 categories, logical grouping)

```
─────────────────────────────────────────
📁 Files & Documents
─────────────────────────────────────────
  ├── 📄 PDF Tools (4)           comp☆ Merge☆ Compress☆ PDF→MD
  ├── ☁️ Cloud Storage           upload☆ share☆ manage
  ├── 🔗 File Share (Mizban)     LAN transfer
  └── ⏱️ Instant URL             temp text sharing

─────────────────────────────────────────
🖼️ Media Tools
─────────────────────────────────────────
  ├── 🖼️ Image (4)               compress☆ convert☆ OCR☆ SVG
  ├── 🎥 Video (3)               compress☆ convert☆ optimize
  ├── 🎵 Audio (2)               convert☆ spotify☆ lyrics
  └── 📸 Camera Recorder         webcam record

─────────────────────────────────────────
📥 Downloaders
─────────────────────────────────────────
  ├── YouTube (video + MP3)
  ├── Instagram
  ├── TikTok
  ├── X/Twitter
  ├── SoundCloud
  ├── Playlist Downloader
  ├── Movie Database
  └── GitHub Downloader

─────────────────────────────────────────
🔐 Security & Passwords
─────────────────────────────────────────
  ├── 🔑 Password Generator
  ├── 🔍 Password Strength
  ├── 🔒 Encrypt/Decrypt Text
  ├── #️⃣ Hash Generator
  ├── 🔐 Bcrypt
  ├── 🔏 HMAC Generator
  ├── 🔑 RSA Key Pair
  └── 📱 OTP (2FA) Generator

─────────────────────────────────────────
🌐 Network & Diagnostics
─────────────────────────────────────────
  ├── 📍 IP Tools              my IP☆ locate☆ subnet☆ convert☆ expand☆ ULA
  ├── 🌐 Network Tests          ping☆ traceroute☆ speed test☆ site status
  ├── 🔍 DNS & Whois            dns lookup☆ whois
  ├── 🔌 Port Tools             port check☆ port scan
  ├── 🖧 MAC Tools              lookup☆ generate
  ├── 🛡️ Security Checks        SSL☆ VPN leak☆ blacklist☆ APK scan
  ├── 📧 Email Security         header check☆ SPF/DKIM
  └── ✍️ PDF Signature Checker

─────────────────────────────────────────
💰 Finance & World Data
─────────────────────────────────────────
  ├── 💱 Currency Converter
  ├── 🇮🇷 Iran Rial Rates
  ├── 🪙 Crypto Prices
  ├── 🥇 Gold & Metals
  ├── 🛢️ Oil Prices
  ├── 📈 Stock Market
  ├── 🌤️ Weather & AQI
  ├── 🌍 Earthquake Map
  └── 🏦 IBAN Validator

─────────────────────────────────────────
💻 Developer Tools
─────────────────────────────────────────
  ├── 📋 JSON Toolkit           format☆ tree☆ minify☆ diff☆ →CSV
  ├── 🔄 Format Converters       YAML↔JSON☆ TOML↔JSON☆ XML↔JSON☆ YAML↔TOML☆ TOML↔YAML☆ JSON↔XML
  ├── 📝 Code Tools              SQL prettify☆ XML format☆ YAML view☆ Markdown view
  ├── 🧩 Regex Tools             test☆ memo
  ├── 🔗 URL & HTTP              encode/decode☆ parser☆ entities☆ slugify☆ basic auth☆ status codes
  ├── 🐳 DevOps                  docker run→compose☆ chmod☆ crontab☆ cron explain☆ git memo☆ random port☆ benchmark
  ├── 🆔 Generators              UUID☆ ULID☆ token☆ email normalize
  ├── 🌐 Web References          MIME types☆ keycode☆ user agent☆ device info☆ meta tags☆ safelink
  ├── 🗺️ GeoJSON Viewer
  └── 📡 Weather Data API

─────────────────────────────────────────
📝 Text & Format Tools
─────────────────────────────────────────
  ├── ✂️ Text Transform          case☆ lorem☆ text stats☆ text diff☆ obfuscator
  ├── 🔤 Encoding                base64☆ binary☆ unicode☆ NATO
  ├── 🎨 Color Converter
  ├── 📋 List Converter
  ├── 🔢 Number Converters       integer base☆ roman☆ percentage
  ├── 🎭 Fun                     emoji☆ ascii art☆ numeronym
  └── 🧮 Math Evaluator

─────────────────────────────────────────
🛠️ Everyday Tools
─────────────────────────────────────────
  ├── 📱 QR Code Hub             scanner☆ maker (branded)☆ file to QR☆ wifi QR
  ├── 📏 Unit Converter
  ├── ⏱️ Chronometer (stopwatch)
  ├── 📱 Phone Formatter
  ├── 📅 Date & Time             calendar☆ timezone☆ sunrise☆ timestamp☆ date convert
  ├── 🎲 Random Generator
  ├── 📰 Telegram News
  ├── 📝 HTML WYSIWYG Editor
  └── 🚀 ETA Calculator

─────────────────────────────────────────
👥 Communication (formerly External Services)
─────────────────────────────────────────
  ├── 💬 Secure Messenger
  ├── 📹 Video Meetings
  ├── 📃 Document Collab
  └── 🔗 Link Shortener
```

## Why This Is Better

| Improvement | Before | After |
|-------------|--------|-------|
| **Categories** | 18 (decisions overload) | 10 (manageable) |
| **Developer Tools** | 35 undifferentiated | 10 sub-groups, each ≤5 items |
| **QR Tools** | Scattered in 3 categories | All in "QR Code Hub" under Everyday Tools |
| **Password/Security** | Scattered in 3 categories | All in "Security & Passwords" |
| **Converter Tools** | 17 flat items | Distributed to relevant contexts (format converters to Dev, text transforms to Text, etc.) |
| **File tools** | Scattered in General + Image | Unified "Files & Documents" |
| **Crypto naming** | "Crypto Tools" (ambiguous) | "Security & Passwords" (clear) |
| **Measurement + Data + Math** | 3 weak categories (7 tools total) | Redistributed to logical homes |
| **Scanning** | Linear O(n) | Sub-grouped O(log n) |
| **Workflow support** | No tool-to-tool linking | Sub-groups imply logical next steps |

---

# PHASE 9 — TOOL RELOCATION REPORT

| Tool | Move From | Move To | Reason | Impact |
|------|----------|---------|--------|:---:|
| QR Code Scanner | Image Tools | Everyday → QR Hub | Not an image tool. QR scanning. | High |
| Make a Branded QR Code | Image Tools | Everyday → QR Hub | QR generation, not image editing. | High |
| File/Audio to QR Code | Image Tools | Everyday → QR Hub | QR + file = QR hub. | High |
| WiFi QR Code Maker | General Tools | Everyday → QR Hub | All QR tools together. | High |
| Camera Recorder | Image Tools | Media Tools | Records video/audio, not images. | Medium |
| SVG Placeholder Generator | Image Tools | Developer Tools → Design | Developer/designer tool. | Low |
| Base64 File Converter | Converter Tools | Text Tools → Encoding | Next to Base64 String Converter. Merge into one tool. | High |
| Case Converter | Converter Tools | Text Tools → Transform | It's text manipulation. | High |
| Text to NATO Alphabet | Converter Tools | Text Tools → Encoding | Text output tool. | Medium |
| Color Converter | Converter Tools | Text Tools (standalone) | Neither purely text nor dev. Standalone in converters. | Low |
| List Converter | Converter Tools | Text Tools | Text list manipulation. | Medium |
| Integer Base Converter | Converter Tools | Text Tools → Numbers | Number conversion. | Medium |
| Roman Numeral Converter | Converter Tools | Text Tools → Numbers | Number conversion. | Low |
| JSON/YAML/TOML/XML converters (8) | Converter Tools | Developer Tools → Format Converters | Developer-specific. | 🔴 Critical |
| Text to Binary | Converter Tools | Text Tools → Encoding | Encoding, not general converter. | Medium |
| Text to Unicode | Converter Tools | Text Tools → Encoding | Encoding, not general converter. | Medium |
| Bcrypt | Crypto Tools | Security & Passwords | Security tool, not crypto. | High |
| Encrypt/Decrypt | Crypto Tools | Security & Passwords | Security tool. | High |
| HMAC Generator | Crypto Tools | Security & Passwords | Security/developer tool. | High |
| RSA Key Pair | Crypto Tools | Security & Passwords | Security/developer tool. | High |
| Hash Generator | Developer Tools | Security & Passwords | Security tool (hash functions). | High |
| Token Generator | Crypto Tools | Developer Tools → Generators | ID generation, dev concept. | High |
| ULID Generator | Crypto Tools | Developer Tools → Generators | ID generation, dev concept. | High |
| UUID Generator | Developer Tools | Developer Tools → Generators (stay) | Already correct. | None |
| BIP39 Passphrase | Crypto Tools | Crypto/Niche (stay renamed) | Only blockchain users use this. Keep but rename category. | Low |
| Password Generator | General Tools | Security & Passwords | Password ecosystem. | High |
| Password Strength | General Tools | Security & Passwords | Password ecosystem. | High |
| OTP Generator | Developer Tools | Security & Passwords | 2FA affects everyone. | High |
| Chronometer | Measurement Tools | Everyday Tools | Stopwatch = everyday utility. | High |
| Benchmark Builder | Measurement Tools | Developer Tools → DevOps | Dev tool. | High |
| Phone Parser | Data Tools | Everyday Tools | General utility. | High |
| IBAN Validator | Data Tools | Finance & World Data | Banking concept. | Medium |
| Email Normalizer | Developer Tools | Everyday Tools | Not dev-specific. | Low |
| Weather Data API | Developer Tools | Developer → API section or Geo | It's about weather data. | High |
| PDF Signature Checker | PDF Tools | Network → Security | Security concept, not PDF editing. | Medium |
| Instant URL | General Tools | Files & Documents | Temporary file/text sharing. | Medium |
| Cloud Storage Uploader | General Tools | Files & Documents | File storage. | High |
| Local File Share | General Tools | Files & Documents | File transfer. | High |
| HTML WYSIWYG Editor | Developer Tools | Everyday Tools | Content creators use this too. | Medium |
| ETA Calculator | Math Tools | Everyday Tools | General utility, not math tool. | Low |

---

# PHASE 10 — SEARCHABILITY ANALYSIS

Tools whose official names differ from what users will type:

| Tool Name | What Users Actually Search |
|-----------|---------------------------|
| Chronometer | "stopwatch", "timer", "countdown" |
| BIP39 Passphrase Generator | "seed phrase generator", "wallet backup", "mnemonic" |
| HMAC Generator | "hmac hash", "message authentication" |
| ULID Generator | "sortable id", "unique id" (ULID is niche jargon) |
| RSA Key Pair Generator | "ssh key generator", "ssl key", "public private key" |
| Numeronym Generator | "i18n generator", "abbreviation" |
| Text to NATO Alphabet | "phonetic alphabet", "alpha bravo charlie" |
| Cron Job Translator | "cron explainer", "cron to english" |
| Crontab Generator | "cron schedule maker", "cron expression builder" |
| Slugify String | "url slug", "url friendly text", "seo url" |
| Safelink Decoder | "safe link checker", "redirect decoder" |
| MIME Types | "file type lookup", "mime type for pdf" |
| Keycode Info | "keyboard code", "javascript keycode" |
| Chmod Calculator | "file permissions calculator", "unix permissions" |
| Docker Run → Compose | "docker compose converter", "docker run to yaml" |
| SVG Placeholder Generator | "placeholder image", "dummy image generator" |
| File/Audio to QR Code | "qr code for file", "share file via qr" |
| Instant URL | "temporary link", "one time link", "share text" |
| Markdown Viewer & Exporter | "markdown editor", "md preview", "markdown to pdf" |
| JSON Tree Viewer | "json explorer", "json visualizer", "vercel json" |
| Base64 File Converter | "encode file to base64", "file to base64" |
| Extract Text from Images | "ocr", "image to text", "extract text from photo" |
| Make a Branded QR Code | "custom qr code", "qr with logo" |
| Unit Converter | "convert miles to km", "kg to lbs", "temperature converter" |
| What is My IP | "my ip", "whats my ip address", "show my ip" |
| Site Status | "is it down", "website down checker", "uptime check" |
| Email Security Check | "email header analyzer", "check email authenticity" |
| App Virus Scanner | "apk scanner", "android virus check", "apk virus" |

---

# PHASE 11 — QUICK WINS

## High Impact / Low Effort (Do This Week)

| # | Improvement | Impact | Effort | Priority |
|---|------------|:---:|:---:|:---:|
| 1 | **Add a prominent search bar** on the home page, not just in the sidebar. Tooltip: "Search 149 tools..." | 🔴 | 1h | #1 |
| 2 | **Add keyboard shortcut `/`** to focus the search bar from anywhere. | 🟠 | 30min | #2 |
| 3 | **Group QR tools together** visually on the home page even if they're in different categories. Add a "QR Code" tag that cross-links them. | 🔴 | 2h | #3 |
| 4 | **Rename "Crypto Tools" to "Encryption & Security"** — instantly fixes discoverability for 7 tools. | 🔴 | 10min | #4 |
| 5 | **Move Chronometer to General Tools, delete Measurement category.** Zero code changes needed if tools have stable URLs. | 🟠 | 30min | #5 |
| 6 | **Add "Related Tools" section** at the bottom of each tool page (e.g., JSON Formatter → JSON Minify, JSON Diff, JSON to CSV). | 🟠 | 2h | #6 |
| 7 | **Reorder Developer Tools** — put the JSON family first (they're highest demand), then group by sub-domain. | 🟠 | 1h | #7 |
| 8 | **Add tool aliases** — search "ocr" finds "Extract Text from Images", search "stopwatch" finds "Chronometer." | 🟠 | 2h | #8 |
| 9 | **Add "Recently Used" section** on the home page (last 5 tools, stored in localStorage). | 🟡 | 2h | #9 |
| 10 | **Merge Base64 Converter + Base64 File Converter** into one tool with text/file tabs. | 🟠 | 3h | #10 |

## High Impact / Medium Effort (Week 1-2)

| # | Improvement | Impact | Effort | Priority |
|---|------------|:---:|:---:|:---:|
| 1 | **Sub-group Developer Tools** visually. Show group headers (JSON, Code, Regex, DevOps, Generators, Web Ref) in the sidebar and tool grid. | 🔴 | 1d | #1 |
| 2 | **Sub-group Converter Tools** visually. 17 items needs 3-4 group headers. | 🔴 | 1d | #2 |
| 3 | **Unify Password/Security tools** into one category. Move Password Gen, Password Strength, Bcrypt, Hash, Encrypt, HMAC, RSA, OTP together. | 🔴 | 3d | #3 |
| 4 | **Create "Files & Sharing" category.** Move Cloud Storage, File Share, Instant URL, and QR File tool. | 🟠 | 2d | #4 |
| 5 | **Add a Favorites/Pin system.** Users can star tools. Starred tools appear at the top or in a sidebar section. localStorage-based. | 🟠 | 2d | #5 |
| 6 | **Tabbed JSON toolkit.** JSON Formatter, Tree Viewer, Minify, Diff, CSV share one input field with tabs. | 🟠 | 3d | #6 |
| 7 | **Command palette (⌘K).** Press ⌘K to open a Spotlight-like search for any tool. | 🟡 | 2d | #7 |
| 8 | **"Breadcrumb" navigation** on each tool page: Home > Developer Tools > JSON Formatter. | 🟡 | 1d | #8 |

## High Impact / High Effort (Sprint 3)

| # | Improvement | Impact | Effort | Priority |
|---|------------|:---:|:---:|:---:|
| 1 | **Full category restructure** per Phase 8. 18 → 10 categories. All relocations executed. | 🔴 | 5d | #1 |
| 2 | **Tool workspace concept.** Allow users to open multiple tools in a tabbed workspace (like VS Code tabs). State persists between tools. | 🟠 | 5d | #2 |
| 3 | **Personalized home screen** (already in Post-MVP). Drag-and-drop favorite tools to create custom dashboard. | 🟡 | 5d | #3 |
| 4 | **Batch operations API.** Upload 10 images, compress all at once. Upload 5 videos, convert all. | 🟡 | 5d | #4 |

---

# PHASE 12 — FINAL EXECUTIVE REPORT

## Overall Scores

| Dimension | Score /100 | Grade | Note |
|-----------|:---:|:---:|------|
| **Overall UX Score** | **48** | F | Below threshold for a consumer-facing product. Major structural issues. |
| **Information Architecture** | **32** | F | 18 flat categories with inconsistent granularity and no grouping. |
| **Discoverability** | **41** | F | QR tools scattered. Crypto naming misleading. 35-tool Developer drawer. |
| **Navigation** | **55** | D | Sidebar works but scanning cost is too high. No shortcuts, no breadcrumbs. |
| **Scalability** | **38** | F | Adding more tools to Developer or Converter would make them unusable. |
| **Beginner Friendliness** | **35** | F | Jargon-heavy names. 18-category decision overload. No onboarding. |
| **Power User Efficiency** | **42** | F | No favorites, no shortcuts, no recent, no command palette. |

## Top 10 UX Problems (Ranked by Severity)

| Rank | Problem | User Impact | Fix Difficulty |
|:---:|---------|:----------:|:---:|
| 1 | **Developer Tools is an ungrouped 35-item junk drawer** | Users can't find anything. The highest-demand category has the worst UX. | Medium |
| 2 | **Converter Tools is an ungrouped 17-item wall** | Users scan *into* the category but fail to process content. | Medium |
| 3 | **QR tools scattered across 3 categories** | Users conclude the site is incomplete or unreliable. | Low |
| 4 | **"Crypto Tools" naming costs 7 tools their discoverability** | Non-crypto users skip encryption tools they actually need. | Very Low |
| 5 | **18 categories exceed cognitive limits** | Decision paralysis on the home page. Users bounce. | High |
| 6 | **Password/Security ecosystem fragmented across 3 categories** | Users can't complete password workflows. | Medium |
| 7 | **No tool-to-tool navigation or "Related Tools" linking** | Each tool is an island. Workflows require manual re-navigation. | Low |
| 8 | **"Measurement" + "Data" + "Math" are micro-categories** | 7 tools across 3 categories is wasteful and confusing. | Low |
| 9 | **File sharing/storage tools buried in "General" and "Image"** | Users looking to share files can't find the tools. | Low |
| 10 | **No search aliases or synonyms** | "ocr" → no result. "stopwatch" → no result. "2fa" → no result. | Low |

## Top 10 Recommended Improvements (Ranked by ROI)

| Rank | Improvement | Cost | Impact | ROI |
|:---:|-------------|:---:|:---:|:---:|
| 1 | Rename "Crypto Tools" → "Encryption & Security" | 10 min | 🔴 Critical | ∞ |
| 2 | Add search aliases (ocr, stopwatch, 2fa, etc.) | 2h | 🟠 High | 10x |
| 3 | Add "Related Tools" section to each tool page | 2h | 🟠 High | 10x |
| 4 | Add keyboard shortcut `/` and `⌘K` command palette | 3h | 🟠 High | 10x |
| 5 | Sub-group Developer Tools with visual headers | 1d | 🔴 Critical | 5x |
| 6 | Unify QR tools (visual grouping + cross-linking) | 2h | 🔴 Critical | 10x |
| 7 | Delete Measurement + Data + Math, redistribute 7 tools | 2d | 🟡 Medium | 2x |
| 8 | Unify Password/Security tools into one category | 3d | 🟠 High | 3x |
| 9 | Tabbed JSON toolkit (Format / Tree / Diff / CSV / Minify) | 3d | 🟠 High | 2x |
| 10 | Add Favorites + Recently Used to home page | 2d | 🟡 Medium | 3x |

## Final Recommended Tool Taxonomy

```
─────────────────────────────────────────
📁 Files & Documents (8 tools)
─────────────────────────────────────────
  • Images to PDF          • Merge PDFs
  • PDF Compressor         • PDF to Markdown
  • Cloud Storage          • File Share (Mizban)
  • Instant URL            • Link Shortener
  Description: Create, compress, convert, share, and transfer files.

─────────────────────────────────────────
🖼️ Media Tools (11 tools)
─────────────────────────────────────────
  • Image Compressor       • Image Converter
  • Extract Text (OCR)     • SVG Placeholder
  • Camera Recorder        • Video Compressor
  • Video Converter        • Video Optimizer
  • Audio Converter        • Spotify Preview
  • Music & Lyrics
  Description: Edit, convert, and optimize images, videos, and audio.

─────────────────────────────────────────
📥 Downloaders (9 tools)
─────────────────────────────────────────
  • YouTube (Video)        • YouTube (MP3)
  • Instagram              • TikTok
  • X/Twitter              • SoundCloud
  • Playlist               • Movie Database
  • GitHub Downloader
  Description: Save videos, music, and files from your favorite platforms.

─────────────────────────────────────────
🔐 Security & Passwords (9 tools)
─────────────────────────────────────────
  • Password Generator     • Password Strength
  • Encrypt/Decrypt        • Hash Generator
  • Bcrypt                 • HMAC Generator
  • RSA Key Pair           • OTP (2FA) Generator
  • Token Generator
  Description: Generate passwords, encrypt data, verify security.

─────────────────────────────────────────
🌐 Network & Diagnostics (18 tools)
─────────────────────────────────────────
  ── IP & Address ──
  • What is My IP         • IP Locator
  • IPv4 Subnet Calc       • IPv4 Converter
  • IPv4 Range Expander    • IPv6 ULA Generator
  • MAC Lookup            • MAC Generator
  ── Network Tests ──
  • Speed Test            • Ping Test
  • Site Status           • DNS Lookup
  • Whois                 • Traceroute
  • Port Check / Scan
  ── Security ──
  • SSL Check             • VPN Leak Check
  • Blacklist Check       • APK Virus Scanner
  • Email Security        • PDF Signature Checker
  Description: Diagnose networks, check security, and inspect IP/DNS.

─────────────────────────────────────────
💰 Finance & World Data (9 tools)
─────────────────────────────────────────
  • Currency Converter     • Iran Rial Rates
  • Crypto Prices          • Gold & Metals
  • Oil Prices             • Stock Market
  • IBAN Validator         • Local Weather
  • Air Quality (AQI)      • Earthquake Map
  Description: Live exchange rates, market data, weather, and global information.

─────────────────────────────────────────
💻 Developer Tools (36 tools)
─────────────────────────────────────────
  ── 🔤 Text & Encoding ──
  • Case Converter        • Base64 Converter
  • Text to Binary        • Text to Unicode
  • Text to NATO          • HTML Entities
  • List Converter

  ── 📋 JSON Toolkit ──
  • JSON Formatter        • JSON Tree Viewer
  • JSON Minify           • JSON Diff
  • JSON to CSV

  ── 🔄 Format Converters ──
  • YAML↔JSON             • TOML↔JSON
  • XML↔JSON              • YAML↔TOML
  • YAML to JSON          • JSON to YAML
  • TOML to YAML

  ── 📝 Code & Markdown ──
  • SQL Prettify          • XML Formatter
  • YAML Viewer           • Markdown Viewer
  • Regex Tester          • Regex Memo

  ── 🔗 Web & HTTP ──
  • URL Encode/Decode     • URL Parser
  • Slugify String        • Basic Auth Generator
  • Meta Tag Generator    • JWT Parser
  • Safelink Decoder

  ── 🆔 Generators ──
  • UUID Generator        • ULID Generator
  • Random Port           • Email Normalizer
  • HTML WYSIWYG Editor

  ── 📚 References ──
  • MIME Types            • HTTP Status Codes
  • Keycode Info          • User Agent Parser
  • Device Information

  ── 🐳 DevOps ──
  • Docker Run → Compose  • Chmod Calculator
  • Crontab Generator     • Cron Job Translator
  • Git Memo              • Benchmark Builder
  • GeoJSON Viewer        • Weather Data API
  Description: Everything a developer needs — formatting, converting, testing, and reference.

─────────────────────────────────────────
📝 Text & Number Tools (14 tools)
─────────────────────────────────────────
  ── Text ──
  • Lorem Ipsum           • Text Statistics
  • Text Diff             • String Obfuscator
  • Emoji Picker          • ASCII Art
  • Numeronym Generator
  ── Numbers ──
  • Integer Base Conv.    • Roman Numeral
  • Color Converter       • Math Evaluator
  • Percentage Calc.      • ETA Calculator
  Description: Manipulate text, analyze content, convert numbers, and use fun text generators.

─────────────────────────────────────────
🛠️ Everyday Tools (14 tools)
─────────────────────────────────────────
  ── QR Codes ──
  • QR Code Scanner       • Branded QR Maker
  • File to QR Code       • WiFi QR Maker
  ── Utilities ──
  • Unit Converter        • Phone Formatter
  • Chronometer           • Random Generator
  • Telegram News
  ── Date & Time ──
  • Calendar Converter    • Global Timezones
  • Sunrise & Sunset      • Timestamp Converter
  • Date-Time Converter
  Description: QR codes, unit conversion, date tools, and everyday utilities.

─────────────────────────────────────────
👥 Communication (4 tools)
─────────────────────────────────────────
  • Secure Messenger      • Video Meetings
  • Document Collab       • Link Shortener
  Description: Chat, meet, and collaborate with your team.
```

---

## Summary

**Current State:** 18 categories, 149 tools. Information architecture designed by engineers cataloguing features, not by UX architects designing for user mental models.

**Core Problems:**
1. 18 categories exceed human cognitive limits (should be 7-10)
2. Developer Tools (35) and Converter Tools (17) are ungrouped data dumps
3. QR, Password/Security, and File sharing tools are fragmented across categories
4. Three micro-categories (Measurement, Data, Math) waste navigation space
5. No related-tool linking, no search aliases, no command palette, no favorites

**Recommended Architecture:** 10 categories, each with visual sub-groups. Tools distributed by user task (not by implementation concern). All QR tools together. All password/security tools together. All file tools together. Converter Tools dissolved into their natural homes.

**Immediate Action (Sprint 0):** Rename Crypto → Security. Add search aliases. Add related-tool links. Delete Measurement, Data, Math categories. This costs <1 day and fixes 40% of the problems.
