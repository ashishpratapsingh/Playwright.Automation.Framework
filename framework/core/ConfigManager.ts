import * as fs from 'fs';
import * as path from 'path';

interface use{
  headless: boolean;
  baseUrl: string;
  trace: string;
  screenshot: string;
  video: string;
}

interface reporter{
  reportType: string;
  openFlag: string;
  dynamicReporter: string;
  logDir: string;
}

interface viewport {
  width: number;
  height: number;
}

interface useProjects{
  devices: string;
  channel: string;
  viewport: viewport | null;
}

interface projects{
  use: useProjects;
}

export interface AppConfig {
  testDir: string;
  fullyParallel: boolean;
  retries: number;
  timeout: number;
  use: use;
  reporter: reporter;
  projects: projects;
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig;

  private constructor() {
    const env = process.env.TEST_ENV || 'dev';
    const configPath = path.resolve(__dirname, `../../config/env.${env}.json`);
    const rawData = fs.readFileSync(configPath, 'utf-8');
    this.config = JSON.parse(rawData);
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public getConfig(): AppConfig {
    return this.config;
  }
}