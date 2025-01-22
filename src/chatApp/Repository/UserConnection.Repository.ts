import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserConnection } from '../schema/userconnection.schema';

@Injectable()
export class UserConnectionRepository {
  constructor(@InjectModel(UserConnection.name) private userConnectionModel: Model<UserConnection>) {}

}