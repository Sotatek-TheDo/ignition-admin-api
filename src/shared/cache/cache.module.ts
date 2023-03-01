import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { configModuleOptions } from '../configs/module-options';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isCacheEnable = configService.get<boolean>('cache.enable');
        if (!isCacheEnable) {
          return {
            ttl: configService.get<number>('cache.ttl'),
          };
        }

        return {
          store: redisStore,
          ttl: configService.get<number>('cache.ttl'),
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class CacheModule {}
