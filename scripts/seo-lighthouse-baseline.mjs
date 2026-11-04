import http from 'http';
import fs from 'fs';
import path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

function startStaticServer(outDir, port = 4182) {
  const mimeTypes = {
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

async function runAudit() {
  const outDir = path.resolve(process.cwd(), 'out');
  const { server, baseUrl } = await startStaticServer(outDir, 4182);

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      disabled: false,
    },
  };

  const routes = [
    { name: 'Home (EN)', path: '/en/' },
    { name: 'Home (BN)', path: '/bn/' },
    { name: 'About (EN)', path: '/en/about/' },
    { name: 'About (BN)', path: '/bn/about/' },
    { name: 'Businesses (EN)', path: '/en/businesses/' },
    { name: 'Businesses (BN)', path: '/bn/businesses/' },
    { name: 'News (EN)', path: '/en/news/' },
    { name: 'News (BN)', path: '/bn/news/' },
    { name: 'Contact (EN)', path: '/en/contact/' },
    { name: 'Contact (BN)', path: '/bn/contact/' },
    { name: 'Privacy Policy (EN)', path: '/en/privacy-policy/' },
    { name: 'Privacy Policy (BN)', path: '/bn/privacy-policy/' },
  ];

  const results = {};

  try {
    for (const route of routes) {
      console.log(`Running Lighthouse Mobile audit on ${route.name} (${route.path})...`);
      const runnerResult = await lighthouse(`${baseUrl}${route.path}`, options);
      if (!runnerResult) continue;

      const categories = runnerResult.lhr.categories;
      const audits = runnerResult.lhr.audits;

      results[route.path] = {
        name: route.name,
        path: route.path,
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
        metrics: {
          lcp: audits['largest-contentful-paint']?.displayValue || '',
          cls: audits['cumulative-layout-shift']?.displayValue || '',
          tbt: audits['total-blocking-time']?.displayValue || '',
          fcp: audits['first-contentful-paint']?.displayValue || '',
        },
      };
      console.log(`  Scores: Perf=${results[route.path].performance}, A11y=${results[route.path].accessibility}, BP=${results[route.path].bestPractices}, SEO=${results[route.path].seo}`);
    }

    fs.mkdirSync(path.resolve(process.cwd(), 'docs/seo'), { recursive: true });
    fs.writeFileSync(
      path.resolve(process.cwd(), 'docs/seo/lighthouse-before.json'),
      JSON.stringify(results, null, 2),
      'utf-8'
    );
    console.log('Saved Lighthouse results to docs/seo/lighthouse-before.json');
  } finally {
    await chrome.kill();
    server.close();
  }
}

runAudit().catch((err) => {
  console.error('Lighthouse audit failed:', err);
  process.exit(1);
});
