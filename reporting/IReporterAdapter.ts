import { FullConfig, FullResult, Suite, TestCase, TestResult } from '@playwright/test/reporter';

export interface IReporterAdapter {
  onBegin(config: FullConfig, suite: Suite): void;
  onTestBegin(test: TestCase): void;
  onTestEnd(test: TestCase, result: TestResult): void;
  onEnd(result: FullResult): Promise<void> | void;
}