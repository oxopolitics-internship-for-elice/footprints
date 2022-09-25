import { getModelToken } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Model } from 'mongoose';
import { Politician, politicianSchema } from '../schemas/politician.schema';
import { UserService } from '../user/user.service';
import { PoliticianController } from './politician.controller';
import { PoliticianService } from './politician.service';
import { User, userSchema } from '../schemas/user.schema';
import { addStub, getStub } from './dto/politician.dto';

describe('PoliticianController', () => {
  let controller: PoliticianController;
  let mongoConnection: Connection;
  let politicianModel: Model<Politician>;
  let userModel: Model<User>;

  let id;

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

  describe('addPolitician', () => {
    it('should return true when it successs or throw error', async () => {
      const result = await controller.addPolitician(addStub);
      id = await (await mongoConnection.collections['politicians'].findOne({ name: 'test' }))._id;
      expect(result.message).toBe('success');
    });
  });

  describe('getAllPoliticians', () => {
    it('should return an array of politicians', async () => {
      expect(await controller.getAllPoliticians()).toEqual([getStub(id)]);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
