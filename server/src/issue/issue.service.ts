import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { scheduleJob } from 'node-schedule';
import { Issue, IssueDocument } from 'src/schemas/issue.schema';
import { SetIssueRegiDto } from './dto/issue.setIssueRegi.dto';
import { PageOptionsDto } from 'src/utils/pagination.dto';
import { validateTribe } from 'src/utils/validateTribe';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { DateTime } from 'luxon';
@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name)
    private readonly issueModel: Model<IssueDocument>,
  ) {}

  async addIssue(body: AddIssueDto, regiUser: string): Promise<Issue> {
    const { targetPolitician, issueDate, content, title, link } = body;
    const result = await new this.issueModel({ targetPolitician, issueDate, content, title, link, regiUser }).save();

    return result;
  }

  // regiStatus: 'active'
  async getAllActiveIssuesCount(): Promise<number> {
    return await this.issueModel.find({ regiStatus: 'active' }).count();
  }

  // regiStatus: 'inactive'
  async getAllInactiveIssuesCount(): Promise<number> {
    const due = DateTime.now().minus({ weeks: 1 }).toBSON();
    return await this.issueModel.find({ regiStatus: 'inactive', createdAt: { $gt: due } }).count();
  }

  // return type needed
  async getIssuesRegistered(targetPolitician: string, pageOptions: PageOptionsDto) {
    const issues = await this.issueModel
      .find({ targetPolitician, regiStatus: 'active' })
      .sort({ issueDate: -1 })
      .skip(pageOptions.skip)
      .limit(pageOptions.perPage);
    return issues;
  }

  // return type needed
  async getIssueNotRegisteredRanked(id: string): Promise<Issue[]> {
    const due = DateTime.now().minus({ weeks: 1 }).toBSON();

    const issues = await this.issueModel.aggregate([
      {
        $match: { $expr: { $eq: ['$targetPolitician', { $toObjectId: id }] } },
      },
      {
        $match: { regiStatus: 'inactive' },
      },
      { $match: { createdAt: { $gt: due } } },
      { $addFields: { score: { $subtract: ['$regi.pro', '$regi.con'] } } },
      { $sort: { score: -1 } },
      { $limit: 3 },
    ]);
    return issues;
  }

  // return type needed
  async getIssueNotRegistered(id: string, pageOptions: PageOptionsDto, total: number) {
    const due = DateTime.now().minus({ weeks: 1 }).toBSON();

    const issues = await this.issueModel.aggregate([
      {
        $match: { $expr: { $eq: ['$targetPolitician', { $toObjectId: id }] } },
      },
      {
        $match: { regiStatus: 'inactive' },
      },
      { $match: { createdAt: { $gt: due } } },
      { $addFields: { score: { $subtract: ['$regi.pro', '$regi.con'] } } },
      { $sort: { score: 1 } },
      { $limit: total - 3 },
      { $sort: { createdAt: 1 } },
      { $skip: pageOptions.skip },
      { $limit: pageOptions.perPage },
    ]);
    return issues;
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

  // poll pro 개수 확인 함수
  async pollcountPro(id, tribe) {
    const issue = await this.issueModel.findById(id);
    const value = issue.poll;
    return value[tribe].pro;
  }

  // poll con 개수 확인 함수
  async pollcountCon(id, tribe) {
    const issue = await this.issueModel.findById(id);
    const value = issue.poll;
    return value[tribe].con;
  }

  // poll neu 개수 확인 함수
  async pollcountNeu(id, tribe) {
    const issue = await this.issueModel.findById(id);
    const value = issue.poll;
    return value[tribe].neu;
  }

  async setIssuePoll(id, vote, voteExist, tribe): Promise<boolean> {
    const proResult = await this.pollcountPro(id, tribe);
    const neuResult = await this.pollcountNeu(id, tribe);
    const conResult = await this.pollcountCon(id, tribe);
    const tribes = validateTribe(tribe);

    switch (tribes) {
      case 'tiger':
        if (vote) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.tiger': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
                'poll.total': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
              },
            },
          );
        }
      case 'hippo':
        if (vote) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.hippo': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
                'poll.total': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
              },
            },
          );
        }
      case 'elephant':
        if (vote) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.elephant': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
                'poll.total': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
              },
            },
          );
        }
      case 'dinosaur':
        if (vote) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.dinosaur': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
                'poll.total': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
              },
            },
          );
        }
      case 'lion':
        if (vote) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.lion': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
                'poll.total': {
                  pro: vote === 'pro' ? proResult + 1 : voteExist === 'pro' ? proResult - 1 : proResult,
                  neu: vote === 'neu' ? neuResult + 1 : voteExist === 'neu' ? neuResult - 1 : neuResult,
                  con: vote === 'con' ? conResult + 1 : voteExist === 'con' ? conResult - 1 : conResult,
                },
              },
            },
          );
        }
        break;
      default:
        throw new Error('tribe data error');
        break;
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
