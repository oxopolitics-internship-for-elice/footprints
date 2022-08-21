import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<UserDocument>,
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
      console.log(profile);
      const user = await this.userModel.findOne({
        email: profile._json.kakao_account.email,
      });
      console.log(user);
      if (!user) {
        const kakaoEmail = profile._json && profile._json.kakao_account.email;
        const kakaoNickname = profile._json && profile._json.kakaoNickname;
        const kakaoPassword = 'kakaoPassword';
        const userData = {
          userName: kakaoNickname,
          email: kakaoEmail,
          password: kakaoPassword,
        };

        const user = await this.userModel.create(userData);
        done(null, user);
        return;
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
