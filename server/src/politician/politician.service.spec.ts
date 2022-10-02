import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Model } from 'mongoose';
import { Politician, politicianSchema } from 'src/schemas/politician.schema';
import { PoliticianDto } from './dto/politician.dto';
import { PoliticianService } from './politician.service';

describe('PoliticianService', () => {
  let mongoConnection: Connection;
  let service: PoliticianService;
  let politicianModel: Model<Politician>;

  beforeAll(async () => {
    mongoConnection = (await connect('mongodb://127.0.0.1:27017')).connection;
    politicianModel = mongoConnection.model(Politician.name, politicianSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticianService],
      providers: [
        PoliticianService,
        {
          provide: getModelToken(Politician.name),
          useValue: politicianModel,
        },
      ],
    }).compile();

    service = module.get<PoliticianService>(PoliticianService);
  });

  describe('addPolitician', () => {
    it('should return true', async () => {
      const stub = new PoliticianDto();
      const result = await service.addPolitician(stub);
      expect(result).toBe(true);
    });

    // validation은 어차피 DTO에서 발생하고, controller에서 error handling 하면 됨
    // it('should return validationError', async () => {
    //   const result = await service.addPolitician({ _id: '1', ...addStub });
    //   expect(result).toBe(false);
    // });
  });

  describe('getAllPoliticians', () => {
    it('should return politicians with issues', async () => {
      const result = await service.getAllPoliticians();
      expect(result.length > 0).toBe(true);
      expect(result[0].count).toBe(1);
      expect(result[0].issues).toBe([]);
    });
  });

  afterAll(async () => {
    const { collections } = mongoConnection;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    await mongoConnection.close();
  });
});
