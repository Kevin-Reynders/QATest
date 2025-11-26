import { expect, Page } from '@playwright/test';
import { mainPage } from '../pageElements/mainPage';

export async function acceptCookiesIfPresent(page: Page) {
    try {
        await page.waitForSelector(mainPage.cookiesBanner, { timeout: 2000 }).catch(() => null);
        await page.click(mainPage.cookiesAcceptButton, { timeout: 2000 });
    } catch (e) {
        // If cookies are not found, continue
    }
}