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

  async create(createSolarNewsDto: CreateSolarNewsDto): Promise<SolarNews> {
    const createdSolarNews = new this.solarNewsModel(createSolarNewsDto);
    return createdSolarNews.save();
  }

  async findAll(): Promise<SolarNews[]> {
    return this.solarNewsModel.find().exec();
  }

  async findOne(id: string): Promise<SolarNews | null> {
    return this.solarNewsModel.findById(id).exec();
  }

  async update(id: string, updateSolarNewsDto: UpdateSolarNewsDto): Promise<SolarNews | null> {
    return this.solarNewsModel
      .findByIdAndUpdate(id, updateSolarNewsDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<SolarNews | null> {
    return this.solarNewsModel.findByIdAndDelete(id).exec();
  }
}