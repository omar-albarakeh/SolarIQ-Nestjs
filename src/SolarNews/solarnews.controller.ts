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
  UseGuards,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SolarNewsService } from './solarnews.service';
import { CreateSolarNewsDto } from './dto/addsolarnews';
import { UpdateSolarNewsDto } from './dto/UpdateSolarNewsDto';
import { isValidObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('solar-news')
export class SolarNewsController {
  constructor(private readonly solarNewsService: SolarNewsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createSolarNewsDto: CreateSolarNewsDto) {
    try {
      return await this.solarNewsService.create(createSolarNewsDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create solar news', error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.solarNewsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch solar news', error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    try {
      const solarNews = await this.solarNewsService.findOne(id);
      if (!solarNews) {
        throw new NotFoundException(`Solar News with ID ${id} not found`);
      }
      return solarNews;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch solar news', error.message);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateSolarNewsDto: UpdateSolarNewsDto,
  ) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    try {
      const updatedSolarNews = await this.solarNewsService.update(id, updateSolarNewsDto);
      if (!updatedSolarNews) {
        throw new NotFoundException(`Solar News with ID ${id} not found`);
      }
      return updatedSolarNews;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update solar news', error.message);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) 
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    try {
      const deletedSolarNews = await this.solarNewsService.remove(id);
      if (!deletedSolarNews) {
        throw new NotFoundException(`Solar News with ID ${id} not found`);
      }
      return deletedSolarNews;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete solar news', error.message);
    }
  }
}