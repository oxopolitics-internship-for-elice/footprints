import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService, private userService: UserService, private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    // const cookie = req.cookies;
    // console.log('cookie: ', cookie);
    // console.log('req.headers: ', req.headers);
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException('토큰 전송 에러', HttpStatus.UNAUTHORIZED);
    }

    // const token = cookie.access_token;
    // console.log('token: ', token);
    const token = authorization.replace('Bearer ', '');
    const validatedToken = await this.validate(token);
    // console.log('validatedToken', validatedToken);

    //검증을 거친 토큰이 재발급된 토큰이면 헤더에 accesstoken으로 새로 발급한 토큰을 붙임
    if (validatedToken.reissueToken) {
      res.setHeader('accessToken', validatedToken.newToken);
      res.setHeader('reissuedToken', true);
    } else {
      res.setHeader('reissuedToken', false);
    }
    req.user = validatedToken.user ? validatedToken.user : validatedToken;
    return true;
  }

  async validate(token: string) {
    try {
      // console.log('token from validate:', token);
      // console.log('type of token: ', typeof token);
      // const tokenVerify = await this.authService.validateToken(token);
      const tokenVerify = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      // console.log('verified token: ', tokenVerify);

      const tokenExpirationTime = new Date(tokenVerify['exp'] * 1000);

      const currentTime = new Date();
      const timeToRemain = Math.floor((tokenExpirationTime.getTime() - currentTime.getTime()) / 1000 / 60);
      // console.log(timeToRemain);

      //accesstoken이 로그인토큰이 아니라면 verify 결과 반환
      if (tokenVerify.userToken !== 'loginToken') {
        return tokenVerify;
      }

      //accesstoken의 만료 시간이 5분 미만으로 남았다면 refreshtoken 재발급
      const LIMIT = 5;
      if (timeToRemain < LIMIT) {
        const user = await this.userService.getOne(tokenVerify.email);
        const refreshToken = await this.authService.validateToken(user.refreshToken);
        const refreshTokenUser = await this.userService.getOne(refreshToken.email);
        const newToken = await this.authService.createLoginToken(refreshTokenUser);

        return {
          user: refreshTokenUser,
          newToken,
          reissueToken: true,
        };
      } else {
        const user = await this.userService.getOne(tokenVerify.email);
        return {
          user,
          reissueToken: false,
        };
      }
    } catch (error) {
      switch (error.message) {
        case 'invalid token':
          throw new HttpException(' 유효하지 않은 토큰입니다', 401);

        case 'expired token':
          throw new HttpException('만료된 토큰입니다', 410);

        default:
          throw new HttpException(`${error}`, 401);
      }
    }
  }
}
