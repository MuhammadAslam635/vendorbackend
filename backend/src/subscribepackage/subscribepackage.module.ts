import { Module } from '@nestjs/common';
import { SubscribepackageService } from './subscribepackage.service';
import { SubscribepackageController } from './subscribepackage.controller';

@Module({
  controllers: [SubscribepackageController],
  providers: [SubscribepackageService],
})
export class SubscribepackageModule {}
