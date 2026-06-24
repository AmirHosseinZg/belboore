# Tools Breakdown — Updated for 10-Category UX-Optimized Structure

## Tool Classification by Backend Dependencies

### Tier 0 — Pure Client-Side (Zero Backend Required)
*These run entirely in the browser via JS/WASM/Web APIs. Can be built in parallel by frontend with zero API dependencies.*

| Category | Tools |
|----------|-------|
| 📁 Files & Documents | — (all need backend: PDF processing, sharing, storage) |
| 🖼️ Media Tools | Image Converter, SVG Placeholder Generator |
| 📥 Downloaders | — (all need yt-dlp backend) |
| 🔐 Security & Passwords | Password Generator, Password Strength Analyser, Hash Generator, Bcrypt, HMAC Generator, RSA Key Pair Generator, Encrypt/Decrypt Text, OTP Code Generator (2FA) |
| 🌐 Network & Diagnostics | IPv4 Subnet Calculator, IPv4 Address Converter, IPv4 Range Expander, IPv6 ULA Generator, MAC Address Generator (math/logic only), HTTP Status Codes |
| 💰 Finance & World Data | — (all need live API proxies) |
| 💻 Developer Tools | JSON Formatter, JSON Tree Viewer, JSON Minify, JSON Diff, JSON to CSV, Case Converter, HTML Entities, Text to Binary, Text to Unicode, Text to NATO Alphabet, List Converter, YAML ↔ JSON, YAML ↔ TOML, JSON ↔ TOML, XML ↔ JSON, SQL Prettify, XML Formatter, YAML Viewer, Markdown Viewer & Exporter, Regex Tester, Regex Memo, Base64 Encoder/Decoder, URL Encode/Decode, URL Parser, Slugify String, JWT Parser, Basic Auth Generator, Meta Tag Generator, Safelink Decoder, UUID Generator, ULID Generator, BIP39 Passphrase Generator, Random Port Generator, Email Normalizer, Chmod Calculator, Cron Job Translator, Crontab Generator, Git Memo, GeoJSON Viewer, Keycode Info, User Agent Parser, Device Information, MIME Types |
| 📝 Text & Number Tools | Lorem Ipsum Generator, Text Statistics, Text Diff, String Obfuscator, Emoji Picker, ASCII Art Text Generator, Numeronym Generator, Integer Base Converter, Roman Numeral Converter, Color Converter, Math Evaluator, Percentage Calculator, ETA Calculator |
| 🛠️ Everyday Tools | QR Code Scanner (client-side WASM), WiFi QR Code Maker, Make a Branded QR Code, Unit Converter, Calendar Converter, Timestamp Converter, Date-Time Converter, Chronometer, Phone Parser/Formatter, HTML WYSIWYG Editor, Random Generator |
| 👥 Communication | — (partner integrations, no internal backend) |

**Tier 0 total: ~88 tools** — majority of the platform, built rapidly using the generic Tool framework.

---

### Tier 1 — API Proxy (Thin Backend)
*Backend acts as thin proxy to external APIs with Redis caching. Lightest backend work.*

| Category | Tools | Backend Owner |
|----------|-------|:---:|
| 🖼️ Media Tools | Spotify Preview, Music & Lyrics Database | BE2 |
| 💰 Finance & World Data | Currency Converter, Iran Rial Rates, Crypto Prices, Gold & Precious Metals, Oil Prices, Stock Market Overview, IBAN Validator, Local Weather, Air Quality Check, Earthquake Map | BE2 |
| 🕒 Date & Time (in Everyday) | Global Timezones, Sunrise & Sunset | BE2 |
| 💻 Developer Tools | Weather Data API | BE2 |
| 🛠️ Everyday Tools | Telegram News | BE2 |
| 📁 Files & Documents | Link Shortener | BE1 |

**Tier 1 total: ~18 tools**

---

### Tier 2 — Server Processing (Heavy Backend)
*Heavy lifting: FFmpeg, OCR, PDF libraries, download engines. Most complex tier.*

| Category | Tools | Backend Owner |
|----------|-------|:---:|
| 🖼️ Media Tools | Image Compressor, Extract Text from Images (OCR), Video Compressor, Video Converter, Video Optimizer, Audio Converter, Camera Recorder (processing) | BE1 |
| 📁 Files & Documents | Images to PDF, Merge PDFs, PDF Compressor, PDF to Markdown, Cloud Storage Uploader, Local File Share (Mizban), Instant URL | BE1 |
| 📥 Downloaders | All 9: YouTube Video, YouTube to MP3, Instagram, TikTok, X/Twitter, SoundCloud, Playlist, Movie Database, GitHub | BE1 |
| 🌐 Network & Diagnostics | PDF Signature Checker | BE1 |
| 🛠️ Everyday Tools | File/Audio to QR Code (hosted URL mode) | BE1 |
| 💻 Developer Tools | Benchmark Builder, Docker Run → Compose (validation) | BE1 |

**Tier 2 total: ~32 tools**

---

### Tier 3 — Real Infrastructure (Dedicated Backend)
*Unique server-side capabilities: network access, security tooling, real-time data.*

| Category | Tools | Backend Owner |
|----------|-------|:---:|
| 🌐 Network & Diagnostics | What is My IP, Speed Test, Ping Test, Traceroute, Site Status, DNS Lookup, Whois Lookup, Port Check, Port Scan, HTTP Headers Inspector, SSL Security Check, VPN Leak Check, Blacklist Check, App Virus Scanner (APK), Email Security Check, MAC Address Lookup | BE2 |
| 📁 Files & Documents | Link Shortener (DB-driven) | BE1 |

**Tier 3 total: ~16 tools**

---

## Backend Workload Summary

| Dev | Tier 1 (Light) | Tier 2 (Heavy) | Tier 3 (Infra) | Total Tools | Complexity Score |
|-----|:---:|:---:|:---:|:---:|:---:|
| **BE1** | 1 (Link Shortener) | ~28 (media + PDF + downloads + QR + files) | 0 | ~29 | 75%  |
| **BE2** | ~20 (finance + weather + Spotify + news + date APIs) | 0 | ~15 (network + security scans) | ~35 | 25%  |
| **Client-Side** | — | — | — | ~88 | 0% |

**BE1 handles all heavy media/PDF/download processing (high per-tool complexity, fewer tools). BE2 handles many lightweight API proxies + network diagnostics (lower per-tool complexity, more tools). Workload is balanced by complexity, not raw tool count.**

---

## Frontend Workload by Category

| Category | Tools | Sub-Groups | Complexity |
|----------|:---:|----------|:---:|
| 📁 Files & Documents | 8 | Flat | Low |
| 🖼️ Media Tools | 11 | 3 sub-groups | Medium |
| 📥 Downloaders | 9 | Flat | Medium |
| 🔐 Security & Passwords | 9 | Flat | Low |
| 🌐 Network & Diagnostics | 22 | 3 sub-groups | Medium |
| 💰 Finance & World Data | 10 | 2 sub-groups | Medium |
| 💻 Developer Tools | 49 | 8 sub-groups | High |
| 📝 Text & Number Tools | 13 | 2 sub-groups | Low |
| 🛠️ Everyday Tools | 16 | 3 sub-groups | Medium |
| 👥 Communication | 3 | Flat | Low |
| **Total** | **~150** | | |

---

## Key Architecture Decisions from Restructure

| Decision | Impact |
|----------|--------|
| **Security & Passwords** unified category | Password Gen, Strength, Hash, Bcrypt, HMAC, RSA, Encrypt, OTP, Token are now one backend-friendly group for auth-related services |
| **Format converters consolidated** (8→4 bidirectional) | Reduced page count. Each bidirectional tool needs a "swap direction" toggle in the UI |
| **Base64 Encoder/Decoder merged** (text+file tabs) | Single tool page instead of two. Need tabbed input/output component |
| **QR Code Hub** under Everyday Tools | All 4 QR tools co-located. Cross-linking between them improves discoverability |
| **Advanced Net Tools unbundled** | DNS, Whois, Port Check, Port Scan, HTTP Headers now separate pages. Backend endpoints remain the same |
| **Finance & World Data merged** | Previously separate categories now share a category. Backend APIs unchanged, frontend needs unified category page |
| **Media Tools merged** (Image+Video+Audio) | Single category with 3 sub-groups. Backend services remain separate (image processor, video processor, audio processor) |
