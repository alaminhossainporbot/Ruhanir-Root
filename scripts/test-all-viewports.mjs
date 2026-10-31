import puppeteer from 'puppeteer';

async function testAllViewports() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: '360px Mobile', width: 360, height: 640 },
    { name: '768px Tablet', width: 768, height: 1024 },
    { name: '1280px Desktop', width: 1280, height: 800 },
    { name: '1440px Desktop', width: 1440, height: 900 },
  ];

  const routes = [
    'bn/',
    'en/',
    'bn/about/',
    'en/about/',
    'bn/businesses/',
    'en/businesses/',
    'bn/news/',
    'en/news/',
    'bn/news/website-launch/',
    'en/news/website-launch/',
    'bn/contact/',
    'en/contact/',
    'bn/legal/',
    'en/legal/',
    'bn/privacy-policy/',
    'en/privacy-policy/',
    'bn/terms/',
    'en/terms/',
    'bn/cookie-policy/',
    'en/cookie-policy/',
    'bn/accessibility/',
    'en/accessibility/',
    'bn/security/',
    'en/security/',
    'bn/complaints/',
    'en/complaints/',
    'bn/terms-of-sale/',
    'en/terms-of-sale/',
    'bn/returns-refunds/',
    'en/returns-refunds/',
    'bn/delivery-shipping/',
    'en/delivery-shipping/',
    'bn/payment-policy/',
    'en/payment-policy/',
    'bn/digital-terms/',
    'en/digital-terms/',
    'bn/warranty-policy/',
    'en/warranty-policy/',
    'bn/service-terms/',
    'en/service-terms/',
    'bn/support-policy/',
    'en/support-policy/',
    'bn/confidentiality/',
    'en/confidentiality/',
  ];

  let anyFail = false;

  for (const vp of viewports) {
    console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.width < 1000 });

    for (const route of routes) {
      const url = `http://localhost:3333/${route}`;
      await page.goto(url, { waitUntil: 'networkidle0' });

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      const overflow = scrollWidth > clientWidth;

      if (overflow) {
        console.error(`  FAIL [${route}]: scrollWidth (${scrollWidth}px) > clientWidth (${clientWidth}px)`);
        anyFail = true;
      }
    }
    console.log(`  All ${routes.length} routes verified for ${vp.name}.`);
    await page.close();
  }

  // Anchor and logo test on 1440px
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3333/bn/', { waitUntil: 'networkidle0' });

  // Test logo dimensions inside container
  const logoBox = await page.evaluate(() => {
    const img = document.querySelector('section img[alt*="প্রতীক"]');
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      right: rect.right,
      windowWidth: window.innerWidth
    };
  });
  console.log('\nLogo box at 1440px:', logoBox);
  if (logoBox && logoBox.right <= 1440) {
    console.log('Logo mark inside container test: PASS');
  } else {
    console.error('Logo mark inside container test: FAIL');
    anyFail = true;
  }

  // Test anchor scroll-margin-top
  const anchorMargin = await page.evaluate(() => {
    const el = document.getElementById('divisions');
    if (!el) return null;
    return window.getComputedStyle(el).scrollMarginTop;
  });
  console.log('Anchor #divisions scroll-margin-top:', anchorMargin);

  await page.close();
  await browser.close();
  console.log(`\nOverall Multi-Viewport & Layout Check: ${anyFail ? 'FAILED' : 'ALL PASSED'}`);
}

testAllViewports().catch(console.error);
