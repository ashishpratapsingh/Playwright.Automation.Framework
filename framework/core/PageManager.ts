// framework/core/PageManager.ts
import { Page } from '@playwright/test';
import { PageFactory } from './PageFactory';
import { LoginPage } from '../../pages/web/LoginPage';
// ... import other 20+ pages

export class PageManager {
  private page: Page;
  private _loginPage?: LoginPage;

  constructor(page: Page) {
    this.page = page;
  }

  // Lazy getter: Only instantiates when accessed in a test
  get loginPage() {
    if (!this._loginPage) {
      this._loginPage = PageFactory.getLoginPage(this.page);
    }
    return this._loginPage;
  }

  // Add getters for remaining 20+ pages...
}