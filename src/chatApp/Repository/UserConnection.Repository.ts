import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserConnection } from '../schema/userconnection.schema';

@Injectable()
export class UserConnectionRepository {
  constructor(@InjectModel(UserConnection.name) private userConnectionModel: Model<UserConnection>) {}

  async connectUser(userId: string, socketId: string) {
    let userConnection = await this.userConnectionModel.findOne({ user: userId });
    if (!userConnection) {
      userConnection = new this.userConnectionModel({ user: userId, socketId });
    } else {
      userConnection.socketId = socketId;
    }
    return userConnection.save();
  }

  async disconnectUser(userId: string) {
    const userConnection = await this.userConnectionModel.findOne({ user: userId });
    if (userConnection) {
      userConnection.disconnectedAt = new Date();
      return userConnection.save();
    }
  }


}