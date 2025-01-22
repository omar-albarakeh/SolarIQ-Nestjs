import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../User/Auth/user.schema';
import { CommunityPost } from './CommunityPost.schema';

@Schema()
export class Comment extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'CommunityPost' })
  post: CommunityPost;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);