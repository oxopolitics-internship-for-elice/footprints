import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue, IssueDocument } from '../schemas/issue.schema';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { SetIssueRegiDto } from './dto/issue.setIssueRegi.dto';
import { SetIssuePollDto } from './dto/issue.setIssuePoll.dto';
import { PageOptionsDto, PageMetaDto, PageDto } from 'src/common/pagination.dto';
import { Politician, PoliticianDocument } from '../schemas/politician.schema';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name)
    private readonly issueModel: Model<IssueDocument>,
    @InjectModel(Politician.name)
    private readonly politicianModel: Model<PoliticianDocument>,
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

  async getAllIssues() {
    return;
  }

  async getGraphTribe() {
    const pollResult = await this.issueModel.find().select('_id poll');
    console.log(pollResult);
    const tribeResult = await this.issueModel.aggregate([
      {
        $project: {
          poll: 1,
        },
      },
    ]);

    return tribeResult;
  }

  async getIssuesRegistered(targetPolitician: string, pageOptions: PageOptionsDto): Promise<PageDto<Issue>> {
    const itemCount = await this.issueModel.find({ targetPolitician, regiStatus: 'active' }).count();
    const pageMeta = new PageMetaDto({ pageOptions, itemCount });
    const issues = await this.issueModel
      .find({ targetPolitician, regiStatus: 'active' })
      .sort({ issueDate: 'asc' })
      .skip(pageOptions.skip)
      .limit(pageOptions.perPage);
    return { data: issues, meta: pageMeta };
  }

  async getIssueNotRegisteredRanked(id: string): Promise<Issue[]> {
    const issues = await this.issueModel.aggregate([
      {
        $match: { $expr: { $eq: ['$targetPolitician', { $toObjectId: id }] } },
      },
      {
        $match: { regiStatus: 'inactive' },
      },
      { $addFields: { score: { $subtract: ['$regi.pro', '$regi.con'] } } },
      { $sort: { score: -1 } },
      { $limit: 3 },
    ]);
    return issues;
  }

  async getIssueNotRegistered(targetPolitician: string, pageOptions: PageOptionsDto): Promise<PageDto<Issue>> {
    const itemCount = await this.issueModel.find({ targetPolitician }).count();
    const pageMeta = new PageMetaDto({ pageOptions, itemCount });
    const issues = await this.issueModel
      .find({ targetPolitician, regiStatus: 'inactive' })
      .sort({ issueDate: 'asc' })
      .skip(pageOptions.skip)
      .limit(pageOptions.perPage);
    return { data: issues, meta: pageMeta };
  }

  // regi pro 개수 확인 함수
  async regicountPro(id) {
    const issue = await this.issueModel.findById(id);
    const value: number = issue.regi.pro;
    return value;
  }

  // regi con 개수 확인 함수
  async regicountCon(id) {
    const issue = await this.issueModel.findById(id);
    const value: number = issue.regi.con;
    return value;
  }

  // poll pro 개수 확인 함수
  async pollcountPro(id) {
    const issue = await this.issueModel.findById(id);
    const value: number = issue.poll.pro;
    return value;
  }

  // poll con 개수 확인 함수
  async pollcountCon(id) {
    const issue = await this.issueModel.findById(id);
    const value: number = issue.poll.con;
    return value;
  }

  // poll neu 개수 확인 함수
  async pollcountNeu(id) {
    const issue = await this.issueModel.findById(id);
    const value: number = issue.poll.neu;
    return value;
  }

  async setIssueRegi(id, regiData: SetIssueRegiDto): Promise<boolean> {
    const proResult: number = await this.regicountPro(id);
    const conResult: number = await this.regicountCon(id);
    if (regiData.pro === true) {
      if (proResult + 1 >= 75 && proResult + 1 >= conResult * 3) {
        await this.issueModel.updateOne(
          { _id: id },
          {
            $set: {
              regi: { pro: proResult + 1, con: conResult },
              regiStatus: 'active',
            },
          },
        );
      } else {
        await this.issueModel.updateOne(
          { _id: id },
          {
            $set: {
              regi: { pro: proResult + 1, con: conResult },
            },
          },
        );
      }
    } else {
      await this.issueModel.updateOne(
        { _id: id },
        {
          $set: {
            regi: { pro: proResult, con: conResult + 1 },
          },
        },
      );
    }
    return true;
  }

  async setIssuePoll(id, regiData: SetIssuePollDto): Promise<boolean> {
    const proResult: number = await this.pollcountPro(id);
    const neuResult: number = await this.pollcountNeu(id);
    const conResult: number = await this.pollcountCon(id);
    if (regiData.pro === true) {
      await this.issueModel.updateOne(
        { _id: id },
        {
          $set: {
            poll: { pro: proResult + 1, neu: neuResult, con: conResult },
          },
        },
      );
    } else if (regiData.neu === true) {
      await this.issueModel.updateOne(
        { _id: id },
        {
          $set: {
            poll: { pro: proResult, neu: neuResult + 1, con: conResult },
          },
        },
      );
    } else {
      await this.issueModel.updateOne(
        { _id: id },
        {
          $set: {
            poll: { pro: proResult, neu: neuResult, con: conResult + 1 },
          },
        },
      );
    }
    return true;
  }
}
