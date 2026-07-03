# Step 05 — Core API Skeleton

## Goal
Replace the placeholder from step 02 with a real FastAPI app that has the
cross-cutting plumbing every module (steps 06+) will reuse: auth, error
format, rate limiting, health checks, catalog module (first real module,
since the frontend needs it immediately to render category/tool listings).

## Context you need
`00-project-brief.md`. This is the biggest step — consider splitting it into
sub-sessions with the agent if it stalls (05a: skeleton+errors+health,
05b: auth, 05c: catalog module).

## Tasks
1. **Project structure** (modular monolith, one folder per module):
   ```
   core-api/
     app/
       main.py
       config.py            (env-driven settings, pydantic-settings)
       errors.py            (problem+json exception handlers)
       middleware/
         request_id.py       (trace_id generation/propagation)
         rate_limit.py
       modules/
         catalog/
           models.py router.py service.py schemas.py
         identity/
           models.py router.py service.py schemas.py
         proxy/            (stub only — real logic in step 06)
         shortlink/
         usage/
         abuse/
     tests/
     Dockerfile
   ```
2. **Error handling**: global exception handlers producing
   `application/problem+json` exactly matching the contract in
   `00-project-brief.md` — `{type, title, status, detail, instance, trace_id}`.
   Every error path (validation, 404, 500, rate-limited) must produce this
   shape. Write a test that asserts this for at least one error of each class.
3. **Request tracing**: middleware that generates/propagates a `trace_id`
   (from an inbound header if present, else generated), attaches it to
   structured logs and to every error response.
4. **Health checks**: `/healthz` (liveness — process is up) and `/readyz`
   (readiness — checks Postgres + Redis connectivity, returns 503 if either
   is down).
5. **Auth module (Identity)**:
   - Self-issued JWT, RS256. Signing keypair generated and stored via
     `.env`/mounted secret (not in code).
   - Endpoints: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`,
     `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout`.
   - Password hashing: argon2id.
   - Access token 15 min, refresh token 30 days, refresh tokens stored
     hashed in `identity.refresh_tokens` with rotation + reuse detection
     (if a used-and-rotated token is presented again, revoke the whole
     token family and log an `AbuseSignalRaised`-equivalent event).
   - Most endpoints must work WITHOUT a token (anonymous) — auth dependency
     should be optional-by-default, explicit opt-in to `require_auth` per
     route.
6. **Rate limiting middleware**: Redis-backed sliding window, tiers from
   `00-project-brief.md`. Applied globally, overridable per-route. Fails
   closed if Redis is unreachable (deny, don't allow unlimited).
7. **Catalog module** (first real business module — unblocks frontend fastest):
   - Tables: `catalog.categories`, `catalog.tools`, `catalog.faq_entries`,
     each with a `jsonb i18n` column holding `{fa: {...}, en: {...}}`.
   - CI/startup validation: reject any tool/category record missing a
     required `fa` or `en` field.
   - Endpoints: `GET /api/v1/catalog/categories`, `GET
     /api/v1/catalog/tools`, `GET /api/v1/catalog/tools/{slug}`, `GET
     /api/v1/catalog/search?q=` (Postgres full-text, bilingual).
   - Admin-only (JWT role=admin) `POST/PUT/DELETE` for managing entries —
     this is how the ~150 tools' backend-relevant metadata gets populated;
     coordinate with the frontend dev on exactly which fields the frontend
     needs (likely: slug, tier, category, i18n title/description/seo, icon
     reference).
8. **Idempotency**: shared decorator/dependency implementing the
   `Idempotency-Key` header contract (Redis-cached response replay, 24h TTL)
   — used by shortlink creation now, and by media job submission in step 07.
9. **OpenAPI**: confirm FastAPI's auto-generated spec is complete and
   accurate; this becomes the literal contract handed to the frontend dev in
   step 11.

## Acceptance criteria
- [ ] `/healthz` and `/readyz` behave correctly (readyz fails when DB is down
      — test by stopping the Postgres container)
- [ ] Every error response matches the problem+json contract (tested)
- [ ] Register/login/refresh/logout work end-to-end; refresh-token rotation +
      reuse detection has a passing test
- [ ] Rate limiting returns `429` + `Retry-After` when exceeded, and fails
      closed when Redis is down
- [ ] Catalog endpoints return correctly shaped, bilingual JSON; a record
      missing `fa` or `en` is rejected at write time
- [ ] Idempotency-Key replay test passes (same key + same body → same
      response, no duplicate side effect)
- [ ] `/docs` (OpenAPI) renders and is accurate
- [ ] Update `PROGRESS.md`
