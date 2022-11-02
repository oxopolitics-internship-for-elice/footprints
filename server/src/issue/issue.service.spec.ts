import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Model } from 'mongoose';
import { Issue, issueSchema } from 'src/schemas/issue.schema';
import { PageOptionsDto } from 'src/utils/pagination.dto';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let mongoConnection: Connection;
  let service: IssueService;
  let issueModel: Model<Issue>;
  let count;
  let topIssue;

  const targetPolitician = '6339419e0af61ab9ba0ef870';
  const regiUser = '63393d09013cf197ef46eb5e';
  const pageOptions = new PageOptionsDto(1, 100);

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

    // const { collections } = mongoConnection;
    // for (const key in collections) {
    //   const collection = collections[key];
    //   await collection.deleteMany({});
    // }
  });

  describe('addIssue', () => {
    it('should return issue instance', async () => {
      const stub = {
        targetPolitician,
        issueDate: new Date(),
        content: 'test',
        title: 'top-issue',
        link: 'http://www.naver.com',
        regi: {
          pro: 51,
          con: 90,
        },
      };

      const result = await service.addIssue(stub, regiUser);
      expect(result).toBeInstanceOf(issueModel);
    });
  });

  describe('getAllIssuesCount', () => {
    it('should return 1 cause of one active issue', async () => {
      const result = await service.getAllIssuesCount('active');
      expect(result).toBe(1);
    });
    it('should return count of inactive issues', async () => {
      count = await service.getAllIssuesCount('inactive');
      expect(count).toBe(8);
    });
  });

  describe('getIssuesRegistered', () => {
    it('should return one issue', async () => {
      const issues = await service.getIssuesRegistered(targetPolitician, pageOptions);
      expect(issues.length).toBe(1);
    });
  });

  describe('getIssueNotRegisteredRanked', () => {
    it('should return top 3 issues', async () => {
      const issues = await service.getIssueNotRegisteredRanked(targetPolitician);
      expect(issues[0].regi.pro).toBe(74);
      topIssue = issues[0];
    });
  });

  describe('getIssueNotRegistered', () => {
    let issues;

    it('should not return expired issue', async () => {
      issues = await service.getIssueNotRegistered(targetPolitician, pageOptions, count);
      console.log('issues',issues)
      expect(
        issues.filter((issue) => {
          issue.title === '미등록일주일';
        }).length,
      ).toBe(0);
    });
    it('should return issues sorted by createdAt', () => {
      expect(issues[0].createdAt <= issues[1].createdAt).toBe(true);
    });
    it('should not return ranked issue', () => {
      expect(issues.includes(topIssue)).toBe(false);
    })
  });

  afterAll(async () => {
    await mongoConnection.close();
  });
});
