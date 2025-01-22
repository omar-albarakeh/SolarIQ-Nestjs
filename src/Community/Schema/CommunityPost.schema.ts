import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../User/Auth/user.schema';

@Schema()
export class CommunityPost extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  likes: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }], default: [] })
  comments: Comment[];
}

export const CommunityPostSchema = SchemaFactory.createForClass(CommunityPost);
