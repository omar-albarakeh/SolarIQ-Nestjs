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

  async findAll(skip?: number, limit?: number): Promise<Item[]> {
    try {
      const query = this.itemModel.find().lean();
      if (skip !== undefined) query.skip(skip);
      if (limit !== undefined) query.limit(limit);
      return await query.exec();
    } catch (error) {
      this.logger.error(`Failed to fetch items: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to fetch items');
    }
  }


  async findOne(id: string): Promise<Item> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid item ID');
    }

    try {
      const item = await this.itemModel.findById(id).exec();
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      this.logger.error(`Failed to fetch item: ${error.message}`, error.stack);
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }


  
}