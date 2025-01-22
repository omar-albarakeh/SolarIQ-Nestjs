import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from '../schema/chatroom.schema';

@Injectable()
export class ChatRoomRepository {
  constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>) {}

}


