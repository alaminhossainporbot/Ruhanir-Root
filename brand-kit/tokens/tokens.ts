/**
 * Tailwind CSS Design Tokens Configuration
 * For Tailwind v3 or v4 projects across Ruhanir sites.
 */

export const brandTokens = {
  colors: {
    brand: {
      teal: '#42D1CC',
      cyan: '#1499C8',
      royal: '#0E52C3',
      navy: '#05308A',
      heading: '#0B1B3A',
    },
    surface: {
      bg: '#FFFFFF',
      band: '#F5F7FA',
      subtle: '#F8FAFC',
      muted: '#F1F5F9',
      border: '#E2E8F0',
    },
    text: {
      main: '#1F2937',
      secondary: '#374151',
      subtle: '#4B5563',
    },
  },
  borderRadius: {
    sm: '4px',
    DEFAULT: '6px',
    md: '6px',
    lg: '8px',
  },
  fontSize: {
    xs: ['14px', { lineHeight: '1.4' }],
    sm: ['15px', { lineHeight: '1.5' }],
    base: ['17px', { lineHeight: '1.6' }],
    lg: ['18px', { lineHeight: '1.6' }],
    xl: ['20px', { lineHeight: '1.4' }],
    '2xl': ['24px', { lineHeight: '1.3' }],
    '3xl': ['30px', { lineHeight: '1.25' }],
    '4xl': ['36px', { lineHeight: '1.2' }],
    '5xl': ['48px', { lineHeight: '1.15' }],
  },
  spacingScale: '8px base scale (8px, 16px, 24px, 32px, 48px, 64px, 96px)',
  container: {
    maxWidth: '1200px',
    padding: '24px to 32px',
  },
};
