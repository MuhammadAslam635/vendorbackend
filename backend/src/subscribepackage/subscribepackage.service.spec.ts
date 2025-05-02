import { Test, TestingModule } from '@nestjs/testing';
import { SubscribepackageService } from './subscribepackage.service';

describe('SubscribepackageService', () => {
  let service: SubscribepackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribepackageService],
    }).compile();

    service = module.get<SubscribepackageService>(SubscribepackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
