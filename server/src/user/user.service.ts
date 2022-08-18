import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from '../schemas/UserSchema';
import { CreateUserDto } from './dto/User.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  //   private users: User[] = [];
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = new this.userModel();

    user.userName = userData.userName;
    user.email = userData.email;
    user.password = userData.password;
    const result = await user.save();
    return result;
  }
}
