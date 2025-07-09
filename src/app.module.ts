import { Module } from '@nestjs/common';
import { WhitelistModule } from './whitelist/whitelist.module';

@Module({
  imports: [WhitelistModule],
})
export class AppModule {}
