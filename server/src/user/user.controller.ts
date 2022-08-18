import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/UserSchema';
import { CreateUserDto } from './dto/User.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll(@Res() response) {
    try {
      const users = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'found successfully',
        users,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:email')
  async getOne(@Res() response, @Param('email') email: string) {
    try {
      const user = await this.userService.getOne(email);
      return response.status(HttpStatus.OK).json({
        message: 'found successfully',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  create(@Body() userData: CreateUserDto) {
    console.log('user created');
    return this.userService.create(userData);
  }
}
