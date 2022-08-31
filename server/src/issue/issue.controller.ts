import { Body, Controller, Get, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { AddIssueDto } from './dto/issue.addIssue.dto';
import { QueryIssueDto } from './dto/issue.paginationQuery.dto';
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

  // 이슈 등록 찬반 투표

  // 부족별 그래프
  // @Get('/graphTribe')
  // async getGraphTribe(@Res() response) {
  //   try {
  //     const graphTribe = await this.issueService.getGraphTribe();
  //     return response.json(graphTribe);
  //   } catch (err) {
  //     return response.status(err.status).json(err.response);
  //   }
  // }

  

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
          return response.json({ message: 'success', hasVoted: false });
        } else {
          throw new Error('failed to register issue');
        }
      } else {
        return response.json({ message: 'already registered', hasVoted: true });
      }
    } catch (err) {
      console.log(err);
    }
  }


  //그래프 점 클릭시 모달창에서 쓸 이슈 및 투표 정보(pro, con 정보)
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

  // 이슈 여론 투표(pro, con 변경 가능)
  @UseGuards(JwtAuthGuard)
  @Patch('/:issueId/poll')
  async setIssuePoll(
    @Param('issueId') issueId: string,
    @Body() poll: SetIssuePollDto,
    @Req() request,
    @Res() response,
  ) {
    try {
      const userId = request.user._id;
      const tribe = request.user.tribe;
      const issueUser = await this.userService.getUserPollResult(userId, issueId);
      console.log('issueUser: ', issueUser);
      let vote = '';
      for (const [key, value] of Object.entries(poll)) {
        if (value === true) {
          vote = key;
        }
      }

      console.log('vote:', vote);

      //유저id와 이슈id로 조회되는 유저 정보가 없다면 투표 결과 등록
      if (Object.keys(issueUser).length === 0) {
        const issueUser = await this.userService.setUserPoll(userId, issueId, poll);
        const issue = await this.issueService.setIssuePoll(id, poll, tribe);
        if (issueUser && issue) {
          return response.json({ message: 'success', now: vote });
        } else {
          throw new Error('failed to set user info or issue');
        }
      } else {
        // 이슈id로 조회되는 유저정보에 vote필드가 있고 현재 투표 결과와 다르다면 업데이트
        const voteExist = issueUser[0].pollResults.find((key) => key.issueId === issueId).vote;

        if (voteExist === vote) {
          return response.json({ message: 'same vote' });
        } else {
          const newResult = await this.userService.updateUserPoll(userId, issueId, vote);
          if (newResult) {
            return response.json({ message: 'success', before: voteExist, now: vote });
          }
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  // 이슈 여론 투표
  @UseGuards(JwtAuthGuard)
  @Patch('/:issueId/poll')
  async setIssuePoll(@Param('issueId') id: string, @Body() poll: SetIssuePollDto, @Res() response, @Req() request) {
    try {
      const tribe = request.user.tribe;
      const issue = await this.issueService.setIssuePoll(id, poll, tribe);
      if (issue) {
        return response.json({ message: 'success' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 로그인한 유저의 이슈 여론 투표
  // @UseGuards(JwtAuthGuard)
  // @Patch('/:issueId/user-poll')
  // async setUserIssuePoll(
  //   @Param('issueId') issueId: string,
  //   @Body() poll: SetIssuePollDto,
  //   @Req() request,
  //   @Res() response,
  // ) {
  //   try {
  //     const userId = request.user._id;
  //     const issueUser = await this.userService.getUserPollResult(userId, issueId);

  //     if (Object.keys(issueUser).length === 0) {
  //       const userPoll = await this.userService.setUserPoll(userId, issueId, poll);
  //       // const issue = await this.issueService.setIssuePoll(issueId, poll);
  //       if (userPoll && issue) {
  //         return response.json({ message: 'success', possible: false });
  //       }
  //     } else {
  //       return response.json({ message: 'failure - already voted', possible: false });
  //     }
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }


  // 로그인한 유저의 이슈 투표 취소
  @UseGuards(JwtAuthGuard)
  @Patch('/:issueId/abort')
  async deleteUserIssuePoll(@Param('issueId') issueId: string, @Req() request, @Res() response) {
    try {
      const userId = request.user._id;
      // const issueUser = await this.userService.getUserPollResult(userId, issueId);
      const result = await this.userService.deleteUserPollResult(userId, issueId);
      //해당 이슈에 대한 투표기록이 삭제되면 true 값이 반환됨
      if (result) {
        response.json({ message: `vote for ${issueId} has successfully deleted`, possible: true });
      } else {
        return response.json({ message: `vote for ${issueId} has failed`, possible: false });
      }
    } catch (err) {
      throw new Error(err);
    }
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
