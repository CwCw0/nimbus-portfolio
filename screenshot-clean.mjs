import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'http://localhost:3002';
const PUBLIC = '/Users/admin/Desktop/HQ/Personal/Nimbus/nimbus-portfolio/public/images/templates';
const GUMROAD = '/Users/admin/Desktop/HQ/Personal/Nimbus/Web Designs/Gumroad Ready';

const templates = [
  { name: 'studio-noir', pages: ['', '/work', '/about', '/contact'], innerIndex: 1, hasLoader: true, hasGsap: true },
  { name: 'elevate', pages: ['', '/about', '/features', '/pricing', '/contact'], innerIndex: 3, hasLoader: false, hasGsap: false },
  { name: 'pop-store', pages: ['', '/shop', '/product', '/about'], innerIndex: 2, hasLoader: false, hasGsap: false },
  { name: 'vitalis', pages: ['', '/services', '/about', '/contact'], innerIndex: 1, hasLoader: false, hasGsap: false },
  { name: 'roast', pages: ['', '/coffee', '/story', '/locations', '/contact'], innerIndex: 2, hasLoader: false, hasGsap: false },
  { name: 'mono', pages: ['', '/project', '/about', '/contact'], innerIndex: 2, hasLoader: false, hasGsap: false },
];

async function scrollAndWait(page, slow = false) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  const stepSize = slow ? 200 : 300;
  const delay = slow ? 200 : 120;
  const steps = Math.ceil(height / stepSize);
  for (let i = 0; i < steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * stepSize);
    await page.waitForTimeout(delay);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(slow ? 1200 : 800);
}

/**
 * Master cleanup — removes ALL non-template UI overlays:
 * - PreviewBar (Nimbus exit bar at top, z-index 9999)
 * - Next.js dev indicators (bubble, toast, portal)
 * - BREAKDOWN buttons (fixed bottom-left links)
 * - Studio Noir grain overlay (makes screenshots look washed out)
 * - Fixes nav position from top:44 to top:0 after PreviewBar removal
 */
async function cleanPage(page, templateName) {
  await page.evaluate((tplName) => {
    // ── 1. Remove Next.js dev indicators ──
    document.querySelectorAll(
      'nextjs-portal, [data-nextjs-toast], [data-nextjs-dialog-overlay], #__next-build-watcher'
    ).forEach(el => el.remove());

    // ── 2. Remove PreviewBar (fixed top, z-index >= 9999) ──
    document.querySelectorAll('*').forEach(el => {
      const s = getComputedStyle(el);
      if (s.position !== 'fixed') return;
      const rect = el.getBoundingClientRect();
      const z = parseInt(s.zIndex) || 0;

      // PreviewBar: top bar with very high z-index
      if (rect.top < 5 && z >= 9999 && rect.height < 80) {
        el.remove();
        return;
      }

      // BREAKDOWN button + any small fixed bottom-left/right elements
      if (rect.bottom > window.innerHeight - 80) {
        if ((rect.left < 100 || rect.right > window.innerWidth - 200) && rect.width < 300 && rect.height < 80) {
          el.remove();
          return;
        }
      }
    });

    // ── 3. Remove BREAKDOWN links by href pattern + text ──
    document.querySelectorAll('a[href*="/work/designs/"]').forEach(el => {
      const s = getComputedStyle(el);
      const ps = el.parentElement ? getComputedStyle(el.parentElement) : null;
      if (s.position === 'fixed' || (ps && ps.position === 'fixed')) {
        (el.closest('[style*="fixed"]') || el).remove();
      }
    });
    // Also catch BREAKDOWN buttons by text content
    document.querySelectorAll('a').forEach(el => {
      if (el.textContent && el.textContent.includes('BREAKDOWN')) {
        const wrapper = el.closest('div[style*="fixed"]') || el.closest('div[style*="position"]') || el;
        wrapper.remove();
      }
    });

    // ── 4. Fix nav position (was top:44 to account for PreviewBar) ──
    document.querySelectorAll('nav').forEach(nav => {
      const s = getComputedStyle(nav);
      if (s.position === 'fixed' && parseInt(s.top) > 30 && parseInt(s.top) < 60) {
        nav.style.top = '0px';
      }
    });

    // ── 5. Studio Noir specific: hide grain overlay ──
    if (tplName === 'studio-noir') {
      document.querySelectorAll('.sn-grain').forEach(el => {
        el.style.display = 'none';
      });
    }

    // ── 6. Remove any remaining Next.js dev overlays (button in corner) ──
    document.querySelectorAll('body > div').forEach(el => {
      const s = getComputedStyle(el);
      if (s.position === 'fixed' && s.zIndex === '2147483647') {
        el.remove();
      }
    });

  }, templateName);

  await page.waitForTimeout(300);
}

async function waitForStudioNoirLoader(page) {
  console.log('    ⏳ Waiting for Studio Noir loader...');
  await page.waitForTimeout(3500);

  const hasMainContent = await page.evaluate(() => {
    return document.querySelector('nav') !== null;
  });

  if (!hasMainContent) {
    console.log('    ⏳ Loader still active, waiting more...');
    await page.waitForTimeout(2500);
  }
}

async function triggerGsapAnimations(page) {
  // Scroll through the page slowly to trigger scroll-based animations
  await scrollAndWait(page, true);
  await page.waitForTimeout(1000);

  // Force all animated elements to their final visible state
  await page.evaluate(() => {
    // Make all elements with opacity:0 visible
    document.querySelectorAll('*').forEach(el => {
      const s = getComputedStyle(el);
      if (parseFloat(s.opacity) < 0.1 && el.classList.length > 0) {
        // Only fix elements that look like GSAP targets (have animation classes)
        if (el.classList.contains('char') || el.classList.contains('word') ||
            el.className.includes('sn-') || el.className.includes('split')) {
          el.style.opacity = '1';
          el.style.filter = 'blur(0px)';
          el.style.transform = 'translateY(0) rotateX(0)';
        }
      }
    });

    // Fix split-type chars
    document.querySelectorAll('.char, .word').forEach(el => {
      el.style.opacity = '1';
      el.style.filter = 'blur(0px)';
      el.style.transform = 'translateY(0) rotateX(0)';
    });

    // Fix clip-path hidden elements
    document.querySelectorAll('*').forEach(el => {
      if (el.style.clipPath && (el.style.clipPath.includes('100%') || el.style.clipPath.includes('50%'))) {
        el.style.clipPath = 'inset(0 0 0 0)';
      }
    });

    // Stats: show final values
    document.querySelectorAll('.sn-stat-num').forEach(el => {
      const parent = el.closest('.sn-stat');
      if (parent) {
        el.textContent = (parent.dataset.target || '0') + (parent.dataset.suffix || '');
      }
    });

    // Fade elements
    document.querySelectorAll('.sn-fade').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });

    // Service cards
    document.querySelectorAll('.sn-svc-card').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) rotateY(0)';
    });
  });

  await page.waitForTimeout(500);
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const template of templates) {
    const pubDir = join(PUBLIC, template.name);
    const gumDir = join(GUMROAD, template.name, 'screenshots');
    mkdirSync(pubDir, { recursive: true });
    mkdirSync(gumDir, { recursive: true });

    console.log(`\n📸 ${template.name.toUpperCase()}`);

    for (let i = 0; i < template.pages.length; i++) {
      const slug = template.pages[i];
      const url = `${BASE}/work/designs/${template.name}/preview${slug}`;
      const label = slug === '' ? 'homepage' : slug.replace('/', '');

      const page = await context.newPage();
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        // Studio Noir homepage needs loader wait
        if (template.hasLoader && i === 0) {
          await waitForStudioNoirLoader(page);
        } else {
          await page.waitForTimeout(2000);
        }

        // Clean UI (remove PreviewBar, dev tools, grain, fix nav)
        await cleanPage(page, template.name);

        // For Studio Noir homepage, force GSAP animations
        if (template.hasGsap && i === 0) {
          await triggerGsapAnimations(page);
          await cleanPage(page, template.name);
        } else {
          await scrollAndWait(page);
        }

        // Final clean
        await cleanPage(page, template.name);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        // Fold screenshot
        await page.screenshot({
          path: join(gumDir, `${String(i + 1).padStart(2, '0')}-${label}-fold.png`),
          fullPage: false,
        });

        // Full page
        await page.screenshot({
          path: join(gumDir, `${String(i + 1).padStart(2, '0')}-${label}-full.png`),
          fullPage: true,
        });

        // Portfolio showcase images
        if (i === 0) {
          await page.screenshot({ path: join(pubDir, 'hero.png'), fullPage: false });
          await page.screenshot({ path: join(pubDir, 'full.png'), fullPage: true });
        }
        if (i === (template.innerIndex ?? 2)) {
          await page.screenshot({ path: join(pubDir, 'inner.png'), fullPage: false });
        }

        console.log(`  ✓ ${label}`);
      } catch (e) {
        console.log(`  ✗ ${label} — ${e.message}`);
      }
      await page.close();
    }

    // Mobile screenshots
    const mobilePage = await browser.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    try {
      await mobilePage.goto(`${BASE}/work/designs/${template.name}/preview`, {
        waitUntil: 'networkidle', timeout: 30000,
      });

      if (template.hasLoader) {
        await waitForStudioNoirLoader(mobilePage);
      } else {
        await mobilePage.waitForTimeout(2000);
      }

      await cleanPage(mobilePage, template.name);

      if (template.hasGsap) {
        await triggerGsapAnimations(mobilePage);
        await cleanPage(mobilePage, template.name);
      } else {
        await scrollAndWait(mobilePage);
      }

      await cleanPage(mobilePage, template.name);
      await mobilePage.evaluate(() => window.scrollTo(0, 0));
      await mobilePage.waitForTimeout(500);

      await mobilePage.screenshot({ path: join(gumDir, 'mobile-fold.png'), fullPage: false });
      await mobilePage.screenshot({ path: join(gumDir, 'mobile-full.png'), fullPage: true });
      await mobilePage.screenshot({ path: join(pubDir, 'mobile.png'), fullPage: false });
      console.log(`  ✓ mobile`);
    } catch (e) {
      console.log(`  ✗ mobile — ${e.message}`);
    }
    await mobilePage.close();
  }

  await browser.close();
  console.log('\n✅ All screenshots clean — no PreviewBar, no dev UI, no grain, nav at top');
}

run().catch(console.error);
