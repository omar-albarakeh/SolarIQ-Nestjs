import { IsString, IsMongoId, MinLength } from 'class-validator';

export class AddMessageDto {
  @IsMongoId({ message: 'Sender ID must be a valid MongoDB ObjectId' })
  senderId: string;

  @IsMongoId({ message: 'Chat Room ID must be a valid MongoDB ObjectId' })
  chatRoomId: string;

  @IsString()
  @MinLength(1, { message: 'Content must not be empty' })
  content: string;
}