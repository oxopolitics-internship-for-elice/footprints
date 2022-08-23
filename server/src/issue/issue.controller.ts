import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpCode,
} from '@nestjs/common';
import { AddIssueDto } from './dto/add.issue.dto';
import { QueryIssueDto } from './dto/query.dto';
import { SetIssueContentDto } from './dto/set.issueContent.dto';
import { SetIssuePollDto } from './dto/set.issuePoll.dto';
import { SetIssueRegiDto } from './dto/set.issueRegi.dto';
import { SetIssueRegiStatusDto } from './dto/set.issueRegiStatus.dto';

import { IssueService } from './issue.service';

@Controller('issues')
export class IssueController {
  constructor(private issueService: IssueService) {}

  // 이슈 등록
  @Post()
  @HttpCode(201)
  async addIssue(@Body() issueData: AddIssueDto) {
    try {
      const issue = await this.issueService.addIssue(issueData);
      return issue;
    } catch (err) {}
  }

  // 모든 이슈 가져오기(인생 전체 그래프) -> 정치인 api로 옮기면 좋을 듯
  // @Get()
  // @HttpCode(200)
  // async getAllIssues() {
  //   try {
  //     const issues = await this.issueService.getAllIssues();
  //     return issues;
  //   } catch (err) {}
  // }

  // 정치인 메인페이지, 등록된 이슈(10개 사건 그래프)
  @Get()
  @HttpCode(200)
  async getIssuesRegistered(@Query() issueQuery: QueryIssueDto) {
    try {
      const { targetPolitician, regiStatus, ranked, pageNum, perPage } =
        issueQuery;

      // 등록된 이슈
      if (regiStatus) {
        const issues = await this.issueService.getIssuesRegistered(
          targetPolitician,
          pageNum,
          perPage,
        );
        return issues;
      }

      // 미등록 이슈 top 3
      else if (ranked) {
        const issues = await this.issueService.getIssueNotRegisteredRanked(
          targetPolitician,
        );
        return issues;
      }

      // 미등록 이슈 나머지
      else {
        const issues = await this.issueService.getIssueNotRegistered(
          targetPolitician,
          pageNum,
          perPage,
        );
        return issues;
      }
    } catch (err) {}
  }

  // 이슈 등록 투표
  @Patch(':/issueId/regi')
  @HttpCode(200)
  async setIssueRegi(
    @Param('issueId') id: string,
    @Body() regi: SetIssueRegiDto,
  ) {
    try {
      const issue = await this.issueService.setIssueRegi(id, regi);
      return issue;
    } catch (err) {}
  }

  // 이슈 여론 투표
  @Patch(':/issueId/poll')
  @HttpCode(200)
  async setIssuePoll(
    @Param('issueId') id: string,
    @Body() poll: SetIssuePollDto,
  ) {
    try {
      const issue = await this.issueService.setIssuePoll(id, poll);
      return issue;
    } catch (err) {}
  }

  // (관리자) 이슈 내용 수정
  @Patch(':/issueId/content')
  async setIssueContent(
    @Param('issueId') id: string,
    @Body() content: SetIssueContentDto,
  ) {
    try {
      const issue = await this.issueService.setIssueContent(id, content);
      return issue;
    } catch (err) {}
  }

  // (관리자) 이슈 상태 수정
  @Patch(':/issueId/regiStatus')
  async setIssueRegiStatus(
    @Param('issueId') id: string,
    @Body() regiStatus: SetIssueRegiStatusDto,
  ) {
    try {
      const issue = await this.issueService.setIssueStatus(id, regiStatus);
      return issue;
    } catch (err) {}
  }
}
