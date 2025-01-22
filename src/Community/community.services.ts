import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CommunityPostRepository } from './community-post.repository';
import { CreatePostDto } from './dto/createpost.dto';
import { AddCommentDto } from './dto/addcomment.dto';
import { LikePostDto } from './dto/like-post.dto';
import { CommunityPost } from './Schema/CommunityPost.schema';
import { Comment } from './Schema/Comment.schema';

@Injectable()
export class CommunityPostService {
  constructor(private readonly postRepository: CommunityPostRepository) {}


}