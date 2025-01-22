import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { Cart, CartSchema } from './Cart.Schema';
import { User, UserSchema } from '../../User/Auth/user.schema';
import { Item, ItemSchema } from '../items/item.schema';
import { UserModule } from '../../User/Auth/user.module';
import { ItemModule } from '../items/item.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => ItemModule),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export class CartModule {}