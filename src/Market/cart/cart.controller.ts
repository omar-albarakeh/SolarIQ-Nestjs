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
import { AddToCartDto } from './dto/Add.Cart.dto';
import { CartDocument } from './Cart.Schema';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/:userId')
  async createCart(@Param('userId', ParseUUIDPipe) userId: string): Promise<CartDocument> {
    return this.cartService.createCart(userId);
  }

  @Post('/:userId/add')
  async addToCart(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<CartDocument> {
    const { itemId, quantity } = addToCartDto;
    return this.cartService.addToCart(userId, itemId, quantity);
  }


}
