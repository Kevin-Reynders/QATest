import {expect, Page } from '@playwright/test';
import { mainPage } from '../pageElements/mainPage';

export async function acceptCookiesIfPresent(page: Page) {
    try {
        await page.click(mainPage.cookiesAcceptButton, { timeout: 3000 });
    } catch (e) {
        // If cookies are not found, continue
    }
}