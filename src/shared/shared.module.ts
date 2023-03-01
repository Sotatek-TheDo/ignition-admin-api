import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { configModuleOptions } from './configs/module-options';
import { DatabaseModule } from './database/database.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AppLoggerModule } from './logger/logger.module';
import { QueueModule } from './queue.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    DatabaseModule,
    AppLoggerModule,
    QueueModule,
  ],
  exports: [AppLoggerModule, ConfigModule, DatabaseModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class SharedModule {}
