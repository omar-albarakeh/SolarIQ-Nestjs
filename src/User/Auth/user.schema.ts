import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {SolarInfoSchema ,SolarInfo} from '../Solarinfo/SolarInfoSchema';

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
}

export const UserSchema = SchemaFactory.createForClass(User);