import { ReporterDescription } from '@playwright/test';
import { AppConfig } from '../framework/core/ConfigManager';

export function getReporterConfig(config: AppConfig): ReporterDescription[] {
  const reporterType = config.reporter.reportType;

  // Base reporters that ALWAYS run (Terminal output + Your text log generator)
  const reporters: ReporterDescription[] = [
    ['list'],
    [config.reporter.dynamicReporter]
  ];

  // Dynamically attach the chosen visual dashboard vendor
  if (reporterType === 'monocart') {
    reporters.push([
      'monocart-reporter',
      {
        name: 'Playwright Automation Execution Report',
        outputFile: './reports/monocart/index.html',
      }
    ]);
  } else {
    reporters.push([
      'html',
      { outputFolder: 'playwright-report', open: 'never' }
    ]);
  }

  return reporters;
}