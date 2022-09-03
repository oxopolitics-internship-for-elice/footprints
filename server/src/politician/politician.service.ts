import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Politician, PoliticianDocument } from 'src/schemas/politician.schema';

@Injectable()
export class PoliticianService {
  constructor(
    @InjectModel(Politician.name)
    private readonly politicianModel: Model<PoliticianDocument>,
  ) {}

  async getAllPoliticians() {
    const politicians = await this.politicianModel.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          party: 1,
          issues: 1,
        },
      },
      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: 'targetPolitician',
          as: 'issues',
          pipeline: [
            {
              $project: {
                issueDate: 1,
                totalPolls: { $add: ['$poll.total.pro', '$poll.total.neu', '$poll.total.con'] },
                score: { $subtract: ['$poll.total.pro', '$poll.total.con'] },
              },
            },
            { $sort: { totalPolls: -1 } },
            { $limit: 40 },
            { $sort: { issueDate: 1 } },
          ],
        },
      },
    ]);

    return politicians;
  }
}
