import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Model } from 'mongoose';
import { Politician, politicianSchema } from 'src/schemas/politician.schema';
import { PoliticianController } from './politician.controller';
import { PoliticianService } from './politician.service';
import { PoliticianDto } from './dto/politician.dto';
import { Res } from '@nestjs/common';

describe('PoliticianController', () => {
  let controller: PoliticianController;
  let mongoConnection: Connection;
  let politicianModel: Model<Politician>;

  beforeAll(async () => {
    mongoConnection = (await connect('mongodb://127.0.0.1:27017')).connection;
    politicianModel = mongoConnection.model(Politician.name, politicianSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticianController],
      providers: [
        PoliticianService,
        {
          provide: getModelToken(Politician.name),
          useValue: politicianModel,
        },
      ],
    }).compile();

    controller = module.get<PoliticianController>(PoliticianController);
  });

  describe('/politician POST', () => {
    const stub = new PoliticianDto();
    it('addPolitician', async () => {
      const result = await controller.addPolitician(stub, Res());
      expect(result.message).toBe('success');
    });
  });

  describe('/politician GET', () => {
    const stub = new PoliticianDto(true);
    it('getAllPoliticians', async () => {
      expect(await controller.getAllPoliticians(Res())).toEqual([stub]);
    });
  });

  afterAll(async () => {
    // const { collections } = mongoConnection;
    // for (const key in collections) {
    //   const collection = collections[key];
    //   await collection.deleteMany({});
    // }
    await mongoConnection.close();
  });
});
