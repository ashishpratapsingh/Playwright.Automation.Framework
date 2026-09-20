import { defineConfig, devices } from '@playwright/test';
import { ConfigManager } from './framework/core/ConfigManager';
import { getReporterConfig } from './utils/Utilities';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const appConfig = ConfigManager.getInstance().getConfig();
const reporterConfig = getReporterConfig(appConfig);

export default defineConfig({
  metadata: { appConfig }, // it will be availbale through FullConfig
  testDir: appConfig.testDir,
  /* Run tests in files in parallel */
  fullyParallel: appConfig.fullyParallel, // Enables maximum process-level concurrency
  workers: process.env.CI ? '100%' : '50%',
  retries: appConfig.retries,
  timeout: appConfig.timeout,
  use: {
    headless: appConfig.use.headless,
    baseURL: appConfig.use.baseUrl,
    trace: appConfig.use.trace as any, // Auto-handles flaky test diagnostics
    screenshot: appConfig.use.screenshot as any,
    video: appConfig.use.video as any,
  },
  reporter: reporterConfig, // Dynamic pluggable reporting,
  projects: [
    {
      name: 'Desktop Web',
      use: { 
        ...devices[appConfig.projects.use.devices], 
        channel: appConfig.projects.use.channel, 
        viewport: appConfig.projects.use.viewport,
        deviceScaleFactor: undefined, // Fixes the conflict with null viewport
        launchOptions: {
          args: ['--start-maximized'], // Opens browser maximized
       },
      },
    },    
  ],
});