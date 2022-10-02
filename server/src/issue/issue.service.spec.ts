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

  describe('addIssue', () => {
    it('should return true', async () => {
      const stub = {
        targetPolitician: '6339419e0af61ab9ba0ef870',
        issueDate: new Date(),
        content: 'test',
        title: 'test',
        link: 'http://www.naver.com'
      };
      const regiUser = '63393d09013cf197ef46eb5e'
      
      const result = await service.addIssue(stub, regiUser)
      expect(result).toBeInstanceOf(issueModel);
      expect(result.regiStatus === 'incative');
      expect(result.title === 'test');
    })
  })

  afterAll(async () => {
    await mongoConnection.close();
  });
});
