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

  async getIssuesRegistered(targetPolitician, skip, perPage): Promise<Issue[]> {
    const issues = await this.issueModel
      .find({ targetPolitician, regiStatus: 'active' })
      .sort({ issueDate: 'asc' })
      .skip(skip)
      .limit(perPage);
    return issues;
  }

  async getIssueNotRegisteredRanked(id): Promise<Issue[]> {
    const issues = await this.issueModel.aggregate([
      {
        $match: { $expr: { $eq: ['$targetPolitician', { $toObjectId: id }] } },
      },
      { $addFields: { score: { $subtract: ['$regi.pro', '$regi.con'] } } },
      { $sort: { sum: -1 } },
      { $limit: 3 },
    ]);
    return issues;
  }

  async getIssueNotRegistered(
    targetPolitician,
    skip,
    perPage,
  ): Promise<Issue[]> {
    const issues = await this.issueModel
      .find({ targetPolitician })
      .sort({ issueDate: 'asc' })
      .skip(skip)
      .limit(perPage);
    return issues;
  }
}
