import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Model } from 'mongoose';
import { Issue, issueSchema } from 'src/schemas/issue.schema';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let mongoConnection: Connection;
  let service: IssueService;
  let issueModel: Model<Issue>;

  beforeAll(async () => {
    mongoConnection = (await connect('mongodb://127.0.0.1:27017')).connection;
    issueModel = mongoConnection.model(Issue.name, issueSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IssueService,
        {
          provide: getModelToken(Issue.name),
          useValue: issueModel,
        },
      ],
    }).compile();

    service = module.get<IssueService>(IssueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await mongoConnection.close();
  });
});
