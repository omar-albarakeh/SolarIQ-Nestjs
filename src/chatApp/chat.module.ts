import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRoomRepository } from './Repository/ChatRoom.Repository';
import { MessageRepository } from './Repository/Message.Repository';
import { UserConnectionRepository } from './Repository/UserConnection.Repository';
import { ChatRoom, ChatRoomSchema } from './schema/chatroom.schema';
import { Message, MessageSchema } from './schema/message.schema';
import { UserConnection, UserConnectionSchema } from './schema/userconnection.schema';
import { ChatGateway } from './websocket.gatway/WebSocketGateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
      { name: Message.name, schema: MessageSchema },
      { name: UserConnection.name, schema: UserConnectionSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatRoomRepository,
    MessageRepository,
    UserConnectionRepository,
    ChatGateway,
  ],
  exports: [
    ChatService,
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
      { name: Message.name, schema: MessageSchema },
      { name: UserConnection.name, schema: UserConnectionSchema },
    ]),
  ],
})
export class ChatModule {}