# Step 03 — ArvanCloud CDN / DNS / WAF / Object Storage Integration

## Goal
Put ArvanCloud in front of the VPS as the only public entry point, and decide
the object-storage question (MinIO on-box vs. ArvanCloud Object Storage).

## Context you need
`00-project-brief.md`. This step involves both console configuration (outside
the agent's control — flag these as manual/human tasks) and code/config
changes the agent CAN do.

## Human/manual tasks (agent should list these clearly, not attempt them)
- [ ] Domain added to ArvanCloud, nameservers pointed at ArvanCloud
- [ ] DNS `A`/`AAAA` record for the API subdomain (e.g. `api.belboore.com`)
      pointed at the VPS IP, proxied (orange-cloud equivalent) through
      ArvanCloud so the VPS IP is never exposed directly
- [ ] TLS certificate provisioned via ArvanCloud (or Let's Encrypt on origin,
      whichever ArvanCloud's edge-to-origin mode requires — "Full (Strict)"
      equivalent, not "Flexible", so traffic is encrypted end-to-end, not
      just browser-to-edge)
- [ ] ArvanCloud WAF/Anti-DDoS enabled on the API subdomain
- [ ] ArvanCloud rate-limiting rules configured as a FIRST line of defense
      (in addition to, not instead of, the app-level rate limiting in step 05)
- [ ] Decide and note ArvanCloud's published edge IP ranges

## Agent-doable tasks
1. **Restrict Nginx/firewall to ArvanCloud IP ranges only** once those are
   known — update `ufw` rules from step 01 and Nginx `allow`/`deny` directives
   so origin only accepts traffic that actually came through ArvanCloud
   (prevents WAF/CDN bypass by hitting the VPS IP directly).
2. **`X-Forwarded-For` / real-IP handling**: configure Nginx `set_real_ip_from`
   for ArvanCloud's IP ranges and trust their forwarded-IP header, so
   rate-limiting and abuse detection (step 08) see the real client IP, not
   ArvanCloud's edge IP.
3. **Object storage decision** — document the trade-off and implement the
   chosen path:
   - **Option A: ArvanCloud Object Storage (S3-compatible)** — offloads disk
     I/O and egress from the VPS entirely, which matters a lot on a
     single-box setup doing video transcoding. Recommended default.
   - **Option B: MinIO on the VPS** — simpler (no external account/billing
     dependency), but competes with Postgres/Redis/Celery for the same box's
     disk and network.
   - Either way, code against the S3 API (`boto3` or equivalent) with the
     endpoint/credentials in `.env`, so switching later is a config change,
     not a rewrite.
4. **Cache-control headers**: confirm Core API sets appropriate
   `Cache-Control`/`stale-while-revalidate` headers on cacheable Tier 1
   responses (crypto/FX/weather) so ArvanCloud's edge cache actually reduces
   origin load — this is the primary cost lever on a single VPS with limited
   bandwidth.
5. Write `infra/ARVANCLOUD_SETUP.md` documenting exact console steps taken
   (even though the agent didn't do them, document what a human did, from
   screenshots/notes provided) so this is reproducible if the account is lost
   or a second environment is needed.

## Acceptance criteria
- [ ] `api.belboore.com` resolves through ArvanCloud, not directly to the VPS IP
- [ ] Origin (Nginx) only accepts connections from ArvanCloud IP ranges —
      verified by attempting a direct request to the VPS IP and confirming
      it's refused/timed out
- [ ] TLS is end-to-end (edge-to-origin encrypted, not just client-to-edge)
- [ ] Object storage client code (S3 API) connects successfully to whichever
      option was chosen; bucket created; test upload/download/delete works
- [ ] `infra/ARVANCLOUD_SETUP.md` exists and is accurate
- [ ] Update `PROGRESS.md`, and record the object-storage decision + reasoning
      there since it affects step 07
