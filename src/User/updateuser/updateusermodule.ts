import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Auth/user.schema';
import { UserRepository } from './updateuser.repository';
import { UserService } from './updatuser.service';
import { UserController } from './userupdatecontroller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UpdateUserModule {}