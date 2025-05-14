
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PackageModule } from './package/package.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SubscribepackageModule } from './subscribepackage/subscribepackage.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StatsModule } from './stats/stats.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ZipcodeModule } from './zipcode/zipcode.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    PackageModule,
    TransactionsModule,
    SubscribepackageModule,
    ZipcodeModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || '465'),
        secure: process.env.MAIL_PORT === '465',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.MAIL_FROM,
      },
      template: {
        dir: join(__dirname,'..','mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      serveRoot: '/public',
    }),
    StatsModule,
    ZipcodeModule,
  ],
})
export class AppModule {}
