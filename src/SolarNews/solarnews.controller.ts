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


}