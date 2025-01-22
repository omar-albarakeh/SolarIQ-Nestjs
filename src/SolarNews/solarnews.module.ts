import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolarNewsController } from './solarnews.controller';
import { SolarNewsService } from './solarnews.service';
import { SolarNewsRepository } from './solarnews.repository';
import { SolarNews, SolarNewsSchema } from './SolarNews.schema';
import { User, UserSchema } from '../User/Auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SolarNews.name, schema: SolarNewsSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SolarNewsController],
  providers: [SolarNewsService, SolarNewsRepository],
  exports: [SolarNewsService],
})
export class SolarNewsModule {}