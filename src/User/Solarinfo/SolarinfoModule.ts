import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '../../JWT-Strategy/jwt.config';
import { User, UserSchema } from '../Auth/user.schema';
import { SolarInfoRepository } from './SolarinfoRepository';
import { SolarInfoService } from './Solarinfoservices';
import { SolarInfoController } from './solarinfoController';
import {UserModule} from "../Auth/user.module";
import {TokenService} from "../Auth/TokenService";
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule, 
  ],
  controllers: [SolarInfoController],
  providers: [SolarInfoService, SolarInfoRepository,TokenService],
})
export class SolarInfoModule {}