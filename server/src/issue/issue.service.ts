import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { PageOptionsDto } from './dto/page.dto';
import { SetIssueContentDto } from './dto/issue.setIssueContent.dto';
import { Issue, IssueDocument } from '../schemas';
import { throwIfEmpty } from 'rxjs';
@Injectable()
export class IssueService {
  constructor(
    @InjectModel('issues')
    private readonly issueModel: Model<IssueDocument>,
  ) {}

  async addIssue(issueData: AddIssueDto): Promise<Issue> {
    const issue = new this.issueModel({
      ...issueData,
    });
    issue.targetPolitician = issueData.targetPolitician;
    issue.regiUser = issueData.regiUser;
    issue.issuDate = issueData.issueDate;
    issue.pollDate = issueData.pollDate;
    issue.content = issueData.content;
    issue.isPollActive = issueData.isPollActive;
    const result = await issue.save();
    console.log(result);
    return result;
  }

  async getAllIssues(): Promise<Issue[]> {
    const issues = await this.issueModel.find();
    return issues;
  }

  // async getIssuesByPolitician(
  //   politicianId: string,
  //   pageData: PageOptionsDto,
  // ): Promise<Issue> {
  //   const issues = await this.issueModel.find({

  //   });
  // }

  // async getOne(id: string): Promise<Issue> {
  //   const issue = this.issueModel.find((issue) => issue.id === String(id));
  //   if (!issue) {
  //     throw new NotFoundException(`issue id ${id} not found`);
  //   }
  //   return issue;
  // }

  // async setIssueContent(
  //   issueData: SetIssueContentDto,
  //   id: string,
  // ): Promise<Issue> {
  //   const issue = this.getOne(id);
  //   this.deleteOne(id);
  //   this.issueModel.push({ ...issue, ...issueData });
  // }
}
