import { expect, Page } from '@playwright/test';
import { mainPage } from '../pageElements/mainPage';
import { loginPage } from '../pageElements/loginPage';

export async function login(page: Page) {
    await page.click(mainPage.loginButton);
    await page.fill('input[name="username"]', 'reynderskev@gmail.com');
    await page.click(loginPage.submitButton);
    //Not getting further here without being blocked
    await page.fill('input[name="password"]', 'Testingskills!1');
    await page.click(loginPage.submitButton);
    await page.waitForResponse('https://login.vtmgo.be/ssosession'); //Contains a sessionid 0 when logged out, a unique id when logged in
    await expect(page.locator(mainPage.userDropdown)).toBeVisible(); //To check if you're actually logged in
}

export async function logout(page: Page) {
    await page.click(mainPage.userDropdown);
    await page.click(mainPage.logoutButton);
    await page.click(mainPage.logoutConfirmButton);
    await expect(page.locator(mainPage.loginButton)).toBeVisible(); //To check if you're actually not logged in anymore
}