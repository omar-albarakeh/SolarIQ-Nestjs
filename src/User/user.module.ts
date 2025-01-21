import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from './user.schema';
import { JwtStrategy } from '../JWT-Strategy/jwt.strategy';
import { jwtConfig } from '../JWT-Strategy/jwt.config';
import { UserService } from './user.services';
import {UserController} from "./user.controllers";
import {UserRepository} from "./user.repositories";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
    controllers: [UserController],
  providers: [UserService, JwtStrategy, UserRepository],
  exports: [UserService, JwtModule, PassportModule, UserRepository],
})
export class UserModule {}