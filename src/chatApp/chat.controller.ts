import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  CreateChatRoomDto,
  AddMessageDto,
  AddParticipantDto,
  PaginationDto,
} from './chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  async createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatService.createChatRoom(
      createChatRoomDto.name,
      createChatRoomDto.participants,
    );
  }


  @Post('messages')
  async addMessage(@Body() addMessageDto: AddMessageDto) {
    return this.chatService.addMessage(
      addMessageDto.senderId,
      addMessageDto.roomId,
      addMessageDto.content,
    );
  }


  @Get('rooms/:roomId/messages')
  async getMessagesByRoomId(
    @Param('roomId') roomId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.chatService.getMessagesByRoomId(
      roomId,
      paginationDto.skip,
      paginationDto.limit,
    );
  }


  @Post('users/:userId/connect')
  async connectUser(
    @Param('userId') userId: string,
    @Body('socketId') socketId: string,
  ) {
    return this.chatService.connectUser(userId, socketId);
  }

  @Post('users/:userId/disconnect')
  async disconnectUser(@Param('userId') userId: string) {
    return this.chatService.disconnectUser(userId);
  }


  @Get('rooms/:roomId')
  async getChatRoomById(@Param('roomId') roomId: string) {
    const chatRoom = await this.chatService.getChatRoomById(roomId);
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${roomId} not found`);
    }
    return chatRoom;
  }


  @Put('rooms/:roomId/participants')
  async addParticipant(
    @Param('roomId') roomId: string,
    @Body() addParticipantDto: AddParticipantDto,
  ) {
    return this.chatService.addParticipant(roomId, addParticipantDto.userId);
  }

  @Get('rooms')
  async getAllChatRooms() {
    return this.chatService.getAllChatRooms();
  }
}