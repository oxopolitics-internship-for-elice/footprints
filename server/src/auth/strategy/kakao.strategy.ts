import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    // @InjectModel('users')
    // private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.KAKAO_CB_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    try {
      // console.log(profile);
      const kakaoEmail = profile._json && profile._json.kakao_account.email;
      const kakaoNickname = profile._json && profile._json.kakaoNickname;
      const kakaoPassword = 'kakaoPassword';
      const userProfile = {
        userName: kakaoNickname,
        email: kakaoEmail,
        password: kakaoPassword,
      };
      const user = await this.authService.validateUser(kakaoEmail);
      // console.log('user from strategy: ', user);
      if (!user) {
        const onceToken = this.authService.onceToken(userProfile);
        const result = await this.authService.addUser(userProfile);
        return { onceToken, message: result, type: 'onceToken' };
      }

      const accessToken = await this.authService.createLoginToken(user);
      const refreshToken = await this.authService.createRefreshToken(user);

      return { accessToken, refreshToken, type: 'login' };
    } catch (error) {
      done(error);
    }
  }
}
