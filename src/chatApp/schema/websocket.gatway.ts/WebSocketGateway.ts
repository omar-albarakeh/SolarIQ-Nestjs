import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../message.schema';
import { ChatRoom } from '../chatroom.schema';
import { UserConnection } from '../userconnection.schema';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
    @InjectModel(UserConnection.name) private userConnectionModel: Model<UserConnection>,
  ) {}

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() data: { userId: string, roomId: string }) {
    const { userId, roomId } = data;
    const userConnection = await this.userConnectionModel.findOne({ user: userId });
    if (userConnection) {
      userConnection.socketId = this.server.sockets.sockets[userConnection.socketId].id;
      await userConnection.save();
    }
    this.server.to(roomId).emit('userJoined', { userId, roomId });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: { senderId: string, roomId: string, content: string }) {
    const { senderId, roomId, content } = data;
    const message = new this.messageModel({
      sender: senderId,
      chatRoom: roomId,
      content,
      timestamp: new Date(),
    });
    await message.save();
    this.server.to(roomId).emit('newMessage', message);
  }
}