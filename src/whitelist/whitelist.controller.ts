import { Controller, Get, Post, Body } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';

@Controller('whitelist')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  @Get()
  getWhitelistStatus() {
    return { enabled: this.whitelistService.getStatus() };
  }

  @Post()
  async setWhitelistStatus(@Body('enabled') enabled: boolean) {
    await this.whitelistService.setStatus(enabled);
    return { success: true, enabled };
  }
}
