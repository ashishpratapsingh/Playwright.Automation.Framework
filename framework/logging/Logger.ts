import { test } from '@playwright/test';

export class Logger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    const workerId = process.env.TEST_WORKER_INDEX ?? '0';
    return `[${timestamp}] [Worker ${workerId}] [${level}] ${message}`;
  }

  public static info(message: string): void {
    const formatted = this.formatMessage('INFO', message);
    console.log(formatted);
    test.info().annotations.push({ type: 'info', description: message });
  }

  public static warn(message: string): void {
    const formatted = this.formatMessage('WARN', message);
    console.warn(formatted);
    test.info().annotations.push({ type: 'warning', description: message });
  }

  public static error(message: string): void {
    const formatted = this.formatMessage('ERROR', message);
    console.error(formatted);
  }
}