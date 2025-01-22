import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from '../cart/Cart.Schema';
import { User } from '../../User/Auth/user.schema';
import { Item } from '../items/item.schema';

@Injectable()
export class CartRepository {
  private readonly logger = new Logger(CartRepository.name);

  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async createCart(userId: string): Promise<CartDocument> {
    try {
      const existingCart = await this.cartModel.findOne({ user: userId }).exec();
      if (existingCart) {
        throw new BadRequestException('User already has a cart');
      }
      const cart = new this.cartModel({ user: userId, items: [], totalPrice: 0 });
      return await cart.save();
    } catch (error) {
      this.logger.error(`Failed to create cart: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create cart');
    }
  }

  

  

 

  

 
}
