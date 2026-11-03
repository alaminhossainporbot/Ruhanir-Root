import { chromium, Browser, Page } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [320, 360, 375, 390, 414, 480, 600, 768, 1024, 1280];

const ROUTES = [
  // Home
  '/en/',
  '/bn/',
  // Primary pages
  '/en/about/',
  '/bn/about/',
  '/en/businesses/',
  '/bn/businesses/',
  '/en/contact/',
  '/bn/contact/',
  // News
  '/en/news/',
  '/bn/news/',
  '/en/news/website-launch/',
  '/bn/news/website-launch/',
  // Legal hub
  '/en/legal/',
  '/bn/legal/',
  // Legal policy pages
  '/en/accessibility/',
  '/bn/accessibility/',
  '/en/complaints/',
  '/bn/complaints/',
  '/en/confidentiality/',
  '/bn/confidentiality/',
  '/en/cookie-policy/',
  '/bn/cookie-policy/',
  '/en/delivery-shipping/',
  '/bn/delivery-shipping/',
  '/en/digital-terms/',
  '/bn/digital-terms/',
  '/en/payment-policy/',
  '/bn/payment-policy/',
  '/en/privacy-policy/',
  '/bn/privacy-policy/',
  '/en/returns-refunds/',
  '/bn/returns-refunds/',
  '/en/security/',
  '/bn/security/',
  '/en/service-terms/',
  '/bn/service-terms/',
  '/en/support-policy/',
  '/bn/support-policy/',
  '/en/terms/',
  '/bn/terms/',
  '/en/terms-of-sale/',
  '/bn/terms-of-sale/',
  '/en/warranty-policy/',
  '/bn/warranty-policy/',
  // 404
  '/en/404-nonexistent-page/',
];

const SCREENSHOT_ROUTES = [
  { name: 'home-en', path: '/en/' },
  { name: 'home-bn', path: '/bn/' },
  { name: 'about-en', path: '/en/about/' },
  { name: 'about-bn', path: '/bn/about/' },
  { name: 'contact-en', path: '/en/contact/' },
  { name: 'contact-bn', path: '/bn/contact/' },
  { name: 'legal-en', path: '/en/privacy-policy/' },
  { name: 'legal-bn', path: '/bn/privacy-policy/' },
];

const SCREENSHOT_WIDTHS = [320, 360, 390];

interface Defect {
  route: string;
  viewport: number;
  type: string;
  details: string;
}

// Static web server serving the `out` directory
function startStaticServer(outDir: string, port = 4173): Promise<{ server: http.Server; baseUrl: string }> {
  const mimeTypes: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url?.split('?')[0] || '/');
    let filePath = path.join(outDir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath)) {
      if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      } else {
        filePath = path.join(outDir, '404.html');
        res.statusCode = 404;
      }
    }

    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const outDirArg = args.find((a) => a.startsWith('--output='))?.split('=')[1] || 'docs/mobile/before';
  const targetDir = path.resolve(process.cwd(), outDirArg);
  fs.mkdirSync(targetDir, { recursive: true });

  const buildOutDir = path.resolve(process.cwd(), 'out');
  if (!fs.existsSync(buildOutDir)) {
    console.error('Error: "out" directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  console.log(`Starting local server on port 4173 serving ${buildOutDir}...`);
  const { server, baseUrl } = await startStaticServer(buildOutDir, 4173);

  const browser = await chromium.launch({
    headless: true,
  });

  const defects: Defect[] = [];

  console.log(`\n======================================================`);
  console.log(`Running Mobile Layout Checks`);
  console.log(`Output Directory: ${targetDir}`);
  console.log(`Routes to test: ${ROUTES.length}`);
  console.log(`Viewports: ${VIEWPORTS.join(', ')}`);
  console.log(`======================================================\n`);

  try {
    const page = await browser.newPage();

    // Check 1: Meta Viewport Tag check on Home
    await page.goto(`${baseUrl}/en/`, { waitUntil: 'domcontentloaded' });
    const metaCheck = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]');
      if (!meta) return { ok: false, content: 'missing' };
      const content = meta.getAttribute('content') || '';
      const ok =
        content.includes('width=device-width') &&
        content.includes('initial-scale=1') &&
        !content.includes('maximum-scale') &&
        !content.includes('user-scalable=no') &&
        !content.includes('user-scalable=0');
      return { ok, content };
    });

    if (!metaCheck.ok) {
      defects.push({
        route: '/en/',
        viewport: 0,
        type: 'meta-viewport',
        details: `Meta viewport tag invalid or missing: "${metaCheck.content}"`,
      });
    }

    // Run matrix: Routes x Viewports
    for (const route of ROUTES) {
      for (const width of VIEWPORTS) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
        // Small delay to ensure rendering settles
        await page.waitForTimeout(50);

        // A. Horizontal Scroll check
        const scrollCheck = await page.evaluate(() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const clientWidth = document.documentElement.clientWidth;
          const innerWidth = window.innerWidth;
          return {
            scrollWidth,
            clientWidth,
            innerWidth,
            overflows: scrollWidth > innerWidth + 1,
          };
        });

        if (scrollCheck.overflows) {
          defects.push({
            route,
            viewport: width,
            type: 'horizontal-scroll',
            details: `document.documentElement.scrollWidth (${scrollCheck.scrollWidth}px) > window.innerWidth (${scrollCheck.innerWidth}px)`,
          });
        }

        // B. Overflowing visible elements (unless inside marked [data-scroll-container])
        const overflowingElements = await page.evaluate((vpWidth) => {
          const all = Array.from(document.querySelectorAll('body *'));
          const bad: { tag: string; className: string; right: number; text: string }[] = [];

          for (const el of all) {
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

            let insideScrollContainer = false;
            let curr: HTMLElement | null = el as HTMLElement;
            while (curr && curr !== document.body) {
              if (curr.hasAttribute('data-scroll-container')) {
                insideScrollContainer = true;
                break;
              }
              curr = curr.parentElement;
            }
            if (insideScrollContainer) continue;

            const rect = el.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) continue;

            if (rect.right > vpWidth + 1) {
              bad.push({
                tag: el.tagName.toLowerCase(),
                className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 50) : '',
                right: Math.round(rect.right),
                text: (el.textContent || '').trim().slice(0, 30),
              });
            }
          }
          return bad.slice(0, 3);
        }, width);

        for (const bad of overflowingElements) {
          defects.push({
            route,
            viewport: width,
            type: 'element-overflow',
            details: `<${bad.tag} class="${bad.className}"> extends to ${bad.right}px (viewport: ${width}px) [Text: "${bad.text}"]`,
          });
        }

        // C. Header rendering checks
        const headerCheck = await page.evaluate((vpWidth) => {
          const header = document.querySelector('header');
          if (!header) return null;

          const primaryNav = header.querySelector('nav[aria-label="Primary Navigation"]');
          const menuBtn = header.querySelector(
            'button[aria-label*="menu" i], button[aria-label*="মেনু" i], button[aria-controls="mobile-menu"], button[aria-expanded]'
          );

          const isPrimaryNavVisible = primaryNav
            ? window.getComputedStyle(primaryNav).display !== 'none' &&
              primaryNav.getBoundingClientRect().width > 0
            : false;

          const isMenuBtnVisible = menuBtn
            ? window.getComputedStyle(menuBtn).display !== 'none' &&
              menuBtn.getBoundingClientRect().width > 0
            : false;

          const issues: string[] = [];
          if (vpWidth < 1100) {
            if (isPrimaryNavVisible) {
              issues.push(`Desktop nav is visible below 1100px (at ${vpWidth}px)`);
            }
            if (!isMenuBtnVisible) {
              issues.push(`Menu button is missing or hidden below 1100px (at ${vpWidth}px)`);
            }
          } else {
            if (!isPrimaryNavVisible) {
              issues.push(`Desktop nav is hidden at or above 1100px (at ${vpWidth}px)`);
            }
            if (isMenuBtnVisible) {
              issues.push(`Menu button is visible at or above 1100px (at ${vpWidth}px)`);
            }
            // Header height check (must be one line, not wrapped)
            const hRect = header.getBoundingClientRect();
            if (hRect.height > 85) {
              issues.push(`Header wraps onto multiple lines (height: ${Math.round(hRect.height)}px)`);
            }
          }
          return issues;
        }, width);

        if (headerCheck) {
          for (const issue of headerCheck) {
            defects.push({
              route,
              viewport: width,
              type: 'header-layout',
              details: issue,
            });
          }
        }

        // D. Hero logo mark (on Home pages)
        if (route === '/en/' || route === '/bn/') {
          const logoCheck = await page.evaluate((vpWidth) => {
            const img = document.querySelector('section img[alt*="Logo Mark"], section img[alt*="প্রতীক"], section img[alt*="লোগো"]');
            if (!img) return null;
            const rect = img.getBoundingClientRect();
            const issues: string[] = [];
            if (vpWidth < 600) {
              const maxAllowed = Math.min(vpWidth, 220);
              if (rect.width > maxAllowed + 2) {
                issues.push(`Hero logo width ${Math.round(rect.width)}px exceeds ${maxAllowed}px on phone (${vpWidth}px)`);
              }
            } else if (vpWidth < 1024) {
              if (rect.width > 325) {
                issues.push(`Hero logo width ${Math.round(rect.width)}px exceeds 320px on tablet (${vpWidth}px)`);
              }
            }
            return issues;
          }, width);

          if (logoCheck) {
            for (const issue of logoCheck) {
              defects.push({
                route,
                viewport: width,
                type: 'hero-logo',
                details: issue,
              });
            }
          }
        }

        // E. Typography font-size checks (body >= 16px, no text < 14px)
        const typoCheck = await page.evaluate(() => {
          const bodySize = parseFloat(window.getComputedStyle(document.body).fontSize);
          const issues: string[] = [];
          if (bodySize < 16) {
            issues.push(`Body font size is ${bodySize}px (< 16px)`);
          }

          const textNodes = Array.from(
            document.querySelectorAll('p, span, a, li, h1, h2, h3, h4, h5, h6, label, input, button')
          );
          for (const el of textNodes) {
            const text = (el.textContent || '').trim();
            if (!text) continue;
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden') continue;
            // Ignore small superscript/subscript or copyright symbol
            if (['SUP', 'SUB'].includes(el.tagName)) continue;
            const fs = parseFloat(style.fontSize);
            if (fs < 13.5) {
              issues.push(`Text below 14px (${fs}px): "${text.slice(0, 25)}" in <${el.tagName.toLowerCase()}>`);
              break;
            }
          }
          return issues;
        });

        for (const issue of typoCheck) {
          defects.push({
            route,
            viewport: width,
            type: 'typography',
            details: issue,
          });
        }

        // F. Tap targets (< 1024px)
        if (width < 1024) {
          const tapCheck = await page.evaluate(() => {
            const issues: string[] = [];
            const interactive = Array.from(document.querySelectorAll('a, button, input:not([type="hidden"]), select, textarea'));
            for (const el of interactive) {
              const style = window.getComputedStyle(el);
              if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
              const rect = el.getBoundingClientRect();
              if (rect.width <= 0 || rect.height <= 0) continue;

              // Ignore links wrapped in body paragraphs
              const parentTag = el.parentElement?.tagName || '';
              if (el.tagName === 'A' && ['P', 'LI'].includes(parentTag) && !el.className.includes('button')) {
                continue;
              }

              if (rect.width < 44 || rect.height < 44) {
                const text = (el.textContent || el.getAttribute('aria-label') || '').trim();
                issues.push(`Tap target < 44px (${Math.round(rect.width)}x${Math.round(rect.height)}px): <${el.tagName.toLowerCase()}> "${text.slice(0, 20)}"`);
                if (issues.length >= 3) break;
              }
            }
            return issues;
          });

          for (const issue of tapCheck) {
            defects.push({
              route,
              viewport: width,
              type: 'tap-target',
              details: issue,
            });
          }
        }
      }
    }

    // Step G: Capture Key Screenshots (at 320, 360, 390px)
    console.log(`\nCapturing Screenshots for Visual Evidence...`);
    for (const item of SCREENSHOT_ROUTES) {
      for (const w of SCREENSHOT_WIDTHS) {
        await page.setViewportSize({ width: w, height: 800 });
        await page.goto(`${baseUrl}${item.path}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(100);
        const shotPath = path.join(targetDir, `${item.name}-${w}px.png`);
        await page.screenshot({ path: shotPath, fullPage: false });
      }
    }

    // Capture Drawer Open at 360px for EN and BN (if drawer exists)
    for (const lang of ['en', 'bn']) {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto(`${baseUrl}/${lang}/`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);
      const menuBtn = page.locator('button[aria-label*="menu" i], button[aria-label*="মেনু" i], button[aria-controls="mobile-menu"], button[aria-expanded]').first();
      if (await menuBtn.isVisible().catch(() => false)) {
        await menuBtn.click();
        await page.waitForTimeout(150);
        await page.screenshot({ path: path.join(targetDir, `drawer-open-${lang}-360px.png`), fullPage: false });
      } else {
        // Fallback placeholder screenshot showing header has no drawer button
        await page.screenshot({ path: path.join(targetDir, `drawer-missing-${lang}-360px.png`), fullPage: false });
      }
    }

    // Save defects JSON and Markdown Report
    const reportPath = path.join(targetDir, 'defects.json');
    fs.writeFileSync(reportPath, JSON.stringify(defects, null, 2), 'utf-8');

    const summaryMdPath = path.join(targetDir, 'summary.md');
    const groupedByType: Record<string, number> = {};
    for (const d of defects) {
      groupedByType[d.type] = (groupedByType[d.type] || 0) + 1;
    }

    let md = `# Mobile Layout Verification Report\n\n`;
    md += `**Target Directory**: \`${outDirArg}\`  \n`;
    md += `**Total Defects Found**: **${defects.length}**  \n\n`;
    md += `### Defects by Category:\n`;
    for (const [type, count] of Object.entries(groupedByType)) {
      md += `- **${type}**: ${count}\n`;
    }
    md += `\n### Sample Defects:\n`;
    for (const d of defects.slice(0, 30)) {
      md += `- **[${d.type}]** \`${d.route}\` @ ${d.viewport}px: ${d.details}\n`;
    }
    fs.writeFileSync(summaryMdPath, md, 'utf-8');

    console.log(`\n======================================================`);
    console.log(`SUMMARY OF DEFECTS FOUND: ${defects.length}`);
    for (const [type, count] of Object.entries(groupedByType)) {
      console.log(`  - ${type}: ${count}`);
    }
    console.log(`Report and screenshots saved to: ${targetDir}`);
    console.log(`======================================================\n`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
