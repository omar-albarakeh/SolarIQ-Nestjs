import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../User/Auth/user.schema';

@Schema({ timestamps: true })
export class UserConnection extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true, unique: true })
  socketId: string;

  @Prop({ type: Date, default: null })
  disconnectedAt: Date | null;

  @Prop({ enum: ['online', 'offline'], default: 'online' })
  status: string;
}

export const UserConnectionSchema = SchemaFactory.createForClass(UserConnection);