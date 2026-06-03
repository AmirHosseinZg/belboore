# CONTENT EXPANSION PLAN — BELBOORE MVP

## Category Expansion

### Retained existing categories (8)
1. Image Tools
2. Text Tools
3. Code Tools
4. Color Tools
5. Security Tools
6. Math Tools
7. Data Tools
8. Developer Tools

### New categories to add (8)
9. **Date & Time Tools** — timestamp converter, date difference, countdown timer
10. **General Tools** — percentage calculator, random number/picker, BMI, age, tip
11. **PDF Tools** — merge, compress, convert (mostly coming-soon for SEO)
12. **Downloader Tools** — YouTube, Instagram (coming-soon for SEO)
13. **Finance Tools** — loan/EMI calculator, currency converter (coming-soon + live)
14. **Productivity Tools** — pomodoro timer, note pad (live + coming-soon)
15. **Geo Tools** — coordinate converter, distance calculator
16. **Unit Converters** — split from Math into own category, expand

### Taxonomy organization
- Categories ordered by SEO priority
- Each category gets bilingual name, description, icon
- Tool count displayed
- Featured tools per category
- Category-level SEO intro copy
- Internal linking between related categories

---

## Tool Inventory Expansion

### Target: 50+ tools (from current 27)

**Phase 1 — Live frontend tools to implement now:**
Priority tools for immediate implementation:
1. JSON Formatter/Validator (already placeholder)
2. Base64 Encode/Decode
3. URL Encode/Decode
4. UUID Generator
5. Password Generator
6. Hash Generator (MD5, SHA family via Web Crypto)
7. Text Case Converter
8. Word & Character Counter
9. Lorem Ipsum Generator
10. Line Sorter / Remove Duplicates
11. Color Converter (HEX↔RGB↔HSL)
12. Markdown Previewer
13. Timestamp Converter
14. Unit Converter
15. Text Diff Checker
16. Regex Tester
17. Image to Base64
18. QR Code Generator
19. Image Compressor
20. Image Resizer
21. Image Converter
22. Slug Generator
23. HTML Escape/Unescape
24. CSV to JSON / JSON to CSV
25. HTML Previewer
26. Query String Parser
27. Percentage Calculator
28. Random Number Generator
29. Random Picker
30. BMI Calculator
31. Age Calculator
32. Tip Calculator
33. Date Difference Calculator
34. Countdown Timer
35. Color Picker
36. Favicon Generator

**Phase 2 — Coming-soon (SEO landing pages):**
1. Merge PDF
2. Compress PDF
3. PDF to JPG
4. YouTube Downloader
5. Instagram Downloader
6. Currency Converter
7. Loan/EMI Calculator
8. Pomodoro Timer
9. Coordinate Converter
10. Distance Calculator

---

## Tool Metadata Expansion

Each existing and new tool needs:
- `seoKeywords` in both languages
- `faqItems` array for FAQ schema
- `useCases` for richer landing page copy
- `alternatives` for external tool pages
- `relatedSlugs` for internal linking

---

## Content Strategy Per Tool Page

Every built-in tool page must include:
1. **SEO title block** — tool name + primary keyword
2. **Introduction** — what the tool does, why use it (2-3 sentences)
3. **Interactive workspace** — the actual tool
4. **How to use** — step-by-step instructions
5. **Privacy note** — "processed locally, never uploaded"
6. **FAQ section** — 3-5 common questions with answers
7. **Related tools** — cross-links to similar tools
8. **Breadcrumbs** — full path for SEO

### FAQ Template (per tool)
```json
[
  { "q": "Is [tool] free?", "a": "Yes, completely free. No accounts, no payments." },
  { "q": "Is my data safe?", "a": "Yes. All processing happens in your browser. Nothing is uploaded to any server." },
  { "q": "Does it work on mobile?", "a": "Yes, Belboore tools work on all modern devices and browsers." },
  { "q": "Can I use it offline?", "a": "Once loaded, most Belboore tools work without an internet connection." }
]
```
