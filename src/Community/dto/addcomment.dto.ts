import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsMongoId()
  @IsNotEmpty()
  postId: string;
}
