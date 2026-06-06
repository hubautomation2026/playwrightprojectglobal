import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage 
 *
 
 */
export class LoginPage {
  readonly page: Page;

  // ── Locators ────────────────────────────────────────────────────────────────

  readonly userLoginButton: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly logInAutomaticallyCheckbox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
   // Top-right "User login" link that opens the dropdown
    this.userLoginButton = page.getByRole('link', { name: 'User login' });

    // Inside the dropdown popup
    //this.emailField = page.getByLabel('Your e-mail');
     this.emailField    = page.locator('#email')
    this.passwordField = page.locator('input[type="password"]');
    this.logInAutomaticallyCheckbox = page.getByLabel('log in automatically');
    this.loginButton = page.getByRole('button', { name: 'Login' });

  }

  // ── Navigation ───────────────────────────────────────────────────────────────

  /** Navigate directly to the login page */
  async goto() {
    await this.page.goto('/online-store.html');
    await this.page.waitForLoadState('networkidle');
  }

  async openLoginDropdown() {
    await this.userLoginButton.click();
    // Wait for the email field to appear inside the dropdown
    await this.emailField.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async fillEmail(email: string) {
    await this.emailField.clear();
    await this.emailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordField.clear();
    await this.passwordField.fill(password);
  }

  async checkLogInAutomatically() {
    const isChecked = await this.logInAutomaticallyCheckbox.isChecked();
    if (!isChecked) {
      await this.logInAutomaticallyCheckbox.check();
    }
  }

  async clickLogin() {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async login(data: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) {
    await this.openLoginDropdown();
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);
    if (data.rememberMe) {
      await this.checkLogInAutomatically();
    }
    await this.clickLogin();
  }
}