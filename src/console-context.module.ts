import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { SeedConsole } from './consoles/seed';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, ConsoleModule],
  providers: [SeedConsole],
  exports: [SeedConsole],
})
export class ConsoleContextModule {}
