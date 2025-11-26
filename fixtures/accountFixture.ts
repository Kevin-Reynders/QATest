import { expect, Page } from '@playwright/test';
import { mainPage } from '../pageElements/mainPage';
import { loginPage } from '../pageElements/loginPage';
import { loginCredentials } from '../accounts/credentials';

export async function login(page: Page) {
    await page.click(mainPage.loginButton); //Click login button
    await page.fill('input[name="username"]', loginCredentials.username); //Fill in email
    await page.click(loginPage.submitButton); //Click Ga verder ->
    //Not getting further here without being blocked
    await page.fill('input[name="password"]', loginCredentials.password); //Fill in password
    await page.click(loginPage.submitButton); //Click Log in ->
    await page.waitForResponse('https://login.vtmgo.be/ssosession'); //Contains a sessionid 0 when logged out, a unique id when logged in
    await expect(page.locator(mainPage.userDropdown)).toBeVisible(); //To check if you're actually logged in based on something that only shows when logged in
}

export async function logout(page: Page) {
    await page.click(mainPage.userDropdown);
    await page.click(mainPage.logoutButton);
    await page.click(mainPage.logoutConfirmButton);
    await expect(page.locator(mainPage.loginButton)).toBeVisible(); //To check if you're actually not logged in anymore
}