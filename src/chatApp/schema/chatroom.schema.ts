import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../User/Auth/user.schema';

@Schema({ timestamps: true })
export class ChatRoom extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  participants: User[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);