import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue, IssueDocument } from 'src/schemas/issue.schema';
import { Politician, PoliticianDocument } from 'src/schemas/politician.schema';

@Injectable()
export class PoliticianService {
  constructor(
    @InjectModel(Politician.name)
    private readonly politicianModel: Model<PoliticianDocument>,
    @InjectModel(Issue.name)
    private readonly issueModel: Model<IssueDocument>,
  ) {}

  async getAllPoliticians() {
    const politicians = await this.politicianModel.find().select('_id name ');
    const result = new Object();
    for (let i = 0; i < politicians.length; i++) {
      result[politicians[i].name] = await this.issueModel.aggregate([
        {
          $match: { $expr: { $eq: ['$targetPolitician', politicians[i]._id] } },
        },
        {
          $project: {
            _id: 1,
            issueDate: 1,
            totalPolls: { $add: ['$poll.pro', '$poll.neu', '$poll.con'] },
            score: { $subtract: ['$poll.pro', '$poll.con'] },
            poll: 1,
          },
        },
        { $sort: { totalPolls: -1 } },
        { $limit: 20 },
        { $sort: { issueDate: 1 } },
      ]);
    }
    return result;
  }
}
