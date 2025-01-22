import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
  async getMessagesByRoomId(@Param('roomId') roomId: string) {
    return this.chatService.getMessagesByRoomId(roomId);
  }

}