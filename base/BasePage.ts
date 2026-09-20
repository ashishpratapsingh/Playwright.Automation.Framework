import { Page, Locator, test } from '@playwright/test';
import { Logger } from '../framework/logging/Logger';

export abstract class BasePage {
  constructor(protected page: Page) {}

  /**
   * Centralized safe action wrapper handling exceptions and failure contexts.
   */
  protected async executeAction<T>(actionName: string, actionFn: () => Promise<T>): Promise<T> {
    return await test.step(`Executing action: ${actionName}`, async () => {
      Logger.info(`Starting: ${actionName}`);
      try {
        const result = await actionFn();
        Logger.info(`Successfully completed: ${actionName}`);
        return result;
      } catch (error: any) {
        const errorMsg = `[Action Failed: ${actionName}] - ${error.message}`;
        Logger.error(errorMsg);
        // Capture context automatically on failure
        const screenshot = await this.page.screenshot({ fullPage: true }).catch(() => null);
        if (screenshot) {
          await test.info().attach('failure-screenshot', { body: screenshot, contentType: 'image/png' });
        }
        throw new Error(errorMsg);
      }
    });
  }

  protected async safeClick(locator: Locator, description: string): Promise<void> {
    await this.executeAction(`Click ${description}`, async () => {
      await locator.waitFor({ state: 'visible', timeout: 10000 });
      await locator.click();
    });
  }

  protected async safeFill(locator: Locator, text: string, description: string): Promise<void> {
    await this.executeAction(`Fill ${description}`, async () => {
      await locator.waitFor({ state: 'visible', timeout: 10000 });
      await locator.fill(text);
    });
  }
}