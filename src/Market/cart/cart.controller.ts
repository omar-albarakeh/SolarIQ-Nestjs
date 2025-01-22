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
import { RemoveFromCartDto } from './dto/Remove.Cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import {ClearCartDto} from './dto/clear-cart.dto';

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

  @Delete('/:userId/remove')
  async removeFromCart(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ): Promise<CartDocument> {
    const { itemId } = removeFromCartDto;
    return this.cartService.removeFromCart(userId, itemId);
  }

   @Patch('/:userId/update')
  async updateCartItem(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartDocument> {
    const { itemId, quantity } = updateCartItemDto;
    return this.cartService.updateCartItem(userId, itemId, quantity);
  }

  @Get('/:userId')
  async getCart(@Param('userId', ParseUUIDPipe) userId: string): Promise<CartDocument> {
    return this.cartService.getCart(userId);
  }


  @Delete('/:userId/clear')
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearCart(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() clearCartDto: ClearCartDto,
  ): Promise<void> {
    await this.cartService.clearCart(userId);
  }
}
