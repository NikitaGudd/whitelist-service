/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class WhitelistService implements OnModuleInit {
  private filePath = path.resolve(process.cwd(), 'whitelist.json');
  private isWhitelisted = false;

  async onModuleInit() {
    await this.loadStatus();
  }

  private async loadStatus() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(data);
      this.isWhitelisted = !!parsed.enabled;
    } catch (error) {
      this.isWhitelisted = false;
      console.error(error);
      await this.saveStatus();
    }
  }

  private async saveStatus() {
    const data = JSON.stringify({ enabled: this.isWhitelisted }, null, 2);
    await fs.writeFile(this.filePath, data, 'utf-8');
  }

  getStatus(): boolean {
    return this.isWhitelisted;
  }

  async setStatus(status: boolean) {
    this.isWhitelisted = status;
    await this.saveStatus();
  }
}
