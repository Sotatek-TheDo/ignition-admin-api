import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        },
        prefix: configService.get<string>('queue.prefix'),
        limiter: {
          max: configService.get<number>('queue.limiter.max'),
          duration: configService.get<string>('queue.limiter.duration'),
        },
        defaultJobOptions: {
          ...configService.get<{
            attempts: number;
            removeOnComplete: boolean;
            removeOnFail: boolean;
          }>('queue.defaultOptions'),
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
