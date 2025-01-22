import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserConnection } from '../schema/userconnection.schema';

@Injectable()
export class UserConnectionRepository {
  constructor(@InjectModel(UserConnection.name) private userConnectionModel: Model<UserConnection>) {}


  async connectUser(userId: string, socketId: string): Promise<UserConnection> {

    const user = await this.userConnectionModel.db.model('User').findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let userConnection = await this.userConnectionModel.findOne({ user: userId }).exec();
    if (!userConnection) {
      userConnection = new this.userConnectionModel({ user: userId, socketId });
    } else {
      userConnection.socketId = socketId;
      userConnection.disconnectedAt = null;
    }
    return userConnection.save();
  }


  async disconnectUser(userId: string): Promise<UserConnection> {
    const userConnection = await this.userConnectionModel.findOne({ user: userId }).exec();
    if (!userConnection) {
      throw new NotFoundException(`User connection for user ID ${userId} not found`);
    }

    userConnection.disconnectedAt = new Date();
    return userConnection.save();
  }

  async findByUserId(userId: string): Promise<UserConnection | null> {
    return this.userConnectionModel.findOne({ user: userId }).exec();
  }

  async findAllConnectedUsers(): Promise<UserConnection[]> {
    return this.userConnectionModel.find({ disconnectedAt: null }).exec();
  }

  async deleteByUserId(userId: string): Promise<UserConnection> {
    const userConnection = await this.userConnectionModel.findOneAndDelete({ user: userId }).exec();
    if (!userConnection) {
      throw new NotFoundException(`User connection for user ID ${userId} not found`);
    }
    return userConnection;
  }
}