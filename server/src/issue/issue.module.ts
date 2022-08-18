import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';

@Module({
  providers: [IssueService]
})
export class IssueModule {}
