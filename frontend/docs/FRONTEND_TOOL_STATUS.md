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

## Tool Matrix

| Tool | Slug | Category | Type | Status |
| --- | --- | --- | --- | --- |
| Image to Base64 | `image-to-base64` | image | builtin | unimplemented |
| QR Code Generator | `qr-code-generator` | image | builtin | implemented |
| Squoosh | `squoosh` | image | external | implemented |
| Excalidraw | `excalidraw` | image | external | implemented |
| Text Diff Checker | `text-diff` | text | builtin | unimplemented |
| Word & Character Counter | `word-counter` | text | builtin | implemented |
| Case Converter | `case-converter` | text | builtin | implemented |
| Lorem Ipsum Generator | `lorem-ipsum` | text | builtin | implemented |
| Markdown Previewer | `markdown-preview` | text | builtin | implemented |
| JSON Formatter | `json-formatter` | code | builtin | implemented |
| URL Encoder / Decoder | `url-encoder` | code | builtin | implemented |
| Base64 Encoder / Decoder | `base64-encoder` | code | builtin | implemented |
| UUID Generator | `uuid-generator` | code | builtin | implemented |
| Carbon | `carbon` | code | external | implemented |
| DevDocs | `devdocs` | code | external | implemented |
| Regex101 | `regex101` | code | external | implemented |
| Color Converter | `color-converter` | color | builtin | implemented |
| Coolors | `coolors` | color | external | implemented |
| Password Generator | `password-generator` | security | builtin | implemented |
| Hash Generator | `hash-generator` | security | builtin | implemented |
| Unit Converter | `unit-converter` | math | builtin | implemented |
| JSON Crack | `json-crack` | data | external | implemented |
| Transform Tools | `transform-tools` | data | external | implemented |
| Timestamp Converter | `time-converter` | devtools | builtin | implemented |
| CodeSandbox | `code-sandbox` | devtools | external | implemented |
| JWT Debugger | `jwt-debugger` | devtools | external | implemented |
| Line Sorter | `line-sorter` | text | builtin | implemented |
| Regex Tester | `regex-tester` | code | builtin | unimplemented |
| Date Difference Calculator | `date-difference` | datetime | builtin | unimplemented |
| Percentage Calculator | `percentage-calculator` | general | builtin | unimplemented |
| Random Number Generator | `random-number` | general | builtin | unimplemented |
| BMI Calculator | `bmi-calculator` | general | builtin | unimplemented |
| Merge PDF | `merge-pdf` | pdf | builtin | unimplemented |
| Compress PDF | `compress-pdf` | pdf | builtin | unimplemented |
| YouTube Downloader | `youtube-downloader` | downloader | builtin | unimplemented |
