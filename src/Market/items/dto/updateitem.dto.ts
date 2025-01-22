import { IsString, IsNumber, IsOptional, IsUrl, Min, IsNotEmpty } from 'class-validator';

export class UpdateItemDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsOptional()
  name?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be at least 0' })
  @IsNotEmpty({ message: 'Price cannot be empty' })
  @IsOptional()
  price?: number;

  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category cannot be empty' })
  @IsOptional()
  category?: string;

  @IsNumber({}, { message: 'Capacity must be a number' })
  @Min(1, { message: 'Capacity must be at least 1' })
  @IsNotEmpty({ message: 'Capacity cannot be empty' })
  @IsOptional()
  capacity?: number;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsOptional()
  description?: string;

  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  @IsNotEmpty({ message: 'Image URL cannot be empty' })
  @IsOptional()
  imageUrl?: string;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be at least 0' })
  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  @IsOptional()
  quantity?: number;
}