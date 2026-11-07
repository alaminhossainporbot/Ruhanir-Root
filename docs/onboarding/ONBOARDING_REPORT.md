# Read-Only Onboarding Report: Ruhanir Root Hub (`ruhanir.com`)

**Date:** 2026-11-07  
**Auditor:** Antigravity AI Pair Programmer  
**Target Repository:** `Ruhanir-Root` (Corporate root hub for Ruhanir Engine)  
**Host Environment:** Windows local machine, Node `v24.13.0`, npm `11.18.0`  
**Execution Scope:** Read-only analysis, static verification, dependency installation, typecheck, production build, automated crawlers, and Lighthouse audits. Zero application code modified; zero git mutations.

---

## 1. Repository State

| Attribute | Observed Reality | Notes / Implications |
| :--- | :--- | :--- |
| **Repository Type** | **Unpacked archive / Directory copy** | No `.git` folder exists in the workspace. |
| **Git Branch** | `N/A` | Not a git repository. |
| **Last 20 Commits** | `N/A` | No git commit history available locally. |
| **Uncommitted Changes** | `N/A` | Git tracking is uninitialized. |
| **Remote URL** | `N/A` | No remote URL or embedded tokens exist. |
| **Package Lockfile** | `package-lock.json` present | Lockfile version 3 (216,115 bytes). Dependencies pinned cleanly. |
| **Node Version Requirement** | **Not pinned** | No `engines` field in `package.json`, and no `.nvmrc` or `.node-version`. Running under Node `v24.13.0`. **Recommendation**: Pin `"engines": { "node": ">=20.x <25.x" }` in `package.json` to guarantee reproducible builds across developer and CI/CD machines. |
| **NPM Scripts** | 5 scripts configured: | `dev` (`next dev`)<br>`build` (`next build`)<br>`start` (`next start`)<br>`deploy` (`wrangler deploy`)<br>`prepare-assets` (`node scripts/prepare-assets.mjs`) |
| **Missing Scripts** | `typecheck`, `lint`, `test` | No scripts defined in `package.json` for running TypeScript checks, linting, or tests. |

---

## 2. Environment Safety & Secret Audit

### Environment Variable Usage

| Variable Name | Required? | Source / Location | Safe Handling & Fallback Behavior |
| :--- | :---: | :--- | :--- |
| `SITE_ENV` | Optional (Production Only) | `src/lib/metadata.ts`<br>`src/app/(root)/layout.tsx`<br>`src/app/[lang]/news/[slug]/page.tsx`<br>`src/worker.ts`<br>`brand-kit/seo/` | Controls search engine indexing. If `SITE_ENV === 'production'`, metadata emits `{ index: true, follow: true }`. In all other cases (unset, `preview`, `staging`, `development`), it **fails closed** to `{ index: false, follow: false }` (`noindex, nofollow`). Edge worker injects `X-Robots-Tag: noindex, nofollow` on non-production hosts. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional | `src/components/ContactForm.tsx` | Target URL for contact inquiries. If unset, form **gracefully falls back to a pre-filled `mailto:info@ruhanir.com` link**. Never emits a fake success message or silent failure. |
| `ASSETS` | System | `wrangler.jsonc`<br>`src/worker.ts` | Cloudflare Workers static asset binding pointing to `./out`. |

### Dotenv Files & Secrets

- **`.env*` Files in Workspace**: **None found**. No `.env`, `.env.local`, `.env.production`, or `.env.staging` files exist in the project directory.
- **`.gitignore` Rules**: `.env`, `.env.local`, and `.env.production` are strictly ignored in `.gitignore` (lines 6–8).
- **Secret Scan Results**: An exhaustive scan of all source files, markdown documents, JSON configs, and scripts identified **zero secret keys, API tokens, private keys, passwords, database URLs, or Cloudflare credentials**.
  - High-entropy matches in documentation (`docs/seo/OWNER_TASKS.md`) were verified as dummy documentation placeholders (e.g. `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`).

---

## 3. Plan Versus Reality Verification

Every assertion in sections 2 through 4 of the CONTEXT BRIEF was evaluated against the physical codebase.

### Status Classifications:
- **Confirmed**: Code and architecture exactly match the brief.
- **Partly**: Core functionality is present, but differences in configuration, partial implementation, or divergence between the brand kit and root application exist.
- **Contradicted**: Reality directly conflicts with the statement.

### Detailed Statement Analysis

| Section & Assertion | Status | File Path(s) | Evidence & Detailed Findings |
| :--- | :---: | :--- | :--- |
| **2. Stack**: Next.js App Router, TS, Tailwind, static export, self-hosted fonts, no DB, no tracking | **Confirmed** | `package.json`<br>`next.config.mjs`<br>`src/lib/fonts.ts`<br>`src/app/globals.css` | Next.js `16.4.3` App Router, TypeScript `7.0.2`, Tailwind v4 (`@tailwindcss/postcss` `4.3.3`), `output: 'export'`, `trailingSlash: true`. Fonts loaded via `next/font/local` using `inter-latin.woff2` and `noto-sans-bengali.woff2`. Zero database libraries; zero analytics/tracking tags. |
| **2. Routes & Chooser**: Bilingual `/en` and `/bn`, crawlable chooser at `/`, hreflang with `x-default`, structured content per language, Bangla fallback | **Confirmed** | `src/app/(root)/page.tsx`<br>`src/app/(root)/layout.tsx`<br>`src/app/[lang]/`<br>`src/content/en.ts`<br>`src/content/bn.ts` | Root `/` renders crawlable HTML links to `/bn/` and `/en/`, with client-side localStorage fallback redirect. Root layout has `lang="bn"`, canonical `https://ruhanir.com/`, alternates for `bn`, `en`, and `x-default`. All copy stored in `src/content/en.ts` and `src/content/bn.ts`. |
| **2. Home Page**: Hero (7/5 split, logo mark), "at a glance" strip, divisions with ordinal panels, About summary with 4 principles as ruled list, navy contact band | **Confirmed** | `src/app/[lang]/page.tsx` | Desktop 7/5 column grid (`lg:col-span-7` text, `lg:col-span-5` logo); hairline 3-column "At a glance" strip; divisions section on `#F5F7FA` with ordinals `01`/`০১` and `02`/`০২`; About summary with 4 principles rendered as a ruled `<dl>`; CTA band in `#05308A`. |
| **2. Footer**: Light footer with four columns | **Partly** | `src/components/Footer.tsx`<br>`brand-kit/components/Footer.tsx` | The footer is on `#F5F7FA` (light band) with localized copyright and trade license, but renders **5 columns**, not 4: 1. Brand/Description, 2. Divisions, 3. Company, 4. Contact, 5. Legal. |
| **2. Primary Pages**: About, Businesses, News, Contact | **Confirmed** | `src/app/[lang]/about/page.tsx`<br>`src/app/[lang]/businesses/page.tsx`<br>`src/app/[lang]/news/page.tsx`<br>`src/app/[lang]/contact/page.tsx` | All 4 core pages exist in English and Bengali with full content and metadata. |
| **2. News Architecture**: Markdown posts per language, RSS, one launch post | **Confirmed** | `src/content/news/en/website-launch.md`<br>`src/content/news/bn/website-launch.md`<br>`src/app/en/rss.xml/route.ts`<br>`src/app/bn/rss.xml/route.ts` | Exactly 1 launch post in EN and BN. Static RSS XML route handlers generate valid RSS 2.0 feeds at `/en/rss.xml` and `/bn/rss.xml`. |
| **2. Contact Form**: No map, no address; honeypot, minimum-time check, Turnstile, endpoint or mailto fallback, never a fake success message | **Partly** | `src/components/ContactForm.tsx`<br>`src/app/[lang]/contact/page.tsx` | No map or address present. Form has invisible honeypot (`name="website_url"`), 3000ms minimum submission time check, uses `NEXT_PUBLIC_CONTACT_ENDPOINT` with `mailto:` client fallback, and strictly validates response status. **Turnstile is NOT implemented**. |
| **2. Legal Hub & Policies**: English and Bangla with one effective date from a single config value | **Partly** | `src/app/[lang]/legal/page.tsx`<br>`src/app/[lang]/[policy]/page.tsx`<br>`src/components/LegalLayout.tsx` | Full 15-policy suite exists in EN and BN. However, the effective date (`29 October 2026`) is **hardcoded inside `src/components/LegalLayout.tsx` and duplicated in each page**, rather than imported from `brand-kit/company.ts`. |
| **2. 404, Sitemap, Robots, Favicons, OG**: Bilingual 404, sitemap, robots, favicons, OG images | **Confirmed** | `src/app/not-found.tsx`<br>`src/app/sitemap.ts`<br>`src/app/robots.ts`<br>`public/` | Bilingual 404 page exports statically to `404.html`. Sitemap includes all 45 URLs with `xhtml:link` alternates. Robots allows `/` and points to sitemap. Complete favicon package and 1200x630 `og-image.png` present. |
| **2. Design Tokens**: Teal decorative only, cyan, royal, navy, heading, body, secondary, band, border; gradients only in logo; no emojis; no scroll animations | **Confirmed** | `src/app/globals.css`<br>`brand-kit/tokens/tokens.ts` | All tokens match exact hex values (`#42D1CC`, `#1499C8`, `#0E52C3`, `#05308A`, `#0B1B3A`, `#1F2937`, `#374151`, `#4B5563`, `#F5F7FA`, `#E2E8F0`). Teal is never used for text. Zero emojis in code. No scroll-reveal animations. |
| **2. Typography Rules**: Body 17–18px, nothing below 14px; Bangla line-height 1.8 and headings 1.35–1.45; accessible focus; mobile-first; Bangla digits | **Partly** | `src/app/globals.css`<br>`src/lib/digits.ts`<br>`src/app/[lang]/news/page.tsx` | Body is 17px/18px; Bangla line-height is 1.8, headings 1.38; focus rings are 2px royal; digits formatted with `toBanglaDigits`. **Divergence**: `src/app/[lang]/news/page.tsx` uses `text-[13px]` for date and `text-[12px]` for the "Notice" badge. |
| **3. Brand Kit Contents**: tokens, fonts, assets, components, company.ts, legal-content, README, seo | **Confirmed** | `brand-kit/` | All specified subdirectories and files exist. |
| **3. Logo Assets**: Raster files only (PNG, WebP); no clean vector SVG exists | **Confirmed** | `brand-kit/assets/`<br>`src/components/Logo.tsx`<br>`logo.svg` | Production components consume only `/logo-400.webp`, `/logo-800.webp`, `/logo-1200.webp`, and PNG fallbacks. A raw `logo.svg` exists at root from earlier attempts, but is unused in production code. |
| **3. Canonical Spelling & License**: `company.ts` is single source of truth | **Partly** | `brand-kit/company.ts`<br>`src/content/en.ts`<br>`src/content/bn.ts` | `company.ts` holds canonical values, but `src/content/en.ts` and `bn.ts` currently repeat strings independently rather than importing from `company.ts`. |
| **4. Mobile Layout Defect Status**: Mobile layout fixes (header drawer, hero stacking, overflow) execution status unknown | **Confirmed Executed** | `src/components/Header.tsx`<br>`src/app/[lang]/page.tsx`<br>`docs/mobile/after/` | The mobile defect fix prompt **was executed**. Header has mobile drawer, hamburger button below 1100px, scroll lock, and focus trap. Hero logo stacks below text on mobile and is constrained to `220px`. Horizontal scroll and overflow defects are 0. |
| **4. SEO Prompt Status**: Execution status unknown | **Confirmed Executed** | `src/lib/metadata.ts`<br>`scripts/seo-audit.ts`<br>`docs/seo/` | The SEO prompt **was executed**. Centralized route metadata, Schema.org JSON-LD (`Organization`, `WebSite`, `Breadcrumbs`, `Article`), `SITE_ENV` gating, and full crawler test suite were completed. |

### Where the Previous Agent Stopped
The previous engineering agent completed the comprehensive SEO overhaul on **2026-11-04**, documented the results in `docs/seo/SEO_AUDIT_AFTER.md`, and prepared documentation for owner inputs (`docs/seo/OWNER_TASKS.md`, `docs/seo/OWNER_INPUT_NEEDED.md`). The project was then packaged and moved to this new computer. No new features, code modifications, or deployments have occurred since.

---

## 4. Safe Checks Execution Summary

All commands were executed in clean, non-destructive read-only or build-only modes.

### 1. `npm ci`
- **Result:** **PASSED (Exit Code: 0)**
- Installed 307 packages in 57 seconds from `package-lock.json`.
- Warnings: Deprecation notice for `@opentelemetry/sdk-trace-base@1.30.1` (transitive dependency of Cloudflare Wrangler).

### 2. TypeScript Compilation Check (`npx tsc --noEmit`)
- **Result:** **PASSED (Exit Code: 0)**
- Clean compilation across all 45 routes, brand-kit components, utility libraries, and scripts. Zero TypeScript errors.

### 3. Linting
- **Result:** **SKIPPED (No Linter Installed)**
- `package.json` contains no `lint` script, and ESLint is not present in `devDependencies`.

### 4. Production Static Build (`$env:SITE_ENV='production'; npm run build`)
- **Result:** **PASSED (Exit Code: 0)**
- Next.js 16.4.3 (Turbopack) successfully prerendered **51/51 static assets and pages** into `./out`:
  - 1 root language chooser (`index.html`)
  - 1 bilingual 404 page (`404.html`)
  - 42 bilingual pages (`/en/` and `/bn/` for home, about, businesses, news, contact, legal, and 15 policies)
  - 2 news article pages (`/en/news/website-launch/` and `/bn/news/website-launch/`)
  - 2 RSS XML feeds (`/en/rss.xml`, `/bn/rss.xml`)
  - 2 SEO endpoints (`/robots.txt`, `/sitemap.xml`)

### 5. Automated Test Suite (`npx tsx scripts/test-env-robots.ts`)
- **Result:** **PASSED (9/9 Assertions Passed, Exit Code: 0)**
  - ✓ PASS: Production metadata specifies `index: true, follow: true`
  - ✓ PASS: Non-production metadata specifies `index: false, follow: false (noindex)`
  - ✓ PASS: `*.workers.dev` receives `X-Robots-Tag: noindex, nofollow`
  - ✓ PASS: `*.pages.dev` receives `X-Robots-Tag: noindex, nofollow`
  - ✓ PASS: `workbookbd.com` receives `X-Robots-Tag: noindex, nofollow`
  - ✓ PASS: `localhost` receives `X-Robots-Tag: noindex, nofollow`
  - ✓ PASS: Production `ruhanir.com` does NOT receive `noindex` in `X-Robots-Tag`
  - ✓ PASS: `ruhanir.com` with `SITE_ENV!=production` receives `X-Robots-Tag: noindex, nofollow`
  - ✓ PASS: `sitemap.xml` contains zero preview or staging hostnames

### 6. Full SEO Crawler Audit (`npx tsx scripts/seo-audit.ts`)
- **Environment Preparation:** Installed Playwright Chromium browser binaries via `npx playwright install chromium` into local cache.
- **Result:** **PASSED (Exit Code: 0)**
  - Total URLs Crawled: **45**
  - Sitemap URLs Verified: **45**
  - 🔴 Critical Issues: **0**
  - 🟡 Warnings: **0**
  - 🔵 Notices: **0**

### 7. Mobile Layout Crawler (`npx tsx scripts/check-mobile.ts`)
- **Result:** **EXECUTION COMPLETE (Exit Code: 0)**
  - Tested 45 routes across 10 viewports (320px, 360px, 375px, 390px, 414px, 480px, 600px, 768px, 1024px, 1280px).
  - **Horizontal Scroll Defects:** **0**
  - **Element Overflow Defects:** **0**
  - **Header Layout Defects:** **0**
  - **Hero Logo Scaling Defects:** **0**
  - **Tap-Target Flags (368):** Breadcrumb links (`Home` / `প্রচ্ছদ`) have full 44px touch height, but natural inline width is 33px–40px, triggering the script's strict `width >= 44 && height >= 44` rule.
  - **Typography Flags (20):** `src/app/[lang]/news/page.tsx` uses `text-[13px]` for dates and `text-[12px]` for the "Notice" badge.

### 8. Mobile Lighthouse Audit (`node scripts/run-lighthouse.mjs`)
- Tested under simulated mobile conditions (Moto G Power, 390x844, 4x CPU throttling, slow 4G network):

| Route | Performance | Accessibility | Best Practices | SEO |
| :--- | :---: | :---: | :---: | :---: |
| **Home (English) `/en/`** | 74 | 96 | 79 | **100** |
| **Home (Bangla) `/bn/`** | 74 | 96 | 79 | **100** |

---

## 5. Disagreements Between Documentation and Code

1. **Effective Date Centralization**:
   - *Brief:* "Legal hub and policy pages in English and Bangla with one effective date from a single config value."
   - *Code:* The date `2026-10-29` is hardcoded as a string literal inside `src/components/LegalLayout.tsx` (lines 25–26) and repeated as `lastUpdated="2026-10-29"` across all 15 policy page components, rather than being imported from `company.ts`.
2. **Turnstile Spam Defense**:
   - *Brief:* Contact form includes Turnstile widget.
   - *Code:* `src/components/ContactForm.tsx` has honeypot, 3-second elapsed time check, and mailto fallback, but zero Turnstile scripts or Cloudflare verification logic.
3. **Footer Column Count**:
   - *Brief:* "Light footer with four columns."
   - *Code:* `src/components/Footer.tsx` and `brand-kit/components/Footer.tsx` render **5 columns** (Brand, Divisions, Company, Contact, Legal).
4. **News Typography**:
   - *Brief:* "Body 17 to 18px, nothing below 14px."
   - *Code:* `src/app/[lang]/news/page.tsx` renders `text-[13px]` (date) and `text-[12px]` (Notice badge).
5. **Brand Kit Header vs. Application Header**:
   - *Code:* `src/components/Header.tsx` includes the full mobile drawer, 1100px media queries, focus trap, and scroll lock. `brand-kit/components/Header.tsx` still has the older desktop-only collapse (`hidden lg:flex`) without the mobile drawer.
6. **Brand Kit Legal Content vs. Published Policies**:
   - *Code:* `brand-kit/legal-content/` contains 1-paragraph markdown stubs generated by `scripts/generate-brandkit-policies.mjs`. The actual published policy text lives as JSX inside `src/app/[lang]/[policy]/page.tsx`.
7. **`README.md` Stale Overview**:
   - *Code:* `README.md` references `tailwind.config.ts` (deleted in Tailwind v4) and lists only 4 routes instead of the 45 compiled routes.

---

## 6. Three Most Urgent Risks

### 🔴 Risk 1: Domain DNS Cutover & Email Outage
- **Details:** The domain `ruhanir.com` is registered at Namecheap with existing Google Workspace email records (MX, SPF, DKIM). It is not yet delegated to Cloudflare DNS.
- **Impact:** If the owner switches nameservers to Cloudflare without first copying existing DNS and mail exchange records, corporate email delivery (`info@ruhanir.com` and `support@ruhanir.com`) will immediately break.
- **Mitigation:** The owner must follow the step-by-step DNS backup and migration procedure documented in `docs/seo/OWNER_TASKS.md` before updating nameservers.

### 🔴 Risk 2: Broken Cross-Site Division Links at Launch
- **Details:** The header, footer, businesses page, and home page prominently link to `https://it.ruhanir.com` and `https://store.ruhanir.com`. However, `store.ruhanir.com` is protected behind Cloudflare Access (blocking unauthorized public visitors), and `it.ruhanir.com` is under development.
- **Impact:** Visitors clicking division links on the public root hub will encounter Cloudflare Access login gates or incomplete applications.
- **Mitigation:** The owner must decide (as noted in open task f) whether to launch all three sites simultaneously, or temporarily suppress outbound division links/replace them with "Coming Soon" notices until the divisions are ready.

### 🔴 Risk 3: Legal Exposure from Unreviewed Bangladesh Statutory Terms
- **Details:** The root site publishes 15 legally binding policy documents covering consumer refunds (10-day refund window), product delivery (48-hour handover, 10-day maximum delivery), and warranty terms. The Bangla legal copy has not been reviewed by local counsel or proofread by the owner.
- **Impact:** Under Bangladesh Digital Commerce Guidelines and the Consumer Rights Protection Act, unverified operational commitments published on the corporate site are legally enforceable.
- **Mitigation:** Legal counsel must review the specific operational commitments flagged in `POLICY_REVIEW_NOTES.md` before the site is made public and indexed.
