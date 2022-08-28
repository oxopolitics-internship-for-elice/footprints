import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Issue, issueSchema } from 'src/schemas/issue.schema';
import { Politician, politicianSchema } from 'src/schemas/politician.schema';
import { PoliticianController } from './politician.controller';
import { PoliticianService } from './politician.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Politician.name, schema: politicianSchema },
      { name: Issue.name, schema: issueSchema },
    ]),
  ],
  controllers: [PoliticianController],
  providers: [PoliticianService],
})
export class PoliticianModule {}
