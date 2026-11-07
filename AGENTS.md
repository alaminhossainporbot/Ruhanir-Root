# AI Agent Operating Guidelines: Ruhanir Root

Welcome to the `Ruhanir-Root` repository. Before undertaking any task, you **MUST** read [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) in full.

---

## Core Standing Rules

1. **Read Project Context First**: Always review [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) and [docs/prompts/00-context-brief.md](docs/prompts/00-context-brief.md) before planning or executing changes.
2. **Read-Only by Default**: Do not deploy, do not push to remote, and do not commit to `main` without explicit user permission in the same message.
3. **No Invented Facts**: Never invent statistics, client testimonials, team members, awards, or physical addresses.
4. **Brand Integrity**:
   - Always spell the brand name in Bangla as **রুহানীর** (with long ঈ-কার).
   - Use only tokens defined in `brand-kit/tokens/`. Never use `#42D1CC` (teal) for text or icons.
   - Gradients belong exclusively inside the logo mark.
   - Absolutely zero emojis anywhere in code, commits, or UI copy.
5. **Security & Secrets**:
   - Never print, log, or store secrets or credentials.
   - Fail closed: non-production environments must always emit `noindex, nofollow`.
6. **Verification First**:
   - Never claim a task is verified without providing reproducible evidence (file paths, exact terminal command output, exit codes, and test results).
   - Report your own defects honestly.
7. **Relative Paths Only**:
   - In documentation and reports, use relative paths only (never local absolute paths or Windows user paths).
