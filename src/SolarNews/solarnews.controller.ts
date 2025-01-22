import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SolarNewsService } from './solarnews.service';
import { CreateSolarNewsDto } from './dto/addsolarnews';
import { UpdateSolarNewsDto } from './dto/UpdateSolarNewsDto';
import { isValidObjectId } from 'mongoose';

@Controller('solar-news')
export class SolarNewsController {
  constructor(private readonly solarNewsService: SolarNewsService) {}

  @Post()
  async create(@Body() createSolarNewsDto: CreateSolarNewsDto) {
    return this.solarNewsService.create(createSolarNewsDto);
  }

  @Get()
  async findAll() {
    return this.solarNewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const solarNews = await this.solarNewsService.findOne(id);
    if (!solarNews) {
      throw new NotFoundException(`Solar News with ID ${id} not found`);
    }
    return solarNews;
  }


}