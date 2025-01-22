import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityPostController } from './community.controller';
import { CommunityPostService } from './community.services';
import { CommunityPostRepository } from './community-post.repository';
import { CommunityPost, CommunityPostSchema } from './Schema/CommunityPost.schema';
import { Comment, CommentSchema } from './Schema/Comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommunityPost.name, schema: CommunityPostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [CommunityPostController],
  providers: [CommunityPostService, CommunityPostRepository], 
  exports: [CommunityPostService],
})
export class CommunityModule {}