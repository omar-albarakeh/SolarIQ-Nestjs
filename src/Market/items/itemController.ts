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
  UseGuards,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/createitem.dto';
import { UpdateItemDto } from './dto/updateitem.dto';
import { Item } from './item.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    try {
      return await this.itemService.createItem(createItemDto);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to create item',
      );
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
      throw new InternalServerErrorException(
        error.message || 'Failed to fetch items',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    try {
      const item = await this.itemService.getItemById(id);
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Invalid item ID');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    try {
      const updatedItem = await this.itemService.updateItem(id, updateItemDto);
      if (!updatedItem) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return updatedItem;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error.message || 'Failed to update item',
      );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string): Promise<Item> {
    try {
      const deletedItem = await this.itemService.deleteItem(id);
      if (!deletedItem) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return deletedItem;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error.message || 'Failed to delete item',
      );
    }
  }
}