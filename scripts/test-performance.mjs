import puppeteer from 'puppeteer';

async function testPerformance() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, isMobile: true });
  
  const start = Date.now();
  await page.goto('http://localhost:3333/bn/', { waitUntil: 'load' });
  const loadTime = Date.now() - start;
  
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime;
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      load: Math.round(nav.loadEventEnd - nav.startTime),
      fcp: fcp ? Math.round(fcp) : null,
      transferSize: nav.transferSize
    };
  });
  
  console.log('Mobile Loading Metrics (360x640):', metrics);
  await browser.close();
}

testPerformance().catch(console.error);
