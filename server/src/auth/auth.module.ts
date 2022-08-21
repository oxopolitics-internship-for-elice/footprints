import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { userSchema } from 'src/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'kakao',
      session: false,
    }),
    MongooseModule.forFeature([{ name: 'users', schema: userSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, UserService],
})
export class AuthModule {}
