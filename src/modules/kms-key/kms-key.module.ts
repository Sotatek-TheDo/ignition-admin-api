import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';

import { KmsCmkModule } from '../kms-cmk/kms-cmk.module';
import { KmsKeyRepository } from './repositories/kms-key.repository';
import { KmsDataKeyService } from './services/kms-key.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([KmsKeyRepository]),
    KmsCmkModule,
  ],
  exports: [KmsDataKeyService],
  providers: [KmsDataKeyService],
})
export class KmsDataKeyModule {}
