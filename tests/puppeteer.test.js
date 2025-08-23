import puppeteer from 'puppeteer';

const BASE_URL = 'http://localhost:5173';

// Test configuration
const config = {
  headless: false, // Set to false to see the browser
  slowMo: 50, // Slow down actions by 50ms for debugging
  devtools: true, // Open devtools automatically
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

// Helper function to wait and log
const waitAndLog = async (page, selector, description) => {
  try {
    await page.waitForSelector(selector, { timeout: 10000 });
    console.log(`✅ ${description}: Found ${selector}`);
    return true;
  } catch (error) {
    console.error(`❌ ${description}: Could not find ${selector}`);
    console.error(`   Error: ${error.message}`);
    return false;
  }
};

// Main test suite
async function runTests() {
  let browser;
  const testResults = {
    passed: [],
    failed: [],
    errors: []
  };

  try {
    console.log('🚀 Starting Puppeteer tests...\n');
    browser = await puppeteer.launch(config);
    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });

    // Enable console logging from the page
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('📝 Console Error:', msg.text());
        testResults.errors.push(msg.text());
      }
    });

    // Listen for page errors
    page.on('pageerror', error => {
      console.error('💥 Page Error:', error.message);
      testResults.errors.push(error.message);
    });

    // Test 1: Check if app loads
    console.log('Test 1: Loading application...');
    try {
      const response = await page.goto(BASE_URL, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      if (response.ok()) {
        console.log('✅ App loaded successfully');
        testResults.passed.push('App loads');
      } else {
        console.log(`❌ App failed to load: HTTP ${response.status()}`);
        testResults.failed.push(`App load failed: HTTP ${response.status()}`);
      }
    } catch (error) {
      console.error('❌ Failed to load app:', error.message);
      testResults.failed.push(`App load error: ${error.message}`);
    }

    // Test 2: Check for root element
    console.log('\nTest 2: Checking root element...');
    const hasRoot = await waitAndLog(page, '#root', 'Root element');
    if (hasRoot) {
      testResults.passed.push('Root element exists');
    } else {
      testResults.failed.push('Root element missing');
    }

    // Test 3: Check navigation/header
    console.log('\nTest 3: Checking navigation...');
    const hasNav = await waitAndLog(page, 'nav, header, [role="navigation"]', 'Navigation');
    if (hasNav) {
      testResults.passed.push('Navigation exists');
      
      // Check for navigation links
      const navLinks = await page.evaluate(() => {
        const links = document.querySelectorAll('a, button');
        return Array.from(links).map(link => ({
          text: link.textContent?.trim(),
          href: link.href || 'N/A',
          type: link.tagName
        }));
      });
      
      console.log('   Found navigation items:', navLinks.length);
      navLinks.forEach(link => {
        if (link.text) {
          console.log(`   - ${link.text} (${link.type})`);
        }
      });
    } else {
      testResults.failed.push('Navigation missing');
    }

    // Test 4: Check main content area
    console.log('\nTest 4: Checking main content...');
    const hasContent = await waitAndLog(page, 'main, [role="main"], .container, .content', 'Main content area');
    if (hasContent) {
      testResults.passed.push('Main content area exists');
    } else {
      testResults.failed.push('Main content area missing');
    }

    // Test 5: Check for Gallery component via data-testid
    console.log('\nTest 5: Checking Gallery component...');
    const galleryExists = await waitAndLog(page, '[data-testid="gallery"]', 'Gallery container');
    if (galleryExists) {
      const counts = await page.evaluate(() => {
        const gallery = document.querySelector('[data-testid="gallery"]');
        const cards = gallery ? gallery.querySelectorAll('[data-testid="gallery-card"]').length : 0;
        return { childCount: gallery ? gallery.children.length : 0, cardCount: cards };
      });
      console.log(`   Gallery children: ${counts.childCount}, cards: ${counts.cardCount}`);
      testResults.passed.push('Gallery component exists');
    } else {
      testResults.failed.push('Gallery component missing');
    }

    // Test 5b: Check search input exists
    const hasSearch = await waitAndLog(page, '[data-testid="gallery-search"]', 'Gallery search input');
    if (hasSearch) {
      testResults.passed.push('Gallery search input exists');
    } else {
      testResults.failed.push('Gallery search input missing');
    }

    // Test 6: Check for Web3/Wallet connection
    console.log('\nTest 6: Checking Web3/Wallet integration...');
    const hasWalletButton = await page.evaluate(() => {
      const walletSelectors = [
        'button:contains("Connect")',
        '[class*="wallet"]',
        '[class*="connect"]',
        'button'
      ];
      
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        const text = button.textContent?.toLowerCase() || '';
        if (text.includes('connect') || text.includes('wallet') || text.includes('sign')) {
          return { found: true, text: button.textContent };
        }
      }
      return { found: false };
    });

    if (hasWalletButton.found) {
      console.log(`✅ Wallet button found: "${hasWalletButton.text}"`);
      testResults.passed.push('Wallet connection button exists');
    } else {
      console.log('⚠️  No wallet connection button found');
      testResults.failed.push('Wallet connection button missing');
    }

    // Test 7: Check routing
    console.log('\nTest 7: Testing routing...');
    const routes = ['/investors', '/connectors', '/vote'];
    
    for (const route of routes) {
      console.log(`   Testing route: ${route}`);
      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2', timeout: 10000 });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const hasContent = await page.evaluate(() => {
          const root = document.querySelector('#root');
          return root && root.children.length > 0;
        });
        
        if (hasContent) {
          console.log(`   ✅ Route ${route} loads correctly`);
          testResults.passed.push(`Route ${route} works`);
        } else {
          console.log(`   ❌ Route ${route} has no content`);
          testResults.failed.push(`Route ${route} empty`);
        }
      } catch (error) {
        console.log(`   ❌ Route ${route} failed: ${error.message}`);
        testResults.failed.push(`Route ${route} error`);
      }
    }

    // Test 8: Performance check
    console.log('\nTest 8: Performance metrics...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    const metrics = await page.metrics();
    console.log('   Performance metrics:');
    console.log(`   - JS Heap Size: ${(metrics.JSHeapUsedSize / 1048576).toFixed(2)} MB`);
    console.log(`   - DOM Nodes: ${metrics.Nodes}`);
    console.log(`   - Event Listeners: ${metrics.JSEventListeners}`);

    // Get page load timing
    const timing = await page.evaluate(() => {
      const perf = window.performance.timing;
      return {
        domReady: perf.domContentLoadedEventEnd - perf.navigationStart,
        pageLoad: perf.loadEventEnd - perf.navigationStart
      };
    });
    console.log(`   - DOM Ready: ${timing.domReady}ms`);
    console.log(`   - Page Load: ${timing.pageLoad}ms`);

    // Take screenshots for debugging
    console.log('\nTaking screenshots for debugging...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: true });
    console.log('   📸 Screenshot saved: homepage.png');

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${testResults.passed.length} tests`);
    testResults.passed.forEach(test => console.log(`   - ${test}`));
    
    if (testResults.failed.length > 0) {
      console.log(`\n❌ Failed: ${testResults.failed.length} tests`);
      testResults.failed.forEach(test => console.log(`   - ${test}`));
    }
    
    if (testResults.errors.length > 0) {
      console.log(`\n💥 Console Errors: ${testResults.errors.length}`);
      testResults.errors.slice(0, 5).forEach(error => console.log(`   - ${error.substring(0, 100)}...`));
    }

  } catch (error) {
    console.error('Fatal test error:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the tests
runTests().then(() => {
  console.log('\n✨ Testing complete!');
  process.exit(0);
}).catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
