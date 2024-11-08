// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

// test('Click writing test link', async ({ page }) => {

  //  const element = page.locator('a :text("Writing tests")');
  // element.click();

  await page.getByRole('link', { name: 'Writing tests', exact: true }).click();

  // await page.locator('a :text("Writing tests")').click();
   //await page.getByText('link', { name: 'Writing tests'}).click();

  await expect(page.getByRole('heading', { name: 'Writing tests'})).toBeVisible();
});
