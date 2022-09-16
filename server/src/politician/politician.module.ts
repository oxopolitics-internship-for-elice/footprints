import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Politician, politicianSchema } from 'src/schemas/politician.schema';
import { User, userSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
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
