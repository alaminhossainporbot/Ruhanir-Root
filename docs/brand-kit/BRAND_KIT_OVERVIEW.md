# Ruhanir Brand Kit Overview

This document provides a comprehensive inventory, technical specification, and governance guide for the **Ruhanir Brand Kit**. This repository (`Ruhanir-Root`) is the authoritative source of truth for the brand assets, tokens, typography, shared metadata, and core components across the organization's three digital surfaces:
1. **Ruhanir Engine** (`ruhanir.com`) — Corporate root hub (this project)
2. **Ruhanir IT** (`it.ruhanir.com`) — IT services & ERP platform (TanStack Start + Tailwind v4)
3. **Ruhanir Store** (`store.ruhanir.com`) — Digital commerce & licenses (Next.js + Supabase)

---

## 1. File Inventory

The brand kit lives in `brand-kit/` and is organized as follows:

```
brand-kit/
├── README.md                      # General introduction and consumption guidelines
├── company.ts                     # Single source of truth for corporate identity, license, contacts, and URLs
├── assets/                        # Raster logo assets, favicons, and social cards
│   ├── logo.png                   # Master 2x raster logo mark (segmented 'R')
│   ├── logo-400.png               # 400px width PNG fallback
│   ├── logo-800.png               # 800px width PNG fallback
│   ├── logo-400.webp              # 400px responsive WebP
│   ├── logo-800.webp              # 800px responsive WebP
│   ├── logo-1200.webp             # 1200px responsive WebP (hero desktop display)
│   ├── icon-192.png               # 192x192 PWA icon
│   ├── icon-512.png               # 512x512 PWA icon
│   ├── apple-touch-icon.png       # 180x180 iOS home screen icon
│   ├── favicon.ico                # Multi-resolution ICO favicon
│   ├── favicon-16x16.png          # 16x16 browser tab icon
│   ├── favicon-32x32.png          # 32x32 standard favicon
│   └── og-image.png               # 1200x630 social share card on crisp white canvas
├── components/                    # Reusable React UI components
│   ├── Button.tsx                 # Standardized button (primary, secondary, white)
│   ├── Footer.tsx                 # Data-driven 5-column light footer (#F5F7FA)
│   ├── Header.tsx                 # Data-driven header with nav, language switcher, and division links
│   ├── LanguageSwitch.tsx         # Accessible language switcher (বাংলা | English)
│   ├── Logo.tsx                   # Picture element loading responsive WebP with PNG fallback
│   ├── Prose.tsx                  # 70ch constrained container for markdown and policy text
│   └── Section.tsx                # Layout section & container with 8px spacing scale
├── fonts/                         # Self-hosted variable font files and loader
│   ├── fonts.ts                   # next/font/local definition with swap display
│   ├── inter-latin.woff2          # Variable Inter font for English/Latin (100–900)
│   └── noto-sans-bengali.woff2    # Variable Noto Sans Bengali font (100–900)
├── legal-content/                 # Baseline policy texts (15 policies in EN and BN)
│   ├── bn/                        # 15 Bengali Markdown policy stubs with frontmatter
│   │   ├── accessibility.md
│   │   ├── complaints.md
│   │   ├── confidentiality.md
│   │   ├── cookie-policy.md
│   │   ├── delivery-shipping.md
│   │   ├── digital-terms.md
│   │   ├── payment-policy.md
│   │   ├── privacy-policy.md
│   │   ├── returns-refunds.md
│   │   ├── security.md
│   │   ├── service-terms.md
│   │   ├── support-policy.md
│   │   ├── terms.md
│   │   ├── terms-of-sale.md
│   │   └── warranty-policy.md
│   └── en/                        # 15 English Markdown policy stubs with frontmatter
│       └── [same 15 policy filenames]
├── seo/                           # Modular SEO architecture and builders
│   ├── README.md                  # Integration guide for sibling sites
│   ├── jsonld-builders.ts         # Schema.org builders (Organization, WebSite, Breadcrumbs, Article)
│   ├── metadata-builder.ts        # Next.js Metadata object generator with hreflang and canonicals
│   ├── robots-generator.ts        # Environment-aware robots.txt configuration
│   └── sitemap-generator.ts       # XML sitemap generator with xhtml:link alternates
└── tokens/                        # System design tokens
    ├── theme.css                  # Tailwind CSS v4 @theme and @layer base rules
    └── tokens.ts                  # TypeScript constants for colors, radii, type scale, spacing
```

---

## 2. Token Specification & WCAG Contrast

The color palette is derived exclusively from the segmented 'R' logo mark and clean editorial contrast rules. Gradients exist **only** inside the logo mark; all UI surfaces, buttons, and text use flat tokens.

### Color Tokens

| Token Name | Hex Value | Intended Usage | Intended Background | Contrast Ratio | WCAG Compliance |
| :--- | :--- | :--- | :--- | :---: | :---: |
| `--color-brand-heading` | `#0B1B3A` | H1–H6 headings, card titles | `#FFFFFF` (Surface BG) | **15.91:1** | **Pass AAA** (>= 7.0:1) |
| `--color-text-main` | `#1F2937` | Primary body text | `#FFFFFF` (Surface BG) | **13.64:1** | **Pass AAA** (>= 7.0:1) |
| `--color-text-main` | `#1F2937` | Primary body text | `#F5F7FA` (Surface Band) | **12.96:1** | **Pass AAA** (>= 7.0:1) |
| `--color-text-secondary`| `#374151` | Supporting copy, sublines | `#FFFFFF` (Surface BG) | **10.94:1** | **Pass AAA** (>= 7.0:1) |
| `--color-text-subtle` | `#4B5563` | Captions, metadata, footnotes | `#FFFFFF` (Surface BG) | **7.50:1** | **Pass AAA** (>= 7.0:1) |
| `--color-brand-navy` | `#05308A` | Primary CTA buttons | `#FFFFFF` (Surface BG) | **11.93:1** | **Pass AAA** (>= 7.0:1) |
| `text-white` on Navy | `#FFFFFF` | Text on Primary CTA / Contact band | `#05308A` (Brand Navy) | **11.93:1** | **Pass AAA** (>= 7.0:1) |
| `--color-brand-royal` | `#0E52C3` | Links, button hover, focus rings | `#FFFFFF` (Surface BG) | **6.33:1** | **Pass AA** (>= 4.5:1) |
| `--color-brand-cyan` | `#1499C8` | Ordinal numbers (`01`, `02`), bullet dots | `#FFFFFF` / `#F5F7FA` | **3.16:1 / 3.00:1** | **Pass Large/UI** (>= 3.0:1) |
| `--color-brand-teal` | `#42D1CC` | Selection highlights, decorative only | `#FFFFFF` | **1.76:1** | **Decorative Only** (NEVER text) |
| `--color-surface-bg` | `#FFFFFF` | Default page background | N/A | Base | N/A |
| `--color-surface-band` | `#F5F7FA` | Divisions section, footer background | `#FFFFFF` | 1.05:1 | Structural separation |
| `--color-surface-subtle`| `#F8FAFC` | "At a glance" strip background | `#FFFFFF` | 1.03:1 | Hairline container |
| `--color-surface-border`| `#E2E8F0` | Dividers, card borders, form borders | `#FFFFFF` / `#F5F7FA` | 1.18:1 | UI Component boundary |

> [!CRITICAL]
> **Teal (`#42D1CC`) Rule**: Because `#42D1CC` against white yields a 1.76:1 contrast ratio, it is **strictly forbidden for text or icons**. It is used solely for text selection highlights (`selection:bg-[#42D1CC]/30`) or internal logo geometry.

### Typography & Spacing Scales

- **Font Families**:
  - Latin: `Inter` via variable font `inter-latin.woff2` (weights 100–900). Fallback: system font stack.
  - Bengali: `Noto Sans Bengali` via variable font `noto-sans-bengali.woff2` (weights 100–900). Fallback: `Kalpurush`, `SolaimanLipi`, sans-serif.
- **Line Heights**:
  - Bengali body text: strictly `1.8` (prevents clipping of complex conjuncts/যুক্তাক্ষর and diacritics).
  - Bengali headings (H1–H4): strictly `1.35`–`1.45` (set to `1.38` in `globals.css`).
  - English body text: `1.6`.
  - English headings: `1.22`–`1.25`.
- **Type Scale Rules**:
  - Base body: `17px` on desktop, `16px` on mobile inputs.
  - **Absolute floor**: No live UI text below `14px`.
- **Spacing Scale**:
  - 8px base scale: 8px, 16px, 24px, 32px, 48px, 64px, 96px.
  - Section vertical padding: `96px` desktop (`py-24`), `64px` mobile (`py-16`).
  - Container max-width: `1200px` (`max-w-[1200px]`).
  - Border radii: `4px` (`sm`), `6px` (`md` / default), `8px` (`lg`).

---

## 3. Brand Kit Components & Props

The components located in `brand-kit/components/` provide portable building blocks:

### `Button.tsx`
- **Props**:
  - `variant?: 'primary' | 'secondary' | 'white'` (defaults to `'primary'`)
  - `children: React.ReactNode`
  - `className?: string`
  - Inherits standard `React.ButtonHTMLAttributes<HTMLButtonElement>`
- **Styling**: `rounded-[6px]`, min-height `44px`–`48px`, visible 2px royal focus ring.

### `Header.tsx` (Kit Version)
- **Props**:
  - `lang: 'bn' | 'en'`
  - `config: HeaderConfig`
    - `siteName: { en: string; bn: string }`
    - `navItems: { label: { en: string; bn: string }; href: string }[]`
    - `divisionLinks: { label: { en: string; bn: string }; url: string }[]`
- **Purpose**: Data-driven masthead. Automatically preserves visitor language across cross-site outbound links.

### `Footer.tsx` (Kit Version)
- **Props**:
  - `lang: 'bn' | 'en'`
  - `config: FooterConfig`
    - `siteName: { en: string; bn: string }`
    - `description: { en: string; bn: string }`
    - `tradeLicense: { en: string; bn: string }`
    - `companyLinks: FooterLinkItem[]`
    - `divisionLinks: { label: { en: string; bn: string }; url: string }[]`
    - `legalLinks: FooterLinkItem[]`
    - `emails: { general: string; support: string }`
    - `phone: string`
- **Output**: 5-column light footer on `#F5F7FA` with localized copyright and trade license.

### `LanguageSwitch.tsx`
- **Props**: `currentLang: 'bn' | 'en'`
- **Behavior**: Swaps the leading path segment between `/bn/` and `/en/`, stores preference in `localStorage.setItem('preferred_lang', lang)`, and marks active language with `aria-current="true"`.

### `Logo.tsx`
- **Props**:
  - `className?: string` (default `'h-10 w-auto'`)
  - `width?: number` (default `40`)
  - `height?: number` (default `52`)
  - `priority?: boolean` (default `false`)
- **Behavior**: Emits a responsive `<picture>` element with `srcset` pointing to `/logo-400.webp`, `/logo-800.webp`, `/logo-1200.webp` and a fallback PNG `/logo-400.png`.

### `Section.tsx` & `Container`
- **`Container` Props**: `children: React.ReactNode; className?: string` (`max-w-[1200px] px-6 sm:px-8`)
- **`Section` Props**: `band?: boolean; id?: string; className?: string` (renders `#F5F7FA` if `band=true`, white if `false`, with `py-16 sm:py-24`).

### `Prose.tsx`
- **Props**: `children?: React.ReactNode; html?: string; className?: string`
- **Styling**: Constrained `max-w-[70ch]` column for policy and editorial typography.

---

## 4. `company.ts` Structure

Located at `brand-kit/company.ts`, this file is the canonical source of truth for corporate facts:

```typescript
export const company = {
  name: {
    en: 'Ruhanir Engine',
    bn: 'রুহানীর ইঞ্জিন',
  },
  legalName: {
    en: 'Ruhanir Engine',
    bn: 'রুহানীর ইঞ্জিন',
  },
  tagline: {
    en: "A technology-driven organization working on Bangladesh's digital infrastructure and modern commerce.",
    bn: 'বাংলাদেশের ডিজিটাল অবকাঠামো ও আধুনিক বাণিজ্যের জন্য কাজ করা একটি প্রযুক্তিভিত্তিক প্রতিষ্ঠান।',
  },
  taglineEn: 'Fair for you. Fair for us.',
  taglineBn: 'আপনার জন্য ন্যায্য, আমাদের জন্যও।',
  operatingModel: {
    en: 'Ruhanir Engine operates online and serves customers across Bangladesh.',
    bn: 'রুহানীর ইঞ্জিন অনলাইনে পরিচালিত এবং সারা বাংলাদেশে সেবা প্রদান করে।',
  },
  tradeLicense: {
    numberEn: '3401322207',
    numberBn: '৩৪০১৩২২২০৭',
    labelEn: 'Trade License No: 3401322207',
    labelBn: 'ট্রেড লাইসেন্স নং: ৩৪০১৩২২২০৭',
  },
  contact: {
    generalEmail: 'info@ruhanir.com',
    supportEmail: 'support@ruhanir.com',
    phone: '+880 1570225573',
    phoneTel: '+8801570225573',
  },
  sites: {
    root: {
      name: { en: 'Ruhanir Engine', bn: 'রুহানীর ইঞ্জিন' },
      url: 'https://ruhanir.com',
      subdomain: '',
    },
    it: {
      name: { en: 'Ruhanir IT', bn: 'রুহানীর আইটি' },
      url: 'https://it.ruhanir.com',
      subdomain: 'it',
    },
    store: {
      name: { en: 'Ruhanir Store', bn: 'রুহানীর স্টোর' },
      url: 'https://store.ruhanir.com',
      subdomain: 'store',
    },
  },
} as const;
```

---

## 5. Content and Legal Content Structure

### Structured Copy (`src/content/en.ts` and `bn.ts`)
The root site centralizes user-facing UI copy into typed TypeScript content dictionaries:
- `meta`: Site titles, descriptions, open graph text.
- `nav`: Navigation item labels.
- `home`: Hero headline, sublines, button text, "at a glance" items, divisions section copy, about summary, contact band.
- `about`: Mission, operating model, institutional values.
- `businesses`: Detailed breakdowns of Ruhanir IT and Ruhanir Store offerings.
- `contact`: Channels, form labels, placeholders, validation messages, fallback mailto instructions.
- `footer`: Column titles, links, trade license line, copyright.
- `news`: Index and article UI text.

### Legal Content (`brand-kit/legal-content/` vs `src/app/[lang]/[policy]/`)
- `brand-kit/legal-content/` contains 15 English and 15 Bengali Markdown files with YAML frontmatter (`title`, `effectiveDate: "2026-10-29"`, `language`).
- Currently, the markdown files in `brand-kit/legal-content/` are placeholder stubs generated by `scripts/generate-brandkit-policies.mjs`.
- The live root site pages in `src/app/[lang]/[policy]/page.tsx` contain the full, production-ready TSX policy text with section navigation and tables of content.

---

## 6. How Store and IT Sites Consume or Port the Kit

| Asset / Layer | Store Site (`store.ruhanir.com` — Next.js) | IT Site (`it.ruhanir.com` — TanStack Start) |
| :--- | :--- | :--- |
| **Fonts** | Variable `.woff2` copied to `public/fonts/`; loaded via `next/font/local`. | Copied to `public/fonts/`; loaded via `@font-face` rules in root CSS. |
| **Images & Icons** | Copied directly to `public/`. | Copied directly to `public/`. |
| **Design Tokens** | `brand-kit/tokens/theme.css` imported into `src/app/globals.css`. | `theme.css` rules integrated directly into TanStack Start's CSS bundle (Tailwind v4 `@theme`). |
| **Components** | Consumes React components directly. | Ports component JSX into TanStack Start router links (`@tanstack/react-router` `<Link>` replacing `next/link`). |
| **`company.ts`** | Imported directly into application library. | Imported directly into application library. |
| **SEO Builders** | Uses `brand-kit/seo/` directly for Next.js metadata and JSON-LD. | Adapts JSON-LD builders and robots/sitemap logic to TanStack Start loaders and server functions. |

---

## 7. Known Divergences (Brand Kit vs. Root Codebase)

1. **Header Component (`brand-kit/components/Header.tsx` vs `src/components/Header.tsx`)**:
   - `src/components/Header.tsx` has the full mobile responsive drawer, 1100px media query classes (`.desktop-nav-only`, `.mobile-menu-btn-only`), focus trap, scroll lock, and ESC key handlers.
   - `brand-kit/components/Header.tsx` retains the older desktop-only collapse (`hidden lg:flex`) and lacks the mobile drawer.
2. **Policy Content (`brand-kit/legal-content/` vs `src/app/[lang]/[policy]/`)**:
   - `brand-kit/legal-content/` holds 1-paragraph stubs.
   - `src/app/[lang]/[policy]/` holds complete, comprehensive bilingual policy documents.
3. **Breadcrumbs (`src/components/Breadcrumbs.tsx`)**:
   - Implemented in `src/components/` and injected across all 42 inner pages with Schema.org `BreadcrumbList`, but not yet packaged into `brand-kit/components/`.
4. **Legal Layout (`src/components/LegalLayout.tsx`)**:
   - Resides in `src/components/`, not in `brand-kit/components/`. Hardcodes the effective date (`29 October 2026`) rather than taking it from `brand-kit/company.ts`.
5. **Footer Column Count**:
   - CONTEXT BRIEF mentions a "light footer with four columns". Both `brand-kit/components/Footer.tsx` and `src/components/Footer.tsx` implement **5 columns** (Brand, Divisions, Company, Contact, Legal).
6. **News Card Badge Font Size**:
   - `src/app/[lang]/news/page.tsx` uses `text-[12px]` for the "Notice" badge and `text-[13px]` for the date, conflicting with the "nothing below 14px" design rule.

---

## 8. Logo Usage Rules & Vector Status

### The Logo Mark
The logo is a geometric, segmented capital letter **'R'** rendered in an ascending color progression from Teal (`#42D1CC`) through Cyan (`#1499C8`) and Royal Blue (`#0E52C3`) to Deep Navy (`#05308A`).

### Raster-Only Status (CRITICAL)
- **Only raster files exist**: `logo.png`, `logo-400.png`, `logo-800.png`, `logo-400.webp`, `logo-800.webp`, `logo-1200.webp`.
- **Vector Logo Status**: A hand-made SVG vectorization (`logo.svg` in repo root) was attempted previously, but is **NOT clean enough to ship** (contains curve artifacts and improper gradient banding).
- **Rule**: Do NOT use `logo.svg` for brand-critical production surfaces, and **never claim a vector logo exists**. All UI components must use `<picture>` referencing the optimized WebP and PNG raster assets.

### Placement & Spacing Rules
1. **Clear Space**: Maintain minimum clear space around the logo mark equal to 50% of the logo's width. No text, borders, or competing graphical elements may encroach within this perimeter.
2. **Minimum Display Size**:
   - On screen: minimum height is `32px` (as used in the Footer).
   - In header masthead: `40px` height.
   - On mobile hero: constrained between `180px` and `220px` width.
   - In desktop hero: maximum width `360px`.
3. **Permitted Backgrounds**:
   - The logo must be placed on a solid white (`#FFFFFF`) background.
   - On the Open Graph card, it sits centered on a pure white 1200x630 canvas.
   - Do NOT place the multi-colored segmented logo on dark navy, textured, or photographic backgrounds without an approved monochrome adaptation (which does not currently exist).
4. **Prohibited Alterations ("What Not to Do")**:
   - Do NOT rotate, skew, or distort aspect ratio.
   - Do NOT alter the colors or invert the gradient steps.
   - Do NOT apply drop shadows, glows, or bevels beyond subtle CSS `drop-shadow-sm`.
   - Do NOT place text or wordmarks directly over the logo mark.

---

## 9. Versioning Proposal & Changelog

### Versioning Strategy
The brand kit should be governed using **Semantic Versioning** (`MAJOR.MINOR.PATCH`):
- **MAJOR (`x.0.0`)**: Breaking design changes, color token renames, font file changes, or major markup restructuring in components.
- **MINOR (`1.x.0`)**: Addition of new components (e.g. `Breadcrumbs.tsx`), new assets, or additions to `company.ts`.
- **PATCH (`1.0.x`)**: Bug fixes, contrast adjustments, typo corrections in legal content or documentation.

### Starting Changelog (`brand-kit/CHANGELOG.md`)

```markdown
# Changelog - Ruhanir Brand Kit

## [1.0.0] - 2026-11-04
### Added
- Master raster logo package (400w, 800w, 1200w WebP + PNG fallbacks).
- Self-hosted variable fonts (Inter Latin & Noto Sans Bengali).
- Tailwind v4 design tokens and CSS base rules (`theme.css`, `tokens.ts`).
- Core React components: `Button`, `Header`, `Footer`, `LanguageSwitch`, `Logo`, `Prose`, `Section`.
- Single source of truth corporate configuration (`company.ts`).
- Baseline 15-document legal content policy suite in English and Bengali.
- Modular SEO builders for Schema.org JSON-LD, metadata, sitemaps, and robots (`brand-kit/seo/`).
```

---

## 10. Propagation Checklist for Sibling Sites (Store and IT)

When updating the brand kit in `Ruhanir-Root`, follow this exact checklist to synchronize `Ruhanir-Store` and `Ruhanir-IT`:

- [ ] **Step 1: Check Token Integrity**
  - Verify any new or modified color tokens meet WCAG AA (4.5:1 for normal text, 3:1 for large UI).
  - Ensure `#42D1CC` (teal) remains strictly decorative.
- [ ] **Step 2: Update `company.ts`**
  - Verify trade license line (`3401322207`), phone (`+880 1570225573`), and Bangla spelling (`রুহানীর ইঞ্জিন`).
  - Copy updated `brand-kit/company.ts` into Store (`src/lib/company.ts`) and IT (`app/lib/company.ts`).
- [ ] **Step 3: Synchronize Assets & Fonts**
  - If fonts or logo images changed, copy `brand-kit/fonts/` and `brand-kit/assets/` to sibling `public/` directories.
- [ ] **Step 4: Propagate Header & Mobile Fixes**
  - When porting `Header.tsx`, ensure the 1100px collapse breakpoint and mobile navigation drawer are preserved.
  - In `Ruhanir-IT`, port `next/link` to TanStack Router `<Link>`.
- [ ] **Step 5: Synchronize Legal Policies**
  - If corporate policy text is revised in `src/app/[lang]/[policy]/`, propagate the exact approved wording to Store and IT legal routes.
- [ ] **Step 6: Verify Outbound Language Routing**
  - Test that clicking an outbound division link from an English page lands on `/en/` on the destination, and from a Bangla page lands on `/bn/`.
- [ ] **Step 7: Run Automated Verification in Target Project**
  - Run `npm run build`, type check, and mobile viewport inspection before publishing.
