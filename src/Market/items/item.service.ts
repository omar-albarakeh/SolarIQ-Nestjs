import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateItemDto } from './dto/createitem.dto';
import { UpdateItemDto } from './dto/updateitem.dto';
import { Item } from '../items/item.schema';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(private readonly itemRepository: ItemRepository) {}

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    try {
      return await this.itemRepository.create(createItemDto);
    } catch (error) {
      this.logger.error(`Failed to create item: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create item');
    }
  }

  async getAllItems(skip?: number, limit?: number): Promise<Item[]> {
    try {
      return await this.itemRepository.findAll(skip, limit);
    } catch (error) {
      this.logger.error(`Failed to fetch items: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to fetch items');
    }
  }


  async getItemById(id: string): Promise<Item> {
    try {
      const item = await this.itemRepository.findOne(id);
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      this.logger.error(`Failed to fetch item: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid item ID');
    }
  }




 
}