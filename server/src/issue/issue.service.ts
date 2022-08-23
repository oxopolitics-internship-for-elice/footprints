import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue, IssueDocument } from '../schemas/issue.schema';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name)
    private issueModel: Model<IssueDocument>,
  ) {}

  addIssue(issueData: object): Issue[] {
    return [];
  }

  getIssuesRegistered(id: number, pageNum: number, perPage: number) {
    return {};
  }

  getIssueNotRegisteredRanked(id: number) {
    return 'hello World';
  }

  getIssueNotRegistered(id: number, pageNum, perPage) {
    const issue = this.issueModel.find((issue) => issue);
    return issue;
  }

  setIssueRegi(id, obj) {
    return { id, obj };
  }

  setIssuePoll(id, obj) {
    return { id, obj };
  }

  setIssueContent(id, content) {
    return { id, content };
  }

  setIssueStatus(id, status) {
    return { id, status };
  }
}
