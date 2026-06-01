/**
 * fixtures/pages.fixture.ts
 *
 * Extends Playwright's base test with pre-instantiated Page Objects.
 * Import { test, expect } from this file instead of '@playwright/test'
 * to get automatic page object injection in every test.
 */
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

// Declare the custom fixture types
type PageFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

export const test = base.extend<PageFixtures>({
  /**
   * loginPage fixture:
   * - Navigates to the login page before each test
   * - Provides a ready-to-use LoginPage instance
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  /** Auto-navigates to register page before each test */
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
 
});

// Re-export expect so tests only need one import
export { expect } from '@playwright/test';