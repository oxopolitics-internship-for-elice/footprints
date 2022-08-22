import { Test, TestingModule } from '@nestjs/testing';
import { PoliticianController } from './politician.controller';

describe('PoliticianController', () => {
  let controller: PoliticianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticianController],
    }).compile();

    controller = module.get<PoliticianController>(PoliticianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
