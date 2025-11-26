import { test, expect } from '@playwright/test';
import { searchPage } from '../pageElements/searchPage';
import { mainPage } from '../pageElements/mainPage';
import { acceptCookiesIfPresent } from '../fixtures/mainFixture';
import { search } from '../fixtures/searchFixture';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.vtmgo.be/vtmgo');
    await acceptCookiesIfPresent(page);
    await page.waitForURL('https://www.vtmgo.be/vtmgo');
});

test('Search for Familie and verify', async ({ page }) => {
    await page.goto('https://www.vtmgo.be/vtmgo/zoeken');
    await search(page, 'Familie');
    var results = await page.locator(searchPage.individualItem).count();
    expect(results).toBeGreaterThan(0); // Expect at least one result
    await expect(page.locator(searchPage.individualItem).first()).toContainText('Familie'); // Verify the first result contains the program name
    await test.info().attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
    }); //Making a screenshot for proof and adding it to report
});

test('Search for a non-existent program and verify there are no results', async ({ page }) => {
    await page.click(mainPage.searchIcon); //Different way to open search
    await search(page, 'ThisIsNonsense');
    var noResultsMessage = page.locator(searchPage.noResultsMessage);
    await expect(noResultsMessage).toBeVisible(); // Verify that the no results message is displayed
    await expect(noResultsMessage).toHaveText('Er zijn geen resultaten voor deze zoekopdracht'); // Verify the message text
    await test.info().attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
    }); //Making a screenshot for proof and adding it to report
});

test('Search with empty searchbar should reload the page', async ({ page }) => {
    await page.goto('https://www.vtmgo.be/vtmgo/zoeken');
    await search(page, '');
    await expect(page).toHaveURL('https://www.vtmgo.be/vtmgo/zoeken'); // Verify that the URL is still the search page URL
    await expect(page.locator(searchPage.searchInput)).toBeEmpty();
    await test.info().attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
    }); //Making a screenshot for proof and adding it to report
});