import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LikePostDto {
  @IsMongoId()
  @IsNotEmpty()
  postId: string;
}
