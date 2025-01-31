import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateItemDto } from './dto/createitem.dto';
import { UpdateItemDto} from './dto/updateitem.dto';
import { Item, ItemDocument } from './item.schema';

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

  async findAll(skip = 0, limit = 10): Promise<Item[]> {
    try {
      return await this.itemModel.find().skip(skip).limit(limit).lean().exec();
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

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid item ID');
    }

    try {
      const updatedItem = await this.itemModel
        .findByIdAndUpdate(id, updateItemDto, { new: true, runValidators: true })
        .exec();

      if (!updatedItem) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return updatedItem;
    } catch (error) {
      this.logger.error(`Failed to update item: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to update item');
    }
  }

  async delete(id: string): Promise<Item> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid item ID');
    }

    try {
      const deletedItem = await this.itemModel.findByIdAndDelete(id).exec();
      if (!deletedItem) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return deletedItem;
    } catch (error) {
      this.logger.error(`Failed to delete item: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to delete item');
    }
  }
}