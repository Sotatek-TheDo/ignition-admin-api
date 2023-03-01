import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultTokenRepository } from 'src/modules/default-token/repositories/default-token.repository';
import { FileRepository } from 'src/modules/file/repositories/file.repository';
import { HotWalletRepository } from 'src/modules/hot-wallet/repositories/hot-wallet.repository';
import { KmsCmkRepository } from 'src/modules/kms-cmk/repositories/kms-cmk.repository';
import { KmsKeyRepository } from 'src/modules/kms-key/repositories/kms-key.repository';
import { NetworkRepository } from 'src/modules/network/repositories/network.repository';
import { NftRepository } from 'src/modules/nft/repositories/nft.repository';
import { NftMarketRepository } from 'src/modules/nft-market/repositories/nft-market.repository';
import { NftMarketLogRepository } from 'src/modules/nft-market-log/repositories/nft-market-log.repository';
import { NftOwnerRepository } from 'src/modules/nft-owner/repositories/nft-owner.repository';
import { TransactionRepository } from 'src/modules/transaction/repositories/transaction.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserBalanceRepository } from 'src/modules/user-balance/repositories/user-repository';
import { UserDeviceRepository } from 'src/modules/user-device/repositories/user-device.repository';
import { UserSecurityRepository } from 'src/modules/user-security/repositories/user-security.repository';
import { UserSettingRepository } from 'src/modules/user-setting/repositories/user-setting.repository';
import { UserWalletRepository } from 'src/modules/user-wallet/repositories/user-wallet.repository';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

initializeTransactionalContext(); // Initialize cls-hooked
patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number | undefined>('database.port'),
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.pass'),
          entities: [__dirname + '/../../**/**/*.entity{.ts,.js}'],
          // Timezone configured on the MySQL server.
          // This is used to typecast server date/time values to JavaScript Date object and vice versa.
          timezone: 'Z',
          synchronize: false,
          logging: true,
          // debug: configService.get<string>('env') === 'development',
        };
      },
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      UserWalletRepository,
      UserBalanceRepository,
      UserDeviceRepository,
      NetworkRepository,
      DefaultTokenRepository,
      HotWalletRepository,
      KmsCmkRepository,
      KmsKeyRepository,
      NftRepository,
      NftOwnerRepository,
      NftMarketRepository,
      NftMarketLogRepository,
      TransactionRepository,
      UserSecurityRepository,
      UserSettingRepository,
      FileRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
