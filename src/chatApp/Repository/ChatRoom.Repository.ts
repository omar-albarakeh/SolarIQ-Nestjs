import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from '../schema/chatroom.schema';

@Injectable()
export class ChatRoomRepository {
  constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>) {}


  async create(name: string, participants: string[]): Promise<ChatRoom> {
    const chatRoom = new this.chatRoomModel({ name, participants });
    return chatRoom.save();
  }

  async findById(id: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomModel.findById(id).populate('participants').exec();
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
    return chatRoom;
  }

  async addParticipant(roomId: string, userId: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomModel.findByIdAndUpdate(
      roomId,
      { $addToSet: { participants: userId } },
      { new: true },
    ).exec();

    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${roomId} not found`);
    }
    return chatRoom;
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomModel.find().populate('participants').exec();
  }

  async deleteById(id: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomModel.findByIdAndDelete(id).exec();
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
    return chatRoom;
  }

  async updateById(id: string, updates: Partial<ChatRoom>): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomModel
      .findByIdAndUpdate(id, { $set: updates }, { new: true })
      .exec();
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
    return chatRoom;
  }
}