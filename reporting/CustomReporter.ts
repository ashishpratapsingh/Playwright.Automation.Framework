import { Reporter, FullConfig, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

export default class CustomReporter implements Reporter {
  private startTimestamp: string = "";
  private endTimestamp: string = "";
  private logFilePath: string = "";
  private logStream!: fs.WriteStream;

  onBegin(config: FullConfig) {      
    this.startTimestamp = new Date().toISOString();
    const logDir = config.metadata?.appConfig?.reporter?.logDir || './reports/logs';
    this.logFilePath = path.resolve(process.cwd(), `${logDir}/execution-${this.startTimestamp.replace(/[:.]/g, '-')}.log`);  
    
    const dir = path.dirname(this.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.logStream = fs.createWriteStream(this.logFilePath, { flags: 'a', encoding: 'utf-8' });
    this.logStream.write(`=== Test Suite Execution Started: ${this.startTimestamp} ===\n\n`);
  }

  onStdOut(chunk: string | Buffer) {
    if (this.logStream) {
      this.logStream.write(chunk.toString());
    }
  }

  onStdErr(chunk: string | Buffer) {
    if (this.logStream) {
      this.logStream.write(`[STDERR] ${chunk.toString()}`);
    }
  }

  onEnd(result: FullResult) {
    this.endTimestamp = new Date().toISOString();
    if (this.logStream) {
      this.logStream.write(`\n=== Test Suite Execution Finished: ${this.endTimestamp} with Status: ${result.status} ===\n`);
      this.logStream.end();
    }
  }
}