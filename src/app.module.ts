
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PackageModule } from './package/package.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SubscribepackageModule } from './subscribepackage/subscribepackage.module';
import { VendorModule } from './vendor/vendor.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    PackageModule,
    TransactionsModule,
    SubscribepackageModule,
    VendorModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    StatsModule,
  ],
})
export class AppModule {}
