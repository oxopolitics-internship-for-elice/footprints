import { Injectable } from '@nestjs/common';
import { Issue } from 'src/schemas/IssueSchmea';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
@Injectable()
export class IssueService {
  private issues: Issue[] = [];

  getAllIssues(): Issue[] {
    return this.issues;
  }

  getOne(id: number): Issue {
    const issue = this.issues.find((issue) => issue.id === Number(id));
  }
}
