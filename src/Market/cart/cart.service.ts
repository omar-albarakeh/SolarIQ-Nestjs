import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartDocument } from './Cart.Schema';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async createCart(userId: string): Promise<CartDocument> {
    return await this.cartRepository.createCart(userId);
  }

  async addToCart(userId: string, itemId: string, quantity: number): Promise<CartDocument> {
    return await this.cartRepository.addToCart(userId, itemId, quantity);
  }

  async removeFromCart(userId: string, itemId: string): Promise<CartDocument> {
    return await this.cartRepository.removeFromCart(userId, itemId);
  }

  async updateCartItem(userId: string, itemId: string, quantity: number): Promise<CartDocument> {
    return await this.cartRepository.updateCartItem(userId, itemId, quantity);
  }

  async getCart(userId: string): Promise<CartDocument> {
    return await this.cartRepository.getCart(userId);
  }

  
}
