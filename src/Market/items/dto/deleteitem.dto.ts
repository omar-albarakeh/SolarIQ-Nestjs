import { IsString } from 'class-validator';

export class DeleteItemDto {
  @IsString()
  id: string;
}