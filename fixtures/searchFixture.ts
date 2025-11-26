import { Page } from '@playwright/test';
import { searchPage } from '../pageElements/searchPage';

export async function search(page: Page, string: string) {
    await page.click(searchPage.searchInput);  // Click on the search button to open the search input
    await page.fill(searchPage.searchInput, string); // Enter a known program name
    await page.press(searchPage.searchInput, 'Enter'); // Submit the search
    await page.waitForTimeout(2000); // Wait for results to load
}