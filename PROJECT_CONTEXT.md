# Project Context: Ruhanir Root Hub (`ruhanir.com`)

This file is the primary orientation and operating guide for AI agents and developers working on the `Ruhanir-Root` repository. All agents must read and follow this context before planning or executing any task.

---

## 1. Organization & Purpose

**Ruhanir Engine** (Bangla spelling: **রুহানীর ইঞ্জিন**; always spell the brand **রুহানীর** with long ঈ-কার in Bangla) is a technology-driven parent organization in Bangladesh.

The organization operates through two commercial divisions:
1. **Ruhanir IT** (`it.ruhanir.com`): Custom enterprise software, ERP and client portal platforms, SaaS products, and enterprise network setup.
2. **Ruhanir Store** (`store.ruhanir.com`): Official digital licenses and curated physical products (currently operating via Cash-on-Delivery).

This repository (`Ruhanir-Root`) is the corporate root website (**`ruhanir.com`**):
- Serves as the institutional anchor explaining the company, its governance, principles, and news.
- Directs visitors to the two division websites while preserving the visitor's selected language (`/bn/` or `/en/`).
- Hosts the authoritative legal and policy hub for the parent organization and shared operations.
- Serves as the source of truth for the **Ruhanir Brand Kit** (`brand-kit/`).
- **Physical Address Rule**: The organization operates entirely online with no public physical address and serves customers across Bangladesh. Do not add a physical address or map anywhere on the site.
- **Trade License Rule**: Trade license number `3401322207` is displayed as `Trade License No: 3401322207` on English pages and `ট্রেড লাইসেন্স নং: ৩৪০১৩২২২০৭` on Bangla pages. The issuing authority was never confirmed and **must not be stated**.

---

## 2. Domains & Digital Surface Map

| Domain / Subdomain | Role | Technology Stack | Hosting / Infrastructure |
| :--- | :--- | :--- | :--- |
| **`ruhanir.com`** | Corporate Root Hub (this project) | Next.js App Router, TypeScript, Tailwind CSS v4, static export | Cloudflare Workers Static Assets |
| **`it.ruhanir.com`** | IT Services & ERP Platform | TanStack Start, TypeScript, Tailwind CSS v4, Supabase | Cloudflare Workers / Pages |
| **`store.ruhanir.com`**| Digital Licenses & Physical Commerce | Next.js, Supabase, Cloudflare Workers | Cloudflare Workers (behind Cloudflare Access pre-launch) |

---

## 3. Architecture & Technical Design

- **Static Generation**: Static export (`output: 'export'` in `next.config.mjs`, `trailingSlash: true`). Generates pure HTML/CSS/JS into `./out`. Zero server runtime, zero database, zero tracking or analytics cookies.
- **Self-Hosted Variable Fonts**:
  - Latin: `Inter` loaded via variable font file `public/fonts/inter-latin.woff2`.
  - Bengali: `Noto Sans Bengali` loaded via variable font file `public/fonts/noto-sans-bengali.woff2`.
  - Configured in `src/lib/fonts.ts` using `next/font/local` with `display: 'swap'`.
- **Bilingual URL Routing**:
  - Root `/`: Language chooser presenting crawlable links to `/bn/` and `/en/`, with client-side localStorage fallback.
  - Bangla (default content language): `/bn/*`.
  - English: `/en/*`.
  - Canonical & hreflang: Self-referencing canonicals with bidirectional `hreflang` alternates (`bn`, `en`, and `x-default: https://ruhanir.com/`).
- **Edge Security & Gating (`src/worker.ts`)**:
  - Serves static assets via `env.ASSETS`.
  - Evaluates `SITE_ENV`. If not `'production'`, edge injects `X-Robots-Tag: noindex, nofollow`.
  - Emits security headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, and HSTS on production.
- **Brand Kit Source of Truth (`brand-kit/`)**:
  - Contains design tokens (`tokens/theme.css`, `tokens/tokens.ts`), company configuration (`company.ts`), raster logo assets (`assets/`), portable components (`components/`), variable fonts (`fonts/`), and SEO helpers (`seo/`).

---

## 4. Standing Rules from the Owner

1. **No Invented Facts**: Never invent facts, statistics, awards, clients, testimonials, team members, or addresses. Every claim must be supportable. Missing facts must be listed for the owner in `docs/seo/OWNER_INPUT_NEEDED.md` rather than filled with generic marketing copy.
2. **Zero Emojis**: Never use emojis anywhere in application code, commit messages, or UI copy.
3. **No Marketing Filler**: Avoid hype, buzzwords, and trust adjectives ("revolutionary", "leading", "world-class"). Keep copy direct, institutional, and factual.
4. **Brand Tokens Only**: Use only the approved color tokens from `brand-kit/tokens/`. Never invent ad-hoc hex values. Gradients exist **only** inside the logo mark.
5. **Teal Is Never Text**: `#42D1CC` has a 1.76:1 contrast ratio against white and must never be applied to text or icons. It is strictly decorative.
6. **Bangla Spelling**: Always spell the brand name **রুহানীর** (with long ঈ-কার). Never use "রুহানির".
7. **Digits Rule**: Bangla pages use Bangla numerals (`০-৯`) for years, dates, and trade license numbers. Phone numbers remain in Latin digits (`+880 1570225573`).
8. **Mobile-First & Accessible**: Touch targets must be >= 44px; WCAG AA contrast on all text; visible focus indicators (`2px solid #0E52C3`); no horizontal overflow on viewports down to 320px.
9. **No Below-14px Text**: Absolute typographic floor is 14px.
10. **Fail-Closed Security**: Secrets, private tokens, or credentials must never be printed, logged, or committed.
11. **No Unapproved Mutations**: Do not deploy, do not git push, and do not commit to `main` without explicit owner instruction in the same message.
12. **Evidence Before Claiming Verified**: File paths, terminal commands, exit codes, and test outputs must be provided before any feature is reported as complete.

---

## 5. Current Implementation State

- **Pages Built & Verified (49 routes total)**:
  - Language chooser (`/`)
  - Home (`/en/`, `/bn/`)
  - About (`/en/about/`, `/bn/about/`)
  - Leadership (`/en/leadership/`, `/bn/leadership/`)
  - Executive Profile: AL Amin Hossain Porbot (`/en/leadership/ahporbot/`, `/bn/leadership/ahporbot/`)
  - Businesses (`/en/businesses/`, `/bn/businesses/`)
  - News (`/en/news/`, `/bn/news/`) + 1 launch post (`/en/news/website-launch/`, `/bn/news/website-launch/`) + RSS feeds (`/en/rss.xml`, `/bn/rss.xml`)
  - Contact (`/en/contact/`, `/bn/contact/`) with honeypot and 3s minimum-time check
  - Legal hub (`/en/legal/`, `/bn/legal/`) + 15 policy routes per language
  - Bilingual 404 (`404.html`)
  - Static sitemap (`sitemap.xml`) and robots (`robots.txt`)
- **Mobile Layout**: Mobile drawer implemented with 1100px collapse breakpoint; zero horizontal scroll or element overflow across all tested viewports (320px to 1280px).
- **SEO & Structured Data**: Playwright crawler audit passes with 0 critical issues, 0 warnings, and 0 notices across all 45 routes. Semantic Schema.org markup in place for `Organization`, `WebSite`, `BreadcrumbList`, `ContactPage`, and `NewsArticle`.
- **Known Code Divergences**:
  - Legal effective date hardcoded in `src/components/LegalLayout.tsx` instead of imported from `brand-kit/company.ts`.
  - Contact form lacks Cloudflare Turnstile integration (uses honeypot + timer + mailto fallback).
  - Footer renders 5 columns (Brand, Divisions, Company, Contact, Legal), whereas early brief mentioned 4.
  - News cards have `12px` and `13px` font sizes in `src/app/[lang]/news/page.tsx`.
  - `brand-kit/components/Header.tsx` does not have the mobile drawer fix present in `src/components/Header.tsx`.
  - `brand-kit/legal-content/` contains 1-paragraph markdown stubs rather than the full policy texts.

---

## 6. Open Work (in Priority Order)

Do not begin any of these items without explicit instruction from the owner:

1. **Mobile Layout Polish**:
   - Resolve the 20 typography notices in `src/app/[lang]/news/page.tsx` (raise `12px`/`13px` to `14px`).
   - Add minimum width padding to breadcrumb `Home` / `প্রচ্ছদ` touch targets so `check-mobile.ts` reports 0 tap-target flags.
2. **Brand Kit Synchronization**:
   - Backport the mobile navigation drawer from `src/components/Header.tsx` into `brand-kit/components/Header.tsx`.
   - Export full markdown policy content into `brand-kit/legal-content/` so sibling projects receive real policies instead of stubs.
   - Refactor `LegalLayout.tsx` to read the effective date from `brand-kit/company.ts`.
3. **Owner Factual Inputs**:
   - Collect missing company facts (founding year, official team bios with permission, social profile URLs) as listed in `docs/seo/OWNER_INPUT_NEEDED.md`.
4. **Legal Counsel Review & Proofreading**:
   - Have Bangladesh legal counsel review the operational commitments in `POLICY_REVIEW_NOTES.md` (e.g. 10-day refund window, 48h courier handover).
   - Have the owner proofread the Bangla policy texts.
   - Confirm trade license issuing authority before any mention.
5. **Domain & DNS Migration**:
   - Follow `docs/seo/OWNER_TASKS.md` to safely copy existing Google Workspace email records (MX, SPF, DKIM) before moving nameservers to Cloudflare.
   - Configure Cloudflare 301 redirect rule for `www.ruhanir.com` -> `ruhanir.com`.
6. **Outbound Division Link Strategy**:
   - Determine how outbound links to `store.ruhanir.com` (behind Cloudflare Access) and `it.ruhanir.com` behave during pre-launch.
7. **Brand Kit Governance**:
   - Maintain `brand-kit/CHANGELOG.md` and semantic versioning (`v1.0.0`).
   - Establish workflow for propagating updates to `Ruhanir-Store` and `Ruhanir-IT`.
8. **Post-Launch Operations**:
   - Submit sitemap to Google Search Console and Bing Webmaster Tools.
   - Execute the 6-month news publication plan (`docs/seo/CONTENT_PLAN.md`).

---

## 7. How to Run, Test, and Build

All commands are executed from the repository root:

```bash
# 1. Install dependencies from lockfile
npm ci

# 2. Type check TypeScript across all routes and scripts
npx tsc --noEmit

# 3. Build static production bundle into ./out
# (Set SITE_ENV=production to permit search indexing metadata)
# PowerShell:
$env:SITE_ENV='production'; npm run build
# Bash:
SITE_ENV=production npm run build

# 4. Run automated environment and robots test suite
npx tsx scripts/test-env-robots.ts

# 5. Run full Playwright SEO crawler audit against ./out
npx tsx scripts/seo-audit.ts

# 6. Run mobile layout inspector across 45 routes & 10 viewports
npx tsx scripts/check-mobile.ts docs/mobile/after

# 7. Run mobile Lighthouse audit on Home EN and BN
node scripts/run-lighthouse.mjs

# 8. Start local development server
npm run dev
```
