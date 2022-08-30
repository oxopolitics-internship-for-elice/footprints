import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/add.user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).lean();
    console.log(user);
    if (!user) {
      // throw new NotFoundException(`User with email ${email} not found`);
      return null;
    }
    return user;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) {
      return null;
    }
    return user;
  }
  async create(userData: CreateUserDto): Promise<User> {
    // const existingUser = this.getOne(userData.email);
    // if (existingUser) {
    //   throw new BadRequestException('중복된 이메일입니다.');
    // }
    const user = new this.userModel();
    user.userName = userData.userName;
    user.email = userData.email;
    user.password = userData.password;
    const result = await user.save();
    return result;
  }

  async updateRefreshToken(email: string, refreshToken: string) {
    await this.userModel.findOneAndUpdate({ email: email }, { refreshToken: refreshToken }, { new: true });
  }

  async setUserPoll(userId, issueId, poll) {
    const user = await this.getUserById(userId);
    const result = Object.keys(poll).find((key) => poll[key] === true);
    console.log('result from setUserpoll : ', result);

    // user poll 결과 반영
    // const update = {
    //   $set: {
    //     pollResult: { issueId: issueId, vote: result },
    //   },
    // };
    const pollResult = { issueId: issueId, vote: result };
    const newUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { pollResults: pollResult },
      },
      { new: true },
    );
    console.log('newUser: ', newUser);
    return newUser;
  }
}
