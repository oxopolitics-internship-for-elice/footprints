import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';

export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<UserDocument>,
  ) {
    super({
      clientId: process.env.KAKAO_ID,
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
      const user = await this.userModel.findOne(
        profile._json.kakao_account.email,
      );
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
