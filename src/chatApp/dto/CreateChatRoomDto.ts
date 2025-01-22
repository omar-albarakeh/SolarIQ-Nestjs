import { IsString, IsArray, IsMongoId, MinLength } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  @MinLength(1, { message: 'Name must not be empty' })
  name: string;

  @IsArray()
  @IsMongoId({ each: true, message: 'Each participant must be a valid MongoDB ObjectId' })
  participants: string[];
}