import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue, IssueDocument } from '../schemas/IssueSchema';
import { AddIssueDto } from './dto/issue.addIssue.dto';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel('issues')
    private readonly issueModel: Model<IssueDocument>,
  ) {}

  async addIssue(addIssueDto: AddIssueDto): Promise<Issue> {

  }
}
