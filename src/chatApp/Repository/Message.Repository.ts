import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schema/message.schema';

@Injectable()
export class MessageRepository {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async create(senderId: string, roomId: string, content: string) {
    const message = new this.messageModel({ sender: senderId, chatRoom: roomId, content });
    return message.save();
  }

  async findByRoomId(roomId: string) {
    return this.messageModel.find({ chatRoom: roomId }).populate('sender').exec();
  }
}