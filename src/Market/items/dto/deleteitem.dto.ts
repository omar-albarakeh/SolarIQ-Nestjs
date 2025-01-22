import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteItemDto {
  @IsString({ message: 'ID must be a string' })
  @IsNotEmpty({ message: 'ID is required' })
  id: string;
}