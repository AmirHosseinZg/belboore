# Content Model

## Tool Entity
Each tool record should support:

- `id`
- `slug`
- `type` = `built-in | redirect`
- `status` = `live | coming-soon`
- `categorySlug`
- `subcategory`
- `fa`
  - `title`
  - `shortDescription`
  - `longDescription`
  - `seoTitle`
  - `seoDescription`
  - `faq`
  - `howTo`
- `en`
  - `title`
  - `shortDescription`
  - `longDescription`
  - `seoTitle`
  - `seoDescription`
  - `faq`
  - `howTo`
- `tags`
- `searchTerms`
- `featured`
- `sponsored`
- `showExternalBadge`
- `icon`
- `logo`
- `relatedToolSlugs`
- `outboundUrl`
- `privacyNote`
- `updatedAt`

## Category Entity
- `slug`
- `icon`
- `fa`
  - `title`
  - `description`
  - `seoTitle`
  - `seoDescription`
- `en`
  - `title`
  - `description`
  - `seoTitle`
  - `seoDescription`
- `featuredToolSlugs`
- `status`

## Collection Entity
Used for curated sections:
- `slug`
- `faTitle`
- `enTitle`
- `description`
- `toolSlugs`

## Legal Page Entity
- `slug`
- `faTitle`
- `enTitle`
- `faContent`
- `enContent`

## Storage Recommendation for MVP
Use file-based typed content:
- TypeScript objects or JSON content registry
- strong typing
- no database dependency
- easy for agent editing
