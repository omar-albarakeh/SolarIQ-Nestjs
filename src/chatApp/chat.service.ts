import { Injectable } from '@nestjs/common';
import { ChatRoomRepository } from './Repository/ChatRoom.Repository';
import { MessageRepository } from './Repository/Message.Repository';
import { UserConnectionRepository } from './Repository/UserConnection.Repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly messageRepository: MessageRepository,
    private readonly userConnectionRepository: UserConnectionRepository,
  ) {}

  async createChatRoom(name: string, participants: string[]) {
    return this.chatRoomRepository.create(name, participants);
  }


  
  
}