import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { RolesGuard } from 'src/auth/roles-guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [PackageController],
  providers: [PackageService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class PackageModule {}
