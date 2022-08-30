import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/add.user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';

@Controller('users')
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

  @UseGuards(JwtAuthGuard)
  @Get('/:email')
  async getOne(@Req() request, @Res() response, @Param('email') email: string) {
    try {
      const reqUser = request.user;
      console.log('req.user: ', reqUser);
      const userId = reqUser._id;
      const userById = await this.userService.getUserById(userId);
      console.log('userById: ', userById);
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
  async create(@Body() userData: CreateUserDto, @Res() response) {
    try {
      const user = await this.userService.create(userData);
      return response.status(HttpStatus.OK).json({
        message: 'found successfully',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
