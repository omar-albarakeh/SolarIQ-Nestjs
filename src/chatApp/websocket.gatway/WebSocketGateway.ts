import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schema/message.schema';
import { ChatRoom } from '../schema/chatroom.schema';
import { UserConnection } from '../schema/userconnection.schema';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  port: parseInt(process.env.WS_PORT || '8080'),
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
    @InjectModel(UserConnection.name) private userConnectionModel: Model<UserConnection>,
  ) {}


  async handleConnection(socket: Socket) {
    this.logger.log(`Client connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);


    const userConnection = await this.userConnectionModel.findOne({ socketId: socket.id });
    if (userConnection) {
      userConnection.disconnectedAt = new Date();
      userConnection.status = 'offline';
      await userConnection.save();

      const rooms = Array.from(socket.rooms);
      rooms.forEach((roomId) => {
        this.server.to(roomId).emit('userStatusChanged', {
          userId: userConnection.user,
          status: 'offline',
        });
      });
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { userId: string; roomId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { userId, roomId } = data;

    const room = await this.chatRoomModel.findById(roomId);
    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }

    socket.join(roomId);

    let userConnection = await this.userConnectionModel.findOne({ user: userId });
    if (!userConnection) {
      userConnection = new this.userConnectionModel({
        user: userId,
        socketId: socket.id,
        status: 'online',
      });
    } else {
      userConnection.socketId = socket.id;
      userConnection.status = 'online';
      userConnection.disconnectedAt = null;
    }
    await userConnection.save();

    this.server.to(roomId).emit('userJoined', { userId, roomId });

    this.server.to(roomId).emit('userStatusChanged', {
      userId,
      status: 'online',
    });
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

  @SubscribeMessage('updateStatus')
  async handleUpdateStatus(
    @MessageBody() data: { userId: string; status: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { userId, status } = data;

    if (!['online', 'away', 'offline'].includes(status)) {
      socket.emit('error', { message: 'Invalid status' });
      return;
    }

    const userConnection = await this.userConnectionModel.findOne({ user: userId });
    if (!userConnection) {
      socket.emit('error', { message: 'User not found' });
      return;
    }
    userConnection.status = status;
    await userConnection.save();

    const rooms = Array.from(socket.rooms);
    rooms.forEach((roomId) => {
      this.server.to(roomId).emit('userStatusChanged', {
        userId,
        status,
      });
    });
  }
}