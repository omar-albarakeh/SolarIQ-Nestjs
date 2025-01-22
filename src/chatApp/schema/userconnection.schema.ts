import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../User/Auth/user.schema';

@Schema()
export class UserConnection extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  socketId: string;

  @Prop({ default: Date.now })
  connectedAt: Date;

  @Prop({ default: null })
  disconnectedAt: Date;
}

export const UserConnectionSchema = SchemaFactory.createForClass(UserConnection);