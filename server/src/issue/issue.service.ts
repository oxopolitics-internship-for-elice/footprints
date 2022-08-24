import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mixed, Model } from 'mongoose';
import { type } from 'os';
import { resourceLimits } from 'worker_threads';
import { IssueDocument, Issue } from '../schemas/issue.schema';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { SetIssueRegiDto } from './dto/issue.setIssueRegi.dto';
import { SetIssueRegiStatusDto } from './dto/issue.setIssueRegiStatus.dto';
import { SetIssuePollDto } from './dto/issue.setIssuePoll.dto';
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

  // pro 개수 확인 함수
  async countPro(id) {
    const issue = await this.issueModel.findOne({ id });
    const value: number = issue.regi.pro;
    return value;
  }

  // con 개수 확인 함수
  async countCon(id) {
    const issue = await this.issueModel.findOne({ id });
    const value: number = issue.regi.con;
    return value;
  }

  async setIssueRegi(id, regiData: SetIssueRegiDto): Promise<Issue> {
    const issueRegi = await this.issueModel.findById(id);
    console.log('카운트함수Pro!!!!:', await this.countPro(id));
    console.log('카운트함수Con!!!!:', await this.countCon(id));
    console.log(id);
    console.log(issueRegi);

    const proResult: number = (await this.countPro(id)) + 1;
    const conResult: number = await this.countCon(id);
    if (regiData.pro === true) {
      issueRegi.regi.pro = proResult;
      if (issueRegi.regi.pro >= 75 && issueRegi.regi.pro >= conResult * 3) {
        issueRegi.regiStatus = 'active';
        issueRegi.isPollActive = false;
      }
    } else {
      issueRegi.regi.con = conResult + 1;
      console.log(issueRegi.regi.con);
    }
    return issueRegi;
  }

  async setIssuePoll(id, regiData: SetIssuePollDto): Promise<Issue> {
    const issuePoll = await this.issueModel.findById(id);
    console.log(issuePoll);
    return issuePoll;
  }
}
