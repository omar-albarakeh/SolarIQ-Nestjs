import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePostDto {
  @IsMongoId()
  @IsNotEmpty()
  postId: string;
}
