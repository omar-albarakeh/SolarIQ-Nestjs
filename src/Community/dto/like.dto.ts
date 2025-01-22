import { IsNotEmpty } from 'class-validator';

export class LikePostDto {
  @IsNotEmpty()
  postId: string;
}