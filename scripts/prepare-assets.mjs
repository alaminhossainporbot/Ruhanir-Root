import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const logoSvgPath = path.resolve('logo.svg');
const svgContent = fs.readFileSync(logoSvgPath, 'utf8');

// Extract base64 PNG data from logo.svg
const match = svgContent.match(/xlink:href="data:img\/png;base64,([^"]+)"/);
if (!match) {
  throw new Error('Base64 image data not found in logo.svg');
}

const pngBuffer = Buffer.from(match[1], 'base64');
fs.mkdirSync('public', { recursive: true });

// Save original logo.png
fs.writeFileSync('public/logo.png', pngBuffer);
console.log('Saved public/logo.png');

// Copy variable font files from @fontsource-variable
const interFontSrc = path.resolve('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const bengaliFontSrc = path.resolve('node_modules/@fontsource-variable/noto-sans-bengali/files/noto-sans-bengali-bengali-wght-normal.woff2');

fs.mkdirSync('public/fonts', { recursive: true });

if (fs.existsSync(interFontSrc)) {
  fs.copyFileSync(interFontSrc, 'public/fonts/inter-latin.woff2');
  console.log('Copied Inter Latin woff2 font');
} else {
  console.warn('Inter font source not found at', interFontSrc);
}

if (fs.existsSync(bengaliFontSrc)) {
  fs.copyFileSync(bengaliFontSrc, 'public/fonts/noto-sans-bengali.woff2');
  console.log('Copied Noto Sans Bengali woff2 font');
} else {
  console.warn('Bengali font source not found at', bengaliFontSrc);
}

// Generate favicons and touch icons
await sharp(pngBuffer).resize(16, 16).png().toFile('public/favicon-16x16.png');
await sharp(pngBuffer).resize(32, 32).png().toFile('public/favicon-32x32.png');
await sharp(pngBuffer).resize(32, 32).toFormat('png').toFile('public/favicon.ico');
await sharp(pngBuffer).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(pngBuffer).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(pngBuffer).resize(512, 512).png().toFile('public/icon-512.png');
console.log('Generated favicons');

// Generate Open Graph image (1200x630, logo on white background)
const logoResized = await sharp(pngBuffer)
  .resize(400, 400, { fit: 'inside' })
  .toBuffer();

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  }
})
  .composite([{ input: logoResized, gravity: 'center' }])
  .png()
  .toFile('public/og-image.png');

console.log('Generated public/og-image.png (1200x630)');
