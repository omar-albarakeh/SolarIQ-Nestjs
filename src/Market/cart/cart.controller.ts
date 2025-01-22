import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDocument } from './Cart.Schema';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/:userId')
  async createCart(@Param('userId', ParseUUIDPipe) userId: string): Promise<CartDocument> {
    return this.cartService.createCart(userId);
  }

}
