import { Test, TestingModule } from '@nestjs/testing';
import { ZipcodeController } from './zipcode.controller';
import { ZipcodeService } from './zipcode.service';

describe('ZipcodeController', () => {
  let controller: ZipcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZipcodeController],
      providers: [ZipcodeService],
    }).compile();

    controller = module.get<ZipcodeController>(ZipcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
