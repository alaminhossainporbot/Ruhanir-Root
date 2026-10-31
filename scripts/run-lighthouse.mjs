import { execSync } from 'child_process';
import fs from 'fs';

console.log('Running mobile Lighthouse audit on http://localhost:3333/bn/ ...');
try {
  const result = execSync('npx --yes lighthouse http://localhost:3333/bn/ --form-factor=mobile --screenEmulation.mobile=true --chrome-flags="--headless=new --no-sandbox" --output=json --quiet', {
    maxBuffer: 1024 * 1024 * 20,
    encoding: 'utf8'
  });

  const report = JSON.parse(result);
  const categories = report.categories;
  const scores = {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories['best-practices'].score * 100),
    seo: Math.round(categories.seo.score * 100),
  };

  console.log('LIGHTHOUSE_SCORES:', JSON.stringify(scores, null, 2));
  fs.writeFileSync('lighthouse-summary.json', JSON.stringify(scores, null, 2));
} catch (err) {
  console.error('Lighthouse run failed:', err.message);
}
