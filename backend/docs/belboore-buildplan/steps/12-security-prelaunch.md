# Step 12 — Security Hardening Pass & Pre-Launch Checklist

## Goal
A final, deliberate pass before opening the backend to real public traffic —
not new features, just verification and closing gaps accumulated across
steps 01–11.

## Context you need
`00-project-brief.md` + every previous step's `PROGRESS.md` notes and Open
Questions.

## Tasks
1. **Re-verify isolation boundaries** end-to-end (repeat step 02's isolation
   test, but now with real services, not placeholders): confirm NetDiag
   still cannot reach Core API's Postgres role, confirm Media's worker
   containers can't reach NetDiag's network, etc.
2. **Secrets audit**: grep the full repo history (not just current HEAD) for
   accidentally committed secrets; rotate anything found.
3. **Dependency audit**: run a vulnerability scan across all three services'
   dependencies (`pip-audit`/`safety` for Python, Trivy for images);
   patch or document accepted risk for anything unresolved.
4. **SSRF/upload-validation regression suite**: re-run the security-specific
   test suites from steps 07 and 08 as an explicit gate, not just "they
   passed once."
5. **Rate-limit bypass attempts**: manually (or via a small script) try to
   bypass rate limiting — missing headers, IP spoofing via
   `X-Forwarded-For` (should be rejected/ignored except from ArvanCloud's
   trusted range per step 03), rapid account creation to reset anonymous
   limits — fix anything that works.
6. **Backup/restore drill**: repeat step 04's restore drill one more time,
   timed, to confirm the documented RTO is realistic.
7. **Close out Open Questions**: go through every entry accumulated in
   `PROGRESS.md` across all steps; each must be explicitly resolved or
   consciously deferred with a written reason (not silently dropped) —
   especially the Tier 3 legal/scope review flagged in step 08.
8. **Load test**: basic k6/Locust run against realistic Year-1 targets (see
   `00-project-brief.md` for tier-specific latency targets) — confirms the
   single VPS holds up under expected launch traffic, not just dev-machine
   traffic.
9. **Incident response basics**: even for a solo/small team, write a
   one-page `infra/INCIDENT_RESPONSE.md`: who gets notified (from step 09's
   alerting), where to look first (Grafana dashboards), how to roll back
   (step 10's script), how to activate object-storage-based backups if the
   VPS itself is lost.
10. **Final privacy-claims check**: read the platform's public privacy
    claims (no tracking, ephemeral files, no accounts required) against what
    the code actually does — confirm there's no drift between marketing
    promise and implementation (e.g., TTL sweep actually runs, no PII
    genuinely logged).

## Acceptance criteria
- [ ] All isolation boundaries re-verified with real services
- [ ] No secrets found in repo history, or all found secrets rotated
- [ ] Dependency scan clean or all findings explicitly accepted/documented
- [ ] Security regression suites pass and are wired into CI (step 10) so
      they run on every future PR, not just once here
- [ ] Rate-limit bypass attempts all fail as expected
- [ ] Backup restore drill completed within documented RTO
- [ ] Every `PROGRESS.md` Open Question is resolved or consciously deferred
      with a reason
- [ ] Load test results meet the latency/throughput targets, or capacity
      plan adjusted accordingly
- [ ] `infra/INCIDENT_RESPONSE.md` written
- [ ] Privacy-claims-vs-implementation check documented
- [ ] Update `PROGRESS.md` — this is the last step before public launch
