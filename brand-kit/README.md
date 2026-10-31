# Ruhanir Brand Kit

A reusable design system, asset library, and component kit to ensure that **Ruhanir IT** (`it.ruhanir.com`) and **Ruhanir Store** (`store.ruhanir.com`) match the corporate root site (**Ruhanir Engine** — `ruhanir.com`) with exact fidelity.

---

## 1. Directory Overview

```
brand-kit/
├── company.ts             # Single source of truth: names (EN/BN), license, emails, phone, site URLs
├── tokens/
│   ├── theme.css          # Tailwind CSS v4 @theme variables and @layer base rules
│   └── tokens.ts          # JavaScript/TypeScript design tokens (colors, radii, type scale)
├── fonts/
│   ├── fonts.ts           # next/font/local font loader configuration
│   ├── inter-latin.woff2  # Variable font for English/Latin
│   └── noto-sans-bengali.woff2 # Variable font for Bengali (no clipped conjuncts)
├── assets/
│   ├── logo.png           # Original 2x segmented R logo mark
│   ├── logo-400.png / logo-800.png
│   ├── logo-400.webp / logo-800.webp / logo-1200.webp # Optimized responsive sizes
│   ├── favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
│   └── og-image.png       # 1200x630 Open Graph banner
├── components/
│   ├── Logo.tsx           # Picture element with responsive WebP and PNG fallbacks
│   ├── Header.tsx         # Data-driven header with active page indicator and language switch
│   ├── Footer.tsx         # Data-driven light footer (#F5F7FA) with 5 columns
│   ├── LanguageSwitch.tsx # Toggle between বাংলা (/bn/) and English (/en/)
│   ├── Button.tsx         # Standardized 6px radius buttons (primary, secondary, white)
│   ├── Section.tsx        # Section container with consistent 8px scale & 1200px max width
│   └── Prose.tsx          # Readable max-width (70ch) container for markdown/policy text
└── legal-content/
    ├── bn/                # 15 markdown policy files in Bengali with frontmatter
    └── en/                # 15 markdown policy files in English with frontmatter
```

---

## 2. How to Copy into a New Site (IT or Store)

1. **Copy Assets & Fonts**:
   - Copy `brand-kit/fonts/*.woff2` into your new project's `public/fonts/` directory.
   - Copy `brand-kit/assets/*` into your new project's `public/` directory.
2. **Copy Tokens & Styles**:
   - Copy `brand-kit/tokens/theme.css` into your project's `src/app/globals.css`.
3. **Copy Components**:
   - Copy `brand-kit/components/*` into `src/components/`.
   - Copy `brand-kit/company.ts` into `src/lib/company.ts`.
4. **Copy Policies (as needed)**:
   - Copy `brand-kit/legal-content/` into `src/content/legal/`.

---

## 3. What to Change per Site

Each site configures the data-driven `Header` and `Footer` with its own details while keeping the layout and typography identical:

| Config Field | Root Site (`ruhanir.com`) | IT Site (`it.ruhanir.com`) | Store Site (`store.ruhanir.com`) |
|---|---|---|---|
| **Site Name (EN)** | `Ruhanir Engine` | `Ruhanir IT` | `Ruhanir Store` |
| **Site Name (BN)** | `রুহানীর ইঞ্জিন` | `রুহানীর আইটি` | `রুহানীর স্টোর` |
| **Nav Items** | About, Businesses, News, Contact | Services, Architecture, Solutions, Contact | Products, Licenses, Cart, Support |
| **Active Division Links** | Links to Store & IT | Links to Root (`ruhanir.com`) & Store | Links to Root (`ruhanir.com`) & IT |

---

## 4. Uniform URL Structure & Cross-Site Linking

Every site in the Ruhanir network adheres to the same bilingual URL convention:
- **Bangla Routes**: `/bn/...` (Default language)
- **English Routes**: `/en/...`

### Cross-Site Navigation Rule:
When linking between subdomains, **always preserve the visitor's current language**:
- If the visitor is on `https://ruhanir.com/bn/`, external links to Store point to `https://store.ruhanir.com/bn/`.
- If the visitor is on `https://ruhanir.com/en/`, external links to Store point to `https://store.ruhanir.com/en/`.

The data-driven `Header` and `Footer` components in this kit automatically enforce this rule by appending `/${lang}/` to all outbound division URLs.

---

## 5. Strict Design Rules

- **Zero Emojis**: Never use emojis anywhere (code comments, UI text, alt text, or commit messages).
- **No Gradients Outside Logo**: Gradients exist only inside the segmented R logo mark. Never apply gradients to headings, buttons, or section backgrounds.
- **Color Palette**:
  - Primary Accent: Deep Navy `#05308A`
  - Secondary Accent: Royal Blue `#0E52C3`
  - Cyan Accent: `#1499C8`
  - Teal Accent: `#42D1CC`
  - Headings: Deep Navy `#0B1B3A`
  - Body Text: `#1F2937`
  - Secondary Text: `#374151`
  - Band Background: `#F5F7FA`
- **Typography & Line Heights**:
  - Headings weight: `700` (never mixed extremes like 800 or 900).
  - English Body line-height: `1.6`.
  - Bangla Body line-height: `1.8` (ensures complex conjuncts/যুক্তাক্ষর never clip).
  - Bangla Headings line-height: `1.38`.
  - Max text width: `70ch` for high reading comfort.
  - Minimum text size: `14px` anywhere on the site.
- **Spacing Scale**:
  - Base grid: 8px increments (8px, 16px, 24px, 32px, 48px, 64px, 96px).
  - Container width: max 1200px centered with 24px–32px gutters.
  - Button radius: strictly 6px (`rounded-[6px]`).

---

## 6. Consistency Checklist for New Sites

- [ ] Does the site use the self-hosted `Inter` and `Noto Sans Bengali` variable fonts?
- [ ] Is Bengali text line-height set to 1.8 with zero clipped conjuncts?
- [ ] Is the company name spelled **"রুহানীর"** (with ীর) across all Bengali copy?
- [ ] Are all dates, years, and license numbers rendered in Bengali digits on `/bn/` pages?
- [ ] Are phone numbers kept in Latin digits with a working `tel:` link?
- [ ] Does the header use the exact 80px height with 40px logo mark and 2px active underline indicator?
- [ ] Does the footer use `#F5F7FA` background with 5-column layout and exact Trade License No `3401322207` / `৩৪০১৩২২২০৭`?
- [ ] Are all outbound links preserving the active language prefix (`/bn/` or `/en/`)?
- [ ] Does the site score 95+ on Accessibility and SEO with no horizontal overflow at 360px width?
