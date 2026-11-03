import http from 'http';
import fs from 'fs';
import path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

function startStaticServer(outDir, port = 4175) {
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

async function runLighthouse() {
  const outDir = path.resolve(process.cwd(), 'out');
  const targetDir = path.resolve(process.cwd(), 'docs/mobile/after');
  fs.mkdirSync(targetDir, { recursive: true });

  const { server, baseUrl } = await startStaticServer(outDir, 4175);

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

  const results = {};

  try {
    for (const lang of ['en', 'bn']) {
      console.log(`Running Lighthouse Mobile audit on /${lang}/...`);
      const runnerResult = await lighthouse(`${baseUrl}/${lang}/`, options);
      if (!runnerResult) continue;

      const categories = runnerResult.lhr.categories;
      results[lang] = {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
      };
    }

    console.log('\n======================================================');
    console.log('LIGHTHOUSE MOBILE SCORES:');
    console.log(JSON.stringify(results, null, 2));
    console.log('======================================================\n');

    fs.writeFileSync(
      path.join(targetDir, 'lighthouse-summary.json'),
      JSON.stringify(results, null, 2),
      'utf-8'
    );
  } finally {
    await chrome.kill();
    server.close();
  }
}

runLighthouse().catch((err) => {
  console.error('Lighthouse run failed:', err);
  process.exit(1);
});
