# Step 11 — API Contract Handoff & Frontend Integration

## Goal
Close the loop with the frontend developer: reconcile whatever mocked
endpoints they built against with the real API, and prove real
frontend-to-backend calls work end-to-end through ArvanCloud.

## Context you need
`00-project-brief.md`. This step is as much a coordination task as a coding
task — involves a human conversation with the frontend developer, which the
agent should facilitate with clear artifacts, not attempt to guess through.

## Tasks
1. **Export the real OpenAPI spec** (from Core API `/openapi.json`, plus
   Media and NetDiag's own specs) into a single reference doc/location the
   frontend dev can diff against their existing mock/assumed contract.
2. **Diff against frontend expectations**: get (from the human) whatever the
   frontend currently assumes — mock response shapes, endpoint paths, field
   names — and produce a written diff: what matches, what doesn't. Do NOT
   silently change the backend to match frontend guesses without confirming
   which side should change; log every mismatch in `PROGRESS.md` Open
   Questions until resolved.
3. **CORS**: configure Core/Media/NetDiag to allow the frontend's actual
   domain(s) (production + any preview/staging domains) — explicit allowlist,
   never `*` given cookies/JWT are involved.
4. **Environment-specific base URLs**: confirm the frontend has a clean way
   to point at `https://api.belboore.com/api/v1` in prod and a
   staging/local equivalent elsewhere — provide a `.env.example` snippet for
   the frontend repo if useful.
5. **Client SDK / typed client (optional but recommended)**: generate a
   TypeScript client from the OpenAPI spec (e.g., `openapi-typescript` +
   a thin fetch wrapper) so the frontend gets compile-time safety against
   the real contract instead of hand-typing request/response shapes —
   offer this to the frontend dev rather than assuming they want it.
6. **End-to-end smoke test from the actual frontend**: pick one tool from
   each tier (one Tier 1, one Tier 2, one Tier 3) and verify a real browser
   request, through ArvanCloud, through Nginx, to the right service, and
   back, renders correctly in the actual frontend UI — not just `curl`.
7. **Error-state UX contract**: confirm with the frontend dev how they want
   to handle `429` (rate limited), `502`-equivalent (provider down, stale
   data), and Tier 2 job-failure states — these need consistent UI treatment
   and the backend's problem+json shape should carry enough info
   (`type`/`detail`) for the frontend to branch on without parsing English
   prose.

## Acceptance criteria
- [ ] Written diff between "frontend's assumed contract" and "real backend
      contract" exists, and every mismatch is either resolved or logged as
      an Open Question with an owner
- [ ] CORS confirmed working from the actual frontend domain (not just
      `localhost`)
- [ ] One real end-to-end request per tier verified working through the
      full stack (browser → ArvanCloud → Nginx → service → response
      rendered in UI)
- [ ] Frontend dev has confirmed (in writing/PROGRESS.md) they can build
      against the real API for at least these three example tools
- [ ] Update `PROGRESS.md`
