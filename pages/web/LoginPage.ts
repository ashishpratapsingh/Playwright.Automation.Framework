import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../base/BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input.button-1.login-button');
  }

  public async login(user: string, pass: string): Promise<void> {
    await this.safeFill(this.emailInput, user, 'Username Field');
    await this.safeFill(this.passwordInput, pass, 'Password Field');
    await this.safeClick(this.loginButton, 'Submit Login');
  }

  public async verifyLoginSuccess(): Promise<void> {
    await this.executeAction('Verify Login Success', async () => {
      await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/');
    });
  }
}