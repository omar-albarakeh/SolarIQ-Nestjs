import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../User/Auth/user.schema';

@Schema({ timestamps: true })
export class SolarNews extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;
}

export const SolarNewsSchema = SchemaFactory.createForClass(SolarNews);