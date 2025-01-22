import { IsOptional, IsString } from 'class-validator';

export class UpdateSolarNewsDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;
}