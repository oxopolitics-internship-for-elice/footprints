import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { PoliticianController } from './politician.controller';
import { PoliticianService } from './politician.service';

describe('PoliticianController', () => {
  let controller: PoliticianController;
  let service: PoliticianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticianController],
      providers: [PoliticianService, UserService],
    }).compile();

    controller = module.get<PoliticianController>(PoliticianController);
    service = module.get<PoliticianService>(PoliticianService);
  });

  describe('getAllPoliticians', () => {
    it('should return an array of politicians', async () => {
      const result = ['test'];
      jest.spyOn(service, 'getAllPoliticians').mockImplementation(async () => result);

      expect(await controller.getAllPoliticians(result)).toBe(result);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
