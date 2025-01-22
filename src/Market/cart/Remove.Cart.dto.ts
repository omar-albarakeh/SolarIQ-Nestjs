import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveFromCartDto {
  @IsString({ message: 'Item ID must be a string' })
  @IsNotEmpty({ message: 'Item ID is required' })
  itemId: string;
}