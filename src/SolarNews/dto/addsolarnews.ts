import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSolarNewsDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}