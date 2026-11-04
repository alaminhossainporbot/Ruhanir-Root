# Site Owner Action Items & Best Practices: ruhanir.com

This document provides a step-by-step checklist of actions only the domain and account owner can execute in Cloudflare, Google Search Console, and Bing Webmaster Tools, along with explicit instructions on what **NOT** to do.

---

## 1. Domain Verification in Google Search Console (GSC)

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain** property (enter `ruhanir.com`, without `https://` or `www`).
3. Google will provide a TXT verification string like:
   `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
4. Open your **Cloudflare Dashboard** -> Select `ruhanir.com` -> **DNS** -> **Records**.
5. Click **+ Add record** with these exact parameters:
   - **Type:** `TXT`
   - **Name:** `@` (or `ruhanir.com`)
   - **Content:** `google-site-verification=...` (paste your Google code)
   - **TTL:** `Auto`
   - Click **Save**.
6. Return to Google Search Console and click **Verify**.
7. Once verified, go to **Sitemaps** in the left sidebar, enter `https://ruhanir.com/sitemap.xml`, and click **Submit**.

---

## 2. Verification in Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Click **Import from Google Search Console** (simplest 1-click method; uses your GSC verification).
3. If importing is not possible, choose manual verification:
   - Add a `TXT` record in Cloudflare DNS:
     - **Type:** `TXT`
     - **Name:** `@`
     - **Content:** *(Bing verification value)*
4. Submit `https://ruhanir.com/sitemap.xml` under **Sitemaps**.

---

## 3. Cloudflare Configuration (www Redirect & HTTPS)

In your earlier screenshot, `www.ruhanir.com` was pointed to Namecheap's parking page. To redirect all `www` visitors cleanly to the root domain:

### Step 3A: Cloudflare DNS for `www`
1. In Cloudflare **DNS Records**, edit or delete the old `parkingpage.namecheap.com` CNAME.
2. Add a new record:
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Target:** `ruhanir.com`
   - **Proxy status:** **Proxied** (Orange Cloud turned ON)
   - Click **Save**.

### Step 3B: Cloudflare Redirect Rule (www to Apex)
1. In Cloudflare left sidebar, navigate to **Rules** > **Redirect Rules**.
2. Click **Create rule**.
3. **Rule name:** `Redirect www to apex`
4. Under **Field:** select `Hostname`, **Operator:** `equals`, **Value:** `www.ruhanir.com`
5. Under **Then:**
   - **Type:** `Dynamic`
   - **Expression:** `concat("https://ruhanir.com", http.request.uri.path)`
   - **Status code:** `301` (Permanent Redirect)
   - **Preserve query string:** Checked (Yes)
6. Click **Deploy**.

### Step 3C: SSL / HTTPS Settings
1. Go to **SSL/TLS** > **Overview**: ensure encryption mode is set to **Full (strict)**.
2. Go to **SSL/TLS** > **Edge Certificates**: ensure **Always Use HTTPS** is toggled **ON**.

---

## 4. Legitimate Brand Building (Trust & E-E-A-T)

1. **Official Social Profiles:**
   - Only create social accounts (LinkedIn, Facebook, GitHub, X) if your organization intends to post and monitor them.
   - Use the exact company name `Ruhanir Engine` (or `রুহানীর ইঞ্জিন`), use the official logo, and link back to `https://ruhanir.com`.
   - Send the URLs to be added to the `sameAs` structured data schema.
2. **Natural Partnerships:**
   - Ask real institutional clients, educational institutions, or vendors who use Ruhanir IT services to link back to `https://ruhanir.com` or `https://it.ruhanir.com` from their websites.
   - If registered with BASIS or e-CAB, list `ruhanir.com` in their member directories.

---

## 5. What You MUST NEVER Do (Critical Warnings)

> [!CAUTION]
> Avoid harmful SEO practices that cause manual search penalties, algorithmic bans, or brand damage:

- ❌ **NEVER buy "SEO packages" or "backlink blasts":** Any agency promising "1,000 high-DA backlinks for \$50" will place automated links on link farms, resulting in immediate Google spam penalties.
- ❌ **NEVER promise or pay for #1 search rankings:** Legitimate SEO relies on technical excellence and truthful entity signals; Google algorithmically penalizes paid rank manipulation.
- ❌ **NEVER post fake customer reviews or simulated star ratings:** Schema.org review or rating markups on sites without legitimate third-party customer verification violate Google's Structured Data guidelines.
- ❌ **NEVER create doorway or thin duplicate sites:** Do not clone this website across multiple throwaway domains (e.g. `ruhanir-engine.com`, `ruhanir-bangladesh.com`). All authority belongs on `ruhanir.com`.
- ❌ **NEVER mass-produce low-quality AI articles:** Publish only verified announcements and genuine technical articles grounded in real work.
