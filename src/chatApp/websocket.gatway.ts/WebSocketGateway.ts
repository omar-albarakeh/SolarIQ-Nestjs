import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schema/message.schema';
import { ChatRoom } from '../schema/chatroom.schema';
import { UserConnection } from '../schema/userconnection.schema';

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
  async handleJoinRoom(
    @MessageBody() data: { userId: string; roomId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { userId, roomId } = data;

    socket.join(roomId);

    const userConnection = await this.userConnectionModel.findOne({ user: userId });
    if (userConnection) {
      userConnection.socketId = socket.id;
      await userConnection.save();
    }

    this.server.to(roomId).emit('userJoined', { userId, roomId });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { senderId: string; roomId: string; content: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { senderId, roomId, content } = data;

    const sender = await this.userConnectionModel.findOne({ user: senderId });
    const room = await this.chatRoomModel.findById(roomId);

    if (!sender || !room) {
      socket.emit('error', { message: 'Sender or room not found' });
      return;
    }

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