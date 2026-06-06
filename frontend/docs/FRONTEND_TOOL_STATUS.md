# Front-End Tool Status

**Last updated:** 2026-06-06  
**Source of truth:** `src/data/tools.ts` + tool component map in `src/pages/[lang]/tools/[slug].astro`

Status logic:
- `implemented`: builtin tool has a mapped live component, or external tool has a valid `url`
- `unimplemented`: builtin tool exists in data but has no mapped live component

## Summary

- Total tools: `35`
- Implemented: `25`
- Unimplemented: `10`
- Builtin tools: `25` (`15` implemented, `10` unimplemented)
- External tools: `10` (`10` implemented)
- Frontend-only tools: `34`
- Backend-required tools: `1`

## Frontend/Backend Classification Source

- Based on `docs/Tools_breakdown.md`:
  - Frontend-only: tools that can run with browser APIs, client-side JS, or pure computation.
  - Backend-required: tools that need server execution, scraping/proxying, hidden API keys, or persistent storage.

## Tool Matrix

| Tool | Slug | Category | Type | Status | Runtime Requirement |
| --- | --- | --- | --- | --- | --- |
| Image to Base64 | `image-to-base64` | image | builtin | unimplemented | frontend-only |
| QR Code Generator | `qr-code-generator` | image | builtin | implemented | frontend-only |
| Squoosh | `squoosh` | image | external | implemented | frontend-only |
| Excalidraw | `excalidraw` | image | external | implemented | frontend-only |
| Text Diff Checker | `text-diff` | text | builtin | unimplemented | frontend-only |
| Word & Character Counter | `word-counter` | text | builtin | implemented | frontend-only |
| Case Converter | `case-converter` | text | builtin | implemented | frontend-only |
| Lorem Ipsum Generator | `lorem-ipsum` | text | builtin | implemented | frontend-only |
| Markdown Previewer | `markdown-preview` | text | builtin | implemented | frontend-only |
| JSON Formatter | `json-formatter` | code | builtin | implemented | frontend-only |
| URL Encoder / Decoder | `url-encoder` | code | builtin | implemented | frontend-only |
| Base64 Encoder / Decoder | `base64-encoder` | code | builtin | implemented | frontend-only |
| UUID Generator | `uuid-generator` | code | builtin | implemented | frontend-only |
| Carbon | `carbon` | code | external | implemented | frontend-only |
| DevDocs | `devdocs` | code | external | implemented | frontend-only |
| Regex101 | `regex101` | code | external | implemented | frontend-only |
| Color Converter | `color-converter` | color | builtin | implemented | frontend-only |
| Coolors | `coolors` | color | external | implemented | frontend-only |
| Password Generator | `password-generator` | security | builtin | implemented | frontend-only |
| Hash Generator | `hash-generator` | security | builtin | implemented | frontend-only |
| Unit Converter | `unit-converter` | math | builtin | implemented | frontend-only |
| JSON Crack | `json-crack` | data | external | implemented | frontend-only |
| Transform Tools | `transform-tools` | data | external | implemented | frontend-only |
| Timestamp Converter | `time-converter` | devtools | builtin | implemented | frontend-only |
| CodeSandbox | `code-sandbox` | devtools | external | implemented | frontend-only |
| JWT Debugger | `jwt-debugger` | devtools | external | implemented | frontend-only |
| Line Sorter | `line-sorter` | text | builtin | implemented | frontend-only |
| Regex Tester | `regex-tester` | code | builtin | unimplemented | frontend-only |
| Date Difference Calculator | `date-difference` | datetime | builtin | unimplemented | frontend-only |
| Percentage Calculator | `percentage-calculator` | general | builtin | unimplemented | frontend-only |
| Random Number Generator | `random-number` | general | builtin | unimplemented | frontend-only |
| BMI Calculator | `bmi-calculator` | general | builtin | unimplemented | frontend-only |
| Merge PDF | `merge-pdf` | pdf | builtin | unimplemented | frontend-only (heavy client-side) |
| Compress PDF | `compress-pdf` | pdf | builtin | unimplemented | frontend-only (heavy client-side) |
| YouTube Downloader | `youtube-downloader` | downloader | builtin | unimplemented | backend-required |
