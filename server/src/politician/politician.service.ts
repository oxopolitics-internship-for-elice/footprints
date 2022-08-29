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
    const politicians = await this.politicianModel.find().select('_id name');
    // const resultArray = [];
    // const result = new Object();
    const array = await Promise.all(
      politicians.map(async (politician) => {
        const result = await this.issueModel.aggregate([
          {
            $match: { $expr: { $eq: ['$targetPolitician', politician._id] } },
          },
          {
            $project: {
              _id: 1,
              targetPolitician: 1,
              issueDate: 1,
              totalPolls: { $add: ['$poll.pro', '$poll.neu', '$poll.con'] },
              score: { $subtract: ['$poll.pro', '$poll.con'] },
              poll: 1,
            },
          },
          { $sort: { totalPolls: -1 } },
          { $limit: 20 },
          { $sort: { issueDate: 1 } },
          {
            $group: { _id: '$targetPolitician', issues: { $push: '$$ROOT' } },
          },
          { $set: { name: politician.name } },
        ]);
        return result;
      }),
    );
    return [array[0][0], array[1][0]];
  }
}
