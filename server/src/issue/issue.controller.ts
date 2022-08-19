import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { response } from 'express';
import {
  CreateIssueDto,
  SetIssueContentDto,
  SetIssuePollDto,
  SetIssueRegiDto,
  PageOptionsDto,
  SetIssueStatusDto,
} from './dto';
import { IssueService } from './issue.service';

@Controller('issues')
export class IssueController {
  constructor(private issueService: IssueService) {}

  // 이슈 등록
  @Post()
  async addIssue(@Body() issueData: CreateIssueDto, @Res() response) {
    try {
      const issue = await this.issueService.addIssu(issueData);
      return response.status(HttpStatus.OK).json({
        message: 'create successfully',
        issue,
      });
    } catch (err) {}
  }

  // 모든 이슈 가져오기(인생 전체 그래프)
  @Get()
  async getAllIssues(@Res() response) {
    try {
      const issues = await this.issueService.getAllIssues();
      return response.status(HttpStatus.OK).json({ issues });
    } catch (err) {}
  }

  // 정치인 별 이슈 가져오기(10개 사건 그래프)
  @Get(':politicianId')
  async getIssuesByPolitician(
    @Param('politicianId') politicianId: string,
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() response,
  ) {
    try {
      const issues = await this.issueService.getIssuesByPolitician(
        politicianId,
        pageOptionsDto,
      );
      return response.status(HttpStatus.OK).json({ issues });
    } catch (err) {}
  }

  @Patch(':issueId/content')
  async setIssueContent(
    @Param('issueId') id: string,
    @Body() setIssueContentDto: SetIssueContentDto,
    @Res() response,
  ) {
    try {
      const issue = await this.issueService.setIssueContent(
        id,
        setIssueContentDto,
      );
    } catch (err) {}
  }

  @Patch(':issueId/status')
  setIssueStatus(
    @Param('issueId') id: string,
    @Body() setIssueStatusDto: SetIssueStatusDto,
  ): object {
    return this.issueService.setIssueStatus(id, setIssueStatusDto);
  }

  @Patch(':issueId/poll')
  setIssuePoll(
    @Param('issueId') id: string,
    @Body() setIssuePollDto: SetIssuePollDto,
  ): object {
    return this.issueService.setIssuePoll(id, setIssuePollDto);
  }

  @Patch(':issueId/regi')
  setIssueRegi(
    @Param('issueId') id: string,
    @Body() setIssueRegiDto: SetIssueRegiDto,
  ): object {
    return this.issueService.setIssueRegi(id, setIssueRegiDto);
  }
}
