import { Test, TestingModule } from '@nestjs/testing';
import { TokenblocklistserviceService } from './tokenblocklistservice.service';

describe('TokenblocklistserviceService', () => {
  let service: TokenblocklistserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenblocklistserviceService],
    }).compile();

    service = module.get<TokenblocklistserviceService>(TokenblocklistserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
