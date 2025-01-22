import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatRoom } from '../schema/chatroom.schema';

@Injectable()
export class ChatRoomRepository {
  constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>) {}

  async create(name: string, participants: string[]): Promise<ChatRoom> {
    if (!participants.every((id) => Types.ObjectId.isValid(id))) {
      throw new BadRequestException('Invalid participant IDs');
    }

    const chatRoom = new this.chatRoomModel({ name, participants });
    return chatRoom.save();
  }

  async findById(id: string): Promise<ChatRoom> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid chat room ID');
    }

    const chatRoom = await this.chatRoomModel.findById(id).populate('participants').exec();
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
    return chatRoom;
  }

  async addParticipant(roomId: string, userId: string): Promise<ChatRoom> {
    if (!Types.ObjectId.isValid(roomId) || !Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid room ID or user ID');
    }

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

  async findAll(skip?: number, limit?: number): Promise<ChatRoom[]> {
    const query = this.chatRoomModel.find().populate('participants');
    if (skip !== undefined) query.skip(skip);
    if (limit !== undefined) query.limit(limit);
    return query.exec();
  }

  async deleteById(id: string): Promise<ChatRoom> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid chat room ID');
    }

    const chatRoom = await this.chatRoomModel.findByIdAndDelete(id).exec();
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
    return chatRoom;
  }

  async updateById(id: string, updates: Partial<ChatRoom>): Promise<ChatRoom> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid chat room ID');
    }

    const chatRoom = await this.chatRoomModel
      .findByIdAndUpdate(id, { $set: updates }, { new: true })
      .exec();
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
    return chatRoom;
  }
}