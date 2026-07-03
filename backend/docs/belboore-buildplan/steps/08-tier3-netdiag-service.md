# Step 08 — Tier 3: Network Diagnostics Service

## Goal
Build the most sensitive service last, deliberately, once everything else is
stable. Ping/traceroute/DNS/WHOIS/port-scan/SSL-check/speed-test, isolated on
`netdiag_net`, account-gated, tightly rate-limited.

## Context you need
`00-project-brief.md`. **Before writing any code, re-read the "Risks &
Trade-offs" framing on Tier 3** — this is a legal/abuse risk category, not
just an engineering one. Recommend the human get informal legal input on
scope (which tools to expose publicly vs. behind a waitlist) before or during
this step — note this as an Open Question in `PROGRESS.md` if it hasn't
happened yet, don't silently proceed to public launch without it.

## Tasks
1. **Project structure**: `netdiag-service/app/` — separate FastAPI app, own
   Dockerfile, own container, on `netdiag_net` only + the documented single
   exception to reach Redis for rate-limit checks (see step 02).
2. **Access gating** (do this before implementing any actual tool):
   - Low-risk tools (ping, DNS lookup, SSL cert check) — anonymous access
     allowed, but still rate-limited hard (see `00-project-brief.md` limits).
   - Higher-risk tools (port scan, WHOIS, traceroute against arbitrary
     targets) — **require a registered JWT account**, and a stricter
     per-account quota than general Tier 3 limits.
   - Target validation: every tool that takes a user-supplied host/IP must
     validate it before executing anything.
3. **SSRF protection (critical, implement as a shared utility used by every
   tool in this service)**:
   - Resolve the target hostname, then check the resolved IP against a
     deny-list: RFC1918 private ranges, loopback, link-local, cloud metadata
     endpoint (`169.254.169.254`), and the VPS's own IP.
   - Re-check after resolution, not just the input string (defends against
     DNS rebinding).
   - Deny-by-default: if resolution fails or is ambiguous, refuse rather
     than proceed.
   - Write this as `netdiag/security/ssrf_guard.py` with a thorough test
     suite (this is the single highest-value test file in this whole step).
4. **Bounded execution**: every tool gets a hard timeout (default 5s,
   configurable per tool, never unbounded) and runs as a subprocess with
   resource limits, not directly in the async event loop (a hung `traceroute`
   must not block the whole service).
5. **No persistence of results beyond structured logs** used for abuse
   detection (retained 30 days per the data lifecycle policy, then purged) —
   do not store diagnostic results/targets in a queryable, indefinitely
   retained table.
6. **Abuse detection**: track request volume and target diversity per
   account/IP in Redis; sudden spikes (e.g., many distinct targets for port
   scan in a short window) trigger auto-throttle and write an
   `AbuseSignalRaised`-equivalent log entry that Core API's abuse module
   (or, at minimum, an alert) can act on.
7. **Egress consideration on a single VPS**: unlike the multi-VPS enterprise
   design, this service shares the VPS's single public IP with everything
   else. Document this explicitly as an accepted risk: if the VPS IP gets
   blacklisted/rate-limited by a target of a diagnostic tool, it could
   theoretically affect the VPS's own outbound reputation for other things.
   Mitigation for now: keep Tier 3 concurrency capped low, keep the
   account-gating from step 2, and note "dedicated egress IP for NetDiag" as
   a documented future improvement once traffic justifies a second VPS —
   do not attempt to solve this with a second VPS in this step.
8. **Implement tools** in order of risk (lowest first, so lower-risk tools
   ship to the frontend sooner): SSL cert check → DNS lookup → ping →
   traceroute → speed test → WHOIS → port scan (port scan last, most
   restricted).

## Acceptance criteria
- [ ] SSRF guard test suite passes, including a DNS-rebinding-style test
      case and a private-IP-range test case
- [ ] Every tool enforces its declared timeout (tested with a slow/black-hole
      target)
- [ ] Port scan and WHOIS reject anonymous requests (401/403) and enforce
      the stricter per-account quota
- [ ] No diagnostic result is queryable/persisted beyond the 30-day
      structured abuse-log
- [ ] Simulated abuse pattern (many distinct targets quickly) triggers
      auto-throttle in a test
- [ ] Legal/scope review status recorded in `PROGRESS.md` Open Questions if
      not yet done
- [ ] Update `PROGRESS.md`
