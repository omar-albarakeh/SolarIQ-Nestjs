import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../User/Auth/user.schema';
import { Comment } from './Comment.schema';

@Schema({ timestamps: true })
export class CommunityPost extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  likes: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }], default: [] })
  comments: Comment[];
}

export const CommunityPostSchema = SchemaFactory.createForClass(CommunityPost);