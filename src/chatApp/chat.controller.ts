import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  async createChatRoom(@Body('name') name: string, @Body('participants') participants: string[]) {
    return this.chatService.createChatRoom(name, participants);
  }

  @Post('messages')
  async addMessage(
    @Body('senderId') senderId: string,
    @Body('roomId') roomId: string,
    @Body('content') content: string,
  ) {
    return this.chatService.addMessage(senderId, roomId, content);
  }

  @Get('rooms/:roomId/messages')
  async getMessagesByRoomId(
    @Param('roomId') roomId: string,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    return this.chatService.getMessagesByRoomId(roomId, skip, limit);
  }

  @Post('users/connect')
  async connectUser(@Body('userId') userId: string, @Body('socketId') socketId: string) {
    return this.chatService.connectUser(userId, socketId);
  }

  @Post('users/disconnect')
  async disconnectUser(@Body('userId') userId: string) {
    return this.chatService.disconnectUser(userId);
  }

  @Get('rooms/:roomId')
  async getChatRoomById(@Param('roomId') roomId: string) {
    return this.chatService.getChatRoomById(roomId);
  }

  @Post('rooms/:roomId/participants')
  async addParticipant(@Param('roomId') roomId: string, @Body('userId') userId: string) {
    return this.chatService.addParticipant(roomId, userId);
  }

  @Get('rooms')
  async getAllChatRooms() {
    return this.chatService.getAllChatRooms();
  }
}