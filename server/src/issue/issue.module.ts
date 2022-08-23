import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Issue, issueSchema } from '../schemas/issue.schema';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Issue.name, schema: issueSchema }]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
