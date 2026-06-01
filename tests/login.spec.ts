/**
 * tests/login.spec.ts
 
 */
import { test, expect } from '../fixtures/pages.fixture';
import { LoginPage }  from '../pages/LoginPage';
import { validUser,invalidUsers } from '../test-data/login.data';



// ════════════════════════════════════════════════════════════════════
// 2. POSITIVE TEST — SUCCESSFUL LOGIN
// ════════════════════════════════════════════════════════════════════
test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });
  test("TC01 - Login fails with invalid password", async ({ page }) => {
    await loginPage.login(invalidUsers.wrongPassword);
    // Page should still show the login area or show an error
    await expect(page.getByRole('link', { name: 'User login' })).toBeVisible();
  });
 test("TC02 - Successful login with valid credentials", async ({ page }) => {
    await loginPage.login(validUser);

    // After login, "User login" link should disappear or user menu should appear
    await expect(page.getByRole('link', { name: 'User login' })).not.toBeVisible();
  });





 /* test("TC04 - Login fails with invalid email", async ({ page }) => {
    await loginPage.login({
      email: "invalid@notexist.com",
      password: process.env.VALID_PASSWORD!,
    });

    await expect(page.getByRole('link', { name: 'User login' })).toBeVisible();
  });

  test("TC05 - Login fails with empty email", async ({ page }) => {
    await loginPage.openLoginDropdown();
    await loginPage.fillPassword(process.env.VALID_PASSWORD!);
    await loginPage.clickLogin();

    // Email field should still be visible (form not submitted)
    await expect(loginPage.emailField).toBeVisible();
  });

  test("TC06 - Login fails with empty password", async ({ page }) => {
    await loginPage.openLoginDropdown();
    await loginPage.fillEmail(process.env.VALID_EMAIL!);
    await loginPage.clickLogin();

    await expect(loginPage.passwordField).toBeVisible();
  });

  test("TC07 - Login dropdown opens and closes", async ({ page }) => {
    // Open
    await loginPage.openLoginDropdown();
    await expect(loginPage.emailField).toBeVisible();

    // Click elsewhere to close
    await page.locator('body').click({ position: { x: 400, y: 400 } });
    await expect(loginPage.emailField).not.toBeVisible({ timeout: 5_000 });
  });*/
});