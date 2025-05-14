import { Module } from '@nestjs/common';
import { ZipcodeService } from './zipcode.service';
import { ZipcodeController } from './zipcode.controller';

@Module({
  controllers: [ZipcodeController],
  providers: [ZipcodeService],
})
export class ZipcodeModule {}
