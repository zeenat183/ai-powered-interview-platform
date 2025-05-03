import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateUserDto } from 'src/interfaces/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  findByUserId(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }).lean().exec();
  }

  updateUserByUserId(userId: string, update: Partial<UpdateUserDto>) {
    return this.userModel.findOneAndUpdate({ userId }, update, {
      new: true,
      lean: true,
    }).exec();
  }

  // Add more reusable DB methods here
}
