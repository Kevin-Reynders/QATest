import { Page } from '@playwright/test';
import { mainPage } from '../pageElements/mainPage';

export async function acceptCookiesIfPresent(page: Page) {
    try {
        await page.waitForSelector(mainPage.cookiesBanner, { timeout: 2000 }).catch(() => null);
        await page.click(mainPage.cookiesAcceptButton, { timeout: 2000 });
    } catch (e) {
        // If cookies are not found, continue
    }

    /*To accept the cookies, I could also use await page.getByRole('button', { name: 'Akkoord' }).click();
    However, this is less reusable as it is language dependent. (Complete site is in Dutch only, but still)
    Therefore, I use the very specific selectors to be independent from the language need.*/
}