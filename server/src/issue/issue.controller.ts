import { Body, Controller, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { QueryIssueDto } from './dto/issue.paginationQuery.dto';
import { SetIssueContentDto } from './dto/issue.setIssueContent.dto';
import { SetIssuePollDto } from './dto/issue.setIssuePoll.dto';
import { SetIssueRegiDto } from './dto/issue.setIssueRegi.dto';
import { SetIssueRegiStatusDto } from './dto/issue.setIssueRegiStatus.dto';
import { IssueService } from './issue.service';

@Controller('issues')
export class IssueController {
  constructor(private issueService: IssueService) {}

  // 이슈 등록
  @UseGuards(JwtAuthGuard)
  @Post()
  async addIssue(@Body() issueData: AddIssueDto, @Res() response) {
    try {
      const issue = await this.issueService.addIssue(issueData);
      if (issue) {
        return response.json({ message: 'success' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 정치인 메인페이지, 등록된 이슈(10개 사건 그래프)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getIssues(@Query() issueQuery: QueryIssueDto, @Res() response) {
    try {
      const { targetPolitician, regiStatus, ranked, pageOptions } = issueQuery;

      // 메인페이지 모든 정치인, 인생 전체 그래프
      if (!targetPolitician) {
        const issues = await this.issueService.getAllIssues();
        return response.json(issues);
      }

      // 등록된 이슈
      if (regiStatus && !ranked) {
        const issues = await this.issueService.getIssuesRegistered(targetPolitician, pageOptions);
        return response.json(issues);
      }

      // 미등록 이슈 top 3
      else if (!regiStatus && ranked) {
        const issues = await this.issueService.getIssueNotRegisteredRanked(targetPolitician);
        return response.json(issues);
      }

      // 미등록 이슈 나머지
      else if (!regiStatus && !ranked) {
        const issues = await this.issueService.getIssueNotRegistered(targetPolitician, pageOptions);
        return response.json(issues);
      } else {
        throw new Error('bad request');
      }
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // 이슈 등록 투표
  @UseGuards(JwtAuthGuard)
  @Patch('/:issueId/regi')
  async setIssueRegi(@Param('issueId') id: string, @Body() regi: SetIssueRegiDto, @Res() response) {
    try {
      const issue = await this.issueService.setIssueRegi(id, regi);
      if (issue) {
        return response.json({ message: 'success' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 이슈 여론 투표
  @UseGuards(JwtAuthGuard)
  @Patch('/:issueId/poll')
  async setIssuePoll(@Param('issueId') id: string, @Body() poll: SetIssuePollDto, @Res() response) {
    try {
      const issue = await this.issueService.setIssuePoll(id, poll);
      if (issue) {
        return response.json({ message: 'success' });
      }
    } catch (err) {}
  }

  // (관리자) 이슈 내용 수정
  // @Patch('/:issueId/content')
  // async setIssueContent(@Param('issueId') id: string, @Body() content: SetIssueContentDto) {
  //   try {
  //     // const issue = await this.issueService.setIssueContent(id, content);
  //     return {};
  //   } catch (err) {}
  // }

  // (관리자) 이슈 상태 수정
  // @Patch('/:issueId/regiStatus')
  // async setIssueRegiStatus(@Param('issueId') id: string, @Body() regiStatus: SetIssueRegiStatusDto) {
  //   try {
  //     // const issue = await this.issueService.setIssueStatus(id, regiStatus);
  //     return {};
  //   } catch (err) {}
  // }
}
