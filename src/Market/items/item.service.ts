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

  
 
}