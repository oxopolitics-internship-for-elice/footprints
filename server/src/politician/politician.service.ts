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
    @InjectModel(Issue.name) private readonly issueModel: Model<IssueDocument>,
  ) {}

  async getAllPoliticians(): Promise<Politician[]> {
    const politicians = await this.politicianModel.find().select('_id');
    const issues = await politicians.map((ele) => {
      return this.issueModel.find({ targetPolitician: ele });
    });
    console.log(issues);
    return [];
  }
}
