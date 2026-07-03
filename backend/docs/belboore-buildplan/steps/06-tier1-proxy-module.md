# Step 06 — Tier 1: Proxy/Integration Module

## Goal
Build the API-proxy module inside Core API (`core-api/app/modules/proxy/`)
that powers the Finance/World Data tools (FX, crypto, weather, gold/oil) plus
Spotify preview and lyrics lookup.

## Context you need
`00-project-brief.md`. Depends on step 05 (Core API skeleton, rate limiting,
error format) being done.

## Tasks
1. **Adapter interface**: define a `ProviderAdapter` abstract base
   (`fetch(params) -> normalized_response`, plus `cache_ttl_seconds` and
   `timeout_seconds` as class attributes) so each external provider is a
   swappable, independently testable implementation. This directly mitigates
   "provider changes terms / shuts down" — swapping a provider means adding
   one new adapter class, not touching calling code.
2. **Implement adapters** for (prioritize based on what the frontend actually
   needs first — confirm with frontend dev, but a reasonable default order):
   1. Currency/FX rates
   2. Cryptocurrency prices
   3. Weather
   4. Gold/oil rates
   5. Spotify track preview
   6. Music metadata/lyrics
   - Each adapter: input validation, provider-specific auth (API key from
     `.env`), response normalization into a stable internal schema
     (independent of the provider's own field names — so switching providers
     never changes the response shape the frontend sees).
3. **Orchestrator** (`service.py`): cache-check (Redis DB 0, key =
   `proxy:{provider}:{normalized_params_hash}`) → on miss, call adapter with
   timeout → on success, cache-write with the adapter's TTL → on failure,
   serve stale cache if available (`Stale-Warning` response header) else
   return a clean `502`-equivalent problem+json error, never a raw
   stack trace or the provider's raw error body.
4. **Circuit breaker per provider**: after N consecutive failures, open the
   circuit for a cooldown window (serve stale/cached-only, skip the live
   call) — prevents one slow/down provider from degrading the whole proxy
   module's latency.
5. **Cache-warming job**: scheduled task (Celery beat, or a simple cron
   container if Celery isn't wired up yet) that refreshes the highest-traffic
   endpoints (FX, crypto) on their TTL cadence regardless of user traffic —
   this is the main defense against hitting provider rate limits and against
   users ever paying the cache-miss latency cost.
6. **Endpoints**: `GET /api/v1/proxy/fx?base=...&target=...`, `GET
   /api/v1/proxy/crypto?symbol=...`, `GET /api/v1/proxy/weather?city=...`,
   etc. — set `Cache-Control: public, max-age=<ttl>,
   stale-while-revalidate=<n>` on responses so ArvanCloud's edge cache also
   helps (from step 03).
7. **Secrets**: every provider API key in `.env.example` as a placeholder;
   document where to obtain real keys in `proxy/README.md`.

## Acceptance criteria
- [ ] Each adapter has a unit test using a mocked HTTP response (no live
      network calls in CI)
- [ ] Cache hit path measured under 50ms locally (Redis round-trip only)
- [ ] Simulated provider timeout/5xx → circuit breaker opens after N
      failures, verified by test; stale cache served correctly
- [ ] Cache-warming job runs on schedule and populates Redis without any
      user request having triggered it
- [ ] `Cache-Control`/`stale-while-revalidate` headers present and correct
      on all Tier 1 responses
- [ ] Update `PROGRESS.md`, list which providers/API keys are still pending
      real credentials
