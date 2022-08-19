import { Injectable } from '@nestjs/common';
import { Issue } from '../schemas';
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
