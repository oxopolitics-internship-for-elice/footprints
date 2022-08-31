import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue, IssueDocument } from '../schemas/issue.schema';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { SetIssueRegiDto } from './dto/issue.setIssueRegi.dto';
import { SetIssuePollDto } from './dto/issue.setIssuePoll.dto';
import { PageOptionsDto, PageMetaDto, PageDto } from 'src/common/pagination.dto';
import { validateTribe } from 'src/common/validateTribe';
import { Politician, PoliticianDocument } from '../schemas/politician.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name)
    private readonly issueModel: Model<IssueDocument>,
    @InjectModel(Politician.name)
    private readonly politicianModel: Model<PoliticianDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
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
    const tribes = await this.issueModel.find().select('_id poll');
    console.log(tribes);
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

  async setIssuePoll(id, regiData: SetIssuePollDto, tribe): Promise<boolean> {
    const proResult = await this.pollcountPro(id, tribe);
    const neuResult = await this.pollcountNeu(id, tribe);
    const conResult = await this.pollcountCon(id, tribe);
    const tribes = validateTribe(tribe);
    const { pro, neu, con } = regiData;
    switch (tribes) {
      case 'tiger':
        if (regiData.pro === true || regiData.neu === true || regiData.con === true) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.tiger': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
                'poll.total': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
              },
            },
          );
        }
      case 'hippo':
        if (regiData.pro === true || regiData.neu === true || regiData.con === true) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.hippo': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
                'poll.total': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
              },
            },
          );
        }
      case 'elephant':
        if (regiData.pro === true || regiData.neu === true || regiData.con === true) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.elephant': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
                'poll.total': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
              },
            },
          );
        }
      case 'dinosaur':
        if (regiData.pro === true || regiData.neu === true || regiData.con === true) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.dinosaur': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
                'poll.total': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
              },
            },
          );
        }
      case 'lion':
        if (regiData.pro === true || regiData.neu === true || regiData.con === true) {
          await this.issueModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                'poll.lion': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
                'poll.total': {
                  pro: pro ? proResult + 1 : proResult,
                  neu: neu ? neuResult + 1 : neuResult,
                  con: con ? conResult + 1 : conResult,
                },
              },
            },
          );
        }
        break;
      default:
        console.log('존재하지 않는 부족입니다.');
        break;
    }
    return true;
  }
}
