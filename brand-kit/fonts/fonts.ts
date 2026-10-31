import localFont from 'next/font/local';

/**
 * Self-hosted Variable Fonts for Next.js App Router
 * Place inter-latin.woff2 and noto-sans-bengali.woff2 into public/fonts/
 */

export const inter = localFont({
  src: '../../public/fonts/inter-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

export const notoBengali = localFont({
  src: '../../public/fonts/noto-sans-bengali.woff2',
  variable: '--font-bengali',
  display: 'swap',
  weight: '100 900',
});
