# Search Console, Measurement & Privacy-First Analytics Guide

This guide is written for non-developers and site owners to monitor the search visibility, indexing health, and audience performance of `ruhanir.com` without installing invasive tracking scripts or privacy-violating cookies.

---

## 1. Zero-Tracker Search Intelligence

No Google Analytics, tracking cookies, or user fingerprinting scripts are loaded on `ruhanir.com`. Instead, 100% truthful data about how search engines crawl, index, and display your site comes directly from search engine webmaster platforms:

### A. Google Search Console (GSC)
- **Property Type:** Always add a **Domain Property** (`ruhanir.com`), not a URL prefix. This automatically covers `https://ruhanir.com`, `http://`, `www.`, and all subdomains.
- **Verification Method:** DNS TXT Record in Cloudflare DNS (format provided in `OWNER_TASKS.md`).
- **Sitemap Submission:** Submit `https://ruhanir.com/sitemap.xml`.

### B. Bing Webmaster Tools
- **Verification:** Can be verified with a single click by importing your verified Google Search Console account, or via a separate DNS TXT record.
- **Sitemap Submission:** Submit `https://ruhanir.com/sitemap.xml`.

---

## 2. Weekly Monitoring Routine: What Reports to Read

Spend 10 minutes every Monday morning checking these 4 core tabs in Google Search Console:

### 1. Performance (Search Results)
- **What to look at:**
  - **Queries:** Are people searching for brand queries (`ruhanir`, `ruhanir engine`, `ruhanir it`, `ruhanir store`, `রুহানীর`)?
  - **Clicks vs. Impressions:** How many times your site appeared in search results (impressions) and how many users clicked through.
  - **Average CTR (Click-Through Rate):** Brand searches typically command a high CTR (25%–50%+).
  - **Average Position:** Should be #1 for your exact brand names.
- **Filters:** Review performance by **Pages** (are `/en/` and `/bn/` both receiving traffic?) and **Countries** (Bangladesh should be primary).

### 2. Indexing (Pages & Sitemaps)
- **What to look at:**
  - Under **Sitemaps**, verify `sitemap.xml` shows status **Success** and reports all 45 indexable URLs submitted.
  - Under **Pages**, check "Indexed" vs "Not Indexed".
  - Expected "Not Indexed" items: URL redirects (e.g. `http://` or `www.`), preview domains (`*.workers.dev`), or URLs blocked by `noindex`.
  - Check for any "Duplicate without user-selected canonical" or "Discovered – currently not indexed" errors.

### 3. Page Experience & Core Web Vitals
- **What to look at:**
  - **Mobile vs Desktop:** Confirms whether your URLs have "Good" status on mobile (LCP < 2.5s, CLS < 0.1, INP < 200ms).

### 4. Links
- **What to look at:**
  - **Top linked pages:** Confirms that genuine incoming links point to your homepage and divisions.
  - **Internal links:** Confirms healthy distribution of internal authority between Home, About, Businesses, and Policies.

---

## 3. What to Expect: 4, 8, and 12-Week Milestones

Search engine indexing takes time. Do not panic if numbers take weeks to accumulate:

- **Weeks 1 to 4 (Crawling & Entity Discovery):**
  - Googlebot crawls `robots.txt` and `sitemap.xml`.
  - The root domain is indexed. Brand searches for "Ruhanir Engine" begin appearing.
  - Clicks will be minimal while initial rankings stabilize.
- **Weeks 5 to 8 (Snippet & Hreflang Settling):**
  - Search results display site name "Ruhanir Engine" and "রুহানীর ইঞ্জিন".
  - Bengali and English pages rank appropriately based on user language preferences.
  - Impressions for division terms ("Ruhanir IT", "Ruhanir Store") begin registering.
- **Weeks 9 to 12 (Authority Consolidation):**
  - Clear entity recognition in the knowledge panel or top brand carousel.
  - Stable #1 ranking for brand queries.
  - Authority flows to `it.ruhanir.com` and `store.ruhanir.com`.

---

## 4. Optional Cookieless Analytics: Cloudflare Web Analytics

If you want to view real-time visitor counts without storing cookies or invading user privacy:

- **Recommendation:** **Cloudflare Web Analytics** (built into your Cloudflare dashboard).
- **How it works:** Cloudflare counts visits at the network/proxy layer without writing cookies, storing IP addresses, or tracking across websites.
- **Privacy Policy Requirement:** Zero cookie consent banners are needed because no cookies or persistent identifiers are used. We only need a single sentence in `docs/seo/METADATA.md` and `/privacy-policy/`:
  > *"We utilize privacy-first, cookieless edge analytics provided by Cloudflare to monitor anonymous aggregated pageview counts without tracking individual users."*
- **Action:** If you wish to enable this, you can turn on Cloudflare Web Analytics in your Cloudflare dashboard with a single toggle under the Analytics tab.
