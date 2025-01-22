import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartDocument } from './Cart.Schema';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}
  
}
