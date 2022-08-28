import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { issueSchema, Issue } from 'src/schemas/issue.schema';
import { politicianSchema, Politician } from 'src/schemas/politician.schema';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Issue.name, schema: issueSchema },
      { name: Politician.name, schema: politicianSchema },
    ]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
