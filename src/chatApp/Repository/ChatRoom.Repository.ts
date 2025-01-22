import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from '../schema/chatroom.schema';

@Injectable()
export class ChatRoomRepository {
  constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>) {}

  async create(name: string, participants: string[]) {
    const chatRoom = new this.chatRoomModel({ name, participants });
    return chatRoom.save();
  }

  async findById(id: string) {
    return this.chatRoomModel.findById(id).populate('participants').exec();
  }

  async addParticipant(roomId: string, userId: string) {
    return this.chatRoomModel.findByIdAndUpdate(
      roomId,
      { $addToSet: { participants: userId } },
      { new: true },
    );
  }

}