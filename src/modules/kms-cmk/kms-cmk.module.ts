import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';

import { KmsCmkService } from './services/kms-cmk.service';

@Module({
  imports: [SharedModule],
  providers: [KmsCmkService],
  exports: [KmsCmkService],
})
export class KmsCmkModule {}
