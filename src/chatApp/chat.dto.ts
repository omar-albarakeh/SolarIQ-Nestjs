import { IsString, IsArray, IsOptional, IsNumber, IsMongoId } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  participants: string[];
}

export class AddMessageDto {
  @IsMongoId() 
  senderId: string;

  @IsMongoId()
  roomId: string;

  @IsString()
  content: string;
}

export class AddParticipantDto {
  @IsString()
  userId: string;
}

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}