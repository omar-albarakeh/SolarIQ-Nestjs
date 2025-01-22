import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/Add.Cart.dto';
import { CartDocument } from './Cart.Schema';
import { RemoveFromCartDto } from './dto/Remove.Cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/:userId')
  @UseGuards(AuthGuard('jwt'))
  async createCart(@Param('userId') userId: string): Promise<CartDocument> {
    try {
      return await this.cartService.createCart(userId);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to create cart',
      );
    }
  }

  @Post('/:userId/add')
  @UseGuards(AuthGuard('jwt'))
  async addToCart(
    @Param('userId') userId: string,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<CartDocument> {
    try {
      const { itemId, quantity } = addToCartDto;
      return await this.cartService.addToCart(userId, itemId, quantity);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to add item to cart',
      );
    }
  }

  @Delete('/:userId/remove')
  @UseGuards(AuthGuard('jwt'))
  async removeFromCart(
    @Param('userId') userId: string,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ): Promise<CartDocument> {
    try {
      const { itemId } = removeFromCartDto;
      return await this.cartService.removeFromCart(userId, itemId);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to remove item from cart',
      );
    }
  }

  @Patch('/:userId/update')
  @UseGuards(AuthGuard('jwt'))
  async updateCartItem(
    @Param('userId') userId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartDocument> {
    try {
      const { itemId, quantity } = updateCartItemDto;
      return await this.cartService.updateCartItem(userId, itemId, quantity);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to update cart item',
      );
    }
  }

  @Get('/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getCart(@Param('userId') userId: string): Promise<CartDocument> {
    try {
      const cart = await this.cartService.getCart(userId);
      if (!cart) {
        throw new NotFoundException(`Cart for user ${userId} not found`);
      }
      return cart;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error.message || 'Failed to fetch cart',
      );
    }
  }

  @Delete('/:userId/clear')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async clearCart(@Param('userId') userId: string): Promise<void> {
    try {
      await this.cartService.clearCart(userId);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to clear cart',
      );
    }
  }
}