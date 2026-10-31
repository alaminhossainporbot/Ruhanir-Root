# Ruhanir Engine Root Website (ruhanir.com)

Corporate root hub for **Ruhanir Engine**, a technology-driven parent organization in Bangladesh.

---

## 1. Tech Stack & Packages

- **Next.js**: `16.4.3` (App Router, static export with `output: 'export'`)
- **React**: `19.3.1`
- **Tailwind CSS**: `4.3.3` (PostCSS integration via `@tailwindcss/postcss`)
- **TypeScript**: `5.x`
- **Self-hosted Fonts**: `next/font/local` with variable `.woff2` files for Latin (`Inter`) and Bengali (`Noto Sans Bengali`), with `font-display: swap`
- **Asset Processing**: `sharp` for high-resolution PNG extraction, favicon set, and Open Graph image generation

---

## 2. Project Directory Structure

```
Ruhanir-Root/
├── public/
│   ├── fonts/
│   │   ├── inter-latin.woff2          # Self-hosted Inter Latin variable font
│   │   └── noto-sans-bengali.woff2    # Self-hosted Noto Sans Bengali variable font
│   ├── logo.png                       # Original 2x PNG extracted from logo.svg
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   └── og-image.png                   # 1200x630 logo on crisp white background
├── src/
│   ├── app/
│   │   ├── (root)/
│   │   │   ├── layout.tsx             # Root layout with <html>, <body> for "/"
│   │   │   └── page.tsx               # Root page: language redirect + visible links
│   │   ├── [lang]/
│   │   │   ├── layout.tsx             # Route group layout with <html>, <head>, <body>
│   │   │   ├── page.tsx               # Home page (/bn/, /en/)
│   │   │   ├── about/
│   │   │   │   └── page.tsx           # About page
│   │   │   ├── businesses/
│   │   │   │   └── page.tsx           # Businesses & services page
│   │   │   └── contact/
│   │   │       └── page.tsx           # Contact & validated inquiry form
│   │   ├── not-found.tsx              # Bilingual 404 page (static export 404.html)
│   │   ├── sitemap.ts                 # Force-static sitemap generator
│   │   ├── robots.ts                  # Force-static robots.txt generator
│   │   └── globals.css                # Tailwind 4 design tokens & base typography
│   ├── components/
│   │   ├── Header.tsx                 # Header with navigation & language switcher
│   │   ├── Footer.tsx                 # Footer with license, links & copyright
│   │   ├── Logo.tsx                   # Image component referencing public/logo.png
│   │   ├── LanguageSwitch.tsx         # Language toggle (Bangla | English)
│   │   └── ContactForm.tsx            # Form with honeypot & time-to-submit spam defense
│   ├── content/
│   │   ├── bn.ts                      # ALL Bangla text content in one place
│   │   └── en.ts                      # ALL English text content in one place
│   └── lib/
│       ├── fonts.ts                   # next/font/local definitions
│       ├── i18n.ts                    # Language routing helpers & types
│       └── metadata.ts                # Shared metadata & Organization JSON-LD
├── scripts/
│   ├── prepare-assets.mjs             # Extracts PNG, copies fonts, generates icons
│   ├── check-viewport.mjs             # Tests 360px viewport overflow
│   ├── run-lighthouse.mjs             # Runs mobile Lighthouse audit
│   └── test-performance.mjs          # Measures DOM load time on mobile
├── tailwind.config.ts                 # Design tokens (colors, typography)
├── next.config.mjs                    # Static export configuration
├── tsconfig.json
└── package.json
```

---

## 3. How to Edit Copy & Content

All textual content is centralized into two structured files:
- **Bangla Copy**: `src/content/bn.ts`
- **English Copy**: `src/content/en.ts`

To change or add any text, update these files. The components and pages read directly from them.

---

## 4. How to Run, Build and Deploy

### Prerequisites
- Node.js `18.x` or higher
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Generate Production Static Export
```bash
npm run build
```
The compiled, ready-to-deploy static website will be created in the `out/` directory.

### Deploying
The `out/` directory contains standard static files (`.html`, `.js`, `.css`, `.png`, `.woff2`) and can be hosted on:
- Cloudflare Pages
- Vercel (Static)
- GitHub Pages
- AWS S3 / CloudFront
- Nginx / Apache web servers

Ensure your static host routes 404 requests to `out/404.html`.

---

## 5. Environment Variables

To configure an endpoint for the contact form:
Create a `.env.local` or set in your hosting provider:
```env
NEXT_PUBLIC_CONTACT_ENDPOINT=https://api.yourdomain.com/contact
```
If this variable is omitted, the form automatically falls back to an encoded `mailto:info@ruhanir.com` link without showing any fake success messages.
