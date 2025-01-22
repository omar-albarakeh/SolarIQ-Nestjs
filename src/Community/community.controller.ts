import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  UseGuards,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommunityPostService } from './community.services';
import { CreatePostDto } from './dto/createpost.dto';
import { AddCommentDto } from './dto/addcomment.dto';
import { LikePostDto } from './dto/like-post.dto';
import { Types } from 'mongoose';
import { isValidObjectId } from 'mongoose';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    username: string;
  };
}

@Controller('community-posts')
export class CommunityPostController {
  constructor(private readonly postService: CommunityPostService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const authorId = new Types.ObjectId(req.user._id);
    return await this.postService.createPost(createPostDto, authorId);
  }

  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Post(':postId/comments')
  @UseGuards(AuthGuard('jwt'))
  async addComment(
    @Param('postId') postId: string,
    @Body() addCommentDto: AddCommentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!isValidObjectId(postId)) {
      throw new BadRequestException('Invalid post ID');
    }
    addCommentDto.postId = postId;
    const authorId = new Types.ObjectId(req.user._id);
    return await this.postService.addComment(addCommentDto, authorId);
  }

  @Get(':postId/comments')
  async getCommentsByPost(@Param('postId') postId: string) {
    if (!isValidObjectId(postId)) {
      throw new BadRequestException('Invalid post ID');
    }
    return await this.postService.getCommentsByPost(new Types.ObjectId(postId));
  }

  @Post(':postId/like')
  @UseGuards(AuthGuard('jwt'))
  async likePost(
    @Param('postId') postId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!isValidObjectId(postId)) {
      throw new BadRequestException('Invalid post ID');
    }
    const likePostDto: LikePostDto = { postId };
    const userId = new Types.ObjectId(req.user._id);
    return await this.postService.likePost(likePostDto, userId);
  }

  @Post(':postId/unlike')
  @UseGuards(AuthGuard('jwt'))
  async unlikePost(
    @Param('postId') postId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!isValidObjectId(postId)) {
      throw new BadRequestException('Invalid post ID');
    }
    const likePostDto: LikePostDto = { postId };
    const userId = new Types.ObjectId(req.user._id);
    return await this.postService.unlikePost(likePostDto, userId);
  }
}