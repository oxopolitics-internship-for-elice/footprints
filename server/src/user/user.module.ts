import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [forwardRef(() => AuthModule), MongooseModule.forFeature([{ name: User.name, schema: userSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
