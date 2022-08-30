import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { issueSchema, Issue } from 'src/schemas/issue.schema';
import { politicianSchema, Politician } from 'src/schemas/politician.schema';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { userSchema, User } from 'src/schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Issue.name, schema: issueSchema },
      { name: Politician.name, schema: politicianSchema },
      { name: User.name, schema: userSchema },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [IssueController],
  providers: [IssueService, UserService],
})
export class IssueModule {}
