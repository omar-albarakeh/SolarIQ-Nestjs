import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SolarNews } from './SolarNews.schema';
import { CreateSolarNewsDto } from './dto/addsolarnews';
import { UpdateSolarNewsDto } from './dto/UpdateSolarNewsDto';

@Injectable()
export class SolarNewsRepository {
  constructor(
    @InjectModel(SolarNews.name) private readonly solarNewsModel: Model<SolarNews>,
  ) {}

}