import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  async createChatRoom(@Body('name') name: string, @Body('participants') participants: string[]) {
    return this.chatService.createChatRoom(name, participants);
  }


}