import { getModelToken } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Model } from 'mongoose';
import { Politician, politicianSchema } from 'src/schemas/politician.schema';
import { UserService } from 'src/user/user.service';
import { PoliticianController } from './politician.controller';
import { PoliticianService } from './politician.service';
import { User, userSchema } from 'src/schemas/user.schema';
import { PoliticianDto } from './dto/politician.dto';

describe('PoliticianController', () => {
  let controller: PoliticianController;
  let mongoConnection: Connection;
  let politicianModel: Model<Politician>;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongoConnection = (await connect('mongodb://127.0.0.1:27017')).connection;
    politicianModel = mongoConnection.model(Politician.name, politicianSchema);
    userModel = mongoConnection.model(User.name, userSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticianController],
      providers: [
        PoliticianService,
        UserService,
        {
          provide: getModelToken(Politician.name),
          useValue: politicianModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    controller = module.get<PoliticianController>(PoliticianController);
  });

  describe('/politician POST', () => {
    const stub = new PoliticianDto();
    it('addPolitician', async () => {
      const result = await controller.addPolitician(stub);
      expect(result.message).toBe('success');
    });
  });

  describe('/politician GET', () => {
    const stub = new PoliticianDto(true);
    it('getAllPoliticians', async () => {
      expect(await controller.getAllPoliticians()).toEqual([stub]);
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
