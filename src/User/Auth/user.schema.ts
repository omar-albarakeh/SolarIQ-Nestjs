import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SolarInfoSchema, SolarInfo } from '../Solarinfo/SolarInfoSchema';
import { CommunityPost } from '../../Community/Schema/CommunityPost.schema';
import { Item } from '../../Market/items/item.schema';
import { Cart } from '../../Market/cart/Cart.Schema';
import {SolarNews} from "../../SolarNews/SolarNews.schema"

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: false })
  isSolarInfoComplete: boolean;

  @Prop({ type: SolarInfoSchema, required: false })
  solarInfo?: SolarInfo;

  @Prop({ default: false })
  blocked: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CommunityPost' }], default: [] })
  posts: CommunityPost[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }], default: [] })
  items: Item[];

  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  cart: Cart;

   @Prop({ type: [{ type: Types.ObjectId, ref: 'SolarNews' }], default: [] })
  solarNews: SolarNews[]; 
}

export const UserSchema = SchemaFactory.createForClass(User);