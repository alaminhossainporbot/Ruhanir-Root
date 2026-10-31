import puppeteer from 'puppeteer';

async function testViewport() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 800, isMobile: true });

  const urls = [
    'http://localhost:3333/bn/',
    'http://localhost:3333/bn/about/',
    'http://localhost:3333/bn/businesses/',
    'http://localhost:3333/bn/contact/'
  ];

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle0' });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;

    console.log(`URL: ${url}`);
    console.log(`  clientWidth: ${clientWidth}px, scrollWidth: ${scrollWidth}px`);
    console.log(`  Horizontal overflow: ${hasHorizontalOverflow ? 'YES (FAIL)' : 'NO (PASS)'}`);
  }

  await browser.close();
}

testViewport().catch(console.error);
