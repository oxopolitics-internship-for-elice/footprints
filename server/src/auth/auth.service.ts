import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.getOne(email);
    if (!user) {
      return null;
    }
    return user;
  }

  async createLoginToken( user: )
}
