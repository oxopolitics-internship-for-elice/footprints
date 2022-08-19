import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  AddIssueDto,
  SetIssueContentDto,
  SetIssuePollDto,
  SetIssueRegiDto,
  PageOptionsDto,
  SetIssueStatusDto,
} from './dto';
import { IssuesService } from './issues.service';

@Controller('issues')
export class IssuesController {
  constructor(private issueService: IssuesService) {}

  // 이슈 등록
  @Post()
  addIssue(@Body() addIssueDto: AddIssueDto): object {
    return this.issueService.addIssue(addIssueDto);
  }

  // 모든 이슈 가져오기(인생 전체 그래프)
  @Get()
  getAllIssues(): object {
    return this.issueService.getIssues();
  }

  // 정치인 별 이슈 가져오기(10개 사건 그래프)
  @Get(':politicianId')
  getIssuesByPolitician(
    @Param('politicianId') politicianId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): object {
    return this.issueService.getIssuesByPolitician(
      politicianId,
      pageOptionsDto,
    );
  }

  @Patch(':issueId/content')
  setIssueContent(
    @Param('issueId') id: string,
    @Body() setIssueContentDto: SetIssueContentDto,
  ): object {
    return this.issueService.setIssueContent(id, setIssueContentDto);
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
