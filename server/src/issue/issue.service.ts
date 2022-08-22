import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { Issue, IssueDocument } from '../schemas';
@Injectable()
export class IssueService {
  constructor(
    @InjectModel('issues')
    private readonly issueModel: Model<IssueDocument>,
  ) {}

  async addIssue(issueData: AddIssueDto): Promise<Issue> {
    const issue = new this.issueModel();
    issue.targetPolitician = issueData.targetPoliticain;
    issue.regiUser = issueData.regiUser;
    issue.issuDate = issueData.issueDate;
    issue.pollDate = issueData.pollDate;
    issue.content = issueData.content;
    issue.isPollActive = issueData.isPollActive;
    const result = await issue.save();
    return result;
  }
}
