import {
  Get,
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './guard/kakao.auth.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger('starting kakao-auth-controller');
  constructor(private readonly authService: AuthService) {}

  @Get('/kakao')
  @HttpCode(200)
  @UseGuards(new KakaoAuthGuard('kakao'))
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('/kakao/callback')
  @HttpCode(200)
  @UseGuards(new KakaoAuthGuard('kakao'))
  async kakaoCallback(@Req() req: any, @Res() res: any): Promise<any> {
    res.redirect(``)
  }
}
