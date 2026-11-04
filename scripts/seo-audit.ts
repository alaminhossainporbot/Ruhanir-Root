import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium, Page } from 'playwright';

interface AuditResult {
  url: string;
  path: string;
  status: number;
  lang: string;
  title: string;
  titleLength: number;
  titlePixelWidth: number;
  description: string;
  descriptionLength: number;
  canonical: string;
  isCanonicalAbsolute: boolean;
  isCanonicalSelfReferencing: boolean;
  isInSitemap: boolean;
  hreflangs: Record<string, string>;
  hasXDefault: boolean;
  h1Count: number;
  h1Text: string;
  headingOrderValid: boolean;
  headingOrderIssues: string[];
  ogTags: Record<string, string>;
  twitterTags: Record<string, string>;
  viewport: string;
  robotsMeta: string;
  jsonLdList: any[];
  jsonLdIssues: string[];
  images: Array<{
    src: string;
    alt: string;
    hasAlt: boolean;
    width: string | null;
    height: string | null;
    format: string;
  }>;
  internalLinks: Array<{
    href: string;
    text: string;
    isCrawlableHref: boolean;
    status?: number;
  }>;
  pageWeight: {
    totalBytes: number;
    htmlBytes: number;
    cssBytes: number;
    jsBytes: number;
    imageBytes: number;
    fontBytes: number;
    largestJsChunk: { name: string; bytes: number } | null;
  };
  mixedContent: string[];
}

interface Issue {
  severity: 'CRITICAL' | 'WARNING' | 'NOTICE';
  url: string;
  message: string;
}

// Estimate pixel width: ~10px per Latin char, ~15px per Bangla char (for standard 16px/18px title)
function estimateTitlePixelWidth(text: string): number {
  let width = 0;
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code >= 0x0980 && code <= 0x09ff) {
      width += 15.5; // Bangla unicode block
    } else if (/[A-Z]/.test(char)) {
      width += 11.5;
    } else if (/[a-z0-9]/.test(char)) {
      width += 9.5;
    } else if (/\s/.test(char)) {
      width += 5;
    } else {
      width += 9;
    }
  }
  return Math.round(width);
}

function startStaticServer(outDir: string, port = 4178) {
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
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
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

  return new Promise<{ server: http.Server; baseUrl: string }>((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

export async function runSeoAudit(): Promise<{
  results: AuditResult[];
  issues: Issue[];
  sitemapUrls: string[];
  robotsTxt: string;
}> {
  const outDir = path.resolve(process.cwd(), 'out');
  const { server, baseUrl } = await startStaticServer(outDir, 4178);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent:
      'Mozilla/5.0 (compatible; RuhanirAuditBot/1.0; +https://ruhanir.com)',
  });

  const issues: Issue[] = [];
  const results: AuditResult[] = [];

  // 1. Read robots.txt
  let robotsTxt = '';
  try {
    const res = await fetch(`${baseUrl}/robots.txt`);
    if (res.status === 200) {
      robotsTxt = await res.text();
    } else {
      issues.push({
        severity: 'CRITICAL',
        url: '/robots.txt',
        message: `robots.txt returned HTTP ${res.status}`,
      });
    }
  } catch (e: any) {
    issues.push({
      severity: 'CRITICAL',
      url: '/robots.txt',
      message: `Failed to fetch robots.txt: ${e.message}`,
    });
  }

  // 2. Read sitemap.xml
  const sitemapUrls: string[] = [];
  try {
    const res = await fetch(`${baseUrl}/sitemap.xml`);
    if (res.status === 200) {
      const xml = await res.text();
      const locMatches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
      for (const m of locMatches) {
        sitemapUrls.push(m[1].trim());
      }
    } else {
      issues.push({
        severity: 'CRITICAL',
        url: '/sitemap.xml',
        message: `sitemap.xml returned HTTP ${res.status}`,
      });
    }
  } catch (e: any) {
    issues.push({
      severity: 'CRITICAL',
      url: '/sitemap.xml',
      message: `Failed to fetch sitemap.xml: ${e.message}`,
    });
  }

  // Determine list of paths to crawl
  const initialPaths = [
    '/',
    '/en/',
    '/bn/',
    '/en/about/',
    '/bn/about/',
    '/en/businesses/',
    '/bn/businesses/',
    '/en/contact/',
    '/bn/contact/',
    '/en/news/',
    '/bn/news/',
    '/en/news/website-launch/',
    '/bn/news/website-launch/',
    '/en/legal/',
    '/bn/legal/',
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
  ];

  // Merge any URLs found in sitemap
  for (const sUrl of sitemapUrls) {
    try {
      const parsed = new URL(sUrl);
      if (!initialPaths.includes(parsed.pathname)) {
        initialPaths.push(parsed.pathname);
      }
    } catch {}
  }

  const crawled = new Set<string>();
  const toCrawl = [...initialPaths];

  while (toCrawl.length > 0) {
    const currentPath = toCrawl.shift()!;
    if (crawled.has(currentPath)) continue;
    crawled.add(currentPath);

    const fullUrl = `${baseUrl}${currentPath}`;
    const page = await context.newPage();

    let htmlBytes = 0;
    let cssBytes = 0;
    let jsBytes = 0;
    let imageBytes = 0;
    let fontBytes = 0;
    let largestJsChunk: { name: string; bytes: number } | null = null;
    const mixedContent: string[] = [];

    page.on('response', (res) => {
      const u = res.url();
      if (u.startsWith('http://') && !u.includes('127.0.0.1')) {
        mixedContent.push(u);
      }
      const headers = res.headers();
      const len = parseInt(headers['content-length'] || '0', 10);
      const ct = headers['content-type'] || '';

      if (ct.includes('html')) htmlBytes += len;
      else if (ct.includes('css')) cssBytes += len;
      else if (ct.includes('javascript')) {
        jsBytes += len;
        const filename = path.basename(new URL(u).pathname);
        if (!largestJsChunk || len > largestJsChunk.bytes) {
          largestJsChunk = { name: filename, bytes: len };
        }
      } else if (ct.includes('image')) imageBytes += len;
      else if (ct.includes('font')) fontBytes += len;
    });

    let navResponse;
    try {
      navResponse = await page.goto(fullUrl, { waitUntil: 'networkidle' });
    } catch (e: any) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: `Failed navigation: ${e.message}`,
      });
      await page.close();
      continue;
    }

    const status = navResponse?.status() || 0;
    if (status !== 200) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: `Returned HTTP ${status}`,
      });
    }

    // Trailing slash check
    if (currentPath !== '/' && !currentPath.endsWith('/')) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: `URL lacks trailing slash: ${currentPath}`,
      });
    }

    // Evaluate DOM elements
    const pageData = await page.evaluate(() => {
      const lang = document.documentElement.lang || '';
      const title = document.title || '';
      const metaDesc =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content') || '';
      const canonical =
        document
          .querySelector('link[rel="canonical"]')
          ?.getAttribute('href') || '';
      const viewport =
        document
          .querySelector('meta[name="viewport"]')
          ?.getAttribute('content') || '';
      const robotsMeta =
        document
          .querySelector('meta[name="robots"]')
          ?.getAttribute('content') || '';

      // hreflang
      const hreflangs: Record<string, string> = {};
      const alternateElements = document.querySelectorAll(
        'link[rel="alternate"]'
      );
      alternateElements.forEach((el) => {
        const hl = el.getAttribute('hreflang');
        const hr = el.getAttribute('href');
        if (hl && hr) {
          hreflangs[hl] = hr;
        }
      });

      // Headings
      const headings: Array<{ level: number; text: string }> = [];
      const headingEls = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headingEls.forEach((el) => {
        const lvl = parseInt(el.tagName.replace('H', ''), 10);
        headings.push({ level: lvl, text: el.textContent?.trim() || '' });
      });

      // OG & Twitter
      const ogTags: Record<string, string> = {};
      document.querySelectorAll('meta[property^="og:"]').forEach((el) => {
        const prop = el.getAttribute('property');
        const cont = el.getAttribute('content');
        if (prop && cont) ogTags[prop] = cont;
      });

      const twitterTags: Record<string, string> = {};
      document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => {
        const name = el.getAttribute('name');
        const cont = el.getAttribute('content');
        if (name && cont) twitterTags[name] = cont;
      });

      // Images
      const images: Array<{
        src: string;
        alt: string;
        hasAlt: boolean;
        width: string | null;
        height: string | null;
        format: string;
      }> = [];
      document.querySelectorAll('img').forEach((el) => {
        const src = el.getAttribute('src') || '';
        const alt = el.getAttribute('alt');
        const w = el.getAttribute('width');
        const h = el.getAttribute('height');
        const ext = src.split('?')[0].split('.').pop() || '';
        images.push({
          src,
          alt: alt || '',
          hasAlt: alt !== null,
          width: w,
          height: h,
          format: ext,
        });
      });

      // Links
      const internalLinks: Array<{
        href: string;
        text: string;
        isCrawlableHref: boolean;
      }> = [];
      document.querySelectorAll('a').forEach((el) => {
        const href = el.getAttribute('href') || '';
        const text = el.textContent?.trim() || '';
        const isCrawlable =
          Boolean(href) &&
          !href.startsWith('javascript:') &&
          !href.startsWith('#');
        internalLinks.push({
          href,
          text,
          isCrawlableHref: isCrawlable,
        });
      });

      // JSON-LD
      const jsonLdList: any[] = [];
      const jsonLdIssues: string[] = [];
      document
        .querySelectorAll('script[type="application/ld+json"]')
        .forEach((el) => {
          try {
            const parsed = JSON.parse(el.textContent || '{}');
            jsonLdList.push(parsed);
          } catch (e: any) {
            jsonLdIssues.push(`Invalid JSON-LD syntax: ${e.message}`);
          }
        });

      return {
        lang,
        title,
        description: metaDesc,
        canonical,
        viewport,
        robotsMeta,
        hreflangs,
        headings,
        ogTags,
        twitterTags,
        images,
        internalLinks,
        jsonLdList,
        jsonLdIssues,
      };
    });

    // Heading order analysis
    let h1Count = 0;
    let h1Text = '';
    const headingOrderIssues: string[] = [];
    let lastLevel = 0;

    for (const h of pageData.headings) {
      if (h.level === 1) {
        h1Count++;
        h1Text = h.text;
      }
      if (lastLevel > 0 && h.level > lastLevel + 1) {
        headingOrderIssues.push(
          `Skipped heading level: H${lastLevel} directly to H${h.level} ("${h.text.substring(0, 30)}")`
        );
      }
      lastLevel = h.level;
    }

    if (h1Count === 0) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: 'Missing H1 heading on page',
      });
    } else if (h1Count > 1) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: `Multiple H1 headings (${h1Count}) found on page`,
      });
    }

    if (headingOrderIssues.length > 0) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: headingOrderIssues.join('; '),
      });
    }

    // Canonical checks
    const expectedCanonical =
      currentPath === '/'
        ? 'https://ruhanir.com/'
        : `https://ruhanir.com${currentPath}`;
    const isCanonicalAbsolute = pageData.canonical.startsWith('https://');
    const isCanonicalSelfReferencing =
      pageData.canonical === expectedCanonical ||
      pageData.canonical === expectedCanonical.replace(/\/$/, '') ||
      pageData.canonical + '/' === expectedCanonical;

    if (!pageData.canonical) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: 'Missing canonical link tag',
      });
    } else if (!isCanonicalAbsolute) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: `Canonical is not absolute: "${pageData.canonical}"`,
      });
    } else if (!isCanonicalSelfReferencing) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: `Canonical mismatch: found "${pageData.canonical}", expected "${expectedCanonical}"`,
      });
    }

    // Sitemap check
    const isInSitemap =
      sitemapUrls.includes(expectedCanonical) ||
      sitemapUrls.includes(expectedCanonical.replace(/\/$/, ''));
    if (!isInSitemap && currentPath !== '/') {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: `Page not listed in sitemap.xml: ${expectedCanonical}`,
      });
    }

    // Title checks
    const titlePixelWidth = estimateTitlePixelWidth(pageData.title);
    if (!pageData.title) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: 'Missing title tag',
      });
    } else if (titlePixelWidth > 600) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: `Title too long (~${titlePixelWidth}px / ${pageData.title.length} chars, exceeds 600px desktop snippet limit): "${pageData.title}"`,
      });
    } else if (pageData.title.length < 15 && currentPath !== '/') {
      issues.push({
        severity: 'NOTICE',
        url: currentPath,
        message: `Title might be too short (${pageData.title.length} chars): "${pageData.title}"`,
      });
    }

    // Description checks
    if (!pageData.description) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: 'Missing meta description',
      });
    } else if (pageData.description.length > 170) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: `Meta description too long (${pageData.description.length} chars, snippet cuts around 160 chars): "${pageData.description.substring(0, 40)}..."`,
      });
    } else if (pageData.description.length < 50) {
      issues.push({
        severity: 'NOTICE',
        url: currentPath,
        message: `Meta description too short (${pageData.description.length} chars): "${pageData.description}"`,
      });
    }

    // hreflang checks
    const hasXDefault = Boolean(pageData.hreflangs['x-default']);
    if (currentPath !== '/') {
      if (!pageData.hreflangs['en'] || !pageData.hreflangs['bn']) {
        issues.push({
          severity: 'CRITICAL',
          url: currentPath,
          message: `Incomplete hreflang tags: en=${pageData.hreflangs['en']}, bn=${pageData.hreflangs['bn']}`,
        });
      }
      if (!hasXDefault) {
        issues.push({
          severity: 'WARNING',
          url: currentPath,
          message: 'Missing hreflang="x-default"',
        });
      }
    }

    // Open Graph checks
    if (!pageData.ogTags['og:title']) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: 'Missing og:title tag',
      });
    }
    if (!pageData.ogTags['og:description']) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: 'Missing og:description tag',
      });
    }
    if (!pageData.ogTags['og:image']) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: 'Missing og:image tag',
      });
    }
    if (!pageData.ogTags['og:url']) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: 'Missing og:url tag',
      });
    }

    // Twitter checks
    if (!pageData.twitterTags['twitter:card']) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: 'Missing twitter:card tag',
      });
    }

    // Images checks
    for (const img of pageData.images) {
      if (!img.hasAlt) {
        issues.push({
          severity: 'CRITICAL',
          url: currentPath,
          message: `Image missing alt attribute: ${img.src}`,
        });
      }
    }

    // JSON-LD checks
    for (const jsonIssue of pageData.jsonLdIssues) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: jsonIssue,
      });
    }

    // Check forbidden schemas
    for (const j of pageData.jsonLdList) {
      const type = j['@type'] || '';
      const forbiddenTypes = [
        'Review',
        'AggregateRating',
        'FAQPage',
        'FAQ',
        'Product',
        'Offer',
      ];
      if (forbiddenTypes.includes(type)) {
        issues.push({
          severity: 'CRITICAL',
          url: currentPath,
          message: `Forbidden structured data @type "${type}" present in JSON-LD`,
        });
      }
    }

    // lang attribute check
    const expectedLang = currentPath.startsWith('/bn')
      ? 'bn'
      : currentPath.startsWith('/en')
        ? 'en'
        : 'bn';
    if (pageData.lang !== expectedLang) {
      issues.push({
        severity: 'WARNING',
        url: currentPath,
        message: `html lang mismatch: got "${pageData.lang}", expected "${expectedLang}"`,
      });
    }

    // Viewport check
    if (!pageData.viewport.includes('width=device-width')) {
      issues.push({
        severity: 'CRITICAL',
        url: currentPath,
        message: `Invalid viewport meta tag: "${pageData.viewport}"`,
      });
    }

    // Discover internal links to crawl if not yet queued
    for (const l of pageData.internalLinks) {
      if (l.isCrawlableHref && l.href.startsWith('/')) {
        const cleanHref = l.href.split('#')[0].split('?')[0];
        if (
          cleanHref &&
          !cleanHref.endsWith('.xml') &&
          !cleanHref.endsWith('.txt') &&
          !cleanHref.endsWith('.png') &&
          !cleanHref.endsWith('.svg') &&
          !cleanHref.endsWith('.ico')
        ) {
          const formattedHref = cleanHref.endsWith('/')
            ? cleanHref
            : `${cleanHref}/`;
          if (!crawled.has(formattedHref) && !toCrawl.includes(formattedHref)) {
            toCrawl.push(formattedHref);
          }
        }
      }
    }

    const totalBytes =
      htmlBytes + cssBytes + jsBytes + imageBytes + fontBytes;

    results.push({
      url: fullUrl,
      path: currentPath,
      status,
      lang: pageData.lang,
      title: pageData.title,
      titleLength: pageData.title.length,
      titlePixelWidth,
      description: pageData.description,
      descriptionLength: pageData.description.length,
      canonical: pageData.canonical,
      isCanonicalAbsolute,
      isCanonicalSelfReferencing,
      isInSitemap,
      hreflangs: pageData.hreflangs,
      hasXDefault,
      h1Count,
      h1Text,
      headingOrderValid: headingOrderIssues.length === 0,
      headingOrderIssues,
      ogTags: pageData.ogTags,
      twitterTags: pageData.twitterTags,
      viewport: pageData.viewport,
      robotsMeta: pageData.robotsMeta,
      jsonLdList: pageData.jsonLdList,
      jsonLdIssues: pageData.jsonLdIssues,
      images: pageData.images,
      internalLinks: pageData.internalLinks,
      pageWeight: {
        totalBytes,
        htmlBytes,
        cssBytes,
        jsBytes,
        imageBytes,
        fontBytes,
        largestJsChunk,
      },
      mixedContent,
    });

    await page.close();
  }

  // Cross-page check: Check hreflang reciprocity
  for (const r of results) {
    if (r.path === '/') continue;
    for (const [targetLang, targetUrl] of Object.entries(r.hreflangs)) {
      if (targetLang === 'x-default') continue;
      try {
        const targetPath = new URL(targetUrl).pathname;
        const matchingResult = results.find(
          (other) =>
            other.path === targetPath ||
            other.path === targetPath.replace(/\/$/, '') ||
            other.path + '/' === targetPath
        );
        if (!matchingResult) {
          issues.push({
            severity: 'WARNING',
            url: r.path,
            message: `Hreflang target ${targetUrl} (${targetLang}) not found in crawled pages`,
          });
        } else {
          // Check reciprocal link
          const myLang = r.path.startsWith('/bn') ? 'bn' : 'en';
          const reciprocalUrl = matchingResult.hreflangs[myLang];
          if (!reciprocalUrl) {
            issues.push({
              severity: 'CRITICAL',
              url: r.path,
              message: `Missing reciprocal hreflang from ${matchingResult.path} back to ${myLang} (${r.canonical})`,
            });
          }
        }
      } catch (e: any) {
        issues.push({
          severity: 'CRITICAL',
          url: r.path,
          message: `Malformed hreflang URL: ${targetUrl}`,
        });
      }
    }
  }

  // Cross-page check: Title and Description uniqueness
  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();

  for (const r of results) {
    if (r.title) {
      const list = titleMap.get(r.title) || [];
      list.push(r.path);
      titleMap.set(r.title, list);
    }
    if (r.description) {
      const list = descMap.get(r.description) || [];
      list.push(r.path);
      descMap.set(r.description, list);
    }
  }

  titleMap.forEach((paths, title) => {
    if (paths.length > 1) {
      issues.push({
        severity: 'CRITICAL',
        url: paths.join(', '),
        message: `Duplicate title tag shared across ${paths.length} pages: "${title}"`,
      });
    }
  });

  descMap.forEach((paths, desc) => {
    if (paths.length > 1) {
      issues.push({
        severity: 'CRITICAL',
        url: paths.join(', '),
        message: `Duplicate meta description shared across ${paths.length} pages: "${desc.substring(0, 50)}..."`,
      });
    }
  });

  await browser.close();
  server.close();

  return { results, issues, sitemapUrls, robotsTxt };
}

// If run directly
if (process.argv[1]?.endsWith('seo-audit.ts')) {
  runSeoAudit()
    .then(({ results, issues, sitemapUrls, robotsTxt }) => {
      console.log(`\n================ SEO AUDIT SUMMARY ================`);
      console.log(`Crawled ${results.length} URLs.`);
      console.log(`Sitemap contains ${sitemapUrls.length} URLs.`);
      console.log(`Issues found: ${issues.length}`);

      const critical = issues.filter((i) => i.severity === 'CRITICAL');
      const warning = issues.filter((i) => i.severity === 'WARNING');
      const notice = issues.filter((i) => i.severity === 'NOTICE');

      console.log(`\n🔴 Critical Issues: ${critical.length}`);
      critical.forEach((c) => console.log(`  - [${c.url}]: ${c.message}`));

      console.log(`\n🟡 Warnings: ${warning.length}`);
      warning.forEach((w) => console.log(`  - [${w.url}]: ${w.message}`));

      console.log(`\n🔵 Notices: ${notice.length}`);
      notice.forEach((n) => console.log(`  - [${n.url}]: ${n.message}`));

      console.log(`====================================================\n`);
    })
    .catch((err) => {
      console.error('Audit failed:', err);
      process.exit(1);
    });
}
