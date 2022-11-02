import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Politician, politicianSchema } from '../schemas/politician.schema';
import { User, userSchema } from '../schemas/user.schema';
import { UserService } from '../user/user.service';
import { PoliticianController } from './politician.controller';
import { PoliticianService } from './politician.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Politician.name, schema: politicianSchema },
      { name: User.name, schema: userSchema },
    ]),
    AuthModule,
  ],
  controllers: [PoliticianController],
  providers: [PoliticianService, UserService],
})
export class PoliticianModule {}
