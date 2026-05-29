# Technical Architecture

## MVP Stack
- Astro
- TypeScript
- static content registry
- lightweight client-side interactivity
- CSS variables / global token system

## Why Astro
- excellent SEO
- static-first
- fast page generation
- component flexibility
- good for content-heavy tool architecture

## Rendering Strategy
- static prerender for core pages
- client-side hydration only for interactive tool interfaces and search where necessary

## Data Strategy
- file-based content
- typed records
- no DB dependency
- no backend dependency

## Search Strategy
- client-side static search index
- generated from tool/category content
- support title, description, tags, synonyms

## Tool Implementation Strategy
### Built-in tools
- isolated client-side tool modules
- no shared heavy runtime unless useful
- graceful file handling
- privacy-conscious messaging possible later

### Redirect tools
- first-class content pages
- CTA button to external site
- new-tab open behavior
- optional external badge flag

## Scalability Notes
The content model and route architecture should make later migration easy for:
- FastAPI APIs
- PostgreSQL
- Meilisearch
- analytics ingestion
- admin panel
