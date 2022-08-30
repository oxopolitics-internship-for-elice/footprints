import { Body, Controller, Get, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { QueryIssueDto } from './dto/issue.query.dto';
import { SetIssueContentDto } from './dto/issue.setIssueContent.dto';
import { SetIssuePollDto } from './dto/issue.setIssuePoll.dto';
import { SetIssueRegiDto } from './dto/issue.setIssueRegi.dto';
import { SetIssueRegiStatusDto } from './dto/issue.setIssueRegiStatus.dto';
import { IssueService } from './issue.service';
import { UserService } from 'src/user/user.service';
import { request } from 'http';

@Controller('issues')
export class IssueController {
  constructor(private issueService: IssueService, private userService: UserService) {}

  // 이슈 등록
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

  // 이슈 등록 찬반 투표
  @UseGuards(JwtAuthGuard)
  @Patch('/:issueId/regi')
  async setIssueRegi(@Param('issueId') id: string, @Body() regi: SetIssueRegiDto, @Req() request, @Res() response) {
    try {
      //유저정보에서 해당 이슈id로 조회되면 투표를 한 유저이므로 다시 찬반 투표를 할 수 없음
      const userId = request.user._id;
      const issueUser = await this.userService.getUserPollResult(userId, id);

      if (Object.keys(issueUser).length === 0) {
        const userIssue = await this.userService.setUserIssueRegi(userId, id, regi);
        const issue = await this.issueService.setIssueRegi(id, regi);
        if (userIssue && issue) {
          return response.json({ message: 'success' });
        } else {
          throw new Error('failed to register issue');
        }
      } else {
        return response.json({ message: 'already registered' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  //그래프 점 클릭시 모달창에서 쓸 이슈 및, 투표 정보(pro, con 정보)
  @UseGuards(JwtAuthGuard)
  @Get('/:issueId/poll')
  async getIssuePoll(@Param('issueId') issueId: string, @Req() request, @Res() response) {
    const userId = request.user._id;
    const issueUser = await this.userService.getUserPollResult(userId, issueId);

    if (Object.keys(issueUser).length !== 0) {
      const pollResult = issueUser[0].pollResults.find((key) => key.issueId === issueId);

      return response.json({ message: 'success', pollResult: pollResult.vote });
    } else {
      return response.json({ message: 'first', pollResult: null });
    }
  }

  // (관리자) 이슈 내용 수정
  @Patch('/:issueId/content')
  async setIssueContent(@Param('issueId') id: string, @Body() content: SetIssueContentDto) {
    try {
      // const issue = await this.issueService.setIssueContent(id, content);
      return {};
    } catch (err) {}
  }

  // (관리자) 이슈 상태 수정
  @Patch('/:issueId/regiStatus')
  async setIssueRegiStatus(@Param('issueId') id: string, @Body() regiStatus: SetIssueRegiStatusDto) {
    try {
      // const issue = await this.issueService.setIssueStatus(id, regiStatus);
      return {};
    } catch (err) {}
  }
}
