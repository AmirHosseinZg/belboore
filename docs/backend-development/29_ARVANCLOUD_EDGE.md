# Step 29: ArvanCloud Edge, Trusted Real-IP & Origin Protection

**Phase:** E — Production  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/29-arvancloud-edge`

## Purpose
Put ArvanCloud in front without breaking rate limiting or exposing origin.

## Prerequisites
- Step 28
- DNS/domain control

## Actions
- Configure approved frontend/API domains and TLS.
- Define API CDN cache bypass/allow rules; never cache unsafe mutations/private responses.
- Enable WAF baseline appropriate to API.
- Configure Nginx to trust Arvan visitor-IP header only when source is a trusted Arvan proxy.
- Allowlist Arvan published edge IP ranges for origin HTTP/S.
- Automate edge-range refresh; do not hard-code a permanently stale list.
- Keep SSH on separate restricted path/source policy.

## Required outputs
- `ARVANCLOUD_RUNBOOK.md`
- Trusted-proxy Nginx config
- Firewall/range-sync automation
- API cache rules

## Verification
- Direct origin HTTP/S blocked from untrusted network
- Arvan-proxied traffic works
- Real visitor IP reaches app
- Spoofed visitor-IP header cannot bypass trust
- Rate limit behaves behind CDN

## Acceptance criteria
- [ ] Origin protected by CDN allowlist
- [ ] Trust chain is explicit
- [ ] Mutable API caching is safe

## Explicit non-goals
- Never trust `ar-real-ip` from arbitrary sources
- Do not make origin publicly bypassable

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 30 automates CI/CD.
