import puppeteer from 'puppeteer';

const BASE_URL = 'http://localhost:5173';

// Test configuration
const config = {
  headless: false,
  slowMo: 25,
  devtools: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

class NFTGalleryTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      passed: [],
      failed: [],
      warnings: []
    };
  }

  async init() {
    console.log('🚀 Initializing NFT Gallery Tester...\n');
    this.browser = await puppeteer.launch(config);
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1280, height: 800 });

    // Set up console and error listeners
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.results.warnings.push(`Console error: ${msg.text()}`);
      }
    });

    this.page.on('pageerror', error => {
      this.results.failed.push(`Page error: ${error.message}`);
    });
  }

  async testHomePage() {
    console.log('📋 Test: Homepage Loading and Structure');
    try {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Check page title
      const pageTitle = await this.page.evaluate(() => document.querySelector('h1')?.textContent);
      if (pageTitle === 'Startups') {
        console.log('  ✅ Homepage loaded with correct title');
        this.results.passed.push('Homepage title correct');
      } else {
        console.log(`  ❌ Unexpected title: ${pageTitle}`);
        this.results.failed.push('Homepage title incorrect');
      }

      // Check for NFT cards
      const nftCards = await this.page.evaluate(() => {
        const cards = document.querySelectorAll('a[href^="/nft/"]');
        return {
          count: cards.length,
          firstCardText: cards[0]?.textContent?.substring(0, 50)
        };
      });

      if (nftCards.count > 0) {
        console.log(`  ✅ Found ${nftCards.count} NFT cards`);
        this.results.passed.push(`${nftCards.count} NFT cards displayed`);
      } else {
        console.log('  ❌ No NFT cards found');
        this.results.failed.push('No NFT cards found');
      }

      // Check search functionality
      const searchInput = await this.page.$('input[placeholder*="Search"]');
      if (searchInput) {
        console.log('  ✅ Search input found');
        this.results.passed.push('Search functionality available');
      } else {
        console.log('  ❌ Search input not found');
        this.results.failed.push('Search input missing');
      }

      // Check filter button
      const filterButton = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(btn => btn.textContent?.includes('Filter'));
      });

      if (filterButton) {
        console.log('  ✅ Filter button found');
        this.results.passed.push('Filter button available');
      } else {
        console.log('  ⚠️  Filter button not found');
        this.results.warnings.push('Filter button missing');
      }

    } catch (error) {
      console.log(`  ❌ Homepage test failed: ${error.message}`);
      this.results.failed.push(`Homepage test: ${error.message}`);
    }
  }

  async testSearch() {
    console.log('\n🔍 Test: Search Functionality');
    try {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle2' });
      
      // Get initial card count
      const initialCount = await this.page.evaluate(() => 
        document.querySelectorAll('a[href^="/nft/"]').length
      );

      // Type in search
      await this.page.type('input[placeholder*="Search"]', 'Credit');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for debounce

      // Check filtered results
      const filteredCount = await this.page.evaluate(() => 
        document.querySelectorAll('a[href^="/nft/"]').length
      );

      if (filteredCount < initialCount) {
        console.log(`  ✅ Search filtering works (${initialCount} → ${filteredCount} cards)`);
        this.results.passed.push('Search filtering functional');
      } else {
        console.log(`  ⚠️  Search may not be filtering (${initialCount} → ${filteredCount} cards)`);
        this.results.warnings.push('Search filtering unclear');
      }

      // Clear search
      await this.page.evaluate(() => {
        const input = document.querySelector('input[placeholder*="Search"]');
        if (input) {
          input.value = '';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
      await this.page.waitForTimeout(1000);

    } catch (error) {
      console.log(`  ❌ Search test failed: ${error.message}`);
      this.results.failed.push(`Search test: ${error.message}`);
    }
  }

  async testNFTCardInteraction() {
    console.log('\n🎴 Test: NFT Card Interactions');
    try {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

      // Click on first NFT card
      const firstCard = await this.page.$('a[href^="/nft/"]');
      if (firstCard) {
        const href = await this.page.evaluate(el => el.href, firstCard);
        await firstCard.click();
        await this.page.waitForNavigation({ waitUntil: 'networkidle2' });

        const currentURL = this.page.url();
        if (currentURL.includes('/nft/')) {
          console.log(`  ✅ NFT detail page navigation works`);
          this.results.passed.push('NFT detail navigation functional');
        } else {
          console.log(`  ❌ NFT navigation failed (URL: ${currentURL})`);
          this.results.failed.push('NFT detail navigation broken');
        }

        // Go back
        await this.page.goBack({ waitUntil: 'networkidle2' });
      } else {
        console.log('  ⚠️  No NFT cards to test interaction');
        this.results.warnings.push('No NFT cards for interaction test');
      }

    } catch (error) {
      console.log(`  ❌ NFT interaction test failed: ${error.message}`);
      this.results.failed.push(`NFT interaction test: ${error.message}`);
    }
  }

  async testInvestorsPage() {
    console.log('\n💼 Test: Investors Page');
    try {
      await this.page.goto(`${BASE_URL}/investors`, { waitUntil: 'networkidle2' });

      const pageTitle = await this.page.evaluate(() => document.querySelector('h1')?.textContent);
      if (pageTitle === 'Investors') {
        console.log('  ✅ Investors page loaded correctly');
        this.results.passed.push('Investors page functional');

        // Check for investor cards
        const investorCards = await this.page.evaluate(() => {
          const cards = document.querySelectorAll('a[href^="/investor/"]');
          return cards.length;
        });

        if (investorCards > 0) {
          console.log(`  ✅ Found ${investorCards} investor cards`);
          this.results.passed.push('Investor cards displayed');
        } else {
          console.log('  ⚠️  No investor cards found');
          this.results.warnings.push('No investor cards displayed');
        }
      } else {
        console.log(`  ❌ Unexpected investors page title: ${pageTitle}`);
        this.results.failed.push('Investors page title incorrect');
      }

    } catch (error) {
      console.log(`  ❌ Investors page test failed: ${error.message}`);
      this.results.failed.push(`Investors page test: ${error.message}`);
    }
  }

  async testVotingPage() {
    console.log('\n🗳️  Test: Voting/Governance Page');
    try {
      await this.page.goto(`${BASE_URL}/vote`, { waitUntil: 'networkidle2' });

      const pageContent = await this.page.evaluate(() => ({
        title: document.querySelector('h1')?.textContent,
        hasProposals: document.body.textContent?.includes('Proposals'),
        hasSnapshotButton: !!document.querySelector('a[href*="snapshot"]') || Array.from(document.querySelectorAll('button')).some(btn => btn.textContent?.includes('Snapshot'))
      }));

      if (pageContent.title?.includes('DAO') || pageContent.title?.includes('Governance')) {
        console.log('  ✅ Voting page loaded with governance content');
        this.results.passed.push('Voting page functional');
      } else {
        console.log('  ⚠️  Voting page loaded but title unclear');
        this.results.warnings.push('Voting page title unclear');
      }

      if (pageContent.hasProposals) {
        console.log('  ✅ Proposals section found');
        this.results.passed.push('Proposals section present');
      }

    } catch (error) {
      console.log(`  ❌ Voting page test failed: ${error.message}`);
      this.results.failed.push(`Voting page test: ${error.message}`);
    }
  }

  async testWalletConnection() {
    console.log('\n🔐 Test: Web3/Wallet Integration');
    try {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

      const walletButton = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const walletBtn = buttons.find(btn => {
          const text = btn.textContent?.toLowerCase() || '';
          return text.includes('sign') || text.includes('connect') || text.includes('wallet');
        });
        return walletBtn ? walletBtn.textContent : null;
      });

      if (walletButton) {
        console.log(`  ✅ Wallet connection button found: "${walletButton}"`);
        this.results.passed.push('Wallet integration present');

        // Test clicking the button (but don't actually connect)
        const buttonElement = await this.page.evaluateHandle(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          return buttons.find(btn => {
            const text = btn.textContent?.toLowerCase() || '';
            return text.includes('sign') || text.includes('connect');
          });
        });

        if (buttonElement) {
          await buttonElement.click();
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Check if a modal or new elements appeared
          const modalAppeared = await this.page.evaluate(() => {
            return document.querySelector('[role="dialog"], .modal, [class*="modal"]') !== null;
          });

          if (modalAppeared) {
            console.log('  ✅ Wallet connection modal appears on click');
            this.results.passed.push('Wallet modal functional');
            
            // Close modal if possible
            await this.page.keyboard.press('Escape');
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      } else {
        console.log('  ⚠️  No wallet connection button found');
        this.results.warnings.push('Wallet button not found');
      }

    } catch (error) {
      console.log(`  ❌ Wallet test failed: ${error.message}`);
      this.results.failed.push(`Wallet test: ${error.message}`);
    }
  }

  async testResponsiveness() {
    console.log('\n📱 Test: Responsive Design');
    try {
      // Test mobile viewport
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

      const mobileLayout = await this.page.evaluate(() => {
        const nav = document.querySelector('nav, header');
        const cards = document.querySelectorAll('a[href^="/nft/"]');
        return {
          hasNav: !!nav,
          cardsVisible: cards.length > 0,
          overflow: document.body.scrollWidth > window.innerWidth
        };
      });

      if (!mobileLayout.overflow) {
        console.log('  ✅ Mobile layout without horizontal overflow');
        this.results.passed.push('Mobile responsive layout');
      } else {
        console.log('  ⚠️  Mobile layout has horizontal overflow');
        this.results.warnings.push('Mobile layout overflow issue');
      }

      // Test tablet viewport
      await this.page.setViewport({ width: 768, height: 1024 });
      await this.page.reload({ waitUntil: 'networkidle2' });

      const tabletLayout = await this.page.evaluate(() => {
        return document.body.scrollWidth <= window.innerWidth;
      });

      if (tabletLayout) {
        console.log('  ✅ Tablet layout without horizontal overflow');
        this.results.passed.push('Tablet responsive layout');
      } else {
        console.log('  ⚠️  Tablet layout has horizontal overflow');
        this.results.warnings.push('Tablet layout overflow issue');
      }

      // Reset to desktop
      await this.page.setViewport({ width: 1280, height: 800 });

    } catch (error) {
      console.log(`  ❌ Responsiveness test failed: ${error.message}`);
      this.results.failed.push(`Responsiveness test: ${error.message}`);
    }
  }

  async testPerformance() {
    console.log('\n⚡ Test: Performance Metrics');
    try {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

      const metrics = await this.page.metrics();
      const timing = await this.page.evaluate(() => {
        const perf = window.performance.timing;
        return {
          domReady: perf.domContentLoadedEventEnd - perf.navigationStart,
          pageLoad: perf.loadEventEnd - perf.navigationStart,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
        };
      });

      console.log('  📊 Performance Metrics:');
      console.log(`     - DOM Ready: ${timing.domReady}ms`);
      console.log(`     - Page Load: ${timing.pageLoad}ms`);
      console.log(`     - First Paint: ${timing.firstPaint.toFixed(2)}ms`);
      console.log(`     - JS Heap: ${(metrics.JSHeapUsedSize / 1048576).toFixed(2)} MB`);
      console.log(`     - DOM Nodes: ${metrics.Nodes}`);

      if (timing.pageLoad < 3000) {
        console.log('  ✅ Good page load performance');
        this.results.passed.push('Good load performance');
      } else {
        console.log('  ⚠️  Page load could be optimized');
        this.results.warnings.push('Page load > 3s');
      }

    } catch (error) {
      console.log(`  ❌ Performance test failed: ${error.message}`);
      this.results.failed.push(`Performance test: ${error.message}`);
    }
  }

  async runAllTests() {
    await this.init();

    try {
      await this.testHomePage();
      await this.testSearch();
      await this.testNFTCardInteraction();
      await this.testInvestorsPage();
      await this.testVotingPage();
      await this.testWalletConnection();
      await this.testResponsiveness();
      await this.testPerformance();
    } catch (error) {
      console.error('Fatal test error:', error);
    }

    await this.generateReport();
    await this.cleanup();
  }

  async generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPREHENSIVE TEST REPORT');
    console.log('='.repeat(60));

    const total = this.results.passed.length + this.results.failed.length;
    const passRate = ((this.results.passed.length / total) * 100).toFixed(1);

    console.log(`\n✅ Passed: ${this.results.passed.length} tests`);
    this.results.passed.forEach(test => console.log(`   • ${test}`));

    if (this.results.failed.length > 0) {
      console.log(`\n❌ Failed: ${this.results.failed.length} tests`);
      this.results.failed.forEach(test => console.log(`   • ${test}`));
    }

    if (this.results.warnings.length > 0) {
      console.log(`\n⚠️  Warnings: ${this.results.warnings.length}`);
      this.results.warnings.forEach(warning => console.log(`   • ${warning}`));
    }

    console.log(`\n📈 Pass Rate: ${passRate}%`);
    
    if (passRate >= 80) {
      console.log('🎉 Your frontend is working well!');
    } else if (passRate >= 60) {
      console.log('⚠️  Some issues need attention');
    } else {
      console.log('🔧 Significant debugging needed');
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run the tests
const tester = new NFTGalleryTester();
tester.runAllTests().then(() => {
  console.log('\n✨ Testing complete!');
  process.exit(0);
}).catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
