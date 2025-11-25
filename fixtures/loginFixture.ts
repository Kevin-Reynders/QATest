import { expect, Page } from '@playwright/test';
import { mainPage } from '../pageElements/mainPage';

export async function login(page: Page) {
    await page.goto('https://www.vtmgo.be/vtmgo');
    await page.click(mainPage.loginButton);
    await page.fill('input[name="username"]', 'reynderskev@gmail.com');
    await page.click(mainPage.submitButton);
    //Not getting further here without being blocked
    await page.fill('input[name="password"]', 'Testingskills!1');
    await page.click(mainPage.submitButton);
    await page.waitForResponse('https://login.vtmgo.be/ssosession'); //currently using this, but replacing this later to check if logged in properly
}