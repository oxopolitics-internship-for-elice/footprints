import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}
  @Post()
  async create(@Body issueData: CreateIssueDto, @Res() response) {
    try {
      const issue = await this.issueService.create(issueData);
      return response.json.status(HttpStatus.OK).json({
        message: 'issue created successfully',
        issue,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: number) {
    try {
      const issue = await this.issueService.getOne(id);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'issue found successfully', issue });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAll(@Res() response) {
    try {
      const issues = await this.issueService.getAllIssues();
      return response
        .status(HttpStatus.OK)
        .json({ message: 'issues found successfully', issues });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch('/:id')
  async patch(
    @Res() response,
    @Param('id') id: number,
    @Body updateData: UpdateIssueDto,
  ) {
    try {
      const issue = await this.issueService.update(updateData);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Updated issue successfully', issue });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async remove(@Res() response, @Param('id') id: number) {
    try {
      const issue = await this.issueService.deleteOne(id);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Delete successfully', issue });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
