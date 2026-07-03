# AGENT_RULES.md
Read this file at the start of EVERY session, before touching any code.

## What this repo is
Backend + infrastructure for Belboore (بلبوره), a bilingual (fa/en) tool platform.
Frontend (Astro) is already built and deployed separately by a frontend developer.
It is currently calling placeholder/mocked endpoints and is WAITING for the real
backend APIs described in `00-project-brief.md`.

## How work is organized
- Work happens in strict, numbered steps: `steps/01-...md`, `steps/02-...md`, etc.
- Each step file is SELF-CONTAINED: it has its own context, goal, and acceptance
  criteria. You should be able to give an agent ONLY that one file (plus this
  AGENT_RULES.md and 00-project-brief.md) and have it complete the step correctly.
- Do NOT start step N+1 until step N's acceptance criteria are all checked off in
  `PROGRESS.md`.
- Do NOT silently expand scope beyond what a step file asks for. If you think
  something else is needed, stop and add a note to `PROGRESS.md` under "Open
  Questions" instead of just building it.

## Isolation rules (critical — do not violate)
1. **One module = one folder = one git concern.** Never let two modules share
   mutable state, a database table, or an import that reaches into another
   module's internals. Cross-module calls go through the module's public
   `service.py`/`router.py` interface only.
2. **Media processing and Network Diagnostics are separate deployable services**,
   never merged into the Core API container, even though it's tempting on a
   single VPS. They get their own Dockerfile, own container, own Docker network
   segment. This is a security boundary, not a style preference.
3. **Never commit secrets.** All credentials go in `.env` (gitignored) and are
   read via environment variables. If a step needs a secret that doesn't exist
   yet, add a placeholder to `.env.example` and stop to ask the human.
4. **Every module gets its own Postgres schema**, not just its own tables in
   `public`. E.g. `catalog.tools`, `mediaproc.jobs`, `identity.accounts`.

## Definition of done (applies to every step unless the step says otherwise)
- [ ] Code builds/starts via `docker compose up` with no manual steps
- [ ] Unit tests exist for new logic and pass
- [ ] New/changed endpoints are reflected in the OpenAPI spec (FastAPI auto-docs)
- [ ] `.env.example` updated if new env vars were introduced
- [ ] No secrets, API keys, or tokens committed
- [ ] A short entry added to `CHANGELOG.md`
- [ ] Corresponding checkbox in `PROGRESS.md` ticked

## Commit convention
`[step-NN] short description` — e.g. `[step-04] add core API skeleton + healthz`

## When something is ambiguous
Pick the simplest option that satisfies the step's acceptance criteria, note the
assumption in the PR/commit description, and move on. Do not block on it.

## When you finish a step
1. Tick the boxes in `PROGRESS.md`.
2. Write one paragraph in `PROGRESS.md` under that step: what was actually built,
   any deviation from the plan, and anything the NEXT step needs to know.
3. Stop. Do not auto-continue to the next step in the same session unless asked.
