import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { issueSchema } from 'src/schemas/issueSchema';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: issueSchema }]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
