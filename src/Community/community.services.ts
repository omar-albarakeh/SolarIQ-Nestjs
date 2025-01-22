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


  async createPost(createPostDto: CreatePostDto, authorId: Types.ObjectId): Promise<CommunityPost> {
    return await this.postRepository.createPost(createPostDto, authorId);
  }

  async getPosts(): Promise<CommunityPost[]> {
    return await this.postRepository.getPosts();
  }


  async addComment(addCommentDto: AddCommentDto, authorId: Types.ObjectId): Promise<Comment> {
    const post = await this.postRepository.findPostById(new Types.ObjectId(addCommentDto.postId));
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return await this.postRepository.addComment(addCommentDto, authorId);
  }

  async getCommentsByPost(postId: Types.ObjectId): Promise<Comment[]> {
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return await this.postRepository.getCommentsByPost(postId);
  }

  async likePost(likePostDto: LikePostDto, userId: Types.ObjectId): Promise<CommunityPost> {
    const post = await this.postRepository.findPostById(new Types.ObjectId(likePostDto.postId));
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return await this.postRepository.likePost(likePostDto, userId);
  }

  async unlikePost(likePostDto: LikePostDto, userId: Types.ObjectId): Promise<CommunityPost> {
    const post = await this.postRepository.findPostById(new Types.ObjectId(likePostDto.postId));
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return await this.postRepository.unlikePost(likePostDto, userId);
  }
}