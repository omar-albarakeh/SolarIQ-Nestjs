import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../User/Auth/user.schema';
import { Item } from '../items/item.schema';

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: User;

  @Prop({
    type: [
      {
        item: { type: Types.ObjectId, ref: 'Item' },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  })
  items: { item: Item; quantity: number }[];

  @Prop({ default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
export type CartDocument = Cart & Document;