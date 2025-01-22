import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return await user.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async findUserByName(name: string): Promise<User | null> {
    return await this.userModel.findOne({ name }).exec();
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    return await this.userModel
      .findByIdAndUpdate(userId, { $set: updates }, { new: true })
      .exec();
  }

  async blockUser(id: string): Promise<User> {
  const user = await this.userModel.findById(id).select('name email blocked');

  if (!user) {
    throw new Error('User not found');
  }
  if (user.blocked) {
    throw new Error('User is already blocked');
  }

  user.blocked = true;
  return await user.save();
}


async unblockUser(id: string): Promise<User> {
  const user = await this.userModel.findById(id).select('name email blocked');

  if (!user) {
    throw new Error('User not found');
  }
  if (!user.blocked) {
    throw new Error('User is already unblocked');
  }

  user.blocked = false;
  return await user.save();
}
}