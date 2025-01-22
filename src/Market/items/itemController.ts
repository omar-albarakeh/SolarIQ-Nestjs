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
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/createitem.dto';
import { UpdateItemDto } from './dto/updateitem.dto';
import { Item } from '../items/item.schema';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(createItemDto);
  }

 





  
}