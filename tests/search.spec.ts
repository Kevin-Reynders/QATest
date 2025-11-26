import { test, expect } from '@playwright/test';


import { searchPage } from '../pageElements/searchPage';
import { mainPage } from '../pageElements/mainPage';
import { acceptCookiesIfPresent } from '../fixtures/mainFixture';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.vtmgo.be/vtmgo');
    await acceptCookiesIfPresent(page);
    await page.waitForURL('https://www.vtmgo.be/vtmgo');
});

test('Search for Familie and verify', async ({ page }) => {
    await page.goto('https://www.vtmgo.be/vtmgo/zoeken');
    await page.click(searchPage.searchInput);  // Click on the search button to open the search input
    await page.fill(searchPage.searchInput, 'Familie'); // Enter a known program name
    await page.press(searchPage.searchInput, 'Enter'); // Submit the search
    await page.waitForTimeout(2000); // Wait for results to load
    const results = await page.locator(searchPage.individualItem).count();
    expect(results).toBeGreaterThan(0); // Expect at least one result
    await expect(page.locator(searchPage.individualItem).first()).toContainText('Familie'); // Verify the first result contains the program name
});

test('Search for a non-existent program and verify there are no results', async ({ page }) => {
    await page.click(mainPage.searchIcon);
    await page.click(searchPage.searchInput);  // Click on the search button to open the search input
    await page.fill(searchPage.searchInput, 'ThisIsNonsense'); // Enter a non-existent program name
    await page.press(searchPage.searchInput, 'Enter'); // Submit the search
    await page.waitForTimeout(2000); // Wait for results to load
    const noResultsMessage = page.locator(searchPage.noResultsMessage);
    await expect(noResultsMessage).toBeVisible(); // Verify that the no results message is displayed
    await expect(noResultsMessage).toHaveText('Er zijn geen resultaten voor deze zoekopdracht'); // Verify the message text
});

test('Search with empty searchbar should reload the page', async ({ page }) => {
    await page.goto('https://www.vtmgo.be/vtmgo/zoeken');
    await page.click(mainPage.searchIcon);
    await page.click(searchPage.searchInput);  // Click on the search button to open the search input
    await page.fill(searchPage.searchInput, ''); // Leave the search input empty
    await page.press(searchPage.searchInput, 'Enter'); // Submit the search
    await page.waitForTimeout(2000); // Wait for any potential results to load
    await expect(page).toHaveURL('https://www.vtmgo.be/vtmgo/zoeken'); // Verify that the URL is still the search page URL
});