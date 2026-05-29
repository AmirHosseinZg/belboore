# I18N Strategy

## Supported Languages
- Persian (`fa`)
- English (`en`)

## Route Strategy
- `/fa/...`
- `/en/...`

## Directionality
- Persian: RTL
- English: LTR

## Default Language Logic
1. saved user preference if present
2. current route if explicit
3. browser language
4. fallback to Persian

## Translation Policy
- 1:1 content structure across languages
- no missing page equivalents in MVP
- metadata translated per page
- schema and structured content aligned with page language

## UX Rules
- language switch must be visible
- switching language should preserve equivalent destination where possible
- nav labels and placeholders localized
- typography tuned for both scripts

## Technical Rules
- avoid mixing strings inline in components
- centralize UI copy in i18n dictionaries
- tool content stored in bilingual records
