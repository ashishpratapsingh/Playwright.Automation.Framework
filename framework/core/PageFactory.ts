import { Page } from '@playwright/test';
import {LoginPage} from '../../pages/web/LoginPage';

export class PageFactory {
  public static getLoginPage(page: Page): LoginPage{    
    return new LoginPage(page);
  }
}