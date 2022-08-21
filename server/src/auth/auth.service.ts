import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.getOne(email);
    if (!user) {
      return null;
    }
    return user;
  }

  async createLoginToken(user: User) {
    const payload = { email: user.email, userToken: 'loginToken' };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '60m',
    });
  }

  async onceToken(userProfile: any) {
    const payload = {
      email: userProfile.email,
      userName: userProfile.userName,
      userToken: 'onceToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '10m',
    });
  }

  
}
