# Canonical Redirects and Legacy URL Mappings: ruhanir.com

This document catalogs all host-level canonical redirects, protocol upgrades, and potential legacy URL mappings for the Ruhanir Engine root domain (`ruhanir.com`).

---

## 1. Domain & Protocol Redirects (Host-Level: Cloudflare)

These redirects must be enforced at the DNS / Edge CDN layer (Cloudflare Redirect Rules) to guarantee single canonical authority and prevent duplicate indexing:

| Incoming Source Pattern | Target Destination | HTTP Status | Purpose |
| :--- | :--- | :---: | :--- |
| `http://ruhanir.com/*` | `https://ruhanir.com/$1` | **301** | Strict SSL / HTTPS enforcement |
| `http://www.ruhanir.com/*` | `https://ruhanir.com/$1` | **301** | Apex domain canonicalization |
| `https://www.ruhanir.com/*` | `https://ruhanir.com/$1` | **301** | Apex domain canonicalization |

---

## 2. Directory & Path Normalization

All static routes use a mandatory trailing slash to match the static export directory structure (`out/[lang]/[page]/index.html`):

| Source Request | Target Destination | HTTP Status | Handling Layer |
| :--- | :--- | :---: | :--- |
| `https://ruhanir.com/en` | `https://ruhanir.com/en/` | **301** | Cloudflare Worker / Assets |
| `https://ruhanir.com/bn` | `https://ruhanir.com/bn/` | **301** | Cloudflare Worker / Assets |
| `https://ruhanir.com/en/about` | `https://ruhanir.com/en/about/` | **301** | Cloudflare Worker / Assets |
| `https://ruhanir.com/bn/about` | `https://ruhanir.com/bn/about/` | **301** | Cloudflare Worker / Assets |

---

## 3. Legacy / Short URL Fallbacks

Visitors or old backlinks accessing un-prefixed corporate URLs receive 301 redirects to the default language or equivalent hub:

| Requested URL | Target Destination | HTTP Status | Notes |
| :--- | :--- | :---: | :--- |
| `/about/`, `/about` | `https://ruhanir.com/en/about/` | **301** | Default English company overview |
| `/contact/`, `/contact` | `https://ruhanir.com/en/contact/` | **301** | Direct contact portal |
| `/businesses/`, `/businesses` | `https://ruhanir.com/en/businesses/` | **301** | Divisions index |
| `/news/`, `/news` | `https://ruhanir.com/en/news/` | **301** | Official announcements |
| `/legal/`, `/legal` | `https://ruhanir.com/en/legal/` | **301** | Corporate policy hub |
| `/privacy/`, `/privacy` | `https://ruhanir.com/en/privacy-policy/` | **301** | Legacy privacy alias |
| `/terms/` | `https://ruhanir.com/en/terms/` | **301** | General terms alias |

---

## 4. 404 & 410 Handling
- Any URL not matching an indexable route or a recognized redirect returns **HTTP 404** using the custom bilingual 404 page (`/404.html`), which provides clear navigation links back to `/en/` and `/bn/`.
- No soft-404s (pages returning 200 with "Not Found" content) exist anywhere on the domain.
