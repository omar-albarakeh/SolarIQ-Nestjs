import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/createitem.dto';
import { UpdateItemDto} from './dto/updateitem.dto';
import { Item } from './item.schema';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    try {
      return await this.itemService.createItem(createItemDto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create item');
    }
  }

  @Get()
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Item[]> {
    try {
      return await this.itemService.getAllItems(skip, limit);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to fetch items');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    try {
      return await this.itemService.getItemById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Invalid item ID');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    try {
      return await this.itemService.updateItem(id, updateItemDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Failed to update item');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Item> {
    try {
      return await this.itemService.deleteItem(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Failed to delete item');
    }
  }
}