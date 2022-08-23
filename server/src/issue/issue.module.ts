import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { issueSchema } from 'src/schemas/issue.schema';

import { IssueController } from './issue.controller';

import { IssueService } from './issue.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'issues', schema: issueSchema }]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
