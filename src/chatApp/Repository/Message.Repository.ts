import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schema/message.schema';

@Injectable()
export class MessageRepository {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async create(senderId: string, roomId: string, content: string): Promise<Message> {
    const sender = await this.messageModel.db.model('User').findById(senderId).exec();
    const chatRoom = await this.messageModel.db.model('ChatRoom').findById(roomId).exec();

    if (!sender || !chatRoom) {
      throw new NotFoundException('Sender or chat room not found');
    }

    const message = new this.messageModel({ sender: senderId, chatRoom: roomId, content });
    return message.save();
  }

 
  async findByRoomId(roomId: string, skip?: number, limit?: number): Promise<Message[]> {

    const chatRoom = await this.messageModel.db.model('ChatRoom').findById(roomId).exec();
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${roomId} not found`);
    }
    const query = this.messageModel.find({ chatRoom: roomId }).populate('sender');
    if (skip !== undefined) query.skip(skip);
    if (limit !== undefined) query.limit(limit);
    return query.exec();
  }


  async deleteById(id: string): Promise<Message> {
    const message = await this.messageModel.findByIdAndDelete(id).exec();
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async updateById(id: string, updates: Partial<Message>): Promise<Message> {
    const message = await this.messageModel
      .findByIdAndUpdate(id, { $set: updates }, { new: true })
      .exec();
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }
}