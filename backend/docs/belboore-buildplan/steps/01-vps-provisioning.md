# Step 01 — VPS Provisioning & Hardening

## Goal
Turn a bare VPS into a secure, Docker-ready host. This step produces no
application code — it produces server config, scripts, and documentation.

## Context you need
See `00-project-brief.md`. Single VPS. OS: Ubuntu 24.04 LTS (recommended —
long support window, widest Docker/tooling compatibility). If a different OS
was already chosen, adapt commands but keep the same checklist.

## Tasks
1. **User & SSH hardening**
   - Create a non-root sudo user; disable root SSH login; disable password
     auth (key-only); change SSH port only if there's an operational reason to.
   - Install and enable `fail2ban` for SSH brute-force protection.
2. **Firewall**
   - `ufw` (or `nftables`) default-deny inbound. Allow only:
     - 22 (SSH, ideally restricted to your admin IP/VPN)
     - 80/443 (only from ArvanCloud's published IP ranges once known — see
       step 03; until then allow broadly and tighten later)
   - Deny all other inbound by default, including direct access to
     Postgres/Redis/app ports from the public internet — those are only
     reachable inside the Docker network.
3. **Docker & Compose**
   - Install Docker Engine + Docker Compose plugin (official Docker repo, not
     distro package, for a current version).
   - Add the sudo user to the `docker` group.
   - Configure Docker daemon: enable `log-driver: json-file` with `max-size`/
     `max-file` rotation (prevents disk from filling with container logs).
4. **Disk & swap**
   - Confirm disk size is sufficient for: OS + Docker images + Postgres data +
     object storage (media files, even ephemeral, need headroom) + logs. Set
     up a swapfile sized appropriately if RAM is under 4GB (Media/FFmpeg jobs
     are memory-spiky).
5. **Automatic security updates**
   - Enable `unattended-upgrades` for OS security patches.
6. **Directory layout on the VPS**
   ```
   /opt/belboore/
     ├── docker-compose.yml
     ├── .env                (gitignored, real secrets)
     ├── .env.example         (committed, placeholders)
     ├── nginx/
     ├── core-api/
     ├── media-service/
     ├── netdiag-service/
     ├── infra/               (backup scripts, cron jobs)
     └── data/                 (bind-mounted volumes: postgres, redis, minio)
   ```
7. **Time sync**: confirm `systemd-timesyncd` (or `chrony`) is active — TLS
   and JWT expiry both break silently on clock drift.
8. **Document everything** in `infra/SERVER_SETUP.md`: exact commands run, so
   the server can be rebuilt from scratch if it's ever lost.

## Explicit non-goals for this step
- No application containers yet.
- No ArvanCloud configuration yet (that's step 03).
- No Kubernetes, no multi-node anything.

## Acceptance criteria
- [ ] Can SSH in only as the sudo user, only via key, root login disabled
- [ ] `ufw status` shows default-deny inbound with only necessary ports open
- [ ] `docker run hello-world` works as the sudo user without `sudo`
- [ ] `unattended-upgrades` confirmed active (`systemctl status
      unattended-upgrades`)
- [ ] `/opt/belboore/` directory structure exists
- [ ] `infra/SERVER_SETUP.md` written with exact reproducible steps
- [ ] Update `PROGRESS.md`
