import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/Auth/user.module';
import { envValidationSchema } from './JWT-Strategy/env.validation';
import { UpdateUserModule } from "./User/updateuser/updateusermodule";
import { SolarInfoModule } from './User/Solarinfo/SolarinfoModule';
import {CommunityModule} from './Community/community.module';
import { ItemModule } from './Market/items/item.module';
import { CartModule } from './Market/cart/cart.module';
import { SolarNewsModule } from './SolarNews/solarnews.module';
import { ChatModule } from "./chatApp/chat.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    MongooseModule.forRoot(process.env.DB_URI || '', {
      retryAttempts: 5,
      retryDelay: 1000,
    }),
    UserModule,
    UpdateUserModule,
    SolarInfoModule,
    CommunityModule,
    ItemModule,
    CartModule,
    SolarNewsModule,
    ChatModule
  ],
})
export class AppModule {}