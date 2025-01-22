import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Auth/user.schema';

@Injectable()
export class SolarInfoRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async updateSolarInfo(id: string, solarInfo: Partial<User['solarInfo']>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: { solarInfo, isSolarInfoComplete: true } },
      { new: true },
    ).exec();
  }
}