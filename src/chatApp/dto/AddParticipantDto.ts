import { IsMongoId } from 'class-validator';

export class AddParticipantDto {
  @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
  userId: string;
}