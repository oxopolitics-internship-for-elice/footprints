import { Test, TestingModule } from '@nestjs/testing';
import { PoliticianService } from './politician.service';

describe('PoliticianService', () => {
  let service: PoliticianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliticianService],
    }).compile();

    service = module.get<PoliticianService>(PoliticianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
