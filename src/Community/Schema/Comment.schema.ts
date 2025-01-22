import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../User/Auth/user.schema';
import { CommunityPost } from '../../Community/Schema/CommunityPost.schema';

@Schema()
export class Comment extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'CommunityPost' })
  post: CommunityPost;

  @Prop({ required: true, minlength: 1, maxlength: 500 })
  text: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  likes: User[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
