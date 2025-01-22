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

  async addToCart(userId: string, itemId: string, quantity: number): Promise<CartDocument> {
    try {
      const item = await this.itemModel.findById(itemId).exec();
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      let cart = await this.cartModel.findOne({ user: userId }).exec();
      if (!cart) {
        cart = new this.cartModel({ user: userId, items: [], totalPrice: 0 });
      }
      const itemIndex = cart.items.findIndex(
        (cartItem) => cartItem.item.toString() === itemId,
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ item: item._id as Types.ObjectId, quantity });
      }
      cart.totalPrice += item.price * quantity;
      return await cart.save();
    } catch (error) {
      this.logger.error(`Failed to add item to cart: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to add item to cart');
    }
  }

  async removeFromCart(userId: string, itemId: string): Promise<CartDocument> {
    try {
      const cart = await this.cartModel.findOne({ user: userId }).exec();
      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
      const itemIndex = cart.items.findIndex(
        (cartItem) => cartItem.item.toString() === itemId,
      );
      if (itemIndex === -1) {
        throw new NotFoundException('Item not found in cart');
      }
      const item = await this.itemModel.findById(itemId).exec();
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      cart.totalPrice -= item.price * cart.items[itemIndex].quantity;
      cart.items.splice(itemIndex, 1);
      return await cart.save();
    } catch (error) {
      this.logger.error(`Failed to remove item from cart: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to remove item from cart');
    }
  }

 

  

 
}
