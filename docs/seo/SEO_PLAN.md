# SEO Implementation Plan: Ruhanir Engine (ruhanir.com)

- **Target Domain:** `https://ruhanir.com`
- **Scope:** Corporate parent hub; authority passing to `it.ruhanir.com` and `store.ruhanir.com`; brand search optimization (`Ruhanir`, `Ruhanir Engine`, `Ruhanir IT`, `Ruhanir Store`, `রুহানীর`).
- **Principles:** Zero keyword stuffing, zero fake reviews/awards/ratings, honest brand metadata, strict bilingual parity (EN & BN), mobile-first performance.

---

## 1. Technical Architecture & URL Hygiene (Section A)
1. **Canonical Host & Trailing Slashes:**
   - Enforce single canonical origin `https://ruhanir.com` with mandatory trailing slash on directory routes (e.g. `/en/about/`, `/bn/about/`).
   - Root `/` self-references with canonical `https://ruhanir.com/` and hreflang `x-default="https://ruhanir.com/"`.
2. **Environment Isolation (`SITE_ENV`):**
   - Non-production hosts (`*.workers.dev`, `localhost`, `workbookbd.com`) must output `noindex, nofollow` HTTP headers and meta tags. Production (`SITE_ENV=production`) allows standard indexing.
   - Implement unit test `test-env-robots.test.ts` to enforce this rule.
3. **Crawl Directives & Discovery:**
   - Clean `robots.txt` referencing `https://ruhanir.com/sitemap.xml`.
   - Dynamic `sitemap.xml` with alternate hreflang entries and genuine content lastmod (git/content dates, not build timestamp).
   - RSS feeds: `/en/rss.xml` and `/bn/rss.xml` for news articles.
4. **Error Handling:**
   - Standalone 404 page returning HTTP 404 with navigation links.

---

## 2. On-Page Optimization & Metadata (Section B)
1. **Metadata Draft (`docs/seo/METADATA.md`):**
   - Unique, truthful title and meta description for all 22 English and 21 Bangla routes.
   - Incorporate natural Latin entity references in Bangla titles (e.g. `রুহানীর ইঞ্জিন (Ruhanir Engine)`).
   - Keep titles within ~600px desktop snippet limits.
2. **Heading & Semantic Hierarchy:**
   - Exactly one H1 per page stating the exact topic.
   - Fix news article sidebar heading skip (H1 directly to H3 -> convert to semantic H2).
3. **Internal & Cross-Domain Linking:**
   - Descriptive anchor text linking to divisions (`it.ruhanir.com`, `store.ruhanir.com`).
   - Visible breadcrumbs with corresponding `BreadcrumbList` JSON-LD schema on inner pages.
   - Related policy block on legal pages.

---

## 3. Structured Data Schema (Section C)
1. **Organization Schema (Home & About):**
   - Includes official name, alternateName (`রুহানীর ইঞ্জিন`), URL, 512x512 logo, verified phone/email, `subOrganization` links to IT and Store.
   - Absolutely no fake reviews, ratings, FAQs, or commercial product markup on the corporate root.
2. **WebSite Schema:** Site name and alternateName without fake SearchAction.
3. **BreadcrumbList Schema:** On all inner pages.
4. **NewsArticle Schema:** On news articles with real publish dates and author organization.

---

## 4. Performance & Core Web Vitals (Section D)
1. **Hero Asset & Font Optimization:**
   - Preload primary font weights for Inter and Noto Sans Bengali.
   - Optimize logo vector and include explicit dimensions to optimize mobile LCP.
2. **Security & Cache Headers:**
   - Define Cloudflare HTTP headers (HSTS, X-Content-Type-Options, Referrer-Policy, CSP).

---

## 5. Social Sharing & Assets (Section E)
1. **Open Graph & Twitter Cards:**
   - Complete tags on every route.
   - Generate high-resolution 1200x630 OG image cards for page types in both languages under 300KB.
   - Web app manifest (`manifest.webmanifest`) and standard favicons.

---

## 6. Documentation & Owner Guidance (Sections F-J)
1. `docs/seo/METADATA.md`: Full catalog of every page's title and description.
2. `docs/seo/OWNER_INPUT_NEEDED.md`: Factual gaps and missing business verification items.
3. `docs/seo/OWNER_TASKS.md`: Plain-language guide for DNS, GSC, Bing verification, Cloudflare redirects.
4. `docs/seo/CONTENT_PLAN.md`: 12 proposal post ideas for the first 6 months.
5. `docs/seo/MEASUREMENT.md`: Guide to Search Console, Bing, and cookieless metrics.
6. `docs/seo/REDIRECTS.md`: Record of redirects and legacy URL mappings.
7. `brand-kit/seo/`: Reusable package for `it.ruhanir.com` and `store.ruhanir.com`.
