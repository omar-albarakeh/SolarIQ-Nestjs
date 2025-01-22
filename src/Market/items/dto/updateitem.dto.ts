import { IsString, IsNumber, IsOptional, IsUrl, Min, Max, IsNotEmpty } from 'class-validator';

export class UpdateItemDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be at least 0' })
  @IsOptional()
  price?: number;

  @IsString({ message: 'Category must be a string' })
  @IsOptional()
  category?: string;

  @IsNumber({}, { message: 'Capacity must be a number' })
  @Min(1, { message: 'Capacity must be at least 1' })
  @IsOptional()
  capacity?: number;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  @IsOptional()
  imageUrl?: string;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be at least 0' })
  @IsOptional()
  quantity?: number;
}