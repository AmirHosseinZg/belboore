# OpenCode Step Prompt

Repository:
`/home/amirhosseinzg/WorkSpace/Projects/belboore`

Read in order:
1. `AGENTS.md`
2. `RTK.md`
3. `docs/backend-development/00_AGENT_OPERATING_RULES.md`
4. `docs/backend-development/00_LOCKED_DECISIONS.md`
5. `docs/backend-development/00_MASTER_ROADMAP.md`
6. `<STEP_FILE>`

Then inspect the source files named by the step.

Rules:
- Implement ONLY `<STEP_FILE>`.
- Do not begin a later step.
- Discover repository facts instead of inventing them.
- Respect the current frontend and accepted OpenAPI contracts.
- Do not silently alter contracts.
- Use `rtk` for shell commands.
- Run every required verification.
- Keep the diff narrowly scoped.
- If the step contains an explicit REVIEW GATE, produce the requested plan/artifact and STOP before implementation until approved.
- At completion produce the standard completion report and STOP.
