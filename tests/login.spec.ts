import { test, expect } from '../fixtures/custom-fixtures';
import { DataRepository } from '../framework/core/DataRepository';

test.describe('Authentication Feature', () => {  
  test('User should be able to log in successfully', async ({ page, pages }) => {
    const validUser = DataRepository.getUser('validUser');

    await page.goto('/login');
    await pages.loginPage.login(validUser.email, validUser.password);
    await pages.loginPage.verifyLoginSuccess();
  });
});