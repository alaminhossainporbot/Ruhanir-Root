# Baseline SEO and Technical Audit (Before Fixes)

- **Date:** 2026-11-04
- **Audited Target:** Local Production Export (`./out`)
- **Host Target:** `https://ruhanir.com`
- **Total URLs Crawled:** 45 HTML pages + `robots.txt` + `sitemap.xml`
- **Audit Tool:** `scripts/seo-audit.ts` (Playwright Chromium Crawler) + `scripts/seo-lighthouse-baseline.mjs` (Lighthouse Mobile v12.8.2)

---

## 1. Executive Summary & Defect Ranking

The baseline crawler evaluated 45 URLs across English (`/en/`) and Bangla (`/bn/`) plus the root route (`/`). A total of **17 defects** were identified across crawl hygiene, on-page SEO, heading hierarchy, and meta information.

### Severity Breakdown
| Severity | Count | Primary Impact Areas |
| :--- | :---: | :--- |
| **🔴 Critical** | 3 | Duplicate site-wide meta descriptions on 43 routes; duplicate title on `/` and `/en/`. |
| **🟡 Warning** | 12 | Canonical & language mismatch on `/`; duplicated title templates on news articles; long Bangla titles exceeding 600px desktop snippet width; skipped heading levels (H1 to H3) on news articles. |
| **🔵 Notice** | 2 | Minimal home titles (14 characters) lacking secondary entity descriptors. |

---

## 2. Ranked Findings by Severity

### 🔴 Critical Issues

1. **Duplicate Meta Description across 22 English Pages**
   - **Impacted URLs:** `/`, `/en/`, `/en/about/`, `/en/businesses/`, `/en/contact/`, `/en/news/`, `/en/legal/`, and all 15 legal policy pages.
   - **Current Description:** `"A technology-driven organization working on Bangladesh's digital infrastructure and modern commerce."`
   - **Issue:** Every single English inner page reused the fallback default description instead of a tailored, unique summary of page content. Search engines suppress snippet value when descriptions are identical sitewide.

2. **Duplicate Meta Description across 21 Bangla Pages**
   - **Impacted URLs:** `/bn/`, `/bn/about/`, `/bn/businesses/`, `/bn/contact/`, `/bn/news/`, `/bn/legal/`, and all 15 legal policy pages.
   - **Current Description:** `"বাংলাদেশের ডিজিটাল অবকাঠামো ও আধুনিক বাণিজ্যের জন্য কাজ করা একটি প্রযুক্তিভিত্তিক প্রতিষ্ঠান।"`
   - **Issue:** All Bangla policy and landing pages share the exact same sentence.

3. **Duplicate Title Tag on Root (`/`) and English Home (`/en/`)**
   - **Impacted URLs:** `/` and `/en/` both rendered `<title>Ruhanir Engine</title>`.
   - **Issue:** Root `/` serves as the language portal / chooser, whereas `/en/` is the English corporate homepage. They must maintain distinct titles.

---

### 🟡 Warnings

1. **Canonical Mismatch on Root Chooser (`/`)**
   - **Found:** `<link rel="canonical" href="https://ruhanir.com/en/">`
   - **Expected:** `https://ruhanir.com/` (Self-referencing canonical).
   - **Issue:** The root page mistakenly canonicalized to `/en/` while serving as the top-level language switcher and `x-default` entry.

2. **HTML `lang` Attribute Mismatch on Root (`/`)**
   - **Found:** `<html lang="en">`
   - **Expected:** `<html lang="bn">` (or bilingual default matching the primary jurisdiction).

3. **Skipped Heading Level on News Article (H1 directly to H3)**
   - **Impacted URLs:** `/en/news/website-launch/`, `/bn/news/website-launch/`
   - **Issue:** The article H1 is immediately followed by `<h3>Divisions</h3>` (or `<h3>বিভাগসমূহ</h3>`) in the sidebar without an intervening `<h2>`.

4. **Triple Brand Title Duplication on News Articles (Exceeds 600px)**
   - **EN:** `"Ruhanir Engine launches its website | Ruhanir Engine | Ruhanir Engine"` (~622px / 69 chars).
   - **BN:** `"রুহানীর ইঞ্জিনের ওয়েবসাইট চালু | রুহানীর ইঞ্জিন | রুহানীর ইঞ্জিন"` (~900px / 65 chars).
   - **Issue:** Double nesting of the `%s | Ruhanir Engine` title template in `src/app/[lang]/news/[slug]/page.tsx` and layout metadata resulted in title repetition that cuts off severely in SERPs.

5. **Bangla Titles Exceeding Search Snippet Pixel Width (~600px)**
   - Due to the wider horizontal glyph metrics of Bengali unicode script, several policy titles exceed standard snippet dimensions:
     - `/bn/digital-terms/`: 773px (55 characters)
     - `/bn/returns-refunds/`: 771px (56 characters)
     - `/bn/security/`: 726px (52 characters)
     - `/bn/support-policy/`: 695px (50 characters)
     - `/bn/confidentiality/`: 628px (45 characters)
     - `/bn/cookie-policy/`: 618px (45 characters)

---

### 🔵 Notices

1. **Short Homepage Titles (14 Characters)**
   - `/en/` renders `"Ruhanir Engine"`.
   - `/bn/` renders `"রুহানীর ইঞ্জিন"`.
   - **Recommendation:** Expand with concise parent organization entity signals without keyword stuffing:
     - EN: `Ruhanir Engine | Parent organization of Ruhanir IT & Store`
     - BN: `রুহানীর ইঞ্জিন (Ruhanir Engine) | মূল পরিচালনা সংস্থা`

---

## 3. Baseline Lighthouse Mobile Scores

Measured on local production build (`./out`) with simulated Moto G Power mobile throttling (4x CPU slowdown, Slow 4G):

| Route | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Home (EN)** `/en/` | 78 | 96 | 96 | 100 | 5.9s | 50ms | 0 |
| **Home (BN)** `/bn/` | 79 | 96 | 96 | 100 | 5.7s | 50ms | 0 |
| **About (EN)** `/en/about/` | 80 | 100 | 96 | 100 | 5.3s | 70ms | 0 |
| **About (BN)** `/bn/about/` | 80 | 100 | 96 | 100 | 5.3s | 50ms | 0 |
| **Businesses (EN)** `/en/businesses/` | 81 | 100 | 96 | 100 | 5.3s | 60ms | 0 |
| **Businesses (BN)** `/bn/businesses/` | 80 | 100 | 96 | 100 | 5.3s | 40ms | 0 |
| **News (EN)** `/en/news/` | 81 | 96 | 96 | 100 | 5.3s | 50ms | 0 |
| **News (BN)** `/bn/news/` | 80 | 96 | 96 | 100 | 5.3s | 60ms | 0 |
| **Contact (EN)** `/en/contact/` | 80 | 100 | 96 | 100 | 5.4s | 60ms | 0 |
| **Contact (BN)** `/bn/contact/` | 80 | 100 | 96 | 100 | 5.4s | 60ms | 0 |
| **Privacy Policy (EN)** `/en/privacy-policy/` | 78 | 100 | 96 | 100 | 5.2s | 80ms | 0 |
| **Privacy Policy (BN)** `/bn/privacy-policy/` | 76 | 100 | 96 | 100 | 5.5s | 100ms | 0 |

### Key Observations:
- **SEO Score:** 100 across all 12 routes.
- **Accessibility:** 96 - 100 across all routes.
- **CLS:** 0 on all routes (zero layout shift).
- **TBT:** 40ms - 100ms (well under the 200ms target).
- **Performance:** Constrained to ~78-81 primarily by LCP (5.2s - 5.9s) under simulated mobile throttling due to unoptimized hero SVG assets and un-preloaded font weights.
