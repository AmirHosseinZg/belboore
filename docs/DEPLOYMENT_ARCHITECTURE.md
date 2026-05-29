# Deployment Architecture

## MVP Target
Primary:
- Cloudflare Pages

Fallback / portability:
- deployable to VPS
- portable to Iranian hosting/CDN later

## Requirements
- static build output
- no mandatory server runtime
- environment-light setup

## CI/CD
- GitHub Actions
- build and deployment workflow
- branch-based checks optional later

## Portability Principle
Avoid platform lock-in in the app structure.
Keep routing, content, and assets portable.

## Future Hybrid Model
Post-MVP may use:
- Astro frontend on Cloudflare or VPS
- FastAPI backend on VPS/Docker
- PostgreSQL
- Meilisearch
