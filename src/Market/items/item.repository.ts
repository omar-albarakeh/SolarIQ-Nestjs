import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateItemDto } from './dto/createitem.dto';
import { UpdateItemDto } from './dto/updateitem.dto';
import { Item, ItemDocument } from '../items/item.schema';

@Injectable()
export class ItemRepository {
  private readonly logger = new Logger(ItemRepository.name);

  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    try {
      const createdItem = new this.itemModel(createItemDto);
      return await createdItem.save();
    } catch (error) {
      this.logger.error(`Failed to create item: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create item');
    }
  }

 
}