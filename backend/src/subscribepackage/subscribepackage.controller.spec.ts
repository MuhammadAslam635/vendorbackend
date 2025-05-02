import { Test, TestingModule } from '@nestjs/testing';
import { SubscribepackageController } from './subscribepackage.controller';
import { SubscribepackageService } from './subscribepackage.service';

describe('SubscribepackageController', () => {
  let controller: SubscribepackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribepackageController],
      providers: [SubscribepackageService],
    }).compile();

    controller = module.get<SubscribepackageController>(SubscribepackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
