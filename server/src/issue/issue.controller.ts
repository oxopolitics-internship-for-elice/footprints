import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpCode,
  Res,
} from '@nestjs/common';
import { response } from 'express';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { QueryIssueDto } from './dto/issue.query.dto';
import { SetIssueContentDto } from './dto/issue.setIssueContent.dto';
import { SetIssuePollDto } from './dto/issue.setIssuePoll.dto';
import { SetIssueRegiDto } from './dto/issue.setIssueRegi.dto';
import { SetIssueRegiStatusDto } from './dto/issue.setIssueRegiStatus.dto';
import { IssueService } from './issue.service';

@Controller('issues')
export class IssueController {
  constructor(private issueService: IssueService) {}

  // 이슈 등록
  @Post()
  async addIssue(@Body() issueData: AddIssueDto, @Res() response) {
    try {
      const issue = await this.issueService.addIssue(issueData);
      if (issue) {
        return response.json({ message: 'success' });
      }
    } catch (err) {}
  }

  @Get()
  async getAllIssues(@Res() response) {
    try {
      const issues = await this.issueService.getAllIssues();
      console.log(issues);
      return response.json({ issues });
    } catch (err) {}
  }

  // 정치인 메인페이지, 등록된 이슈(10개 사건 그래프)
  @Get()
  async getIssuesRegistered(
    @Query() issueQuery: QueryIssueDto,
    @Res() response,
  ) {
    try {
      const { targetPolitician, regiStatus, ranked, pageNum, perPage, skip } =
        issueQuery;

      // 등록된 이슈
      if (regiStatus && !ranked) {
        console.log('registered');
        const issues = await this.issueService.getIssuesRegistered(
          targetPolitician,
          pageNum,
          perPage,
          skip,
        );
        return response.json({ issues });
      }

      // 미등록 이슈 top 3
      else if (!regiStatus && ranked) {
        console.log('not registered but ranked');
        const issues = await this.issueService.getIssueNotRegisteredRanked(
          targetPolitician,
        );
        return response.json({ issues });
      }

      // 미등록 이슈 나머지
      else if (!regiStatus && !ranked) {
        console.log('not registered also not ranked');
        const issues = await this.issueService.getIssueNotRegistered(
          targetPolitician,
          pageNum,
          perPage,
          skip,
        );
        return response.json({ issues });
      } else {
        throw new Error('bad request');
      }
    } catch (err) {}
  }

  // 이슈 등록 투표
  @Patch('/:issueId/regi')
  async setIssueRegi(
    @Param('issueId') id: string,
    @Body() regi: SetIssueRegiDto,
    @Res() response,
  ) {
    try {
      const issue = await this.issueService.setIssueRegi(id, regi);
      console.log('controller:', regi);
      return response.json({ issue });
    } catch (err) {
      console.log(err);
    }
  }

  // 이슈 여론 투표
  @Patch('/:issueId/poll')
  async setIssuePoll(
    @Param('issueId') id: string,
    @Body() poll: SetIssuePollDto,
  ) {
    try {
      // const issue = await this.issueService.setIssuePoll(id, poll);
      // return response.json({ issue });
    } catch (err) {}
  }

  // (관리자) 이슈 내용 수정
  @Patch('/:issueId/content')
  async setIssueContent(
    @Param('issueId') id: string,
    @Body() content: SetIssueContentDto,
  ) {
    try {
      // const issue = await this.issueService.setIssueContent(id, content);
      return {};
    } catch (err) {}
  }

  // (관리자) 이슈 상태 수정
  @Patch('/:issueId/regiStatus')
  async setIssueRegiStatus(
    @Param('issueId') id: string,
    @Body() regiStatus: SetIssueRegiStatusDto,
  ) {
    try {
      // const issue = await this.issueService.setIssueStatus(id, regiStatus);
      return {};
    } catch (err) {}
  }
}
