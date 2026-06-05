# Front-End Tool Status

This document lists every tool currently defined in `src/data/tools.ts` and its front-end availability status.

Status criteria:

- `implemented`: External tools with a configured URL, or built-in tools registered in `toolComponentMap` in `src/pages/[lang]/tools/[slug].astro`.
- `unimplemented`: Built-in tools that exist in the data layer but do not yet have a registered live tool component.

Summary:

- Total tools: 35
- Implemented: 25
- Unimplemented: 10

UI last updated date criteria:

- Built-in tools use the latest commit date for their registered Astro component.
- External tools use the latest shared tool-card/tool-detail UI update date.
- Unimplemented placeholders use `N/A`.

| Tool | Slug | Category | Type | Status | UI Last Updated |
| --- | --- | --- | --- | --- | --- |
| Image to Base64 | `image-to-base64` | image | builtin | unimplemented | N/A |
| QR Code Generator | `qr-code-generator` | image | builtin | implemented | 2026-06-06 |
| Squoosh | `squoosh` | image | external | implemented | 2026-06-06 |
| Excalidraw | `excalidraw` | image | external | implemented | 2026-06-06 |
| Text Diff Checker | `text-diff` | text | builtin | unimplemented | N/A |
| Word & Character Counter | `word-counter` | text | builtin | implemented | 2026-06-03 |
| Case Converter | `case-converter` | text | builtin | implemented | 2026-06-03 |
| Lorem Ipsum Generator | `lorem-ipsum` | text | builtin | implemented | 2026-06-03 |
| Markdown Previewer | `markdown-preview` | text | builtin | implemented | 2026-06-06 |
| JSON Formatter | `json-formatter` | code | builtin | implemented | 2026-06-03 |
| URL Encoder / Decoder | `url-encoder` | code | builtin | implemented | 2026-06-03 |
| Base64 Encoder / Decoder | `base64-encoder` | code | builtin | implemented | 2026-06-03 |
| UUID Generator | `uuid-generator` | code | builtin | implemented | 2026-06-03 |
| Carbon | `carbon` | code | external | implemented | 2026-06-06 |
| DevDocs | `devdocs` | code | external | implemented | 2026-06-06 |
| Regex101 | `regex101` | code | external | implemented | 2026-06-06 |
| Color Converter | `color-converter` | color | builtin | implemented | 2026-06-03 |
| Coolors | `coolors` | color | external | implemented | 2026-06-06 |
| Password Generator | `password-generator` | security | builtin | implemented | 2026-06-03 |
| Hash Generator | `hash-generator` | security | builtin | implemented | 2026-06-03 |
| Unit Converter | `unit-converter` | math | builtin | implemented | 2026-06-03 |
| JSON Crack | `json-crack` | data | external | implemented | 2026-06-06 |
| Transform Tools | `transform-tools` | data | external | implemented | 2026-06-06 |
| Timestamp Converter | `time-converter` | devtools | builtin | implemented | 2026-06-03 |
| CodeSandbox | `code-sandbox` | devtools | external | implemented | 2026-06-06 |
| JWT Debugger | `jwt-debugger` | devtools | external | implemented | 2026-06-06 |
| Line Sorter | `line-sorter` | text | builtin | implemented | 2026-06-03 |
| Regex Tester | `regex-tester` | code | builtin | unimplemented | N/A |
| Date Difference Calculator | `date-difference` | datetime | builtin | unimplemented | N/A |
| Percentage Calculator | `percentage-calculator` | general | builtin | unimplemented | N/A |
| Random Number Generator | `random-number` | general | builtin | unimplemented | N/A |
| BMI Calculator | `bmi-calculator` | general | builtin | unimplemented | N/A |
| Merge PDF | `merge-pdf` | pdf | builtin | unimplemented | N/A |
| Compress PDF | `compress-pdf` | pdf | builtin | unimplemented | N/A |
| YouTube Downloader | `youtube-downloader` | downloader | builtin | unimplemented | N/A |
