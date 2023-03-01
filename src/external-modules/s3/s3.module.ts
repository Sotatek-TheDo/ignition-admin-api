import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';

import { S3Service } from './services/s3.service';

@Module({
  imports: [SharedModule],
  exports: [S3Service],
  providers: [S3Service],
})
export class S3Module {}
