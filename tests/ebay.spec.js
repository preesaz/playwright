import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.ebay.com/');
  });

test('has title', async ({page}) => {
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/Electronics, Cars, Fashion, Collectibles & More | eBay/);
});


test('search for book', async ({ page }) => {
// page.waitForSelector('gh-cat');
// await page.selectOption('gh-cat', '267');
await page.locator('//input[@id="gh-ac"]').waitFor({ state: 'visible' });
await page.locator('//input[@id="gh-ac"]').fill('book');
await page.locator('//input[@value="Search"]').click;
});

test('click on first book in the list', async ({page}) => {
    const browser = await chromium.launch({ headless: false });
    await page.locator('//input[@id="gh-ac"]').waitFor({ state: 'visible' });
    await page.locator('//input[@id="gh-ac"]').fill('book');
    await page.locator('//input[@value="Search"]').click();
    await page.waitForLoadState();
    await page.locator('(//div[@id="srp-river-results"]/ul/li)[1]//img').click();
    // Open the parent page
    const context = await browser.newContext();
    const parentPage = await context.newPage();
    const page1Promise = parentPage.waitForEvent('page'); // Wait for a new tab to open
    await parentPage.waitForLoadState();

    // Validate the URL of the new tab
    expect(page.url()).includes('https://www.ebay.com/itm/');
    await expect(page).toHaveTitle(/The Book the Ultimate Guide Rebuilding Civilization Inspirational Science Books  | eBay/);
    await page.locator('//a/span/span[text()="Add to cart"]').click();
    console.log('Shopping cart after adding a product');

});

test.skip('shopping cart verification', async ({page}) => {
    await expect(page).toHaveTitle(/eBay shopping cart/);
    await page.locator('//a/i[@id="gh-cart-n"]').isVisible;
    console.log('Shopping cart before adding a product');
});