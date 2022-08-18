import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/UserSchema';
import { CreateUserDto } from './dto/User.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAll(): User[] {
    return this.userService.getAllUsers();
  }

  @Get()
  getOne(@Param('email') email: string): User {
    return this.userService.getOne(email);
  }

  @Post()
  create(@Body() userData: CreateUserDto) {
    console.log('user created');
    return this.userService.create(userData);
  }
}
