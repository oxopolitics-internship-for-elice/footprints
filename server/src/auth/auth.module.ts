import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, userSchema } from '../schemas/user.schema';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'kakao',
      session: false,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, UserService, JwtService],
  exports: [AuthService, PassportModule, JwtModule, UserService],
})
export class AuthModule {}
