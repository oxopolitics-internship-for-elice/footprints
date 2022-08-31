import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { scheduleJob } from 'node-schedule';
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

  async addIssue(body: AddIssueDto): Promise<boolean> {
    const week = 7 * 24 * 60 * 60 * 1000;
    const regiDueDate = new Date(Date.now() + week);

    const { targetPolitician, regiUser, issueDate, content, title } = body;

    const issueData = { targetPolitician, regiUser, issueDate, content, title, regiDueDate };
    const instance = await new this.issueModel(issueData);
    const save = await instance.save();

    const setRegiStatusInactiveJob = scheduleJob(regiDueDate, () => {
      this.setRegiStatus(save._id, 'expired');
    });

    if (!save) {
      throw new Error('생성 오류');
    } else {
      return true;
    }
  }

  async getAllIssues() {
    const allIssues = await this.issueModel.aggregate([
      {
        $project: {
          _id: 1,
          targetPolitician: 1,
          issueDate: 1,
          totalPolls: { $add: ['$poll.total.pro', '$poll.total.neu', '$poll.total.con'] },
          score: { $subtract: ['$poll.total.pro', '$poll.total.con'] },
          poll: 1,
        },
      },
      { $sort: { totalPolls: -1 } },
      { $limit: 40 },
      { $sort: { issueDate: 1 } },
      {
        $group: { _id: '$targetPolitician', issues: { $push: '$$ROOT' } },
      },
      {
        $lookup: {
          from: 'politicians',
          localField: '_id',
          foreignField: '_id',
          as: 'politicianInfo',
          pipeline: [
            {
              $project: {
                issues: 0,
                _id: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
              },
            },
          ],
        },
      },
    ]);

    return allIssues;
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
    const value: number = issue.poll.lion.pro;
    return value;
  }

  // poll con 개수 확인 함수
  async pollcountCon(id) {
    const issue = await this.issueModel.findById(id);
    const value: number = issue.poll.lion.con;
    return value;
  }

  // poll neu 개수 확인 함수
  async pollcountNeu(id) {
    const issue = await this.issueModel.findById(id);
    const lion: number = issue.poll.lion.neu;
    return lion;
  }

  async setIssueRegi(id, regiData: SetIssueRegiDto): Promise<boolean> {
    const proResult: number = await this.regicountPro(id);
    const conResult: number = await this.regicountCon(id);
    const korDiff = 9 * 60 * 60 * 1000;
    const week = 7 * 24 * 60 * 60 * 1000;
    const pollDate = new Date(Date.now() + korDiff);
    const pollDueDate = new Date(Date.now() + korDiff + week);

    if (regiData.pro === true) {
      if (proResult + 1 >= 75 && proResult + 1 >= conResult * 3) {
        await this.issueModel.updateOne(
          { _id: id },
          {
            $set: {
              regi: { pro: proResult + 1, con: conResult },
              regiStatus: 'active',
              pollDate,
              pollDueDate,
            },
          },
        );
        const setIsPollActiveFalse = scheduleJob(pollDueDate, () => {
          this.setIsPollActive(id, false);
        });
        console.log(pollDueDate);
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
    const { pro, neu, con } = regiData;
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
            'poll.lion': {
              pro: pro ? proResult + 1 : proResult,
              neu: neu ? neuResult + 1 : neuResult,
              con: con ? conResult + 1 : conResult,
            },
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

  async setRegiStatus(_id, regiStatus): Promise<void> {
    const result = await this.issueModel.updateOne(
      { _id },
      {
        $set: {
          regiStatus,
        },
      },
    );
    if (result.modifiedCount !== 1) {
      throw new Error('cronjob updating regiStatus did not worked');
    }
  }

  async setIsPollActive(_id, isPollActive): Promise<void> {
    const result = await this.issueModel.updateOne(
      { _id },
      {
        $set: {
          isPollActive,
        },
      },
    );
    if (result.modifiedCount !== 1) {
      throw new Error('cronjob updating isPollActive did not worked');
    }
  }
}
