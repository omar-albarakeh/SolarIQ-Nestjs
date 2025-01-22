import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class Item extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, ref: 'User' })
  sellerId: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);