import { test as baseTest } from '@playwright/test';
import { PageManager } from '../framework/core/PageManager';
import { Logger } from '../framework/logging/Logger';

type FrameworkFixtures = {
  pages: PageManager;
};

export const test = baseTest.extend<FrameworkFixtures>({
  pages: async ({ page }, use) => {
    Logger.info('Initializing LoginPage instance via PageFactory');
    
    // [Acquisition Phase]
    const pageManager = new PageManager(page);

    // Provide fixture to test execution
    await use(pageManager);

    Logger.info('Tearing down page resource');
    
    // [Release / Cleanup Phase - RAII]
    await page.close();
  },
});

export { expect } from '@playwright/test';