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
  await newPost.save();

  // Populate the author field before returning
  const populatedPost = await this.postModel
    .findById(newPost._id)
    .populate('author', 'username')
    .exec();

  if (!populatedPost) {
    throw new NotFoundException('Post not found after creation');
  }

  return populatedPost;
}

  async getPosts(): Promise<CommunityPost[]> {
    return await this.postModel
      .find()
      .populate('author', 'username')
      .populate('likes', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' },
      })
      .exec();
  }

  async findPostById(postId: Types.ObjectId): Promise<CommunityPost | null> {
    return await this.postModel.findById(postId).exec();
  }


  async addComment(addCommentDto: AddCommentDto, authorId: Types.ObjectId): Promise<Comment> {
    const newComment = new this.commentModel({
      text: addCommentDto.text,
      post: addCommentDto.postId,
      author: authorId,
    });
    await newComment.save();

    await this.postModel.findByIdAndUpdate(
      addCommentDto.postId,
      { $push: { comments: newComment._id } },
      { new: true },
    );

    const populatedComment = await this.commentModel
      .findById(newComment._id)
      .populate('author', 'username')
      .exec();

    if (!populatedComment) {
      throw new NotFoundException('Comment not found after creation');
    }

    return populatedComment;
  }

  async getCommentsByPost(postId: Types.ObjectId): Promise<Comment[]> {
    return await this.commentModel
      .find({ post: postId })
      .populate('author', 'username')
      .exec();
  }

  async likePost(likePostDto: LikePostDto, userId: Types.ObjectId): Promise<CommunityPost> {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      likePostDto.postId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).exec();

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }

  async unlikePost(likePostDto: LikePostDto, userId: Types.ObjectId): Promise<CommunityPost> {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      likePostDto.postId,
      { $pull: { likes: userId } },
      { new: true },
    ).exec();

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }
}