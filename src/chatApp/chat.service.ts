import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    if (!name || !participants || participants.length === 0) {
      throw new BadRequestException('Name and participants are required');
    }
    return this.chatRoomRepository.create(name, participants);
  }

  async addMessage(senderId: string, roomId: string, content: string) {
    if (!senderId || !roomId || !content) {
      throw new BadRequestException('Sender ID, room ID, and content are required');
    }
    return this.messageRepository.create(senderId, roomId, content);
  }

  async getMessagesByRoomId(roomId: string, skip?: number, limit?: number) {
    if (!roomId) {
      throw new BadRequestException('Room ID is required');
    }
    return this.messageRepository.findByRoomId(roomId, skip, limit);
  }


  async connectUser(userId: string, socketId: string) {
    if (!userId || !socketId) {
      throw new BadRequestException('User ID and socket ID are required');
    }
    return this.userConnectionRepository.connectUser(userId, socketId);
  }

  async disconnectUser(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.userConnectionRepository.disconnectUser(userId);
  }

  async getChatRoomById(roomId: string) {
    if (!roomId) {
      throw new BadRequestException('Room ID is required');
    }
    return this.chatRoomRepository.findById(roomId);
  }

  async addParticipant(roomId: string, userId: string) {
    if (!roomId || !userId) {
      throw new BadRequestException('Room ID and user ID are required');
    }
    return this.chatRoomRepository.addParticipant(roomId, userId);
  }

  async getAllChatRooms() {
    return this.chatRoomRepository.findAll();
  }
}