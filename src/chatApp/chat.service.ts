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

  async addMessage(senderId: string, roomId: string, content: string) {
    return this.messageRepository.create(senderId, roomId, content);
  }

  async getMessagesByRoomId(roomId: string) {
    return this.messageRepository.findByRoomId(roomId);
  }

  async connectUser(userId: string, socketId: string) {
    return this.userConnectionRepository.connectUser(userId, socketId);
  }

  async disconnectUser(userId: string) {
    return this.userConnectionRepository.disconnectUser(userId);
  }

  async getChatRoomById(roomId: string) {
    return this.chatRoomRepository.findById(roomId);
  }

  
  
}