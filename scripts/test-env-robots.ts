import worker from '../src/worker';
import { getCommonMetadata } from '../src/lib/metadata';
import fs from 'fs';
import path from 'path';

async function runTests() {
  console.log('Running Environment Gating & Robots Tests...\n');
  let failures = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      failures++;
    }
  }

  // Test 1: Production metadata output (SITE_ENV=production)
  process.env.SITE_ENV = 'production';
  const prodMeta = getCommonMetadata('en', 'about');
  assert(
    prodMeta.robots !== undefined &&
      (prodMeta.robots as any).index === true &&
      (prodMeta.robots as any).follow === true,
    'Production metadata specifies index: true, follow: true'
  );

  // Test 2: Non-production metadata output (SITE_ENV=preview)
  process.env.SITE_ENV = 'preview';
  const previewMeta = getCommonMetadata('en', 'about');
  assert(
    previewMeta.robots !== undefined &&
      (previewMeta.robots as any).index === false &&
      (previewMeta.robots as any).follow === false,
    'Non-production metadata specifies index: false, follow: false (noindex)'
  );

  // Test 3: Worker edge response on non-production hosts
  const mockFetch = async (request: Request) =>
    new Response('<html><body>Mock Content</body></html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

  const mockEnvProd = {
    ASSETS: { fetch: mockFetch },
    SITE_ENV: 'production',
  };

  const mockEnvNonProd = {
    ASSETS: { fetch: mockFetch },
    SITE_ENV: 'preview',
  };

  // 3A: workers.dev host must receive X-Robots-Tag: noindex, nofollow
  const resWorkers = await worker.fetch(
    new Request('https://ruhanir-root.ah-porbot.workers.dev/en/'),
    mockEnvProd
  );
  assert(
    resWorkers.headers.get('X-Robots-Tag') === 'noindex, nofollow',
    '*.workers.dev receives X-Robots-Tag: noindex, nofollow'
  );

  // 3B: pages.dev host must receive X-Robots-Tag: noindex, nofollow
  const resPages = await worker.fetch(
    new Request('https://preview-branch.ruhanir.pages.dev/'),
    mockEnvProd
  );
  assert(
    resPages.headers.get('X-Robots-Tag') === 'noindex, nofollow',
    '*.pages.dev receives X-Robots-Tag: noindex, nofollow'
  );

  // 3C: workbookbd.com host must receive X-Robots-Tag: noindex, nofollow
  const resWorkbook = await worker.fetch(
    new Request('https://workbookbd.com/bn/'),
    mockEnvProd
  );
  assert(
    resWorkbook.headers.get('X-Robots-Tag') === 'noindex, nofollow',
    'workbookbd.com receives X-Robots-Tag: noindex, nofollow'
  );

  // 3D: localhost must receive X-Robots-Tag: noindex, nofollow
  const resLocal = await worker.fetch(
    new Request('http://localhost:3000/'),
    mockEnvProd
  );
  assert(
    resLocal.headers.get('X-Robots-Tag') === 'noindex, nofollow',
    'localhost receives X-Robots-Tag: noindex, nofollow'
  );

  // 3E: Production domain (ruhanir.com) with SITE_ENV=production must NOT have noindex
  const resProd = await worker.fetch(
    new Request('https://ruhanir.com/en/'),
    mockEnvProd
  );
  assert(
    resProd.headers.get('X-Robots-Tag') === null,
    'Production ruhanir.com does NOT receive noindex in X-Robots-Tag'
  );

  // 3F: Production domain with non-production SITE_ENV receives noindex
  const resStaging = await worker.fetch(
    new Request('https://ruhanir.com/en/'),
    mockEnvNonProd
  );
  assert(
    resStaging.headers.get('X-Robots-Tag') === 'noindex, nofollow',
    'ruhanir.com with SITE_ENV!=production receives X-Robots-Tag: noindex, nofollow'
  );

  // Test 4: Sitemap contains only canonical https://ruhanir.com URLs
  const sitemapPath = path.resolve(process.cwd(), 'out/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const hasWorkersDev = sitemapContent.includes('workers.dev');
    const hasPagesDev = sitemapContent.includes('pages.dev');
    const hasWorkbook = sitemapContent.includes('workbookbd.com');
    const hasLocalhost = sitemapContent.includes('localhost');

    assert(
      !hasWorkersDev && !hasPagesDev && !hasWorkbook && !hasLocalhost,
      'sitemap.xml contains zero preview or staging hostnames'
    );
  }

  console.log(`\nTests finished with ${failures} failure(s).`);
  if (failures > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test runner failed:', err);
  process.exit(1);
});
