import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public', 'images');

const SITES = [
  {
    name: 'omnifood',
    url: 'https://omnifood-cw.netlify.app/',
    sections: [
      { name: 'hero', scroll: 0 },
      { name: 'how-it-works', scroll: 900 },
      { name: 'meals', scroll: 1800 },
      { name: 'testimonials', scroll: 2800 },
      { name: 'pricing', scroll: 3600 },
      { name: 'cta', scroll: 4800 },
    ],
  },
  {
    name: 'pulse',
    url: 'https://pulse-khaki-nine.vercel.app/',
    sections: [
      { name: 'hero', scroll: 0 },
      { name: 'about', scroll: 900 },
      { name: 'heart-rate', scroll: 1800 },
      { name: 'sleep', scroll: 2700 },
      { name: 'nutrition', scroll: 3600 },
    ],
  },
  {
    name: 'voidframe',
    url: 'https://voidframe-three.vercel.app/',
    sections: [
      { name: 'hero', scroll: 0 },
      { name: 'community', scroll: 900 },
      { name: 'events', scroll: 1800 },
      { name: 'squads', scroll: 2700 },
      { name: 'members', scroll: 3600 },
      { name: 'chat', scroll: 4500 },
    ],
  },
];

async function capture() {
  const browser = await chromium.launch({ headless: true });

  for (const site of SITES) {
    const outDir = path.join(PUBLIC, site.name);
    fs.mkdirSync(outDir, { recursive: true });

    console.log(`\n=== ${site.name.toUpperCase()} ===`);
    console.log(`  URL: ${site.url}`);

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    try {
      console.log('  Loading...');
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2500);

      // Dismiss any overlays
      try {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      } catch {}

      // Take a full-page screenshot first for reference
      console.log('  Capturing full page...');
      await page.screenshot({
        path: path.join(outDir, 'full-page.png'),
        fullPage: true,
      });

      // Capture each section by scrolling to it
      for (const section of site.sections) {
        console.log(`  Capturing ${section.name}...`);
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), section.scroll);
        await page.waitForTimeout(800);
        await page.screenshot({
          path: path.join(outDir, `${section.name}.png`),
          fullPage: false,
        });
      }

      // Mobile capture
      console.log('  Capturing mobile...');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: path.join(outDir, 'mobile.png'),
        fullPage: false,
      });

    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone! All screenshots captured.');
}

capture().catch(console.error);
