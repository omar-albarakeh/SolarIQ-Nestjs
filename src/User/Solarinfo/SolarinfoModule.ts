import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Auth/user.schema';
import { SolarInfoRepository } from './SolarinfoRepository';
import { SolarInfoService } from './Solarinfoservices';
import { SolarInfoController } from './solarinfoController';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SolarInfoController],
  providers: [SolarInfoService, SolarInfoRepository],
})
export class SolarInfoModule {}