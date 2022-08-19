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
      const issue = await this.issueService.addIssue(issueData);
      return response.status(HttpStatus.OK).json({
        message: 'create successfully',
        issue,
      });
    } catch (err) {}
  }

  // 모든 이슈 가져오기(인생 전체 그래프) -> 정치인 api로 옮기면 좋을 듯
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

  // (관리자) 이슈 내용 수정
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
      return response.status(HttpStatus.OK).json({
        message: 'successfully updated',
        issue,
      });
    } catch (err) {}
  }

  // (관리자) 이슈 상태 수정
  @Patch(':issueId/status')
  async setIssueStatus(
    @Param('issueId') id: string,
    @Body() setIssueStatusDto: SetIssueStatusDto,
    @Res() response,
  ) {
    try {
      const issue = await this.issueService.setIssueStatus(
        id,
        setIssueStatusDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'successfully updated',
        issue,
      });
    } catch (err) {}
  }

  // 이슈 등록 투표
  @Patch(':issueId/regi')
  async setIssueRegi(
    @Param('issueId') id: string,
    @Body() setIssueRegiDto: SetIssueRegiDto,
  ) {
    try {
      const issue = await this.issueService.setIssueRegiDto(
        id,
        setIssueRegiDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'successfully updated',
        issue,
      });
    } catch (err) {}
  }
  
  // 이슈 여론 투표
  @Patch(':issueId/poll')
  async setIssuePoll(
    @Param('issueId') id: string,
    @Body() setIssuePollDto: SetIssuePollDto,
    @Res() response,
  ) {
    try {
      const issue = await this.issueService.setIssuePoll(id, setIssuePollDto);
      return response.status(HttpStatus.OK).json({
        message: 'successfully updated',
        issue,
      });
    } catch (err) {}
  }

  
}
