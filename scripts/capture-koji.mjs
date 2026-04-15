import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'images', 'koji');

const URL = 'https://koji-seven.vercel.app';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  // Add sample data to make screenshots look populated
  const sampleTasks = JSON.stringify([
    { id: '1', text: 'Review pull request for auth module', done: false, createdAt: Date.now() - 3600000 },
    { id: '2', text: 'Write API documentation for /users endpoint', done: false, createdAt: Date.now() - 7200000 },
    { id: '3', text: 'Fix responsive layout on dashboard', done: false, createdAt: Date.now() - 86400000 },
    { id: '4', text: 'Set up CI/CD pipeline', done: false, createdAt: Date.now() - 172800000 },
    { id: '5', text: 'Design system: button variants', done: false, createdAt: Date.now() - 259200000 },
    { id: '6', text: 'Optimize image loading with lazy load', done: false, createdAt: Date.now() - 14400000 },
    { id: '7', text: 'Update dependencies to latest', done: true, createdAt: Date.now() - 432000000 },
    { id: '8', text: 'Add dark mode toggle', done: true, createdAt: Date.now() - 518400000 },
  ]);

  console.log('Navigating to Koji...');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Dismiss tutorial overlay if present
  console.log('Dismissing tutorial overlay...');
  try {
    const skipBtn = await page.$('text=Skip tutorial');
    if (skipBtn) {
      await skipBtn.click();
      await page.waitForTimeout(1000);
      console.log('  Tutorial dismissed via button');
    } else {
      // Try pressing Escape to dismiss any overlay
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      console.log('  Pressed Escape to dismiss overlays');
    }
  } catch {
    console.log('  No tutorial overlay found');
  }

  // Inject sample tasks into localStorage for populated UI
  await page.evaluate((tasks) => {
    localStorage.setItem('koji-tasks', tasks);
  }, sampleTasks);
  // Reload to pick up injected data
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Dismiss tutorial again after reload
  try {
    const skipBtn = await page.$('text=Skip tutorial');
    if (skipBtn) {
      await skipBtn.click();
      await page.waitForTimeout(1000);
    } else {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
  } catch {}

  // 1. Today view (full page)
  console.log('Capturing Today view...');
  await page.screenshot({
    path: path.join(OUT, 'today-full.png'),
    fullPage: false,
  });

  // 2. Click Board tab
  console.log('Capturing Board view...');
  try {
    await page.click('text=Board', { timeout: 5000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(OUT, 'board-full.png'),
      fullPage: false,
    });
  } catch (e) {
    console.log('  Board click failed, trying nav link...');
    await page.goto(URL + '/board', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(OUT, 'board-full.png'),
      fullPage: false,
    });
  }

  // 3. Click Notes tab
  console.log('Capturing Notes view...');
  try {
    await page.click('text=Notes', { timeout: 5000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(OUT, 'notes-full.png'),
      fullPage: false,
    });
  } catch (e) {
    console.log('  Notes click failed, trying nav link...');
    await page.goto(URL + '/notes', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(OUT, 'notes-full.png'),
      fullPage: false,
    });
  }

  // 4. Go back to Today for Brain Dump mode
  console.log('Capturing Brain Dump overlay...');
  try {
    await page.click('text=Today', { timeout: 5000 });
    await page.waitForTimeout(1000);
  } catch {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000);
  }
  // Press D for brain dump full-screen
  await page.keyboard.press('d');
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: path.join(OUT, 'braindump.png'),
    fullPage: false,
  });
  // Close brain dump
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // 5. Command Palette (Cmd+K)
  console.log('Capturing Command Palette...');
  await page.keyboard.press('Meta+k');
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUT, 'command-palette.png'),
    fullPage: false,
  });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // 6. Dark mode toggle
  console.log('Capturing Dark mode...');
  // Look for theme toggle button
  try {
    const themeBtn = await page.$('[aria-label*="theme"], [aria-label*="Theme"], button:has(svg)');
    if (themeBtn) {
      await themeBtn.click();
      await page.waitForTimeout(800);
    } else {
      // Try clicking the moon/sun icon in top-right
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await btn.textContent();
        if (text === '' || text?.includes('☀') || text?.includes('🌙')) {
          const box = await btn.boundingBox();
          if (box && box.x > 1000) { // Top-right area
            await btn.click();
            await page.waitForTimeout(800);
            break;
          }
        }
      }
    }
    await page.screenshot({
      path: path.join(OUT, 'today-dark.png'),
      fullPage: false,
    });

    // Dark mode Board
    try {
      await page.click('text=Board', { timeout: 3000 });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(OUT, 'board-dark.png'),
        fullPage: false,
      });
    } catch {}

    // Dark mode Notes
    try {
      await page.click('text=Notes', { timeout: 3000 });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(OUT, 'notes-dark.png'),
        fullPage: false,
      });
    } catch {}
  } catch (e) {
    console.log('  Dark mode toggle not found:', e.message);
  }

  // 7. About page
  console.log('Capturing About page...');
  try {
    await page.click('text=About', { timeout: 5000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(OUT, 'about.png'),
      fullPage: false,
    });
  } catch (e) {
    console.log('  About page not found');
  }

  // 8. Mobile viewport
  console.log('Capturing Mobile view...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  // Dismiss tutorial on mobile too
  try {
    const skipBtn = await page.$('text=Skip tutorial');
    if (skipBtn) { await skipBtn.click(); await page.waitForTimeout(1000); }
    else { await page.keyboard.press('Escape'); await page.waitForTimeout(500); }
  } catch {}
  await page.screenshot({
    path: path.join(OUT, 'mobile-today.png'),
    fullPage: false,
  });

  await browser.close();
  console.log('\nDone! Screenshots saved to public/images/koji/');
}

capture().catch(console.error);
