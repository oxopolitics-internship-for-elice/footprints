import { Get, Controller, HttpStatus, UseGuards, Req, Res, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './guard/kakao.auth.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger('starting kakao-auth-controller');
  constructor(private readonly authService: AuthService) {}

  @Get('/kakao')
  @UseGuards(new KakaoAuthGuard('kakao'))
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('/kakao/callback')
  @UseGuards(new KakaoAuthGuard('kakao'))
  async kakaoCallback(@Req() req: any, @Res() res: any) {
    // console.log('req.user: ', req.user);
    // console.log('accessToken', req.user.accessToken);
    // console.log('refresh_token', req.user.refreshToken);
    if (req.user.type === 'login') {
      res.cookie('access_token', req.user.accessToken);
      res.cookie('refresh_token', req.user.refreshToken);
    } else {
      res.cookie('once_token', req.user.onceToken);
    }

    // res.redirect(`${process.env.CLIENT_HOST}?access=${req.user.accessToken}&refresh=${req.user.refreshToken}`);
    res.redirect(`${process.env.CLIENT_HOST}`);
    res.end();
  }
}
