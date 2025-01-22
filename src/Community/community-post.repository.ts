import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommunityPost } from './Schema/CommunityPost.schema';
import { Comment } from './Schema/Comment.schema';
import { CreatePostDto } from './dto/createpost.dto';
import { AddCommentDto } from './dto/addcomment.dto';
import { LikePostDto } from './dto/like-post.dto';

@Injectable()
export class CommunityPostRepository {
  constructor(
    @InjectModel(CommunityPost.name)
    private readonly postModel: Model<CommunityPost>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
  ) {}

  async createPost(createPostDto: CreatePostDto, authorId: Types.ObjectId): Promise<CommunityPost> {
    const newPost = new this.postModel({
      text: createPostDto.text,
      author: authorId,
    });
    return await newPost.save();
  }

  





  

}