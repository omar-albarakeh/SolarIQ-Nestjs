import { IsNotEmpty } from 'class-validator';

export class DeletePostDto {
  @IsNotEmpty()
  postId: string;
}
