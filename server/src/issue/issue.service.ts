import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IssueDocument, Issue } from '../schemas/issue.schema';
import { AddIssueDto } from './dto/issue.addIssue.dto';
@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name)
    private readonly issueModel: Model<IssueDocument>,
  ) {}

  async addIssue(issueData: AddIssueDto): Promise<boolean> {
    const instance = await new this.issueModel(issueData);
    const save = await instance.save();

    if (!save) {
      throw new Error('생성 오류');
    } else {
      return true;
    }
  }

  async getAllIssues(): Promise<Issue[]> {
    const issues = await this.issueModel.find();
    return issues;
  }

  async getIssuesRegistered(
    targetPolitician,
    pageNum,
    perPage,
    skip,
  ): Promise<Issue[]> {
    const issues = await this.issueModel.find({ targetPolitician });
    return issues;
  }

  async getIssueNotRegisteredRanked(targetPolitician): Promise<Issue[]> {
    const issues = await this.issueModel.find({ targetPolitician });
    return issues;
  }

  async getIssueNotRegistered(
    targetPolitician,
    pageNum,
    perPage,
    skip,
  ): Promise<Issue[]> {
    const issues = await this.issueModel.find({ targetPolitician });
    return issues;
  }

  // async setIssueRegi()
}
