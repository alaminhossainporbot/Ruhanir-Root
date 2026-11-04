# Brand Kit SEO Module

This package provides standardized, reusable SEO helpers, canonical/hreflang builders, schema generators, and crawl validators for the three Ruhanir web properties:
1. `ruhanir.com` (Parent corporate hub)
2. `it.ruhanir.com` (Ruhanir IT)
3. `store.ruhanir.com` (Ruhanir Store)

---

## 1. How Each Subdomain Must Differ (Strict Rules)

While sharing the same brand styling and design tokens, the three sites **must remain technically distinct** to avoid duplicate content penalties and canonical confusion:

| Requirement | Parent Hub (`ruhanir.com`) | Division 1 (`it.ruhanir.com`) | Division 2 (`store.ruhanir.com`) |
| :--- | :--- | :--- | :--- |
| **Canonical Host** | `https://ruhanir.com` | `https://it.ruhanir.com` | `https://store.ruhanir.com` |
| **Sitemap Scope** | Lists ONLY `ruhanir.com` URLs (never subdomains) | Lists ONLY `it.ruhanir.com` URLs | Lists ONLY `store.ruhanir.com` URLs |
| **Target Queries** | Brand: "Ruhanir Engine", "রুহানীর ইঞ্জিন", governance | Commercial & services: "ERP", "Custom Software", "IT Services" | Commercial: "Digital licenses", "Accessories", "Online store" |
| **Organization Schema** | Main Organization with `subOrganization` links | `Organization` with `parentOrganization` linking to `https://ruhanir.com` | `Organization` with `parentOrganization` linking to `https://ruhanir.com` |
| **Robots.txt** | Links to `https://ruhanir.com/sitemap.xml` | Links to `https://it.ruhanir.com/sitemap.xml` | Links to `https://store.ruhanir.com/sitemap.xml` |
| **Copy & Text** | Governance, corporate principles, legal hub | Technical deliverables, IT case studies, service SLAs | Product catalogs, ordering specifications, checkout policies |

---

## 2. Included Reusable Modules
- `metadata-builder.ts`: Generates Next.js `Metadata` with canonicals, hreflang, Open Graph, Twitter cards, and `SITE_ENV` environment gating.
- `jsonld-builders.ts`: Creates Schema.org compliant `Organization`, `WebSite`, `BreadcrumbList`, and `NewsArticle` schemas.
- `sitemap-generator.ts`: Produces valid Next.js `sitemap.xml` entries with alternate language links and content-based `lastmod`.
- `robots-generator.ts`: Controls crawler access based on `SITE_ENV`.
