import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import { CreateUserDto } from 'src/user/dto/add.user.dto';
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

  async createRefreshToken(user: User) {
    const payload = { email: user.email, userToken: 'refreshToken' };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '1m',
    });

    const refreshToken = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await this.userService.updateRefreshToken(user.email, refreshToken);

    return refreshToken;
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

  async addUser(userData: CreateUserDto): Promise<object> {
    const user = await this.userService.create(userData);
    if (!user) {
      return { message: 'failed to create user' };
    }
    return { message: 'created successfully' };
  }
}
