import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { politicianSchema } from 'src/schemas/politician.schema';
import { PoliticianController } from './politician.controller';
import { PoliticianService } from './politician.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'politicians', schema: politicianSchema },
    ]),
  ],
  controllers: [PoliticianController],
  providers: [PoliticianService],
})
export class PoliticianModule {}
