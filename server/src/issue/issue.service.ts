import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddIssueDto } from './dto/add.issue.dto';
import { Issue } from '../schemas';
@Injectable()
export class IssueService {
  private issues: Issue[] = [];

  getAllIssues(): Issue[] {
    return this.issues;
  }
}
