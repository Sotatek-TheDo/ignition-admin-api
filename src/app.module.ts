import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health-check/health.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppSocketModule } from './socket/app-socket.module';

@Module({
  imports: [
    SharedModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get<string>('fallbackLanguage'),
        loaderOptions: {
          path: path.join(process.cwd(), 'dist/i18n/'),
          watch: true,
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
    AppSocketModule,
    UserModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
