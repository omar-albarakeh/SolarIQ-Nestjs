import { IsNotEmpty, IsMongoId, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsMongoId({ message: 'Item ID must be a valid MongoDB ObjectId' })
  @IsNotEmpty({ message: 'Item ID is required' })
  itemId: string;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;
}
